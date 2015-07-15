/**
 * @constructor
 * @param size
 */
function StackedDiv( size ) {
	this.items = [];
	this.node = document.createElement("div");
	for( var i = 0; i < size; i++ ) {
		this.items[i] = document.createElement("div");
		this.items[i].style.display = ( i == 0 ? "block" : "none" );
		this.items[i].style.width = "100%";
		this.items[i].style.height = "100%";
		this.node.appendChild(this.items[i]);
	}
	this.shown = 0;
}

StackedDiv.prototype = { 
	/** @type{Array} **/
	items: null, 
	/** @type{Element} **/
	node: null, 
	/** @type{number} **/
	shown: 0, 
	/** @type{Handler} **/
	onChangeHandler: null,
	
	show: function( index ) {
		if( index == this.shown ) {
			return;
		}
		var old = this.shown;
		this.items[index].style.display = "block";
		this.items[old].style.display = "none";
		this.shown = index;
		if( this.onChangeHandler ) {
			this.onChangeHandler.notify([index,old]);
		}
	},
	
	setOnChangeHandler: function(handler, scope){
		this.onChangeHandler = new Handler(handler, scope);
	}
};