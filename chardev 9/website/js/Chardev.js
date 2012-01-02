var Chardev = {
		initialise : function () {
			window['g_validateLogin'] = Chardev.validateLogin;
			window['g_login'] = Chardev.login;
			window['g_logout'] = Chardev.logout;
			window['g_checkTopic'] = Chardev.checkTopic;
			window['g_checkEdit'] = Chardev.checkEdit;
			window['g_checkReply'] = Chardev.checkReply;
			window['g_register'] = Chardev.register;
			window['g_requestPasswordChange'] = Chardev.requestPasswordChange;
			window['g_requestPasswordRecovery'] = Chardev.requestPasswordRecovery;
			window['g_deleteThread'] = Chardev.deleteThread;
			window['g_lockThread'] = Chardev.lockThread;
			window['g_unlockThread'] = Chardev.unlockThread;
			window['g_makePostEditable'] = Chardev.makePostEditable;
			window['g_showUserInformation'] = Chardev.showUserInformation;
			window['g_createAvatarPicker'] = Chardev.createAvatarPicker;
			window['g_staticItemList'] = Chardev.staticItemList;
			window['g_addItemTooltipTo'] = Chardev.addItemTooltipTo;
		},
		makePostEditable: function( arr ) {
			var e = new PostEditable();
			new PostEditableObserver(arr['PostID'], arr['Data'], e);
			DOM.set('p'+arr['PostID']+'_content', e.node);
			e.edit(true);
		},
		requestPasswordChange: function (userId,guid)
		{
			try {
				var password = document.getElementById('password').value;
				if( password != document.getElementById('password_repeat').value) {
					Tooltip.showError(locale['Password_and_repeat_differ']);
					return;
				}
				if( password.length < 5) {
					Tooltip.showError(locale['Password_to_short']);
					return;
				}
				
				Ajax.request(
					"php/interface/user/change_password.php"+TextIO.queryString({ 'userId': userId, 'password': MD5(password), 'guid': guid}), 
					new Handler(Chardev._passwordRecoveryOut, Chardev), 
					null
				);
				Tooltip.showLoading();
			}
			catch(e) {
				Tooltip.showError(e.toString());
			}
		},

		requestPasswordRecovery: function()
		{
			try {
				var name = encodeURIComponent(document.getElementById('user_name').value);
				var mail = encodeURIComponent(document.getElementById('email').value);
				Ajax.request(
					"php/interface/user/recover_password.php"+TextIO.queryString({ 'user_name': name, 'email': mail }), 
					new Handler(Chardev._passwordRecoveryOut, Chardev), 
					null
				);
				Tooltip.showLoading();
			}
			catch(e) {
				Tooltip.showError(e.toString());
			}
		},
		
		_passwordRecoveryOut : function( request )
		{
			if (request.status == 200) 
			{
				var response = eval( '(' + request.responseText + ')' );
				if( typeof response === 'object' ) {
					if( response[0] == 1 ) {
						Tooltip.showError(response[1]);
						return;
					}

					Tooltip.showHtmlDisabled(response[1]);
					return;
					
				}
			}
			Tooltip.enable();
		},
		
		register: function()
		{
			var _u = document.getElementById('user_name').value;
			var _p = MD5(document.getElementById('password').value);
			var _e = document.getElementById('email').value;
			
			if (document.getElementById('password').value != document.getElementById('password_repeat').value) 
			{
				Tooltip.showError(locale['Password_and_repeat_differ']);
				return false;
			}
			if (_u.length < 4) 
			{
				Tooltip.showError(locale['Username_to_short']);
				return false;
			}
			if (document.getElementById('password').value.length < 5) 
			{
				Tooltip.showError(locale['Password_to_short']);
				return false;
			}
			if (document.getElementById('email').value.search("@") == -1) 
			{
				Tooltip.showError(locale['Invalid_email']);
				return false;
			}

			Tooltip.showLoading();
			
			Ajax.request(
				"php/interface/user/request_registration.php?u=" + _u + "&pw=" + _p + "&e=" + _e,
				new Handler(Chardev.__register_callback, Chardev),
				null
			);
			document.getElementById("login").disabled = true;
			return false;
		},
		
		__register_callback: function( request )
		{
			
			document.getElementById("login").disabled = false;
			if (request.status == 200) 
			{
				if (request.responseText.search("error_username") != -1) 
				{
					Tooltip.showError(locale['Username_invalid_characters']);
				}
				else if( request.responseText.search("register_success") != -1 )
				{
					Tooltip.showHtmlDisabled("An E-Mail has been sent. Before you can use your account you have to confirm your registration by following the link given in the mail.");
				}
				else
				{
					Tooltip.showError(request.responseText);
				}
			}
				
		},
		
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
					Ajax.request( "php/interface/user/authenticate.php"+
						TextIO.queryString({
							'user_name'	: document.getElementById('login_user_name').value,
							'password'	: document.getElementById('login_password_md5').value,
							'cookie'	: document.getElementById('login_cookie').checked
						}),
						new Handler( Chardev.__login_callback, Chardev ), 
						null
					);
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
				'php/interface/forum/forum.php', {
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
				var obj = Ajax.getResponseObject(request);
				window.location.search = '?thread=' + obj;
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
					'php/interface/forum/forum.php', {
						'action': 'delete_thread',
						'thread': threadId
					},
					new Handler(Chardev.__deleteTopic_callback, Chardev),
					null
				);
			}
		},
		__deleteTopic_callback : function ( request ) {		
			try {
				var obj = Ajax.getResponseObject(request);
				window.location.search = '?forum=' + obj;
			}
			catch( e ) {
				Tooltip.showError(e);
			}
		},
		lockThread : function ( threadId ){
			Tooltip.showLoading();
			Ajax.post(
				'php/interface/forum/forum.php', {
					'action': 'lock_thread',
					'thread': threadId
				},
				new Handler(Chardev.__lockTopic_callback, Chardev),
				null
			);
		},
		unlockThread : function ( threadId ){
			Tooltip.showLoading();
			Ajax.post(
				'php/interface/forum/forum.php', {
					'action': 'unlock_thread',
					'thread': threadId
				},
				new Handler(Chardev.__lockTopic_callback, Chardev),
				null
			);
		},
		__lockTopic_callback : function ( request ) {
			try {
				var obj = Ajax.getResponseObject(request);
				window.location.search = '?thread=' + obj;
			}
			catch( e ) {
				Tooltip.showError(e);
			}
		},

		lockTopic : function (_tid){
			Ajax.request(
				'php/interface/forum/lockTopic.php?topic='+_tid+'&session_id='+g_settings.sessionId,
				null,
				null
			);
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
				'php/interface/forum/forum.php', {
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
				'php/interface/forum/forum.php', {
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
		staticItemList: function( serialized, page, argString, parent ) {
			if( serialized ) {
				
				var il = new ItemList();
				
				il.showStaticLinks(true);
				
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
						window.location.search = TextIO.queryString({ 
							'items': il.getArgumentString().replace(/\;/g,"_"), 
							'p': il.page, 
							'o': il.order+"."+(il.orderDirection==List.ORDER_ASC?'asc':'desc')+"_" });
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
				
				tt.show(ItemTooltip.getHTML(item));
				
				document.getElementById(ttParent).appendChild(tt.div);
				
				tt.div.style.position = "relative";
				
				img = document.createElement('img');
				img.className = 'dbi_icon';
				img.src = 'images/icons/large/' + item.icon + '.png';
				iconNode.appendChild(img);
			}
		}
};
window["__chardev_init"] = Chardev.initialise;