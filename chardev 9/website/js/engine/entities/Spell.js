/**
 * @constructor
 * @param {Array} serialized
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
			if( ! s || SpellCache.contains(s[0]) ) {
				continue;
			}
			SpellCache.set( new Spell(s) );
		}
	}
	//
	this.level = 85;
	this.serialized = serialized;
	this.id = serialized[0];
	this.name = serialized[1];
	this.desc = serialized[2];
	this.icon = serialized[3];
	this.duration = serialized[4];
	this.ranges = serialized[5]; //0: MinEnemy, 1: MaxEnemy, 2: MinFriend, 3: MaxFriend
	this.cost = serialized[6]; //0: Absolute, 1: Percent
	this.energyType = serialized[7];
	this.castTime = serialized[8];
	this.cooldowns = serialized[9]; //0: Spell, 1: Category, 2: Global
	if( this.cooldowns == null ) {
		this.shownCooldown = 0;
	}
	else {
		this.shownCooldown = Math.max(this.cooldowns[0],this.cooldowns[1])/1000;
	}
	this.effects = new Array(3);
	for( i = 0; i < 3; i++ ) {
		this.effects[i] = serialized[10][i] ? new SpellEffect(serialized[10][i]) : null;
	}
	this.scaling = serialized[11] ? new SpellScaling(serialized[11]) : null;
	this.bustedDesc = serialized[12] ? serialized[12] : "";
	this.scalableDescription = serialized[13];
	this.shapehshift = serialized[14] ? new SpellShapeshift(serialized[14]) : null;
	this.equippedItems = serialized[15] ? new SpellEquippedItems(serialized[15]) : null;
	
	this.type = [];
	for( i=0; i<serialized[16].length; i++ ) {
		this.type[i] = Tools.toUnsigned(serialized[16][i]);
	}
	
	this.auraOptions = serialized[18] ? new SpellAuraOptions(serialized[18]) : null;
	this.classOptions = serialized[19] ? new SpellClassOptions(serialized[19]) : null; 
	this.elixirMask = serialized[20];
	
	this.setLevel(this.level);
}

Spell.prototype = {
		level : 0,
		serialized : null,
		id : null,
		name : null,
		desc : null,
		icon : null,
		duration : null,
		ranges : null,
		cost : null,
		energyType : null,
		castTime : null,
		cooldowns : null,
		shownCooldown : 0,
		effects : null,
		scaling : null,
		bustedDesc : null,
		scalableDescription : false,
		/** @type {SpellShapeshift} */
		shapehshift : null,
		/** @type {SpellEquippedItems} */
		equippedItems : null,
		/** @type {SpellAuraOptions} */
		auraOptions : null,
		/** @type {SpellClassOptions} */
		classOptions : null,
		type : null,
		elixirMask : 0,
		//
		//	TODO
		//
		runecost : 0,
		getDescription : function( characterScope ){
			var desc = this.bustedDesc;
			var match;
			var cTime, eValue;
			var mod;
			
			// replace scaling effect variables $m and $M
			while( ( match = desc.match(/\$(s|m|M)\(-?(\d+),(-?\d+),(-?\d+),(-?\d+),(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)\)/i)) != null ) {
				mod = parseFloat(match[8]);
				cTime = g_calculateCastTime( parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10), this.level );
				eValue = g_calculateScaling( cTime?cTime[1]:1, parseInt(match[5], 10), parseFloat(match[6]), parseFloat(match[7]), this.level );
				desc = desc.replace(match[0],Math.floor(mod*(Math.abs(eValue[0])+(match[1]=='M'?Math.abs(eValue[1]):0))));
			}	
			// replace duration
			while( ( match = desc.match(/\$d\((\d+),(\d+),(\d+),(\d+(?:\.\d+)?)\)/i)) != null ) {
				mod = parseFloat(match[4]);
				cTime = g_calculateCastTime( parseInt(match[2], 10), parseInt(match[3], 10), parseInt(match[4], 10), this.level );
				desc = desc.replace(match[0],cTime[0]);
			}
			// replace time inside equations with value, outside with formated string
			while( ( match = desc.match(/(\${[^}]*)\$time\((-?\d+(?:\.\d+)?)\)([^}]*})/i)) ) {
				desc = desc.replace(match[0],match[1]+match[2]+match[3]);
			}
			while( ( match = desc.match(/\$time\((-?\d+(?:\.\d+)?)\)/i)) ) {
				desc = desc.replace(match[0],TextIO.timeToString(match[1]));
			}
			return TextIO.parse(desc.replace(/\$pl/ig,this.level), characterScope);
		},
		setLevel : function(level) {
			var cTime, eValue, i;
			this.level = level;
			if( this.scaling != null ) {
				cTime = g_calculateCastTime( this.scaling.castTimeStart, this.scaling.castTimeEnd, this.scaling.intervals, this.level );
				if( cTime != null ) {
					this.castTime = cTime[0];
				}
				
				for( i = 0; i < this.effects.length; i++ ) {
					if( this.effects[i] != null )
					{
						eValue = g_calculateScaling( cTime != null ? cTime[1] : 1, this.scaling.distribution, this.scaling.coefficients[i], this.scaling.dices[i], this.level );
						if( eValue != null ) {
							this.effects[i].value = eValue[0];
							this.effects[i].dice = eValue[1];
						}
					}
				}
			}
			else {
				for( i = 0; i < this.effects.length; i++ ) {
					if( this.effects[i] != null ) {
						this.effects[i].setLevel(level);
					}
				}
			}
		},
		isAura : function() {
			return ( this.type[0] & 64 ) != 0 && this.duration <= 0;
		},
		isBuff : function() {
			return ! this.isAura();
		},
		/** @returns {Spell} */
		clone : function(){ return new Spell(this.serialized);},
		/** @returns {string} */
		toString : function(){ return "Spell ["+this.id+"]: "+this.getDescription(null);},
		/** @returns {number} */
		serialize : function(){return this.id;},
		getStatWeightBasedScore : function( weights ) {
			var s = 0;
			
			if( ! this.isAura() ) {
				return 0;
			}
			
			for( var i=0; i<3; i++ ) {
				if( this.effects[i] ) {
					s += this.effects[i].getStatWeightBasedScore( weights );
				}
			}
			return s;
		},
		getTriggeredSpell : function() {
			for( var i=0; i<3; i++ ) {
				if ( this.effects[i] && this.effects[i].effect == 23 ) {
					return SpellCache.get(this.effects[i].procSpellId);
				}
			}
		}
};