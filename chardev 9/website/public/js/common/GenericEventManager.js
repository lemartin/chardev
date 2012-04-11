/**
 * @constructor
 * @returns {GenericEventManager}
 */
function GenericEventManager() {
	this.observers = [];
}

GenericEventManager.prototype = {
	observers: null,
	silent: false,
	addObserver: function( observer ) {
		this.observers.push( observer );
	},
	removeObserver: function( observer ) {
		for( var k in this.observers ) {
			if( this.observers[k] == observer ) {
				this.observers.splice( k, 1 );
				return;
			}
		}
	},
	silence: function( b ) {
		this.silent = b;
	}
};
