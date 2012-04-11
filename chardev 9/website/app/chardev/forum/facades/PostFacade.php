<?php

namespace chardev\forum\facades;

use chardev\forum\ThreadDatabase;
use chardev\backend\entities\User;

class PostFacade {
	
	private $post;
	private $author;
	private $thread;
	
	function __construct( $hook, $thread, $post ) {
		$this->post = $post;
		$this->author = new UserFacade(new User($post["AuthorID"]));
		$this->thread = new ThreadFacade($hook, $thread);
	}
	
	public function getCreated() {
		return $this->post["Created"];
	}
	
	public function getContent() {
		return $this->post["Content"];
	}
	
	public function getModCount() {
		return $this->post["ModCount"];
	}
	
	public function getLastCreated() {
		return $this->post["LastCreated"];
	}
	
	public function getPosition() {
		return $this->post["Position"];
	}
	
	public function getId() {
		return $this->post["ID"];
	}
	
	public function getAuthor() {
		return $this->author;
	}
	
	public function getThread() {
		return $this->thread;
	}
} 