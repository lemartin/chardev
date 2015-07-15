var ItemTooltip = {
    /**
     * @private
     * @param {number} id
     * @param {number} value
     * @returns {string}
     */
	_getStatStr: function( id, value ) {
		return "+"+value+" "+locale["ItemStatNames"][id];
	},
    /**
     * @private
     * @param {Character} characterScope
     * @param {number} lvl
     * @param {number} statId
     * @param {number} statValue
     * @returns {string}
     */
    _getExtendedValue: function( characterScope, lvl, statId, statValue ) {
        if( statId <= 11 || statId >= 50 ) {
            if( characterScope && typeof characterScope.stats.statPerCentModifier[statId] !== "undefined" && characterScope.stats.statPerCentModifier[statId] !== 0 ) {
                return "<span class='tt_stat_with_mods'>(" + Math.floor( statValue * ( 1 + characterScope.stats.statPerCentModifier[statId] / 100) ) + ")</span>";
            }
        }
        else {
            var c =0, br = "", rating = statId - 11, v;
            switch( rating  ) {
                case 20:
                    var v1 = Math.floor( statValue/COMBAT_RATINGS[5][lvl-1] * 100 ) / 100;
                    var v2 = Math.floor( statValue/COMBAT_RATINGS[7][lvl-1] * 100 ) / 100;
                    if( v1 != v2 ) {
                        br = (v1 > 0 ? "m:" + TextIO.formatFloat2(v1) + "%" : "" ) + ( v2 > 0 ? ( v1 > 0 ? ", " : "" ) + "s:" + TextIO.formatFloat2(v2) + "%" : "" );
                    }
                    else {
                        br = TextIO.formatFloat2(v1) + "%";
                    }
                    break;
                // Attack Power: Per cent modifier, DpS
                case 27:
                    if( characterScope ) {
                        c = characterScope.stats.apPerCentModifer;
                        v = statValue * ( 1 + c / 100);
                        br = ( c > 0 ? Math.floor( v ) + ", " : "") + TextIO.formatFloat1(v / 14) + " " + locale['dps2'];
                    }
                    break;
                default:
                    if( rating <= 10 ) {
                        c = COMBAT_RATINGS[rating][lvl-1];
                    }
                    else {
                        switch( rating  ) {
                            case 21:
                                c = COMBAT_RATINGS[8][lvl-1];
                                break;
                            case 24:
                                c = COMBAT_RATINGS[15][lvl-1];
                                break;
                            case 25:
                                c = COMBAT_RATINGS[17][lvl-1];
                                break;
                            case 26:
                                c = COMBAT_RATINGS[23][lvl-1];
                                break;
                            case 38:
                                c = COMBAT_RATINGS[25][lvl-1];
                                break;
                            default:
                                br = "";
                        }
                    }
                    v = c > 0 ? Math.floor( statValue/c * 100 ) / 100 : 0;
                    br = v > 0 ? TextIO.formatFloat2(v) + "%" : "";
                    break;
            }

            if( br ) {
                return "<span class='tt_rating_percent'>(" + br + ")</span>";
            }
        }
        return "";
    },
	getHtml : function( itm, character ) {
		return ItemTooltip.__getHtml( itm, character, 0);
	},
	getShortHTML : function( itm, character ) {
		return ItemTooltip.__getHtml( itm, character, ITEM_TT_SHORT);
	},
	/**
	 * @param {Item} itm
	 * @param {Character} character
	 * @param {number} flags
	 * @returns {string}
	 */
	__getHtml : function( itm, character, flags ) {
		var tmp = "";
		var i;
		var html;
		var stats = [];
		var chrLevel;
		var statEnchants = [], useEnchants = [];
		character = character ? character : itm.characterScope;
		//
		//
		//
		chrLevel = character != null ? character.level : Character.MAX_LEVEL;
		//
		itm.setStats( chrLevel );
		//
		//
		//
		for(i=0;i<itm.stats.length;i++){
			if( !itm.stats[i] || itm.stats[i][1] == 0 ) {
				continue;
			}
            var statId = itm.stats[i][0];
            var extended = ItemTooltip._getExtendedValue(character, chrLevel, statId, itm.stats[i][1]);

            if( typeof stats[statId] === "undefined" ) {
                stats[statId] = [];
            }
            stats[statId].push(Tools.addTr1(
                "<div " + ( statId > 11 ? " class=\"green\"" : "" ) + ">"
                    + ItemTooltip._getStatStr( statId, itm.stats[i][1])
                    + (extended ? extended : "")
                    + "</div>"));
		}
		
		if( itm.addedStat > -1 ) {
            var extended = ItemTooltip._getExtendedValue(character, chrLevel, itm.addedStat, itm.addedStatValue);

            if( typeof stats[itm.addedStat] === "undefined" ) {
                stats[itm.addedStat] = [];
            }
            stats[itm.addedStat].push(Tools.addTr1(
                "<div class=\"green\">"
                    + ItemTooltip._getStatStr( itm.addedStat, itm.addedStatValue)
                    + " "
                    + "<span class=\"tt_item_ref_from\">" + TextIO.sprintf1(locale["ReforgedFrom"], locale["ItemStatNames"][itm.reducedStat]) + "</span>"
                    + (extended ? extended : "")
                    + "</div>"));
        }
		for ( i=0; i<itm.enchants.length; i++ ) {
			var e = itm.enchants[i];
			
			tmp = SpellItemEnchantmentTooltip.getArr(e, character);
			if( e.types[0] == 7 && e.spells[0] ) {
				useEnchants[useEnchants.length] = tmp;
			}
			else {
				statEnchants[statEnchants.length] = tmp;
			}
		}
		//
		//
		//
		html = "<table cellpadding='0px' cellspacing='0px' class='tooltip_table tt_item'>";
		
		html += Tools.addTr1("<div class='tooltip_title' style='color:"+g_color[itm.quality]+"; white-space:nowrap;'>"+itm.name+"</div>");
		
		if( itm.typeMask & (1<<3))
		{
			html += Tools.addTr1("<span class='green'>"+locale['Heroic']+"</span>");
		}

        if( itm.nameDescription ) {
            html += Tools.addTr1( "<span style='color: #" + itm.nameDescription[1] + ";'>" + itm.nameDescription[0] + "</span>");
        }

        if(itm.level && ( itm.itemClass == 2 || itm.itemClass == 4 ) ){
            html += Tools.addTr1( "<span class='tt_item_gold'>" + TextIO.sprintf1(locale['itemLevel'],itm.level) + "</span>");
        }

        if( itm.upgrades && itm.upgrades.length > 0 ) {
            html += Tools.addTr1( "<span class='tt_item_gold'>" + TextIO.sprintf(locale['ItemUpgrade']["UpgradeLevel"], [itm.upgradeLevel, itm.upgrades.length]) + "</span>");
        }

        //TODO add upgrade level
		
		if( itm.typeMask & (1<<27) ) {
			html += Tools.addTr1(locale['boa']);
		}
		else {
			switch(itm.binds){
				case 1:
					html += Tools.addTr1(locale['bop']);
					break;
				case 2:
					html += Tools.addTr1(locale['boe']);
					break;
				case 3:
					html += Tools.addTr1(locale['bou']);
					break;
			}
		}
		
		if( itm.unique == 1 ){
			html += Tools.addTr1(locale['Unique']);
		}
		else if( itm.unique > 1 ) {
			html += Tools.addTr1( TextIO.sprintf1(locale['UniqueMultiple'],itm.unique));
		}
		
		if( itm.gemProperties && itm.gemProperties.reqItemLevel ) {
			html += Tools.addTr1( TextIO.sprintf1(locale['RequiresItemLevel'],itm.gemProperties.reqItemLevel));
		}
		
		if( itm.typeMask & (1<<19)) {
			html += Tools.addTr1(locale['UniqueEquipped']);
		}
		
		if(itm.questId) {
			html += Tools.addTr1(locale['This_Item_Begins_a_Quest']);
		}
		
		if ( itm.itemSubClassName ) {
			switch (itm.itemClass) {
				//	Armor
				case 4:
					if(itm.inventorySlot == 0){
						// if(_item.inventorySlotId<1) Tools.addTr(_item.a_class); ???
					}
					else if(itm.inventorySlot == 0 || itm.itemSubClass == 0){
						html += Tools.addTr1(locale['a_slot'][itm.inventorySlot]);
					}
					else if ( itm.gemProperties == null ) {
						var can = ( character != null ? character.canWear(itm) : true );
						html += Tools.addTr2( 
							locale['a_slot'][itm.inventorySlot], 
							"<span"+( can ? "" : " class='red'")+">"+itm.itemSubClassName[0]+"</span>"
						);
					}
					else {
						html += Tools.addTr1(itm.itemSubClassName[0]);
					}
					break;
				//	Weapon
				case 2:
					html += Tools.addTr2(locale['a_slot'][itm.inventorySlot], itm.itemSubClassName[0]);
					break;
				//	Container
				case 1:
					html += Tools.addTr1(itm.itemSubClassName[0]);
					break;
			}
		}
		
		if(itm.inventorySlot == 24){
			html += Tools.addTr1(TextIO.sprintf1(locale['Adds'],TextIO.getDPSFormatted(itm)));
		}
		else{
			if( itm.dps ) {
				html += Tools.addTr2(Math.floor(itm.minDamage)+" - "+Math.ceil(itm.maxDamage)+" "+locale['damage'],locale['Speed']+" "+TextIO.getSpeedFormatted(itm));
				html += Tools.addTr1("("+TextIO.sprintf1(locale['dps'],Math.floor(itm.dps*10)/10+(Math.floor(itm.dps*10)%10==0?".0":""))+")");
				
			}
		}
		
		tmp = "";

		if ( itm.armor > 0 ) {
			html += Tools.addTr1(TextIO.sprintf1(locale['armor'], itm.armor ));
		}

        for( var statId in stats ) {
            html += stats[statId].join();
        }
		
		if( itm.randomEnchants ) {
			if( itm.selectedRandomEnchantment != null ) {
				for( i=0; i<itm.selectedRandomEnchantment.enchants.length; i++ ) {
					var enchant = itm.selectedRandomEnchantment.enchants[i];
					if(!enchant) {
						continue;
					}
					html += Tools.addTr1(enchant.description);
				}
			}
			else {
				html += Tools.addTr1("<span class='green'>&lt;"+locale['RandomEnchantment']+"&gt;</span>");
			}
		}
        var enchantSection = "";
		
		//
		//	Enchant
		//
        for( var k in statEnchants ) {

            enchantSection += Tools.addTr1("<div class=\"green\">"+TextIO.sprintf1(locale["Enchanted"],statEnchants[k][0])+"</div>");
            for( var i=1; i<statEnchants[k].length; i++ ) {
                enchantSection += Tools.addTr1(TextIO.sprintf1(locale["Enchanted"],statEnchants[k][0]));
            }
        }
		//
		//	Gems
		//
		for ( i = 0; i < 3; i++) {
			if (itm.gems[i] != null) {
                enchantSection += Tools.addTr1(
					"<div class='tooltip_gem' style='background-image:url(/images/icons/gem/" + itm.gems[i].icon + ".png);'>" + 
					SpellItemEnchantmentTooltip.getHtml( itm.gems[i].gemProperties.enchant, character ) +
					"</div>"
				);
			}
			else {
				if (itm.socketColors[i]) {
					if( itm.socketColors[i] == 14 ) {
                        enchantSection += Tools.addTr1(
								"<div class='tooltip_socket_empty' style='background-image:url(/images/socket_prismatic.png);'>" +
								locale['PrismaticSocket'] + "</div>");
					}
					else {
                        enchantSection += Tools.addTr1(
								"<div class='tooltip_socket_empty' style='background-image:url(/images/socket_" + Math.log(itm.socketColors[i])/Math.log(2) + ".png);'>" +
								locale['a_socket'][Math.log(itm.socketColors[i])/Math.log(2)] + "</div>");
					}
				}
			}
		}
        if( enchantSection ) {
            html += Tools.addTr1("<div class='tt_item_spacing'></div>")
                + enchantSection;
        }
		//
		//	Socketbonus
		//

		if (itm.socketBonus != null) {
			html += Tools.addTr1("<span class='" + (itm.isSocketBonusActive() ? "green" : "grey") + "'>" + locale['socketBonus'] + ": " + itm.socketBonus.getDescription() + "</span>");
		}
		
		if (itm.gemProperties) {
			html += Tools.addTr1(itm.gemProperties.enchant.getDescription());
		}
		
		for ( i = 0; i < 5; i++) {
			if ( itm.spells[i] != null ) {
				var spellDesc = itm.spells[i].getDescription(character);
				var cd = "";
				var trigger = "";
				if ( spellDesc ) {
					switch(itm.spellTriggers[i])
					{
						case 0:
							trigger=locale['use'];
							if( itm.spellCooldowns[i] > 0 )
							{
								cd = "("+TextIO.timeToString(itm.spellCooldowns[i]/1000) +" "+locale['Cooldown']+")";
							}
							break;
						case 1:
							trigger=locale['equip'];
							break;
						case 2:
							trigger=locale['hit'];
							break;
					}
					html += Tools.addTr1(
						"<span class='green'>" + trigger + ": " +
						( g_settings.isPlanner ? "" : "<a class='tooltip_spell_desc_link' href='?spell="+itm.spells[i].id+"'>" )+
						spellDesc.join("<br/>") + " " +
						( g_settings.isPlanner ? "" : "</a>" ) +
						cd + "</span>"
					);
				}
			}
		}
		//
		//	Usable Enchants
		//
		html += useEnchants;
		//
		//
		//
		if ( itm.gemProperties != null && itm.gemProperties.enchant.condition) 
		{
			for ( i = 0; i < 5; i++) 
			{
				var color = "#888888";
				if (itm.gemProperties.enchant.isConditionActive(i,( character != null ? character.getGemCount() : null ))) 
				{
					color = "#FFFFFF";
				}
				var condition = itm.gemProperties.enchant.condition;
				var _g = (condition[1][i] ? condition[1][i] : 0);
				var _c = (condition[2][i] ? condition[2][i] : 0);
				var _cg = (condition[3][i] ? condition[3][i] : 0);
				var _v = (condition[4][i] ? condition[4][i] : 0);
				
				switch (_c)
				{
					case 0:
						if (_v != 0) 
						{
							html += Tools.addTr1(
								"<div class='tt_meta_condition' style='color:" + color + "'>"+
								( _v > 1  
									? TextIO.sprintf( locale["Meta_RequiresExactlyPl"], [ _v, locale["Meta_Category"][_g] ]) 
									: TextIO.sprintf1( locale["Meta_RequiresExactly"], locale["Meta_Category"][_g])
								) +
								"</div>"
							);
						}
						break;
					case 2:
						html += Tools.addTr1(
							"<div class='tt_meta_condition' style='color:" + color + "'>" +
							TextIO.sprintf(locale["Meta_RequiresMore"], [ locale['Meta_Category'][_cg], locale["Meta_Category"][_g]]) +
							"</div>");
						break;
					case 3:
						if (_v == 0) 
						{
							html += Tools.addTr1(
								"<div class='tt_meta_condition' style='color:" + color + "'>" +
								TextIO.sprintf(locale["Meta_RequiresMore"], [ locale['Meta_Category'][_g],locale["Meta_Category"][_cg]]) +
								"</div>");
						}
						else 
						{
							html += Tools.addTr1(
								"<div class='tt_meta_condition' style='color:" + color + "'>"+
								( (_v+1) > 1
									? TextIO.sprintf(locale["Meta_RequiresAtLeastPl"], [ _v + 1, locale["Meta_Category"][_g]]) 
									: TextIO.sprintf1(locale["Meta_RequiresAtLeast"], locale["Meta_Category"][_g])
								) +
								+
								"</div>");
						}
						break;
					case 5:
						if( _g > 0 ) {
							html += Tools.addTr1(
								"<div class='tt_meta_condition' style='color:" + color + "'>"+
								( _v > 1  
									? TextIO.sprintf(locale["Meta_RequiresAtLeastPl"], [ _v, locale["Meta_Category"][_g]]) 
									: TextIO.sprintf1(locale["Meta_RequiresAtLeast"],locale["Meta_Category"][_g])
								) +
								"</div>"
							);
						}
						break;
				}
			}
		}

		if(  (flags&ITEM_TT_SHORT) != ITEM_TT_SHORT ) {
			if( itm.itemSet != null )
			{
				var count = itm.itemSet.itemCount;
				var equipped = 0;
				var display = [];
				
				if ( character != null ) 
				{
					for ( i = 0; i < Inventory.SLOTS; i++) 
					{
						tmp = character.getEquippedItem( i, 0 );
						
						if ( tmp != null && tmp.itemSet != null && tmp.itemSet.id == itm.itemSet.id ) 
						{
							for (var j = 0; j < count; j++) 
							{
								if ( itm.itemSet.items[j] && itm.itemSet.items[j][0] == tmp.inventorySlot ) 
								{
									display[j] = tmp.name;
								}
							}
							equipped++;
						}
					}
				}
				html += Tools.addTr1("<div class='tooltip_set_name'>"+itm.itemSet.name+" ("+equipped+"/"+count+")</div>");	
				for( i=0;i<count;i++)
				{
					html += Tools.addTr1(
						"<span class='"+(display[i]?'tooltip_set_item_active':'tooltip_set_item_inactive')+"'>"+
						( display[i] ? display[i] : ( itm.itemSet.items[i] && itm.itemSet.items[i][1] ? itm.itemSet.items[i][1] : locale['Unknown'] ))+
						"</span>");	
				}
				//FIXME bonus order
				html += Tools.addTr1("<div class='tt_item_spacing'></div>");
				for ( i = 0; i < 8; i++) 
				{
					var req = itm.itemSet.requiredPieces[i];
					if ( req ) 
					{
						html += Tools.addTr1(
							"<div class='" + (equipped>=req ? "tooltip_set_bonus_active" : "tooltip_set_bonus_inactive") + "'>" + 
							"(" + req + ") " + locale['Set'] + ": " +
							( g_settings.isPlanner ? "" : "<a class='tooltip_spell_desc_link' href='?spell="+itm.itemSet.bonuses[i].id+"'>" ) +
							itm.itemSet.bonuses[i].getDescription(character).join("<br />") + 
							( g_settings.isPlanner ? "" : "</a>" ) + 
							"</div>");
					}
				}
				
			}

            html += Tools.addTr1("<div class='tt_item_spacing'></div>");

            if(itm.durability){
                html += Tools.addTr1(locale['Durability']+": "+itm.durability+"/"+itm.durability);
            }

            if ( itm.chrClassMask != 0 && (itm.chrClassMask&2047)!=2047) {
                var sz_classes = "", sz_coloredClasses = "";
                for ( i = 0; i < 11; i++) {
                    if ( (itm.chrClassMask & (1<<i)) != 0) {
                        sz_classes += (sz_classes ? ", " : "") + locale['a_class'][i];
                        sz_coloredClasses += (sz_coloredClasses ? ", " : "") + "<span class='character_class_"+(i+1)+"'>" + locale['a_class'][i] + "</span>";
                    }
                }
                if (sz_classes) {
                    if( character != null && ! character.fitsItemClassRequirements(itm) ) {
                        html += Tools.addTr1("<span class='red'>"+locale['Classes'] + ": " + sz_classes + "</span>");
                    }
                    else {
                        html += Tools.addTr1(locale['Classes'] + ": " + sz_coloredClasses);
                    }
                }
            }

            if( itm.requiredCharacterLevel && itm.requiredCharacterLevel > 1 || itm.quality == 7 ){
                if( itm.scalingStatDistribution ) {
                    html += Tools.addTr1(
                        TextIO.sprintf(
                            locale['RequiredLevelScaling'],
                            [
                                Math.max( 1, itm.scalingStatDistribution[20]),
                                itm.scalingStatDistribution[21],
                                Math.min( itm.scalingStatDistribution[21], chrLevel)
                            ]
                        )
                    );
                }
                else {
                    html += Tools.addTr1(
                        "<span class='"+
                            (chrLevel>=itm.requiredCharacterLevel?"":"red")+
                            "'>"+TextIO.sprintf1(locale['reqLevel'],itm.requiredCharacterLevel)+
                            "</span>"
                    );
                }
            }

            if(itm.requiredSkillId){
                html += Tools.addTr1("<span class='red'>"+locale['req']+" "+itm.requiredSkill+" ("+itm.requiredSkillLevel+")</span>");
            }
            if(itm.requiredSpellId){
                html += Tools.addTr1("<span class='red'>"+locale['req']+" "+itm.requiredSpell+"</span>");
            }
            if(itm.requiredFactionId){
                html += Tools.addTr1("<span class='red' style='white-space:nowrap'>"+locale['req']+" "+itm.requiredFactionName+" - "+locale['a_reputation'][itm.requiredFactionReputation]+"</span>");
            }

            if(itm.description){
                html += Tools.addTr1("<span style='color:#DDDD00'>"+itm.description+"</span>");
            }
			
			if( itm.sellPrice > 0 ) 
			{
				html += Tools.addTr1(TextIO.sprintf1( locale['SellPrice'], TextIO.htmlPrice(itm.sellPrice)));
			}

            if( itm.source ) {
                html += Tools.addTr1("<div class='tt_item_spacing'></div>")
                switch(itm.source[0]) {
                    case 3:
                        html += Tools.addTr1("<span class=\"tt_item_gold\">Quest: </span>" + itm.source[1][1]);
                        if ( chrLevel < itm.source[1][2] ) {
                            html += Tools.addTr1("<span class=\"red\">Required level: " + itm.source[1][2] + "</span>");
                        }
                        else {
                            html += Tools.addTr1("<span class=\"tt_item_gold\">Required level: </span>" + itm.source[1][2]);
                        }
                        html += Tools.addTr1("<span class=\"tt_item_gold\">Category: </span>" + itm.source[1][4]);
                }
            }
			
			if( g_settings.isPlanner == true && itm.randomEnchants != null ) {
				html += Tools.addTr1("<span style='white-space: normal; color:#808080; font-size:11px'>See Enchants to change the random enchantment</span>");
			}
		}
		
		html+="</table>";
		return html;
	}
};