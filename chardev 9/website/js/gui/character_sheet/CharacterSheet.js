/**
 * @constructor
 */
function CharacterSheet() {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('race_select', ['race_id']);
	this.eventMgr.registerEvent('class_select', ['class_id']);
	this.eventMgr.registerEvent('level_select', ['level']);
	this.eventMgr.registerEvent('profession_select', ['index','id']);
	this.eventMgr.registerEvent('profession_level_select', ['index','level']);
	this.eventMgr.registerEvent('stat_tooltip_show', ['group','index','node']);
	this.eventMgr.registerEvent('stat_tooltip_hide', ['group','index','node']);
	this.eventMgr.registerEvent('item_right_click', ['slot','index']);
	this.eventMgr.registerEvent('item_left_click', ['slot','index']);
	this.eventMgr.registerEvent('item_tooltip_show', ['slot','index']);
	this.eventMgr.registerEvent('item_tooltip_hide', ['slot','index']);
	this.eventMgr.registerEvent('remove_buff', ['id']);
	this.eventMgr.registerEvent('add_stack', ['id']);
	this.eventMgr.registerEvent('select_shape', ['shape_id']);
	this.eventMgr.registerEvent('select_presence', ['presence_id']);
	//new CharacterSheetEventManager(); 
	var grid, i, j, div, div2, slotGrid, wpnGrid, profDiv;
	//
	this.raceClassSelector = new RaceClassSelector( this );
	this.shapeSelector = new ShapeSelector(); 
	this.shapeSelector.addPropagator('select_shape', this.eventMgr);
	this.presenceSelector = new PresenceSelector();
	this.presenceSelector.addPopagator('select_presence', this.eventMgr);
	this.buffBar = new BuffBar();
	this.buffBar.eventMgr.addPropagator('remove_buff', this.eventMgr);
	this.buffBar.eventMgr.addPropagator('add_stack', this.eventMgr);
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	// BASIC LAYOUT
	//
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//
	this.node = document.createElement('div');
	div = document.createElement("div");
	div.className = "cs_level_parent";
	this.level = document.createElement("select"); 
	this.level.className = 'single_select';
	div.appendChild(this.level);
	Listener.add(this.level,"change",this.__onLevelChange,this,null);
	//
	//
	div2 = document.createElement("div");
	div2.className = "cs_t"; 	
	div2.appendChild(this.raceClassSelector.node);
	div2.appendChild( this.buffBar.node );
	div2.appendChild(div);
	Tools.clearBoth(div2);
	div2.appendChild(this.shapeSelector.node);
	div2.appendChild(this.presenceSelector.node);
	//
	this.node.appendChild(div2);
	//
	//
	grid = new StaticGrid(1,2); 
	grid.setVerticalAlign(StaticGrid.VALIGN_TOP);
	grid.node.className = "cs_m_grid";
	grid.cols[0].width = "180px";
	grid.cols[1].width = "160px";
	//
	div = document.createElement("div");
	div.className = "cs_m_grid_t";
	div.appendChild(grid.node);
	profDiv = DOM.createAt(div, 'div', {'class': 'cs_prof_p'});
	//
	this.node.appendChild(div);
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
	this.slots = [];
	for( i = 0; i < INV_ITEMS; i++ ) {
		this.slots[i] = new ItemSlot( this, i );
	}
	for( i = 0; i < 8; i++ ) {
		slotGrid.cells[i][0].appendChild(this.slots[i].node);
		slotGrid.cells[i][1].appendChild(this.slots[i+8].node);
	}
	div.appendChild(slotGrid.node);
	//
	wpnGrid = new StaticGrid(1,3);
	div.appendChild(wpnGrid.node);
	wpnGrid.cells[0][0].appendChild(this.slots[16].node);
	wpnGrid.cells[0][1].appendChild(this.slots[17].node);
	wpnGrid.cells[0][2].appendChild(this.slots[18].node);
	
	wpnGrid.node.className = "cs_w_grid";
	
	grid.cells[0][0].appendChild(div);
	//
	//#########################################################################
	//
	//	STATS
	//
	//#########################################################################
	//
	this.stats = [];
	this.statCollapsables = [];
	
	for( i=0; i<locale['CS_StatGroups'].length; i++ ) {
		this.statCollapsables[i] = new Collapsable();  
		if( i == 6 ) {
			this.statCollapsables[i].toggle();
		}
		this.stats[i] = [];
		for( j=0; j<locale['CS_Stats'][i].length; j++ ) {
			var stat = new Stat(i,j);
			stat.addPropagator('stat_tooltip_show', this.eventMgr);
			stat.addPropagator('stat_tooltip_hide', this.eventMgr);
			this.stats[i][j] = stat;
			this.statCollapsables[i].content.appendChild(this.stats[i][j].node);
		}
		this.statCollapsables[i].node.className = 'group cs_st_p';
		this.statCollapsables[i].content.className = 'cs_st_c';
		
		div = DOM.createAt( this.statCollapsables[i].header, 'div', {'class': 'stat_title_p'} );
		DOM.createAt( div, 'a', {'class': 'stat_title', 'text': locale['CS_StatGroups'][i], 'href': 'javascript:'} );
		
		grid.cells[0][1].appendChild(this.statCollapsables[i].node);
	}
	
	this.professionsParent = new StaticGrid(2,2);
	this.professionsParent.node.className = 'cs_prof_grid';
	
	this.professionSelects = [null,null];
	
	this.professionLevelSelects = [null,null];
	
	this.__buildProfessionSelects();
	
	for( i=0; i<2; i++ ) {
		this.professionsParent.cells[i][0].appendChild(this.professionSelects[i].node);
		this.professionsParent.cells[i][1].appendChild(this.professionLevelSelects[i].node);
	}
	DOM.createAt(profDiv, 'div', {'class': 'cs_prof_title', 'text': locale['Professions']});
	profDiv.appendChild(this.professionsParent.node);
	
	this.slots[18].setVisibility(false);
	
	this.showStatGroups(-1);
}


CharacterSheet.CS_COLLAPSE_MASKS = {
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

CharacterSheet.prototype = {
	eventMgr: null,
	node: null,
	character: null,
	buffBar: null,
	healthBar: null,
	energyBar: null,
	slots: [],
	stats: [],
	selectedSlot: -1,
	statCollapsables: [],
	level: null,
	shapeSelector: null,
	presenceSelector: null,

	professionsParent: null,
	professionSelects: [],
	professionLevelSelects: [],
	
	addObserver: function( observer ) {
		this.eventMgr.addObserver(observer);
	},
	removeObserver: function( observer ) {
		this.eventMgr.removeObserver(observer);
	},
	__buildProfessionSelects: function() {
		var opts, i;
		for( var professionIndex = 0; professionIndex<2; professionIndex++ ) {
			opts = [[0,""]]; 
			for( i=0; i<PROFESSIONS.length; i++ ) {
				var id = PROFESSIONS[i];
				opts.push([id,locale['PrimaryProfessions'][id]]);
			}
			
			this.professionSelects[professionIndex] = new SingleSelect([]);
			this.professionSelects[professionIndex].node.className = "single_select cs_prof_sel";
			Listener.add(
				this.professionSelects[professionIndex].node,
				"change",
				this.__onProfessionChange,
				this,
				[professionIndex]
			);
			
			this.professionLevelSelects[professionIndex] = new SingleSelect([]);
			this.professionLevelSelects[professionIndex].node.className = "single_select cs_prof_level_sel";
			Listener.add(this.professionLevelSelects[professionIndex].node,"change",this.__onProfessionLevelChange,this,[professionIndex]);
		}
	},
	__onProfessionChange: function( professionIndex ) {
		this.eventMgr.fire('profession_select', {
			'index': professionIndex,
			'id': parseInt(this.professionSelects[professionIndex].getValue(), 10)
		});
	},
	__onProfessionLevelChange: function( professionIndex ) {

		this.eventMgr.fire('profession_level_select', {
			'index': professionIndex,
			'level': parseInt(this.professionLevelSelects[professionIndex].getValue(), 10)
		});
	},
	__onLevelChange: function() {
		this.eventMgr.fire('level_select', {
			'level': parseInt( this.level.options[this.level.selectedIndex].value, 10 )
		});
	},
	/**
	 * @param {number} level
	 */
	updateLevel: function( level ) {
		for( var i=0; i < this.level.options.length; i++ ) {
			if( parseInt(this.level.options[i].value, 10) == level ) {
				this.level.options[i].selected = "true";
				return;
			}
		}
	},
	/**
	 * @param {number} minLevel
	 * @param {number} maxLevel
	 */
	updateLevelSelector: function( minLevel, maxLevel ) {
		var o;
		
		Tools.removeChilds(this.level);
		for( var i=minLevel; i<=maxLevel; i++ ) {
			o = document.createElement("option");
			o.value = i;
			o.innerHTML = i;
			this.level.appendChild(o);
		}
	},
	showStatGroups: function ( chrClassId ) {
		var mask = 0;
		if( chrClassId > 0 && CharacterSheet.CS_COLLAPSE_MASKS[chrClassId] ) {
			mask = CharacterSheet.CS_COLLAPSE_MASKS[chrClassId];
		}
		mask|=1<<6;
		for( var i=0; i<this.statCollapsables.length; i++ ) {
			if( (1<<i&mask)!=0 ) {
				this.statCollapsables[i].collapse();
			}
			else {
				this.statCollapsables[i].expand();
			}
		}
	},
	updateProfessions: function( skilledProfessions, level ) {
		var opts, i, ml;
		for( var professionIndex = 0; professionIndex<2; professionIndex++ ) {
			
			var prof = skilledProfessions[professionIndex];
			
			opts = [[0,""]]; 
			for( i=0; i<PROFESSIONS.length; i++ ) {
				var id = PROFESSIONS[i];
				if( GameInfo.getMaximumProfessionTier(PROFESSIONS[i], level) < 0 ) {
					continue;
				}
				//
				// mutual exclusion
				if( 
					professionIndex == 0 && skilledProfessions[1]!=null && skilledProfessions[1].id == id || 
					professionIndex == 1 && skilledProfessions[0]!=null && skilledProfessions[0].id == id ) {
					continue;
				}
				opts.push([id,locale['PrimaryProfessions'][id]]);
			}
			this.professionSelects[professionIndex].set(opts);
			
			if( prof != null ) {
				
				this.professionSelects[professionIndex].select( prof.id.toString() );
			
				this.professionLevelSelects[professionIndex].node.style.display = "block";

				ml = GameInfo.getMaximumProfessionLevel( prof.id, level);
				opts = [];
				for( i= 1; i<=ml; i++ ) {
					opts.push([i,i]);
				}
				this.professionLevelSelects[professionIndex].set(opts);
				this.professionLevelSelects[professionIndex].select( prof.level.toString() );
			}
			else {
				this.professionLevelSelects[professionIndex].node.style.display = "none";
			}
		}
	},
	selectSlot: function( slot ) {
		if ( slot != -1 ) {
			this.slots[slot].select();
		}
		if ( this.selectedSlot != -1 && this.selectedSlot != slot ) {
			this.slots[this.selectedSlot].deselect();
		}
		this.selectedSlot = slot;
	},
	selectedClass: function( classId ) {
		this.eventMgr.fire('class_select', {'class_id': classId});
	},
	selectedRace: function( raceId ) {
		this.eventMgr.fire('race_select', {'race_id': raceId});
	},
	showSlotTooltip: function( slot, index ) {
		this.slots[slot].showTooltip(index);
	},
	hideSlotTooltip: function( slot, index ) {
		this.slots[slot].hideTooltip(index);
	}
};
/**
 * @constructor
 * @param {number} id
 * @param {number} level
 */
function SkilledPrimaryProfession( id, level ) {
	this.id = id;
	this.level = level;
}
SkilledPrimaryProfession.prototype = {
	id: 0, level: 0
};