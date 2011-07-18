/**
 * @constructor
 * @returns {ReforgeOptimiser}
 */
function ReforgeOptimiser() {
	this._currentValues = [];
	this._optimisedValues = [];
	this.__itemReforgeOptions = [];
	this._itemRatings = [];
	
	for( var i=0; i < INV_ITEMS+2; i++ ) {
		this._currentValues[i] =   [0,0,0,0,0,0,0,0,  0];
		this._optimisedValues[i] = [0,0,0,0,0,0,0,0,  0];
		this._itemRatings[i] = [0,0,0,0,0,0,0,0];

		this.__itemReforgeOptions[i] = [[ -1,-1,0 ]];
	}
	
	this._ratings = [0,0,0,0,0,0,0];
	this._ratingsFromReforge = [0,0,0,0,0,0,0];

	this._weights = [0,0,0,0,0,0,0,0];
	this._caps = [0,0,0,0,0,0,0,0];
	this.__internalCaps = [0,0,0,0,0,0,0,0];
	
	this._currentReforgeConfiguration = [];
	this._optimisedReforgeConfiguration = null;
	
	this._eventManager = new EventManager([
      'started',
      'finished',
      'progress_change',
      'values_change'
	]);
}
ReforgeOptimiser.prototype._eventManager = null;
ReforgeOptimiser.prototype._character = null;
ReforgeOptimiser.prototype.__itemReforgeOptions = [];
ReforgeOptimiser.prototype._itemRatings = [];

ReforgeOptimiser.prototype._currentValues = [];
ReforgeOptimiser.prototype._optimisedValues = [];
ReforgeOptimiser.prototype._ratings = [];
ReforgeOptimiser.prototype._ratingsFromReforge = [];

ReforgeOptimiser.prototype._weights = [];
ReforgeOptimiser.prototype._caps = [];
ReforgeOptimiser.prototype.__internalCaps = [];

ReforgeOptimiser.prototype._currentReforgeConfiguration = [];
ReforgeOptimiser.prototype._optimisedReforgeConfiguration = [];

ReforgeOptimiser.prototype._valueChangeHandler = null;
ReforgeOptimiser.prototype._optimisationStartedHandler = null;
ReforgeOptimiser.prototype._optimisationFinishedHandler = null;
ReforgeOptimiser.prototype._optimisationProgressHandler = null;

ReforgeOptimiser.prototype._calculateValues = function() {
	var h=0, i=0, j=0, v=0, itm=null, delta=0;
	var fromStats, toStats;
	var fromScore, toScore;

	this.__itemReforgeOptions = [];
	this._ratingsFromReforge = [0,0,0,0,0,0,0];
	this._ratings = this._character._stats.getReforgeRatings();

	for( i=0; i<INV_ITEMS; i++ ) {
		for( j=0; j<REFORGABLE_STATS.length; j++ ) {
			this._currentValues[i][j] = 0;
		}
		//
		itm = this._character._inventory.get(i);
		if( ! itm ) {
			this._currentReforgeConfiguration[i] = null;
			this.__itemReforgeOptions[i] = null;
			this._itemRatings[i] = null;
			continue;
		}
		this._itemRatings[i] = [0,0,0,0,0,0,0,0];
		this._currentReforgeConfiguration[i] = [-1,-1,0,0,0];
		if( itm._reducedStat != -1 ) {
			// per rating
			this._ratingsFromReforge[STAT_TO_REFORGABLE_STAT[itm._reducedStat]] -= itm._addedStatValue;
			this._ratingsFromReforge[STAT_TO_REFORGABLE_STAT[itm._addedStat]] += itm._addedStatValue;
			// per item and rating
			this._currentValues[i][STAT_TO_REFORGABLE_STAT[itm._reducedStat]] -= itm._addedStatValue;
			this._currentValues[i][STAT_TO_REFORGABLE_STAT[itm._addedStat]] += itm._addedStatValue;
			//
			//	Set current reforge configuration, on base of the equipped item
			//
			this._currentReforgeConfiguration[i] = [ 
				STAT_TO_REFORGABLE_STAT[itm._reducedStat], 
				STAT_TO_REFORGABLE_STAT[itm._addedStat], 
				itm._addedStatValue,
				itm._addedStatValue * this._weights[STAT_TO_REFORGABLE_STAT[itm._reducedStat]],
				itm._addedStatValue * this._weights[STAT_TO_REFORGABLE_STAT[itm._addedStat]]
			];
		}
		//
		//	Update possible reforges
		//
		//		No reforge is always an option
		this.__itemReforgeOptions[i] = [[-1,-1,0,0,0]];
		//		Collect present and missing stats
		fromStats = []; 
		toStats = [];
		for( j=0; j<REFORGABLE_STATS.length; j++ ) {
			v = itm.isStatPresent(REFORGABLE_STATS[j]);
			if( v > 0 ) {
				fromStats[j] = v;
				this._itemRatings[i][j] += v;
			}
			else if( this._weights[j] > 0 ) {
				toStats.push(j);
			}
		}
		//		Combine collected stats to reforge option
		for( j in fromStats ) {
			for( h in toStats ) {
				fromScore = Math.floor(fromStats[j] * REFORGE_COEFFICIENT) * this._weights[j];
				toScore = Math.floor(fromStats[j] * REFORGE_COEFFICIENT) * this._weights[toStats[h]];
				// skip if reforge doesn't change the score
				if( fromScore == 0 && toScore == 0 ) {
					continue;
				}
				//      if reforge decreases score, and the reduced stat is uncapped
				if( this._caps[j] <= 0 && ( toScore - fromScore ) < 0  ) {
					continue;
				}
				
				this.__itemReforgeOptions[i].push([
				    parseInt(j,10), 
				    parseInt(toStats[h],10),
				    Math.floor(fromStats[j] * REFORGE_COEFFICIENT),
				    fromScore, 
				    toScore
				]);
			}
		}
	}
	//
	//	Calculate current ratings
	//
	
	//
	//	Update interal caps ( caps - ratings + ratings from reforge )
	//
	this._updateInternalCaps();
	//
	//	Reset optimised reforge configuration
	//
	// 	this._optimisedReforgeConfiguration = null;
	//
	//	Update values
	//
	for( i=0; i<INV_ITEMS; i++ ) {
		
		
		if( this._optimisedReforgeConfiguration ) {
			for( j=0; j<REFORGABLE_STATS.length; j++ ) {
				this._optimisedValues[i][j] = 0;
			}
			
			if( this._optimisedReforgeConfiguration[i] &&
				this._optimisedReforgeConfiguration[i][0] != -1
			) {
				this._optimisedValues[i][this._optimisedReforgeConfiguration[i][0]] -= this._optimisedReforgeConfiguration[i][2];
				this._optimisedValues[i][this._optimisedReforgeConfiguration[i][1]] += this._optimisedReforgeConfiguration[i][2];
			}
		}
		
		this._currentValues[i][REFORGABLE_STATS.length+1] = 0;
		this._optimisedValues[i][REFORGABLE_STATS.length+1] = 0;
		for( j=0; j<REFORGABLE_STATS.length; j++ ) {
			this._currentValues[i][REFORGABLE_STATS.length+1] += this._currentValues[i][j] * this._weights[j];
			this._optimisedValues[i][REFORGABLE_STATS.length+1] += this._optimisedValues[i][j] * this._weights[j];
		}
	}
	
	for( j=0; j<REFORGABLE_STATS.length; j++ ) {
		this._currentValues[INV_ITEMS][j] = 0;
		this._optimisedValues[INV_ITEMS][j] = 0;
		for( i=0; i<INV_ITEMS; i++ ) {
			this._currentValues[INV_ITEMS][j] += this._currentValues[i][j];
			this._optimisedValues[INV_ITEMS][j] += this._optimisedValues[i][j];
		}
		if( this._caps[j] > 0 ) {
			delta = this._caps[j] - this._ratings[j] + this._ratingsFromReforge[j];
			
			this._currentValues[INV_ITEMS+1][j] = this._calculatedWeightedTotal(this._currentValues[INV_ITEMS][j], delta, this._weights[j]);
			this._optimisedValues[INV_ITEMS+1][j] = this._calculatedWeightedTotal(this._optimisedValues[INV_ITEMS][j], delta, this._weights[j]);
		}
		else {
			this._currentValues[INV_ITEMS+1][j] = this._currentValues[INV_ITEMS][j] * this._weights[j];
			this._optimisedValues[INV_ITEMS+1][j] = this._optimisedValues[INV_ITEMS][j] * this._weights[j];
		}
	}
	
	this._eventManager.fire('values_change', [ this ]);
};
/**
 * @param {number} value
 * @param {number} delta
 * @param {number} weight
 * @returns {number}
 */
ReforgeOptimiser.prototype._calculatedWeightedTotal = function( value, delta, weight) {
	if( delta < 0 ) {
		if( value < delta ) {
			return ( value - delta ) * weight;
		}
		return 0;
	} else if ( delta == 0 ) {
		if( value < 0 ) {
			return value * weight;
		}
		return 0;
	}
	else {
		if( value < 0 ) {
			return value * weight;
		}
		else if( value > 0 ) {
			return Math.min(delta,value) * weight;
		}
		return 0;
	}
};
/**
 * @param {Array} weights
 */
ReforgeOptimiser.prototype.setWeights = function( weights ) {
	this._weights = weights;
	this._calculateValues();
};
/**
 * @param {Array} caps
 */
ReforgeOptimiser.prototype.setCaps = function( caps ) {
	this._caps = caps;
	this._updateInternalCaps();
	this._calculateValues();
};

ReforgeOptimiser.prototype._updateInternalCaps = function() {
	for( var i=0; i<REFORGABLE_STATS.length; i++ ) {
		this.__internalCaps[i] = this._caps[i] > 0 ? this._caps[i] - ( this._ratings[i] - this._ratingsFromReforge[i] ) : 99999;
	}
};

ReforgeOptimiser.prototype.optimise = function() {
	
	var ga = new GeneticAlgorithm();
	var i, settings, individuals;
	var nulledWeightedCaps = [];
	var weightedCaps = [];
	for( i=0; i<REFORGABLE_STATS.length; i++ ) {
		nulledWeightedCaps[i] = Math.min(this.__internalCaps[i],0) * this._weights[i];
		weightedCaps[i] = this.__internalCaps[i] * this._weights[i];
	}
	
	settings = [this.__itemReforgeOptions, weightedCaps, nulledWeightedCaps];
	individuals = [];
	for( i=0; i<ga.INDIVIDUALS; i++ ) {
		individuals.push( new GAIndividual( 
			this._currentReforgeConfiguration,
			settings, 
			false 
		));
	}
	
	ga.setOnProgressChangeHandler(new Handler(
		function( p ) { this._eventManager.fire('progress_change',[p]); },
		this
	));
	
	ga.evolve(individuals, new Handler(this._optimise_callback, this));
	
	this._eventManager.fire('started',[]);
};
/**
 * @param {GAIndividual} best
 */
ReforgeOptimiser.prototype._optimise_callback = function( best ) {
	this._optimisedReforgeConfiguration = best._currentReforges;
	this._calculateValues();
	this._eventManager.fire('finished',[]);
};

/**
 * @param {Character} character
 */
ReforgeOptimiser.prototype.update = function( character ) {
	this._character = character;
	this._calculateValues();
};

ReforgeOptimiser.prototype.addListener = function(event, handler) {
	this._eventManager.addListener(event, handler);
};

ReforgeOptimiser.prototype.resetOptimisedConfiguration = function() {
	this._optimisedReforgeConfiguration = null;
	this._calculateValues();
};