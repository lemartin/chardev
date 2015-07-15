/** 
 * @constructor
 * @param {EnchantInterface} enchantInterface
 * @param {CharacterGuiAdapter} adapter
 */
function EnchantInterfaceController( enchantInterface, adapter ) {
	this.enchantInterface = enchantInterface;
	this.adapter = adapter;
	
	this.enchantList = new SpellList();
	
	this.enchantInterface.eventMgr.addObserver(new GenericObserver([
			'change'
	], new Handler( this.enchantInterfaceHandler, this )));
	
	this.enchantList.addObserver(new GenericObserver([
            'show_tooltip', 'move_tooltip', 'hide_tooltip',
            'update', 'click'
    ], new Handler( this.enchantListHandler, this)));
	
	this.enchantInterface.setListGui(this.enchantList.gui.node); 
}

EnchantInterfaceController.prototype = {
		enchantInterface: null,
		adapter: null,
		enchantList: null,
		/**
		 * @param {GenericEvent} e
		 */
		enchantInterfaceHandler: function( e ) {
			if( e.is('change') ) {
				var cc = this.adapter.character;
				cc.setItemRandomEnchantment( this.adapter.slot, e.get('randomEnchantmentId') );
			}
			else {
				throw new Error("Unhandled event "+e.event);
			}
		},
		/**
		 * @param {GenericEvent} e
		 */
		enchantListHandler: function( e ){
			var cc = this.adapter.character;
			if( e.is('show_tooltip') ) {
				Tooltip.showMovable( SpellTooltip.getHtml(e.get('entity'), cc));
				cc.setEnchantPreview( this.adapter.slot, e.get('entity'));
			}
			else if( e.is('move_tooltip') ) {
				Tooltip.move();
			}
			else if( e.is('hide_tooltip') ) {
				Tooltip.hide();
				cc.removeEnchantPreview();
			}
			else if( e.is('click') ) {
				if( cc && this.adapter.slot != -1 && cc.getEquippedItem(this.adapter.slot, 0) != null ) {
					cc.addEnchant( this.adapter.slot, e.get('entity').effects[0].secondaryEffect );
				}
			}
			else if( e.is('update') ) {
				new ListBackEndProxy("/api/spells.php").update(this.enchantList);
//				if( this.slot != -1 ) {
//					this.storedGemFilters[this.slot] = this.gemList.getArgumentString();
//					//
//					// TODO: propagation of common attributes like quality etc.
//				}
			}
		},
		update: function() {
			
			this.enchantList.gui.show( false );
			
			if( this.adapter.slot == -1 ) {
				return;
			}
			
			var cc = this.adapter.character;
			var itm = cc.getEquippedItem(this.adapter.slot, 0);
			
			this.enchantInterface.update(itm == null ? null : new EquippedItem(cc, itm, this.adapter.slot));
			
			if( itm == null ) {
				return;
			}
			
			//TODO update enchant list
			this.enchantList.filterMgr.hideFilter('isenchant', true);
			this.enchantList.filterMgr.hideFilter('itemclasssubclasscombined', true);
			this.enchantList.filterMgr.hideFilter('slot', true);
			this.enchantList.filterMgr.hideFilter('enchantitemlevel', true);
			this.enchantList.filterMgr.hideFilter('enchantchrlevel', true);
			
			
			var args = "isenchant.eq.1;" +
				"itemclasssubclasscombined.eq."+itm.itemClass+"."+itm.itemSubClass+";" +
				"slot.ba."+(1<<itm.inventorySlot)+";" +
				"enchantitemlevel.le."+itm.level+";" +
				"enchantchrlevel.le."+cc.level+";";

			this.enchantList.set( args, null, null, 1);
			
			this.enchantList.update();
			
			this.enchantList.gui.show( true );
		}
};