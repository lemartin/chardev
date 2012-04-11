/**
 * @constructor
 * @returns {Overlay}
 */
function Overlay() {}
/** @type {Element} */
Overlay.prototype._overlay = null;
Overlay.prototype._disabled = false;
Overlay.prototype._errorShown = false;
Overlay.prototype._errorNode = null;

Overlay.prototype.disable = function() {
	if( this._overlay == null ) {
		this._overlay = document.createElement("div");
		this._overlay.className = 'overlay';
		document.getElementById("tt_overlay_w").appendChild(this._overlay);
	}
	var size = Tools.windowSize();
	this._overlay.style.width = Math.max( size[0], document.body.scrollWidth) + "px";
	this._overlay.style.height = Math.max( size[1], document.body.scrollHeight) + "px";
	this._overlay.style.display = "block";
	this._disabled = true;
	this._overlay.onclick = null;
};

Overlay.prototype.enable = function() {
	Tools.removeChilds(this._overlay);
	this._overlay.style.display = "none";
	this._disabled = false;
	this._errorShown = false;
};

Overlay.prototype.center = function( node ) {
	var hNode = node.scrollHeight;
	var wNode = node.scrollWidth;
	var size = Tools.windowSize();
	var lBody = document.body.scrollLeft;
	var tBody = document.body.scrollTop;
	
	if( hNode > size[1] ) {
		node.style.height = size[1] + "px";
		node.style.width = wNode*size[1]/hNode + "px";
	}
	if( wNode > size[0] ) {
		node.style.width = size[0] + "px";
		node.style.height = hNode*size[0]/wNode + "px";
	}

	node.style.marginLeft = ( lBody + ((size[0] - wNode) >> 1) ) + "px";
	node.style.marginTop = ( tBody + ((size[1] - hNode ) >> 1) ) + "px";
};

Overlay.prototype.showDisabled = function( node ) {
	this.disable();
	DOM.set(this._overlay,node);
	this.center(node);
};