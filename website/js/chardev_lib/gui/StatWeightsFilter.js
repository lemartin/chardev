var F_CLASS_OPTS2 = [
	[1,locale['a_class'][0]],
	[2,locale['a_class'][1]],
	[3,locale['a_class'][2]],
	[4,locale['a_class'][3]],
	[5,locale['a_class'][4]],
	[6,locale['a_class'][5]],
	[7,locale['a_class'][6]],
	[8,locale['a_class'][7]],
	[9,locale['a_class'][8]],
	[11,locale['a_class'][10]]
];

/**
 * @constructor
 * @returns {StatWeightsFilter}
 */
function StatWeightsFilter(){
	Filter.call(this);
	this.initialise();
}

StatWeightsFilter.prototype = new Filter();
StatWeightsFilter.prototype._staticFilterOptions = [];
StatWeightsFilter.prototype._customFilterOptions = [
	[FM_OPT,"Character Class ",["chrclass",FM_SEL,F_CLASS_OPTS2]]
];

StatWeightsFilter.prototype.buildArgumentString = function() {
	return Filter.prototype.buildArgumentString.call(this);
};

StatWeightsFilter.prototype.update = function( args ) 
{
	this._filterManager.set(
		this._customFilterOptions, // custom filter
		this._staticFilterOptions, // static filter
		args
	);
};
