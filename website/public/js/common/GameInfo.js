var GameInfo = {
	/**
	 * @param {number} chrClassId
	 * @returns {boolean}
	 */
	canDualWield : function(chrClassId)
	{
	    return ((1<<chrClassId & (1<<WARRIOR|1<<ROGUE|1<<HUNTER|1<<SHAMAN)) != 0);
	},
	
	/**
	 * @param {number} chrClassId
	 * @returns {boolean}
	 */
	canBlock : function(chrClassId)
	{
	    return ((1<<chrClassId & (1<<WARRIOR|1<<PALADIN|1<<SHAMAN)) != 0);
	},
	
	/**
	 * @param {number} chrClassId
	 * @returns {boolean}
	 */
	canParry : function(chrClassId)
	{
	    return ((1<<chrClassId & (1<<WARRIOR|1<<PALADIN|1<<ROGUE|1<<HUNTER|1<<DEATHKNIGHT)) != 0);
	},
	
	/**
	 * @param {number} chrClassId
	 * @param {number} shapeForm
	 * @returns {boolean}
	 */
	hasMana : function(chrClassId, shapeForm)
	{
	    return ( ((1<<chrClassId)&(1<<WARRIOR|1<<ROGUE|1<<DEATHKNIGHT|1<<HUNTER)) == 0 );
	},
	
	/**
	 * @param {number} chrClassId
	 * @param {number} shapeForm
	 * @returns {boolean}
	 */
	hasRage : function(chrClassId, shapeForm)
	{
	    return chrClassId == WARRIOR || chrClassId == DRUID && shapeForm == BEAR;
	},
	
	/**
	 * @param {number} chrClassId
	 * @param {number} shapeForm
	 * @returns {boolean}
	 */
	hasEnergy : function(chrClassId, shapeForm)
	{
		return chrClassId == ROGUE || chrClassId == DRUID && shapeForm == CAT;
	},
	
	/**
	 * @param {number} chrClassId
	 * @param {number} shapeForm
	 * @returns {boolean}
	 */
	hasFocus : function(chrClassId, shapeForm) {
		return chrClassId == HUNTER;
	},
	
	/**
	 * @param {number} chrClassId
	 * @param {number} shapeForm
	 * @returns {boolean}
	 */
	hasRunicPower : function(chrClassId, shapeForm ) {
		return chrClassId == DEATHKNIGHT;
	},
	
	/**
	 * @param {number} chrClassId
	 * @returns {boolean}
	 */
	couldDualWieldTwoHandedWeapons : function(chrClassId)
	{
		return (chrClassId == WARRIOR);
	},
	
	/**
	 * @param {number} slot
	 * @param {number} chrClassId
	 * @returns {boolean}
	 */
	isWeaponSlot : function(slot, chrClassId)
	{
		return slot == 16 || slot == 17 && GameInfo.canDualWield(chrClassId) || slot == 18 && ((1<<chrClassId) & (1<<WARRIOR|1<<ROGUE|1<<HUNTER)) != 0;
	},
	
	/**
	 * @param {number} chrClassId
	 * @param {number} shapeForm
	 * @returns {number}
	 */
	getEnergyType : function( chrClassId, shapeForm )
	{
		if( GameInfo.hasMana( chrClassId, shapeForm ) )
		{
			return MANA;
		}
		else if( GameInfo.hasRage( chrClassId, shapeForm ) )
		{
			return RAGE;
		}
		else if( GameInfo.hasEnergy( chrClassId, shapeForm ) )
		{
			return ENERGY;
		}
		else if( GameInfo.hasRunicPower(chrClassId, shapeForm) ) {
			return RUNICPOWER;
		}
		else if( GameInfo.hasFocus(chrClassId, shapeForm) ) {
			return FOCUS;
		}
		return NO_ENERGY;
	},
	
	/**
	 * @param {number} socketColor
	 * @returns {number}
	 */
	getMatchingGemSubClasses : function( socketColor ) {
		if( socketColor == 1 ) {
			return 1<<6;
		}
		else if( socketColor == 2 ) {
			return 1<<0|1<<3|1<<5|1<<8;
		}
		else if( socketColor == 4 ) {
			return 1<<2|1<<4|1<<5|1<<8;
		}
		else if( socketColor == 8 ) {
			return 1<<1|1<<3|1<<4|1<<8;
		}
		else if( socketColor == 32 ) {
			return 1<<10;
		}
		return 63 + 256;
	},
	
	/**
	 * @param {number} skillLineId
	 * @param {number} level
	 * @returns {number}
	 */
	getMaximumProfessionTier : function( skillLineId, level ) {
		if(level>=75){return 6;}
		if( skillLineId == 165 || skillLineId == 182 || skillLineId == 186 )
		{		
			if(level>=55){return 5;}		
			if(level>=40){return 4;}		
			if(level>=25){return 3;}
			if(level>=10){return 2;}	
			return 1;
		}
	
		if(level>=65){return 5;}
		if(level>=50){return 4;}
		if(level>=35){return 3;}
		if(level>=20){return 2;}
		if(level>=10){return 1;}
		if(level>=5){return 0;}
		return -1;
	},
	
	/**
	 * @param {number} skillLineId
	 * @param {number} level
	 * @returns {number}
	 */
	getMaximumProfessionLevel : function(skillLineId, level) {
		var mt = GameInfo.getMaximumProfessionTier( skillLineId, level );
		if( mt < 0 ) {
			return 0;
		}
	
		return ( mt + 1 ) * PROFESSION_LEVELS_PER_TIER;
	},
	
	/**
	 * @param {number} skillLineId
	 * @returns {boolean}
	 */
	isProfession : function(skillLineId ) {
		switch(skillLineId) {
		case 164:
		case 165:
		case 171:
		case 182:
		case 186:
		case 197:
		case 202:
		case 333:
		case 393:
		case 755:
		case 773:
			return true;
		default: 
			return false;
		}
	},
	getAvailabelGlyphSlots: function( level ) {
		return level < 25 ? 0 : (level < 50 ? 1 : (level < 75 ? 2 : 3));
	}
};