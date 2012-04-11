/**
 * @constructor
 * @param {Array} serialized
 */
function ItemRandomSuffix( serialized ) {
	this.id = 0 - serialized[0];
	this.name = serialized[1];
	this.enchants = [];
	for( var j=0; j<5; j++) {
		if( serialized[2+j] ) {
			this.enchants[j] = new SpellItemEnchantment(serialized[2+j][1]);
			this.enchants[j].setValue(serialized[2+j][0]);
		}
		else {
			this.enchants[j] = null;
		}
	}
	this.serialized = serialized;
}
ItemRandomSuffix.prototype = new ItemRandomEnchantment;
/**
 * @returns {ItemRandomEnchantment}
 */
ItemRandomSuffix.prototype.clone = function() {
		return new ItemRandomSuffix(this.serialized);
};