<?php

namespace chardev;

class Ajax {
	public static function dieOnError( $error_msg, $description = null ) {
		header("error: yes");
		die(json_encode($error_msg . ( $description ? ": " . $description : "" )));
	}

	public static function dieOnException( \Exception $e ) {
		header("error: yes");
		$arr = array();
		$arr[] = $e->getMessage();

		while( $cause = $e->getPrevious() ) {
			$arr[] = $cause->getMessage();
			$e = $cause;
		}
		die(json_encode($arr));
	}
	
	public static function autoRedirect( $url ) {
		header("auto_redirect: yes");
		die(json_encode($url));
	}
}