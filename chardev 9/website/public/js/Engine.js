/**
 * @constructor
 */
function EngineImpl() {
	/* do nothing */
}

EngineImpl.prototype = {
	characterMgr: null,
	eventMgr: null,
	adapter: null,
	requestedTooltip: null,
	settings: null,
	addObserver: function ( observer ) {
		this.eventMgr.addObserver( observer );
	},
	initialise : function ( settings ) {
		
		this.eventMgr = new GenericSubject();
		this.eventMgr.registerEvent('character_change', ['character']);
		this.eventMgr.registerEvent('logged_in', []);
		this.eventMgr.registerEvent('logged_out', []);
		
		this.settings = settings;
		
		if( settings.isPlanner ) {
			var gui = new Gui();
			//
			this.adapter = new EngineGuiAdapter( this, gui );
			//
			//
			this.characterMgr = new CharacterManager();
			this.characterMgr.eventMgr.addPropagator('character_change', this.eventMgr);
			//
			//
			var c = new Character();
			this.characterMgr.addCharacter(c);
			//
			//
			if( settings.profile ) {
				c.load( settings.profile );
				
				gui.folder.show(Gui.TAB_OVERVIEW);
			}
			if( settings.profileLoadError ) {
				Tooltip.showError(settings.profileLoadError);
			}
			//
			//
			document.getElementById("mtf_p").className = "ix_center cp_mm_p";
//				document.getElementById("mm_w").className = "mm_w2";
			document.getElementById("mtf_p").appendChild( gui.folder.menu);
			document.getElementById("planner_parent").appendChild( gui.node);
		}
		
	},
	/**
	 * @return {Character}
	 */
	getCurrentCharacter: function() {
		return this.characterMgr.getCurrentCharacter();
	},
	loggedIn: function() {
		this.eventMgr.fire('logged_in', {});		
	},
	loggedOut: function() {
		this.eventMgr.fire('logged_out', {});
	},
	showItemTooltip: function( itemId ) {
		Tooltip.show("Loading Tooltip...");
		this.requestedTooltip = { 'item': itemId };
		ItemCache.asyncGet( itemId, new Handler(
			function( id ) {
				var itm = ItemCache.get( id );
				if( itm != null ) {
					if( this.requestedTooltip != null && this.requestedTooltip['item'] == id ) {
						Tooltip.showMovable( ItemTooltip.getHTML( itm , null) );
						this.requestedTooltip = null;
					}
				}
			}, this
		), [itemId]);
	},
	showSpellTooltip: function( spellId ) {
		Tooltip.show("Loading Tooltip...");
		this.requestedTooltip = { 'spell': spellId };
		SpellCache.asyncGet( spellId, new Handler(
			function( id ) {
				var itm = SpellCache.get( id );
				if( itm != null ) {
					if( this.requestedTooltip != null && this.requestedTooltip['spell'] == id ) {
						Tooltip.showMovable( SpellTooltip.getHTML( itm , null, 0, null) );
						this.requestedTooltip = null;
					}
				}
			}, this
		), [spellId]);
	}
};

var Engine = new EngineImpl();
//
//#############################################################################
//
//	Initialise Engine after page load
//
//#############################################################################
//
window["__engine_init"] = function( settings ){ Engine.initialise.call( Engine, settings ); };
window["g_showItemTooltip"] = function( itemId ){ Engine.showItemTooltip.call( Engine, itemId ); };
window["g_hideItemTooltip"] = function( itemId ){ Engine.requestedTooltip = null; Tooltip.hide(); };
window["g_showSpellTooltip"] = function( spellId ){ Engine.showSpellTooltip.call( Engine, spellId ); };

//