/**
 * @constructor
 * @param {Array} serialized
 * @returns {SpellAuraOptions}
 */
function SpellAuraOptions( serialized ) {
	this._stacks = serialized[0];
	this._procRate = serialized[1];
	this._procCharges = serialized[2];
}
SpellAuraOptions.prototype = {
		_stacks: 0,
		_procRate: 0,
		_procCharges: 0
};