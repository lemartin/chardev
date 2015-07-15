var SpellCache = {};
(function() {
	var elements = {};
	/**
	 * @param {Array} data
	 * @param {Handler} handler
	 */
	function asyncGetHandler( data, handler ) {
		if ( data !== null ) 
		{
			var spell = new Spell(data);
			SpellCache.set(spell);
			handler.notify([spell]);
		}
	}
	/**
	 * @param {number} id 
     * @return {Spell}
	 */
	SpellCache.get = function( id ) {
		return typeof elements[id] === "undefined" ? null : elements[id];
	};
	/**
	 * @param {Spell} spell
	 */
	SpellCache.set = function( spell ) {
		elements[spell.id] = spell.clone();
	};
	/**
	 * @param {number} id 
     * @return {boolean}
	 */
	SpellCache.contains = function(id) { 
		return typeof elements[id] === "undefined" ? false : true; 
	};
	/**
	 * @param {number} id
	 * @param {Handler} handler
	 */
	SpellCache.asyncGet = function( id, handler ){
		var spell = SpellCache.get(id);
		if(spell) {
			handler.notify([spell]);
		}
		else {
			Ajax.get(	
				'/api/spell.php'+TextIO.queryString({ 'id': id }),
				new Handler(asyncGetHandler, this),
				[handler]
			);
		}
	};
})();