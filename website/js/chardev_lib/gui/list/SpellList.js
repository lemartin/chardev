var SL_ORDER_ID = 'id';
var SL_ORDER_NAME = 'name';
var SL_ORDER_ENCHANT_CHR_LEVEL = 'enchantchrlevel';

var SL_ENCHANT_LIST = 0;
var SL_BUFF_LIST = 1;
var SL_SPELL_LIST = 2;

/**
 * @extends {List}
 * @constructor
 * @param {number} listType
 * @returns {SpellList}
 */
function SpellList( listType ) {
	List.call(this,SL_ORDER_ENCHANT_CHR_LEVEL);
	
	this._filter = new SpellFilter(listType);
	this._filter.setFilterHandler(new Handler(this.filter, this));
	Tools.setChild(this._filterCollapsable._content,this._filter._node);
	
	this._type = listType;
	this._orderDirection = IL_DESC;
}
SpellList.prototype = new List(SL_ORDER_ID);
SpellList.prototype._type = SL_SPELL_LIST;
SpellList.prototype._hiddenArgs = "";


SpellList.prototype.setEnchant = function( itm, chrLevel, args ) {
	this._hiddenArgs = 
		"itemclass.ba."+(1<<itm._class)+";" +
		"itemsubclass.ba."+(1<<itm._subClass)+";" +
		"slot.ba."+(1<<itm._inventorySlot)+";" +
		"enchantitemlevel.le."+itm._level+";" +
		"enchantchrlevel.le."+chrLevel+";" +
		"isenchant.eq.1;";
	
	this.set(args);
};

SpellList.prototype.set = function( args ) 
{	
	List.prototype.set.call( this, args, null, null );
	this.update();
};

SpellList.prototype.update = function( ) {
	var url = "php/interface/get_spells.php" + 
				TextIO.queryString({
					'a': this._filter.buildArgumentString()+this._hiddenArgs,
					'o': this._order+"."+(this._orderDirection==IL_ASC?'asc':'desc')+";",
					'p': this._page
				});
	this._requestedURL = url;
	Ajax.get(url, this._updateHandler, [url]);
	this.showLoading();
};

SpellList.prototype.clear = function( str ) {
	this._filterCollapsable._node.style.display = 'none';
	this._pageGrid._node.display = "none";
	if( this._type == SL_ENCHANT_LIST ) {
		this._content.innerHTML = "<div class='il_notice'>Select an equipped item to enchant it or to set its random property</div>";
	}
};

SpellList.prototype._deserialize = function( data ) {
	var i;
	var tmp;
	var a;
	var grid;
	var column = 0;
	var content = [];
	var reqChrLevel = "";
	
	this._pageGrid._node.display = "table";
	
	if( data.length < 2 ) {
		this._content.innerHTML = "<div class='il_nothing'>Nothing Found</div>";
	}
	else {
		grid = new StaticGrid(
				data.length,
				3
			);
		grid._node.cellSpacing = "1px";
		grid._node.width = "100%";
		//
		this.updatePages( Math.ceil( data[0][0]/data[0][1] ) );
		
		//skip icon
		grid._cols[column].width = "26px";
		column++;
		
		
		grid._cells[0][column++].appendChild(this._getSortLink('Name',SL_ORDER_NAME));
		
		grid._cells[0][column++].appendChild(this._getSortLink('Req. Level',SL_ORDER_ENCHANT_CHR_LEVEL));
		
		for( i=0; i<column; i++ ) {
			grid._cells[0][i].className = "il_sort_c";
		}
		
		for( i = 1; i < data.length; i++ ) {
			column = 0;
			tmp = new Spell(data[i]);
			g_spells.set(tmp);
			
			grid._rows[i].className = 'il_row'+(i%2); 

			grid._cells[i][column++].innerHTML = "<div style='background-image:url(images/icons/small/" + tmp._icon + ".png)' class='il_icon' ></div>";
			
			a = document.createElement("a");
			a.className = 'itemlist_name_link';
			a.innerHTML = tmp.getName();
			a.onmouseout = function(){Tooltip.hidePreview();};
			a.onmousemove = function(){Tooltip.move();};
			
			if( this._type = SL_ENCHANT_LIST ) {
				Listener.add( a, 'mouseover', Tooltip.showEnchantSpell, Tooltip, [tmp._id] );
			}
			else {
				Listener.add( a, 'mouseover', Tooltip.showSpell, Tooltip, [tmp._id] );
			}
			
			grid._cells[i][column++].appendChild(a);
			
			reqChrLevel = "None";
			for( var j=0; j<tmp._effects.length; j++ ) {
				if(  tmp._effects[j] && tmp._effects[j]._aura == 53 && tmp._effects[j]._secondaryEffect != null ) {
					reqChrLevel = tmp._effects[j]._secondaryEffect._requiredCharacterLevel;
					break;
				}
			}
			grid._cells[i][column++].innerHTML = reqChrLevel;
			
			if( this._onclickHandler ) {
				Listener.add( a, "click", function(id){ this._onclickHandler.notify([id]); }, this, [tmp._id]);
			}
			else {
				a.href = '?spell='+tmp._id;
			}
		}
		Tools.setChild(this._content,grid._node);
	}
};