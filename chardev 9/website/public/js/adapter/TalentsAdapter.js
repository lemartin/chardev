/**
 * @constructor
 * @param {Talents} talents
 * @param {TalentsGui} talentsGui
 * @param {Character} characterScope
 */
function TalentsAdapter( talents, talentsGui, characterScope ) {
	var tHandler = new Handler(function( e ){
		if( e.is('talent_tree_selected') ) {
			talentsGui.selectTree(e.get('tree'));
		}
		else if( e.is('talent_tree_reset') ) {
			talentsGui.update();
		}
		else if( e.is('talents_reset') ) {
			talentsGui.selectTree(talents.selectedTree);
			talentsGui.update();
		}
		else if( e.is('talent_point_added') ) {
			talentsGui.update();
		}
		else if( e.is('talent_point_removed') ) {
			talentsGui.update();
		}
		else if( e.is('talent_distribution_set') ) {
			talentsGui.update();
		}
		else {
			throw new Error("Unhandled event "+e.event);
		}
	},this);
	var tObserver = new GenericObserver(['talent_tree_selected','talents_reset','talent_tree_reset','talent_point_added','talent_point_removed','talent_distribution_set'], tHandler);
	talents.addObserver(tObserver);
	
	var gHandler = new Handler(function( e ){
		if( e.is('select_talent_tree') ) {
			talents.selectTree(e.get('tree'));
		}
		else if( e.is('reset_talent_tree') ) {
			talents.resetTree(e.get('tree'));
		}
		else if( e.is('reset_talents') ) {
			talents.reset();
		}
		else if( e.is('add_talent_point') ) {
			talents.addPoint(e.get('tree'), e.get('row'), e.get('col'));
		}
		else if( e.is('remove_talent_point') ) {
			talents.removePoint(e.get('tree'), e.get('row'), e.get('col'));
		}
		else if( e.is('show_tooltip') ) {
			var row = e.get('row'), col = e.get('col'), tree = e.get('tree');
			Tooltip.showTalent( TalentTooltip.getHTML(talents, tree, row, col, null), tree, row, col, e.get('node'));
		}
		else {
			throw new Error("Unhandled event "+e.event);
		}
	},this);
	var gObserver = new GenericObserver(['select_talent_tree', 'reset_talent_tree', 'reset_talents','show_tooltip','add_talent_point', 'remove_talent_point'], gHandler);
	talentsGui.addObserver(gObserver);

	talentsGui.init( new TalentsFacade(talents, characterScope) );
}
TalentsAdapter.prototype = {
		
};