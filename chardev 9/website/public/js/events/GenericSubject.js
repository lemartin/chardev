/**
 * @constructor
 */
function GenericSubject() {
	this.__events = new Object();
}

GenericSubject.prototype = {
	__events: {},
	/**
	 * @param {string} event
	 * @param {Array} args
	 */
	registerEvent: function( event, args ) {
		if( this.__events.hasOwnProperty(event) ) {
			throw new Error("The event "+event+" is already registered!");
		}
		
		if( typeof args !== 'object' ) {
			throw new Error("Given arguments are not the correct type!");
		}
		
		for( var k in args ) {
			if( typeof args[k] !== 'string' ) {
				throw new Error("The argument "+args[k]+" on index "+k+" is not of the type string!");
			}
		}
		this.__events[event] = { "args": args, "observers": [], "propagators": []};
	},
	/**
	 * @param {string} event
	 * @param {Object} args
	 */
	fire: function( event, args ) {
		var e = this.getRegisteredEvent(event);;
		var defArgs, observers, propagators; 
		var k = 0;
		
		defArgs = e["args"];
		
		for( k in args ) {
			if( defArgs.hasOwnProperty(k)) {
				throw new Error("The argument "+args[k]+" was not defined when registering the event!");
			}
		}
		
		for( k in defArgs ) {
			if( args.hasOwnProperty(k)) {
				throw new Error("The required argument "+defArgs[k]+" was found!");
			}
		}
		
		observers = e["observers"];
		
		for( k in observers ) {
			observers[k].handler.notify([new GenericEvent( event, args, this, observers[k])]);
		}
		
		propagators = e["propagators"];
		
		for( k in propagators ) {
			propagators[k].fire( event, args );
		}
	},	
	/**
	 * @param {GenericEvent} event
	 */
	refire: function( event ) {
		this.__refire( event.event, event );
	},
	refireAs: function( name, event ) {
		this.__refire( name, event );
	},
	__refire: function( name, event ) {
		var e = this.getRegisteredEvent(name);
		var defArgs, observers, propagators; 
		var k = 0;
		
		defArgs = e["args"];
		
		for( k in event.__kvps ) {
			if( defArgs.hasOwnProperty(k)) {
				throw new Error("The argument "+event.__kvps[k]+" was not defined when registering the event!");
			}
		}
		
		for( k in defArgs ) {
			if( event.__kvps.hasOwnProperty(k)) {
				throw new Error("The required argument "+defArgs[k]+" was found!");
			}
		}
		
		observers = e["observers"];
		
		for( k in observers ) {
			observers[k].handler.notify([new GenericEvent(name, event.__kvps, this, observers[k])]);
		}
		
		propagators = e["propagators"];
		
		for( k in propagators ) {
			propagators[k].fire( name, event.__kvps );
		}
	},
	/**
	 * @param {GenericObserver} observer
	 */
	addObserver: function( observer ) {
		
		for( var ek in observer.events ) {
			
			var event = observer.events[ek];
			var e = this.getRegisteredEvent(event);
			
			if( ! (observer instanceof GenericObserver) ) {
				throw new Error("You may only add GenericObserver as observer!");
			}
			
			e["observers"].push(observer);
			
		}
	},
	/**
	 * @param {GenericObserver} observer
	 */
	removeObserver: function( observer ) {
		for( var ek in observer.events ) {
			var event = observer.events[ek];
			var e = this.getRegisteredEvent(event);
			
			var observers = e["observers"];
			
			for( var k in observers ) {
				if( observer == observers[k] ) {
					observers.splice( k, 1 );
					return;
				}
			}
			
			throw new Error("Unable to remove observer +"+observer+" for event "+event+"!");
		}
	},
	/**
	 * @param {GenericSubject} propagator
	 */
	addPropagator: function( event, propagator ) {
		var e = this.getRegisteredEvent(event);
		
		e["propagators"].push(propagator);
	},
	removePropagator: function( event, propagator ) {
		var e = this.__events[event];
		
		if( typeof e === 'undefined' || e === null ) {
			throw new Error("The event "+event+" is not registered!");
		}
		
		var propagators = e["propagators"]; 
		
		for( var k in e["propagators"] ) {
			if( propagator == propagators[k] ) {
				propagators.splice( k, 1 );
				return;
			}
		}
		throw new Error("Unable to remove propagators +"+propagator+" for event "+event+"!");
	},
	getRegisteredEvent: function( event ) {
		var e = this.__events[event];
		
		if( typeof e === 'undefined' || e === null ) {
			throw new Error("The event "+event+" is not registered!");
		}
		
		return e;
	},
	isRegisteredEvent: function( event ) {
		var e = this.__events[event];
		return typeof e !== 'undefined' && e !== null;
	}
};