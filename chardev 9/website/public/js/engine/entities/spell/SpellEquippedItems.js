/**
 * @constructor
 * @param {Array} serialized
 */
function SpellEquippedItems ( serialized ) {
	this.classId = serialized[0];
	this.slotMask = serialized[1];
	this.subClassMask = serialized[2];
}
SpellEquippedItems.prototype = {
		classId: 0, slotMask: 0, subClassMask: 0
};