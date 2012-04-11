/**
 * @constructor
 */
function Gui() {
	this.characterSheet = new CharacterSheet();
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("import", ["name", "server", "region" ]);
	this.eventMgr.registerEvent("save", ["name", "desc" ]);
	this.eventMgr.registerEvent("update", []);
	this.eventMgr.registerEvent("tab_change", ["newTab", "oldTab"]);
	this.eventMgr.registerEvent("csfolder_tab_change", ["newTab", "oldTab"]);
	
	var div, form, formGrid, pGrid, tsFolder, i, d1,d2,d3;
	var sheetGrid = new StaticGrid(1,2); sheetGrid.setVerticalAlign(StaticGrid.VALIGN_TOP);
	var gemTab = document.createElement('div');
	var talentTab = document.createElement('div');
	var enchantTab = document.createElement('div');
	this.node = document.createElement("div"); this.node.className = 'gui_p';
	this.sheetParent = document.createElement("div"); this.sheetParent.className = "cs_sheet_p";
	this.talentsGui = new TalentsGui();
	this.overview = new Overview();
	this.profilesParent = document.createElement("div"); this.profilesParent.style.paddingTop = "20px";
	
	this.itemsParent = document.createElement("div");
	this.enchantsParent = document.createElement("div");
	this.setsParent = document.createElement("div");
	
	this.sheetParent.appendChild( this.characterSheet.node );
	
	
	this.reforgeInterface = new ReforgeInterface();
	this.glyphInterface = new GlyphInterface();
	this.buffInterface = new BuffInterface();
	
//	this.reforgeInterface.reforgeOptimisationInterface.addListener( 'show_stat_weights_interface', new Handler(
//		function() { this.statWeightInterface.show(); },
//		this
//	));
	
//	this.statWeightInterface = new StatWeightInterface();
	
	this.randomPropertyInterface = new RandomPropertyInterface();
	enchantTab.appendChild(this.randomPropertyInterface.node);
	enchantTab.appendChild(this.enchantsParent);
	
	this.csFolder = new TabFolder(
		[this.itemsParent, gemTab, enchantTab, this.reforgeInterface.node, this.setsParent, this.buffInterface.node],
		["Items","Gems","Enchants","Reforging","Sets","Buffs"],
		"eqf"
	);

	d1 = document.createElement("div");
	d1.className = 'gui_lp_menu';
	d1.appendChild(this.csFolder.menu);
	
	d2 = document.createElement("div");
	d2.className = 'gui_lp_content';
	d2.appendChild(this.csFolder.node);
	
	
	sheetGrid.cols[0].style.width = "300px";
	sheetGrid.cols[1].style.width = "660px";
	sheetGrid.cells[0][0].appendChild(this.sheetParent);
	sheetGrid.cells[0][1].className = 'gui_list_p';
	sheetGrid.cells[0][1].appendChild(d1);
	sheetGrid.cells[0][1].appendChild(d2);
//	
//	talents
//	
	tsFolder = new TabFolder(
		[this.talentsGui.node, this.glyphInterface.node],
		["Talents","Glyphs"],
		"tsf"
	);

	talentTab.appendChild(tsFolder.menu);
	talentTab.appendChild(tsFolder.node);
	talentTab.className = 'gui_tt';
//	
//	
//
	this.importInterface = new ImportInterface(new Handler( this.__onImport, this));
	this.saveInterface = new SaveInterface();
	
	this.saveInterface.eventMgr.addPropagator('save', this.eventMgr);
	this.saveInterface.eventMgr.addPropagator('update', this.eventMgr);
	
	this.folder = new TabFolder(
		[sheetGrid.node,talentTab,this.overview.node,this.importInterface.node,this.saveInterface.node,this.profilesParent],
		["Character Sheet","Talents","Overview","Import","Save","Browse"],
		"cp_mm"
	);
	

	this.node.appendChild(this.folder.node);
	//
	this.socketInterface = new SocketInterface();
	gemTab.appendChild(this.socketInterface.node);

	this.folder.setOnChangeHandler(new Handler(function( newTab, oldTab) {
		this.eventMgr.fire('tab_change',{'newTab':newTab,'oldTab':oldTab});
	}, this
	));
	this.csFolder.setOnChangeHandler(new Handler(function( newTab, oldTab) {
		this.eventMgr.fire('csfolder_tab_change',{'newTab':newTab,'oldTab':oldTab});
	}, this
	));
}

Gui.TAB_ITEMS = 0;
Gui.TAB_GEMS = 1;
Gui.TAB_ENCHANTS = 2;
Gui.TAB_REFORGE = 3;
Gui.TAB_SETS = 4;
Gui.TAB_BUFFS = 5;

Gui.TAB_CHARACTER_SHEET = 0;
Gui.TAB_OVERVIEW = 2;
Gui.TAB_SAVE = 4;

Gui.prototype = {
	characterSheet: null,
	eventMgr: null,
	folder: null,
	tabFolderObserver: null,
	talentsGui: null,
	importInterface: null,
	saveInterface: null,
	reforgeInterface: null,
	glyphInterface: null,
	buffInterface: null,
	overview: null,
	__onImport: function( name, server, region ){
		this.eventMgr.fire(
			'import', {
				'name':name, 
				'server':server, 
				'region': region
		});
	},
	__onSave: function( name, desc ){
		this.eventMgr.fire(
			'save', {
				'name':name, 
				'desc':desc
		});
	},
	__onUpdate: function(){},
	/**
	 * @param {ItemListGui} itemListGui
	 */
	initLists: function( itemListGui, enchantListGui, profileListGui ) {

//		DOM.set(this.sheetParent, character._sheet._node);
		DOM.set(this.itemsParent, itemListGui.node);
		DOM.set(this.enchantsParent, enchantListGui.node);
		DOM.set(this.profilesParent, profileListGui.node);
//		DOM.set(this.setsParent, character._setList._node);
//		DOM.set(this.enchantsParent, character._enchantList._node);
	}
};