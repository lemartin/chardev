/**
 * @constructor
 */
function ReforgeInterface() {
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('reforge', ['reduce', 'add']);
	this.eventMgr.registerEvent('reforge_all', ['reforge_array']);
	this.eventMgr.registerEvent('reforge_preview', ['reforge_array']);
	this.eventMgr.registerEvent('reforge_item_preview', ['reduce', 'add']);
	this.eventMgr.registerEvent('restore', []);
	this.eventMgr.registerEvent('restore_all', []);
	this.eventMgr.registerEvent('remove_reforge_preview', []);
	this.eventMgr.registerEvent('remove_reforge_item_preview', []);
	this.eventMgr.registerEvent('wowreforge_export', []);
	//
	this.node = Dom.create('div',{});
	//
	// Operations
	this.ops = new BatchOperations();
	Dom.addClass(this.ops.node, 'ra_group');
	Dom.append( this.node, this.ops.node);
	// 
	// WoWReforge Import
	var wowRefNode = Dom.create('form', {'action': 'javascript:;'});
	
	this.wowReforgeURL = Dom.createAt( wowRefNode, 'input', {'class': 'input rf_wowreforgeurl'});
	var submitBtn = Dom.createAt( wowRefNode, 'input', {'type': 'submit', 'text': locale['RF_ImportWoWReforge'], 'class': 'button button_light'});
	this.ops.addComplex('wowreforge_import', locale['RF_WoWReforgeImport'], wowRefNode, locale['RF_WoWReforgeImportHelp']);
	
	Listener.add(wowRefNode, 'submit', this.__wowReforgeImport, this, null);
	Listener.add(submitBtn, 'mouseover', function() {
		var refArr = this.__parseWoWReforgeInput();
		if( refArr != null ) {
			this.eventMgr.fire('reforge_preview', {'reforge_array': refArr});
		}
	}, this, null);
	Listener.add(submitBtn, 'mouseout', function() {
		this.eventMgr.fire('remove_reforge_preview');
	}, this, null);
	//
	// Export
	var wowRedExpNode = Dom.create('div',{});
	var exportBtn = Dom.createAt( wowRedExpNode, 'input', {'type': 'submit', 'text': locale['RF_ExportWoWReforge'], 'class': 'button button_light'});
	this.ops.addComplex('wowreforge_import', locale['RF_WoWReforgeExport'], wowRedExpNode, locale['RF_WoWReforgeExportHelp']);
	Listener.add(exportBtn, 'click', this.__wowReforgeExport, this, null);
	//
	// Restore
	var restoreOp = this.ops.addSimple('restore_all', locale['RF_RestoreAll'] , new Handler(function(){
		this.eventMgr.fire('restore_all');
	}, this));
	Listener.add(restoreOp['node'], 'mouseover', function() {
		this.eventMgr.fire('reforge_preview', {'reforge_array': []});
	}, this, null);
	Listener.add(restoreOp['node'], 'mouseout', function() {
		this.eventMgr.fire('remove_reforge_preview');
	}, this, null);
	//
	this.content = Dom.createAt( this.node, 'div',{});
}

ReforgeInterface.prototype = {
	eventMgr: null,
	node: null, content: null, wowReforgeURL: null,
	ops: null,
	/**
	 * @param {EquippedItem} itm
	 */
	update: function( itm ) {
		var av = [];
		var re = [];
		var i, j, v, k, cls, a, row, div, span;

		Dom.truncate( this.content );
		
		if( ! itm ) {
			return;
		}
		else {
			div = Dom.create('div', {'class': 'rf_title_c'});
			Dom.createAt(div, 'span', {'text': 'Reforge ', 'class': 'rf_title'});
			span = Dom.createAt(div, 'a', {'text': itm.name, 'class': 'item_quality_'+itm.quality+' rf_item_name', 'href': 'javascript:'});
			ChardevHtml.addTooltip(span, itm.getTooltip());
		}
		
		for( i = 0; i<REFORGABLE_STATS.length; i++ ) {
			k = REFORGABLE_STATS[i];
			v = itm.getStatValue(k);
			if( v > 0 ) {
				av.push([k,v]);
			}
			else {
				re.push(k);
			}
		}
			
		 if( ! itm.isReforgable()) {
			Dom.set( this.content, div );
			Dom.createAt(this.content, 'div', {'text': 'This items is not reforgable!', 'class': 'rf_error'});
			return;
		}
		 else if( av.length == 0 ) {
			Dom.set( this.content, div );
			Dom.createAt(this.content, 'div', {'text': 'This items has no reforgable stats!', 'class': 'rf_error'});
			return;
		}
		
		var sg = new StaticGrid( 0, re.length + 2 );
		sg.node.className = 'rf_grid';
		
		row = sg.addJoinedRow();	

		Dom.append( sg.cells[row][0], div);
		
		row = sg.addRow();	
			
		for( i = 0; i<re.length; i++ ) {
			sg.cells[row][2+i].innerHTML = locale['ItemStatNamesShort'][re[i]];
			sg.cells[row][2+i].className = 'rf_to_stat';
		}
		
		for( i = 0; i< av.length; i++ ) {
			
			row = sg.addRow();
			
			cls = ( i%2 == 0 ? "row_bg1" : "row_bg2" ); 
			
			sg.cells[row][0].innerHTML = locale['ItemStatNames'][av[i][0]];
			sg.cells[row][0].className = cls + ' rf_from_stat';
			sg.cells[row][1].innerHTML = av[i][1];
			sg.cells[row][1].className = cls + ' rf_from_value';
			
			if( i ==  av.length - 1 ) {
				Dom.addClass(sg.cells[row][0], 'rf_from_stat_bottom');
				Dom.addClass(sg.cells[row][1], 'rf_from_value_bottom');
			}
			
			for( j = 0; j < re.length; j++ ) {
				
				div = Dom.create('div', {'class': cls + ' rf_cell'});
				
				if( i == 0 ) {
					Dom.addClass(div, 'rf_cell_top');
				}
				if( i ==  av.length - 1 ) {
					Dom.addClass(div, 'rf_cell_bottom');
				}
				if( j == 0 ) {
					Dom.addClass(div, 'rf_cell_left');
				}
				if( j ==  re.length - 1 ) {
					Dom.addClass(div, 'rf_cell_right');
				}
				
				if( itm.addedStat == re[j] && itm.reducedStat == av[i][0] ) {
					sg.cells[row][1].className += ' red';
					
					a = Dom.createAt( div, 'a', {'class': 'rf_to_value rf_to_active', 'text': itm.addedStatValue, 'href': 'javascript:'});
					
					Listener.add( a, 'click', this.__restore, this, []);
					Listener.add( a, 'mouseover', this.__mouseover, this, [-1,-1]);
					Listener.add( a, 'mouseout', this.__mouseout, this, []);
					
					ChardevHtml.addTooltip(a, "<div class='rf_tt_c'>Click to restore <span class='green'>"+itm.addedStatValue+"</span> <span class='green'>"+locale['ItemStatNames'][av[i][0]]+"</span> from <span class='red'>"+locale['ItemStatNames'][re[j]]+"</span></div>");
				}
				else {
					
					v = av[i][1];
					if( itm.reducedStat == av[i][0] ) {
						v = itm.reducedStatValue;
					}
					v = Math.floor(v * REFORGE_COEFFICIENT);
					
					a = Dom.createAt( div, 'a', {'class': 'rf_to_value', 'text': v, 'href': 'javascript:'});
					Listener.add( a, 'click', this.__reforge, this, [av[i][0],re[j]]);
					Listener.add( a, 'mouseover', this.__mouseover, this, [av[i][0],re[j]]);
					Listener.add( a, 'mouseout', this.__mouseout, this, []);
					
					ChardevHtml.addTooltip(a, "<div class='rf_tt_c'>Click to reforge <span class='green'>"+v+"</span> <span class='red'>"+locale['ItemStatNames'][av[i][0]]+"</span> into <span class='green'>"+locale['ItemStatNames'][re[j]]+"</span></div>");
				}
				Dom.set(sg.cells[row][2+j], div);
			}
			
		}
		
		i = sg.addJoinedRow();
		sg.cells[i][0].className = 'rf_b';
		a = Dom.createAt(sg.cells[i][0], 'a', {'class': 'button button_light link_button', 'href': 'javascript:', 'text': 'Restore'});
		Listener.add( a, 'click', this.__restore, this, []);
		
		Dom.append(this.content, sg.node);
	},
	__reforge: function( reduce, add ) {
		this.eventMgr.fire('reforge', {'reduce': reduce, 'add': add});
	},
	__restore: function() {
		this.eventMgr.fire('restore',{});
	},
	__mouseout: function() {
		this.eventMgr.fire('remove_reforge_item_preview',{});
	},
	__mouseover: function( reduce, add ) {
		this.eventMgr.fire('reforge_item_preview', {'reduce': reduce, 'add': add});
	},
	__wowReforgeImport: function() {
		var refArr = this.__parseWoWReforgeInput();
		if( refArr != null ) {
			this.eventMgr.fire('reforge_all', {'reforge_array': refArr});
		}
	},
	__parseWoWReforgeInput: function() {
		var v = Dom.getValue(this.wowReforgeURL);
		if( !v ) {
			return null;
		}
		
		var match = v.match(/reforge=((?:\d|-){34})/i);
		
		if( ! match[1] ) {
			Tooltip.showError(TextIO.sprintf1(locale['RF_WoWReforge_UnableToParse'],v));
			return null;
		}
		
		v = match[1];
		
		var refArr = [];
		for( var i = 0; i < 17; i++ ) {
			if( v[i*2] == '-' || v[i*2+1] == '-' ) {
				continue;
			}
			
			refArr[ WOWREFORGE_SLOTS_TO_CHARDEV_SLOTS[i] ] = [
				WOWREFORGE_TO_REFORGABLE_STATS[ parseInt(v[i*2], 10)  ],
				WOWREFORGE_TO_REFORGABLE_STATS[ parseInt(v[i*2+1], 10)]
			];
		}
		
		return refArr;
	},
	__wowReforgeExport: function() {
		this.eventMgr.fire('wowreforge_export',{});
	}
};