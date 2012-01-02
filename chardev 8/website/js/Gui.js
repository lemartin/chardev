var G_TAB_ITEMS = 0;
var G_TAB_GEMS = 1;
var G_TAB_ENCHANTS = 2;
var G_TAB_REFORGE = 3;
var G_TAB_SETS = 4;
var G_TAB_BUFFS = 5;

var G_TAB_CHARACTER_SHEET = 0;
var G_TAB_OVERVIEW = 2;
var G_TAB_SAVE = 4;

/**
 * @constructor
 * @returns {Gui}
 */
function Gui() {
	var div, form, formGrid, pGrid, tsFolder, i, d1,d2,d3;
	var sheetGrid = new StaticGrid(1,2); sheetGrid.setVerticalAlign(SG_VALIGN_TOP);
	var gemTab = document.createElement('div');
	var talentTab = document.createElement('div');
	var enchantTab = document.createElement('div');
	this._node = document.createElement("div");
	this._sheetParent = document.createElement("div"); this._sheetParent.className = "cs_sheet_p";
	this._talentsParent = document.createElement("div");
	this._overviewParent = document.createElement("div");
	this._profilesParent = document.createElement("div");
	
	this._itemsParent = document.createElement("div");
	this._gemsParent = document.createElement("div");
	this._enchantsParent = document.createElement("div");
	this._setsParent = document.createElement("div");
	this._buffsParent = document.createElement("div");
	this._glyphsParent = document.createElement("div");
	
	this._reforgeInterface = new ReforgeInterface();
	this._glyphInterface = new GlyphInterface();
	this._buffInterface = new BuffInterface();
	this._buffsParent.appendChild(this._buffInterface._node);
	
	this._reforgeInterface._reforgeOptimisationInterface.addListener( 'show_stat_weights_interface', new Handler(
		function() { this._statWeightInterface.show(); },
		this
	));
	
	this._statWeightInterface = new StatWeightInterface();
	
	this._randomPropertyInterface = new RandomPropertyInterface();
	enchantTab.appendChild(this._randomPropertyInterface._node);
	enchantTab.appendChild(this._enchantsParent);
	
	this._csFolder = new TabFolder(
		[this._itemsParent, gemTab, enchantTab, this._reforgeInterface._node, this._setsParent, this._buffsParent],
		["Items","Gems","Enchants","Reforging","Sets","Buffs"],
		"eqf"
	);

	d1 = document.createElement("div");
	d1.className = 'lp_t';
	d1.appendChild(this._csFolder._menu);
	
	d2 = document.createElement("div");
	d2.className = 'lp_m';
	d2.appendChild(this._csFolder._node);
	
	d3 = document.createElement("div");
	d3.className = 'lp_b';
	
	
	sheetGrid._cols[0].style.width = "343px";
	sheetGrid._cols[1].style.width = "637px";
	sheetGrid._cells[0][0].appendChild(this._sheetParent);
	sheetGrid._cells[0][1].appendChild(d1);
	sheetGrid._cells[0][1].appendChild(d2);
	sheetGrid._cells[0][1].appendChild(d3);
//
//	import
//	
	this._saveParent = document.createElement("div");
	this._importParent = document.createElement("div");
	
	
	form = document.createElement("form");
	form.onsubmit = new Function("return false");
	form.action = "#";
	Listener.add(form,"submit",this._onImportSubmit,this,[]);
	this._importName = document.createElement("input"); this._importName.className = "input im_sa_in";
	this._importServer = document.createElement("input"); this._importServer.className = "input im_sa_in";
	this._importRegion = new SingleSelect(
		[
		 [0,locale['US']+"/"+locale['Oceanic']],
		 [1,locale['Europe']],
		 [2,locale['Korea']],
		 [3,locale['Taiwan']],
		 [4,locale['China']]
		]
	);
	this._importRegion._node.className = "single_select single_select_focussable";
	this._import = document.createElement("input"); this._import.type = "submit"; this._import.value = "Import";
	this._import.className = '';
	
	Tools.jsCssClassHandler( this._import, { 'default': "button im_sa_btn", 'focus': "im_sa_btn_hover", 'hover': "im_sa_btn_hover"});
	
	div = document.createElement("div"); div.className = "im_sa_h"; div.appendChild(document.createTextNode("Import a character from the Armory"));
	this._importParent.appendChild(div);
	
	div = document.createElement("div"); div.className = "im_sa_r";
	d1 = document.createElement("div"); d1.className = "im_sa_left"; div.appendChild(d1); d1.appendChild(document.createTextNode("Name"));
	d2 = document.createElement("div"); d2.className = "im_sa_right"; div.appendChild(d2); d2.appendChild(this._importName);
	Tools.clearBoth(div);
	form.appendChild(div);
	
	div = document.createElement("div"); div.className = "im_sa_r";
	d1 = document.createElement("div"); d1.className = "im_sa_left"; div.appendChild(d1); d1.appendChild(document.createTextNode("Server"));
	d2 = document.createElement("div"); d2.className = "im_sa_right"; div.appendChild(d2); d2.appendChild(this._importServer);
	Tools.clearBoth(div);
	form.appendChild(div);
	
	div = document.createElement("div"); div.className = "im_sa_r";
	d1 = document.createElement("div"); d1.className = "im_sa_left"; div.appendChild(d1); d1.appendChild(document.createTextNode("Region"));
	d2 = document.createElement("div"); d2.className = "im_sa_right"; div.appendChild(d2); d2.appendChild(this._importRegion._node);
	Tools.clearBoth(div);
	form.appendChild(div);

	div = document.createElement("div"); div.className = "im_sa_b im_sa_add_padding"; div.appendChild(this._import);
	form.appendChild(div);
	
	this._importParent.appendChild(form);

	this._importParent.className = 'im_sa_p';
	
	this._importStatus = document.createElement("div");
	this._importParent.appendChild(this._importStatus);
//	
//	save
//	
	pGrid = new StaticGrid(4,1);
	pGrid._node.className = 'align_center';
	formGrid = new StaticGrid(1,2);
	formGrid._node.cellSpacing = "5px";
	form = document.createElement("form");
	form.onsubmit = new Function("return false");
	form.action = "#";
	Listener.add(form,"submit",this._onSave,this,[]);
	this._save = document.createElement("input"); this._save.value = locale['save_as_new']; this._save.type = "submit";
	
	Tools.jsCssClassHandler( this._save, { 'default': "button im_sa_save_btn", 'focus': "im_sa_save_btn_hover", 'hover': "im_sa_save_btn_hover"});
	
	this._saveCharacterName = document.createElement("input"); this._saveCharacterName.className = "input im_sa_in";
	this._saveCharacterDescription = document.createElement("input"); this._saveCharacterDescription.className = "input im_sa_in";

	this._saveUserName = document.createElement("input"); this._saveUserName.className = "input im_sa_in";

	this._savePassword = document.createElement("input"); this._savePassword.className = "input im_sa_in";
	this._savePassword.type = "password";
	
	div = document.createElement("div"); div.className = "im_sa_h"; div.appendChild(document.createTextNode("Save the current profile"));
	this._saveParent.appendChild(div);
	
	div = document.createElement("div"); div.className = "im_sa_r";
	d1 = document.createElement("div"); d1.className = "im_sa_left"; div.appendChild(d1); d1.appendChild(document.createTextNode(locale['S_ProfileName']));
	d2 = document.createElement("div"); d2.className = "im_sa_right"; div.appendChild(d2); d2.appendChild(this._saveCharacterName);
	Tools.clearBoth(div);
	form.appendChild(div);
	
	div = document.createElement("div"); div.className = "im_sa_r";
	d1 = document.createElement("div"); d1.className = "im_sa_left"; div.appendChild(d1); d1.appendChild(document.createTextNode(locale['S_CharacterDescription']));
	d2 = document.createElement("div"); d2.className = "im_sa_right"; div.appendChild(d2); d2.appendChild(this._saveCharacterDescription);
	Tools.clearBoth(div);
	form.appendChild(div);
// 	auth	
	this._authParent = document.createElement("div");
	div = document.createElement("div"); div.className = "im_sa_r";
	d1 = document.createElement("div"); d1.className = "im_sa_left"; div.appendChild(d1); d1.appendChild(document.createTextNode(locale['L_UserName']));
	d2 = document.createElement("div"); d2.className = "im_sa_right"; div.appendChild(d2); d2.appendChild(this._saveUserName);
	Tools.clearBoth(div);
	this._authParent.appendChild(div);
	
	div = document.createElement("div"); div.className = "im_sa_r";
	d1 = document.createElement("div"); d1.className = "im_sa_left"; div.appendChild(d1); d1.appendChild(document.createTextNode(locale['L_Password']));
	d2 = document.createElement("div"); d2.className = "im_sa_right"; div.appendChild(d2); d2.appendChild(this._savePassword);
	Tools.clearBoth(div);
	this._authParent.appendChild(div);
	form.appendChild(this._authParent);
	
	if( g_settings.profileId > 0 && g_settings.userId > 0 ) {
		div = document.createElement("div"); div.className = "im_sa_r";
		d1 = document.createElement("div"); d1.className = "im_sa_center im_sa_add_padding"; div.appendChild(d1); d1.appendChild(this._save);
	}
	else {
		div = document.createElement("div"); div.className = "im_sa_b im_sa_add_padding"; div.appendChild(this._save);
	}
	form.appendChild(div);
	this._saveParent.appendChild(form);
	
	if( g_settings.profileId > 0 && g_settings.userId > 0 ) {
		div = document.createElement("div"); div.className = "im_sa_border";
		this._saveParent.appendChild(div);
		
		div = document.createElement("div"); div.className = "im_sa_r"; div.innerHTML = '<span class="im_sa_notice">Update the current profile</span>';
		this._saveParent.appendChild(div);
		
		this._update = document.createElement("input"); this._update.value = locale['update_profile']; this._update.type = "submit";this._save.className = 'im_sa_save_btn';
		Tools.jsCssClassHandler( this._update, { 'default': "button im_sa_save_btn", 'focus': "im_sa_save_btn_hover", 'hover': "im_sa_save_btn_hover"});
		
		Listener.add(this._update,"click",this._onUpdate,this,null);
		div = document.createElement("div"); div.className = "im_sa_b im_sa_add_padding"; div.appendChild(this._update);
		this._saveParent.appendChild(div);
	}
	
	this._saveParent.className = 'im_sa_p';
//	
//	talents
//	
	tsFolder = new TabFolder(
		[this._talentsParent,this._glyphInterface._node],
		["Talents","Glyphs"],
		"ttf"
	);

	talentTab.appendChild(tsFolder._menu);
	talentTab.appendChild(tsFolder._node);
//	
//	
//	
	this._profileList = new ProfileList();
	this._profileList.set("ismine.eq.1;","", "");
	
	div = document.createElement("div"); div.className = 'pl_r';
	d1 = document.createElement("div"); d1.className = 'pl_t';
	d2 = document.createElement("div"); d2.className = 'pl_b';
	d2.appendChild(this._profileList._node);
	d1.appendChild(d2);
	div.appendChild(d1);
	this._profilesParent.appendChild(div);
	
	this._folder = new TabFolder(
		[sheetGrid._node,talentTab,this._overviewParent,this._importParent,this._saveParent,this._profilesParent],
		["Character Sheet","Talents","Overview","Import","Save","Browse"],
		"mtf"
	);
	

	this._node.appendChild(this._folder._node);
	//
	this._socketInterface = new SocketInterface();
	gemTab.appendChild(this._socketInterface._node);
	gemTab.appendChild(this._gemsParent);
	
	if( g_settings.sessionId ) {
		this._authParent.style.display = "none";
	}
}
Gui.prototype._node = null;
Gui.prototype._folder = null;
Gui.prototype._csFolder = null;

Gui.prototype._sheetParent = null;
Gui.prototype._talentsParent = null;
Gui.prototype._overviewParent = null;
Gui.prototype._profileList = null;
Gui.prototype._profilesParent = null;

Gui.prototype._itemsParent = null;
Gui.prototype._gemsParent = null;
Gui.prototype._enchantsParent = null;
Gui.prototype._setsParent = null;
Gui.prototype._buffsParent = null;

Gui.prototype._importParent = null;
Gui.prototype._saveParent = null;
Gui.prototype._importName = null;
Gui.prototype._importServer = null;
Gui.prototype._importRegion = null;
Gui.prototype._import = null;
Gui.prototype._importStatus = null;
Gui.prototype._importHandler = null;

Gui.prototype._authParent = null;
Gui.prototype._save = null;
Gui.prototype._saveCharacterName = null;
Gui.prototype._saveCharacterDescription = null;
Gui.prototype._saveUserName = null;
Gui.prototype._savePassword = null;
Gui.prototype._saveHandler = null;

Gui.prototype._update = null;
Gui.prototype._updateHandler = null;

Gui.prototype._socketInterface = null;
Gui.prototype._reforgeInterface = null;
Gui.prototype._glyphInterface = null;
Gui.prototype._buffInterface = null;
Gui.prototype._randomPropertyInterface = null;
Gui.prototype._statWeightInterface = null;


Gui.prototype._eqfMenu = null;
Gui.prototype.selectEqfTab = function ( tab ) {
	this._eqfMenu.select(tab);
	this._csFolder.show(tab);
};
/**
 * @param {Character} character
 */
Gui.prototype.update = function( character ) {
	Tools.setChild(this._sheetParent, character._sheet._node);
	Tools.setChild(this._itemsParent, character._itemList._node);
	Tools.setChild(this._gemsParent, character._gemList._node);
	Tools.setChild(this._setsParent, character._setList._node);
	Tools.setChild(this._enchantsParent, character._enchantList._node);
	
	this.updateTalents( character );
	this.updateGlyphTab(character);
	this._statWeightInterface.setCharacter( character);
};
Gui.prototype.onStatsCalculate = function( stats ) {
	this._reforgeInterface._reforgeOptimisationInterface.update( stats );
};
Gui.prototype.updateGlyphTab = function( character ) {
	this._glyphInterface.update(character);
};
Gui.prototype.updateTalents = function( character ) {
	if( character._chrClass != null ) {
		Tools.setChild(this._talentsParent, character._chrClass._talents._node);
	}
};
Gui.prototype.updateGemTab = function( character, slot, socket ) {
	this._socketInterface.update(character, slot, socket );
};

Gui.prototype._onImportSubmit = function() {
	var name = this._importName.value;
	var server = this._importServer.value;
	if( name == "" || name.length < 2 ) {
		Tooltip.showError("The character name is empty or too short!");
		return;
	}
	if( server == "" ) {
		Tooltip.showError("The server name is empty or too short!");
		return;
	}
	if( this._importHandler ) { 
		this._importHandler[0].apply(this._importHandler[1],[name,server,parseInt(this._importRegion.getSelected(),10)]);
	}
};

Gui.prototype.setImportHandler = function( handler, scope ) {
	this._importHandler = [handler,scope];
};

Gui.prototype._onSave = function() {
	var cName = this._saveCharacterName.value;
	var cDesc = this._saveCharacterDescription.value;
	var uName = this._saveUserName.value;
	var pw = this._savePassword.value;
	
	if( ! g_settings.sessionId ) {
		if( uName == "" || uName.length < 4 ) {
			Tooltip.showError("The user name is empty or too short!");
			return;
		}
		if( pw == "" || pw.length < 4 ) {
			Tooltip.showError("The password is empty or too short!");
			return;
		}
	}
	
	if( this._saveHandler ) { 
		this._saveHandler[0].apply(this._saveHandler[1],[cName,cDesc,uName,pw]);
	}
};

Gui.prototype._onUpdate = function() {
	var cName = this._saveCharacterName.value;
	var cDesc = this._saveCharacterDescription.value;
	
	if( this._updateHandler ) { 
		this._updateHandler[0].apply(this._updateHandler[1],[ cName, cDesc ]);
	}
};

Gui.prototype.setUpdateHandler = function( handler, scope ) {
	this._updateHandler = [handler,scope];
};

Gui.prototype.setSaveHandler = function( handler, scope ) {
	this._saveHandler = [handler,scope];
};

Gui.prototype.updateOverview = function( character ) {
	var i, j, itm, gem, bsSocket = false;
	var str = "<div class='ov_parent'><div class='ov_character_info'>Level " + character._level;
	if( character._chrRace ) {
		str += " "+character._chrRace._name;
	}
	if( character._chrClass ) {
		var spec = "";
		if( character._chrClass._talents._selectedTree != -1 ) {
			spec = "<span class='ov_spec'>"+character._chrClass._talents._treeNames[character._chrClass._talents._selectedTree]+"</span> ";
		}
		str += " <span class='ov_class_"+character._chrClass._id+"'>"+spec+character._chrClass._name+"</span>";
	}
	str += "<div class='ov_avg_item_level'>"+locale['OV_AverageItemLevel']+": "+Math.floor(character._stats._itemLevel)+"</div>";
	str += "</div>";
	
	for( i=0; i<character._inventory._items.length; i++ ) {
		itm = character._inventory._items[i][0];
		bsSocket = i == 9;
		if( itm == null ) {
			continue;
		}
		str += "<div class='ov_item_parent'><div class='ov_slot'>"+locale['a_slot'][itm._inventorySlot]+"</div>";
		str += "<div><a class='ov_item' onmousemove='g_moveTooltip();' onmouseout='g_hideTooltip();' onmouseover='g_showItemBySlot("+i+");' style='color:"+g_color[itm._quality]+"; white-space:nowrap;'>"+itm._name+"</a> <span class='ov_item_level'>("+itm._level+")</span></div>";
		//
		//	GEMS
		//
		for( j=0; j<itm._gems.length; j++ ) {
			gem = itm._gems[j];
			if( gem == null && itm._socketColors[j] == 0 ) {
				if( bsSocket ) {
					bsSocket = false;
				}
				else {
					continue;
				}
			}
			
			str += "<div class='ov_socket'>";
			if( itm._socketColors[j] == 0 ) {
				str += locale['blacksmithingsocket']+": ";
			}
			else if( itm._socketColors[j] == 14 ) {
				str += locale['PrismaticSocket']+": ";
			}
			else {
				str += locale['a_socket'][Math.log(itm._socketColors[j])/Math.log(2)]+": ";
			}
			if( gem != null ) {
				str += "<a class='ov_gem' onmousemove='g_moveTooltip();' onmouseout='g_hideTooltip();' onmouseover='g_showItemWithoutPreview("+gem._id+");' style='color:"+g_color[gem._quality]+"; white-space:nowrap;'>"+gem._name+"</a>";
			}
			else {
				str += locale['OV_EmptySocket'];
			}
			str += "</div>";
		}
		//
		//	ENCHANT
		//
		var es = itm._enchants;
		if( es.length > 0 ) {
			str += "<div class='ov_enchant'>"+locale['OV_Enchant']+":";
			for( j=0; j<es.length; j++) {
				str += "<div class='ov_enchant_desc'>"+es[j]._description+"</div>";
			}
			str += "</div>";
		}
		str += "</div>";
	}
	
	this._overviewParent.innerHTML = str+"</div>";
};
