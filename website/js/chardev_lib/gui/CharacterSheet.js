var CS_COLLAPSE_MASKS = {
	1:1<<3|1<<4,
	2:1<<3,
	3:1<<2|1<<4|1<<5,
	4:1<<3|1<<4|1<<5,
	5:1<<2|1<<3|1<<5,
	6:1<<3|1<<4,
	7:1<<3|1<<5,
	8:1<<2|1<<3|1<<5,
	9:1<<2|1<<3|1<<5,
	11:1<<3
};

/**
 * @constructor
 * @param {Character} character
 * @returns {CharacterSheet}
 */
function CharacterSheet(character) {
	var grid, i, j, div, div2, slotGrid, wpnGrid;
	//
	this._character = character;
	this._raceClassSelector = new RaceClassSelector( character );
	this._shapeSelector = new ShapeSelector( character );
	this._presenceSelector = new PresenceSelector();
	this._buffBar = new BuffBar( character );
	// basic layout
	// level
	this._node = document.createElement('div');
	div = document.createElement("div");
	div.className = "cs_level_parent";
	this._level = document.createElement("select"); 
	this._level.className = 'single_select';
	div.appendChild(this._level);
	Listener.add(this._level,"change",this._onLevelChange,this,null);
	
	this.updateLevelSelector( character._chrClass ? character._chrClass._id : 0 );
	this.updateLevel( character._level );
	
	
	
	div2 = document.createElement("div");
	div2.className = "cs_t"; 	
	div2.appendChild(this._raceClassSelector._node);
	div2.appendChild( this._buffBar._node );
	div2.appendChild(div);
	Tools.clearBoth(div2);
	div2.appendChild(this._shapeSelector._node);
	div2.appendChild(this._presenceSelector._node);
	
	this._node.appendChild(div2);
	
	/*
	 * this._node.appendChild( this._buffBar._node );
	 */
	grid = new StaticGrid(1,2); grid.setVerticalAlign(SG_VALIGN_TOP);
	div = document.createElement("div");
	div.className = "cs_m_grid_t";
	div.appendChild(grid._node);
	this._node.appendChild(div);
	grid._node.className = "cs_m_grid";
	grid._cols[0].width = "195px";
	grid._cols[1].width = "148px";
	//
	//#########################################################################
	//
	//	INVENTORY SLOTS
	//
	//#########################################################################
	//
	div = document.createElement("div");
	div.className= "cs_m_grid_sl";
	slotGrid = new StaticGrid(8,2);
	this._slots = [];
	for( i = 0; i < INV_ITEMS; i++ ) {
		this._slots[i] = new ItemSlot(i,character);
	}
	for( i = 0; i < 8; i++ ) {
		slotGrid._cells[i][0].style.paddingRight = "8px";
		slotGrid._cells[i][1].style.paddingLeft = "8px";
		slotGrid._cells[i][0].appendChild(this._slots[i]._node);
		slotGrid._cells[i][1].appendChild(this._slots[i+8]._node);
	}
	slotGrid._node.className = 'align_center';
	div.appendChild(slotGrid._node);
	//
	wpnGrid = new StaticGrid(1,3);
	div.appendChild(wpnGrid._node);
	wpnGrid._cells[0][0].appendChild(this._slots[16]._node);
	wpnGrid._cells[0][1].appendChild(this._slots[17]._node);
	wpnGrid._cells[0][2].appendChild(this._slots[18]._node);
	
	wpnGrid._node.className = "cs_w_grid";
	
	div2 = document.createElement("div");
	div2.className = "cs_m_grid_lb";
	div.appendChild(div2);
	grid._cells[0][0].appendChild(div);
	//
	//#########################################################################
	//
	//	STATS
	//
	//#########################################################################
	//
	this._stats = [];
	this._statCollapsables = [];
	for( i=0; i<locale['CS_StatGroups'].length; i++ ) {
		this._statCollapsables[i] = new Collapsable();  
		if( i == 6 ) {
			this._statCollapsables[i].toggle();
		}
		this._stats[i] = [];
		div = document.createElement('div');
		div.className = 'stat_title';
		div.appendChild(document.createTextNode(locale['CS_StatGroups'][i]));
		this._statCollapsables[i]._header.appendChild(div);
		for( j=0; j<locale['CS_Stats'][i].length; j++ ) {
			this._stats[i][j] = new Stat(character,i,j);
			this._statCollapsables[i]._content.appendChild(this._stats[i][j]._node);
		}

		div = document.createElement("div");
		div.className = "cs_st_t";
		grid._cells[0][1].appendChild(div);
		this._statCollapsables[i]._node.className = "cs_st_m";
		grid._cells[0][1].appendChild(this._statCollapsables[i]._node);
		div = document.createElement("div");
		div.className = "cs_st_b";
		grid._cells[0][1].appendChild(div);
		//FIXME why is this task here?
	}
	
	
	
	this._professionsParent = new StaticGrid(0,2);
	this._professionsParent._node.className = 'cs_prof_grid';
	this._professionsParent.addJoinedRow();
	this._professionsParent.addRow();
	this._professionsParent.addRow();
	
	this._professionsParent._cells[0][0].innerHTML = "<div class='cs_prof_title'>"+locale['Professions']+"</div>";
	
	this._professionSelects = [null,null];
	//this._professionTierSelects = [null,null];
	this._professionLevelSelects = [null,null];
	
	this._buildProfessionSelects();
	this.updateProfessions();
	
	for( i=0; i<2; i++ ) {
		this._professionsParent._cells[1+i][0].appendChild(this._professionSelects[i]._node);
		this._professionsParent._cells[1+i][1].appendChild(this._professionLevelSelects[i]._node);
	}
	grid._cells[0][0].appendChild(this._professionsParent._node);
	

	div = document.createElement("div");
	div.className = "cs_m_grid_b";
	this._node.appendChild(div);
	
	this._slots[18].setVisibility(false);
}

CharacterSheet.prototype._node = null;
CharacterSheet.prototype._character = null;
CharacterSheet.prototype._buffBar = null;
CharacterSheet.prototype._healthBar = null;
CharacterSheet.prototype._energyBar = null;
CharacterSheet.prototype._slots = [];
CharacterSheet.prototype._stats = [];
CharacterSheet.prototype._selectedSlot = -1;
CharacterSheet.prototype._statCollapsables = [];
CharacterSheet.prototype._level = null;
CharacterSheet.prototype._shapeSelector = null;
CharacterSheet.prototype._presenceSelector = null;

CharacterSheet.prototype._professionsParent = null;
CharacterSheet.prototype._professionSelects = [];
CharacterSheet.prototype._professionLevelSelects = [];

CharacterSheet.prototype.setItemSlotOnClickHandler = function( handler ) {
	for (var i = 0; i < this._slots.length; i++) {
		this._slots[i].setOnClickHandler( handler );
	}
};

CharacterSheet.prototype.selectSlot = function( slot ) {
	if ( slot != -1 ) {
		this._slots[slot].select();
	}
	if ( this._selectedSlot != -1 && this._selectedSlot != slot ) {
		this._slots[this._selectedSlot].unselect();
	}
	this._selectedSlot = slot;
};

CharacterSheet.prototype.updateProfessions = function( ) {
	var ps = [
		this._character._professions.length > 0 ? this._character._professions[0] : null,
	    this._character._professions.length > 1 ? this._character._professions[1] : null
	];
	var opts, i, ml;
	for( var professionIndex = 0; professionIndex<2; professionIndex++ ) {
		
		opts = [[0,""]]; 
		for( i=0; i<PROFESSIONS.length; i++ ) {
			var id = PROFESSIONS[i];
			if( GameInfo.getMaximumProfessionTier(PROFESSIONS[i], this._character._level) < 0 ) {
				continue;
			}
			if( professionIndex == 0 && ps[1] && ps[1]._id == id || professionIndex == 1 && ps[0] && ps[0]._id == id ) {
				continue;
			}
			opts.push([id,locale['PrimaryProfessions'][id]]);
		}
		this._professionSelects[professionIndex].set(opts);
		this._professionSelects[professionIndex].select( ps[professionIndex] ? ps[professionIndex]._id : 0 );
		
		if( ps[professionIndex] ) {
			var p = ps[professionIndex];
			this._professionLevelSelects[professionIndex]._node.style.display = "block";

			ml = GameInfo.getMaximumProfessionLevel(ps[professionIndex]._id, this._character._level);
			opts = [];
			for( i= 1; i<=ml; i++ ) {
				opts.push([i,i]);
			}
			this._professionLevelSelects[professionIndex].set(opts);
			this._professionLevelSelects[professionIndex].select(p._level);
		}
		else {
			this._professionLevelSelects[professionIndex]._node.style.display = "none";
		}
	}
};

CharacterSheet.prototype._onProfessionChange = function( professionIndex ) {
	this._character.setProfession(professionIndex,parseInt(this._professionSelects[professionIndex].getValue(), 10));
	this._character.calculateStats();
	this.updateProfessions();
};

CharacterSheet.prototype._onProfessionLevelChange = function( professionIndex ) {
	this._character._professions[professionIndex].setLevel(parseInt(this._professionLevelSelects[professionIndex].getValue(), 10));
	this._character.calculateStats();
	this.updateProfessions();
};

CharacterSheet.prototype._buildProfessionSelects = function( ) {
	var opts, i;
	for( var professionIndex = 0; professionIndex<2; professionIndex++ ) {
		opts = [[0,""]]; 
		for( i=0; i<PROFESSIONS.length; i++ ) {
			var id = PROFESSIONS[i];
			opts.push([id,locale['PrimaryProfessions'][id]]);
		}
		
		this._professionSelects[professionIndex] = new SingleSelect([]);
		this._professionSelects[professionIndex]._node.className = "single_select cs_prof_sel";
		Listener.add(this._professionSelects[professionIndex]._node,"change",this._onProfessionChange,this,[professionIndex]);
		
		this._professionLevelSelects[professionIndex] = new SingleSelect([]);
		this._professionLevelSelects[professionIndex]._node.className = "single_select cs_prof_level_sel";
		Listener.add(this._professionLevelSelects[professionIndex]._node,"change",this._onProfessionLevelChange,this,[professionIndex]);
	}
};

CharacterSheet.prototype.updateLevel = function( level ) {
	for( var i=0; i < this._level.options.length; i++ ) {
		if( parseInt(this._level.options[i].value, 10) == level ) {
			this._level.options[i].selected = "true";
			return;
		}
	}
};

CharacterSheet.prototype.updateLevelSelector = function( chrClassId ) {
	var o;
	var minLevel = chrClassId == DEATHKNIGHT ? 55 : 1 ;
	
	Tools.removeChilds(this._level);
	for( var i=minLevel; i<=MAX_LEVEL; i++ ) {
		o = document.createElement("option");
		o.value = i;
		o.innerHTML = i;
		this._level.appendChild(o);
	}
};

CharacterSheet.prototype.updateStats = function() {
	var i;
	var cCl = this._character._chrClass;
	
	this._stats[ST_GRP_GENERAL][1]._node.style.display = 
		cCl != null && GameInfo.hasMana( cCl._id, cCl._shapeForm ) ? "block" : "none";
	this._stats[ST_GRP_GENERAL][2]._node.style.display = 
		cCl != null && GameInfo.hasRage( cCl._id, cCl._shapeForm ) ? "block" : "none";
	this._stats[ST_GRP_GENERAL][3]._node.style.display = 
		cCl != null && GameInfo.hasEnergy( cCl._id, cCl._shapeForm ) ? "block" : "none";
	this._stats[ST_GRP_GENERAL][4]._node.style.display = 
		cCl != null && GameInfo.hasFocus( cCl._id, cCl._shapeForm ) ? "block" : "none";
	this._stats[ST_GRP_GENERAL][5]._node.style.display = 
		cCl != null && GameInfo.hasRunicPower( cCl._id, cCl._shapeForm ) ? "block" : "none";
	
	for( i=0; i<this._stats[ST_GRP_GENERAL].length; i++ ) {
		this._stats[ST_GRP_GENERAL][i].setValue( this._character._stats._general[i] );
	}
	for( i=0; i<this._stats[ST_GRP_ATTRIBUTES].length; i++ ) {
		this._stats[ST_GRP_ATTRIBUTES][i].setValue( this._character._stats._attributes[i] );
	}
	for( i=0; i<this._stats[ST_GRP_RESISTANCE].length; i++ ) {
		this._stats[ST_GRP_RESISTANCE][i].setValue( this._character._stats._resistance[i] );
	}
	for( i=0; i<this._stats[ST_GRP_SPELL].length; i++ ) {
		this._stats[ST_GRP_SPELL][i].setValue( this._character._stats._spell[i] );
	}
	for( i=0; i<this._stats[ST_GRP_DEFENSE].length; i++ ) {
		this._stats[ST_GRP_DEFENSE][i].setValue( this._character._stats._defense[i] );
	}
	for( i=0; i<this._stats[ST_GRP_MELEE].length; i++ ) {
		this._stats[ST_GRP_MELEE][i].setValue( this._character._stats._melee[i] );
	}
	for( i=0; i<this._stats[ST_GRP_RANGED].length; i++ ) {
		this._stats[ST_GRP_RANGED][i].setValue( this._character._stats._ranged[i] );
	}
};

CharacterSheet.prototype.updatePreviewStats = function( ) {
	var i;
	for( i=0; i<this._stats[ST_GRP_GENERAL].length; i++ ) {
		this._stats[ST_GRP_GENERAL][i].setCompareValue( this._character._previewStats._general[i] );
	}
	for( i=0; i<this._stats[ST_GRP_ATTRIBUTES].length; i++ ) {
		this._stats[ST_GRP_ATTRIBUTES][i].setCompareValue( this._character._previewStats._attributes[i] );
	}
	for( i=0; i<this._stats[ST_GRP_RESISTANCE].length; i++ ) {
		this._stats[ST_GRP_RESISTANCE][i].setCompareValue( this._character._previewStats._resistance[i] );
	}
	for( i=0; i<this._stats[ST_GRP_SPELL].length; i++ ) {
		this._stats[ST_GRP_SPELL][i].setCompareValue( this._character._previewStats._spell[i] );
	}
	for( i=0; i<this._stats[ST_GRP_DEFENSE].length; i++ ) {
		this._stats[ST_GRP_DEFENSE][i].setCompareValue( this._character._previewStats._defense[i] );
	}
	for( i=0; i<this._stats[ST_GRP_MELEE].length; i++ ) {
		this._stats[ST_GRP_MELEE][i].setCompareValue( this._character._previewStats._melee[i] );
	}
	for( i=0; i<this._stats[ST_GRP_RANGED].length; i++ ) {
		this._stats[ST_GRP_RANGED][i].setCompareValue( this._character._previewStats._ranged[i] );
	}
};

CharacterSheet.prototype.resetPreviewStats = function() {
	var j,i;
	for( j=0; j<this._stats.length; j++ ) {
		for( i=0; i<this._stats[j].length; i++ ) {
			this._stats[j][i].resetCompare();
		}
	}
};

CharacterSheet.prototype.showStatGroups = function ( chrClassId ) {
	var mask = 0;
	if( chrClassId > 0 && CS_COLLAPSE_MASKS[chrClassId] ) {
		mask = CS_COLLAPSE_MASKS[chrClassId];
	}
	mask|=1<<6;
	for( var i=0; i<this._statCollapsables.length; i++ ) {
		if( (1<<i&mask)!=0 ) {
			this._statCollapsables[i].collapse();
		}
		else {
			this._statCollapsables[i].expand();
		}
	}
};

CharacterSheet.prototype._onLevelChange = function() {
	this._character.setLevel( parseInt( this._level.options[this._level.selectedIndex].value, 10 ) );
};