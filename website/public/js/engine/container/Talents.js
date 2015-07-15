//TODO: Set distribution, level and remaining pts, active spells
/**
 * @constructor
 * @param serialized
 */
function Talents ( serialized ) {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("select", ["row","col"]);
	this.eventMgr.registerEvent("deselect", ["row","col"]);
	this.eventMgr.registerEvent("reset", []);
	this.eventMgr.registerEvent("tiers_change", ["tiers"]);
	this.eventMgr.registerEvent("set_distribution", []);
	
	this.id = serialized[0];
	this.talents = [];
	
	for( var row = 0; row < Talents.TIERS; row ++ ) {
		this.talents[row] = [null,null,null];
		for( var col = 0; col < Talents.COLUMNS; col++ ) {
			this.talents[row][col] = new Talent(serialized[1][row][col]);
		}
	}
}

Talents.TIERS = 6;
Talents.COLUMNS = 3;

Talents.getAvailableTiers = function( level ) {
	return Math.floor(level / 15);
};

Talents.prototype = {
		id: 0,
		talents: null,
		eventMgr: null,
		tiers: Talents.TIERS,
		
		setLevel: function( level ) {
			var tiers = Talents.getAvailableTiers(level);
			if( this.tiers > tiers ) {
				this._reset(tiers);
			}
			var oldTiers = this.tiers;
			this.tiers = tiers;
			
			if( oldTiers !== tiers ) {
				this.eventMgr.fire("tiers_change", {"tiers": tiers});
			}
		},
		reset: function() {
			this._reset(0);
			this.eventMgr.fire("reset", {});
		},
		_reset: function( startTier) {
			for( var i = startTier; i < Talents.TIERS; i ++ ) {
				for( var j = 0; j < Talents.COLUMNS; j++ ) {
					this.talents[i][j].selected = false;
				}
			}
		},
		/**
		 * @param {Auras} auras
		 */
		getActiveSpells: function( auras ) {
			for( var i = 0; i < Talents.TIERS; i ++ ) {
				for( var j = 0; j < Talents.COLUMNS; j++ ) {
					if( this.talents[i][j].selected ) {
						auras.add(this.talents[i][j].spell);
					}
				}
			}
		},
		/**
		 * @param {number} row
		 * @param {number} col
		 * @returns {boolean}
		 */
		_select: function( row, col ) {
			if( this.talents[row][col].selected || (row + 1) > this.tiers ) {
				return false;
			}
			
			for( var i = 0; i < row; i++ ) {
				var b = false;
				for( var j = 0; j < Talents.COLUMNS; j++ ) {
					if( this.talents[i][j].selected ) {
						b = true;
					}
				}
				if( ! b ) {
					return false;
				}
			}
			for( var j = 0; j < Talents.COLUMNS; j++ ) {
				if( this.talents[row][j].selected ) {
					this.talents[row][j].selected = false;
					this.eventMgr.fire( "deselect", { "row": row, "col": j });
				}
			}
			this.talents[row][col].selected = true;
			this.eventMgr.fire( "select", { "row": row, "col": col });
			
			return true;
		},
		/**
		 * @param {number} row
		 * @param {number} col
		 * @returns {boolean}
		 */
		_deselect: function( row, col ) {
			if( ! this.talents[row][col].selected ) {
				return false;
			}
			
			for( var i = row + 1; i < Talents.TIERS; i++ ) {
				for( var j = 0; j < Talents.COLUMNS; j++ ) {
					if( this.talents[i][j].selected ) {
						return false;
					}
				}
			}
			this.talents[row][col].selected = false;
			this.eventMgr.fire( "deselect", { "row": row, "col": col });
			
			return true;
		},
		/**
		 * @param {number} row
		 * @param {number} col
		 * @returns {boolean} <code>true</code> if toggling succeeded, <code>false</code> if it failed 
		 */
		toggle: function( row, col ) {
			
			if( ! this.talents[row][col].selected ) {
				return this._select(row, col);
			}
			else {
				return this._deselect(row, col);
			} 
		},
		/**
		 * @param {GenericObserver} observer
		 */
		addObserver: function( observer ){
			this.eventMgr.addObserver(observer);
		},
		/**
		 * @param {GenericObserver} observer
		 */
		removeObserver: function( observer ) {
			this.eventMgr.removeObserver(observer);
		},
		/**
		 * @param {string} dist
		 */
		setDistribution: function( dist ) {
			var n;
			
			this.reset();
			
			for( var i = 0; i<dist.length && i < Talents.TIERS; i++ ) {
				n = parseInt(dist.charAt(i), 10);
				if( n > 0 && n < 4 ) {
					this._select(i,n-1);
				}
			}
			
			this.eventMgr.fire("set_distribution", {});
		},
		/**
		 * @returns {string}
		 */
		getDistribution: function() {
			var str = "";
			for( var row = 0; row < Talents.TIERS; row ++ ) {
				if( this.talents[row][0].selected ) {
					str += "1";
				}
				else if( this.talents[row][1].selected ) {
					str += "2";
				}
				else if( this.talents[row][2].selected ) {
					str += "3";
				}
				else {
					break;
				}
			}
			return str;
		}
};