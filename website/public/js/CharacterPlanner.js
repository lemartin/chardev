/**
 * @constructor
 */
function CharacterPlanner() {
	this._eventMgr = new GenericSubject();
	this._eventMgr.registerEvent("user_change", ["user"]);
	this._eventMgr.registerEvent("load_profile", ["id", "character"]);
	this._eventMgr.registerEvent("character_add", ["character"]);
	this._eventMgr.registerEvent("character_remove", ["character"]);
	this._eventMgr.registerEvent("character_change", ["character"]);
	
	this._characterManager = new CharacterManager();
	//
	// prefix propagation
	this._characterManager.addObserver(new GenericObserver(["add","change","remove"], new Handler( function(e) {
		this._eventMgr.refireAs("character_" + e.event, e);
	}, this)));
	//
	//
	Chardev.addObserver(new GenericObserver(["login", "logout"], new Handler( function( e ) {
		if( e.is("login") ) {
			this.setUser(e.get("user"));
		}
		else if( e.is("logout") ) {
			this.setUser(null);
		}
	}, this )));
}

CharacterPlanner.prototype = {
		eventMgr: null,
		language: "en",
		characterManager: null,
		user: null,
		/**
		 * @param {Array} profileData
		 * @param error
		 */
		load: function( profileData, error ) {
			if( error ) {
				Tooltip.showError(error);
			}
			else {
				var character = this._characterManager.add();
				character.load(profileData);
				
				//
				// notify listeners that a profile was loaded
				if( profileData["ProfileInfo"] && profileData["ProfileInfo"]["ID"] ) {
					this._eventMgr.fire("load_profile", {
						"id": profileData["ProfileInfo"]["ID"],
						"user_id": profileData["ProfileInfo"]["UserID"],
						"character": character 
					});
				}
			}
		},
		setUser: function( user ) {
			this.user = user;
			this._eventMgr.fire("user_change", { "user": user });
		},
		setLanguage: function( language ) {
			this.language = language;
		},
		
		newCharacter: function() {
			this._characterManager.add();
		},
		/**
		 * @param {number} index
		 */
		removeCharacter: function( index ) {
			this._characterManager.removeIndex(index);
		},
		/**
		 * @param {number} index
		 */
		selectCharacter: function( index ) {
			this._characterManager.selectIndex(index);
		},
		selectCharacterByRef: function( character ) {
			this._characterManager.select(character);
		},
		/**
		 * @param {number} index
		 * @returns {boolean}
		 */
		isCharacterSelected: function( index) {
			return this._characterManager.isSelected(index);
		},
		getCharacter: function( index ) {
			return this._characterManager.get(index);
		},
		/**
		 * @param {GenericObserver} observer
		 */
		addObserver: function( observer ) {
			this._eventMgr.addObserver(observer);
		},
		/**
		 * @returns {Array} List of characters
		 */
		getCharacters: function() {
			var characters = this._characterManager.characters;
			var facades = [];
			for( var index in characters ) {
				facades[index] = new CharacterFacade(characters[index]);
			}
			return facades;
		},
		/**
		 * @returns {number} Index of the selected character
		 */
		getCurrentCharacterIndex: function() {
			return this._characterManager.cursor;
		},
		/**
		 * @returns {Character}
		 */
		getCurrentCharacter: function() {
			return this._characterManager.getCurrent();
		}
};