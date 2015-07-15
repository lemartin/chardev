/**
 * @constructor
 * @param {Array} serialized
 */
function CharacterSpecialisation( serialized ) {
	this.id = serialized[0];
	this.bg = serialized[1];
	this.spell = serialized[2] ? new Spell(serialized[2]) : null;
	this.name = serialized[3];
	this.description = serialized[4];
	this.icon = serialized[5];
	this.spells = [];
	for( var i=0; i<serialized[6].length; i++  ) {
		this.spells.push(new Spell(serialized[6][i]));
	}
}

CharacterSpecialisation.prototype = {
		id: 0,
		bg: "",
		spell: null,
		name: "",
		description: "",
		icon: "",
		spells: null,
		/**
		 * @param {Auras} auras
		 */
		getActiveSpells: function( auras ) {
			auras.add(this.spell);
			for( var k in this.spells ) {
				auras.add(this.spells[k]);
			}
		}
};