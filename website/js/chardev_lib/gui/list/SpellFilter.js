/**
 * @constructor
 * @param {number} listType
 * @returns {SpellFilter}
 */
function SpellFilter( listType ){
	Filter.call( this );
	this.initialise();
	
	this._filterManager = new FilterManager();
}

SpellFilter.prototype._customFilterOptions = [
	[F_OPT_EMPTY],
	[FM_OPT,locale['CS_Stats'][1][0],['str',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][1],['agi',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][2],['sta',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][3],['int',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['CS_Stats'][1][4],['spi',FM_IN,FM_NUMERIC]],
	[FM_OPT,locale['F_IsEnchant'],[F_VAR_ISENCHANT,FM_SEL,[[1,locale['F_Yes']],[0,locale['F_No']]]]],
	[FM_OPT,locale['F_Description'],[F_VAR_DESCRIPTION,FM_IN,FM_STRING_SIMPLE]]
];
SpellFilter.prototype = new Filter();

SpellFilter.prototype.update = function( args ) 
{
	this._filterManager.set(
		this._customFilterOptions, 
		[[ 'name', FM_IN, FM_STRING_SIMPLE ]], 
		args
	);
	
	var sf = this._filterManager._staticFilters;
	var div, i;
	
	var lr0 = this._layout._cells[0];
	for( i = 0; i<lr0.length; i++ ) {
		lr0[i].innerHTML = '';
	}
	
	div = this.getStaticInputNode( locale['F_Name'], sf[0]._node); 
	div.className = 'if_in_later';
	lr0[0].appendChild(div);
};