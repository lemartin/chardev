/**
 * @constructor
 * @param {Array} serialized
 * @returns {Spell}
 */
function Spell( serialized ) {
	var i;
	/**
	 * Resolved spell references:
	 * 
	 * By adding all spell references to the spell container
	 * chardev is able to resolve circular references.
	 * 
	 * These do occure within proc-chains, see {@link SpellEffect}.
	 */
	var ss = serialized[17];
	var s = null;
	
	if( ss != null ) {
		for( i = 0; i < ss.length; i++ ) {
			s = ss[i];
			if( ! s || g_spells.contains(s[0]) ) {
				continue;
			}
			g_spells.set( new Spell(s) );
		}
	}
	//
	//	Unserialize
	//
	this._level = 85;
	this._serialized = serialized;
	this._id = serialized[0];
	this._name = serialized[1];
	this._desc = serialized[2];
	this._icon = serialized[3];
	this._duration = serialized[4];
	this._ranges = serialized[5]; //0: MinEnemy, 1: MaxEnemy, 2: MinFriend, 3: MaxFriend
	this._cost = serialized[6]; //0: Absolute, 1: Percent
	this._energyType = serialized[7];
	this._castTime = serialized[8];
	this._cooldowns = serialized[9]; //0: Spell, 1: Category, 2: Global
	if( this._cooldowns == null ) {
		this._shownCooldown = 0;
	}
	else {
		this._shownCooldown = Math.max(this._cooldowns[0],this._cooldowns[1])/1000;
	}
	this._effects = new Array(3);
	for( i = 0; i < 3; i++ ) {
		this._effects[i] = serialized[10][i] ? new SpellEffect(serialized[10][i]) : null;
	}
	this._scaling = serialized[11] ? new SpellScaling(serialized[11]) : null;
	this._bustedDesc = serialized[12] ? serialized[12] : "";
	this._scalableDescription = serialized[13];
	this._shapehshift = serialized[14] ? new SpellShapeshift(serialized[14]) : null;
	this._equippedItems = serialized[15] ? new SpellEquippedItems(serialized[15]) : null;
	
	this._type = [];
	for( i=0; i<serialized[16].length; i++ ) {
		this._type[i] = Tools.toUnsigned(serialized[16][i]);
	}
	
	this._auraOptions = serialized[18] ? new SpellAuraOptions(serialized[18]) : null;
	this._classOptions = serialized[19] ? new SpellClassOptions(serialized[19]) : null; 
	this._elixirMask = serialized[20];
	
	this.setLevel(this._level);
}

Spell.prototype._level = 0;
Spell.prototype._serialized = null;
Spell.prototype._id = null;
Spell.prototype._name = null;
Spell.prototype._desc = null;
Spell.prototype._icon = null;
Spell.prototype._duration = null;
Spell.prototype._ranges = null;
Spell.prototype._cost = null;
Spell.prototype._energyType = null;
Spell.prototype._castTime = null;
Spell.prototype._cooldowns = null;
Spell.prototype._shownCooldown = 0;
Spell.prototype._effects = null;
Spell.prototype._scaling = null;
Spell.prototype._bustedDesc = null;
Spell.prototype._scalableDescription = false;
/** @type {SpellShapeshift} */
Spell.prototype._shapehshift = null;
/** @type {SpellEquippedItems} */
Spell.prototype._equippedItems = null;
/** @type {SpellAuraOptions} */
Spell.prototype._auraOptions = null;
/** @type {SpellClassOptions} */
Spell.prototype._classOptions = null;
Spell.prototype._type = null;
Spell.prototype._elixirMask = 0;

// TODO

Spell.prototype._runecost = 0;

/**
 * @returns {string}
 */
Spell.prototype.getDescription = function(){
	var desc = this._bustedDesc;
	var match;
	var cTime, eValue;
	var mod;
	// replace scaling effect variables $m and $M
	while( ( match = desc.match(/\$(s|m|M)\(-?(\d+),(-?\d+),(-?\d+),(-?\d+),(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)\)/i)) != null ) {
		mod = parseFloat(match[8]);
		cTime = g_calculateCastTime( parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10), this._level );
		eValue = g_calculateScaling( cTime?cTime[1]:1, parseInt(match[5], 10), parseFloat(match[6]), parseFloat(match[7]), this._level );
		desc = desc.replace(match[0],Math.floor(mod*(Math.abs(eValue[0])+(match[1]=='M'?Math.abs(eValue[1]):0))));
	}	
	// replace duration
	while( ( match = desc.match(/\$d\((\d+),(\d+),(\d+),(\d+(?:\.\d+)?)\)/i)) != null ) {
		mod = parseFloat(match[4]);
		cTime = g_calculateCastTime( parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10), this._level );
		desc = desc.replace(match[0],cTime[0]);
	}
	// replace time inside equations with value, outside with formated string
	while( ( match = desc.match(/(\${[^}]*)\$time\((-?\d+(?:\.\d+)?)\)([^}]*})/i)) ) {
		desc = desc.replace(match[0],match[1]+match[2]+match[3]);
	}
	while( ( match = desc.match(/\$time\((-?\d+(?:\.\d+)?)\)/i)) ) {
		desc = desc.replace(match[0],TextIO.timeToString(match[1]));
	}
	return desc.replace(/\$pl/ig,this._level);
};
/** @returns {string} */
Spell.prototype.getName = function(){return this._name;};

/** @param {number} level */
Spell.prototype.setLevel = function(level) {
	var cTime, eValue, i;
	this._level = level;
	if( this._scaling != null ) {
		cTime = g_calculateCastTime( this._scaling._castTimeStart, this._scaling._castTimeEnd, this._scaling._intervals, this._level );
		if( cTime != null ) {
			this._castTime = cTime[0];
		}
		
		for( i = 0; i < this._effects.length; i++ ) {
			if( this._effects[i] != null )
			{
				eValue = g_calculateScaling( cTime != null ? cTime[1] : 1, this._scaling._distribution, this._scaling._coefficients[i], this._scaling._dices[i], this._level );
				if( eValue != null ) {
					this._effects[i]._value = eValue[0];
					this._effects[i]._dice = eValue[1];
				}
			}
		}
	}
	else {
		for( i = 0; i < this._effects.length; i++ ) {
			if( this._effects[i] != null ) {
				this._effects[i].setLevel(level);
			}
		}
	}
};

/**
 * @param {Character} characterScope
 * @param {number} type
 * @param {Array} args
 * @returns {string}
 */
Spell.prototype.getTooltip = function(characterScope,type,args)
{
	this.setLevel( characterScope != null ? characterScope._level : DEFAULT_LEVEL );
	
	var html = "<table cellpadding = 0 cellspacing = 0 style='vertical-align: top'>";
	var tmp = "", lHtml = '', rHtml = '';
	//
	if( !type || (type&1) == 0 )
	{	
		html+=Tools.addTr1("<span class='tooltip_title'>" + this.getName() + "</span>");
	}
	//
	//#########################################################################
	//
	//	ENERGY COST AND RANGE
	//
	//#########################################################################
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	ENERGY COST
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	lHtml = '';
	if( this._runecost && this._energyType == 5)
	{
		if(this._runecost[0]){
			lHtml += this._runecost[0]+ " " + locale['Blood'];
		}
		if(this._runecost[1]){
			lHtml += ( lHtml ? ", " : "" ) + this._runecost[1]+ " " + locale['Unholy'];
		}
		if(this._runecost[2]){
			lHtml += ( lHtml ? ", " : "" ) + this._runecost[2]+ " " + locale['Frost'];
		}
	}
	else if( this._cost )
	{
		tmp = ( this._energyType == 1 || this._energyType == 6 ? this._cost[0] / 10 : this._cost[0] );
		if ( characterScope != null ) 
		{
			tmp = Math.max(Tools.floor(tmp, 2), Math.floor(this._cost[1] * characterScope._stats._baseMana / 100));
			if( tmp > 0 ) {
				lHtml = tmp + " " + locale['energy2'][this._energyType];
			}
		}
		else 
		{
			if (tmp > 0) {
				lHtml = tmp + " " + locale['energy2'][this._energyType];
			}
			else if (this._cost[1] > 0) {
				lHtml = Tools.floor(this._cost[1], 2) + '% ' + locale['ofBaseMana'];
			}
		}
	}
	lHtml = lHtml ? "<span style='white-space:nowrap'>" + lHtml + "</span>" : ""; 
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	RANGE
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	rHtml = "";
	if( this._ranges != null && this._ranges[1] > 0 ){
		if( this._ranges[3] > 0 && ( this._ranges[1] != this._ranges[3] || this._ranges[0] != this._ranges[2] )) {
			
			rHtml = TextIO.sprintf1( locale['RangeEnemy'], TextIO.rangeToString( this._ranges[0], this._ranges[1])) +
					"<br />" +
					TextIO.sprintf1( locale['RangeFriendly'], TextIO.rangeToString( this._ranges[2], this._ranges[3]));
		}
		else {
			rHtml = TextIO.rangeToString(this._ranges[0],this._ranges[1]);
		}
	}
	if( lHtml && rHtml ) {
		html += Tools.addTr2(lHtml,rHtml);
	}
	else if ( lHtml || rHtml ){
		html += Tools.addTr1( lHtml ? lHtml : rHtml );
	}
	//
	//#########################################################################
	//
	//	COOLDOWN AND CASTTIME
	//
	//#########################################################################
	//
	tmp = this._shownCooldown;
	//
	rHtml = '';
	if( this._shownCooldown ) {
		rHtml = TextIO.timeToString( tmp ) + " " + locale['cooldown'];
	}
	
	//TODO Show instant cast, even if there is not CD (e.g. Blessing of ...)
	lHtml = '';
	if( this._castTime > 0 || rHtml ) {
		lHtml = "<span style='white-space:nowrap'>" + ( this._castTime > 0 ? TextIO.sprintf1( locale['cast'], Tools.ceil( this._castTime / 1000 , 2 )) : locale['instantCast']) + "</span>";
	}
	
	if( rHtml ) {
		html += Tools.addTr2(lHtml, rHtml);
	}
	else if ( lHtml ) {
		html += Tools.addTr1(lHtml);
	}
	//
	//
	//
	if( type&1 )
	{
		for(var i = 0; i < args.length ; i++)
		{
			html += Tools.addTr1("<span class='tooltip_talents_required'>"+args[i]+"</span");
		}
	}
	//
	//	desc
	//
	html += Tools.addTr1("<span class='tooltip_spell_description'>"+TextIO.parse(this.getDescription(),characterScope).join('<br/>')+"</span>");
	return html + "</table>";
};

Spell.prototype.isAura = function() {
	return ( this._type[0] & 64 ) != 0 && this._duration <= 0;
};

Spell.prototype.isBuff = function() {
	return ! this.isAura();
};

/** @returns {Spell} */
Spell.prototype.clone = function(){ return new Spell(this._serialized);};
/** @returns {string} */
Spell.prototype.toString = function(){ return "Spell ["+this._id+"]: "+this.getDescription();};
/** @returns {number} */
Spell.prototype.serialize = function(){return this._id;};



Spell.prototype.getStatWeightBasedScore = function( weights ) {
	var s = 0;
	
	if( ! this.isAura() ) {
		return 0;
	}
	
	for( var i=0; i<3; i++ ) {
		if( this._effects[i] ) {
			s += this._effects[i].getStatWeightBasedScore( weights );
		}
	}
	return s;
};

Spell.prototype.getTriggeredSpell = function() {
	for( var i=0; i<3; i++ ) {
		if ( this._effects[i] && this._effects[i]._effect == 23 ) {
			return g_spells.get(this._effects[i]._procSpellId);
		}
	}
};