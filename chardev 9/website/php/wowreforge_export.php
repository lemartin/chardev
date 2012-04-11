<?php	
	
	include_once './db.php';
	include_once './common.php';
	
	if( !isset($_POST['profile-id']) || ! get_storage_record($_POST['profile-id']) ) {
		echo "<html><head></head><body><h1>Unable to export, temporary profile has timed out!</h1><p>Save your profile, reload it and try again!</p></body></html>";
		die;
	}
	else {
		header("Location: http://wowreforge.com/import", TRUE, 307);
		die;
	}
	
?>