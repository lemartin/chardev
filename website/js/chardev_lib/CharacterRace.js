/**
 * @constructor
 * @param {Character} character
 * @param {Object} serialized
 * @returns {CharacterRace}
 */
function CharacterRace ( character, serialized ) {
	this._character = character;
	this._id = serialized[0];
	this._name = serialized[1];
	this._racials = []; //SkillLineAbility
	for(var i=0;i<serialized[2].length;i++){
		this._racials[i] = new SkillLineAbility(serialized[2][i]);
	}
	
	if( 1<<this._id & (1<<1|1<<3|1<<4|1<<7|1<<11|1<<22) ) {
		this._isAlliance = true;
	}
}
CharacterRace.prototype._character = null;
CharacterRace.prototype._id = -1;
CharacterRace.prototype._name = -1;
CharacterRace.prototype._racials = [];
CharacterRace.prototype._isAlliance = false;

/**
 * @param {Auras} auras
 */
CharacterRace.prototype.getActiveSpells = function(auras){
	// check ClassMask and add then to auras
	var cr,cc;
	for(var i=0;i<this._racials.length;i++){
		cr = this._racials[i];
		if( cr._spell == null ) {
			continue;
		}
		cc = this._character._chrClass;
		if( 
			cc != null && 
			(1<<(cc._id-1)) & cr._classMask 
			|| 
			cr._classMask <= 0 
		) 
		{
			auras.add(cr._spell);
		}
	}
};
/**
 * @returns {string}
 */
CharacterRace.prototype.toString = function(){
	return "CharacterRace ("+this._name+","+this._racials+")";
};