<?php

namespace chardev\profiles;

class UnableToCreateProfileException extends \Exception {

	private $name, $realm, $region, $msg;

	public function __construct( $name, $realm, $region, Exception $cause = null ) {
		$this->name = $name;
		$this->realm = $realm;
		$this->region = $region;
		$this->msg = "Unable to create profile for ({$name}, {$region}-{$realm})";
		if( $cause ) {
			$this->msg .= ", Caused by " . $cause;
		}

		parent::__construct( $this->msg, 0, $cause );
	}
	public function __toString() {
		return $this->msg;
	}
	public function get_name() {
		return $this->name;
	}
	public function get_realm() {
		return $this->realm;
	}
	public function get_region() {
		return $this->region;
	}
}