/**
 * @constructor
 * @param {Character}
 *            character
 * @param {Array}
 *            serialized
 * @returns {Profession}
 */
function Profession(character, serialized) {
	this._id = serialized[0];
	this._name = serialized[1];
	this._description = serialized[2];
	this._buffSkills = [];

	for ( var i = 0; i < serialized[3].length; i++) {
		var bs = new SkillLineAbility(serialized[3][i]);
		if (bs) {
			this._buffSkills.push(bs);
			g_spells.set(bs._spell);
		}
	}

	this._character = character;

	this.setLevel(GameInfo.getMaximumProfessionLevel(this._id, character._level));
}
Profession.prototype._id = 0;
Profession.prototype._name = "";
Profession.prototype._description = "";
Profession.prototype._buffSkills = [];
Profession.prototype._level = 0;
Profession.prototype._character = null;

/**
 * @param {number}
 *            level
 */
Profession.prototype.setLevel = function(level) {
	var ml = GameInfo.getMaximumProfessionLevel(this._id,
			this._character._level);
	if (level > ml) {
		this._level = ml;
	} else {
		this._level = level;
	}
};

/** @private * */
Profession.prototype.onCharacterLevelChange = function() {
	this.setLevel(this._level);
};

/**
 * @returns {Spell}
 */
Profession.prototype.getBuffSpell = function() {
	var hl = 0;
	var b = null;
	for ( var i = 0; i < this._buffSkills.length; i++) {
		var s = this._buffSkills[i];
		if (s._requiredSkillLevel > hl && s._requiredSkillLevel <= this._level) {
			hl = s._requiredSkillLevel;
			b = s;
		}
	}
	return b != null ? b._spell : null;
};