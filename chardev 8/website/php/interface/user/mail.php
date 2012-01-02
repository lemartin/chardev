<?php 
	$content ="Welcome,<br/>
<br/>
to complete the registration at chardev.org please follow the link below.<br/>
<br/>
 <a href=\"http://chardev.org?register&guid=".$guid."\">http://chardev.org?register&guid=".$guid."</a> <br/>
<br/>
The registration request will expire in 72hours and you'll have to register again.<br/>
<br/>
This E-Mail is automated<br/>
<br/>
If there is a problem do not hesitate to write an e-Mail to <a href=\"mailto:bug@chardev.org\">bug@chardev.org</a><br/>
<br/>
-<br/>
LeMartin - Martin Waßmann
";
	
	$headers  = "From: registration@chardev.org\n";
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Content-Type: text/html; charset=iso-8859-1\n";
	$headers .= "Reply-To: registration <registration@chardev.org>\n";
	$headers .= "X-mailer: chardev.org Server";
?>