/**
 * @constructor
 * @param {Array} settings
 * @param {boolean} cloned
 * @returns {GAIndividual}
 */
function GAIndividual( currentReforges, settings, cloned ) {
	this._settings = settings;
	this._fitness = 0;
	
	this._currentReforges = currentReforges.slice(0);
	//
	//
	//
	if( !cloned ) { 
		this._setFitness();
	}
}
GAIndividual.prototype = new Individual;
GAIndividual.prototype._ratings = [];
GAIndividual.prototype._settings = [];
GAIndividual.prototype._currentReforges = [];
GAIndividual.prototype._fitness = 0;
GAIndividual.prototype._setFitness = function () {
	var crf, i;
	var weightedRatings = [0,0,0,0,0,0,0,0];
	var weightedCaps = this._settings[1];
	var nulledWeightedCaps = this._settings[2];
	
	for( i=0; i<INV_ITEMS; i++ ) {
		crf = this._currentReforges[i];
		if( ! crf || crf[0] == -1 ) {
			continue;
		}
		weightedRatings[crf[0]] -= crf[3];
		weightedRatings[crf[1]] += crf[4];
	} 
	
	this._fitness = Math.min( weightedRatings[0], weightedCaps[0] ) - nulledWeightedCaps[0] +
		Math.min( weightedRatings[1], weightedCaps[1] ) - nulledWeightedCaps[1] +
		Math.min( weightedRatings[2], weightedCaps[2] ) - nulledWeightedCaps[2] +
		Math.min( weightedRatings[3], weightedCaps[3] ) - nulledWeightedCaps[3] +
		Math.min( weightedRatings[4], weightedCaps[4] ) - nulledWeightedCaps[4] +
		Math.min( weightedRatings[5], weightedCaps[5] ) - nulledWeightedCaps[5] +
		Math.min( weightedRatings[6], weightedCaps[6] ) - nulledWeightedCaps[6] +
		Math.min( weightedRatings[7], weightedCaps[7] ) - nulledWeightedCaps[7];
};
GAIndividual.prototype.mutate = function() {
	var itmIndex = Math.floor(Math.random() * INV_ITEMS);
	var iros = this._settings[0][itmIndex];
	if( ! iros ) {
		return;
	}
	this._currentReforges[itmIndex] = iros[Math.floor(Math.random() * iros.length)];
	//
	//
	//
	this._setFitness();
};

/**
 * @param {GAIndividual} ind
 */
GAIndividual.prototype.onePointCrossOver = function( ind ) {
	var crfs1 = this._currentReforges;
	var crfs2 = ind._currentReforges;
	var pivot = 1 + Math.floor( Math.random() * ( INV_ITEMS - 1 ) ); // 1 - 18
	
	this._currentReforges = crfs1.slice(0,pivot).concat(crfs2.slice(pivot));
	ind._currentReforges = crfs2.slice(0,pivot).concat(crfs1.slice(pivot));
	
	this._setFitness();
	ind._setFitness();
};

GAIndividual.prototype.clone = function() {
	var i = new GAIndividual( this._currentReforges, this._settings, true );
	i._fitness = this._fitness;
	return i;
};

GAIndividual.prototype.getDiversity = function( individuals ) {
	
};