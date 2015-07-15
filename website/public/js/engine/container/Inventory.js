/**
 * @constructor
 * @param {Character} character
 */
function Inventory( character )
{
	this.items = new Array(Inventory.SLOTS);					
	this.gemCount = [0,0,0,0,0];
	this.character = character;
	this.reforgePreview = null;
	
	for(var i=0;i<this.items.length;i++)
	{
		this.items[i] = [null,null,null,null,null];
	}
}

Inventory.validInventorySlots = [			1,							//0 head
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
											[26,21,17,15,13],		    //16 main hand
											[23,22,17,14,13] 			//17 off hand
];

Inventory.SLOTS = 18;

Inventory.prototype = {
	items : [],
	validInventorySlots : [],
	
	previewItem : null,
	previewSlot : 0,
	previewSocket : -1,
	oldEnchantRef : null,
	oldGemRef : null,
	enchantPreview : false,
	enchantPreviewRef : null,
	reforgePreview: {},
	
	gemCount : [],
	canDualWieldTwoHanders : false,
	character : null,
	/**
	 * @param {number} slot
	 */
	__shiftLeft : function(slot){
		if( this.items[slot][0] == null ) {
			return
		}
		else if( this.items[slot][1] == null ) {
			this.items[slot][1] = this.items[slot][0]; 
		}
		else {
			for(var i=this.items[slot].length-1;i>0;i--){
				this.items[slot][i] = this.items[slot][i-1];
			}
		}
		this.items[slot][0] = null;
	},
	/**
	 * @param {Item} itm
	 * @param {number} slot
	 */
	__testTwoHanders : function(itm,slot)
	{
		if (slot == 16 && !this.character.canDualWieldTwoHandedWeapons() && itm.isTwoHanded())
		{
			if (this.items[17][0] != null) 
			{
				this.__shiftLeft(17);
			}
		}
		
		if (slot == 17 && !this.character.canDualWieldTwoHandedWeapons() && this.items[16][0] && this.items[16][0].isTwoHanded())
		{
			this.__shiftLeft(16);
		}
	},
	setReforgePreview: function( refArr ) {
		this.removePreview();
		
		this.reforgePreview = this.reforgeToArray();
		
		this.restoreAllItems();
		
		this.reforgeFromArray(refArr);
	},
	// FIXME if the gem is changed while the preview is active, the gem is later removed with the preview
	// this is fixed by removing all previews if an item/gem is equipped, see Engine
	/**
	 * @param {Item} itm 
	 * @param {number} slot
	 * @param {number} socket
	 */
	setPreview : function( itm, slot, socket ){
		if( socket > -1 ) {
			this.oldGemRef = this.items[slot][0].gems[socket];
			this.items[slot][0].addGemForced( itm ,socket);
		}
		else { 
			this.previewItem = itm;
			if( itm )
			{
				itm.setCharacterScope( this.character );
			}
		}
		this.previewSlot = slot;
		this.previewSocket = socket;
	},
	
	/**
	 * @param {Spell} enchantSpell
	 * @param {number} slot
	 */
	setEnchantPreview : function( enchantSpell, slot ) {
		if( this.items[slot][0] == null ) {
			return;
		}
		var enchant = null;
		
		if( enchantSpell != null && enchantSpell.effects[0] != null && enchantSpell.effects[0].secondaryEffect ) {
			enchant = enchantSpell.effects[0].secondaryEffect;
		}
		
		this.enchantPreviewRef = enchant;
		this.oldEnchantRef = this.items[slot][0].addEnchant(enchant);
		this.previewSlot = slot;
		this.enchantPreview = true;
	},
	
	/***/
	removePreview : function( ) {
		if( this.previewSlot > -1 ) {  
			if( this.previewSocket > -1 ) {
				this.items[this.previewSlot][0].addGemForced( this.oldGemRef, this.previewSocket, true );
				this.updateGemCount();
			}
			if( this.enchantPreview ) {
				this.items[this.previewSlot][0].removeEnchant( this.enchantPreviewRef );
				this.items[this.previewSlot][0].addEnchant( this.oldEnchantRef );
			}
		}
		if( this.reforgePreview ) {
			this.restoreAllItems();
			this.reforgeFromArray(this.reforgePreview);
			this.reforgePreview = null;
		}
		this.oldEnchantRef = null;
		this.previewItem = null;
		this.previewSlot = -1;
		this.previewSocket = -1;
		this.enchantPreview = false;
		this.enchantPreviewRef = null;
	},

	/**
	 * @param {number} slot
	 * @param {Item} itm
	 * @returns {boolean}
	 */
	set : function(slot,itm)
	{
		var valid = false;
		var i;
		if (typeof Inventory.validInventorySlots[slot] == "object") {
			for ( i = 0; i < Inventory.validInventorySlots[slot].length; i++) {
				if(itm.inventorySlot == Inventory.validInventorySlots[slot][i]){
					valid = true;
				}
			}
		}
		else{
			if(itm.inventorySlot == Inventory.validInventorySlots[slot]){
				valid = true;
			}
		}
		
		itm.setStats(this.character.level);
		
		if( !this.character.canWear(itm) ) {
			throw new InvalidItemException( itm, InvalidItemException.CAUSE_WRONG_ITEM_CLASS );
		}
		
		if( !this.character.fitsItemClassRequirements(itm) ) {
			throw new InvalidItemException( itm, InvalidItemException.CAUSE_WRONG_CHARACTER_CLASS );
		}

        if( !this.character.fitsLevelRequirements(itm) ) {
            throw new InvalidItemException( itm, InvalidItemException.CAUSE_CHARACTER_LEVEL );
        }
		
		
		if ( this.__testUnique(itm, slot) ) {
		
			this.__testTwoHanders(itm,slot);
			
			if (valid) {
				this.__shiftLeft(slot);
				this.items[slot][0] = itm;
				if( itm )
				{
					itm.setCharacterScope( this.character );
				}
			}
			
		}
		
		return valid;
	},
	
	/**
	 * @param {number} gemId
	 * @returns {boolean}
	 */
	testGemUnique : function( gemId ) {
		var i, j, itm, gem;
		for( i=0; i<this.items.length; i++ ) {
			itm = this.items[i][0];
			if( itm == null ) {
				continue;
			}
			for( j=0; j<itm.gems.length; j++ ) {
				gem = itm.gems[j];
				if( gem == null ) {
					continue;
				}
				if( gem.id == gemId ) {
					return false;
				}
			}
		}
		return true;
	},
	
	/**
	 * @param {Item} itm
	 * @param {number} slot
	 * @returns {boolean}
	 */
	__testUnique : function( itm, slot ) {
		var i;
		//TODO Handle UniqueMultiple
		if( itm.isUnique() || itm.isUniqueEquipped() == true ) {
			for( i=0; i<this.items.length; i++ ) {
				if( i == slot ) {
					continue;
				}
				if( this.items[i][0] != null &&  itm.id == this.items[i][0].id ) {
					throw new InvalidItemException( itm, InvalidItemException.CAUSE_UNIQUE );
				}
			}
		}
		return true;
	},
	
	/**
	 * @param {number} slot
	 */
	remove : function(slot){
		if(this.items[slot][0] != null){
			this.__shiftLeft(slot);
		}
	},
	
	/**
	 * @param {number} slot
	 * @param {number} index
	 */
	swap : function(slot,index){
		if(this.__testUnique(this.items[slot][index], slot)) {
			this.__testTwoHanders(this.items[slot][index],slot);
	
			var tmp = this.items[slot][0];		
			this.items[slot][0] = this.items[slot][index];
			this.items[slot][index] = tmp;
		}
	},
	
	/**
	 * @param {number} slot
	 * @returns {Item}
	 */
	get : function(slot)
	{
		if( this.previewSlot === slot && this.previewSocket === -1 && this.previewItem !== null )
		{
			return this.previewItem;	
		}
        
        if( slot === 17 
                && this.previewSlot === 16 
                && this.previewSocket === -1 
                && this.previewItem !== null 
                && this.previewItem.isTwoHanded() && ! this.character.canDualWieldTwoHandedWeapons()
        ) {
            return null;
        }
        
        if( slot === 16
                && this.previewSlot === 17
                && this.previewSocket === -1 
                && this.previewItem !== null 
                && this.items[16][0] !== null
                && this.items[16][0].isTwoHanded() && ! this.character.canDualWieldTwoHandedWeapons()
        ) {
            return null;
        }
        
		if( slot >= 0 && slot < this.items.length )
		{
			return this.items[slot][0];
		}
		return null;
	},
	
	/**
	 * @param {number} setId
	 * @returns {number}
	 */
	getEquippedSetItems : function( setId )
	{
		var c = 0;
		var tmp = null;
		for (var j = 0; j < Inventory.SLOTS; j++)
		{
			tmp = this.get(j);
			if ( tmp != null && tmp.itemSet!=null && tmp.itemSet.id == setId ) 
			{
				c++;
			}
		}
		return c;
	},
	
	/**
	 * @returns {string}
	 */
	serialize : function()
	{
		var ret = "";
		for(var i=1;i<this.items.length;i++){
			ret += "_";
			if(this.items[i][0]!=null){
				ret += this.items[i][0].serialize();
			}
		}
		return ret;
	},
	
	/***/
	updateGemCount : function()
	{
		var itm = null;
		var gem = null;
		var isc = -1;
		this.gemCount = [0,0,0,0,0];
		for (var i = 0; i < Inventory.SLOTS; i++) {
			if ( (itm = this.get(i)) ) {
				for (var j = 0; j < 3; j++) {
					if ( (gem = itm.gems[j]) ) {
						isc = gem.itemSubClass;
						if (isc == 6) {
							this.gemCount[1]++;
						}
						if (isc == 0 || isc == 3 || isc == 5 || isc == 8) {
							this.gemCount[2]++;
						}
						if (isc == 2 || isc == 4 || isc == 5 || isc == 8) {
							this.gemCount[3]++;
						}
						if (isc == 1 || isc == 3 || isc == 4 || isc == 8) {
							this.gemCount[4]++;
						}
					}
				}
			}
		}
	},
	
	/**
	 * @param {number} gemId
	 */
	removeGem : function( gemId ) {
		var i, j;
		for( i=0; i<this.items.length; i++ ) {
			if( this.items[i][0] == null ) {
				continue;
			}
			for( j=0; j<3; j++ ) {
				if( this.items[i][0].gems[j] && this.items[i][0].gems[j].id == gemId )  {
					this.items[i][0].addGem(null , j);
				}
			}
		}
	},
	
	/**
	 * @param {number} gemId
	 * @param {number} colorMask
	 */
	setGems : function( gemId, colorMask ) {
		var i, j ,c, bsSocket;
		for( i=0; i<this.items.length; i++ ) {
			if( this.items[i][0] == null ) {
				continue;
			}
			bsSocket = this.character.hasBlacksmithingSocket(i) ;
			for( j=0; j<3; j++ ) {
				c = this.items[i][0].socketColors[j];
				if( ( c > 0 || bsSocket) && ( !colorMask || (c&colorMask)!=0  )) {
					if( c <= 0 ) {
						bsSocket = false;
					}
					this.items[i][0].addGem( ItemCache.get(gemId) , j);
				}
			}
		}
	},
	restoreAllItems : function() {
		var i;
		for( i=0; i<Inventory.SLOTS; i++ ) {
			if( this.items[i][0] ) {
				this.items[i][0].restore();
			}
		}
	},
	reforgeFromArray : function( refArr ) {
		this.restoreAllItems();
		
		for( var i in refArr ) {
			if( ! this.items[i][0] ) {
				continue;
			}
			if( refArr[i][0] == -1 ) {
				this.items[i][0].restore();
			}
			else {
				try {
					this.items[i][0].reforge(refArr[i][0],refArr[i][1]);
				}
				catch(e) {
					throw e;
				}
			}
		}
	},
	reforgeToArray : function() {
		var arr = [];
		for( var i=0; i<Inventory.SLOTS; i++ ) {
			if( this.items[i][0] ) {
				arr[i]=[this.items[i][0].reducedStat,this.items[i][0].addedStat];
			}
		}
		return arr;
	},
	reforgeAll: function(refArr) {
		var oldRefArr = this.reforgeToArray();
		try {
			this.restoreAllItems();
			this.reforgeFromArray(refArr);
		}
		catch( e ) {
			this.restoreAllItems();
			this.reforgeFromArray(oldRefArr);
			throw e;
		}
	},
	reforge: function(slot, reduce, add) {
		var itm = this.items[slot][0];
		if( itm ) {
			itm.restore();
			itm.reforge( reduce, add );
			return true;
		}
		return false;
	},
	restore: function(slot) {
		var itm = this.items[slot][0];
		if( itm ) {
			itm.restore();
			return true;
		}
		return false;
	}
};