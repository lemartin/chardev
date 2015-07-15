/**
 * @constructor
 * @param {Object} categories
 */
function SetListGui( categories ) {
	ListGui.call(this, categories );
	this.eventMgr.registerEvent('itemset_click', ['items']);
}
SetListGui.prototype = new ListGui(null);

SetListGui.prototype.newStaticFilter = function( filter ) {
	
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
	else {
		throw Error("Unknown static filter "+filter.variable+"!");
	}
};

SetListGui.prototype.deserialize = function( data ) {
	var i;
	var a, icon;
	var grid, itm;
	
	grid = new StaticGrid( data.length, 4 );
	grid.node.cellSpacing = "0px";
	grid.node.width = "100%";
	grid.node.className = "li_content_t";
	grid.rows[0].className = "il_header";
	
	grid.cells[0][0].appendChild(this.getSortLink('Name','name'));
	grid.cells[0][2].appendChild(this.getSortLink('iLvl','level'));
	grid.cells[0][3].appendChild(this.getSortLink('Req','reqlvl'));

	for( i=0; i<4; i++ ) {
		grid.cells[0][i].className = "il_header_cell";
	}
	
	for( i = 1; i < data.length; i++ ) {
		
		a = Dom.createAt( grid.cells[i][0], 'a', { 'href': 'javascript:;', 'text': data[i][1], 'color': g_color[data[i][6]], 'class': 'il_imp_col', 'title': 'Click to equip all items'});
		
		var itms = [];
		
		for( var j = 0; j < data[i][8].length; j++ ) {
			if( ! data[i][8][j] ) {
				continue;
			}
			itm = new Item(data[i][8][j]); ItemCache.set(itm);
			itms.push(itm);

			icon = document.createElement("div");
			icon.className = 'il_icon sl_icon';
			icon.style.backgroundImage = "url(/images/icons/small/" + itm.icon + ".png)";
			icon.style.cssFloat = "left";
			icon.style.marginLeft = "2px";
			icon.style.marginTop = "1px";

			Listener.add(icon, 'mouseover', this.eventMgr.fire, this.eventMgr, ['show_tooltip',{'entity': itm}]);
			Listener.add(icon, 'mouseout', this.eventMgr.fire, this.eventMgr, ['hide_tooltip',{}]);
			Listener.add(icon, 'mousemove', this.eventMgr.fire, this.eventMgr, ['move_tooltip',{}]);
			Listener.add(icon, 'click', this.eventMgr.fire, this.eventMgr, ['click',{'entity': itm}]);

			grid.cells[i][1].appendChild( icon ); 
		}
		
		Listener.add(a, 'click', this.eventMgr.fire, this.eventMgr, ['itemset_click', { 'items': itms}]);
		
		grid.cells[i][2].innerHTML = data[i][2] != data[i][3] ? data[i][2] + "-" + data[i][3] : data[i][2];
		grid.cells[i][2].className = "il_unimp_col";

		grid.cells[i][3].innerHTML = data[i][4] != data[i][5] ? data[i][4] + "-" + data[i][5] : data[i][4];
		grid.cells[i][3].className = "il_unimp_col";
	}
	this.setContent(grid.node);
};