/**
 * @constructor
 * @param {Spell} spell
 * @param {Character} characterScope
 */
function SpellFacade( spell, characterScope ) {
	this.__spell = spell;
	this.__character = characterScope;
	this.name = spell.name;
	this.id = spell.id;
	this.icon = spell.icon;
}

SpellFacade.prototype = {
	__spell: null, __character: null, name:'', icon: '', id: '',
	getDescription: function() {
		this.__spell.setLevel(this.__character.level);
		return this.__spell.getDescription( this.__character );
	},
	getTooltip: function() {		
		return SpellTooltip.getHTML(this.__spell, this.__character, 0, null);
	},
	getExtendedTooltip: function( type, args) {		
		return SpellTooltip.getHTML(this.__spell, this.__character, type, args);
	}
};