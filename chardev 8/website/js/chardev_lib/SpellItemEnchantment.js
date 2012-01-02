/**
 * @constructor
 * @param {Array} serialized
 * @returns {SpellItemEnchantment}
 */
function SpellItemEnchantment(serialized) {
	var i;
	//
	this._id = serialized[0];

	this._types = [];
	this._values = [];
	this._spellIds = [];
	for( i = 0; i<5; i++ ) {
		this._types[i] = serialized[1][i];
		this._values[i] = serialized[2][i];
		this._spellIds[i] = serialized[3][i];
	}
	this._spells = [];
	for( i = 0; i<3; i++ ) {
		if( this._types[i] == 1 || this._types[i] == 3 || this._types[i] == 7 ) {
			this._spells[i] = new Spell(serialized[4][i]);
		}
		else {
			this._spells[i] = serialized[4][i];
		}
	}
	this._description = serialized[5];
	this._condition = serialized[6];
	this._requiredSkillLine = serialized[7] ? new SkillLine(serialized[7]) : null;
	this._requiredSkillLineLevel = serialized[8];
	this._requiredCharacterLevel = serialized[9];
	this._slotMask = serialized[10];
}

SpellItemEnchantment.prototype._id = 0;
SpellItemEnchantment.prototype._types = [];
SpellItemEnchantment.prototype._values = [];
SpellItemEnchantment.prototype._spellIds = [];
SpellItemEnchantment.prototype._description = "";
SpellItemEnchantment.prototype._unmodifiedDescription = "";
SpellItemEnchantment.prototype._condition = null;
SpellItemEnchantment.prototype._requiredSkillLine = null;
SpellItemEnchantment.prototype._requiredSkillLineLevel = 0;
SpellItemEnchantment.prototype._requiredCharacterLevel = 0;
SpellItemEnchantment.prototype._spells = [];
SpellItemEnchantment.prototype._slotMask = 0;

/**
 * @param {Character} characterScope
 * @returns {boolean}
 */
SpellItemEnchantment.prototype.isGemActive = function(characterScope){
	if ( characterScope != null && this._condition != null ) {
		for (var i = 0; i < 5; i++) {
			if (!this.isConditionActive(i, characterScope._inventory._gemCount)) {
				return false;
			}
		}
	}
	return true;
};

/**
 * @param {number} i
 * @param {Array} count
 * @returns {boolean}
 */
SpellItemEnchantment.prototype.isConditionActive = function(i,count)
{	
	var _g = this._condition[1][i];	if(!_g) _g=0;
	var _c = this._condition[2][i]; if(!_c) _c=0;
	var _cg= this._condition[3][i];	if(!_cg) _cg=0;
	var _v = this._condition[4][i];	if(!_v) _v=0;
	if( !count )
	{
		return false;
	}
	if (_c == 0 && _v != 0) 
	{
		if( count[_g] != _v )
		{
			return false;
		}
	}
	if (_c == 2) 
	{
		if( count[_g] >= count[_cg] )
		{
			return false;
		}
	}
	if (_c == 3) 
	{
		if (_v > 0) 
		{
			if (count[_g] < (_v + 1)) 
			{
				return false;
			}
		}
		else if (count[_g] <= count[_cg]) 
		{
			return false;
		}
	}
	if ( _g > 0 && _c == 5 && count[_g] < _v) 
	{
		return false;
	}
	return true;
};

/**
 * @param {number} _v
 */
SpellItemEnchantment.prototype.setValue = function(_v)
{
	if (this._types[0] == 5 || this._types[0] == 4) 
	{
		this._values[0] = _v;
	}
	else if (this._types[0] == 3) 
	{
		if( this._spells[0] != null && this._spells[0]._effects[0] != null ) {
			this._spells[0]._effects[0]._value = _v;
		}
	}
	if( !this._unmodifiedDescription ) {
		this._unmodifiedDescription = this._description;
	}
	this._description = this._unmodifiedDescription.replace(/\$i/g, _v);
};

/**
 * @param {Character} characterScope
 * @returns {boolean}
 */
SpellItemEnchantment.prototype.fitsLevelRequirements = function( characterScope ) {
	return this._requiredCharacterLevel <= 1 || characterScope != null && this._requiredCharacterLevel <= characterScope._level;
};

/**
 * @param {Character} characterScope
 * @returns {boolean}
 */
SpellItemEnchantment.prototype.fitsSkillLineRequirements = function( characterScope ) {
	if( this._requiredSkillLine && this._requiredSkillLineLevel > 0 ) {
		if( characterScope ) {
			var p = characterScope.getProfessionById(this._requiredSkillLine._id);		
			if( p  != null && p._level >= this._requiredSkillLineLevel ) {
				return true;
			}
		}
		return false;
	}
	return true;
};

/**
 * @param {Character} characterScope
 * @returns {boolean}
 */
SpellItemEnchantment.prototype.isActive = function(characterScope) {
	return this.fitsLevelRequirements(characterScope) && this.fitsSkillLineRequirements(characterScope) && this.isGemActive(characterScope);
};

/**
 * @param {Character} characterScope
 * @returns {string}
 */
SpellItemEnchantment.prototype.getTooltip = function( characterScope )
{
	var html = "<table cellpadding = 0 cellspacing = 0>";
	var fitsLevelReqs = this.fitsLevelRequirements(characterScope);
	var fitsSkillReqs = this.fitsSkillLineRequirements(characterScope);
	var fitsGemConditions = this.isGemActive(characterScope);
	
	html += Tools.addTr1(
		"<span "+( fitsSkillReqs && fitsLevelReqs ? ( fitsGemConditions ? "class='green'" : "class='grey'" ):"class='red'")+">"+
		( this._types[0] == 7 && this._spells[0] ? locale["use"]+": " + this._spells[0].getDescription() : this._description ) + 
		"</span>"
	);
	
	if( !fitsLevelReqs )
	{
		html += Tools.addTr1(
			"<span class='red'>" +
			TextIO.sprintf1(locale['reqLevel'],this._requiredCharacterLevel)+
			"</span>"
		);
	}
	if( !fitsSkillReqs )
	{
		html += Tools.addTr1(
			"<span class='red'>" +
			locale['req']+" "+this._requiredSkillLine._name+" ("+this._requiredSkillLineLevel+")"+
			"</span>"
		);
	}
	return html + "</table>";
};

/**
 * @param {Auras} auras
 */
SpellItemEnchantment.prototype.getActiveSpells = function( auras ) {
	for( var i=0; i<3; i++ ) {
		if( this._types[i] == 3 ) {
			auras.add( this._spells[i] );
		}
	}
};

SpellItemEnchantment.prototype.getStatWeightBasedScore = function( weights ) {
	var s = 0;
	for( var j = 0; j < 3; j++ ) {
		switch( this._types[j] ) {
		case 5:
			switch( this._spellIds[j] ) {
				// Mana
				case 0: 
					s += weights[2] * this._values[j];
					break;
				default:
					s += weights[this._spellIds[j]] * this._values[j];
					break;
			}
			break;
		case 4:
			switch( this._spellIds[j] ) {
				case 0: s += weights[50] * this._values[j]; break;
				case 1: s += weights[53] * this._values[j]; break;
				case 2: s += weights[51] * this._values[j]; break;
				case 3: s += weights[55] * this._values[j]; break;
				case 4: s += weights[52] * this._values[j]; break;
				case 5: s += weights[54] * this._values[j]; break;
				case 6: s += weights[56] * this._values[j]; break;
			}
			break;
		case 3:
			s += this._spells[j].getStatWeightBasedScore( weights );
			break;
		}
	}
	return s;
};