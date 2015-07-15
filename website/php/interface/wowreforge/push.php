<?php 
	include '../../db.php';
	include '../../common.php';
	
	session_start();
	
	if( !isset($_GET['reforging']) ) {
		echo_cb("REFORGING_NOT_SET");
	}
	else if( !isset($_GET['profile-id']) ) {
		echo_cb("PROFILE_ID_NOT_SET");
	}
	else if( ! get_storage_record($_GET['profile-id']) ) {
		echo_cb("PROFILE_ID_INVALID");
	}
	else {
		mysql_db_query(
			$GLOBALS['g_profile_db'],
			"UPDATE `wowreforge_storage` SET `Serialised` = '".mysql_real_escape_string($_GET['reforging'])."', `Time` = NOW() WHERE `ID` = '".mysql_real_escape_string($_GET['profile-id'])."'",
			$GLOBALS['g_db_con']
		);
		echo_cb("SUCCESS");
	}
	
	function echo_cb( $content ) {
		if( ! isset($_GET['jsonp_callback']) ) {
			return;
		}
	
		echo $_GET['jsonp_callback'] . '(' . json_encode($content) . ');';
	}
?>