/**
 * @constructor
 */
function Input(  ) {
	this.node = document.createElement("input");
	this.node.className = "input";
}

Input.prototype = new SimpleUserControl;

Input.prototype.node = null;

Input.prototype.setValue = function( v ) {
	this.node.value = v;
};

Input.prototype.getValue = function() {
	return this.node.value;
};