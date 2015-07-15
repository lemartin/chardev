/**
 * @constructor
 * @param {Array} serialized
 */
function SpellLevels( serialized ) {
	this.baseLevel = serialized[0];
	this.maximumLevel = serialized[1];
	this.spellLevel = serialized[2];
}

SpellLevels.prototype = {
	baseLevel: 0, 
	maximumLevel: 0,
	spellLevel: 0
};