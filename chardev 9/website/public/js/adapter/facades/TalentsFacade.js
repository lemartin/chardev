/**
 * @constructor
 * @param {Talents} talents
 * @param {Character} characterScope
 */
function TalentsFacade( talents, characterScope ) {
	this.__talents = talents;
	this.id = talents.id;
	this.isPet = talents.isPet;
	this.treeCount = talents.trees;
	this.rowCount = talents.rows;
	this.colCount = talents.cols;
	this.minLevel = talents.minLevel;
	this.pointsPerTier = talents.pointsPerTier;
	this.levelsPerPoint = talents.levelsPerPoint;
	this.classId = characterScope.chrClass.id;
	
	this.trees = [];
	for( var i=0; i<talents.trees; i++ ) {
		this.trees[i] = new TalentTreeFacade( talents, i, characterScope );
	}
}

TalentsFacade.prototype = {
	__talents: null, trees: [], id: 0, isPet: false, treeCount: 0, rowCount: 0, colCount: 0, classId: 0,
	minLevel: 0, pointsPerTier: 0, levelsPerPoint: 0,
	getSelectedTree: function() {
		return this.__talents.selectedTree;
	},
	getRemainingPoints: function() {
		return this.__talents.getRemainingPoints();
	},
	getPointsSpentIn: function( tree ) {
		return this.__talents.treeSpents[tree];
	},
	getPointsSpent: function() {
		return this.__talents.getSpentPoints();
	},
	getDistribution: function() {
		return this.__talents.distribution;
	},
	getCondensedDistribution: function() {
		return this.__talents.condensedDistribution;
	},
	getCompressedDistribution: function() {
		return this.__talents.compressedDistribution;
	},
	getPoints: function() {
		return this.__talents.getPoints();
	}
};