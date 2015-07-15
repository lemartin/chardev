/**
 * @constructor
 * @param {CharacterGuiAdapter} adapter
 */
function SetTabController( adapter ) {
	this.adapter = adapter;
	
	this.setList = new SetList();
	
	this.setList.filterMgr.hideFilter('usablebyclass', true);
	this.setList.gui.showFilter(true);
	this.setList.updateFilter();
	
	this.setList.addObserver(new GenericObserver([ 'show_tooltip', 'move_tooltip', 'hide_tooltip', 'update', 'click', 'itemset_click'], new Handler( function( e ){
		var cc;
		if( e.is('show_tooltip') ) {
			cc = this.adapter.character;
			Tooltip.showMovable( ItemTooltip.getHtml(e.get('entity'), cc) );
			cc.setItemPreview( this.slot, e.get('entity') );
		}
		else if( e.is('move_tooltip') ) {
			Tooltip.move();
		}
		else if( e.is('hide_tooltip') ) {
			Tooltip.hide();
			this.adapter.character.removeItemPreview();
		}
		else if( e.is('click') ) {
			cc = this.adapter.character;
			if( cc ) {
				this.equipSetItem(e.get('entity'));
			}
		}
		else if( e.is('itemset_click')) {
			var items = e.get('items');
			for( var i=0; i<items.length; i++) {
				this.equipSetItem(items[i]);
			}
		}
		else if( e.is('update') ) {
			new ListBackEndProxy("/api/sets.php").update(this.setList);
		}
	}, this)));
}

SetTabController.prototype = {
		adapter: null,
		setList: null,
		/**
		 * @param {string} variable
		 * @param {string} replace
		 */
		replaceArgument: function( variable, replace ) {
			this.setList.replaceArgument(variable, replace);
		},
		update: function() {
			this.setList.update();
		},
		/**
		 * @param {Item} itm
		 */
		equipSetItem: function( itm ) {
			var cc = this.adapter.character; 
			try {
				var tmp = itm.clone();
				var slot = g_inventoryToSlot[tmp.inventorySlot];
				if( ! slot && slot !== 0 ) {
					throw new Error("Unable to add " + tmp.name);
				}
				else if( slot == 12 && cc.inventory.get(12) != null && cc.inventory.get(13) == null ) { 
					slot = 13;
				}
				else if( slot == 14 && cc.inventory.get(14) != null && cc.inventory.get(15) == null ) { 
					slot = 15;
				}
				
				cc.addItem( slot, tmp );
			}
			catch( ex ) {
				if( ex instanceof InvalidItemException ) {
					Tooltip.showError(ex);
				}
				else {
					Tools.rethrow(ex);
				}
			}
		},
		getListGui: function() {
			return this.setList.gui;
		}
};