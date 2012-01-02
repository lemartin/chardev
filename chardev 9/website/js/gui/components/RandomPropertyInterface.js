/**
 * @constructor
 */
function RandomPropertyInterface() {
	this.node = document.createElement("div");
	this.node.className = "ra_group rpi_parent";
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('change', ['randomEnchantmentId']);
}

RandomPropertyInterface.prototype = {
	node: null,
	select: null,
	handler: null,
	eventMgr: null,
	/**
	 * @param {EquippedItem} itm
	 */
	update: function( itm ) {
		this.node.style.display = "none";
		if( itm == null ) {
			return;
		}
		
		var show = [];
		var props = itm.availableRandomEnchantments;
		var div;
		
		Tools.removeChilds(this.node);
		
		if( !props ) {
			return;
		}
		this.node.style.display = "block";
		
		show[0] = [0,""];
		
		for( var i=0; i<props.length; i++) {
			show[i+1] = [props[i].id,"..."+props[i].name+": "+props[i].description];
		}
	
		this.select = new SingleSelect(show);
		if( itm.selectedRandomEnchantment ) {
			this.select.select(itm.selectedRandomEnchantment.id);
		}
		
		Listener.add(this.select.node,"change",this.onChange,this,[]);
		
		this.node.innerHTML = "<div class='rpi_title'>"+locale['RPI_SelectRandomEnchant']+"</div>";
		
		div = document.createElement("div"); div.className = "rpi_content";
		div.appendChild(this.select.node); this.select.node.className = "single_select rpi_select";
		this.node.appendChild(div);
	},
	/**
	 * @param {Item} itm
	 */
	onChange: function( itm ) {
		this.eventMgr.fire('change', { 'randomEnchantmentId': parseInt(this.select.getValue(), 10)});
	},
	
	setOnChangeHandler: function(handler,scope) {
		this.handler = [handler,scope];
	}
};