/**
 * @constructor
 * @param {Object} categories
 */
function ProfileListGui( categories) {
	ListGui.call(this, categories );
	this.eventMgr.registerEvent('delete', ['profile_id', 'desc']);
}
ProfileListGui.prototype = new ListGui(null);
ProfileListGui.prototype.newStaticFilter = function( filter ) {
	var v = filter.variable;
	if ( v == 'ismine' ) {
		this.addInput( filter, 0 );
	}
};
ProfileListGui.prototype.deserialize = function( data ) {
	var i;
	var a;
	var grid;
	var column = 0;
	var cellStyle;

	grid = new StaticGrid(
			1 ,
			4
		);
	grid.node.cellSpacing = "0px";
	grid.node.width = "100%";
	grid.node.className = "pl_content_t";
	grid.rows[0].className = "pl_header";
	//
	
	// skip icon
	//grid.cols[column].width = "26px";
	//column++;
	
	grid.cols[column].width = "30px";
	column++;
	
	grid.cols[column].width = "28px";
	column++;
	
	grid.cols[column].width = "28px";
	column++;
	
	grid.cols[column].width = (960 - 30 - 2*28) +"px";
	column++;
	
	
	for( i=0; i<column; i++ ) {
		grid.cells[0][i].className = "pl_header_cell";
	}
	
	for( i = 1; i < data.length; i++ ) {
		column = 0;

		cellStyle = "pl_cell "+ ( i%2 == 0 ? "pl_cell_bg0" : "pl_cell_bg1");

		
		var row = grid.addJoinedRow();
		var name = data[i][2] ? data[i][2] : "Profile #"+data[i][0];

		grid.cells[row][0].className = cellStyle + " pl_inline_header";
		
		a = DOM.createAt( grid.cells[row][0], 'a', { 'href': '?profile='+data[i][0], 'class': 'pl_link', 'text': name } );
		
		if( data[i][3] ) {
			a.onmouseout = function(){Tooltip.hide();};
			a.onmousemove = function(){Tooltip.move();};
			Listener.add( a, "mouseover", Tooltip.show, Tooltip, ["<div class='pl_desc_tt'>" + data[i][3]+ "</div>"] );
		}
		grid.cells[row][0].appendChild(a);
		
		DOM.createAt( grid.cells[row][0] , 'span', {'class': 'pl_ih_info', 'text': "&nbsp;Created: "+data[i][7]+"&nbsp;"} );
		
//			if( this.onclickHandler ) {
//				a = document.createElement("a");
//				a.innerHTML = "[Import]";
//				a.className = "pl_import_link";
////				Listener.add( a, "click", function(serializedProfile){ this.onclickHandler.notify([serializedProfile]); }, this, [data[i][0]]);
//				grid.cells[row][0].appendChild(a);
//			}
//			
//			if( g_settings.userId == data[i][1] ) {
//				a = document.createElement("a");
//				a.innerHTML = "[x]";
//				a.className = 'pl_delete_link';
////				Listener.add( a, "click", this.onProfileDelete,this, [data[i][0]]);
//				grid.cells[row][0].appendChild(a);
//			}

		row = grid.addRow();
		
		grid.cells[row][column].className = cellStyle + " pl_level_p";
		grid.cells[row][column++].innerHTML = data[i][6];
		
		grid.cells[row][column].className = cellStyle;
		grid.cells[row][column++].innerHTML = "<div style='background-image:url(images/site/race_class/small/chr_race_" + data[i][4] + ".png)' class='pl_icon' ></div>";
		
		grid.cells[row][column].className = cellStyle;
		grid.cells[row][column++].innerHTML = "<div style='background-image:url(images/site/race_class/small/" + data[i][5] + ".png)' class='pl_icon' ></div>";
		
		grid.cells[row][column].className = cellStyle;
		
		if( g_settings.userId == data[i][1] ) {
			var delLink = DOM.createAt( grid.cells[row][column], 'a', {'class': 'close pl_delete_link', 'href': 'javascript:;'} );
			Listener.add(delLink, 'click', function(id, name){
				this.eventMgr.fire('delete', {'profile_id': id, 'desc': name });
			}, this, [data[i][0], name]);
		}
	}
	this.setContent(grid.node);
};