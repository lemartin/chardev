<?php 
	include '../db.php';
	include '../common.php';
	
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	$set = (int)$_GET['set'];
	
	echo json_encode(get_set($set));
?>