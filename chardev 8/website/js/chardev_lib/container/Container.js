/**
 * @constructor
 * @returns {Container}
 */
function Container() {
	this._elements = [];
}

Container.prototype._elements = [];

/**
 * @param {Object} element
 */
Container.prototype.set = function(element){
	this._elements[element._id] =  element;
};

/**
 * @param {number} id
 * @returns {boolean}
 */
Container.prototype.contains = function(id) {
	if(this._elements[id]){
		return true;
	}

	return false;
};

/**
 * @param {number} id
 * @returns {Object}
 */
Container.prototype.getByReference = function(id) {
	return this._elements[id];
};

/**
 * @param {number} id
 * @returns {Object}
 */
Container.prototype.get = function( id ) {
	return this._elements[id];
};