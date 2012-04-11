<?php
	include '../db.php';
	include '../common.php';
	
	$result = mysql_query ( 'SELECT `ID` FROM chardev_cataclysm.`Spell` ' ); 
	
	while( $record = mysql_fetch_assoc( $result) ) {
		get_spell( (int)$record['ID'] );
	}
?>