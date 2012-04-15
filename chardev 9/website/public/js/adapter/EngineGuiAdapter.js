/**
 * @constructor
 * @param {EngineImpl} engine
 * @param {Gui} gui
 */
function EngineGuiAdapter( engine, gui ) {
	
	this.engine = engine;
	this.gui = gui;
	this.sheetObserver = new GenericObserver(['item_left_click'], new Handler( function( e ) {
		if( e.is('item_left_click') ) {
			this.__onItemSlotLeftClick(e.get('slot'), e.get('index'));
		}
	}, this));
	
	this.storedItemFilters = [];
	
	for( var i=0; i<Inventory.SLOTS; i++ ) {
		this.storedItemFilters[i] = "";
	}
	
	var cHanlder = new Handler(function( e ){
		if( e.is('class_change') ) {
			this.__updateClass(e.get('class'));
		}
		else if( e.is('character_loaded') ) {
			this.updateGlyphTab();
		}
		else if( e.is('gem_change') ) {
			if ( this.guiTab == Gui.TAB_CHARACTER_SHEET && this.csTab == Gui.TAB_GEMS ) {
				this.updateGemsTab();
			}
		}
		else if( e.is('item_change') ) {
			if( e.get('slot') == this.slot ) {
				switch( this.guiTab ) {
				case Gui.TAB_OVERVIEW:
					this.updateOverviewTab();
					break;
				case Gui.TAB_CHARACTER_SHEET:
					switch( this.csTab ) {
					case Gui.TAB_GEMS:
						this.updateGemsTab();
						break;
					case Gui.TAB_REFORGE:
						this.updateReforgeTab();
						break;
					case Gui.TAB_ENCHANTS:
						this.updateEnchantsTab();
						break;
					}
					break;
				}
			}
		}
		else if( e.is('random_enchant_change') ) {
			if ( this.guiTab == Gui.TAB_CHARACTER_SHEET && this.csTab == Gui.TAB_ENCHANTS ) {
				var cc = this.engine.getCurrentCharacter();
				this.gui.randomPropertyInterface.update(new EquippedItem( cc, cc.getEquippedItem(this.slot), this.slot));
			}
		}
		else if( e.is('talent_tree_selected') ) {
			gui.talentsGui.selectTree(e.get('tree'));
		}
		else if( e.is('talent_tree_reset') ) {
			gui.talentsGui.update();
		}
		else if( e.is('talents_reset') ) {
			gui.talentsGui.selectTree(this.engine.getCurrentCharacter().getSelectedTalentTree());
			gui.talentsGui.update();
		}
		else if( e.is('talent_point_added') ) {
			gui.talentsGui.update();
		}
		else if( e.is('talent_point_removed') ) {
			gui.talentsGui.update();
		}
		else if( e.is('talent_distribution_set') ) {
			gui.talentsGui.update();
		}
		else {
			throw new Error("Unhandled event: "+e.event);
		}
	}, this);
	this.characterObserver = new GenericObserver([
		'class_change', 'gem_change','random_enchant_change',
		'talent_tree_selected','talents_reset','talent_tree_reset',
		'talent_point_added','talent_point_removed',
		'talent_distribution_set', 'character_loaded', 'item_change'
	], cHanlder);
	
	this.gui.characterSheet.addObserver(this.sheetObserver);
	//
	//
	//
	//
	//
	var gHandler = new Handler(function( e ){
		var cc = this.engine.getCurrentCharacter();
		if( e.is('select_talent_tree') ) {
			cc.selectTalentTree(e.get('tree'));
		}
		else if( e.is('reset_talent_tree') ) {
			cc.resetTalentTree(e.get('tree'));
		}
		else if( e.is('reset_talents') ) {
			cc.resetTalents();
		}
		else if( e.is('add_talent_point') ) {
			cc.addTalentPoint(e.get('tree'), e.get('row'), e.get('col'));
		}
		else if( e.is('remove_talent_point') ) {
			cc.removeTalentPoint(e.get('tree'), e.get('row'), e.get('col'));
		}
		else if( e.is('show_tooltip') ) {
			var row = e.get('row'), col = e.get('col'), tree = e.get('tree');
			Tooltip.showTalent( TalentTooltip.getHTML(cc.getTalents(), tree, row, col, null), tree, row, col, e.get('node'));
		}
		else {
			throw new Error("Unhandled event "+e.event);
		}
	},this);
	var gObserver = new GenericObserver(['select_talent_tree', 'reset_talent_tree', 'reset_talents','show_tooltip','add_talent_point', 'remove_talent_point'], gHandler);
	gui.talentsGui.addObserver(gObserver);
	//
	//#########################################################################
	//
	//	ITEM LIST
	//
	//#########################################################################
	//
	this.itemList = new ItemList();
	//
	this.itemList.gui.show( false );
	this.itemList.gui.propagateParent.style.display = "block";
	//
	var ilHandler = new Handler(function( e ){
		var cc;
		if( e.is('show_tooltip') ) {
			cc = this.engine.getCurrentCharacter();
			Tooltip.showMovable( ItemTooltip.getHTML(e.get('entity'), cc) );
			cc.setItemPreview( this.slot, e.get('entity') );
		}
		else if( e.is('move_tooltip') ) {
			Tooltip.move();
		}
		else if( e.is('hide_tooltip') ) {
			Tooltip.hide();
			this.engine.getCurrentCharacter().removeItemPreview();
		}
		else if( e.is('click') ) {
			cc = this.engine.getCurrentCharacter();
			if( cc && this.slot != -1 ) {
				try {
					cc.addItem( this.slot, e.get('entity').clone() );
				}
				catch( ex ) {
					if( ex instanceof InvalidItemException ) {
						Tooltip.showError(ex);
					}
					else {
						Tools.rethrow(ex);
					}
				}
			}
		}
		else if( e.is('update') ) {
			new ListBackEndProxy("api/items.php").update(this.itemList);
			if( this.slot != -1 ) {

				var args = this.itemList.getArgumentString(); 

				this.__propagateFilterSettings('name',args);
				this.__propagateFilterSettings('quality',args);
				this.__propagateFilterSettings('level',args);
				this.__propagateFilterSettings('reqlvl',args);
				
				if( DOM.getValue(this.itemList.gui.propagateCheckbox)) {
					var cs = this.itemList.filterMgr.customFilters;
					for( var k in cs) {
						this.__propagateFilterSettings(cs[k].variable, cs[k].getArgumentString());
					}
				}
				
				this.storedItemFilters[this.slot] = args;
				//
				// TODO: propagation of common attributes like quality etc.
			}
		}
	}, this);
	//
	var ilObserver = new GenericObserver([
		'show_tooltip',
		'move_tooltip',
		'hide_tooltip',
		'update',
		'click'
	], ilHandler);
	//
	this.itemList.addObserver(ilObserver);
	//
	//#########################################################################
	//
	//	Set LIST
	//
	//#########################################################################
	//
	this.setList = new SetList();
	this.setList.filterMgr.hideFilter('usablebyclass', true);
	this.setList.gui.showFilter(true);
	this.setList.updateFilter();
	//
	this.setList.addObserver(new GenericObserver([ 'show_tooltip', 'move_tooltip', 'hide_tooltip', 'update', 'click', 'itemset_click'], new Handler( function( e ){
			var cc;
			if( e.is('show_tooltip') ) {
				cc = this.engine.getCurrentCharacter();
				Tooltip.showMovable( ItemTooltip.getHTML(e.get('entity'), cc) );
				cc.setItemPreview( this.slot, e.get('entity') );
			}
			else if( e.is('move_tooltip') ) {
				Tooltip.move();
			}
			else if( e.is('hide_tooltip') ) {
				Tooltip.hide();
				this.engine.getCurrentCharacter().removeItemPreview();
			}
			else if( e.is('click') ) {
				cc = this.engine.getCurrentCharacter();
				if( cc ) {
					this.equipSetItem(e.get('entity'));
				}
			}
			else if( e.is('itemset_click')) {
				var items = e.get('items');
				for( var i=0; i<items.length; i++) {
					this.equipSetItem(items[i]);
				}
			}
			else if( e.is('update') ) {
				new ListBackEndProxy("api/sets.php").update(this.setList);
			}
		}, this)
	));
	//
	//
	//#########################################################################
	//
	//	PROFILE LIST 
	//
	//#########################################################################
	//
	var profileAdapter = new ProfilesAdapter();
	this.profileList = profileAdapter.profileList;
	//
	//#########################################################################
	//
	//	ENCHANT LIST 
	//
	//#########################################################################
	//
	this.enchantList = new SpellList();
	//
	var slHandler = new Handler(function( e ){
		var cc;
		if( e.is('show_tooltip') ) {
			cc = this.engine.getCurrentCharacter();
			Tooltip.showMovable( SpellTooltip.getHTML(e.get('entity'), cc, 0, null) );
			cc.setEnchantPreview( this.slot, e.get('entity'));
		}
		else if( e.is('move_tooltip') ) {
			Tooltip.move();
		}
		else if( e.is('hide_tooltip') ) {
			Tooltip.hide();
			this.engine.getCurrentCharacter().removeEnchantPreview();
		}
		else if( e.is('click') ) {
			cc = this.engine.getCurrentCharacter();
			if( cc && this.slot != -1 && cc.getEquippedItem(this.slot) != null ) {
				cc.addEnchant( this.slot, e.get('entity').effects[0].secondaryEffect );
			}
		}
		else if( e.is('update') ) {
			new ListBackEndProxy("api/spells.php").update(this.enchantList);
//			if( this.slot != -1 ) {
//				this.storedGemFilters[this.slot] = this.gemList.getArgumentString();
//				//
//				// TODO: propagation of common attributes like quality etc.
//			}
		}
	}, this);
	//
	var slObserver = new GenericObserver([
		'show_tooltip',
		'move_tooltip',
		'hide_tooltip',
		'update',
		'click'
	], slHandler);
	//
	this.enchantList.addObserver(slObserver);
	//
	//#########################################################################
	//
	//	GEM LIST 
	//
	//#########################################################################
	//
	this.gemList = new ItemList();
	//
	var glHandler = new Handler(function( e ){
		var cc;
		if( e.is('show_tooltip') ) {
			cc = this.engine.getCurrentCharacter();
			Tooltip.showMovable( ItemTooltip.getHTML(e.get('entity'), cc) );
			cc.setGemPreview( this.slot, this.socket, e.get('entity') );
		}
		else if( e.is('move_tooltip') ) {
			Tooltip.move();
		}
		else if( e.is('hide_tooltip') ) {
			Tooltip.hide();
			this.engine.getCurrentCharacter().removeGemPreview();
		}
		else if( e.is('click') ) {
			cc = this.engine.getCurrentCharacter();
			if( cc && this.slot != -1 && cc.getEquippedItem(this.slot) != null ) {
				try {
					cc.addGem( this.slot, this.socket, e.get('entity').clone() );
				}
				catch( ex ) {
					if( ex instanceof InvalidItemException ) {
						Tooltip.showError(ex);
					}
					else {
						Tools.rethrow(ex);
					}
				}
			}
		}
		else if( e.is('update') ) {
			new ListBackEndProxy("api/items.php").update(this.gemList);
//			if( this.slot != -1 ) {
//				this.storedGemFilters[this.slot] = this.gemList.getArgumentString();
//				//
//				// TODO: propagation of common attributes like quality etc.
//			}
		}
	}, this);
	//
	var glObserver = new GenericObserver([
		'show_tooltip',
		'move_tooltip',
		'hide_tooltip',
		'update',
		'click'
	], glHandler);
	//
	this.gemList.addObserver(glObserver);
	//
	//#########################################################################
	//
	//	GUI - TAB, IMPORT 
	//
	//#########################################################################
	//
	var gh = new Handler( function( e ) {
		if( e.is('import') ) {
			this.__onImport(
				e.get('name'), 
				e.get('server'), 
				e.get('region')
			);
		}
		else if( e.is('save') ) {
			this.__onSave(
					e.get('name'), 
					e.get('desc')
				);
		}
		else if( e.is('update') ) {
			this.__onUpdate();
		}
		else if( e.is('tab_change') ) {
			this.guiTab = e.get('newTab');
			if( this.guiTab == Gui.TAB_OVERVIEW ) {
				this.updateOverviewTab();
			}
			else if( this.guiTab == Gui.TAB_SAVE ) {
				var profileInfo = this.engine.settings.profile["ProfileInfo"];
				this.gui.saveInterface.update( profileInfo && profileInfo["ID"] != 0 && profileInfo["UserID"] == this.engine.settings.userId );
			}
		}
		else if( e.is('csfolder_tab_change') ) {
			this.csTab = e.get('newTab');
			this.updateCharacterSheetTab();
		}
		else {
			throw new Error("Unhandled event "+e.event);
		}
	}, this );
	var go = new GenericObserver( ['import', 'save', 'update', 'tab_change', 'csfolder_tab_change'], gh );
	this.gui.eventMgr.addObserver(go);
	//
	//#########################################################################
	//
	//	GLYPH INTERFACE 
	//
	//#########################################################################
	//
	this.gui.glyphInterface.eventMgr.addObserver(new GenericObserver(
			['add_glyph', 'remove_glyph'], 
			new Handler( function( e ) {
				var cc = this.engine.getCurrentCharacter();
				if( e.is('add_glyph') ) {
					try {
						cc.addGlyph( e.get('glyph').__glyph);
					}
					catch( ex ) {
						Tooltip.showError(ex);
					}
					this.updateGlyphTab();
				}
				else if( e.is('remove_glyph') ) {
					cc.removeGlyph( e.get('glyph').__glyph);
					this.updateGlyphTab();
				}
			}, this)
	));
	//
	//#########################################################################
	//
	//	BUFF INTERFACE 
	//
	//#########################################################################
	//
	this.gui.buffInterface.eventMgr.addObserver(new GenericObserver(
			['add_buff'], 
			new Handler( function( e ) {
				var cc = this.engine.getCurrentCharacter();
				if( e.is('add_buff') ) {
					var id = e.get('id');
					SpellCache.asyncGet( id, new Handler( function( id ) {
						try {
							var spell = SpellCache.get(id);
							
							if( spell.effects[0] && ( spell.effects[0].effect == 23 || spell.effects[0].effect == 42 ) && spell.effects[0].procSpellId > 0 ) {
								cc.addBuff( spell.effects[0].procSpellId );
							}
							else  {
								cc.addBuff( id );
							}
						}
						catch( ex ) {
							Tooltip.showError(ex);
						}
					} ,this), [id]);
				}
			}, this)
	));
	//
	//#########################################################################
	//
	//	REFORGE INTERFACE 
	//
	//#########################################################################
	//
	var reHandler = new Handler( function( e ) {
		var cc = this.engine.getCurrentCharacter();
		if( e.is('reforge') ) {
			cc.reforgeItem(this.slot, e.get('reduce'), e.get('add'));
			this.updateReforgeTab();
		}
		else if( e.is('restore') ) {
			cc.restoreItem(this.slot);
			this.updateReforgeTab();
		}
		else if( e.is('reforge_item_preview') ) {
			cc.setReforgeItemPreview(this.slot, e.get('reduce'), e.get('add'));
		}
		else if( e.is('remove_reforge_item_preview') ) {
			cc.removeReforgeItemPreview();
		}
		else if( e.is('reforge_preview') ) {
			cc.setReforgePreview(e.get('reforge_array'));
		}
		else if( e.is('remove_reforge_preview') ) {
			cc.removeReforgePreview();
		}
		else if( e.is('restore_all') ) {
			cc.restoreAll();
		}
		else if( e.is('reforge_all') ) {
			cc.reforgeAll(e.get('reforge_array'));
			this.updateReforgeTab();
		}
		else if( e.is('wowreforge_export') ) {
			var profile = this.engine.getCurrentCharacter().toBattleNetProfile();
			var metaData = "{\"BasedOn\" : null,\"CanUpdate\" : false,\"Data\" : null,\"Origin\" : \"chardev.org\",\"SourceLink\" : null}";
			var form = document.createElement("form");
			form.method = "POST";
			form.action = "http://wowreforge.com/Profiles/Import";
			form.name = "wowreforge_export";
			form.target = "_blank";
			form.id = "wowreforge_export";
			form.style.display = "none";
			
			DOM.createAt( form, 'input', {'type': 'hidden', 'name': 'profile', 'value': profile});
			DOM.createAt( form, 'input', {'type': 'hidden', 'name': 'metadata', 'value': metaData});
			
			document.body.appendChild(form);
			
			DOM.get("wowreforge_export").submit();
			
			document.body.removeChild(form);
		}
	}, this);
	this.gui.reforgeInterface.eventMgr.addObserver(new GenericObserver(
			['wowreforge_export', 'reforge', 'restore', 'remove_reforge_preview', 'reforge_preview', 'reforge_all', 'restore_all', 'reforge_item_preview', 'remove_reforge_item_preview'], 
			reHandler
	));
	//
	//#########################################################################
	//
	//	SOCKET INTERFACE 
	//
	//#########################################################################
	//
	var siHandler = new Handler( function( e ) {
		var cc, itm;
		if( e.is('socket_left_click') ) {
			cc = this.engine.getCurrentCharacter();
			itm = cc.getEquippedItem( this.slot, 0 );
			
			this.socket = e.get('socket');
			
			if( itm == null ) {
				return;
			}
			
			var ic = 3, iscm = GameInfo.getMatchingGemSubClasses( itm.socketColors[this.socket]);
			
			this.gemList.setItemConstraints(0,ic,iscm);
			
			this.gemList.filterMgr.hideFilter('usablebyclass', true);
			this.gemList.filterMgr.hideFilter('issocketablegem', true);
			this.gemList.filterMgr.hideFilter('gemreqitemlvl', true);
			this.gemList.filterMgr.hideFilter('class', true);
			
			this.gemList.set( 
				(cc.chrClass != null ? 'usablebyclass.eq.'+(1<<(cc.chrClass.id-1))+';' : '') +
				"issocketablegem.eq.1;class.eq.3;subclass.ba."+iscm+";" + 
				"gemreqitemlvl.le."+itm.level+";",
				null,
				null,
				1
			);
			
			this.gemList.update();
		}
		else if( e.is('socket_right_click') ) {
			cc = this.engine.getCurrentCharacter();
			cc.removeGem( this.slot, e.get('socket') );
		}
		else if( e.is('used_gem_tooltip_show') ) {
			cc = this.engine.getCurrentCharacter();
			cc.setGemPreview( this.slot, e.get('socket'), ItemCache.get(e.get('gemId')));
		}
		else if( e.is('used_gem_tooltip_hide') ) {
			cc = this.engine.getCurrentCharacter();
			cc.removeGemPreview();
		}
		else if( e.is('socket_used_gem') ) {
			cc = this.engine.getCurrentCharacter();
			itm = cc.getEquippedItem( this.slot, 0 );
			cc.addGem( this.slot, e.get('socket'), ItemCache.get(e.get('gemId')) );
		}
		else {
			throw new Error("Unhandled event "+e.event);
		}
	}, this );
	var siObserver = new GenericObserver( ['socket_used_gem','socket_left_click', 'socket_right_click', 'used_gem_tooltip_show', 'used_gem_tooltip_hide'], siHandler );
	this.gui.socketInterface.eventMgr.addObserver(siObserver);
	//
	//#########################################################################
	//
	//	RANDOM ENCHANTMENT INTERFACE 
	//
	//#########################################################################
	//
	var reObserver = new GenericObserver(['change'], new Handler( function( e ){
		if( e.is('change') ) {
			var cc = this.engine.getCurrentCharacter();
			cc.setItemRandomEnchantment( this.slot, e.get('randomEnchantmentId') );
		}
		else {
			throw new Error("Unhandled event "+e.event);
		}
	}, this ));
	this.gui.randomPropertyInterface.eventMgr.addObserver(reObserver);
	//
	//#########################################################################
	//
	//
	this.profileList.set("ismine.eq.1;", null, null, 1);
	//
	gui.initLists( this.itemList.gui, this.enchantList.gui, this.profileList.gui, this.setList.gui );
	gui.socketInterface.setListGui(this.gemList.gui.node); this.gemList.gui.show(true);
	
	this.engine.addObserver( new GenericObserver(['character_change','logged_in','logged_out'], new Handler(function(e){
		if( e.is('character_change') ) {
			this.__onCharacterChange(e.get('character'));
		}
		else if( e.is('logged_in')) {
			this.gui.importInterface.updateStoredImports();
		}
		else if( e.is('logged_out')) {
			this.gui.importInterface.updateStoredImports();
		}
	}, this)));
}

EngineGuiAdapter.prototype = {
	gui: null, engine: null,
	itemList: null,  gemList: null, enchantList: null, profileList: null, setList: null,
	slot: -1,
	socket: -1,
	adapter: null,
	storedItemFilters: [], storedGemFilters: [],
	guiTab: 0,
	csTab: 0,
	characterObserver: null,
	/**
	 * @param {Character} character
	 */
	__onCharacterChange: function( character ) {
		
		if( this.adapter ) {
			this.adapter.detach();
		}

		this.adapter = new CharacterCharacterSheetAdapater( character, this.gui.characterSheet );
		
		this.__updateClass( character.chrClass );
		
		character.addObserver(this.characterObserver);
	},
	/**
	 * @param {CharacterClass} newClass
	 */
	__updateClass: function( newClass ) {
		var newArg = (newClass != null ? "usablebyclass.eq."+(1<<(newClass.id-1))+";" : "usablebyclass.eq.0;");
		this.itemList.replaceArgument('usablebyclass', newArg);
		this.setList.replaceArgument('usablebyclass', newArg);
		this.setList.updateFilter();
		
		this.__replaceArgumentInStoredFilter('usablebyclass', newArg);
		
		if( newClass != null ) {
			this.gui.talentsGui.init( new TalentsFacade( newClass.talents, this.engine.getCurrentCharacter() ) );
		}
		else {
			this.gui.talentsGui.init(null);
		}
		
		this.gui.buffInterface.resetInitialised();

		this.updateGlyphTab();
		
		this.updateCharacterSheetTab();
	},
	__onItemSlotLeftClick: function( slot, index ) {
		
		if( index == 0 ) {
			this.slot = slot;
			
			var cc = this.engine.getCurrentCharacter();
			var itm = cc.getEquippedItem(this.slot, 0);
			
			if( ! itm && this.csTab != Gui.TAB_ITEMS ) {
				this.gui.csFolder.show(Gui.TAB_ITEMS);
			}
			else {
				this.updateCharacterSheetTab();
			}
		}
	},
	updateGlyphTab: function() {
		var cc = this.engine.getCurrentCharacter();
		var gs = [];
		if( cc.chrClass ) { 
			for( var i=0; i<cc.chrClass.availableGlyphs.length ; i++ ) {
				gs.push(new GlyphFacade(cc.chrClass.availableGlyphs[i], cc));
			}
		}
		this.gui.glyphInterface.update( gs, new CharacterFacade(cc));
	},
	updateOverviewTab: function() {
		this.gui.overview.update(new CharacterFacade(this.engine.getCurrentCharacter()));
	},
	updateCharacterSheetTab: function() {		
		switch( this.csTab ) {
		case Gui.TAB_ITEMS:
			if( this.slot == -1 ) {
				return;
			}
			this.updateItemsTab();
			break;
		case Gui.TAB_GEMS:
			if( this.slot == -1 ) {
				return;
			}
			this.updateGemsTab();
			break;
		case Gui.TAB_ENCHANTS:
			if( this.slot == -1 ) {
				return;
			}
			this.updateEnchantsTab();
			break;
		case Gui.TAB_REFORGE:
			if( this.slot == -1 ) {
				return;
			}
			this.updateReforgeTab();
			break;
		case Gui.TAB_SETS:
				this.setList.update();
			break;
		case Gui.TAB_BUFFS:
				this.updateBuffsTab();
			break;
		}
	},
	updateBuffsTab: function() {
		var cc = this.engine.getCurrentCharacter();
		
		if( ! this.gui.buffInterface.isInitialised() ) {
			Buffs.getAvailableBuffs(new Handler(function(buffs, exception){
				if( exception != null ) {
					Tooltip.showError(exception);
					return;
				} 
				else {
					this.gui.buffInterface.initialise( buffs );
				}
			},this), cc);
		}
		//
		// Available buffs from items (Procs, Use) 
		var h,i,j,itm, procSpells = [], useSpells = [], s, ps, enchant, se;
		for( i = 0; i < INV_ITEMS; i++ ) {
			itm = cc.inventory.get(i);
			if( ! itm ) {
				continue;
			}
			
			for( j = 0; j < itm.spells.length; j++ ) {
				s = itm.spells[j];
				
				if( s == null ) {
					continue;
				}
	
				for( h = 0 ; h < 3; h++ ) {
					se = s.effects[h];
					if( ! se ) {
						continue;
					}
					if( se.effect == 42 ) {
						ps = se.getProcSpell();
						if( ps ) {
							procSpells.push( new SpellFacade( ps, cc ));
						}
					}
				}
				
				if ( s.isAura() ) {
					continue;
				}
				else {
					useSpells.push( new SpellFacade( s, cc ));
				}
			}
			//
			// Engineering enchants
			for( j=0; j<itm.enchants.length; j++ ) {
				enchant = itm.enchants[j];
				
				if( enchant.types[0] == 1 ) {
					procSpells.push( new SpellFacade( enchant.spells[0], cc ));
				}
			}
		}
		//
		//
		var conditionalSpells = [];
		if( cc.chrClass != null && cc.chrClass.conditionalBuffs != null ) {
			var conditionalBuff;
			for( i=0; i<cc.chrClass.conditionalBuffs.length; i++ ) {
				conditionalBuff = cc.chrClass.conditionalBuffs[i];

				if( cc.auras.auraMap[conditionalBuff[1]] ) {
					conditionalSpells.push(AvailableBuff.fromSpell(new Spell(conditionalBuff[0]), cc));
				}
			}
		}

		this.gui.buffInterface.update(useSpells, procSpells, conditionalSpells);
	},
	updateReforgeTab: function() {
		var cc = this.engine.getCurrentCharacter();
		var itm = null;
		if( this.slot != -1 ) {
			itm = cc.getEquippedItem(this.slot, 0);
		}
		this.gui.reforgeInterface.update(itm == null ? null : new EquippedItem(cc, itm, this.slot));
	},
	updateEnchantsTab: function() {
		
		this.enchantList.gui.show( false );
		
		if( this.slot == -1 ) {
			return;
		}
		
		var cc = this.engine.getCurrentCharacter();
		var itm = cc.getEquippedItem(this.slot, 0);
		
		this.gui.randomPropertyInterface.update(itm == null ? null : new EquippedItem(cc, itm, this.slot));
		
		if( itm == null ) {
			return;
		}
		
		//TODO update enchant list
		this.enchantList.filterMgr.hideFilter('isenchant', true);
		this.enchantList.filterMgr.hideFilter('itemclasssubclasscombined', true);
		this.enchantList.filterMgr.hideFilter('slot', true);
		this.enchantList.filterMgr.hideFilter('enchantitemlevel', true);
		this.enchantList.filterMgr.hideFilter('enchantchrlevel', true);
		
		
		var args = "isenchant.eq.1;" +
			"itemclasssubclasscombined.eq."+itm.itemClass+"."+itm.itemSubClass+";" +
			"slot.ba."+(1<<itm.inventorySlot)+";" +
			"enchantitemlevel.le."+itm.level+";" +
			"enchantchrlevel.le."+cc.level+";";

		this.enchantList.set( args, null, null, 1);
		
		this.enchantList.update();
		
		this.enchantList.gui.show( true );
	},
	updateGemsTab: function() {
		if( this.slot == -1 ) {
			return;
		}
		
		var cc = this.engine.getCurrentCharacter();
		var itm = cc.getEquippedItem(this.slot, 0);
		
		this.gui.socketInterface.update( 
			itm == null ? null : new EquippedItem( cc, itm, this.slot),
			this.getUsedGems()
		);
	},
	updateItemsTab: function() {
		var cc = this.engine.getCurrentCharacter();
		var args =  this.storedItemFilters[this.slot];
		
		var sl = cc.chardevSlotToBlizzardSlotMask(this.slot);
		var icl = cc.chardevSlotToItemClass(this.slot);
		
		this.itemList.setItemConstraints( sl, icl[0], icl[1] );
		
		this.itemList.filterMgr.hideFilter('usablebyclass', true);
		this.itemList.filterMgr.hideFilter('issocketablegem', true);
		this.itemList.filterMgr.hideFilter('canbeusedwithlvl', true);
		this.itemList.filterMgr.hideFilter('class', true);
		this.itemList.filterMgr.hideFilter('gemreqitemlvl', true);
		this.itemList.setWeaponSlot( cc.isWeaponSlot( this.slot ) );
		
		if( this.slot!=16 && this.slot!=17 && this.slot!=18 ) {
			this.itemList.filterMgr.hideFilter('slot', true);
		}
		else {
			this.itemList.filterMgr.hideFilter('slot', false);
		}
		if( this.slot==1 || this.slot == 12 || this.slot == 13 || this.slot == 14 || this.slot == 15 || this.slot == 6 || this.slot == 5) {
			this.itemList.filterMgr.hideFilter('subclass', true);
		}
		else {
			this.itemList.filterMgr.hideFilter('subclass', false);
		}

		args = args.replace(/\bclass\.\w+\.[^;]*;/,"") + (icl[0] >= 0 ? "class.eq."+icl[0]+";" : "");
		args = args.replace(/\bslot\.\w+\.[^;]*;/,"") + (sl > 0 ? "slot.ba."+sl+";" : "");
		args = args.replace(/\bsubclass\.\w+\.[^;]*;/,"") + (icl[1] > 0 ? "subclass.ba."+icl[1]+";" : "");
		
		//
		//TODO: store filters
		this.itemList.set( args, null, null, 1);
		
		this.itemList.update();
		
		this.itemList.gui.show( true );
	},
	__onImport: function( name, server, region ) {
		try {
			CharacterIO.readFromArmory(name, server, region, new Handler( this.__onImportCallback, this ));

			Tooltip.showLoading();
		}
		catch( e ) {
			Tooltip.showError(e);
		}
	},
	__onImportCallback: function( character, exception ) {
		if ( exception != null ) {
			Tooltip.showError(exception);
		}
		else {
			this.engine.getCurrentCharacter().load(character);

			this.gui.folder.show(Gui.TAB_CHARACTER_SHEET);
			
			Tooltip.enable();
		}
	},
	__onSave: function( name, desc ) {
		try {
			var cc = Engine.getCurrentCharacter();
			cc.setName(name);
			cc.setDescription(desc);
			
			CharacterIO.writeToDatabase(0, cc, new Handler( this.__onSaveCallback, this ));

			Tooltip.showLoading();
		}
		catch( e ) {
			Tooltip.showError(e);
		}
	},
	__onUpdate: function() {
		try {
			var cc = Engine.getCurrentCharacter();
			
			CharacterIO.writeToDatabase( this.engine.settings.profile["ProfileInfo"]["ID"], cc, new Handler( this.__onUpdateCallback, this ));

			Tooltip.showLoading();
		}
		catch( e ) {
			Tooltip.showError(e);
		}
	},
	__onSaveCallback: function( href, exception ) {
		if ( exception != null ) {
			Tooltip.showError(exception);
		}
		else {
			Tooltip.showHtmlDisabled("Your profile was saved.<br /><a class='tt_profile_link' href='"+escape(Tools.getBasePath() + href)+"' target='_blank'>Click here</a> to view it.");
		}
	},
	__onUpdateCallback: function( href, exception ) {
		if ( exception != null ) {
			Tooltip.showError(exception);
		}
		else {
			Tooltip.showHtmlDisabled("The profile was updated.");
		}
	},
	/**
	 * @param {string} variable
	 * @param {string} replace
	 */
	__replaceArgumentInStoredFilter: function( variable, replace ) {
		for( var i=0; i<INV_ITEMS; i++ ) {
			this.storedItemFilters[i] = this.storedItemFilters[i].replace(new RegExp("\\b"+variable+"\\.\\w+\\.[^;]+;","g"), "") + replace ;
		}
	},
	__propagateFilterSettings: function( variable, args ) {
		var m = args.match(new RegExp("\\b"+variable+"\\.\\w+\\.[^;]+;","g"));
		if( m ) {
			this.__replaceArgumentInStoredFilter(variable,m.join(""));
		}
		else {
			this.__replaceArgumentInStoredFilter(variable,"");
		}
	},
	getUsedGems: function() {
		var used = {};
		var itm, gem;
		var cc = this.engine.getCurrentCharacter();
		for( var i=0; i<Inventory.SLOTS; i++ ) {
			itm = cc.getEquippedItem(i, 0);
			if( itm == null ) {
				continue;
			}
			for( var j=0; j<3; j++ ) {
				gem = itm.gems[j];
				if( gem ) {
					used[gem.id] = new SocketedGem( cc, gem, j);
				}
			}
		}
		return used;
	},
	equipSetItem: function( itm ) {
		var cc = this.engine.getCurrentCharacter(); 
		try {
			var tmp = itm.clone();
			var slot = g_inventoryToSlot[tmp.inventorySlot];
			if( ! slot && slot !== 0 ) {
				throw new Error("Unable to add " + tmp.name);
			}
			else if( slot == 12 && cc.inventory.get(12) != null && cc.inventory.get(13) == null ) { 
				slot = 13;
			}
			else if( slot == 14 && cc.inventory.get(14) != null && cc.inventory.get(15) == null ) { 
				slot = 15;
			}
			
			cc.addItem( slot, tmp );
		}
		catch( ex ) {
			if( ex instanceof InvalidItemException ) {
				Tooltip.showError(ex);
			}
			else {
				Tools.rethrow(ex);
			}
		}
	}
};