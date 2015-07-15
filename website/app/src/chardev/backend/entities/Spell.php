<?php

namespace chardev\backend\entities;

class Spell {
	
	protected $data = null;
	protected $effects = null;
	
	public function __construct( $data ) {
		$this->data = $data;
		
		$effects = array();
		foreach( $data[10] as $index => $effectData ) {
			$effect[$index] = new SpellEffect($effectData);
		}
	}
	
	public function getId() {
		return $this->data[0];
	}
	
	public function getName() {
		return $this->data[1];
	}
	
	public function getDescription() {
		return $this->data[2];
	}
	
	public function getEffect( $index ) {
		return $this->effects[$index];
	}
	
	public function getData() {
		return $this->data;
	}
}