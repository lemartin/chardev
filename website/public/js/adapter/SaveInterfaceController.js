/**
 * @constructor
 * @param {SaveInterface} saveInterface
 * @param {CharacterGuiAdapter} adapter
 */
function SaveInterfaceController( saveInterface, adapter ) {
	this.saveInterface = saveInterface;
	this.adapter = adapter;
	
	this.saveInterface.addObserver(new GenericObserver(["save", "update"], new Handler(this.saveInterfaceHandler,this)));
}

SaveInterfaceController.prototype = {
		saveInterface: null,
		adapter: null,
		_profileId: 0,
		_profileUserId: 0,
		_userId: 0,
		/**
		 * @param {GenericEvent} e
		 */
		saveInterfaceHandler: function( e ) {
			if(e.is("save")) {
				try {
					var cc = this.adapter.character;
					cc.setName(e.get("name"));
					cc.setDescription(e.get("desc"));
					
					CharacterIO.writeToDatabase(0, cc, new Handler(function( href, exception) {
						if ( exception != null ) {
							Tooltip.showError(exception);
						}
						else {
							Tooltip.showHtmlDisabled("Your profile was saved.<br /><a class='tt_profile_link' href='"+escape(Tools.getBasePath() + href)+"' target='_blank'>Click here</a> to view it.");
						}
					}, this ));

					Tooltip.showLoading();
				}
				catch( ex ) {
					Tooltip.showError(ex);
				}
			}
			else if(e.is("update")) {
				try {
					var cc = this.adapter.character;

					CharacterIO.writeToDatabase( this._profileId, cc, new Handler(function( href, exception) {
						if ( exception != null ) {
							Tooltip.showError(exception);
						}
						else {
							Tooltip.showHtmlDisabled("The profile was updated.");
						}
					}, this ));

					Tooltip.showLoading();
				}
				catch( ex ) {
					Tooltip.showError(ex);
				}
			}
		},
		setProfileInfo: function( profileId, profileUserId ) {
			this._profileId = profileId;
			this._profileUserId = profileUserId;
		},
		setUserId: function( userId ) {
			this._userId = userId;
			this.update();
		},
		update: function() {
			this.saveInterface.update( this._profileId > 0 && this._userId > 0 && this._userId == this._profileUserId );
		}
};