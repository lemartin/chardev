<?php
namespace chardev\profiles;

class UnableToValidateProfileException extends \Exception {
	private $msg;

	public function __construct( $name, $realm, $region, \Exception $cause ) {
		$this->msg = "Unable to validate existance of given profile ({$name}, {$region}-{$realm})";
		parent::__construct( $this->msg, 0, $cause );
	}

	public function __toString() {
		return $this->msg;
	}
}