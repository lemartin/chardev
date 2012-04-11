/**
 * @constructor
 * @param {string} name
 * @param {string} variable
 */
function AbstractFilter( name, variable ) {
	this.variable = variable;
	this.name = name;
	this.node = document.createElement("div");
}

AbstractFilter.OPERATOR_OPTIONS_NUMERIC = [['gt','&gt;'],['ge','&ge;'],['lt','&lt;'],['le','&le;'],['eq','=']];
AbstractFilter.OPERATOR_OPTIONS_STRING = [['wlike','is']];
AbstractFilter.OPERATOR_OPTIONS_NUMERIC_EUQAL = [['eq','=']];

AbstractFilter.prototype = {
	node: null, variable: "", name: "",
	getOperatorSelect: function( valueType ) {
		var tmp;
		switch( valueType ) {
		case InputFilterData.TYPE_STRING_SIMPLE:
			tmp = new SingleSelect(AbstractFilter.OPERATOR_OPTIONS_STRING);
			tmp.node.style.display = "none";
			break;
		case InputFilterData.TYPE_NUMERIC_EUQAL:
			tmp = new SingleSelect(AbstractFilter.OPERATOR_OPTIONS_NUMERIC_EUQAL);
			tmp.node.style.display = "none";
			break;
		case InputFilterData.TYPE_NUMERIC:
			tmp = new SingleSelect(AbstractFilter.OPERATOR_OPTIONS_NUMERIC);
			break;
		default:
			throw new Error("Unable to create operator select for "+valueType+"!");
		}
		tmp.node.className = 'fi_op_select';
		return tmp;
	},
	/**
	 * @return {string}
	 */
	getArgumentString: function() {
		throw new NotImplementedException( "AbstractFilter", "getArgumentString");
	}
};