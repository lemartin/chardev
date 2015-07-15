/**
 * @constructor
 * @param {ReforgeInterface} reforgeInterface
 * @param {CharacterGuiAdapter}adapter
 */
function ReforgeInterfaceController( reforgeInterface, adapter) {
	this.reforgeInterface = reforgeInterface;
	this.adapter = adapter;
	
	this.reforgeInterface.eventMgr.addObserver(new GenericObserver([
			'wowreforge_export', 'reforge', 'restore', 
			'remove_reforge_preview', 'reforge_preview', 
			'reforge_all', 'restore_all', 'reforge_item_preview', 
			'remove_reforge_item_preview'
	], new Handler( this.reforgeInterfaceHandler, this )));
}

ReforgeInterfaceController.prototype = {
		reforgeInterface: null,
		adapter: null,
		/**
		 * @param {GenericEvent} e
		 */
		reforgeInterfaceHandler: function( e ) {
			var cc = this.adapter.character;
			if( e.is('reforge') ) {
				cc.reforgeItem(this.adapter.slot, e.get('reduce'), e.get('add'));
			}
			else if( e.is('restore') ) {
				cc.restoreItem(this.adapter.slot);
			}
			else if( e.is('reforge_item_preview') ) {
				cc.setReforgeItemPreview(this.adapter.slot, e.get('reduce'), e.get('add'));
			}
			else if( e.is('remove_reforge_item_preview') ) {
				cc.removeReforgeItemPreview();
			}
			else if( e.is('reforge_preview') ) {
				cc.setReforgePreview(e.get('reforge_array'));
			}
			else if( e.is('remove_reforge_preview') ) {
				cc.removeReforgePreview();
			}
			else if( e.is('restore_all') ) {
				cc.restoreAll();
			}
			else if( e.is('reforge_all') ) {
				cc.reforgeAll(e.get('reforge_array'));
			}
			else if( e.is('wowreforge_export') ) {
				var profile = cc.toBattleNetProfile();
				var metaData = "{\"BasedOn\" : null,\"CanUpdate\" : false,\"Data\" : null,\"Origin\" : \"chardev.org\",\"SourceLink\" : null}";
				var form = document.createElement("form");
				form.method = "POST";
				form.action = "http://wowreforge.com/Profiles/Import";
				form.name = "wowreforge_export";
				form.target = "_blank";
				form.id = "wowreforge_export";
				form.style.display = "none";
				
				Dom.createAt( form, 'input', {'type': 'hidden', 'name': 'profile', 'value': profile});
				Dom.createAt( form, 'input', {'type': 'hidden', 'name': 'metadata', 'value': metaData});
				
				document.body.appendChild(form);
				
				Dom.get("wowreforge_export").submit();
				
				document.body.removeChild(form);
			}
		},
		update: function() {
			var cc = this.adapter.character;
			var itm = null;
			if( this.adapter.slot != -1 ) {
				itm = cc.getEquippedItem(this.adapter.slot, 0);
			}
			this.reforgeInterface.update(itm == null ? null : new EquippedItem(cc, itm, this.adapter.slot));
		}
};