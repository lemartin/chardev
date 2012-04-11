/**
 * @constructor
 * @param {string} name
 * @param {string} icon
 * @param {Character} character
 * @param {Spell} spell
 */
function AvailableBuff( name, icon,  spell, character ) {
	this.spell = new SpellFacade(spell, character);
	this.name = name;
	this.icon = icon;
}

AvailableBuff.fromItem = function( itm, character ) {
	if( itm.spells[0] != null && itm.spells[0].getTriggeredSpell() ) {
		return new AvailableBuff(
			itm.name,
			itm.icon,
			itm.spells[0].getTriggeredSpell(),
			character
		);
	}
	else {
		return null;
	}
};

AvailableBuff.fromSpell = function( spell, character ) {
	return new AvailableBuff( spell.name, spell.icon, spell, character);
};

AvailableBuff.prototype = {
	spell: null,
	name: "",
	icon: ""
};