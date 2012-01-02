var SpellCache = {};
SpellCache.elements = {};
SpellCache.set = function( spell ) { SpellCache.elements[spell.id] = spell; };
SpellCache.get = function( id ) { return SpellCache.elements[id];};
SpellCache.contains = function(id) { return SpellCache.elements[id] || false; };
/**
 * @param {number} id
 * @param {Handler} handler
 * @param {Array} args
 */
SpellCache.asyncGet = function(id,handler,args){
	if(SpellCache.get(id))
	{
		handler.notify(args);
	}
	else{
		Ajax.get(
			'php/interface/get_spell.php'+TextIO.queryString({ 'spell': id, 'lang': g_settings.language }),
			SpellCache.getHandler,
			[handler,args]
		);
	}
};
/**
 * @param {Array} spell
 * @param {Handler} handler
 * @param {Array} args
 */
SpellCache.asyncGet_callback = function( spell, handler, args ) {
	if ( spell != null ) 
	{
		SpellCache.set(new Spell(spell));
		handler.notify(args);
	}
};
SpellCache.getHandler = new Handler( SpellCache.asyncGet_callback, SpellCache );
