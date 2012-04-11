/**
 * @constructor
 */
function Editable() {
	this.node = document.createElement("div");
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('change', ['data']);
}

Editable.prototype = {
	node: null,
	disabled: false,
	isReadOnly: false,
	eventMgr: null,
	setData: function( data ) {
		throw new NotImplementedException('Editable','setData');
	},
	getData: function() {
		throw new NotImplementedException('Editable','getData');
	},
	readOnly: function( b ) {
		this.isReadOnly = b;
	},
	addObserver: function( observer ) {
		this.eventMgr.addObserver(observer);
	}
};

/**
 * @param v
 */
Editable.formatValue = function( v ) {
	return v ? "<a href=\"javascript:;\" title=\"Click to edit\">" + v + "</a>" : "<span class='ui_data_nothing'>None</span>";
};