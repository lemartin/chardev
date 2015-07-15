/**
 * @constructor
 * @param {CharacterGuiAdapter} adapter
 */
function ItemTabController( adapter ) {
	this.adapter = adapter;

	this.storedFilters = new StoredFilters();
	this.itemList = new ItemList();
	
	this.itemList.addObserver(new GenericObserver([
			'show_tooltip', 'move_tooltip', 'hide_tooltip',
			'update', 'click'
	], new Handler( this.itemListHandler, this)));

	this.itemList.gui.show( false );
	this.itemList.gui.propagateParent.style.display = "block";
}

ItemTabController.prototype = {
		storedFilters: null,
		itemList: null,
		adapter: null,
		/**
		 * @param {GenericEvent} e
		 */
		itemListHandler: function( e ){
			var cc = this.adapter.character;
			
			if( e.is('show_tooltip') ) {
				Tooltip.showMovable( ItemTooltip.getHtml(e.get('entity'), cc) );
				cc.setItemPreview( this.adapter.slot, e.get('entity') );
			}
			else if( e.is('move_tooltip') ) {
				Tooltip.move();
			}
			else if( e.is('hide_tooltip') ) {
				Tooltip.hide();
				cc.removeItemPreview();
			}
			else if( e.is('click') ) {
				if( cc && this.adapter.slot != -1 ) {
					try {
						cc.addItem( this.adapter.slot, e.get('entity').clone() );
					}
					catch( ex ) {
						if( ex instanceof InvalidItemException ) {
							Tooltip.showError(ex);
						}
						else {
							Tools.rethrow(ex);
						}
					}
				}
			}
			else if( e.is('update') ) {
				new ListBackEndProxy("/api/items.php").update(this.itemList);
				if( this.adapter.slot != -1 ) {

					var args = this.itemList.getArgumentString(); 

					this.storedFilters.propagate('name',args);
					this.storedFilters.propagate('quality',args);
					this.storedFilters.propagate('level',args);
					this.storedFilters.propagate('reqlvl',args);
					
					if( Dom.getValue(this.itemList.gui.propagateCheckbox)) {
						var cs = this.itemList.filterMgr.customFilters;
						for( var k in cs) {
							this.storedFilters.propagate(cs[k].variable, cs[k].getArgumentString());
						}
					}
					
					this.storedFilters.set( this.adapter.slot, args);
				}
			}
		},
		update: function() {
			
			if( this.adapter.slot === -1 ) {
				this.itemList.gui.show( false );
				return;
			}
			
			var slot = this.adapter.slot;
			var cc = this.adapter.character;
			var args =  this.storedFilters.get(slot);
			
			var sl = cc.chardevSlotToBlizzardSlotMask(slot);
			var icl = cc.chardevSlotToItemClass(slot);
			
			this.itemList.setItemConstraints( sl, icl[0], icl[1] );
			
			this.itemList.filterMgr.hideFilter('usablebyclass', true);
			this.itemList.filterMgr.hideFilter('issocketablegem', true);
			this.itemList.filterMgr.hideFilter('canbeusedwithlvl', true);
			this.itemList.filterMgr.hideFilter('class', true);
			this.itemList.filterMgr.hideFilter('gemreqitemlvl', true);
			this.itemList.setWeaponSlot( cc.isWeaponSlot( slot ) );
			
			if( slot==17 ) {
				this.itemList.filterMgr.hideFilter('slot', false);
			}
			else {
				this.itemList.filterMgr.hideFilter('slot', true);
			}

			if( slot==1 || slot == 12 || slot == 13 || slot == 14 || slot == 6 || slot == 5) {
				this.itemList.filterMgr.hideFilter('subclass', true);
			}
			else {
				this.itemList.filterMgr.hideFilter('subclass', false);
			}
		
			args = args.replace(/\bclass\.\w+\.[^;]*;/,"") + (icl[0] >= 0 ? "class.eq."+icl[0]+";" : "");
			args = args.replace(/\bslot\.\w+\.[^;]*;/,"") + (sl > 0 ? "slot.ba."+sl+";" : "");
			args = args.replace(/\bsubclass\.\w+\.[^;]*;/,"") + (icl[1] > 0 ? "subclass.ba."+icl[1]+";" : "");
			args = args.replace(/\bcanbeusedwithlvl\.\w+\.[^;]*;/,"") +"canbeusedwithlvl.eq."+cc.level+";";
			
			//
			//TODO store filters
			this.itemList.set( args, null, null, 1);
			
			this.itemList.update();
			
			this.itemList.gui.show( true );
		},
		replaceArgument: function( variable, replace ) {
			this.itemList.replaceArgument(variable, replace);
			this.storedFilters.replaceArgument(variable, replace);
		},
		getListGui: function() {
			return this.itemList.gui;
		}
};