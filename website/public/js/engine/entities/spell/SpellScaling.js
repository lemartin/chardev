/**
 * @constructor
 * @param {Array} serialized
 */
function SpellScaling(serialized) {
	this.castTimeStart = serialized[0];
	this.castTimeEnd = serialized[1];
	this.intervals = serialized[2];
	this.distribution = serialized[3];
}
SpellScaling.prototype = {
	castTimeStart : 0,
	castTimeEnd : 0,
	intervals : 0,
	distribution : 0
};