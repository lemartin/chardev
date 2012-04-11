<?php
	use chardev\backend\UserDatabase;

	$head = "";

	//include_once './php/filter.php'; // has to be first
	//filter_redirect();
	//
	
	require_once '../app/chardev/Autoloader.php';
	
	\chardev\Session::startUserSession();
	
	$locale = \chardev\Language::getInstance()->getLocaleArray();
	
	$loggedInUser = \chardev\Session::getLoggedInUser();
	
	$build_number = "9.0b"; $build = @file_get_contents('.build');
	
	define("PAGE_HOME",0);
	define("PAGE_PLANNER",1);
	define("PAGE_LOGIN",2);
	define("PAGE_LOGOUT",3);
	define("PAGE_SPELL",4);
	define("PAGE_ITEM",5);
	define("PAGE_SPELLS",6);
	define("PAGE_ITEMS",7);
	define("PAGE_TALENTS",8);
	define("PAGE_FORUM",9);
	define("PAGE_REGISTER",10);
	define("PAGE_DONATE",11);
	define("PAGE_RECOVER_PASSWORD",12);
	define("PAGE_BASE_STATS",13);
	define("PAGE_PLANNER_START",14);
	define("PAGE_USER",15);
	define("PAGE_CREDITS",16);
	define("PAGE_PROFILES",17);
	
	Mapper::getInstance()->addMappings(array("home","planner","login","recoverPassword","register","donate","forum"));
	Mapper::getInstance()->setDefault('home');
	
	$template = Mapper::getInstance()->map();
	
	$content = TemplateHelper::getInstance()->load($template);
	
	//
	//	Content includes
	//
// 	if( isset($_GET['spell']) ) {
// 		include '../php/content/spell.php';
// 		$page = PAGE_SPELL;
// 	}
// 	else if( isset($_GET['spells']) ) {
// 		include '../php/content/spells.php';
// 		$page = PAGE_SPELLS;
// 	}
// 	else if( isset($_GET['item']) ) {
// 		include '../php/content/item.php';
// 		$page = PAGE_ITEM;
// 	}
// 	else if( isset($_GET['items']) ) {
// 		include '../php/content/items.php';
// 		$page = PAGE_ITEMS;
// 	}
// 	else if( isset($_GET['planner']) || isset($_GET['profile']) || isset($_GET['c']) ) {
// 		$g_content = TemplateHelper::getInstance()->load('planner');
// 		$page = PAGE_PLANNER;
// 	}
// 	else if( isset($_GET['talents']) || isset($_GET['t']) ) {
// 		include '../php/content/talent_planner.php';
// 		$page = PAGE_TALENTS;
// 	}
// 	else if(isset($_GET['forum']) || isset($_GET['thread'])){
// 		include '../php/thread_test.php';
// 		$page = PAGE_FORUM;
// 	}
// 	else if(isset($_GET['register'])){
// 		include '../php/content/register.php';
// 		$page = PAGE_REGISTER;
// 	}
// 	else if(isset($_GET['resend_mail'])){
// 		include '../php/content/resend_mail.php';
// 		$page = PAGE_REGISTER;
// 	}
// 	else if(isset($_GET['login'])){
// 		$g_content = TemplateHelper::getInstance()->load('login');
// 		$page = PAGE_LOGIN;
// 	}
// 	else if( isset($_GET['donate'])){
// 		$g_content = TemplateHelper::getInstance()->load('donate');
// 		$page = PAGE_DONATE;
// 	}
// 	else if(isset($_GET['RecoverPassword'])){
// 		$g_content = TemplateHelper::getInstance()->load('recoverPassword');
// 		$page = PAGE_RECOVER_PASSWORD;
// 	}
// 	else if(isset($_GET['base_stats'])){
// 		include '../php/content/base_stats.php';
// 		$page = PAGE_BASE_STATS;
// 	}
// 	else if(isset($_GET['start'])) {
// 		include '../php/content/planner_start.php';
// 		$page = PAGE_PLANNER_START;
// 	}
// 	else if(isset($_GET['user'])) {
// 		include '../php/content/user.php';
// 		$page = PAGE_USER;
// 	}
// 	else if(isset($_GET['credits'])) {
// 		include '../php/content/credits.php';
// 		$page = PAGE_CREDITS;
// 	}
// 	else if(isset($_GET['profiles'])) {
// 		include '../php/content/profiles.php';
// 		$page = PAGE_PROFILES;
// 	}
// 	else {
// 		include '../php/content/home.php';
// 		$page = PAGE_HOME;
// 	} 
 

	$page = PAGE_HOME;
	$show_ads = ! ($loggedInUser && ( $loggedInUser->hasDonated() || isset($_GET['hideads']) && $loggedInUser->getRole() == 10 ) || isset($_GET['hideads']));
	
	$disable_google = true;
	
	//&& $_SERVER['HTTP_HOST']!="127.0.0.1" && $_SERVER['HTTP_HOST']!="192.168.178.100" && $_SERVER['HTTP_HOST']!="192.168.178.22";
	//
	//	PHP generated JS
	//	
	
	TemplateHelper::getInstance()->addStyleSheets(array("chardev9.css","list.css","tooltip.css"));
	foreach( TemplateHelper::getInstance()->getStyleSheets() as $link ) {
		$head .= "<link type=\"text/css\" href=\"{$link}.css?{$build}\" rel=\"stylesheet\" />\n";
	}
	
	include '../build/js_files.php';
	TemplateHelper::getInstance()->addScripts($js_files);
	foreach( TemplateHelper::getInstance()->getScripts() as $script ) {
		$head .= "<script src='{$script}?".$build."' type='text/javascript'></script>\n";
	}
	
	include '../app/layouts/layout.phtml';