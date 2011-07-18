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

					Tooltip.showHTML(response[1]);
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
					Tooltip.showHTML("An E-Mail has been sent. Before you can use your account you have to confirm your registration by following the link given in the mail.");
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
				Tooltip.showError (e);
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
		
		__login_callback : function( request ) {
			if( request.status == 200 ) {
				var response = eval('('+request.responseText+')');
				if( response[0] == 1 ) {
					Tooltip.showError(response[1]);
				}
				else {
					g_settings.sessionId = response[1];
					g_settings.userId = response[2];
					document.getElementById('ajax_login').style.display = 'none';
					document.getElementById('ajax_logout').style.display = 'block';
					document.getElementById('register_logged_out').style.display = 'none';
					document.getElementById('register_logged_in').style.display = 'block';
					document.getElementById('register_user_name').innerHTML = response[3];
					if( g_settings.isPlanner ) {
						Engine.loggedIn();
					}
					Tooltip.enable();
				}
			}
			else {
				Tooltip.enable();
			}
		},
		
		logout : function() {
			try {
				Ajax.request(
					"php/interface/user/logout.php",
					new Handler( Chardev.__logout_callback, Chardev ),
					null
				);
			}
			catch(e) {
			} 
		},
		
		__logout_callback : function( request ) {
			g_settings.sessionId = "";
			g_settings.userId = 0;
			g_settings.userName = "";
			document.getElementById('ajax_login').style.display = 'block';
			document.getElementById('ajax_logout').style.display = 'none';
			document.getElementById('register_logged_out').style.display = 'block';
			document.getElementById('register_logged_in').style.display = 'none';
			if( g_settings.isPlanner ) {
				Engine.loggedOut();
			}
			Tooltip.enable();
		},
		
		windowSize : function() {
			if(typeof window.innerWidth != 'undefined') 
		    { 
		        return [window.innerWidth,window.innerHeight];
		    } 

	        var obj = (window.document.compatMode && window.document.compatMode == "CSS1Compat") ? window.document.documentElement : window.document.body; 
	        return [parseInt(obj.clientWidth,10),parseInt(obj.clientHeight,10)];
		     
		},
		
		checkTopic : function (_id){
			var title = document.getElementById('topic_title').value;
			var content = document.getElementById('topic_content').value;
			
			if(title.length<2){
				Tooltip.showError("The title of your post is too short!");
				return;
			}
			if(content.length<2){
				Tooltip.showError("The content of your topic is too short!");
				return;
			}
			document.getElementById('topic_submit').disabled = true;
			
			
			Ajax.request(
				'php/interface/forum/newTopic.php?forum='+_id+'&title='+encodeURIComponent(title)+'&content='+encodeURIComponent(content)+"&session_id="+g_settings.sessionId,
				new Handler( Chardev.__checkTopic_callback, Chardev ),
				null
			);
		},

		__checkTopic_callback : function ( request ) {
			if( request.status == 200 ){
				var arr = eval('(' + request.responseText + ')');
				if(arr[0]!=0){
					Tooltip.showError(arr[1]);
					document.getElementById('topic_submit').disabled = false;
				}
				else{
					document.getElementById('topic_form').onsubmit = new Function('');
					document.getElementById('topic_form').action = '?f&topic='+arr[1];
					document.getElementById('topic_form').submit();
				}
			}
			else{ 
				Tooltip.showError(request.responseText);
				document.getElementById('topic_submit').disabled = false;
			}
		},

		deleteTopic : function (_tid){
			Ajax.request(
				'php/interface/forum/deleteTopic.php?topic='+_tid+'&session_id='+g_settings.sessionId,
				null,
				null
			);
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
			
			Ajax.request(
				'php/interface/forum/addPost.php?topic='+_tid+'&content='+encodeURIComponent(content)+"&session_id="+g_settings.sessionId,
				new Handler( Chardev.__checkReply_callback, Chardev ),
				[_tid,_posts]
			);
		},

		__checkReply_callback : function ( request, _tid,_posts ) {
			if( request.status == 200 ){
				var arr = eval('(' + request.responseText + ')');
				if(arr[0]!=0){
					Tooltip.showError(arr[1]);
					document.getElementById('reply_submit').disabled = false;
				}
				else{
					document.getElementById('reply_form').onsubmit = new Function('');
					document.getElementById('reply_form').action = '?f&topic='+_tid+'&page='+Math.ceil(arr[1]/_posts)+"#bottom";
					document.getElementById('reply_form').submit();
				}
			}
			else{ 
				Tooltip.showError(request.responseText);
				document.getElementById('reply_submit').disabled = false;
			}
		},

		checkEdit : function (_id,_tid,_page){
			var content = document.getElementById('edit_content').value;

			if(content.length<2){
				Tooltip.showError("The content of your post is too short!");
				return;
			}
			document.getElementById('edit_submit').disabled = true;
			
			Ajax.request(
				'php/interface/forum/editPost.php?post='+_id+'&content='+encodeURIComponent(content)+"&session_id="+g_settings.sessionId,
				new Handler( Chardev.__checkEdit_callback, Chardev ) ,
				[_id,_tid,_page]
			);
		},

		__checkEdit_callback : function( request, _id, _tid, _page ) {
			if(request.status == 200){
				var arr = eval('(' + request.responseText + ')');
				if(arr[0]!=0){
					Tooltip.showError(arr[1]);
					document.getElementById('edit_submit').disabled = false;
				}
				else{
					document.getElementById('edit_form').onsubmit = new Function('');
					document.getElementById('edit_form').action = '?f&topic='+_tid+'&page='+_page+'#p'+_id;
					document.getElementById('edit_form').submit();
				}
			}
			else{ 
				Tooltip.showError(request.responseText);
				document.getElementById('edit_submit').disabled = false;
			}
		}
};
window["__chardev_init"] = Chardev.initialise;