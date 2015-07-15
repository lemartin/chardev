var ItemCache = {};
(function() {
	var elements = {};
	/**
	 * @param {Array} data
	 * @param {Handler} handler
	 */
	function asyncGetHandler( data, handler ) {
		if ( data != null ) 
		{
			var itm = new Item(data);
			ItemCache.set(itm);
			handler.notify([itm]);
		}
	}
	/**
	 * @param {number} id 
	 */
	ItemCache.get = function( id ) {
		return elements[id];
	};
	/**
	 * @param {Item} itm
	 */
	ItemCache.set = function( itm ) {
		elements[itm.id] = itm.clone();
	};
	/**
	 * @param {number} id 
	 */
	ItemCache.contains = function(id) { 
		return elements[id] || false; 
	};
	/**
	 * @param {number} id
	 * @param {Handler} handler
	 */
	ItemCache.asyncGet = function( id, handler ){
		var itm = ItemCache.get(id);
		if(itm) {
			handler.notify([itm]);
		}
		else {
			Ajax.get(	
				'/api/item.php'+TextIO.queryString({ 'id': id }),
				new Handler(asyncGetHandler, this),
				[handler]
			);
		}
	};
})();