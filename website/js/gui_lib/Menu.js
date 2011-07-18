/**
 * @constructor
 * @param linkNames
 * @param cssClass
 * @param handler
 * @param scope
 * @returns {Menu}
 */
function Menu( linkNames, cssClass, handler, scope ) {
	var div = document.createElement("div");
	
	this._node = document.createElement("div");
	this._node.className = cssClass + "_sel";
	
	this._cssClass = cssClass;
	this._links = [];
	for( var i=0; i<linkNames.length; i++) {
		this._links[i] = document.createElement("a");
		this._links[i].className = cssClass + "_i" + i + ( i == 0 ? "_a" : "" );
		this._links[i].innerHTML = "<span class='" + cssClass + "_l_f'>" + linkNames[i] + "</span>";
		Listener.add( this._links[i], "click", handler, scope, [i] );
		
		this._node.appendChild(this._links[i]);
	}
	div.className = "clear_both";
	Tools.clearBoth(div);
}

Menu.prototype._cssClass = "";
Menu.prototype._links = null;
Menu.prototype._node = null;
Menu.prototype._selected = 0;

Menu.prototype.select = function ( index ) {
	this._links[this._selected].className = this._cssClass+  "_i" + this._selected;
	this._links[index].className = this._cssClass + "_i" + index + "_a";
	this._selected = index;
};