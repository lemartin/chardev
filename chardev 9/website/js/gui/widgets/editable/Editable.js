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