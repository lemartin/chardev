/**
 * @constructor
 * @returns {Collapsable}
 */
function Collapsable() {
	this._node = document.createElement("div");
	this._header = document.createElement("div");
	this._content = document.createElement("div");
	
	this._node.appendChild(this._header);
	this._node.appendChild(this._content);
	
	this._header.onselectstart = function(){return false;};
	this._header.onmousedown = function(){return false;};
	Listener.add(this._header,"click",this.toggle,this,[]);
}

Collapsable.prototype._node = null;
Collapsable.prototype._content = null;
Collapsable.prototype._header = null;
Collapsable.prototype._shown = true;

Collapsable.prototype.collapse = function() {
	this._content.style.display = "none";
	this._shown = false;
};

Collapsable.prototype.expand = function() {
	this._content.style.display = "block";
	this._shown = true;
};

Collapsable.prototype.toggle = function() {
	if( this._shown ) {
		this.collapse();
	}
	else {
		this.expand();
	}
};