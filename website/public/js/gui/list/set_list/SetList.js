/**
 * @constructor
 */
function SetList() {
	var data = {};
	data[locale['F_General']] = [
    	new InputFilterData( locale['F_Name'], 'name', InputFilterData.TYPE_STRING_SIMPLE ),
    	new RangeInputFilterData( locale['F_ItemLevel'], 'level' ),
    	new RangeInputFilterData( locale['F_RequiredLevel'], 'reqlvl' )
    ];
    data[locale['F_Requirements']] = [
    	new SingleSelectFilterData( locale['F_UsableBy'], 'usablebyclass', FILTER_CLASS_OPTIONS),
    	new InputFilterData( locale['F_CanBeUsedWithLevel'], 'canbeusedwithlvl', InputFilterData.TYPE_NUMERIC ),
    	new SingleSelectFilterData( locale['F_RequiresReputation'], 'reqrepu', FILTER_YES_NO_OPTIONS)
    ];
	
	var gui = new SetListGui(List.toCategories(data));
	List.call( 
		this,
		gui,
		List.toPlainFilterData(data), 
		['name', 'level', 'reqlvl'],
		'level'
	);
	
	this.eventMgr.registerEvent('itemset_click', ['items']);
	this.gui.eventMgr.addPropagator('itemset_click', this.eventMgr);
}

SetList.prototype = new List(null,null,null,"");