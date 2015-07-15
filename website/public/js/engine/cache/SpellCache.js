var SpellCache = {
	elements: {},
	set: function( spell ) { SpellCache.elements[spell.id] = spell; },
	/**
	 * @param {number} id
	 * @returns {Spell}
	 */
	get: function( id ) { return SpellCache.elements[id];},
	contains: function(id) { return SpellCache.elements[id] || false; },
	/**
	 * @param {number} id
	 * @param {Handler} handler
	 * @param {Array} args
	 */
	asyncGet: function(id,handler,args){
		if(SpellCache.get(id))
		{
			handler.notify(args);
		}
		else{
			Ajax.get(
				'api/spell.php'+TextIO.queryString({ 'id': id, 'lang': g_settings.language }),
				SpellCache.getHandler,
				[handler,args]
			);
		}
	},
	/**
	 * @param {Array} spell
	 * @param {Handler} handler
	 * @param {Array} args
	 */
	asyncGet_callback: function( spell, handler, args ) {
		if ( spell != null ) 
		{
			SpellCache.set(new Spell(spell));
			handler.notify(args);
		}
	}
};
SpellCache.getHandler= new Handler( SpellCache.asyncGet_callback, SpellCache );
