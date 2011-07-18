/**
 * @constructor
 * @param serialized
 * @returns {SpellClassOptions}
 */
function SpellClassOptions(serialized) {
	this._classId = serialized[0];
}
SpellClassOptions.prototype._classId = 0;
