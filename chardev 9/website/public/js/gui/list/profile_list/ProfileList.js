/**
 * @constructor
 */
function ProfileList() {
	var gui = new ProfileListGui(List.toCategories(ProfileList.FILTER_DATA));
	List.call( 
		this,
		gui,
		List.toPlainFilterData(ProfileList.FILTER_DATA),
		['ismine'],
		ProfileList.ORDER_ID
	);
	
	this.eventMgr.registerEvent('delete', ['profile_id', 'desc']);
	this.gui.eventMgr.addPropagator('delete', this.eventMgr);
}

ProfileList.FILTER_DATA = {};

ProfileList.FILTER_DATA["none"] = [
   new SingleSelectFilterData( locale['F_MyProfiles'], 'ismine', FILTER_YES_NO_OPTIONS ),
   new SingleSelectFilterData( locale['F_ShowDeleted'], 'showdeleted', FILTER_YES_NO_OPTIONS ),
   new InputFilterData( locale['F_CharacterLevel'], 'lvl', InputFilterData.TYPE_NUMERIC )
];

ProfileList.ORDER_ID = 'id';
ProfileList.prototype = new List(null,null,null,"");