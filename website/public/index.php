<?php

require_once __DIR__ . "/../app/bootstrap.php";

use chardev\ChardevHelper;
use chardev\FormatHelper;
use chardev\Session;
use chardev\TemplateHelper;
use chardev\backend\DoesNotExistException;
use chardev\backend\UserDatabase;

define('BUILD', (int)file_get_contents("../build/.build"));

Session::startUserSession();

$uri = $_SERVER['REQUEST_URI'];
$th = new TemplateHelper();
$th->addStyleSheets(array("chardev9.css","list.css","tooltip.css"));

$th->addScripts(array(
		"js/common/extern/md5.js",
		"js/common/extern/json2.js",
		"js/common/extern/jquery-1.7.2.min.js",
		"js/common/extern/stacktrace-min-0.3.js"));

//if( isset($_GET['debug']) ) {
	include '../build/js_files.php';
	$th->addScripts($js_files);
// }
// else {
// 	$th->addScript("js/all_optimised.js");
// }

$loggedInUser = Session::getLoggedInUser();

try {
	if( preg_match('/^\/chardev7\/(.*)$/',$uri, $matches )) {
		header("Location: http://wotlk.chardev.org" . $matches[1]);
		die;
	}
	else 
	if( isset($_GET['planner']) ) {
		header("Location: ".TemplateHelper::getBasePath()."Planner.html");
		die;
	}
	else if(isset($_GET['t']) || preg_match('/^\/talents\/([^\/]+)\.html(?:\?.*|$)/',$uri,$matches)) {
		$th->setTemplate('Talents',array( 'id-name' => isset($matches) && isset($matches[1]) ? $matches[1] : ""));
	}
	else if( preg_match('/^\/(?:\?.*|$)/',$uri,$matches)) {
		$th->setTemplate('Index');
	}
	else if( preg_match('/^\/(\w+)\.html(?:\?.*|$)/',$uri,$matches)) {
		if( $matches[1] == 'Login' && $loggedInUser ) {
			header("Location: " . TemplateHelper::getBasePath() . '/Logout.html');
			die;
		}
		else if( $matches[1] == 'Logout' && ! $loggedInUser ) {
			header("Location: " . TemplateHelper::getBasePath() . '/Login.html');
			die;
		}
		
		$th->setTemplate($matches[1]);
	}
	else if( preg_match('/^\/baseStats\/([^\/]+)\.html(?:\?.*|$)/',$uri,$matches)) {
		$th->setTemplate('BaseStats',array( 'id-name' => $matches[1]));
	}
	else if( isset($_GET['profile'])) {
		$id = (int)$_GET['profile'];
		if( $id > 0 ) {
			header("Location: ".TemplateHelper::getBasePath()."profile/" . $id. ".html");
		}
		else {
			header("Location: ".TemplateHelper::getBasePath()."Planner.html");
		}
		die;
	}
	else if( preg_match('/^\/profile\/([^\/]+)\.html(?:\?.*|$)/',$uri,$matches)) {
		
		$parsed = FormatHelper::parseVerboseUrl($matches[1]);
			
		try {
			$profile = UserDatabase::getInstance()->getProfile($parsed["ID"]);
			
			if( $parsed["Name"] != FormatHelper::escapeForUrl($profile[0][0]) ) 
			{
				header("Location: " . TemplateHelper::getBasePath() . "profile/" . FormatHelper::verboseUrl( $parsed["ID"], $profile[0][0] ) . ".html");
				die;
			}
		
			$th->setTemplate("Planner", array(
					"profile" => $profile
			));
		}
		catch( DoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
	}
	//
	//	SPELL
	//
	else if( preg_match('/^\/spell\/([^\/]+)\.html(?:\?.*|$)/',$uri,$matches) || preg_match('/^\/spell\/(\d+)$/',$uri,$matches)) {
		$parsed = FormatHelper::parseVerboseUrl($matches[1]);
		
		if( $parsed == null ) {
			return;
		}
		
		$spellId = $parsed["ID"];
		//
		// Retrieve spell from db
		try {
			$data = chardev\backend\data\SpellData::getInstance()->fromId($spellId);
			$spell = new chardev\backend\entities\Spell($data);
			//
			// Found spell name is not matching the ID -> redirect
			if ($parsed["Name"] != FormatHelper::escapeForUrl($spell->getName())) {
				header("Location: ".TemplateHelper::getBasePath()."spell/".FormatHelper::verboseUrl($spell->getId(),$spell->getName()).".html");
			}
			//
			$th->setTemplate("Spells", array("spell" => $spell));
		}
		//
		// No spell with ID found
		catch( DoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
	}
	//
	//	ITEM
	//
	else if( preg_match('/^\/item\/([^\/]+)\.html(?:\?.*|$)/',$uri,$matches) || preg_match('/^\/item\/(\d+)$/',$uri,$matches)) {
		$parsed = FormatHelper::parseVerboseUrl($matches[1]);
		
		if( $parsed == null ) {
			return;
		}
		
		$itemId = $parsed["ID"];
		//
		// Retrieve item from db
		try {
			$data = chardev\backend\data\ItemData::getInstance()->fromId($itemId);
			$item = new chardev\backend\entities\Item($data);
			//
			// Found item name is not matching the ID -> redirect
			if ($parsed["Name"] != FormatHelper::escapeForUrl($item->getName())) {
				header("Location: ".TemplateHelper::getBasePath()."item/".FormatHelper::verboseUrl($item->getId(),$item->getName()).".html");
			}
			//
			$th->setTemplate("Items", array("item" => $item));
		}
		//
		// No item with ID found
		catch( DoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
	}
	//
	//	USER
	//
	else if( preg_match('/^\/user\/([^\/]+)(?:\/(Index|Profiles|Delete|Password))?\.html(?:\?.*|$)/',$uri,$matches)) {
		$parsed = FormatHelper::parseVerboseUrl($matches[1]);
		
		try {
			$user = new \chardev\backend\entities\User($parsed["ID"]);
				
			if( $parsed["Name"] != FormatHelper::escapeForUrl($user->getName()) ) {
				
				header("Location: " . ChardevHelper::getUserUrl($user));
				die;
			}
			
			$th->setTemplate("User", array(
				"user_category" => isset($matches[2]) ? $matches[2] : "Index", 
				"validated_args" => array(
					"ID" => $parsed["ID"],
					"Name" => $parsed["Name"],
					"User" => $user
				)
			));
		}
		catch( DoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
	}
	//
	//	THREAD HOOK
	//
	else if( preg_match('/^\/forum\/([^\/]+)\.html(?:\?.*|$)/',$uri,$matches)) {	
		$db = new chardev\forum\ThreadDatabase( "mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
		try {
			$th->setTemplate("Hook", array(
					"forum" => $matches[1], 
					"db" => $db, 
					"validated_args" => \chardev\forum\ForumHelper::validateArgs( $db, $matches[1] ))
			);
		}
		catch( \chardev\forum\HookDoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
	}
	//
	//	NEW THREAD
	//
	else if( preg_match('/^\/forum\/([^\/]+)\/NewThread\.html(?:\?.*|$)/',$uri,$matches)) {
		$db = new chardev\forum\ThreadDatabase( "mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
		try {
			$th->setTemplate("NewThread", array(
					"forum" => $matches[1],
					"db" => $db,
					"validated_args" => \chardev\forum\ForumHelper::validateArgs( $db, $matches[1] ))
			);
		}
		catch( \chardev\forum\HookDoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
	}
	//
	//	THREAD
	//
	else if( preg_match('/^\/forum\/([^\/]+)\/([^\/]+)(\/Reply|\/Edit)?\.html(?:\?.*|$)/',$uri,$matches)) {
		$db = new chardev\forum\ThreadDatabase( "mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
		try {
			$th->setTemplate("Thread", array(
					"forum" => $matches[1], 
					"thread" => $matches[2], 
					"reply" => isset($matches[3]) && $matches[3] == '/Reply',
					"edit" => isset($matches[3]) && $matches[3] == '/Edit',
					"db" => $db, 
					"validated_args" => \chardev\forum\ForumHelper::validateArgs( $db, $matches[1], $matches[2] ))
			);
		}
		catch( \chardev\forum\HookDoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
		catch( \chardev\forum\ThreadDoesNotExistException $e ) {
			$th->setTemplate("Error404");
		}
	}
	else {
		$th->setTemplate("Error404");
	}
}
catch( \Exception $e ) {
	$th->setTemplate("Error404", array( "exception" => $e ));
}

include __DIR__ . '/../app/layouts/layout.phtml';