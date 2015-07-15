/**
 * @constructor
 * 
 * @param {TalentsInterface} talentsInterface
 * @param {CharacterGuiAdapter} characterGuiAdapter
 */
function TalentsInterfaceController( talentsInterface, characterGuiAdapter ) {
	this.talentsInterface = talentsInterface;
	this.characterGuiAdapter = characterGuiAdapter;
	
	this.characterGuiAdapter.character.addObserver(new GenericObserver([
		"talents_select", "talents_deselect", "talents_tiers_change", 
		"talents_reset", "talents_set_distribution", "class_change"
	], new Handler( this.characterHandler, this )));
	
	this.talentsInterface.addObserver(new GenericObserver([
        "click", "reset"
    ], new Handler( this.talentsInterfaceHandler, this )));
}

TalentsInterfaceController.prototype = {
		talentsInterface: null,
		characterGuiAdapter: null,
		/**
		 * @param {GenericEvent} e
		 */
		characterHandler: function( e ) {
			if(e.is("class_change")) {
				var cc = this.characterGuiAdapter.character;
				
				if( cc.chrClass ) {
					this.talentsInterface.init( 
							Talents.getAvailableTiers(cc.level), 
							cc.getTalents());
				}
				else {
					this.talentsInterface.init(0, null);
				}
			}
			else if(e.is("talents_select")) {
				var cc = this.characterGuiAdapter.character;
				this.talentsInterface.select(e.get("row"), e.get("col"));
				this.talentsInterface.setDistribution(cc.chrClass.id, cc.getTalentDistribution());
			}
			else if(e.is("talents_deselect")) {
				var cc = this.characterGuiAdapter.character;
				this.talentsInterface.deselect(e.get("row"), e.get("col"));
				this.talentsInterface.setDistribution(cc.chrClass.id, cc.getTalentDistribution());
			}
			else if(e.is("talents_tiers_change")) {
				var cc = this.characterGuiAdapter.character;
				this.talentsInterface.setAvailableTiers(e.get("tiers"));
				this.talentsInterface.setDistribution(cc.chrClass.id, cc.getTalentDistribution());
			}
			else if(e.is("talents_reset")) {
				this.talentsInterface.reset();
			}
			else if(e.is("talents_set_distribution")) {
				var cc = this.characterGuiAdapter.character;
				this.talentsInterface.setDistribution(cc.chrClass.id, cc.getTalentDistribution());
			}
			else {
				throw new Error("Unhandled event "+e.event);
			}
		},
		/**
		 * @param {GenericEvent} e
		 */
		talentsInterfaceHandler: function( e ) {
			if(e.is("click")) {
				this.characterGuiAdapter.character.toggleTalent(e.get("row"), e.get("col"));
			}
			else if(e.is("reset")) {
				this.characterGuiAdapter.character.resetTalents();
			}
			else {
				throw new Error("Unhandled event "+e.event);
			}
		}
};