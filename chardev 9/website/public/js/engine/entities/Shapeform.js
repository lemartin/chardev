/**
 * @constructor
 * @param {Array} serialized
 */
function Shapeform( serialized ) {
	var i, s;
	//
	this.id = serialized[0];
	
	this.buffs = [];
	for( i=0; i<serialized[1].length; i++ ) {
		s = new Spell(serialized[1][i]);
		this.buffs.push(new Buff(s,1));
		SpellCache.set(s);
	}
	
	this.auras = [];
	for( i=0; i<serialized[2].length; i++ ) {
		this.auras.push(new Spell(serialized[2][i]));
	}
}

Shapeform.prototype = {
	buffs: [], auras: [], id:0
};