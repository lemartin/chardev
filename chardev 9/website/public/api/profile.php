<?php

use chardev\backend\UserDatabase;

use chardev\Ajax;

require_once '../../app/chardev/Autoloader.php';

\chardev\Session::startBackendSession();

try {
	if( isset($_POST['action']) ) {
		switch($_POST['action']) {
			case 'update':
				$serialized = $_POST['serialized'] ? json_decode($_POST['serialized']) : null;
				$id = $_POST['id'] ? json_decode($_POST['id']) : 0;
				UserDatabase::getInstance()->updateProfile($id, $serialized);
				break;
			case 'add':
				$serialized = $_POST['serialized'] ? json_decode($_POST['serialized']) : null;
				$id = UserDatabase::getInstance()->addProfile($serialized);
				echo json_encode("profile/{$id}.html");
				break;
			case 'delete':
				$id = $_POST['id'] ? json_decode($_POST['id']) : 0;
				UserDatabase::getInstance()->deleteProfile($id);
				break;
		}
	}
	else if( isset($_GET['id'])) {
		$id = $_GET['id'] ? json_decode($_GET['id']) : null;
		echo json_encode(UserDatabase::getInstance()->getProfile($id));
		break;
	}
}
catch( chardev\backend\DuplicateProfileException $dpe ) {
	header("chardev-duplicate-profile: yes");
	echo json_encode($dpe->getId());
}
catch( \Exception $e ) {
	Ajax::dieOnException($e);
}