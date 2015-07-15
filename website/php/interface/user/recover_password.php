<?php
	if(!isset($_GET['user_name'])) $_GET['user_name']="";
	if(!isset($_GET['email'])) $_GET['email']="";
	
	include('../../db.php');
	
	if( (!isset($_GET['user_name']) || !$_GET['user_name']) && (!isset($_GET['email']) || !$_GET['email'])) {
		echo json_encode(array(1,"Invalid inputs"));
	}
	try
	{
		$record = mysql_fetch_assoc(mysql_query(
			"SELECT * FROM chardev.user WHERE name LIKE '".mysql_real_escape_string(urldecode($_GET['user_name'])).
			"' OR email LIKE '".mysql_real_escape_string(urldecode($_GET['email']))."'"));
		if( $record ){
			$guid = md5($record['pw']);
			$content ="Hello ".$record['name'].",<br/>";
			$content .="<br/>";
			$content .="to recover your password click ";
			$content .="<a href=\"http://chardev.org?recover_password&userId=".$record['userID']."&guid=".$guid."\">here</a>!<br/><br/>";
			$content .="<strong>Your user name: ".$record['name']."</strong><br/>";
			$content .="<strong>Your e-mail: ".$record['email']."</strong><br/><br/>";
			$content .="This E-Mail is automated,<br/>";
			$content .="<br/>";
			$content .="If there is a problem do not hesitate to write an e-Mail to <a href=\"mailto:bug@chardev.org\">bug@chardev.org</a><br/>";
			$content .="<br/>";
			$content .="-<br/>";
			$content .="LeMartin - Martin Waßmann";
			
			$headers  = "From: registration@chardev.org\n";
			$headers .= "MIME-Version: 1.0\n";
			$headers .= "Content-type: text/html; charset=utf-8\n";
			$headers .= "Reply-To: registration <registration@chardev.org>\n";
			$headers .= "X-mailer: chardev.org";
			
			if( mail($record['email'],"Password Recovery - chardev.org",$content,$headers) ) {
				echo json_encode(array(0,"A mail has been sent to your e-mail address."));
			}
			else {
				echo json_encode(array(1,"Unable to send mail"));
			}
			
		}
		else{
			echo json_encode(array(1,"Wrong user name and e-mail"));
		}
	}
	catch(Exception $e)
	{
		echo json_encode(array(1,"Exception: ".$e));
	}
	
?>