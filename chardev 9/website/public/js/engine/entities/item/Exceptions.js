/**
 * @constructor
 * @param {Item} itm
 * @param {number} red
 * @param {number} add
 * @param {number} cause
 */
function InvalidReforgeException( itm, red, add, cause ) {
	this.cause = cause;
	this.itm = itm;
	this.added = add;
	this.reduced = red;
}
InvalidReforgeException.prototype = {
	cause: null,
	itm: null,
	add: -1,
	red: -1,
	toString: function() {
		return "Unable to reforge "+this.itm+", reducing "+this.red+" and adding "+this.add+( this.cause ? "!\n Cause:" + this.cause.toString() : ""); 
	}
};
InvalidReforgeException.CAUSE_NO_REDUCE_STATS = 0;
InvalidReforgeException.CAUSE_NO_ADD_STATS = 1;
InvalidReforgeException.CAUSE_INVALID_REFORGE_STAT = 2;
InvalidReforgeException.CAUSE_ADD_STAT_PRESENT = 3;
InvalidReforgeException.CAUSE_REDUCE_STAT_NOT_PRESENT = 4;
InvalidReforgeException.CAUSE_LOW_ITEM_LEVEL = 5;
InvalidReforgeException.CAUSE_ALREADY_REFORGED = 6;

/**
 * @constructor
 * @param {Item} itm
 * @param {number} cause
 */
function InvalidItemException( itm, cause ) {
	this.cause = cause;
	this.itm = itm;
}
InvalidItemException.prototype = {
	cause: null,
	itm: null,
	toString: function() {
		switch( this.cause ) {
		case InvalidItemException. CAUSE_WRONG_CHARACTER_CLASS:
			return "You do not match the class requirement to wear this item!";
		case InvalidItemException.CAUSE_WRONG_ITEM_CLASS:
			return "You do not match the requirement to wear this item!";
		case InvalidItemException.CAUSE_UNIQUE:
			return "You are already wearing this item!";
		default:
			return "Unable to equip "+this.itm.name+" due to unknown reason!";
		}
	}
};
InvalidItemException.CAUSE_WRONG_CHARACTER_CLASS = 0;
InvalidItemException.CAUSE_WRONG_ITEM_CLASS = 1;
InvalidItemException.CAUSE_UNIQUE = 3;

/**
 * @constructor
 * @param {Item} gem
 * @param {Item} itm
 * @param {number} cause
 */
function InvalidGemException( gem, itm, cause ) {
	this.cause = cause;
	this.gem = gem;
}
InvalidGemException.prototype = {
		cause: null,
		gem: null
};
InvalidGemException.CAUSE_ITEM_LEVEL = 0;
InvalidGemException.CAUSE_UNIQUE = 3;