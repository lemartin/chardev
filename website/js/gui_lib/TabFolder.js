/**
 * @constructor
 * @param childNodes
 * @param linkNames
 * @param cssClass
 * @returns {TabFolder}
 */
function TabFolder( childNodes, linkNames, cssClass ) {
	
	this.__folder = new StackedDiv(childNodes.length);
	this.__menu = new Menu(linkNames, cssClass, this.show, this);
	
	this._node = this.__folder._node;
	this._menu = this.__menu._node;
	for( var i=0; i<childNodes.length; i++ ) {
		this.__folder._items[i].appendChild(childNodes[i]);
	}
}

TabFolder.prototype._menu = null;
TabFolder.prototype._node = null;
TabFolder.prototype._onChangeHandler = null;
TabFolder.prototype._shown = 0;

TabFolder.prototype.__menu = null;
TabFolder.prototype.__folder = null;

TabFolder.prototype.show = function( index ) {
	this._shown = index;
	this.__folder.show(index);
	this.__menu.select(index);
};

TabFolder.prototype.setOnChangeHandler = function(handler, scope) {
	this.__folder.setOnChangeHandler(handler, scope);
};