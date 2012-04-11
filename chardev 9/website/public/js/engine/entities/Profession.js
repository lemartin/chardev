/**
 * @constructor
 * @param {Character}
 *            character
 * @param {Array}
 *            serialized
 */
function Profession(character, serialized) {
	this.id = serialized[0];
	this.name = serialized[1];
	this.description = serialized[2];
	this.buffSkills = [];

	for ( var i = 0; i < serialized[3].length; i++) {
		var bs = new SkillLineAbility(serialized[3][i]);
		if (bs) {
			this.buffSkills.push(bs);
			SpellCache.set(bs.spell);
		}
	}

	this.character = character;

	this.setLevel(GameInfo.getMaximumProfessionLevel(this.id, character.level));
}

Profession.prototype = {
	id:0, name:"", description: "", buffSkills: [], level: 0, chararcter: null,
	/**
	 * @param {number} level
	 */
	setLevel : function(level) {
		var ml = GameInfo.getMaximumProfessionLevel(this.id, this.character.level);
		if (level > ml) {
			this.level = ml;
		} else {
			this.level = level;
		}
	},
	/**
	 * @returns {Spell}
	 */
	getBuffSpell : function() {
		var hl = 0;
		var b = null;
		for ( var i = 0; i < this.buffSkills.length; i++) {
			var s = this.buffSkills[i];
			if (s.requiredSkillLevel > hl && s.requiredSkillLevel <= this.level) {
				hl = s.requiredSkillLevel;
				b = s;
			}
		}
		if( b == null ) {
			return null;
		}
		return b.spell;
	}
};
///** @private * */
//Profession.prototype.onCharacterLevelChange = function() {
//	this.setLevel(this.level);
//};