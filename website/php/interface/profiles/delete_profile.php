<?php

	include '../../db.php';
	session_start();
	
	$error = "";
	
	if(!isset($_GET['id']) || $_GET['id']=="") 
	{ 
		$error = "error_no_template_id";
	}
	else {
		
		if(!isset($_SESSION['user_id']))
		{ 
			$error = "No session found!";
		}
		else {
			$record = mysql_fetch_assoc(mysql_db_query(
				$GLOBALS['g_profile_db'],
				"SELECT `ID` FROM `chardev_characters` WHERE id='".mysql_real_escape_string($_GET['id'])."' AND userID = '".mysql_real_escape_string($_SESSION['user_id'])."'",
				$GLOBALS['g_db_con']
			));
			if( !$record ){
				$error = "Either the given profile doesn't exists or you are not allowed to delete it!";
			}
			else {
				mysql_db_query(
					$GLOBALS['g_profile_db'],
					"LOCK TABLES `chardev_characters` WRITE",
					$GLOBALS['g_db_con']
				);
				mysql_db_query(
					$GLOBALS['g_profile_db'],
					"UPDATE `chardev_characters` SET `Deleted`='1' WHERE `ID`='".mysql_real_escape_string($_GET['id'])."' AND `UserID` = '".mysql_real_escape_string($_SESSION['user_id'])."'",
					$GLOBALS['g_db_con']
				);
				mysql_db_query(
					$GLOBALS['g_profile_db'],
					"UNLOCK TABLES",
					$GLOBALS['g_db_con']
				);
			}
		}
	}
	if( $error ) {
		header("error: yes");
		echo $error;
	}
?>