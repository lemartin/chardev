<?php
	require_once './../db.php';
	require_once './../common.php';
	
	
	ini_set('default_socket_timeout', 5);
	set_time_limit(0);
	
	$result = mysql_db_query(
		$GLOBALS['g_game_db'],
		"SELECT `ID` FROM `item_sparse`",
		$GLOBALS['g_db_con']
	);

	while( $record = mysql_fetch_assoc($result) )
	{
		$contents = file_get_contents("http://eu.battle.net/wow/en/item/".$record['ID']);
		
		if( !$contents ) {
			echo "no conent\n";
			continue;
		}
		
		$xml = simplexml_load_string($contents);
		if( !$xml ) {
			echo "invalid xml\n";
			continue;
		}
		
		echo $record['ID']."\n";
		
		mysql_db_query(
			$GLOBALS['g_static_db'],
			"REPLACE INTO `chardev_data_bnet_item` VALUES ("
				."'".$record['ID']."',"
				."'".mysql_real_escape_string($contents)."')"
			,
			$GLOBALS['g_db_con']
		);
		
		sleep(0.5);
	}
?>