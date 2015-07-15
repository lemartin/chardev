/**
 * @constructor
 */
function TooltipImpl() {
	this.errorNode = document.createElement("div");
	this.errorNode.className = 'tt_msg_c';
}
var TT_MAX_SIZE = 350;
var TT_PADDING = 10;
TooltipImpl.prototype = {
	//
	//
	//	
	/** @type {Element} **/
	div: null,
	/** @type {Element} **/
	content: null,
	/** @type {Element} **/
	overlay: null,
	/** @type {Element} **/
	wrapper: null,
	disabled: false,
	errorShown: false,
	/** @type {Element} **/
	errorNode: null,
	x: 0, y: 0,
	__layoutGrid: null,
	hideTooltip: false,
	hidable: false,
	//
	//
	//
	setHidable: function(b) {
		this.hidable = b;
	},
	setParent: function( node ) {
		this.content = document.createElement("div");
		this.div = document.createElement("div");
		this.div.className = "tooltip_div";
		this.div.style.display = "none";
		
		var sg = new StaticGrid(3,3);
		sg.cells[0][0].innerHTML = "<div class='tt_bg_lt'></div>";
		sg.cells[0][1].className = 'tt_bg_t';
		sg.cells[0][2].innerHTML = "<div class='tt_bg_rt'></div>";
		sg.cells[1][0].className = 'tt_bg_l';
		sg.cells[1][1].appendChild(this.content); this.content.className = 'tt_bg';
		sg.cells[1][2].className = 'tt_bg_r';
		sg.cells[2][0].innerHTML = "<div class='tt_bg_lb'></div>";
		sg.cells[2][1].className = 'tt_bg_b';
		sg.cells[2][2].innerHTML = "<div class='tt_bg_rb'></div>";

		this.__layoutGrid = sg;
		
		this.div.appendChild(sg.node);
		node.appendChild(this.div);
	},
	__showTooltip: function( html ) {
		this.div.style.width = "";
		this.div.style.whiteSpace = "nowrap";
		this.content.innerHTML = html;
		this.div.style.display = "block";
		
		if( this.__layoutGrid.node.offsetWidth > TT_MAX_SIZE ) {
			this.__setTooltipSize(TT_MAX_SIZE);
		}
		else {
			this.div.style.width = this.__layoutGrid.node.offsetWidth + "px";
		}
	},
	__setTooltipSize: function( size ) {
		this.div.style.whiteSpace = "normal";
		this.div.style.width = size+"px";
		if( this.div.firstChild.offsetWidth > size ) {
			this.div.style.width = this.div.firstChild.offsetWidth + "px";
		}
	},
	__improvePosition: function(x,y) {
		var s = Tools.windowSize();
		var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		if (this.div) 
		{
			if ((y + this.div.offsetHeight + 24) > s[1] + st ) 
				y = s[1] + st - this.div.offsetHeight - 24;
			if ((x + this.div.offsetWidth) > (document.body.scrollLeft + document.body.offsetWidth)) 
				x -= this.div.offsetWidth + 20;
		}
		return [Math.max(0,x),Math.max(0,y)];
	},
	__getPosition: function(oElement){
		var x=0;
		var y=0;
		var w=oElement.offsetWidth;
		var h=oElement.offsetHeight;
		while( oElement != null ) {
			y += oElement.offsetTop;
			x += oElement.offsetLeft;
			oElement = oElement.offsetParent;
		}
		return [x,y,w,h];
	},
	__center: function( node ) {
		var hNode = node.scrollHeight;
		var wNode = node.scrollWidth;
		var lBody = document.body.scrollLeft;
		var tBody = document.body.scrollTop;
		
		node.style.marginLeft = Math.max(0, lBody + ($(window).width()/2 - wNode/2)) + "px";
		node.style.marginTop = Math.max(0, tBody + ($(window).height()/3 - hNode/2)) + "px";
	},
	__disable: function() {
		
		if( this.overlay == null ) {
			this.overlay = document.getElementById("tt_overlay");
			this.wrapper = document.getElementById("tt_wrapper");
		}
		var s = this.wrapper.style;
		s.overflow = "hidden";
		s.height = $(window).height() + "px";
		s.width = $(window).width() + "px";
		
		s = this.overlay.style; 
		s.height = $(window).height() + "px";
		s.width = $(window).width() + "px";
		s.display = "block";
		
		this.disabled = true;
		this.overlay.onclick = null;
	},
	move: function() {
		var y = this.y + 10;
		var x = this.x + 10;
		var pos = this.__improvePosition(x,y);
		if ( this.div ) 
		{
			this.div.style.left = pos[0] + "px";
			this.div.style.top = pos[1] + "px";
		}
	},
	handleMove: function(ev){
		if (!ev){
			ev = window.event;
		}
		if((document.all)&&document.getElementById){
			this.x = ev.clientX+document.documentElement.scrollLeft;
			this.y = ev.clientY+document.documentElement.scrollTop;
		}
		else{
			this.x = ev.pageX;
			this.y = ev.pageY;
		}
	},
	handleKeyDown: function( event ) {
		if( this.disabled ) {
			if( event.keyCode == 27 ) {
				this.enable();
			}
			else if ( event.keyCode == 13 ) {
				event.preventDefault();
				this.enable();
			}
		}
		if( event.keyCode == 17 ) {
			this.hideTooltip = true;
		}
	},
	handleKeyUp: function( event ) {
		if( event.keyCode == 17 ) {
			this.hideTooltip = false;
		}
	},
	//
	//
	//
	//
	//
	initialise: function() {
		Listener.add( document,"mousemove",Tooltip.handleMove, Tooltip, null );
		Listener.add( document,"keydown",Tooltip.handleKeyDown, Tooltip, null );
		Listener.add( document,"keyup",Tooltip.handleKeyUp, Tooltip, null );
		Listener.add( window,"resize",function() {
			if( this.disabled ) {
				this.__disable();
				if( this.overlay.firstChild ) {
					this.__center(this.overlay.firstChild);
				}
			}
		}, Tooltip, null );
		
		this.setParent(document.body);
	},
	showSlot: function(html,caller) {	
		
		if( this.hideTooltip && this.hidable ) {
			this.hideTooltip = false;
			return;
		}
		
		var pos = this.__getPosition(caller);
		this.__showTooltip(html);		
		pos = this.__improvePosition(pos[0] + pos[2] + 10,pos[1]);
		this.div.style.left = pos[0] + "px";
		this.div.style.top = pos[1]+"px";
	},
	hide: function(){
		if( this.div != null ){
			this.div.style.display = "none";
		}
	},
	showDisabled: function( node ) {
		this.__disable();
		Dom.set( this.overlay, node);
		this.__center(node);
	},
	showHtmlDisabled: function(html) {
		html += "<br /><span class=\"tt_close_notice\">Left click or hit escape to continue.</span>";
		this.showDisabled(Dom.createAt(Dom.create('div',{'class':'tt_msg_c'}), 'div', { 'text':html, 'class': 'tt_msg' }));
		this.overlay.onclick = function(){Tooltip.enable();};
	},
	enable: function() {
		if( this.overlay ) {
			Dom.truncate(this.overlay);
			this.overlay.style.display = "none";
			this.wrapper.style.width = "";
			this.wrapper.style.heigh = "";
			this.wrapper.style.overflow = "";
		}
		this.disabled = false;
		this.errorShown = false;
	},
	showError: function( str ) {
		
		if((str instanceof Error) || (str instanceof GenericAjaxException)) {
			str = str.message;
		}

		var e = "<div class=\"tt_error_msg\">" +
					"<div class=\"tt_error_msg_title\">Error:</div>";
		if(typeof str === 'object') { 
			for( var k in str ) {
				e += "<div class=\"tt_error_msg_content\">"+str[k]+"</div>";
			}
			e += "</div>";
		}
		else {
			e += "<div class=\"tt_error_msg_content\">"+str+"</div>";
		}
		e += "</div>";
		
		if( this.errorShown ) {
			this.errorNode.innerHTML = e + "<br />" + this.errorNode.innerHTML;
		}
		else {
			this.errorShown = true;
			this.errorNode.innerHTML = e + "<br /><span class=\"tt_close_notice\">Left click or hit escape to continue.</span>";
		}
		
		this.showDisabled(this.errorNode);
		this.overlay.onclick = function(){Tooltip.enable();};
	},
	showLoading: function() {
		var n = document.createElement("div");
		n.className = 'tt_loading';
		n.innerHTML = "Loading";
		this.showDisabled(n);
	},
	showStat: function( html, node ) {
		this.__showTooltip(html+"</table>");
		var pos = this.__getPosition(node);
		this.div.style.left = (pos[0] + pos[2]) + "px";
		this.div.style.top = pos[1] + "px";
		
		if( this.div.offsetWidth > 300 ) {
			this.__setTooltipSize(300);
		}
	},
	showTalent: function( html, tree, row, col, node ) {
		var pos = this.__getPosition(node);
		
		this.__showTooltip(html);
		
		this.__setTooltipSize(250);
		
		if (tree == 1 && col > 1 || tree == 2 ) {
			this.div.style.left = (pos[0] - this.div.offsetWidth - 10) + "px";
		}
		else {
			this.div.style.left = (pos[0] + pos[2] + 10) + "px";
		}
		if (row > 5) {
			this.div.style.top = (pos[1] + pos[3] - this.div.offsetHeight )+"px";
		}
		else {
			this.div.style.top = (pos[1])+"px";
		}
	},
	showMovable: function( html ) {
		
		if( this.hideTooltip && this.hidable ) {
			this.hideTooltip = false;
			return;
		}
		
		this.__showTooltip(html);
		this.move();
	},
	show: function( html ) {
		
		if( this.hideTooltip && this.hidable ) {
			this.hideTooltip = false;
			return;
		}
		
		this.__showTooltip(html);
	}
};
var Tooltip = new TooltipImpl(); Tooltip.setHidable(true);

if( ! window["Tooltip"]) {
	window["Tooltip"] = {
		"initialise": Tooltip.initialise
	};
}