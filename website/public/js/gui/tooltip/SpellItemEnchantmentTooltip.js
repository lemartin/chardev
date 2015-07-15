var SpellItemEnchantmentTooltip = {
	/**
	 * @param {SpellItemEnchantment} enchant
	 * @param {Character} characterScope
	 * @returns {string}
	 */
	getHtml : function( enchant, characterScope )
	{
		var html = "<table cellpadding = 0 cellspacing = 0>";
		
		var arr = SpellItemEnchantmentTooltip.getArr(enchant, characterScope);

        for( var k in arr ) {
            html +=  Tools.addTr1(arr[k]);
        }

		return html + "</table>";
	},

    /**
     * @param {SpellItemEnchantment} enchant
     * @param {Character} characterScope
     * @returns {Array}
     */
    getArr: function( enchant, characterScope ) {
        var arr = [];

        var fitsLevelReqs = enchant.fitsLevelRequirements(characterScope);
        var fitsSkillReqs = enchant.fitsSkillLineRequirements(characterScope);
        var fitsGemConditions = enchant.isGemActive(characterScope);
        var desc;

        if( enchant.types[0] == 7 ) {
            desc = locale["use"]+": " + enchant.spells[0].getDescription(characterScope).join("<br />");
        }
        else {
            desc = enchant.getDescription();
        }


        arr.push("<span "+( fitsSkillReqs && fitsLevelReqs ? ( fitsGemConditions ? "" : "class='grey'" ):"class='red'")+">"+desc + "</span>");

        if( !fitsLevelReqs ) {
            arr.push(
                "<span class='red'>" +
                    TextIO.sprintf1(locale['reqLevel'],enchant.requiredCharacterLevel)+
                    "</span>");
        }

        if( !fitsSkillReqs ) {
            arr.push(
                "<span class='red'>" +
                    locale['req']+" "+enchant.requiredSkillLine.name+" ("+enchant.requiredSkillLineLevel+")"+
                    "</span>");
        }

        return arr;
    }
};