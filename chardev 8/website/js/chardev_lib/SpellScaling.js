/** 
 * @constructor
 * @param {Array} serialized
 * @returns {SpellScaling}
 */
function SpellScaling(serialized){
	this._castTimeStart = serialized[0];
	this._castTimeEnd = serialized[1];
	this._intervals = serialized[2];
	this._distribution = serialized[3];
	this._coefficients = serialized[4];
	this._dices = serialized[5];
}
SpellScaling.prototype._castTimeStart = 0;
SpellScaling.prototype._castTimeEnd = 0;
SpellScaling.prototype._intervals = 0;
SpellScaling.prototype._coefficients = 0;
SpellScaling.prototype._dices = 0;
SpellScaling.prototype._distribution = 0;