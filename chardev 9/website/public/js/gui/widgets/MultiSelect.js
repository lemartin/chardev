/**
 * @constructor
 * @param show
 */
function MultiSelect( show ) {
	var i;
	this.node = document.createElement("select");
	this.node.className = 'multi_select';
	this.node.multiple = "true";
	this.options  = [];
	for( i = 0; i < show.length; i++ ) {
		this.options[i] = document.createElement("option");
		this.options[i].value = show[i][0];
		this.options[i].innerHTML = show[i][1];
		this.node.appendChild(this.options[i]);
	}
}

/**
 * @param obj
 * @returns {MultiSelect}
 */
MultiSelect.fromObject = function( obj ) {
	var show = [];
	var n = 0;
	for( var k in obj ) {
		show[n++] = [k,obj[k]]; 
	}
	return new MultiSelect(show);
};

MultiSelect.prototype.node = null;
MultiSelect.prototype.options = [];

MultiSelect.prototype.select = function( mask ) {
	if( mask == (1<<(this.options.length+1))-1 ) {
		return;
	}
	for( var i = 0; i < this.options.length; i++ ) {
		this.options[i].selected = (mask&1<<parseInt(this.options[i].value,10))!=0;
	}
};

MultiSelect.prototype.getValue = function() {
	var mask = 0, i, v, max_v = 0;
	for( i=0; i<this.options.length; i++ ) {
		v = 1<<parseInt(this.options[i].value,10);
		max_v += v;
		if( this.options[i].selected == true ) {
			mask += v;
		}
	}
	if( mask == 0 ) {
		mask = max_v;
	}
	return mask;
};