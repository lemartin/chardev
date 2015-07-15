<?php
namespace chardev\forum\facades;

use chardev\forum\ThreadDatabase;
use chardev\backend\entities\User;

class ThreadFacade {
	
	private $thread;
	private $author;
	private $lastPostAuthor;
	private $hook;
	
	public function __construct( $hook, $thread ) {
		$this->thread = $thread;
		$this->author = new UserFacade(new User($thread["AuthorID"]));
		if( $thread["PostAuthorID"] ) {
			$this->lastPostAuthor = new UserFacade(new User($thread["PostAuthorID"]));
		}
		$this->hook = new HookFacade($hook);
	}
	
	public function getHook() {
		return $this->hook;
	}
	
	public function getTitle() {
		return $this->thread["Title"];
	}
	
	public function isSticky() {
		return ($this->thread["Flag"] & ThreadDatabase::FLAG_THREAD_STICKY) != 0;
	}
	
	public function isAnnouncement() {
		return ($this->thread["Flag"] & ThreadDatabase::FLAG_THREAD_ANNOUNCEMENT) != 0;
	}
	
	public function isLocked() {
		return ($this->thread["Flag"] & ThreadDatabase::FLAG_LOCKED) != 0;
	}
	
	public function getAuthor() {
		return $this->author;
	}
	
	public function getCreated() {
		return $this->thread["Created"];
	}
	
	public function getPostCount() {
		return $this->thread["PostCount"];
	}
	
	public function getId() {
		return $this->thread["ID"];
	}
	
	public function getLastPostCreated() {
		return $this->thread["PostCreated"];
	}
	
	public function getLastPostAuthor() {
		return $this->lastPostAuthor;
	}
	
	public function getData() {
		return $this->thread;
	}
}