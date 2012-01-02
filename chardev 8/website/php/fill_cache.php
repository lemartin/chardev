<?php

	require_once 'db.php';
	require_once 'common.php';

	$result = mysql_query("SELECT `ID` FROM chardev_cataclysm.`spell`");
	
	while( $record = mysql_fetch_assoc($result)){
		echo $record['ID']."\n";
		get_spell($record['ID']);
	}
?>