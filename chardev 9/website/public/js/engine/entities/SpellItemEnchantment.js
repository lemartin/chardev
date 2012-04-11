/**
 * @constructor
 * @param {Array} serialized
 */
function SpellItemEnchantment(serialized) {
	var i;
	//
	this.id = serialized[0];

	this.types = [];
	this.values = [];
	this.spellIds = [];
	for( i = 0; i<5; i++ ) {
		this.types[i] = serialized[1][i];
		this.values[i] = serialized[2][i];
		this.spellIds[i] = serialized[3][i];
	}
	this.spells = [];
	for( i = 0; i<3; i++ ) {
		if( this.types[i] == 1 || this.types[i] == 3 || this.types[i] == 7 ) {
			this.spells[i] = new Spell(serialized[4][i]);
		}
		else {
			this.spells[i] = serialized[4][i];
		}
	}
	this.description = serialized[5];
	this.condition = serialized[6];
	this.requiredSkillLine = serialized[7] ? new SkillLine(serialized[7]) : null;
	this.requiredSkillLineLevel = serialized[8];
	this.requiredCharacterLevel = serialized[9];
	this.slotMask = serialized[10];
}

SpellItemEnchantment.prototype = {

	id : 0,
	types : [],
	values : [],
	spellIds : [],
	description : "",
	unmodifiedDescription : "",
	condition : null,
	requiredSkillLine : null,
	requiredSkillLineLevel : 0,
	requiredCharacterLevel : 0,
	spells : [],
	slotMask : 0,

	/**
	 * @param {Character} character
	 * @returns {boolean}
	 */
	isGemActive : function( character ){
		if ( character != null && this.condition != null ) {
			for (var i = 0; i < 5; i++) {
				if (!this.isConditionActive(i, character.getGemCount())) {
					return false;
				}
			}
		}
		return true;
	},
	/**
	 * @param {number} i
	 * @param {Array} count
	 * @returns {boolean}
	 */
	isConditionActive : function(i,count)
	{	
		var _g = this.condition[1][i];	if(!_g) _g=0;
		var _c = this.condition[2][i]; if(!_c) _c=0;
		var _cg= this.condition[3][i];	if(!_cg) _cg=0;
		var _v = this.condition[4][i];	if(!_v) _v=0;
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
	},
	
	/**
	 * @param {number} _v
	 */
	setValue : function(_v)
	{
		if (this.types[0] == 5 || this.types[0] == 4) 
		{
			this.values[0] = _v;
		}
		else if (this.types[0] == 3) 
		{
			if( this.spells[0] != null && this.spells[0].effects[0] != null ) {
				this.spells[0].effects[0].value = _v;
			}
		}
		if( !this.unmodifiedDescription ) {
			this.unmodifiedDescription = this.description;
		}
		this.description = this.unmodifiedDescription.replace(/\$i/g, _v);
	},
	/**
	 * @param {Character} character
	 * @returns {boolean}
	 */
	fitsLevelRequirements : function( character ) {
		return this.requiredCharacterLevel <= 1 || character != null && this.requiredCharacterLevel <= character.level;
	},
	/**
	 * @param {Character} character
	 * @returns {boolean}
	 */
	fitsSkillLineRequirements : function( character ) {
		if( this.requiredSkillLine && this.requiredSkillLineLevel > 0 ) {
			if( character ) {
				var p = character.getPrimaryProfessionById(this.requiredSkillLine.id);		
				if( p  != null && p.level >= this.requiredSkillLineLevel ) {
					return true;
				}
			}
			return false;
		}
		return true;
	},
	/**
	 * @param {Character} characterScope
	 * @returns {boolean}
	 */
	isActive : function(characterScope) {
		return this.fitsLevelRequirements(characterScope) && this.fitsSkillLineRequirements(characterScope) && this.isGemActive(characterScope);
	},
	
	/**
	 * @param {Character} characterScope
	 * @returns {string}
	 */
	getTooltip : function( characterScope )
	{
		var html = "<table cellpadding = 0 cellspacing = 0>";
		var fitsLevelReqs = this.fitsLevelRequirements(characterScope);
		var fitsSkillReqs = this.fitsSkillLineRequirements(characterScope);
		var fitsGemConditions = this.isGemActive(characterScope);
		
		html += Tools.addTr1(
			"<span "+( fitsSkillReqs && fitsLevelReqs ? ( fitsGemConditions ? "class='green'" : "class='grey'" ):"class='red'")+">"+
			( this.types[0] == 7 && this.spells[0] ? locale["use"]+": " + this.spells[0].getDescription(characterScope).join("<br />") : this.description ) + 
			"</span>"
		);
		
		if( !fitsLevelReqs )
		{
			html += Tools.addTr1(
				"<span class='red'>" +
				TextIO.sprintf1(locale['reqLevel'],this.requiredCharacterLevel)+
				"</span>"
			);
		}
		if( !fitsSkillReqs )
		{
			html += Tools.addTr1(
				"<span class='red'>" +
				locale['req']+" "+this.requiredSkillLine.name+" ("+this.requiredSkillLineLevel+")"+
				"</span>"
			);
		}
		return html + "</table>";
	},
	/**
	 * @param {Auras} auras
	 */
	getActiveSpells : function( auras ) {
		for( var i=0; i<3; i++ ) {
			if( this.types[i] == 3 ) {
				auras.add( this.spells[i] );
			}
		}
	},
	getStatWeightBasedScore : function( weights ) {
		var s = 0;
		for( var j = 0; j < 3; j++ ) {
			switch( this.types[j] ) {
			case 5:
				switch( this.spellIds[j] ) {
					// Mana
					case 0: 
						s += weights[2] * this.values[j];
						break;
					default:
						s += weights[this.spellIds[j]] * this.values[j];
						break;
				}
				break;
			case 4:
				switch( this.spellIds[j] ) {
					case 0: s += weights[50] * this.values[j]; break;
					case 1: s += weights[53] * this.values[j]; break;
					case 2: s += weights[51] * this.values[j]; break;
					case 3: s += weights[55] * this.values[j]; break;
					case 4: s += weights[52] * this.values[j]; break;
					case 5: s += weights[54] * this.values[j]; break;
					case 6: s += weights[56] * this.values[j]; break;
				}
				break;
			case 3:
				s += this.spells[j].getStatWeightBasedScore( weights );
				break;
			}
		}
		return s;
	}
};