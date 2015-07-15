/**
 * @constructor
 * @param {Array} serialized
 * @returns {Shapeform}
 */
function Shapeform( serialized ) {
	var i, s;
	//
	this._id = serialized[0];
	
	this._buffs = [];
	for( i=0; i<serialized[1].length; i++ ) {
		s = new Spell(serialized[1][i]);
		this._buffs.push(new Buff(s,1));
		g_spells.set(s);
	}
	
	this._auras = [];
	for( i=0; i<serialized[2].length; i++ ) {
		this._auras.push(new Spell(serialized[2][i]));
	}
}

Shapeform.prototype._buffs = [];
Shapeform.prototype._auras = [];
Shapeform.prototype._id = 0;