/**
 * @constructor
 * @param {Talents} talents
 * @param {TalentsInterface} talentsInterface
 * @param {Character} character
 */
function TalentsAdapter( talents, talentsInterface, character ) {
	
	var facades = [];
	for( var i=0; i<talents.talents.length; i++ ) {
		facades[i] = [];
		for( var j=0; j<talents.talents[i].length; j++ ) {
			facades[i][j] = new TalentFacade(talents.talents[i][j], character); 
		}
	}
	
	talentsInterface.init(Talents.getAvailableTiers( character ? character.level : Character.MAX_LEVEL),facades);
	talentsInterface.setDistribution( talents.id, talents.getDistribution());
	
	talents.addObserver(new GenericObserver(["select","deselect","set_distribution","reset"], new Handler(function(e){
		if( e.is("select")) {
			talentsInterface.select(e.get("row"), e.get("col"));
			talentsInterface.setDistribution( talents.id, talents.getDistribution());
		}
		else if( e.is("deselect")) {
			talentsInterface.deselect(e.get("row"), e.get("col"));
			talentsInterface.setDistribution( talents.id, talents.getDistribution());
		}
		else if( e.is("reset")) {
			talentsInterface.reset();
			talentsInterface.setDistribution( talents.id, talents.getDistribution());
		}
		else if( e.is("set_distribution")) {
			/* do nothing, just accept the event, behaviour follows below */
		}
		talentsInterface.setDistribution( talents.id, talents.getDistribution());
	}, this)));
	
	talentsInterface.addObserver(new GenericObserver(["click"], new Handler(function(e){
		if( e.is("click")) {
			talents.toggle(e.get("row"), e.get("col"));
		}
	}, this)));
}