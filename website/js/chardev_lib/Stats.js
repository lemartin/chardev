/**
 * @constructor
 * @param {Character} character
 * @returns {Stats}
 */
function Stats( character ){
	this._character = character;
	this._reset();
	this.__started = false;
}
/** @type {Character} */
Stats.prototype._character = null;
Stats.prototype._general = [];
Stats.prototype._attributes = [];
Stats.prototype._baseAttributes = [];
Stats.prototype._apFromAttributes = [];
Stats.prototype._spFromAttributes = [];
Stats.prototype._critFromAttributes = [];
Stats.prototype._spellCritFromAttributes = [];
Stats.prototype._ratings = [];
Stats.prototype._resisSchool = [];
Stats.prototype._resistance = [];
Stats.prototype._melee = [];
Stats.prototype._spell = [];
Stats.prototype._defense = [];
Stats.prototype._coefficients = [];

Stats.prototype._statPerCentModifier = [];

Stats.prototype._health = 0;
Stats.prototype._mana = 0;
Stats.prototype._baseHealth = 0;
Stats.prototype._baseMana = 0;

Stats.prototype._spellPower = 0;
Stats.prototype._spellHasteRating = 0;
Stats.prototype._spellHaste = 0;
Stats.prototype._spellHitRating = 0;
Stats.prototype._spellHit = 0;
Stats.prototype._sp5 = 0;
Stats.prototype._mp5 = 0;
Stats.prototype._spellCritRating = 0;
Stats.prototype._spellCrit = 0;
Stats.prototype._spellPenetrations = [];

Stats.prototype._manaFromInt = 0;
Stats.prototype._healthFromSta = 0;
Stats.prototype._manaRegenFromSpi = 0;

Stats.prototype._masteryRating = 0; 
Stats.prototype._mastery = 0;

Stats.prototype._apPerCentModifer = 0;
Stats.prototype._attackPower = 0;
Stats.prototype._additionalAttackPower = 0;
Stats.prototype._meleeHaste = 0;
Stats.prototype._meleeHasteRating = 0;
Stats.prototype._meleeHasteFromRating = 0;

Stats.prototype._meleeHitRating = [];
Stats.prototype._meleeHit = [];
Stats.prototype._meleeCritRating = [];
Stats.prototype._meleeCrit = [];
Stats.prototype._expertiseRating = [];
Stats.prototype._expertise = [];

Stats.prototype._mhMinDmg = 0;
Stats.prototype._mhMaxDmg = 0;
Stats.prototype._mhSpeed = 0;

Stats.prototype._ohMinDmg = 0;
Stats.prototype._ohMaxDmg = 0;
Stats.prototype._ohSpeed = 0;

Stats.prototype._rangedAttackPower = 0;
Stats.prototype._rangedHaste = 0;
Stats.prototype._rangedHasteRating = 0;
Stats.prototype._rangedHasteFromRating = 0;
Stats.prototype._rangedCrit = 0;
Stats.prototype._rangedCritRating = 0;
Stats.prototype._rangedHit = 0;
Stats.prototype._rangedHitRating = 0;

Stats.prototype._raMinDmg = 0;
Stats.prototype._raMaxDmg = 0;
Stats.prototype._raSpeed = 0;
Stats.prototype._raDps = 0;

Stats.prototype._parryRating = 0;
Stats.prototype._dodgeRating = 0;
Stats.prototype._dodge = 0;
Stats.prototype._parry = 0;
Stats.prototype._block = 0;
Stats.prototype._itemLevel = 0;
Stats.prototype._armorModPerCent = 0;
Stats.prototype._resilienceRating = 0;
Stats.prototype._resilienceDamageReduction = 0;

Stats.prototype._hitTillMeleeCap = 0;
Stats.prototype._expTillDodgeCap = 0;
Stats.prototype._expTillParryCap = 0;

Stats.prototype.__started = false;

/**
 * @private 
 */
Stats.prototype._reset = function() {
	var i;
	this._general = [0,0,0,0,0,0,0];
	this._attributes = [0,0,0,0,0];
	this._baseAttributes = [0,0,0,0,0];
	this._apFromAttributes = [0,0,0,0,0];
	this._spFromAttributes = [0,0,0,0,0];
	this._critFromAttributes = [0,0,0,0,0];
	this._spellCritFromAttributes = [0,0,0,0,0];
	
	this._ratings = [];
	for( i=0; i<CALC_RATINGS; i++ ) {
		this._ratings[i] = 0;
	}
	this._melee = [0,0,0,0,0,0,0,0,0,0];
	this._ranged = [0,0,0,0,0,0,0,0];
	this._spell = [0,0,0,0,0,0,0,0];
	this._defense = [0,0,0,0,0];
	this._resistance = [0,0,0,0,0];
	
	this._health = 0;
	this._mana = 0;
	this._baseMana = 0;
	this._baseHealth = 0;
	
	this._spellPower = 0;
	this._spellHasteRating = 0;
	this._spellHaste = 0;
	this._spellHitRating = 0;
	this._spellHit = 0;
	this._spellPenetrations = [];
	this._sp5 = 0;
	this._mp5 = 0;
	this._spellCritRating = 0;
	this._spellCrit = 0;
	
	this._manaFromInt = 0;
	this._healthFromSta = 0;
	this._manaRegenFromSpi = 0;
	
	this._apPerCentModifer = 0;
	this._attackPower = 0;
	this._additionalAttackPower = 0;
	
	this._meleeHaste = 0;
	this._meleeHasteRating = 0;
	this._meleeHasteFromRating = 0;

	this._meleeHitRating = [0,0,0];
	this._meleeHit = [0,0,0];
	this._meleeCritRating = [0,0,0];
	this._meleeCrit = [0,0,0];
	

	this._rangedHaste = 0;
	this._rangedHasteRating = 0;
	this._rangedHasteFromRating = 0;
	this._rangedCrit = 0;
	this._rangedCritRating = 0;
	this._rangedHit = 0;
	this._rangedHitRating = 0;
	
	this._expertiseRating = [0,0,0,0];
	this._expertise = [0,0,0,0];
	
	this._masteryRating = 0; 
	this._mastery = 0;
	
	this._mhMinDmg = 0;
	this._mhMaxDmg = 0;
	this._mhSpeed = 0;
	this._mhDps = 0;
	
	this._ohMinDmg = 0;
	this._ohMaxDmg = 0;
	this._ohSpeed = 0;
	this._ohDps = 0;
	
	this._parryRating = 0;
	this._dodgeRating = 0;
	this._dodge = 0;
	this._parry = 0;
	this._block = 0;
	this._armorModPerCent = 0;
	this._resilienceRating = 0;
	this._resilienceDamageReduction = 0;
	
	this._rangedAttackPower = 0;
	this._raMinDmg = 0;
	this._raMaxDmg = 0;
	this._raSpeed = 0;
	this._raDps = 0;
	
	this._hitTillMeleeCap = 0;
	
	for( i=0; i<MAGIC_SCHOOLS; i++ ) {
		this._spellPenetrations[i] = 0;
	}
	for( i=0; i<DAMAGE_SCHOOLS; i++ ) {
		this._resisSchool[i] = 0;
	}
	this._itemLevel = 0;
	
	this._statPerCentModifier = [0,0,0,0,0,0,0,0];
};

/**
 * @param {number} level
 * @returns {number}
 */
Stats.prototype.getReductionFromArmor = function(level){
	if( level >= 81) {
		return this._defense[0] / ( this._defense[0] + 2167.5 * level - 158167.5 );
	}
	if( level >= 60 ) {
		return this._defense[0] / ( this._defense[0] + 467.5 * level - 22167.5 );
	}
	return this._defense[0] / ( this._defense[0] + 85 * level + 400 );
};

/**
 * @param {number} _v
 * @param {number} chrClassId
 * @returns {number}
 */
Stats.prototype.deminishingReturnDodge = function(_v, chrClassId){
	return 1 / (DIMINISHING_K[chrClassId-1] / _v + (DIMINISHING_CD[chrClassId-1] ? 1 / DIMINISHING_CD[chrClassId-1] : 0));
};
/**
 * @param {number} _v
 * @param {number} chrClassId
 * @returns {number}
 */
Stats.prototype.deminishingReturnParry = function(_v, chrClassId){
	return 1 / (DIMINISHING_K[chrClassId-1] / _v + (DIMINISHING_CP[chrClassId-1] ? 1 / DIMINISHING_CP[chrClassId-1] : 0));
};
/**
 * @param {boolean} preview
 */
Stats.prototype.calculate = function( preview, noBuffs  ) {
	//
	//	prevent cascading calculations
	//
	if( this.__started ) {
		throw "Concurring calls of Stats::calculate";
	}
	this.__started = true;
	//
	//
	//
	this._character._inventory.updateGemCount();
	//
	var i, j, itm, tmp, enchant, itemCount = 0;
	
	var inv = this._character._inventory;
	var wearsAWeaponInOffhand = inv.get(17) != null && inv.get(17)._class == 2;
	var wearsRangedWeapon = inv.get(18) != null && inv.get(18)._class == 2;
	
	var level = this._character._level;
	var effects = this._character._auras.getEffects(noBuffs);
	var baseEffects = effects[0];
	var mhEffects = effects[1];
	var ohEffects = effects[2];
	var raEffects = effects[3];
	
	var raceId = this._character._chrRace == null ? 0 : this._character._chrRace._id;
	
	var chrClass = this._character._chrClass;
	var hasClass = false;
	var classId  = 0; 
	var shapeForm = 0;
	var selectedTree = -1;
	var baseStats = null;
	var baseStatsLevel = null;
	
	if( chrClass ) {
		hasClass = true;
		classId = chrClass._id;
		shapeForm = chrClass._shapeForm;
		selectedTree = chrClass._talents._selectedTree;
		baseStats = chrClass._baseStats;
		if( baseStats[level] ) {
			baseStatsLevel =  baseStats[level];
		}
	}
		
	var baseAttributesUnmodified = [0,0,0,0,0];
	var ap_array = AP_PER_STAT[classId];
	
	if( classId == DRUID && shapeForm > 0 ) {
		switch( shapeForm ) {
		case CAT:	
			ap_array = AP_PER_STAT_CAT;
			break;
		case BEAR:	
			ap_array = AP_PER_STAT_BEAR;
			break;
		case MOONKIN:	
			ap_array = AP_PER_STAT_MOONKIN;
			break;
		}
	}
	
	this._reset();
	
	if( !hasClass || !baseStatsLevel ) {
		baseStatsLevel = [0,0,0,0,0,0,0,0,0,0,0];
	}

	this._baseHealth = baseStatsLevel[5];
	this._baseMana = baseStatsLevel[6];
	
	for( i = 0; i < 5; i++ ) {	
		baseAttributesUnmodified[i] = ( RACE_ATTRIBUTES[raceId][i] + ( hasClass ? baseStatsLevel[i] : 0 ));
		this._baseAttributes[i] = Math.floor(baseAttributesUnmodified[i] * ( 1 + baseEffects[137][i]/100 ));
	}
	//
	//#########################################################################
	//
	//	HARDCODED EFFECTS
	//
	//#########################################################################
	//
	//
	//	Feral swiftness
	//
	if( shapeForm == CAT || shapeForm == BEAR || shapeForm == DIRE_BEAR ) {
	// 		Rank 1
		if( this._character._auras.isActive(17002) ) {
			baseEffects[49] += 2;
		}
	//		Rank 2
		else if( this._character._auras.isActive(24866) ) {
			baseEffects[49] += 4;
		}
	}
	//
	//	Master shapeshifter +4% crit in cat form
	//
	if( this._character._auras.isActive(48411) ) {
		if( shapeForm == CAT ) {
			baseEffects[290] += 4;
		}
		//
		//						+4% physical damage in bear form
		//
		if( shapeForm == BEAR || shapeForm == DIRE_BEAR ) {
			baseEffects[79][0] += 4;
		}
	}
	//
	//#########################################################################
	//
	
	// Item Stats
	
	this._armorModPerCent = baseEffects[142][0]/100;
	
	for( i = 0; i < INV_ITEMS; i++) {
		var hasBSSocket = this._character.hasBlacksmithingSocket(i);
		
		itm = preview ? inv.get(i) : inv._items[i][0];
		if( itm == null ) {
			continue;
		}
		itm.setStats(level);
		if( i!=5 && i!=6 ) {
			itemCount++;
			this._itemLevel += itm._level;
		}
		this._getItemStats(itm);
		for( j=0; j<3; j++ ) {
			if( itm._gems[j] ) {
				
				if( itm._socketColors[j] <= 0 ) {
					if( ! hasBSSocket ) {
						continue;
					}
					else {
						hasBSSocket = false;
					}
				}

				this._getEnchantStats(itm._gems[j]._gemProperties._enchant);
			}
		}
		if( itm.isSocketBonusActive() ) {
			this._getEnchantStats(itm._socketBonus);
		}
		for( j=0; j<itm._enchants.length; j++ ) {
			enchant = itm._enchants[j];
			if( enchant != null ) {
				this._getEnchantStats( enchant );
			}
		}
		if( itm._selectedRandomEnchantment ) {
			var es = itm._selectedRandomEnchantment._enchants;
			for(j=0; j<5; j++ ) {
				enchant = es[j];
				if( enchant != null ) {
					this._getEnchantStats( enchant );
				}
			}
		}
	}
	this._resisSchool[0] = Math.round( (this._resisSchool[0] + baseEffects[22][0] + baseEffects[143][0] ) * (1 + baseEffects[101][0]/100) );
	
	for( i = 1; i < this._resisSchool.length; i++ ) {
		this._resisSchool[i] = Math.round( ( this._resisSchool[i] + baseEffects[22][i] + baseEffects[143][i] ) * ( 1 + baseEffects[142][i]/100 ) );
	}
	this._itemLevel = itemCount > 0 ? this._itemLevel / itemCount : 0;
	//
	//#########################################################################
	//
	// Aura Stats
	//
	//#########################################################################
	//
	this._statPerCentModifier = [
        0,
		baseEffects[133],
		baseEffects[132],
		baseEffects[137][1],
		baseEffects[137][0],
		baseEffects[137][3],
		baseEffects[137][4],
		baseEffects[137][2]
	];
	
	for( i = 0; i < 5; i++ ) {
		this._attributes[i] += baseEffects[29][i];
		this._attributes[i] *= 1 + baseEffects[137][i]/100;
		this._attributes[i] += this._baseAttributes[i] ;
		this._attributes[i] = Math.floor(this._attributes[i]);
		// TODO shapeform
		if( ap_array[i] > 0 ) {
			this._apFromAttributes[i] =  this._attributes[i] >= 10 * ap_array[i] ? this._attributes[i] * ( baseEffects[268][i] / 100 +  ap_array[i] ) - 10 * ap_array[i] : 0; 
		}
		// 
		for( j=0; j<32; j++ ) {
			this._ratings[j] += Math.floor(baseEffects[220][j][i]/100 * ( this._attributes[i] - baseAttributesUnmodified[i] ));
		}
	}

	this._critFromAttributes[1] 		+= BASE_MELEE_CRIT[classId] * 100 + this._attributes[1] * baseStatsLevel[7];
	this._spellCritFromAttributes[3] 	+= BASE_SPELL_CRIT[classId] * 100 + this._attributes[3] * baseStatsLevel[8];
	//
	//	Expertise
	//
	this._expertiseRating[0] = this._ratings[26];
	//
	for( i=0; i<4; i++ ) {
		this._expertiseRating[i] += effects[i][189][23];
		this._expertise[i] += 
			this._expertiseRating[i] / COMBAT_RATINGS[23][level-1] + 
			effects[i][240];
		if( i> 0 ) {
			this._expertise[i] += this._expertise[0];
			this._expertiseRating[i] += this._expertiseRating[0];
		}
	}
	//
	//		till cap
	//
	this._expTillDodgeCap = Math.ceil(( ENEMY_DODGE[3] - this._expertise[1] * EXPERTISE_TO_CHANCE ) * COMBAT_RATINGS[23][level-1] / EXPERTISE_TO_CHANCE );
	this._expTillParryCap = Math.ceil(( ENEMY_PARRY[3] - this._expertise[1] * EXPERTISE_TO_CHANCE ) * COMBAT_RATINGS[23][level-1] / EXPERTISE_TO_CHANCE );
	//
	// 	Mastery
	//
	if( level >= 80 ) {
		this._masteryRating = this._ratings[38] + baseEffects[189][25];
		
		if( classId == WARRIOR && chrClass._talents._selectedTree == 1 ) {
			this._mastery = 2 + this._masteryRating / COMBAT_RATINGS[25][level-1];
		}
		else if( classId == MAGE && chrClass._talents._selectedTree == 2 ) {
			this._mastery = 2 + this._masteryRating / COMBAT_RATINGS[25][level-1];
		}
		else {
			this._mastery = 8 + this._masteryRating / COMBAT_RATINGS[25][level-1];
		}
	}
	//#########################################################################
	//
	// 	GENERAL
	//
	//#########################################################################
	//
	this._healthFromSta = ( level < 80 ? 10 : 10 + (level - 80) * 0.8 )  * Math.max( 0, this._attributes[2] - 20 ) + ( this._attributes[2] >= 20 ? 20 : this._attributes[2] );
	this._health = this._healthFromSta + this._baseHealth * ( 1 + baseEffects[282] / 100 ) + baseEffects[34] + baseEffects[230] ;
	this._health*= 1 + baseEffects[133]/100;
	//
	this._manaFromInt = 15 * Math.max( 0, this._attributes[3] - 20 ) + ( this._attributes[3] >= 20 ? 20 : this._attributes[3] );
	this._mana = this._manaFromInt + this._baseMana + baseEffects[35][0];
	this._mana*= 1 + baseEffects[132]/100;
	//
	//#########################################################################
	//
	//	HASTE
	//
	//#########################################################################
	//
	this._meleeHasteRating = this._ratings[17] + this._ratings[25] + baseEffects[189][17];
	this._meleeHasteFromRating = this._meleeHasteRating / COMBAT_RATINGS[17][level-1];
	//
	this._rangedHasteRating = this._ratings[18] + this._ratings[25] + baseEffects[189][18];
	this._rangedHasteFromRating = this._rangedHasteRating / COMBAT_RATINGS[18][level-1];
	//
	//#########################################################################
	//
	//	ATTACK POWER
	//
	//#########################################################################
	//
	//		Melee
	//
	this._additionalAttackPower = baseEffects[99] + this._ratings[27];
	this._attackPower += this._additionalAttackPower;
	this._apPerCentModifer += baseEffects[166];
	//
	this._attackPower+= AP_PER_LEVEL[classId] * level; // BASE_AP[classId] removed
	for ( i = 0; i < 5; i++) 
	{
		this._attackPower += this._apFromAttributes[i];			
	}
	//
	this._additionalAttackPower *= (1 + this._apPerCentModifer/100);
	this._attackPower *= (1 + this._apPerCentModifer/100);
	//
	//		Ranged
	//
	this._rangedAttackPower = baseEffects[124] + this._ratings[27] + RAP_PER_AGI[classId] * this._attributes[1] + RAP_PER_LVL[classId] * level + RAP_BASE[classId] ;
	for( i=0;i<5;i++){
		this._rangedAttackPower += this._attributes[i] * ( baseEffects[212][i]/100 );
	}
	this._rangedAttackPower *= (1 + baseEffects[167]/100);
	//
	//#########################################################################
	//
	//	CRIT AND HIT
	//
	//#########################################################################
	//
	//-------------------------------------------------------------------------
	//	MELEE
	//-------------------------------------------------------------------------
	//	Item independant / main hand / off-hand switch 
	//
	// 		Hit
	this._meleeHitRating[0] = this._ratings[5] + this._ratings[20];
	// 		Crit
	this._meleeCritRating[0] = this._ratings[8] + this._ratings[21];
	
	for( j=0; j<this._attributes.length; j++ ) {
		this._meleeCrit[0] += this._critFromAttributes[j];
	}
	//		Loop
	for( i=0; i<3; i++ ) {
	// 			Hit
		this._meleeHitRating[i] += effects[i][189][5] + effects[i][189][20];
		this._meleeHit[i] +=
			this._meleeHitRating[i] / COMBAT_RATINGS[5][level-1] + 
			effects[i][54];
	// 			Crit
		this._meleeCritRating[i] += effects[i][189][8] + effects[i][189][21];
		this._meleeCrit[i] += 
			this._meleeCritRating[i] / COMBAT_RATINGS[8][level-1] +
			effects[i][52] + effects[i][290] + effects[i][71][0];
	//			Sum up
		if( i> 0 ) {
			this._meleeHit[i] += this._meleeHit[0];
			this._meleeHitRating[i] += this._meleeHitRating[0];
			this._meleeCrit[i] += this._meleeCrit[0];
			this._meleeCritRating[i] += this._meleeCritRating[0];
		}
	}
	//
	//		till Cap
	//
	this._hitTillMeleeCap = Math.ceil(( MELEE_MISS_BASE[3] - this._meleeHit[1] ) * COMBAT_RATINGS[5][level-1]);
	//
	//-------------------------------------------------------------------------
	//	RANGED
	//-------------------------------------------------------------------------
	//
	//	HIT
	//
	this._rangedHitRating = this._ratings[6] + this._ratings[20];
	this._rangedHit = 
		this._rangedHitRating / COMBAT_RATINGS[6][level-1] +
		baseEffects[54] + raEffects[54];
	//
	//	CRIT
	//
	this._rangedCritRating = this._ratings[9] + this._ratings[21];
	this._rangedCrit = 
		this._rangedCritRating / COMBAT_RATINGS[9][level-1] + 
		baseEffects[290] + baseEffects[71][0] + baseEffects[52] +
		raEffects[290] + raEffects[71][0] + raEffects[52];
	for( j=0; j<this._attributes.length; j++ ) {
		this._rangedCrit += this._critFromAttributes[j];
	}
	//
	//#########################################################################
	//
	//	MELEE WEAPON
	//
	//#########################################################################
	// TODO feral ap
	/*
	if (chrClassId == 1024 && (shapeForm == 1 || shapeForm == 2 || shapeForm == 3) && (tmp = inventory.get(16))) 
	{
		this._attackPower += tmp.getFeralAp() + (tmp.getFeralAp() + tmp.getRating(27)) * Math.ceil(talents.getSpent(1,3,1) * 6.66) / 100;
	}
	*/
	//
	//	Main-hand
	//
	if (classId == DRUID && shapeForm == BEAR ) {
		this._mhSpeed 	= 2500;
		if ( (tmp = inv.get(16)) ) {
			this._mhMinDmg 	= tmp._minDamage * 2500 / tmp._delay;
			this._mhMaxDmg 	= tmp._maxDamage * 2500 / tmp._delay;
		}
	}
	else if (classId == DRUID && shapeForm == CAT ) {
		this._mhSpeed 	= 1000;
		if ( (tmp = inv.get(16)) ) {
			this._mhMinDmg 	= tmp._minDamage * 1000 / tmp._delay;
			this._mhMaxDmg 	= tmp._maxDamage * 1000 / tmp._delay;
		}
	}
	else if ( (tmp = inv.get(16)) ) {
		this._mhSpeed 	= tmp._delay;
		this._mhMinDmg 	= tmp._minDamage;
		this._mhMaxDmg 	= tmp._maxDamage;
	}
	else {
		this._mhSpeed 	= 2000;
		this._mhMinDmg 	= 50.6 - 28;
		this._mhMaxDmg 	= 50.6 - 28;
	}
	//
	this._mhMinDmg += this._attackPower / 14 * this._mhSpeed / 1000;
	this._mhMaxDmg += this._attackPower / 14 * this._mhSpeed / 1000;
	//
	this._mhSpeed /= 
		( 1 + this._meleeHasteFromRating / 100 ) *
		( 1 + baseEffects[138] / 100 + mhEffects[138] / 100 ) *
		( 1 + baseEffects[319] / 100 + mhEffects[319] / 100 ) *
		( 1 + baseEffects[192] / 100 + mhEffects[192] / 100) *
		( 1 + baseEffects[193] / 100 + mhEffects[193] / 100);
	
	this._meleeHaste = (
			( 1 + this._meleeHasteFromRating / 100 ) *
			( 1 + baseEffects[138] / 100 ) *
			( 1 + baseEffects[319] / 100 ) *
			( 1 + baseEffects[192] / 100 ) *
			( 1 + baseEffects[193] / 100 )
			- 1 
		) * 100;
	//
	this._mhMinDmg += baseEffects[13][0] + mhEffects[13][0];
	this._mhMaxDmg += baseEffects[13][0] + mhEffects[13][0];
	//
	this._mhMinDmg *= 1 + ( baseEffects[79][0] + mhEffects[79][0] ) / 100;
	this._mhMaxDmg *= 1 + ( baseEffects[79][0] + mhEffects[79][0] ) / 100;
	this._mhDps = (this._mhMinDmg + this._mhMaxDmg) * 500 / this._mhSpeed;
	//
	//	Off-hand
	//
	if ( wearsAWeaponInOffhand ) 
	{
		tmp = inv.get(17);
		this._ohSpeed 	= tmp._delay;
		this._ohMinDmg 	= tmp._minDamage + this._attackPower / 14 * this._ohSpeed / 1000;
		this._ohMaxDmg 	= tmp._maxDamage + this._attackPower / 14 * this._ohSpeed / 1000;
		//
		this._ohSpeed /= 
			( 1 + this._meleeHasteFromRating / 100 ) *
			( 1 + baseEffects[138] / 100 + ohEffects[138] / 100 ) *
			( 1 + baseEffects[319] / 100 + ohEffects[319] / 100 ) *
			( 1 + baseEffects[192] / 100 + ohEffects[192] / 100) *
			( 1 + baseEffects[193] / 100 + ohEffects[193] / 100);
		//
		this._ohMinDmg += baseEffects[13][0] + ohEffects[13][0];
		this._ohMaxDmg += baseEffects[13][0] + ohEffects[13][0];
		//
		this._ohMinDmg *= 1 + ( baseEffects[79][0] + ohEffects[79][0]  ) / 100;
		this._ohMinDmg *= 1 + ( baseEffects[122] + ohEffects[122] ) / 100;
		this._ohMinDmg >>= 1;

		this._ohMaxDmg *= 1 + ( baseEffects[79][0] + ohEffects[79][0]  ) / 100;
		this._ohMaxDmg *= 1 + ( baseEffects[122] + ohEffects[122] ) / 100;
		this._ohMaxDmg >>= 1; 
		
		this._ohDps = (this._ohMinDmg + this._ohMaxDmg) * 500 / this._ohSpeed;
	}
	//
	//#########################################################################
	//
	//	RANGED WEAPON
	//
	//#########################################################################
	//
	if ( wearsRangedWeapon ) {
		tmp = inv.get(18);
		
		this._raSpeed = tmp._delay;
		this._raMinDmg = tmp._minDamage + this._rangedAttackPower / 14 * this._raSpeed / 1000 + baseEffects[13][0] + raEffects[13][0];
		this._raMaxDmg = tmp._maxDamage + this._rangedAttackPower / 14 * this._raSpeed / 1000 + baseEffects[13][0] + raEffects[13][0];
		
		this._raSpeed /= ( 1 + this._rangedHasteFromRating / 100 ) *
						( 1 + ( baseEffects[140] + raEffects[140] ) / 100 ) *
						( 1 + ( baseEffects[141] + raEffects[141] ) / 100 ) *
						( 1 + ( baseEffects[320] + raEffects[320] ) / 100 ) *
						( 1 + ( baseEffects[192] + raEffects[192] ) / 100 ) *
						( 1 + ( baseEffects[193] + raEffects[193] ) / 100 );
		
		this._raDps = (this._raMinDmg + this._raMaxDmg) * 500 / this._raSpeed;
	}
	this._rangedHaste = (
			( 1 + this._rangedHasteFromRating / 100 ) *
			( 1 + baseEffects[140] / 100 ) *
			( 1 + baseEffects[141] / 100 ) *
			( 1 + baseEffects[320] / 100 ) *
			( 1 + baseEffects[192] / 100 ) *
			( 1 + baseEffects[193] / 100 )
			- 1
		) * 100;
	//
	//#########################################################################
	//
	//	Spell
	//
	//#########################################################################
	//
	this._spFromAttributes[3] = Math.max( 0, this._attributes[3] - 10 );
	//  Effect 238@127 (126?) is originally an healing effect
	//		   237@xxx is the spell damage effect, where xxx is a school mask
	//	because there is no differentiation between the two, healing is used,
	//	mainly to avoid breaking spell power into different damage types
	//
	//	The same is true for the effects 13 and 135.
	this._spellPower = 
		this._spFromAttributes[3] + 
		this._ratings[34] + 
		baseEffects[238][1] / 100 * this._attackPower +
		baseEffects[135][1];
	this._spellPower *= 1 + baseEffects[317] / 100;
	//
	//	Spell Haste
	this._spellHasteRating = this._ratings[19] + this._ratings[25] + baseEffects[189][19]; 
	this._spellHaste = (
			( 1 + this._spellHasteRating / COMBAT_RATINGS[19][level-1] / 100 ) * 
			( 1 + baseEffects[65] / 100 ) *
			( 1 + baseEffects[193] / 100 )
			- 1 
		) * 100;
	//	Hit
	this._spellHitRating = this._ratings[7] + this._ratings[20] + baseEffects[189][7] + baseEffects[189][20];
	this._spellHit = this._spellHitRating / COMBAT_RATINGS[7][level-1] + 
		Math.min(baseEffects[55][1],baseEffects[55][2],baseEffects[55][3],baseEffects[55][4],baseEffects[55][5],baseEffects[55][6]);
	//	Crit
	this._spellCritRating = this._ratings[10] + this._ratings[21] + baseEffects[189][10] + baseEffects[189][21];
	this._spellCrit = this._spellCritFromAttributes[3] + 
		this._spellCritRating / COMBAT_RATINGS[10][level-1] + 
		baseEffects[57] + baseEffects[290] + Math.max(mhEffects[57],ohEffects[57]);
	//
	//	Spell Penetration
	for( i=0; i<MAGIC_SCHOOLS; i++ ) {
		this._spellPenetrations[i] = Math.abs(this._ratings[36]) + Math.abs(baseEffects[123][i]);
	}
	//
	//	Mana regeneration
	if( this._character.hasMana() ) {
		this._manaRegenFromSpi = 5 * (0.001 + Math.sqrt(this._attributes[3]) * this._attributes[4] * BASE_REGEN[level-1]);
		this._sp5 = this._manaRegenFromSpi;
		
		this._mp5 = baseEffects[85] + this._ratings[32] + this._sp5 * (baseEffects[134] / 100);
		for( i = 0; i < 5; i++ ) {
			this._mp5 += baseEffects[219][i] / 100 * this._attributes[i];
		}
	}
	else{
		this._mp5 = 0;
		this._sp5 = 0;
	}
	//

	this._sp5 += baseStatsLevel[10];
	this._mp5 += baseStatsLevel[10];

	//
	//#########################################################################
	//
	//	Defense
	//
	//#########################################################################
	//

	// Block
	if( GameInfo.canBlock(classId) ) {
		this._block = 
			5 + 
			baseEffects[51] + 
			( classId == PALADIN && selectedTree == 1 ? 2.25 * this._mastery : 0) +
			( classId == WARRIOR && selectedTree == 2 ? 1.5  * this._mastery : 0) +
			( this._ratings[4] + baseEffects[189][4] ) /COMBAT_RATINGS[4][level-1];
	}
	//
	//	DODGE and PARRY
	//
	this._dodgeRating = this._ratings[2] + baseEffects[189][2];
	// class check necessary for diminishing returns;
	if( hasClass ) {
		
		if( classId == PALADIN || classId == WARRIOR || classId == DEATHKNIGHT ) {
			this._dodge = 
				baseEffects[49] +
				5 +
				this.deminishingReturnDodge(
					this._dodgeRating / COMBAT_RATINGS[2][level-1] + baseStatsLevel[9] ,
					classId
			);
		}
		else {
			this._dodge = 
				baseEffects[49] +
				BASE_DODGE[classId] +
			 	this._baseAttributes[1] * baseStatsLevel[9] +
				this.deminishingReturnDodge(
					this._dodgeRating / COMBAT_RATINGS[2][level-1] + baseStatsLevel[9] * ( this._attributes[1] - this._baseAttributes[1]) ,
					classId
			);
		}
		
		if( GameInfo.canParry(classId) || classId == SHAMAN && selectedTree == 1 ) {
			this._parryRating = this._ratings[3] + baseEffects[189][3];
			switch(classId) {
			case WARRIOR:
			case PALADIN:
			case DEATHKNIGHT:
				this._parryRating += (this._attributes[0] - baseAttributesUnmodified[0]) * 0.27;
				break;
			}
			this._parry = 5 + baseEffects[47] + this.deminishingReturnParry( 
				this._parryRating / COMBAT_RATINGS[3][level-1], 
				classId 
			);
		}
	}
	else {
		this._dodge = baseEffects[49] + this._dodgeRating / COMBAT_RATINGS[2][level-1];
	}	
	this._resilienceRating = this._ratings[24] + 
		Math.min(
			this._ratings[14] + baseEffects[189][14],
			this._ratings[15] + baseEffects[189][15],
			this._ratings[16] + baseEffects[189][16]
		);
	this._resilienceDamageReduction = (1 - Math.pow( 0.99 , ( this._resilienceRating / COMBAT_RATINGS[15][level-1] )));
	//
	//#########################################################################
	//
	// 	Output stats
	//
	//#########################################################################
	//
	this._general[0] = this._health;
	this._general[1] = this._mana;
	this._general[2] = 100; // Rage
	this._general[3] = 100 + baseEffects[35][3] + Math.min(mhEffects[35][3], ohEffects[35][3]); // Energy
	this._general[4] = 100; // Focus
	this._general[5] = Math.floor(100 + baseEffects[35][6]/10.0); // RunicPower
	this._general[6] = this._itemLevel;
	
	this._melee[0] = [
		[Math.floor(this._mhMinDmg),Math.ceil(this._mhMaxDmg)] , 
		wearsAWeaponInOffhand ? [Math.floor(this._ohMinDmg),Math.ceil(this._ohMaxDmg)] : null
	];
	this._melee[1] = [this._mhDps, wearsAWeaponInOffhand ? this._ohDps : null];
	this._melee[2] = this._attackPower;
	this._melee[3] = [ this._mhSpeed, wearsAWeaponInOffhand ? this._ohSpeed : null ];
	this._melee[4] = this._meleeHaste;
	this._melee[5] = this._meleeHit[1];
	this._melee[6] = this._meleeCrit[1]; 
	this._melee[7] = [ Math.floor(this._expertise[1]), wearsAWeaponInOffhand ? Math.floor(this._expertise[2]) : null ];
	this._melee[8] = this._mastery;
	
	if( wearsRangedWeapon ) {
		this._ranged[0] = [ Math.floor(this._raMinDmg), Math.ceil(this._raMaxDmg) ];
		this._ranged[1] = this._raDps;
		this._ranged[3] = this._raSpeed;
	}
	else {
		this._ranged[0] = null;
		this._ranged[1] = null;
		this._ranged[3] = null;
	}
	
	this._ranged[2] = this._rangedAttackPower;
	this._ranged[4] = this._rangedHaste;
	this._ranged[5] = this._rangedHit;
	this._ranged[6] = this._rangedCrit; 
	this._ranged[7] = this._mastery;
	
	this._spell[0] = this._spellPower;
	this._spell[1] = this._spellHaste; 
	this._spell[2] = this._spellHit; 
	this._spell[3] = Math.min(
		this._spellPenetrations[1],
		this._spellPenetrations[2],
		this._spellPenetrations[3],
		this._spellPenetrations[4],
		this._spellPenetrations[5]
	); 
	this._spell[4] = this._sp5;
	this._spell[5] = this._mp5;
	this._spell[6] = this._spellCrit;
	this._spell[7] = this._mastery;

	this._defense[0] = this._resisSchool[0];	
	this._defense[1] = this._dodge;
	this._defense[2] = this._parry;
	
	this._defense[3] = this._block;
	this._defense[4] = this._resilienceRating; //resilience
	
	this._resistance[0] = this._resisSchool[6];
	this._resistance[1] = this._resisSchool[2];
	this._resistance[2] = this._resisSchool[3];
	this._resistance[3] = this._resisSchool[4];
	this._resistance[4] = this._resisSchool[5];
	//
	//
	//
	this.__started = false;
};

/**
 * @param {Item} itm
 */
Stats.prototype._getItemStats = function( itm ) {
	var i;

	for( i=0; i<itm._stats.length; i++ ) {
		if( itm._stats[i] == null ) {
			continue;
		}
		
		if( itm._stats[i][0] >=	 50 ) {	
			switch( itm._stats[i][0] ) {
			case 50: this._resisSchool[0] += itm._stats[i][1]; break;
			case 51: this._resisSchool[2] += itm._stats[i][1]; break;
			case 52: this._resisSchool[4] += itm._stats[i][1]; break;
			case 53: this._resisSchool[1] += itm._stats[i][1]; break;
			case 54: this._resisSchool[5] += itm._stats[i][1]; break;
			case 55: this._resisSchool[3] += itm._stats[i][1]; break;
			case 56: this._resisSchool[6] += itm._stats[i][1]; break;
			}
		}
		else if( itm._stats[i][0] >= 11 ) {
			this._ratings[itm._stats[i][0]-11] += itm._stats[i][1];
		}
		else {
			this._attributes[STAT_IDS_TO_ATTRIBUTES[itm._stats[i][0]]] += itm._stats[i][1];
		}
	}
	
	if( itm._addedStat != -1 && itm._addedStatValue != -1 ){
		if( itm._addedStat >= 11 ) {
			this._ratings[itm._addedStat-11] += itm._addedStatValue;
		}
		else {
			this._attributes[STAT_IDS_TO_ATTRIBUTES[itm._addedStat]] += itm._addedStatValue;
		}
	}
	
	this._resisSchool[0] += itm._armor;
	if( itm._class == 4 && itm._subClass > 0 ) {
		this._resisSchool[0] += itm._armor * this._armorModPerCent;
	} 
	
};

/**
 * @param {SpellItemEnchantment} enchant
 */
Stats.prototype._getEnchantStats = function( enchant ) {
	var i;
	if( !enchant.isActive(this._character) ) {
		return;
	}
	for ( i = 0; i < enchant._types.length; i++ ) 
	{
		if( enchant._types[i] == 5 )
		{
			if( enchant._spellIds[i] >= 11 )
			{
				this._ratings[enchant._spellIds[i]-11] += enchant._values[i];
			}
			else
			{
				this._attributes[STAT_IDS_TO_ATTRIBUTES[enchant._spellIds[i]]] += enchant._values[i];
			}
		}
		else if ( enchant._types[i] == 4 )
		{
			this._resisSchool[enchant._spellIds[i]] += enchant._values[i];
		}
		
	}
};

Stats.prototype.getReforgeRatings = function( ) {
	var ratings = [];
	var level = this._character._level;
	
	ratings[0] = this._attributes[4];
	ratings[1] = this._dodge * COMBAT_RATINGS[2][level-1];
	ratings[2] = this._parry * COMBAT_RATINGS[3][level-1];
	//		switch spell and melee hit,crit,hast
	if( this._character.isSpellAffine() ) {
		ratings[3] = this._spellHit * COMBAT_RATINGS[7][level-1];
		ratings[4] = this._spellCrit * COMBAT_RATINGS[10][level-1];
		ratings[5] = this._spellHaste * COMBAT_RATINGS[19][level-1];
	}
	else {
		ratings[3] = this._meleeHit[1] * COMBAT_RATINGS[5][level-1];
		ratings[4] = this._meleeCrit[1] * COMBAT_RATINGS[8][level-1];
		ratings[5] = this._meleeHaste * COMBAT_RATINGS[17][level-1];
	}
	ratings[6] = this._expertise[1] * COMBAT_RATINGS[23][level-1];
	ratings[7] = this._mastery * COMBAT_RATINGS[25][level-1];
	return ratings;
};