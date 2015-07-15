<?php 

$content ="Hello $name,<br/>";
$content .="<br/>";
$content .="to recover your password click ";
$content .="<a href=\"$url\">here</a>!<br/><br/>";
$content .="<strong>Your user name: $name</strong><br/>";
$content .="<strong>Your e-mail: $email</strong><br/><br/>";
$content .="<br/>";
$content .="If you encounter problems do not hesitate to write an e-mail to <a href=\"mailto:bug@chardev.org\">bug@chardev.org</a><br/>";
$content .="<br/>";
$content .="Regards,<br/>";
$content .="LeMartin - Martin Waßmann";
	
$headers  = "From: registration@chardev.org\n";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";
$headers .= "Reply-To: registration <registration@chardev.org>\n";
$headers .= "X-mailer: chardev.org";

?>