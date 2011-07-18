/**
 * @constructor
 * @param {Array} show
 * @returns {SingleSelect}
 */
function SingleSelect( show ) {
	this._node = document.createElement("select");
	this._node.className = 'single_select';
	this.set(show);
}

SingleSelect.prototype._node = null;
SingleSelect.prototype._options = [];

SingleSelect.prototype.setName = function( name ) {
	this._node.name = name;
};

SingleSelect.prototype.set = function( show ) {
	var i;
	this._options  = [];
	while( this._node.firstChild ) {
		this._node.removeChild( this._node.firstChild );
	}
	for( i = 0; i < show.length; i++ ) {
		this._options[i] = document.createElement("option");
		this._options[i].value = show[i][0];
		this._options[i].innerHTML = show[i][1];
		this._node.appendChild(this._options[i]);
	}
};

SingleSelect.prototype.select = function( value ) {
	for( var i = 0; i < this._options.length; i++ ) {
		this._options[i].selected = (this._options[i].value == value)!=0;
	}
};

SingleSelect.prototype.getSelected = function() {
	return this._node.selectedIndex;
};

SingleSelect.prototype.getValue = function() {
	return this._node.options[this._node.selectedIndex].value;
};