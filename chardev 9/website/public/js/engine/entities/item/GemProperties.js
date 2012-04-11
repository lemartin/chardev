/**
 * @constructor
 * @param serialized
 */
function GemProperties ( serialized ) {
	this.enchant = new SpellItemEnchantment( serialized[0]);
	this.reqItemLevel = serialized[1];
}
/** @type {SpellItemEnchantment} */
GemProperties.prototype.enchant = null;
/** @type {number} */
GemProperties.prototype.reqItemLevel = 0;