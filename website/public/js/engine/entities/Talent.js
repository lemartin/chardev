/**
 * @constructor
 * @param {Array} serialized
 */
function Talent( serialized ){
	this.id = serialized[0];
	this.spell = serialized[1] ? new Spell(serialized[1]) : null; 
}

Talent.prototype = {
		id: 0,
		selected: false,
		spell: null
};