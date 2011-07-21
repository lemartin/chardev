/**
 * @extends {List}
 * @constructor
 * @returns {StatWeightsList}
 */
function StatWeightsList() {
	List.call(this,PL_ORDER_TIME);
	this._filter = new StatWeightsFilter();
	this._filter.setFilterHandler(new Handler(this.filter, this));
	this._filter.addHiddenFilter('chrclass');

	Tools.setChild(this._filterCollapsable._content,this._filter._node);
	
	this.onUpdate = null;
	this._content.style.display = "none";
}
StatWeightsList.prototype = new List(PL_ORDER_TIME);

StatWeightsList.prototype._base = null;
StatWeightsList.prototype._orderDirection = IL_DESC;
StatWeightsList.prototype._onContextMenuHandler = null;

StatWeightsList.prototype.update = function( ) {
	var url = "php/interface/user/get_stat_weights.php" + 
	TextIO.queryString({
		'a': this._filter.buildArgumentString(),
		'o': this._order+"."+(this._orderDirection==IL_ASC?'asc':'desc')+";",
		'p': this._page
	});
	this._requestedURL = url;
	Ajax.get(url, this._updateHandler, [url]);
	this.showLoading();
};

StatWeightsList.prototype._deserialize = function( data ) {
	var i;
	var grid;
	var column = 0, row, a;
	if( data.length < 2 ) {
		this._content.innerHTML = "<div class='il_nothing'>Nothing Found</div>";
	}
	else {
		grid = new StaticGrid(
				1 ,
				1
			);
		grid._node.cellSpacing = "0px";
		grid._node.className = 'swl_content_grid';
		//
		this.updatePages( Math.ceil( data[0][0]/data[0][1] ) );
		
		/*
		grid._cols[column].width = "30px";
		column++;
		
		grid._cols[column].width = "26px";
		column++;
		
		grid._cols[column].width = "26px";
		column++;
		
		grid._cols[column].width = (920 - 30 - 26 -26) +"px";
		column++;
		*/
		
		for( i=0; i<column; i++ ) {
			grid._cells[0][i].className = "il_sort_c";
		}
		
		for( i = 1; i < data.length; i++ ) {
			column = 0;


			
			row = grid.addRow();
			a = document.createElement("a");
			a.className = 'swl_entry'+( i != data.length - 1 ? ' swl_entry_b' : '' );
			a.innerHTML = data[i][1] + "<br /><span class='swl_creator'>" + data[i][5] + "</span><br /><span class='swl_entry_desc'>" + ( data[i][2] ? data[i][2] : "No Description" ) + "</span>";
			a.oncontextmenu = function() {return false;};
			Listener.add(a, 'click', this._onClick, this, [data[i][3]]);
			Listener.add(a, 'contextmenu', this._onContextMenu, this, [data[i][0],data[i][1]]);
			
			grid._cells[row][0].appendChild(a);
		}

		Tools.setChild(this._content,grid._node);
	}
};

StatWeightsList.prototype._onClick = function( weights ) {
	if( this._onclickHandler ) {
		this._onclickHandler.notify([ weights ]);
	}
};

StatWeightsList.prototype.setOnContextMenuHandler = function( handler ) {
	this._onContextMenuHandler = handler;
};

StatWeightsList.prototype._onContextMenu = function( userId, name ) {
	if( this._onContextMenuHandler ) {
		this._onContextMenuHandler.notify([ userId, name ]);
	}
};