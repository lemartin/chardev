/**
 * @constructor
 */
function SimpleUserControl() {
	/* do nothing */
}

SimpleUserControl.prototype = {
	/**
	 * @type {HtmlElement}
	 */
	node: null,
	getValue: function(){throw new NotImplementedException('SimpleUserControl','getValue');},
	setValue: function(value){throw new NotImplementedException('SimpleUserControl','setValue');}
};