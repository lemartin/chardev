<?php 
$g_content .= "
<div class='lo_notice'>".$notice."</div>
<form onsubmit='try{return g_validateLogin();}catch(e){g_echo(e);return false;}' action='?login' method='post'>
	<div class='im_sa_p'>
		<div class='im_sa_h'>Login</div> 
		<div class='im_sa_r'> 
			<div class='im_sa_left'>".$locale['User_name']."</div>
			<div class='im_sa_right'>
				<input tabindex='20' class='input im_sa_in' id='login_user_name' name='login_user_name' ".(isset($_POST['login_user_name'])?"value='".$_POST['login_user_name']."'":"")." />
			</div>
		</div>
		<div class='clear_both'></div>
		<div class='im_sa_r'> 
			<div class='im_sa_left'>".$locale['Password']."</div>
			<div class='im_sa_right'>
				<input tabindex='21' class='input im_sa_in' type='password' id='login_password'/>
				<input class='input im_sa_in' type='hidden' id='login_password_md5' name='login_password'/>
			</div>
		</div>
		<div class='clear_both'></div>
		<div class='im_sa_r'> 
			<div class='im_sa_left'>stay logged in:</div>
			<div class='im_sa_right'>
				<input class='lo_check' tabindex='22' type='checkbox' checked='checked' id='login_cookie' name='login_cookie'/>
				<input name='redirect_url' type='hidden' value='".get_redirect()."'/></td>
			</div>
		</div>
		<div class='clear_both'></div>
		<div class='im_sa_b'><input type='submit' tabindex='23' id='login' value='Login' /></div>
	</div>
</form>
	<div class='text_align_center'>
		<a href='?recover_password' class='ix_recover_pw_link'>forgot your password?</a>
	</div>
	";
	?>