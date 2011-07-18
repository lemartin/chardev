/**
 * @constructor
 * @returns {RandomPropertyInterface}
 */
function RandomPropertyInterface() {
	this._node = document.createElement("div");
}

RandomPropertyInterface.prototype._node = null;
RandomPropertyInterface.prototype._select = null;
RandomPropertyInterface.prototype._handler = null;
/**
 * @param {Item} itm
 */
RandomPropertyInterface.prototype.update = function( itm ) {
	var show = [];
	var props = itm._randomEnchants;
	var div;
	
	Tools.removeChilds(this._node);
	
	if( !props ) {
		return;
	}
	
	show[0] = [0,""];
	
	for( var i=0; i<props.length; i++) {
		var d = "";
		
		for( var j=0; j<5; j++ ) {
			if( props[i]._enchants[j] ) {
				d += ( d ? ", " : "" ) + props[i]._enchants[j]._description;
			}
		}

		show[i+1] = [props[i]._id,"..."+props[i]._name+": "+d];
	}

	this._select = new SingleSelect(show);
	if( itm._selectedRandomEnchant ) {
		this._select.select(itm._selectedRandomEnchant._id);
	}
	
	Listener.add(this._select._node,"change",this._onChange,this,[itm]);
	this._node.className = "rpi_parent";
	this._node.innerHTML = "<div class='rpi_title'>"+locale['RPI_SelectRandomEnchant']+"</div>";
	
	div = document.createElement("div"); div.className = "rpi_content";
	div.appendChild(this._select._node); this._select._node.className = "rpi_select";
	this._node.appendChild(div);
};
/**
 * @param {Item} itm
 */
RandomPropertyInterface.prototype._onChange = function( itm ) {
	itm.setRandomEnchantment(parseInt(this._select.getValue(), 10));
	if( this._handler ) {
		this._handler[0].apply(this._handler[1],[]);
	}
};

RandomPropertyInterface.prototype.setOnChangeHandler = function(handler,scope) {
	this._handler = [handler,scope];
};