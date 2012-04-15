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