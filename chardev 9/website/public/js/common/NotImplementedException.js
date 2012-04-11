/**
 * @constructor
 * @param className
 * @param methodName
 */
function NotImplementedException ( className, methodName ) {
	Error.call( this );
	this.message = "Called abstract method " + className + "::" + methodName;
	this.name = "NotImplementedException";
}

NotImplementedException.prototype = new Error;