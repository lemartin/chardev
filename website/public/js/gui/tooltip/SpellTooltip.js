
var SpellTooltip = {
	/**
	 * @param {Spell} spell
	 * @param {Character} characterScope
	 * @returns {string}
	 */
	getHtml : function( spell, characterScope )
	{
		spell.setLevel( characterScope != null ? characterScope.level : Character.MAX_LEVEL );
		
		var html = "<table cellpadding = 0 cellspacing = 0 style='vertical-align: top'>";
		var tmp = "", lHtml = '', rHtml = '';
		//
		html+=Tools.addTr1("<span class='tooltip_title'>" + spell.name + "</span>");
		//
		//#########################################################################
		//
		//	ENERGY COST AND RANGE
		//
		//#########################################################################
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//	ENERGY COST
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		lHtml = '';
		if( spell.runecost && spell.power.type == 5)
		{
			if(spell.runecost[0]){
				lHtml += spell.runecost[0]+ " " + locale['Blood'];
			}
			if(spell.runecost[1]){
				lHtml += ( lHtml ? ", " : "" ) + spell.runecost[1]+ " " + locale['Unholy'];
			}
			if(spell.runecost[2]){
				lHtml += ( lHtml ? ", " : "" ) + spell.runecost[2]+ " " + locale['Frost'];
			}
		}
		else if( spell.power )
		{
			tmp = ( spell.power.type == 1 || spell.power.type == 6 ? spell.power.absolute / 10 : spell.power.absolute );
			if ( characterScope != null ) 
			{
				tmp = Math.max(Tools.floor(tmp, 2), Math.floor(spell.power.relative * characterScope.stats.baseMana / 100));
				if( tmp > 0 ) {
					lHtml = tmp + " " + locale['energy2'][spell.power.type];
				}
			}
			else 
			{
				if (tmp > 0) {
					lHtml = tmp + " " + locale['energy2'][spell.power.type];
				}
				else if (spell.power.relative > 0) {
					lHtml = Tools.floor(spell.power.relative, 2) + '% ' + locale['ofBaseMana'];
				}
			}
		}
		lHtml = lHtml ? "<span style='white-space:nowrap'>" + lHtml + "</span>" : ""; 
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		//	RANGE
		//
		//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
		//
		rHtml = "";
		if( spell.ranges != null && spell.ranges[1] > 0 ){
			if( spell.ranges[3] > 0 && ( spell.ranges[1] != spell.ranges[3] || spell.ranges[0] != spell.ranges[2] )) {
				
				rHtml = TextIO.sprintf1( locale['RangeEnemy'], TextIO.rangeToString( spell.ranges[0], spell.ranges[1])) +
						"<br />" +
						TextIO.sprintf1( locale['RangeFriendly'], TextIO.rangeToString( spell.ranges[2], spell.ranges[3]));
			}
			else {
				rHtml = TextIO.rangeToString(spell.ranges[0],spell.ranges[1]);
			}
		}
		if( lHtml && rHtml ) {
			html += Tools.addTr2(lHtml,rHtml);
		}
		else if ( lHtml || rHtml ){
			html += Tools.addTr1( lHtml ? lHtml : rHtml );
		}
		//
		//#########################################################################
		//
		//	COOLDOWN AND CASTTIME
		//
		//#########################################################################
		//
		tmp = spell.shownCooldown;
		//
		rHtml = '';
		if( spell.shownCooldown ) {
			rHtml = TextIO.timeToString( tmp ) + " " + locale['cooldown'];
		}
		
		//TODO Show instant cast, even if there is not CD (e.g. Blessing of ...)
		lHtml = '';
		if( spell.castTime > 0 || rHtml ) {
			lHtml = "<span style='white-space:nowrap'>" + ( spell.castTime > 0 ? TextIO.sprintf1( locale['cast'], Tools.ceil( spell.castTime / 1000 , 2 )) : locale['instantCast']) + "</span>";
		}
		
		if( rHtml ) {
			html += Tools.addTr2(lHtml, rHtml);
		}
		else if ( lHtml ) {
			html += Tools.addTr1(lHtml);
		}
		//
		//	desc
		//
		html += Tools.addTr1("<span class='tooltip_spell_description'>"+spell.getDescription(characterScope).join("<br />")+"</span>");
		return html + "</table>";
	}
};