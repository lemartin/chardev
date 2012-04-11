<?php
namespace chardev\forum\facades;

class HookFacade {
	
	private $hook;
	
	function __construct( $hook ) {
		$this->hook = $hook;
	}
	
	function getName() {
		return $this->hook["Name"];
	}
	
	function getId() {
		return $this->hook["ID"];
	}
	
	function getThreadCount() {
		return $this->hook["ThreadCount"];
	}
	
	function getPostCount() {
		return $this->hook["PostCount"];
	}
	
	function getData() {
		return $this->hook;
	}
}