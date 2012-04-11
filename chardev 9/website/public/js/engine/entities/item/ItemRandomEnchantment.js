/**
 * @constructor
 */
function ItemRandomEnchantment() {
	/* do nothing */
}

ItemRandomEnchantment.prototype = {
	id : 0,
	name : "",
	enchants : [],
	serialized : [],
	/**
	 * @returns {ItemRandomEnchantment}
	 */
	clone : function() {
		return null;
	}
};