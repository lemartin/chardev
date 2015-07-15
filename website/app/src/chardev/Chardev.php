<?php

namespace chardev;

class Chardev {
	private static $instance = null;
	
	/**
	 * @return Chardev
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new Chardev();
		}
		return self::$instance;
	}
	
	protected function __construct() {
		//
	}
	
	public function showAds() {
		return true;
	}
	
	public function hideGoogle() {
		return false;
	}
	
	public function getBuild() {
		return time();
	}
}