/**
 * @constructor
 * @param {Character} character
 * @returns {Inventory}
 */
function Inventory( character )
{
	this._items = new Array(INV_ITEMS);
	this._validInventorySlots = [			1,							//0 head
											2,							//1 neck
											3,							//2 shoulder
											16,							//3 back
											[20,5],						//4 chest
											4,							//5 shirt
											19,							//6 tabard
											9,							//7 wrist
											10,							//8 hands
											6,							//9 waist
											7,							//10 legs
											8,							//11 feet
											11,							//12 ring #1
											11,							//13 ring #2
											12,							//14 trinket #1
											12,							//15 trinket #2
											[21,17,13],					//16 main hand
											[23,22,14,13,17], 			//17 off hand
											[28,26,25,15]				//18 ranged/relic
								]; 						
	this._gemCount = [0,0,0,0,0];
	this._character = character;
	
	for(var i=0;i<this._items.length;i++)
	{
		this._items[i] = [null,null,null,null,null];
	}
}

Inventory.prototype._items = [];
Inventory.prototype._validInventorySlots = [];

Inventory.prototype._previewItem = null;
Inventory.prototype._previewSlot = 0;
Inventory.prototype._previewSocket = -1;
Inventory.prototype._oldEnchantRef = null;
Inventory.prototype._oldGemRef = null;
Inventory.prototype._enchantPreview = false;
Inventory.prototype._enchantPreviewRef = null;

Inventory.prototype._gemCount = [];
Inventory.prototype._canDualWieldTwoHanders = false;
Inventory.prototype._character = null;

/**
 * @param {number} slot
 */
Inventory.prototype._shiftLeft = function(slot){
	for(var i=this._items[slot].length-1;i>0;i--){
		this._items[slot][i] = this._items[slot][i-1];
	}
	this._items[slot][0] = null;
};

/**
 * @private
 * @param {Item} itm
 * @param {number} slot
 */
Inventory.prototype._testTwoHanders = function(itm,slot)
{
	if (slot == 16 && !this._character.canDualWieldTwoHandedWeapons() && itm._inventorySlot == 17) 
	{
		if (this._items[17][0] != null) 
		{
			this._shiftLeft(17);
		}
	}
	
	if (slot == 17 && !this._character.canDualWieldTwoHandedWeapons() && this._items[16][0] && this._items[16][0]._inventorySlot == 17) 
	{
		this._shiftLeft(16);
	}
};
// FIXME if the gem is changed while the preview is active, the gem is later removed with the preview
// this is fixed by removing all previews if an item/gem is equipped, see Engine
/**
 * @param {Item} itm 
 * @param {number} slot
 * @param {number} socket
 */
Inventory.prototype.setPreview = function( itm, slot, socket ){
	if( socket > -1 ) {
		this._oldGemRef = this._items[slot][0]._gems[socket];
		this._items[slot][0].addGemForced( itm ,socket);
	}
	else { 
		this._previewItem = itm;
		if( itm )
		{
			itm.setCharacterScope( this._character );
		}
	}
	this._previewSlot = slot;
	this._previewSocket = socket;
};

/**
 * @param {Spell} enchantSpell
 * @param {number} slot
 */
Inventory.prototype.setEnchantPreview = function( enchantSpell, slot ) {
	if( this._items[slot][0] == null ) {
		return;
	}
	var enchant = null;
	
	if( enchantSpell != null && enchantSpell._effects[0] != null && enchantSpell._effects[0]._secondaryEffect ) {
		enchant = enchantSpell._effects[0]._secondaryEffect;
	};
	
	this._enchantPreviewRef = enchant;
	this._oldEnchantRef = this._items[slot][0].addEnchant(enchant);
	this._previewSlot = slot;
	this._enchantPreview = true;
};

/***/
Inventory.prototype.removePreview = function( ) {
	if( this._previewSlot > -1 ) {  
		if( this._previewSocket > -1 ) {
			this._items[this._previewSlot][0].addGemForced( this._oldGemRef, this._previewSocket, true );
			this.updateGemCount();
		}
		if( this._enchantPreview ) {
			this._items[this._previewSlot][0].removeEnchant( this._enchantPreviewRef );
			this._items[this._previewSlot][0].addEnchant( this._oldEnchantRef );
		}
	}
	this._oldEnchantRef = null;
	this._previewItem = null;
	this._previewSlot = -1;
	this._previewSocket = -1;
	this._enchantPreview = false;
	this._enchantPreviewRef = null;
};

/**
 * @param {number} slot
 * @param {Item} itm
 * @returns {boolean}
 */
Inventory.prototype.set = function(slot,itm)
{
	var valid = false;
	var i;
	if (typeof this._validInventorySlots[slot] == "object") {
		for ( i = 0; i < this._validInventorySlots[slot].length; i++) {
			if(itm._inventorySlot == this._validInventorySlots[slot][i]){
				valid = true;
			}
		}
	}
	else{
		if(itm._inventorySlot == this._validInventorySlots[slot]){
			valid = true;
		}
	}
	
	itm.setStats(this._character._level);
	
	if( !this._character.canWear(itm) ) {
		Tooltip.showError("Your Character does not fit the requirements to wear "+itm._name+"!");
		return false;
	}
	
	if( 
			itm._chrClassMask != 0 && 
			(itm._chrClassMask&(1535)) != 1535 && 
			( this._character._chrClass == null || ( itm._chrClassMask&(1<<(this._character._chrClass._id-1))) == 0  ) 
	) {
		
		var n = 0;
		var c = "";
		
		for ( i = 0; i <= 10 ; i++ ) {
			if( itm._chrClassMask & (1<<i) ) {
				c = locale['a_class'][i];
				n++;
				if( n> 2 ) {
					break;
				}
			}
		}
		if( n == 1 ) {
			Tooltip.showError("Dressing up like a "+c+" still doesn't make you one!");
			return false;
		}
		
		Tooltip.showError("Your Character does not fit the class requirements to wear "+itm._name+"!");
		return false;
	}
	
	
	if(this._testUnique(itm, slot)) {
	
		this._testTwoHanders(itm,slot);
		
		if (valid) {
			this._shiftLeft(slot);
			this._items[slot][0] = itm;
			if( itm )
			{
				itm.setCharacterScope( this._character );
			}
		}
		
	}
	return valid;
};

/**
 * @param {number} gemId
 * @returns {boolean}
 */
Inventory.prototype.testGemUnique = function( gemId ) {
	var i, j, itm, gem;
	for( i=0; i<this._items.length; i++ ) {
		itm = this._items[i][0];
		if( itm == null ) {
			continue;
		}
		for( j=0; j<itm._gems.length; j++ ) {
			gem = itm._gems[j];
			if( gem == null ) {
				continue;
			}
			if( gem._id == gemId ) {
				return false;
			}
		}
	}
	return true;
};

/**
 * @private
 * @param {Item} itm
 * @param {number} slot
 * @returns {boolean}
 */
Inventory.prototype._testUnique = function( itm, slot ) {
	var i;
	//TODO Handle UniqueMultiple
	if( itm._unique || itm.isUniqueEquipped() == true ) {
		for( i=0; i<this._items.length; i++ ) {
			if( i == slot ) {
				continue;
			}
			if( this._items[i][0] != null &&  itm._id == this._items[i][0]._id ) {
				Tooltip.showError(TextIO.sprintf1(locale['ERR_UniqueItem'],itm._name));
				return false;
			}
		}
	}
	return true;
};

/**
 * @param {number} slot
 */
Inventory.prototype.remove = function(slot){
	if(this._items[slot][0] != null){
		this._shiftLeft(slot);
	}
};

/**
 * @param {number} slot
 * @param {number} index
 */
Inventory.prototype.swap = function(slot,index){
	if(this._testUnique(this._items[slot][index], slot)) {
		this._testTwoHanders(this._items[slot][index],slot);

		var tmp = this._items[slot][0];		
		this._items[slot][0] = this._items[slot][index];
		this._items[slot][index] = tmp;
	}
};

/**
 * @param {number} slot
 * @returns {Item}
 */
Inventory.prototype.get = function(slot)
{
	if( this._previewSlot == slot && this._previewItem != null )
	{
		return this._previewItem;	
	}
	if( slot >= 0 && slot < this._items.length )
	{
		return this._items[slot][0];
	}
	return null;
};

/**
 * @param {number} setId
 * @returns {number}
 */
Inventory.prototype.getEquippedSetItems = function( setId )
{
	var c = 0;
	var tmp = null;
	for (var j = 0; j < INV_ITEMS; j++)
	{
		tmp = this.get(j);
		if ( tmp != null && tmp._itemSet!=null && tmp._itemSet._id == setId ) 
		{
			c++;
		}
	}
	return c;
};

/**
 * @returns {string}
 */
Inventory.prototype.serialize = function()
{
	var ret = "";
	for(var i=1;i<this._items.length;i++){
		ret += "_";
		if(this._items[i][0]!=null){
			ret += this._items[i][0].serialize();
		}
	}
	return ret;
};

/***/
Inventory.prototype.updateGemCount = function()
{
	var itm = null;
	var gem = null;
	var isc = -1;
	this._gemCount = [0,0,0,0,0];
	for (var i = 0; i < INV_ITEMS; i++) {
		if ( (itm = this.get(i)) ) {
			for (var j = 0; j < 3; j++) {
				if ( (gem = itm._gems[j]) ) {
					isc = gem._subClass;
					if (isc == 6) {
						this._gemCount[1]++;
					}
					if (isc == 0 || isc == 3 || isc == 5 || isc == 8) {
						this._gemCount[2]++;
					}
					if (isc == 2 || isc == 4 || isc == 5 || isc == 8) {
						this._gemCount[3]++;
					}
					if (isc == 1 || isc == 3 || isc == 4 || isc == 8) {
						this._gemCount[4]++;
					}
				}
			}
		}
	}
};

/**
 * @param {number} gemId
 */
Inventory.prototype.removeGem = function( gemId ) {
	var i, j;
	for( i=0; i<this._items.length; i++ ) {
		if( this._items[i][0] == null ) {
			continue;
		}
		for( j=0; j<3; j++ ) {
			if( this._items[i][0]._gems[j] && this._items[i][0]._gems[j]._id == gemId )  {
				this._items[i][0].addGem(null , j);
			}
		}
	}
};

/**
 * @param {number} gemId
 * @param {number} colorMask
 */
Inventory.prototype.setGems = function( gemId, colorMask ) {
	var i, j ,c, bsSocket;
	for( i=0; i<this._items.length; i++ ) {
		if( this._items[i][0] == null ) {
			continue;
		}
		bsSocket = this._character.hasBlacksmithingSocket(i) ;
		for( j=0; j<3; j++ ) {
			c = this._items[i][0]._socketColors[j];
			if( ( c > 0 || bsSocket) && ( !colorMask || (c&colorMask)!=0  )) {
				if( c <= 0 ) {
					bsSocket = false;
				}
				this._items[i][0].addGem( g_items.get(gemId) , j);
			}
		}
	}
};

/*
var INV_ITEM = 0;
var INV_ENCHANT = 1;
var INV_GEM = 2;
Inventory.prototype._itemsSnapshot = [];

Inventory.prototype.setComplexPreview = function( preview ) {
	var i,tmp;
	for( i=0; i<preview.length; i++ ) {
		switch(preview[i][0]) {
		case INV_ITEM:
			tmp = this._items[preview[i][2]][0];
			if( this.set(preview[i][2], preview[i][1]) ) {
				this._itemsSnapshot[this._itemsSnapshot.length] = [INV_ITEM,tmp,preview[i][2]];
			}
			break;
		case INV_ENCHANT:
			break;
		case INV_GEM:
			break;
		}
	}
};
*/

/***/
Inventory.prototype.restoreAllItems = function() {
	var i;
	for( i=0; i<INV_ITEMS; i++ ) {
		if( this._items[i][0] ) {
			this._items[i][0].restore();
		}
	};
};

Inventory.prototype.reforgeFromArray = function( refArr ) {
	this.restoreAllItems();
	
	for( var i in refArr ) {
		if( ! this._items[i][0] ) {
			continue;
		}
		this._items[i][0].reforge(refArr[i][0],refArr[i][1]);
	}
};

Inventory.prototype.reforgeToArray = function() {
	var arr = [];
	for( var i=0; i<INV_ITEMS; i++ ) {
		if( this._items[i][0] ) {
			arr.push([this._items[i][0]._addedStat,this._items[i][0]._reducedStat]);
		}
	};
	return arr;
};

/**
 * @param {Array} listOfOldStats
 * @param {Array} listOfNewStats
 */
Inventory.prototype.reforgeAllItems = function( listOfOldStats, listOfNewStats ) {
	var i, j, k, l, m, v, log = "", itm;
	if( listOfOldStats.length == 0 ) {
		Tooltip.showError("No stats for reduction selected!");
		return;
	}
	if( listOfNewStats.length == 0 ) {
		Tooltip.showError("No stats to add selected!");
		return;
	}
	for( i=0; i<INV_ITEMS; i++ ) {
		v = false;
		itm = this._items[i][0];
		if( itm == null ) {
			log += "No item found in slot "+i+".<br />";
			continue;
		}
		if( itm._level < REFORGE_ITEM_MIN_LEVEL ) {
			log += "Item level to low.<br />";
			continue;
		}
		if( itm._reducedStat != -1 ) {
			log += "Item '<span style='color:"+g_color[itm._quality]+"'>"+itm._name+"</span>' is already reforged.<br />";
			continue;
		}
		log += "<span style='color:"+g_color[itm._quality]+"'>"+itm._name+"</span>";
		for( j=0; j<listOfOldStats.length; j++ ) {
			log += "Trying to reduce "+locale['ItemStatNames'][listOfOldStats[j]]+"<br />";
			for( k=0; k<itm._stats.length; k++ ) {
				if( itm._stats[k] && itm._stats[k][0] == listOfOldStats[j] ) {
					log += "Found "+locale['ItemStatNames'][listOfOldStats[j]]+"<br />";
					for( m=0; m<listOfNewStats.length; m++ ) {
						v = true;
						for( l=0; l<itm._stats.length; l++ ) {
							if( itm._stats[l] && itm._stats[l][0] == listOfNewStats[m] ) {
								v = false;
							}
						}
						if( v ) {
							itm.reforge ( listOfOldStats[j], listOfNewStats[m] );
							log += "Reforge successful reduced "+locale['ItemStatNames'][listOfOldStats[j]]+" and added "+locale['ItemStatNames'][listOfNewStats[m]]+"<br />";
							break;
						}

						log += locale['ItemStatNames'][listOfNewStats[m]]+" is already present <br />";
					}
					break;
				}
			}
			log += "No modification<br />";
		}
	}
	//TODO show log somewhere.... but where?
	//Tooltip.showHTML(log);
};
