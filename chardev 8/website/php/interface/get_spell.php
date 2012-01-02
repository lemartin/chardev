<?php 
	include '../db.php';
	include '../common.php';
	
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	$spell = (int)$_GET['spell'];
	
	echo json_encode(get_spell($spell));
?>