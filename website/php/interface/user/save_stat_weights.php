<?php

	include './../../db.php';
	include './../../filter.php';
	include './../../common.php';
	//
	session_start();
	//
	
	$error = 0;
	$duplicate = false;
	
	save_stat_weights($error,$duplicate);
	
	echo json_encode(array($error,$duplicate));
	
	
	function save_stat_weights ( &$error, &$duplicate ) {
	
		if( !isset($_SESSION['user_id']) ) {
			$error = "You need to be logged in to save stat weights!";
			return;
		}
		if( !isset($_GET['name']) || !$_GET['name'] ) {
			$error = "You have to set a name for the stat weight configuration";
			return;
		}
		if( !isset($_GET['description']) || !isset($_GET['serialized']) || !isset($_GET['chr_class_mask']) || !isset($_GET['public']) || !isset($_GET['overwrite'])) {
			$error = "Incomplete request, mandatory data is missing!";
			return;
		}
		
		$user_id = $_SESSION['user_id'];
		$name = $_GET['name'];
		$description = $_GET['description'];
		$serialized = serialize(json_decode($_GET['serialized']));
		$chr_class_mask = $_GET['chr_class_mask'];
		$public = ((int)$_GET['public']) == 0 ? 0 : 1;
		$overwrite = (int)$_GET['overwrite'];
		
		$duplicate_result = mysql_db_query(
			$GLOBALS['g_profile_db'],
			"SELECT * FROM `stat_weights` WHERE `UserID`='".$user_id."' AND `Name` like '".mysql_real_escape_string($name)."'",
			$GLOBALS['g_db_con']
		);
		
		if( mysql_fetch_assoc($duplicate_result) && ! $overwrite ) {
			$duplicate = true;
			return;
		}
		
		mysql_db_query(
			$GLOBALS['g_profile_db'],
			"REPLACE INTO `stat_weights` VALUES ('".
				(int)$user_id."','".
				mysql_real_escape_string($name)."','".
				mysql_real_escape_string($description)."','".
				mysql_real_escape_string($serialized)."','".
				(int)$chr_class_mask."','".
				(int)$public
			."')",
			$GLOBALS['g_db_con']
		);
		$error = mysql_error();
	}
	
?>