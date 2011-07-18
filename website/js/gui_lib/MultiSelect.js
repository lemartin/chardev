/**
 * @constructor
 * @param show
 * @param name
 * @returns {MultiSelect}
 */
function MultiSelect( show, name ) {
	var i;
	this._node = document.createElement("select");
	this._node.className = 'multi_select';
	this._node.multiple = "true";
	this._node.name = name+'[]';
	this._options  = [];
	for( i = 0; i < show.length; i++ ) {
		this._options[i] = document.createElement("option");
		this._options[i].value = show[i][0];
		this._options[i].innerHTML = show[i][1];
		this._node.appendChild(this._options[i]);
	}
}

MultiSelect.prototype._node = null;
MultiSelect.prototype._options = [];

MultiSelect.prototype.select = function( mask ) {
	if( mask == (1<<(this._options.length+1))-1 ) {
		return;
	}
	for( var i = 0; i < this._options.length; i++ ) {
		this._options[i].selected = (mask&1<<parseInt(this._options[i].value,10))!=0;
	}
};

MultiSelect.prototype.getValue = function() {
	var mask = 0, i, v, max_v = 0;
	for( i=0; i<this._options.length; i++ ) {
		v = 1<<parseInt(this._options[i].value,10);
		max_v += v;
		if( this._options[i].selected == true ) {
			mask += v;
		}
	}
	if( mask == 0 ) {
		mask = max_v;
	}
	return mask;
};