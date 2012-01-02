<?php

$g_game_db = "chardev_cataclysm";
$g_static_db = "chardev_cataclysm_static";
$g_forum_db = "chardev";
$g_user_db = "chardev";
$g_profile_db = "chardev_user";
$g_db_con = connect_to_db();
$g_table_suffix = "EN";

function connect_to_db () {
	
	$host 	= "localhost";
	$db = "chardev";

	$user = "root";
	$pw = "";
	
	$db_con = mysql_connect($host,$user,$pw);;

	if(!$db_con)
	{ 
		echo "Unable to connect to database server!"; 
		die;
	}
	else if(!mysql_select_db($db,$db_con))
	{ 
		echo mysql_error();
		echo "Unable to access database!"; die;
	}
	
	mysql_set_charset("utf8");

	return $db_con;
}

function switch_game_data_base( $language = 0 ) {
	
	switch($language){
		case 0:
			$GLOBALS['g_game_db'] = "chardev_cataclysm";
			$GLOBALS['g_table_suffix'] = "EN";
			break;
		case 2:
			$GLOBALS['g_game_db'] = "chardev_cataclysm_fr";
			$GLOBALS['g_table_suffix'] = "FR";
			break;
		case 3:
			$GLOBALS['g_game_db'] = "chardev_cataclysm_de";
			$GLOBALS['g_table_suffix'] = "DE";
			break;
		case 6:
			$GLOBALS['g_game_db'] = "chardev_cataclysm_es";
			$GLOBALS['g_table_suffix'] = "ES";
			break;
		case 8:
			$GLOBALS['g_game_db'] = "chardev_cataclysm_ru";
			$GLOBALS['g_table_suffix'] = "RU";
			break;
	}
}

?>