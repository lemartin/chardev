/**
 * @author LeMartin
 */
var Engine = {
	_characterLevel : DEFAULT_LEVEL,
	_characters : [],
	_gui : null,
	_shownCharacter : -1,
	/** @type {Character} */
	_currentCharacter : null,

	_isCharacterPlanner : false,
	_profileId : 0,
	_userId : 0,
	_sessionId : '',
	_language : 'en', 
	_reforgeOptimiser: new ReforgeOptimiser(),
	
	initialise : function ( settings ) {
		//
		//	JS caches
		//
		g_items = new ItemContainer();
		g_spells = new SpellContainer();
		//
		//	TextIO console node
		//
		TextIO.errorNode=document.getElementById('error_console');
		//
		//	Tooltip move
		//
		if( document.addEventListener ) { 
			document.addEventListener("mousemove", Tooltip.handleMove, true);
		}
		else { 
			document.body.onmousemove = Tooltip.handleMove;
		}
		Listener.add(document.body,"keydown",Tooltip.handleKeyDown, Tooltip, null );
		//
		//	Planner
		//
		if( settings.isPlanner ) {
			var c 	= Engine.createCharacter(), 
			gui = new Gui();
			
			if( settings.character ) {
				c.load( settings.character );
			}
			
			Engine.setGui(gui);

			document.getElementById("mtf_p").className = "mtf_p";
			document.getElementById("mm_w").className = "mm_w2";
			document.getElementById("mtf_p").appendChild(gui._folder._menu);
			document.getElementById("planner_parent").appendChild(gui._node);
			//
			//	Add optimiser listener
			//
			Engine._reforgeOptimiser.addListener('started',new Handler(Engine.onReforgeOptimiserStarted,Engine));
			Engine._reforgeOptimiser.addListener('finished',new Handler(Engine.onReforgeOptimiserFinished,Engine));
			Engine._reforgeOptimiser.addListener('progress_change',new Handler(Engine.onReforgeOptimiserProgressChange,Engine));
			Engine._reforgeOptimiser.addListener('values_change', new Handler(Engine.onReforgeOptimiserValuesChange,Engine));
			//
			//	Leave handler
			//
			window.onbeforeunload = function(e) {
				var e = e || window.event;

				if ( ! Engine.onLeave() ) {
					// IE FF
					if (e) {
						e.returnValue = 'Are you sure? All unsaved changes will be lost, if you continue!';
					}

					// For Safari
					return 'Are you sure? All unsaved changes will be lost, if you continue!';
				}
				return null;
			};
		}
	},
	//
	//#########################################################################
	//
	//	REFORGE OPTIMISER HANDLER
	//
	//#########################################################################
	//
	optimiseReforge: function() {
		if( Engine._shownCharacter != -1 ) {
			Engine._reforgeOptimiser.optimise();
		}
	},
	onReforgeOptimiserStarted: function() {
		if( Engine._gui != null ) {
			Tooltip.showProgress(0);
		}
	},
	onReforgeOptimiserFinished: function() {
		if( Engine._gui != null ) {
			Tooltip.enable();
		}
	},
	onReforgeOptimiserProgressChange: function( progress ) {
		if( Engine._gui != null ) {
			Tooltip.updateProgress(progress);
		}
	},
	onReforgeOptimiserValuesChange: function( reforgeOptimiser ) {
		if( Engine._gui != null ) {
			Engine._gui._reforgeInterface._reforgeOptimisationInterface.updateValues( reforgeOptimiser );
		}
	},
	onCalculateStats: function( stats ) {
		if( Engine._gui != null ) {
			Engine._gui._reforgeInterface._reforgeOptimisationInterface.updateRatings( stats.getReforgeRatings() );
		}
	},
	//
	//
	//
	//
	//
	onShowStatWeightInterface: function() {
		if( Engine._gui != null ) {
			Engine._gui._statWeightInterface.show();
		}
	}
};

/** 
 * @public
 * @returns {Character} created character 
 * **/
Engine.createCharacter = function() {
	var c = new Character();
	//
	//	character listener
	//
	c.setClassOnChangeHandler(new Handler(Engine.onClassChange, Engine));
	c.setLevelOnChangeHandler(new Handler(Engine.onLevelChange, Engine));
	c.setOnCharacterLoadHandler(new Handler(Engine.onCharacterLoadHandler, Engine));
	//
	//	sheet listener
	//
	c._sheet.setItemSlotOnClickHandler(new Handler(Engine.onSlotClick, Engine));
	//
	//	list listener
	//
	c._itemList._filter.setPropagationHandler(new Handler( Engine.onItemFilterPropagate, Engine));
	//
	c._itemList.setOnClickHandler(new Handler(Engine.onItemListClick, Engine));
	c._itemList.setOnUpdateHandler(Engine.onItemListUpdate, Engine);
	c._setList.setOnClickHandler(new Handler(Engine.onSetListClick, Engine));
	c._gemList.setOnClickHandler(new Handler(Engine.onGemClick, Engine));
	c._gemList.setOnUpdateHandler(Engine.onGemListUpdate, Engine);
	c._enchantList.setOnClickHandler(new Handler(Engine.onEnchantListClick, Engine));
	c._enchantList.setOnUpdateHandler(Engine.onEnchantListUpdate, Engine);
	c._enchantList._filter.addHiddenFilter(F_VAR_ISENCHANT);
	c.addListener( 'stat_weights_change', new Handler(Engine.propagateStatWeights, Engine));
	c.addListener( 'stat_caps_change', new Handler(Engine.propagateStatCaps, Engine));
	
	c._itemList.addListener( 'show_stat_weights_interface', new Handler(Engine.onShowStatWeightInterface,Engine));
	c._gemList.addListener( 'show_stat_weights_interface', new Handler(Engine.onShowStatWeightInterface,Engine));
	
	//c.addListener( 'calculate_stats', new Handler(Engine.onCalculateStats,Engine));
	
	//
	//
	//
	Engine._characters.push(c);
	if( Engine._shownCharacter == -1 ) {
		Engine.switchCharacter(0);
	}
	return c;
};
Engine.switchCharacter = function( index ) {
	Engine._shownCharacter = index;
	Engine._currentCharacter = Engine._characters[Engine._shownCharacter];
	Engine._reforgeOptimiser.update(Engine._currentCharacter);
	if( Engine._gui != null ) {	
		Engine._gui.update(Engine._currentCharacter);
	}
};

/** @private **/
Engine.onItemFilterPropagate = function() {
	var cc = Engine._currentCharacter;
	if( cc._itemList._filter.propagate() ) {
		cc._storedGlobalItemFilter = cc._itemList._filter.buildArgumentString();
	}
};


/** @private **/
Engine.onCharacterLoadHandler = function( ) {
	if( Engine._gui != null && Engine._shownCharacter != -1 ) {
		Engine.updateReforgeTab();
		Engine._gui.updateGlyphTab(Engine._currentCharacter);
	} 
};

Engine.updateReforgeTab = function() {
	var cc, slot;
	if( Engine._gui != null && Engine._shownCharacter != -1 ) {
		cc = Engine._currentCharacter;
		slot = cc._sheet._selectedSlot;
		if( slot >= 0 ) {
			Engine._gui._reforgeInterface.update(cc._inventory.get(slot));
		}
		else {
			Engine._gui._reforgeInterface.update(null);
		}
		Engine._gui._reforgeInterface._reforgeOptimisationInterface.update(cc);
	}
	Engine._reforgeOptimiser.resetOptimisedConfiguration();
};

/**
 * @public
 * @param {number} index character index
 * @returns {Character} deleted character
 */
Engine.removeCharacter = function( index ) {
	//TODO switch if shown, prevent no chars
	var c = Engine._characters[index];
	Engine._characters.splice(index,1);
	return c;
};

/**
 * @public
 * @param {string} description
 * @returns {Array} {@link Array} of {@link string} 
 */
Engine.parse = function( description ) {
	//TODO
	return TextIO.parse( description, Engine._currentCharacter );
};
/** @private **/
Engine.onLevelChange = function( ) {
	if( Engine._gui != null && Engine._shownCharacter != -1 ) {
		Engine._gui.updateGlyphTab(Engine._currentCharacter);
	} 
};
/** 
 * @private
 * @param {Character} character 
 */
Engine.onClassChange = function( character ) {
	var slot = -1;
	if( Engine._gui != null && Engine._shownCharacter != -1 ) {
		Engine._gui.updateGlyphTab(Engine._currentCharacter);
		if( character._chrClass != null ) {
			Engine._gui.updateTalents(Engine._currentCharacter);
		}
		slot = character._sheet._selectedSlot;
		if( Engine._gui._csFolder._shown == G_TAB_ITEMS && slot != -1 ) {
			Engine._updateItemTab( slot );
		}
	} 
};

/** 
 * @private
 * @param {number} slot 
 **/
Engine._updateItemTab = function( slot ) {
	if( slot < 0 ) {
		return;
	};
	var cc = Engine._currentCharacter;
	var il, icl, sl, args, p;
	il = cc._itemList;
	il._filter.addHiddenFilter(F_VAR_USABLEBYCLASS);
	il._filter.addHiddenFilter(F_VAR_ISSOCKETABLEGEM);
	il._filter.addHiddenFilter(F_VAR_CANBEUSEDWITHLEVEL);
	il._filter.addHiddenFilter(F_VAR_CLASS);
	il._filter.addHiddenFilter('gemreqitemlvl');
	il.showDps( cc.isWeaponSlot( slot ) );
	if( slot!=16 && slot!=17 && slot!=18 ) {
		il._filter.addHiddenFilter(F_VAR_SLOT);
	}
	else {
		il._filter.removeHiddenFilter(F_VAR_SLOT);
	}
	if( slot==1 || slot == 12 || slot == 13 || slot == 14 || slot == 15 || slot == 6 || slot == 5) {
		il._filter.addHiddenFilter(F_VAR_SUBCLASS);
	}
	else {
		il._filter.removeHiddenFilter(F_VAR_SUBCLASS);
	}
//	if( slot==18 ) {
//		il._filter.addHiddenFilter(F_VAR_SUBCLASS);
//	}
//	else {
//		il._filter.removeHiddenFilter(F_VAR_SUBCLASS);
//	}
	sl = cc.chardevSlotToBlizzardSlotMask(slot);
	icl = cc.chardevSlotToItemClass(slot);
	il.setItemClass(icl[0],icl[1]);
	il.setSlotMask(sl);
	
	p = il._filter.propagate();
	
	if( p ) {
		args = cc._storedGlobalItemFilter;
	}
	else {
		args = cc._storedItemFilters[slot];
	}
	args = args.replace(/\bclass\.\w+\.[^;]*;/,"") + (icl[0] >= 0 ? "class.eq."+icl[0]+";" : "");
	args = args.replace(/\bslot\.\w+\.[^;]*;/,"") + (sl > 0 ? "slot.ba."+sl+";" : "");
	args = args.replace(/\bsubclass\.\w+\.[^;]*;/,"") + (icl[1] > 0 ? "subclass.ba."+icl[1]+";" : "");
	
	//echo(args);
	
	il.set( args, null, null );
	il.setCompareItem(Engine.getSelectedItem());
};

/** @private **/
Engine.onItemListUpdate = function( ) {
	var cc = Engine._currentCharacter;
	var slot = cc._sheet._selectedSlot;
	var args = cc._itemList._filter.buildArgumentString();
	var p = cc._itemList._filter.propagate();
	//
	cc.removePreview();
	
	//propagate item level and quality
	
	if(p) {
		cc._storedGlobalItemFilter = args;
	}
	else {
		Engine._propagateFilterSettings('name',args);
		Engine._propagateFilterSettings('quality',args);
		Engine._propagateFilterSettings('lvl',args);
		Engine._propagateFilterSettings('reqlvl',args);
		
		cc._storedItemFilters[slot] = args;
	}
};

/** 
 * @private
 * @param {string} variable
 * @param {string} args 
 **/
Engine._propagateFilterSettings = function( variable, args ) {
	var m = args.match(new RegExp("\\b"+variable+"\\.\\w+\\.[^;]+;","g"));
	if( m ) {
		Engine._currentCharacter.replaceArgumentInStoredFilter(variable,m.join(""));
	}
	else {
		Engine._currentCharacter.replaceArgumentInStoredFilter(variable,"");
	}
};

/** 
 * @private
 * @param {number} slot 
 **/
Engine._updateEnchantTab = function( slot ) {
	var cc = Engine._currentCharacter;
	var el = cc._enchantList;
	var itm;
	if( slot < 0 ) {
		el.clear();
		return;
	};
	itm = cc._inventory._items[slot][0];
	
	if( !itm ) {
		el.clear();
	}
	else {
		Engine._gui._randomPropertyInterface.update(itm);
		el.setEnchant(itm, cc._level, "");
	}
	
	//TODO stored enchant queries?
	/*
	if( cc._storedItemFilters[slot] ) {
		el.set( cc._storedItemFilters[slot], null, null );
	}
	else {
	}
	*/
};

/**
 * @private
 * @param {number} slot
 * @param {number} historyIndex
 */
Engine.onSlotClick = function( slot, historyIndex ) {
	if( historyIndex == 0 ) {
		Engine._currentCharacter._sheet.selectSlot( slot );
		
		if( Engine._gui._csFolder._shown == G_TAB_ITEMS ) {
			if( historyIndex == 0 ) {
				Engine._updateItemTab( slot );
			}
		}
		else if( Engine._gui._csFolder._shown == G_TAB_GEMS ) {
			
			if( Engine._currentCharacter._inventory.get(slot) != null ) {
				Engine._gui.updateGemTab(Engine._currentCharacter,slot,-1);
				Engine._currentCharacter._gemList.hide();
			}
			else {
				Engine._gui._csFolder.show(G_TAB_ITEMS);
			}
		}
		else if( Engine._gui._csFolder._shown == G_TAB_REFORGE ) {
			if( Engine._currentCharacter._inventory.get(slot) != null ) {
				Engine.updateReforgeTab();
			}
			else {
				Engine._gui._csFolder.show(G_TAB_ITEMS);
			}
		}
		else if( Engine._gui._csFolder._shown == G_TAB_ENCHANTS ) {
			var itm = Engine._currentCharacter._inventory.get(slot);
			if( itm != null ) {
				Engine._updateEnchantTab( slot );
			}
			else {
				Engine._gui._csFolder.show(G_TAB_ITEMS);
			}
		}
		else if( Engine._gui._csFolder._shown == G_TAB_BUFFS ) {
			Engine._gui._csFolder.show(G_TAB_ITEMS);
		}
	}
	else {
		//FIXME else do nothing? interesting.
	}
};

/**
 * @private
 * @param {number} socket
 */
Engine.onSocketClick = function( socket ) {
	var cc = Engine._currentCharacter;
	var slot = cc._sheet._selectedSlot;
	var gl = cc._gemList;
	var ic = 3, iscm = GameInfo.getMatchingGemSubClasses(cc._inventory._items[slot][0]._socketColors[socket]);
	gl._filter.addHiddenFilter(F_VAR_USABLEBYCLASS);
	gl._filter.addHiddenFilter(F_VAR_ISSOCKETABLEGEM);
	gl._filter.addHiddenFilter('gemreqitemlvl');
	gl._filter.addHiddenFilter(F_VAR_CLASS);
	gl.setItemClass(ic,iscm);
	
	gl.set( 
		(cc._chrClass != null ? F_VAR_USABLEBYCLASS + ".eq."+(1<<(cc._chrClass._id-1))+";" : "") +
		F_VAR_ISSOCKETABLEGEM+".eq.1;class.eq.3;subclass.ba."+iscm+";" + 
		"gemreqitemlvl.le."+cc._inventory._items[slot][0]._level+";",
		null,
		null
	);
};

/**
 * @private
 * @param {number} socket
 */
Engine.onSocketContextMenu = function( socket ) {
	var cc = Engine._currentCharacter;
	var slot = cc._sheet._selectedSlot;

	cc.removePreview();
	cc._inventory._items[slot][0].addGem( null, socket );
	Engine._currentCharacter.calculateStats();
	Engine._gui.updateGemTab(Engine._currentCharacter,slot,Engine._gui._socketInterface._selectedSocket);
};

/**
 * @private
 * @param {number} tab
 */
Engine.onCharacterSheetFolderChange = function( tab ) {
	var slot = Engine._currentCharacter._sheet._selectedSlot;
	if( tab == G_TAB_ITEMS ) {
		Engine._updateItemTab( slot );
	}
	else if( tab == G_TAB_GEMS ) {
		Engine._gui.updateGemTab(Engine._currentCharacter,slot,-1);
		Engine._currentCharacter._gemList.hide();
	}
	else if( tab == G_TAB_REFORGE ) {
		Engine.updateReforgeTab();
	}
	else if( tab == G_TAB_ENCHANTS ) {
		Engine._updateEnchantTab(slot);
	}
	else if( tab == G_TAB_SETS ) {
	}
	else if( tab == G_TAB_BUFFS ) {
		Engine._gui._buffInterface.update(Engine._currentCharacter);
	}
};

/** @private **/
Engine.onGemListUpdate = function( ) {
};

/** 
 * @private
 * @param {Item} gem 
 **/
Engine.onGemClick = function( gem ) {
	var cc = Engine._currentCharacter;
	var slot = cc._sheet._selectedSlot;
	var si = Engine._gui._socketInterface;
	cc.removePreview();
	cc._inventory._items[slot][0].addGem( gem.clone(), si._selectedSocket );
	Engine._currentCharacter.calculateStats();
	Engine._gui.updateGemTab(Engine._currentCharacter,slot,si._selectedSocket);
	//TODO
};

/**
 * @private
 * @param {Item} itm
 */
Engine.onItemListClick = function( itm ) {
	Engine.addItem( itm, Engine._currentCharacter._sheet._selectedSlot );
};

Engine.onSetListClick = function( itm ) {
	Engine.addItem( itm, g_inventoryToSlot[itm._inventorySlot] );
};

Engine.addItem = function( itm, slot ) {
	if( slot != -1 ) {
		Engine._currentCharacter._inventory.set( slot, itm.clone() );
		if( slot == 16 ) {
			Engine._currentCharacter._sheet._slots[17].update();
		}
		else if( slot == 17 ) {
			Engine._currentCharacter._sheet._slots[16].update();
		}
		Engine._currentCharacter._sheet._slots[slot].update();
		Engine._currentCharacter.calculateStats();
	}
};

Engine.getSelectedItem = function( ) {
	if( Engine._shownCharacter == -1 ) {
		return null;
	}
	var cc = Engine._currentCharacter;
	var slot = cc._sheet._selectedSlot;
	if( slot == -1 ) {
		return null;
	}
	return cc._inventory._items[slot][0];
};
/**
 * @private
 * @param {number} enchantSpellId
 */
Engine.onEnchantListClick = function( enchantSpellId ){
	var cc = Engine._currentCharacter;
	var slot = cc._sheet._selectedSlot;
	var enchantSpell = g_spells.get(enchantSpellId);
	cc.removePreview();
	cc._inventory._items[slot][0].addEnchant( enchantSpell._effects[0]._secondaryEffect );
	cc.calculateStats();
};

/** @private **/
Engine.onEnchantListUpdate = function(){};

/**
 * @public
 * @param {Gui} gui
 */
Engine.setGui = function( gui ) {
	Engine._gui = gui;
	gui._folder.setOnChangeHandler(Engine.onMainFolderChange, Engine);
	gui._csFolder.setOnChangeHandler(Engine.onCharacterSheetFolderChange, Engine);
	gui._socketInterface.setOnSocketClickHandler(Engine.onSocketClick, Engine);
	gui._socketInterface.setOnUsedClickHandler(Engine.onGemClick, Engine);
	gui._socketInterface.setOnSocketContextMenuHandler(Engine.onSocketContextMenu,Engine);
	gui._reforgeInterface.setOnChangeHandler(Engine.onReforge, Engine);
	gui._reforgeInterface._reforgeOptimisationInterface.addListener('stat_weight_change', new Handler(Engine.onStatWeightChange,Engine));
	gui._reforgeInterface._reforgeOptimisationInterface.addListener('stat_cap_change', new Handler(Engine.onStatCapChange,Engine));
	gui._reforgeInterface._reforgeOptimisationInterface.addListener('stat_caps_reset', new Handler(Engine.onStatCapsReset,Engine));
	gui._reforgeInterface._reforgeOptimisationInterface.addListener('optimise', new Handler(Engine.optimiseReforge, Engine));
	gui._reforgeInterface._reforgeOptimisationInterface.addListener('use_optimised_reforge', new Handler(Engine.onUseOptimiedReforge, Engine));
	gui.setImportHandler(Engine.armoryImport, Engine);
	gui.setSaveHandler(Engine.saveProfile, Engine);
	gui.setUpdateHandler(Engine.updateProfile, Engine);
	gui._glyphInterface.setOnClickHandler(Engine.onAddGlyph, Engine);
	gui._glyphInterface.setOnContextMenuHandler(Engine.onRemoveGlyph, Engine);
	gui._profileList.setOnClickHandler(new Handler(Engine.onProfileImport,Engine));
	gui._randomPropertyInterface.setOnChangeHandler(Engine.onRandomPropertyChange, Engine);
	gui._buffInterface.setAddBuffHandler(new Handler(Engine.onAddBuff,Engine));
	gui._statWeightInterface.setOnWeightsChangeHandler(new Handler(Engine.onWeightsChange,Engine));
	
	if( Engine._shownCharacter != - 1 ) {
		Engine._gui.update(Engine._currentCharacter);
		Engine.propagateStatWeights(Engine._currentCharacter.getStatWeights());
		Engine.propagateStatCaps(Engine._currentCharacter.getStatCaps());
		
		Engine._gui._reforgeInterface._reforgeOptimisationInterface.updateValues( Engine._reforgeOptimiser );
	}
};

Engine.onUseOptimiedReforge = function(){
	if( ! Engine._reforgeOptimiser && Engine._reforgeOptimiser._optimisedReforgeConfiguration ) {
		return;
	}
	var arr = [], crf;
	for( var i=0; i<INV_ITEMS; i++ ) {
		crf = Engine._reforgeOptimiser._optimisedReforgeConfiguration[i];
		if( crf && crf[0] != -1 ) {
			arr[i] = [REFORGABLE_STATS[crf[0]],REFORGABLE_STATS[crf[1]]];
		}
	}
	Engine._currentCharacter.reforgeFromArray(arr);
	Engine.updateReforgeTab();
};

/** @private **/
Engine.onRandomPropertyChange = function() {
	Engine._currentCharacter.calculateStats();
};

/** 
 * @private
 * @param {number} profileId
 **/
Engine.onProfileImport = function( profileId ) {
	Tooltip.showLoading();
	CharacterIO.readFromDatabase( profileId, new Handler( Engine.onProfileImport_callback, Engine ) );
};

/**
 * @private
 * @param {Object} profile
 */
Engine.onProfileImport_callback = function( profile ) {
	Engine._currentCharacter.load( profile );
	Engine._gui._folder.show(G_TAB_CHARACTER_SHEET);
	Tooltip.enable();
};

/**
 * @private
 * @param {number} type 
 * @param {number} index
 */
Engine.onRemoveGlyph = function( type, index) {
	var cc = Engine._currentCharacter;
	if( cc._chrClass ) {
		cc._chrClass.removeGlyph( type, index );
	}
	Engine._gui.updateGlyphTab(cc);
};

/**
 * @private
 * @param {number} type 
 * @param {Glyph} glyph
 */
Engine.onAddGlyph = function( type, glyph) {
	var cc = Engine._currentCharacter;
	if( cc._chrClass ) {
		cc._chrClass.addGlyph( type, glyph );
	}
	Engine._gui.updateGlyphTab(cc);
};

/**
 * @public
 * @param {string} name
 * @param {string} server
 * @param {string} region
 */
Engine.armoryImport = function( name, server, region ) {
	Tooltip.showLoading();
	CharacterIO.readFromArmory(
		name,
		server,
		region,
		new Handler(Engine._armoryImport_callback,Engine)
	);
};

/**
 * @private
 * @param {Object} character
 * @param {string} errorMessage
 */
Engine._armoryImport_callback = function( character , errorMessage )
{
	if( character != null )
	{
		Engine._currentCharacter.load( character );
		Tooltip.enable();
		Engine._gui._folder.show(0);
	}
	else
	{
		Tooltip.showError( errorMessage );
	}
};

/**
 * @private
 */
Engine.onReforge = function() {
	Engine._currentCharacter.calculateStats();
	Engine.updateReforgeTab();
	Engine._reforgeOptimiser.update(Engine._currentCharacter);
};

/**
 * @public
 * @param {string} cName
 * @param {string} cDesc
 * @param {string} uName
 * @param {string} pw
 */
Engine.saveProfile = function( cName, cDesc, uName, pw ) {
	var cc = Engine._currentCharacter;
	cc.setName(cName);
	cc.setDescription(cDesc);
	Tooltip.showLoading();
	if( ! g_settings.sessionId ) {
		CharacterIO.writeToDatabaseAuth( 0 , uName , pw , cc, new Handler( Engine._save_callback , Engine) );
	}
	else {
		CharacterIO.writeToDatabaseSession( 0 , cc, new Handler( Engine._save_callback , Engine) );
	}
};

/** @private **/
Engine.updateProfile = function( cName, cDesc ) {
	var cc = Engine._currentCharacter;
	cc.setName(cName);
	cc.setDescription(cDesc);
	Tooltip.showLoading();
	if( ! g_settings.sessionId ) {
		Tooltip.showError("In order to update an existing profile, you have to be logged in!");
	}
	else {
		CharacterIO.writeToDatabaseSession( g_settings.profileId , cc,  new Handler( Engine._save_callback , Engine) );
	}
};

/**
 * @private
 * @param {number} id
 * @param {string} errorMessage
 */
Engine._save_callback = function( id, errorMessage ) {
	
	if( errorMessage )
	{
		Tooltip.showError( errorMessage );
	}
	else {
		Tooltip.showHTML( "Your profile was saved.<br /><a class='tt_profile_link' href='?profile="+id+"' target='_blank'>Click here</a> to view it." );
	}
};

/** @public **/
Engine.loggedIn = function() {
	if( Engine._gui != null ) {
		Engine._gui._authParent.style.display = "none";
	}
};

/** @public **/
Engine.loggedOut = function() {
	if( Engine._gui != null ) {
		Engine._gui._authParent.style.display = "block";
	}
};

/**
 * @private
 * @param {number} tab
 */
Engine.onMainFolderChange = function( tab ) {
	switch( tab ) {
	case G_TAB_OVERVIEW:
		Engine._gui.updateOverview(Engine._currentCharacter);
		break;
	case G_TAB_CHARACTER_SHEET:
		if( Engine._gui._csFolder._shown == G_TAB_BUFFS ) {
			Engine._gui._buffInterface.update(Engine._currentCharacter);
		}
		break;
	case G_TAB_SAVE:
		var cc = Engine._currentCharacter;
		Engine._gui._saveCharacterDescription.value = cc._description;
		Engine._gui._saveCharacterName.value = cc._name;
		break;
	}
};
/**
 * @private
 * @param {number} spellId
 * @param {boolean} self
 */
Engine.onAddBuff = function ( spellId, self ) {
	Engine._currentCharacter._buffs.add ( spellId, self ); 
};

Engine.onStatCapChange = function( stat, cap ) {
	if( Engine._shownCharacter != -1 ) {
		Engine._currentCharacter.setStatCap( stat, cap );
	}
};
Engine.onStatCapsReset = function() {
	if( Engine._shownCharacter != -1 ) {
		Engine._currentCharacter.resetStatCaps();
	}
};
Engine.onStatWeightChange = function( stat, weight ) {
	if( Engine._shownCharacter != -1 ) {
		Engine._currentCharacter.setStatWeight( stat, weight );
	}
};
Engine.onWeightsChange = function( weights ) {
	if( Engine._shownCharacter != -1 ) {
		Engine._currentCharacter.setStatWeights( weights );
	}
};
Engine.propagateStatWeights = function( weights ) {
	var rfw = Engine._currentCharacter.getReforgeStatWeights();
	Engine._reforgeOptimiser.setWeights( rfw );
	
	if( Engine._gui != null && Engine._shownCharacter != -1 ) {
		Engine._gui._statWeightInterface.set( weights );
		Engine._gui._reforgeInterface._reforgeOptimisationInterface.setWeights( rfw );
	}
};
Engine.propagateStatCaps = function( caps ) {
	Engine._reforgeOptimiser.setCaps( caps );
	
	if( Engine._gui != null && Engine._shownCharacter != -1 ) {
		Engine._gui._reforgeInterface._reforgeOptimisationInterface.setCaps( caps );
	}
};
Engine.onLeave = function() {
	for( var i=0; i< Engine._characters.length; i++ ) {
		if( Engine._characters != null && Engine._characters[i].hasUnsavedChanges() ){
			return false;
		}
	}
	return true;
};
//
//#############################################################################
//
//	Initialise Engine after page load
//
//#############################################################################
//
window["__engine_init"] = Engine.initialise;
//