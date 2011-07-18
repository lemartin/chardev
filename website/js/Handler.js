/**
 * @constructor
 * @param {Function} handler
 * @param {Object} scope
 * @returns {Handler}
 */
function Handler ( handler, scope ) {
	this.handler = handler;
	this.scope = scope;
}

/**
 * @type {Function}
 */
Handler.prototype.handler = null;
/**
 * @type {Object}
 */
Handler.prototype.scope = null;

/**
 * @param {Array} args
 */
Handler.prototype.notify = function ( args ) {
	this.handler.apply( this.scope, args );
};