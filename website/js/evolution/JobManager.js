//	The JobManager guarantees, that each registered job gets an equal portion of computation time. The scheduling method is round robin. 
//	
//

var JobManager = {
	_jobs: [],
	_currentJob: -1,
	_sleeping: true,
	_kill: false,
	/** @const */
	TIME_SLICE: 250, //ms
	initialise: function() {
	// echo( "init called" );
	//TODO register needed methods for non obfuscated use.
	},
	/**
	*	@param {Job} j
	*/
	registerJob: function( j ) {
		JobManager._jobs.push( j );
		if( JobManager._sleeping ) {
			JobManager.resumeJobs();
		}
	},
	resumeJobs: function() {
		// echo( "resumeJobs called" );
		// window.setTimeout( f , 0 );
		
		JobManager._sleeping = false;
		
		if( JobManager._jobs.length < 1 || JobManager._kill ) {
			// sleep for 1s
			// window.setTimeout( "JobManager.resumeJobs()" , 1000 ); 
			JobManager._sleeping = true;
		}
		else {
			var j = null;
			if( JobManager._currentJob == -1 ) {
				JobManager._currentJob = 0;
			}
			else {
				JobManager._currentJob = ( JobManager._currentJob + 1 ) %  JobManager._jobs.length;
			}
			
			j = JobManager._jobs[ JobManager._currentJob ];
			
			if( j == null ) {
				throw 'NullPointerException in JobManager.resumeJobs, Current job is null';
			}
			
			j.resume( JobManager.TIME_SLICE );
			
			if( j.isFinished() ) {
				JobManager._jobs.splice( JobManager._currentJob, 1 );
			}
			
			// sleep 50ms till next chunk of the job is computed,
			// to avoid frozen-warning of some browsers
			window.setTimeout( JobManager.resumeJobs , 50 ); 
		}
	},
	killAll: function() {
		JobManager._kill = true;
	}
};
window["__jobmanager_init"] = JobManager.initialise;
/**
 * @constructor
 * @returns {Job}
 */
function Job() {}
/** @param {number} time */
Job.prototype.resume = function( time ){};
Job.prototype.isFinished = function(){ return true; };

/**
 * @constructor
 * @returns {CountJob}
 */
function CountJob() {
	Job.call( this );
	this._number = 0;
}
CountJob.prototype = new Job;
CountJob.prototype._number = 0;
/** @param {number} time */
CountJob.prototype.resume = function( time ){
	var start = new Date().getTime();
	var sn = this._number;
	
	do {
		this._number++;
	}
	while( new Date().getTime() - start < time && !this.isFinished() );
	
	echo("chunk: counted from "+sn+" to "+this._number+" in "+(new Date().getTime() - start)+" ms (slice: "+time+"ms)");
};
CountJob.prototype.isFinished = function(){
	if( this._number > 1<<30 ) {
		return true;
	}
	return false;
};