/**
 * @constructor
 */
function IllegalArgumentException() {
	Error.call(this);
}

IllegalArgumentException.prototype = new Error;