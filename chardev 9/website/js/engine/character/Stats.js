/**
 * @constructor
 * @param {Character} character
 */
function Stats( character ){
	this.character = character;
	this.reset();
	this.__started = false;
}
/** @type {Character} */
Stats.prototype.character = null;
Stats.prototype.general = [];
Stats.prototype.attributes = [];
Stats.prototype.baseAttributes = [];
Stats.prototype.apFromAttributes = [];
Stats.prototype.spFromAttributes = [];
Stats.prototype.critFromAttributes = [];
Stats.prototype.spellCritFromAttributes = [];
Stats.prototype.ratings = [];
Stats.prototype.resisSchool = [];
Stats.prototype.resistance = [];
Stats.prototype.melee = [];
Stats.prototype.spell = [];
Stats.prototype.defense = [];
Stats.prototype.coefficients = [];

Stats.prototype.statPerCentModifier = [];

Stats.prototype.health = 0;
Stats.prototype.mana = 0;
Stats.prototype.baseHealth = 0;
Stats.prototype.baseMana = 0;

Stats.prototype.spellPower = 0;
Stats.prototype.spellHasteRating = 0;
Stats.prototype.spellHaste = 0;
Stats.prototype.spellHitRating = 0;
Stats.prototype.spellHit = 0;
Stats.prototype.sp5 = 0;
Stats.prototype.mp5 = 0;
Stats.prototype.spellCritRating = 0;
Stats.prototype.spellCrit = 0;
Stats.prototype.spellPenetrations = [];

Stats.prototype.manaFromInt = 0;
Stats.prototype.healthFromSta = 0;
Stats.prototype.manaRegenFromSpi = 0;

Stats.prototype.masteryRating = 0; 
Stats.prototype.mastery = 0;

Stats.prototype.apPerCentModifer = 0;
Stats.prototype.attackPower = 0;
Stats.prototype.additionalAttackPower = 0;
Stats.prototype.meleeHaste = 0;
Stats.prototype.meleeHasteRating = 0;
Stats.prototype.meleeHasteFromRating = 0;

Stats.prototype.meleeHitRating = [];
Stats.prototype.meleeHit = [];
Stats.prototype.meleeCritRating = [];
Stats.prototype.meleeCrit = [];
Stats.prototype.expertiseRating = [];
Stats.prototype.expertise = [];

Stats.prototype.mhMinDmg = 0;
Stats.prototype.mhMaxDmg = 0;
Stats.prototype.mhSpeed = 0;

Stats.prototype.ohMinDmg = 0;
Stats.prototype.ohMaxDmg = 0;
Stats.prototype.ohSpeed = 0;

Stats.prototype.rangedAttackPower = 0;
Stats.prototype.rangedHaste = 0;
Stats.prototype.rangedHasteRating = 0;
Stats.prototype.rangedHasteFromRating = 0;
Stats.prototype.rangedCrit = 0;
Stats.prototype.rangedCritRating = 0;
Stats.prototype.rangedHit = 0;
Stats.prototype.rangedHitRating = 0;

Stats.prototype.raMinDmg = 0;
Stats.prototype.raMaxDmg = 0;
Stats.prototype.raSpeed = 0;
Stats.prototype.raDps = 0;

Stats.prototype.parryRating = 0;
Stats.prototype.dodgeRating = 0;
Stats.prototype.dodge = 0;
Stats.prototype.parry = 0;
Stats.prototype.block = 0;
Stats.prototype.itemLevel = 0;
Stats.prototype.armorModPerCent = 0;

Stats.prototype.hitTillMeleeCap = 0;
Stats.prototype.expTillDodgeCap = 0;
Stats.prototype.expTillParryCap = 0;

Stats.prototype.__started = false;

/**
 * @private 
 */
Stats.prototype.reset = function() {
	var i;
	this.general = [0,0,0,0,0,0,0];
	this.attributes = [0,0,0,0,0];
	this.baseAttributes = [0,0,0,0,0];
	this.apFromAttributes = [0,0,0,0,0];
	this.spFromAttributes = [0,0,0,0,0];
	this.critFromAttributes = [0,0,0,0,0];
	this.spellCritFromAttributes = [0,0,0,0,0];
	
	this.ratings = [];
	for( i=0; i<CALC_RATINGS; i++ ) {
		this.ratings[i] = 0;
	}
	this.melee = [0,0,0,0,0,0,0,0,0,0];
	this.ranged = [[0,0],0,0,0,0,0,0,0];
	this.spell = [0,0,0,0,0,0,0,0];
	this.defense = [0,0,0,0,0,0,0];
	this.resistance = [0,0,0,0,0];
	
	this.health = 0;
	this.mana = 0;
	this.baseMana = 0;
	this.baseHealth = 0;
	
	this.spellPower = 0;
	this.spellHasteRating = 0;
	this.spellHaste = 0;
	this.spellHitRating = 0;
	this.spellHit = 0;
	this.spellPenetrations = [];
	this.sp5 = 0;
	this.mp5 = 0;
	this.spellCritRating = 0;
	this.spellCrit = 0;
	
	this.manaFromInt = 0;
	this.healthFromSta = 0;
	this.manaRegenFromSpi = 0;
	
	this.apPerCentModifer = 0;
	this.attackPower = 0;
	this.additionalAttackPower = 0;
	
	this.meleeHaste = 0;
	this.meleeHasteRating = 0;
	this.meleeHasteFromRating = 0;

	this.meleeHitRating = [0,0,0];
	this.meleeHit = [0,0,0];
	this.meleeCritRating = [0,0,0];
	this.meleeCrit = [0,0,0];
	

	this.rangedHaste = 0;
	this.rangedHasteRating = 0;
	this.rangedHasteFromRating = 0;
	this.rangedCrit = 0;
	this.rangedCritRating = 0;
	this.rangedHit = 0;
	this.rangedHitRating = 0;
	
	this.expertiseRating = [0,0,0,0];
	this.expertise = [0,0,0,0];
	
	this.masteryRating = 0; 
	this.mastery = 0;
	
	this.mhMinDmg = 0;
	this.mhMaxDmg = 0;
	this.mhSpeed = 0;
	this.mhDps = 0;
	
	this.ohMinDmg = 0;
	this.ohMaxDmg = 0;
	this.ohSpeed = 0;
	this.ohDps = 0;
	
	this.parryRating = 0;
	this.dodgeRating = 0;
	this.dodge = 0;
	this.parry = 0;
	this.block = 0;
	this.armorModPerCent = 0;
	
	this.rangedAttackPower = 0;
	this.raMinDmg = 0;
	this.raMaxDmg = 0;
	this.raSpeed = 0;
	this.raDps = 0;
	
	this.hitTillMeleeCap = 0;
	
	for( i=0; i<MAGIC_SCHOOLS; i++ ) {
		this.spellPenetrations[i] = 0;
	}
	for( i=0; i<DAMAGE_SCHOOLS; i++ ) {
		this.resisSchool[i] = 0;
	}
	this.itemLevel = 0;
	
	this.statPerCentModifier = [0,0,0,0,0,0,0,0];
};

/**
 * @param {number} level
 * @returns {number}
 */
Stats.prototype.getReductionFromArmor = function(level){
	if( level >= 81) {
		return this.defense[0] / ( this.defense[0] + 2167.5 * level - 158167.5 );
	}
	if( level >= 60 ) {
		return this.defense[0] / ( this.defense[0] + 467.5 * level - 22167.5 );
	}
	return this.defense[0] / ( this.defense[0] + 85 * level + 400 );
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
 * @param {boolean} noBuffs
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
	this.character.inventory.updateGemCount();
	//
	var i, j, itm, tmp, enchant, itemCount = 0;
	
	var inv = this.character.inventory;
	var wearsAWeaponInOffhand = inv.get(17) != null && inv.get(17).itemClass == 2;
	var wearsRangedWeapon = inv.get(18) != null && inv.get(18).itemClass == 2;
	
	var level = this.character.level;
	var effects = this.character.auras.getEffects(noBuffs);
	var baseEffects = effects[0];
	var mhEffects = effects[1];
	var ohEffects = effects[2];
	var raEffects = effects[3];
	
	var raceId = this.character.chrRace == null ? 0 : this.character.chrRace.id;
	
	var chrClass = this.character.chrClass;
	var hasClass = false;
	var classId  = 0; 
	var shapeform = 0;
	var selectedTree = -1;
	var baseStats = null;
	var baseStatsLevel = null;
	
	if( chrClass ) {
		hasClass = true;
		classId = chrClass.id;
		shapeform = chrClass.shapeform;
		selectedTree = chrClass.talents.selectedTree;
		baseStats = chrClass.baseStats;
		if( baseStats[level] ) {
			baseStatsLevel =  baseStats[level];
		}
	}
		
	var baseAttributesUnmodified = [0,0,0,0,0];
	var ap_array = AP_PER_STAT[classId];
	
	if( classId == DRUID && shapeform > 0 ) {
		switch( shapeform ) {
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
	
	this.reset();
	
	if( !hasClass || !baseStatsLevel ) {
		baseStatsLevel = [0,0,0,0,0,0,0,0,0,0,0];
	}

	this.baseHealth = baseStatsLevel[5];
	this.baseMana = baseStatsLevel[6];
	
	for( i = 0; i < 5; i++ ) {	
		baseAttributesUnmodified[i] = ( RACE_ATTRIBUTES[raceId][i] + ( hasClass ? baseStatsLevel[i] : 0 ));
		this.baseAttributes[i] = Math.floor(baseAttributesUnmodified[i] * ( 1 + baseEffects[137][i]/100 ));
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
	if( shapeform == CAT || shapeform == BEAR || shapeform == DIRE_BEAR ) {
	// 		Rank 1
		if( this.character.auras.isActive(17002) ) {
			baseEffects[49] += 2;
		}
	//		Rank 2
		else if( this.character.auras.isActive(24866) ) {
			baseEffects[49] += 4;
		}
	}
	//
	//	Master shapeshifter +4% crit in cat form
	//
	if( this.character.auras.isActive(48411) ) {
		if( shapeform == CAT ) {
			baseEffects[290] += 4;
		}
		//
		//						+4% physical damage in bear form
		//
		if( shapeform == BEAR || shapeform == DIRE_BEAR ) {
			baseEffects[79][0] += 4;
		}
	}
	//
	//#########################################################################
	//
	
	// Item Stats
	
	this.armorModPerCent = baseEffects[142][0]/100;
	
	for( i = 0; i < INV_ITEMS; i++) {
		var hasBSSocket = this.character.hasBlacksmithingSocket(i);
		
		itm = preview ? inv.get(i) : inv.items[i][0];
		if( itm == null || !this.character.canWear(itm) || !this.character.fitsItemClassRequirements(itm) ) {
			continue;
		}
		itm.setStats(level);
		if( i!=5 && i!=6 ) {
			itemCount++;
			this.itemLevel += itm.level;
		}
		this.getItemStats(itm);
		for( j=0; j<3; j++ ) {
			if( itm.gems[j] ) {
				
				if( itm.socketColors[j] <= 0 ) {
					if( ! hasBSSocket ) {
						continue;
					}
					else {
						hasBSSocket = false;
					}
				}

				this.getEnchantStats(itm.gems[j].gemProperties.enchant);
			}
		}
		if( itm.isSocketBonusActive() ) {
			this.getEnchantStats(itm.socketBonus);
		}
		for( j=0; j<itm.enchants.length; j++ ) {
			enchant = itm.enchants[j];
			if( enchant != null ) {
				this.getEnchantStats( enchant );
			}
		}
		if( itm.selectedRandomEnchantment ) {
			var es = itm.selectedRandomEnchantment.enchants;
			for(j=0; j<5; j++ ) {
				enchant = es[j];
				if( enchant != null ) {
					this.getEnchantStats( enchant );
				}
			}
		}
	}
	this.resisSchool[0] = Math.round( (this.resisSchool[0] + baseEffects[22][0] + baseEffects[143][0] ) * (1 + baseEffects[101][0]/100) );
	
	for( i = 1; i < this.resisSchool.length; i++ ) {
		this.resisSchool[i] = Math.round( ( this.resisSchool[i] + baseEffects[22][i] + baseEffects[143][i] ) * ( 1 + baseEffects[142][i]/100 ) );
	}
	this.itemLevel = itemCount > 0 ? this.itemLevel / itemCount : 0;
	//
	//#########################################################################
	//
	// Aura Stats
	//
	//#########################################################################
	//
	this.statPerCentModifier = [
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
		this.attributes[i] += baseEffects[29][i];
		this.attributes[i] *= 1 + baseEffects[137][i]/100;
		this.attributes[i] += this.baseAttributes[i] ;
		this.attributes[i] = Math.floor(this.attributes[i]);
		// TODO shapeform
		if( ap_array[i] > 0 ) {
			this.apFromAttributes[i] =  this.attributes[i] >= 10 * ap_array[i] ? this.attributes[i] * ( baseEffects[268][i] / 100 +  ap_array[i] ) - 10 * ap_array[i] : 0; 
		}
		// 
		for( j=0; j<32; j++ ) {
			this.ratings[j] += Math.floor(baseEffects[220][j][i]/100 * ( this.attributes[i] - baseAttributesUnmodified[i] ));
		}
	}

	this.critFromAttributes[1] 		+= BASE_MELEE_CRIT[classId] * 100 + this.attributes[1] * baseStatsLevel[7];
	this.spellCritFromAttributes[3] 	+= BASE_SPELL_CRIT[classId] * 100 + this.attributes[3] * baseStatsLevel[8];
	//
	//	Expertise
	//
	this.expertiseRating[0] = this.ratings[26];
	//
	for( i=0; i<4; i++ ) {
		this.expertiseRating[i] += effects[i][189][23];
		this.expertise[i] += 
			this.expertiseRating[i] / COMBAT_RATINGS[23][level-1] + 
			effects[i][240];
		if( i> 0 ) {
			this.expertise[i] += this.expertise[0];
			this.expertiseRating[i] += this.expertiseRating[0];
		}
	}
	//
	//		till cap
	//
	this.expTillDodgeCap = Math.ceil(( ENEMY_DODGE[3] - this.expertise[1] * EXPERTISE_TO_CHANCE ) * COMBAT_RATINGS[23][level-1] / EXPERTISE_TO_CHANCE );
	this.expTillParryCap = Math.ceil(( ENEMY_PARRY[3] - this.expertise[1] * EXPERTISE_TO_CHANCE ) * COMBAT_RATINGS[23][level-1] / EXPERTISE_TO_CHANCE );
	//
	// 	Mastery
	//
	if( level >= 80 ) {
		this.masteryRating = this.ratings[38] + baseEffects[189][25];
		
		this.mastery = 8 + this.masteryRating / COMBAT_RATINGS[25][level-1];
	}
	//#########################################################################
	//
	// 	GENERAL
	//
	//#########################################################################
	//
	this.healthFromSta = ( level < 80 ? 10 : 10 + (level - 80) * 0.8 )  * Math.max( 0, this.attributes[2] - 20 ) + ( this.attributes[2] >= 20 ? 20 : this.attributes[2] );
	this.health = this.healthFromSta + this.baseHealth * ( 1 + baseEffects[282] / 100 ) + baseEffects[34] + baseEffects[230] ;
	this.health*= 1 + baseEffects[133]/100;
	//
	this.manaFromInt = 15 * Math.max( 0, this.attributes[3] - 20 ) + ( this.attributes[3] >= 20 ? 20 : this.attributes[3] );
	this.mana = this.manaFromInt + this.baseMana + baseEffects[35][0];
	this.mana*= 1 + baseEffects[132]/100;
	//
	//#########################################################################
	//
	//	HASTE
	//
	//#########################################################################
	//
	this.meleeHasteRating = this.ratings[17] + this.ratings[25] + baseEffects[189][17];
	this.meleeHasteFromRating = this.meleeHasteRating / COMBAT_RATINGS[17][level-1];
	//
	this.rangedHasteRating = this.ratings[18] + this.ratings[25] + baseEffects[189][18];
	this.rangedHasteFromRating = this.rangedHasteRating / COMBAT_RATINGS[18][level-1];
	//
	//#########################################################################
	//
	//	ATTACK POWER
	//
	//#########################################################################
	//
	//		Melee
	//
	this.additionalAttackPower = baseEffects[99] + this.ratings[27];
	this.attackPower += this.additionalAttackPower;
	this.apPerCentModifer += baseEffects[166];
	//
	this.attackPower+= AP_PER_LEVEL[classId] * level; // BASE_AP[classId] removed
	for ( i = 0; i < 5; i++) 
	{
		this.attackPower += this.apFromAttributes[i];			
	}
	//
	this.additionalAttackPower *= (1 + this.apPerCentModifer/100);
	this.attackPower *= (1 + this.apPerCentModifer/100);
	//
	//		Ranged
	//
	this.rangedAttackPower = baseEffects[124] + this.ratings[27] + RAP_PER_AGI[classId] * this.attributes[1] + RAP_PER_LVL[classId] * level + RAP_BASE[classId] ;
	for( i=0;i<5;i++){
		this.rangedAttackPower += this.attributes[i] * ( baseEffects[212][i]/100 );
	}
	this.rangedAttackPower *= (1 + baseEffects[167]/100);
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
	this.meleeHitRating[0] = this.ratings[5] + this.ratings[20];
	// 		Crit
	this.meleeCritRating[0] = this.ratings[8] + this.ratings[21];
	
	for( j=0; j<this.attributes.length; j++ ) {
		this.meleeCrit[0] += this.critFromAttributes[j];
	}
	//		Loop
	for( i=0; i<3; i++ ) {
	// 			Hit
		this.meleeHitRating[i] += effects[i][189][5] + effects[i][189][20];
		this.meleeHit[i] +=
			this.meleeHitRating[i] / COMBAT_RATINGS[5][level-1] + 
			effects[i][54];
	// 			Crit
		this.meleeCritRating[i] += effects[i][189][8] + effects[i][189][21];
		this.meleeCrit[i] += 
			this.meleeCritRating[i] / COMBAT_RATINGS[8][level-1] +
			effects[i][52] + effects[i][290] + effects[i][71][0];
	//			Sum up
		if( i> 0 ) {
			this.meleeHit[i] += this.meleeHit[0];
			this.meleeHitRating[i] += this.meleeHitRating[0];
			this.meleeCrit[i] += this.meleeCrit[0];
			this.meleeCritRating[i] += this.meleeCritRating[0];
		}
	}
	//
	//		till Cap
	//
	this.hitTillMeleeCap = Math.ceil(( MELEE_MISS_BASE[3] - this.meleeHit[1] ) * COMBAT_RATINGS[5][level-1]);
	//
	//-------------------------------------------------------------------------
	//	RANGED
	//-------------------------------------------------------------------------
	//
	//	HIT
	//
	this.rangedHitRating = this.ratings[6] + this.ratings[20];
	this.rangedHit = 
		this.rangedHitRating / COMBAT_RATINGS[6][level-1] +
		baseEffects[54] + raEffects[54];
	//
	//	CRIT
	//
	this.rangedCritRating = this.ratings[9] + this.ratings[21];
	this.rangedCrit = 
		this.rangedCritRating / COMBAT_RATINGS[9][level-1] + 
		baseEffects[290] + baseEffects[71][0] + baseEffects[52] +
		raEffects[290] + raEffects[71][0] + raEffects[52];
	for( j=0; j<this.attributes.length; j++ ) {
		this.rangedCrit += this.critFromAttributes[j];
	}
	//
	//#########################################################################
	//
	//	MELEE WEAPON
	//
	//#########################################################################
	// TODO feral ap
	/*
	if (chrClassId == 1024 && (shapeform == 1 || shapeform == 2 || shapeform == 3) && (tmp = inventory.get(16))) 
	{
		this.attackPower += tmp.getFeralAp() + (tmp.getFeralAp() + tmp.getRating(27)) * Math.ceil(talents.getSpent(1,3,1) * 6.66) / 100;
	}
	*/
	//
	//	Main-hand
	//
	if (classId == DRUID && shapeform == BEAR ) {
		this.mhSpeed 	= 2500;
		if ( (tmp = inv.get(16)) ) {
			this.mhMinDmg 	= tmp.minDamage * 2500 / tmp.delay;
			this.mhMaxDmg 	= tmp.maxDamage * 2500 / tmp.delay;
		}
	}
	else if (classId == DRUID && shapeform == CAT ) {
		this.mhSpeed 	= 1000;
		if ( (tmp = inv.get(16)) ) {
			this.mhMinDmg 	= tmp.minDamage * 1000 / tmp.delay;
			this.mhMaxDmg 	= tmp.maxDamage * 1000 / tmp.delay;
		}
	}
	else if ( (tmp = inv.get(16)) ) {
		this.mhSpeed 	= tmp.delay;
		this.mhMinDmg 	= tmp.minDamage;
		this.mhMaxDmg 	= tmp.maxDamage;
	}
	else {
		this.mhSpeed 	= 2000;
		this.mhMinDmg 	= 50.6 - 28;
		this.mhMaxDmg 	= 50.6 - 28;
	}
	//
	this.mhMinDmg += this.attackPower / 14 * this.mhSpeed / 1000;
	this.mhMaxDmg += this.attackPower / 14 * this.mhSpeed / 1000;
	//
	this.mhSpeed /= 
		( 1 + this.meleeHasteFromRating / 100 ) *
		( 1 + baseEffects[138] / 100 + mhEffects[138] / 100 ) *
		( 1 + baseEffects[319] / 100 + mhEffects[319] / 100 ) *
		( 1 + baseEffects[192] / 100 + mhEffects[192] / 100) *
		( 1 + baseEffects[193] / 100 + mhEffects[193] / 100);
	
	this.meleeHaste = (
			( 1 + this.meleeHasteFromRating / 100 ) *
			( 1 + baseEffects[138] / 100 ) *
			( 1 + baseEffects[319] / 100 ) *
			( 1 + baseEffects[192] / 100 ) *
			( 1 + baseEffects[193] / 100 )
			- 1 
		) * 100;
	//
	this.mhMinDmg += baseEffects[13][0] + mhEffects[13][0];
	this.mhMaxDmg += baseEffects[13][0] + mhEffects[13][0];
	//
	this.mhMinDmg *= 1 + ( baseEffects[79][0] + mhEffects[79][0] ) / 100;
	this.mhMaxDmg *= 1 + ( baseEffects[79][0] + mhEffects[79][0] ) / 100;
	this.mhDps = (this.mhMinDmg + this.mhMaxDmg) * 500 / this.mhSpeed;
	//
	//	Off-hand
	//
	if ( wearsAWeaponInOffhand ) 
	{
		tmp = inv.get(17);
		this.ohSpeed 	= tmp.delay;
		this.ohMinDmg 	= tmp.minDamage + this.attackPower / 14 * this.ohSpeed / 1000;
		this.ohMaxDmg 	= tmp.maxDamage + this.attackPower / 14 * this.ohSpeed / 1000;
		//
		this.ohSpeed /= 
			( 1 + this.meleeHasteFromRating / 100 ) *
			( 1 + baseEffects[138] / 100 + ohEffects[138] / 100 ) *
			( 1 + baseEffects[319] / 100 + ohEffects[319] / 100 ) *
			( 1 + baseEffects[192] / 100 + ohEffects[192] / 100) *
			( 1 + baseEffects[193] / 100 + ohEffects[193] / 100);
		//
		this.ohMinDmg += baseEffects[13][0] + ohEffects[13][0];
		this.ohMaxDmg += baseEffects[13][0] + ohEffects[13][0];
		//
		this.ohMinDmg *= 1 + ( baseEffects[79][0] + ohEffects[79][0]  ) / 100;
		this.ohMinDmg *= 1 + ( baseEffects[122] + ohEffects[122] ) / 100;
		this.ohMinDmg >>= 1;

		this.ohMaxDmg *= 1 + ( baseEffects[79][0] + ohEffects[79][0]  ) / 100;
		this.ohMaxDmg *= 1 + ( baseEffects[122] + ohEffects[122] ) / 100;
		this.ohMaxDmg >>= 1; 
		
		this.ohDps = (this.ohMinDmg + this.ohMaxDmg) * 500 / this.ohSpeed;
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
		
		this.raSpeed = tmp.delay;
		this.raMinDmg = tmp.minDamage + this.rangedAttackPower / 14 * this.raSpeed / 1000 + baseEffects[13][0] + raEffects[13][0];
		this.raMaxDmg = tmp.maxDamage + this.rangedAttackPower / 14 * this.raSpeed / 1000 + baseEffects[13][0] + raEffects[13][0];
		
		this.raSpeed /= ( 1 + this.rangedHasteFromRating / 100 ) *
						( 1 + ( baseEffects[140] + raEffects[140] ) / 100 ) *
						( 1 + ( baseEffects[141] + raEffects[141] ) / 100 ) *
						( 1 + ( baseEffects[320] + raEffects[320] ) / 100 ) *
						( 1 + ( baseEffects[192] + raEffects[192] ) / 100 ) *
						( 1 + ( baseEffects[193] + raEffects[193] ) / 100 );
		
		this.raDps = (this.raMinDmg + this.raMaxDmg) * 500 / this.raSpeed;
	}
	this.rangedHaste = (
			( 1 + this.rangedHasteFromRating / 100 ) *
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
	this.spFromAttributes[3] = Math.max( 0, this.attributes[3] - 10 );
	//  Effect 238@127 (126?) is originally an healing effect
	//		   237@xxx is the spell damage effect, where xxx is a school mask
	//	because there is no differentiation between the two, healing is used,
	//	mainly to avoid breaking spell power into different damage types
	//
	//	The same is true for the effects 13 and 135.
	this.spellPower = 
		this.spFromAttributes[3] + 
		this.ratings[34] + 
		baseEffects[238][1] / 100 * this.attackPower +
		baseEffects[135][1];
	this.spellPower *= 1 + baseEffects[317] / 100;
	//
	//	Spell Haste
	this.spellHasteRating = this.ratings[19] + this.ratings[25] + baseEffects[189][19]; 
	this.spellHaste = (
			( 1 + this.spellHasteRating / COMBAT_RATINGS[19][level-1] / 100 ) * 
			( 1 + baseEffects[65] / 100 ) *
			( 1 + baseEffects[193] / 100 )
			- 1 
		) * 100;
	//	Hit
	this.spellHitRating = this.ratings[7] + this.ratings[20] + baseEffects[189][7] + baseEffects[189][20];
	this.spellHit = this.spellHitRating / COMBAT_RATINGS[7][level-1] + 
		Math.min(baseEffects[55][1],baseEffects[55][2],baseEffects[55][3],baseEffects[55][4],baseEffects[55][5],baseEffects[55][6]);
	//	Crit
	this.spellCritRating = this.ratings[10] + this.ratings[21] + baseEffects[189][10] + baseEffects[189][21];
	this.spellCrit = this.spellCritFromAttributes[3] + 
		this.spellCritRating / COMBAT_RATINGS[10][level-1] + 
		baseEffects[57] + baseEffects[290] + Math.max(mhEffects[57],ohEffects[57]);
	//
	//	Spell Penetration
	for( i=0; i<MAGIC_SCHOOLS; i++ ) {
		this.spellPenetrations[i] = Math.abs(this.ratings[36]) + Math.abs(baseEffects[123][i]);
	}
	//
	//	Mana regeneration
	if( this.character.hasMana() ) {
		this.manaRegenFromSpi = 5 * (0.001 + Math.sqrt(this.attributes[3]) * this.attributes[4] * BASE_REGEN[level-1]);
		this.sp5 = this.manaRegenFromSpi;
		
		this.mp5 = baseEffects[85] + this.ratings[32] + this.sp5 * (baseEffects[134] / 100);
		for( i = 0; i < 5; i++ ) {
			this.mp5 += baseEffects[219][i] / 100 * this.attributes[i];
		}
	}
	else{
		this.mp5 = 0;
		this.sp5 = 0;
	}
	//

	this.sp5 += baseStatsLevel[10];
	this.mp5 += baseStatsLevel[10];

	//
	//#########################################################################
	//
	//	Defense
	//
	//#########################################################################
	//

	// Block
	if( GameInfo.canBlock(classId) ) {
		this.block = 
			5 + 
			baseEffects[51] + 
			( classId == PALADIN && selectedTree == 1 ? 2.25 * this.mastery : 0) +
			( classId == WARRIOR && selectedTree == 2 ? 1.5  * this.mastery : 0) +
			( this.ratings[4] + baseEffects[189][4] ) /COMBAT_RATINGS[4][level-1];
	}
	//
	//	DODGE and PARRY
	//
	this.dodgeRating = this.ratings[2] + baseEffects[189][2];
	// class check necessary for diminishing returns;
	if( hasClass ) {
		
		if( classId == PALADIN || classId == WARRIOR || classId == DEATHKNIGHT ) {
			this.dodge = 
				baseEffects[49] +
				5 +
				this.deminishingReturnDodge(
					this.dodgeRating / COMBAT_RATINGS[2][level-1] + baseStatsLevel[9] ,
					classId
			);
		}
		else {
			this.dodge = 
				baseEffects[49] +
				BASE_DODGE[classId] +
			 	this.baseAttributes[1] * baseStatsLevel[9] +
				this.deminishingReturnDodge(
					this.dodgeRating / COMBAT_RATINGS[2][level-1] + baseStatsLevel[9] * ( this.attributes[1] - this.baseAttributes[1]) ,
					classId
			);
		}
		
		if( GameInfo.canParry(classId) ) {
			this.parryRating = this.ratings[3] + baseEffects[189][3];
			switch(classId) {
			case WARRIOR:
			case PALADIN:
			case DEATHKNIGHT:
				this.parryRating += (this.attributes[0] - baseAttributesUnmodified[0]) * 0.27;
				break;
			}
			this.parry = 5 + baseEffects[47] + this.deminishingReturnParry( 
				this.parryRating / COMBAT_RATINGS[3][level-1], 
				classId 
			);
		}
	}
	else {
		this.dodge = baseEffects[49] + this.dodgeRating / COMBAT_RATINGS[2][level-1];
	}	
	this.resilienceRating = this.ratings[24] + 
	Math.min(
		this.ratings[14] + baseEffects[189][14],
		this.ratings[15] + baseEffects[189][15],
		this.ratings[16] + baseEffects[189][16]
	);
	this.resilienceDamageReduction = (1 - Math.pow( 0.99 , ( this.resilienceRating / COMBAT_RATINGS[15][level-1] )));
	//
	//#########################################################################
	//
	// 	Output stats
	//
	//#########################################################################
	//
	this.general[0] = this.health;
	this.general[1] = this.mana;
	this.general[2] = 100; // Rage
	this.general[3] = 100 + baseEffects[35][3] + Math.min(mhEffects[35][3], ohEffects[35][3]); // Energy
	this.general[4] = 100; // Focus
	this.general[5] = Math.floor(100 + baseEffects[35][6]/10.0); // RunicPower
	this.general[6] = this.itemLevel;
	
	this.melee[0] = [
		[Math.floor(this.mhMinDmg),Math.ceil(this.mhMaxDmg)] , 
		wearsAWeaponInOffhand ? [Math.floor(this.ohMinDmg),Math.ceil(this.ohMaxDmg)] : null
	];
	this.melee[1] = [this.mhDps, wearsAWeaponInOffhand ? this.ohDps : null];
	this.melee[2] = this.attackPower;
	this.melee[3] = [ this.mhSpeed, wearsAWeaponInOffhand ? this.ohSpeed : null ];
	this.melee[4] = this.meleeHaste;
	this.melee[5] = this.meleeHit[1];
	this.melee[6] = this.meleeCrit[1]; 
	this.melee[7] = [ Math.floor(this.expertise[1]), wearsAWeaponInOffhand ? Math.floor(this.expertise[2]) : null ];
	this.melee[8] = this.mastery;
	
	if( wearsRangedWeapon ) {
		this.ranged[0] = [ Math.floor(this.raMinDmg), Math.ceil(this.raMaxDmg) ];
		this.ranged[1] = this.raDps;
		this.ranged[3] = this.raSpeed;
	}
	else {
		this.ranged[0] = [-1, -1];
		this.ranged[1] = -1;
		this.ranged[3] = -1;
	}
	
	this.ranged[2] = this.rangedAttackPower;
	this.ranged[4] = this.rangedHaste;
	this.ranged[5] = this.rangedHit;
	this.ranged[6] = this.rangedCrit; 
	this.ranged[7] = this.mastery;
	
	this.spell[0] = this.spellPower;
	this.spell[1] = this.spellHaste; 
	this.spell[2] = this.spellHit; 
	this.spell[3] = Math.min(
		this.spellPenetrations[1],
		this.spellPenetrations[2],
		this.spellPenetrations[3],
		this.spellPenetrations[4],
		this.spellPenetrations[5]
	); 
	this.spell[4] = this.sp5;
	this.spell[5] = this.mp5;
	this.spell[6] = this.spellCrit;
	this.spell[7] = this.mastery;

	this.defense[0] = this.resisSchool[0];	
	this.defense[1] = this.dodge;
	this.defense[2] = this.parry;
	
	this.defense[3] = this.block;
	this.defense[4] = this.resilienceRating; //resilience
	this.defense[5] = 5 + this.dodge + this.parry;
	this.defense[6] = 5 + this.dodge + this.block + this.parry;
	
	this.resistance[0] = this.resisSchool[6];
	this.resistance[1] = this.resisSchool[2];
	this.resistance[2] = this.resisSchool[3];
	this.resistance[3] = this.resisSchool[4];
	this.resistance[4] = this.resisSchool[5];
	//
	//
	//
	this.__started = false;
};

/**
 * @param {Item} itm
 */
Stats.prototype.getItemStats = function( itm ) {
	var i;

	for( i=0; i<itm.stats.length; i++ ) {
		if( itm.stats[i] == null ) {
			continue;
		}
		
		if( itm.stats[i][0] >=	 50 ) {	
			switch( itm.stats[i][0] ) {
			case 50: this.resisSchool[0] += itm.stats[i][1]; break;
			case 51: this.resisSchool[2] += itm.stats[i][1]; break;
			case 52: this.resisSchool[4] += itm.stats[i][1]; break;
			case 53: this.resisSchool[1] += itm.stats[i][1]; break;
			case 54: this.resisSchool[5] += itm.stats[i][1]; break;
			case 55: this.resisSchool[3] += itm.stats[i][1]; break;
			case 56: this.resisSchool[6] += itm.stats[i][1]; break;
			}
		}
		else if( itm.stats[i][0] >= 11 ) {
			this.ratings[itm.stats[i][0]-11] += itm.stats[i][1];
		}
		else {
			this.attributes[STAT_IDS_TO_ATTRIBUTES[itm.stats[i][0]]] += itm.stats[i][1];
		}
	}
	
	if( itm.addedStat != -1 && itm.addedStatValue != -1 ){
		if( itm.addedStat >= 11 ) {
			this.ratings[itm.addedStat-11] += itm.addedStatValue;
		}
		else {
			this.attributes[STAT_IDS_TO_ATTRIBUTES[itm.addedStat]] += itm.addedStatValue;
		}
	}
	
	this.resisSchool[0] += itm.armor;
	if( itm.itemClass == 4 && itm.itemSubClass > 0 ) {
		this.resisSchool[0] += itm.armor * this.armorModPerCent;
	} 
	
};

/**
 * @param {SpellItemEnchantment} enchant
 */
Stats.prototype.getEnchantStats = function( enchant ) {
	var i;
	if( !enchant.isActive(this.character) ) {
		return;
	}
	for ( i = 0; i < enchant.types.length; i++ ) 
	{
		if( enchant.types[i] == 5 )
		{
			if( enchant.spellIds[i] >= 11 )
			{
				this.ratings[enchant.spellIds[i]-11] += enchant.values[i];
			}
			else
			{
				this.attributes[STAT_IDS_TO_ATTRIBUTES[enchant.spellIds[i]]] += enchant.values[i];
			}
		}
		else if ( enchant.types[i] == 4 )
		{
			this.resisSchool[enchant.spellIds[i]] += enchant.values[i];
		}
		
	}
};

Stats.prototype.getReforgeRatings = function( ) {
	var ratings = [];
	var level = this.character.level;
	
	ratings[0] = this.attributes[4];
	ratings[1] = this.dodge * COMBAT_RATINGS[2][level-1];
	ratings[2] = this.parry * COMBAT_RATINGS[3][level-1];
	//		switch spell and melee hit,crit,hast
	if( this.character.isSpellAffine() ) {
		ratings[3] = this.spellHit * COMBAT_RATINGS[7][level-1];
		ratings[4] = this.spellCrit * COMBAT_RATINGS[10][level-1];
		ratings[5] = this.spellHaste * COMBAT_RATINGS[19][level-1];
	}
	else {
		ratings[3] = this.meleeHit[1] * COMBAT_RATINGS[5][level-1];
		ratings[4] = this.meleeCrit[1] * COMBAT_RATINGS[8][level-1];
		ratings[5] = this.meleeHaste * COMBAT_RATINGS[17][level-1];
	}
	ratings[6] = this.expertise[1] * COMBAT_RATINGS[23][level-1];
	ratings[7] = this.mastery * COMBAT_RATINGS[25][level-1];
	return ratings;
};