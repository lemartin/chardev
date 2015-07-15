<?php

if(isset($_GET['guid'])){
	$stmt=mysql_query("SELECT * FROM pending WHERE guid LIKE '".mysql_real_escape_string($_GET['guid'])."'");
	$result = mysql_fetch_assoc($stmt);
	if(!$result) $g_content .= "<div class='re_fail'>wrong GUID</div>";
	else{
		$stmt=mysql_query("INSERT INTO user VALUES(null,'".$result['name']."','".$result['pw']."','".$result['email']."','".$result['timestamp']."','0','',0)");
		$stmt=mysql_query("DELETE FROM pending WHERE guid LIKE '".mysql_real_escape_string($_GET['guid'])."'");
		$g_content .= "<div class='re_success'>Registration confirmed, you may now log in.</div>";
	}
}
else {
	$g_content .= "
	<form onsubmit='g_register(); return false;' action='#'>
		<div class='im_sa_p'>
			<div class='im_sa_h'>Register at chardev
			</div> 
			<div class='im_sa_r'> 
				<div class='im_sa_left'>".$locale['User_name']."</div>
				<div class='im_sa_right'><input tabindex='10' class='input im_sa_in' id='user_name' /></div>
			</div>
			<div class='clear_both'></div>
			<div class='im_sa_r'> 
				<div class='im_sa_left'>".$locale['Password']."</div>
				<div class='im_sa_right'><input tabindex='11' class='input im_sa_in' id='password' type='password'/></div>
			</div>
			<div class='clear_both'></div>
			<div class='im_sa_r'> 
				<div class='im_sa_left'>".$locale['Repeat']."</div>
				<div class='im_sa_right'><input tabindex='12' class='input im_sa_in' id='password_repeat' type='password'/></div>
			</div>
			<div class='clear_both'></div>
			<div class='im_sa_r'> 
				<div class='im_sa_left'>E-Mail</div>
				<div class='im_sa_right'><input tabindex='13' class='input im_sa_in' id='email'></div>
			</div>
			<div class='clear_both'></div>
			<div class='im_sa_b'><input type='submit' tabindex='14' id='login' value='Register' /></div>
		</div>
	</form>
	";
};
?>