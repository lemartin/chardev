/**
 * @constructor
 * @param {BuffInterface} buffInterface
 * @param {CharacterGuiAdapter} adapter
 */
function BuffInterfaceController ( buffInterface, adapter ) {
	this.buffInterface = buffInterface;
	this.adapter = adapter;
	
	this.buffInterface.eventMgr.addObserver(new GenericObserver(['add_buff'], new Handler( this.buffInterfaceHandler, this)));
}

BuffInterfaceController.prototype = {
		buffInterface: null,
		adapter: null,
		initialised: false,
		
		update: function() {
			var cc = this.adapter.character;
			
			if( ! this.initialised ) {
				Buffs.getAvailableBuffs(new Handler(function(buffs, exception){
					if( exception != null ) {
						Tooltip.showError(exception);
						return;
					} 
					else {
						this.buffInterface.initialise( buffs );
					}
				},this), cc);
				
				this.initialised = true;
			}
			//
			// Available buffs from items (Procs, Use) 
			var h,i,j,itm, procSpells = [], useSpells = [], s, ps, enchant, se;
			for( i = 0; i < Inventory.SLOTS; i++ ) {
				itm = cc.inventory.get(i);
				if( ! itm ) {
					continue;
				}
				
				for( j = 0; j < itm.spells.length; j++ ) {
					s = itm.spells[j];
					
					if( s == null ) {
						continue;
					}
		
					for( h = 0 ; h < 3; h++ ) {
						se = s.effects[h];
						if( ! se ) {
							continue;
						}
						if( se.effect == 42 ) {
							ps = se.getProcSpell();
							if( ps ) {
								procSpells.push( new SpellFacade( ps, cc ));
							}
						}
					}
					
					if ( s.isAura() ) {
						continue;
					}

                    useSpells.push( new SpellFacade( s, cc ));
				}
				//
				// Engineering enchants
				for( j=0; j<itm.enchants.length; j++ ) {
					enchant = itm.enchants[j];
					
					if( enchant.types[0] == 1 ) {
						procSpells.push( new SpellFacade( enchant.spells[0], cc ));
					}
				}
			}
			//
			//
			var conditionalSpells = [];
			if( cc.chrClass != null && cc.chrClass.conditionalBuffs != null ) {
				var conditionalBuff;
				for( i=0; i<cc.chrClass.conditionalBuffs.length; i++ ) {
					conditionalBuff = cc.chrClass.conditionalBuffs[i];

					if( cc.auras.auraMap[conditionalBuff[1]] ) {
						conditionalSpells.push(AvailableBuff.fromSpell(new Spell(conditionalBuff[0]), cc));
					}
				}
			}

			this.buffInterface.update(useSpells, procSpells, conditionalSpells);
		},
		/**
		 * @param {GenericEvent} e
		 */
		buffInterfaceHandler: function(e) {
			if( e.is('add_buff') ) {
				var id = e.get('id');
				SpellCache.asyncGet( id, new Handler( function( spell ) {
					var cc = this.adapter.character;
					try {
						if( spell.effects[0] && ( spell.effects[0].effect == 23 || spell.effects[0].effect == 42 ) && spell.effects[0].procSpellId > 0 ) {
							cc.addBuff( spell.effects[0].procSpellId );
						}
						else  {
							cc.addBuff( id );
						}
					}
					catch( ex ) {
						Tooltip.showError(ex);
					}
				} ,this));
			}
		}
};