/**
 * @constructor
 * @param {Object} categories
 */
function ItemListGui( categories ) {
	ListGui.call(this, categories );

	this.propagateParent = Dom.createAt(this.filterCollapsable.content, 'div', {'class': 'il_prop'});
	this.propagateCheckbox = Dom.createAt(this.propagateParent, 'input', {'type': 'checkbox', 'class': 'il_prop_check', 'checked': true});
	Dom.createAt(this.propagateParent, 'span', {'text': 'Use custom filters for all slots', 'class': 'il_prop_note'});
}
ItemListGui.prototype = new ListGui(null);
ItemListGui.prototype.staticLink = "";
ItemListGui.prototype.dpsAndDelay = false;
ItemListGui.prototype.propagateCheckbox = null;
ItemListGui.prototype.propagateParent = null;

ItemListGui.prototype.setProperty = function(property, value) {
	if( property == 'showDpsAndDelay' ) {
		this.dpsAndDelay = value;
	}
	else if( property == 'setStaticLink' ) {
		this.staticLink = value;
	}
	else {
		throw new Error("Unknown property "+property+" with value "+value+"!");
	}
};
ItemListGui.prototype.newStaticFilter = function( filter ) {
	
	var v = filter.variable;
	
	if ( v == 'name' ) {
		this.addInput( filter, 0 );
	}
	else if ( v == 'level' ) {
		this.addInput( filter, 1 );
	}
	else if ( v == 'reqlvl' ) {
		this.addInput( filter, 2 );
	}
	else if ( v == 'dps' ) {
		this.addInput( filter, 3 );
	}
	else if ( v == 'delay' ) {
		this.addInput( filter, 4 );
	}
	else if ( v == 'quality' ) {
		this.addSelect( filter, 0 );
	}
	else if ( v == 'slot' ) {
		this.addSelect(filter, 1);
	}
	else if ( v == 'subclass' ) {
		this.addSelect(filter, 2);
	}
	else {
		throw Error("Unknown static filter "+filter.variable+"!");
	}
};

ItemListGui.prototype.deserialize = function( data ) {
	var i;
	var tmp;
	var a, span;
	var grid;
	var column = 0;
	var cellStyle;
	
	grid = new StaticGrid(
			data.length,
			5 + ( this.dpsAndDelay ? 2 : 0 ) /* + ( this.isStatWeightBasedScoreShown() ? 1 : 0 ) */
		);
	grid.node.cellSpacing = "0px";
	grid.node.width = "100%";
	grid.node.className = "li_content_t";
	grid.rows[0].className = "il_header";
	
	grid.cols[0].width = "24px";
	
	// skip icon
	column++;
	grid.cells[0][column++].appendChild(this.getSortLink('Name',ItemList.ORDER_NAME));
	
	if( this.dpsAndDelay ) {
		grid.cells[0][column++].appendChild(this.getSortLink('DpS',ItemList.ORDER_DPS));
		grid.cells[0][column++].appendChild(this.getSortLink('Spd',ItemList.ORDER_SPEED));
	}
	
	grid.cells[0][column++].appendChild(this.getSortLink('iLvl',ItemList.ORDER_ILVL));
	grid.cells[0][column++].appendChild(this.getSortLink('Slot',ItemList.ORDER_SLOT));
	grid.cells[0][column++].appendChild(this.getSortLink('Type',ItemList.ORDER_TYPE));

	for( i=0; i<column; i++ ) {
		grid.cells[0][i].className = "il_header_cell";
	}
	
	for( i = 1; i < data.length; i++ ) {
		column = 0;
		tmp = new Item(data[i][0]);
		ItemCache.set(tmp);
		
		grid.rows[i].className = 'il_row'+(i%2); 
		
		a = document.createElement("a");
		a.className = 'il_link item_quality_'+tmp.quality;
		
		a.innerHTML = tmp.name;
		
		cellStyle = "il_cell "+ ( i%2 == 0 ? "il_cell_bg0" : "il_cell_bg1");
		
		Listener.add(a, 'mouseover', this.eventMgr.fire, this.eventMgr, ['show_tooltip',{'entity': tmp}]);
		Listener.add(a, 'mouseout', this.eventMgr.fire, this.eventMgr, ['hide_tooltip',{}]);
		Listener.add(a, 'mousemove', this.eventMgr.fire, this.eventMgr, ['move_tooltip',{}]);
		Listener.add(a, 'click', this.eventMgr.fire, this.eventMgr, ['click',{'entity': tmp}]);
		
		if( this.staticLink ) {
			a.href = TextIO.sprintf1(this.staticLink,TextIO.verboseUrl(tmp.id,tmp.name));
		}
		
		grid.cells[i][column].className = cellStyle;
		grid.cells[i][column++].innerHTML = "<div style='background-image:url(/images/icons/small/" + tmp.icon + ".png)' class='il_icon' ></div>";

		grid.cells[i][column].className = cellStyle + " il_link_p";
		
		grid.cells[i][column].appendChild(a);
		
		if( (tmp.typeMask & (1<<3)) != 0 )
		{
			span = document.createElement("sup");
			span.className = 'il_heroic';
			span.innerHTML = "H";
			grid.cells[i][column].appendChild(span);
		}
		column++;
		
		if( this.dpsAndDelay ) {
			grid.cells[i][column].className = cellStyle + " li_"+(tmp.typeMask2&512?"un":"")+"imp_col";
			grid.cells[i][column++].innerHTML = tmp.dps ? TextIO.getDPSFormatted(tmp) : "";
			grid.cells[i][column].className = cellStyle + " li_"+(tmp.typeMask2&512?"un":"")+"imp_col";
			grid.cells[i][column++].innerHTML = tmp.dps ? TextIO.getSpeedFormatted(tmp) : "";
		}
		grid.cells[i][column].className = cellStyle + " li_imp_col";
		grid.cells[i][column++].innerHTML = tmp.level;

		grid.cells[i][column].className = cellStyle + (this.dpsAndDelay ? " li_unimp_col" : " li_imp_col");
		grid.cells[i][column++].innerHTML = ( tmp.inventorySlot ? locale["a_slot"][tmp.inventorySlot] : "" );

		grid.cells[i][column].className = cellStyle + (this.dpsAndDelay ? " li_unimp_col" : " li_imp_col");
		grid.cells[i][column++].innerHTML = tmp.itemSubClassName[0];
		
	}
	this.setContent(grid.node);
};