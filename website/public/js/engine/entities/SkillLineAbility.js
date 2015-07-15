/**
 * @constructor
 * @param {Array} serialized
 */
function SkillLineAbility(serialized) {
	this.id = serialized[0];
	this.spell = serialized[1] ? new Spell(serialized[1]) : null;
	this.raceMask = serialized[2];
	this.classMask = serialized[3];
	this.requiredSkillLevel = serialized[4];
	this.replaceSpellId = serialized[5];
}
SkillLineAbility.prototype = {
	id : 0,
	spell : null,
	classMast : 0,
	raceMask : 0,
	requiredSkillLevel : 0,
	replaceSpellId : 0
};