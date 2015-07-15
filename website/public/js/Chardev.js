var Chardev = {
		checkTopic : function (_id){
			var title = Dom.getValue('topic_title');
			var content = Dom.getValue('topic_content');
			var type = Dom.getValue('thread_type');
			
			if(title.length<2){
				Tooltip.showError("The title of your post is too short!");
				return;
			}
			if(content.length<2){
				Tooltip.showError("The content of your topic is too short!");
				return;
			}
			document.getElementById('topic_submit').disabled = true;
			
			Tooltip.showLoading();
			
			Ajax.post(
				'/api/forum.php', {
					'action': 'new_thread',
					'hook': _id,
					'title': title,
					'type': type ? type : 'thread',
					'content': content
				}, 
				new Handler(Chardev.__checkTopic_callback, Chardev), 
				null
			);
		},

		__checkTopic_callback : function ( request ) {
			try {
				Ajax.getResponseObject(request);
			}
			catch( e ) {
				Tooltip.showError(e);
				document.getElementById('topic_submit').disabled = false;
			}
		},

		deleteThread : function ( threadId ){
			if( confirm("Are you sure you want to delete this thread?") ) {
				Tooltip.showLoading();
				Ajax.post(
					'/api/forum.php', {
						'action': 'delete_thread',
						'thread': threadId
					},
					new Handler(Chardev.__deleteThread_callback, Chardev),
					null
				);
			}
		},
		
		__deleteThread_callback : function ( request ) {		
			try {
				var obj = Ajax.getResponseObject(request);
				window.location.href = Tools.getBasePath() + obj;
			}
			catch( e ) {
				Tooltip.showError(e);
			}
		},
		lockThread : function ( threadId ){
			Tooltip.showLoading();
			Ajax.post(
				'/api/forum.php', {
					'action': 'lock_thread',
					'thread': threadId
				},
				new Handler(Chardev.__lockThread_callback, Chardev),
				null
			);
		},
		unlockThread : function ( threadId ){
			Tooltip.showLoading();
			Ajax.post(
				'/api/forum.php', {
					'action': 'unlock_thread',
					'thread': threadId
				},
				new Handler(Chardev.__lockThread_callback, Chardev),
				null
			);
		},
		__lockThread_callback : function ( request ) {
			try {
				Ajax.getResponseObject(request);
				window.location.reload(true);
			}
			catch( e ) {
				Tooltip.showError(e);
			}
		},

		checkReply : function (_tid,_posts){
			var content = document.getElementById('reply_content').value;
			
			if(content.length<2){
				Tooltip.showError("The content of your post is too short!");
				return;
			}
			document.getElementById('reply_submit').disabled = true;
			
			Tooltip.showLoading();
			
			Ajax.post(
				'/api/forum.php', {
					'action': 'reply',
					'thread': _tid,
					'content': content
				}, 
				new Handler(Chardev.__checkReply_callback, Chardev), 
				null
			);
		},

		__checkReply_callback : function ( request, _tid,_posts ) {
			try {
				Ajax.getResponseObject(request);
			}
			catch( e ) {
				Tooltip.showError(e);
				document.getElementById('reply_submit').disabled = false;
			}
		},

		checkEdit : function (_id){
			var content = document.getElementById('edit_content').value;

			if(content.length<2){
				Tooltip.showError("The content of your post is too short!");
				return;
			}
			document.getElementById('edit_submit').disabled = true;
			
			Tooltip.showLoading();
			
			Ajax.post(
				'/api/forum.php', {
					'action': 'edit',
					'post': _id,
					'content': content
				}, 
				new Handler(Chardev.__checkEdit_callback, Chardev), 
				null
			);
		},

		__checkEdit_callback : function( request ) {
			try {
				Ajax.getResponseObject(request);
			}
			catch( e ) {
				Tooltip.showError(e);
				document.getElementById('edit_submit').disabled = false;
			}
		},
		showUserInformation: function( userId, userData, profiles ) {
			if( userData ) {
				new UserInformationImpl( userId, userData, 'user_information_parent' );
			}
			else if( profiles ) {
				var pa = new ProfilesAdapter();
				pa.profileList.gui.showFilter(false);
				pa.profileList.filterMgr.hideFilter('ismine', true);
				pa.profileList.set("ismine.eq.1;", null, null, 1);
				pa.profileList.update();
				Dom.set('ui_profiles_parent',  pa.getNode());
			}
		},
		createAvatarPicker: function( parentId, currentAvatar ) {
			new AvatarPicker(parentId, currentAvatar);
		},
		staticSpellList: function( serialized, page, argString, parent, staticLink ) {
			//TODO Impl spell list 
		},
		staticItemList: function( serialized, page, argString, parent, staticLink ) {
			if( serialized ) {
				
				var il = new ItemList();

				il.setStaticLink(staticLink);
				
				il.setData( serialized );
				
				if( argString ) {
				
					il.set(argString, "", "", page);
					
					il.gui.showFilter( true );
				}
				
				document.getElementById(parent).appendChild(il.gui.node);
				
				var ilHandler = new Handler(function( e ){
					if( e.is('show_tooltip') ) {
						Chardev.showItemTooltip(e.get('entity').id);
					}
					else if( e.is('move_tooltip') ) {
						Tooltip.move();
					}
					else if( e.is('hide_tooltip') ) {
						Tooltip.hide();
					}
					else if( e.is('update') ) {
						var form = Dom.create('form', {'method': 'GET', 'action': ''});
						Dom.createAt(form,'input', {'name': 'a', 'value': il.getArgumentString().replace(/\;/g,"_")});
						Dom.createAt(form,'input', {'name': 'p', 'value': il.page});
						Dom.createAt(form,'input', {'name': 'o', 'value': il.order+"."+(il.orderDirection==List.ORDER_ASC?'asc':'desc')+"_" });
						form.submit();
					}
				}, this);
				
				var ilObserver = new GenericObserver([
					'show_tooltip',
					'move_tooltip',
					'hide_tooltip',
					'update'
				], ilHandler);
				
				il.addObserver(ilObserver);
			}
		},
		addItemTooltipTo: function( serialized, ttParent, iconParent ) {
			if(serialized) {
				var itm = new Item(serialized);
	
				Chardev._addTooltipTo( ItemTooltip.getHtml(itm, null), itm.icon, ttParent, iconParent);
			}
		},
		addSpellTooltipTo: function( serialized, ttParent, iconParent ) {
			if(serialized) {
				var spell = new Spell(serialized);
//				var c = new Character(); 
//				c.setLevel(90);
				Chardev._addTooltipTo( SpellTooltip.getHtml(spell, null), spell.icon, ttParent, iconParent);
			}
		},
		_addTooltipTo: function( html, icon, ttParent, iconParent)  {
			var tt = new TooltipImpl(); 

			Dom.truncate(ttParent);

			tt.setParent(Dom.get(ttParent));
			tt.show(html);
			tt.div.style.position = "relative";
			
			var img = document.createElement('img');
			img.className = 'dbi_icon';
			img.src = '/images/icons/large/' + icon + '.png';
			Dom.set(iconParent, img);
            Dom.createAt(ttParent, "span", {});
		},
		changePassword: function() {
			var password = $('[name=change_new_password]').val();
			var userId = $('[name=change_user_id]').val();
			Tooltip.showLoading();
			
			Ajax2.post( '/api/user.php', { "UserId": userId, "Password": password}, function( obj ) {
				try {
					obj.get();
					Tooltip.enable();
					$('#ui_pc_p').empty().append($("<div />",{ 'class': 'fm_note', 'text': 'Password successfully changed!' }));
				}
				catch( e ) {
					Tooltip.showError(e);
				}
			}, null);
		},
		showTalents: function( serialized, nodeId, distribution ) {
			var talents = new Talents(serialized);
			var talentsGui = new TalentsInterface();
			var character = new Character();
			
			new TalentsAdapter( talents, talentsGui, character );
			
			if( distribution ) {
				talents.setDistribution(distribution);
			}
			
			$('#' + nodeId).empty().append(talentsGui.node);
		}
};
//
//
//	STATIC TOOLTIPS
//
//
(function(){
	/**
	 * @type {Object}
	 */
	var requestedTooltip = null;
	var eventMgr = new GenericSubject();
	
	eventMgr.registerEvent("login", ["user"]);
	eventMgr.registerEvent("logout", []);
	/**
	 * @param {Item} itm
	 */
	function itemHandler( itm ) {
			if( itm != null ) {
				if( requestedTooltip != null && requestedTooltip.item == itm.id ) {
					Tooltip.showMovable( ItemTooltip.getHtml( itm , null) );
					requestedTooltip = null;
				}
			}
	}
	/**
	 * @param {Spell} spell
	 */
	function spellHandler( spell ) {
		if( spell != null ) {
			if( requestedTooltip != null) if( requestedTooltip.spell == spell.id ) {
				Tooltip.showMovable( SpellTooltip.getHtml( spell , null));
				requestedTooltip = null;
			}
		}
	}
	/**
	 * @param {ResponseObject} obj
	 */
	function loginHandler(obj) {
		try {
			var user = new User(obj.get());
			
			Dom.get('ix_login_form').style.display = 'none';
			Dom.get('ix_logout_form').style.display = 'block';
			Dom.get('ix_self_link').innerHTML = user.name;
			Dom.get('ix_self_link').href = "?user=" + user.id;
			
			eventMgr.fire("login", { "user": user});
			
			Tooltip.enable();
		}
		catch( e ) {
			Tooltip.showError(e);
		}
	}
	/**
	 * @param {ResponseObject} obj
	 */
	function logoutHandler(obj) {
		try {
			obj.get();
			Dom.get('ix_login_form').style.display = 'block';
			Dom.get('ix_logout_form').style.display = 'none';
			
			eventMgr.fire("logout", {});
			
			Tooltip.enable();
		}
		catch( e ) {
			Tooltip.showError(e);
		}
	}
	
	Chardev.hideTooltip = function()  {
		requestedTooltip = null;
		Tooltip.hide();
	};
	
	Chardev.moveTooltip = function() {
		Tooltip.move();
	};
	/**
	 * @param {number} itemId
	 */
	Chardev.showItemTooltip = function( itemId ) {
		Tooltip.show("Loading item...");
		requestedTooltip = { item: itemId };
		ItemCache.asyncGet( itemId, new Handler(itemHandler, Chardev), [itemId]);
	};
	/**
	 * @param {number} spellId
	 */
	Chardev.showSpellTooltip = function( spellId ) {
		Tooltip.show("Loading spell...");
		requestedTooltip = { spell: spellId };
		SpellCache.asyncGet( spellId, new Handler(spellHandler, Chardev), [spellId]);
	};
	/**
	 * @param {GenericObserver} observer
	 */
	Chardev.addObserver = function(observer) {
		eventMgr.addObserver(observer);
	};
	/**
	 * @param {string} event
	 * @param {GenericSubject} propagator
	 */
	Chardev.addPropagator = function( event, propagator) {
		eventMgr.addPropagator( event, propagator);
	};
	
	Chardev.login = function() {
		var userName = Dom.getValue("login_user_name");
		var password = Dom.getValue("login_password");
		
		if(userName.length<4){
			Tooltip.showError("User name is too short");
			return;
		}
		if(password.length<4){
			Tooltip.showError("Password is too short");
			return;
		}
		
		Dom.get('login_password_md5').value = MD5(password);
		
		Tooltip.showLoading();
		Ajax2.post( "/api/user.php", {
				'UserName'	: document.getElementById('login_user_name').value,
				'Password'	: document.getElementById('login_password_md5').value,
				'Cookie'	: document.getElementById('login_cookie').checked
		}, loginHandler, Chardev );
	};
	
	Chardev.logout = function() {
		Tooltip.showLoading();
		Ajax2.post( "/api/user.php", {
				'Logout': true
		}, logoutHandler, Chardev );
	};
	
	Chardev.validateLogin = function() {
		//
		//TODO Validate login info 
		return true;
	};
})();

if( ! window['Chardev'] ) {
	window['Chardev'] = {
			'validateLogin': Chardev.validateLogin,
			'login': Chardev.login,
			'logout': Chardev.logout,
			'checkTopic': Chardev.checkTopic,
			'checkEdit': Chardev.checkEdit,
			'checkReply': Chardev.checkReply,
			'deleteThread': Chardev.deleteThread,
			'lockThread': Chardev.lockThread,
			'unlockThread': Chardev.unlockThread,
			'showUserInformation': Chardev.showUserInformation,
			'createAvatarPicker': Chardev.createAvatarPicker,
			'staticItemList': Chardev.staticItemList,
			'staticSpellList' : Chardev.staticSpellList,
			'addItemTooltipTo': Chardev.addItemTooltipTo,
			'addSpellTooltipTo': Chardev.addSpellTooltipTo,
			'changePassword': Chardev.changePassword,
			'showTalents': Chardev.showTalents,
			'showItemTooltip': Chardev.showItemTooltip,
			'showSpellTooltip': Chardev.showSpellTooltip,
			'hideTooltip': Chardev.hideTooltip,
			'moveTooltip': Chardev.moveTooltip
	};
}