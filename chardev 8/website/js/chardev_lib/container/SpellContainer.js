/**
 * @constructor
 * @returns {SpellContainer}
 */
function SpellContainer() {
	Container.call(this);
	this._getHandler = new Handler( this.asyncGet_callback, this );
}

SpellContainer.prototype = new Container;
ItemContainer.prototype._getHandler = null;

/**
 * @param {number} id
 * @param {Handler} handler
 * @param {Array} args
 */
SpellContainer.prototype.asyncGet = function(id,handler,args){
	if(this.get(id))
	{
		handler.notify(args);
	}
	else{
		Ajax.get(
			'php/interface/get_spell.php'+TextIO.queryString({ 'spell': id, 'lang': g_settings.language }),
			this._getHandler,
			[handler,args,this,id]
		);
		//Tooltip.showLoading();
	}
};

/**
 * @param {Array} spell
 * @param {Handler} handler
 * @param {Array} args
 * @param {SpellContainer} spellContainer
 */
SpellContainer.prototype.asyncGet_callback = function( spell, handler, args, spellContainer, id )
{
	if ( spell != null ) 
	{
		//Tooltip.enable();
		spellContainer.set(new Spell(spell));
		handler.notify(args);
	}
	else {
		throw 'SpellContainer::asyncGet failed! Requested Spell #'+id;
	}
};
