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
			if( ! s ) {
				continue;
			}
			SpellCache.set(new Spell(s));
		}
	}
	//
	this.level = Character.MAX_LEVEL;
	this.serialized = serialized;
	this.id = serialized[0];
	this.name = serialized[1];
	this.desc = serialized[2];
	this.icon = serialized[3];
	this.duration = serialized[4];
	this.ranges = serialized[5]; //0: MinEnemy, 1: MaxEnemy, 2: MinFriend, 3: MaxFriend
	if( serialized[6] ) {
		this.power = new SpellPower(serialized[6]); //0: Absolute, 1: Percent
	}
	else {
		this.power = null;
	}
	this.type = serialized[7];
	this.castTime = serialized[8];
	this.cooldowns = serialized[9]; //0: Spell, 1: Category, 2: Global
	if( this.cooldowns == null ) {
		this.shownCooldown = 0;
	}
	else {
		this.shownCooldown = Math.max(this.cooldowns[0],this.cooldowns[1])/1000;
	}
	this.effects = [];
	for( i = 0; i < serialized[10].length; i++ ) {
		this.effects[i] = serialized[10][i] ? new SpellEffect(serialized[10][i]) : null;
	}
	this.scaling = serialized[11] ? new SpellScaling(serialized[11]) : null;
	this.bustedDesc = serialized[12] ? serialized[12] : "";
	this.scalableDescription = serialized[13];
	this.shapehshift = serialized[14] ? new SpellShapeshift(serialized[14]) : null;
	this.equippedItems = serialized[15] ? new SpellEquippedItems(serialized[15]) : null;
	
	this.type = [];
	for( i=0; i<serialized[16].length; i++ ) {
		this.type[i] = serialized[16][i];
	}
	
	this.auraOptions = serialized[18] ? new SpellAuraOptions(serialized[18]) : null;
	this.classOptions = serialized[19] ? new SpellClassOptions(serialized[19]) : null; 
	this.elixirMask = serialized[20];
	this.spellLevels = serialized[21] ? new SpellLevels(serialized[21]) : null;
	
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
		power : null,
		type : null,
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
		/** @type {SpellLevels} */
		spellLevels: null,
		//
		//	TODO
		//
		runecost : 0,
		getDescription : function( character ){
			
			var desc = this.bustedDesc ? DescriptionInterpreter.interpret(this.bustedDesc, character) : this.desc;
            
            if( desc === null ) {
                return "";
            }
			
			var opening = 0, closing = 0;
			var repl = desc;
			
			repl = repl.replace(/\|c([0-9a-z]{8})/gi, function(str, p1) {
				opening ++;
				return "<span style=\"color:#" + p1.substr(2,6) + "\">";
			});
			
			repl = repl.replace(/\|r/gi, function(str, p1) {
				closing ++;
				return "</span>";
			});
			
			for( ; closing < opening; closing ++ ) {
				repl += "</span>";
			}
			
			return repl.split(/\r\n/);
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
						eValue = g_calculateScaling( 
								cTime != null ? cTime[1] : 1, 
								this.scaling.distribution, 
								this.effects[i].spellScalingCoefficient, 
								0, //TODO: Where did the dices go? 
								this.level 
						);
						
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
		},
		getLevelBasedValue: function(level,i)
		{
			if( !this.spellLevels ) {
				return 0;
			}
			if( level < this.spellLevels.baseLevel ) { 
				return 0;
			}
			else {
				var l = 0;
				if( this.spellLevels.maximumLevel > 0 && level > this.spellLevels.maximumLevel ) {
					l = this.spellLevels.maximumLevel - this.spellLevels.baseLevel;
				}
				else {
					l = level - this.spellLevels.baseLevel;
				}
				return l * this.effects[i].levelModifier;
			}
		}
};