/** @const */ var BUFF_NO_ELIXIR = 0;
/** @const */ var BUFF_BATTLE_ELIXIR = 1;
/** @const */ var BUFF_GUARDIAN_ELIXIR = 2;
/** @const */ var BUFF_FLASK = 3;

/**
 * @constructor
 * @param {Spell} spell
 * @returns {Buff}
 */
function Buff( spell, stacks ) {
	this._spell = spell;
	this._stacks = stacks;
	/**
	 * Used by the Gui {@link BuffBar} to determine whether the buff is user-removable or not.
	 * Examples for unremovable Buffs are Moonkin Aura and Leader of the Pack
	 * 
	 * @type {boolean}
	 */
	this._isUnremovable = false;
	this._isUserAdded = true;
	this._isSelfBuff = false;
	this._isDummy = false;
	this._elixirMask = BUFF_NO_ELIXIR;
	this._stackable = this._spell._auraOptions && this._spell._auraOptions._stacks > 1;
}

Buff.prototype = {
	_spell: null,
	_stacks: 0,
	_isUnremovable: false,
	_isUserAdded: true,
	_selfBuff: false,
	_isDummy: false,
	_elixirMask: BUFF_NO_ELIXIR,
	_stackable: false,
	addStack: function() {
		if( this._spell._auraOptions && this._spell._auraOptions._stacks > this._stacks ) {
			this._stacks++;
		}
	},
	removeStack: function() {
		if( this._stacks > 1 ) {
			this._stacks --;
		} 
	},
	setUnremovable: function( b ) {
		this._isUnremovable = b;
	},
	setUserAdded: function( b ) {
		this._isUserAdded = b;
		this._isDummy = b ? false : this._isDummy ;
	},
	setSelfBuff: function( b ) {
		this._isSelfBuff = b;
	},
	setElixirMask: function( m ) {
		this._elixirMask = m;
	},
	setDummy: function( b ) {
		this._isDummy = b;
		this._isUserAdded = b ? false : this._isUserAdded;
	} 
};