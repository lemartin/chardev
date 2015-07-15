<?php
namespace chardev\backend\entities;

class Item implements Entity {
	
	private $data;
	
	function __construct( $data ) {
		$this->data = $data;
	}
	
	public function getId() {
		return $this->data[0];
	}
	
	public function getName() {
		return $this->data[18];
	}
	
	public function getQuality() {
		return $this->data[1];
	}
	
	public function getData() {
		return $this->data;
	}
}