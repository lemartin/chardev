/**
 * @constructor
 */
function Character() {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('race_change', ['race']);
	this.eventMgr.registerEvent('class_change', ['class']);
	this.eventMgr.registerEvent('level_change', ['level']);
	this.eventMgr.registerEvent('character_loaded', ['character']);
	this.eventMgr.registerEvent('stats_change', ['stats']);
	this.eventMgr.registerEvent('preview_stats_change', ['previewStats']);
	this.eventMgr.registerEvent('profession_change', ['index','profession']);
	this.eventMgr.registerEvent('profession_level_change', ['index','level']);

	this.eventMgr.registerEvent('item_change', ['slot']);
	this.eventMgr.registerEvent('gem_change', ['slot','socket']);
	this.eventMgr.registerEvent('enchant_change', ['slot']);
	this.eventMgr.registerEvent('reforge_change', ['slot']);
	this.eventMgr.registerEvent('random_enchant_change', ['slot']);
	
	this.eventMgr.registerEvent('talents_reset', []);
	this.eventMgr.registerEvent('talent_tree_reset', ['tree']);
	this.eventMgr.registerEvent('talent_tree_selected', ['tree']);
	this.eventMgr.registerEvent('talent_point_added', ['tree','row','col','remainingPoints']);
	this.eventMgr.registerEvent('talent_point_removed', ['tree','row','col','remainingPoints']);
	this.eventMgr.registerEvent('talent_distribution_set', ['distribution']);
	this.eventMgr.registerEvent('talents_init', []);
	
	this.eventMgr.registerEvent('buffs_change', []);

	this.eventMgr.registerEvent('shapeform_change', ['new_shape','old_shape']);
	this.eventMgr.registerEvent('presence_change', ['new_presence','old_presence']);
	
	var talentHandler = new Handler(function(e) {
		this.eventMgr.refire(e);
	}, this);
	
	this.primaryProfessions = [null, null];
	this.stats = new Stats(this);
	this.previewStats = new Stats(this);
	this.inventory = new Inventory( this );
	this.auras = new Auras( this );
	this.buffs = new Buffs();
	this.talentObserver = new GenericObserver([
		'talents_reset', 'talent_tree_reset','talent_tree_selected','talent_point_added',
		'talent_point_removed','talent_distribution_set','talents_init'
	], talentHandler);
	
	this.buffs.addObserver(new GenericObserver(['change','remove_buff','remove_stack'], new Handler(function(e){
		
		if( e.is('remove_buff') ) {
			// check if removed buff is a shape
			var shape = this.chrClass ? this.chrClass.shape : null;
			
			if( shape ) {
				for( var k in shape.buffs ) {
					if( e.get('buff').spell.id == shape.buffs[k].spell.id ) {
						this.setShapeform(0);
						break;
					}
				}
			}
		}
		
		if( ! e.get('silent') ) {
			this.calculateStats();
		}
		this.eventMgr.fire('buffs_change', {});
	},this)));
	
	this.classObserver = new GenericObserver(['shapeform_change','presence_change'], new Handler(function(e) {
		if( e.is('shapeform_change')) {
			var oldShape = e.get('old_shape');
			var newShape = e.get('new_shape');
			var i;
			// Remove old shape buffs
			if ( oldShape ) {
				for( i=0; i<oldShape.buffs.length; i++) {
					this.buffs.removeInternal(oldShape.buffs[i].spell.id, true);
				}
			}
			// Add new shape buffs
			if( newShape ) {
				for( i=0; i<newShape.buffs.length; i++) {
					this.buffs.addInternal( newShape.buffs[i].spell.id , this.chrClass.id == WARRIOR, true );
				}
			}
			this.eventMgr.refire(e);
		}
		else if( e.is('presence_change')) {

			var oldPresence = e.get('old_presence');
			var newPresence = e.get('new_presence');
			
			if( oldPresence ) {
				this.buffs.removeInternal(oldPresence.spell.id, true);
			}
			
			if( newPresence ) {
				this.buffs.addInternal( newPresence.spell.id , true, true );
			}
			
			this.eventMgr.refire(e);
		}
	}, this));
	
	this.setLevel(Character.MAX_LEVEL);
	this.name = "";
	this.description = "";
	//
	// TODO
	this.__lastSaved = null; 
}

Character.MAX_LEVEL = 85;

Character.prototype = {
	/** @type{GenericSubject} **/
	eventMgr: null,
	/** @type{GenericObserver} **/
	talentObserver: null,
	/** @type{GenericObserver} **/
	classObserver: null,
	/** @type{CharacterRace} **/
	chrRace: null,
	/** @type{CharacterClass} **/
	chrClass: null,
	/** @type{number} **/
	level: Character.MAX_LEVEL,
	/** @type{Inventory} **/
	inventory: null,
	/** @type{Buffs} **/
	buffs: null,
	/** @type{Object} **/
	primaryProfessions: null,
	/** @type{Stats} **/
	stats: null,
	/** @type{Stats} **/
	previewStats: null,
	/** @type{Auras} **/
	auras: null,
	/** @type{string} **/
	description: "",
	/** @type{string} **/
	name: "",
	__lastSaved: null,
	/**
	 * @param {GenericObserver} observer
	 */
	addObserver: function( observer ) {
		this.eventMgr.addObserver(observer);
	},
	/**
	 * @param {GenericObserver} observer
	 */
	removeObserver: function( observer ) {
		this.eventMgr.removeObserver(observer);
	},
	setLevel : function( level ) {		
		if (level >= this.getMinLevel() && level <= MAX_LEVEL ) {
			if ( this.chrClass != null ) {
				this.chrClass.setLevel(level);
			}
			this.level = level;
			
			for( var i=0; i<2; i++ ) {
				if( !this.primaryProfessions[i] ) {
					continue;
				}
				if( 0 == GameInfo.getMaximumProfessionLevel(this.primaryProfessions[i].id, this.level) ) {
					this.primaryProfessions[i] = null;
				}
				this.primaryProfessions[i].setLevel(this.level);
			}
		}
		else {
			throw new InvalidCharacterLevelException( level );
		}

		this.calculateStats();
		
		this.eventMgr.fire('level_change', {'level': level});
	},
	/**
	 * @param {CharacterClass} chrClass
	 */
	setClass: function( chrClass ) {
		
		if( this.chrClass != null ) {
			this.chrClass.talents.removeObserver(this.talentObserver);
			this.chrClass.removeObserver(this.classObserver);
		}
		
		if( chrClass != null ) {
			if( this.chrRace == null || ! this.chrRace.isValidCharacterClass(chrClass.id) ) {
				throw new IllegalRaceClassException( this.chrRace, chrClass );
			}
			this.chrClass = chrClass;
			try {
				this.chrClass.setLevel(this.level);
			}
			catch (e) {
				if( e instanceof InvalidCharacterLevelException ) {
					if( e.level > Character.MAX_LEVEL ) {
						this.chrClass.setLevel(Character.MAX_LEVEL);
					}
					else {
						this.chrClass.setLevel(this.getMinLevel());
					}
				}
				else {
					Tools.rethrow(e);
				}
			}
			this.chrClass.talents.addObserver(this.talentObserver);
			this.chrClass.addObserver(this.classObserver);
		}
		else {
			this.chrClass = null;
		}
		
		this.calculateStats();

		this.eventMgr.fire('class_change', {'class': chrClass});
	},
	/**
	 * @param {CharacterRace} chrRace
	 */
	setRace: function( chrRace ) {
		if( chrRace == null ) {
			this.setClass(null);
		}
		else {
			if( this.chrClass != null && ! chrRace.isValidCharacterClass( this.chrClass.id) ) {
				this.setClass(null);
			}
			this.chrRace = chrRace;
		}
		
		this.calculateStats();
		this.eventMgr.fire('race_change', {'race': chrRace});
	},
	serialise : function() {
		//TODO serialise character
	},
	calculateStats: function() {
		this.stats.calculate( false, false );
		this.eventMgr.fire('stats_change', {'stats': this.stats});
	},
	calculatePreviewStats: function() {
		this.previewStats.calculate( true, false );
		this.eventMgr.fire('preview_stats_change', {'previewStats': this.previewStats});
		this.inventory.removePreview();
	},
	resetPreviewStats: function() {
		this.eventMgr.fire('preview_stats_change', {'previewStats': null});
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	USABLE ITEMS AND ABILITIES
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	/**
	 * @param {Item} itm
	 * @returns {boolean}
	 */
	canWear: function( itm ) {
		if( itm.itemClass == 4 ) {
			if( ((1<<itm.itemSubClass) & this.getArmorMask()) != 0) {
				return true;
			}
		}
		else if( itm.itemClass == 2 ) {
			return true;
		}
		return false;
	},
	fitsItemClassRequirements: function( itm ) {
		return itm.chrClassMask == 0 || 
			(itm.chrClassMask&(1535)) == 1535
			|| this.chrClass != null && ( itm.chrClassMask&(1<<(this.chrClass.id-1))) != 0; 
	},
	/**
	 * @public
	 * @param {number} slot
	 * @returns {number} blizzard slot mask
	 */
	chardevSlotToBlizzardSlotMask: function( slot ) {
		switch( slot ) {
		case 0: return 1<<1;
		case 1: return 1<<2;
		case 2: return 1<<3;
		case 3: return 1<<16;
		case 4: return 1<<20|1<<5;
		case 5: return 1<<4;
		case 6: return 1<<19;
		case 7: return 1<<9;
		case 8: return 1<<10;
		case 9: return 1<<6;
		case 10: return 1<<7;
		case 11: return 1<<8;
		case 12: return 1<<11;
		case 13: return 1<<11;
		case 14: return 1<<12;
		case 15: return 1<<12;
		case 16: 
			if( this.chrClass != null ) {
				switch( this.chrClass.id ) {
				case ROGUE	: return 1<<21|1<<13;
				default: return 1<<21|1<<17|1<<13;
				}
			}
			return 1<<21|1<<13;
		case 17: 
			if( this.chrClass != null ) {
				switch( this.chrClass.id ) {
				case WARRIOR	: return 1<<23|1<<14| ( this.chrClass.talents.selectedTree == 1 ? 1<<13|1<<22 : 0 ) | ( this.canDualWieldTwoHandedWeapons() ? 1<<17 : 0 );
				case PALADIN	: return 1<<23|1<<14;
				case HUNTER 	: return 1<<23|1<<22|1<<13;
				case ROGUE		: return 1<<23|1<<22|1<<13;
				case DEATHKNIGHT: return 1<<23|1<<22|1<<13;
				case SHAMAN		: return 1<<23|1<<14| ( this.chrClass.talents.selectedTree == 1 ? 1<<13|1<<22 : 0 );
				default			: return 1<<23;
				}
			}
			return 1<<23;
		}
		return 0;
	},
	getDefaultArmorMask: function() {
		var defaultMask = 1<<0|1<<1|1<<2|1<<3|1<<4;
		if( this.chrClass != null ) {
			switch( this.chrClass.id ) {
			case 1: defaultMask = this.level >= 40 ? 1<<4 : 1<<3; break;
			case 2: defaultMask = this.level >= 40 ? 1<<4 : 1<<3; break;
			case 3: defaultMask = this.level >= 40 ? 1<<3 : 1<<2; break;
			case 4: defaultMask = 1<<2; break;
			case 5: defaultMask = 1<<1; break;
			case 6: defaultMask = 1<<4; break;
			case 7: defaultMask = this.level >= 40 ? 1<<3 : 1<<2; break;
			case 8: defaultMask = 1<<1; break;
			case 9: defaultMask = 1<<1; break;
			case 11: defaultMask = 1<<2; break;
			}
		}
		return defaultMask;
	},
	chardevSlotToItemClass: function( slot ) {	
		switch( slot ) {
		case 0:
		case 2:
		case 4:
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
			return [4,this.getDefaultArmorMask()];
		case 3: 
			return [4,1<<1];
		case 5: 
		case 6: 
			return [4,1<<0|1<<1];
		case 1:
		case 12:
		case 13:
		case 14:
		case 15:
			return [4,1<<0];
		case 18:
			if( this.chrClass != null ) {
				switch( this.chrClass.id ) {
				case WARLOCK:
				case MAGE:
				case PRIEST:
					return [2,1<<19];
				case WARRIOR:
				case HUNTER:
				case ROGUE:
					return [2,1<<2|1<<3|1<<16|1<<18];
				case PALADIN:
				case SHAMAN:
				case DEATHKNIGHT:
				case DRUID:
					return [4,1<<11];
				}
			}
			return [100,1];
		}
		return [-1,0];
	},
	getArmorMask: function() {
		if( this.chrClass != null ) {
			switch( this.chrClass.id ) {
			case 1:
				return ( this.level >= 40 ? 31 : 15 ) + 64;
			case 2:
				return ( this.level >= 40 ? 31 : 15 ) + 64 + 2048;
			case 6:
				return ( this.level >= 40 ? 31 : 15 ) + 2048;
			case 3: 
				return this.level >= 40 ? 15 : 7;
			case 7:
				return ( this.level >= 40 ? 15 : 7 ) + 64 + 2048;
			case 11:
				return 7 + 2048;
			case 4: 
				return 7;
			case 5:
			case 8:
			case 9:
				return 3;
			}
		}
		return 31;
	},
	canDualWieldTwoHandedWeapons : function(){
		return this.chrClass != null && this.chrClass.id == WARRIOR && this.chrClass.talents.talents[1][6][1].spent > 0;
	},
	hasMana: function() {
		if( this.chrClass == null ) { 
			return false;
		}
		return GameInfo.hasMana(this.chrClass.id,0/*TODO shapeform*/);
	},
	/**
	 * @public
	 * @returns {number} energy type
	 */
	getEnergyType: function() {
		if( this.chrClass == null ) { 
			return NO_ENERGY;
		}
		return GameInfo.getEnergyType(this.chrClass.id,0/*TODO shapeform*/);
	},
	isSpellAffine: function() {
		var clId = this.chrClass ? this.chrClass.id : 0;
		var tt = this.chrClass ? this.chrClass.talents.selectedTree : -1;
		
		return clId == WARLOCK || clId == PRIEST || clId == MAGE || clId == DRUID && tt != 1 || clId == SHAMAN && tt != 1 || clId == PALADIN && tt != 2;
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	PROFESSIONS
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	setProfession: function( index, id ) {
		if( id > 0 ) {
			this.primaryProfessions[index] = new Profession(this,SERIALIZED_PROFESSIONS[id]);
		}
		else {
			this.primaryProfessions[index] = null;
		}

		this.calculateStats();
		
		this.eventMgr.fire('profession_change', {'index': index, 'profession': this.primaryProfessions[index]});
	},
	setProfessionLevel: function( index, level ) {
		
		this.primaryProfessions[index].setLevel(level);
		
		this.calculateStats();

		this.eventMgr.fire('profession_level_change', {'index': index, 'level': this.primaryProfessions[index].level});
		
	},
	hasBlacksmithingSocket : function(slot)
	{
		var bs = this.getPrimaryProfessionById(PRIMARY_PROFESSION_BLACKSMITHING);
		if( 
			( slot == 7 || slot == 8 ) 
			&& this.inventory.get(slot) != null 
			&& this.inventory.get(slot).level >= 60 
			&& bs != null
			&& bs.level >= 400 )
		{
			return true;
		}
		if( slot == 9 && this.level >= 70 && this.inventory.get(slot) != null && this.inventory.get(slot).level >= 80)
		{
			return true;
		}
		return false;
	},
	
	/**
	 * @param {number} skillLineId
	 */
	getPrimaryProfessionById : function( skillLineId ) {
		if( this.primaryProfessions[0] && this.primaryProfessions[0].id == skillLineId ) {
			return this.primaryProfessions[0];
		}
		else if( this.primaryProfessions[1] && this.primaryProfessions[1].id == skillLineId ) {
			return this.primaryProfessions[1];
		}
		return null;
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	ACTIVE SPELLS
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	__testAndApplyIndirectAura: function( spellId ) {
		//
		// If the spell applying the aura is available and not already applied, 
		// add the spell as new buff.
		//
		if( 
			  this.auras.isActive(spellId) && 
			! this.buffs.isActive(spellId) 
		) {
			this.buffs.addInternal(spellId, false, true );
		}
		//
		// If the spell is not specc'ed, and an internal buff is active,
		// remove the buff.
		//
		else if( 
			! this.auras.isActive(spellId) && 
			  this.buffs.isActive(spellId)
		) {
			this.buffs.removeInternal(spellId, false );
		}
	},
	getActiveSpells: function() {
		var bs = this.buffs.buffs, i = 0;
		//var professionBuffs = [];
		
		if (this.chrClass) { 
			this.chrClass.getActiveSpells(this.auras);
		}
		
		if (this.chrRace) { 
			this.chrRace.getActiveSpells(this.auras);
		}
		
		for( i=0; i<2; i++ ) {
			if( !this.primaryProfessions[i] ) {
				continue;
			}
			var s = this.primaryProfessions[i].getBuffSpell();
			if( s ) {
				//professionBuffs.push(s.id);
				this.auras.add(s);
			}
		}
		//this.buffs.setProfessionBuffs(professionBuffs);
		
		if( this.chrClass ) {
			switch( this.chrClass.id ) {
			case WARRIOR:
				this.__testAndApplyIndirectAura( RAMPAGE );
				break;
			case HUNTER:
				this.__testAndApplyIndirectAura( HUNTING_PARTY);
				break;
			case ROGUE:
				this.__testAndApplyIndirectAura( HONOR_AMONG_THIEVES );
				this.__testAndApplyIndirectAura( MASTER_OF_SUBTLETY );
				break;
			case DEATHKNIGHT:
				this.__testAndApplyIndirectAura( IMPROVED_ICY_TALONS );
				break;
			case SHAMAN:
				this.__testAndApplyIndirectAura( ELEMENTAL_OATH );
				break;
			case DRUID:
				if( this.auras.isActive(17007) && this.chrClass != null && ((1<<this.chrClass.shapeform) & (1<<CAT|1<<BEAR|1<<DIRE_BEAR)) != 0 ) {
					this.buffs.addInternal(LEADER_OF_THE_PACK, false, false);
				}
				else {
					this.buffs.removeInternal(LEADER_OF_THE_PACK, false);
				}
				break;
			}
		}
		
		for( i in bs ) {
			this.auras.addBuff(bs[i]);
		}
	},
	isWeaponSlot: function( slot ) {
		return slot == 16 || 
			slot == 17 && this.chrClass != null && GameInfo.canDualWield( this.chrClass.id ) || 
			slot == 18 && this.chrClass != null && ( 1<<this.chrClass.id & (1<<WARRIOR|1<<ROGUE|1<<HUNTER|1<<PRIEST|1<<MAGE|1<<WARLOCK)) != 0;
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	SERIALISE AND DESERIALISE
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	load: function(profile)
	{
		var i, j=0, itm, gem, spell;
		if( profile == null ) {
			return;
		}
		this.name = profile[0][0];
		this.description = profile[0][1];
		this.setRace(new CharacterRace(this,profile[0][2]));
		this.setClass(new CharacterClass(profile[0][3]));
		this.setLevel(profile[0][4]);

		if( this.chrClass ) {
			this.chrClass.setShapeform(profile[0][5]?profile[0][5]:0);
		}
		
		var presence = profile[0][6] ? profile[0][6] : 0 ;
		if( presence == 0 && this.chrClass != null && this.chrClass.id == DEATHKNIGHT ) {
			switch( profile[4] ) {
			case 0: presence = BLOOD_PRESENCE; break;
			case 1: presence = FROST_PRESENCE; break;
			case 2: presence = UNHOLY_PRESENCE; break;
			default: presence = BLOOD_PRESENCE; break;
			}
			this.chrClass.setPresence(presence);
		}
		
		if( this.chrClass ) {
			if( profile[4] === 2 || profile[4] === 1 || profile[4] === 0 ) {
				this.chrClass.talents.selectTree(profile[4]);
			}
			if( profile[2] ) {
				this.chrClass.talents.setDistribution(profile[2],true);
			}
			
			if( profile[5] ) {
				for( i=0; i<profile[5].length; i++ ) {
					if( !profile[5][i] ) {
						continue;
					}
					this.setProfession( i, profile[5][i][0] );
					this.primaryProfessions[i].setLevel(profile[5][i][1]);
				}
			}
			
			for( i=0; i<profile[3].length;i++ ) {
				if( !profile[3][i] ) {
					continue;
				}
				var g = new Glyph(profile[3][i]);
				this.chrClass.addGlyph( g );
			}
		}
		
		for( i=0; i<INV_ITEMS; i++ ) {
			if( ! profile[1][i] ) {
				continue;
			}
			if( profile[1][i][0] ) {
				itm = new Item(profile[1][i][0]);
				try {
					this.inventory.set(i,itm);
				}
				catch( e ) {
					if( e instanceof InvalidItemException ) {
						// continue with the next item
						continue;
					}
					// else rethow the exception, to be handled somewhere else
					Tools.rethrow(e);
				}
				for( j=0; j<3; j++ ) {
					if ( profile[1][i][1+j] ) {
						gem = new Item(profile[1][i][1+j]);
						itm.addGem( gem ,j);
						ItemCache.set(gem.clone());
					}
				}
				if( profile[1][i][4] ) {
					itm.addEnchant( new SpellItemEnchantment( profile[1][i][4] ) );
				}
				/*random properties, apply before reforging!*/
				if( profile[1][i][6] != null && profile[1][i][6] != 0 ) {
					itm.setRandomEnchantment(profile[1][i][6]);
				}
				if( profile[1][i][5] && profile[1][i][5][0] != -1 && profile[1][i][5][1] != -1 ) {
					try {
						itm.reforge(profile[1][i][5][0], profile[1][i][5][1]);
					}
					catch( e ) {
						if( e instanceof InvalidReforgeException ) {
							// ignore the reforge
						}
						else {
							Tools.rethrow(e);
						}
					}
				}
				if( profile[1][i][7] ) {
					for( j=0; j<profile[1][i][7].length; j++ ) {
						itm.addEnchant( new SpellItemEnchantment( profile[1][i][7][j] ) );
					}
				}
				ItemCache.set(itm.clone());
			}
			else {
				this.inventory.remove(i);
			}
		}
		
		for( i in profile[6] ) {
			spell = new Spell(profile[6][i][0]);
			SpellCache.set(spell);
			this.buffs.set(new Buff(spell,profile[6][i][1]));
		}
		this.calculateStats();
		
		// TODO
		//this.lastSaved = this.toArray();
		
		this.eventMgr.fire('character_loaded', {'character': this});
	},
	getMinLevel: function(){
		if( this.chrClass != null && this.chrClass.id == DEATHKNIGHT ) {
			return 55;
		}
		return 1;
	},
	toArray: function() {
		var s = [], i,j, itm, bs;
		var shapeform = this.chrClass ? this.chrClass.shapeform : 0;
		var presence = this.chrClass != null && this.chrClass.presence != null ? this.chrClass.presence.spell.id : 0;
		//
		//
		//
		this.chrClass.setShapeform(0);
		this.chrClass.setPresence(0);
		//
		s[0] = [
		        this.name,
		        this.description,
		        this.chrRace ? this.chrRace.id : 0,
		        this.chrClass ? this.chrClass.id : 0,
		        this.level,
		        shapeform,
		        presence
		];
		s[1] = [];
		for( i=0; i<INV_ITEMS; i++ ) {
			itm = this.inventory.items[i][0];
			if( itm == null ) {
				s[1][i] = null;
				continue;
			}
			s[1][i] = [];
			s[1][i][0] = itm.id;
			s[1][i][1] = itm.gems[0] ? itm.gems[0].id : 0;
			s[1][i][2] = itm.gems[1] ? itm.gems[1].id : 0;
			s[1][i][3] = itm.gems[2] ? itm.gems[2].id : 0;
			s[1][i][4] = itm.enchants.length > 0 ? itm.enchants[0].id : null;
			s[1][i][5] = [ itm.reducedStat, itm.addedStat ];
			s[1][i][6] = itm.selectedRandomEnchantment ? itm.selectedRandomEnchantment.id : 0;
			s[1][i][7] = [];
			for( j=1; j<itm.enchants.length; j++ ) {
				s[1][i][7].push(itm.enchants[j].id);
			}
		}
		s[2] = ( this.chrClass ? this.chrClass.talents.getDistribution(true) : [] );
		s[3] = [];
		if( this.chrClass ) {
			for( i=0; i<this.chrClass.glyphs.length; i++ ) {
				for( j=0; j<this.chrClass.glyphs[i].length; j++ ) {
					if( this.chrClass.glyphs[i][j] ) {
						s[3].push(this.chrClass.glyphs[i][j].id);
					}
				}
			}
		} 
		s[4] = ( this.chrClass ? this.chrClass.talents.selectedTree : -1 );
		s[5] = [null, null];
		for( i=0; i<2; i++ ) {
			var p = this.primaryProfessions[i];
			if( p ) {
				s[5][i] = [p.id, p.level];
			}
			else {
				s[5][i] = null;
			}
		}
		s[6] = [];
		
		bs = this.buffs.buffs;
		for( i in bs ) {
			if( !bs[i] || bs[i].isDummy ) {
				continue;
			}
			s[6].push( [bs[i].spell.id,bs[i].stacks] );
		}
		//
		//
		//
		this.chrClass.setShapeform(shapeform);
		this.chrClass.setPresence(presence);
		//
		return s;
	},
	toBattleNetProfile: function() {
		var i, j, enchant, itemsObj = { 'averageItemLevel': 0, 'averageItemLevelEquipped': 0 },
		slot, ttParamsObj, itm, talentObj,
		talents = this.chrClass != null ? this.chrClass.talents : null, glyph,
		glyphs = [[],[],[]], primaryProfessions= [];
	
		for( i=0; i<INV_ITEMS; i++ ) {
			itm = this.inventory.items[i][0];
			if( itm == null ) {
				continue;
			}
			
			slot = SLOT_TO_NAME[i]; 
			
			
			ttParamsObj= {};
			
			for( j=0; j<itm.enchants.length; j++ ) {
				enchant = itm.enchants[j];
				if( enchant.types[0] == 7 ) {
					ttParamsObj['tinker'] = enchant.id;
				}
				else {
					ttParamsObj['enchant'] = enchant.id;
				}
			}
			
			for( j=0; j<3; j++ ) {
				if( itm.gems[j] ) {
	        		ttParamsObj['gem'+j] = itm.gems[j].id;
	        	}
			}
			
			if( itm.hasAdditionalSocket() ) {
				ttParamsObj['extraSocket'] = true;
			}
			
			if( itm.reducedStat != -1 && itm.addedStat != -1 ) {
				ttParamsObj['reforge'] = STAT_TO_REFORGABLE_STAT[itm.reducedStat] * 7 + 
					113 + STAT_TO_REFORGABLE_STAT[itm.addedStat] - ( itm.addedStat > itm.reducedStat ? 1 : 0 )
				;
			}
			
			if( itm.selectedRandomEnchantment ) {
				ttParamsObj['suffix'] = itm.selectedRandomEnchantment.id;
			}
			
			itemsObj[slot] = {
				'icon': itm.icon,
				'id':itm.id,
				'name':itm.name,
				'quality': itm.quality,
				'tooltipParams': ttParamsObj
			};
		}
		
	
		if( this.chrClass ) {
			
			for( i=0; i<this.chrClass.glyphs.length; i++ ) {
				for( j=0; j<this.chrClass.glyphs[i].length; j++ ) {
					glyph = this.chrClass.glyphs[i][j];
					if( glyph ) {
						glyphs[i].push({
							'glyph': glyph.id,
							'item': glyph.itemId,
							'name': glyph.spell.name,
							'icon': glyph.spell.icon
						});
					}
				}
			}
			//TODO add missing values to talent obj
			talentObj = [{
				'selected': true,
				'name':talents.selectedTree != -1 ? talents.treeNames[talents.selectedTree] : "None",
				'icon': "",
				'build':talents.getDistribution(true).join(""),
				'trees': [],
				'glyphs': {
					'prime':glyphs[2],
					'major':glyphs[0],
					'minor':glyphs[1]
				}
			}];
		}
		else {
			talentObj = null;
		}
		
		for( i=0; i<2; i++ ) {
			var p = this.primaryProfessions[i];
			if( p ) {
				primaryProfessions.push({ 
					'id': p.id,
					'name': ID_TO_PROFESSION[p.id], 
					'rank': p.level
				});
			}
		}
		
		return JSON.stringify({
			'name': this.name,
			'race': ( this.chrRace != null ? this.chrRace.id : 0 ),
			'class': ( this.chrClass != null ? this.chrClass.id : 0 ),	
			'level': this.level,
			'items': itemsObj,
			'talents':talentObj,
			'professions':{
				'primary': primaryProfessions,
				'secondary': []
			}
		});
	},
	//
	//
	//	DELEGATES
	//
	//
	addItem: function( slot, itm ) {
		
		this.inventory.removePreview();
		this.resetPreviewStats();
		
		this.inventory.set(slot, itm);
		this.calculateStats();
		
		if( slot == 16 || slot == 17 ) {
			this.eventMgr.fire('item_change', {'slot': 16});
			this.eventMgr.fire('item_change', {'slot': 17});
		}
		else {
			this.eventMgr.fire('item_change', {'slot': slot});
		}
	},
	removeItem: function( slot ) {
		
		this.inventory.removePreview();
		this.resetPreviewStats();
		
		this.inventory.remove(slot);
		this.calculateStats();
		
		this.eventMgr.fire('item_change', {'slot': slot});
	},
	addGem: function( slot, socket, gem ) {

		this.inventory.removePreview();
		this.resetPreviewStats();
		
		this.inventory.items[slot][0].addGem( gem, socket );
		this.calculateStats();

		this.eventMgr.fire('gem_change', {'slot': slot, 'socket': socket});
	},
	removeGem: function( slot, socket ) {

		this.inventory.removePreview();
		this.resetPreviewStats();
		
		this.inventory.items[slot][0].addGem( null, socket );
		this.calculateStats();

		this.eventMgr.fire('gem_change', {'slot': slot, 'socket': socket});
	},
	swapItems: function( slot, index ) {
		
		this.inventory.removePreview();
		this.resetPreviewStats();
		
		this.inventory.swap(slot, index);
		this.calculateStats();
		
		if( slot == 16 || slot == 17 ) {
			this.eventMgr.fire('item_change', {'slot': 16});
			this.eventMgr.fire('item_change', {'slot': 17});
		}
		else {
			this.eventMgr.fire('item_change', {'slot': slot});
		}
	},
	addEnchant: function( slot, enchant ) {
		this.inventory.removePreview();
		this.resetPreviewStats();
		
		this.inventory.items[slot][0].addEnchant( enchant );
		this.calculateStats();

		this.eventMgr.fire('enchant_change', {'slot': slot});
	},
	setEnchantPreview: function( slot, enchantSpell ) {
		this.inventory.setEnchantPreview(enchantSpell, slot);
		this.calculatePreviewStats();
	},
	removeEnchantPreview: function( slot, enchantSpell ) {
		this.inventory.removePreview();
		this.calculatePreviewStats();
	},
	setItemRandomEnchantment: function( slot, randomEnchantmentId ) {
		this.inventory.removePreview();
		this.resetPreviewStats();
		
		this.inventory.items[slot][0].setRandomEnchantment( randomEnchantmentId );
		this.calculateStats();
	},
	setItemPreview: function( slot, itm ) {
		this.inventory.setPreview(itm, slot, -1);
		this.calculatePreviewStats();
	},
	removeItemPreview: function() {
		this.inventory.removePreview();
		this.calculatePreviewStats();
	},
	setGemPreview: function( slot, socket, itm ) {
		this.inventory.setPreview(itm, slot, socket);
		this.calculatePreviewStats();
	},
	removeGemPreview: function() {
		this.inventory.removePreview();
		this.calculatePreviewStats();
	},
	getEquippedItem: function( slot, index ) {
		if( typeof index === 'undefined' ) {
			return this.inventory.items[slot][0];
		}
		return this.inventory.items[slot][index];
	},
	testGemUnique: function( gemId ) {
		return this.inventory.testGemUnique(gemId);
	},
	getGemCount: function() {
		return this.inventory.gemCount;
	},
	getEquippedSetItems: function(setId) {
		return this.inventory.getEquippedSetItems(setId);
	},
	reforgeItem: function( slot, reduce, add) {
		var itm = this.inventory.items[slot][0];
		if( itm ) {
			itm.restore();
			itm.reforge( reduce, add );
			this.calculateStats();
		}
	},
	setReforgeItemPreview: function( slot, reduce, add) {
		var refArr = this.inventory.reforgeToArray();
		refArr[slot] = [reduce,add];
		this.inventory.setReforgePreview(refArr);
		this.calculatePreviewStats();
	},
	setReforgePreview: function( refArr ) {
		this.inventory.setReforgePreview(refArr);
		this.calculatePreviewStats();
	},
	removeReforgeItemPreview: function() {
		this.inventory.removePreview();
		this.calculatePreviewStats();
	},
	removeReforgePreview: function() {
		this.inventory.removePreview();
		this.calculatePreviewStats();
	},
	restoreItem: function( slot, reduce, add) {
		var itm = this.inventory.items[slot][0];
		if( itm ) {
			itm.restore();
			this.calculateStats();
		}
	},
	restoreAll: function() {
		this.inventory.restoreAllItems();
		this.calculateStats();
		this.calculatePreviewStats();
	},
	reforgeAll: function( refArr ) {
		
		var oldRefArr = this.inventory.reforgeToArray();
		try {
			this.inventory.restoreAllItems();
			this.inventory.reforgeFromArray(refArr);
			this.calculateStats();
			this.calculatePreviewStats();
		}
		catch( e ) {
			this.inventory.reforgeFromArray(oldRefArr);
			this.calculateStats();
			this.calculatePreviewStats();
			throw e;
		}
	},
	//
	// BUFF DELEGATES
	//
	addBuff: function( spellId ) {
		this.buffs.add(spellId, false);
		//this.calculateStats();
	},
	addStack: function( spellId ) {
		this.buffs.addStack(spellId);
		//this.calculateStats();
	},
	removeBuff: function( spellId ) {
		this.buffs.remove(spellId, false);
		//this.calculateStats();
	},
	getActiveBuffs: function() {
		return this.buffs.buffs;
	},
	//
	// TALENT DELEGATES
	//
	resetTalents: function(){
		var talents = this.chrClass != null ? this.chrClass.talents : null;
		if( talents ) {
			talents.reset();
			this.calculateStats();
		}
	},
	resetTalentTree: function( tree ) {
		var talents = this.chrClass != null ? this.chrClass.talents : null;
		if( talents ) {
			talents.resetTree(tree);
			this.calculateStats();
		}
	},
	addTalentPoint: function( tree, row, col ) {
		var talents = this.chrClass != null ? this.chrClass.talents : null;
		if( talents ) {
			talents.addPoint(tree, row, col);
			this.calculateStats();
		}
	},
	removeTalentPoint: function( tree, row, col ) {
		var talents = this.chrClass != null ? this.chrClass.talents : null;
		if( talents ) {
			talents.removePoint(tree, row, col);
			this.calculateStats();
		}
	},
	selectTalentTree: function( tree ) {
		var talents = this.chrClass != null ? this.chrClass.talents : null;
		if( talents ) {
			talents.selectTree(tree);
			this.calculateStats();
		}
	},
	setTalentDistribution: function( distribution, condensed) {
		var talents = this.chrClass != null ? this.chrClass.talents : null;
		if( talents ) {
			talents.setDistribution(distribution, condensed);
			this.calculateStats();
		}
	},
	getSelectedTalentTree: function() {
		var talents = this.chrClass != null ? this.chrClass.talents : null;
		if( talents ) {
			return talents.selectedTree;
		}
		return -1;
	},
	getTalents: function() {
		return this.chrClass != null ? this.chrClass.talents : null;
	},
	setName: function( name ) {
		this.name = name;
	},
	setDescription: function( desc ) {
		this.description = desc;
	},
	//
	//
	//	CHARACTER CLASS DELEGATES
	//
	//
	addGlyph: function( glyph ) {
		this.chrClass.addGlyph(glyph);
		this.calculateStats();
	},
	removeGlyph: function( glyph ) {
		if( this.chrClass != null && glyph != null ) {
			var gs = this.chrClass.glyphs[glyph.type];
			for( var i=0; i< gs.length; i++ ) {
				if( gs[i] != null  && gs[i].id == glyph.id ) {
					this.chrClass.removeGlyph(glyph.type, i);
					this.calculateStats();
					return;
				}
			}
		}
	},
	setShapeform: function(shapeform) {
		if( this.chrClass != null ) {
			this.chrClass.setShapeform(shapeform);
			this.calculateStats();
		}
	},
	setPresence: function(presenceId) {
		if( this.chrClass != null ) {
			this.chrClass.setPresence(presenceId);
			this.calculateStats();
		}
	} 
};
/**
 * @constructor
 * @param {CharacterRace} chrRace
 * @param {CharacterClass} chrClass
 */
function IllegalRaceClassException( chrRace, chrClass ) {
	this.chrRace = chrRace;
	this.chrClass = chrClass;
}
IllegalRaceClassException.prototype = {
	chrRace: null, chrClass: null,
	toString: function() {
		return "Illegal combination of race ("+this.chrRace+") and class("+this.chrClass+").";
	}
};
/**
 * @constructor
 * @param {number} level
 */
function InvalidCharacterLevelException( level ) {
	this.level = level;
}
InvalidCharacterLevelException.prototype = {
	level: null
};