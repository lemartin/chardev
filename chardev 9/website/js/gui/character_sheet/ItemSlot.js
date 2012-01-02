/**
 * @constructor
 * @param {CharacterSheet} characterSheet
 * @param {number} slot
 */
function ItemSlot( characterSheet, slot)
{
	var i;
	
	this.characterSheet = characterSheet;
	this.node = document.createElement("div");
	this.icons = [];
	this.slot = slot;
	
	this.node.className = 'cs_is_p  cs_is_p_'+( slot < 8 ? 0 : (slot < 16 ? 1 : 2));
	
	for( i=0; i<4; i++ ) {
		this.icons[i] = document.createElement("img");
		if( i == 0 ) {
			this.icons[i].className = "cs_is_img_large";
		}
		else {
			this.icons[i].className = "cs_is_img_small";
		}
		
	}
	
	this.itemParent = new LayeredDiv(2);
	this.itemParent.layers[0].className = 'cs_is_ip cs_is_ip_'+( slot < 8 ? 0 : (slot < 16 ? 1 : 2));
	this.itemParent.layers[0].appendChild( this.icons[0] );
	this.itemParent.layers[1].className = 'character_sheet_item_highlight';
	this.itemParent.layers[1].oncontextmenu = function(){return false;};
	this.node.appendChild(this.itemParent.layers[0]);
	

	Listener.add( this.itemParent.layers[1], 'mouseover', this.showTooltip, this, [0] );
	Listener.add( this.itemParent.layers[1], 'mouseout', this.hideTooltip, this, [0] );
	Listener.add( this.itemParent.layers[1], 'click', this.__onClick, this, [0] );
	Listener.add( this.itemParent.layers[1], 'contextmenu', this.__onContextMenu, this, [0] );
	
	
	this.historyItems = [];
	for( i=0; i<3; i++ ) {
		this.historyItems[i] = new LayeredDiv(3);
		
		
		document.createElement("div");
		this.historyItems[i].layers[0].className = 'cs_is_hi';
		
		this.historyItems[i].layers[1].appendChild( this.icons[i+1] );
		this.historyItems[i].layers[1].className = 'cs_is_hip';
		this.historyItems[i].layers[1].style.zIndex = "";
		
		this.historyItems[i].layers[2].className = 'cs_is_hi_event_p';
		
		var a = DOM.createAt( this.historyItems[i].layers[2], 'a', {'class': 'cs_is_hi_event', 'href':'javascript:'} )
		a.oncontextmenu = function(){return false;};
		
		Listener.add( a, 'mouseover', this.showTooltip, this, [i+1] );
		Listener.add( a, 'mouseout', this.hideTooltip, this, [i+1] );
		Listener.add( a, 'click', this.__onClick, this, [i+1] );
		Listener.add( a, 'contextmenu', this.__onContextMenu, this, [i+1] );
		
		this.node.appendChild(this.historyItems[i].layers[0]);
	}
	
	this.items = [];
}

ItemSlot.prototype = {
	node: null, icons: [], slot: -1, 
	quality: -1, selected: false,
	characterSheet: null,
	items: [], itemParent: null, historyItems: [], historyItemsParent: [],
	/**
	 * @param {number} index
	 */
	showTooltip: function( index ) {
		if( this.items[index] ) {

			if( index >= 1 ) {
				this.icons[index].src = "images/icons/large/"+this.items[index].icon+".png";
				this.icons[index].className = 'cs_is_img_large';
				
				DOM.addClass( this.historyItems[index-1].layers[1], 'cs_is_hip_enlarge');
				
				var tt = this.items[index].getTooltip() + "<div class='tt_note'>Press CTRL to prevent this tooltip from showing</div>"
				
				Tooltip.showSlot(  tt , this.icons[index]);
			}
			else {
				Tooltip.showSlot( this.items[index].getTooltip() , this.icons[index]);
			}
		}

		this.characterSheet.eventMgr.fire('item_tooltip_show',{
			'slot': this.slot, 'index': index
		});
	},
	hideTooltip: function(index) {

		if( index >= 1 ) {
			if( this.items[index] ) {
				this.icons[index].src = "images/icons/gem/"+this.items[index].icon+".png";
			}
			else {
				//
			}
			this.icons[index].className = 'cs_is_img_small';
			
			DOM.removeClass( this.historyItems[index-1].layers[1], 'cs_is_hip_enlarge');
		}
		
		Tooltip.hide();

		this.characterSheet.eventMgr.fire('item_tooltip_hide',{
			'slot': this.slot, 'index': index
		});
	},
	__onClick: function(index) {
		this.characterSheet.eventMgr.fire('item_left_click',{
			'slot': this.slot, 'index': index
		});
	},
	__onContextMenu: function(index) {
		this.characterSheet.eventMgr.fire('item_right_click',{
			'slot': this.slot, 'index': index
		});
	},
	setVisibility: function(visible) {
		this.node.style.display = (visible?"block":"none");
	},
	select: function() {
		this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border_hover.png)";
		this.selected = true;
	},
	deselect: function() {
		if( this.quality > -1 ) {
			this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border_q"+this.quality+".png)";
		}
		else {
			this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border.png)";
		}
		this.selected = false;
	},
	update: function( items ) {
		var itm;
		this.items = items;
		for(var i=0;i<4;i++){
			//
			itm = this.items[i];
			if (itm == null) {
				if( i > 0){
					this.icons[i].style.display = "none";
//					this.borderDivs[i].style.display = "none"; 
//					this.iconDivs[i].style.display = "none";
//					this.highlightDivs[i].style.display = "none";
					
					DOM.removeClass(this.historyItems[i-1].layers[0], /^cs_is_quality_\d+$/);
				}
				else {
					this.icons[i].src = "images/charsheet/slots/slot_"+this.slot+".jpg";
					this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border.png)";
				}
			}
			else {
				
				if( i > 0){
					this.icons[i].style.display = "block";
					DOM.addClass(this.historyItems[i-1].layers[0], 'cs_is_quality_'+itm.quality);
					//this.historyItems[i-1].style.display = "block";
					this.icons[i].src = "images/icons/gem/" + itm.icon + ".png";
				}
				else {
					this.quality = itm.quality;
					if( this.selected ) {
						this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border_hover.png)";
					}
					else {
						if( itm.isInvalid() ) {
							this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border_invalid.png)";
						}
						else if( this.quality > -1 ) {
							this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border_q"+this.quality+".png)";
						}
						else {
							this.itemParent.layers[0].style.backgroundImage = "url(images/site/item_border.png)";
						}
					}
					if( itm.isInvalid() ) {
						this.icons[i].src = "images/icons/r/large/" + (itm.icon ? itm.icon : 'Temp')  + ".png";
					}
					else {
						this.icons[i].src = "images/icons/large/" + (itm.icon ? itm.icon : 'Temp') + ".png";
					}
				}
			}
		}
	}
};