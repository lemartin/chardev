/**
 * @constructor
 */
function SpellList() {
	List.call( 
		this,
		new SpellListGui(List.toCategories(SpellList.FILTER_DATA)),
		List.toPlainFilterData(SpellList.FILTER_DATA), 
		['name'],
		SpellList.ORDER_ID
	);
}

/*

		"itemclass.ba."+(1<<itm._class)+";" +
		"itemsubclass.ba."+(1<<itm._subClass)+";" +
		"slot.ba."+(1<<itm._inventorySlot)+";" +
		"enchantitemlevel.le."+itm._level+";" +
		"enchantchrlevel.le."+chrLevel+";" +
*/
SpellList.FILTER_DATA = {};
SpellList.FILTER_DATA[locale['F_General']] = [
	new InputFilterData( locale['F_Name'], 'name', InputFilterData.TYPE_STRING_SIMPLE),
	new InputFilterData( locale['F_Description'], 'description', InputFilterData.TYPE_STRING_SIMPLE)
];
/*
SpellList.FILTER_DATA[locale['F_Stats']] = [
	new InputFilterData( locale['CS_Stats'][1][0], 'str', InputFilterData.TYPE_NUMERIC),
	new InputFilterData( locale['CS_Stats'][1][1], 'agi', InputFilterData.TYPE_NUMERIC),
	new InputFilterData( locale['CS_Stats'][1][2], 'sta', InputFilterData.TYPE_NUMERIC),
	new InputFilterData( locale['CS_Stats'][1][3], 'int', InputFilterData.TYPE_NUMERIC),
	new InputFilterData( locale['CS_Stats'][1][4], 'spi', InputFilterData.TYPE_NUMERIC)
];
*/
SpellList.FILTER_DATA[locale['F_Enchant']] = [,
	new SingleSelectFilterData( locale['F_IsEnchant'], 'isenchant', FILTER_YES_NO_OPTIONS ),
	new InputFilterData( locale['F_EnchantItemLevel'], 'enchantitemlevel', InputFilterData.TYPE_NUMERIC),
	new InputFilterData( locale['F_EnchantCharacterLevel'], 'enchantchrlevel', InputFilterData.TYPE_NUMERIC),
	new SingleSelectFilterData( locale['F_ItemSubClass'], 'itemclasssubclasscombined', List.getItemSubClassOptions() ),
	new MultiSelectFilterData( locale['F_InventorySlot'], 'slot', List.getSlotOptions())
];

SpellList.ORDER_ID = 'id';
SpellList.ORDER_NAME = 'name';
SpellList.ORDER_ENCHANT_CHR_LEVEL = 'enchantchrlevel';

SpellList.ENCHANT_LIST = 0;
SpellList.BUFF_LIST = 1;
SpellList.SPELL_LIST = 2;

SpellList.prototype = new List(null,null,null,"");