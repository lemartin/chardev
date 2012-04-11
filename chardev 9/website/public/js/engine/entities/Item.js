/**
 * @constructor
 * 
 * @param {Array} serialized
 */
function Item( serialized ) {
	var i;
	//#######################################################
	//	PROPERTIES
	//#######################################################
	this.gems = [null,null,null];
	this.enchants = [];
	//#######################################################
	//	CONSTRUCTOR
	//#######################################################
	this.serialized = serialized;
	this.id = serialized[0];
	this.quality = serialized[1];
	this.itemClass = serialized[2];
	this.itemSubClass = serialized[3]; this.unmodifiedSubClass = this.itemSubClass; // used for heirloom
	this.inventorySlot = serialized[4];
	this.chrClassMask = serialized[5];
	this.level = serialized[6];
	this.requiredCharacterLevel = serialized[7];
	this.requiredSkillLineId = serialized[8];
	this.requiredSkillLineLevel = serialized[9];
	this.requiredFactionId = serialized[10];
	this.requiredFactionReputation = serialized[11];
	this.stackSize = serialized[12];
	this.stats = serialized[13]; //[[id,value],[id,value]....]
	this.delay = serialized[14];
	this.spells = [];
	for( i=0; i<serialized[15].length; i++ ) {
		this.spells[i] = serialized[15][i] != null ? new Spell(serialized[15][i]) : null;
	}
	this.binds = serialized[17];
	this.name = serialized[18]; this.unmodifiedName = this.name;
	this.itemSet = ( serialized[19] != null ? new ItemSet(serialized[19]) : null);
	this.durability = serialized[20];
	this.socketColors = serialized[21]; // [sColor1,sColor2,sColor3]
	this.socketBonus = serialized[22] != null ? new SpellItemEnchantment(serialized[22]) : null; 
	this.icon = serialized[23];
	this.itemSubClassName = serialized[24];
	this.typeMask = serialized[25];
	this.buyPrice = serialized[26];
	this.sellPrice = serialized[27];
	this.armor = serialized[28];
	this.unique = serialized[29];
	this.requiredFactionName = serialized[30];
	//TODO this.isGem = ( this.gemPropertiers != null );
	this.spellTriggers = serialized[31];
	this.spellCharges = serialized[32];
	this.spellCooldowns = serialized[33];
	this.spellCategoryIds = serialized[34];
	this.spellCategoryCooldowns = serialized[35];
	this.gemProperties = serialized[36] != null ? new GemProperties(serialized[36]) : null;
	this.description = serialized[37];
	this.dps = serialized[38];
	this.minDamage = serialized[39];
	this.maxDamage = serialized[40];
	
	this.randomEnchants = null;
	if( serialized[41] ) {
		this.randomEnchants = [];
		for( i=0; i<serialized[41].length; i++ ) {
			this.randomEnchants[i] = new ItemRandomProperty(serialized[41][i]);
		}
	}
	else if( serialized[42] ) {
		this.randomEnchants = [];
		for( i=0; i<serialized[42].length; i++ ) {
			this.randomEnchants[i] = new ItemRandomSuffix(serialized[42][i]);
		}
	}
	
	this.scalingStatDistribution = serialized[43]; // [stat1,...,stat10,coeff1,...,coeff10,minlvl,maxlvl]
	this.typeMask2 = serialized[44];
	this.damageRange = serialized[45];
	
	this.questId = serialized[46];
	this.limitCategory = serialized[47];
	this.limitCategoryMultiple = serialized[48];
	this.chrRaceMask = serialized[49];
}

Item.prototype = {
	//
	//#########################################################################
	//
	//	PROPERTIES
	//
	//#########################################################################
	//
	gems : null, 
	enchant : null,
	selectedRandomEnchantment: null,
	hasRandomEnchantments: false,
	characterScope: null,
	//
	// Item data
	id : 0, 
	quality: 0, 
	itemClass: 0, 
	itemSubClass: 0,
	inventorySlot : 0, 
	chrClassMask : 0, 
	level : 0, 
	requiredCharacterLevel : 0, 
	requiredSkillLineId : 0, 
	requiredSkillLineLevel : 0, 
	requiredFactionId : 0, 
	requiredFactionReputation : 0, 
	stackSize : 0, 
	stats : 0, 
	delay : 0, 
	spells : null,
	binds: 0,
	name: "",
	itemSet: 0,
	durability: 0,
	socketColors: 0,
	socketBonus: 0,
	icon: "",
	itemSubClassName: "",
	typeMask: 0,
	typeMask2 : 0,
	buyPrice: 0,
	sellPrice: 0,
	armor: 0,
	unique: 0,
	requiredFactionName: 0,
	spellTriggers: 0,
	spellCharges: 0,
	spellCooldowns: 0,
	spellCategoryIds: 0,
	spellCategoryCooldowns: 0,
	gemProperties: 0,
	description: "",
	dps: 0,
	minDamage: 0,
	maxDamage: 0,
	damageRange : 0.0,
	questId : 0,
	limitCategory : 0,
	limitCategoryMultiple : 0,
	chrRaceMask : 0,
	//
	// Reforge stats
	addedStat: -1, 
	addedStatValue: -1, 
	reducedStat: -1, 
	reducedStatValue: -1,
	//
	// Random enchants
	randomEnchants: null,
	unmodifiedName: "",
	scalingStatDistribution: null,
	unmodifiedSubClass: 0,
	//
	// TODO
	requiredSkillLevel: 0,
	requiredSkillId: 0,
	requiredSpellId: 0,
	requiredSkill: null,
	requiredSpell: null,
	//
	//#########################################################################
	//
	//	METHODS
	//
	//#########################################################################
	//
	setCharacterScope : function( characterScope ) {
		this.characterScope = characterScope;
		for( var i = 0 ; i < 3 ; i++ ) {
			if( this.gems[i] ) {
				this.gems[i].setCharacterScope( characterScope ); 
			}
		}
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	REFORGE AND RESTORE	
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	isReforgable: function() {
		return this.level >= REFORGE_ITEM_MIN_LEVEL;
	},
	reforge : function( reducedStat, addedStat ) {
		var i,valid = false, statIndex = -1, enchantIndex = -1, enchant;

		if( this.reducedStat != -1 ) {
			throw new InvalidReforgeException( 
				this, 
				reducedStat, 
				addedStat, 
				InvalidReforgeException.CAUSE_ALREADY_REFORGED 
			);
		}
		if( this.level < REFORGE_ITEM_MIN_LEVEL ) {
			throw new InvalidReforgeException( 
				this, 
				reducedStat, 
				addedStat, 
				InvalidReforgeException.CAUSE_LOW_ITEM_LEVEL
			);
		}
		for( i=0; i<REFORGABLE_STATS.length; i++ ) {
			if( reducedStat == REFORGABLE_STATS[i] ) {
				valid = true;
			}
		}
		if( !valid ) {
			throw new InvalidReforgeException( 
				this, 
				reducedStat, 
				addedStat, 
				InvalidReforgeException.CAUSE_INVALID_REFORGE_STAT 
			);
		}

		for( i=0; i<this.stats.length; i++ ) {
			if( this.stats[i] ) {
				if( this.stats[i][0] == addedStat ) {
					throw new InvalidReforgeException( 
						this, 
						reducedStat, 
						addedStat, 
						InvalidReforgeException.CAUSE_ADD_STAT_PRESENT 
					);
				}
				else if ( this.stats[i][0] == reducedStat ) {
					statIndex = i;
				}
			}
		}
		if( this.selectedRandomEnchantment ) {
			for( i=0; i<this.selectedRandomEnchantment.enchants.length; i++ ) {
				enchant = this.selectedRandomEnchantment.enchants[i];
				if( enchant && enchant.types[0] == 5 ) {
					if(enchant.spellIds[0] == addedStat) {
						throw new InvalidReforgeException( 
							this, 
							reducedStat, 
							addedStat, 
							InvalidReforgeException.CAUSE_ADD_STAT_PRESENT 
						);
					}
					else if(enchant.spellIds[0] == reducedStat ) {
						enchantIndex = i;
					}
				}
			}
		}
		if( statIndex == -1 && enchantIndex == -1 ) {
			throw new InvalidReforgeException( 
				this, 
				reducedStat, 
				addedStat, 
				InvalidReforgeException.CAUSE_REDUCE_STAT_NOT_PRESENT 
			);
		}
		this.reducedStat = reducedStat;
		this.addedStat = addedStat;
		
		if( statIndex != -1 ) {
			this.reducedStatValue = this.stats[statIndex][1];
			this.addedStatValue = Math.floor(this.stats[statIndex][1] * 0.4);
			this.stats[statIndex][1] -=  this.addedStatValue; 
		}
		else if( enchantIndex != -1 ) {
			var v;
			enchant = this.selectedRandomEnchantment.enchants[enchantIndex];
			v = enchant.values[0];
			this.reducedStatValue = v;
			this.addedStatValue = Math.floor(v * 0.4);
			enchant.setValue( v - this.addedStatValue ); 
		}
	},
	restore : function() {
		var i;
		if( this.reducedStat != -1 ) {
			for( i=0; i<this.stats.length; i++ ) {
				if ( this.stats[i] && this.stats[i][0] == this.reducedStat ) {
					this.stats[i][1] = this.reducedStatValue;
					break;
				}
			}
			if( this.selectedRandomEnchantment ) {
				for( i=0; i<this.selectedRandomEnchantment.enchants.length; i++ ) {
					var e = this.selectedRandomEnchantment.enchants[i];
					if( e && e.types[0] == 5 && e.spellIds[0] == this.reducedStat ) {
						e.setValue(this.reducedStatValue);
					}
				}
			}
		}
		this.addedStat = -1;
		this.addedStatValue = -1;
		this.reducedStat = -1;
		this.reducedStatValue = -1;
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	SCALING STATS
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	setStats : function( level ) {
		if( this.scalingStatDistribution == null ) {
			return;
		}
		
		var n = 0, statValue = 0, dps = 0;
		
		level = Math.min(level,this.scalingStatDistribution[21]);
		// don't scale / remove resistance, lava dredger
		if( this.stats[n] != null && this.stats[n][0] > 50 ) {
			this.stats[9] = this.stats[n];
			this.stats[n] = null;
		}
		
		if( this.itemClass == 4 ) {
			switch( this.inventorySlot ) {
			case 1:
				this.armor = SCALING_STAT_VALUE[level][19+this.itemSubClass];
				statValue = SCALING_STAT_VALUE[level][7];
				break;
			case 3:
				this.armor = SCALING_STAT_VALUE[level][11+this.itemSubClass];
				statValue = SCALING_STAT_VALUE[level][8];
				break;
			case 5:
			case 20:
				this.armor = SCALING_STAT_VALUE[level][15+this.itemSubClass];
				statValue = SCALING_STAT_VALUE[level][7];
				break;
			case 7:
				this.armor = SCALING_STAT_VALUE[level][23+this.itemSubClass];
				statValue = SCALING_STAT_VALUE[level][7];
				break;
			case 11:
				statValue = SCALING_STAT_VALUE[level][9];
				break;
			case 12:
				statValue = SCALING_STAT_VALUE[level][8];
				break;
			case 16:
				this.armor = SCALING_STAT_VALUE[level][44];
				statValue = SCALING_STAT_VALUE[level][9];
				break;
			}
			switch( this.unmodifiedSubClass ) {
			case 4:
				if( level >= 40 ) {
					this.itemSubClass = 4;
				}
				else {
					this.itemSubClass = 3;
				}
				this.itemSubClassName[0] = locale['a_armor'][this.itemSubClass];
				break;
			case 3:
				if( level >= 40 ) {
					this.itemSubClass = 3;
				}
				else {
					this.itemSubClass = 2;
				}
				this.itemSubClassName[0] = locale['a_armor'][this.itemSubClass];
				break;
			}
		}
		else if( this.itemClass == 2 ) {
			var iscMask = 1<<this.itemSubClass;
			// ranged
			if( iscMask&(1<<2|1<<3|1<<18) ) {
				statValue = SCALING_STAT_VALUE[level][10];
				dps = SCALING_STAT_VALUE[level][4];
			}
			// one-hand / caster 0 4 7 11 13 15 
			else if( iscMask&(1<<0|1<<4|1<<7|1<<11|1<<13|1<<15) ) {
				statValue = SCALING_STAT_VALUE[level][11];
				dps = SCALING_STAT_VALUE[level][ this.typeMask2&512 ? 2 : 0 ];
			}
			// two-hand / caster 1 5 6 8 10 12 17 20
			else if( iscMask&(1<<1|1<<5|1<<6|1<<8|1<<10|1<<12|1<<17|1<<20) ) {
				statValue = SCALING_STAT_VALUE[level][7];
				dps = SCALING_STAT_VALUE[level][ this.typeMask2&512 ? 3 : 1 ];
			}
		}
		
		if( statValue ) {
			for( var i=0; i<10; i++ ) {
				if( this.scalingStatDistribution[i] > 0 ) {
					this.stats[n++] = [
						this.scalingStatDistribution[i],
						Math.floor( this.scalingStatDistribution[i+10] * statValue / 10000 )
					];
				}
			}
			// Caster weapons spell power
			if((this.typeMask2&512) && ( this.itemClass == 2 ) && (SCALING_STAT_VALUE[level][6]>0)) {
				this.stats[n++] = [45, SCALING_STAT_VALUE[level][6]];
			}
		}
		
		if( dps ) {
			this.dps = dps;
			this.minDamage = Math.floor( this.dps * this.delay * ( 1 - this.damageRange/2 ) / 1000);
			this.maxDamage = Math.floor ( this.dps * this.delay * ( 1 + this.damageRange/2 ) / 1000);
		}
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	RANDOM ENCHANTMENTS
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	setRandomEnchantment : function( id ) {
		if( this.selectedRandomEnchantment && id == this.selectedRandomEnchantment.id ) {
			return;
		}
		
		this.restore();
		
		if( id == 0 ) {
			this.selectedRandomEnchantment = null;
			this.name = this.unmodifiedName;
			return;
		}

		if( this.randomEnchants ) {
			for( var i=0; i< this.randomEnchants.length; i++ ) {
				if( this.randomEnchants[i].id == id ) {
					this.selectedRandomEnchantment = this.randomEnchants[i].clone();
					this.name = this.unmodifiedName+" "+this.selectedRandomEnchantment.name;
					return;
				}
			}
		}
		
		throw new Error("Unable to set random property (ID:"+id+")");
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	ADD AND REMOVE ENCHANTS
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	/**
	 * @param {SpellItemEnchantment} enchant
	 * @returns {SpellItemEnchantment} Replaced Enchant
	 */
	addEnchant : function( enchant ) {
		if( !enchant ) {
			return null;
		}
		
		for( var i=0; i<this.enchants.length; i++ ) {
			var e = this.enchants[i];
			
			if( e.types[0] == 7 && enchant.types[0] == 7 || e.types[0] != 7 && enchant.types[0] != 7 ) {
				var old = e;
				this.enchants[i] = enchant;
				return old;
			}
		}
		this.enchants.push(enchant);
		return null;
	},
	/**
	 * @param {SpellItemEnchantment} enchant
	 */
	removeEnchant : function( enchant ) {
		if( !enchant ) {
			return;
		}
		for( var i=0; i<this.enchants.length; i++ ) {
			if( this.enchants[i].id == enchant.id ) {
				this.enchants.splice(i,1);
				return;
			}
		}
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	ADD AND REMOVE GEMS, SOCKET BONUSSES
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	/**
	 * @param {Item} gem
	 * @param {number} socketIndex
	 */
	addGem : function( gem, socketIndex ) {	
		this._addGem(gem, socketIndex, false);
	},
	/**
	 * @param {Item} gem
	 * @param {number} socketIndex
	 */
	addGemForced : function( gem, socketIndex ) {
		this._addGem(gem, socketIndex, true);
	},
	/**
	 * @param {Item} gem
	 * @param {number} socketIndex
	 * @param {boolean} force
	 */
	_addGem : function( gem, socketIndex, force ) {
		if( gem )
		{
			if( !force 
					&& this.characterScope != null 
					&& (gem.unique > 0 || gem.isUniqueEquipped() == true)
					&& (this.gems[socketIndex] == null || this.gems[socketIndex].id != gem.id)
			) {
				if( ! this.characterScope.testGemUnique( gem.id ) ) {
					throw new InvalidGemException( gem, this, InvalidGemException.CAUSE_UNIQUE );
				}
			}
			
			if( this.socketColors[socketIndex] != 1 && gem.itemSubClass == 6 ||
				this.socketColors[socketIndex] == 1 && gem.itemSubClass != 6 ) 
			{
				return;
			}
			if( gem.gemProperties && gem.gemProperties.reqItemLevel > this.level ) {
				if( ! force ) {
					throw new InvalidGemException( gem, this, InvalidGemException.CAUSE_ITEM_LEVEL );
				}
				return;
			}
			gem.setCharacterScope(this.characterScope);
		}
		this.gems[socketIndex] = gem;
	},
	/**
	 * @param {number} socketIndex
	 */
	removeGem : function( socketIndex ){
		this.gems[socketIndex] = null;
	},
	/**
	 * @return {boolean}
	 */
	isSocketBonusActive: function(){
		var r = true;
		if( !this.socketBonus ) {
			return false;
		}
		for(var i=0;i<3;i++)
		{
			if(this.socketColors[i])
			{
				if( this.gems[i] == null ) { 
					return false;
				}
				switch(this.socketColors[i])
				{
					case 1:
						if(this.gems[i].itemSubClass!=6) 
							return false;
							break;
					case 2:
						if(!(Math.pow(2,this.gems[i].itemSubClass)&(1+8+32+256))) 
							return false;
						break;
					case 4:
						if(!(Math.pow(2,this.gems[i].itemSubClass)&(4+16+32+256))) 
							return false;
						break;
					case 8:
						if(!(Math.pow(2,this.gems[i].itemSubClass)&(2+8+16+256))) 
							return false;
						break;
				}
			}
		}
		return r;
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	ACTIVE SPELLS
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	getActiveSpells : function() {
		var auras = this.characterScope.auras;
		var i, tmp;
		
		for ( i = 0; i < 5; i++) { 
			tmp = this.spells[i];
			if ( tmp && this.spellTriggers[i] == 1 ) { 
				auras.add(this.spells[i]);
			}
		}
		
		for ( i = 0; i < 3; i++) {
			tmp = this.gems[i];
			if ( tmp ) { 
				tmp.getActiveSpells(auras);
			}
		}
		
		for( i=0; i<this.enchants.length; i++ ) {
			this.enchants[i].getActiveSpells(auras);
		}
			
		if (this.socketBonus != null && this.isSocketBonusActive()) 
			this.socketBonus.getActiveSpells(auras);
		
		if (this.gemProperties != null && this.gemProperties.enchant.isActive(this.characterScope)) 
			this.gemProperties.enchant.getActiveSpells(auras);
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	MISC ITEM INFORMATION, UNIQUE, MELEE WEAPON ETC.
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	/** @returns {boolean} */
	isUnique: function(){return (this.unique>0);},
	/** @returns {boolean} */
	isUniqueEquipped: function() {return (this.typeMask & (1<<19)) != 0; },
	isMeleeWeapon: function(){
		return this.itemClass == 2 
			&& ((1<<this.itemSubClass) & ((1<<0) + (1<<4) + (1<<5) + (1<<6) + (1<<7) + (1<<8) + (1<<10) + (1<<13) + (1<<15) ));
	},
	isStatPresent: function( stat ) {
		var i, enchant;
		for( i=0; i<this.stats.length; i++ ) {
			if( this.stats[i] ) {
				if( this.stats[i][0] == stat ) {
					if( this.reducedStat != stat ) {
						return this.stats[i][1];
					}
					return this.reducedStatValue;
				}
			}
		}
		if( this.selectedRandomEnchantment ) {
			for( i=0; i<this.selectedRandomEnchantment.enchants.length; i++ ) {
				enchant = this.selectedRandomEnchantment.enchants[i];
				if( enchant && enchant.types[0] == 5 ) {
					if(enchant.spellIds[0] == stat) {
						if( this.reducedStat != stat ) {
							return enchant.values[0];
						}
						return this.reducedStatValue;
					}
				}
			}
		}
		return 0;
	},
	hasAdditionalSocket: function() {
		var s = 0, g = 0;
		for( var i=0; i<3; i++ ) {
			if( this.gems[i] ) {
				g++;
			}
			if( this.socketColors[i] ) {
				s++;
			}
		}
		return g > s;
	},
	getStatWeightBasedScore: function( weights ) {
		var s = 0;
		for( var i=0; i<10; i++ ) {
			if( this.stats[i] != null && this.stats[i][0] > 0 ) {
				s += weights[this.stats[i][0]] * this.stats[i][1];
			}
		}
		if( this.gemProperties ) {
			s += this.gemProperties.enchant.getStatWeightBasedScore(weights);
		}
		return s;
	},
	clone: function() {
		return new Item(this.serialized);
	},
	getStatValue: function( stat ) {
		var j;
		for( j=0; j<this.stats.length; j++ ) {
			if( this.stats[j] && this.stats[j][0] == stat ) {
				return this.stats[j][1];
			}
		}
		if( this.selectedRandomEnchantment ) {
			for( j=0; j<this.selectedRandomEnchantment.enchants.length; j++ ) {
				var e = this.selectedRandomEnchantment.enchants[j];
				if( e && e.types[0] == 5 && e.spellIds[0] == stat ) {
					return e.values[0];
				}
			}
		}
		return 0;
	}
};