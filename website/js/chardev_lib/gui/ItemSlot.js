/**
 * @author LeMartin
 */

var II_DIMS = [[38,5,5],[16,0,0],[16,0,32],[16,32,32],[16,32,0]];

/**
 * @constructor
 * @param {number} slot
 * @param {Character} character
 * @returns {ItemSlot}
 */
function ItemSlot(slot,character)
{
	this._node = document.createElement("div");
	this._iconDiv = [];
	this._borderDiv = [];
	this._highlightDiv = [];
	this._icon = [];
	this._character = character;
	this._inventory = character._inventory;
	this._onLeftClickHandler = null;
	this._slot = slot;
	//
	//	LISTENER
	//
	
	var size = 32;
	var top = 0;
	var left = 0;
	
	this._node.className = "character_sheet_item_parent";
	
	for (var i = 0; i < 5; i++) 
	{	
		size = II_DIMS[i][0];
		top  = II_DIMS[i][1];
		left = II_DIMS[i][2];
		
		// image
		this._icon[i] = document.createElement("img");
		this._icon[i].className = "character_sheet_item_image";
		this._icon[i].style.width = size + "px";
		this._icon[i].style.height = size + "px";
		this._iconDiv[i] = document.createElement("div");
		this._iconDiv[i].className = "character_sheet_item_image_div";
		this._iconDiv[i].style.zIndex = 3 * (5 - i) - 2;
		this._iconDiv[i].style.top = top + "px";
		this._iconDiv[i].style.left = left + "px";
		this._iconDiv[i].style.width = size + "px";
		this._iconDiv[i].style.height = size + "px";
		// border
		this._borderDiv[i] = document.createElement("div");
		this._borderDiv[i].className = "character_sheet_item_border";
		this._borderDiv[i].style.zIndex = 3 * (5 - i) - 1;
		this._borderDiv[i].style.top = (top - 1) + "px";
		this._borderDiv[i].style.left = (left - 1) + "px";
		this._borderDiv[i].style.width = size + "px";
		this._borderDiv[i].style.height = size + "px";
		// highlight
		this._highlightDiv[i] = document.createElement("div");
		this._highlightDiv[i].className = "character_sheet_item_highlight";
		this._highlightDiv[i].oncontextmenu = function(){return false;};
		Listener.add(this._highlightDiv[i],"mouseover",this.onMouseOver,this,[slot,i]);
		Listener.add(this._highlightDiv[i],"mouseout",this.onMouseOut,this,[slot,i]);
		Listener.add(this._highlightDiv[i],"click",this.onClick,this,[slot,i]);
		Listener.add(this._highlightDiv[i],"contextmenu",this.onContextMenu,this,[slot,i]);
		
		this._highlightDiv[i].ondblclick = function(){return false;};
		this._highlightDiv[i].onmousedown = function(){return false;};
		this._highlightDiv[i].onmouseup = function(){return false;};
		this._highlightDiv[i].style.zIndex = 3 * (5 - i);
		this._highlightDiv[i].style.top = top + "px";
		this._highlightDiv[i].style.left = left + "px";
		this._highlightDiv[i].style.width = size + "px";
		this._highlightDiv[i].style.height = size + "px";
		//	
		this._iconDiv[i].appendChild(this._icon[i]);
		this._node.appendChild(this._iconDiv[i]);
		this._node.appendChild(this._borderDiv[i]);
		this._node.appendChild(this._highlightDiv[i]);
	}
	this.update();
}

ItemSlot.prototype._node = null;
ItemSlot.prototype._iconDiv = [];
ItemSlot.prototype._borderDiv = [];
ItemSlot.prototype._highlightDiv = [];
ItemSlot.prototype._icon = [];
ItemSlot.prototype._character = null;
ItemSlot.prototype._slot = -1;
ItemSlot.prototype._inventory = null;
ItemSlot.prototype._onLeftClickHandler = null;

ItemSlot.prototype._quality = -1;
ItemSlot.prototype._selected = false;

/**
 * @private
 * @param {number} slot
 * @param {number} index
 */
ItemSlot.prototype.onMouseOver = function(slot,index)
{
	var tmp = this._inventory._items[slot][index];

	if( tmp != null )
	{
		if( index > 0 )
		{
			this._iconDiv[index].style.zIndex = 26;
			this._borderDiv[index].style.zIndex = 27;
			this._highlightDiv[index].style.zIndex = 28;
			
			this._character.preview(tmp,slot,-1);
		}
		else {
			//this._highlightDiv[index].style.backgroundImage = "url(images/site/item_slot_over.png)";
		}
		Tooltip.showSlot( tmp.getTooltip(this._character) , this._highlightDiv[index]);
	}
};

/**
 * @private
 * @param {number} slot
 * @param {number} index
 */
ItemSlot.prototype.onMouseOut = function(slot,index)
{
	this._iconDiv[index].style.zIndex = 3 * (5 - index) - 2;
	this._borderDiv[index].style.zIndex = 3 * (5 - index) - 1;
	this._highlightDiv[index].style.zIndex = 3 * (5 - index);
	if( index > 0 )
	{
		this._character.removePreview();
	}
	this._highlightDiv[index].style.backgroundImage = "url(images/site/item_slot_shadow.png)";
	Tooltip.hide();
};

/**
 * @param {Handler} handler
 */
ItemSlot.prototype.setOnClickHandler = function( handler )
{
	this._onLeftClickHandler = handler;
};

ItemSlot.prototype.onClick = function(slot,index)
{
	if( this._onLeftClickHandler ) {
		this._onLeftClickHandler.notify([slot,index]);
	}
	if( index > 0 ) {
		var tmp = this._inventory._items[slot][index];
		if (tmp) {
			this._inventory.swap(slot,index);
			this._character.calculateStats();
			this.update();
		}
	}
};

ItemSlot.prototype.onContextMenu = function(slot,index)
{
	//Tooltip.hide();
	this._character._inventory.remove(slot);
	this._character.calculateStats();
	this.update();
	return false;
};

ItemSlot.prototype.setVisibility = function(visible)
{
	this._node.style.display = (visible?"block":"none");
};

ItemSlot.prototype.select = function()
{
	this._node.style.backgroundImage = "url(images/site/item_border_hover.png)";
	this._selected = true;
};

ItemSlot.prototype.unselect = function()
{
	if( this._quality > -1 ) {
		this._node.style.backgroundImage = "url(images/site/item_border_q"+this._quality+".png)";
	}
	else {
		this._node.style.backgroundImage = "url(images/site/item_border.png)";
	}
	this._selected = false;
};

ItemSlot.prototype.update = function()
{
	var itm = null; 
	for(var i=0;i<5;i++){
		// TODO
		itm = this._inventory._items[this._slot][i];
		if (itm == null) {
			if( i > 0){
				this._borderDiv[i].style.display = "none"; 
				this._iconDiv[i].style.display = "none";
				this._highlightDiv[i].style.display = "none";
			}
			else {
				this._node.style.backgroundImage = "url(images/site/item_border.png)";
			}
			this._icon[i].src = "images/charsheet/"+this._slot+".jpg";
		}
		else {
			if( i > 0){
				this._borderDiv[i].style.display = "block"; 
				this._iconDiv[i].style.display = "block";
				this._highlightDiv[i].style.display = "block";
			}
			else {
				this._quality = itm._quality;
				if( this._selected ) {
					this._node.style.backgroundImage = "url(images/site/item_border_hover.png)";
				}
				else {
					if( this._quality > -1 ) {
						this._node.style.backgroundImage = "url(images/site/item_border_q"+this._quality+".png)";
					}
					else {
						this._node.style.backgroundImage = "url(images/site/item_border.png)";
					}
				}
			}
			this._icon[i].src = "images/icons/large/" + itm._icon + ".png";
			
			
		}
	}
};