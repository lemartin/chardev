/**
 * @constructor
 * @param {Array} serialized
 * @returns {ItemRandomProperty}
 */
function ItemRandomProperty( serialized ) {
	this._id = serialized[0];
	this._name = serialized[1];
	this._enchants = [];
	for( var j=0; j<5; j++) {
		if( serialized[2+j] ) {
			this._enchants[j] = new SpellItemEnchantment(serialized[2+j]);
		}
		else {
			this._enchants[j] = null;
		}
	}
	this._serialized = serialized;
}
ItemRandomProperty.prototype = new ItemRandomEnchantment;
/**
 * @returns {ItemRandomEnchantment}
 */
ItemRandomProperty.prototype.clone = function() {
	return new ItemRandomProperty(this._serialized);
};
