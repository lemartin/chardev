/**
 * Creates a new effect of an {@link Spell}
 * 
 * <p>
 * In order to handle circular references of spells, all spell 
 * references within a spell object are resolved by using the 
 * {@link SpellContainer}. The referenced spells are unwound 
 * by the PHP back-end (see: common.php) and transfered as a list
 * (see: {@link Spell}, serialized[17]). In order to access the
 * proc-spell use the convenience method <code>getProcSpell</code>.
 * </p>
 * 
 * @constructor
 * @param {Array} serialized
 */
function SpellEffect(serialized){
	this.procValue = serialized[0];
	this.aura = serialized[1];
	this.effect = serialized[2];
	this.period = serialized[3];
	this.value = serialized[4];
	this.targets = serialized[5];
	this.coefficient = serialized[6];
	this.dice = serialized[7];
	this.secondaryEffect = ( this.aura == 53 ? new SpellItemEnchantment(serialized[8]) : serialized[8]);
	this.usedStat = serialized[9];
	this.procChance = serialized[10];
	this.levelModifier = serialized[11];
	this.procSpellId = serialized[12];
	this.id = serialized[13];
	this.baseValue = this.value;
}
SpellEffect.prototype = {
	id : 0,
	procValue : 0,
	aura : 0,
	effect : 0,
	period : 0,
	value : 0,
	targets : 0,
	coefficient : 0,
	dice : 0,
	secondaryEffect : null,
	usedStat : 0,
	procChance : 0,
	levelModifier : 0,
	procSpellId : 0,

	baseValue : 0,

	/**
	 * @param {number} level
	 */
	setLevel : function( level ) {
		if( this.levelModifier != 0 ) {
			this.value = Math.floor( this.baseValue + this.levelModifier * ( level - 1 ) );
		}
	},
	/**
	 * @returns {Spell}
	 */
	getProcSpell : function() {
		if( this.procSpellId <= 0 ) {
			return null;
		}
		return SpellCache.get( this.procSpellId );
	},

	getStatWeightBasedScore : function( weights ) {
		var s = 0, i;
		
		switch( this.effect ) {
		case 22:
			for( i=0; i<7; i++ ) {
				if( (this.secondaryEffect & (1<<i)) != 0 ) {
					switch( i ) {
						case 0: s += weights[50] * this.value; break;
						case 1: s += weights[53] * this.value; break;
						case 2: s += weights[51] * this.value; break;
						case 3: s += weights[55] * this.value; break;
						case 4: s += weights[52] * this.value; break;
						case 5: s += weights[54] * this.value; break;
						case 6: s += weights[55] * this.value; break;
					}
				}
			}
			break;
		//
		// Stats
		//
		case 29:
			switch( this.secondaryEffect ) {
				case 0: s += weights[4] * this.value; break;
				case 1: s += weights[3] * this.value; break;
				case 2: s += weights[7] * this.value; break;
				case 3: s += weights[5] * this.value; break;
				case 4: s += weights[6] * this.value; break;
				case -1: 
					for( i=3; i <= 7; i ++ ) {
						s += weights[i] * this.value;
					}
				break;
			}
		break;
		// Health
		case 34:
			s += weights[1] * this.value; 
			break;
		// Energy - Mana
		case 35:
			if( this.secondaryEffect == 0 ) {
				s += weights[2] * this.value;
			}
			break;
		// Mana per 5 seconds
		case 85:
			s += weights[43] * this.value;
			break;
		// Attack Power
		case 99:
			s += weights[38] * this.value;
			break;
		// Ranged Attack Power
		case 124:
			s += weights[39] * this.value;
			break;
		//
		// Ratings
		//
		case 189:
			for( i=0; i<32; i++ ) {
				if( (this.secondaryEffect & (1<<i)) != 0 ) {
					if( i <= 19 ) {
						s += weights[i+11] * this.value;
					}
					// expertise rating
					else if( i == 23 ) {
						s += weights[37] * this.value;
					}
					// mastery rating
					else if( i == 25 ) {
						s += weights[49] * this.value;
					}
				}
			}
			break;
		}
		
		return s;
	}
};