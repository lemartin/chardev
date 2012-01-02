<?php
	$g_lang_to_str = array('','1','fr','de','4','5','es','7','ru');
	
	
	$g_language = 0;
	
	if(strpos($_SERVER['HTTP_HOST'],"en.")!==false || ( isset($_GET['language']) && $_GET['language']=="en")){
		$g_language = 0;
	}
	else if(strpos($_SERVER['HTTP_HOST'],"fr.")!==false || ( isset($_GET['language']) && $_GET['language']=="fr")){
		$g_language = 2;
	}
	else if(strpos($_SERVER['HTTP_HOST'],"de.")!==false || ( isset($_GET['language']) && $_GET['language']=="de")){
		$g_language = 3;
	}
	else if(strpos($_SERVER['HTTP_HOST'],"es.")!==false || ( isset($_GET['language']) && $_GET['language']=="es")){
		$g_language = 6;
	}
	else if(strpos($_SERVER['HTTP_HOST'],"ru.")!==false || ( isset($_GET['language']) && $_GET['language']=="ru")){
		$g_language = 8;
	}
	else if( isset($_SESSION['language']) ){
		$g_language = $_SESSION['language'];
	}
	
	$_SESSION['language'] = $g_language;
	set_user_settings("language",$g_language);
	
	$locale = array();
	
	include('php/locale/en.php');
	//
	//	override language files and game data bases
	//
	switch($g_language){
		case 2:
			include('php/locale/fr.php');
			break;
		case 3:
			include('php/locale/de.php');
			break;
		case 6:
			include('php/locale/es.php');
			break;
		case 8:
			include('php/locale/ru.php');
			break;
	}
	
	switch_game_data_base($g_language);
?>