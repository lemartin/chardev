<?php 
	include '../db.php';
	include '../common.php';
	
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	$class = (int)$_GET['class'];
	
	if( !$class ) {
		set_error_header("no class given");
		die;
	}
	else if( $class < 0 || $class > 10 || $class == 9 ) {
		set_error_header("invalid class (".$class.")");
		die;
	}
	
	echo json_encode(get_talents(pow(2,$class)));
?>