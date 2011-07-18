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
 * @returns {SpellEffect}
 */
function SpellEffect(serialized){
	this._procValue = serialized[0];
	this._aura = serialized[1];
	this._effect = serialized[2];
	this._period = serialized[3];
	this._value = serialized[4];
	this._targets = serialized[5];
	this._coefficient = serialized[6];
	this._dice = serialized[7];
	this._secondaryEffect = ( this._aura == 53 ? new SpellItemEnchantment(serialized[8]) : serialized[8]);
	this._usedStat = serialized[9];
	this._procChance = serialized[10];
	this._levelModifier = serialized[11];
	this._procSpellId = serialized[12];
	this._id = serialized[13];
	this.__baseValue = this._value;
}

SpellEffect.prototype._id = 0;
SpellEffect.prototype._procValue = 0;
SpellEffect.prototype._aura = 0;
SpellEffect.prototype._effect = 0;
SpellEffect.prototype._period = 0;
SpellEffect.prototype._value = 0;
SpellEffect.prototype._targets = 0;
SpellEffect.prototype._coefficient = 0;
SpellEffect.prototype._dice = 0;
SpellEffect.prototype._secondaryEffect = null;
SpellEffect.prototype._usedStat = 0;
SpellEffect.prototype._procChance = 0;
SpellEffect.prototype._levelModifier = 0;
SpellEffect.prototype._procSpellId = 0;

SpellEffect.prototype.__baseValue = 0;

/**
 * @param {number} level
 */
SpellEffect.prototype.setLevel = function( level ) {
	if( this._levelModifier != 0 ) {
		this._value = Math.floor( this.__baseValue + this._levelModifier * ( level - 1 ) );
	}
};
/**
 * @returns {Spell}
 */
SpellEffect.prototype.getProcSpell = function() {
	if( this._procSpellId <= 0 ) {
		return null;
	}
	return g_spells.get( this._procSpellId );
};

SpellEffect.prototype.getStatWeightBasedScore = function( weights ) {
	var s = 0, i;
	
	switch( this._effect ) {
	case 22:
		for( i=0; i<7; i++ ) {
			if( (this._secondaryEffect & (1<<i)) != 0 ) {
				switch( i ) {
					case 0: s += weights[50] * this._value; break;
					case 1: s += weights[53] * this._value; break;
					case 2: s += weights[51] * this._value; break;
					case 3: s += weights[55] * this._value; break;
					case 4: s += weights[52] * this._value; break;
					case 5: s += weights[54] * this._value; break;
					case 6: s += weights[55] * this._value; break;
				}
			}
		}
		break;
	//
	// Stats
	//
	case 29:
		switch( this._secondaryEffect ) {
			case 0: s += weights[4] * this._value; break;
			case 1: s += weights[3] * this._value; break;
			case 2: s += weights[7] * this._value; break;
			case 3: s += weights[5] * this._value; break;
			case 4: s += weights[6] * this._value; break;
			case -1: 
				for( i=3; i <= 7; i ++ ) {
					s += weights[i] * this._value;
				}
			break;
		}
	break;
	// Health
	case 34:
		s += weights[1] * this._value; 
		break;
	// Energy - Mana
	case 35:
		if( this._secondaryEffect == 0 ) {
			s += weights[2] * this._value;
		}
		break;
	// Mana per 5 seconds
	case 85:
		s += weights[43] * this._value;
		break;
	// Attack Power
	case 99:
		s += weights[38] * this._value;
		break;
	// Ranged Attack Power
	case 124:
		s += weights[39] * this._value;
		break;
	//
	// Ratings
	//
	case 189:
		for( i=0; i<32; i++ ) {
			if( (this._secondaryEffect & (1<<i)) != 0 ) {
				if( i <= 19 ) {
					s += weights[i+11] * this._value;
				}
				// expertise rating
				else if( i == 23 ) {
					s += weights[37] * this._value;
				}
				// mastery rating
				else if( i == 25 ) {
					s += weights[49] * this._value;
				}
			}
		}
		break;
	}
	
	return s;
};