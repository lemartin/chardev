/**
 * @author LeMartin
 */

var TT_MAX_SIZE = 350; 
var TT_PADDING = 10;

/**
 * @constructor
 * @returns {CTooltip}
 */
function CTooltip(){
	/** @type {Element} */
	var m_tooltipDiv = null;
	var m_tt_content = null;
	
	var m_requestedItemId = 0;
	//var m_requestedEnchantId = 0;
	var m_requestedSpellId = 0;
	var m_x = 0;
	var m_y = 0;
	
	this._errorNode = document.createElement("div");
	this._errorNode.className = 'tt_msg_c';
	
	/**
	 * @param {Element} oElement
	 * @return {Array} [ x, y, w, h ];
	 */
	function getPosition(oElement){
		var x=0;
		var y=0;
		var w=oElement.offsetWidth;
		var h=oElement.offsetHeight;
		while( oElement != null ) {
			y += oElement.offsetTop;
			x += oElement.offsetLeft;
			oElement = oElement.offsetParent;
		}
		return new Array(x,y,w,h);
	}
	
	function showTooltip(html){
		if( m_tooltipDiv == null ){
			m_tt_content = document.createElement("div");
			m_tooltipDiv = document.createElement("div");
			m_tooltipDiv.className = "tooltip_div";
			
			var sg = new StaticGrid(3,3);
			sg._cells[0][0].innerHTML = "<div class='tt_bg_lt'></div>";
			sg._cells[0][1].className = 'tt_bg_t';
			sg._cells[0][2].innerHTML = "<div class='tt_bg_rt'></div>";
			sg._cells[1][0].className = 'tt_bg_l';
			sg._cells[1][1].appendChild(m_tt_content); m_tt_content.className = 'tt_bg';
			sg._cells[1][2].className = 'tt_bg_r';
			sg._cells[2][0].innerHTML = "<div class='tt_bg_lb'></div>";
			sg._cells[2][1].className = 'tt_bg_b';
			sg._cells[2][2].innerHTML = "<div class='tt_bg_rb'></div>";
			
			m_tooltipDiv.appendChild(sg._node);
			document.body.appendChild(m_tooltipDiv);
		}

		m_tooltipDiv.style.width = "";
		m_tooltipDiv.style.whiteSpace = "nowrap";
		m_tt_content.innerHTML = html;
		m_tooltipDiv.style.display = "block";
		
		if( m_tooltipDiv.offsetWidth > TT_MAX_SIZE )
		{
			setTooltipSize(TT_MAX_SIZE);
		}
	}
	
	function setTooltipSize( size ) {
			m_tooltipDiv.style.whiteSpace = "normal";
			m_tooltipDiv.style.width = size+"px";
			if( m_tooltipDiv.firstChild.offsetWidth > size )
			{
				m_tooltipDiv.style.width = m_tooltipDiv.firstChild.offsetWidth + "px";
			}
	}

	function improvePosition(x,y)
	{
		var s = Chardev.windowSize();
		var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		if (m_tooltipDiv) 
		{
			if ((y + m_tooltipDiv.offsetHeight) > s[1] + st ) 
				y = s[1] + st - m_tooltipDiv.offsetHeight;
			if ((x + m_tooltipDiv.offsetWidth) > (document.body.scrollLeft + document.body.offsetWidth)) 
				x -= m_tooltipDiv.offsetWidth + 20;
		}
		return [Math.max(0,x),Math.max(0,y)];
	}
	
	this.getMaxWidth = function(){return TT_MAX_SIZE;};
	
	this.handleMove = function(ev){
		if (!ev){
			ev = window.event;
		}
		if((document.all)&&document.getElementById){
			m_x=ev.clientX+document.documentElement.scrollLeft;
			m_y=ev.clientY+document.documentElement.scrollTop;
		}
		else{
			m_x=ev.pageX;
			m_y=ev.pageY;
		}
	};
	
	this.move = function(){
		var y = m_y+10;
		var x = m_x+10;
		var pos = improvePosition(x,y);
		if (m_tooltipDiv) 
		{
			m_tooltipDiv.style.left = pos[0] + "px";
			m_tooltipDiv.style.top = pos[1] + "px";
		}
	};
	/**
	 * @param {number} tree
	 * @param {number} row
	 * @param {number} col
	 * @param {Talents} talents
	 * @param {Element} caller
	 */
	this.showTalent = function(talents, tree, row, col, caller)
	{
		var talent = talents._talents[tree][row][col];
		var talentSpell = talent.getSpell();
		var nextTalentSpell = talent.getNextSpell();
		var args = [];
		var html = "<table cellpadding='0px' cellspacing='0px'>";
		var cc = g_settings.isPlanner ? Engine._currentCharacter : null;
		
		if (talentSpell != null) 
		{
			html += Tools.addTr1("<span class='tooltip_talent_name'>" + talentSpell.getName() + "</span>");
			html += Tools.addTr1("<span class='tooltip_talent_rank'>" + locale['Rank'] + " " + talent._spent + "/" + talent._ranks  + "</span>");
			html += Tools.addTr1(talentSpell.getTooltip(cc,1,[]));
			if (nextTalentSpell != null) 
			{
				html += Tools.addTr1("<div class='tooltip_talent_next_rank'>" + locale['Nextrank'] + "</div>");
			}
		}
		else 
		{
			html += Tools.addTr2(
				"<span class='tooltip_talent_name'>" + nextTalentSpell.getName() + "</span>", 
				"<span class='tooltip_talent_rank'>" + locale['Rank'] + " " + talent._spent + "/" + talent._ranks + "</span>"
			);
		}
		if (nextTalentSpell != null) 
		{
			for( var i=0; i<TALENT_REQ_ID_COUNT; i++ ) {
				var reqTalent = talent._requiredTalents[i];
				if( !reqTalent ) {
					continue;
				}
				if( reqTalent._spent != reqTalent._ranks ) {
					if( reqTalent._ranks > 1 ) {
						args[args.length] = TextIO.sprintf(locale['requires_points_in'],[reqTalent._ranks,reqTalent.getName()]);
					}
					else {
						args[args.length] = TextIO.sprintf1(locale['requires_point_in'],reqTalent.getName());
					}
				}
			}
			if( talents._treeSpents[tree] < row*5 )
			{
				args[args.length] = TextIO.sprintf(locale['requires_points_in_tree'], [row*5,talents._treeNames[tree]]);
			}
			html += Tools.addTr1(nextTalentSpell.getTooltip(cc,1,args));
		}
		html += "</table>";
		//
		//
		var pos = getPosition(caller);
		showTooltip(html);
		
		this.fixSize(m_tooltipDiv, 250);
		
		if (tree == 1 && col > 1 || tree == 2 ) {
			m_tooltipDiv.style.left = (pos[0] - m_tooltipDiv.offsetWidth - 10) + "px";
		}
		else {
			m_tooltipDiv.style.left = (pos[0] + pos[2] + 10) + "px";
		}
		if (row > 5) {
			m_tooltipDiv.style.top = (pos[1] + pos[3] - m_tooltipDiv.offsetHeight )+"px";
		}
		else {
			m_tooltipDiv.style.top = (pos[1])+"px";
		}
	};
	
	this.showSlot = function(html,caller)
	{	
		var pos = getPosition(caller);
		showTooltip(html);		
		pos = improvePosition(pos[0] + pos[2] + 10,pos[1]);
		m_tooltipDiv.style.left = pos[0] + "px";
		m_tooltipDiv.style.top = pos[1]+"px";
	};
	
	this.showItemByReference = function(itm,characterScope)
	{
		if ( itm != null ) 
		{
			showTooltip(itm.getTooltip( characterScope ));
			this.move();
		}
	};
	
	this.showItemBySlot = function(slot)
	{
		showTooltip(Engine._currentCharacter._inventory._items[slot][0].getTooltip());
	};
	
	this.showItemWithoutPreview = function(itemId) {
		var itm = g_items.get(itemId);
		var cc = null;
		if (itm) 
		{
			if ( g_settings.isPlanner ) 
			{
				cc = Engine._currentCharacter;
			}
			showTooltip(itm.getTooltip(cc));
			this.move();
		}
		else 
		{
			m_requestedItemId = itemId;
			g_items.asyncGet(itemId, new Handler( this.showItemWithoutPreview, this) , [itemId]);
		}
	};
	
	this.showItem = function(itemId)
	{
		var itm = g_items.get(itemId);
		var cc = null;
		var slot = -1;
		if (itm) 
		{
			if ( g_settings.isPlanner ) 
			{
				cc = Engine._currentCharacter;
				if( cc != null ) {
					slot = cc._sheet._selectedSlot;
					if( slot != -1 ) {
						cc.preview(itm, slot, -1);
					}
				}
			}
			showTooltip(itm.getTooltip(cc));
			this.move();
		}
		else 
		{
			m_requestedItemId = itemId;
			g_items.asyncGet(itemId, new Handler( this.asyncShowItem, this), [itemId,slot]);
		}
	};
	
	this.showSetItemByReference = function( itm ) {
		var cc = null;
		var slot = g_inventoryToSlot[itm._inventorySlot];
		
		if ( g_settings.isPlanner ) 
		{
			cc = Engine._currentCharacter;
			if( cc != null ) {
				cc.preview(itm, slot, -1);
			}
		}
		showTooltip(itm.getTooltip(cc));
		this.move();
	};
	
	this.showSpell = function(spellId)
	{
		var spell = g_spells.get(spellId);
		if (spell) 
		{
			showTooltip(spell.getTooltip(g_settings.isPlanner ? Engine._currentCharacter : null));
			this.move();
		}
		else 
		{
			m_requestedSpellId = spellId;
			g_spells.asyncGet(spellId, new Handler( this.asyncShowSpell, this), [spellId]);
		}
	};
	
	this.showSpellByReference = function(spell)
	{
		showTooltip(spell.getTooltip(g_settings.isPlanner ? Engine._currentCharacter : null));
		this.move();
	};
	
	this.showEnchantSpell = function( spellId )
	{
		//TODO add preview
		var spell = g_spells.get(spellId);
		var cc, slot;
		if (spell) 
		{
			if ( Engine._isCharacterPlanner && Engine._currentCharacter != null ) 
			{
				cc = Engine._currentCharacter;
				slot = cc._sheet._selectedSlot;
				if( slot != -1 ) {
					cc.previewEnchant(spell, slot);
				}
			}
			
			showTooltip(spell.getTooltip(g_settings.isPlanner ? Engine._currentCharacter : null));
			this.move();
		}
		else 
		{
			m_requestedSpellId = spellId;
			g_spells.asyncGet(spellId, new Handler( this.asyncShowEnchantSpell, this), [spellId]);
		}
	};

	this.asyncShowEnchantSpell = function(spellId){
		if(spellId == m_requestedSpellId){
			m_requestedSpellId = 0;
			this.showSpell(spellId);
		}
	};
	
	this.asyncShowSpell = function(spellId){
		if(spellId == m_requestedSpellId){
			m_requestedSpellId = 0;
			this.showSpell(spellId);
		}
	};
	
	this.asyncShowItem = function(itemId){
		if(itemId == m_requestedItemId){
			m_requestedItemId = 0;
			this.showItem(itemId);
		}
	};
	
	this.showGem = function(itemId)
	{
		var itm = g_items.get(itemId);
		var cc = null;
		var slot = -1;
		var socket = -1;
		if (itm) 
		{
			if ( g_settings.isPlanner ) 
			{
				cc = Engine._currentCharacter;
				socket = Engine._gui._socketInterface._selectedSocket;
				if( cc != null ) {
					slot = cc._sheet._selectedSlot;
					if( slot != -1 && socket != -1 ) { 
						cc.preview(itm, slot, socket);
					}
				}
			}
			showTooltip(itm.getTooltip(cc));
			this.move();
		}
		else 
		{
			m_requestedItemId = itemId;
			g_items.asyncGet(itemId, new Handler( this.asyncShowGem, this), [itemId]);
		}
	};
	
	this.asyncShowGem = function(itemId){
		if(itemId == m_requestedItemId){
			m_requestedItemId = 0;
			this.showGem(itemId);
		}
	};
	
//	this.showEnchant = function(enchantId,slot){
//		var enchant = Enchants.get(enchantId);
//		if(enchant){
//			showTooltip(enchant.getTooltip());
//			this.move();
//		}
//		else{
//			m_requestedEnchantId = enchantId;
//			Enchants.asyncGet(enchantId,slot,new Handler( this.asyncShowEnchant,this),[enchantId,slot]);
//		}
//	};
	
//	this.asyncShowEnchant = function(enchantId,slot){
//		if(enchantId == m_requestedEnchantId){
//			m_requestedEnchantId = null;
//			this.showEnchant(enchantId,slot);
//		}
//	};
	 
	this.showStat = function(group,index,caller,character){
		var stats = character._stats;
		var html = "<table style='line-height:125%' class='tt_stat_text'>";
		switch(group){
			case 0:
				html += Tools.addTr1(
					"<span class='tt_stat_title'>"+locale['CS_Stats'][group][index]+ " " +
					Math.floor(stats._general[index]) + "</span>"
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
				var b = Math.floor(stats._baseAttributes[index]);
				var t = Math.floor(stats._attributes[index]);
				var mb = t-b;
				var ap = Math.floor(stats._apFromAttributes[index]);
				var sp = Math.floor(stats._spFromAttributes[index]);
				var cr = Math.round(stats._critFromAttributes[index]*100)/100;
				var sc = Math.round(stats._spellCritFromAttributes[index]*100)/100;
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
						tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesHealth'],Math.floor(stats._healthFromSta));
					}
					else if( index == 3 ) {
						tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesMana'],Math.floor(stats._manaFromInt));
					}
					else if( index == 4 ) {
						tmp_html += ( tmp_html ? "<br />" : "" ) + TextIO.sprintf1(locale['TT_StatText']['IncreasesManaRegen'],Math.floor(stats._manaRegenFromSpi));
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
					html += Tools.addTr2(locale['TT_StatText']['AttackSpeed'],TextIO.formatFloat(stats._mhSpeed/1000,2));
					html += Tools.addTr2(locale['TT_StatText']['Damage'],Math.floor(stats._mhMinDmg) + " - " +Math.ceil(stats._mhMaxDmg) );
					html += Tools.addTr2(locale['TT_StatText']['DamagePerSecond'],TextIO.formatFloat(stats._mhDps,1));
					if( stats._ohSpeed > 0 ) {
						html += Tools.addTr1("<div style='padding:5px'></div>");
						html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['OffHand']+"</span>");
						html += Tools.addTr2(locale['TT_StatText']['AttackSpeed'],TextIO.formatFloat(stats._ohSpeed/1000,2));
						html += Tools.addTr2(locale['TT_StatText']['Damage'],Math.floor(stats._ohMinDmg) + " - " +Math.ceil(stats._ohMaxDmg) );
						html += Tools.addTr2(locale['TT_StatText']['DamagePerSecond'],TextIO.formatFloat(stats._ohDps,1));
					}
					break;
				case 1:
					html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['Dps']+"</span>");
					break;
				case 2:
					html += Tools.addTr1("<span class='tt_stat_title'>"+
							TextIO.sprintf1(locale['TT_StatTitle']['MeleeAp'],
									Math.floor(stats._attackPower) + 
									( 
										Math.floor(stats._additionalAttackPower) > 0 ? 
											" (" +
											(Math.floor(stats._attackPower) - Math.floor(stats._additionalAttackPower)) +
											"<span class='green'>+"+Math.floor(stats._additionalAttackPower)+"</span>)" 
										: ""
									)		
							)+"</span>");
					html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['IncreasesMeleeDamage'],TextIO.formatFloat(stats._attackPower/14,1)));
					break;
				case 3:
					html += Tools.addTr1(
						"<span class='tt_stat_title'>"+
						TextIO.sprintf1(
							locale['TT_StatTitle']['AttackSpeed'],
							TextIO.formatFloat(stats._melee[3][0]/1000,2) + 
							( stats._melee[3][1] != null ? " / " + TextIO.formatFloat(stats._melee[3][1]/1000,2) : "" )
						)+
						"</span>"
					);
					break;
				case 4:
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['Haste'],TextIO.formatFloat2(stats._melee[4]))+"</span>");
					html += Tools.addTr1(locale['TT_StatText']['IncreasesAttackSpeed']);
					html += Tools.addTr1(
							TextIO.sprintf(locale['TT_StatText']['IncreasesHaste'], [ 
							                                                          stats._meleeHasteRating,
							                                                          TextIO.formatFloat2(stats._meleeHasteRating/COMBAT_RATINGS[17][character._level-1])
							                                                        ]
							)
					);
					break;
				case 5:
					var tmp;
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1( locale['TT_StatTitle']['HitChance'], TextIO.formatFloat(stats._melee[5],2))+"</span>");
					html += Tools.addTr1(TextIO.sprintf(
						locale['TT_StatText']['HitRating'], [
						                                     Math.floor(stats._meleeHitRating[1]),
						                                     TextIO.formatFloat(stats._meleeHitRating[1]/COMBAT_RATINGS[5][character._level-1],2)
						                                    ]
					));
					tmp = "<table class='tt_miss_table' cellpadding='0' cellspacing='0'><colgroup><col width='50%' /><col width='50%' /></colgroup>" +
						  "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_MissChance']+"</td></tr>";
					
					if( stats._ohSpeed > 0 ) {
						tmp += "<tr><td class='tt_miss_g' colspan='2'>"+locale['TT_NormalAttacks']+"</td></tr>";
						for( var i=0; i<4; i++ ) {
							tmp += "<tr><td class='tt_miss_level'>"+(character._level+i)+"</td><td class='tt_miss'>"+TextIO.formatFloat2(Math.max(0, DW_MISS_BASE[i]-stats._melee[5]))+"%</td></tr>";
						}
						tmp += "<tr><td colspan='2'>"+
								this._statCapNotice( DW_MISS_BASE[3], stats._melee[5], COMBAT_RATINGS[5][character._level-1] )
								+"</td></tr>";
						
						tmp += "<tr><td class='tt_miss_g' colspan='2'>"+locale['TT_SpecialAttacks']+"</td></tr>";
					}
					for( i=0; i<4; i++ ) {
						tmp += "<tr><td class='tt_miss_level'>"+
								(character._level+i)+
								"</td><td class='tt_miss'>"+
								TextIO.formatFloat2(Math.max(0, MELEE_MISS_BASE[i]-stats._melee[5]))+
								"%</td></tr>";
					}
					
					tmp += "<tr><td colspan='2'>"+
							this._statCapNotice( MELEE_MISS_BASE[3], stats._melee[5], COMBAT_RATINGS[5][character._level-1] )
							+"</td></tr>";
					
					tmp += "</table>";
					html += Tools.addTr1(tmp);
					break;
				case 6:
					html += Tools.addTr1("<span class='tt_stat_title'>"+
							TextIO.sprintf1(
								locale['TT_StatTitle']['CritChance'],
								TextIO.formatFloat2(stats._melee[6]))+
							"</span>");
					html += Tools.addTr1(locale['TT_StatText']['ExtraDamage']);
					html += Tools.addTr1(TextIO.sprintf( locale['TT_StatText']['CritRating'], [
								Math.floor(stats._meleeCritRating[1]),
								TextIO.formatFloat2(stats._meleeCritRating[1]/COMBAT_RATINGS[8][character._level-1])
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
					var mhExt = EXPERTISE_TO_CHANCE * stats._melee[7][0],
						ohExt = stats._melee[7][1] == null ? null : EXPERTISE_TO_CHANCE * stats._melee[7][1],
						ratingPerCent = COMBAT_RATINGS[23][character._level-1] / EXPERTISE_TO_CHANCE;
					//
					html += Tools.addTr1(
						"<span class='tt_stat_title'>"+
						locale['CS_Stats'][group][index]+ 
						" " + 
						stats._melee[7][0] +
						( ohExt != null ? " / " + stats._melee[7][1] : "" ) +
						"</span>");
					
					
					html += Tools.addTr1(TextIO.sprintf1(
						locale['TT_StatText']['ReduceDodgeParry'],
						TextIO.formatFloat2(mhExt) + "%" + ( ohExt != null ? "/"+TextIO.formatFloat2(ohExt)+"%" : "" )
					));
					html += Tools.addTr1(TextIO.sprintf(
						locale['TT_StatText']['ExpertiseRating'], [
						                                           Math.floor(stats._expertiseRating[1]),
						                                           Math.floor(stats._expertiseRating[1]/COMBAT_RATINGS[23][character._level-1])
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
					tmp += this._levelChanceRows( character._level, ENEMY_DODGE, mhExt, ohExt );
					//
					tmp += "<tr><td colspan='2'>"+
							this._statCapNotice( ENEMY_DODGE[3], mhExt, ratingPerCent )
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
					tmp += this._levelChanceRows( character._level, ENEMY_PARRY, mhExt, ohExt );
					//
					tmp += "<tr><td colspan='2'>"+
					this._statCapNotice( ENEMY_PARRY[3], mhExt, ratingPerCent )
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
							TextIO.formatFloat2(stats._melee[8])
					)+"</span>");
					html += Tools.addTr1(TextIO.sprintf(
						locale['TT_StatText']['MasteryRating'], [
						                                         Math.floor(stats._masteryRating),
						                                         TextIO.formatFloat2(stats._masteryRating/COMBAT_RATINGS[25][character._level-1])
						                                        ]
					));
					break;
				}
				break;
			case 3: 
				switch(index) {
				case 0:
					html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['MainHand']+"</span>");
					html += Tools.addTr2(locale['TT_StatText']['AttackSpeed'],TextIO.formatFloat2(stats._raSpeed/1000));
					html += Tools.addTr2(locale['TT_StatText']['Damage'],Math.floor(stats._raMinDmg) + " - " +Math.ceil(stats._raMaxDmg) );
					html += Tools.addTr2(locale['TT_StatText']['DamagePerSecond'],TextIO.formatFloat1(stats._raDps));
					break;
				case 1:
					html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['Dps']+"</span>");
					break;
				case 2:
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['RangedAp'],Math.floor(stats._rangedAttackPower))+"</span>");
					html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['IncreasesRangedDamage'],TextIO.formatFloat1(stats._rangedAttackPower/14)));
					break;
				case 3:
					html += Tools.addTr1( "<span class='tt_stat_title'>"+
								TextIO.sprintf1( locale['TT_StatTitle']['AttackSpeed'], TextIO.formatFloat2(stats._ranged[3]/1000))+
								"</span>");
					break;
				case 4:
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['Haste'],TextIO.formatFloat2(stats._ranged[4]))+"</span>");
					html += Tools.addTr1(locale['TT_StatText']['IncreasesAttackSpeedAndFocus']);
					html += Tools.addTr1(
								TextIO.sprintf(locale['TT_StatText']['IncreasesHaste'], [
									stats._rangedHasteRating,
									TextIO.formatFloat2(stats._rangedHasteRating/COMBAT_RATINGS[18][character._level-1])
							]));
					break;
				case 5:
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['HitChance'],TextIO.formatFloat2(stats._ranged[5]))+"</span>");
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['HitRating'], [
									Math.floor(stats._rangedHitRating),
									TextIO.formatFloat2(stats._rangedHitRating/COMBAT_RATINGS[6][character._level-1])
							]));
					tmp = "<table class='tt_miss_table' cellpadding='0' cellspacing='0'><colgroup><col width='50%' /><col width='50%' /></colgroup>" +
					  "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_MissChance']+"</td></tr>";
					for( i=0; i<4; i++ ) {
						tmp += "<tr><td class='tt_miss_level'>"+(character._level+i)+"</td><td class='tt_miss'>"+TextIO.formatFloat2(Math.max(0, RANGED_MISS_BASE[i]-stats._ranged[5]))+"%</td></tr>";
					}

					tmp += "<tr><td colspan='2'>"+
							this._statCapNotice( RANGED_MISS_BASE[3], stats._ranged[5], COMBAT_RATINGS[6][character._level-1] )
							+"</td></tr>";
					
					tmp += "</table>";
					html += Tools.addTr1(tmp);
					break;
				case 6:
					html += Tools.addTr1( "<span class='tt_stat_title'>"+
								TextIO.sprintf1(
									locale['TT_StatTitle']['CritChance'],
									TextIO.formatFloat2(stats._ranged[6]))+
								"</span>");
					html += Tools.addTr1(locale['TT_StatText']['ExtraDamage']);
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['CritRating'], [
									Math.floor(stats._rangedCritRating),
									TextIO.formatFloat2(stats._rangedCritRating/COMBAT_RATINGS[9][character._level-1])
								]));
					break;
				case 7:
					html += Tools.addTr1( "<span class='tt_stat_title'>"+
								TextIO.sprintf1(
									locale['TT_StatTitle']['Mastery'],
									TextIO.formatFloat2(stats._ranged[7]))+
								"</span>");
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['MasteryRating'], [
									Math.floor(stats._masteryRating),
									TextIO.formatFloat2(stats._masteryRating/COMBAT_RATINGS[25][character._level-1])
								]));
					break;
				}
				break;
			case 4:
				switch(index) {
				case 0:
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1( locale['TT_StatTitle']['SpellPower'], Math.floor(stats._spell[0]))+"</span>");
					html += Tools.addTr1(locale['TT_StatText']['IncreasesDamageAndHealing']);
					break;
				case 1:
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['Haste'],TextIO.formatFloat2(stats._spell[1]))+"</span>");
					html += Tools.addTr1(locale['TT_StatText']['IncreasesSpellCasting']);
					html += Tools.addTr1(
							TextIO.sprintf( locale['TT_StatText']['IncreasesHaste'], [
								stats._spellHasteRating,
								TextIO.formatFloat2(stats._spellHasteRating/COMBAT_RATINGS[19][character._level-1])
							]));
					break;

				case 2:
					html += Tools.addTr1("<span class='tt_stat_title'>"+TextIO.sprintf1(locale['TT_StatTitle']['HitChance'],TextIO.formatFloat2(stats._spell[2]))+"</span>");
					html += Tools.addTr1(
								TextIO.sprintf(locale['TT_StatText']['HitRating'], [
									Math.floor(stats._spellHitRating),
									TextIO.formatFloat2(stats._spellHitRating/COMBAT_RATINGS[7][character._level-1])
							]));
					tmp = "<table class='tt_miss_table' cellpadding='0' cellspacing='0'><colgroup><col width='50%' /><col width='50%' /></colgroup>" +
					  "<tr><td class='tt_miss_title_l'>"+locale['TT_TargetLevel']+"</td><td class='tt_miss_title_r'>"+locale['TT_MissChance']+"</td></tr>";
					for( i=0; i<4; i++ ) {
						tmp += "<tr><td class='tt_miss_level'>"+(character._level+i)+"</td><td class='tt_miss'>"+TextIO.formatFloat2(Math.max(0, SPELL_MISS_BASE[i]-stats._spell[2]))+"%</td></tr>";
					}
					tmp += "<tr><td colspan='2'>"+
							this._statCapNotice( SPELL_MISS_BASE[3], stats._spell[2], COMBAT_RATINGS[7][character._level-1] )
							+"</td></tr>";
					tmp += "</table>";
					html += Tools.addTr1(tmp);
					break;
				case 4:
					html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['ManaRegen']+"</span>");
					html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['ManaRegen'],Math.floor(stats._spell[4])));
					break;
				case 5:
					html += Tools.addTr1("<span class='tt_stat_title'>"+locale['TT_StatTitle']['CombatRegen']+"</span>");
					html += Tools.addTr1(TextIO.sprintf1(locale['TT_StatText']['CombatRegen'],Math.floor(stats._spell[5])));
					break;
				case 6:
					html += Tools.addTr1( "<span class='tt_stat_title'>"+
								TextIO.sprintf1( locale['TT_StatTitle']['CritChance'], TextIO.formatFloat2(stats._spell[6]))+
								"</span>");
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['CritRating'], [
								    Math.floor(stats._spellCritRating),
									TextIO.formatFloat2(stats._spellCritRating/COMBAT_RATINGS[10][character._level-1])
							]));
					break;
				case 7:
					html += Tools.addTr1( "<span class='tt_stat_title'>"+
								TextIO.sprintf1( locale['TT_StatTitle']['Mastery'], TextIO.formatFloat2(stats._spell[7]))+
								"</span>");
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['MasteryRating'], [
                                	Math.floor(stats._masteryRating),
                                	TextIO.formatFloat2(stats._masteryRating/COMBAT_RATINGS[25][character._level-1])
                                ]));
					break;
				}
				break;
			case 5:
				html += Tools.addTr1(
					"<span class='tt_stat_title'>"+
					TextIO.sprintf1(
							locale['TT_StatTitle_Defense'][index],
							( index == 4 || index == 0 ? stats._defense[index] : TextIO.formatFloat2(stats._defense[index])) 
					) +
					"</span>"
				);
				
				switch(index) {
				case 0:
					html += Tools.addTr1( 
								TextIO.sprintf1( 
									locale['TT_StatText']['ReducesPhysical'],
									TextIO.formatFloat2(stats.getReductionFromArmor(character._level)*100)
								));
					break;
				case 1:
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['DodgeRating'], [
									stats._ratings[2],
									TextIO.formatFloat2(stats._ratings[2]/COMBAT_RATINGS[2][character._level-1])
								]));
					break;
				case 2:
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['ParryRating'], [
									stats._parryRating,
									TextIO.formatFloat2(stats._parryRating/COMBAT_RATINGS[3][character._level-1])
								]));
					break;
				case 3:
					html += Tools.addTr1(
								TextIO.sprintf( locale['TT_StatText']['BlockRating'], [
									stats._ratings[4],
									TextIO.formatFloat2(stats._ratings[4]/COMBAT_RATINGS[4][character._level-1])
								]));
					break;
				case 4:
					html += Tools.addTr1( 
								TextIO.sprintf1( locale['TT_StatText']['Resilience'],
									TextIO.formatFloat2(stats._resilienceDamageReduction*100)
								));
					break;
				}
				break;
			case 6:
				html += Tools.addTr1( "<span class='tt_stat_title'>"+
							TextIO.sprintf1 ( locale['TT_ResistanceTitle'][index], stats._resistance[index]) +
							"</span>");
				html += Tools.addTr1(TextIO.sprintf1( locale['TT_Resistance'][index], 0 ));
				break;
		}
		
		showTooltip(html+"</table>");
		var pos = getPosition(caller);
		m_tooltipDiv.style.left = (pos[0] + pos[2]) + "px";
		m_tooltipDiv.style.top = pos[1] + "px";
		
		if( m_tooltipDiv.offsetWidth > 300 ) {
			setTooltipSize(300);
		}
	};
	
	this.hide = function(){
		m_requestedItemId = null;
		//m_requestedEnchantId = null;
		m_requestedSpellId = null;
		if(m_tooltipDiv != null){
			m_tooltipDiv.style.display = "none";
		}
	};
	
	this.hidePreview = function() {
		this.hide();
		Engine._currentCharacter.removePreview();
	};
	
	this.showItemSource = function(source){
		showTooltip(source);
		this.move();
	};
	
	this.showBuff = function(str)
	{
		var descArray = Engine.parse(str);
		var desc = "";
		for(var j = 0 ; j < descArray.length ; j++)
		{
			if(j)
			{
			desc += "<br/>";
			}
			desc += descArray[j];
		}	
		showTooltip("<div class='tooltip_buff'>"+desc+"</div>");
		this.move();
	};
	
	this.showShape = function(str)
	{
		showTooltip("<div class='tooltip_shape'>"+TextIO.parse(str,Engine._currentCharacter).join('<br/>')+"</div>");
		this.move();
	};
	
	this.showText = function(str)
	{
		showTooltip(str);
		this.move();
	};
}
/**
 * @param {number} miss
 * @param {number} hit
 * @param {number} rating
 * @returns {string}
 */
CTooltip.prototype._statCapNotice = function( miss, hit, rating ) {
	var hitRating = Math.floor((miss - hit ) * rating );
	if( hitRating != 0 ) {
		if( hitRating > 0 ) {
			return "<div class='tt_hit_cap'>" + TextIO.sprintf1( locale['TillCap'], hitRating ) + "</div>";
		}
		return "<div class='tt_hit_cap'>" + TextIO.sprintf1( locale['OverCap'], Math.abs( hitRating )) + "</div>";
	}
	return "";
};

CTooltip.prototype._levelChanceRows = function( lvl, arr, statMH, statOH ) {
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
};

CTooltip.prototype.fixSize = function(node, size) {
	size = size ? size : TT_MAX_SIZE;
	node.style.width = node.firstChild.offsetWidth + "px";
	if( node.offsetWidth > size )
	{
		node.style.whiteSpace = "normal";
		node.style.width = size+"px";
		if( node.firstChild.offsetWidth > size )
		{
			node.style.width = node.firstChild.offsetWidth + "px";
		}
	}
};

/** @type {Element} */
CTooltip.prototype._overlay = null;
CTooltip.prototype._disabled = false;
CTooltip.prototype._errorShown = false;
CTooltip.prototype._errorNode = null;
CTooltip.prototype._onUserReEnableCallback = null;

CTooltip.prototype.disable = function() {
	if( this._overlay == null ) {
		this._overlay = document.getElementById("tt_overlay");
	}
	var size = Chardev.windowSize();
	this._overlay.style.width = Math.max( size[0], document.body.scrollWidth) + "px";
	this._overlay.style.height = Math.max( size[1], document.body.scrollHeight) + "px";
	this._overlay.style.display = "block";
	this._disabled = true;
	this._overlay.onclick = null;
};

CTooltip.prototype.disableWithUserReEnableCallback = function( handler ) {
	this.disable();
	this._onUserReEnableCallback = handler;
};

CTooltip.prototype.enable = function() {
	Tools.removeChilds(this._overlay);
	this._overlay.style.display = "none";
	this._disabled = false;
	this._errorShown = false;
};

CTooltip.prototype.center = function( node ) {
	var hNode = node.scrollHeight;
	var wNode = node.scrollWidth;
	var size = Chardev.windowSize();
	var lBody = document.body.scrollLeft;
	var tBody = document.body.scrollTop;
	
	/*
	if( hNode > size[1] ) {
		node.style.height = size[1] + "px";
		node.style.width = wNode*size[1]/hNode + "px";
	}
	if( wNode > size[0] ) {
		node.style.width = size[0] + "px";
		node.style.height = hNode*size[0]/wNode + "px";
	}
	*/
	
	node.style.marginLeft = Math.max(0, lBody + ((size[0] - wNode) >> 1) ) + "px";
	node.style.marginTop = Math.max(0, tBody + ((size[1] - hNode ) >> 1) ) + "px";
};

CTooltip.prototype.showDisabled = function( node ) {
	this.disable();
	Tools.setChild(this._overlay,node);
	this.center(node);
};

CTooltip.prototype.showError = function( str ) {
	
	var e = "<span class=\"tt_error_msg\">"+str+"</span>";
	
	if( this._errorShown ) {
		this._errorNode.innerHTML = e + "<br />" + this._errorNode.innerHTML;
	}
	else {
		this._errorShown = true;
		this._errorNode.innerHTML = e + "<br /><span class=\"tt_close_notice\">Left click or hit escape to continue.</span>";
	}
	
	this.showDisabled(this._errorNode);
	this._overlay.onclick = function(){Tooltip.enable();};
};

CTooltip.prototype.showHTML = function( str ) {
	var p = document.createElement("div");
	p.innerHTML = "<span class=\"tt_msg\">"+str+"</span><br/><span class=\"tt_close_notice\">Left click or hit escape to continue.</span>";
	p.className = "tt_msg_c";
	this.showDisabled(p);
	this._overlay.onclick = function(){Tooltip.enable();};
};


CTooltip.prototype.showLoading = function() {
	var n = document.createElement("div");
	n.className = 'tt_loading';
	n.innerHTML = "Loading";
	this.showDisabled(n);
};

CTooltip.prototype._progressNode = null; 
CTooltip.prototype.showProgress = function( p ) {
	if( this._progressNode == null ) {
		this._progressNode = document.createElement("div");
		this._progressNode.className = 'tt_loading';
		this._progressNode.innerHTML = TextIO.formatFloat1(p)+"%";
	}
	this.showDisabled( this._progressNode );
};

CTooltip.prototype.updateProgress = function( p ) {
	if( this._progressNode != null ) {
		this._progressNode.innerHTML = TextIO.formatFloat1(p)+"%";
	}
};


CTooltip.prototype.handleKeyDown = function( event ) {
	if( event.keyCode == 27 && this._disabled ) {
		this.enable();
	}
};

var Tooltip = new CTooltip();
function tooltip_init () {
	window["g_moveTooltip"] = function(){Tooltip.move();};
	window["g_hideTooltip"] = function(){Tooltip.hide();};
	window["g_showItemWithoutPreview"] = function(i){Tooltip.showItemWithoutPreview(i);};
	window["g_showItemBySlot"] = function(s){Tooltip.showItemBySlot(s);};
	window["g_showErrorTooltip"] = function(e){Tooltip.showError(e);};
	window["g_showHTMLTooltip"] = function(h){Tooltip.showHTML(h);};
	window["g_enable"] = function(){Tooltip.enable();};
	window["g_disable"] = function(){Tooltip.disable();};
	window["g_loading"] = function(){Tooltip.showLoading();};
}

window["__tooltip_init"] = function(){tooltip_init();};
