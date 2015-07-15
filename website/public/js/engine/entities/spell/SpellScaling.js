/**
 * @constructor
 * @param {Array} serialized
 */
function SpellScaling(serialized) {
	this.castTimeStart = serialized[0];
	this.castTimeEnd = serialized[1];
	this.intervals = serialized[2];
	this.distribution = serialized[3];
	this.coefficients = serialized[4];
	this.dices = serialized[5];
}
SpellScaling.prototype = {
	castTimeStart : 0,
	castTimeEnd : 0,
	intervals : 0,
	coefficients : 0,
	dices : 0,
	distribution : 0
};