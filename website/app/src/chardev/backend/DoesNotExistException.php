<?php
namespace chardev\backend;

class DoesNotExistException extends \Exception {
	public function __construct($message) {
		parent::__construct($message);
	}
}

?>