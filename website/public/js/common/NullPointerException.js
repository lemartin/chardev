function NullPointerException() {
	Error.call(this);
}

NullPointerException.prototype = new Error;