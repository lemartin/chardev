/**
 * @constructor
 * @param {number} id
 * @param {Array} serialized
 * @param {boolean} isPet
 * @returns {Talents}
 */
function Talents(id, serialized, isPet){

    var h, i, j;
	var div, h3, ld, tmp;
	var layoutGrid, containerGrid, titleGrid, primSpellGrid, selectGrid;
	var reqId;
	var selectLink, borderColor, circleDiv, switchNodeDiv;
	
    this._id = id;
    this._petId = -1;
    this._isPet = isPet;
    this._trees = (isPet ? 1 : 3);
    this._rows = (isPet ? 6 : 7);
    this._cols = 4;
    this._minLevel = (isPet ? 20 : 10);
    this._pointsPerTier = (isPet ? 3 : 5);
    this._levelsPerPoint = (isPet ? 4 : 1);
	//
    this._treeIcons = [];
    this._treeNames = [];
    this._treeSpents = [0,0,0];
    this._selectedTree = ( isPet ? 0 : -1);
	
	this._treeGrids = [];
	this._talentIcons = [];
	this._talents = [];
	this._talentsById = new Array();
	this._primarySpells = []; 
	this._masterySpells = [];
	this._spellDivs = [];
    
    this._level = 85;
    this._node = document.createElement("div");
    
    this._treeNameLinks = [];
    this._treeSpentSpan = [];
    this._spentSpan = document.createElement('span'); this._spentSpan.className = "ts_total";
    this._resetAllLink = document.createElement('a');
    this._distributionDiv = document.createElement("div");
    this._remainingPoints = document.createElement('span');
    this._requiredLevel = document.createElement('span');
    this._selectNodes = [];
    this._treeNodes = [];
    this._resetTreeLinks = [];
    this._specLinks = [];
    this._primaryNames = [];
    
    this._classLink = (isPet ? new Array('fe', 'te', 'cu') : new Array('wa', 'pa', 'hu', 'ro', 'pr', 'dk', 'sh', 'ma', 'wl', '', 'dr'));
    this._distribution = null;
    this._condensedDistribution = null;
    this._compressedDistribution = "";
    
    this._serialized = serialized;
    this._itoh = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F');
    //
    //	talents
    //
	for( h = 0 ; h < this._trees; h++ ) {
		var grid = new StaticGrid(this._rows, this._cols);
		grid._node.cellSpacing = 0;
		grid._node.cellPadding = 0;
		grid._node.className = 'talent_tree_table';
		// tree name
        this._treeNames[h] = serialized[h][0];
		// talents and icons
        this._talents[h] = new Array(this._rows);
		this._talentIcons[h] = new Array(this._rows);
		for( i = 0; i < this._rows; i++ ){
            this._talents[h][i] = new Array(this._cols);
			this._talentIcons[h][i] = new Array(this._cols);
		}
		this._treeGrids[h] = grid;
		//
		for (i = 0; i < serialized[h][3].length; i++) {
	    	this._createTalent(serialized[h][3][i],h);
	    }

    	for ( i = 0; i < this._rows; i++ ) {
    		for ( j = 0; j < this._cols; j++ ) {
    			if( this._talents[h][i][j] == null ) {
    				continue;
    			}
    			tmp = this._talents[h][i][j];
    			for( var k=0; k<TALENT_REQ_ID_COUNT; k++ ) {
	    			reqId = tmp._requiredIds[k];
	    			if( reqId ) {
	        	    	tmp.setRequiredTalent( k, this._talentsById[reqId] );
	    			}
    			}
    	    }
        }
    	this._masterySpells[h] = [];
    	for( i=0; i<serialized[h][4].length;i++ ) {
    		this._masterySpells[h][i] = serialized[h][4][i] != null ? new Spell(serialized[h][4][i]) : null;
    	}
    	this._primarySpells[h] = [];
    	for( i=0; i<serialized[h][5].length;i++ ) {
    		this._primarySpells[h][i] = new Spell(serialized[h][5][i]);
    	}
    }
    //
    //	sheet
    //
    layoutGrid = new StaticGrid(1,3);
    containerGrid = new StaticGrid(1,1);
    containerGrid._node.className = 'align_center';
    layoutGrid._node.className = 'talent_table';
    selectGrid = new StaticGrid(1,3);
    selectGrid._node.className = 'align_center';
    //	reset all
    this._resetAllLink.className = 'talent_reset_link';
    this._resetAllLink.appendChild(document.createTextNode('[x]'));
    Listener.add(this._resetAllLink, "click", this._onReset, this);
    //	header
    
    this._remainingPoints.className = 'talent_remaining_points';
    this._requiredLevel.className = 'talent_required_level';
    
    titleGrid = new StaticGrid(1,2);
    titleGrid._cells[0][0].appendChild(this._remainingPoints);
    titleGrid._cells[0][1].appendChild(this._requiredLevel);
    titleGrid._cells[0][1].appendChild(this._spentSpan);
    titleGrid._cells[0][1].appendChild(this._resetAllLink);
    titleGrid._cells[0][1].className = 'text_align_right';
    titleGrid._node.style.width = "100%";
    
    this._titleStack = new StackedDiv(2);
    this._titleStack._items[0].className = 'text_align_center'; 
    this._titleStack._items[0].appendChild(document.createTextNode(TextIO.sprintf1(locale['ChooseYourSpericalization'],locale['a_class'][this._id-1])));
    this._titleStack._items[1].appendChild(titleGrid._node);
    this._titleStack._node.className = "ts_title";
    
    containerGrid._cells[0][0].appendChild(this._titleStack._node);
    //	tree and tree header
    for (i = 0; i < this._trees; i++) {
	    this._treeNameLinks[i] = document.createElement('a');
	    this._treeSpentSpan[i] = document.createElement('span');
	    this._selectNodes[i] = document.createElement("div");
	    this._treeNodes[i] = document.createElement("div");
		//
    	borderColor = ( i == 0 ? '#D0A000' : ( i == 1 ? '#A00000' : '#2E4D99' ));
    	titleGrid = new StaticGrid(1,3);
        //	icon
        this._treeIcons[i] = document.createElement("img");
        this._treeIcons[i].className = 'talent_tree_icon';
        if (!this._isPet) {
            this._treeIcons[i].src = "images/icons/medium/" + serialized[i][2] + ".png";
        }
        //	name
        this._treeSpentSpan[i].className = 'talent_tree_spent';
        this._treeNameLinks[i].appendChild(document.createTextNode(this._treeNames[i]));
		Listener.add(this._treeNameLinks[i], "click", this._onSelectTree, this, [i]);
		
        // TODO check why h3 wrapped in div
        div = document.createElement("div");
        div.className = 'talent_tree_title';
        h3 = document.createElement("h3");
        h3.appendChild(this._treeNameLinks[i]);
        h3.appendChild(this._treeSpentSpan[i]);
        h3.className = 'talent_tree_name';
        //	reset
        this._resetTreeLinks[i] = document.createElement("a");
        this._resetTreeLinks[i].className = 'talent_tree_reset_link';
        this._resetTreeLinks[i].appendChild(document.createTextNode('[x]'));
        Listener.add(this._resetTreeLinks[i], "click", this._onResetTree, this, [i]);
        
        titleGrid._cells[0][0].appendChild(this._treeIcons[i]);
        titleGrid._cells[0][1].appendChild(h3);
        titleGrid._cells[0][1].style.width = "100%";
        titleGrid._cells[0][1].vAlign = 'center';
        titleGrid._cells[0][2].appendChild(this._resetTreeLinks[i]);
        titleGrid._node.style.width = "100%";
        div.appendChild(titleGrid._node);
        //	add all to layout grid
        this._treeNodes[i].appendChild(div);
        this._treeNodes[i].appendChild(this._treeGrids[i]._node);
        this._treeNodes[i].className = 'talent_tree_node';
        //	select tree nodes
        if( !isPet ) {
	        h3 = document.createElement("h3");
	        h3.className = "talent_select_title";
	        selectLink = document.createElement("a");
	        selectLink.appendChild(document.createTextNode(this._treeNames[i]));
	        Listener.add(selectLink, "click", this._onSelectTree, this, [i]);
	        this._specLinks[i] = selectLink;
	        h3.appendChild(selectLink);
	        
	        this._selectNodes[i].appendChild(h3);
	        this._selectNodes[i].style.borderColor = borderColor;
	        
	        div = document.createElement("div");
	        div.className = 'talent_select_icon_div';
	        div.style.backgroundImage = "url(images/icons/large/" + serialized[i][2] + ".png)";
	        circleDiv = document.createElement("div");
	        circleDiv.className = 'talent_select_circle_div';
	        circleDiv.style.backgroundImage = "url(images/talents/talent_select_circle_grey.png)";
	        div.appendChild(circleDiv);
	        this._selectNodes[i].appendChild(div);
	        
	        
	        div = document.createElement("div");
	        div.className = 'talent_spells_parent';
	       
	        primSpellGrid = new StaticGrid( this._primarySpells[i].length, 2 ); primSpellGrid.setVerticalAlign(SG_VALIGN_MIDDLE);
	        
	        this._spellDivs[i] = [];
	        this._primaryNames[i] = [];
	        for( j=0; j<this._primarySpells[i].length; j++ ) {
	        	ld = new LayeredDiv(3);
	        	

		        this._primaryNames[i][j] = document.createElement("span");
		        this._primaryNames[i][j].innerHTML += this._primarySpells[i][j].getName();
		        
		        this._primaryNames[i][j].onmouseout = function(){Tooltip.hide();};
		        this._primaryNames[i][j].onmousemove = function(){Tooltip.move();};
		        Listener.add(this._primaryNames[i][j],"mouseover",Tooltip.showSpellByReference,Tooltip,[this._primarySpells[i][j]]);
	        	
	        	ld._layers[0].className = 'ts_primary_icon'+(j!=0?'_s':'');
		        ld._layers[0].style.backgroundImage = 'url(images/icons/'+(j==0?'half':'small')+'/'+this._primarySpells[i][j]._icon+'.png)';
		        ld._layers[1].className = 'ts_primary_border'+(j!=0?'_s':'');
	        	
		        ld._layers[2].className = 'ts_primary_event'+(j!=0?'_s':'');
		        ld._layers[2].onmouseout = function(){Tooltip.hide();};
		        ld._layers[2].onmousemove = function(){Tooltip.move();};
		        Listener.add(ld._layers[2],"mouseover",Tooltip.showSpellByReference,Tooltip,[this._primarySpells[i][j]]);
	        	
		        
		        this._spellDivs[i][j] = ld;
		        
	        	primSpellGrid._cells[j][0].appendChild(ld._layers[0]);
	        	primSpellGrid._cells[j][1].appendChild( this._primaryNames[i][j]);
	        }
	        div.appendChild(primSpellGrid._node);
	        this._selectNodes[i].appendChild(div);
	
	        div = document.createElement("div");
	        div.className = 'talent_select_description';
	        div.appendChild(document.createTextNode(TextIO.parse(serialized[i][1],null).join(" ")));
	        this._selectNodes[i].appendChild(div);
	        
	        this._selectNodes[i].className = 'talent_select_div';
	        this._treeNodes[i].appendChild(this._selectNodes[i]);
        }
        layoutGrid._cells[0][i].appendChild(this._treeNodes[i]);
    }
    this._distributionDiv.className = 'talent_link_div';
    containerGrid._cells[0][0].appendChild(layoutGrid._node);
    this._switchLink = document.createElement("a");
	this._switchLink.innerHTML = locale['ViewTalentTrees'];
	this._switchLink.className = 'talent_switch_link';
    Listener.add(this._switchLink, "click", this._onSwitchView, this, [i]);
    switchNodeDiv = document.createElement("div");
    switchNodeDiv.className = 'text_align_center';
    switchNodeDiv.appendChild(this._switchLink);
    containerGrid._cells[0][0].appendChild(switchNodeDiv);
    containerGrid._cells[0][0].appendChild(this._distributionDiv);
    this._node.appendChild(containerGrid._node);
    
    this._selectTree(-1);
    this.update();
}
//
//	Properties
//
Talents.prototype._talentIcons = null;
Talents.prototype._treeGrids = null;
Talents.prototype._talents = [];
Talents.prototype._talentsById = null;
Talents.prototype._isPet = false;
Talents.prototype._petId = 0;
Talents.prototype._id = 0;

Talents.prototype._trees = 3;
Talents.prototype._rows = 7;
Talents.prototype._cols = 4;
Talents.prototype._minLevel = 10;
Talents.prototype._pointsPerLevel = 5;
Talents.prototype._levelsPerPoint = 1;
Talents.prototype._handler =null; 
Talents.prototype._level = -1;
Talents.prototype._distribution = null;
Talents.prototype._serialized = null;

Talents.prototype._treeIconsSrc = null;
Talents.prototype._treeNames = [];
Talents.prototype._treeIcons = null;
Talents.prototype._treeSpents = [];
Talents.prototype._selectedTree = -1;
Talents.prototype._viewSummaries = true;

Talents.prototype._condensedDistribution = null;
Talents.prototype._compressedDistribution = "";
// nodes
Talents.prototype._node = null;
Talents.prototype._treeNameLinks = null;
Talents.prototype._treeSpentSpan = null;
Talents.prototype._spentSpan = null;
Talents.prototype._resetAllLink = null;
Talents.prototype._resetTreeLinks = null;
Talents.prototype._distributionDiv = null;
Talents.prototype._remainingPoints = null;
Talents.prototype._requiredLevel = null;
Talents.prototype._classLink = null;
Talents.prototype._selectNodes = null;
Talents.prototype._treeNodes = null;
Talents.prototype._switchLink = null;
Talents.prototype._titleStack = null;
Talents.prototype._spellDivs = null;
Talents.prototype._specLinks = null;
Talents.prototype._primaryNames = null;

Talents.prototype._onSelectTreeHandler = null;

Talents.prototype._primarySpells = null;
Talents.prototype._masterySpells = null;
// 
Talents.prototype._itoh = null;
//
//	Event handler
//
/**
 * @private
 * @param {number} h
 * @param {number} i
 * @param {number} j 
 */
Talents.prototype._onMouseOver = function(h, i, j){
	this._talentIcons[h][i][j]._highlight.className = 'talent_highlight_div_hover';
    Tooltip.showTalent(this, h, i, j, this._talentIcons[h][i][j]._eventDiv);
};
/**
 * @private
 * @param {number} h
 * @param {number} i
 * @param {number} j 
 */
Talents.prototype._onMouseOut = function(h, i, j){
	this._talentIcons[h][i][j]._highlight.className = 'talent_highlight_div';
    Tooltip.hide();
};
/**
 * @private
 * @param {number} tree
 */
Talents.prototype._onResetTree = function(tree){
    this._resetTree(tree,false);
    this.update();
    this._updateSpent();
    if (this._handler) {
    	this._handler.notify([]);
    }
};
/**
 * @private
 */
Talents.prototype._onReset = function(){
	this._reset( false );
};
/**
 * @private
 * @param tree
 */
Talents.prototype._onSelectTree = function( tree ){
	if( this._selectedTree != -1 ) {
		return;
	}
	this._selectTree(tree);
	this.update();
};
/**
 * @private
 */
Talents.prototype._onSwitchView = function() {
	if( this._viewSummaries ) {
		this._showSelectNode(false);
	}
	else {
		this._showSelectNode(true);
	}
};
/**
 * @private
 * @param {boolean} active
 */
Talents.prototype._activateTreeNameLinks = function( active ) {
	for( var i=0; i < this._trees; i++ ) {
		if ( active ) {
			this._treeNameLinks[i].className = 'talent_tree_name_link';
			this._specLinks[i].className = 'talent_select_link';
		}
		else {
			this._treeNameLinks[i].className = 'talent_tree_name_link_inactive';
			this._specLinks[i].className = 'talent_select_link_inactive';
		}	
	}
};
/**
 * @private
 * @param {number} tree
 */
Talents.prototype._selectTree = function(tree) {
	for( var i = 0; i < this._trees; i++ ) {
		this._treeNodes[i].style.borderColor = ( i == tree ? '#FFCC00' : '' );
		this._treeGrids[i]._node.style.backgroundImage = ( i == tree ? 'url(images/talents/talent_tree_glow.png)' : '');
		this._resetTreeLinks[i].style.visibility = ( tree == -1 ? 'hidden' : 'visible');
		this._treeSpentSpan[i].style.visibility = ( tree == -1 ? 'hidden' : 'visible');
		//this._selectNodes[i].className = i == tree || tree == -1 ? "talent_select_div" : "talent_select_div_inactive";
		for( var j=0; j<this._primarySpells[i].length; j++ ) {
			this._spellDivs[i][j]._layers[0].style.backgroundImage = 'url(images/icons/'+(tree==-1||i==tree?"":"g/")+(j==0?'half':'small')+'/'+this._primarySpells[i][j]._icon+'.png)';
			this._spellDivs[i][j]._layers[1].style.backgroundImage = 'url(images/icon_border'+(j==0?'_smaller':'_smallest')+(tree==-1||i==tree?"":"_g")+'.png)';
			this._primaryNames[i][j].className = 'ts_primary_name'+( tree == i || tree == -1 ? "" : "_g");
		}
	}
	this._selectedTree = tree;
	if( tree == -1 ) {
		this._showSelectNode(true);
		this._titleStack.show(0);
	}
	else{
		this._showSelectNode(false);
		this._titleStack.show(1);
	}
	this._showSelectNode( tree == -1 );
    this._activateTreeNameLinks( tree == -1 );
	this._reset(true);
	
	if( this._onSelectTreeHandler ) {
		this._onSelectTreeHandler.notify([ tree ]);
	}
};
/**
 * @private
 * @param {boolean} show
 */
Talents.prototype._showSelectNode = function( show ) {
	for( var i = 0 ; i < this._selectNodes.length; i++ ) {
		this._selectNodes[i].style.display = (show ? "block" : "none");
	}

	this._viewSummaries = show;
	this._switchLink.innerHTML = ( show ? locale['ViewTalentTrees'] : locale['ViewSummaries'] );
};
/**
 * @private
 * @returns {number}
 */
Talents.prototype._getRemainingPoints = function() { 
	if (this._level < this._minLevel) {
	    return 0;
	}
	else {
	    return Math.floor( this._getPoints() - this._getSpentPoints() );
	}
};
/**
 * @private
 * @returns {number}
 */
Talents.prototype._getPoints = function() {
    if (this._level < this._minLevel) {
        return 0;
    }
    else if( this._isPet ){
        return Math.floor((this._level - this._minLevel) / this._levelsPerPoint + 1);
    } else {
    	return 1 + Math.min( 35, ( this._level - 9 ) >> 1  ) + Math.max( 0, this._level - 80 );
    }
};
/**
 * @private
 * @returns {number}
 */
Talents.prototype._getRequiredLevel = function() {
	var spent = this._getSpentPoints();
	
	if( spent == 0 ) {
		return 0;
	} else {
		return 10 + Math.max( 0, Math.min( 71, ( spent - 1 ) * 2 - 1 )) + Math.max( 0, spent - 37 );
	}
};
/**
 * @private
 * @returns {number}
 */
Talents.prototype._getSpentPoints = function() {
	var spent = 0;
	for( var i = 0 ; i < this._trees; i++ ) {
		spent += this._treeSpents[i];
	}
	return spent;
};
/**
 * @private
 */
Talents.prototype._updateAll = function () {
	var h,i,j, spent, unavailable, closed, talent;
	
	for( h=0; h<this._trees; h++ ) {
		spent = 0;
		for( i=0; i<this._rows; i++ ) {
			for( j=0; j<this._cols; j++ ) {
				talent = this._talents[h][i][j];
	            if (talent != null) {
	                spent += talent._spent;
	            } 
			}
		}
	    this._treeSpents[h] = spent;
	}
	
	closed = this._getRemainingPoints() <= 0;
	for( h=0; h<this._trees; h++ ) {
		spent = 0;
		unavailable = this._selectedTree == -1 || h != this._selectedTree && this._treeSpents[this._selectedTree] < 31;
		//
		this._treeNodes[h].style.backgroundImage = 'url(images/talents/bg/'+( unavailable ? 'g/' : '' )+(1<<(this._id-1))+'_'+h+'.jpg)';
		for( i=0; i<this._rows; i++ ) {
			for( j=0; j<this._cols; j++ ) {
				talent = this._talents[h][i][j];
	            if (talent != null) {
	            	//	if there is a talent at the tree/row/col
	            	talent = this._talents[h][i][j];
	                if (talent != null) {
	                	//  update icons
	                	this._talentIcons[h][i][j].update( 
	                			closed||unavailable, 
	                			talent.areRequiredTalentsSet() && spent >= (i * this._pointsPerTier) && !closed && !unavailable
	                	);
	                    //	update arrows
	                	for( var k=0; k<TALENT_REQ_ID_COUNT; k++ ) {
	                		if( talent._requiredTalents[k] ) {
	                			this._createArrow(h, i, j, talent._requiredTalents[k] );
	                		}
	                	}
	                    spent += talent._spent;
	                }  
	            } 
			}
		}
	}
};
/**
 * @private
 */
Talents.prototype._updateSpent = function (){
    var url = "";
    //
    this._updateDistribution();
    this._spentSpan.innerHTML = this._getSpentPoints() + "/" + this._getPoints();
    this._treeSpentSpan[0].innerHTML = this._treeSpents[0];
    this._treeSpentSpan[1].innerHTML = this._treeSpents[1];
    this._treeSpentSpan[2].innerHTML = this._treeSpents[2];
    if( this._isPet ) {
    	url = "?p=" + this._classLink[Math.log(this._id) / Math.LN2] + this._compressedDistribution + "&pid=" + this._petId;
    }
    else {
        url = "?t=" + this._classLink[Math.log(this._id) / Math.LN2] + this._compressedDistribution;	
    }
    this._distributionDiv.innerHTML = "<a class='talent_link' target='_blank' href='" + url + "'>http://chardev.org/" + url + "</a><br/>";
    url = "http://www.wowarmory.com/talent-calc.xml?" + (this._isPet ? "pid=" + this._petId : "cid=" + (Math.log(this._id) / Math.LN2 + 1)) + "&tal=" + this._condensedDistribution.join('');
    if (!this._isPet) {
        this._distributionDiv.innerHTML += "<a class='talent_link' target='_blank' href='" + url + "'>http://www.wowarmory.com/</a>";
    }
    if (!this._handler) {
    	var requiredLevel = this._getRequiredLevel();
        this._requiredLevel.innerHTML = TextIO.sprintf1(locale['Required_Level'], "<span class='ts_level'>" + (requiredLevel == 0 ? "-" : requiredLevel + "") + "</span>" );
    }
    this._remainingPoints.innerHTML = TextIO.sprintf1(locale['Remaining_Points'], "<span class='ts_remaining'>"+this._getRemainingPoints()+"</span>");
};
/**
 * @private
 * @param {number} tree
 * @param {number} row
 * @param {number} col
 * @param {number} modifier
 * @returns {boolean}
 */
Talents.prototype._modify = function (tree, row, col, modifier){
    Tooltip.hide();
    if (
    	this._selectedTree != -1 &&
    	this._talents[tree][row][col] != null &&
    	this._talents[tree][row][col]._spent + modifier <= this._talents[tree][row][col]._ranks &&
    	this._talents[tree][row][col]._spent + modifier >= 0 &&
    	this._getRemainingPoints() - modifier >= 0 &&
    	this._treeSpents[tree] >= this._pointsPerTier * row &&
    	( this._treeSpents[this._selectedTree] >= 31 || tree == this._selectedTree ) &&
    	( this._selectedTree != tree || this._treeSpents[tree] + modifier >= 31 || ( this._getSpentPoints() == this._treeSpents[tree] ))
    	
    )
    {
        this._talents[tree][row][col]._spent += modifier;
        this._treeSpents[tree] += modifier;
        
        if ( this._testTree(tree)) {
        	this._updateAll();
        }
        else {
            this._talents[tree][row][col]._spent -= modifier;
            this._treeSpents[tree] -= modifier;
        }
        this._updateSpent();
        if (this._handler) {
        	this._handler.notify([]);
        }
    }
    Tooltip.showTalent(this, tree, row, col, this._talentIcons[tree][row][col]._eventDiv);
    return false;
};
/**
 * @private
 * @param {Array} serialized_talent
 * @param {number} treeIndex
 */
Talents.prototype._createTalent = function(serialized_talent,treeIndex){
    var h = treeIndex;
    var i = serialized_talent[1];
    var j = serialized_talent[2];
    
    if( this._talents[h][i][j] ) {
    	// skipp talent if there is already one for this row/col
    	return;
    }
    //
    //	set talent
    //
    var tmp = new Talent(serialized_talent);
    if (this._isPet && !tmp.isAvailable(this._petId, this._id)) {
        return;
    }
    this._talents[h][i][j] = tmp;
    this._talentsById[tmp._id] = tmp;
    // clear grid cell
    // talent icon
    tmp = new TalentIcon( this._talents[h][i][j] );
    tmp._node.className = 'talent_border';
    
    Listener.add(tmp._eventDiv, "click", this._modify, this, [h, i, j, 1]);
    Listener.add(tmp._eventDiv, "contextmenu", this._modify, this, [h, i, j, -1]);
    Listener.add(tmp._eventDiv, "mouseover", this._onMouseOver, this, [h, i, j]);
    Listener.add(tmp._eventDiv, "mouseout", this._onMouseOut, this, [h, i, j]);

    Tools.setChild(this._treeGrids[h]._cells[i][j],tmp._node);
    this._talentIcons[h][i][j] = tmp;
};

/**
 * @private
 * @param {number} tree
 * @param {number} row
 * @param {number} col
 * @param {Talent} reqTalent
 */
Talents.prototype._createArrow = function(tree, row, col, reqTalent){
    var i, active = '', reqRow = reqTalent._row, reqCol = reqTalent._col;
    
    if (this._talents[tree][reqRow][reqCol].isFull()) {
        if (this._talents[tree][row][col].isFull() ||
        !this._talents[tree][row][col].isFull() &&
        this._getRemainingPoints() != 0 &&
        this._treeSpents[tree] >= this._pointsPerTier * row) {
            active = '_active';
        }
    }
    
    if (col != reqCol) {
    
        if (col < reqCol) {
        	this._talentIcons[tree][reqRow][reqCol]._arrows[0].className = 'talent_arrow_left_start' + active;
        }
        else {
        	this._talentIcons[tree][reqRow][reqCol]._arrows[2].className = 'talent_arrow_right_start' + active;
        }
        for (i = Math.min(col, reqCol) + 1; i < Math.max(col, reqCol); i++) {
        	this._treeGrids[tree]._cells[reqCol][i].className = 'talent_arrow_horizontal' + active;
        }
        
        if (row != reqRow) {
            if (col < reqCol) {
            	this._treeGrids[tree]._cells[reqRow][col].className = 'talent_arrow_left_corner' + active;
            }
            else {
            	this._treeGrids[tree]._cells[reqRow][col].className = 'talent_arrow_right_corner' + active;
            }
        }
        else {
            if (col < reqCol) {
                this._talentIcons[tree][row][col]._arrows[2].className = 'talent_arrow_left_end' + active;
            }
            else {
                this._talentIcons[tree][row][col]._arrows[0].className = 'talent_arrow_right_end' + active;
            }
        }
    }
    if (row != reqRow) {
        if (col == reqCol) {
             this._talentIcons[tree][reqRow][reqCol]._arrows[3].className = 'talent_arrow_vertical_start' + active;
        }
        for (i = Math.min(row, reqRow) + 1; i < Math.max(row, reqRow); i++) {
        	this._treeGrids[tree]._cells[i][col].className = 'talent_arrow_vertical' + active;
        }
        this._talentIcons[tree][row][col]._arrows[1].className = 'talent_arrow_vertical_end' + active;
    }
};
/**
 * @private
 * @param {number} tree
 * @param {boolean} overrideSelectedTreeCheck
 */
Talents.prototype._resetTree = function(tree, overrideSelectedTreeCheck){
	if( !overrideSelectedTreeCheck && tree == this._selectedTree && this._getSpentPoints() != this._treeSpents[tree] ) {
		this._reset(true);
	}
	else {
	    for (var i = 0; i < this._rows; i++) {
	        for (var j = 0; j < this._cols; j++) {
	            if (this._talents[tree][i][j] != null) {
	                this._talents[tree][i][j]._spent = 0;
	            }
	        }
	    }
	}
};

/**
 * @private
 * @param {number} tree
 * @returns {boolean}
 */
Talents.prototype._testTree = function(tree){
    var spent = 0;
    var i, j, talent;
    var color = new Array();
    
    //	loop through rows
    for (i = 0; i < this._rows; i++) {
        color[i] = new Array();
        //	loop through cols
        for (j = 0; j < this._cols; j++) {
            color[i][j] = -1;
            talent = this._talents[tree][i][j];
            //	if there is a talent at the tree/row/col and points are spent
            if ( talent != null && talent._spent > 0 ) {
                //	if there aren't enough points spent in the tree and there are points spent in a talent
                if (spent < (i * this._pointsPerTier)) {
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
                spent += talent._spent;
            }
        }
    }
    return true;
};

/**
 * @private
 * @param {number} d
 * @returns {string}
 */
Talents.prototype._intToCompressed = function(d){
    d = (d > 9 ? (d > 35 ? (65 + d - 36) : (97 + d - 10)) : (48 + d));
    return unescape("%" + this._itoh[Math.floor(d / 16)] + this._itoh[Math.floor(d % 16)]);
};

/**
 * @private
 */
Talents.prototype._updateDistribution =  function(){
    this._distribution = new Array();
    this._condensedDistribution = new Array();
    this._compressedDistribution = "";
    
    var n = 0;
    var o = 0;
    var d = -1;
    var r = "";
    var h, i, j;
    for (h = 0; h < this._trees; h++) {
        for (i = 0; i < this._rows; i++) {
            for (j = 0; j < this._cols; j++) {
                if (this._talents[h][i][j] != null) {
                    this._condensedDistribution[n++] = this._talents[h][i][j]._spent;
                    this._distribution[o++] = this._talents[h][i][j]._spent;
                    if (d == -1) {
                        d = this._talents[h][i][j]._spent;
                    }
                    else {
                        d = d * 6 + this._talents[h][i][j]._spent;
                        r += this._intToCompressed(d);
                        d = -1;
                    }
                }
                else {
                    this._distribution[o++] = 0;
                }
            }
        }
    }
    if (d != -1) {
        r += this._intToCompressed(d * 6);
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
            this._compressedDistribution += ',' + this._intToCompressed(n);
        }
        else {
            this._compressedDistribution += r.charAt(i);
        }
    }
};
/**
 * @private
 * @param {boolean} retainTreeSelection
 */
Talents.prototype._reset = function( retainTreeSelection ){
    for (var i = 0; i < this._trees; i++) {
        this._resetTree(i,true);
    }
    if( !retainTreeSelection ) {
    	this._selectTree(-1);
    }
    this.update();
    this._updateSpent();
    if (this._handler) {
    	this._handler.notify([]);
    }
};
/**
 * @public
 */
Talents.prototype.update = function(){
	this._updateAll();
    this._updateSpent();
};
/**
 * @public
 * @param {Auras} auras
 * @returns {Array}
 */
Talents.prototype.getActiveSpells = function(auras){
    var tmp = null;
    var h,i,j;
    for ( h = 0; h < this._trees; h++) {
        for ( i = 0; i < this._rows; i++) {
            for ( j = 0; j < this._cols; j++) {
                if (this._talents[h][i][j] != null) {
                    tmp = this._talents[h][i][j].getSpell();
                    if (tmp != null) {
                        auras.add(tmp);
                    }
                }
            }
        }
        
        if( h == this._selectedTree ) {
	        for(i=0;i<this._primarySpells[h].length;i++) {
	        	auras.add(this._primarySpells[h][i]);
	        }
	        for(i=0;i<this._masterySpells[h].length;i++) {
	        	auras.add(this._masterySpells[h][i]);
	        }
        }
    }
};
/**
 * @param {Array} distribution
 * @param {boolean} condensed
 */
Talents.prototype.setDistribution = function(distribution, condensed){
    var n = 0, v;
    var h,i,j;
    var s = [], x, xt;
    for ( h = 0; h < this._trees; h++) {
    	s[h] = 0;
        for ( i = 0; i < this._rows; i++) {
            for ( j = 0; j < this._cols; j++) {
                if (this._talents[h][i][j] != null) {
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
    
    for( i=0; i<this._trees; i++ ) {
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
    	this._selectTree(xt);
    }
    
    n=0;
    for ( h = 0; h < this._trees; h++) {
        for ( i = 0; i < this._rows; i++) {
            for ( j = 0; j < this._cols; j++) {
                if (this._talents[h][i][j] != null) {
                	v = parseInt(distribution[n], 10);
                    this._talents[h][i][j]._spent = isNaN(v) ? 0 : v;
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
	
    this.update();
};
/**
 * @public
 * @param {boolean} condensed
 * @return {Array}
 */
Talents.prototype.getDistribution = function(condensed){
    return (condensed ? this._condensedDistribution : this._distribution);
};
/**
 * @public
 * @return {string}
 */
Talents.prototype.getShortDistribution = function(){
    return "(" + this._treeSpents[0] + "/" + this._treeSpents[1] + "/" + this._treeSpents[2] + ")";
};
/**
 * @public
 * @param {number} level
 */
Talents.prototype.setLevel = function(level){
    this._level = level;
    if (this._getRemainingPoints() < 0) {
        this._reset( true );
    }
    this.update();
};
/**
 * @public
 * @param {Handler} handler
 */
Talents.prototype.setOnChangeHandler = function( handler ){
    this._handler = handler;
};
/**
 * @public
 * @param petId
 * @param name
 * @param icon
 */
Talents.prototype.setPetId = function(petId, name, icon){
//	TODO Pet Talent Planner
//    this._petId = petId;
//    this._reset();
//    for (var i = 1; i < this._serialized.length; i++) {
//        this._createTalent(this._serialized[i]);
//    }
//    this._treeNameLinks[0].innerHTML = name;
//    this._treeIcons[0].src = 'images/icons/medium/' + icon + '.png';
//    this.update();
};
/**
 * @public
 * @returns {Element}
 */
Talents.prototype.getNode = function() {
	return this._node;
};
Talents.prototype.setOnSelectedTreeChangeHandler = function( handler ) {
	this._onSelectTreeHandler = handler;
};