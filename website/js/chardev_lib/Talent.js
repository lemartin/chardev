/** @const */var TALENT_REQ_ID_COUNT = 3;

/**
 * @constructor
 * @param {Array} serialized
 * @returns {Talent}
 */
function Talent( serialized ){
	var i;
	// deserialize
	this._spent = 0;
	this._id = serialized[0];
	this._row = serialized[1];
	this._col = serialized[2];
	//TODO make sure talents are always containing ALL spells, if a spell is missing throw error, so that no handling of missing spell is necessary here
	this._spells = new Array(5);
	this._ranks = 0;
	// spells
	for( i = 0; i < serialized[3].length; i++ ) { 
		if( serialized[3][i] ) {
			this._spells[i] = new Spell(serialized[3][i]);
			g_spells.set(this._spells[i]);
			this._ranks++;
		}
		else {
			this._spells[i] = null;
		}
	}
	this._icon = this._spells[0]._icon;
	this._requiredIds = serialized[4];
	this._requiredTalents = [null,null,null];
	
	this._petMasks = serialized[5];
}

Talent.prototype._id = 0;
Talent.prototype._spells = null;
Talent.prototype._petMasks = null;
Talent.prototype._ranks = 0;
Talent.prototype._requiredIds = 0;
Talent.prototype._spent = 0;
Talent.prototype._row = 0;
Talent.prototype._col = 0;
Talent.prototype._id = 0;
Talent.prototype._requiredTalents = [];
Talent.prototype._icon = 'Temp';

/** @returns {boolean} */
Talent.prototype.areRequiredTalentsSet = function() {
	for( var i=0; i<TALENT_REQ_ID_COUNT; i++  ) {
		if( this._requiredTalents[i] != null && !this._requiredTalents[i].isFull() ) {
			return false;
		}
	}
	return true;
};


/**
 * @param {number} index 
 * @param {Talent} talent 
 */
Talent.prototype.setRequiredTalent = function( index, talent ) {
	this._requiredTalents[index] = talent;
};
/** @returns {string} */
Talent.prototype.getName = function(){
	return (this._spells[0]?this._spells[0].getName():null);
};;
/** @returns {Spell} */
Talent.prototype.getSpell = function(){
	return (this._spent==0?null:this._spells[this._spent-1]);
};
/** @returns {Spell} */
Talent.prototype.getNextSpell = function(){
	return (this._spent==this._ranks?null:this._spells[this._spent]);
};
/** @returns {boolean} */
Talent.prototype.isFull = function(){
	return (this._ranks==this._spent);
};
/** @returns {boolean} */
Talent.prototype.isEmpty = function(){
	return (this._spent==0);
};
/**
 * 
 * @param {number} petId
 * @param {number} petTalent
 */
Talent.prototype.isAvailable = function(petId, petTalent)
{
	if( petTalent == 4 )
	{
		if( petId == 3 || petId == 31 || petId == 35 || petId == 41 )
		{
			if(( this._petMasks[0] & 0x34000 || this._petMasks[0] == 0 ) && ( this._petMasks[1] & 0x80000000 || this._petMasks[1] == 0 ))
			{
				return true;
			}
			return false;
		}

		if(( this._petMasks[0] & 0x1441105 || this._petMasks[0] == 0 ))
		{
			return true;
		}
		return false;
	}
	if( petTalent == 1 )
	{
		if( petId == 7 || petId == 37 || petId == 44 )
		{
			if(( this._petMasks[0] & 0x810 || this._petMasks[0] == 0 ) && ( this._petMasks[1] & 0x10000000 || this._petMasks[1] == 0 ))
			{
				return true;
			}
			return false;
		}
		if(( this._petMasks[0] & 0x2882420 || this._petMasks[0] == 0 ) && ( this._petMasks[1] & 0xC000000 || this._petMasks[1] == 0 ))
		{
			return true;
		}
		return false;
	}
	return true;
};