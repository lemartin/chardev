/**
 * @constructor
 */
function NoGlyphSlotsException () {
	Error.call(this);
	this.message = "Unable to add Glyph, there are no empty slots available!";
}

NoGlyphSlotsException.prototype = new Error();


