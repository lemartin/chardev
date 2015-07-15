/**
 * @constructor
 */
function StoredFilters() {
	this._storedFilters = [];
	for( var i=0; i<Inventory.SLOTS; i++ ) {
		this._storedFilters[i] = "";
	}
}

StoredFilters.prototype = {
	_storedFilters: null,	
	replaceArgument: function( variable, replace ) {
		for( var i=0; i<Inventory.SLOTS; i++ ) {
			this._storedFilters[i] = this._storedFilters[i].replace(new RegExp("\\b"+variable+"\\.\\w+\\.[^;]+;","g"), "") + replace ;
		}
	},
	propagate: function( variable, args ) {
		var m = args.match(new RegExp("\\b"+variable+"\\.\\w+\\.[^;]+;","g"));
		if( m ) {
			this.replaceArgument(variable,m.join(""));
		}
		else {
			this.replaceArgument(variable,"");
		}
	},
	get: function( slot ) {
		return this._storedFilters[slot];
	},
	set: function( slot, arg ) {
		this._storedFilters[slot] = arg;
	}
};