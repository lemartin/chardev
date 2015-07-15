/**
 * @constructor
 * @param {ItemRandomEnchantment} randomEnchant
 */
function AvailableItemRandomEnchantment( randomEnchant ) {
	this.id = randomEnchant.id;
	this.name = randomEnchant.name;
	
	this.description = "";
	for( var j=0; j<5; j++ ) {
		if( randomEnchant.enchants[j] ) {
			this.description += ( this.description ? ", " : "" ) + randomEnchant.enchants[j].description;
		}
	}
}

AvailableItemRandomEnchantment.prototype = {
	id: 0, name: "", description: ""
};