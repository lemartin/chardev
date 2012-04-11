/**
 * @constructor
 * @param {Object} categories
 */
function ListGui( categories ) {
	
	if( ! categories ) {
		return null;
	}
	
	this.eventMgr = new GenericSubject();
//	([
//		'search', 'remove_custom_filter', 'add_custom_filter', 
//		'next_page', 'prev_page', 'change_order', 
//		'show_tooltip', 'hide_tooltip', 'move_tooltip', 'click'
//	]);
	
	this.eventMgr.registerEvent( 'search', []);
	this.eventMgr.registerEvent( 'remove_custom_filter', ['customFilter']);
	this.eventMgr.registerEvent( 'add_custom_filter', ['variable', 'customFilter']);
	this.eventMgr.registerEvent( 'next_page', []);
	this.eventMgr.registerEvent( 'prev_page', []);
	this.eventMgr.registerEvent( 'change_order', ['order']);
	this.eventMgr.registerEvent( 'hide_tooltip', []);
	this.eventMgr.registerEvent( 'move_tooltip', []);
	this.eventMgr.registerEvent( 'show_tooltip', ['entity']);
	this.eventMgr.registerEvent( 'click', ['entity']);
	
	this.categories = categories;
	//
	//	Layout
	//
	this.node = document.createElement("div");
	this.node.className = 'li_p';
	
	this.filterCollapsable = new Collapsable();
	
	this.filterParent = document.createElement("div");
	this.filterParent.className = 'li_filter_p';	
	
	this.node.appendChild(this.filterParent);
	
	this.filterCollapsable.header.className = 'li_fc_header';
	this.filterCollapsable.content.className = 'li_fc_content';
	
	this.filterCollapsable.header.innerHTML = "<a href='javascript:'>Filter</a>";
	this.filterParent.appendChild(this.filterCollapsable.node);
	
	this.content = document.createElement("div");
	this.content.className = 'li_content';
	
	this.node.appendChild(this.content);
	
	//
	//	Filter
	//
	
	this.form = document.createElement("form");
	this.form.action = "javascript:";
	this.form.onsubmit = "return false";
	this.filterCollapsable.content.appendChild( this.form );
	
	this.customFilterParent = document.createElement("div");
	
	this.filterBtn = document.createElement("input");
	this.filterBtn.type = "submit";
	this.filterBtn.value = locale['F_Search'];
	
	Tools.jsCssClassHandler( this.filterBtn, { 'default': "button button_light li_filter_search_btn", 'focus': "button_light_focus", 'hover': "button_light_hover"});
	
	Listener.add( this.form, "submit", this.eventMgr.fire, this.eventMgr, ['search',{}] );
	
	this.addFilterBtn = document.createElement("input");
	this.addFilterBtn.type = "button";
	this.addFilterBtn.value = locale['F_AddFilter'];
	
	Tools.jsCssClassHandler( this.addFilterBtn, { 'default': "button button_light li_filter_add_btn", 'focus': "button_light_focus", 'hover': "button_light_hover"});

	Listener.add( this.addFilterBtn, "click", this.newCustomFilter, this, [null] );
	
	this.__initLayout();
	
	//
	//
	//	Pages
	//
	//
	
	this.pageGrid = new StaticGrid(1,3);
	
	this.pageGrid.node.width = "100%";
	this.pageGrid.cols[0].width = "33%";
	this.pageGrid.cols[1].width = "34%";
	this.pageGrid.cols[2].width = "33%";
	
	this.pagePrev = document.createElement("a");
	this.pagePrev.style.display = "none";
	this.pagePrev.href = "javascript:";
	
	Tools.jsCssClassHandler( this.pagePrev, { 'default': "button button_light li_prev_page", 'focus': "button_light_focus", 'hover': "button_light_hover"});
	
	Listener.add(this.pagePrev,"click",this.eventMgr.fire,this.eventMgr,['prev_page', {}]);
	
	this.pageCurr = document.createElement("div");
	this.pageCurr.className = "li_curr_page";
	
	this.pageNext = document.createElement("a");
	this.pageNext.style.display = "none";
	this.pageNext.href = "javascript:";
	
	Tools.jsCssClassHandler( this.pageNext, { 'default': "button button_light li_next_page", 'focus': "button_light_focus", 'hover': "button_light_hover"});
	
	Listener.add(this.pageNext,"click",this.eventMgr.fire,this.eventMgr,['next_page', {}]);
	
	this.pageGrid.cells[0][0].appendChild(this.pagePrev);
	this.pageGrid.cells[0][1].appendChild(this.pageCurr);
	this.pageGrid.cells[0][2].appendChild(this.pageNext);
	this.pageGrid.node.className = "li_page_p";
	
	this.node.appendChild( this.pageGrid.node );
}

ListGui.prototype = {
	eventMgr: null,
	categories: {},
	node: null, content: null, filterParent: null, filterCollapsable: null, filterBtn: null,
	form: null,
	customFilterParent: null, addFilterBtn: null,
	inputGrid: null, layoutGrid: null, pageGrid: null, pageCurr: null, pageNext: null, pagePrev: null,
	customFilterOptions: null,
	currentOrderDirection: null, 
	currentOrder: null,
	activeFilter: {},
	staticFilter: {},
	setProperty: function( property, value ) {
		throw new NotImplementedException("ListGui","setProperty");
	},
	updateFilter: function( staticFilters, customFilters, customFilterOptions ) {
		
		this.__initLayout();
		
		for( var k in staticFilters ) {
			this.newStaticFilter(staticFilters[k]);
		}
		for( k in customFilters ) {
			this.newCustomFilter(customFilters[k]);
		}
		this.customFilterOptions = customFilterOptions;
	},
	__initLayout: function() {
		this.inputGrid = new StaticGrid( 0, 2 );
		this.layoutGrid = new StaticGrid( 1, 1 );
		this.layoutGrid.setVerticalAlign(StaticGrid.VALIGN_TOP);
		
		this.inputGrid.node.cellSpacing = "2px";
		this.inputGrid.node.className = 'group_t2 li_filter_input_grid li_filter_grp';
		this.inputGrid.hide();
		this.layoutGrid.cells[0][0].appendChild( this.inputGrid.node );
		
		var div = document.createElement("div");
		div.className = "group_t2 li_filter_grp";
		div.appendChild( this.customFilterParent);
		div.appendChild( this.addFilterBtn );
		
		Tools.removeChilds(this.form);
		this.form.appendChild( this.layoutGrid.node );
		this.form.appendChild( div );
		this.form.appendChild( this.filterBtn );
		
		Tools.removeChilds(this.customFilterParent);
	},
	setStaticFilter: function( staticFilter ) {
		if( staticFilter ) {
			for( var k in staticFilter ) {
				this.staticFilter[staticFilter[k]] = true;
			}
		}
	},
	addObserver: function( observer ) {
		this.eventMgr.addObserver(observer);
	},
	addPropagator: function( event, subject ) {
		this.eventMgr.addPropagator( event, subject);
	},
	addSelect: function( filter, slot ) {
		while( slot + 1 >= this.layoutGrid.cols.length ) {
			this.layoutGrid.addCol();
		}

		var div = document.createElement("div");
		var node = document.createElement("div");
		
		div.innerHTML = filter.name;
		div.className = "li_filter_lg_label";
		DOM.set(node, div);
		node.appendChild(filter.node);
		node.className = "group_t2 li_filter_grp li_filter_select";
		
		this.layoutGrid.cells[0][slot+1].appendChild(node);
	},
	addInput: function( filter, slot ) {
		while( slot >= this.inputGrid.rows.length ) {
			this.inputGrid.addRow();
		}
		
		var row = this.inputGrid.cells[slot];

		row[0].innerHTML = filter.name;
		row[0].className = "li_filter_ig_label";
		DOM.set(row[1],filter.node);
		row[1].className = "li_filter_ig_input";
		this.inputGrid.show();
	},
	newStaticFilter: function( filter ) {
		throw new NotImplementedException("ListGui", "newStaticFilter");
	},
	newCustomFilter: function( filter ) {
		var cf = new CustomFilter( this );
		if( filter != null ) {
			cf.setFilter(filter);
		}
		this.customFilterParent.appendChild(cf.node);
	},
	
	showLoading: function() {
		this.content.innerHTML = "<div class='li_loading'>"+locale['L_Loading']+"</div>";
		this.disableSearchBtn(true);
		this.pageGrid.node.style.display = "none";
	},
	disableSearchBtn: function( b ) {
		this.filterBtn.disabled = b ? "disabled" : "";
	},
	setContent: function( node ) {
		if( node == null ) {
			this.content.innerHTML = "<div class='il_nothing'>Nothing Found</div>";
		}
		else {
			DOM.set(this.content, node);
		}
		this.disableSearchBtn(false);
		this.pageNext.disabled = "";
		this.pagePrev.disabled = "";
	},
	showFilter: function( b ) {
		if( b ) {
			this.filterCollapsable.expand();
		}
		else {
			this.filterCollapsable.collapse();
		}
	},
	updatePages: function( page, maxPage ) {
		
		if( maxPage == 0 ) {
			this.pageGrid.node.style.dispaly = "none";
			return;
		}
		
		if( maxPage > page ) {
			this.pageNext.innerHTML = locale['next']+" &rsaquo;";
			this.pageNext.style.display = "";
		}
		else {
			this.pageNext.style.display = "none";
		}
		if ( page > 1 ) {
			this.pagePrev.innerHTML = "&lsaquo; "+locale['previous'];
			this.pagePrev.style.display = "";
		}
		else {
			this.pagePrev.style.display = "none";
		}
		this.pageCurr.innerHTML = TextIO.sprintf( locale['L_PageOf'] , [ page , maxPage ] );
		this.pageGrid.node.style.display = "table";
	},
	show: function( b ) {
		if( b ) {
			this.node.style.display = "block";
		}
		else {
			this.node.style.display = "none";
		}
	},
	deserialize: function( data ) {
		throw new NotImplementedException("ListGui", "deserialize");
	},
	setOrder: function( currentOrder, currentOrderDirection ) {
		this.currentOrder = currentOrder;
		this.currentOrderDirection = currentOrderDirection;
	},
	getSortLink: function( title, order ) {
		var a = document.createElement("a");
		a.innerHTML = title + ( order == this.currentOrder ? ( this.currentOrderDirection == List.ORDER_DESC ? ' ▼' : ' ▲') : "" );
		a.className = 'li_sort_link'+( order == this.currentOrder ? ' li_sort_link_active' : '' );
		a.href = "javascript:";
		Listener.add(a, 'click', this.eventMgr.fire, this.eventMgr, ['change_order',{ 'order': order}]);
		return a;
	}
};

/**
 * @constructor
 * @param {ListGui} parentGui
 */
function CustomFilter( parentGui ){
	this.parentGui = parentGui;
	
	var sg = new StaticGrid(1,3); sg.node.className = "group_t3 fi_cf_table";
	var none = document.createElement("option"); none.innerHTML = ""; none.value = "";
	var rm = document.createElement("a"); rm.className = "remove fi_cf_remove"; rm.href="javascript:";
	
	this.node = document.createElement("div");
	
	this.select = document.createElement("select");
	this.select.className = "single_select";
	
	this.filterParent = document.createElement("div");
	
	this.select.appendChild(none);
	
	for( var k in this.parentGui.categories ) {
		this.__createGroup( k, this.parentGui.categories[k]);
	}
	
//	this.__createGroup(locale['F_Stats'], ["str","agi","sta","int","spi"]);
//	this.__createGroup(locale['F_Ratings'], ["hit","crit","res","haste","mast"]);
//	this.__createGroup(locale['F_Defense'], ["dod","par","blo"]);
//	this.__createGroup(locale['F_Melee'], ["ap"]);
//	this.__createGroup(locale['F_Spell'], ["sp"]);
//	this.__createGroup(locale['F_Requirements'], ["usablebyclass","reqrepu","canbeusedwithlvl"]);
//	this.__createGroup(locale['F_Miscellaneous'], ["issocketablegem","gemreqitemlvl"]);
	
	sg.cells[0][0].appendChild( this.select );
	sg.cells[0][1].appendChild( this.filterParent );
	sg.cells[0][2].appendChild( rm );
	this.node.appendChild(sg.node);
	
	Listener.add(this.select, "change", this.onChange, this, []);
	
	Listener.add(rm, "click", this.onRemove, this, []);
}

CustomFilter.prototype = {
	node: null, 
	select: null, 
	filterParent: null, 
	/** @type {AbstractFilter} **/
	filter: null,
	parentGui: null,
	onChange: function() {
		var i = this.select.selectedIndex; 
		if( i <= 0 || this.filter != null ) {
			this.parentGui.eventMgr.fire( 'remove_custom_filter', {'filter':this.filter});
			this.filterParent.innerHTML = "";
			this.filter = null;
		}
		
		if( i > 0 ) {
			this.parentGui.eventMgr.fire( 'add_custom_filter', {'variable': this.select.options[i].value, 'customFilter': this} );
		}
	},
	onRemove: function() {

		if( this.filter != null ) {
			this.parentGui.eventMgr.fire( 'remove_custom_filter', {'filter':this.filter});
		}
		
		this.node.parentNode.removeChild( this.node );
	},
	/**
	 * @param {AbstractFilter} filter
	 */
	setFilter: function( filter ) {
		this.filter = filter;
		this.filterParent.appendChild( filter.node );
		
		var os = this.select.options;
		for( var i=0; i<this.select.options.length; i++ ) {
			if( os[i].value == filter.variable ) {
				os[i].selected = "selected";
				break;
			}
		}
	},
	__createGroup: function( label, variables ) {
		var ds = [], d = null;
		
		for( var i=0; i<variables.length; i++ ) {
			d = this.parentGui.customFilterOptions[variables[i]];
			if( d != null ) {
				ds.push(d);
			}
		}
		if( ds.length > 0 ) {
			
			if( label == 'none' ) {
				for( i=0; i<ds.length; i++ ) {
					this.__createOpt( ds[i], this.select );
				}
			}
			else {
				var g = document.createElement( "optgroup" );
				g.label = label;
				
				for( i=0; i<ds.length; i++ ) {
					this.__createOpt( ds[i], g );
				}
				this.select.appendChild(g);
			}
		}
	},
	__createOpt: function( data, node ) {
		var o = document.createElement( "option" );
		o.innerHTML = data.name;
		o.value = data.variable;
		node.appendChild(o);
	}
};