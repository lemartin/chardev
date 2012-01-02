/** @const */var ISL_ORDER_SET_ID = 'setid';
/** @const */var ISL_ORDER_ILVL = 'ilvl';
/** @const */var ISL_ORDER_REQLVL = 'reqlvl';
/** @const */var ISL_ORDER_NAME = 'name';

/**
 * @constructor
 * @returns {SetList}
 */
function SetList() {
	List.call( this, ISL_ORDER_SET_ID );
	
	this._filter = new SetFilter();
	this._filter.setFilterHandler(new Handler(this.filter, this));
	Tools.setChild(this._filterCollapsable._content,this._filter._node);
	
	this._orderDirection = IL_DESC;

	this._filterCollapsable._node.style.display = 'block';
}

SetList.prototype = new List( ISL_ORDER_SET_ID );
SetList.prototype._isInitialised = false;

SetList.prototype.update = function() {
	
	var url = "php/interface/get_sets.php" 
		+ TextIO.queryString(this.getBaseArgumentObject());
	
	this._requestedURL = url;
	
	Ajax.get( url, this._updateHandler, [url] );
	
	this.showLoading();
};

SetList.prototype._deserialize = function( data ) {
	if( data.length < 2 ) {
		this._content.innerHTML = "<div class='il_nothing'>Nothing Found</div>";
		return;
	}
	
	var grid = new StaticGrid(
			data.length,
			4
	);
	var icon;
	grid._node.cellSpacing = "0px";
	grid._node.width = "100%";
	
	this.updatePages( Math.ceil( data[0][0]/data[0][1] ) );
	
	grid._cells[0][0].appendChild(this._getSortLink('Name',ISL_ORDER_NAME));
	grid._cells[0][2].appendChild(this._getSortLink('iLvl',ISL_ORDER_ILVL));
	grid._cells[0][3].appendChild(this._getSortLink('Req',ISL_ORDER_REQLVL));
	
	for( var i = 1; i < data.length; i++ ) {
		
		grid._rows[i].className = 'il_row'+(i%2);
		
		grid._cells[i][0].innerHTML = data[i][1];
		grid._cells[i][0].style.color = g_color[data[i][6]];
		grid._cells[i][0].className = "il_imp_col";
		grid._cells[i][0].style.height = "28px";
		
		for( var j = 0; j < data[i][8].length; j++ ) {
			if( data[i][8][j] == null ) {
				continue;
			}
			var itm = new Item(data[i][8][j]); g_items.set(itm);
			
			icon = document.createElement("div");
			icon.className = 'il_icon';
			icon.style.backgroundImage = "url(images/icons/small/" + itm._icon + ".png)";
			icon.style.cssFloat = "left";
			icon.style.marginLeft = "2px";
			icon.style.marginTop = "1px";
			
			Listener.add(icon, 'mouseover', Tooltip.showSetItemByReference, Tooltip, [itm]);
			icon.onmouseout = function(){Tooltip.hidePreview();};
			icon.onmousemove = function(){Tooltip.move();};
			
			Listener.addHandler(icon, 'click', this._onclickHandler, [itm]);
			
			grid._cells[i][1].appendChild( icon ); 
		}
		Tools.clearBoth(grid._cells[i][1]);
		
		grid._cells[i][2].innerHTML = data[i][2] != data[i][3] ? data[i][2] + "-" + data[i][3] : data[i][2];
		grid._cells[i][2].className = "il_unimp_col";
		grid._cells[i][2].style.textAlign = "left";
		
		grid._cells[i][3].innerHTML = data[i][4] != data[i][5] ? data[i][4] + "-" + data[i][5] : data[i][4];
		grid._cells[i][3].className = "il_unimp_col";
		grid._cells[i][3].style.textAlign = "left";
	}
	Tools.setChild(this._content,grid._node);
	this.showContent();
};