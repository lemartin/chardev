<?php

namespace chardev\forum;

class Post {
	
	function __construct( array $data ) {
		$this->data = $data;
	}
	
	public function getCreated() {
		return $this->data["Created"];
	}
	
	public function getContent() {
		return $this->data["Content"];
	}
	
	public function getModCount() {
		return $this->data["ModCount"];
	}
	
	public function getLastCreated() {
		return $this->data["LastCreated"];
	}
	
	public function getId() {
		return $this->data["ID"];
	}
	
	public function getAuthor() {
		return $this->author;
	}
	
	public function getThread() {
		return Forum::getInstance()->getThread($this->data["ThreadID"]);
	}
}