/**
 * @constructor
 * @param {Talents} talents
 * @param {number} tree
 * @param {Character} characterScope
 */
function TalentTreeFacade( talents, tree, characterScope ) {
	var i,j;
	
	this.primarySpells = [];
	for( i=0; i<talents.primarySpells[tree].length; i++ ) {
		this.primarySpells.push(new SpellFacade(talents.primarySpells[tree][i], characterScope));
	}

	this.talents = [];
	for( i=0; i<talents.rows; i++ ) {
		this.talents[i] = [];
		for( j=0; j<talents.cols; j++ ) {
			if( talents.talents[tree][i][j] != null ) {
				this.talents[i][j] = new TalentFacade( talents.talents[tree][i][j] );
			}
		}
	}
	
	this.name = talents.treeNames[tree];
	this.iconSrc = talents.treeIconSources[tree];
	this.description = talents.treeDescriptions[tree];
}

TalentTreeFacade.prototype = {
	iconSrc: "", name: "", bg: "", description: "", primarySpells: [], talents: []
};