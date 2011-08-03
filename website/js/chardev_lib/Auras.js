/**
 * TODO:
 * Buff overwrites are realised on a Spell level in {@link Buffs}. 
 * But there are also Buffs, only overwriting certain effects,
 * e.g. <a href='http://www.wowhead.com/spell=53138'>Abomination Might</a> (AM)
 * and <a href='http://www.wowhead.com/spell=19506/trueshot-aura'>Trueshot Aura</a> (TS), 
 * where TS overwrites AM's 10% AP, but AM's 2% Strength remain active.
 * 
 * Therefore it is necessary to map spell effects, and check whether an concurring effect
 * was already added before adding an new effect
 *
 * @constructor
 * @param {Character} character
 */
function Auras( character ) {
	this._character = character;
	this._effects = [this._createArray(),this._createArray(),this._createArray(),this._createArray()];
	this._mainHandItemClass = [-1,-1];
	this._offHandItemClass = [-1,-1];
	this._rangedItemClass = [-1,-1];
	this._interpretedSpellEffects = null;
	this._auraMap = null;
	this._buffMap = null;
}

Auras.prototype._character = null;
Auras.prototype.__spellClassId = 0;
Auras.prototype._auras = [];
Auras.prototype._buffs = [];
Auras.prototype._effects = [];
Auras.prototype._mainHandItemClass = [-1,-1];
Auras.prototype._offHandItemClass = [-1,-1];
Auras.prototype._rangedItemClass = [-1,-1];
Auras.prototype._interpretedSpellEffects = {};
Auras.prototype._auraMap = {};
Auras.prototype._buffMap = {};
Auras.prototype._appliedMap = {};

/**
 * @returns {Array}
 */
Auras.prototype._createArray = function()
{
	var arr = new Array(321);
	//dmg
	arr[13] = new Array(7);
	//resistance
	arr[22] = new Array(7);
	//stats
	arr[29] = new Array(5);
	//skills
	arr[30] = new Array(96);
	//energy
	arr[35] = new Array(7);
	//hit
	arr[55] = new Array(7);
	//spell crit %
	arr[71] = new Array(7);
	//damage %
	arr[79] = new Array(7);
	//skill talent
	arr[98] = new Array(96);
	//mod % resistance
	arr[101] = new Array(25);
	//flat
	arr[107] = new Array(25);
	//perc
	arr[108] = new Array(25);
	//resistance reduce
	arr[123] = new Array(7);
	//healing / school
	arr[135] = new Array(7);
	//mod % total stat
	arr[137] = new Array(7);
	//mod % base resi
	arr[142] = new Array(7);
	//resistance exclusive
	arr[143] = new Array(7);
	//mod spell dmg %-of 
	arr[174] = new Array(7);
	for (var i = 0; i < 7; i++) 
		arr[174][i] = new Array(5);
	//mod heal %-of index -> 29
	arr[175] = new Array(5);
	//ratings
	arr[189] = new Array(38);
	//mod spellhit by school
	arr[199] = new Array(7);
	//mod flat ranged ap %-of 
	arr[212] = new Array(5);
	//mod flat mp5 %-of 
	arr[219] = new Array(5);
	//mod rating % of stat
	arr[220] = [];
	for( i=0; i<32; i++ ) {
		arr[220][i] = [0,0,0,0,0];
	}
	//mod hit % of stat
	arr[237] = new Array(7);
	//mod sdmg % of ap
	arr[238] = new Array(7);
	//mod %ap of stat
	arr[268] = new Array(5);
	return arr;
};

/**
 * @param {Array} arr
 */
Auras.prototype._clear = function(arr)
{
	if( arr ) {
		for( var i=0; i<arr.length; i++ ) {
			if( typeof arr[i] === 'object' ) {
				this._clear(arr[i]);
			}
			else {
				arr[i] = 0;
			}
		}
	}
};

/**
 * @param {Spell} aura
 */
Auras.prototype.add = function( aura ){
	if( !aura || this._auraMap[ aura._id ] ) {
		return;
	}
	this._auras.push( aura );
	this._auraMap[ aura._id ] = true;
};

/**
 * @param {Buff} buff
 */
Auras.prototype.addBuff = function( buff ) {
	if( !buff || this._buffMap[ buff._spell._id ] ) {
		return;
	} 
	this._buffs.push(buff);
	this._buffMap[ buff._spell._id ] = true;
};

/**
 * @param {number} spellId
 * @returns {boolean}
 */
Auras.prototype.isActive = function( spellId ) {
	return this._auraMap[ spellId ] || this._buffMap[ spellId ] ? true : false;
};

/**
 * @param {boolean} noBuffs
 * @returns {Array}
 */
Auras.prototype.getEffects = function( noBuffs )
{
	var activeSets = [];
	var foundSets = {};
	var inventory = this._character._inventory;
	var tmp, i;
	/** @type {Buff} */
	var b = null;
	

	this.__spellClassId = g_classToSpellChrClass[ this._character._chrClass ? this._character._chrClass._id : 0 ];
	
	this._auras = [];
	this._buffs = [];
	this._clear(this._effects);
	
	this._auraMap = new Object();
	this._buffMap = new Object();
	this._appliedMap = new Object();
	
	this._mainHandItemClass = [-1,-1];
	this._offHandItemClass = [-1,-1];
	this._rangedItemClass = [-1,-1];
	
	this._character.getActiveSpells();
	
	for ( i=0; i < 20; i++) 
	{
		if ( (tmp = inventory.get(i)) ) 
		{
			tmp.getActiveSpells( );
			
			if (i == 16 ) {
				this._mainHandItemClass = [ tmp._class, tmp._subClass];
			}
			if (i == 17 ) {
				this._offHandItemClass = [ tmp._class, tmp._subClass];
			}
			if (i == 18 ) {
				this._rangedItemClass = [ tmp._class, tmp._subClass];
			}
			//	find the active sets, and make sure they are only added once
			if( tmp._itemSet != null )
			{
				if( foundSets[tmp._itemSet._id] !== true )
				{
					foundSets[tmp._itemSet._id] = true;
					activeSets[activeSets.length] = tmp._itemSet;
				}
			}
		}
	}
	
	for( i=0; i<activeSets.length; i++ ) {
		activeSets[i].getActiveSpells(this._character);
	}

	this._interpretedSpellEffects = new Object();
	
	for ( i=0; i < this._auras.length; i++)  {
		this._interpretSpell( this._auras[i], 1, false, false );
	}
	for ( i=0; i < this._buffs.length; i++)  {
		b = this._buffs[i];
		if( b._isDummy || this._appliedMap[b._spell._id] ) {
			continue;
		}
		this._interpretSpell( b._spell, b._stacks, true, b._isSelfBuff );
	}

	return this._effects;
};
/**
 * 
 * @param {Spell} sp
 * @param {number} stacks
 * @param {boolean} isBuff
 */
Auras.prototype._interpretSpell = function( sp, stacks, isBuff, selfBuff ){
	if ( ! sp ) 
	{
		return;
	}
	sp.setLevel( this._character._level );
	
	if( sp._shapehshift && sp._shapehshift._formId != 0 && (sp._shapehshift._formId & (1<<(this._character._chrClass ? ( this._character._chrClass._shapeForm - 1 ) : 0))) == 0 ) { 
		return;
	}
	//
	//	Spell not castable if shape shifted, necessary?
	//
	//	if( (sp._type[0] & (1<<16)) != 0 && this._character._chrClass != null && this._character._chrClass._shapeForm != 0 ) {
	//		return;
	//	}
	if ( ! isBuff && ! sp.isAura() ) {
		return;
	}
	
	this._appliedMap[sp._id] = true;
	
	//
	//	Class checks are done per Effect
	//
	if ( sp._equippedItems != null && sp._equippedItems._classId != -1) 
	{
		if ( sp._equippedItems._classId == this._mainHandItemClass[0] &&  sp._equippedItems._subClassMask & 1<<this._mainHandItemClass[1]) 
		{
			this._addEffects(sp,this._effects[1],stacks,isBuff,selfBuff);
		}
		if ( sp._equippedItems._classId == this._offHandItemClass[0] &&  sp._equippedItems._subClassMask & 1<<this._offHandItemClass[1]) 
		{
			this._addEffects(sp,this._effects[2],stacks,isBuff,selfBuff);
		}
		if ( sp._equippedItems._classId == this._rangedItemClass[0] &&  sp._equippedItems._subClassMask & 1<<this._rangedItemClass[1]) 
		{
			this._addEffects(sp,this._effects[3],stacks,isBuff,selfBuff);
		}	
		// Armor specializations
		
		if( sp._equippedItems._classId == 4 ) {
			var i, s, v = true, itm;
			for( i = 0; i<32 && v; i++ ) {
				if( sp._equippedItems._slotMask & 1<<i ) {
					s = g_inventoryToSlot[i];
					itm = this._character._inventory._items[s][0];
					if( !(itm && itm._class == sp._equippedItems._classId && sp._equippedItems._subClassMask&1<<itm._subClass)  ) {
						v = false;
					}
				}
			}
			if( v ) {
				this._addEffects(sp, this._effects[0],stacks,isBuff, selfBuff);
			}
		}
	}
	else
	{
		this._addEffects(sp,this._effects[0],stacks,isBuff, selfBuff);
	}
};
/**
 * @param {Spell} sp
 * @param {number} effect
 * @param {number} stacks
 * @param {boolean} isBuff
 */
Auras.prototype._addEffects = function( sp, effect, stacks, isBuff, selfBuff )
{
	var j, eff, effs = sp._effects ;
	var seId = 0;
	//  var spco = sp._classOptions;
	var indirect = false;
	//
	//	Interpret all buffs with an "apply aura"-effect (SpellEffect::_aura == 65)
	//	as if they were given by someone else. This means, all other effects,
	//	than auras are ignored
	//
	//	The variable 'indirect' is choosen because it's an indirect definition
	//	of an aura, instead of applying a new spell to any player within range,
	//	effects are applied.
	//
	if( isBuff && !selfBuff ) {
		for( j=0;j<3;j++) {
			if( effs[j] != null && effs[j]._aura == 65 ) {
				indirect = true;
				break;
			}
		}
	}
	
	var value;
	
	for( j=0;j<3;j++)
	{
		eff = effs[j];
		if( eff == null )
		{
			continue;
		}
		value = eff._value;
		//
		seId = eff._id;
		//
		//	Ignore effects of a buff with indirect aura effects
		//
		if( indirect && eff._aura != 65 ) {
			continue;
		}
		//
		//	Ignore non-buff indirect aura effects
		//
		//if( ! isBuff && eff._aura == 65 ) {
		//	continue;
		//}
		//
		//	Check spell class, ignore if indirect aura effect or buff
		//
		//if( spco && spco._classId != this.__spellClassId && ! ( eff._aura == 65 &&  && !selfBuff)) {
		//	continue;
		//}
		//
		//#####################################################################	
		//
		//	Handle not stacking spell effects
		//
		//#####################################################################
		//
		switch(seId) {
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//	+ Mana per 5sec
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		case 68368: // Blessing of Might
			if( this._interpretedSpellEffects[47203] ) continue; break;
		case 47203: // Fel Intelligence
			if( this._interpretedSpellEffects[68368] ) continue; break;
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//	+ 6%, 10% Spell power
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		
		case 46325: // Demonic Pact (53646)
		case 68163: // Totemic Wrath (77747)
			if( ! this._testExclusion([46325,68163])) continue;  
			//
			// if one of the less powerful buffs was added
			// decrease the effect value of the more powerful buff
			// accordingly
			if( ! this._testExclusion([44537,68341,68343,90962,90963])) {
				value -= 6;
			}
			break;
		case 44537: // Flametongue Totem
		case 90962: // Arcane Brilliance (79057)
		case 90963: // Arcane Brilliance (79058)
		case 68341: // Dalaram Brilliance (79038)
		case 68343: // Dalaram Brilliance (79039)
			if( ! this._testExclusion([44537,68341,68343,90962,90963])) continue;
			if( ! this._testExclusion([46325,68163])) continue;  
			break;
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//	+ 10 Melee Haste
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		case 3549:	// Windfury Totem
		case 45922:	// Hunting Party
		case 48552: // Improved Icy Talons
			if( ! this._testExclusion( [3549,45922,48552] )) continue; break;
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//	+ 10 Ranged Haste
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		case 86186:	// Windfury Totem
		case 97691:	// Hunting Party
		case 48553:	// Improved Icy Talons
			if( ! this._testExclusion( [86186,97691,48553] )) continue; break;
		//
		//
		//
		}
		//
		//#####################################################################
		//
		this._interpretedSpellEffects[seId] = true;
		//
		
		this._addEffect(
			effect,
			eff._effect,
			value * stacks /*+ sp.getAbsoluteLevelEffect(this._character.getLevel(),j)*effcts[j]._secondaryEffect*/,
			eff._secondaryEffect,
			eff._usedStat,
			seId
		);
	}
};

Auras.prototype._testExclusion = function( seIds ) {
	for( var i in seIds ) {
		if( this._interpretedSpellEffects[seIds[i]] ) {
			return false;
		}
	}
	return true;
};
/**
 * 
 * @param {number} effect
 * @param {number} effectId
 * @param {number} value
 * @param {number} spellItemId
 * @param {number} usedStat
 */
Auras.prototype._addEffect = function(effect,effectId,value,spellItemId,usedStat,spellEffectId)
{
	var i, shapeForm = this._character._chrClass ? this._character._chrClass._shapeForm : 0;
	
	switch( spellEffectId ) {
	//
	//	Level-based bear armor increase fix
	//
	case 81812:
		value = 65;
		value = 120;
		break;
	//
	//	Thick hide +x% mod resistance in bear form
	//
	case 88002:
	case 88004:
	case 88006:
		if( shapeForm != BEAR && shapeForm != DIRE_BEAR ) return;
		effectId = 142;
		spellItemId = 1;
		break;
	//
	//	Heart of the Wild +x% stamina in bear
	//
	case 8697:
	case 8700:
	case 8694:
		if( shapeForm != BEAR && shapeForm != DIRE_BEAR ) return;
		effectId = 137;
		usedStat = 1<<2;
		break;
	//
	//	Heart of the Wild +x% ap in cat
	case 8699:
	case 8696:
	case 8693:
		if( shapeForm != CAT ) return;
		effectId = 166;
		break;
	//
	}
	
	switch(effectId){
		case 13:
			for(i=0;i<effect[effectId].length;i++) {
				if(spellItemId&(Math.pow(2,i))) {	
					effect[effectId][i]+=value;
				}
			}
			break;
		case 22 :
			for(i=0;i<effect[effectId].length;i++) {
				if(spellItemId&(Math.pow(2,i))) {
					effect[effectId][i]+=value;
				}
			}
			break;
		case 29 :
			if( spellItemId == -1 ) {
				for(i = 0; i < 5 ; i++ ) {
					this._addEffect(effect,effectId,value,i,usedStat,spellEffectId);
				}
			}
			else {
				effect[effectId][spellItemId]+=value;
			}
			break;
		case 30:
			effect[effectId][spellItemId]+=value;
			break;
		case 35:
			effect[effectId][spellItemId]+=value;
			break;
		case 55:
			if(spellItemId==0) {
				spellItemId = 127;
			}
			for(i=0;i<effect[effectId].length;i++) {
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			}
			break;
		case 71:
			for(i=0;i<effect[effectId].length;i++) {
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			}
			break;
		case 79:
			for(i=0;i<effect[effectId].length;i++) {
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			}
			break;
		case 98:
			effect[effectId][spellItemId]+=value;
			break;
		case 99:
			effect[effectId]+=value;
			break;
		case 101:
			for(i=0;i<effect[effectId].length;i++) {
				if(spellItemId&(Math.pow(2,i))) {
					effect[effectId][i]+=value;
				}
			}
			break;
		case 107:
			effect[effectId][spellItemId]+=value;
			break;
		case 108:
			effect[effectId][spellItemId]+=value;
			break;
		case 123:
			for(i=0;i<effect[effectId].length;i++)
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			break;
		case 124:
			effect[effectId]+=value; 
			break;
		case 135:
			for(i=0;i<effect[effectId].length;i++) {
				if(spellItemId&(Math.pow(2,i))) {	
					effect[effectId][i]+=value;
				}
			}
			break;
		//
		// 136 healing power ?
		//
		case 137:
			for (i = 0; i < effect[effectId].length; i++) {
				if (usedStat & 1<<i || usedStat == -1) {
					effect[effectId][i] = (( 1 + effect[effectId][i]/100 ) * ( 1 + value/100 ) - 1) * 100;
				}
			}
			break;
		case 142:
			for (i = 0; i < effect[effectId].length; i++) {
				if (spellItemId & (Math.pow(2, i))) {
					effect[effectId][i] =  (( 1 + effect[effectId][i]/100 ) * ( 1 + value/100) - 1) * 100;
				}
			}
			break;
		case 143 :
			for(i=0;i<effect[effectId].length;i++)  
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i] = Math.max(value,effect[effectId][i]);
			break;
		case 174:
			for(i=0;i<effect[effectId].length;i++)
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i][usedStat]+=value;
			break;
		case 175:
			effect[effectId][spellItemId]+=value;
			break;
		case 189:
			for(i=0;i<effect[effectId].length;i++)
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			break;
		case 199:
			for(i=0;i<effect[effectId].length;i++)
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			break;
		case 212:
			effect[effectId][spellItemId]+=value;
			break;
		case 219:
			effect[effectId][spellItemId]+=value;
			break;
		case 220:
			for( i=0; i<32; i++ ) {
				if( spellItemId&(1<<i)) {
					effect[effectId][i][usedStat] += value;
				}
			}
			break;
		case 237:
			for(i=0;i<effect[effectId].length;i++)
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			break;
		case 238:
			for(i=0;i<effect[effectId].length;i++)
				if(spellItemId&(Math.pow(2,i))) 	effect[effectId][i]+=value;
			break;
		case 240:
			// Glyph of Seal of Truth Expertise Bonus
			if( spellEffectId == 21444 && this.isActive(56416) ) {
				value += 10;
			}
			effect[effectId]+=value;
			break;
		case 268:
			if( spellItemId == -1 ) {
				for(i = 0; i < 5 ; i++ ) {
					this._addEffect(effect,effectId,value,i,usedStat,spellEffectId);
				}
			}
			else {
				effect[effectId][spellItemId]+=value;
			}
			break;
		default:
			effect[effectId]+=value;
			break;
	}
};