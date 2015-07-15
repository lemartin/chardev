/**
 * @constructor
 * @param {ImportInterface} importInterface
 * @param {CharacterGuiAdapter} adapter
 */
function ImportInterfaceController( importInterface, adapter ) {
	this.importInterface = importInterface;
	this.adapter = adapter;
	
	this.importInterface.addObserver(new GenericObserver(["import"], new Handler(this.importInterfaceHandler, this)));
}

ImportInterfaceController.prototype = {
		importInterface: null,
		adapter: null,
		/**
		 * @param {GenericEvent} e
		 */
		importInterfaceHandler: function( e ) {
			if( e.is("import")) {
				try {
					CharacterIO.readFromArmory(e.get("name"), e.get("realm"), e.get("region"), new Handler(function( character, exception ) {
						if ( exception != null ) {
							Tooltip.showError(exception);
						}
						else {
							this.adapter.character.load(character);
							
							//TODO unwind!
							this.adapter.gui.folder.show(Gui.TAB_CHARACTER_SHEET);
							
							Tooltip.enable();
						}
					}, this ));

					Tooltip.showLoading();
				}
				catch( ex ) {
					Tooltip.showError(ex);
				}
			}
		},
		/**
		 * @param {Array} storedImports
		 */
		setStoredImports: function( storedImports ) {
			this.importInterface.setStoredImports( storedImports );
		},
		setRegion: function( region ) {
			this.importInterface.setRegion(region);
		}
};