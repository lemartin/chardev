<?php

$content = "Hello $name,<br/>"
    . "<br/>"
    . "to recover your password click <a href=\"$url\">here</a>!<br/><br/>"
    . "<strong>Your user name: $name</strong><br/>"
    . "<strong>Your e-mail: $email</strong><br/><br/>"
    . "<br/>"
    . "If you encounter problems do not hesitate to write an e-mail to <a href=\"mailto:bug@chardev.org\">bug@chardev.org</a><br/>"
    . "<br/>"
    . "Regards,<br/>"
    . "LeMartin - Martin Waßmann";

$headers = "From: registration@chardev.org\n"
    . "MIME-Version: 1.0\n"
    . "Content-Type: text/html; charset=utf-8\n"
    . "Reply-To: registration <registration@chardev.org>\n"
    . "X-mailer: chardev.org";