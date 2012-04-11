/**
 * @constructor
 * @param {number} id
 * @param {Object} serialized
 * @param {boolean} isPet
 */
function Talents( id, serialized, isPet) {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('talents_reset', []);
	this.eventMgr.registerEvent('talent_tree_reset', ['tree']);
	this.eventMgr.registerEvent('talent_tree_selected', ['tree']);
	this.eventMgr.registerEvent('talent_point_added', ['tree','row','col','remainingPoints']);
	this.eventMgr.registerEvent('talent_point_removed', ['tree','row','col','remainingPoints']);
	this.eventMgr.registerEvent('talent_distribution_set', ['distribution']);
	this.eventMgr.registerEvent('talents_init', []);
	
	this.id = id;
    this.petId = 0;
    this.isPet = isPet;
    this.trees = (isPet ? 1 : 3);
    this.rows = (isPet ? 6 : 11);
    this.cols = 4;
    this.minLevel = (isPet ? 20 : 10);
    this.pointsPerTier = (isPet ? 3 : 5);
    this.levelsPerPoint = (isPet ? 4 : 1);
    this.level = Character.MAX_LEVEL;

	this.talents = [];
	this.primarySpells = []; 
	this.masterySpells = [];
	
	this.distribution = [];
    this.condensedDistribution = [];
    
    this.treeNames = [];
    this.treeIconSources = [];
    this.treeDescriptions = [];
    
    var h, i, j, talent;
    var talentIdMap = [];
    for( h = 0 ; h < this.trees; h++ ) {
    	

        this.treeNames[h] = serialized[h][0];
        this.treeIconSources[h] = serialized[h][2];
        this.treeDescriptions[h] = serialized[h][1];
    	
    	this.talents[h] = new Array(this.rows);
    	for( i = 0; i < this.rows; i++ ){
            this.talents[h][i] = new Array(this.cols);
    	}
		//
    	for (i = 0; i < serialized[h][3].length; i++) {
    		//
    		// create talent
    		talent = new Talent( h, serialized[h][3][i]);
    		//
    		// skip if not available
    	    if (this.isPet && !talent.isAvailableForPet(this.petId, this.id)) {
    	        continue;
    	    }
    	    //
    	    // add talent to talents
    	    this.talents[h][talent.row][talent.col] = talent;
    	    //
    	    // add to map
    	    talentIdMap[talent.id] = talent;
	    }
    	
    	for ( i = 0; i < this.rows; i++ ) {
    		for ( j = 0; j < this.cols; j++ ) {
    			if( this.talents[h][i][j] == null ) {
    				continue;
    			}
    			var tmp = this.talents[h][i][j];
    			for( var k=0; k<TALENT_REQ_ID_COUNT; k++ ) {
	    			var reqId = tmp.requiredIds[k];
	    			if( reqId ) {
	        	    	tmp.setRequiredTalent( k, talentIdMap[reqId] );
	    			}
    			}
    	    }
        }
    	this.masterySpells[h] = [];
    	for( i=0; i<serialized[h][4].length;i++ ) {
    		this.masterySpells[h][i] = serialized[h][4][i] != null ? new Spell(serialized[h][4][i]) : null;
    	}
    	this.primarySpells[h] = [];
    	for( i=0; i<serialized[h][5].length;i++ ) {
    		this.primarySpells[h][i] = new Spell(serialized[h][5][i]);
    	}
    }
	
	this.selectTree(-1);
	
	this.eventMgr.fire('talents_init', {});
}

Talents.itoh = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

Talents.prototype = {
	eventMgr: null,
	minLevel: 10,
	level: 0,
	trees: 0,
	rows: 0,
	cols: 0,
	pointsPerTier: 0,
	levelsPerPoint: 1,
	talents: [],
	distribution: [],
	condensedDistribution: [],
	compressedDistribution: "",
	treeSpents: [],
	selectedTree: -1,
	isPet: false,
	masterySpells: [],
	primarySpells: [],
	treeNames: [],
	treeIconSources: [],
	treeDescriptions: [],
	/**
	 * @param {GenericObserver} observer
	 */
	addObserver: function(observer){
		this.eventMgr.addObserver(observer);
	},
	/**
	 * @param {GenericObserver} observer
	 */
	removeObserver: function(observer){
		this.eventMgr.removeObserver(observer);
	},
	/**
	 * @param {number} tree
	 */
	selectTree: function( tree ) {
		this.selectedTree = tree;
		this.__reset(true);
		this.eventMgr.fire( "talent_tree_selected", { 'tree': tree });
	},
	getRemainingPoints: function() {
		if (this._level < this.minLevel) {
		    return 0;
		}
		return this.getPoints() - this.getSpentPoints();
	},
	getPoints: function() {
		if (this.level < this.minLevel) {
	        return 0;
	    }
	    else if( this.isPet ){
	        return Math.floor((this.level - this.minLevel) / this.levelsPerPoint + 1);
	    } else {
	    	return 1 + Math.min( 35, ( this.level - 9 ) >> 1  ) + Math.max( 0, this.level - 80 );
	    }
	},
	getSpentPoints: function() {
		var spent = 0;
		for( var i = 0 ; i < this.trees; i++ ) {
			spent += this.treeSpents[i];
		}
		return spent;
	},
	getRequiredLevel: function() {
		var spent = this.getSpentPoints();
		
		if( spent == 0 ) {
			return 0;
		} 
		return 10 + Math.max( 0, Math.min( 71, ( spent - 1 ) * 2 - 1 )) + Math.max( 0, spent - 37 );
	},
	setLevel: function( level ) {
		this._level = level;
	    if (this.getRemainingPoints() < 0) {
	        this.__reset( true );
	    }
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	MODIFY TALENT
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	addPoint: function( tree, row, col) {
		if(this.__modify( tree, row, col, 1 )) {
			this.eventMgr.fire('talent_point_added', {'tree': tree, 'row': row, 'col': col, 'remainingPoints': this.getRemainingPoints()});
		}
	},
	removePoint: function( tree, row, col) {
		if( this.__modify( tree, row, col, -1 )) {
			this.eventMgr.fire('talent_point_removed', {'tree': tree, 'row': row, 'col': col, 'remainingPoints': this.getRemainingPoints()});
		}
	},
	__modify: function( tree, row, col, modifier ) {
		 if (
	    	this.selectedTree != -1 &&
	    	this.talents[tree][row][col] != null &&
	    	this.talents[tree][row][col].spent + modifier <= this.talents[tree][row][col].ranks &&
	    	this.talents[tree][row][col].spent + modifier >= 0 &&
	    	this.getRemainingPoints() - modifier >= 0 &&
	    	this.treeSpents[tree] >= this.pointsPerTier * row &&
	    	( this.treeSpents[this.selectedTree] >= 31 || tree == this.selectedTree ) &&
	    	( this.selectedTree != tree || this.treeSpents[tree] + modifier >= 31 || ( this.getSpentPoints() == this.treeSpents[tree] ))
	    	
	    )
	    {
	        this.talents[tree][row][col].spent += modifier;
	        this.treeSpents[tree] += modifier;
	        
	        if( this.__testTree(tree)) {
				this.__updateDistribution();
	        	return true;
	        }
            this.talents[tree][row][col].spent -= modifier;
            this.treeSpents[tree] -= modifier;
            return false;
	    }
		return false;
	},
	__testTree: function( tree ) {
	    var spent = 0;
	    var i, j, talent;
	    var color = new Array();
	    
	    //	loop through rows
	    for (i = 0; i < this.rows; i++) {
	        color[i] = new Array();
	        //	loop through columns
	        for (j = 0; j < this.cols; j++) {
	            color[i][j] = -1;
	            talent = this.talents[tree][i][j];
	            //	if there is a talent at the tree/row/col and points are spent
	            if ( talent != null && talent.spent > 0 ) {
	                //	if there aren't enough points spent in the tree and there are points spent in a talent
	                if (spent < (i * this.pointsPerTier)) {
	                    //	abort and return false
	                    return false;
	                }
	                //	if there is a required talent and, despite it is not filled, there are points in the requiring
	                if ( !talent.areRequiredTalentsSet()) {
	                    // abort and return false
	                    return false;
	                }
	                //	add the on the talent spent points to the tree spent
	                //	if something with the distribution is wrong
	                //	the method should be aborted
	                spent += talent.spent;
	            }
	        }
	    }
	    return true;
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	RESET TREE, ALL
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	reset: function() {
		this.__reset(false);
		this.__updateDistribution();
	    this.eventMgr.fire('talents_reset', {});
	},
	__reset: function( retainSelectedTree ) {
		 for (var i = 0; i < this.trees; i++) {
	        this.__resetTree( i );
	    }
	    if( !retainSelectedTree ) {
	    	this.selectTree(-1);
	    }
	},
	resetTree: function( tree ) {
		if( tree == this.selectedTree && this.getSpentPoints() != this.treeSpents[tree] ) {
			this.__reset( true );
			this.__updateDistribution();
		    this.eventMgr.fire('talents_reset', {});
		}
		else {
			this.__resetTree( tree );
			this.__updateDistribution();
		    this.eventMgr.fire('talent_tree_reset', {'tree': tree});
		}
	},
	__resetTree: function( tree ) {
		var talent;
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				talent = this.talents[tree][i][j]; 
				if ( talent != null) {
					talent.spent = 0;
				}
			}
		}
		this.treeSpents[tree] = 0;
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	DISTRIBUTION
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	/**
	 * @param {number} d
	 * @returns {string}
	 */
	__intToCompressed: function(d){
	    d = (d > 9 ? (d > 35 ? (65 + d - 36) : (97 + d - 10)) : (48 + d));
	    return unescape("%" + Talents.itoh[Math.floor(d / 16)] + Talents.itoh[Math.floor(d % 16)]);
	},
	__updateDistribution: function() {
		this.distribution = new Array();
	    this.condensedDistribution = new Array();
	    this.compressedDistribution = "";
	    
	    var n = 0;
	    var o = 0;
	    var d = -1;
	    var r = "";
	    var h, i, j;
	    for (h = 0; h < this.trees; h++) {
	        for (i = 0; i < this.rows; i++) {
	            for (j = 0; j < this.cols; j++) {
	                if (this.talents[h][i][j] != null) {
	                    this.condensedDistribution[n++] = this.talents[h][i][j].spent;
	                    this.distribution[o++] = this.talents[h][i][j].spent;
	                    if (d == -1) {
	                        d = this.talents[h][i][j].spent;
	                    }
	                    else {
	                        d = d * 6 + this.talents[h][i][j].spent;
	                        r += this.__intToCompressed(d);
	                        d = -1;
	                    }
	                }
	                else {
	                    this.distribution[o++] = 0;
	                }
	            }
	        }
	    }
	    if (d != -1) {
	        r += this.__intToCompressed(d * 6);
	    }
	    
	    for (i = 0; i < r.length; i++) {
	        if (r.charCodeAt(i) == 48) {
	            n = 0;
	            while (r.charCodeAt(i) == 48 && i < r.length) {
	                i++;
	                n++;
	            }
	            if (i == r.length) 
	                continue;
	            i--;
	            this.compressedDistribution += ',' + this.__intToCompressed(n);
	        }
	        else {
	            this.compressedDistribution += r.charAt(i);
	        }
	    }
	},
	setDistribution: function(distribution, condensed){
	    var n = 0, v;
	    var h,i,j;
	    var s = [], x, xt;
	    for ( h = 0; h < this.trees; h++) {
	    	s[h] = 0;
	        for ( i = 0; i < this.rows; i++) {
	            for ( j = 0; j < this.cols; j++) {
	                if (this.talents[h][i][j] != null) {
	                	v = parseInt(distribution[n], 10);
	                	v = isNaN(v) ? 0 : v;
	                    s[h] += v;
	                    if (condensed) {
	                        n++;
	                    }
	                }
	                if (!condensed) {
	                    n++;
	                }
	            }
	        }
	    }
	    x = 0; 
	    xt = -1;
	    
	    for( i=0; i<this.trees; i++ ) {
	    	if( s[i] >= 31 ) {
	    		xt = i;
	    		break;
	    	}
	    	if( s[i] > x ) {
	    		xt = i;
	    		x = s[i];
	    	}
	    }
	    if( xt != -1 ) {
	    	this.selectTree(xt);
	    }
	    
	    n=0;
	    for ( h = 0; h < this.trees; h++) {
	    	//
	    	// reset spent points
	    	this.treeSpents[h] = 0;
	    	
	        for ( i = 0; i < this.rows; i++) {
	            for ( j = 0; j < this.cols; j++) {
	                if (this.talents[h][i][j] != null) {
	                	v = parseInt(distribution[n], 10);
	                    this.talents[h][i][j].spent = isNaN(v) ? 0 : v;
	                    //
	                    // add to spent points
	                    this.treeSpents[h] += v;
	                    //
	                    // move cursor, if condensed
	                    if (condensed) {
	                        n++;
	                    }
	                }
	                //
	                // always move cursor, if not condensed
	                if (!condensed) {
	                    n++;
	                }
	            }
	        }
	    }
	    
		this.__updateDistribution();
	    this.eventMgr.fire("talent_distribution_set", {'distribution': this.getDistribution(false)});
	},
	/**
	 * @public
	 * @param {boolean} condensed
	 * @return {Array}
	 */
	getDistribution: function(condensed){
	    return (condensed ? this.condensedDistribution : this.distribution);
	},
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	//	ACTIVE SPELLS
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	getActiveSpells: function(auras){
	    var tmp = null;
	    var h,i,j;
	    for ( h = 0; h < this.trees; h++) {
	        for ( i = 0; i < this.rows; i++) {
	            for ( j = 0; j < this.cols; j++) {
	                if (this.talents[h][i][j] != null) {
	                    tmp = this.talents[h][i][j].getSpell();
	                    if (tmp != null) {
	                        auras.add(tmp);
	                    }
	                }
	            }
	        }
	        
	        if( h == this.selectedTree ) {
		        for(i=0;i<this.primarySpells[h].length;i++) {
		        	auras.add(this.primarySpells[h][i]);
		        }
		        for(i=0;i<this.masterySpells[h].length;i++) {
		        	auras.add(this.masterySpells[h][i]);
		        }
	        }
	    }
	}
};