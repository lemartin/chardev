/**
 * @constructor
 * @param {Array} show
 */
function SingleSelect( show ) {
	this.node = document.createElement("select");
	this.node.className = 'single_select';
	this.set(show);
}

/**
 * @param obj
 * @returns {SingleSelect}
 */
SingleSelect.fromObject = function( obj ) {
	var show = [];
	var n = 0;
	for( var k in obj ) {
		show[n++] = [k,obj[k]]; 
	}
	return new SingleSelect(show);
};

SingleSelect.prototype = new SimpleUserControl;

SingleSelect.prototype.node= null;
SingleSelect.prototype.options= [];

SingleSelect.prototype.setName= function( name ) {
	this.node.name = name;
};
SingleSelect.prototype.set= function( show ) {
	var i;
	this.options  = [];
	while( this.node.firstChild ) {
		this.node.removeChild( this.node.firstChild );
	}
	for( i = 0; i < show.length; i++ ) {
		this.options[i] = document.createElement("option");
		this.options[i].value = show[i][0];
		this.options[i].innerHTML = show[i][1];
		this.node.appendChild(this.options[i]);
	}
};
SingleSelect.prototype.select= function( value ) {
	for( var i = 0; i < this.options.length; i++ ) {
		if( this.options[i].value === value ) {
			this.options[i].selected = true;
			return;
		}
	}
};

SingleSelect.prototype.getSelected= function() {
	return this.node.selectedIndex;
};

SingleSelect.prototype.getValue= function() {
	return this.node.options[this.node.selectedIndex].value;
};
SingleSelect.prototype.setValue= function( v ) {
	this.select(v);
};