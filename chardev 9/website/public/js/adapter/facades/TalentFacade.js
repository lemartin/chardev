/**
 * @constructor
 * @param {Talent} talent
 */
function TalentFacade( talent ) {
	this.__talent = talent;
	this.name = talent.getName();
	this.icon = talent.spells[0].icon;
	this.max = talent.ranks;
	
	this.requiredTalents = [];
	for( var k in talent.requiredTalents ) {
		this.requiredTalents.push(talent.requiredTalents[k]);
	}
}

TalentFacade.prototype= {
	__talent: null, max: 0, name: "", icon: '',
	isFull: function() {
		return this.__talent.spent == this.max;
	},
	areRequiredTalentsSet: function() {
		return this.__talent.areRequiredTalentsSet();
	},
	getSpent: function() {
		return this.__talent.spent;
	}
};