/**
 * @constructor
 */
function TalentsInterface () {
	this.node = Dom.create("div", {'class': 'ts_node'});
	this.distribution = Dom.create("div", {'class': 'ts_dist'});
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("click", ["row","col"]);
	this.eventMgr.registerEvent("reset", []);
}

TalentsInterface.CLASS_ABBREVIATION = ['wa', 'pa', 'hu', 'ro', 'pr', 'dk', 'sh', 'ma', 'wl', 'mo', 'dr'];

TalentsInterface.prototype = {
		node: null,
		eventMgr: null,
		links: null,
		grid: null,
		facades: null,
		talents: null,
		distribution: null,
		tiers: 0,
		cols: 0,
		spent: 0,
		setDistribution: function( chrClassId, distribution ) {
			var href = "?t=" + TalentsInterface.CLASS_ABBREVIATION[chrClassId-1]  + distribution;
			Dom.set(this.distribution, "<a target='_blank' class='ts_dist_link' href='"+Tools.getBasePath()+href+"'>"+window.location.host + "/" + href+"</a>");
		},
		setAvailableTiers: function( tiers ) {
			if( tiers != this.tiers ) {
				this.init(tiers, this.facades);
			}
		},
		reset: function() {
			this.init( this.tiers, this.facades);
		},
		init: function( tiers, facades ) {
			
			Dom.truncate(this.node);
			
			if( facades == null ) {
				Dom.createAt(this.node, 'div', {'class': 'ts_error', 'text': 'You have to select a class before you can learn talents!'});
				return;
			}
			
			var a;
			
			this.cols = facades[0].length;
			this.links = [];
			this.facades = facades;
			this.talents = [];
			this.tiers = tiers;
			this.spent = 0;
			this.grid = new StaticGrid(this.tiers,this.cols+2);
			this.spent = 0;
			
			this.grid.node.className = "ts_grid";
			
			for( var i=0; i<tiers; i++ ) {
				this.links[i] = [];
				this.talents[i] = [];
				
				Dom.createAt(this.grid.cells[i][0], "div", {"class": "ts_tier", "text": (i+1)*15});
				
				for ( var j = 0; j < this.cols; j++) {
					var cell = this.grid.cells[i][j+1];
					var facade = facades[i][j];
					
					var talentParent = Dom.createAt(cell,"div",{"class": "ts_talent_p"});
					var talentDiv = Dom.createAt(talentParent, "div", {"class": "ts_talent"});  
					
					var iconDiv = Dom.createAt(talentDiv, "div", {"class": "ts_icon_p"});
					var icon = Dom.createAt(iconDiv, "img", {
						"class": "ts_icon", 
						"src": "/images/icons/g/half/" + facade.getIcon() + ".png"
					});
					
					a = Dom.createAt(talentParent, "a", { "href": "javascript:;", "class": "ts_talent_title_p"});
					Dom.createAt(a,"span",{"text": facade.getName(), "class": "ts_talent_title"});
					
					Listener.add(a, "click", this.eventMgr.fire, this.eventMgr, ["click", {"row": i, "col": j}]);
					Listener.add(a, "mouseover", function(facade) {Tooltip.show(facade.getTooltip());}, window, [facade]);
					Listener.add(a, "mouseout", Tooltip.hide, Tooltip, null);
					Listener.add(a, "mousemove", Tooltip.move, Tooltip, null);
					
					this.talents[i][j] = [talentDiv, icon, a];
					
					this.links[i][j] = a;
					
					if( facade.isSelected()) {
						this._select(i, j);
					}
				}
				
				this.grid.cells[i][this.cols+1].className = 'ts_right_end';
			}
			
			this._setAvailable();
			
			Dom.append(Dom.set(this.node, this.grid.node),this.distribution);
		},
		_setAvailable : function() {
			for( var i=0; i<this.tiers; i++ ) {
				for ( var j = 0; j < this.cols; j++) {
					if( i <= this.spent ) {
						this.talents[i][j][1].src = "/images/icons/half/" + this.facades[i][j].getIcon() + ".png";
					}
					else {
						this.talents[i][j][1].src = "/images/icons/g/half/" + this.facades[i][j].getIcon() + ".png";
					}
				}
			}
		},
		_select: function( row, col) {
			Dom.addClass(this.talents[row][col][0],'ts_talent_active');
			this.talents[row][col][1].src = "/images/icons/half/" + this.facades[row][col].getIcon() + ".png";
			this.talents[row][col][1].style.borderColor = '#dcb531';
			this.talents[row][col][2].style.color = '#e0e0e0';
			this.spent ++;
		},
		_deselect: function( row, col) {
			Dom.removeClass(this.talents[row][col][0],'ts_talent_active');
			this.talents[row][col][1].src = "/images/icons/g/half/" + this.facades[row][col].getIcon() + ".png";
			this.talents[row][col][1].style.borderColor = '';
			this.talents[row][col][2].style.color = '';
			this.spent --;
		},
		select: function( row, col ) {
			this._select(row, col);
			this._setAvailable();
		},
		deselect: function( row, col ) {
			this._deselect(row, col);
			this._setAvailable();
		},
		addObserver: function( observer ) {
			this.eventMgr.addObserver(observer);
		}
};