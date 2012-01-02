/**
 * @constructor
 * @returns {ItemContainer}
 */
function ItemContainer() {
	Container.call(this);
	this._getHandler = new Handler( this.asyncGet_callback, this );
}

ItemContainer.prototype = new Container;
ItemContainer.prototype._getHandler = null;

/**
 * 
 * @param {number} id
 * @param {Handler} handler
 * @param {Array} args
 */
ItemContainer.prototype.asyncGet = function(id,handler,args){
	if(this.get(id))
	{
		handler.notify(args);
	}
	else{
		Ajax.get(
			'php/interface/get_item.php'+TextIO.queryString({ 'item': id, 'lang': g_settings.language}),
			this._getHandler,
			[handler,args,this]
		);
		//Tooltip.showLoading();
	}
};

/**
 * @param {Array} itm
 * @param {Handler} handler
 * @param {Array} args
 * @param {ItemContainer} itemContainer
 */
ItemContainer.prototype.asyncGet_callback = function( itm, handler, args, itemContainer ) {
	if ( itm != null ) 
	{
		//Tooltip.enable();
		itemContainer.set(new Item(itm));
		handler.notify(args);
	}
};
