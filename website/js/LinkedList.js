/**
 * Constructs a new double linked list element, may only be called by {@link LinkedList}
 * @constructor
 * @param {Object} value
 * @returns {ListElement}
 */
function ListElement ( value ) {
	this._next = null;
	this._prev = null;
	this._value = value;
}

ListElement.prototype._next = new ListElement(null);
ListElement.prototype._prev = new ListElement(null);
ListElement.prototype._isLast = false;
ListElement.prototype._isFirst = false;
ListElement.prototype._value = null;

/**
 * Removes this element from the parent list
 * @returns {boolean} <code>true</code>, if successful, false if the element is not removable (start/end padding element)
 */
ListElement.prototype.remove = function() {
	if( this._isFirst || this._isLast ) {
		return false;
	}

	this._prev._next = this._next;
	this._next._prev = this._prev;
	return true;
};

/**
 * Constructs a new double linked list
 * @constructor
 * @returns {LinkedList}
 */
function LinkedList (){
	this._first = new ListElement(null);
	this._last = new ListElement(null);
	
	this._last._prev = this._first;
	this._first._next = this._last;
	this._last._isLast = true;
	this._first._isFirst = true;
};

LinkedList.prototype._first = new ListElement(null);
LinkedList.prototype._last = new ListElement(null);

/**
 * Adds a new element to the end of the list
 * @param value
 * @returns {ListElement} addedElement
 */
LinkedList.prototype.push = function( value ) {
	var e = new ListElement( value );
	e._next = this._last;
	e._prev = this._last._prev;
	this._last._prev._next = e;
	this._last._prev = e;
	return e;
};

/**
 *	Removes all Elements
 */
LinkedList.prototype.clear = function(){
	this._first._next = this._last;
	this._last._prev = this._first;
};