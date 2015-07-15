<?php 

namespace chardev;

use \chardev\backend\entities\User;

class Session {
	
	protected static $loginException = null;
	
	private static $lastSession = null;
	
	public static function startUserSession() {
		if( isset($_SESSION) || !session_start()) {
			throw new \Exception("Unable to start session", 0, self::$lastSession);
		}
		self::$lastSession = new \Exception("Last session was here!");
		
		if( isset($_POST['logout']) ) {
			self::logout();
			
			header("Location: ".$_POST['redirect_url']);
			die;
		}
		else if( isset($_POST['login_user_name']) && isset($_POST['login_password']) ) {
			
			try {
				self::storeUserData(\chardev\backend\UserDatabase::getInstance()->authenticate($_POST['login_user_name'], $_POST['login_password']));
				
				if( isset($_POST['login_cookie']) && $_POST['login_cookie'] ) {
					self::createLoginCookie();
				}
				header("Location: ".$_POST['redirect_url']);
				die;
			}
			catch( \InvalidArgumentException $e ) {
				self::$loginException = $e;
			}
			catch( \chardev\backend\RegistrationPendingException $e ) {
				self::$loginException = $e;
			}
			catch( \chardev\backend\WrongUserNamePasswordException $e ) {
				self::$loginException = $e;
			}
		}
		else {
			self::loginFromCookie();
		}
		
		$language = \chardev\Language::getInstance()->getLanguage();
		
		$_SESSION['language'] = $language;
		$_SESSION['store'] = array();
		
		$user = self::getLoggedInUser();
		if( $user ) {
			$user->setLanguage($language);
		}
	}
	
	public static function login( $userName, $password, $stayLoggedIn ) {
		
		self::storeUserData(\chardev\backend\UserDatabase::getInstance()->authenticate($userName,$password));
		
		if( $stayLoggedIn ){
			self::createLoginCookie();
		}
		return self::getLoggedInUser(); 
	}
	
	public static function logout() {
		self::clearUserData();
		self::clearCookie();
	}
	
	public static function getLoginException() {
		return self::$loginException;
	}
	
	public static function startBackendSession() {
		if( isset($_SESSION) || !session_start() ) {
			throw new \Exception("Unable to start session");
		}
		self::$lastSession = new \Exception("Last session was here!");
		\chardev\backend\Database::connect();
	}
	
	public static function storeUserData( \chardev\backend\entities\User $user ) {
		$_SESSION['user_name']=$user->getName();
		$_SESSION['role']=$user->getRole();
		$_SESSION['user_id']=$user->getId();
		
		$_SESSION['donated'] = $user->hasDonated();
		$_SESSION['language']= $user->getLanguage();
		$_SESSION['avatar']= $user->getAvatar();
	}
	
	public static function createLoginCookie() {
		$user = self::getLoggedInUser();
		if( ! $user ) {
			return;
		}
		$time = time();
		setCookie("UserId",$user->getId(),$time+2592000,'/');
		setCookie("Time",$time,$time+2592000,'/');
		setCookie("Token",$user->getToken($time),$time+2592000,'/');
	}
	
	public static function loginFromCookie() {
		if( isset($_COOKIE["UserId"]) && isset($_COOKIE["Time"]) && isset($_COOKIE["Token"])) {
			$user = new User($_COOKIE["UserId"]);
			if( $user->validateToken($_COOKIE["Token"], $_COOKIE["Time"]) ) {
				self::storeUserData($user);
			}
			else {
				self::clearCookie();
			}
		}
		else {
			return null;
		}
	}
	
	public static function loggedIn() {
		return isset($_SESSION['user_id']);
	}
	
	public static function clearUserData() {
		if (ini_get("session.use_cookies")) {
			$params = session_get_cookie_params();
			setcookie(session_name(), '', time() - 42000,
					$params["path"], $params["domain"],
					$params["secure"], $params["httponly"]
			);
		}
		
		session_destroy();
	}
	
	public static function clearCookie() {
		setCookie("UserId",null,-1,'/');
		setCookie("Time",null,-1,'/');
		setCookie("Token",null,-1,'/');
	}
	
	public static function getLoggedInUser() {
		return isset($_SESSION['user_id']) ? new User($_SESSION['user_id']) : null;
	}
	
	public static function store( $key, $value ) {
		$_SESSION['store'][$key] = $value;
	}
	
	public static function get( $key ) {
		return $_SESSION['store'][$key];
	}
}