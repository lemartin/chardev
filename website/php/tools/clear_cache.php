<?php 
	include('../db.php');
	
	mysql_select_db($GLOBALS['g_game_db']);
	mysql_query('TRUNCATE TABLE `chardev_item_cache`');
	mysql_query('TRUNCATE TABLE `chardev_spell_cache`');
	mysql_query('TRUNCATE TABLE `chardev_spellitemenchantment_cache`');
	mysql_query('TRUNCATE TABLE `chardev_talents_cache`');
	mysql_query('TRUNCATE TABLE `chardev_chrclass_cache`');
	
	mysql_query('TRUNCATE TABLE chardev_cataclysm_de.`chardev_item_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_de.`chardev_spell_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_de.`chardev_spellitemenchantment_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_de.`chardev_talents_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_de.`chardev_chrclass_cache`');
	
	mysql_query('TRUNCATE TABLE chardev_cataclysm_fr.`chardev_item_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_fr.`chardev_spell_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_fr.`chardev_spellitemenchantment_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_fr.`chardev_talents_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_fr.`chardev_chrclass_cache`');
	
	mysql_query('TRUNCATE TABLE chardev_cataclysm_es.`chardev_item_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_es.`chardev_spell_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_es.`chardev_spellitemenchantment_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_es.`chardev_talents_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_es.`chardev_chrclass_cache`');
	
	mysql_query('TRUNCATE TABLE chardev_cataclysm_ru.`chardev_item_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_ru.`chardev_spell_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_ru.`chardev_spellitemenchantment_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_ru.`chardev_talents_cache`');
	mysql_query('TRUNCATE TABLE chardev_cataclysm_ru.`chardev_chrclass_cache`');
?>