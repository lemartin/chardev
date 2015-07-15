/**
 * @constructor
 * @param {SpecialisationInterface} specialisationInterface
 * @param {CharacterGuiAdapter} adapter
 */
function SpecialisationInterfaceController( specialisationInterface, adapter ) {
	this.specialisationInterface = specialisationInterface;
	this.adapter = adapter;
	
	this.adapter.character.addObserver(new GenericObserver([
        "class_change", "specialisation_change"
    ], new Handler( this._characterHandler, this)));
	
	this.specialisationInterface.addObserver(new GenericObserver([
        "click"
    ], new Handler( this._interfaceHandler, this)));
}

SpecialisationInterfaceController.prototype = {
		specialisationInterface: null,
		adapter: null,
		/**
		 * @param {GenericEvent} e
		 */
		_characterHandler: function( e ) {
			if( e.is("class_change")) {
				var cl = e.get("class");
				var facades = null;
				if( cl ) {
					facades = [];
					for( var i=0; i<cl.specs.length; i++ ) {
						facades.push(new SpecialisationFacade(cl.specs[i], this.adapter.character));
					}
				}
				this.specialisationInterface.update(facades);
			}
			else if( e.is("specialisation_change")) {
				this.specialisationInterface.select(e.get("index"));
			}
		},
		/**
		 * @param {GenericEvent} e
		 */
		_interfaceHandler: function( e ) {
			if( e.is("click")) {
				this.adapter.character.setSpecialisation(e.get("index"));
			}
		}
};
