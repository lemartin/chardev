<?php 
	session_start();

	include './../../db.php';
	include './../../common.php';

	$notice = "";
	
	authenticate( $_GET['user_name'], $_GET['password'], $_GET['cookie'], $notice );
	
	if( $notice ) {
		ajax_response::die_on_error("You are not allowed to lock this thread!");
	}
	else {
		echo json_encode(array( 
			"session_id" => session_id(), 
			"user_id" => $_SESSION['user_id'],
			"user_name" => $_SESSION['user_name'],
			"user_data" => $_SESSION['user_data'],
		));
	}
?>