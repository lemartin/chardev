/**
 * @constructor
 * @param {Spell} spell
 * @param {number} stacks
 */
function Buff( spell, stacks ) {
	this.spell = spell;
	this.stacks = stacks;
	/**
	 * Used by the Gui {@link BuffBar} to determine whether the buff is user-removable or not.
	 * Examples for unremovable Buffs are Moonkin Aura and Leader of the Pack
	 * 
	 * @type {boolean}
	 */
	this.isUnremovable = false;
	this.isUserAdded = true;
	this.isSelfBuff = false;
	this.isDummy = false;
	this.elixirMask = Buff.NO_ELIXIR;
	this.stackable = this.spell.auraOptions && this.spell.auraOptions.stacks > 1;
}

Buff.NO_ELIXIR = 0;
Buff.BATTLE_ELIXIR = 1;
Buff.GUARDIAN_ELIXIR = 2;
Buff.FLASK = 3;

Buff.prototype = {
	spell: null,
	stacks: 0,
	isUnremovable: false,
	isUserAdded: true,
	selfBuff: false,
	isDummy: false,
	elixirMask: Buff.NO_ELIXIR,
	stackable: false,
	addStack: function() {
		if( this.spell.auraOptions && this.spell.auraOptions.stacks > this.stacks ) {
			this.stacks++;
		}
	},
	removeStack: function() {
		if( this.stacks > 1 ) {
			this.stacks --;
		} 
	},
	setUnremovable: function( b ) {
		this.isUnremovable = b;
	},
	setUserAdded: function( b ) {
		this.isUserAdded = b;
		this.isDummy = b ? false : this.isDummy ;
	},
	setSelfBuff: function( b ) {
		this.isSelfBuff = b;
	},
	setElixirMask: function( m ) {
		this.elixirMask = m;
	},
	setDummy: function( b ) {
		this.isDummy = b;
		this.isUserAdded = b ? false : this.isUserAdded;
	} 
};