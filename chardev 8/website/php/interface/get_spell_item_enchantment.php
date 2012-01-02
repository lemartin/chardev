<?php 
	include '../db.php';
	include '../common.php';
	
	session_start();
	switch_game_data_base($_SESSION['language']);
	
	$spell_item_enchantment = (int)$_GET['spellitemenchantment'];
	
	echo json_encode(get_spell_item_enchantment($spell_item_enchantment));
?>