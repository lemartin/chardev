<?php

	include '../../db.php';
	session_start();
	
	$error = "";
	
	if( isset($_GET['user_id']) && isset($_GET['name'])) {
		remove_stat_weights( $_GET['user_id'], $_GET['name'], $error );
	}
	else {
		$error = "Mandatory information is missing!";
	}
	echo json_encode($error);
	
	function remove_stat_weights( $user_id, $name, &$error ) {
		mysql_db_query(
			$GLOBALS['g_profile_db'],
			"DELETE FROM `stat_weights` WHERE `UserID`='".(int)$user_id."' AND `Name` like '".mysql_real_escape_string($name)."'",
			$GLOBALS['g_db_con']
		);
		$error = mysql_error();
	}
?>