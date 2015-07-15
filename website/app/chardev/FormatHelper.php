<?php

namespace chardev;

class FormatHelper {
	public static function shorten ($s,$l) {
		return (mb_strlen($s)>$l?mb_substr($s,0,$l-3)."...":$s);
	}
	
	public static function escapeForUrl( $str ) {
		return rawurlencode(mb_ereg_replace('(?:\s|\\\\|\:|\/|\&|-|<|>|\.)+', "-", mb_ereg_replace('\'|\,|\?|!', "",$str)));
	}
	
	public static function verboseUrl( $id, $name, $page = 1 ) {
		return $id . ( $name ? "-".self::escapeForUrl($name) : "" ) . ( $page > 1 ? "-p$page" : "" );
	}
	
	public static function parseVerboseUrl( $url ) {
		$ret = array("Page"=>1, "Name" => "");
		$matches = array();
		$matches2 = array();
		
		mb_ereg('^(\d+)(?:-(.+))?$',$url,$matches);
		if( ! $matches ) {
			return null;
		}
		$ret["ID"] = $matches[1];
		
		if( isset($matches[2]) ) {
			mb_ereg('^(.+)-p(\d+)$', $matches[2], $matches2 );
			if( $matches2 ) {
				$ret["Name"] = $matches2[1];
				$ret["Page"] = (int) $matches2[2];
			}
			else {
				$ret["Name"] = isset($matches[2]) ? $matches[2] : "";
			}
		}
		return $ret;
	}
	
	public static function getRedirectUrl() {
		
		$url = "";
		if( isset($_POST['redirect_url'])) {
			$url = $_POST['redirect_url'];
		}
		else {
			if( ! preg_match('/(?:Login|Logout|Register|RecoverPassword)\.html/',$_SERVER['REQUEST_URI']) ) {
				$url = $_SERVER['REQUEST_URI'];
			}
		}
		if( ! $url ) {
			$url = 'Index.html';
		}
		return htmlspecialchars($url);
	}
	
	public static function redirect( $path ) {
		$protocol = "http";
		if( isset($_SERVER["HTTPS"]) ) {
			$protocol = "https";
		}
	
		header("HTTP/1.1 302 Found");
		header("Location: {$protocol}://{$_SERVER["HTTP_HOST"]}/$path");
		die;
	}
	
	public static function getProfileLink($id,$name) {
		return 'profile/' . FormatHelper::verboseUrl($id,$name) . '.html';
	}
}