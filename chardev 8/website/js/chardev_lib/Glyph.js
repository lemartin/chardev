/**
 * @constructor
 * @param {Array} serialized
 * @returns {Glyph}
 */
function Glyph( serialized ) {
	this._id = serialized[0];
	this._type = serialized[1];
	this._spell = serialized[2] ? new Spell(serialized[2]) : null;
	this._itemId = serialized[3];
}

Glyph.prototype._id = 0;
Glyph.prototype._type = 0;
Glyph.prototype._spell = null;
Glyph.prototype._itemId = 0;