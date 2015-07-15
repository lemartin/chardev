/**
 * @constructor
 */
function ItemList() {
	List.call( 
		this,
		new ItemListGui(List.toCategories(ItemList.FILTER_DATA)),
		List.toPlainFilterData(ItemList.FILTER_DATA), 
		['name', 'level', 'reqlvl', 'quality'],
		ItemList.ORDER_ILVL
	);
}

ItemList.FILTER_DATA = {};

ItemList.FILTER_DATA[locale['F_General']] = [
	new InputFilterData( locale['F_Name'], 'name', InputFilterData.TYPE_STRING_SIMPLE ),
	new RangeInputFilterData( locale['F_ItemLevel'], 'level' ),
	new MultiSelectFilterData( locale['F_Quality'], 'quality', FILTER_QUALITY_OPTIONS ),
	new RangeInputFilterData( locale['F_RequiredLevel'], 'reqlvl' ),
	new SingleSelectFilterData( locale['F_ItemClass'], 'class', { 4: "Armor", 3: "Gem", 2: "Weapon" } )
];
ItemList.FILTER_DATA[locale['F_Stats']] = [
	new InputFilterData( locale['CS_Stats'][1][0], 'str', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['CS_Stats'][1][1], 'agi', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['CS_Stats'][1][2], 'sta', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['CS_Stats'][1][3], 'int', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['CS_Stats'][1][4], 'spi', InputFilterData.TYPE_NUMERIC )
];
ItemList.FILTER_DATA[locale['F_Ratings']] = [
	new InputFilterData( locale['ItemStatNames'][31], 'hit', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['ItemStatNames'][32], 'crit', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['ItemStatNames'][35], 'res', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['ItemStatNames'][36], 'haste', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['ItemStatNames'][49], 'mast', InputFilterData.TYPE_NUMERIC )
];
ItemList.FILTER_DATA[locale['F_Defense']] = [
	new InputFilterData( locale['ItemStatNames'][13], 'dod', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['ItemStatNames'][14], 'par', InputFilterData.TYPE_NUMERIC ),
	new InputFilterData( locale['ItemStatNames'][15], 'blo', InputFilterData.TYPE_NUMERIC )
];
ItemList.FILTER_DATA[locale['F_Melee']] = [
	new InputFilterData( locale['ItemStatNames'][38], 'ap', InputFilterData.TYPE_NUMERIC ),
	new RangeInputFilterData( locale['F_DPS'], 'dps' ),
	new RangeInputFilterData( locale['F_Speed'], 'delay' )
];
ItemList.FILTER_DATA[locale['F_Spell']] = [
	new InputFilterData( locale['ItemStatNames'][45], 'sp', InputFilterData.TYPE_NUMERIC )
];
ItemList.FILTER_DATA[locale['F_Requirements']] = [
	new SingleSelectFilterData( locale['F_UsableBy'], 'usablebyclass', FILTER_CLASS_OPTIONS),
	new InputFilterData( locale['F_CanBeUsedWithLevel'], 'canbeusedwithlvl', InputFilterData.TYPE_NUMERIC ),
	new SingleSelectFilterData( locale['F_RequiresReputation'], 'reqrepu', FILTER_YES_NO_OPTIONS)
];
ItemList.FILTER_DATA[locale['F_Miscellaneous']] = [
	new SingleSelectFilterData( locale['F_SocketableGem'], 'issocketablegem', FILTER_YES_NO_OPTIONS),
	new InputFilterData( locale['F_GemReqItemLevel'], 'gemreqitemlvl', InputFilterData.TYPE_NUMERIC )
];

ItemList.ORDER_NAME = 'name';
ItemList.ORDER_ILVL = 'level';
ItemList.ORDER_TYPE = 'itemclass';
ItemList.ORDER_DPS =  'dps';
ItemList.ORDER_SPEED = "delay";
ItemList.ORDER_SLOT = "slot";
ItemList.ORDER_SCORE = "weightedscore";

ItemList.prototype = new List(null,null,null,"");
ItemList.prototype.weaponSlot = false;
ItemList.prototype.slotMask= 0;
ItemList.prototype.itemClass= 0;
ItemList.prototype.itemSubClassMask= 0;
ItemList.prototype.setStaticLink = function( b ) {
	this.gui.setProperty( "setStaticLink", b);
};
ItemList.prototype.setWeaponSlot = function( b ) {
	this.weaponSlot = b;
	this.gui.setProperty( "showDpsAndDelay", b);
};
ItemList.prototype.setItemConstraints = function( slotMask, itemClass, itemSubClassMask ) {
	this.slotMask = slotMask;
	this.itemClass = itemClass;
	this.itemSubClassMask = itemSubClassMask;
	

	var filterData = List.toPlainFilterData(ItemList.FILTER_DATA); 
	var staticVariables = ['name', 'level', 'reqlvl', 'quality'];
	
	var showSlotFilter = false, itemSubClassFilterData = null, showDps = false, showDelay = false, slotFilterData = null;
	
	switch( this.itemClass )
	{
	case 4:
		if( this.itemSubClassMask&1<<11 ) {
			itemSubClassFilterData = this._getSubClassFilter([11]);
		}
		else
		{
			showSlotFilter = true;
			itemSubClassFilterData = this._getSubClassFilter([0,1,2,3,4]);
		}
		break;
	case 3:
		this.filterMgr.hideFilter( 'subclass', false);
		// Meta
		if( this.itemSubClassMask & (1<<6) ) {
			this.filterMgr.hideFilter( 'subclass', true);
			itemSubClassFilterData = this._getSubClassFilter([6]);
		}
		// Crystal of Fear
		else if( this.itemSubClassMask & (1<<9) ) {
			this.filterMgr.hideFilter( 'subclass', true);
			itemSubClassFilterData = this._getSubClassFilter([9]);
		}
		// Cogwheel
		else if( this.itemSubClassMask & (1<<10) ) {
			this.filterMgr.hideFilter( 'subclass', true);
			itemSubClassFilterData = this._getSubClassFilter([10]);
		}
		else {
			itemSubClassFilterData = this._getSubClassFilter([0,1,2,3,4,5,7,8]);
		}
		break;
	case 2:
		if( this.itemSubClassMask == 0 ) {
			showSlotFilter = true;
		}
		else {
			itemSubClassFilterData = this._getSubClassFilter( null );
		}
	}
	
	if( (this.slotMask&F_SLT_MSK_WPN) != 0 || this.itemClass == 2  ) {
		showDelay = true; showDps = true;
	}
	if( showSlotFilter || this.slotMask != 0 ) {
		slotFilterData = this._getSlotFilter();
	}

	if( showDps ) {
		staticVariables.push('dps');
		this.filterMgr.hideFilter( 'delay', false );
	}
	else {
		this.filterMgr.hideFilter( 'dps', true );
	}
	if( showDelay ) {
		staticVariables.push('delay');
		this.filterMgr.hideFilter( 'delay', false );
	}
	else {
		this.filterMgr.hideFilter( 'delay', true );
	}
	
	if( showSlotFilter || slotFilterData ) {
		staticVariables.push('slot');
		filterData['slot'] = slotFilterData;
		this.filterMgr.hideFilter( 'slot', false );
	}
	else {
		this.filterMgr.hideFilter( 'slot', true );
	}
	
	if( itemSubClassFilterData ) {
		staticVariables.push('subclass');
		
		filterData['subclass'] = itemSubClassFilterData;
	}
	else {
		this.filterMgr.hideFilter( 'subclass', true );
	}
	
	this.filterMgr.set(filterData, staticVariables);
	
	
};

ItemList.prototype._getSubClassFilter = function( subclasses ) {
	var options = {};
	var i;
	
	if( subclasses ) {
		for( i = 0; i < subclasses.length; i++ ) {
			options[subclasses[i]] = ITEM_CLASSES[this.itemClass][1][subclasses[i]];
		}
	}
	else {
		for( i = 0; i < 32; i++ ) {
			if( ((1<<i)&this.itemSubClassMask) != 0) {
				options[i] = ITEM_CLASSES[this.itemClass][1][i];
			}
		}
	}
	return new MultiSelectFilterData( locale['F_ItemClass'], 'subclass', options);
};

ItemList.prototype._getSlotFilter = function() {
	var options = [];
	var slotMask = -1;
	var tmp = 0;
	var i;
	if( this.itemClass == 4 ) {
		if( this.itemSubClassMask == 0 ) {
			slotMask &= F_SLT_MSK[0]|F_SLT_MSK[1]|F_SLT_MSK[2]|F_SLT_MSK[3]|F_SLT_MSK[4];
		}
		else
		{
			for(i=0;i<5;i++) {
				if( this.itemSubClassMask & 1<<i  ) {
					tmp |= F_SLT_MSK[i];
				}
			}
			slotMask &= tmp;
		}
	}
	else if ( this.itemClass == 2 ) {
		if( this.itemSubClassMask == 0 ) {
			slotMask &= F_SLT_MSK_WPN;
		}
	}
	
	if( this.slotMask ) {
		this.slotMask &= slotMask;
	}
	else {
		this.slotMask = slotMask;
	}

	for( i = 1; i <= 28; i++ ) {
		if( (this.slotMask & 1<<i) == 0 ) {
			continue;
		}
		options[i] = i == 14 ? locale['F_ShieldHand'] : locale['a_slot'][i];
	}
	return new MultiSelectFilterData( locale['F_InventorySlot'], 'slot', options);
};