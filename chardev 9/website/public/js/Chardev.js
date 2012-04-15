var Chardev = {
		validateLogin : function() {
			try {
				var userName = document.getElementById('login_user_name').value;
				var password = document.getElementById('login_password').value;
				
				if(userName.length<4){
					Tooltip.showError("User name is too short");
					return false;
				}
				if(password.length<4){
					Tooltip.showError("Password is too short");
					return false;
				}
				
				document.getElementById('login_password_md5').value = MD5(password);
				return true;
			}
			catch( e ) {
				Tools.rethrow(e);
				return false;
			}
		},

		login : function() {
			try {
				if( Chardev.validateLogin() ) {
					Tooltip.showLoading();
					Ajax.post( "api/user.php", {
							'UserName'	: document.getElementById('login_user_name').value,
							'Password'	: document.getElementById('login_password_md5').value,
							'Cookie'	: document.getElementById('login_cookie').checked
					}, new Handler( Chardev.__login_callback, Chardev ), null);
				}
			}
			catch(e) {
				Tooltip.showError (e);
			} 
		},
		
		__login_callback : function( response ) {
			try {
					var obj = Ajax.getResponseObject(response);
					g_settings.sessionId = obj["session_id"];
					g_settings.userId = obj["user_id"];
					g_settings.userData = obj["user_data"];
					document.getElementById('ix_login_form').style.display = 'none';
					document.getElementById('ix_logout_form').style.display = 'block';
					document.getElementById('ix_self_link').innerHTML = obj["user_name"];
					document.getElementById('ix_self_link').href = "?user=" + obj["user_id"];
					if( g_settings.isPlanner ) {
						Engine.loggedIn();
					}
					Tooltip.enable();
				}
				catch( e ) {
					Tooltip.showError(e);
				}
		},
		
		logout : function() {
			try {
				Tooltip.showLoading();
				Ajax.request(
					"php/interface/user/logout.php",
					new Handler( Chardev.__logout_callback, Chardev ),
					null
				);
			}
			catch(e) {
				Tooltip.showError(e);
			} 
		},
		
		__logout_callback : function( request ) {
			g_settings.sessionId = "";
			g_settings.userId = 0;
			g_settings.userName = "";
			g_settings.userData = null;
			document.getElementById('ix_login_form').style.display = 'block';
			document.getElementById('ix_logout_form').style.display = 'none';
			if( g_settings.isPlanner ) {
				Engine.loggedOut();
			}
			Tooltip.enable();
		},
		
		checkTopic : function (_id){
			var title = DOM.getValue('topic_title');
			var content = DOM.getValue('topic_content');
			var type = DOM.getValue('thread_type');
			
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
				'api/forum.php', {
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
					'api/forum.php', {
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
				'api/forum.php', {
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
				'api/forum.php', {
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
				'api/forum.php', {
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
				'api/forum.php', {
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
				DOM.set('ui_profiles_parent',  pa.getNode());
			}
		},
		createAvatarPicker: function( parentId, currentAvatar ) {
			new AvatarPicker(parentId, currentAvatar);
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
						Engine.showItemTooltip.call(Engine,e.get('entity').id);
					}
					else if( e.is('move_tooltip') ) {
						Tooltip.move();
					}
					else if( e.is('hide_tooltip') ) {
						Tooltip.hide();
					}
					else if( e.is('update') ) {
						var form = DOM.create('form', {'method': 'GET', 'action': ''});
						DOM.createAt(form,'input', {'name': 'a', 'value': il.getArgumentString().replace(/\;/g,"_")});
						DOM.createAt(form,'input', {'name': 'p', 'value': il.page});
						DOM.createAt(form,'input', {'name': 'o', 'value': il.order+"."+(il.orderDirection==List.ORDER_ASC?'asc':'desc')+"_" });
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
				var tt = new TooltipImpl();
				var iconNode = document.getElementById(iconParent);
				var img;
				var item;
				item = new Item(serialized);
				
				tt.show(ItemTooltip.getHTML(item, null));
				
				DOM.set(ttParent,tt.div);
				
				tt.div.style.position = "relative";
				
				img = document.createElement('img');
				img.className = 'dbi_icon';
				img.src = '/images/icons/large/' + item.icon + '.png';
				iconNode.appendChild(img);
			}
		},
		changePassword: function() {
			var password = $('[name=change_new_password]').val();
			var userId = $('[name=change_user_id]').val();
			Tooltip.showLoading();
			
			Ajax2.post( Tools.getBasePath() + 'api/user.php', { "UserId": userId, "Password": password}, function( obj ) {
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
			var talents = new Talents(serialized,false);
			var talentsGui = new TalentsGui();
			var character = new Character();
			
			new TalentsAdapter( talents, talentsGui, character );
			
			if( distribution ) {
				talents.setDistribution(distribution, true);
			}
			
			$('#' + nodeId).empty().append(talentsGui.node);
		}
};

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
			'addItemTooltipTo': Chardev.addItemTooltipTo,
			'changePassword': Chardev.changePassword,
			'showTalents': Chardev.showTalents
	};
}