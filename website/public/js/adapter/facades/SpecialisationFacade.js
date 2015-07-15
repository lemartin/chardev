/**
 * @constructor
 * @param {CharacterSpecialisation} characterSpecialisation
 * @param {Character} character
 */
function SpecialisationFacade( characterSpecialisation, character ) {
	this.icon = characterSpecialisation.icon; 
	this.name = characterSpecialisation.name;
	this.description = characterSpecialisation.description.replace(/\$G(\w+)\:(\w+);/,"$1/$2");
	this.spell = new SpellFacade(characterSpecialisation.spell, character);
}

SpecialisationFacade.prototype = {
		icon: "",
		name: "",
		description: ""
};