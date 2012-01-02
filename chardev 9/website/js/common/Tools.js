var Tools = {
	windowSize : function() {
		if(typeof window.innerWidth != 'undefined') 
	    { 
	        return [window.innerWidth,window.innerHeight];
	    } 

        var obj = (window.document.compatMode && window.document.compatMode == "CSS1Compat") ? window.document.documentElement : window.document.body; 
        return [parseInt(obj.clientWidth,10),parseInt(obj.clientHeight,10)];    
	}
};
/**
 * 
 * @param {number} number
 * @returns {number}
 */
Tools.toUnsigned = function( number )
{
	if( number < 0 )
	{
		number = ~number + 1;
	}
	return number;
};

Tools.escapeQuote = function( str )
{
	return ( "" + str ).replace(/\\/ig,'\\\\').replace(/\'/ig,'\\\'').replace(/"/ig,'\"');
};

Tools.clearBoth = function( node ) {
	var div = document.createElement("div");
	div.style.clear = "both";
	node.appendChild(div);
};

Tools.removeChilds = function(el)
{
	if(!el)
	{
		return;
	}
	while(el.firstChild)
	{
		el.removeChild(el.firstChild);
	}
};

Tools.addChilds = function(parent, childs) {
	var i;
	if(!parent)
	{
		return;
	}
	for( i=0;i<childs.length;i++ ) {
		if( childs[i] ) {
			parent.appendChild(childs[i]);
		}
	}
};

Tools.setColoredStat = function( compareNode, node, compareStat, stat, precision)
{
	var flooredCompareStat = Tools.floor(compareStat,precision);
	var flooredStat = Tools.floor(stat,precision);
	
	if (flooredCompareStat == flooredStat) {
		Tools.removeChilds(compareNode);
	}
	else {
		DOM.set(node, document.createTextNode("["+flooredCompareStat+"]"));
		if (flooredCompareStat > flooredStat) {
			compareNode.className = CSS_COMPARE_GREEN_CLASS;
		}
		else {
			compareNode.className = CSS_COMPARE_RED_CLASS;
		}
	}
	DOM.set(node, document.createTextNode(flooredStat));
};

Tools.floor = function(value,precision){
	if(precision){
		return Math.floor( Math.pow(10,precision) * value ) / Math.pow(10,precision);
	}
	return Math.floor(value);
};

Tools.ceil = function(value,precision){
	if(precision){
		return Math.ceil( Math.pow(10,precision) * value ) / Math.pow(10,precision);
	}
	return Math.ceil(value);
};

///**
// * @param {string} _td1
// * @param {string} _td2
// * @returns {string}
// */
//Tools.addTr = function(_td1,_td2)
//{
//	if( _td1 && _td2 ) {
//		return "<tr><td vAlign='bottom'>"+_td1+"</td><td vAlign='bottom' style='white-space:nowrap; padding-left:50px' align='right'>"+_td2+"</td></tr>";
//	}
//	if( _td1 ) {
//		return "<tr><td colspan='2'>"+_td1+"</td></tr>";
//	}
//	if( _td2 ) {
//		return "<tr><td colspan='2'>"+_td2+"</td></tr>";
//	}
//	return "";
//};

Tools.addTr1 = function( html ) {
	return "<tr><td colspan='2'>"+html+"</td></tr>";
};

Tools.addTr2 = function( htmlLeft, htmlRight ) {
	return "<tr><td vAlign='bottom'>"+htmlLeft+"</td><td vAlign='bottom' style='white-space:nowrap; padding-left:50px' align='right'>"+htmlRight+"</td></tr>";
};

Tools.echo = function(str)
{
	document.body.appendChild(document.createTextNode(str));
	document.body.appendChild(document.createElement("br"));
};

var TOOLS_OUTLINE_POS = [
	{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:0,y:-1},{x:0,y:1},{x:1,y:-1},{x:1,y:0},{x:1,y:1},
	{x:0,y:0}
];

Tools.outline = function(str) {
	var d = [], p = document.createElement("div"); 
	for( var i=0; i<9; i++ ) {
		d[i] = document.createElement("div");
		d[i].innerHTML = str;
		d[i].style.position = 'absolute';
		d[i].style.textAlign = 'right';
		d[i].style.width = '24px';
		d[i].style.top = TOOLS_OUTLINE_POS[i].y+"px";
		d[i].style.left = TOOLS_OUTLINE_POS[i].x+"px";
		d[i].style.zIndex = i;
		p.appendChild(d[i]);
		
		switch( i ) {
		case 8:
			d[i].style.color = "#FFFFFF";
			break;
		default:
			d[i].style.color = "#000000";
			break;
		}
	}
	p.style.position = 'relative';
	p.style.height = '17px';
	p.style.marginTop = '6px';
	p.style.fontSize = '12px';
	return p;
};

/**
* @param {Element} node
* @param {Object} obj
*/
Tools.jsCssClassHandler = function( node, obj ) {
	if( !obj["default"] ) {
		throw "Default css class missing!";
	}
	node.className = obj["default"];
	node.focussed = false;
	if( obj["focus"] ) {
		node.onfocus = /** @this {Element} */function(){ this.focussed = true; this.className = obj["default"] + " " + obj["focus"]; };
	}
	node.onblur = /** @this {Element} */function(){ this.focussed = false; this.className = obj["default"]; };
	if( obj["hover"] ) {
		
		if( obj["focusHover"] ) {
			node.onmouseover = /** @this {Element} */function(){ 
				if( this.focussed) { 
					this.className = obj["default"] + " " + obj["focusHover"]; 
				}
				else {
					this.className = obj["default"] + " " + obj["hover"]; 
				}
			};
			node.onmouseout = /** @this {Element} */function(){ 
				if( this.focussed && obj["focus"]) { 
					this.className = obj["default"] + " " + obj["focus"]; 
				}
				else {
					this.className = obj["default"]; 
				}
			};
		}
		else {
			node.onmouseover = /** @this {Element} */function(){ this.className = obj["default"] + " " + obj["hover"]; };
			node.onmouseout = /** @this {Element} */function(){ 
				if( this.focussed && obj["focus"]) { 
					this.className = obj["default"] + " " + obj["focus"]; 
				}
				else {
					this.className = obj["default"]; 
				}
			};
		}
	}
};

/**
 * @param {Error} e
 */
Tools.rethrow = function( e ) {
	if( e.stack ) {
		throw e.stack;
	}
	throw e;
};

Tools.fixSize = function(node, size) {
	node.style.width = node.firstChild.offsetWidth + "px";
	if( node.offsetWidth > size )
	{
		node.style.whiteSpace = "normal";
		node.style.width = size+"px";
		if( node.firstChild.offsetWidth > size )
		{
			node.style.width = node.firstChild.offsetWidth + "px";
		}
	}
};
/**
 * @param {string} str
 */
Tools.removeDots = function( str ) {
	if( ! str ) return str;
	return str.replace( /\./, " " );
};

window["g_removeDots"] = Tools.removeDots;