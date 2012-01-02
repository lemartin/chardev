/**
 * @constructor
 * @param {Array} eventsToListenTo
 * @param {Handler} handler
 */
function GenericObserver( eventsToListenTo, handler ) {
	if( eventsToListenTo == null || handler == null ) {
		return null;
	}
	
	if( typeof eventsToListenTo !== 'object' ) {
		throw new Error("Given events to listen to are not the correct type!");
	}
	
	for( var k in eventsToListenTo ) {
		if( typeof eventsToListenTo[k] !== 'string' ) {
			throw new Error("The event "+eventsToListenTo[k]+" on index "+k+" is not of the type string!");
		}
	}
	if( ! ( handler instanceof Handler ) ) {
		throw new Error("Given handler is not an instance of handler!");
	}

	this.events = eventsToListenTo;
	this.handler = handler;
}
GenericObserver.prototype = {
	events: {},
	handler: null,
	listensTo: function( event ) {
		for( var k in this.events ) {
			if( this.events[k] === event ) {
				return true;
			}
		}
		return false;
	}
};