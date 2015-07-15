/**
 * @constructor
 * @returns {SetFilter}
 */
function SetFilter(){
	Filter.call(this);
	this.initialise();
}

SetFilter.prototype = new Filter();
SetFilter.prototype._staticFilterOptions = [];
SetFilter.prototype._customFilterOptions = [];

SetFilter.prototype.buildArgumentString = function() {
	return Filter.prototype.buildArgumentString.call(this);
};

SetFilter.prototype.update = function( args ) 
{
	this._filterManager.set(
		this._customFilterOptions, // custom filter
		[
		 ['name',FM_IN,FM_STRING_SIMPLE],
		 ['ilvl',FM_RIN],
		 ["reqlvl",FM_RIN]
		], // static filter
		args
	);
	
	var sf = this._filterManager._staticFilters;
	var lr0 = this._layout._cells[0];
	var div;
	
	for( var i = 0; i<lr0.length; i++ ) {
		lr0[i].innerHTML = '';
	}
	
	div = this.getStaticInputNode( locale['F_Name'], sf[0]._node); 
	div.className = 'if_in_later';
	lr0[0].appendChild(div);
	
	div = this.getStaticInputNode( locale['F_ItemLevel'], sf[1]._node); 
	div.className = 'if_in_later';
	lr0[0].appendChild(div);
	
	div = this.getStaticInputNode( locale['F_RequiredLevel'], sf[2]._node);
	div.className = 'if_in_later';
	lr0[0].appendChild(div); 
};
