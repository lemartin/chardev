<?php

require_once __DIR__ . "/../../app/bootstrap.php";

use \chardev\Ajax;

$userName = isset($_POST['login_user_name']) ? $_POST['login_user_name'] : "";
$password = isset($_POST['login_password']) ? $_POST['login_password'] : "";
$stayLoggedIn = isset($_POST['login_cookie']) ? $_POST['login_cookie'] : "";

try {
	\chardev\Session::login($userName, $password, $stayLoggedIn);
	
	if (isset($_POST['redirect_url'])) {
		Ajax::autoRedirect($_POST['redirect_url']);
	}
}
catch( \InvalidArgumentException $iae ) {
	Ajax::dieOnError("Unable to log in","Invalid inputs: " . $iae->getMessage());
}
catch( \chardev\backend\RegistrationPendingException $rpe ) {
	Ajax::dieOnError(
			"Unable to log in",
			"Your registration is pending!<br/>".
				"You should have received an activation email, if not, click <a class='std_link' href='?resend_mail&to=".$_POST['login_user_name']."'>here</a> to send the mail again."
	);
}
catch( \chardev\backend\WrongUserNamePasswordException $rpe ) {
	Ajax::dieOnError(
			"Unable to log in",
			"Wrong user name or password"
	);
}