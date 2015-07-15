/**
 * @constructor
 * @param {SocketInterface} socketInterface
 * @param {CharacterGuiAdapter} adapter
 */
function SocketInterfaceController( socketInterface, adapter ) {

	this.socketInterface = socketInterface;
	this.adapter = adapter;
	
	this.gemList = new ItemList();
	
	this.gemList.addObserver(new GenericObserver([
			 'show_tooltip', 'move_tooltip', 'hide_tooltip',
			 'update', 'click'
	], new Handler( this.gemListHandler, this )));
	
	this.socketInterface.addObserver(new GenericObserver([
			 'socket_used_gem','socket_left_click', 'socket_right_click', 
			 'used_gem_tooltip_show', 'used_gem_tooltip_hide'
	], new Handler( this.socketInterfaceHandler, this )));
	
	this.socketInterface.setListGui(this.gemList.gui.node); 
	this.gemList.gui.show(true);
}

SocketInterfaceController.prototype = {
		socket: -1,
		gemList: null,
		socketInterface: null,
		adapter: null,
		/**
		 * @param {GenericEvent} e
		 */
		socketInterfaceHandler: function( e ) {
			var cc = this.adapter.character;
			var itm;
			
			if( e.is('socket_left_click') ) {
				itm = cc.getEquippedItem( this.adapter.slot, 0 );
				
				this.socket = e.get('socket');
				
				if( itm === null ) {
					return;
				}
				
				var ic = 3, iscm = GameInfo.getMatchingGemSubClasses( itm.socketColors[this.socket]);
				
				this.gemList.setItemConstraints(0,ic,iscm);
				
				this.gemList.filterMgr.hideFilter('usablebyclass', true);
				this.gemList.filterMgr.hideFilter('issocketablegem', true);
				this.gemList.filterMgr.hideFilter('gemreqitemlvl', true);
				this.gemList.filterMgr.hideFilter('class', true);
				
				this.gemList.set( 
					(cc.chrClass !== null ? 'usablebyclass.eq.'+(1<<(cc.chrClass.id-1))+';' : '') +
					"issocketablegem.eq.1;class.eq.3;subclass.ba."+iscm+";" + 
					"gemreqitemlvl.le."+itm.level+";",
					null,
					null,
					1
				);
				
				this.gemList.update();
				
				this.socketInterface.selectSocket(this.socket);
			}
			else if( e.is('socket_right_click') ) {
				cc.removeGem( this.adapter.slot, e.get('socket') );
			}
			else if( e.is('used_gem_tooltip_show') ) {
				cc.setGemPreview( this.adapter.slot, e.get('socket'), ItemCache.get(e.get('gemId')));
			}
			else if( e.is('used_gem_tooltip_hide') ) {
				cc.removeGemPreview();
			}
			else if( e.is('socket_used_gem') ) {
				itm = cc.getEquippedItem( this.adapter.slot, 0 );
				cc.addGem( this.adapter.slot, e.get('socket'), ItemCache.get(e.get('gemId')) );
			}
			else {
				throw new Error("Unhandled event "+e.event);
			}
		},
		/**
		 * @param {GenericEvent} e
		 */
		gemListHandler: function( e ) {
				var cc = this.adapter.character;
				
			if( e.is('show_tooltip') ) {
				Tooltip.showMovable( ItemTooltip.getHtml(e.get('entity'), cc) );
				cc.setGemPreview( this.adapter.slot, this.socket, e.get('entity') );
			}
			else if( e.is('move_tooltip') ) {
				Tooltip.move();
			}
			else if( e.is('hide_tooltip') ) {
				Tooltip.hide();
				this.adapter.character.removeGemPreview();
			}
			else if( e.is('click') ) {
				if( cc && this.adapter.slot !== -1 && cc.getEquippedItem(this.adapter.slot, 0) !== null ) {
					try {
						cc.addGem( this.adapter.slot, this.socket, e.get('entity').clone() );
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
				new ListBackEndProxy("/api/items.php").update(this.gemList);
//					if( this.adapter.slot != -1 ) {
//						this.storedGemFilters[this.adapter.slot] = this.gemList.getArgumentString();
//						//
//						// TODO: propagation of common attributes like quality etc.
//					}
			}
		},
		update: function() {			
			var cc = this.adapter.character;
			var itm = this.adapter.slot === -1 ? null : cc.getEquippedItem(this.adapter.slot, 0);
			
			if( this.adapter.slot !== this.socketInterface.slot ) {
				this.socketInterface.selectSocket(-1);
			}
			
			this.socketInterface.update( 
				itm === null ? null : new EquippedItem( cc, itm, this.adapter.slot),
				this._getUsedGems()
			);
		},
		_getUsedGems: function() {
			var used = {};
			var itm, gem;
			var cc = this.adapter.character;
			
			for( var i=0; i<Inventory.SLOTS; i++ ) {
				itm = cc.getEquippedItem(i, 0);
				if( itm === null ) {
					continue;
				}
				for( var j=0; j<3; j++ ) {
					gem = itm.gems[j];
					if( gem ) {
						used[gem.id] = new SocketedGem( cc, gem, j);
					}
				}
			}
			return used;
		}
};