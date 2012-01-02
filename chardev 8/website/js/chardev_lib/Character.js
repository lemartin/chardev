/**
 * @constructor
 * @returns {Character}
 */
function Character(){
	var i;
	//
	//
	//
	this._eventManager = new EventManager([
		"stat_weights_change",
		"stat_caps_change",
		"level_change",
		"class_change",
		"character_load",
		"selected_tree_change",
		"calculate_stats"
	]);
	//TODO
	this._itemList = new ItemList(IL_ITEM_LIST);
	this._gemList = new ItemList(IL_GEM_LIST);
	this._enchantList = new SpellList( SL_ENCHANT_LIST );
	this._setList = new SetList();
		
	this._professions 		= [null,null];
	
	// 	these objects need to be initilized at the end 
	//	because of the this-reference 
	this._stats 			= new Stats(this);
	this._previewStats		= new Stats(this);
	this._inventory 		= new Inventory( this );

	this._auras 			= new Auras(this);
	this._buffs				= new Buffs();
	this._buffs.setOnChangeHandler( new Handler( this._onBuffsChange, this ));
	
	this._sheet				= new CharacterSheet( this );
	this._sheet._buffBar.setRemoveHandler(new Handler( this._buffs.remove, this._buffs ));
	this._sheet._buffBar.setClickHandler(new Handler( this._buffs.addStack, this._buffs ));
	
	this._sheet._presenceSelector.setOnChangeHandler( new Handler( this.setPresence, this ));
	
	
	this._storedItemFilters = [];
	this._storedGlobalItemFilter = "";
	
	this._storedGemFilters = [];
	
	for( i=0; i<INV_ITEMS; i++ ) {
		this._storedItemFilters[i] = "";
		this._storedGemFilters[i] = "";
	}
	
	this.setLevel(DEFAULT_LEVEL);
	
	this._talentChangeHandler = new Handler(this._onTalentsChange,this);
	this._talentTreeHandler = new Handler(function(){
		this.setStatWeights(this._chrClass.getStatWeights());
	},this);
	
	this._oneStatWeights = [];
	for( i=0; i<ITEM_STATS_COUNT; i++ ) {
		this._oneStatWeights[i] = 1.0;
	}

	this.setStatWeights(this._oneStatWeights.slice(0));
	
	this._lastSaved = this.toArray();
}
Character.prototype._eventManager = null;
/** @type {Auras} */
Character.prototype._auras = null;
/** @type {Buffs} */
Character.prototype._buffs = null;
/** @type {CharacterClass} */
Character.prototype._chrClass = null;
/** @type {CharacterRace} */
Character.prototype._chrRace = null;
/** @type {Inventory} */
Character.prototype._inventory = null;

/** @type {SpellList} */
Character.prototype._enchantList = null;
/** @type {ItemList} */
Character.prototype._gemList = null;
/** @type {ItemList} */
Character.prototype._itemList = null;
/** @type {SetList} */
Character.prototype._setList = null;

/** @type {Stats} */
Character.prototype._stats = null;
/** @type {Stats} */
Character.prototype._previewStats = null;

/** @type {number} */
Character.prototype._level = DEFAULT_LEVEL;
/** @type {string} */
Character.prototype._name = "";
/** @type {string} */
Character.prototype._description = "";
/** @type {number} */
Character.prototype._id = -1;
/** @type {number} */
Character.prototype._userId	= -1;
/** @type {Array} */
Character.prototype._professions = [];

/** @type {CharacterSheet} */
Character.prototype._sheet = null;

/** @type {Handler} */
Character.prototype._talentChangeHandler = null;
/** @type {Handler} */
Character.prototype._shapeRemoveHandler = null;
/** @type {Handler} */
Character.prototype._classOnChangeHandler = null;
/** @type {Handler} */
Character.prototype._levelOnChangeHandler = null;
/** @type {Handler} */
Character.prototype._onCharacterLoadHandler = null;

Character.prototype._storedItemFilters = [];
Character.prototype._storedGlobalItemFilter = "";
Character.prototype._storedGemFilters = [];
Character.prototype._statWeights = [];
Character.prototype._oneStatWeights = [];
Character.prototype._statCaps = null;

Character.prototype._lastSaved = null;
/** 
 * @public
 * @param {string} description 
 **/
Character.prototype.setDescription = function(description){
	this._description = description;
};
Character.prototype.isSpellAffine = function() {
	var clId = this._chrClass ? this._chrClass._id : 0;
	var tt = this._chrClass ? this._chrClass._talents._selectedTree : -1;
	
	return clId == WARLOCK || clId == PRIEST || clId == MAGE || clId == DRUID && tt != 1 || clId == SHAMAN && tt != 1 || clId == PALADIN && tt != 2;
};
/** 
 * @public
 * @param {string} name 
 **/
Character.prototype.setName = function(name){
	this._name = name;
};

Character.prototype.getStatWeights = function () {
	return this._statWeights;
};
Character.prototype.setStatWeights = function( weights) {
	this._statWeights = weights;
	this._eventManager.fire('stat_weights_change', [this._statWeights]);
	this._itemList.setStatWeights(weights);
};
Character.prototype.setStatWeight = function( stat, weight ) {
	this._statWeights[stat] = weight;
	this._eventManager.fire('stat_weights_change', [this._statWeights]);
};
Character.prototype.getStatCaps = function () {
	return this._statCaps != null ? this._statCaps : this._getCalculatedStatCaps();
};
Character.prototype.setStatCap = function( stat, weight ) {
	if( this._statCaps == null ) {
		this._statCaps = this._getCalculatedStatCaps();
	}
	this._statCaps[stat] = weight;
	this._eventManager.fire('stat_caps_change', [this.getStatCaps()]);
};
Character.prototype.resetStatCaps = function() {
	this._statCaps = null;
	this._eventManager.fire('stat_caps_change', [this.getStatCaps()]);
};
Character.prototype.getReforgeStatWeights = function() {
	return [
       this._statWeights[6],
       this._statWeights[13],
       this._statWeights[14],
       this._statWeights[31],
       this._statWeights[32],
       this._statWeights[36],
       this._statWeights[37],
       this._statWeights[49]
   ];
};
Character.prototype._getCalculatedStatCaps = function() {
	var caps = DEFAULT_CAPS;
	
	if( this.isSpellAffine() ) {
		caps[3] = Math.floor( SPELL_MISS_BASE[3] * COMBAT_RATINGS[7][this._level-1] );
		caps[6] = 0;
	}
	else {
		caps[3] = Math.floor( MELEE_MISS_BASE[3] * COMBAT_RATINGS[5][this._level-1] );
		caps[6] = Math.floor( ENEMY_DODGE[3] * COMBAT_RATINGS[23][this._level-1] / EXPERTISE_TO_CHANCE);
	}
	return caps;
};
/**
 * @public
 * @param {number} slot
 * @returns {number} blizzard slot mask
 */
Character.prototype.chardevSlotToBlizzardSlotMask = function( slot ) {
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
		if( this._chrClass != null ) {
			switch( this._chrClass._id ) {
			case ROGUE	: return 1<<21|1<<13;
			default: return 1<<21|1<<17|1<<13;
			}
		}
		return 1<<21|1<<13;
	case 17: 
		if( this._chrClass != null ) {
			switch( this._chrClass._id ) {
			case WARRIOR	: return 1<<23|1<<14| ( this._chrClass._talents._selectedTree == 1 ? 1<<13|1<<22 : 0 ) | ( this.canDualWieldTwoHandedWeapons() ? 1<<17 : 0 );
			case PALADIN	: return 1<<23|1<<14;
			case HUNTER 	: return 1<<23|1<<22|1<<13;
			case ROGUE		: return 1<<23|1<<22|1<<13;
			case DEATHKNIGHT: return 1<<23|1<<22|1<<13;
			case SHAMAN		: return 1<<23|1<<14| ( this._chrClass._talents._selectedTree == 1 ? 1<<13|1<<22 : 0 );
			default			: return 1<<23;
			}
		}
		return 1<<23;
	}
	return 0;
};
/** 
 * @public
 * @returns {number} class specific armor mask 
 **/
Character.prototype.getDefaultArmorMask = function() {
	var defaultMask = 1<<0|1<<1|1<<2|1<<3|1<<4;
	if( this._chrClass != null ) {
		switch( this._chrClass._id ) {
		case 1: defaultMask = this._level >= 40 ? 1<<4 : 1<<3; break;
		case 2: defaultMask = this._level >= 40 ? 1<<4 : 1<<3; break;
		case 3: defaultMask = this._level >= 40 ? 1<<3 : 1<<2; break;
		case 4: defaultMask = 1<<2; break;
		case 5: defaultMask = 1<<1; break;
		case 6: defaultMask = 1<<4; break;
		case 7: defaultMask = this._level >= 40 ? 1<<3 : 1<<2; break;
		case 8: defaultMask = 1<<1; break;
		case 9: defaultMask = 1<<1; break;
		case 11: defaultMask = 1<<2; break;
		}
	}
	return defaultMask;
};

/**
 * @public
 * @returns {number} level specific armor mask
 */
Character.prototype.getArmorMask = function() {
	if( this._chrClass != null ) {
		switch( this._chrClass._id ) {
		case 1:
			return ( this._level >= 40 ? 31 : 15 ) + 64;
		case 2:
			return ( this._level >= 40 ? 31 : 15 ) + 64 + 2048;
		case 6:
			return ( this._level >= 40 ? 31 : 15 ) + 2048;
		case 3: 
			return this._level >= 40 ? 15 : 7;
		case 7:
			return ( this._level >= 40 ? 15 : 7 ) + 64 + 2048;
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
};

/**
 * @public
 * @param {number} slot
 * @returns {Array} [ itemClass, itemSubClassMask ] 
 */
Character.prototype.chardevSlotToItemClass = function( slot ) {	
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
		if( this._chrClass != null ) {
			switch( this._chrClass._id ) {
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
};

/**
 * @public
 * @param {Item} itm
 * @returns {boolean} true, if this character is able to wear 
 */
Character.prototype.canWear = function (itm) {
	if( itm._class == 4 ) {
		if( ((1<<itm._subClass) & this.getArmorMask()) != 0) {
			return true;
		}
	}
	else if( itm._class == 2 ) {
		return true;
	}
	return false;
};

/**
 * @public
 * @param {number} index profession index
 * @param {number} id skill line identifier
 */
Character.prototype.setProfession = function( index, id ) {
	
	if( id > 0 ) {
		this._professions[index] = new Profession(this,SERIALIZED_PROFESSIONS[id]);
	}
	else {
		this._professions[index] = null;
	}
};

/**
 * @public
 * @param {Array} profile serialized profile
 */
Character.prototype.load = function(profile)
{
	var i, j=0, itm, gem, spell;
	if( profile == null ) {
		return;
	}
	Tooltip.showLoading();
	this._name = profile[0][0];
	this._description = profile[0][1];
	this.setRace(new CharacterRace(this,profile[0][2]));
	this.setClass(new CharacterClass(profile[0][3]));
	this.setLevel(profile[0][4]);

	this.setShapeForm(profile[0][5]?profile[0][5]:0);
	
	var presence = profile[0][6] ? profile[0][6] : 0 ;
	if( presence == 0 && this._chrClass != null && this._chrClass._id == DEATHKNIGHT ) {
		switch( profile[4] ) {
		case 0: presence = BLOOD_PRESENCE; break;
		case 1: presence = FROST_PRESENCE; break;
		case 2: presence = UNHOLY_PRESENCE; break;
		default: presence = BLOOD_PRESENCE; break;
		}
	}
	this.setPresence(presence);
	
	if( this._chrClass ) {
		if( profile[4] === 2 || profile[4] === 1 || profile[4] === 0 ) {
			this._chrClass._talents._selectTree(profile[4]);
		}
		if( profile[2] ) {
			this._chrClass._talents.setDistribution(profile[2],true);
		}
		
		if( profile[5] ) {
			for( i=0; i<profile[5].length; i++ ) {
				if( !profile[5][i] ) {
					continue;
				}
				this.setProfession( i, profile[5][i][0] );
				this._professions[i].setLevel(profile[5][i][1]);
				this._sheet.updateProfessions();
			}
		}
		
		for( i=0; i<profile[3].length;i++ ) {
			if( !profile[3][i] ) {
				continue;
			}
			var g = new Glyph(profile[3][i]);
			this._chrClass.addGlyph( g._type,g );
		}
	}
	
	for( i=0; i<INV_ITEMS; i++ ) {
		if( ! profile[1][i] ) {
			continue;
		}
		if( profile[1][i][0] ) {
			itm = new Item(profile[1][i][0]);
			this._inventory.set(i,itm);
			for( j=0; j<3; j++ ) {
				if ( profile[1][i][1+j] ) {
					gem = new Item(profile[1][i][1+j]);
					itm.addGem( gem ,j);
					g_items.set(gem.clone());
				}
			}
			if( profile[1][i][4] ) {
				itm.addEnchant( new SpellItemEnchantment( profile[1][i][4] ) );
			}
			/*random properties, apply before reforging!*/
			if( profile[1][i][6] != 0 ) {
				itm.setRandomEnchantment(profile[1][i][6]);
			}
			if( profile[1][i][5] && profile[1][i][5][0] != -1 && profile[1][i][5][1] != -1 ) {
				itm.reforge(profile[1][i][5][0], profile[1][i][5][1]);
			}
			if( profile[1][i][7] ) {
				for( j=0; j<profile[1][i][7].length; j++ ) {
					itm.addEnchant( new SpellItemEnchantment( profile[1][i][7][j] ) );
				}
			}
			g_items.set(itm.clone());
		}
		else {
			this._inventory.remove(i);
		}
		this._sheet._slots[i].update();
	}
	
	for( i in profile[6] ) {
		spell = new Spell(profile[6][i][0]);
		g_spells.set(spell);
		this._buffs.set(new Buff(spell,profile[6][i][1]));
	}
	this._sheet._shapeSelector.update();
	this._sheet._presenceSelector.update(this);
	this.calculateStats();
	
	this._lastSaved = this.toArray();
	
	if( this._onCharacterLoadHandler ) {
		this._onCharacterLoadHandler.notify([this]);
	}
	Tooltip.enable();
};

/**
 * @public
 * @returns {Array} serialized character
 */
Character.prototype.toArray = function() {
	var s = [], i,j, itm, bs;
	var shapeForm = this._chrClass ? this._chrClass._shapeForm : 0;
	var presence = this._chrClass != null && this._chrClass._presence != null ? this._chrClass._presence._spell._id : 0;
	//
	//
	//
	this.setShapeForm(0);
	this.setPresence(0);
	//
	s[0] = [
	        this._name,
	        this._description,
	        this._chrRace ? this._chrRace._id : 0,
	        this._chrClass ? this._chrClass._id : 0,
	        this._level,
	        shapeForm,
	        presence
	];
	s[1] = [];
	for( i=0; i<INV_ITEMS; i++ ) {
		itm = this._inventory._items[i][0];
		if( itm == null ) {
			s[1][i] = null;
			continue;
		}
		s[1][i] = [];
		s[1][i][0] = itm._id;
		s[1][i][1] = itm._gems[0] ? itm._gems[0]._id : 0;
		s[1][i][2] = itm._gems[1] ? itm._gems[1]._id : 0;
		s[1][i][3] = itm._gems[2] ? itm._gems[2]._id : 0;
		s[1][i][4] = itm._enchants.length > 0 ? itm._enchants[0]._id : null;
		s[1][i][5] = [ itm._reducedStat, itm._addedStat ];
		s[1][i][6] = itm._selectedRandomEnchantment ? itm._selectedRandomEnchantment._id : 0;
		s[1][i][7] = [];
		for( j=1; j<itm._enchants.length; j++ ) {
			s[1][i][7].push(itm._enchants[j]._id);
		}
	}
	s[2] = ( this._chrClass ? this._chrClass._talents.getDistribution(true) : [] );
	s[3] = [];
	if( this._chrClass ) {
		for( i=0; i<this._chrClass._glyphs.length; i++ ) {
			for( j=0; j<this._chrClass._glyphs[i].length; j++ ) {
				if( this._chrClass._glyphs[i][j] ) {
					s[3].push(this._chrClass._glyphs[i][j]._id);
				}
			}
		}
	} 
	s[4] = ( this._chrClass ? this._chrClass._talents._selectedTree : -1 );
	s[5] = [null, null];
	for( i=0; i<2; i++ ) {
		var p = this._professions[i];
		if( p ) {
			s[5][i] = [p._id, p._level];
		}
		else {
			s[5][i] = null;
		}
	}
	s[6] = [];
	
	bs = this._buffs._buffs;
	for( i in bs ) {
		if( !bs[i] || bs[i]._isDummy ) {
			continue;
		}
		s[6].push( [bs[i]._spell._id,bs[i]._stacks] );
	}
	//
	//
	//
	this.setShapeForm(shapeForm);
	this.setPresence(presence);
	//
	return s;
};

Character.prototype.toBattleNetProfile = function() {
	var i, j, enchant, itemsObj = { 'averageItemLevel': 0, 'averageItemLevelEquipped': 0 },
		slot, ttParamsObj, itm, talentObj,
		talents = this._chrClass != null ? this._chrClass._talents : null, glyph,
		glyphs = [[],[],[]], primaryProfessions= [];
	
	for( i=0; i<INV_ITEMS; i++ ) {
		itm = this._inventory._items[i][0];
		if( itm == null ) {
			continue;
		}
		
		slot = SLOT_TO_NAME[i]; 
		
		
		ttParamsObj= {};
		
		for( j=0; j<itm._enchants.length; j++ ) {
			enchant = itm._enchants[j];
			if( enchant._types[0] == 7 ) {
				ttParamsObj['tinker'] = enchant._id;
			}
			else {
				ttParamsObj['enchant'] = enchant._id;
			}
		}
		
		for( j=0; j<3; j++ ) {
			if( itm._gems[j] ) {
        		ttParamsObj['gem'+j] = itm._gems[j]._id;
        	}
		}
		
		if( itm.hasAdditionalSocket() ) {
			ttParamsObj['extraSocket'] = true;
		}
		
		if( itm._reducedStat != -1 && itm._addedStat != -1 ) {
			ttParamsObj['reforge'] = STAT_TO_REFORGABLE_STAT[itm._reducedStat] * 7 + 
				113 + STAT_TO_REFORGABLE_STAT[itm._addedStat] - ( itm._addedStat > itm._reducedStat ? 1 : 0 )
			;
		}
		
		if( itm._selectedRandomEnchantment ) {
			ttParamsObj['suffix'] = itm._selectedRandomEnchantment._id;
		}
		
		itemsObj[slot] = {
			'icon': itm._icon,
			'id':itm._id,
			'name':itm._name,
			'quality': itm._quality,
			'tooltipParams': ttParamsObj
		};
	}
	

	if( this._chrClass ) {
		
		for( i=0; i<this._chrClass._glyphs.length; i++ ) {
			for( j=0; j<this._chrClass._glyphs[i].length; j++ ) {
				glyph = this._chrClass._glyphs[i][j];
				if( glyph ) {
					glyphs[i].push({
						'glyph': glyph._id,
						'item': glyph._itemId,
						'name': glyph._spell.getName(),
						'icon': glyph._spell._icon
					});
				}
			}
		}
		//TODO add missing values to talent obj
		talentObj = [{
			'selected': true,
			'name':talents._selectedTree != -1 ? talents._treeNames[talents._selectedTree] : "None",
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
		var p = this._professions[i];
		if( p ) {
			primaryProfessions.push({ 
				'id': p._id,
				'name': ID_TO_PROFESSION[p._id], 
				'rank': p._level
			});
		}
	}
	
	return JSON.stringify({
		'name': this._name,
		'race': ( this._chrRace != null ? this._chrRace._id : 0 ),
		'class': ( this._chrClass != null ? this._chrClass._id : 0 ),	
		'level': this._level,
		'items': itemsObj,
		'talents':talentObj,
		'professions':{
			'primary': primaryProfessions,
			'secondary': []
		}
	});
};

Character.prototype.toJSONProfile = function() {
	
	var talents = this._chrClass != null ? this._chrClass._talents : null;
	var primary = null;
	var professions = [];
	var gear = {};
	var glyphs = [];
	var i,j;
	var enchants;
	var reforging;
	var itm;
	
	for( i=0; i<INV_ITEMS; i++ ) {
		
		itm = this._inventory._items[i][0];
		if( itm == null ) {
			gear[SLOT_TO_NAME[i]] = null;
			continue;
		}
		
		enchants = [];
		
		for( j=0; j<itm._enchants.length; j++ ) {
			enchants.push(itm._enchants[j]._id);
		}
		
		if( itm._reducedStat != -1 && itm._addedStat != -1 ) {
			reforging = { "from": itm._reducedStat , "to": itm._addedStat };
		}
		else {
			reforging = null;
		}
		
		if( itm.hasAdditionalSocket() ) {
			switch( i ) {
			case 7: enchants.push( 3717 ); break;
			case 8: enchants.push( 3723 ); break;
			case 9: enchants.push( 3729 ); break;
			}
		}
		
		gear[SLOT_TO_NAME[i]] = {
			"id": itm._id,
			"gems": [
		        itm._gems[0] ? itm._gems[0]._id : 0,
		        itm._gems[1] ? itm._gems[1]._id : 0,
		        itm._gems[2] ? itm._gems[2]._id : 0
			],
			"enchants" : enchants,
			"randomEnchant" : itm._selectedRandomEnchantment ? itm._selectedRandomEnchantment._id : 0,
			"reforging": reforging
		};
	}
	
	for( i=0; i<2; i++ ) {
		var p = this._professions[i];
		if( p ) {
			professions.push({ "skill": ID_TO_PROFESSION[p._id], "level": p._level});
		}
	}
	
	if( this._chrClass ) {
		for( i=0; i<this._chrClass._glyphs.length; i++ ) {
			for( j=0; j<this._chrClass._glyphs[i].length; j++ ) {
				if( this._chrClass._glyphs[i][j] ) {
					glyphs.push(this._chrClass._glyphs[i][j]._id);
				}
				else {
					glyphs.push(0);
				}
			}
		}
	} 
	
	if( talents != null ) {
		primary = {
			"specialization": talents._selectedTree != -1 ? talents._treeNames[talents._selectedTree] : "None" ,
			"talents": talents.getDistribution(false).join(""),
			"glyphs": glyphs
		};
	}
	
	var profile = {
		"name": this._name,
		"description": this._description,
		"basedOn": null,
		"meta": { "source" : { "url": g_settings.profileId ? "http://chardev.org/?profile="+g_settings.profileId : "http://chardev.org/?planner", "origin" : "chardev.org", "data" : { "profileId" : g_settings.profileId } } },
		"character" : {
			"race": ( this._chrRace != null ? ID_TO_RACE[this._chrRace._id] : "None" ),
			"class": ( this._chrClass != null ? ID_TO_CLASS[this._chrClass._id] : "None" ),	
			"level": this._level,
			"gender": "Female"
		},
		"builds": {
			"primary": primary,
			"secondary": null
		},
		"gear": gear,
		"professions": professions
	};
	return JSON.stringify(profile);
};

/**
 * @public
 * @returns {boolean}
 */
Character.prototype.hasMana = function() {
	if( this._chrClass == null ) { 
		return false;
	}
	return GameInfo.hasMana(this._chrClass._id,0/*TODO shapeform*/);
};

/**
 * @public
 * @returns {number} energy type
 */
Character.prototype.getEnergyType = function() {
	if( this._chrClass == null ) { 
		return NO_ENERGY;
	}
	return GameInfo.getEnergyType(this._chrClass._id,0/*TODO shapeform*/);
};

/**
 * @public
 * @param {number} level
 */
Character.prototype.setLevel = function(level)
{
	if (level >= 1 && level <= MAX_LEVEL ) {
		if ( this._chrClass != null ) {
			if( this._chrClass._id == DEATHKNIGHT && level < 55 ) {
				level = 55;
			}
			this._chrClass.setLevel(level);
		}
		this._level = level;
		
		for( var i=0; i<2; i++ ) {
			if( !this._professions[i] ) {
				continue;
			}
			if( 0 == GameInfo.getMaximumProfessionLevel(this._professions[i]._id, this._level) ) {
				this._professions[i] = null;
			}
			else {
				this._professions[i].onCharacterLevelChange();
			}
		}
		
		this._sheet.updateProfessions();
		
		this.calculateStats();
		if( this._levelOnChangeHandler )
		{
			this._levelOnChangeHandler.notify([this]);
		}
		
		this._itemList._filter.replaceArgument('canbeusedwithlvl',"canbeusedwithlvl.eq."+this._level+";");
		this.replaceArgumentInStoredFilter('canbeusedwithlvl', "canbeusedwithlvl.eq."+this._level+";");
	}
	this._sheet.updateLevel( this._level );
	this.resetStatCaps();
};

/**
 * @param {CharacterClass} chrClass
 */
Character.prototype.setClass = function(chrClass)
{
	// Remove old shapeForm
	if ( this._chrClass ) {
		this.setShapeForm(0);
		this.setPresence(0);
	}
	//
	//	Set new CharacterClass
	//
	this._chrClass = chrClass;
	//
	if( chrClass )
	{
		if( chrClass._id == WARRIOR ) {
			this.setShapeForm(BATTLE_STANCE);
		}
		else if( chrClass._id == DEATHKNIGHT ) {
			this.setPresence(BLOOD_PRESENCE);
		}
		
		this._chrClass._talents.setOnChangeHandler(this._talentChangeHandler);
		this._chrClass._talents.setOnSelectedTreeChangeHandler(this._talentTreeHandler);
		this._chrClass.setLevel(this._level);
		this._sheet._slots[18].setVisibility(true);
		this.setStatWeights( this._chrClass.getStatWeights() );
	}
	else {
		this._sheet._slots[18].setVisibility(false);
		this.setStatWeights(this._oneStatWeights.slice(0));
	}

	this._sheet._shapeSelector.update();
	this._sheet._presenceSelector.update(this);
	this._sheet.updateLevelSelector( this._chrClass != null ? this._chrClass._id : 0 );
	this._sheet.updateLevel( this._level );
	this._sheet.showStatGroups( chrClass!=null ? chrClass._id : 0);
	this._sheet._raceClassSelector.update();
	// item list
	this._itemList._filter.replaceArgument('usablebyclass',(this._chrClass != null ? "usablebyclass.eq."+(1<<(this._chrClass._id-1))+";" : ""));
	this.replaceArgumentInStoredFilter('usablebyclass',(this._chrClass != null ? "usablebyclass.eq."+(1<<(this._chrClass._id-1))+";" : ""));
	//
	/*
	if( chrClass != null ) {
		switch( chrClass._id ) {
		case HUNTER:
		case ROGUE:
		case WARRIOR:
			this._itemList._filter.replaceArgument('spi', 'spi.le.0;');
			this.replaceArgumentInStoredFilter('spi', 'spi.le.0;');
			this._itemList._filter.replaceArgument('int', 'int.le.0;');
			this.replaceArgumentInStoredFilter('int', 'int.le.0;');
			break;
		default:
			this._itemList._filter.replaceArgument('spi', '');
			this.replaceArgumentInStoredFilter('spi', '');
			this._itemList._filter.replaceArgument('int', '');
			this.replaceArgumentInStoredFilter('int', '');
			break;
		}
	}
	*/
	//
	// call handler
	this.resetStatCaps();
	if( this._classOnChangeHandler )
	{
		this._classOnChangeHandler.notify([this]);
	}
};

/**
 * @param {string} variable
 * @param {string} replace
 */
Character.prototype.replaceArgumentInStoredFilter = function( variable, replace ) {
	for( var i=0; i<INV_ITEMS; i++ ) {
		this._storedItemFilters[i] = this._storedItemFilters[i].replace(new RegExp("\\b"+variable+"\\.\\w+\\.[^;]+;","g"), "") + replace ;
	}
};

/**
 * @param {CharacterRace} chrRace
 */
Character.prototype.setRace = function(chrRace){
	this._chrRace = chrRace;
	//TODO evaluate other options, do not remove class, if it is available for the new race
	this.setClass(null);
	this._sheet._raceClassSelector.update();
};

/**
 * @param {number} shapeForm
 */
Character.prototype.setShapeForm = function( shapeForm ) {
	if( this._chrClass ) {
		var oldShape = this._chrClass._shape;
		var shape = this._chrClass.setShapeForm( this._chrClass._shapeForm == shapeForm ? 0 : shapeForm );
		var i;
		//
		// Remove old Shape
		//
		if ( oldShape ) {
			for( i=0; i<oldShape._buffs.length; i++) {
				this._buffs.removeInternal(oldShape._buffs[i]._spell._id, true);
			}
		}
		//
		//	Add new Shape as Buff
		//
		if( shape ) {
			for( i=0; i<shape._buffs.length; i++) {
				this._buffs.addInternal( shape._buffs[i]._spell._id , this._chrClass._id == WARRIOR, true );
			}
		}
		this._sheet._buffBar.update();
		this.calculateStats();
	}
	else {
		//Tooltip.showError("Unable to set shape form, no class selected!");
	}
};

Character.prototype.setPresence = function ( presenceId ) {
	if( this._chrClass ) {
		
		if( this._chrClass._presence ) {
			this._buffs.removeInternal( this._chrClass._presence._spell._id, true );
		}
		
		this._chrClass.setPresence( presenceId );
		
		if( presenceId ) {
			this._buffs.addInternal( presenceId, true, true );
		}
	}
	this.calculateStats();
	this._sheet._presenceSelector.update(this);
};

Character.prototype._onBuffsChange = function( eventType, args ) {
	var resetShape = false;
	var sh;
	
	if( eventType === BUFFS_REMOVE && this._chrClass != null ) {
		sh = this._chrClass._shape;
		if( sh ) {
			if( typeof args === 'object' ) {
				for( var k in args ) {
					if( args[k] == sh._buffs[0]._spell._id ) {
						resetShape = true;
						break;
					}
				}
			}
			else if( typeof args === 'number' ){
				if( args == sh._buffs[0]._spell._id ) {
					resetShape = true;
				}
			}
			else {
				throw "Event arguments in Character._onBuffsChange have the wrong Type. (Found: "+(typeof args)+", Expected: object, number)";
			}
		}
	}
	
	if( resetShape ) {
		this.setShapeForm(0);
	}
	else {
		if( (eventType&BUFFS_SILENT) == 0 ) {
			this.calculateStats();
		}
		this._sheet._buffBar.update();
	}
};
/**
 * Test if the spell, given by it's Identifier, is active and adds it, if 
 * necessary as Buff.
 * 
 * It is not checks, whether the spell is actually an indirect aura spell.
 * 
 * @param {number} spellId
 */
Character.prototype._testAndApplyIndirectAura = function( spellId ) {
	//
	// If the spell applying the aura is available and not already applied, 
	// add the spell as new buff.
	//
	if( 
		  this._auras.isActive(spellId) && 
		! this._buffs.isActive(spellId) 
	) {
		this._buffs.addInternal(spellId, false, true );
	}
	//
	// If the spell is not specc'ed, and an internal buff is active,
	// remove the buff.
	//
	else if( 
		! this._auras.isActive(spellId) && 
		  this._buffs.isActive(spellId)
	) {
		this._buffs.removeInternal(spellId, false );
	}
};
/**
 * 
 */
Character.prototype.getActiveSpells = function()
{
	var bs = this._buffs._buffs, i = 0;
	//var professionBuffs = [];
	
	if (this._chrClass) { 
		this._chrClass.getActiveSpells(this._auras);
	}
	
	if (this._chrRace) { 
		this._chrRace.getActiveSpells(this._auras);
	}
	
	for( i=0; i<2; i++ ) {
		if( !this._professions[i] ) {
			continue;
		}
		var s = this._professions[i].getBuffSpell();
		if( s ) {
			//professionBuffs.push(s._id);
			this._auras.add(s);
		}
	}
	//this._buffs.setProfessionBuffs(professionBuffs);
	
	if( this._chrClass ) {
		switch( this._chrClass._id ) {
		case WARRIOR:
			this._testAndApplyIndirectAura( RAMPAGE );
			break;
		case HUNTER:
			this._testAndApplyIndirectAura( HUNTING_PARTY);
			break;
		case ROGUE:
			this._testAndApplyIndirectAura( HONOR_AMONG_THIEVES );
			this._testAndApplyIndirectAura( MASTER_OF_SUBTLETY );
			break;
		case DEATHKNIGHT:
			this._testAndApplyIndirectAura( IMPROVED_ICY_TALONS );
			break;
		case SHAMAN:
			this._testAndApplyIndirectAura( ELEMENTAL_OATH );
			break;
		case DRUID:
			if( this._auras.isActive(17007) && this._chrClass != null && ((1<<this._chrClass._shapeForm) & (1<<CAT|1<<BEAR|1<<DIRE_BEAR)) != 0 ) {
				this._buffs.addInternal(LEADER_OF_THE_PACK, false, false);
			}
			else {
				this._buffs.removeInternal(LEADER_OF_THE_PACK, false);
			}
			break;
		}
	}
	
	this._sheet._buffBar.update();
	
	for( i in bs ) {
		this._auras.addBuff(bs[i]);
	}
};

/**
 * @param {number} slot
 * @returns {boolean}
 */
Character.prototype.hasBlacksmithingSocket = function(slot)
{
	var bs = this.getProfessionById(PRIMARY_PROFESSION_BLACKSMITHING);
	if( 
		( slot == 7 || slot == 8 ) 
		&& this._inventory.get(slot) != null 
		&& this._inventory.get(slot)._level >= 60 
		&& bs != null
		&& bs._level >= 400 )
	{
		return true;
	}
	if( slot == 9 && this._level >= 70 && this._inventory.get(slot) != null && this._inventory.get(slot)._level >= 80)
	{
		return true;
	}
	return false;
};

/**
 * @returns {boolean}
 */
Character.prototype.canDualWieldTwoHandedWeapons = function(){
	return this._chrClass != null && this._chrClass._id == WARRIOR && this._chrClass._talents._talents[1][6][1]._spent > 0;
};

/**
 * @param slot
 * @returns {boolean}
 */
Character.prototype.isWeaponSlot = function( slot ) {
	return slot == 16 || 
		slot == 17 && this._chrClass != null && GameInfo.canDualWield( this._chrClass._id ) || 
		slot == 18 && this._chrClass != null && ( 1<<this._chrClass._id & (1<<WARRIOR|1<<ROGUE|1<<HUNTER|1<<PRIEST|1<<MAGE|1<<WARLOCK)) != 0;
};

/**
 * @param {Handler} handler
 */
Character.prototype.setClassOnChangeHandler = function( handler )
{
	this._classOnChangeHandler = handler;
};

/**
 * @param {Handler} handler
 */
Character.prototype.setLevelOnChangeHandler = function( handler )
{
	this._levelOnChangeHandler = handler;
};

/**
 * @param {Handler} handler
 */
Character.prototype.setOnCharacterLoadHandler = function( handler )
{
	this._onCharacterLoadHandler = handler;
};

/**
 * 
 */
Character.prototype.calculateSaveStats = function()
{
	// TODO new Stats object
	//this._stats.calculate(false,true);
};

/**
 * 
 */
Character.prototype.calculateStats = function()
{
	this._sheet.resetPreviewStats();
	this._stats.calculate(false, false);
	this._sheet.updateStats();
	this._eventManager.fire("calculate_stats", [this._stats]);
};

/**
 * @param {Item} itm
 * @param {number} slot
 * @param {number} socket
 */
Character.prototype.preview = function( itm, slot, socket ) 
{
	this._inventory.removePreview();
	this._inventory.setPreview(itm, slot, socket);
	this._previewStats.calculate(true, false);
	this._sheet.updatePreviewStats();
};

/**
 * @param {Spell} enchantSpell
 * @param {number} slot
 */
Character.prototype.previewEnchant = function( enchantSpell, slot ) {
	this._inventory.removePreview();
	this._inventory.setEnchantPreview(enchantSpell,slot);
	this._previewStats.calculate(true, false);
	this._sheet.updatePreviewStats();
};

/**
 * 
 */
Character.prototype.removePreview = function() 
{
	this._inventory.removePreview();
	this._sheet.resetPreviewStats();
};

/**
 * @param {number} gemId
 */
Character.prototype.removeGem = function( gemId ) {
	this._inventory.removeGem( gemId );
	this.calculateSaveStats();
};

/**
 * @param {number} colorMask
 */
Character.prototype.removeAllGems = function( colorMask ) {
	this._inventory.setGems( 0, colorMask);
	this.calculateStats();
};

/**
 * @param {number} gemId
 * @param {number} colorMask
 */
Character.prototype.setGems = function( gemId, colorMask ) {
	this._inventory.setGems( gemId, colorMask);
	this.calculateStats();
};

/**
 * 
 */
Character.prototype.restoreAllItems = function() {
	this._inventory.restoreAllItems();
	this.calculateStats();
};

/**
 * @param {Array} listOfOldStats
 * @param {Array} listOfNewStats
 */
Character.prototype.reforgeAllItems = function( listOfOldStats, listOfNewStats ) {
	this._inventory.reforgeAllItems( listOfOldStats, listOfNewStats );
	this.calculateStats();
};

Character.prototype.reforgeFromArray = function( refArr ) {
	this._inventory.reforgeFromArray(refArr);
	this.calculateStats();
};

/** @private **/
Character.prototype._onTalentsChange = function() {
	switch( this._chrClass._id ) {
	case DRUID:
		// Moonkin
		if( this._chrClass._talents._talents[0][2][1].isFull() != this._sheet._shapeSelector._showMoonkin ) {
			this._sheet._shapeSelector.update();
		}
		break;
	/*
	case WARLOCK:
		// Demonic Pact
		if( this._chrClass._talents._talents[1][5][2].isFull() ) {
			this._buffs.add(DEMONIC_PACT);
		}
		break;
	*/
	}
	this.calculateStats();
};
/**
 * @param {number} skillLineId
 * @returns {Profession}
 */
Character.prototype.getProfessionById = function( skillLineId ) {
	if( this._professions[0] && this._professions[0]._id == skillLineId ) {
		return this._professions[0];
	}
	else if( this._professions[1] && this._professions[1]._id == skillLineId ) {
		return this._professions[1];
	}
	return null;
};

Character.prototype.addListener = function( event, handler ) {
	this._eventManager.addListener(event, handler);
};

Character.prototype.hasUnsavedChanges = function() {
	return JSON.stringify(this._lastSaved) != JSON.stringify(this.toArray()); 
};