/**
 * @constructor
 * @param {Array} serialized
 */
function SpellShapeshift ( serialized ) {
	this.f2 = serialized[0];
	this.f3 = serialized[1];
	this.formId = serialized[2];
	this.f5 = serialized[3];
	this.f6 = serialized[4];
}
SpellShapeshift.prototype = {
	f2:0,f3:0,formId:0,f5:0,f6:0
};