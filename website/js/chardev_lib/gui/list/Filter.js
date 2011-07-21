/**
 * @constructor
 * @returns {Filter}
 */
function Filter ( ) {}

Filter.prototype._node = null;
Filter.prototype._addFilterBtn = null;
Filter.prototype._searchBtn = null;
Filter.prototype._filterManager = null;
Filter.prototype._propagate = null;
Filter.prototype._filterHandler = null;
Filter.prototype._propagateHandler = null;
Filter.prototype._layout = null;

Filter.prototype.initialise = function( ) {
	this._filterManager = new FilterManager();

	this._node = document.createElement("form");
	this._node.onsubmit = function(){return false;};
	this._node.action = "#";
	this._node.method = 'post';
	Listener.add(this._node,"submit",this._onSubmit,this,null);
	
	this._addFilterBtn = document.createElement("input");
	this._addFilterBtn.value = locale['F_AddFilter'];
	this._addFilterBtn.type = "button";
	Listener.add(this._addFilterBtn,"click",this.addCustomFilter,this,null);
	
	this._searchBtn = document.createElement("input");
	this._searchBtn.value = locale['F_Search'];
	this._searchBtn.type = "submit";
	this._searchBtn.className = "fm_search";
	
	this._propagate = document.createElement("input");
	this._propagate.type = "checkbox";
	this._searchBtn.className = "fm_propagate";
	Listener.add(this._propagate,"change",this._onPropagationChange,this,null);
	
	this._layout = new StaticGrid(1,4); this._layout.setVerticalAlign(SG_VALIGN_TOP);
	this._layout._cols[0].width = "100%";
	this._node.appendChild(this._layout._node);
	
	this._layout.addJoinedRow();
	this._layout._cells[1][0].appendChild(this._filterManager._customFilterParent);
	this._layout._cells[1][0].appendChild(this._addFilterBtn);
	this._layout._node.className = 'fm_layout_t';
	
	this._node.appendChild(this._searchBtn);
};


Filter.prototype._onSubmit = function() {
	this.update( this._filterManager.buildArgumentString() );
	if( this._filterHandler ) {
		this._filterHandler.notify([]);
	}
};

Filter.prototype.addCustomFilter = function() {
	this._filterManager.addCustomFilter( "", "" );
};

Filter.prototype.removeHiddenFilter = function(variableName) {
	this._filterManager.showFilter(variableName);
};

Filter.prototype.addHiddenFilter = function(variableName) {
	this._filterManager.hideFilter(variableName);
};
/**
 * @param {Handler} handler
 */
Filter.prototype.setFilterHandler = function( handler ) {
	this._filterHandler = handler;
};
/**
 * @param {Handler} handler
 */
Filter.prototype.setPropagationHandler = function( handler ) {
	this._propagateHandler = handler;
};

Filter.prototype._onPropagationChange = function() {
	if( this._propagateHandler ) {
		this._propagateHandler.notify([]);
	}
};
/**
 * @returns {boolean}
 */
Filter.prototype.propagate = function() {
	return this._propagate  && this._propagate.checked; 
};
/**
 * @returns {string}
 */
Filter.prototype.buildArgumentString = function() {
	return this._filterManager.buildArgumentString();
};
/**
 * @param {string} variable
 * @param {string} replace
 */
Filter.prototype.replaceArgument = function( variable, replace ) {
	var tmp = this._filterManager.buildArgumentString(); 
	tmp = tmp.replace(new RegExp("\b"+variable+"\\.\\w+\\.[^;]+;"),"") + replace ;
	this.update(tmp);
};


Filter.prototype.getStaticInputNode = function( title, node ) {
	var div = document.createElement('div');
	div.innerHTML = "<span class='if_in_title'>"+title+":</span>";
	div.appendChild( node );
	return div;
};

Filter.prototype.getStaticSelectNode = function( title, node ) {
	var div = document.createElement('div');
	div.innerHTML = "<div class='if_sel_title'>"+title+"</div>";
	div.appendChild(node);
	return div;
};

/**
 * @param {string} argString
 */
Filter.prototype.update = function ( argString ) {
	throw 'Unimplemented function Filter.update';
};