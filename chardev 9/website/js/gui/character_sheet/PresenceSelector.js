/**
 * @constructor
 */
function PresenceSelector() {
	this.node = document.createElement('div');
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('select_presence', ['presence_id']);
}
PresenceSelector.prototype = {
	node: null,
	eventMgr: null,
	addPopagator: function(event, propagator) {
		this.eventMgr.addPropagator(event, propagator);
	},
	update: function( availablePresences, currentPresenceId ) {
		Tools.removeChilds(this.node);
		
		if( availablePresences == null || availablePresences.length == 0 ) {
			return;
		}
		for( var i=0; i<availablePresences.length; i++ ) {
			
			var div = DOM.createAt( this.node, 'div', {
				'class': 'ps_presence', 
				'backgroundImage': 
					'images/icons/' + 
					( availablePresences[i].id == currentPresenceId ? '' : 'g/' ) +  
					'small/'+availablePresences[i].icon+'.png'
			});
			
			Listener.add( div, "mouseover", Tooltip.show, Tooltip, ["<div class='tooltip_spell_description'>"+availablePresences[i].description+"</div>"] );
			div.onmouseout = function(){Tooltip.hide();};
			div.onmousemove = function(){Tooltip.move();};
			Listener.add( div, "click", function( id ) {
				this.eventMgr.fire('select_presence', {'presence_id': id});
			}, this, [availablePresences[i].id]	);
		}
		
		Tools.clearBoth(this.node);
	}
};