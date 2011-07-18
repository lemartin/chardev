/**
 * @constructor
 * @param {Array} serialized
 * @returns {ItemSet}
 */
function ItemSet( serialized ) {
	var i;
	//
	this._id = serialized[0];
	this._name = serialized[1];
	this._itemIds = serialized[2];
	this._bonuses = [];
	for( i = 0; i < serialized[3].length; i++ ) {
		this._bonuses[i] = ( serialized[3][i] != null ? new Spell(serialized[3][i]) : null );
	}
	this._requiredPieces = serialized[4];
	this._itemCount = serialized[5];
	this._items = serialized[6]; // [[slot,normalized_name],...]
}
ItemSet.prototype._id = -1;
ItemSet.prototype._name = "";
ItemSet.prototype._itemIds = [];
ItemSet.prototype._bonuses = [];
ItemSet.prototype._requiredPieces = [];
/**
 * @param {Character} characterScope
 */
ItemSet.prototype.getActiveSpells = function(characterScope)
{	
	for (var i = 0; i < 8; i++) 
	{
		if ( this._bonuses[i] != null && characterScope._inventory.getEquippedSetItems( this._id ) >= this._requiredPieces[i] ) 
		{
			characterScope._auras.add(this._bonuses[i]);
		}
	}
};
