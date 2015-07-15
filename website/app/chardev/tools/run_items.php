<?php
	use chardev\backend\Database;
	use chardev\backend\DatabaseHelper;
	
	require_once __DIR__ . '/../Autoloader.php';

	$records = DatabaseHelper::fetchMany(Database::getConnection(), "SELECT `ID` FROM chardev_cataclysm.`item`");
	
	$procs = 8;
	
	$n = ceil(count($records) / (float)$procs);
	
	for( $i=0; $i<$procs; $i++ ) {
		$output = null;
		
		$WshShell = new COM("WScript.Shell");
		$WshShell->Run("php \"" . __DIR__ . "\\retrieve_items.php \" " . ($i * $n) . " " . $n, 0, false);
		
		echo $i;
	}