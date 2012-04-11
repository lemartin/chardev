/**
 * @constructor
 */
function Collapsable() {
	this.node = document.createElement("div");
	this.header = document.createElement("div");
	this.content = document.createElement("div");
	
	this.node.appendChild(this.header);
	this.node.appendChild(this.content);
	
	this.header.onselectstart = function(){return false;};
	this.header.onmousedown = function(){return false;};
	Listener.add(this.header,"click",this.toggle,this,[]);
	
	this.collapse();
}

Collapsable.prototype = {
	node: null, content: null, header: null, shown: null, 
	collapse: function() {
		this.content.style.display = "none";
		this.shown = false;
	},
	expand: function() {
		this.content.style.display = "block";
		this.shown = true;
	},
	toggle: function() {
		if( this.shown ) {
			this.collapse();
		}
		else {
			this.expand();
		}
	}
};