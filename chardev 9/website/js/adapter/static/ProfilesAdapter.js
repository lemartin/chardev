/**
 * @constructor
 */
function ProfilesAdapter() {
	this.profileList = new ProfileList();
	this.profileList.gui.showFilter(true);
	//
	var plHandler = new Handler(function( e ){
		if( e.is('update')) {
			new ListBackEndProxy("php/interface/profiles/get_profiles.php").update(this.profileList);
		}
		else if( e.is('delete') ) {
			
			if( ! confirm("Do you really want to delete the character profile '"+e.get('desc')+"'?")) {
				return;
			}
			
			Ajax.request("php/interface/profiles/delete_profile.php"+TextIO.queryString({'id': e.get('profile_id')}), new Handler( function( response ){
				try {
					Ajax.getResponseObject(response);
					this.profileList.update();
				}
				catch( e ) {
					Tooltip.showError(e);
				}
			}, this), []);
		}
	}, this);
	//
	var plObserver = new GenericObserver([
		'update', 'delete'
	], plHandler);
	//
	this.profileList.addObserver(plObserver);
}
ProfilesAdapter.prototype = {
	profileList: null,
	getNode: function() {
		return this.profileList.gui.node;
	}
};