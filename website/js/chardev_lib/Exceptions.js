/**
 * @constructor
 * @param {numeric} cause
 * @returns {InvalidItemException}
 */
function InvalidItemException( itm, cause ) {
	this._cause = cause;
	this._itm = itm;
}
InvalidItemException.prototype = {
		_cause: null,
		_itm: null
};
InvalidItemException.CAUSE_WRONG_CHARACTER_CLASS = 0;
InvalidItemException.CAUSE_WRONG_ITEM_CLASS = 1;
InvalidItemException.CAUSE_UNIQUE = 3;

/**
 * @param itm
 * @param {numeric} cause
 * @returns {InvalidReforgeException}
 */
function InvalidReforgeException( itm, red, add, cause ) {
	this._cause = cause;
	this._itm = itm;
	this._added = add;
	this._reduced = red;
}
InvalidReforgeException.prototype = {
		_cause: null,
		_itm: null,
		_add: -1,
		_red: -1
};
InvalidReforgeException.CAUSE_NO_REDUCE_STAT = 0;
InvalidReforgeException.CAUSE_NO_ADD_STAT = 1;
InvalidReforgeException.CAUSE_INVALID_REFORGE_STAT = 2;
InvalidReforgeException.CAUSE_ADD_STAT_PRESENT = 3;
InvalidReforgeException.CAUSE_REDUCE_STAT_NOT_PRESENT = 4;
InvalidReforgeException.CAUSE_LOW_ITEM_LEVEL = 5;
InvalidReforgeException.CAUSE_ALREADY_REFORGED = 6;