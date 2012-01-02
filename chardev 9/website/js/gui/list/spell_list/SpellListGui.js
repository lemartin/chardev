/**
 * @constructor
 * @param {Object} categories
 */
function SpellListGui( categories ) {
	ListGui.call( this, categories );
}

SpellListGui.prototype = new ListGui(null);

SpellListGui.prototype.deserialize = function( data ) {
	var column = 0, i, cellStyle;
	
	var grid = new StaticGrid(
			data.length,
			3
		);
	grid.node.cellSpacing = "0px";
	grid.node.width = "100%";
	grid.node.className = "li_content_t";
	grid.rows[0].className = "il_header";
	
	grid.cols[0].width = "24px";
	//
	
	//skip icon
	column++;
	
	
	grid.cells[0][column++].appendChild(this.getSortLink('Name',SpellList.ORDER_NAME));
	grid.cells[0][column++].appendChild(this.getSortLink('Req. Level',SpellList.ORDER_ENCHANT_CHR_LEVEL));
	
	for( i=0; i<column; i++ ) {
		grid.cells[0][i].className = "il_header_cell";
	}
	
	for( i=1; i < data.length; i++ ) {
		column = 0;
		var tmp = new Spell(data[i]);
		SpellCache.set(tmp);
		
		grid.rows[i].className = 'il_row'+(i%2);
		
		cellStyle = "il_cell "+ ( i%2 == 0 ? "il_cell_bg0" : "il_cell_bg1");
		
		var a = document.createElement("a");
		a.className = 'il_link';
		a.innerHTML = tmp.name;
//		a.onmouseout = function(){Tooltip.hidePreview();};
//		a.onmousemove = function(){Tooltip.move();};
		
//		if( this.type = SSpellList.ENCHANT_LIST ) {
//			Listener.add( a, 'mouseover', Tooltip.showEnchantSpell, Tooltip, [tmp.id] );
//		}
//		else {
//			Listener.add( a, 'mouseover', Tooltip.showSpell, Tooltip, [tmp.id] );
//		}
		

		grid.cells[i][column].className = cellStyle;
		grid.cells[i][column++].innerHTML = "<div style='background-image:url(images/icons/small/" + tmp.icon + ".png)' class='il_icon' ></div>";

		grid.cells[i][column].className = cellStyle;
		grid.cells[i][column++].appendChild(a);
		
		var reqChrLevel = "None";
		for( var j=0; j<tmp.effects.length; j++ ) {
			if(  tmp.effects[j] && tmp.effects[j].aura == 53 && tmp.effects[j].secondaryEffect != null ) {
				reqChrLevel = tmp.effects[j].secondaryEffect.requiredCharacterLevel;
				break;
			}
		}
		grid.cells[i][column].className = cellStyle;
		grid.cells[i][column++].innerHTML = reqChrLevel;
		
		Listener.add(a, 'mouseover', this.eventMgr.fire, this.eventMgr, ['show_tooltip',{'entity': tmp}]);
		Listener.add(a, 'mouseout', this.eventMgr.fire, this.eventMgr, ['hide_tooltip',{}]);
		Listener.add(a, 'mousemove', this.eventMgr.fire, this.eventMgr, ['move_tooltip',{}]);
		Listener.add(a, 'click', this.eventMgr.fire, this.eventMgr, ['click',{'entity': tmp}]);
		
//		if( this.onclickHandler ) {
//			Listener.add( a, "click", function(id){ this.onclickHandler.notify([id]); }, this, [tmp.id]);
//		}
//		else {
//			a.href = '?spell='+tmp.id;
//		}
	}
	this.setContent(grid.node);
};

SpellListGui.prototype.newStaticFilter = function( filter ) {
	
	var v = filter.variable;
	
	if ( v == 'name' ) {
		this.addInput( filter, 0 );
	}
	else {
		throw Error("Unknown static filter "+filter.variable+"!");
	}
};