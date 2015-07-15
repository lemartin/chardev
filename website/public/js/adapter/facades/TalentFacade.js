/**
 * @constructor
 * @param {Talent} talent
 * @param {Character} character
 */
function TalentFacade( talent, character ) {
	this._talent = talent;
	this._character = character;
}

TalentFacade.prototype= {
		_talent: null,
		_character: null,
		getIcon: function() {
			return this._talent.spell.icon;
		},
		getName: function() {
			return this._talent.spell.name;
		},
		getTooltip: function() {
			return SpellTooltip.getHtml(this._talent.spell, this._character);
		},
		isSelected: function() {
			return this._talent.selected;
			
		}
};