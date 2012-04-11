/**
 * @constructor
 * @param {string} variable
 * @param {string} operator
 * @param {string} value
 * @param {number} type
 */
function InputFilter( name, variable, operator, value, type ) {
	AbstractFilter.call( this, name, variable );
	
	this.valueType = type;

	this.input = document.createElement("input"); 
	this.input.className = 'input fi_in';
	
	if( value != null ) {
		this.input.value = value;
	}
	else if( this.valueType == InputFilterData.TYPE_NUMERIC || this.valueType == InputFilterData.TYPE_NUMERIC_EUQAL ) {
		this.input.value = "0";
	}
	else {
		this.input.value = "";
	}
	
	this.operatorSelect = this.getOperatorSelect(type);
	if( operator != null ) {
		this.operatorSelect.select(operator);
	}

	this.node.appendChild(this.operatorSelect.node);
	this.node.appendChild(this.input);
	this.node.className = "fi_p";
}

InputFilter.prototype = new AbstractFilter("","");
InputFilter.prototype.operatorSelect = null;
InputFilter.prototype.input = null;
InputFilter.prototype.valueType = InputFilterData.TYPE_NUMERIC;

InputFilter.prototype.getValue = function(){
	switch(this.valueType) {
	case InputFilterData.TYPE_NUMERIC_EUQAL:
	case InputFilterData.TYPE_NUMERIC:
		var val = parseFloat(this.input.value);
		if(isNaN(val)) {
			val = "";
		}
		return val;
	default:
		return this.input.value;
	}
};

InputFilter.prototype.getArgumentString = function() {
	return this.variable+"."+this.operatorSelect.getValue()+"."+this.getValue()+";";
};