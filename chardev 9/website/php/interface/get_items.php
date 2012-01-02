<?php
	include '../db.php';
	include '../filter.php';
	include '../common.php';
	//
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	//
	echo json_encode(get_items( 
		isset($_GET['a']) ? $_GET['a'] : "",
		"",
		isset($_GET['o']) ? $_GET['o'] : "",
		isset($_GET['p']) ? (int)$_GET['p'] : 1,
		isset($_GET['weights']) ? json_decode($_GET['weights']) : null 
	));
	
	
?>