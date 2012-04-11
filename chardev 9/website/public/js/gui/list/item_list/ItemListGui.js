/**
 * @constructor
 * @param {Object} categories
 */
function ItemListGui( categories ) {
	ListGui.call(this, categories );

	this.propagateParent = DOM.createAt(this.filterCollapsable.content, 'div', {'class': 'il_prop'});
	this.propagateCheckbox = DOM.createAt(this.propagateParent, 'input', {'type': 'checkbox', 'class': 'il_prop_check', 'checked': true});
	DOM.createAt(this.propagateParent, 'span', {'text': 'Use custom filters for all slots', 'class': 'il_prop_note'});
}
ItemListGui.prototype = new ListGui(null);
ItemListGui.prototype.staticLinks = false;
ItemListGui.prototype.dpsAndDelay = false;
ItemListGui.prototype.propagateCheckbox = null;
ItemListGui.prototype.propagateParent = null;

ItemListGui.prototype.setProperty = function(property, value) {
	if( property == 'showDpsAndDelay' ) {
		this.dpsAndDelay = value;
	}
	else if( property == 'showStaticLinks' ) {
		this.staticLinks = value;
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
//	if( this.isStatWeightBasedScoreShown() ) {
//		grid.cells[0][column++].appendChild(this.getSortLink('Score',ItemList.ORDER_SCORE));
//	}

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
		
//		if( tmp.quality == 1 ) {
//			var wf = document.createElement("span");
//			wf.innerHTML = tmp.name;
//			wf.className = 'il_link_white_fix';
//			a.appendChild(wf);
//		}
//		else {
			a.innerHTML = tmp.name;
//		}
		
		cellStyle = "il_cell "+ ( i%2 == 0 ? "il_cell_bg0" : "il_cell_bg1");
		
//		a.onmouseout = function(){Tooltip.hidePreview();};
//		a.onmousemove = function(){Tooltip.move();};
//		
//		if( this.listType == IL_ITEM_LIST ) {
//			Listener.add( a, 'mouseover', Tooltip.showItem, Tooltip, [tmp.id] );
//		}
//		else {
//			Listener.add( a, 'mouseover', Tooltip.showGem, Tooltip, [tmp.id] );
//		}
//
//		if( this.onclickHandler ) {
//			Listener.add( a, "click", function(itm){ this.onclickHandler.notify([itm]); }, this, [tmp.clone()]);
//		}
//		else {
		
			Listener.add(a, 'mouseover', this.eventMgr.fire, this.eventMgr, ['show_tooltip',{'entity': tmp}]);
			Listener.add(a, 'mouseout', this.eventMgr.fire, this.eventMgr, ['hide_tooltip',{}]);
			Listener.add(a, 'mousemove', this.eventMgr.fire, this.eventMgr, ['move_tooltip',{}]);
			Listener.add(a, 'click', this.eventMgr.fire, this.eventMgr, ['click',{'entity': tmp}]);
			
			if( this.staticLinks ) {
				a.href = '?item='+tmp.id;
			}
		
//		}
		grid.cells[i][column].className = cellStyle;
		grid.cells[i][column++].innerHTML = "<div style='background-image:url(images/icons/small/" + tmp.icon + ".png)' class='il_icon' ></div>";

		grid.cells[i][column].className = cellStyle;
		
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

		grid.cells[i][column].className = cellStyle + (this.dpsAndDelay ? " li_unimp_col" : " li_imp_col");;
		grid.cells[i][column++].innerHTML = ( tmp.inventorySlot ? locale["a_slot"][tmp.inventorySlot] : "" );

		grid.cells[i][column].className = cellStyle + (this.dpsAndDelay ? " li_unimp_col" : " li_imp_col");;
		grid.cells[i][column++].innerHTML = tmp.itemSubClassName[0];
		
		
//		if( this.isStatWeightBasedScoreShown() ) {
//			
//			grid.cells[i][column].className = "il_imp_col";
//			grid.cells[i][column].innerHTML = data[i][1];
//			
//			if( this.compareItem != null && cmpItemScore > 0 ) {
//				var ratio = data[i][1] / cmpItemScore;
//				if( ratio > 1 ) {
//					grid.cells[i][column].style.color = "#" + ( ratio > 2 ? "FF" : Math.floor(0xFF - 0xC0 * ( ratio - 1 )).toString(16)) + "FF00";
//				}
//				else if( ratio < 1) {
//					grid.cells[i][column].style.color = "#FF" + ( ratio > 2 ? "FF" : Math.floor(0xFF - 0xC0 * ( 1 - ratio )).toString(16)) + "00";
//				}
//			}
//			column++;
//		}
		
//		grid.cells[i][column].className = "il_cell il_unimp_col";
//		grid.cells[i][column++].innerHTML = "<a href='http://wowhead.com/item="+tmp.id+"' target='_blank'></a>";
	}
	this.setContent(grid.node);
};