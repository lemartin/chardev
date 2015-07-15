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
 * TODO remove ranged
 *
 * @constructor
 * @param {Character} character
 */
function Auras( character ) {
	this.character = character;
	this.effects = [this.__createArray(),this.__createArray(),this.__createArray(),this.__createArray()];
	this.mainHandItemClass = [-1,-1];
	this.offHandItemClass = [-1,-1];
	this.rangedItemClass = [-1,-1];
	this.interpretedSpellEffects = null;
	this.auraMap = null;
	this.buffMap = null;
}

Auras.prototype = {
	character :  null,
	auras :  [],
	buffs :  [],
	effects :  [],
	mainHandItemClass :  [-1,-1],
	offHandItemClass :  [-1,-1],
	rangedItemClass :  [-1,-1],
	interpretedSpellEffects :  {},
	auraMap :  {},
	buffMap :  {},
	appliedMap :  {},
	__spellClassId :  0,
	
	/**
	 * @returns {Array}
	 */
	__createArray : function()
	{
		var arr = new Array(429);
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
		arr[189] = new Array(47);
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
	},
	
	/**
	 * @param {Array} arr
	 */
	__clear : function(arr)
	{
		if( arr ) {
			for( var i=0; i<arr.length; i++ ) {
				if( typeof arr[i] === 'object' ) {
					this.__clear(arr[i]);
				}
				else {
					arr[i] = 0;
				}
			}
		}
	},
	
	/**
	 * @param {Spell} aura
	 */
	add : function( aura ){
		if( !aura || this.auraMap[ aura.id ] ) {
			return;
		}
		this.auras.push( aura );
		this.auraMap[ aura.id ] = true;
	},
	
	/**
	 * @param {Buff} buff
	 */
	addBuff : function( buff ) {
		if( !buff || this.buffMap[ buff.spell.id ] ) {
			return;
		} 
		this.buffs.push(buff);
		this.buffMap[ buff.spell.id ] = true;
	},
	
	/**
	 * @param {number} spellId
	 * @returns {boolean}
	 */
	isActive : function( spellId ) {
		return this.auraMap[ spellId ] || this.buffMap[ spellId ] ? true : false;
	},
	
	/**
	 * @param {boolean} noBuffs
	 * @returns {Array}
	 */
	getEffects : function( noBuffs )
	{
		var activeSets = [];
		var foundSets = {};
		var tmp, i;
		/** @type {Buff} */
		var b = null;
		
	
		this.__spellClassId = g_classToSpellChrClass[ this.character.chrClass ? this.character.chrClass.id : 0 ];
		
		this.auras = [];
		this.buffs = [];
		this.__clear(this.effects);
		
		this.auraMap = new Object();
		this.buffMap = new Object();
		this.appliedMap = new Object();
		
		this.mainHandItemClass = [-1,-1];
		this.offHandItemClass = [-1,-1];
		this.rangedItemClass = [-1,-1];
		
		this.character.getActiveSpells();
		
		for ( i=0; i < Inventory.SLOTS; i++) 
		{
			if ( (tmp = this.character.getEquippedItem(i, 0)) ) 
			{
				tmp.getActiveSpells( );
				
				if (i == 16 ) {
					this.mainHandItemClass = [ tmp.itemClass, tmp.itemSubClass];
				}
				if (i == 17 ) {
					this.offHandItemClass = [ tmp.itemClass, tmp.itemSubClass];
				}
				if (i == 18 ) {
					this.rangedItemClass = [ tmp.itemClass, tmp.itemSubClass];
				}
				//	find the active sets, and make sure they are only added once
				if( tmp.itemSet != null )
				{
					if( foundSets[tmp.itemSet.id] !== true )
					{
						foundSets[tmp.itemSet.id] = true;
						activeSets[activeSets.length] = tmp.itemSet;
					}
				}
			}
		}
		
		for( i=0; i<activeSets.length; i++ ) {
			activeSets[i].getActiveSpells(this.character);
		}
	
		this.interpretedSpellEffects = new Object();
		
		for ( i=0; i < this.auras.length; i++)  {
			this.__interpretSpell( this.auras[i], 1, false, false );
		}
		for ( i=0; i < this.buffs.length; i++)  {
			b = this.buffs[i];
			if( b.isDummy || this.appliedMap[b.spell.id] ) {
				continue;
			}
			this.__interpretSpell( b.spell, b.stacks, true, b.isSelfBuff );
		}
	
		return this.effects;
	},
	/**
	 * 
	 * @param {Spell} sp
	 * @param {number} stacks
	 * @param {boolean} isBuff
	 */
	__interpretSpell : function( sp, stacks, isBuff, selfBuff ){
		if ( ! sp ) 
		{
			return;
		}
		sp.setLevel( this.character.level );
		
		// Power Word: Fortitude Fix
		// PWF requires Shadowform for some reason
		if( sp.id == 79104 ) {
			/* ignore shapeshift */
		} else {
			if( sp.shapehshift && sp.shapehshift.formId != 0 && (sp.shapehshift.formId & (1<<(this.character.chrClass ? ( this.character.chrClass.shapeform - 1 ) : 0))) == 0 ) { 
				return;
			}
		}
		//
		//	Spell not castable if shape shifted, necessary?
		//
		//	if( (sp.type[0] & (1<<16)) != 0 && this.character.chrClass != null && this.character.chrClass.shapeform != 0 ) {
		//		return;
		//	}
		if ( ! isBuff && ! sp.isAura() ) {
			return;
		}
		
		this.appliedMap[sp.id] = true;
		
        //
        // Check the spell level and skip it, if character level is too low
        //
        if( sp.spellLevels !== null && sp.spellLevels.spellLevel > this.character.level ) {
            return;
        }
        
		//
		//	Class checks are done per Effect
		//
		if ( sp.equippedItems != null && sp.equippedItems.classId != -1) 
		{
			if ( sp.equippedItems.classId == this.mainHandItemClass[0] &&  sp.equippedItems.subClassMask & 1<<this.mainHandItemClass[1]) 
			{
				this.__addEffects(sp,this.effects[1],stacks,isBuff,selfBuff);
			}
			if ( sp.equippedItems.classId == this.offHandItemClass[0] &&  sp.equippedItems.subClassMask & 1<<this.offHandItemClass[1]) 
			{
				this.__addEffects(sp,this.effects[2],stacks,isBuff,selfBuff);
			}
			if ( sp.equippedItems.classId == this.rangedItemClass[0] &&  sp.equippedItems.subClassMask & 1<<this.rangedItemClass[1]) 
			{
				this.__addEffects(sp,this.effects[3],stacks,isBuff,selfBuff);
			}	
			// Armor specializations
			
			if( sp.equippedItems.classId == 4 ) {
				var i, s, v = true, itm;
				for( i = 0; i<32 && v; i++ ) {
					if( sp.equippedItems.slotMask & 1<<i ) {
						s = g_inventoryToSlot[i];
						itm = this.character.getEquippedItem(s, 0);
						if( !(itm && itm.itemClass == sp.equippedItems.classId && sp.equippedItems.subClassMask&1<<itm.itemSubClass)  ) {
							v = false;
						}
					}
				}
				if( v ) {
					this.__addEffects(sp, this.effects[0],stacks,isBuff, selfBuff);
				}
			}
		}
		else
		{
			this.__addEffects(sp,this.effects[0],stacks,isBuff, selfBuff);
		}
	},
	/**
	 * @param {Spell} sp
	 * @param {number} effect
	 * @param {number} stacks
	 * @param {boolean} isBuff
	 */
	__addEffects : function( sp, effect, stacks, isBuff, selfBuff )
	{
		var j = 0, eff, effs = sp.effects ;
		var seId = 0, value;
		//  var spco = sp.classOptions;
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
            for( j in effs ) {
				if( effs[j] != null && effs[j].aura == 65 ) {
					indirect = true;
					break;
				}
			}
		}
		
		for( j in effs )
		{
			eff = effs[j];
			if( eff == null )
			{
				continue;
			}
			//
			seId = eff.id;
			value = eff.value + sp.getLevelBasedValue(this.character.level, j);
			//
			//	Ignore effects of a buff with indirect aura effects
			//
			if( indirect && eff.aura != 65 ) {
				continue;
			}
			//
			//	Ignore non-buff indirect aura effects
			//
			//if( ! isBuff && eff.aura == 65 ) {
			//	continue;
			//}
			//
			//	Check spell class, ignore if indirect aura effect or buff
			//
			//if( spco && spco.classId != this.__spellClassId && ! ( eff.aura == 65 &&  && !selfBuff)) {
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
				if( this.interpretedSpellEffects[47203] ) continue; break;
			case 47203: // Fel Intelligence
				if( this.interpretedSpellEffects[68368] ) continue; break;
			//
			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			//
			//	+ 6% Spell power
			//
			//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			//
			case 46325: // Demonic Pact (53646)
			case 68163: // Totemic Wrath (77747)
				if( ! this.__testExclusion([46325,68163])) continue;  
				//
				// if one of the less powerful buffs was added
				// decrease the effect value of the more powerful buff
				// accordingly
				if( ! this.__testExclusion([44537,68341,68343,90962,90963])) {
					value -= 6;
				}
				break;
			case 44537: // Flametongue Totem
			case 90962: // Arcane Brilliance (79057)
			case 90963: // Arcane Brilliance (79058)
			case 68341: // Dalaram Brilliance (79038)
			case 68343: // Dalaram Brilliance (79039)
				if( ! this.__testExclusion([44537,68341,68343,90962,90963])) continue;
				if( ! this.__testExclusion([46325,68163])) continue;  
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
				if( ! this.__testExclusion( [3549,45922,48552] )) continue; break;
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
				if( ! this.__testExclusion( [86186,97691,48553] )) continue; break;
			//
			//
			//
			}
			//
			//#####################################################################
			//
			this.interpretedSpellEffects[seId] = true;
			//
			this.__addEffect(
				effect,
				eff.effect,
				value * stacks /*+ sp.getAbsoluteLevelEffect(this.character.getLevel(),j)*effcts[j].secondaryEffect*/,
				eff.secondaryEffect,
				eff.usedStat,
				seId
			);
		}
	},
	
	__testExclusion : function( seIds ) {
		for( var i in seIds ) {
			if( this.interpretedSpellEffects[seIds[i]] ) {
				return false;
			}
		}
		return true;
	},
	/**
	 * 
	 * @param {number} effect
	 * @param {number} effectId
	 * @param {number} value
	 * @param {number} spellItemId
	 * @param {number} usedStat
	 */
	__addEffect : function(effect,effectId,value,spellItemId,usedStat,spellEffectId)
	{
		var i, shapeform = this.character.chrClass ? this.character.chrClass.shapeform : 0;
		
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
			if( shapeform != BEAR && shapeform != DIRE_BEAR ) return;
			effectId = 142;
			spellItemId = 1;
			break;
		//
		//	Heart of the Wild +x% stamina in bear
		//
		case 8697:
		case 8700:
		case 8694:
			if( shapeform != BEAR && shapeform != DIRE_BEAR ) return;
			effectId = 137;
			usedStat = 1<<2;
			break;
		//
		//	Heart of the Wild +x% ap in cat
		case 8699:
		case 8696:
		case 8693:
			if( shapeform != CAT ) return;
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
						this.__addEffect(effect,effectId,value,i,usedStat,spellEffectId);
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
						this.__addEffect(effect,effectId,value,i,usedStat,spellEffectId);
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
	}
};