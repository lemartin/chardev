/**
 * @constructor
 * @param {Array} serialized
 * @returns {SpellEquippedItems}
 */
function SpellEquippedItems ( serialized ) {
	this._classId = serialized[0];
	this._slotMask = serialized[1];
	this._subClassMask = serialized[2];
}
SpellEquippedItems.prototype._classId = 0;
SpellEquippedItems.prototype._slotMask = 0;
SpellEquippedItems.prototype._subClassMask = 0;