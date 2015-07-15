
/**
 * @constructor
 * @param {Array} serialized
 * @returns {SkillLine}
 */
function SkillLine ( serialized ) {
	this._id = serialized[0];
	this._name = serialized[1];
	this._category = serialized[2];
}
SkillLine.prototype._id = 0;
SkillLine.prototype._name = "";
SkillLine.prototype._category = 0;

/**
 * @constructor
 * @param {Array} serialized
 * @returns {SkillLineAbility}
 */
function SkillLineAbility( serialized ) {
	this._id = serialized[0];
	this._spell = serialized[1] ? new Spell(serialized[1]) : null;
	this._raceMask = serialized[2];
	this._classMask = serialized[3];
	this._requiredSkillLevel = serialized[4]; 
	this._replaceSpellId = serialized[5];
}

SkillLineAbility.prototype._id = 0;
SkillLineAbility.prototype._spell = null;
SkillLineAbility.prototype._classMask =  0;
SkillLineAbility.prototype._raceMask =  0;
SkillLineAbility.prototype._requiredSkillLevel =  0;
SkillLineAbility.prototype._replaceSpellId =  0;