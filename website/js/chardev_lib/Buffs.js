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
 * @returns {Buffs}
 */
function Buffs() {
	this._buffs = new Object();
}

Buffs.prototype = {
	/** @type {Object} */
	_buffs : {},
	_professionBuffIds : [],
	/** @type {Handler} */
	_onChangeHandler : null,
	/**
	 * @param {Handler} handler
	 */
	setOnChangeHandler : function( handler ) {
		this._onChangeHandler = handler;
	},
	/**
	 * @param {Buff} buff
	 */
	set : function( buff ) {
		this._buffs[buff._spell._id] = buff;
		//
		if( this._onChangeHandler ) {
			this._onChangeHandler.notify( [BUFFS_ADD,buff._spell._id] );
		}
		
	},
	setProfessionBuffs : function( spellIds ) {
		var i;
		for( i=0; i<this._professionBuffIds.length; i++ ) {
			this.removeInternal(this._professionBuffIds[i], true);
		}
		for( i=0; i<spellIds.length; i++ ) {
			this.addInternal(spellIds[i], true);
		}
		this._professionBuffIds = spellIds;
	},
	addStack: function( spellId ) {
		var b = this._buffs[spellId];
		if( b ) {
			b.addStack();
		}
		//
		if( this._onChangeHandler ) {
			this._onChangeHandler.notify( [BUFFS_STACK,spellId] );
		}
	},
	
	addInternal: function( spellId, isUnremovable, isDummy ) {
		g_spells.asyncGet( spellId, new Handler( this._add, this ), [spellId, isUnremovable, true, true, isDummy, BUFF_NO_ELIXIR] );
	},
	/**
	 * @param {number} spellId
	 */
	add : function( spellId, self ) {
		g_spells.asyncGet( spellId, new Handler( this._add, this ), [spellId, false, false, self, false, BUFF_NO_ELIXIR] );
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
			if( ! this._removeAll( [MARK_OF_THE_WILD,BLESSING_OF_KINGS] )) {
				skip = true;
			}
			break;
		//
		// + Haste
		//
		case TIME_WARP:
		case HEROISM:
			if( ! this._removeAll( [TIME_WARP,HEROISM] )) {
				skip = true;
			}
			break;
		//
		// + Stamina
		//
		case POWER_WORD_FORTITUDE:
		case BLOOD_PACT:
		case COMMANDING_SHOUT:
			if( ! this._removeAll([POWER_WORD_FORTITUDE,BLOOD_PACT,COMMANDING_SHOUT] )) {
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
			if( ! this._removeAll( [BLESSING_OF_MIGHT,ABOMINATIONS_MIGHT,UNLEASHED_RAGE,TRUESHOT_AURA] )) {
				skip = true;
			} 
			break;
		//
		// + Mana
		//
		case ARCANE_BRILLIANCE:
		case FEL_INTELLIGENCE:
			if( ! this._removeAll( [ARCANE_BRILLIANCE,FEL_INTELLIGENCE] )) {
				skip = true;
			}
			break;
		//
		// + 10% Spell power
		//
		case TOTEMIC_WRATH:
		case DEMONIC_PACT:
			if( ! this._removeAll( [TOTEMIC_WRATH,DEMONIC_PACT] )) {
				skip = true;
			}
			break;
		//
		// + 5% Haste
		//
		case WRATH_OF_AIR_TOTEM:
		case MIND_QUICKENING:
		case MOONKIN_AURA:
			if( ! this._removeAll( [MOONKIN_AURA,MIND_QUICKENING,WRATH_OF_AIR_TOTEM] )) {
				skip = true;
			}
			break;
		//
		// + 10% Ranged / Melee AP
		//
		case HUNTING_PARTY:
		case WINDFURY_TOTEM:
		case IMPROVED_ICY_TALONS:
			if( ! this._removeAll( [WINDFURY_TOTEM,IMPROVED_ICY_TALONS,HUNTING_PARTY] )) {
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
			if( ! this._removeAll( [HONOR_AMONG_THIEVES,RAMPAGE,ELEMENTAL_OATH,LEADER_OF_THE_PACK] )) {
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
			if( ! this._removeAll( [BATTLE_SHOUT,STRENGTH_OF_EARTH_TOTEM,HORN_OF_WINTER,ROAR_OF_COURAGE] )) {
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
		var s = g_spells.get( spellId );
		//
		//#####################################################################
		//
		//	ELIXIRS AND FLASKS
		//
		//#####################################################################
		//
		var spellIds = [];
		if( s._elixirMask ) {
			for( var i in this._buffs ) {
				if( (this._buffs[i]._spell._elixirMask & s._elixirMask) != 0 ) {
					spellIds.push( this._buffs[i]._spell._id );
				}
			}
			skip = ! this._removeAll(spellIds);
		}
		//
		//#####################################################################
		//
		if( ! skip ) {
			if( 
				this._buffs[spellId] != null && 
				this._buffs[spellId]._isUserAdded == (internal ? false : true) &&
				this._buffs[spellId]._stackable
			) {
				this._buffs[spellId].addStack();
			}
			else {
				this._buffs[spellId] = new Buff( s, 1 );
				this._buffs[spellId].setUnremovable( isUnremovable );
				this._buffs[spellId].setUserAdded( internal ? false : true );
				this._buffs[spellId].setElixirMask( elixirMask );
				this._buffs[spellId].setDummy( isDummy );
			}
		}
		//
		if( this._onChangeHandler ) {
			this._onChangeHandler.notify( [ BUFFS_ADD | (internal ? BUFFS_SILENT : 0), spellId] );
		}
	},
	/**
	 * 
	 */
	removeInternal : function( spellId, force ) {
		if ( force && ( ! this._buffs[spellId] || ! this._buffs[spellId]._isUserAdded )) {
			delete this._buffs[spellId];
		}
		else {
			this._remove( spellId, true );
		}
	},
	remove : function( spellId, self ) {
		this._remove( spellId, false );
	},
	/**
	 * @param {number} spellId
	 */
	_remove : function( spellId, internal ) {
		if( ! this._buffs[spellId] ) {
			return;
		}
		if( this._buffs[spellId]._isUnremovable ) {
			return;
		}
		if( internal && this._buffs[spellId]._isUserAdded ) {
			return;
		}
		if( this._buffs[spellId] && this._buffs[spellId]._stacks > 1 ) {
			this._buffs[spellId].removeStack();
		}
		else {
			delete this._buffs[spellId];
		}
		//
		if( this._onChangeHandler ) {
			this._onChangeHandler.notify( [ BUFFS_REMOVE | ( internal ? BUFFS_SILENT : 0 ), spellId] );
		}
	},
	/**
	 * @param {Array} spellIds
	 * @returns {boolean}
	 */
	_removeAll : function( spellIds ) {
		for ( var i = 0; i < spellIds.length; i++) {
			if( this._buffs[spellIds[i]] && this._buffs[spellIds[i]]._isUnremovable ) {
				return false;
			}
			delete this._buffs[spellIds[i]];
		}
		return true;
	},
	/**
	 * @param {Array} spellIds
	 * @returns {boolean}
	 */
	_testMorePowerful : function( spellIds ) {
		for ( var i = 0; i < spellIds.length; i++) {
			if( this._buffs[spellIds[i]] ) {
				Tooltip.showError("A more powerful spell is already active!");
				return true;
			}
		}
		return false;
	},
	isActive: function( spellId ) {
		return this._buffs[spellId] ? true : false;
	}
};