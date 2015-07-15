/**
 * @constructor
 */
function Overview() {
	this.node = DOM.create('div', { 'class': 'ov_p' });
	this.stats = [];
}

Overview.prototype = {
	node: null,
	commentsContainer: null,
	commentsParent: null,
	commentsPage: null,
	commentsForm: null,
	commentsFormLoading: null,
	newCommentTextArea: null,
	stats: [],
	/**
	 * @param {CharacterFacade} character
	 */
	update: function( character ) {
		var hrd, span, gear, gearContainer, itmParent, i, j;
		var statHandler = new Handler( function( e ) {
			if( e.is('stat_tooltip_show') ) {
				Tooltip.showStat( character.getStatTooltip(e.get('group'), e.get('index')), e.get('node') );
			}
			else if( e.is('stat_tooltip_hide')) {
				Tooltip.hide();
			}
		}, this);
		
		DOM.truncate(this.node);
		
		hrd = DOM.createAt( this.node, 'div', {'class': 'ov_header'} );
		DOM.createAt( hrd, 'span', { 'class': 'ov_name', 'text': character.name ? character.name + ',' : ''});
		DOM.createAt( hrd, 'span', { 'class': 'ov_level', 'text': "Level " + character.level});
		
		if( character.getCharacterRaceId() > 0 ) {
			
			DOM.createAt( hrd, 'span', { 'class': 'ov_character_race', 'text': locale['CharacterRace'][character.getCharacterRaceId()]});
			
			if( character.getCharacterClassId() > 0 ) {

				span = DOM.createAt( hrd, 'span', { 'class': 'ov_character_class', 'text': locale['CharacterClass'][character.getCharacterClassId()]});
				
				DOM.addClass(span,'character_class_'+character.getCharacterClassId());
				
				if( character.getCharacterClassId() == PRIEST ) {
					DOM.addClass(span,'character_class_5_white_bg_fix');
				}
				else if( character.getCharacterClassId() == ROGUE ) {
					DOM.addClass(span,'character_class_4_white_bg_fix');
				}
			}
		}
		
		gearContainer = DOM.createAt( this.node, 'div', {'class': 'ov_gear_container'});
		DOM.createAt( gearContainer, 'div', {'class': 'ov_title', 'text': 'Gear'});
		gear = DOM.createAt( gearContainer, 'div', {'class': 'ov_items_p'});
		
		for ( i=0; i<character.items.length; i++ ) {
			itmParent = DOM.createAt(gear, 'div', { 'class': 'ov_item_p row_bg'+(i%2+1)});
			this.__addItem( itmParent, character, i );
		}
		
		var statContainer = DOM.createAt( this.node, 'div', {'class' : 'ov_stats_container'});
		DOM.createAt( statContainer, 'div', {'class': 'ov_title', 'text': 'Stats'} )
		
		this.statCollapsables = [];
		
		for( i=0; i<locale['CS_StatGroups'].length; i++ ) {
			this.statCollapsables[i] = new Collapsable();  
			if( i != 6 ) {
				this.statCollapsables[i].toggle();
			}
			this.stats[i] = [];
			for( j=0; j<locale['CS_Stats'][i].length; j++ ) {
				var stat = new Stat(i,j);
				stat.eventMgr.addObserver(new GenericObserver(['stat_tooltip_show','stat_tooltip_hide'], statHandler));
				this.stats[i][j] = stat;
				this.statCollapsables[i].content.appendChild(this.stats[i][j].node);
			}
			this.statCollapsables[i].node.className = 'cs_st_p';
			this.statCollapsables[i].content.className = 'ov_st_c';
			
			var div = DOM.createAt( this.statCollapsables[i].header, 'div', {'class': 'stat_title_p'} );
			DOM.createAt( div, 'a', {'class': 'stat_title', 'text': locale['CS_StatGroups'][i], 'href': 'javascript:'} );
			
			statContainer.appendChild(this.statCollapsables[i].node);
		}
		
		if( g_settings.profile["ProfileInfo"] && g_settings.profile["ProfileInfo"]["ID"] > 0 ) {
			this.commentsParent = DOM.createAt( this.node, 'div', {'class': 'ov_comments_p'});
			DOM.createAt( this.commentsParent, 'div', {'class': 'ov_title', 'text': 'Comments:'});
			this.commentsContainer = DOM.createAt( this.commentsParent, 'div', {'class':'ov_comments_c'});
			this.commentsPage = DOM.createAt( this.commentsParent, 'div', {'class': 'co_page'});
			
			if( g_settings.userId ) {
				DOM.createAt( this.commentsParent, 'div', {'text': 'Add a comment:', 'class': 'co_add_note'});
				this.commentsForm = DOM.createAt( this.commentsParent, 'form', {'action': 'javascript:'});
				this.newCommentTextArea = DOM.createAt( this.commentsForm, 'textarea', {'class': 'textarea co_textarea'});
				var input = DOM.createAt( this.commentsForm, 'input', {'type': 'submit', 'value': 'Post Comment'});
				ChardevHTML.buttonLightStyleFor(input);
				
				Listener.add( this.commentsForm, 'submit', this.__onComment, this, []);
				
				this.commentsFormLoading = DOM.createAt( this.commentsParent, 'div', {'class': 'co_bar_loading'});
			}
			
			this.__refreshComments(1);
		}
		
		this.__updateStats(character.getStats(), character.getCharacterClassId(), character.getShapeform());
		
		DOM.clear( this.node );

		var refSummary = new ReforgeSummary();
		refSummary.update(character);
		DOM.append(this.node,refSummary.node);
	},
	__showCommentsLoading: function() {
		DOM.truncate( this.commentsContainer);
		DOM.truncate( this.commentsPage);
		DOM.createAt( this.commentsContainer, 'div', {'class':'loading', 'text': '&nbsp;' });
	},
	__refreshComments: function( page ) {
		this.__showCommentsLoading();
		Ajax.request('api/comments.php?page='+page+'&profile='+g_settings.profile["ProfileInfo"]["ID"], new Handler(this.__commentsCallback, this), []);
	},
	__onComment: function() {
		var c = DOM.getValue(this.newCommentTextArea);
		if( c.length == 0 || (/^\s+$/).exec(c) ) {
			Tooltip.showError("The comment is empty!");
			return;
		}
		else if( c.length < 5 ) {
			Tooltip.showError("The comment is too short!");
			return;
		}
		
		this.commentsForm.style.display = 'none';
		this.commentsFormLoading.style.display = 'block';
		
		Ajax.post('api/comments.php', {'content': c, 'profile': g_settings.profile["ProfileInfo"]["ID"]}, new Handler(this.__onCommentCallback, this), []);
	},
	__onCommentCallback: function( response) {
		try {
			Ajax.getResponseObject(response);
			this.__refreshComments(1);
			this.newCommentTextArea.value = "";
		}
		catch( e ) {
			Tooltip.showError(e);
		}
		this.commentsForm.style.display = 'block';
		this.commentsFormLoading.style.display = 'none';
	},
	__commentsCallback: function( response ) {
		try {
			var obj = Ajax.getResponseObject(response);
			var cs = obj["comments"];
			var page = obj["page"];
			var pageCount = obj["page_count"];
			
			DOM.truncate(this.commentsContainer);
			
			var commentCount = cs.length;
			if( page == pageCount ) {
				// do not show the oldest comment, as it is the generated
				// initial post of the thread
				commentCount -= 1;
			}
			
			if( commentCount > 0 ) {
				for( var i=0; i<commentCount; i++ ) {
					var div = DOM.createAt( this.commentsContainer, 'div', {'class': 'co_c row_bg'+(1+i%2)});
					DOM.createAt( div, 'div', {'class': 'co_header', 'text': cs[i]['UserName']+", <span class='co_time'>"+cs[i]['Created']+"</span>"});
					DOM.createAt( div,	'div', {'class': 'co_content', 'text': cs[i]['Content']});
				}
				
				DOM.truncate(this.commentsPage);
				
				if( page > 1 ) {
					var prev = DOM.createAt(this.commentsPage, 'a', {'href': 'javascript:;', 'class': 'co_link_page', 'text': '« Newer'});
					Listener.addHandler(prev, 'click', new Handler( function() {
						this.__refreshComments(page - 1);
					}, this), []);
				}
				
				DOM.createAt(this.commentsPage, 'span', {'href': 'javascript:;', 'class': 'co_cur_page', 'text': page+' of '+pageCount});
				
				if( page < pageCount ) {
					var next = DOM.createAt(this.commentsPage, 'a', {'href': 'javascript:;', 'class': 'co_link_page', 'text': 'Older »'});
					Listener.addHandler(next, 'click', new Handler( function() {
						this.__refreshComments(page + 1);
					}, this), []);
				}
			}
			else {
				div = DOM.createAt( this.commentsContainer, 'div', {'class': 'co_none', 'text': 'No comments!'});
			}
		}
		catch( e ) {
			Tooltip.showError(e);
		}
	},
	/**
	 * @param node
	 * @param {CharacterFacade} character
	 * @param {number} slot
	 */
	__addItem: function( node, character, slot ) {
		var a, gemParent, gemsParent, itm = character.items[slot], div;
		if( itm ) {

			DOM.createAt( node, 'span', {'class': 'ov_slot_name', 'text': locale['Slots'][slot]+":"} );
			div = DOM.createAt( node, 'div', {'class': 'ov_item_info_p'});
			DOM.createAt( div, 'img', {'src': '/images/icons/small/'+itm.icon+'.png', 'class': 'ov_item_icon'});
			a = DOM.createAt( div, 'a', {'href': 'javascript:', 'class': 'ov_item_link item_quality_' + itm.quality, 'text': itm.name});
			ChardevHTML.addTooltip( a, itm.getTooltip() );
			
			gemsParent = DOM.createAt( div, 'div', {'class':'ov_gems_p'});
			for( var i=0; i<3; i++ ) {
				var gem = itm.getGem(i);
				if( gem != null ) {
					gemParent = DOM.createAt( gemsParent, 'div', {'class':'ov_gem_p'} );
					DOM.createAt( gemParent, 'img', {'src': '/images/icons/gem/'+gem.icon+'.png', 'class': 'ov_gem_icon'});
					a = DOM.createAt( gemParent, 'a', {'href': 'javascript:', 'class': 'ov_gem_link item_quality_' + gem.quality, 'text': gem.name});
					ChardevHTML.addTooltip( a, gem.getTooltip() );
				}
			}
		}
		else {
			DOM.createAt( node, 'span', {'class': 'ov_slot_name', 'text': locale['Slots'][slot]+": Nothing equipped"} );
		}
	},
	__updateStats: function( stats, characterClassId, shapeform ) {
		var i;

		this.stats[Stat.GRP_GENERAL][1].node.style.display = 
			characterClassId > 0 && GameInfo.hasMana( characterClassId, shapeform ) ? "block" : "none";
		this.stats[Stat.GRP_GENERAL][2].node.style.display = 
			characterClassId > 0 && GameInfo.hasRage( characterClassId, shapeform ) ? "block" : "none";
		this.stats[Stat.GRP_GENERAL][3].node.style.display = 
			characterClassId > 0 && GameInfo.hasEnergy( characterClassId, shapeform ) ? "block" : "none";
		this.stats[Stat.GRP_GENERAL][4].node.style.display = 
			characterClassId > 0 && GameInfo.hasFocus( characterClassId, shapeform ) ? "block" : "none";
		this.stats[Stat.GRP_GENERAL][5].node.style.display = 
			characterClassId > 0 && GameInfo.hasRunicPower( characterClassId, shapeform ) ? "block" : "none";
		
		for( i=0; i<this.stats[Stat.GRP_GENERAL].length; i++ ) {
			this.stats[Stat.GRP_GENERAL][i].setValue( stats.general[i] );
		}
		for( i=0; i<this.stats[Stat.GRP_ATTRIBUTES].length; i++ ) {
			this.stats[Stat.GRP_ATTRIBUTES][i].setValue( stats.attributes[i] );
		}
		for( i=0; i<this.stats[Stat.GRP_RESISTANCE].length; i++ ) {
			this.stats[Stat.GRP_RESISTANCE][i].setValue( stats.resistance[i] );
		}
		for( i=0; i<this.stats[Stat.GRP_SPELL].length; i++ ) {
			this.stats[Stat.GRP_SPELL][i].setValue( stats.spell[i] );
		}
		for( i=0; i<this.stats[Stat.GRP_DEFENSE].length; i++ ) {
			this.stats[Stat.GRP_DEFENSE][i].setValue( stats.defense[i] );
		}
		for( i=0; i<this.stats[Stat.GRP_MELEE].length; i++ ) {
			this.stats[Stat.GRP_MELEE][i].setValue( stats.melee[i] );
		}
		for( i=0; i<this.stats[Stat.GRP_RANGED].length; i++ ) {
			this.stats[Stat.GRP_RANGED][i].setValue( stats.ranged[i] );
		}
	}
};