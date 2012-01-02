<?php 
	include '../../db.php';
	
	session_start();
	
	mysql_db_query(
		$GLOBALS['g_profile_db'],
		"UPDATE `wowreforge_storage` SET `Serialised` = '', `Time` = NOW() WHERE `ID` = '".mysql_real_escape_string($_GET['id'])."'",
		$GLOBALS['g_db_con']
	);
?>