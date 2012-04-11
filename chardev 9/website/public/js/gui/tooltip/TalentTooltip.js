var TalentTooltip = {
	/**
	 * 
	 * @param {Talents} talents
	 * @param {number} tree
	 * @param {number} row
	 * @param {number} col
	 * @param {Character} characterScope
	 * @returns {string}
	 */
	getHTML: function( talents, tree, row, col, characterScope ) {
		var talent = talents.talents[tree][row][col];
		var talentSpell = talent.getSpell();
		var nextTalentSpell = talent.getNextSpell();
		var args = [];
		var html = "<table cellpadding='0px' cellspacing='0px'>";
		
		if (talentSpell != null) 
		{
			html += Tools.addTr1("<span class='tooltip_talent_name'>" + talentSpell.name + "</span>");
			html += Tools.addTr1("<span class='tooltip_talent_rank'>" + locale['Rank'] + " " + talent.spent + "/" + talent.ranks  + "</span>");
			html += Tools.addTr1( SpellTooltip.getHTML(talentSpell,characterScope,1,[]));
			if (nextTalentSpell != null) 
			{
				html += Tools.addTr1("<div class='tooltip_talent_next_rank'>" + locale['Nextrank'] + "</div>");
			}
		}
		else 
		{
			html += Tools.addTr2(
				"<span class='tooltip_talent_name'>" + nextTalentSpell.name + "</span>", 
				"<span class='tooltip_talent_rank'>" + locale['Rank'] + " " + talent.spent + "/" + talent.ranks + "</span>"
			);
		}
		if (nextTalentSpell != null) 
		{
			for( var i=0; i<TALENT_REQ_ID_COUNT; i++ ) {
				var reqTalent = talent.requiredTalents[i];
				if( !reqTalent ) {
					continue;
				}
				if( reqTalent.spent != reqTalent.ranks ) {
					if( reqTalent.ranks > 1 ) {
						args[args.length] = TextIO.sprintf(locale['requires_points_in'],[reqTalent.ranks,reqTalent.getName()]);
					}
					else {
						args[args.length] = TextIO.sprintf1(locale['requires_point_in'],reqTalent.getName());
					}
				}
			}
			//
			//FIXME: UGLY UGLY UGLY
			//FIXME: Pet 
			var ppt = talents.pointsPerTier;
			if( talents.treeSpents[talent.tree] < talent.row * ppt )
			{
				args[args.length] = TextIO.sprintf(locale['requires_points_in_tree'], [ talent.row * ppt, talents.treeNames[talent.tree]]);
			}
			html += SpellTooltip.getHTML(nextTalentSpell,characterScope,1,[]);
		}
		html += "</table>";

		return html;
	}
};