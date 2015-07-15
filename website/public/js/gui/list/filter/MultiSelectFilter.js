/**
 * @constructor
 * @param {string}name
 * @param {string} variable
 * @param {string} value
 * @param {Object} options
 */
function MultiSelectFilter( name, variable, value, options ) {
	AbstractFilter.call( this, name, variable );
	
	this.select = MultiSelect.fromObject(options);
	
	if( value != null ) {
		this.select.select(value);
	}
	this.node.className = 'fi_multi_select';
	this.node.appendChild(this.select.node);
}

MultiSelectFilter.prototype = new AbstractFilter("","");
MultiSelectFilter.prototype.select = null;

MultiSelectFilter.prototype.getArgumentString = function() {
	return this.variable+".ba."+this.select.getValue()+";";
};