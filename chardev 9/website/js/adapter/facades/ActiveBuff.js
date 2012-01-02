/**
 * @constructor
 * @param {Buff} buff
 * @param {Character} characterScope
 */
function ActiveBuff ( buff, characterScope) {
	this.__buff = buff;
	this.__characterScope = characterScope;
	this.id = buff.spell.id;
	this.icon = buff.spell.icon;
	this.stackable = buff.stackable;
}
ActiveBuff.prototype = {
	id: -1, icon: "", stackable: false, __buff: null,
	getStacks: function() {
		return this.__buff.stacks;
	},
	getTooltip: function() {
		return SpellTooltip.getHTML( this.__buff.spell, this.__characterScope, 0, null);
	}
};