/**
 * @constructor
 * @returns {ProfileFilter}
 */
function ProfileFilter(){
	Filter.call(this);
	this.initialise();
}

ProfileFilter.prototype = new Filter();
ProfileFilter.prototype._customFilterOptions = [
	[FM_OPT_EMPTY],
	[FM_OPT, locale['F_ShowDeleted'], ['showdeleted',[[1,locale['F_Yes']],[0,locale['F_No']]]]],
	[FM_OPT, locale['F_CharacterLevel'], ['lvl',FM_IN,FM_NUMERIC]]
];
ProfileFilter.prototype._layout = null;

ProfileFilter.prototype.buildArgumentString = function() {
	return Filter.prototype.buildArgumentString.call(this);
};

ProfileFilter.prototype.update = function( args ) 
{
	this._filterManager.set(
		this._customFilterOptions, 
		[[ 'ismine', FM_SEL, [[1,'Yes'],[0,'No']] ]], 
		args
	);
	
	var sf = this._filterManager._staticFilters;
	var div, i;
	
	var lr0 = this._layout._cells[0];
	for( i = 0; i<lr0.length; i++ ) {
		lr0[i].innerHTML = '';
	}
	
	div = this.getStaticSelectNode( locale['F_MyProfiles'], sf[0]._node); 
	div.className = 'if_in_later';
	lr0[0].appendChild(div);
};
