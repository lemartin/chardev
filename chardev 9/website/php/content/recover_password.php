<?php

	if( isset($_GET['guid']) && isset($_GET['userId']) )
	{
		$g_content = "
		<form onsubmit='g_requestPasswordChange(".$_GET['userId'].",\"".$_GET['guid']."\"); return false;' action='#'>
			<div class='im_sa_p'>
				<div class='im_sa_h'>Change your password
				</div> 
				<div class='im_sa_r'> 
					<div class='im_sa_left'>".$locale['New_Password']."</div>
					<div class='im_sa_right'><input tabindex='11' class='input im_sa_in' id='password' type='password'/></div>
				</div>
				<div class='clear_both'></div>
				<div class='im_sa_r'> 
					<div class='im_sa_left'>".$locale['Repeat']."</div>
					<div class='im_sa_right'><input tabindex='11' class='input im_sa_in' id='password_repeat' type='password'/></div>
				</div>
				<div class='clear_both'></div>
				<div class='im_sa_b'><input type='submit' tabindex='14' id='send' value='Change password' /></div>
			</div>
		</form>
		";
	}
	else
	{ 
		$g_content = "
		<form onsubmit='g_requestPasswordRecovery(); return false;' action='#'>
			<div class='im_sa_p'>
				<div class='im_sa_h'>Recover your password</div>
				<div class='im_sa_r'>
					<div class='im_sa_r'><span class='im_sa_notice'>".$locale['RP_UserNameOrEMail']."</span></div>
				</div> 
				<div class='im_sa_r'> 
					<div class='im_sa_left'>".$locale['User_name']."</div>
					<div class='im_sa_right'><input tabindex='11' class='input im_sa_in' id='user_name'/></div>
				</div>
				<div class='clear_both'></div>
				<div class='im_sa_r'> 
					<div class='im_sa_left'>E-Mail</div>
					<div class='im_sa_right'><input tabindex='11' class='input im_sa_in' id='email'/></div>
				</div>
				<div class='clear_both'></div>
				<div class='im_sa_b'><input type='submit' tabindex='14' id='send' value='Recover password' /></div>
			</div>
		</form>
		";
	}
	
?>
