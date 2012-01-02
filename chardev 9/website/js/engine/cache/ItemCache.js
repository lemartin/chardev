
var ItemCache = {};
ItemCache.elements = {};
ItemCache.set = function( itm ) { ItemCache.elements[itm.id] = itm; };
ItemCache.get = function( id ) { return ItemCache.elements[id];};
ItemCache.contains = function(id) { return ItemCache.elements[id] || false; };
/**
 * @param {number} id
 * @param {Handler} handler
 * @param {Array} args
 */
ItemCache.asyncGet = function(id,handler,args){
	if(ItemCache.get(id))
	{
		handler.notify(args);
	}
	else{
		Ajax.get(	
			'php/interface/get_item.php'+TextIO.queryString({ 'item': id, 'lang': g_settings.language}),
			ItemCache.getHandler,
			[handler,args]
		);
	}
};
/**
 * @param {Array} itm
 * @param {Handler} handler
 * @param {Array} args
 */
ItemCache.asyncGet_callback = function( itm, handler, args ) {
	if ( itm != null ) 
	{
		ItemCache.set(new Item(itm));
		handler.notify(args);
	}
};
ItemCache.getHandler = new Handler( ItemCache.asyncGet_callback, ItemCache );