/** @const */ var GA_MUTATION_PROBABILITY = 0.3;
/** @const */ var GA_RECOMBINATION_PROBABILITY = 0.2;
/** @const */ var GA_TOURNAMENT_STAGES = 3;

/**
 * @constructor
 * @returns {Individual}
 */
function Individual() {}
Individual.prototype._fitness = 0;

/**
 * @constructor
 * @returns {GeneticAlgorithm}
 */
function GeneticAlgorithm () {};

GeneticAlgorithm.prototype.GENERATIONS = 10000;
GeneticAlgorithm.prototype.INDIVIDUALS = 25;
GeneticAlgorithm.prototype._weights = null;
GeneticAlgorithm.prototype._caps = null;
GeneticAlgorithm.prototype._itemReforgeOptions = [];
GeneticAlgorithm.prototype._individuals = [];
GeneticAlgorithm.prototype._generation = 0;
GeneticAlgorithm.prototype._character = null;
GeneticAlgorithm.prototype._callback = null;
GeneticAlgorithm.prototype._progressHandler = null;
/**
 * @param {Array} individuals
 * @param {Handler} callback
 */
GeneticAlgorithm.prototype.evolve = function ( individuals, callback ) {
	this._individuals = individuals;
	this._callback = callback;
	
	if( individuals.length != this.INDIVIDUALS ) {
		throw 'Individual count doesn\'t match!';
	}
	
	JobManager.registerJob(new GAJob(this));
};
/**
 * @param {Handler} handler
 */
GeneticAlgorithm.prototype.setOnProgressChangeHandler = function( handler ) {
	this._progressHandler = handler;
};

GeneticAlgorithm.prototype.nextGeneration = function() {
	
	var ng = [];
	var c1,c2;
	var i,j;
	for( i = this.INDIVIDUALS - 1; i>=0; i-- ) {
		c1 = this._individuals[i];
		c2 = c1.clone();
		if( Math.random() < GA_MUTATION_PROBABILITY ) {
			c1.mutate();
		}
		if( Math.random() < GA_MUTATION_PROBABILITY ) {
			c2.mutate();
		}
		
		if( Math.random() < GA_RECOMBINATION_PROBABILITY ) {
			c1.onePointCrossOver(c2);
		}
		
		ng.push( c1, c2 );
	}
//	
//	Best
//	
//	ng.sort(function(i1,i2) {
//		return i2._fitness - i1._fitness;
//	});
//	
//	this._individuals = ng.splice( 0, this.INDIVIDUALS );
	
//	
//	Tournament
//	
	var wins;
	var cbts = ng.length, cbt, cbtf;
	var result = [];
	for( j=0; j<=GA_TOURNAMENT_STAGES; j++ ) {
		result[j] = [];
	}
	for( i=0; i<cbts; i++ ) {
		cbt = ng[i];
		cbtf = cbt._fitness;
		wins = 0;
		for( j=0; j<GA_TOURNAMENT_STAGES; j++ ) {
			if( cbtf < ng[Math.floor(Math.random()*cbts)]._fitness ) {
				continue;
			}
			wins++;
		}
		result[wins].push(cbt);
	}

	this._individuals = result[GA_TOURNAMENT_STAGES];
	
	for( i=GA_TOURNAMENT_STAGES-1; i>=0; i-- ) {
		this._individuals = this._individuals.concat(result[i]);
		if( this._individuals.length >= this.INDIVIDUALS ) {
			break;
		}
	}
	
	this._individuals.splice(this.INDIVIDUALS, this._individuals.length - this.INDIVIDUALS);
	
	this._generation ++;
};
/**
 * @constructor
 * @param {GeneticAlgorithm} ga
 * @returns {GAJob}
 */
function GAJob( ga ) {
	this._ga = ga;
	this._currentGeneration = 0;
} 

GAJob.prototype = new Job;
GAJob.prototype._ga = null;
GAJob.prototype._currentGeneration = 0;
/**
 * @param {number} time
 */
GAJob.prototype.resume = function( time ) {
	var end = new Date().getTime() + time;
	
	if( this._ga._progressHandler ) {
		this._ga._progressHandler.notify( [( this._ga._generation * 100.0 ) / this._ga.GENERATIONS] );
	}
	
	do{
		this._ga.nextGeneration();
	}
	while( this._ga._generation < this._ga.GENERATIONS && new Date().getTime() < end );
	
	if( this._ga._generation >= this._ga.GENERATIONS ) {
		var fittest = this._ga._individuals[0];
		for( var i=0; i<this._ga._individuals.length; i++ ) {
			if( this._ga._individuals[i]._fitness > fittest._fitness ) {
				fittest = this._ga._individuals[i];
			}
		}
		
		this._ga._callback.notify( [fittest] );
	}
};
GAJob.prototype.isFinished = function() {
	return this._ga._generation >= this._ga.GENERATIONS;
};