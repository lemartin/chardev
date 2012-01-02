/** @const */var MOONKIN_AURA = 24907;

/** @const */var BLOOD_PRESENCE = 48263; 	// Blood Presence	
/** @const */var FROST_PRESENCE = 48266; 	// Frost Presence
/** @const */var UNHOLY_PRESENCE = 48265;	// Unholy Presence

/** @const */var MARK_OF_THE_WILD	= 79060;
/** @const */var BLESSING_OF_KINGS 	= 79062;
/** @const */var HEROISM = 32182;
/** @const */var TIME_WARP = 80353;
/** @const */var POWER_WORD_FORTITUDE = 79104;
/** @const */var BLOOD_PACT = 6307;
/** @const */var COMMANDING_SHOUT = 469;
/** @const */var BLESSING_OF_MIGHT = 79101;
/** @const */var ABOMINATIONS_MIGHT = 53138; 
/** @const */var TRUESHOT_AURA = 19506;
/** @const */var UNLEASHED_RAGE = 30808;
/** @const */var ARCANE_BRILLIANCE = 79057;
/** @const */var FEL_INTELLIGENCE = 54424;
/** @const */var TOTEMIC_WRATH = 77747;
/** @const */var DEMONIC_PACT = 53646;
/** @const */var FLAMETONGUE_TOTEM = 52109;

/** @const */var WRATH_OF_AIR_TOTEM = 2895; 
/** @const */var MIND_QUICKENING = 49868;
/** @const */var HUNTING_PARTY = 53290;

/** @const */var IMPROVED_ICY_TALONS = 55610;
/** @const */var WINDFURY_TOTEM = 8515;

/** @const */var HONOR_AMONG_THIEVES = 51701;
/** @const */var RAMPAGE = 29801;
/** @const */var ELEMENTAL_OATH = 51470;
/** @const */var LEADER_OF_THE_PACK = 24932;

/** @const */var BATTLE_SHOUT = 6673;
/** @const */var STRENGTH_OF_EARTH_TOTEM = 8076;
/** @const */var HORN_OF_WINTER = 57330;
/** @const */var ROAR_OF_COURAGE = 93435;

/** @const */var MASTER_OF_SUBTLETY = 31223;

/** @const */var BUFFS_ADD = 1<<0;
/** @const */var BUFFS_REMOVE = 1<<1;
/** @const */var BUFFS_STACK = 1<<2;
/** @const */var BUFFS_SILENT = 1<<3;

/**
 * @constructor;
 */
function Buffs() {
	this.buffs = new Object();
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('change', ['silent']);
	this.eventMgr.registerEvent('remove_buff', ['buff','silent']);
	this.eventMgr.registerEvent('remove_stack', ['buff','silent']);
}


Buffs.getAvailableBuffs = function( handler, characterScope ) {
	Ajax.request('php/interface/get_buffs.php', new Handler(function( response ) {		
		try {
			var obj = Ajax.getResponseObject(response);
			var r = {};
			
			for( var k in obj ) {
				r[k] = [];
				for( var j=0; j<obj[k].length; j++ ) {
					
					if( k === "Food" ) {
						var i = new Item(obj[k][j]);
						ItemCache.set(i);
						var ab = AvailableBuff.fromItem(i, characterScope);
						if( ab ) {
							r[k].push(ab);
						}
					}
					else {
						var s = new Spell(obj[k][j]);
						SpellCache.set(s);
						r[k].push(AvailableBuff.fromSpell(s, characterScope));
					}
				}
			}
			handler.notify([r,null]);
		}
		catch( e ) {
			handler.notify([null,e]);
		}
	}, Buffs), []);
},

Buffs.prototype = {
	/** @type {Object} */
	buffs : {},
	professionBuffIds : [],
	addObserver: function(observer) {
		this.eventMgr.addObserver(observer);
	},
	/**
	 * @param {Buff} buff
	 */
	set : function( buff ) {
		this.buffs[buff.spell.id] = buff;
		//
		this.eventMgr.fire('change', {'silent': false});
		
	},
	setProfessionBuffs : function( spellIds ) {
		var i;
		for( i=0; i<this.professionBuffIds.length; i++ ) {
			this.removeInternal(this.professionBuffIds[i], true);
		}
		for( i=0; i<spellIds.length; i++ ) {
			this.addInternal(spellIds[i], true, false);
		}
		this.professionBuffIds = spellIds;
	},
	addStack: function( spellId ) {
		var b = this.buffs[spellId];
		if( b ) {
			b.addStack();
		}
		//
		this.eventMgr.fire('change', {'silent': false});
	},
	addInternal: function( spellId, isUnremovable, isDummy ) {
		SpellCache.asyncGet( spellId, new Handler( this._add, this ), [spellId, isUnremovable, true, true, isDummy, Buff.NO_ELIXIR] );
	},
	/**
	 * @param {number} spellId
	 */
	add : function( spellId, self ) {
		SpellCache.asyncGet( spellId, new Handler( this._add, this ), [spellId, false, false, self, false, Buff.NO_ELIXIR] );
	},
	/**
	 * @param {number} spellId
	 */
	_add : function( spellId, isUnremovable, internal, self, isDummy, elixirMask ) {
		var skip = false;
		//
		//#####################################################################
		//
		//	OVERWRITING BUFFS
		//
		//#####################################################################
		//
		switch ( spellId ) {
		//
		// + 5% Stats, Resistances
		//
		case MARK_OF_THE_WILD:
		case BLESSING_OF_KINGS:	
			if( ! this.__removeAll( [MARK_OF_THE_WILD,BLESSING_OF_KINGS] )) {
				skip = true;
			}
			break;
		//
		// + Haste
		//
		case TIME_WARP:
		case HEROISM:
			if( ! this.__removeAll( [TIME_WARP,HEROISM] )) {
				skip = true;
			}
			break;
		//
		// + Stamina
		//
		case POWER_WORD_FORTITUDE:
		case BLOOD_PACT:
		case COMMANDING_SHOUT:
			if( ! this.__removeAll([POWER_WORD_FORTITUDE,BLOOD_PACT,COMMANDING_SHOUT] )) {
				skip = true;
			}
			break;
		//
		// + 10% AP
		//
		case BLESSING_OF_MIGHT:
		case ABOMINATIONS_MIGHT:
		case UNLEASHED_RAGE:
		case TRUESHOT_AURA:
			if( ! this.__removeAll( [BLESSING_OF_MIGHT,ABOMINATIONS_MIGHT,UNLEASHED_RAGE,TRUESHOT_AURA] )) {
				skip = true;
			} 
			break;
		//
		// + Mana
		//
		case ARCANE_BRILLIANCE:
		case FEL_INTELLIGENCE:
			if( ! this.__removeAll( [ARCANE_BRILLIANCE,FEL_INTELLIGENCE] )) {
				skip = true;
			}
			break;
		//
		// + 10% Spell power
		//
		case TOTEMIC_WRATH:
		case DEMONIC_PACT:
			if( ! this.__removeAll( [TOTEMIC_WRATH,DEMONIC_PACT] )) {
				skip = true;
			}
			break;
		//
		// + 5% Haste
		//
		case WRATH_OF_AIR_TOTEM:
		case MIND_QUICKENING:
		case MOONKIN_AURA:
			if( ! this.__removeAll( [MOONKIN_AURA,MIND_QUICKENING,WRATH_OF_AIR_TOTEM] )) {
				skip = true;
			}
			break;
		//
		// + 10% Ranged / Melee AP
		//
		case HUNTING_PARTY:
		case WINDFURY_TOTEM:
		case IMPROVED_ICY_TALONS:
			if( ! this.__removeAll( [WINDFURY_TOTEM,IMPROVED_ICY_TALONS,HUNTING_PARTY] )) {
				skip = true;
			}
			break;
		//
		// + 5% Critical Strike Chance
		//
		case HONOR_AMONG_THIEVES:
		case RAMPAGE:
		case ELEMENTAL_OATH:
		case LEADER_OF_THE_PACK:
			if( ! this.__removeAll( [HONOR_AMONG_THIEVES,RAMPAGE,ELEMENTAL_OATH,LEADER_OF_THE_PACK] )) {
				skip = true;
			}
			break;
		//
		// + Strength / Agility
		//
		case BATTLE_SHOUT:
		case STRENGTH_OF_EARTH_TOTEM:
		case HORN_OF_WINTER:
		case ROAR_OF_COURAGE:
			if( ! this.__removeAll( [BATTLE_SHOUT,STRENGTH_OF_EARTH_TOTEM,HORN_OF_WINTER,ROAR_OF_COURAGE] )) {
				skip = true;
			}
			break;
		//
		//
		//
		}
		//
		//#####################################################################
		//
		var s = SpellCache.get( spellId );
		//
		//#####################################################################
		//
		//	ELIXIRS AND FLASKS
		//
		//#####################################################################
		//
		var spellIds = [];
		if( s.elixirMask ) {
			for( var i in this.buffs ) {
				if( (this.buffs[i].spell.elixirMask & s.elixirMask) != 0 ) {
					spellIds.push( this.buffs[i].spell.id );
				}
			}
			skip = ! this.__removeAll(spellIds);
		}
		//
		//#####################################################################
		//
		if( ! skip ) {
			if( 
				this.buffs[spellId] != null && 
				this.buffs[spellId].isUserAdded == (internal ? false : true) &&
				this.buffs[spellId].stackable
			) {
				this.buffs[spellId].addStack();
			}
			else {
				this.buffs[spellId] = new Buff( s, 1 );
				this.buffs[spellId].setUnremovable( isUnremovable );
				this.buffs[spellId].setUserAdded( internal ? false : true );
				this.buffs[spellId].setElixirMask( elixirMask );
				this.buffs[spellId].setDummy( isDummy );
			}
		}
		//
		this.eventMgr.fire('change', {'silent': internal ? true : false });
	},
	/**
	 * 
	 */
	removeInternal : function( spellId, force ) {
		if ( force && ( ! this.buffs[spellId] || ! this.buffs[spellId].isUserAdded )) {
			delete this.buffs[spellId];
		}
		else {
			this.__remove( spellId, true );
		}
	},
	remove : function( spellId, self ) {
		this.__remove( spellId, false );
	},
	/**
	 * @param {number} spellId
	 */
	__remove : function( spellId, internal ) {
		if( ! this.buffs[spellId] ) {
			return;
		}
		if( this.buffs[spellId].isUnremovable ) {
			return;
		}
		if( internal && this.buffs[spellId].isUserAdded ) {
			return;
		}
		if( this.buffs[spellId] && this.buffs[spellId].stacks > 1 ) {
			this.buffs[spellId].removeStack();
			this.eventMgr.fire('remove_stack', {'buff': this.buffs[spellId],'silent': internal ? true : false});
		}
		else {
			var buff = this.buffs[spellId];
			delete this.buffs[spellId];
			this.eventMgr.fire('remove_buff', {'buff': buff,'silent': internal ? true : false});
		}
		//
	},
	/**
	 * @param {Array} spellIds
	 * @returns {boolean}
	 */
	__removeAll : function( spellIds ) {
		for ( var i = 0; i < spellIds.length; i++) {
			if( this.buffs[spellIds[i]] && this.buffs[spellIds[i]].isUnremovable ) {
				return false;
			}
			delete this.buffs[spellIds[i]];
		}
		return true;
	},
	isActive: function( spellId ) {
		return this.buffs[spellId] ? true : false;
	}
};
/**
 * @constructor
 * @param spellId
 */
function MorePowerfulBuffException( spellId ) {
	this.spellId = spellId;
}

MorePowerfulBuffException.prototype = {
	spellId: 0
};