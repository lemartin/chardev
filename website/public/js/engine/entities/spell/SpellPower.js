/**
 * @constructor
 * @param {Array} serialized
 */
function SpellPower( serialized ) {
	this.type = serialized[0];
	this.absolute = serialized[1];
	this.relative = serialized[2];
}

SpellPower.prototype = {
		type: 0,
		absolute: 0,
		relative: 0
};