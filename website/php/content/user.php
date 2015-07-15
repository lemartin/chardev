<?php 

	$login = false;
	if( !isset($_SESSION['user_id']) || !isset($_SESSION['password']) )
	{ 
		$login = true;
	}
					
?>
<div id="ajax_login" <?php echo $login ? '' : 'style="display:none;"' ?>>
	<form onsubmit="<?php echo $page == PAGE_PLANNER ? 'g_login(); return false;' : 'return g_validateLogin();' ?>" action="<?php echo $page == PAGE_PLANNER ? '#' : '?login' ?>" method="post">
		<div>
			<input tabindex="1" <?php if(isset($_POST['login_user_name'])) echo "value='".$_POST['login_user_name']."'" ?> class="input login_input" id="login_user_name" name="login_user_name"/>
		</div>
		<div>
				<input tabindex="2" class="input login_input" type="password" id="login_password"/>
				<input class="input login_input" type="hidden" id="login_password_md5" name="login_password"/>
		</div>
		<div class="ix_stay_logged_in">
			<div class='float_left'>stay logged in:</div>
			<div class='float_right'>
				<input tabindex="4" type="checkbox" checked="checked" id="login_cookie" name="login_cookie"/>
				<input name="redirect_url" type="hidden" value="<?php echo get_redirect(); ?>"/>
			</div>
		</div>
		<div class="clear_both"></div>
		<div>
			<input tabindex="3" value="login" type="submit"/>
		</div>
		<div>
			<a href="?recover_password" class="ix_recover_pw_link">forgot your password?</a>
		</div>
	</form>
</div>
<div id="ajax_logout" <?php echo $login ? 'style="display:none;"' : ''; ?>>
	
	<form onsubmit="<?php echo $page == PAGE_PLANNER ? 'g_logout(); return false;' : '' ?>" action="<?php echo $page == PAGE_PLANNER ? '#' : '?o' ?>" method="post">
		<div class='ix_logout_p' >
		<input value="logout" type="submit" />
		<input name='redirect_url' type='hidden' value='<?php echo get_redirect(); ?>'/>
		</div>
	</form>
</div>