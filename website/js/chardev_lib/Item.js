/**
 * @author LeMartin
 */

/**
 * @constructor
 * @param {Array} serialized
 * @returns {Item}
 */
function Item (serialized) {
	var i;
	//#######################################################
	//	PROPERTIES
	//#######################################################
	this._gems = [null,null,null];
	this._enchants = [];
	//#######################################################
	//	CONSTRUCTOR
	//#######################################################
	this._characterLevel = 85;
	this._serialized = serialized;
	this._id = serialized[0];
	this._quality = serialized[1];
	this._class = serialized[2];
	this._subClass = serialized[3]; this._unmodifiedSubClass = this._subClass; // used for heirloom
	this._inventorySlot = serialized[4];
	this._chrClassMask = serialized[5];
	this._level = serialized[6];
	this._requiredCharacterLevel = serialized[7];
	this._requiredSkillLineId = serialized[8];
	this._requiredSkillLineLevel = serialized[9];
	this._requiredFactionId = serialized[10];
	this._requiredFactionReputation = serialized[11];
	this._stackSize = serialized[12];
	this._stats = serialized[13]; //[[id,value],[id,value]....]
	this._delay = serialized[14];
	this._spells = [];
	for( i=0; i<serialized[15].length; i++ ) {
		this._spells[i] = serialized[15][i] != null ? new Spell(serialized[15][i]) : null;
	}
	this._binds = serialized[17];
	this._name = serialized[18]; this._unmodifiedName = this._name;
	this._itemSet = ( serialized[19] != null ? new ItemSet(serialized[19]) : null);
	this._durability = serialized[20];
	this._socketColors = serialized[21]; // [sColor1,sColor2,sColor3]
	this._socketBonus = serialized[22] != null ? new SpellItemEnchantment(serialized[22]) : null; 
	this._icon = serialized[23];
	this._subClassName = serialized[24];
	this._typeMask = serialized[25];
	this._buyPrice = serialized[26];
	this._sellPrice = serialized[27];
	this._armor = serialized[28];
	this._unique = serialized[29];
	this._requiredFactionName = serialized[30];
	//TODO this._isGem = ( this._gemPropertiers != null );
	this._spellTriggers = serialized[31];
	this._spellCharges = serialized[32];
	this._spellCooldowns = serialized[33];
	this._spellCategoryIds = serialized[34];
	this._spellCategoryCooldowns = serialized[35];
	this._gemProperties = serialized[36] != null ? new GemProperties(serialized[36]) : null;
	this._description = serialized[37];
	this._dps = serialized[38];
	this._minDamage = serialized[39];
	this._maxDamage = serialized[40];
	
	this._randomEnchants = null;
	if( serialized[41] ) {
		this._randomEnchants = [];
		for( i=0; i<serialized[41].length; i++ ) {
			this._randomEnchants[i] = new ItemRandomProperty(serialized[41][i]);
		}
	}
	else if( serialized[42] ) {
		this._randomEnchants = [];
		for( i=0; i<serialized[42].length; i++ ) {
			this._randomEnchants[i] = new ItemRandomSuffix(serialized[42][i]);
		}
	}
	
	this._scalingStatDistribution = serialized[43]; // [stat1,...,stat10,coeff1,...,coeff10,minlvl,maxlvl]
	this._typeMask2 = serialized[44];
	this._damageRange = serialized[45];
	
	this._questId = serialized[46];
	this._limitCategory = serialized[47];
	this._limitCategoryMultiple = serialized[48];
	this._chrRaceMask = serialized[49];
}
Item.prototype._gems = [];
Item.prototype._enchants = [];
/**
 * @type {ItemRandomEnchantment}
 */
Item.prototype._selectedRandomEnchantment = null;
Item.prototype._hasRandomEnchantments = false;
/** @type {Character} */
Item.prototype._characterScope = null;
//#######################################################
//	CONSTRUCTOR
//#######################################################
Item.prototype._characterLevel = DEFAULT_LEVEL;
Item.prototype._serialized = [];
Item.prototype._id = 0;
Item.prototype._quality = 0;
Item.prototype._class = 0;
Item.prototype._subClass = 0;
Item.prototype._inventorySlot = 0;
Item.prototype._chrClassMask = 0;
Item.prototype._level = 0;
Item.prototype._requiredCharacterLevel = 0;
Item.prototype._requiredSkillLineId = 0;
Item.prototype._requiredSkillLineLevel = 0;
Item.prototype._requiredFactionId = 0;
Item.prototype._requiredFactionReputation = 0;
Item.prototype._stackSize = 0;
Item.prototype._stats = [];
Item.prototype._delay = 0;
Item.prototype._spells = [];
Item.prototype._binds = 0;
Item.prototype._name = "";
Item.prototype._itemSet = null;
Item.prototype._durability = 0;
Item.prototype._socketColors = [];
Item.prototype._socketBonus = null; 
Item.prototype._icon = "";
Item.prototype._subClassName = "";
Item.prototype._typeMask = 0;
Item.prototype._typeMask2 = 0;
Item.prototype._buyPrice = 0;
Item.prototype._sellPrice = 0;
Item.prototype._armor = 0;
Item.prototype._unique = 0;
Item.prototype._requiredFactionName = "";
Item.prototype._spellTriggers = [];
Item.prototype._spellCharges = [];
Item.prototype._spellCooldowns = [];
Item.prototype._spellCategoryIds = [];
Item.prototype._spellCategoryCooldowns = [];
Item.prototype._description = "";
/** @type {GemProperties} */
Item.prototype._gemProperties = null;
Item.prototype._dps = 0;
Item.prototype._minDamage = 0;
Item.prototype._maxDamage = 0;
Item.prototype._damageRange = 0;
/*reforge stats*/
Item.prototype._addedStat = -1;
Item.prototype._addedStatValue = -1;
Item.prototype._reducedStat = -1;
Item.prototype._reducedStatValue = -1;
/*random props*/
Item.prototype._randomEnchants = null;
Item.prototype._unmodifiedName = "";
Item.prototype._scalingStatDistribution = null;
Item.prototype._unmodifiedSubClass = 0;
//
Item.prototype._questId = 0;
Item.prototype._limitCategory = 0;
Item.prototype._limitCategoryMultiple = 0;
Item.prototype._chrRaceMask = 0;

// TODO
Item.prototype._requiredSkillLevel = 0;
Item.prototype._requiredSkillId = 0;
Item.prototype._requiredSpellId = 0;
Item.prototype._requiredSkill = null;
Item.prototype._requiredSpell = null;

/**
 * @param {number} id
 */
Item.prototype.setRandomEnchantment = function( id ) {
	if( this._selectedRandomEnchantment && id == this._selectedRandomEnchantment._id ) {
		return;
	}
	
	this.restore();
	
	if( id == 0 ) {
		this._selectedRandomEnchantment = null;
		this._name = this._unmodifiedName;
		return;
	}

	if( this._randomEnchants ) {
		for( var i=0; i< this._randomEnchants.length; i++ ) {
			if( this._randomEnchants[i]._id == id ) {
				this._selectedRandomEnchantment = this._randomEnchants[i].clone();
				this._name = this._unmodifiedName+" "+this._selectedRandomEnchantment._name;
				return;
			}
		}
	}
	
	
	Tooltip.showError("Unable to set random property (ID:"+id+")");
};

/**
 * Sets the scaling stats of an heirloom 
 * @param {number} level
 */
Item.prototype.setStats = function(level)
{	
	if( this._scalingStatDistribution == null ) {
		return;
	}
	
	var n = 0, statValue = 0, dps = 0;
	
	level = Math.min(level,this._scalingStatDistribution[21]);
	// don't scale / remove resistance, lava dredger
	if( this._stats[n] != null && this._stats[n][0] > 50 ) {
		this._stats[9] = this._stats[n];
		this._stats[n] = null;
	}
	
	if( this._class == 4 ) {
		switch( this._inventorySlot ) {
		case 1:
			this._armor = SCALING_STAT_VALUE[level][19+this._subClass];
			statValue = SCALING_STAT_VALUE[level][7];
			break;
		case 3:
			this._armor = SCALING_STAT_VALUE[level][11+this._subClass];
			statValue = SCALING_STAT_VALUE[level][8];
			break;
		case 5:
		case 20:
			this._armor = SCALING_STAT_VALUE[level][15+this._subClass];
			statValue = SCALING_STAT_VALUE[level][7];
			break;
		case 7:
			this._armor = SCALING_STAT_VALUE[level][23+this._subClass];
			statValue = SCALING_STAT_VALUE[level][7];
			break;
		case 11:
			statValue = SCALING_STAT_VALUE[level][9];
			break;
		case 12:
			statValue = SCALING_STAT_VALUE[level][8];
			break;
		case 16:
			this._armor = SCALING_STAT_VALUE[level][44];
			statValue = SCALING_STAT_VALUE[level][9];
			break;
		}
		switch( this._unmodifiedSubClass ) {
		case 4:
			if( level >= 40 ) {
				this._subClass = 4;
			}
			else {
				this._subClass = 3;
			}
			this._subClassName[0] = locale['a_armor'][this._subClass];
			break;
		case 3:
			if( level >= 40 ) {
				this._subClass = 3;
			}
			else {
				this._subClass = 2;
			}
			this._subClassName[0] = locale['a_armor'][this._subClass];
			break;
		}
	}
	else if( this._class == 2 ) {
		var iscMask = 1<<this._subClass;
		// ranged
		if( iscMask&(1<<2|1<<3|1<<18) ) {
			statValue = SCALING_STAT_VALUE[level][10];
			dps = SCALING_STAT_VALUE[level][4];
		}
		// one-hand / caster 0 4 7 11 13 15 
		else if( iscMask&(1<<0|1<<4|1<<7|1<<11|1<<13|1<<15) ) {
			statValue = SCALING_STAT_VALUE[level][11];
			dps = SCALING_STAT_VALUE[level][ this._typeMask2&512 ? 2 : 0 ];
		}
		// two-hand / caster 1 5 6 8 10 12 17 20
		else if( iscMask&(1<<1|1<<5|1<<6|1<<8|1<<10|1<<12|1<<17|1<<20) ) {
			statValue = SCALING_STAT_VALUE[level][7];
			dps = SCALING_STAT_VALUE[level][ this._typeMask2&512 ? 3 : 1 ];
		}
	}
	
	if( statValue ) {
		for( var i=0; i<10; i++ ) {
			if( this._scalingStatDistribution[i] > 0 ) {
				this._stats[n++] = [
					this._scalingStatDistribution[i],
					Math.floor( this._scalingStatDistribution[i+10] * statValue / 10000 )
				];
			}
		}
		// Caster weapons spell power
		if((this._typeMask2&512) && ( this._class == 2 ) && (SCALING_STAT_VALUE[level][6]>0)) {
			this._stats[n++] = [45, SCALING_STAT_VALUE[level][6]];
		}
	}
	
	if( dps ) {
		this._dps = dps;
		this._minDamage = Math.floor( this._dps * this._delay * ( 1 - this._damageRange/2 ) / 1000);
		this._maxDamage = Math.floor ( this._dps * this._delay * ( 1 + this._damageRange/2 ) / 1000);
	}
};

/**
 * Returns whether this Item is a melee weapon.
 * @return {boolean} true if it's a melee weapon
 */
Item.prototype.isMeleeWeapon = function(){
	return (this._class == 2 && ( this._subClass == 0 
									  	|| this._subClass == 1 
										|| this._subClass == 4 
										|| this._subClass == 5 
										|| this._subClass == 6 
										|| this._subClass == 7 
										|| this._subClass == 8 
										|| this._subClass == 10 
										|| this._subClass == 13 
										|| this._subClass == 15));
};

/**
 * @param {SpellItemEnchantment} enchant
 * @returns {SpellItemEnchantment} Replaced Enchant
 */
Item.prototype.addEnchant = function( enchant )
{
	if( !enchant ) {
		return null;
	}
	
	for( var i=0; i<this._enchants.length; i++ ) {
		var e = this._enchants[i];
		
		if( e._types[0] == 7 && enchant._types[0] == 7 || e._types[0] != 7 && enchant._types[0] != 7 ) {
			var old = e;
			this._enchants[i] = enchant;
			return old;
		}
	}
	this._enchants.push(enchant);
	return null;
};

/**
 * @param {SpellItemEnchantment} enchant
 */
Item.prototype.removeEnchant = function( enchant ) 
{
	if( !enchant ) {
		return;
	}
	for( var i=0; i<this._enchants.length; i++ ) {
		if( this._enchants[i]._id == enchant._id ) {
			this._enchants.splice(i,1);
			return;
		}
	}
};

/**
 * @param {Item} gem
 * @param {number} socketIndex
 */
Item.prototype.addGem = function( gem, socketIndex )
{	
	this._addGem(gem, socketIndex, false);
};

/**
 * @param {Item} gem
 * @param {number} socketIndex
 */
Item.prototype.addGemForced = function( gem, socketIndex ) {
	this._addGem(gem, socketIndex, true);
};

/**
 * @private
 * @param {Item} gem
 * @param {number} socketIndex
 * @param {boolean} force
 */
Item.prototype._addGem = function( gem, socketIndex, force ) {
	if( gem )
	{
		if( !force 
				&& this._characterScope != null 
				&& (gem._unique > 0 || gem.isUniqueEquipped() == true)
				&& (this._gems[socketIndex] == null || this._gems[socketIndex]._id != gem._id)
		) {
			if( ! this._characterScope._inventory.testGemUnique( gem._id ) ) {
				Tooltip.showError(TextIO.sprintf1(locale['ERR_UniqueGem'],gem._name));
				return;
			}
		}
		
		if( this._socketColors[socketIndex] != 1 && gem._subClass == 6 ||
			this._socketColors[socketIndex] == 1 && gem._subClass != 6 ) 
		{
			return;
		}
		if( gem._gemProperties && gem._gemProperties._reqItemLevel > this._level ) {
			if( ! force ) {
				Tooltip.showError(TextIO.sprintf1(locale['ERR_GemRequiresMinItemLevel'],gem._gemProperties._reqItemLevel));
			}
			return;
		}
		gem.setCharacterScope(this._characterScope);
	}
	this._gems[socketIndex] = gem;
};

/**
 * @param {number} socketIndex
 */
Item.prototype.removeGem = function( socketIndex ){
	this._gems[socketIndex] = null;
};

/***/
Item.prototype.getActiveSpells = function( )
{
	var auras = this._characterScope._auras;
	var i, tmp;
	
	for ( i = 0; i < 5; i++) { 
		tmp = this._spells[i];
		if ( tmp && this._spellTriggers[i] == 1 ) { 
			auras.add(this._spells[i]);
		}
	}
	
	for ( i = 0; i < 3; i++) {
		tmp = this._gems[i];
		if ( tmp ) { 
			tmp.getActiveSpells(auras);
		}
	}
	
	for( i=0; i<this._enchants.length; i++ ) {
		this._enchants[i].getActiveSpells(auras);
	}
		
	if (this._socketBonus != null && this.isSocketBonusActive()) 
		this._socketBonus.getActiveSpells(auras);
	
	if (this._gemProperties != null && this._gemProperties._enchant.isActive(this._characterScope)) 
		this._gemProperties._enchant.getActiveSpells(auras);
};

/**
 * @return {boolean}
 */
Item.prototype.isSocketBonusActive = function(){
	var r = true;
	if( !this._socketBonus ) {
		return false;
	}
	for(var i=0;i<3;i++)
	{
		if(this._socketColors[i])
		{
			if( this._gems[i] == null ) { 
				return false;
			}
			switch(this._socketColors[i])
			{
				case 1:
					if(this._gems[i]._subClass!=6) 
						return false;
						break;
				case 2:
					if(!(Math.pow(2,this._gems[i]._subClass)&(1+8+32+256))) 
						return false;
					break;
				case 4:
					if(!(Math.pow(2,this._gems[i]._subClass)&(4+16+32+256))) 
						return false;
					break;
				case 8:
					if(!(Math.pow(2,this._gems[i]._subClass)&(2+8+16+256))) 
						return false;
					break;
			}
		}
	}
	return r;
};

/**
 * @returns {string}
 */
Item.prototype.getSpeedFormatted = function(){
	return ((this._delay%1000)==0?(this._delay/1000)+".00":((this._delay%100)==0?(this._delay/1000)+"0":Math.floor(this._delay/10)/100+""));
};

/**
 * @returns {string}
 */
Item.prototype.getDPSFormatted = function(){
	return Math.floor(this._dps*10)/10 + ( Math.floor(this._dps*10)%10 == 0 ? ".0" : "" );
};
/** @returns {Item} */
Item.prototype.clone = function(){return new Item(this._serialized);};
/** @returns {string} */
Item.prototype.toString = function(){return "Class Item "+this._id;};
/** @returns {number} */
Item.prototype.serialize = function(){return this._id;};
/** @returns {boolean} */
Item.prototype.isUnique = function(){return (this._unique>0);};
/** @returns {boolean} */
Item.prototype.isUniqueEquipped = function() {return (this._typeMask & (1<<19)) != 0; };

/**
 * @param {Character} scope
 * @param {number} flags
 * @returns {string} HTML Tooltip
 */
Item.prototype.getTooltip = function( scope, flags )
{
	var tmp = "";
	var i;
	var html;
	var stats = "", ratings = "";
	var chrLevel = DEFAULT_LEVEL,
		characterScope = null;
	var statEnchants = "", useEnchants = "";
	//
	//
	//
	if( scope ) {
		characterScope = scope;
	}
	else if( this._characterScope ){
		characterScope = this._characterScope;
	}
	chrLevel = characterScope != null ? characterScope._level : DEFAULT_LEVEL;
	this.setStats( chrLevel );
	//
	//
	//
	for(i=0;i<this._stats.length;i++){
		if( !this._stats[i] || this._stats[i][1] == 0 ) {
			continue;
		}
		if( this._stats[i] && this._stats[i][0] > 11 && this._stats[i][0] < 50 ) {
			ratings += Tools.addTr1(this._showRating( chrLevel, this._stats[i][0], this._stats[i][1] ));
		}
		else {
			stats += Tools.addTr1(this._showStat(this._stats[i][0], this._stats[i][1]));
		}
	}
	
	if( this._addedStat > -1 ) {
		if( this._addedStat <= 11 ) {
			stats += Tools.addTr1("<div class='green'>"+this._showStat(this._addedStat, this._addedStatValue)+"</div>");
		}
		else {
			ratings += Tools.addTr1("<div class='green'>"+this._showRating( chrLevel, this._addedStat, this._addedStatValue)+"</div>");
		}
	}
	for ( i=0; i<this._enchants.length; i++ ) {
		var e = this._enchants[i];
		
		tmp = Tools.addTr1(e.getTooltip(characterScope));
		if( e._types[0] == 7 && e._spells[0] ) {
			useEnchants += tmp;
		}
		else {
			statEnchants += tmp;
		}
	}
	//
	//
	//
	html = "<table cellpadding='0px' cellspacing='0px' class='tooltip_table'>";
	
	html += Tools.addTr1("<div class='tooltip_title' style='color:"+g_color[this._quality]+"; white-space:nowrap;'>"+this._name+"</div>");
	
	if( this._typeMask & (1<<3))
	{
		html += Tools.addTr1("<span class='green'>"+locale['Heroic']+"</span>");
	}
	
	if( this._typeMask & (1<<27) ) {
		html += Tools.addTr1(locale['boa']);
	}
	else {
		switch(this._binds){
			case 1:
				html += Tools.addTr1(locale['bop']);
				break;
			case 2:
				html += Tools.addTr1(locale['boe']);
				break;
			case 3:
				html += Tools.addTr1(locale['bou']);
				break;
		}
	}
	
	if( this._unique == 1 ){
		html += Tools.addTr1(locale['Unique']);
	}
	else if( this._unique > 1 ) {
		html += Tools.addTr1( TextIO.sprintf1(locale['UniqueMultiple'],this._unique));
	}
	
	if( this._gemProperties && this._gemProperties._reqItemLevel ) {
		html += Tools.addTr1( TextIO.sprintf1(locale['RequiresItemLevel'],this._gemProperties._reqItemLevel));
	}
	
	if( this._typeMask & (1<<19))
	{
		html += Tools.addTr1(locale['UniqueEquipped']);
	}
	
	if(this._questId)
	{
		html += Tools.addTr1(locale['This_Item_Begins_a_Quest']);
	}
	
	if ( this._subClassName ) {
		switch (this._class) {
			//	Armor
			case 4:
				if(this._inventorySlot == 0){
					// if(_item.inventorySlotId<1) Tools.addTr(_item.a_class); ???
				}
				else if(this._inventorySlot == 0 || this._subClass == 0){
					html += Tools.addTr1(locale['a_slot'][this._inventorySlot]);
				}
				else if ( this._gemProperties == null ) {
					var can = ( characterScope != null ? characterScope.canWear(this) : true );
					html += Tools.addTr2( 
						locale['a_slot'][this._inventorySlot], 
						"<span"+( can ? "" : " class='red'")+">"+this._subClassName[0]+"</span>"
					);
				}
				else {
					html += Tools.addTr1(this._subClassName[0]);
				}
				break;
			//	Weapon
			case 2:
				html += Tools.addTr2(locale['a_slot'][this._inventorySlot], this._subClassName[0]);
				break;
			//	Container
			case 1:
				html += Tools.addTr1(this._subClassName[0]);
				break;
		}
	}
	
	if( this._reducedStat != -1 ) {
		html += Tools.addTr1("<span class='green'>"+locale['Reforged']+
				"</span><span class='tooltip_reforge_info'>: "+
				this._addedStatValue+" "+locale["ItemStatNames"][this._reducedStat]+
				" ⇨ "+
				this._addedStatValue+" "+locale["ItemStatNames"][this._addedStat]+
				"</span>");
	}
	
	if(this._inventorySlot == 24){
		html += Tools.addTr1(TextIO.sprintf1(locale['Adds'],this.getDPSFormatted()));
	}
	else{
		if( this._dps ) {
			html += Tools.addTr2(Math.floor(this._minDamage)+" - "+Math.ceil(this._maxDamage)+" "+locale['damage'],locale['Speed']+" "+this.getSpeedFormatted());
			html += Tools.addTr1("("+TextIO.sprintf1(locale['dps'],Math.floor(this._dps*10)/10+(Math.floor(this._dps*10)%10==0?".0":""))+")");
			
		}
	}
	
	tmp = "";

	if ( this._armor > 0 ) {
		html += Tools.addTr1(TextIO.sprintf1(locale['armor'], this._armor ));
	}
	
	html += stats;
	
	
	if( this._randomEnchants ) {
		if( this._selectedRandomEnchantment != null ) {
			for( i=0; i<this._selectedRandomEnchantment._enchants.length; i++ ) {
				var enchant = this._selectedRandomEnchantment._enchants[i];
				if(!enchant) {
					continue;
				}
				html += Tools.addTr1(enchant._description);
			}
		}
		else {
			html += Tools.addTr1("<span class='green'>&lt;"+locale['RandomEnchantment']+"&gt;</span>");
		}
	}
	
	//
	//	Enchant
	//
	html += statEnchants;
	//
	//	Gems
	//
	for ( i = 0; i < 3; i++) {
		if (this._gems[i] != null) {
			html += Tools.addTr1(
				"<div class='tooltip_gem' style='background-image:url(images/icons/gem/" + this._gems[i]._icon + ".png);'>" + 
				this._gems[i]._gemProperties._enchant.getTooltip( characterScope ) + 
				"</div>"
			);
		}
		else {
			if (this._socketColors[i]) {
				if( this._socketColors[i] == 14 ) {
					html += Tools.addTr1(
							"<div class='tooltip_socket_empty' style='background-image:url(images/socket_prismatic.png);'>" +
							locale['PrismaticSocket'] + "</div>");
				}
				else {
					html += Tools.addTr1(
							"<div class='tooltip_socket_empty' style='background-image:url(images/socket_" + Math.log(this._socketColors[i])/Math.log(2) + ".png);'>" +
							locale['a_socket'][Math.log(this._socketColors[i])/Math.log(2)] + "</div>");
				}
			}
		}
	}
	//
	//	Socketbonus
	//

	if (this._socketBonus) {
		html += Tools.addTr1("<span class='" + (this.isSocketBonusActive() ? "green" : "grey") + "'>" + locale['socketBonus'] + ": " + this._socketBonus._description + "</span>");
	}
	
	if (this._gemProperties) {
		html += Tools.addTr1(this._gemProperties._enchant._description);
	}					
	
	if(this._durability){
		html += Tools.addTr1(locale['Durability']+": "+this._durability+"/"+this._durability);	
	}
	
	if ( this._chrClassMask != 0 && this._chrClassMask < 2048 && this._chrClassMask > 0) {
		var sz_classes = "";
		for ( i = 0; i < 11; i++) {
			if ( (this._chrClassMask & (1<<i)) != 0) {
				sz_classes += (sz_classes ? ", " : "") + locale['a_class'][i];
			}
		}
		if (sz_classes) {
			html += Tools.addTr1(locale['Classes'] + ": " + sz_classes);
		}
	}

	if( this._requiredCharacterLevel || this._quality == 7 ){
		if( this._scalingStatDistribution ) {
			html += Tools.addTr1(
				TextIO.sprintf(
					locale['RequiredLevelScaling'],
					[ 
					  Math.max( 1, this._scalingStatDistribution[20]),
					  this._scalingStatDistribution[21],
					  Math.min( this._scalingStatDistribution[21], chrLevel)
					]
				)
			);
		}
		else {
			html += Tools.addTr1(
				"<span class='"+
				(chrLevel>=this._requiredCharacterLevel?"white":"red")+
				"'>"+TextIO.sprintf1(locale['reqLevel'],this._requiredCharacterLevel)+
				"</span>"
			);
		}
	}
	if(this._requiredSkillId){	
		html += Tools.addTr1("<span class='red'>"+locale['req']+" "+this._requiredSkill+" ("+this._requiredSkillLevel+")</span>");
	}
	if(this._requiredSpellId){	
		html += Tools.addTr1("<span class='red'>"+locale['req']+" "+this._requiredSpell+"</span>");
	}
	if(this._requiredFactionId){ 
		html += Tools.addTr1("<span class='red' style='white-space:nowrap'>"+locale['req']+" "+this._requiredFactionName+" - "+locale['a_reputation'][this._requiredFactionReputation]+"</span>");
	}
	if(this._level && ( this._class == 2 || this._class == 4 ) ){
		html += Tools.addTr1(TextIO.sprintf1(locale['itemLevel'],this._level));
	}
	
	html += ratings;
	
	for ( i = 0; i < 5; i++) {
		if ( this._spells[i] != null ) {
			var spellDesc = this._spells[i].getDescription();
			var cd = "";
			var trigger = "";
			if ( spellDesc ) {
				switch(this._spellTriggers[i])
				{
					case 0:	
						trigger=locale['use'];
						if( this._spellCooldowns[i] > 0 )
						{
							cd = "("+TextIO.timeToString(this._spellCooldowns[i]/1000) +" "+locale['Cooldown']+")";
						}
						break;
					case 1:
						trigger=locale['equip'];
						break;
					case 2:
						trigger=locale['hit'];
						break;
				}
				html += Tools.addTr1(
					"<span class='green'>" + trigger + ": " + 
					( g_settings.isPlanner ? "" : "<a class='tooltip_spell_desc_link' href='?spell="+this._spells[i]._id+"'>" )+
					TextIO.parse(spellDesc,characterScope).join("<br/>") + " " +
					( g_settings.isPlanner ? "" : "</a>" ) + 
					cd + "</span>"  
				);
			}
		}
	}
	//
	//	Usable Enchants
	//
	html += useEnchants;
	//
	//
	//
	if ( this._gemProperties != null && this._gemProperties._enchant._condition) 
	{
		for ( i = 0; i < 5; i++) 
		{
			var color = "#888888";
			if (this._gemProperties._enchant.isConditionActive(i,( characterScope != null ? characterScope._inventory._gemCount : null ))) 
			{
				color = "#FFFFFF";
			}
			var condition = this._gemProperties._enchant._condition;
			var _g = (condition[1][i] ? condition[1][i] : 0);
			var _c = (condition[2][i] ? condition[2][i] : 0);
			var _cg = (condition[3][i] ? condition[3][i] : 0);
			var _v = (condition[4][i] ? condition[4][i] : 0);
			
			switch (_c)
			{
				case 0:
					if (_v != 0) 
					{
						html += Tools.addTr1(
							"<div class='tt_meta_condition' style='color:" + color + "'>"+
							( _v > 1  
								? TextIO.sprintf( locale["Meta_RequiresExactlyPl"], [ _v, locale["Meta_Category"][_g] ]) 
								: TextIO.sprintf1( locale["Meta_RequiresExactly"], locale["Meta_Category"][_g])
							) +
							"</div>"
						);
					}
					break;
				case 2:
					html += Tools.addTr1(
						"<div class='tt_meta_condition' style='color:" + color + "'>" +
						TextIO.sprintf(locale["Meta_RequiresMore"], [ locale['Meta_Category'][_cg], locale["Meta_Category"][_g]]) +
						"</div>");
					break;
				case 3:
					if (_v == 0) 
					{
						html += Tools.addTr1(
							"<div class='tt_meta_condition' style='color:" + color + "'>" +
							TextIO.sprintf(locale["Meta_RequiresMore"], [ locale['Meta_Category'][_g],locale["Meta_Category"][_cg]]) +
							"</div>");
					}
					else 
					{
						html += Tools.addTr1(
							"<div class='tt_meta_condition' style='color:" + color + "'>"+
							( (_v+1) > 1
								? TextIO.sprintf(locale["Meta_RequiresAtLeastPl"], [ _v + 1, locale["Meta_Category"][_g]]) 
								: TextIO.sprintf1(locale["Meta_RequiresAtLeast"], locale["Meta_Category"][_g])
							) +
							+
							"</div>");
					}
					break;
				case 5:
					if( _g > 0 ) {
						html += Tools.addTr1(
							"<div class='tt_meta_condition' style='color:" + color + "'>"+
							( _v > 1  
								? TextIO.sprintf(locale["Meta_RequiresAtLeastPl"], [ _v, locale["Meta_Category"][_g]]) 
								: TextIO.sprintf1(locale["Meta_RequiresAtLeast"],locale["Meta_Category"][_g])
							) +
							"</div>"
						);
					}
					break;
			}
		}
	}

	if(this._description){
		html += Tools.addTr1("<span style='color:#DDDD00'>\""+this._description+"\"</span>");	
	}
	if(  (flags&ITEM_TT_SHORT) != ITEM_TT_SHORT ) {
		if( this._itemSet != null )
		{
			var count = this._itemSet._itemCount;
			var equipped = 0;
			var display = new Array();
			
			if ( characterScope != null ) 
			{
				for ( i = 0; i < 20; i++) 
				{
					tmp = characterScope._inventory.get(i);
					
					if ( tmp != null && tmp._itemSet != null && tmp._itemSet._id == this._itemSet._id ) 
					{
						for (var j = 0; j < count; j++) 
						{
							if ( this._itemSet._items[j] && this._itemSet._items[j][0] == tmp._inventorySlot ) 
							{
								display[j] = tmp._name;
							}
						}
						equipped++;
					}
				}
			}
			html += Tools.addTr1("<div class='tooltip_set_name'>"+this._itemSet._name+" ("+equipped+"/"+count+")</div>");	
			for( i=0;i<count;i++)
			{
				html += Tools.addTr1(
					"<span class='"+(display[i]?'tooltip_set_item_active':'tooltip_set_item_inactive')+"'>"+
					( display[i] ? display[i] : ( this._itemSet._items[i] && this._itemSet._items[i][1] ? this._itemSet._items[i][1] : locale['Unknown'] ))+
					"</span>");	
			}
			//FIXME bonus order
			html += Tools.addTr1("<div class='tooltip_set_bonus_spacing'></div>");
			for ( i = 0; i < 8; i++) 
			{
				var req = this._itemSet._requiredPieces[i];
				if ( req ) 
				{
					html += Tools.addTr1(
						"<div class='" + (equipped>=req ? "tooltip_set_bonus_active" : "tooltip_set_bonus_inactive") + "'>" + 
						"(" + req + ") " + locale['Set'] + ": " +
						( g_settings.isPlanner ? "" : "<a class='tooltip_spell_desc_link' href='?spell="+this._itemSet._bonuses[i]._id+"'>" ) +
						TextIO.parse(this._itemSet._bonuses[i].getDescription(),characterScope) + 
						( g_settings.isPlanner ? "" : "</a>" ) + 
						"</div>");
				}
			}
			
		} 
		
		if( this._sellPrice > 0 ) 
		{
			html += Tools.addTr1(TextIO.sprintf1( locale['SellPrice'], TextIO.htmlPrice(this._sellPrice)));
		}
		
		if( g_settings.isPlanner == true && this._randomEnchants != null ) {
			html += Tools.addTr1("<span style='white-space: normal; color:#808080; font-size:11px'>See Enchants to change the random enchantment</span>");
		}
	}
	
	html+="</table>";
	return html;
};

/**
 * @param {number} id
 * @param {number} value
 * @returns {string}
 */
Item.prototype._showStat = function( id, value ) {
	if( this._characterScope ) {
		var mod = this._characterScope._stats._statPerCentModifier[id];
		if( mod ) {
			return "+" + value + " " + locale["ItemStatNames"][id] 
					+ "<span class='tt_stat_with_mods'>(" + Math.floor( value * ( 1 + mod / 100) ) + ")</span>";
		}
	}
	
	return "+"+value+" "+locale["ItemStatNames"][id]/* + tmp*/;
};

/**
 * @param {number} lvl
 * @param {number} id
 * @param {number} value
 * @returns {string}
 */
Item.prototype._showRating = function( lvl, id, value ) {
	var c =0, br = "", rating = id - 11, v;
	
	switch( rating  ) {
	case 20:
		var v1 = Math.floor( value/COMBAT_RATINGS[5][lvl-1] * 100 ) / 100;
		var v2 = Math.floor( value/COMBAT_RATINGS[7][lvl-1] * 100 ) / 100;
		br = (v1 > 0 ? "m:" + TextIO.formatFloat2(v1) + "%" : "" ) + ( v2 > 0 ? ( v1 > 0 ? ", " : "" ) + "s:" + TextIO.formatFloat2(v2) + "%" : "" );
	break;
	// Attack Power: Per cent modifier, DpS
	case 27:
		if( this._characterScope ) {
			c = this._characterScope._stats._apPerCentModifer;
			v = value * ( 1 + c / 100);
			br = ( c > 0 ? Math.floor( v ) + ", " : "") + TextIO.formatFloat1(v / 14) + " " + locale['dps2'];
		}
		break;
	default:
		if( rating <= 10 ) {
			c = COMBAT_RATINGS[rating][lvl-1];
		}
		else {
			switch( rating  ) {
			case 21:
				c = COMBAT_RATINGS[8][lvl-1];
				break;
			case 24:
				c = COMBAT_RATINGS[15][lvl-1];
				break;
			case 25:
				c = COMBAT_RATINGS[17][lvl-1];
				break;
			case 26:
				c = COMBAT_RATINGS[23][lvl-1];
				break;
			case 38:
				c = COMBAT_RATINGS[25][lvl-1];
				break;
			default:
				br = "";
			}
		}
		v = c > 0 ? Math.floor( value/c * 100 ) / 100 : 0;
		br = v > 0 ? TextIO.formatFloat2(v) + "%" : "";
		break;
	}
	return "<span class='green'>" + locale['equip'] + ": " + TextIO.sprintf1( locale['imprStats'][rating], value) + ( br ? "<span class='tt_rating_percent'>(" + br + ")<\span>" : "" ) + "</span>";
};

/**
 * @param {Character} characterScope
 */
Item.prototype.setCharacterScope = function( characterScope )
{
	this._characterScope = characterScope;
	for( var i = 0 ; i < 3 ; i++ )
	{
		if( this._gems[i] )
		{
			this._gems[i].setCharacterScope( characterScope ); 
		}
	}
};

Item.prototype.isStatPresent = function( stat ) {
	var i, enchant;
	for( i=0; i<this._stats.length; i++ ) {
		if( this._stats[i] ) {
			if( this._stats[i][0] == stat ) {
				if( this._reducedStat != stat ) {
					return this._stats[i][1];
				}
				return this._reducedStatValue;
			}
		}
	}
	if( this._selectedRandomEnchantment ) {
		for( i=0; i<this._selectedRandomEnchantment._enchants.length; i++ ) {
			enchant = this._selectedRandomEnchantment._enchants[i];
			if( enchant && enchant._types[0] == 5 ) {
				if(enchant._spellIds[0] == stat) {
					if( this._reducedStat != stat ) {
						return enchant._values[0];
					}
					return this._reducedStatValue;
				}
			}
		}
	}
	return 0;
};

/**
 * @param {number} oldStat
 * @param {number} newStat
 */
Item.prototype.reforge = function( oldStat, newStat ) {
	var i,valid = false, statIndex = -1, enchantIndex = -1, enchant;

	if( this._reducedStat != -1 ) {
		Tooltip.showError("This item was already reforged!");
		return;
	}
	if( this._level < REFORGE_ITEM_MIN_LEVEL ) {
		Tooltip.showError("Item must be level 200 or higher!");
		return;
	}
	for( i=0; i<REFORGABLE_STATS.length; i++ ) {
		if( oldStat == REFORGABLE_STATS[i] ) {
			valid = true;
		}
	}
	if( !valid ) {
		Tooltip.showError("Invalid stat selected for reforging!");
		return;
	}

	for( i=0; i<this._stats.length; i++ ) {
		if( this._stats[i] ) {
			if( this._stats[i][0] == newStat ) {
				Tooltip.showError(locale['ItemStatNames'][newStat]+" is already present on "+this._name+"!");
				return;
			}
			else if ( this._stats[i][0] == oldStat ) {
				statIndex = i;
			}
		}
	}
	if( this._selectedRandomEnchantment ) {
		for( i=0; i<this._selectedRandomEnchantment._enchants.length; i++ ) {
			enchant = this._selectedRandomEnchantment._enchants[i];
			if( enchant && enchant._types[0] == 5 ) {
				if(enchant._spellIds[0] == newStat) {
					Tooltip.showError(locale['ItemStatNames'][newStat]+" is already present on "+this._name+"!");
					return;
				}
				else if(enchant._spellIds[0] == oldStat ) {
					enchantIndex = i;
				}
			}
		}
	}
	if( statIndex == -1 && enchantIndex == -1 ) {
		Tooltip.showError(locale['ItemStatNames'][oldStat]+" is not present on "+this._name+"!");
		return;
	}
	this._reducedStat = oldStat;
	this._addedStat = newStat;
	
	if( statIndex != -1 ) {
		this._reducedStatValue = this._stats[statIndex][1];
		this._addedStatValue = Math.floor(this._stats[statIndex][1] * 0.4);
		this._stats[statIndex][1] -=  this._addedStatValue; 
	}
	else if( enchantIndex != -1 ) {
		var v;
		enchant = this._selectedRandomEnchantment._enchants[enchantIndex];
		v = enchant._values[0];
		this._reducedStatValue = v;
		this._addedStatValue = Math.floor(v * 0.4);
		enchant.setValue( v - this._addedStatValue ); 
	}
};

/**
 * @public
 */
Item.prototype.restore = function() {
	var i;
	if( this._reducedStat != -1 ) {
		for( i=0; i<this._stats.length; i++ ) {
			if ( this._stats[i] && this._stats[i][0] == this._reducedStat ) {
				this._stats[i][1] = this._reducedStatValue;
				break;
			}
		}
		if( this._selectedRandomEnchantment ) {
			for( i=0; i<this._selectedRandomEnchantment._enchants.length; i++ ) {
				var e = this._selectedRandomEnchantment._enchants[i];
				if( e && e._types[0] == 5 && e._spellIds[0] == this._reducedStat ) {
					e.setValue(this._reducedStatValue);
				}
			}
		}
	}
	this._addedStat = -1;
	this._addedStatValue = -1;
	this._reducedStat = -1;
	this._reducedStatValue = -1;
};

Item.prototype.getStatWeightBasedScore = function( weights ) {
	var s = 0;
	for( var i=0; i<10; i++ ) {
		if( this._stats[i] != null && this._stats[i][0] > 0 ) {
			s += weights[this._stats[i][0]] * this._stats[i][1];
		}
	}
	if( this._gemProperties ) {
		s += this._gemProperties._enchant.getStatWeightBasedScore(weights);
	}
	return s;
};

Item.prototype.hasAdditionalSocket = function() {
	var s = 0, g = 0;
	for( var i=0; i<3; i++ ) {
		if( this._gems[i] ) {
			g++;
		}
		if( this._socketColors[i] ) {
			s++;
		}
	}
	return g > s;
};