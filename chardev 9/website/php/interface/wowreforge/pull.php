<?php 
	include '../../db.php';
	include '../../common.php';
	
	session_start();
	
	$record = get_storage_record($_GET['id']);
	
	if( ! $record ) {
		header("error: Unable to export, temporary profile has timed out!");
		echo json_encode(null);
	}
	else if( $record['Serialised'] ) {
		echo json_encode($record['Serialised']);
	}
	else {
		echo json_encode(null);
	}
	
?>