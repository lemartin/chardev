<?php
	include '../db.php';
	include '../filter.php';
	include '../common.php';
	//
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	//
	echo json_encode(get_sets($_GET['a'],"",$_GET['o'],(int)$_GET['p'], isset($_GET['weights']) ? json_decode($_GET['weights']) : null ));
	
	
?>