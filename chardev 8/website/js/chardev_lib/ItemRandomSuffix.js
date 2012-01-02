/**
 * @constructor
 * @param {Array} serialized
 * @returns {ItemRandomSuffix}
 */
function ItemRandomSuffix( serialized ) {
	this._id = 0 - serialized[0];
	this._name = serialized[1];
	this._enchants = [];
	for( var j=0; j<5; j++) {
		if( serialized[2+j] ) {
			this._enchants[j] = new SpellItemEnchantment(serialized[2+j][1]);
			this._enchants[j].setValue(serialized[2+j][0]);
		}
		else {
			this._enchants[j] = null;
		}
	}
	this._serialized = serialized;
}
ItemRandomSuffix.prototype = new ItemRandomEnchantment;
/**
 * @returns {ItemRandomEnchantment}
 */
ItemRandomSuffix.prototype.clone = function() {
	return new ItemRandomSuffix(this._serialized);
};