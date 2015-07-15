<?php 
	session_start();

	include './../../db.php';
	include './../../common.php';

	$notice = "";
	
	authenticate( $_GET['user_name'], $_GET['password'], $_GET['cookie'], $notice );
	
	echo json_encode($notice ? 
		array(1,$notice) : 
		array(
			0,
			session_id(),
			$_SESSION['user_id'],
			$_SESSION['user_name']
		)
	);
?>