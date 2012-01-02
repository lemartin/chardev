var IL_DESC = 0;
var IL_ASC = 1;

/**
 * @constructor
 * @param defaultOrder
 * @returns {List}
 */
function List( defaultOrder ) {
	this._eventManager = new EventManager([]);
	
	this._node = document.createElement("div");
	this._node.className = "il";
	this._content = document.createElement("div");
	this._content.className = "il_c";

	this._filterCollapsable = new Collapsable();	
	this._filterCollapsable._header.innerHTML = locale['L_Filter'];
	this._filterCollapsable._header.className = "collapse_h if_collapse_h";
	this._filterCollapsable._content.className = "collapse_c if_collapse_c";
	this._filterCollapsable._node.className = "collapse if_collapse";
	this._filterCollapsable._node.style.display = 'none';
	
	this._pageGrid = new StaticGrid(1,3);
	
	this._pageGrid._node.width = "100%";
	this._pageGrid._cols[0].width = "33%";
	this._pageGrid._cols[1].width = "34%";
	this._pageGrid._cols[2].width = "33%";
	
	this._pagePrev = document.createElement("a");
	this._pagePrev.className = "il_page_btn il_prev_page";
	this._pagePrev.style.display = "none";
	Listener.add(this._pagePrev,"click",this.onPagePrev,this,null);
	this._pageCurr = document.createElement("span");
	this._pageCurr.className = "il_curr_page";
	this._pageNext = document.createElement("a");
	this._pageNext.className = "il_page_btn il_next_page";
	this._pageNext.style.display = "none";
	Listener.add(this._pageNext,"click",this.onPageNext,this,null);
	
	this._pageGrid._cells[0][0].appendChild(this._pagePrev);
	this._pageGrid._cells[0][1].appendChild(this._pageCurr);
	this._pageGrid._cells[0][1].className = 'text_align_center';
	this._pageGrid._cells[0][2].appendChild(this._pageNext);
	this._pageGrid._node.className = "il_page_p";
	
	this._additionalContent = document.createElement("div");
	
	this._node.appendChild(this._filterCollapsable._node);
	this._node.appendChild(this._additionalContent);
	this._node.appendChild(this._content);
	this._node.appendChild(this._pageGrid._node);
	
	this._order = defaultOrder;
	
	this._updateHandler = new Handler( this._callback ,this );
}
List.prototype._eventManager = null;
List.prototype._node = null;
List.prototype._content = null;
List.prototype._pageGrid = null;
List.prototype._pagePrev = null;
List.prototype._pageCurr = null;
List.prototype._pageNext = null;
List.prototype._filterCollapsable = null;
List.prototype._orderDirection = IL_ASC;
List.prototype._additionalContent = null;

List.prototype._order = "";
List.prototype._page = 1;
List.prototype._maxPage = 1;

List.prototype._requestedURL = "";

List.prototype._onclickHandler = null;
List.prototype._onUpdate = null;

List.prototype._updateHandler = null;
List.prototype._filter = null;

List.prototype._getSortLink = function( title, order ) {
	var a = document.createElement("a");
	a.innerHTML = title + ( order == this._order ? ( this._orderDirection == IL_DESC ? ' ▼' : ' ▲') : "" );
	a.className = 'il_sort_link'+( order == this._order ? '_active' : '' );
	Listener.add(a, 'click', this._onSetOrder, this, [order]);
	return a;
};

List.prototype._onSetOrder = function( column ) {
	if( column == this._order ) {
		this._orderDirection = this._orderDirection == IL_DESC ? IL_ASC : IL_DESC; 
	}
	this._order = column;
	this.update();
};

List.prototype._callback = function( data, url ) {
	
	if( url == this._requestedURL ) {
	
		this._deserialize(data);
		if( this._onUpdate ) {
			this._onUpdate[0].apply(this._onUpdate[1],[this]);
		}
		this._requestedURL = "";
	}
};

List.prototype.onPageNext = function() {
	this._page = this._page < this._maxPage ? this._page + 1 : this._maxPage;
	this.update();
};

List.prototype.onPagePrev = function() {
	this._page = this._page > 1 ? this._page - 1 : 1;
	this.update();
};

List.prototype.filter = function() {
	this._page = 1;
	this.update();
};

List.prototype.setOnClickHandler = function( handler ) {
	this._onclickHandler = handler;
};

List.prototype.setOnUpdateHandler = function( handler, scope ) {
	this._onUpdate = [handler,scope];
};

List.prototype.updatePages = function( maxPage ) {
	this._maxPage = maxPage;
	if( this._maxPage > this._page ) {
		this._pageNext.innerHTML = locale['next'];
		this._pageNext.style.display = "";
	}
	else {
		this._pageNext.style.display = "none";
	}
	if ( this._page > 1 ) {
		this._pagePrev.innerHTML = locale['previous'];
		this._pagePrev.style.display = "";
	}
	else {
		this._pagePrev.style.display = "none";
	}
	this._pageCurr.innerHTML = TextIO.sprintf( locale['L_PageOf'] , [ this._page , this._maxPage ] );
	this._pageGrid._node.style.display = "table";
};

List.prototype.update = function() {};
List.prototype.set = function(args,flags,order) {};
List.prototype._deserialize = function( serialized ) {};

List.prototype.hide = function() {
	this._node.style.display = "none";
};
List.prototype.show = function() {
	this._node.style.display = "block";
};
List.prototype.hideContent = function() {
	this._content.style.display = "none";
};
List.prototype.showContent = function() {
	this._content.style.display = "block";
};
List.prototype.hidePages = function() {
	this._pageGrid._node.style.display = "none";
};
List.prototype.set = function( args ) {
	this._page = 1;
	this._maxPage = 1;
	this._requestedURL = "";
	
	this._filterCollapsable._node.style.display = 'block';
	this._filter.update( args );
	
	this._pageGrid._node.style.display = "none";
};

List.prototype.showLoading = function(){
	this._node.style.display = "block";
	this._content.style.display = "block";
	this._content.innerHTML = "<div class='li_loading'>"+locale['L_Loading']+"</div>";
	this._pageGrid._node.style.display = "none";
};
List.prototype.addListener = function(event, handler) {
	this._eventManager.addListener(event, handler);
};

List.prototype.getBaseArgumentObject = function() {
	return {
		'a': this._filter.buildArgumentString(),
		'o': this._order+"."+(this._orderDirection==IL_ASC?'asc':'desc')+";",
		'p': this._page
	};
};