/**
 * @constructor
 * @param {Character} character
 * @param {Object} serialized
 */
function CharacterRace ( character, serialized ) {
	this.character = character;
	this.id = serialized[0];
	this.name = serialized[1];
	this.racials = []; //SkillLineAbility
	for(var i=0;i<serialized[2].length;i++){
		this.racials[i] = new SkillLineAbility(serialized[2][i]);
	}
	
	if( 1<<this.id & (1<<1|1<<3|1<<4|1<<7|1<<11|1<<22) ) {
		this.isAlliance = true;
	}
}

CharacterRace.prototype = {
	id: 0, 
	character: null, 
	name: "", racials: [], 
	isAlliance: 
	false,
	/**
	 * @param {Auras} auras
	 */
	getActiveSpells: function(auras){
		// check ClassMask and add then to auras
		var cr,cc;
		for(var i=0;i<this.racials.length;i++){
			cr = this.racials[i];
			if( cr.spell == null ) {
				continue;
			}
			cc = this.character.chrClass;
			if( 
				cc != null && 
				(1<<(cc.id-1)) & cr.classMask 
				|| 
				cr.classMask <= 0 
			) 
			{
				auras.add(cr.spell);
			}
		}
	},
	toString: function(){
		return "CharacterRace ("+this.name+","+this.racials+")";
	},
	isValidCharacterClass: function( chrClassId ) {
		switch( this.id ) {
			case DRAENEI: return chrClassId != DRUID && chrClassId != WARLOCK && chrClassId != ROGUE;
			case DWARF: return chrClassId != DRUID;
			case GNOME: return chrClassId != DRUID && chrClassId != HUNTER && chrClassId != PALADIN && chrClassId != SHAMAN;
			case HUMAN: return chrClassId != DRUID && chrClassId != SHAMAN;
			case NIGHTELF: return chrClassId != PALADIN && chrClassId != SHAMAN && chrClassId != WARLOCK;
			case WORGEN: return chrClassId != PALADIN && chrClassId != SHAMAN;
			case BLOODELF: return chrClassId != DRUID && chrClassId != SHAMAN;
			case GOBLIN: return chrClassId != DRUID && chrClassId != PALADIN;
			case ORC: return chrClassId != DRUID && chrClassId != PRIEST;
			case TAUREN: return chrClassId != MAGE && chrClassId != ROGUE && chrClassId != WARLOCK;
			case TROLL: return chrClassId != PALADIN;
			case FORSAKEN: return chrClassId != DRUID && chrClassId != PALADIN && chrClassId != SHAMAN;
		}
		return false;
	}
};