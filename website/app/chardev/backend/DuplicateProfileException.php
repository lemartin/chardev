<?php

namespace chardev\backend;

class DuplicateProfileException extends \Exception {
	private $id;
	public function __construct( $id ) {
		$this->id = $id;
	}
	
	public function getId() {
		return $this->id;
	}
}