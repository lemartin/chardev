/**
 * @constructor
 */
function Gui() {
	this.characterSheet = new CharacterSheet();
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent("tab_change", ["newTab", "oldTab"]);
	this.eventMgr.registerEvent("csfolder_tab_change", ["newTab", "oldTab"]);
	this.eventMgr.registerEvent("spec_tab_change", ["newTab", "oldTab"]);
	
	var tsFolder, d1,d2;
	var sheetGrid = new StaticGrid(1,2); sheetGrid.setVerticalAlign(StaticGrid.VALIGN_TOP);
	var talentTab = document.createElement("div");
	this.node = document.createElement("div"); this.node.className = 'gui_p';
	this.sheetParent = Dom.create( 'div', { 'class': 'cs_sheet_p'} );
	this.talentsGui = new TalentsInterface();
	this.overview = new Overview();
	this.profilesParent = document.createElement("div"); this.profilesParent.style.paddingTop = "20px";
	
	this.itemsParent = document.createElement("div");
	this.enchantsParent = document.createElement("div");
	this.setsParent = document.createElement("div");
	
	this.reforgeInterface = new ReforgeInterface();
	this.glyphInterface = new GlyphInterface();
	this.buffInterface = new BuffInterface();
	this.enchantInterface = new EnchantInterface();
	this.socketInterface = new SocketInterface();
	this.importInterface = new ImportInterface();
	this.saveInterface = new SaveInterface();
	this.specInterface = new SpecialisationInterface();
	this.sheetParent.appendChild( this.characterSheet.node );
	
	
	this.csFolder = new TabFolder(
		[this.itemsParent, this.socketInterface.node, this.enchantInterface.node, this.reforgeInterface.node, this.setsParent, this.buffInterface.node],
		["Items","Gems","Enchants","Reforging","Sets","Buffs"],
		"eqf"
	);

	d1 = Dom.create("div", {"class": "gui_lp_menu"});
	d1.appendChild(this.csFolder.menu);
	
	d2 = Dom.create("div", {"class": "gui_lp_content"});
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
	var talentGrid = new StaticGrid(1,2);
	talentGrid.node.style.margin = "0 auto";
	talentGrid.setVerticalAlign(StaticGrid.VALIGN_TOP);
	talentGrid.cells[0][0].appendChild(this.specInterface.node);
	talentGrid.cells[0][1].appendChild(this.talentsGui.node);
	
	tsFolder = new TabFolder(
		[talentGrid.node, this.glyphInterface.node],
		["Specialisation","Glyphs"],
		"tsf"
	);
	
	tsFolder.setOnChangeHandler(new Handler(function( newTab, oldTab) {
		this.eventMgr.fire('spec_tab_change',{'newTab':newTab,'oldTab':oldTab});
	}, this));

	talentTab.appendChild(tsFolder.menu);
	talentTab.appendChild(tsFolder.node);
	talentTab.className = 'gui_tt';
//	
//	
//
	
	this.folder = new TabFolder(
		[sheetGrid.node,talentTab,this.overview.node,this.importInterface.node,this.saveInterface.node,this.profilesParent],
		["Character Sheet","Spec","Overview","Import","Save","Browse"],
		"cp_mm"
	);
	

	this.node.appendChild(this.folder.node);
	//

	this.folder.setOnChangeHandler(new Handler(function( newTab, oldTab) {
		this.eventMgr.fire('tab_change',{'newTab':newTab,'oldTab':oldTab});
	}, this));
	
	this.csFolder.setOnChangeHandler(new Handler(function( newTab, oldTab) {
		this.eventMgr.fire('csfolder_tab_change',{'newTab':newTab,'oldTab':oldTab});
	}, this));
}

Gui.TAB_ITEMS = 0;
Gui.TAB_GEMS = 1;
Gui.TAB_ENCHANTS = 2;
Gui.TAB_REFORGE = 3;
Gui.TAB_SETS = 4;
Gui.TAB_BUFFS = 5;

Gui.TAB_CHARACTER_SHEET = 0;
Gui.TAB_TALENTS = 1;
Gui.TAB_OVERVIEW = 2;
Gui.TAB_IMPORT = 3;
Gui.TAB_SAVE = 4;

Gui.TAB_SPEC = 0;
Gui.TAB_GLYPHS = 1;

Gui.prototype = {
	characterSheet: null,
	eventMgr: null,
	folder: null,
	tabFolderObserver: null,
	talentsGui: null,
	importInterface: null,
	saveInterface: null,
	socketInterface: null,
	enchantInterface: null,
	reforgeInterface: null,
	glyphInterface: null,
	buffInterface: null,
	overview: null,
	specInterface: null,
	/**
	 * @param {ItemListGui} itemListGui
	 */
	initLists: function( itemListGui, setList ) {
		Dom.set(this.itemsParent, itemListGui.node);
		Dom.set(this.setsParent, setList.node);
	},
	setProfileListGui: function( profileListGui ) {
		Dom.set(this.profilesParent, profileListGui.node);
	}
};