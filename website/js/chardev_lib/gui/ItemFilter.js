var F_SLT_MASK_DFLT = 1<<1|1<<3|1<<5|1<<6|1<<7|1<<8|1<<9|1<<10;
var F_SLT_MSK = [
	1<<2|1<<11|1<<12|1<<19|1<<23,
    F_SLT_MASK_DFLT|1<<4|1<<16|1<<20,
    F_SLT_MASK_DFLT,
    F_SLT_MASK_DFLT,
    F_SLT_MASK_DFLT
];
var F_SLT_MSK_WPN = 1<<13|1<<15|1<<17|1<<21|1<<22;

var F_OP_NUMERIC = 0;
var F_OP_BINARY = 1;
var F_OP_STRING = 2;
var F_OP_BOOLEAN = 3;

var F_OPT_GRP = 0;
var F_OPT_SELECT = 1;
var F_OPT_INPUT = 2;
var F_OPT_EMPTY = 3;
var F_OPT_MULTI_SELECT = 4;
var F_OPT_GROUP = 5;

var F_VAR_USABLEBYCLASS = "usablebyclass";
var F_VAR_ISSOCKETABLEGEM = "issocketablegem";
var F_VAR_SLOT = "slot";
var F_VAR_ISENCHANT = "isenchant";
var F_VAR_SUBCLASS = "subclass";
var F_VAR_CLASS = "class";
var F_VAR_REQUIREDLEVEL = "reqlvl";
var F_VAR_DESCRIPTION = "description";
var F_VAR_CANBEUSEDWITHLEVEL = "canbeusedwithlvl";


var F_QUALITY_OPTS = [[0,locale['a_quality'][0]],[1,locale['a_quality'][1]],[2,locale['a_quality'][2]],[3,locale['a_quality'][3]],[4,locale['a_quality'][4]],[5,locale['a_quality'][5]],[7,locale['a_quality'][7]]];

var F_CLASS_OPTS = [
	[1,locale['a_class'][0]],
	[2,locale['a_class'][1]],
	[4,locale['a_class'][2]],
	[8,locale['a_class'][3]],
	[16,locale['a_class'][4]],
	[32,locale['a_class'][5]],
	[64,locale['a_class'][6]],
	[128,locale['a_class'][7]],
	[256,locale['a_class'][8]],
	[1024,locale['a_class'][10]]
];
var F_VAR_REQUIRE_REPUTATION = 'reqrepu';

/**
 * @constructor
 * @param {number} listType
 * @returns {ItemFilter}
 */
function ItemFilter(listType) {
	Filter.call( this );
	this.initialise();

	if( listType == IL_ITEM_LIST ) {
		var div = document.createElement("div");
		div.className = 'if_propagate';
		div.appendChild(this._propagate);
		div.appendChild(document.createTextNode(" "+locale['F_Propagate']));
		this._node.appendChild(div);

	}
}
ItemFilter.prototype = new Filter();
ItemFilter.prototype._customFilterOptions = [
    [FM_OPT_EMPTY],
	[FM_OPT_GROUP,locale['F_General']],
	[FM_OPT,locale['F_ItemClass'],["class",FM_SEL,[[4,"Armor"],[3,"Gem"],[2,"Weapon"]]]],
	[FM_OPT_GROUP,locale['F_Stats']],
	[FM_OPT,locale['CS_Stats'][1][0],['str',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][1],['agi',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][2],['sta',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][3],['int',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][4],['spi',FM_IN,FM_NUMERIC]],
	[FM_OPT_GROUP,locale['F_Ratings']],
	[FM_OPT,locale['ItemStatNames'][31],['hit',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['ItemStatNames'][32],['crit',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['ItemStatNames'][35],['res',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['ItemStatNames'][36],['haste',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['ItemStatNames'][49],['mast',FM_IN,FM_NUMERIC]],
	[FM_OPT_GROUP,locale['F_Defense']],
	[FM_OPT,locale['ItemStatNames'][13],['dod',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['ItemStatNames'][14],['par',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['ItemStatNames'][15],['blo',FM_IN,FM_NUMERIC]],
	[FM_OPT_GROUP,locale['F_Melee']],
	[FM_OPT,locale['ItemStatNames'][38],['ap',FM_IN,FM_NUMERIC]],
	[FM_OPT_GROUP,locale['F_Spell']],
	[FM_OPT,locale['ItemStatNames'][45],['sp',FM_IN,FM_NUMERIC]],
	[FM_OPT_GROUP,locale['F_Requirements']],
	[FM_OPT,"Usable by ",["usablebyclass",FM_SEL,F_CLASS_OPTS]],
	[FM_OPT,locale['F_CanBeUsedWithLevel'],["canbeusedwithlvl",FM_IN,FM_NUMERIC_EQ]],
	[FM_OPT,locale['F_RequiresReputation'],["reqrepu",FM_SEL,[[1,locale['F_Yes']],[0,locale['F_No']]]]],
	[FM_OPT_GROUP,locale['F_Miscellaneous']],
	[FM_OPT,locale['F_SocketableGem'],["issocketablegem",FM_SEL,[[1,locale['F_Yes']],[0,locale['F_No']]]]],
	[FM_OPT,locale['F_GemReqItemLevel'],['gemreqitemlvl',FM_IN,FM_NUMERIC]]
];

ItemFilter.prototype._presetSubClassMask = 0;
ItemFilter.prototype._presetSlotMask = 0;
ItemFilter.prototype._presetClass = -1;

ItemFilter.prototype.setItemClass = function( itemClass, itemSubClassMask ) {
	this._presetClass = itemClass;
	this._presetSubClassMask = itemSubClassMask;
};

ItemFilter.prototype.setSlotMask = function( inventorySlotMask ) {
	this._presetSlotMask = inventorySlotMask;
};

ItemFilter.prototype.update = function( args ) 
{	
	var slotSettings = null,
		subClassSettings = null,
		dpsSettings = null,
		spdSettings = null,
		settings  = [],
		showSlotFilter=false,
		div;

	switch( this._presetClass )
	{
	case 4:
		if( this._presetSubClassMask&1<<11 ) {
			subClassSettings = this._getSubClassFilter([11]);
		}
		else if( this._presetSubClassMask == 0 || this._presetSubClassMask&1 ) 
		{
			showSlotFilter = true;
			subClassSettings = this._getSubClassFilter([0,1,2,3,4]);
		}
		else
		{
			showSlotFilter = true;
			subClassSettings = this._getSubClassFilter([0,1,2,3,4]);
		}
		break;
	case 3:
		this.removeHiddenFilter(F_VAR_SUBCLASS);
		// Meta
		if( this._presetSubClassMask & (1<<6) ) {
			this.addHiddenFilter(F_VAR_SUBCLASS);
			subClassSettings = this._getSubClassFilter([6]);
		}
		// Cogwheel
		else if( this._presetSubClassMask & (1<<10) ) {
			this.addHiddenFilter(F_VAR_SUBCLASS);
			subClassSettings = this._getSubClassFilter([10]);
		}
		else {
			subClassSettings = this._getSubClassFilter([0,1,2,3,4,5,7,8]);
		}
		break;
	case 2:
		if( this._presetSubClassMask == 0 ) {
			showSlotFilter = true;
		}
		else {
			subClassSettings = this._getSubClassFilter( null );
		}
	};
	
	if( (this._presetSlotMask&F_SLT_MSK_WPN) != 0 || this._presetClass == 2  ) {
		dpsSettings = ['dps',FM_RIN];
		spdSettings = ['delay',FM_RIN];
	}
	if( showSlotFilter || this._presetSlotMask != 0 ) {
		slotSettings = this._getSlotFilter();
	}


	settings[0] = ['name',FM_IN,FM_STRING_SIMPLE];
	settings[1] = ['quality',FM_MSEL,F_QUALITY_OPTS];
	if(dpsSettings) { 
		settings[2] = dpsSettings;
		settings[3] = spdSettings;
	}
	if(slotSettings) { 
		settings[4] = slotSettings;
	}
	if(subClassSettings) { 
		settings[5] = subClassSettings;
	}
	settings[6] = ['lvl',FM_RIN];
	settings[7] = ["reqlvl",FM_RIN];
	
	this._filterManager.set(
		this._customFilterOptions,
		settings,
		args
	);
	
	var sf = this._filterManager._staticFilters;
	var lr0 = this._layout._cells[0];
	var i;
	
	for( i = 0; i<lr0.length; i++ ) {
		lr0[i].innerHTML = '';
	}
	
	div = this.getStaticInputNode( locale['F_Name'], sf[0]._node); 
	div.className = 'if_in_later';
	lr0[0].appendChild(div);
	
	div = this.getStaticInputNode( locale['F_ItemLevel'], sf[6]._node); 
	div.className = 'if_in_later';
	lr0[0].appendChild(div);
	
	div = this.getStaticInputNode( locale['F_RequiredLevel'], sf[7]._node); 
	div.className = 'if_in_later';
	lr0[0].appendChild(div);
	
	div = this.getStaticSelectNode( locale['F_Quality'], sf[1]._node); 
	div.className = 'if_in_later';
	lr0[3].appendChild(div);
	
	if( sf[2] ) {
		div = this.getStaticInputNode( locale['F_DPS'], sf[2]._node); 
		div.className = 'if_in_later';
		lr0[0].appendChild(div);
	}
	if( sf[3] ) { 
		div = this.getStaticInputNode( locale['F_Speed'], sf[3]._node); 
		div.className = 'if_in_later';
		lr0[0].appendChild(div);
	}
	if( sf[4] ) { 
		lr0[1].appendChild(this.getStaticSelectNode( locale['F_InventorySlot'], sf[4]._node ));
	}
	if( sf[5] ) { 
		lr0[2].appendChild(this.getStaticSelectNode( locale['F_ItemClass'], sf[5]._node ));
	}
};

ItemFilter.prototype._getSubClassFilter = function( subclasses ) {
	var show = [];
	var i;
	
	if( subclasses ) {
		for( i = 0; i < subclasses.length; i++ ) {
			show[show.length] = [subclasses[i],ITEM_CLASSES[this._presetClass][1][subclasses[i]]];
		}
	}
	else {
		for( i = 0; i < 32; i++ ) {
			if( ((1<<i)&this._presetSubClassMask) != 0) {
				show[show.length] = [i,ITEM_CLASSES[this._presetClass][1][i]];
			}
		}
	}
	return ["subclass",FM_MSEL,show];
};

ItemFilter.prototype._getSlotFilter = function() {
	var show = [];
	var slotMask = -1;
	var tmp = 0;
	var i;
	if( this._presetClass == 4 ) {
		if( this._presetSubClassMask == 0 ) {
			slotMask &= F_SLT_MSK[0]|F_SLT_MSK[1]|F_SLT_MSK[2]|F_SLT_MSK[3]|F_SLT_MSK[4];
		}
		else
		{
			for(i=0;i<5;i++) {
				if( this._presetSubClassMask & 1<<i  ) {
					tmp |= F_SLT_MSK[i];
				}
			}
			slotMask &= tmp;
		}
	}
	else if ( this._presetClass == 2 ) {
		if( this._presetSubClassMask == 0 ) {
			slotMask &= F_SLT_MSK_WPN;
		}
	}
	
	if( this._presetSlotMask ) {
		this._presetSlotMask &= slotMask;
	}
	else {
		this._presetSlotMask = slotMask;
	}

	for( i = 1; i <= 28; i++ ) {
		if( (this._presetSlotMask & 1<<i) == 0 ) {
			continue;
		}
		show[show.length] = [i, i == 14 ? locale['F_ShieldHand'] : locale['a_slot'][i]];
	}
	return [F_VAR_SLOT,FM_MSEL,show];
};