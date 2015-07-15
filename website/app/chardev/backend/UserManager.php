<?php

namespace chardev\backend;

class UserManager {
	private static $instance = null;
	
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new UserManager(/*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct(/*args*/) {
		// TODO: Auto-generated stub
	}
	
	public function sendRecoveryEmail( $id ) {
		$user = new \chardev\backend\entities\User($id);
		
		$t = urlencode($this->createRecoveryToken($user));
		
		$url = "http://chardev.org/RecoverPassword.html?token={$t}";
		$name = $user->getName();
		$email = $user->getEmail();
		
		include __DIR__ . '/../../resources/recoveryMail.inc';
		@mail($email,"Recover your chardev.org password",$content,$headers);
	}
	
	public function validateRecoveryToken( $token ) {
		$arr = $this->parseRecoveryToken($token);
		
		try {
			$user = new \chardev\backend\entities\User($arr["user_id"]);
		}
		catch( DoesNotExistException $dnee ) {
			return false;
		}
		
		return $user->validateToken($arr["user_token"], $arr["time"]) && ( time() - $arr["time"] < 86400 );
	}
	
	public function parseRecoveryToken( $token ) {
		$str = base64_decode($token);
		
		$userToken = bin2hex(substr($str, 0, 16));
		
		$l = ord(substr($str, 16, 1));
		$time = hexdec(bin2hex(substr($str, 17, $l)));
		$userId = hexdec(bin2hex(substr($str, 17 + $l)));
		
		return array( "user_token" => $userToken, "time" => $time, "user_id" => $userId );
	}
	
	protected function createRecoveryToken( \chardev\backend\entities\User $user ) {
		$time = time();
		$binTime = $this->hex2bin(dechex($time));
		return base64_encode($this->hex2bin($user->getToken($time)) . chr(strlen($binTime)) . $binTime . $this->hex2bin(dechex($user->getId())));
	}
	
	private function hex2bin( $str ) {
		if((strlen($str) % 2)) {
			$str = '0' . $str;
		}
		return pack('H'.strlen($str),$str);
	}
}