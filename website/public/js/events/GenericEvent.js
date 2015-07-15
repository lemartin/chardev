/**
 * @constructor
 * @param {string} event
 * @param {Object} keyValuePairs
 * @param {GenericSubject} subject
 * @param {GenericObserver} observer
 */
function GenericEvent( event, keyValuePairs, subject, observer ) {
	this.__kvps = keyValuePairs;
	this.event = event;
	this.subject = subject;
	this.observer = observer;
}
GenericEvent.DEBUG = true;
GenericEvent.prototype = {
	event: "",
	__kvps: {},
	subject: null,
	observer: null,
	handled: false,
	/**
	 * @param {string} key
	 */
	get: function( key ) {
		if( ! this.__kvps.hasOwnProperty(key) ) {
			throw new Error("The key "+key+" is not defined for this event!");
		}
		
		return this.__kvps[key];
	},
	getArgs: function() {
		return this.__kvps;
	},
	/**
	 * @param {string} event
	 */
	is: function( event ) {
		if( GenericEvent.DEBUG ) {
			if( ! this.subject.isRegisteredEvent(event) ) {
				throw new Error("The event "+event+" is not registered for the subject!");
			}
			if( ! this.observer.listensTo(event) ) {
				throw new Error("The event "+event+" is not registered for the observer!");
			}
			if( this.event === event ) {
				this.handled = true;
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return this.event === event;
		}
	},
	check: function() {
		if( GenericEvent.DEBUG && ! this.handled ) {
			throw new Error("Event "+this.event+" was not handled!");
		}
	}
};
