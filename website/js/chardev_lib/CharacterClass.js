/**
 * @constructor
 * @param {Object} serialized
 * @returns {CharacterClass}
 */
function CharacterClass( serialized ) {
	var i,j=0;
	this._serialized = serialized;
	this._stats = new Array();
	this._level = -1; 
	this._shapes = null;
	this._glyphs = [[null,null,null],[null,null,null],[null,null,null]];
	this._id = serialized[0];
	this._name = serialized[1];
	this._talents = new Talents(serialized[0],serialized[2],false);
	this._baseStats = serialized[3]; // str, agi, ... , hp, mp, melee crit per agi
	this._shapesRef = {};
	
	this._classSpells = [];
	for( i=0;i<serialized[4].length;i++){
		this._classSpells[i] = new SkillLineAbility(serialized[4][i]);
	}
	this._availableGlyphs = [[],[],[]];
	for( j=0;j<serialized[5].length;j++) {
		for( i=0;i<serialized[5][j].length;i++){
			this._availableGlyphs[j][i] = new Glyph(serialized[5][j][i]);
		}
	}
	if( serialized[6] ) {
		this._shapes = [];
		for( i=0;i<serialized[6].length; i++ ) {
			this._shapes[i] = new Shapeform(serialized[6][i]);
			this._shapesRef[this._shapes[i]._id] = this._shapes[i];
		}
	}
	if( serialized[7] ) {
		this._presences = [];
		for( i=0;i<serialized[7].length; i++ ) {
			var s = new Spell(serialized[7][i]);
			this._presences.push(s); 
			g_spells.set(s);
		}
	}
	
	if( serialized[9] ) {
		this._presences = [];
		for( i=0;i<serialized[9].length; i++ ) {
			g_spells.set(new Spell(serialized[9][i]));
		}
	}
	
	this._conditionalBuffs = serialized[8];

	this._oneStatWeights = [];
	this._zeroStatWeights = [];
	for( i=0; i<ITEM_STATS_COUNT; i++ ) {
		this._oneStatWeights[i] = 1.0;
		this._zeroStatWeights[i] = 0.0;
	}
}
CharacterClass.prototype._serialized = null;
CharacterClass.prototype._stats = [];
CharacterClass.prototype._talents = null;
CharacterClass.prototype._id = -1;
CharacterClass.prototype._name = "";
CharacterClass.prototype._level = -1; 
CharacterClass.prototype._shapes = null;
CharacterClass.prototype._shapeForm = 0;
CharacterClass.prototype._glyphs = null;
CharacterClass.prototype._availableGlyphs = null;
CharacterClass.prototype._availableGlyphSlots = 0;
CharacterClass.prototype._shapesRef = null;
CharacterClass.prototype._presences = null;
CharacterClass.prototype._conditionalBuffs = null;
/** @type {Shapeform} */
CharacterClass.prototype._shape = null;
CharacterClass.prototype._presence = null;

CharacterClass.prototype._oneStatWeights = [];
CharacterClass.prototype._zeroStatWeights = [];
/**
 * @param {number} level
 */
CharacterClass.prototype.setLevel = function(level){
	this._level = level;
	this._talents.setLevel(level);
	this._availableGlyphSlots = level < 25 ? 0 : (level < 50 ? 1 : (level < 75 ? 2 : 3));
	
	for( var i=this._availableGlyphSlots; i<3; i++ ) {
		this._glyphs[0][i] = null;
		this._glyphs[1][i] = null;
		this._glyphs[2][i] = null;
	}
};

CharacterClass.prototype.getStatWeights = function() {
	var st = this._talents._selectedTree;
	var weights;
	
	switch( this._id ) {
	case PALADIN:
		switch( st ) {
		case 2:
			weights = this._zeroStatWeights.slice(0);
			weights[3] = 0.81;
			weights[4] = 2.27;
			weights[31] = 1.72;
			weights[32] = 0.95;
			weights[36] = 0.81;
			weights[37] = 1.25;
			weights[38] = 1.03;
			weights[49] = 1.01;
			return weights;
		}
		break;
	}
	return this._oneStatWeights.slice(0);
};

CharacterClass.prototype.setPresence = function( presenceId ) {
	if( presenceId == 0 ) {
		this._presence = null;
	}
	else {
		for( var i=0; i<this._presences.length; i++ ) {
			if( this._presences[i]._id == presenceId ) {
				this._presence = new Buff( this._presences[i], 1 );
				return;
			}
		}
		throw 'CharacterClass::setPresence: Unable to set presence '+presenceId;
	}
};
/**
 * @param {number} shapeForm
 */
CharacterClass.prototype.setShapeForm = function( shapeForm ) {
	this._shapeForm = shapeForm;
	if( this._shapeForm != 0 ) {
		this._shape = this._shapesRef[this._shapeForm];
	}
	else {
		this._shape = null;
	}
	return this._shape;
};

/**
 * @param {number} type
 * @param {Glyph} glyph
 */
CharacterClass.prototype.addGlyph = function( type, glyph ) {
	var i, n = -1;
	if( this._availableGlyphSlots == 0  ) {
		Tooltip.showError("You can't use glyphs until reaching level 25.");
	}
	if( glyph != null ) {
		for( i=0; i<this._availableGlyphSlots; i++ ) {
			if( this._glyphs[type][i] == null ) {
				n = n == -1 ? i : n;
				continue;
			}
			if( this._glyphs[type][i]._id == glyph._id ) {
				Tooltip.showError("The glyph \""+glyph._spell.getName()+"\" is already active!");
				return;
			}
		}
	}
	if( n==-1 ) {
		Tooltip.showError("All your "+locale['GlyphTypes'][type]+" slots are used, remove a glyph by right clicking it!");
	}
	else {
		this._glyphs[type][n] = glyph;
	}
};

/**
 * @param {number} type
 * @param {number} index
 */
CharacterClass.prototype.removeGlyph = function( type, index ) {
	this._glyphs[type][index] = null;
};

/**
 * @param {Auras} auras
 */
CharacterClass.prototype.getActiveSpells = function(auras)
{
	var cr, i, j;
	
	if( this._shapeForm != 0 ) {
		var shape = this._shapesRef[this._shapeForm];
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//
		// Recent Changes:
		//
		// 02 / 21 / 2011
		//
		// auras.addBuff( shape._buff, 1 );
		//
		// --	Obsolete, the Shape Buff is added like a Buff and therefore handled 
		// --	by the Buffs.getActiveSpells Method.
		//
		// 02 / 25 / 2011
		//
		for( i=0; i<shape._buffs.length; i++ ) {
			auras.addBuff( shape._buffs[i] );
		}
		//
		// Not anymore, any buff added internally by chardev is not handled as
		// buff. This shall prevent any spell from being added twice, or not
		// at all, if the buff is not added, but the spell is actually active,
		// e.g. talents with aura-effects.
		//
		// 04 / 28 / 2011
		//
		// Now, only these internally added buffs marked as "dummy" are not 
		// taken into account when calculating. As shape buffs are handled as
		// active spells (See Character and Shapeform), the buffs are mere
		// dummies
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//
		//	Add passive Auras
		//
		for( i=0;i<shape._auras.length;i++) {
			auras.add(shape._auras[i]);
		}
	}
	
	if( this._presence ) {
		auras.addBuff( this._presence );
	}

	this._talents.getActiveSpells(auras);
	
	for( i=0;i<this._glyphs.length;i++) {
		for( j=0;j<this._glyphs[i].length;j++) {
			if( this._glyphs[i][j] ){
				auras.add( this._glyphs[i][j]._spell );
			}
		}
	}
	
	for( i=0;i<this._classSpells.length;i++){
		cr = this._classSpells[i];
		if( cr._spell == null ) {
			continue;
		}
		if( cr._spell._type[8] & 1<<20 ) {
			switch( this._id ) {
			case 1:
				if( cr._spell._id == 86101 && this._talents._selectedTree != 0 ||
					cr._spell._id == 86110 && this._talents._selectedTree != 1 ||
					cr._spell._id == 86535 && this._talents._selectedTree != 2
				){
					continue;
				}
				break;
			case 2:
				if( cr._spell._id == 86103 && this._talents._selectedTree != 0 ||
					cr._spell._id == 86102 && this._talents._selectedTree != 1 ||
					cr._spell._id == 86539 && this._talents._selectedTree != 2 
				){
					continue;
				}
				break;
			case 6:
				if( cr._spell._id == 86537 && this._talents._selectedTree != 0 ||
					cr._spell._id == 86536 && this._talents._selectedTree != 1 ||
					cr._spell._id == 86113 && this._talents._selectedTree != 2
				){
					continue;
				}
				break;
			case 7:
				if( cr._spell._id == 86100 && this._talents._selectedTree != 0 ||
					cr._spell._id == 86099 && this._talents._selectedTree != 1 ||
					cr._spell._id == 86108 && this._talents._selectedTree != 2
				){
					continue;
				}
				break;
			case 11:
				if( cr._spell._id == 86093 && this._talents._selectedTree != 0 ||
					cr._spell._id == 86096 && ( this._talents._selectedTree != 1 || (1<<this._shapeForm&(1<<BEAR|1<<DIRE_BEAR)) == 0 ) ||
					cr._spell._id == 86097 && ( this._talents._selectedTree != 1 || (1<<this._shapeForm&1<<CAT) == 0 ) ||
					cr._spell._id == 86104 && this._talents._selectedTree != 2
				){
					continue;
				}
				break;
				
			}
		}
		if( (1<<(this._id-1)) & cr._classMask ||  cr._classMask <= 0 ) {
			auras.add(cr._spell);
		}
	}
};