
<?php
	
	if( !isset($_GET['to']) || !$_GET['to'] ) {
		$g_content .= "<div class='rs_error'>No user name given</div>";
	} 
	else {
		$stmt=mysql_query("SELECT * FROM `pending` WHERE name LIKE '".mysql_real_escape_string($_GET['to'])."'");
		if(!$result=mysql_fetch_assoc($stmt)){ 
			$result2 = mysql_fetch_assoc(mysql_query("SELECT * FROM `user` WHERE name LIKE '".mysql_real_escape_string($_GET['to'])."'"));
			if( $result2 ) {
				$g_content .= "<div class='rs_error'>The account with user name ".htmlspecialchars($_GET['to'])." is already activated.</div>";
			}
			else {
				$g_content .= "<div class='rs_error'>The user name ".htmlspecialchars($_GET['to'])." is not registered.</div>";
			}
		}
		else{
			$guid=$result['guid'];
			$mail=$result['email'];
			
			include("./php/interface/user/mail.php");
			
			if( mail($mail,"Please confirm your Registration at chardev.org",$content,$headers) )
				$g_content .=  "<div class='rs_success'>An E-mail has been sent.</div";
			else $g_content .=  "<div class='rs_error'>Error while sending mail</div>";
		}
	}
?>
