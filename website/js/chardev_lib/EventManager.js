/**
 * @constructor
 * @param events
 * @returns {EventManager}
 */
function EventManager( events ) {
	this._eventHandler = {};
	this.registerEvents(events);
}
/** @type {Object} */
EventManager.prototype._eventHandler = new Object();
/**
 * @param {string} event
 * @param {Handler} handler
 */
EventManager.prototype.addListener = function( event, handler ) {
	if( ! this._eventHandler[event] ) {
		throw "Unknown event "+event+" tried to listen to";
	}
	this._eventHandler[event].push(handler);
};
/**
 * @param {string} event
 * @param {Array} args
 */
EventManager.prototype.fire = function( event, args ) {
	if( ! this._eventHandler[event] ) {
		throw "Unknown event "+event+" fired!";
	}
	for( var i in this._eventHandler[event] ) {
		this._eventHandler[event][i].notify( args ? args : [] );
	}
};
/**
 * @param {Array} events
 */
EventManager.prototype.registerEvents = function( events ) {
	for( var i in events ) {
		this._eventHandler[events[i]] = [];
	}
};

EventManager.prototype.clear = function( events ) {
	this._eventHandler = {};
};