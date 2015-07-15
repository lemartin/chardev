/**
 * @constructor
 * @param {Item} itm
 * @param {number} red
 * @param {number} add
 * @param {number} cause
 */
function InvalidReforgeException( itm, red, add, cause ) {
	Error.call(this);
	this.message = "Unable to reforge "+itm+", reducing "+red+" and adding "+add+( cause ? "!\n Cause:" + cause.toString() : "");
	this.add = add;
	this.red = red;
	this.itm = itm;
}

InvalidReforgeException.prototype = new Error;
InvalidReforgeException.prototype.itm = null;
InvalidReforgeException.prototype.red = -1;
InvalidReforgeException.prototype.add = -1;

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
	var message;
	switch( cause ) {
	case InvalidItemException.CAUSE_WRONG_CHARACTER_CLASS:
		message = "You do not match the class requirement to wear this item!";
		break;
	case InvalidItemException.CAUSE_WRONG_ITEM_CLASS:
		message = "You do not match the requirement to wear this item!";
		break;
	case InvalidItemException.CAUSE_UNIQUE:
		message = "You are already wearing this item!";
		break;
    case InvalidItemException.CAUSE_CHARACTER_LEVEL:
        message = "You do not match the level requirement to wear this item!";
        break;
	default:
		message = "Unable to equip "+itm.name+" due to unknown reason!";
		break;
	}
	Error.call(this);
	this.itm = itm;
	this.message = message;
}
InvalidItemException.prototype = new Error;
InvalidItemException.prototype.itm = null;
InvalidItemException.CAUSE_WRONG_CHARACTER_CLASS = 0;
InvalidItemException.CAUSE_WRONG_ITEM_CLASS = 1;
InvalidItemException.CAUSE_UNIQUE = 2;
InvalidItemException.CAUSE_CHARACTER_LEVEL = 3;

/**
 * @constructor
 * @param {string} message
 * @param {Item} gem
 */
function InvalidGemException( message, gem ) {
	Error.call(this); 
	this.gem = gem;
	this.message = message;
}
InvalidGemException.prototype = new Error;
InvalidGemException.prototype.gem = null;