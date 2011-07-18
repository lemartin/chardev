var FM_INV 	= -1;
var FM_RIN 	= 0;
var FM_IN 	= 1;
var FM_SEL 	= 2;
var FM_MSEL = 3;

var FM_OPT_GROUP = 0;
var FM_OPT = 1;
var FM_OPT_EMPTY = 2;

var FM_NUMERIC = 0; var FM_NUMERIC_SELECT_OPTS = [['gt','&gt;'],['ge','&ge;'],['lt','&lt;'],['le','&le;'],['eq','=']];
var FM_STRING = 1;
var FM_STRING_SIMPLE = 2;  var FM_STRING_SIMPLE_SELECT_OPTS = [['wlike','is']];
var FM_NUMERIC_EQ = 3; var FM_NUMERIC_EQ_SELECT_OPTS = [['eq','=']];

/**
 * @constructor
 * @returns {FilterManager}
 */
function FilterManager() {
	this._filterList = new LinkedList();
	this._customFilterOptions = [];
	this._staticFilters = [];
	this._customFilterParent = document.createElement("div");
}
FilterManager.prototype._filterList = new LinkedList();
FilterManager.prototype._staticFilters = [];
FilterManager.prototype._customFilterOptions = [];
FilterManager.prototype._hiddenFilter = {};
FilterManager.prototype._arguments = "";
FilterManager.prototype._customFilterParent = document.createElement("div");
FilterManager.prototype.removeLinkHTML = "[remove]";
FilterManager.prototype.removeLinkClass = "";

/**
 * @param {Array} settings
 * @param {string} preset
 * @returns {FilterBase}
 */
FilterManager.prototype._buildFilter = function( settings, preset) {
	var f = null;
	switch( settings[1] ) {
	case FM_IN:
		f = new FilterInput(settings[0],settings[2]);
		break;
	case FM_RIN:
		f = new FilterRangeInput(settings[0]);
		break;
	case FM_SEL:
		f = new FilterSelect(settings[0],settings[2]);
		break;
	case FM_MSEL:
		f = new FilterMultiSelect(settings[0],settings[2]);
		break;
	default:
		throw "Invalid filter type (var:"+settings[0]+") "+settings[1];
	}
	if( preset ) {
		if( f.set(preset) ) {
			this._arguments = this._arguments.replace(preset,"");
		}
	}
	return f;
};

/**
 * @param {Array} customFilterOptions
 * @param {Array} staticFilterSettings
 * @param {string} filterArguments
 */
FilterManager.prototype.set = function( customFilterOptions, staticFilterSettings, filterArguments) {
	this._arguments = filterArguments; 
	this._customFilterOptions = customFilterOptions;
	
	this._filterList.clear();
	while(this._customFilterParent.firstChild) {
		this._customFilterParent.removeChild(this._customFilterParent.firstChild);
	}
	
	this._buildFilters(staticFilterSettings);
	this._buildCustomFilters();
};
/**
 * @param filterSettings 
 */
FilterManager.prototype._buildFilters = function( filterSettings ) {
	var i;
	var presetMatch;
	var f;
	//
	this._staticFilters = [];
	//
	for( i=0; i<filterSettings.length; i++ ) {
		if( !filterSettings[i] ) {
			continue;
		}
		presetMatch = new RegExp("(?:^|;)("+filterSettings[i][0]+"\\.(?:\\w+)\\.(?:[^;]+);)").exec(this._arguments);
		//
		f = this._buildFilter(filterSettings[i], presetMatch ? presetMatch[1] : null );
		this._filterList.push(f);
		if( !this._hiddenFilter[filterSettings[i][0]] ) {
			this._staticFilters[i] = f;
		}
	}
};

/** @private */
FilterManager.prototype._buildCustomFilters = function() {
	var n = 0;
	var presetMatch, variableMatch, prevMatch;
	//
	while( (presetMatch = (/(^|;)([^;]+;)/).exec( this._arguments )) != null ) {
		prevMatch = this._arguments;
		//
		variableMatch = (/^(\w+)\.(\w+)\.([^;]+);/).exec( presetMatch[2] );

		if( !variableMatch ) {
			this._arguments = this._arguments.replace(presetMatch[0], presetMatch[1]);
			continue;
		}
		//
		this.addCustomFilter(variableMatch[1] , presetMatch[2]);
		n++;
		// 
		if( prevMatch == this._arguments ) {
			this._arguments = this._arguments.replace(presetMatch[0], presetMatch[1]);
			continue;
		}
	}
};
/**
 * Hides the given custom filter option
 * @param {string} variableName Custom filter option to hide
 */
FilterManager.prototype.hideFilter = function( variableName ) {
	this._hiddenFilter[variableName] = true;
};
/**
 * Shows the given custom filter option
 * @param {string} variableName Custom filter option to show
 */
FilterManager.prototype.showFilter = function( variableName ) {
	this._hiddenFilter[variableName] = false;
};
/**
 * Adds a custom filter to the custom filter parent node and the filter list
 * 
 * @param {string} selectedVariable Selected custom filter option, null if none
 * @param {string} preset Filter preset, null if none
 */
FilterManager.prototype.addCustomFilter = function( selectedVariable, preset ) {
	var optGroup = null, 
		optCount = 0, 
		optType, 
		opt, 
		sel = document.createElement("select"),
		span = document.createElement("span"),
		parent = document.createElement("div"),
		filter = null,
		customFilterIndex = -1,
		show = true,
		append = true,
		listElement = null;
	
	sel.className = "single_select fm_sel";
	// create custom filter options select
	for( var i=0; i<this._customFilterOptions.length; i++ ) {
		show = true;
		optType = this._customFilterOptions[i][0];
		switch(optType){
		case FM_OPT_EMPTY:
			opt = document.createElement("option");
			opt.value = -1;
			sel.appendChild(opt);
			break;
		case FM_OPT_GROUP:
			if( optGroup != null && optCount > 0 ) {
				sel.appendChild(optGroup);
			}
			optGroup = document.createElement("optgroup");
			optGroup.label = this._customFilterOptions[i][1];
			optCount = 0;
			break;
		case FM_OPT:
			opt = document.createElement("option");
			opt.innerHTML = this._customFilterOptions[i][1];
			opt.value = i;
			if( selectedVariable && selectedVariable == this._customFilterOptions[i][2][0] ) {
				opt.selected = true;
				customFilterIndex = i;
			}
			
			if( this._hiddenFilter[this._customFilterOptions[i][2][0]] ){
				if( customFilterIndex == i ) {
					append = false;
				}
				else {
					show = false;
				}
			}
			if( show ) {
				optCount++;
				if( optGroup != null ) {
					optGroup.appendChild(opt);
				}
				else {
					sel.appendChild(opt);
				}
			}
			break;
		default:
			throw "Invalid custom select option: "+optType;
		}
	}
	if( optGroup != null && optCount > 0 ) {
		sel.appendChild(optGroup);
	}

	if( selectedVariable && customFilterIndex == -1 ) {
		return;
	}

	if( customFilterIndex != -1 ) {
		filter = this._buildFilter( this._customFilterOptions[customFilterIndex][2], preset);
	}
	// create a new list element for the custom filter, init with the currently selected filter, or null if none
	listElement = this._filterList.push(filter);
	
	if( append ) {
		// custom filter option select and filter
		span.appendChild(sel);
		if( filter ) { 
			span.appendChild(filter._node);
		}
		Listener.add(sel,"change",this.onCustomFilterSelect,this,[span,sel,listElement]);
		parent.appendChild(span);
		// remove link
		var rm = document.createElement("a");
		rm.innerHTML = this.removeLinkHTML;
		rm.className = this.removeLinkClass;
		rm.href = "#";
		
		rm.onclick = function(){return false;};
		parent.appendChild(rm);
		Listener.add(rm,"click",
				function(p,e){if(e!=null){e.remove();}if(p.parentNode){p.parentNode.removeChild(p);}},
				window,
				[parent,listElement]
		);
		this._customFilterParent.appendChild(parent);
	}
};

/**
 * @param {HTMLElement} node
 * @param {HTMLSelectElement} select
 * @param {ListElement} listElement
 */
FilterManager.prototype.onCustomFilterSelect = function( node, select, listElement ) {
	var filter = null;
	if( listElement._value ) {
		node.removeChild(listElement._value._node);
	}
	//
	var i = parseInt(select.options[select.selectedIndex].value, 10);
	if( i != -1 ) {
		filter = this._buildFilter( this._customFilterOptions[i][2], null);
		node.appendChild(filter._node);
	}
	listElement._value = filter;
};

/**
 * @returns {string} 
 */
FilterManager.prototype.buildArgumentString = function() {
	var str = "";
	var e = this._filterList._first;

	while( (e = e._next)._next != null ) {
		if( e._value == null ) {
			continue;
		}
		str += e._value.getArgumentString();
	}
	
	return str;
};
//
//#############################################################################
//
//	FILTER BASE
//
//#############################################################################
//
/**
 * @constructor
 * @param {string} variableName
 * @param {number} type
 * @returns {FilterBase}
 */
function FilterBase( variableName, type ) {
	this._variableName = variableName;
	this._node = document.createElement("span");
	this._type = type;
}
FilterBase.prototype._variableName = "";
FilterBase.prototype._node = null;
FilterBase.prototype._type = FM_INV;
FilterBase.prototype._valueType = FM_NUMERIC;
/**
 * @param {number} valueType
 * @returns {SingleSelect}
 */
FilterBase.prototype.getOperatorSelect = function( valueType ) {
	var tmp = null;
	switch(this._valueType) {
	case FM_STRING_SIMPLE:
		tmp = new SingleSelect(FM_STRING_SIMPLE_SELECT_OPTS);
		tmp._node.style.display = "none";
		break;
	case FM_NUMERIC_EQ:
		tmp = new SingleSelect(FM_NUMERIC_EQ_SELECT_OPTS);
		tmp._node.style.display = "none";
		break;
	case FM_NUMERIC:
	default:
		tmp = new SingleSelect(FM_NUMERIC_SELECT_OPTS);
		break;
	}
	return tmp;
};


/**
 * @param {string} preset
 * @returns {boolean}
 */
FilterBase.prototype.set = function( preset ){
	throw "Unimplemented set Method of FilterBase was called";
};
/**
 * @returns {string|number}
 */
FilterBase.prototype.getValue = function(){
	throw "Unimplemented getValue Method of FilterBase was called";
};
/**
 * @returns {string}
 */
FilterBase.prototype.getArgumentString = function(){
	throw "Unimplemented getArgumentString Method of FilterBase was called";
};
//
//#############################################################################
//
//	FILTER INPUT
//
//#############################################################################
//
/**
 * @extends {FilterBase}
 * @constructor
 * @param {string} variableName
 * @param {number} valueType
 */
function FilterInput( variableName, valueType ){ 
	FilterBase.call(this, variableName, FM_IN); 
	this._valueType = valueType;
	//
	this._operatorSelect = this.getOperatorSelect(valueType);
	this._node.appendChild(this._operatorSelect._node);
	//
	this._input = document.createElement("input"); 
	this._input.className = 'input fm_in';
	if( this._valueType == FM_NUMERIC ) {
		this._input.value = "0";
	}
	this._node.appendChild(this._input);
}
FilterInput.prototype = new FilterBase('',0);
FilterInput.prototype._valueType = FM_NUMERIC;
FilterInput.prototype._operatorSelect = null;
FilterInput.prototype._input = null;

/**
 * @returns {string}
 */
FilterInput.prototype.getValue = function(){
	switch(this._valueType) {
	case FM_NUMERIC_EQ:
	case FM_NUMERIC:
		var val = parseFloat(this._input.value);
		if(isNaN(val)) {
			val = "";
		}
		return val;
	default:
		return this._input.value;
	}
};
/**
 * @param {string} preset
 * @returns {boolean}
 */
FilterInput.prototype.set = function(preset) {
	var match;
	switch(this._valueType) {
	case FM_NUMERIC:
		match = new RegExp("^"+this._variableName+"\\.(eq|gt|lt|ge|le)\\.(\\d+(?:\\.\\d+)?);$").exec(preset);
		break;
	case FM_NUMERIC_EQ:
		match = new RegExp("^"+this._variableName+"\\.(eq)\\.(\\d+(?:\\.\\d+)?);$").exec(preset);
		break;
	case FM_STRING_SIMPLE:
		match = new RegExp("^"+this._variableName+"\\.(wlike|is)\\.([^;]+);$").exec(preset);
		break;
	default:
		match = new RegExp("^"+this._variableName+"\\.(\w+)\.([^;]+);$").exec(preset);
		break;
	}

	if( match ) {
		this._operatorSelect.select(match[1]);
		this._input.value = match[2];
		return true;
	}

	return false;
};
/**
 * @returns {string}
 */
FilterInput.prototype.getArgumentString = function() {
	return this._variableName+"."+this._operatorSelect.getValue()+"."+this.getValue()+";";
};
//
//#############################################################################
//
//	FILTER RANGE INPUT
//
//#############################################################################
//
/**
 * @extends {FilterBase}
 * @constructor
 * @param {string} variableName
 * @returns {FilterRangeInput}
 */
function FilterRangeInput( variableName ){ 
	FilterBase.call(this, variableName, FM_RIN); 
	this._inputMin = document.createElement('input'); this._inputMin.className = 'input fm_in_min'; this._inputMin.maxLength = "5";
	this._inputMax = document.createElement('input'); this._inputMax.className = 'input fm_in_max'; this._inputMax.maxLength = "5";
	this._node.appendChild(this._inputMin); 
	this._node.appendChild(document.createTextNode(" - "));
	this._node.appendChild(this._inputMax);
}
FilterRangeInput.prototype = new FilterBase('',0);
FilterRangeInput.prototype._valueType = FM_NUMERIC;
FilterRangeInput.prototype._inputMin = null;
FilterRangeInput.prototype._inputMax = null;
/***/
FilterRangeInput.prototype.getMinValue = function(){};
/***/
FilterRangeInput.prototype.getMaxValue = function(){};
/**
 * @returns {string}
 */
FilterRangeInput.prototype.getArgumentString = function() {
	var min = parseFloat(this._inputMin.value);
	var max = parseFloat(this._inputMax.value);
	return this._variableName+".btw."+(isNaN(min)?"":""+min)+"-"+(isNaN(max)?"":""+max)+";";
};
/**
 * @param {string} preset
 * @returns {boolean}
 */
FilterRangeInput.prototype.set = function(preset) {
	var match = new RegExp("^"+this._variableName+"\\.btw\\.(\\d*(?:\\.\\d+)?)-(\\d*(?:\\.\\d+)?);$").exec(preset);

	if( match ) {
		this._inputMin.value = match[1];
		this._inputMax.value = match[2];
		return true;
	}
	
	return false;
};
//
//#############################################################################
//
//	FILTER SELECT
//
//#############################################################################
//
/**
 * @extends {FilterBase}
 * @constructor
 * @param {string} variableName
 * @param {Array} options
 * @returns {FilterSelect}
 */
function FilterSelect( variableName, options ){ 
	FilterBase.call(this, variableName, FM_SEL); 
	this._options = options;
	
	this._select = new SingleSelect(options);
	this._node.appendChild(this._select._node);
}
FilterSelect.prototype = new FilterBase('',0);
FilterSelect.prototype._options = [];
FilterSelect.prototype._select = null;
/**
 * @returns {string|number}
 */
FilterSelect.prototype.getValue = function(){ return this._select.getValue();};
/**
 * @param {string} preset
 * @returns {boolean}
 */
FilterSelect.prototype.set = function(preset) {
	var match = new RegExp("^"+this._variableName+"\\.eq\\.([^;]+);$").exec(preset);
	
	if( match ) {
		this._select.select(match[1]);
		return true;
	}
	
	return false;
};
/**
 * @returns {string}
 */
FilterSelect.prototype.getArgumentString = function() {
	return this._variableName+".eq."+this.getValue()+";";
};

//#############################################################################
//
//	FILTER MULTI SELECT
//
//#############################################################################

/**
 * @extends {FilterBase}
 * @constructor
 * @param {string} variableName
 * @param {Array} options
 * @returns {FilterSelect}
 */
function FilterMultiSelect( variableName, options ){ 
	FilterBase.call(this, variableName, FM_MSEL); 
	this._options = options;
	
	this._select = new MultiSelect(options,'');
	this._node.appendChild(this._select._node);
}
FilterMultiSelect.prototype = new FilterBase('',0);
FilterMultiSelect.prototype._options = [];
FilterMultiSelect.prototype._select = null;
/**
 * @returns {string|number}
 */
FilterMultiSelect.prototype.getValue = function(){ return this._select.getValue();};
/**
 * @param {string} preset
 * @returns {boolean}
 */
FilterMultiSelect.prototype.set = function(preset){
	var match = new RegExp("^"+this._variableName+"\\.ba\\.([^;]+);$").exec(preset);
	
	if( match ) {
		this._select.select(parseInt(match[1], 10));
		return true;
	}
	
	return false;
};
/**
 * @returns {string}
 */
FilterMultiSelect.prototype.getArgumentString = function() {
	return this._variableName+".ba."+this.getValue()+";";
};


