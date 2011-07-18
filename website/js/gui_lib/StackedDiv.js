/**
 * @constructor
 * @param size
 * @returns {StackedDiv}
 */
function StackedDiv( size ) {
	this._items = new Array(size);
	this._node = document.createElement("div");
	for( var i = 0; i < size; i++ ) {
		this._items[i] = document.createElement("div");
		this._items[i].style.display = ( i == 0 ? "block" : "none" );
		this._items[i].style.width = "100%";
		this._items[i].style.height = "100%";
		this._node.appendChild(this._items[i]);
	}
	this._shown = 0;
}

StackedDiv.prototype._items = null;
StackedDiv.prototype._node = null;
StackedDiv.prototype._shown = 0;
StackedDiv.prototype._onChangeHandler = null;

StackedDiv.prototype.show = function( index ) {
	if( index == this._shown ) {
		return;
	}
	var old = this._shown;
	this._items[index].style.display = "block";
	this._items[old].style.display = "none";
	this._shown = index;
	if( this._onChangeHandler ) {
		this._onChangeHandler[0].apply(this._onChangeHandler[1],[index,old]);
	}
};

StackedDiv.prototype.setOnChangeHandler = function(handler, scope){
	this._onChangeHandler = [handler, scope];
};