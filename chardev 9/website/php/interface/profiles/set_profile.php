<?php

require_once '../../common.php';
require_once '../../db.php';

session_start();

$error = "";
$logged_in = false;

if( isset($_GET['session_id']) ) {
	$logged_in = is_logged_in($_GET['session_id']);
	if( !$logged_in ) {
		$error = "The given session doesn't contain login information! ";
	}
}
else {
	if( isset($_GET['name']) && $_GET['name']) {
		if( isset($_GET['password']) && $_GET['password']) {
			$logged_in = authenticate( $_GET['name'], $_GET['password'], false, $error );
			if( !$logged_in ) {
				$error = "Wrong user name and/or password! ";
			}
		}	
		else {
			$error = "Unable to login, no password was given! ";
		}
	}
	else {
		$error = "Unable to login, no user name was given! ";
	}
}

$profile_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if( !$logged_in ) {
	$error .= "You need to be logged in, to save a character profile.";
}
else {
	$id = save_character_profile(json_decode($_GET['serialized']), $profile_id, $error);
}

if( $error ) {
	header("error: yes");
	echo $error;
}
else {
	echo $id;
}

function save_character_profile( $serialized, $profile_id, &$error ) {
	if( !$serialized ) {
		$error = "The given character is empty!";
		return;
	}
	
	if( !isset($serialized[0]) || !isset($serialized[0][0]) || !isset($serialized[0][1]) || !isset($serialized[0][2]) || !isset($serialized[0][3])) {
		$error = "Malformed serialized character!";
		return;
	}
	
	if( !isset($_SESSION['user_id']) || !$_SESSION['user_id'] ) {
		$error = "You need to be logged in, to save a character profile.";
		return;
	}
	
	if( $profile_id > 0 ) {
		$profile = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_profile_db'],
			"SELECT * FROM `chardev_characters` WHERE `Deleted`=0 AND `ID`='".(int)$profile_id."'",
			$GLOBALS['g_db_con']
		));
		if( !$profile ) {
			$error = "The character profile you tried to update doesn't exists or is flagged as deleted!";
			return;
		}
		if( $profile['UserID'] != $_SESSION['user_id'] ) {
			$error = "You're not allowed to update the given character profile!";
			return;
		}
	}
	
	$name = (string)$serialized[0][0];
	$description = (string)$serialized[0][1];
	$race_id = (int)$serialized[0][2];
	$class_id = (int)$serialized[0][3];
	$level = (int)$serialized[0][4];
	
	if( $race_id == 0 ) {
		$error = "Saving character profiles with no race set is not allowed!";
		return;
	}
	if( $class_id == 0 ) {
		$error = "Saving character profiles with no class set is not allowed!";
		return;
	}
	// implement update via extra continuation column, as a fk to the original record
	mysql_db_query(
		$GLOBALS['g_profile_db'],
		"LOCK TABLES `chardev_characters` WRITE",
		$GLOBALS['g_db_con']
	);
	
	$duplicate_record = mysql_fetch_assoc(mysql_db_query(
		$GLOBALS['g_profile_db'],
		"SELECT * FROM `chardev_characters` WHERE Serialized='".mysql_real_escape_string(serialize($serialized))."' AND UserID='".(int)$_SESSION['user_id']."'",
		$GLOBALS['g_db_con']
	));
	
	if( $duplicate_record ) {
		$error = "Duplicate character profile found!<br /><a class='sa_duplicate_link' target='_blank' href='?profile=".$duplicate_record['ID']."'>Click here to view</a>";
	}
	else {
	
		if( $profile_id <= 0 ) {
			$id_record = mysql_fetch_assoc(mysql_db_query(
				$GLOBALS['g_profile_db'],
				"SELECT (max(`ID`)+1) AS `NextID` FROM `chardev_characters`",
				$GLOBALS['g_db_con']
			));
			
			if( $id_record && $id_record['NextID'] ) {
				$profile_id = (int)$id_record['NextID'];
			}
			else {
				$error = "Unable to allocate new profile id!";
			}
		}
		else {
			mysql_db_query(
				$GLOBALS['g_profile_db'],
				"UPDATE `chardev_characters` SET `History` = `History` + 1 WHERE `ID` = '".(int)$profile_id."' ORDER BY `History` DESC",
				$GLOBALS['g_db_con']
			);
		echo mysql_error();
		}
		
		mysql_db_query(
			$GLOBALS['g_profile_db'],
			"INSERT INTO `chardev_characters` VALUES ('".
				$profile_id."','".
				$_SESSION['user_id']."','".
				mysql_real_escape_string($name)."','".
				mysql_real_escape_string($description)."','".
				$race_id."','".
				$class_id."','".
				$level."','".
				time()."','".
				mysql_real_escape_string(serialize($serialized))."',0,0)",
			$GLOBALS['g_db_con']
		);
		
		echo mysql_error();
	}
	
	mysql_db_query(
		$GLOBALS['g_profile_db'],
		"UNLOCK TABLES",
		$GLOBALS['g_db_con']
	);
	
	return $profile_id;
} 

function is_logged_in( $sessionId ) {
	if( isset($_SESSION['user_id']) && $_SESSION['user_id'] ) {
		return true;
	}
	return false;
}
?>