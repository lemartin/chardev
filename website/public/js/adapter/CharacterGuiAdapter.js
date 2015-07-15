/**
 * @constructor
 * @param {Character} character
 * @param {Gui} gui
 */
function CharacterGuiAdapter( character, gui ) {
	
	this.character = character;
	this.gui = gui;
	
	this.socketInterfaceController = new SocketInterfaceController( this.gui.socketInterface, this);
	this.enchantInterfaceController = new EnchantInterfaceController( this.gui.enchantInterface, this);
	this.buffInterfaceController = new BuffInterfaceController( this.gui.buffInterface, this);
	this.reforgeInterfaceController = new ReforgeInterfaceController( this.gui.reforgeInterface, this);
	this.saveInterfaceController = new SaveInterfaceController( this.gui.saveInterface, this);
	this.importInterfaceController = new ImportInterfaceController( this.gui.importInterface, this);
	this.glyphInterfaceController = new GlyphInterfaceController( this.gui.glyphInterface, this);
	this.talentsInterfaceController = new TalentsInterfaceController( this.gui.talentsGui, this);
	this.specialisationInterfaceController = new SpecialisationInterfaceController( this.gui.specInterface, this);
	
	this.itemTabController = new ItemTabController(this);
	this.setTabController = new SetTabController(this);
	
	this.sheetController = new CharacterSheetController( character, this.gui.characterSheet);
	//
	//	Character sheet handle - Tab switch on item slot click
	//
	this.gui.characterSheet.addObserver(new GenericObserver([
        "item_left_click"
    ], new Handler( this.characterSheetHandler, this)));
	//
	//	Character handler - Class change: List filter update, Gui update 
	//
	this.character.addObserver(new GenericObserver([
        "class_change", "item_change", "gem_change", "enchant_change", 
        "reforge_change", "random_enchant_change", "glyph_added", 
        "glyph_removed", "level_change"
    ], new Handler( this.characterHandler, this)));
	//
	//	Gui - Tabs
	//
	this.gui.eventMgr.addObserver( new GenericObserver( [
        "tab_change", "csfolder_tab_change", "spec_tab_change"
    ], new Handler( this.guiHandler, this )));
	//
	// Gui - Lists
	//
	gui.initLists( 
			this.itemTabController.getListGui(), 
			this.setTabController.getListGui() 
	);
	//
	// Gui - Initialisation
	//
	this.updateClass(null);
}

CharacterGuiAdapter.prototype = {
	character: null,
	gui: null,
	slot: -1,
	socket: -1,
	adapter: null,
	guiTab: 0,
	csTab: 0,
	specTab: 0,
	characterObserver: null,
	enchantInterfaceController: null,
	socketInterfaceController: null,
	buffInterfaceController: null,
	reforgeInterfaceController: null,
	importInterfaceController: null,
	saveInterfaceController: null,
	glyphInterfaceController: null,
	talentsInterfaceController: null,
	specialisationInterfaceController: null,
	itemTabController: null,
	setTabController: null,
	sheetController: null,
	//
	// METHODS
	//
	updateCharacterSheetTab: function() {		
		switch( this.csTab ) {
		case Gui.TAB_ITEMS: this.itemTabController.update(); break;
		case Gui.TAB_GEMS: this.socketInterfaceController.update(); break;
		case Gui.TAB_ENCHANTS: this.enchantInterfaceController.update(); break;
		case Gui.TAB_REFORGE: this.reforgeInterfaceController.update(); break;
		case Gui.TAB_SETS: this.setTabController.update(); break;
		case Gui.TAB_BUFFS: this.buffInterfaceController.update();break;
		}
	},
	/**
	 * @param {User} user
	 */
	setUser: function( user ) {
		if( user && user.region ) {
			this.importInterfaceController.setRegion( user.region );
		}
		this.importInterfaceController.setStoredImports( user ? user.battleNetProfiles : null );
		this.saveInterfaceController.setUserId( user ? user.id : 0);
	},
	/**
	 * @param {GenericEvent} e
	 */
	guiHandler: function( e ) {
		if( e.is("tab_change") ) {
			this.guiTab = e.get("newTab");
			switch(this.guiTab) {
			case Gui.TAB_OVERVIEW:
				this.gui.overview.update(new CharacterFacade(this.character));
				break;
			case Gui.TAB_SAVE:
				this.saveInterfaceController.update();
				break;
			}
		}
		else if( e.is("csfolder_tab_change") ) {
			this.csTab = e.get("newTab");
			this.updateCharacterSheetTab();
		}
		else if( e.is("spec_tab_change") ) {
			this.specTab = e.get("newTab");
			if( e.get("newTab") == Gui.TAB_GLYPHS ) {
				this.glyphInterfaceController.update();
			}
		}
	},
	/**
	 * @param {GenericEvent} e
	 */
	characterSheetHandler: function( e ) {
		if( e.is("item_left_click") ) {
			if( e.get("index") == 0 ) {
				this.slot = e.get("slot");
				
				var itm = this.character.getEquippedItem(this.slot, 0);
				
				if( ! itm && this.csTab != Gui.TAB_ITEMS ) {
					this.gui.csFolder.show(Gui.TAB_ITEMS);
				}
				else {
					this.updateCharacterSheetTab();
				}
			}
		}
	},
	/**
	 * @param {GenericEvent} e
	 */
	characterHandler: function( e ) {
		if( e.is("class_change")) {
			this.updateClass( this.character.chrClass );
		}
		else if( e.is("level_change")) {
			this.updateLevel( this.character.level);
		}
		else if( e.is("item_change")) {
			switch( this.csTab ) {
			case Gui.TAB_GEMS: this.socketInterfaceController.update(); break;
			case Gui.TAB_ENCHANTS: this.enchantInterfaceController.update(); break;
			case Gui.TAB_REFORGE: this.reforgeInterfaceController.update(); break;
			}
		}
		else if( e.is("gem_change") && this.csTab == Gui.TAB_GEMS) {
				this.socketInterfaceController.update();
		}
		else if( e.is("reforge_change") && this.csTab == Gui.TAB_REFORGE) {
				this.reforgeInterfaceController.update();
		}
		else if( (e.is("enchant_change") || e.is("random_enchant_change")) && this.csTab == Gui.TAB_ENCHANTS ) {
			this.reforgeInterfaceController.update();
		}
		else if( (e.is('glyph_added') || e.is('glyph_removed')) && this.guiTab == Gui.TAB_TALENTS && this.specTab == Gui.TAB_GLYPHS ) {
			this.glyphInterfaceController.update();
		}
	},
	/**
	 * @param {CharacterClass} chrClass
	 */
	updateClass: function( chrClass ) {
		var newArg = ( chrClass != null ? "usablebyclass.eq."+(1<<(chrClass.id-1))+";" : "usablebyclass.eq.0;");
		
		this.itemTabController.replaceArgument("usablebyclass", newArg);
		this.setTabController.replaceArgument("usablebyclass", newArg);
		
		this.buffInterfaceController.initialised = false;

		this.glyphInterfaceController.update();
		
		this.updateCharacterSheetTab();
	},
	updateLevel: function( level ) {
		var newArg = "canbeusedwithlvl.eq."+level+";";
		
		this.itemTabController.replaceArgument("canbeusedwithlvl", newArg);
		this.setTabController.replaceArgument("canbeusedwithlvl", newArg);
		
		this.glyphInterfaceController.update();
		
		this.updateCharacterSheetTab();
	},
	setProfileInfo: function( profileId, profileUserId ) {
		this.saveInterfaceController.setProfileInfo(profileId, profileUserId);
	}
};