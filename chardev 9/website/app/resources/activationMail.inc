<?php 
	$content ="Welcome {$name},<br/>
<br/>
to complete the registration at chardev.org please follow the link below.<br/>
<br/>
 <a href=\"{$url}\">{$url}</a> <br/>
<br/>
The registration request will expire after 48 hours!<br/>
<br/>
This E-Mail is automated<br/>
<br/>
If you encounter problems do not hesitate to write an e-mail to <a href=\"mailto:bug@chardev.org\">bug@chardev.org</a><br/>
<br/>
Regards,<br/>
LeMartin - Martin Waßmann
";
	
	$headers  = "From: registration@chardev.org\n";
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Content-Type: text/html; charset=utf-8\n";
	$headers .= "Reply-To: registration <registration@chardev.org>\n";
	$headers .= "X-mailer: chardev.org";
?>