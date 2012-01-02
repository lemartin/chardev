/**
 * @constructor
 */
function TalentsGui() {
    this.node = document.createElement("div");
    this.node.className = "ts_c";
    
    this.eventMgr = new GenericSubject();
    this.eventMgr.registerEvent('select_talent_tree', ['tree']);
    this.eventMgr.registerEvent('reset_talent_tree', ['tree']);
    this.eventMgr.registerEvent('reset_talents', []);
    this.eventMgr.registerEvent('show_tooltip', ['tree','row','col','node']);
    this.eventMgr.registerEvent('add_talent_point', ['tree','row','col']);
    this.eventMgr.registerEvent('remove_talent_point', ['tree','row','col']);
}

TalentsGui.prototype = {
	eventMgr: null,
	
	talentsFacade: null,
	
	treeCount: 0,
	rowCount: 0,
	colCount: 0,
	remainingPoints: 0,
	id: 0,
	minLevel: 0,
	pointsPerTier: 0,
	levelsPerPoint: 0,
	treeIcons: [],
	treeNames: [],
	treeSpents: [],
	selectedTree: -1,
	treeGrids: [],
	talentIcons: [],
	talents: [],
	viewSummaries: true,

	node: null,
	requiredLevelSpan: null,
	remainingPointsSpan: null,
	glowDivs: [],
	//
	// IE flicker fix by storing the last image url
	// and checking if it has changed instead of renewing
	lastBgsCache: [],  
	addObserver: function(observer) {
		this.eventMgr.addObserver(observer);
	},
	/**
	 * @param {TalentsFacade} talents
	 */
	init: function( talents ) {
		
		DOM.truncate(this.node);
		
		if( talents == null ) {
			DOM.createAt(this.node, 'div', {'class': 'ts_error', 'text': 'You have to select a Class before you can learn Talents!'});
			return;
		}
		
		this.talentsFacade = talents;
		
		var h, i, j;
		var div, ld, tmp, div2, div3;
		var layoutGrid, containerGrid, selectGrid;
		var selectLink, borderColor, circleDiv, switchNodeDiv;
		
	    this.minLevel = talents.minLevel;
	    this.pointsPerTier = talents.pointsPerTier;
	    this.levelsPerPoint = talents.levelsPerPoint;
		//
	    this.treeIcons = [];
	    this.treeNames = [];
	    this.treeSpents = [0,0,0];
	    this.selectedTree = ( talents.isPet ? 0 : -1);
	    
	    this.treeCount = talents.treeCount;
	    this.rowCount = talents.rowCount;
	    this.colCount = talents.colCount;
	    this.id = talents.id;
		
	    this.glowDivs = [];
		this.treeGrids = [];
		this.talentIcons = [];
		this.talents = [];
		this.primarySpells = []; 
		this.masterySpells = [];
		this.spellDivs = [];
	    
	    this.level = 85;
	    
	    this.treeNameLinks = [];
	    this.treeSpentSpan = [];
	    this.distributionDiv = document.createElement("div");
	    this.selectNodes = [];
	    this.treeNodes = [];
	    this.resetTreeLinks = [];
	    this.specLinks = [];
	    this.primaryNames = [];
	    
	    this.lastBgsCache = [];
	    
	    this.classLink = (talents.isPet ? ['fe', 'te', 'cu'] : ['wa', 'pa', 'hu', 'ro', 'pr', 'dk', 'sh', 'ma', 'wl', '', 'dr']);
	    this.distribution = null;
	    this.condensedDistribution = null;
	    this.compressedDistribution = "";
	    //
	    //	talents
	    //
		for( h = 0 ; h < talents.treeCount; h++ ) {
			var grid = new StaticGrid(talents.rowCount, talents.colCount);
			grid.node.cellSpacing = 0;
			grid.node.cellPadding = 0;
			grid.node.className = 'talent_tree_table';
			// tree name
	        this.treeNames[h] = talents.trees[h].name;
			// talents and icons
	        this.talents[h] = new Array(talents.rowCount);
			this.talentIcons[h] = new Array(talents.rowCount);
			for( i = 0; i < talents.rowCount; i++ ){
	            this.talents[h][i] = new Array(talents.colCount);
				this.talentIcons[h][i] = new Array(talents.colCount);
			}
			this.treeGrids[h] = grid;
			

	        
	        for ( i = 0; i < talents.rowCount; i++ ) {
	    		for ( j = 0; j < talents.colCount; j++ ) {
    				var t = talents.trees[h].talents[i][j];
	    			if( t == null ) {
	    				continue;
	    			}
    				this.talents[h][i][j] = t;
    			    tmp = new TalentIcon( t );
    			    tmp.node.className = 'talent_border';
    			    
    			    Listener.add(tmp.eventDiv, "click", this.onAddPoint, this, [h, i, j]);
    			    Listener.add(tmp.eventDiv, "contextmenu", this.onRemovePoint, this, [h, i, j]);
    			    Listener.add(tmp.eventDiv, "mouseover", this.onMouseOver, this, [h, i, j]);
    			    Listener.add(tmp.eventDiv, "mouseout", this.onMouseOut, this, [h, i, j]);

    			    DOM.set(this.treeGrids[h].cells[i][j],tmp.node);
    			    this.talentIcons[h][i][j] = tmp;
	    		}
	        }
	    }
	    //
	    //	sheet
	    //
	    layoutGrid = new StaticGrid(1,3);
	    containerGrid = new StaticGrid(1,1);
	    containerGrid.node.className = 'ts_tab';
	    layoutGrid.node.className = 'group talent_table';
	    selectGrid = new StaticGrid(1,3);
	    selectGrid.node.className = 'align_center';
	    //	reset all
	    this.resetAllLink = document.createElement('a');
	    this.resetAllLink.className = 'remove talent_reset_link';
	    this.resetAllLink.href = 'javascript:';
	    Listener.add(this.resetAllLink, "click", this.onReset, this, []);
	    //	header
	    
	    this.requiredLevelSpan = document.createElement("div");
	    this.remainingPointsSpan = document.createElement("div");
	    this.spentSpan = document.createElement('span'); 
	    
	    this.remainingPointsSpan.className = 'ts_header_info talent_remaining_points';
	    this.requiredLevelSpan.className = 'ts_header_info talent_required_level';
	    this.spentSpan.className = "ts_header_info ts_total";
	    
	    div = document.createElement('div');
	    div.className = '';
	    
	    div.appendChild(this.remainingPointsSpan);
	    div.appendChild(this.requiredLevelSpan);
	    
	    div.appendChild(this.resetAllLink);
	    div.appendChild(this.spentSpan);
	    
	    Tools.clearBoth(div);
	    
	    this.titleStack = new StackedDiv(2); 
	    this.titleStack.items[0].appendChild(document.createTextNode(TextIO.sprintf1(locale['ChooseYourSpericalization'],locale['a_class'][this.id-1])));
	    this.titleStack.items[0].className = 'ts_header_notice';
	    this.titleStack.items[1].appendChild(div);
	    this.titleStack.node.className = "ts_header_c";
	    
	    containerGrid.cells[0][0].appendChild(this.titleStack.node);
	    //	tree and tree header
	    for (i = 0; i < talents.treeCount; i++) {
		    this.selectNodes[i] = document.createElement("div");
		    this.treeNodes[i] = document.createElement("div");
			//
	    	borderColor = ( i == 0 ? '#D0A000' : ( i == 1 ? '#A00000' : '#2E4D99' ));
	        //	icon
	        this.treeIcons[i] = document.createElement("img");
	        this.treeIcons[i].className = 'ts_tree_icon';
	        if (!talents.isPet) {
	            this.treeIcons[i].src = "images/icons/small/" + talents.trees[i].iconSrc + ".png";
	        }

		    this.treeSpentSpan[i] = document.createElement('span');
		    this.treeSpentSpan[i].className = 'ts_tree_spent';
		    
	        this.resetTreeLinks[i] = document.createElement("a");
	        this.resetTreeLinks[i].href = 'javascript:';
	        this.resetTreeLinks[i].className = 'remove ts_tree_reset';
	        Listener.add(this.resetTreeLinks[i], "click", this.onResetTree, this, [i]);
	        
		    this.treeNameLinks[i] = document.createElement('a');
		    this.treeNameLinks[i].className = 'ts_tree_name';
		    this.treeNameLinks[i].href = 'javascript:';
		    this.treeNameLinks[i].innerHTML = this.treeNames[i];
			Listener.add(this.treeNameLinks[i], "click", this.onSelectTree, this, [i]);
	        
	        div = document.createElement("div"); 
	        div.className = 'ts_tree_title';
	        
	        div2 = document.createElement("div");
	        div2.className = 'ts_tree_name';
	        div2.appendChild(this.treeNameLinks[i]);
	         
	        div.appendChild(this.treeIcons[i]);
	        div.appendChild(div2);
	        div.appendChild(this.treeSpentSpan[i]);  
	        div.appendChild(this.resetTreeLinks[i]);
	        
	        layoutGrid.cells[0][i].appendChild(div);
	        

			this.glowDivs[i] = document.createElement('div');
			this.glowDivs[i].className = 'ts_glow_bg';
			this.glowDivs[i].appendChild(this.treeGrids[i].node);
	        
	        this.treeNodes[i].appendChild(this.glowDivs[i]);
	        this.treeNodes[i].className = 'talent_tree_node';
	        //	select tree nodes
	        if( !talents.isPet ) {
	        	div2 = document.createElement("div");
	        	div2.className = "talent_select_title";
		        selectLink = document.createElement("a");
		        selectLink.appendChild(document.createTextNode(this.treeNames[i]));
		        Listener.add(selectLink, "click", this.onSelectTree, this, [i]);
		        this.specLinks[i] = selectLink;
		        div2.appendChild(selectLink);
		        
		        this.selectNodes[i].appendChild(div2);
		        this.selectNodes[i].style.borderColor = borderColor;
		        
		        div = document.createElement("div");
		        div.className = 'talent_select_icon_div';
		        div.style.backgroundImage = "url(images/icons/large/" + talents.trees[i].iconSrc + ".png)";
		        circleDiv = document.createElement("div");
		        circleDiv.className = 'talent_select_circle_div';
		        circleDiv.style.backgroundImage = "url(images/talents/talent_select_circle_grey.png)";
		        div.appendChild(circleDiv);
		        this.selectNodes[i].appendChild(div);
				//
				//#############################################################
		        //
		        //	PRIMARY SPELLS
		        //
		        //#############################################################
		        //
		        div = document.createElement("div");
		        div.className = 'talent_spells_parent';
		        
		        this.spellDivs[i] = [];
		        this.primaryNames[i] = [];
		        this.primarySpells[i] = [];
		        for( j=0; j<talents.trees[i].primarySpells.length; j++ ) {
			        
		        	ld = new LayeredDiv(3);

		        	var ps = talents.trees[i].primarySpells[j];
		        	
		        	this.primarySpells[i][j] = ps;

			        this.primaryNames[i][j] = document.createElement("a");
			        this.primaryNames[i][j].innerHTML += ps.name;
			        this.primaryNames[i][j].href = "javascript:";
			        this.primaryNames[i][j].className = 'ts_ps_name_p' + (j==0?'_big':'');
			        
			        this.primaryNames[i][j].onmouseout = function(){Tooltip.hide();};
			        this.primaryNames[i][j].onmousemove = function(){Tooltip.move();};
			        Listener.add(this.primaryNames[i][j],"mouseover",Tooltip.show,Tooltip,[talents.trees[i].primarySpells[j].getTooltip()]);
		        	
		        	ld.layers[0].className = 'ts_primary_icon'+(j!=0?'_s':'');
			        ld.layers[0].style.backgroundImage = 'url(images/icons/'+(j==0?'half':'small')+'/'+talents.trees[i].primarySpells[j].icon+'.png)';
			        ld.layers[1].className = 'ts_primary_border'+(j!=0?'_s':'');
		        	
			        ld.layers[2].className = 'ts_primary_event'+(j!=0?'_s':'');
			        ld.layers[2].onmouseout = function(){Tooltip.hide();};
			        ld.layers[2].onmousemove = function(){Tooltip.move();};
			        Listener.add(ld.layers[2],"mouseover",Tooltip.show,Tooltip,[talents.trees[i].primarySpells[j].getTooltip()]);
		        	
			        
			        this.spellDivs[i][j] = ld;
			        
			        div3 = document.createElement('div');
			        div3.appendChild(ld.layers[0]);
			        div3.className = 'ts_ps_icon_p'+(j==0?'_big':'');
			        
			        div2= document.createElement('div');
			        div2.className = 'ts_ps_c'+(j==0?'_big':'');
			        
			        div2.appendChild(div3);
			        div2.appendChild(this.primaryNames[i][j]);
			        
			        div.appendChild(div2);
		        }
		        
		        this.selectNodes[i].appendChild(div);
		
		        div = document.createElement("div");
		        div.className = 'talent_select_description';
		        div.appendChild(document.createTextNode(TextIO.parse(talents.trees[i].description,null).join(" ")));
		        this.selectNodes[i].appendChild(div);
		        
		        this.selectNodes[i].className = 'talent_select_div';
		        this.treeNodes[i].appendChild(this.selectNodes[i]);
	        }
	        layoutGrid.cells[0][i].appendChild(this.treeNodes[i]);
	    }
	    this.distributionDiv.className = 'talent_link_div';
	    containerGrid.cells[0][0].appendChild(layoutGrid.node);
	    this.switchLink = document.createElement("a");
		this.switchLink.innerHTML = locale['ViewTalentTrees'];
		this.switchLink.className = 'talent_switch_link';
	    Listener.add(this.switchLink, "click", this.onSwitchView, this, [i]);
	    switchNodeDiv = document.createElement("div");
	    switchNodeDiv.className = 'ts_switch';
	    switchNodeDiv.appendChild(this.switchLink);
	    containerGrid.cells[0][0].appendChild(switchNodeDiv);
	    containerGrid.cells[0][0].appendChild(this.distributionDiv);
	    this.node.appendChild(containerGrid.node);
	    
	    this.selectTree(-1);
	    this.update();
	},
	selectTree: function( tree ) {
		for( var i = 0; i < this.treeCount; i++ ) {
			this.treeNodes[i].style.borderColor = ( i == tree ? '#FFCC00' : '' );
			this.glowDivs[i].style.backgroundImage = ( i == tree ? 'url(images/talents/talent_tree_glow.png)' : '');
			this.resetTreeLinks[i].style.visibility = ( tree == -1 ? 'hidden' : 'visible');
			this.treeSpentSpan[i].style.visibility = ( tree == -1 ? 'hidden' : 'visible');
			//this.selectNodes[i].className = i == tree || tree == -1 ? "talent_select_div" : "talent_select_div_inactive";
			for( var j=0; j<this.primarySpells[i].length; j++ ) {
				this.spellDivs[i][j].layers[0].style.backgroundImage = 'url(images/icons/'+(tree==-1||i==tree?"":"g/")+(j==0?'half':'small')+'/'+this.primarySpells[i][j].icon+'.png)';
				this.spellDivs[i][j].layers[1].style.backgroundImage = 'url(images/icon_border'+(j==0?'_smaller':'_smallest')+(tree==-1||i==tree?"":"_g")+'.png)';
				this.primaryNames[i][j].className =  'ts_ps_name_p'+( j==0?'_big':'')+' ts_primary_name'+( tree == i || tree == -1 ? "" : "_g");
			}
		}
		this.selectedTree = tree;
		
		if( tree == -1 ) {
			this.showSelectNode(true);
			this.titleStack.show(0);
		}
		else{
			this.showSelectNode(false);
			this.titleStack.show(1);
		}
//		this._showSelectNode( tree == -1 );
	    this.activateTreeNameLinks( tree == -1 );
//		this._reset(true);
	    this.update();
	},
	showSelectNode: function( show ) {
		for( var i = 0 ; i < this.selectNodes.length; i++ ) {
			this.selectNodes[i].style.display = (show ? "block" : "none");
		}

		this.viewSummaries = show;
		this.switchLink.innerHTML = ( show ? locale['ViewTalentTrees'] : locale['ViewSummaries'] );
	},
	activateTreeNameLinks: function( b ) {
		for( var i=0; i < this.treeCount; i++ ) {
			if ( b ) {
				this.treeNameLinks[i].className = 'ts_tree_link';
				this.specLinks[i].className = 'talent_select_link';
			}
			else {
				this.treeNameLinks[i].className = 'ts_tree_link_inactive';
				this.specLinks[i].className = 'talent_select_link_inactive';
			}	
		}
	},
	update: function() {
		var h, i, j, talent, url;
		var closed = this.talentsFacade.getRemainingPoints() <= 0;
		var unavailable, spent;
		for( h=0; h<this.treeCount; h++ ) {
			spent = 0;
			unavailable = this.selectedTree == -1 || h != this.selectedTree && this.talentsFacade.getPointsSpentIn(this.selectedTree) < 31;
			//
			
			url = 'url(images/talents/bg/'+( unavailable ? 'g/' : 'bg_' )+(1<<(this.id-1))+'_'+h+'.jpg)';
			if( url != this.lastBgsCache[h] ) {
				this.lastBgsCache[h] = url;
				this.treeNodes[h].style.backgroundImage = url;
			}
			for( i=0; i<this.rowCount; i++ ) {
				for( j=0; j<this.colCount; j++ ) {
					talent = this.talents[h][i][j];
		            if (talent != null) {
		            	//	if there is a talent at the tree/row/col
		            	talent = this.talents[h][i][j];
		                if (talent != null) {
		                	//  update icons
		                	this.talentIcons[h][i][j].update( 
		                			closed||unavailable, 
		                			talent.areRequiredTalentsSet() && spent >= (i * this.pointsPerTier) && !closed && !unavailable
		                	);
		                    //	update arrows
		                	for( var k=0; k<TALENT_REQ_ID_COUNT; k++ ) {
		                		if( talent.requiredTalents[k] ) {
		                			this.__createArrow(h, i, j, talent.requiredTalents[k] );
		                		}
		                	}
		                    spent += talent.getSpent();
		                }  
		            } 
				}
			}
		}
	},
	/**
	 * @protected
	 * @param {number} tree
	 * @param {number} row
	 * @param {number} col
	 * @param {Talent} reqTalent
	 */
	__createArrow: function(tree, row, col, reqTalent){
	    var i, active = '', reqRow = reqTalent.row, reqCol = reqTalent.col;
	    
	    if (this.talents[tree][reqRow][reqCol].isFull()) {
	        if (this.talents[tree][row][col].isFull() ||
	        !this.talents[tree][row][col].isFull() &&
	        this.remainingPoints != 0 &&
	        this.treeSpents[tree] >= this.pointsPerTier * row) {
	            active = '_active';
	        }
	    }
	    
	    if (col != reqCol) {
	    
	        if (col < reqCol) {
	        	this.talentIcons[tree][reqRow][reqCol].arrows[0].className = 'talent_arrow_left_start' + active;
	        }
	        else {
	        	this.talentIcons[tree][reqRow][reqCol].arrows[2].className = 'talent_arrow_right_start' + active;
	        }
	        for (i = Math.min(col, reqCol) + 1; i < Math.max(col, reqCol); i++) {
	        	this.treeGrids[tree].cells[reqCol][i].className = 'talent_arrow_horizontal' + active;
	        }
	        
	        if (row != reqRow) {
	            if (col < reqCol) {
	            	this.treeGrids[tree].cells[reqRow][col].className = 'talent_arrow_left_corner' + active;
	            }
	            else {
	            	this.treeGrids[tree].cells[reqRow][col].className = 'talent_arrow_right_corner' + active;
	            }
	        }
	        else {
	            if (col < reqCol) {
	                this.talentIcons[tree][row][col].arrows[2].className = 'talent_arrow_left_end' + active;
	            }
	            else {
	                this.talentIcons[tree][row][col].arrows[0].className = 'talent_arrow_right_end' + active;
	            }
	        }
	    }
	    if (row != reqRow) {
	        if (col == reqCol) {
	             this.talentIcons[tree][reqRow][reqCol].arrows[3].className = 'talent_arrow_vertical_start' + active;
	        }
	        for (i = Math.min(row, reqRow) + 1; i < Math.max(row, reqRow); i++) {
	        	this.treeGrids[tree].cells[i][col].className = 'talent_arrow_vertical' + active;
	        }
	        this.talentIcons[tree][row][col].arrows[1].className = 'talent_arrow_vertical_end' + active;
	    }
	    
	    this.__updateSpent();
	},
	__updateSpent: function (){
	    var url = "";
	    //
	    this.spentSpan.innerHTML = this.talentsFacade.getPointsSpent() + "/" + this.talentsFacade.getPoints();
	    this.treeSpentSpan[0].innerHTML = this.talentsFacade.getPointsSpentIn(0);
	    this.treeSpentSpan[1].innerHTML = this.talentsFacade.getPointsSpentIn(1);
	    this.treeSpentSpan[2].innerHTML = this.talentsFacade.getPointsSpentIn(2);
//	    if( this.talentsFacade.isPet ) {
//	    	url = "?p=" + this.classLink[Math.log(this.id) / Math.LN2] + this.compressedDistribution + "&pid=" + this.petId;
//	    }
//	    else {
	        url = "?t=" + this.classLink[this.talentsFacade.classId-1] + this.talentsFacade.getCompressedDistribution();	
//	    }
	    this.distributionDiv.innerHTML = "<a class='talent_link' target='_blank' href='" + url + "'>http://chardev.org/" + url + "</a><br/>";
//	    url = "http://www.wowarmory.com/talent-calc.xml?" + (this.isPet ? "pid=" + this.petId : "cid=" + (Math.log(this.id) / Math.LN2 + 1)) + "&tal=" + this.condensedDistribution.join('');
	    
	    url = "http://www.wowarmory.com/talent-calc.xml?cid=" + 
	    	(Math.log(this.id) / Math.LN2 + 1) + 
	    	"&tal=" + this.talentsFacade.getCondensedDistribution().join('');
	    
//	    if (!this.isPet) {
	        this.distributionDiv.innerHTML += "<a class='talent_link' target='_blank' href='" + url + "'>http://www.wowarmory.com/</a>";
//	    }
//	    if (!this.handler) {
//	    	var requiredLevel = this.getRequiredLevel();
//	        this.requiredLevel.innerHTML = TextIO.sprintf1(locale['Required_Level'], "<span class='ts_level'>" + (requiredLevel == 0 ? "-" : requiredLevel + "") + "</span>" );
//	    }
	    this.remainingPointsSpan.innerHTML = TextIO.sprintf1(locale['Remaining_Points'], "<span class='ts_remaining'>"+this.talentsFacade.getRemainingPoints()+"</span>");
	},
	onReset: function() {
		this.eventMgr.fire('reset_talents', {});
	},
	onResetTree: function( tree ) {
		this.eventMgr.fire('reset_talent_tree', {'tree': tree });
	},
	onSwitchView: function() {
		if( this.viewSummaries ) {
			this.showSelectNode(false);
		}
		else {
			this.showSelectNode(true);
		}
	},
	onSelectTree: function( tree ) {
		this.eventMgr.fire('select_talent_tree', {'tree': tree });
	},
	onAddPoint: function( tree, row, col ) {
		this.eventMgr.fire('add_talent_point', {'tree': tree, 'row': row, 'col': col });
		this.eventMgr.fire('show_tooltip', {'tree': tree, 'row': row, 'col': col, 'node': this.talentIcons[tree][row][col].eventDiv });
	},
	onRemovePoint: function( tree, row, col ) {
		this.eventMgr.fire('remove_talent_point', {'tree': tree, 'row': row, 'col': col });		
		this.eventMgr.fire('show_tooltip', {'tree': tree, 'row': row, 'col': col, 'node': this.talentIcons[tree][row][col].eventDiv });
	},
	onMouseOver: function( tree, row, col ) {
		this.eventMgr.fire('show_tooltip', {'tree': tree, 'row': row, 'col': col, 'node': this.talentIcons[tree][row][col].eventDiv });
	},
	onMouseOut: function( tree, row, col ) {
		Tooltip.hide();
	}
};