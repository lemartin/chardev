/**
 * @constructor
 * @param {Array} serialized
 */
function ItemSet(serialized) {
	var i;
	//
	this.id = serialized[0];
	this.name = serialized[1];
	this.itemIds = serialized[2];
	this.bonuses = [];
	for (i = 0; i < serialized[3].length; i++) {
		this.bonuses[i] = (serialized[3][i] != null ? new Spell(
				serialized[3][i]) : null);
	}
	this.requiredPieces = serialized[4];
	this.itemCount = serialized[5];
	this.items = serialized[6]; // [[slot,normalized_name],...]
}
ItemSet.prototype = {
	id : 0,
	name : "",
	bonuses : [],
	requiredPieces : [],
	getActiveSpells : function(characterScope) {
		for ( var i = 0; i < 8; i++) {
			if (this.bonuses[i] != null
					&& characterScope.getEquippedSetItems(this.id) >= this.requiredPieces[i]) {
				characterScope.auras.add(this.bonuses[i]);
			}
		}
	}
};
