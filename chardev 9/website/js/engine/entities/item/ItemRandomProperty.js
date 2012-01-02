/**
 * @constructor
 * @param {Array} serialized
 */
function ItemRandomProperty( serialized ) {
	this.id = serialized[0];
	this.name = serialized[1];
	this.enchants = [];
	for( var j=0; j<5; j++) {
		if( serialized[2+j] ) {
			this.enchants[j] = new SpellItemEnchantment(serialized[2+j]);
		}
		else {
			this.enchants[j] = null;
		}
	}
	this.serialized = serialized;
}
ItemRandomProperty.prototype = new ItemRandomEnchantment;
/**
 * @returns {ItemRandomEnchantment}
 */
ItemRandomProperty.prototype.clone = function() {
		return new ItemRandomProperty(this.serialized);
};
