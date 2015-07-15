<?php
namespace chardev\profiles;

class ProfileAlreadyAddedException extends \Exception {
	private $msg;

	public function __construct( $name, $realm, $region, \Exception $cause = null ) {
		$this->msg = "The profile was already added ({$name}, {$region}-{$realm})";
		parent::__construct( $this->msg, 0, $cause );
	}

	public function __toString() {
		return $this->msg;
	}
}