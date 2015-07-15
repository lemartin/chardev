/**
 * @constructor
 * @param linkNames
 * @param cssClass
 * @param handler
 * @param scope
 */
function Menu( linkNames, cssClass, handler, scope ) {
	var div = document.createElement("div");
	
	this.node = document.createElement("div");
	this.node.className = cssClass + "_sel";
	
	this.cssClass = cssClass;
	this.links = [];
	for( var i=0; i<linkNames.length; i++) {
		this.links[i] = document.createElement("a");
		this.links[i].className = cssClass + "_i" + i + ( i == 0 ? "_a "+cssClass+"_i_a_base" : " "+cssClass+"_i_base" ) ;
		this.links[i].innerHTML = "<span class='" + cssClass + "_l_f'>" + linkNames[i] + "</span>";
		Listener.add( this.links[i], "click", handler, scope, [i] );
		
		this.node.appendChild(this.links[i]);
	}
	div.className = "clear_both";
	Tools.clearBoth(div);
}

Menu.prototype.cssClass = "";
Menu.prototype.links = null;
Menu.prototype.node = null;
Menu.prototype.selected = 0;

Menu.prototype.select = function ( index ) {
	this.links[this.selected].className = this.cssClass+  "_i" + this.selected + " "+this.cssClass+"_i_base";
	this.links[index].className = this.cssClass + "_i" + index + "_a" + " "+this.cssClass+"_i_a_base";
	this.selected = index;
};