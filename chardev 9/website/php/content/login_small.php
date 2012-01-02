<form id='ix_login_form' <?php echo ! $loggedIn ? '' : 'style="display:none;"' ?> onsubmit="<?php echo $page == PAGE_PLANNER ? 'g_login(); return false;' : 'return g_validateLogin();' ?>" action="<?php echo $page == PAGE_PLANNER ? '#' : '?login' ?>" method="post">
	<div class="ix_login_input_container">
		<div class='ix_login_note'>&nbsp;</div>
		<input tabindex="3" 
			class="button button_dark" 
			onmouseout="this.className='button button_dark'" 
			onmouseover="this.className='button button_dark button_dark_hover'"
			type="submit" 
			value="Log in" 
		/>
	</div>
	<div class="ix_login_input_container">
		<div class='ix_login_note'>Password:</div>
		<input tabindex="2" id="login_password" type="password" class="input ix_login_input" />
		<input type="hidden" id="login_password_md5" name="login_password"/>
		<div class='ix_add_options'><a>Forgot your password?</a></div>
	</div>
	<div class="ix_login_input_container">
		<div class='ix_login_note'>User Name:</div>
		<input tabindex="1" <?php if(isset($_POST['login_user_name'])) echo "value='".$_POST['login_user_name']."'" ?> class="input ix_login_input" id="login_user_name" name="login_user_name"/>
		<div>
			<span class='ix_add_options'>Stay logged in:</span>
			<input tabindex="4" type="checkbox" checked="checked" id="login_cookie" name="login_cookie" class="ix_stay_logged_in"/>
			<input name="redirect_url"type="hidden" value="<?php echo get_redirect(); ?>"/>
		</div>
	</div>
</form>

<form id='ix_logout_form' <?php echo $loggedIn ? '' : 'style="display:none;"' ?> onsubmit="<?php echo $page == PAGE_PLANNER ? 'g_logout(); return false;' : '' ?>" action="<?php echo $page == PAGE_PLANNER ? '#' : '?o' ?>" method="post">

			
	<div style='width: 60px; float: left; padding-left: 15px; padding-top: 11px;'> 
<g:plusone size="medium" href="http://chardev.org/"></g:plusone>
<script type="text/javascript">
  window.___gcfg = {lang: 'en-GB'};

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
	</div>
			
	<div class='ix_login_input_container' >
		<div class='ix_login_note'>&nbsp;</div>
		<input value="Log out" type="submit" class="button button_dark" onmouseout="this.className='button button_dark'" onmouseover="this.className='button button_dark button_dark_hover'" />
		<input name='redirect_url' type='hidden' value='<?php echo get_redirect(); ?>'/>
	</div>
	<div class='ix_login_input_container' >
		<div class='ix_login_note'>You are logged in as</div>
		<a id='ix_self_link' href="?user=<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ""; ?>" class='ix_self_link'><?php echo $_SESSION['user_name']; ?></a>
	</div>
</form>