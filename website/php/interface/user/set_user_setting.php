<?php
    session_start();
	require_once '../../db.php';
	require_once '../../common.php';

	
	if( isset($_GET['language']) ) {
		set_user_settings("language",(int)$_GET['language']);	
	}
?>