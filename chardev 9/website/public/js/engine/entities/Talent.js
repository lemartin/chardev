/** @const */var TALENT_REQ_ID_COUNT = 3;

/**
 * @constructor
 * @param {number} tree
 * @param {Array} serialized
 */
function Talent( tree, serialized ){
	var i;
	// deserialize
	this.spent = 0;
	this.id = serialized[0];
	this.tree = tree;
	this.row = serialized[1];
	this.col = serialized[2];
	//TODO make sure talents are always containing ALL spells, if a spell is missing throw error, so that no handling of missing spell is necessary here
	this.spells = new Array(5);
	this.ranks = 0;
	// spells
	for( i = 0; i < serialized[3].length; i++ ) { 
		if( serialized[3][i] ) {
			this.spells[i] = new Spell(serialized[3][i]);
			SpellCache.set(this.spells[i]);
			this.ranks++;
		}
		else {
			this.spells[i] = null;
		}
	}
	this.icon = this.spells[0].icon;
	this.requiredIds = serialized[4];
	this.requiredTalents = [null,null,null];
	
	this.petMasks = serialized[5];
}

Talent.prototype = {
	id: 0, spells: null, petMask: null, 
	ranks: 0, requiredIds: 0, spent: 0, 
	tree: 0, row: 0, col: 0, id: 0,
	requiredTalents: [], icon: "Temp",

	/** @returns {boolean} */
	areRequiredTalentsSet : function() {
		for( var i=0; i<TALENT_REQ_ID_COUNT; i++  ) {
			if( this.requiredTalents[i] != null && !this.requiredTalents[i].isFull() ) {
				return false;
			}
		}
		return true;
	},
	/**
	 * @param {number} index 
	 * @param {Talent} talent 
	 */
	setRequiredTalent : function( index, talent ) {
		this.requiredTalents[index] = talent;
	},
	/** @returns {string} */
	getName : function(){
		return (this.spells[0]?this.spells[0].name:null);
	},
	/** @returns {Spell} */
	getSpell : function(){
		return (this.spent==0?null:this.spells[this.spent-1]);
	},
	/** @returns {Spell} */
	getNextSpell : function(){
		return (this.spent==this.ranks?null:this.spells[this.spent]);
	},
	/** @returns {boolean} */
	isFull : function(){
		return (this.ranks==this.spent);
	},
	/** @returns {boolean} */
	isEmpty : function(){
		return (this.spent==0);
	},
	/**
	 * 
	 * @param {number} petId
	 * @param {number} petTalent
	 */
	isAvailableForPet : function(petId, petTalent)
	{
		if( petTalent == 4 )
		{
			if( petId == 3 || petId == 31 || petId == 35 || petId == 41 )
			{
				if(( this.petMasks[0] & 0x34000 || this.petMasks[0] == 0 ) && ( this.petMasks[1] & 0x80000000 || this.petMasks[1] == 0 ))
				{
					return true;
				}
				return false;
			}
	
			if(( this.petMasks[0] & 0x1441105 || this.petMasks[0] == 0 ))
			{
				return true;
			}
			return false;
		}
		if( petTalent == 1 )
		{
			if( petId == 7 || petId == 37 || petId == 44 )
			{
				if(( this.petMasks[0] & 0x810 || this.petMasks[0] == 0 ) && ( this.petMasks[1] & 0x10000000 || this.petMasks[1] == 0 ))
				{
					return true;
				}
				return false;
			}
			if(( this.petMasks[0] & 0x2882420 || this.petMasks[0] == 0 ) && ( this.petMasks[1] & 0xC000000 || this.petMasks[1] == 0 ))
			{
				return true;
			}
			return false;
		}
		return true;
	}
};