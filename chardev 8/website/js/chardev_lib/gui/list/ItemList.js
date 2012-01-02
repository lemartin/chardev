/**@const*/var IL_ORDER_NAME = 'name';
/**@const*/var IL_ORDER_ILVL = 'level';
/**@const*/var IL_ORDER_TYPE = 'itemclass';
/**@const*/var IL_ORDER_DPS =  'dps';
/**@const*/var IL_ORDER_SPEED = "delay";
/**@const*/var IL_ORDER_SLOT = "slot";
/**@const*/var IL_ORDER_SCORE = "weightedscore";

/**@const*/var IL_ITEM_LIST = 0;
/**@const*/var IL_GEM_LIST = 1;

/**
 * @extends {List}
 * @constructor
 * @param {number} listType
 * @returns {ItemList}
 */
function ItemList( listType ) {
	var div, showStatWeightInterface, span;
	//
	List.call(this,IL_ORDER_ILVL);
	//
	// events fired by item list
	this._eventManager.registerEvents([
		"show_stat_weights_interface"
	]);
	//
	this._listType = listType;
	this._filter = new ItemFilter(listType);
	this._filter.setFilterHandler(new Handler(this.filter, this));

	Tools.setChild(this._filterCollapsable._content,this._filter._node);
	//
	//
	//	STAT WEIGHTS
	//
	//
	this._showStatWeightBasedScoreCheck = document.createElement("input");
	this._showStatWeightBasedScoreCheck.type = "checkbox";
	Listener.add(this._showStatWeightBasedScoreCheck, 'click', this.update, this, null);
	showStatWeightInterface = document.createElement("input");
	showStatWeightInterface.value = "Manage Stat Weights";
	showStatWeightInterface.type = "button";
	Listener.add(showStatWeightInterface, 'click', this._eventManager.fire, this._eventManager, ['show_stat_weights_interface',null]);
	
	span = document.createElement("span");
	span.innerHTML = "show stat weight based score"; 
	span.className = 'il_swb';
	
	div = document.createElement("div");
	div.className = 'il_swb_p';
	div.appendChild(this._showStatWeightBasedScoreCheck);
	div.appendChild(span);
	div.appendChild(showStatWeightInterface);
	this._additionalContent.appendChild(div);
	
	this._content.style.display = "none";
	this._additionalContent.style.display = "none";
	this._orderDirection = IL_DESC;
}
ItemList.prototype = new List(IL_ORDER_ILVL);
ItemList.prototype._items = null;
ItemList.prototype._subClassMask = 0;
ItemList.prototype._class = 0;
ItemList.prototype._slotMask = 0;
ItemList.prototype._filter = null;
ItemList.prototype._showDps = false;
ItemList.prototype._updateHandler = null;
ItemList.prototype._statWeights = null;
ItemList.prototype._showStatWeightBasedScoreCheck = null;
ItemList.prototype._compareItem = null;
ItemList.prototype._listType = IL_ITEM_LIST;

ItemList.prototype.setStatWeights = function( weights ) {
	this._statWeights = weights;
};

ItemList.prototype.setSlotMask = function( inventorySlotMask ) {
	this._slotMask = inventorySlotMask;
	this._filter.setSlotMask(inventorySlotMask);
};

ItemList.prototype.setItemClass = function( itemClass, itemSubClassMask ) {
	this._class = itemClass;
	this._subClassMask = itemSubClassMask;
	this._filter.setItemClass(itemClass,itemSubClassMask);
};
/**
 * @param {Item} itm
 */
ItemList.prototype.setCompareItem = function( itm ) {
	this._compareItem = itm;
};

ItemList.prototype.set = function( args, flags, order ) 
{
	List.prototype.set.call( this, args, flags, order );
	this.update();
};

ItemList.prototype.isStatWeightBasedScoreShown = function() {
	return this._showStatWeightBasedScoreCheck.checked;
};

ItemList.prototype.update = function() {

	var url = "php/interface/get_items.php" + 
				TextIO.queryString({
					'a': this._filter.buildArgumentString(),
					'o': this._order+"."+(this._orderDirection==IL_ASC?'asc':'desc')+";",
					'p': this._page,
					'weights': ( this.isStatWeightBasedScoreShown() ? JSON.stringify(this._statWeights) : JSON.stringify(null) ) 
				});
	this._requestedURL = url;
	Ajax.get(url, this._updateHandler, [url]);
	this._additionalContent.style.display = "block";
	
	this.showLoading();
};

ItemList.prototype.showDps = function( show ) {
	this._showDps = show;
};

ItemList.prototype._deserialize = function( data ) {
	var i;
	var tmp;
	var a, span;
	var grid;
	var column = 0;
	var cmpItemScore = this._compareItem ? this._compareItem.getStatWeightBasedScore( this._statWeights ) : 0;
	if( data.length < 2 ) {
		this._content.innerHTML = "<div class='il_nothing'>Nothing Found</div>";
	}
	else {
		grid = new StaticGrid(
				data.length,
				7 + ( this._showDps ? 2 : 0 ) + ( this.isStatWeightBasedScoreShown() ? 1 : 0 )
			);
		grid._node.cellSpacing = "0px";
		grid._node.width = "100%";
		//
		this.updatePages( Math.ceil( data[0][0]/data[0][1] ) );
		
		// skip icon
		grid._cols[column].width = "26px";
		column++;

		grid._cells[0][column++].appendChild(this._getSortLink('Name',IL_ORDER_NAME));
		
		if( this._showDps ) {
			grid._cells[0][column++].appendChild(this._getSortLink('DpS',IL_ORDER_DPS));
			grid._cells[0][column++].appendChild(this._getSortLink('Spd',IL_ORDER_SPEED));
		}
		
		grid._cells[0][column++].appendChild(this._getSortLink('iLvl',IL_ORDER_ILVL));
		grid._cells[0][column++].appendChild(this._getSortLink('Slot',IL_ORDER_SLOT));
		grid._cells[0][column++].appendChild(this._getSortLink('Type',IL_ORDER_TYPE));
		if( this.isStatWeightBasedScoreShown() ) {
			grid._cells[0][column++].appendChild(this._getSortLink('Score',IL_ORDER_SCORE));
		}
		
		for( i=0; i<column; i++ ) {
			grid._cells[0][i].className = "il_sort_c";
		}
		
		for( i = 1; i < data.length; i++ ) {
			column = 0;
			tmp = new Item(data[i][0]);
			g_items.set(tmp);
			
			grid._rows[i].className = 'il_row'+(i%2); 
			
			a = document.createElement("a");
			a.className = 'itemlist_name_link';
			a.style.color = g_color[tmp._quality];
			a.innerHTML = tmp._name;
			
			a.onmouseout = function(){Tooltip.hidePreview();};
			a.onmousemove = function(){Tooltip.move();};
			
			if( this._listType == IL_ITEM_LIST ) {
				Listener.add( a, 'mouseover', Tooltip.showItem, Tooltip, [tmp._id] );
			}
			else {
				Listener.add( a, 'mouseover', Tooltip.showGem, Tooltip, [tmp._id] );
			}

			if( this._onclickHandler ) {
				Listener.add( a, "click", function(itm){ this._onclickHandler.notify([itm]); }, this, [tmp.clone()]);
			}
			else {
				a.href = '?item='+tmp._id;
			}
			grid._cells[i][column++].innerHTML = "<div style='background-image:url(images/icons/small/" + tmp._icon + ".png)' class='il_icon' ></div>";
			
			grid._cells[i][column].appendChild(a);
			if( (tmp._typeMask & (1<<3)) != 0 )
			{
				span = document.createElement("sup");
				span.className = 'il_heroic';
				span.innerHTML = "H";
				grid._cells[i][column].appendChild(span);
			}
			column++;
			
			if( this._showDps ) {
				grid._cells[i][column].className = "il_"+(tmp._typeMask2&512?"un":"")+"imp_col";
				grid._cells[i][column++].innerHTML = tmp._dps ? tmp.getDPSFormatted() : "";
				grid._cells[i][column].className = "il_"+(tmp._typeMask2&512?"un":"")+"imp_col";
				grid._cells[i][column++].innerHTML = tmp._dps ? tmp.getSpeedFormatted() : "";
			}
			grid._cells[i][column++].innerHTML = tmp._level;

			grid._cells[i][column].className = this._showDps ? "il_unimp_col" : "il_imp_col";
			grid._cells[i][column++].innerHTML = ( tmp._inventorySlot ? locale["a_slot"][tmp._inventorySlot] : "" );

			grid._cells[i][column].className = this._showDps ? "il_unimp_col" : "il_imp_col";
			grid._cells[i][column++].innerHTML = tmp._subClassName[0];
			
			
			if( this.isStatWeightBasedScoreShown() ) {
				
				grid._cells[i][column].className = "il_imp_col";
				grid._cells[i][column].innerHTML = data[i][1];
				
				if( this._compareItem != null && cmpItemScore > 0 ) {
					var ratio = data[i][1] / cmpItemScore;
					if( ratio > 1 ) {
						grid._cells[i][column].style.color = "#" + ( ratio > 2 ? "FF" : Math.floor(0xFF - 0xC0 * ( ratio - 1 )).toString(16)) + "FF00";
					}
					else if( ratio < 1) {
						grid._cells[i][column].style.color = "#FF" + ( ratio > 2 ? "FF" : Math.floor(0xFF - 0xC0 * ( 1 - ratio )).toString(16)) + "00";
					}
				}
				column++;
			}
			
			grid._cells[i][column].className = "il_unimp_col";
			grid._cells[i][column++].innerHTML = "<a href='http://wowhead.com/item="+tmp._id+"' target='_blank'></a>";
		}
		Tools.setChild(this._content,grid._node);
	}
};