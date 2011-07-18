/**
 * @constructor
 * @param serialized
 * @returns {GemProperties}
 */
function GemProperties ( serialized ) {
	this._enchant = new SpellItemEnchantment( serialized[0]);
	this._reqItemLevel = serialized[1];
}
/** @type {SpellItemEnchantment} */
GemProperties.prototype._enchant = null;
/** @type {number} */
GemProperties.prototype._reqItemLevel = 0;