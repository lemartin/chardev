<?php
use chardev\Session;
use chardev\profiles\BattleNetProfile;

require_once '../../app/chardev/Autoloader.php';
	
	use chardev\profiles\CommunityPlatformClient;
	
	Session::startBackendSession();
	
	try {
		$profile = new BattleNetProfile($_GET['name'], $_GET['server'], $_GET['region']);
		echo json_encode($profile->toChardevProfile());
	}
	catch( \Exception $e ) {
		chardev\Ajax::dieOnException($e);
	}