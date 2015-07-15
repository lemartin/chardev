/**
 * @constructor
 * @param {CharacterPlanner} planner
 * @param {CharacterPlannerGui} plannerGui
 */
function CharacterPlannerGuiAdapter( planner, plannerGui ) {
	
	this.planner = planner;
	this.plannerGui = plannerGui;
	
	this.planner.addObserver( new GenericObserver([
			"character_change","character_add","character_remove",
			"user_change","load_profile"
	], new Handler( this._handlePlanner, this)));
	
	this.adapters = [];
	
	this._characterObserver = new GenericObserver([
        "race_change","class_change","level_change"
    ], new Handler( this._handleCharacter, this));
	
	this.plannerGui.characterInterface.addObserver(new GenericObserver([
	    "select","add","remove","mouseover", "mouseout"
	], new Handler( this._handleCharacterInterface, this)));
	
	if( planner.user ) {
		this._setUser( planner.user );
	}
	//
	//	Profile list 
	//
	var profileAdapter = new ProfilesAdapter();
	this.profileList = profileAdapter.profileList;
	this.profileList.set("ismine.eq.1;", null, null, 1);
	this.profileList.setPlanner(true);
	//
	var importProfileHandler = new Handler(
		/**
		 * @param {Array} profile
		 * @param error 
		 */
		function( profile, error ) {
			Tooltip.enable();
			this.planner.load(profile, error);
		}, this);
	//
	var profileListObserver = new GenericObserver(["click"], new Handler(
		/**
		 * @param {GenericEvent} e
		 */
		function( e ) {
			if( e.is("click")) {
				Tooltip.showLoading();
				var entity = e.get("entity");
				CharacterIO.readFromDatabase( entity[0], importProfileHandler );
			}
		},this));
	//
	this.profileList.addObserver(profileListObserver);
}

CharacterPlannerGuiAdapter.prototype = {
	planner: null,
	plannerGui: null,
	adapters: null,
	profileListObserver: null,
	importProfileHandler: null,
	/**
	 * @type {CharacterGuiAdapter}
	 */
	currentAdapter: null,
	_characterObserver: null,
	/**
	 * Handles registered character interface events
	 * 
	 * @param {GenericEvent} e
	 */
	_handleCharacterInterface: function( e ) {
		if( e.is("select") ) {
			this.planner.selectCharacter(e.get("index"));
		}
		else if( e.is("add") ) {
			this.planner.newCharacter();
		}
		else if( e.is("remove") ) {
			
			var rmIndex = e.get("index");
			var orgChar = null;
			//
			// switch to the to be removed character, store the orginially 
			// active character
			if( rmIndex != this.planner.getCurrentCharacterIndex()) {
				orgChar = this.planner.getCurrentCharacter();
				this.planner.selectCharacter(rmIndex);
			}
			//
			// request confirmation and remove the character
			// also remove left over previews
			if( confirm("Are you sure that you want to delete this character from the Planner?\nAll unsaved changes will be lost!")) {
				this.planner.removeCharacter(rmIndex);
			}
			//
			// switch back to the orinally active character
			if( orgChar ) {
				// reselect the character
				this.planner.selectCharacterByRef(orgChar);
			}
		}
		else if( e.is("mouseover")) {
			if( ! this.planner.isCharacterSelected(e.get("index"))) {
				var cmpChar = this.planner.getCharacter(e.get("index"));
				this.currentAdapter.character.setPreviewStats(cmpChar.stats);
			}
		}
		else if( e.is("mouseout")) {
			if( ! this.planner.isCharacterSelected(e.get("index"))) {
				this.currentAdapter.character.resetPreviewStats();
			}
		}
	},
	/**
	 * Handles registered character events
	 * 
	 * @param {GenericEvent} e
	 */
	_handleCharacter: function( e ) {
		if( e.is("class_change")) {
			this._updateCharacterInterface();
		}
		else if( e.is("race_change")) {
			this._updateCharacterInterface();
		}
		else if( e.is("level_change")) {
			this._updateCharacterInterface();
		}
	},
	/**
	 * Handles registered planner events
	 * 
	 * @param {GenericEvent} e
	 */
	_handlePlanner: function( e ) {
		if( e.is("character_change") ) {
			var character = e.get("character");
			//
			// remove the gui if no character is selected
			if( ! character) {
				this.plannerGui.setGui(null);
			}
			else {
				character.setPreviewStats(null);
				//
				// get the current adapter
				this.currentAdapter = this._getAdapter(character);
				this.currentAdapter.gui.setProfileListGui(this.profileList.gui);
				//
				// set it's gui to be visible
				this.plannerGui.setGui(this.currentAdapter.gui);
			}
			//
			// update the character interface
			this._updateCharacterInterface();
		}
		else if( e.is("character_add") ) {
			//
			// create a new gui
			var gui = new Gui();
			/** @type {Character} */
			var character = e.get("character");
			//
			// register the observer
			character.addObserver(this._characterObserver);
			//
			// add a new adapter to list
			var adapter = new CharacterGuiAdapter( character, gui);
			adapter.setUser(this.planner.user);
			this.adapters.push(adapter);
			//
			// update character interface
			this._updateCharacterInterface();
		}
		else if( e.is("character_remove") ) {
			//
			// get the to be removed adapter
			/** @type {CharacterGuiAdapter} */
			var adapter = this._removeAdapter(e.get("character"));
			if( ! adapter ) {
				throw new Error("Unable to remove the character!");
			}
			//
			// remove the observer
			adapter.character.removeObserver(this._characterObserver);
			//
			// update character interface
			this._updateCharacterInterface();
		}
		else if( e.is("user_change")) {
			this._setUser( e.get("user") );
		}
		else if( e.is("load_profile")) {
			this._getAdapter(e.get("character")).setProfileInfo(e.get("id"), e.get("user_id"));
		}
	},
	/**
	 * Update the character interface of the currently visible gui
	 */
	_updateCharacterInterface: function() {
		this.plannerGui.characterInterface.update(
				this.planner.getCharacters(),
				this.planner.getCurrentCharacterIndex()
		);
	},
	/**
	 * Sets the userData for all characters
	 * 
	 * @param {User} user
	 */
	_setUser: function( user ){
		for( var i=0; i<this.adapters.length; i++ ) {
			this.adapters[i].setUser( user );
		}
	},
	/**
	 * Returns the adapter associated with given character
	 * 
	 * @param {Character} character
	 * @return {CharacterGuiAdapter} 
	 */
	_getAdapter: function( character ) {
		return this.adapters[this._getAdapterIndex(character)];
	},
	/**
	 * Removes and returns the adapter associated with given character
	 * 
	 * @param {Character} character
	 * @returns {CharacterGuiAdapter}
	 */
	_removeAdapter: function( character ) {
		var adapters = this.adapters.splice( this._getAdapterIndex(character), 1);
		return adapters[0];
	},
	/**
	 * Returns the index of the adapter associated with given character
	 * 
	 * @param {Character} character
	 * @returns {number} Index
	 */
	_getAdapterIndex: function( character ) {
		for( var i=0; i< this.adapters.length; i++ ) {
			if( this.adapters[i].character == character ) {
				return i;
			}
		}
		throw new Error("Unable to find adapter for given character!");
	}
};