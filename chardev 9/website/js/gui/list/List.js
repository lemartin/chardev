/**
 * @constructor
 * @param {ListGui} gui
 * @param {Object} filterData
 * @param {Object} staticVariables
 * @param {string} order
 */
function List(  gui, filterData, staticVariables, order ) {
	
	if( ! gui ) {
		return null;
	}
	
	this.eventMgr = new GenericSubject();
	this.eventMgr.registerEvent('update', ['list']);
	this.eventMgr.registerEvent('show_tooltip', ['entity']);
	this.eventMgr.registerEvent('click', ['entity']);
	this.eventMgr.registerEvent('move_tooltip', []);
	this.eventMgr.registerEvent('hide_tooltip', []);
	
	this.filterMgr = new FilterManager(); 
	this.gui = gui;
	
	this.order = order;
	
	//
	// necessary for inheritance prototype constructor 
	// ( e.g. ItemList.prototype = new List )
	
	var guiHandler = new Handler(function( e ) {
		if( e.is('search') ) {
			this.update();
		}
		else if( e.is('next_page') ) {
			this.nextPage();
		}
		else if( e.is('prev_page') ) {
			this.prevPage();
		}
		else if( e.is('change_order') ) {
			this.setOrder(e.get('order'));
		}
		else if( e.is('add_custom_filter') ) {
			this.addCustomFilter(e.get('variable'), e.get('customFilter'));
		}
		else if( e.is('remove_custom_filter') ) {
			this.removeCustomFilter(e.get('filter'));
		}
	}, this);
	
	var guiObserver = new GenericObserver([
		'search', 'next_page', 'prev_page', 'change_order', 'add_custom_filter', 'remove_custom_filter'
	], guiHandler);
	
	gui.addObserver(guiObserver);

	gui.addPropagator( 'show_tooltip', this.eventMgr );
	gui.addPropagator( 'hide_tooltip', this.eventMgr );
	gui.addPropagator( 'move_tooltip', this.eventMgr );
	gui.addPropagator( 'click', this.eventMgr );

	this.filterMgr.set( 
			filterData, 
			staticVariables 
	);
	this.set("", "", "", 1);
}

List.ORDER_DESC = 0;
List.ORDER_ASC = 1;

List.toPlainFilterData = function( categorisedFilterData ) {
	var ds = [];
	for( var k in categorisedFilterData ) {
		//
		// filter data
		for( var i in categorisedFilterData[k] ) {
			ds[categorisedFilterData[k][i].variable] = categorisedFilterData[k][i];
		}
	}
	return ds;
};

List.toCategories = function( categorisedFilterData ) {
	var cs = new Object();
	for( var k in categorisedFilterData ) {
		cs[k] = [];
		for( var i in categorisedFilterData[k] ) {
			cs[k].push( categorisedFilterData[k][i].variable );
		}
	}
	return cs;
};

List.getSlotOptions= function() {
	var options = {}, i;
	for( i = 1; i <= 28; i++ ) {
		options[i] = i == 14 ? locale['F_ShieldHand'] : locale['a_slot'][i];
	}
	return options;
},
List.getItemClassOptions= function() {
	var options = {}, i;
	for( i = 0; i < ITEM_CLASSES.length; i++ ) {
		options[i] = ITEM_CLASSES[i][0];
	}
	return options;
},
List.getItemSubClassOptions= function() {
	var options = {}, i, j;
	for( j=0; j < ITEM_CLASSES.length; j++ ) {
		for( i = 0; i < ITEM_CLASSES[j][1].length; i++ ) {
			options[j+"."+i] = ITEM_CLASSES[j][1][i];
		}
	}
	return options;
};

List.prototype = {
	eventMgr: null,
	page: 1, maxPage: 0, 
	filterMgr: null, 
	gui: null,
	order: "", orderDirection: List.ORDER_DESC,
	addObserver: function( observer ) {
		this.eventMgr.addObserver( observer);
	},
	setMaxPage: function( maxPage ) {
		this.maxPage = maxPage;
		this.gui.updatePages( this.page, this.maxPage);
	},
	nextPage: function() {
		this.__setPage( this.page + 1 );
		this.__update();
	},
	prevPage: function() {
		this.__setPage( this.page - 1 );
		this.__update();
	},
	__setPage: function( page ) {
		if( page < 0 || page > this.maxPage ) {
			return;
		}
		
		this.page = page;
		
		this.gui.updatePages( this.page, this.maxPage);
	},
	update: function() {
		this.__setPage(1);
		this.__update();
	},
	setOrder: function( order ) {
		if( this.order == order ) {
			this.orderDirection = this.orderDirection == List.ORDER_DESC ? List.ORDER_ASC : List.ORDER_DESC;
		}
		else {
			this.order = order;
		}
		this.__update();
	},
	__update: function() {
		this.eventMgr.fire('update', { 'list': this });
		
		this.gui.showLoading();
	},
	getArgumentString: function()  {
		return this.filterMgr.getArgumentString();
	},
	set: function( args, flags, order, page ) {
		
		this.page = page;
		
		this.gui.updatePages(this.page, this.maxPage);
		
		this.gui.setOrder(this.order, this.orderDirection);
		
		this.filterMgr.setArgumentString(args);
		
		this.gui.updateFilter( 
			this.filterMgr.getStaticFilters(), 
			this.filterMgr.getCustomFilters(), 
			this.filterMgr.getCustomFilterOptions() 
		);

//		this.gui.updateFilter( this.filterMgr );
	},
	/**
	 * @param variable
	 * @param {CustomFilter} cf
	 */
	addCustomFilter: function( variable, cf ) {
		cf.setFilter( this.filterMgr.getCustomFilter(variable) );
	},
	removeCustomFilter: function( filter ) {
		this.filterMgr.removeCustomFilter(filter);
	},
	setData: function( data ) {
		
		this.gui.setOrder(this.order, this.orderDirection);
		
		if( data.length < 2 ) {
			this.gui.setContent(null);
			this.setMaxPage(0);
		}
		else {
			this.setMaxPage( Math.ceil( data[0][0]/data[0][1] ) );
			this.gui.deserialize( data );
		}
	},
	replaceArgument: function( variable, replace ) {
		var tmp = this.filterMgr.getArgumentString(); 
		tmp = tmp.replace(new RegExp("\b"+variable+"\\.\\w+\\.[^;]+;"),"") + replace ;
		this.filterMgr.setArgumentString(tmp);
	}
};