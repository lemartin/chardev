<?php

	require_once '../../common.php';
	require_once '../../db.php';
		
	session_start();
	switch_game_data_base( isset($_SESSION['language']) ? $_SESSION['language'] : 0 );
	
	$error = "";
	
	$char = json_encode(get_battlenet_profile( $_GET['region'], $_GET['server'], $_GET['name'], $error));
	
	if( $error ) {
		header("error: yes");
		echo $error;
	}
	else {
		echo $char;
	}



?>