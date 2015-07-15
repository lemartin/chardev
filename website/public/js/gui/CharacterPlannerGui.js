/**
 * @constructor
 */
function CharacterPlannerGui() {

	this.characterInterface = new CharacterInterface();
	
	Dom.append(Dom.createAt("planner_parent", 'div', {'class': 'ci_p'}),this.characterInterface.node);
	this.guiParent = Dom.createAt("planner_parent", "div", {});
	
	Dom.addClass("mtf_p", "cp_mm_p ix_center");
}

CharacterPlannerGui.prototype = {
	characterInterface: null,
	guiParent: null,
	/**
	 * @param {Gui} gui
	 */
	setGui: function( gui ) {
		
		if(gui) {
			Dom.set("mtf_p", gui.folder.menu);
			Dom.set(this.guiParent, gui.node);
		}
		else {
			Dom.truncate("mtf_p");
			Dom.truncate(this.guiParent);
		}
	}
};