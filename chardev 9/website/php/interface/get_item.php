<?php 
	include '../db.php';
	include '../common.php';
	
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	$item = (int)$_GET['item'];
	
	echo json_encode(get_item($item));
?>