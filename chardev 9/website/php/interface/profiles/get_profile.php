<?php 
	include './../../db.php';
	include './../../common.php';
	
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	$id = (int)$_GET['id'];
	
	echo json_encode(get_profile($id));
?>