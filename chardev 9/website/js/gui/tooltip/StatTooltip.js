var StatTooltip = {
	getHTML : function( character, group, index ) {
		var stats = character.stats;
		var html = "";
		switch(group){
		case 0:
			html += Tools.addTr1(
				"<span class='tt_stat_title'>"+locale['CS_Stats'][group][index]+ " " +
				Math.floor(stats.general[index]) + "</span>"
			);
			switch(index) {
			case 0:
				html += Tools.addTr1(locale['TT_StatText']['Health']);
				break;
			case 1:
				html += Tools.addTr1(locale['TT_StatText']['Mana']);
				break;
			case 2:
				html += Tools.addTr1(locale['TT_StatText']['Rage']);
				break;
			case 3:
				html += Tools.addTr1(locale['TT_StatText']['Energy']);
				break;
			case 4:
				html += Tools.addTr1(locale['TT_StatText']['Focus']);
				break;
			case 5:
				html += Tools.addTr1(locale['TT_StatText']['RunicPower']);
				break;
			case 6:
				html += Tools.addTr1(locale['TT_StatText']['ItemLevel']);
				break;
			}
			break;
		case 1:
			var b = Math.floor(stats.baseAttributes[index]);
			var t = Math.floor(stats.attributes[index]);
			var mb = t-b;
			var ap = Math.floor(stats.apFromAttributes[index]);
			var sp = Math.floor(stats.spFromAttributes[index]);
			var cr = Math.round(stats.critFromAttributes[index]*100)/100;
			var sc = Math.round(stats.spellCritFromAttributes[index]*100)/100;
			html += Tools.addTr1(
				"<span class='tt_stat_title'>"+locale['CS_Stats'][group][index] + " " +
				t + ( mb > 0 ? " (" + b + "+<span class='green'>"+mb+"</span>)" : "" ) + "</span>"
			);
			if( (index == 3 || index == 4 ) && !character.hasMana() ) {
				html += Tools.addTr1("<span class='tt_stat_no_benefit'>"+locale['TT_StatText']['NoBenefit']+"</span>");
			}
			else {
				var tmp_html = "";
				if( index == 2 ) {
					tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesHealth'],Math.floor(stats.healthFromSta));
				}
				else if( index == 3 ) {
					tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesMana'],Math.floor(stats.manaFromInt));
				}
				else if( index == 4 ) {
					tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesManaRegen'],Math.floor(stats.manaRegenFromSpi));
				}
				if( ap > 0 ) {
					tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesAP'],ap);
				}
				if( sp > 0 ) {
					tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesSP'],sp);
				}
				if( cr > 0 ) {
					tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesCrit'],TextIO.formatFloat2(cr));
				}
				if( sc > 0 ) {
					tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesSpellCrit'],TextIO.formatFloat2(sc));
				}
				if( tmp_html ) {
					html += Tools.addTr1(tmp_html);
				}
			}
			
			break;
		case 2:
			switch(index) {
			case 0:
				html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['MainHand']+"</span>");
				html += Tools.addTr2(locale['TT_StatText']['AttackSpeed'],TextIO.formatFloat(stats.mhSpeed/1000,2));
				html += Tools.addTr2(locale['TT_StatText']['Damage'],Math.floor(stats.mhMinDmg) + " - " +Math.ceil(stats.mhMaxDmg) );
				html += Tools.addTr2(locale['TT_StatText']['DamagePerSecond'],TextIO.formatFloat(stats.mhDps,1));
				if( stats.ohSpeed > 0 ) {
					html += Tools.addTr1("<div style='padding:5px'></div>");
					html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['OffHand']+"</span>");
					html += Tools.addTr2(locale['TT_StatText']['AttackSpeed'],TextIO.formatFloat(stats.ohSpeed/1000,2));
					html += Tools.addTr2(locale['TT_StatText']['Damage'],Math.floor(stats.ohMinDmg) + " - " +Math.ceil(stats.ohMaxDmg) );
					html += Tools.addTr2(locale['TT_StatText']['DamagePerSecond'],TextIO.formatFloat(stats.ohDps,1));
				}
				break;
			case 1:
				html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['Dps']+"</span>");
				break;
			case 2:
				html += Tools.addTr1("<span class='tt_stat_title'>"+
						TextIO.sprintf1(locale['TT_StatTitle']['MeleeAp'],
								Math.floor(stats.attackPower) + 
								( 
									Math.floor(stats.additionalAttackPower) > 0 ? 
										" (" +
										(Math.floor(stats.attackPower) - Math.floor(stats.additionalAttackPower)) +
										"<span class='green'>+"+Math.floor(stats.additionalAttackPower)+"</span>)" 
									: ""
								)		
						)+"</span>");
				html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['IncreasesMeleeDamage'],TextIO.formatFloat(stats.attackPower/14,1)));
				break;
			case 3:
				html += Tools.addTr1(
					"<span class='tt_stat_title'>"+
					TextIO.sprintf1(
						locale['TT_StatTitle']['AttackSpeed'],
						TextIO.formatFloat(stats.melee[3][0]/1000,2) + 
						( stats.melee[3][1] != null ? " / " + TextIO.formatFloat(stats.melee[3][1]/1000,2) : "" )
					)+
					"</span>"
				);
				break;
			case 4:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['Haste'],TextIO.formatFloat2(stats.melee[4]))+"</span>");
				html += Tools.addTr1(locale['TT_StatText']['IncreasesAttackSpeed']);
				html += Tools.addTr1(
						TextIO.sprintf(locale['TT_StatText']['IncreasesHaste'], [ 
						                                                          stats.meleeHasteRating,
						                                                          TextIO.formatFloat2(stats.meleeHasteRating/COMBAT_RATINGS[17][character.level-1])
						                                                        ]
						)
				);
				break;
			case 5:
				var tmp;
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1( locale['TT_StatTitle']['HitChance'], TextIO.formatFloat(stats.melee[5],2))+"</span>");
				html += Tools.addTr1(TextIO.sprintf(
					locale['TT_StatText']['HitRating'], [
					                                     Math.floor(stats.meleeHitRating[1]),
					                                     TextIO.formatFloat(stats.meleeHitRating[1]/COMBAT_RATINGS[5][character.level-1],2)
					                                    ]
				));
				tmp = "<table class='tt_miss_table' cellpadding='0' cellspacing='0'><colgroup><col width='50%' /><col width='50%' /></colgroup>" +
					  "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_MissChance']+"</td></tr>";
				
				if( stats.ohSpeed > 0 ) {
					tmp += "<tr><td class='tt_miss_g' colspan='2'>"+locale['TT_NormalAttacks']+"</td></tr>";
					for( var i=0; i<4; i++ ) {
						tmp += "<tr><td class='tt_miss_level'>"+(character.level+i)+"</td><td class='tt_miss'>"+TextIO.formatFloat2(Math.max(0, DW_MISS_BASE[i]-stats.melee[5]))+"%</td></tr>";
					}
					tmp += "<tr><td colspan='2'>"+
							StatTooltip.__statCapNotice( DW_MISS_BASE[3], stats.melee[5], COMBAT_RATINGS[5][character.level-1] )
							+"</td></tr>";
					
					tmp += "<tr><td class='tt_miss_g' colspan='2'>"+locale['TT_SpecialAttacks']+"</td></tr>";
				}
				for( i=0; i<4; i++ ) {
					tmp += "<tr><td class='tt_miss_level'>"+
							(character.level+i)+
							"</td><td class='tt_miss'>"+
							TextIO.formatFloat2(Math.max(0, MELEE_MISS_BASE[i]-stats.melee[5]))+
							"%</td></tr>";
				}
				
				tmp += "<tr><td colspan='2'>"+
						StatTooltip.__statCapNotice( MELEE_MISS_BASE[3], stats.melee[5], COMBAT_RATINGS[5][character.level-1] )
						+"</td></tr>";
				
				tmp += "</table>";
				html += Tools.addTr1(tmp);
				break;
			case 6:
				html += Tools.addTr1("<span class='tt_stat_title'>"+
						TextIO.sprintf1(
							locale['TT_StatTitle']['CritChance'],
							TextIO.formatFloat2(stats.melee[6]))+
						"</span>");
				html += Tools.addTr1(locale['TT_StatText']['ExtraDamage']);
				html += Tools.addTr1(TextIO.sprintf( locale['TT_StatText']['CritRating'], [
							Math.floor(stats.meleeCritRating[1]),
							TextIO.formatFloat2(stats.meleeCritRating[1]/COMBAT_RATINGS[8][character.level-1])
						]));
				break;
			case 7:
				//
				//#########################################################
				//
				// 		EXPERTISE
				//
				//#########################################################
				//
				var mhExt = EXPERTISE_TO_CHANCE * stats.melee[7][0],
					ohExt = stats.melee[7][1] == null ? null : EXPERTISE_TO_CHANCE * stats.melee[7][1],
					ratingPerCent = COMBAT_RATINGS[23][character.level-1] / EXPERTISE_TO_CHANCE;
				//
				html += Tools.addTr1(
					"<span class='tt_stat_title'>"+
					locale['CS_Stats'][group][index]+ 
					" " + 
					stats.melee[7][0] +
					( ohExt != null ? " / " + stats.melee[7][1] : "" ) +
					"</span>");
				
				
				html += Tools.addTr1(TextIO.sprintf1(
					locale['TT_StatText']['ReduceDodgeParry'],
					TextIO.formatFloat2(mhExt) + "%" + ( ohExt != null ? "/"+TextIO.formatFloat2(ohExt)+"%" : "" )
				));
				html += Tools.addTr1(TextIO.sprintf(
					locale['TT_StatText']['ExpertiseRating'], [
					                                           Math.floor(stats.expertiseRating[1]),
					                                           Math.floor(stats.expertiseRating[1]/COMBAT_RATINGS[23][character.level-1])
					                                          ]
				));
				//
				tmp = "<table class='tt_miss_table' cellpadding='0' cellspacing='0'><colgroup><col width='50%' /><col width='50%' /></colgroup>";
				//
				//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
				//
				// 		ENEMIES DODGE
				//
				//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
				//
				tmp += "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_DodgeChance']+"</td></tr>";
				//
				tmp += StatTooltip.__levelChanceRows( character.level, ENEMY_DODGE, mhExt, ohExt );
				//
				tmp += "<tr><td colspan='2'>"+
						StatTooltip.__statCapNotice( ENEMY_DODGE[3], mhExt, ratingPerCent )
						+"</td></tr>";
				//
				//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
				//
				// 		ENEMIES PARRY
				//
				//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
				//
				tmp += "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_ParryChance']+"</td></tr>";
				//
				tmp += StatTooltip.__levelChanceRows( character.level, ENEMY_PARRY, mhExt, ohExt );
				//
				tmp += "<tr><td colspan='2'>"+
				StatTooltip.__statCapNotice( ENEMY_PARRY[3], mhExt, ratingPerCent )
						+"</td></tr>";
				//
				//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
				//
				tmp += "</table>";
				html += Tools.addTr1(tmp);
				//
				//#########################################################
				//
				break;
			case 8:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(
						locale['TT_StatTitle']['Mastery'],
						TextIO.formatFloat2(stats.melee[8])
				)+"</span>");
				html += Tools.addTr1(TextIO.sprintf(
					locale['TT_StatText']['MasteryRating'], [
					                                         Math.floor(stats.masteryRating),
					                                         TextIO.formatFloat2(stats.masteryRating/COMBAT_RATINGS[25][character.level-1])
					                                        ]
				));
				break;
			}
			break;
		case 3: 
			switch(index) {
			case 0:
				html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['MainHand']+"</span>");
				html += Tools.addTr2(locale['TT_StatText']['AttackSpeed'],TextIO.formatFloat2(stats.raSpeed/1000));
				html += Tools.addTr2(locale['TT_StatText']['Damage'],Math.floor(stats.raMinDmg) + " - " +Math.ceil(stats.raMaxDmg) );
				html += Tools.addTr2(locale['TT_StatText']['DamagePerSecond'],TextIO.formatFloat1(stats.raDps));
				break;
			case 1:
				html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['Dps']+"</span>");
				break;
			case 2:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['RangedAp'],Math.floor(stats.rangedAttackPower))+"</span>");
				html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['IncreasesRangedDamage'],TextIO.formatFloat1(stats.rangedAttackPower/14)));
				break;
			case 3:
				html += Tools.addTr1( "<span class='tt_stat_title'>"+
							TextIO.sprintf1( locale['TT_StatTitle']['AttackSpeed'], TextIO.formatFloat2(stats.ranged[3]/1000))+
							"</span>");
				break;
			case 4:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['Haste'],TextIO.formatFloat2(stats.ranged[4]))+"</span>");
				html += Tools.addTr1(locale['TT_StatText']['IncreasesAttackSpeedAndFocus']);
				html += Tools.addTr1(
							TextIO.sprintf(locale['TT_StatText']['IncreasesHaste'], [
								stats.rangedHasteRating,
								TextIO.formatFloat2(stats.rangedHasteRating/COMBAT_RATINGS[18][character.level-1])
						]));
				break;
			case 5:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['HitChance'],TextIO.formatFloat2(stats.ranged[5]))+"</span>");
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['HitRating'], [
								Math.floor(stats.rangedHitRating),
								TextIO.formatFloat2(stats.rangedHitRating/COMBAT_RATINGS[6][character.level-1])
						]));
				tmp = "<table class='tt_miss_table' cellpadding='0' cellspacing='0'><colgroup><col width='50%' /><col width='50%' /></colgroup>" +
				  "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_MissChance']+"</td></tr>";
				for( i=0; i<4; i++ ) {
					tmp += "<tr><td class='tt_miss_level'>"+(character.level+i)+"</td><td class='tt_miss'>"+TextIO.formatFloat2(Math.max(0, RANGED_MISS_BASE[i]-stats.ranged[5]))+"%</td></tr>";
				}

				tmp += "<tr><td colspan='2'>"+
						StatTooltip.__statCapNotice( RANGED_MISS_BASE[3], stats.ranged[5], COMBAT_RATINGS[6][character.level-1] )
						+"</td></tr>";
				
				tmp += "</table>";
				html += Tools.addTr1(tmp);
				break;
			case 6:
				html += Tools.addTr1( "<span class='tt_stat_title'>"+
							TextIO.sprintf1(
								locale['TT_StatTitle']['CritChance'],
								TextIO.formatFloat2(stats.ranged[6]))+
							"</span>");
				html += Tools.addTr1(locale['TT_StatText']['ExtraDamage']);
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['CritRating'], [
								Math.floor(stats.rangedCritRating),
								TextIO.formatFloat2(stats.rangedCritRating/COMBAT_RATINGS[9][character.level-1])
							]));
				break;
			case 7:
				html += Tools.addTr1( "<span class='tt_stat_title'>"+
							TextIO.sprintf1(
								locale['TT_StatTitle']['Mastery'],
								TextIO.formatFloat2(stats.ranged[7]))+
							"</span>");
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['MasteryRating'], [
								Math.floor(stats.masteryRating),
								TextIO.formatFloat2(stats.masteryRating/COMBAT_RATINGS[25][character.level-1])
							]));
				break;
			}
			break;
		case 4:
			switch(index) {
			case 0:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1( locale['TT_StatTitle']['SpellPower'], Math.floor(stats.spell[0]))+"</span>");
				html += Tools.addTr1(locale['TT_StatText']['IncreasesDamageAndHealing']);
				break;
			case 1:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['Haste'],TextIO.formatFloat2(stats.spell[1]))+"</span>");
				html += Tools.addTr1(locale['TT_StatText']['IncreasesSpellCasting']);
				html += Tools.addTr1(
						TextIO.sprintf( locale['TT_StatText']['IncreasesHaste'], [
							stats.spellHasteRating,
							TextIO.formatFloat2(stats.spellHasteRating/COMBAT_RATINGS[19][character.level-1])
						]));
				break;

			case 2:
				html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['HitChance'],TextIO.formatFloat2(stats.spell[2]))+"</span>");
				html += Tools.addTr1(
							TextIO.sprintf(locale['TT_StatText']['HitRating'], [
								Math.floor(stats.spellHitRating),
								TextIO.formatFloat2(stats.spellHitRating/COMBAT_RATINGS[7][character.level-1])
						]));
				tmp = "<table class='tt_miss_table' cellpadding='0' cellspacing='0'><colgroup><col width='50%' /><col width='50%' /></colgroup>" +
				  "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_MissChance']+"</td></tr>";
				for( i=0; i<4; i++ ) {
					tmp += "<tr><td class='tt_miss_level'>"+(character.level+i)+"</td><td class='tt_miss'>"+TextIO.formatFloat2(Math.max(0, SPELL_MISS_BASE[i]-stats.spell[2]))+"%</td></tr>";
				}
				tmp += "<tr><td colspan='2'>"+
						StatTooltip.__statCapNotice( SPELL_MISS_BASE[3], stats.spell[2], COMBAT_RATINGS[7][character.level-1] )
						+"</td></tr>";
				tmp += "</table>";
				html += Tools.addTr1(tmp);
				break;
			case 4:
				html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['ManaRegen']+"</span>");
				html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['ManaRegen'],Math.floor(stats.spell[4])));
				break;
			case 5:
				html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['CombatRegen']+"</span>");
				html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['CombatRegen'],Math.floor(stats.spell[5])));
				break;
			case 6:
				html += Tools.addTr1( "<span class='tt_stat_title'>"+
							TextIO.sprintf1( locale['TT_StatTitle']['CritChance'], TextIO.formatFloat2(stats.spell[6]))+
							"</span>");
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['CritRating'], [
							    Math.floor(stats.spellCritRating),
								TextIO.formatFloat2(stats.spellCritRating/COMBAT_RATINGS[10][character.level-1])
						]));
				break;
			case 7:
				html += Tools.addTr1( "<span class='tt_stat_title'>"+
							TextIO.sprintf1( locale['TT_StatTitle']['Mastery'], TextIO.formatFloat2(stats.spell[7]))+
							"</span>");
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['MasteryRating'], [
                            	Math.floor(stats.masteryRating),
                            	TextIO.formatFloat2(stats.masteryRating/COMBAT_RATINGS[25][character.level-1])
                            ]));
				break;
			}
			break;
		case 5:
			html += Tools.addTr1(
				"<span class='tt_stat_title'>"+
				TextIO.sprintf1(
						locale['TT_StatTitle_Defense'][index],
						( index == 4 || index == 0 ? stats.defense[index] : TextIO.formatFloat2(stats.defense[index])) 
				) +
				"</span>"
			);
			
			switch(index) {
			case 0:
				html += Tools.addTr1( 
							TextIO.sprintf1( 
								locale['TT_StatText']['ReducesPhysical'],
								TextIO.formatFloat2(stats.getReductionFromArmor(character.level)*100)
							));
				break;
			case 1:
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['DodgeRating'], [
								stats.ratings[2],
								TextIO.formatFloat2(stats.ratings[2]/COMBAT_RATINGS[2][character.level-1])
							]));
				break;
			case 2:
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['ParryRating'], [
								stats.parryRating,
								TextIO.formatFloat2(stats.parryRating/COMBAT_RATINGS[3][character.level-1])
							]));
				break;
			case 3:
				html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['BlockRating'], [
								stats.ratings[4],
								TextIO.formatFloat2(stats.ratings[4]/COMBAT_RATINGS[4][character.level-1])
							]));
				break;
			case 4:
				html += Tools.addTr1( 
							TextIO.sprintf1( locale['TT_StatText']['Resilience'],
								TextIO.formatFloat2(stats.resilienceDamageReduction * 100)
							));
				break;
			}
			break;
		case 6:
			html += Tools.addTr1( "<span class='tt_stat_title'>"+
						TextIO.sprintf1 ( locale['TT_ResistanceTitle'][index], stats.resistance[index]) +
						"</span>");
			html += Tools.addTr1(TextIO.sprintf1( locale['TT_Resistance'][index], 0 ));
			break;
		}
		
		if( html ) {
			html = "<table style='line-height:125%' class='tt_stat_text'>" + html + "</table>";
		}
		
		return html;
	},
	__statCapNotice: function( miss, hit, rating ) {
		var hitRating = Math.floor((miss - hit ) * rating );
		if( hitRating != 0 ) {
			if( hitRating > 0 ) {
				return "<div class='tt_hit_cap'>" + TextIO.sprintf1( locale['TillCap'], hitRating ) + "</div>";
			}
			return "<div class='tt_hit_cap'>" + TextIO.sprintf1( locale['OverCap'], Math.abs( hitRating )) + "</div>";
		}
		return "";
	},
	__levelChanceRows: function( lvl, arr, statMH, statOH ) {
		var i, tmp = "";
		for( i=0; i<4; i++ ) {
			tmp += "<tr><td class='tt_miss_level'>"+
					( lvl + i ) +
					"</td><td class='tt_miss'>"+
					TextIO.formatFloat2(Math.max(0, arr[i] - statMH )) + 
					( statOH != null ? "/" + TextIO.formatFloat2(Math.max(0, arr[i] - statOH)) : "" ) +
					"%</td></tr>";
		}
		return tmp;
	}
};