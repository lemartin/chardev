/**
 * @constructor
 * @returns {PresenceSelector}
 */
function PresenceSelector() {
	this._node = document.createElement('div');
}
/**
 * @type {Element}
 */
PresenceSelector.prototype._node;
/**
 * @type {Handler}
 */
PresenceSelector.prototype._handler;
/**
 * @param {Character} character
 */
PresenceSelector.prototype.update = function( character ) {
	Tools.removeChilds(this._node);
	
	if( character._chrClass ) {
		var ps = character._chrClass._presences;

		switch( character._chrClass._id ) {
		case DEATHKNIGHT:
			for( var i=0; i<ps.length; i++ ) {
				var div = document.createElement('div');
				div.className = 'ps_presence';
				div.style.backgroundImage = 'url(images/icons/' + ( character._auras.isActive(ps[i]._id) ? '' : 'g/' ) + 'small/'+ps[i]._icon+'.png)';
				this._node.appendChild(div);
				
				Listener.add( div, "mouseover", Tooltip.showSpell, Tooltip, [ps[i]._id] );
				div.onmouseout = function(){Tooltip.hide();};
				div.onmousemove = function(){Tooltip.move();};
				Listener.add( div, "click", this._onChange, this, [ps[i]._id]	);
			}
			break;
		}
		Tools.clearBoth(this._node);
	}
};
/**
 * @param {Handler} handler
 */
PresenceSelector.prototype.setOnChangeHandler = function( handler ) {
	this._handler = handler;
};
/**
 * @param {number} presenceId
 */
PresenceSelector.prototype._onChange = function( presenceId ) {
	if( this._handler ) {
		this._handler.notify( [presenceId] );
	}
};