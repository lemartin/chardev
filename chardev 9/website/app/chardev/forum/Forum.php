<?php

namespace chardev\forum;

class Forum {
	
	private $db, $permissions;
	private $threadCache, $hookCache, $postCache;
	
	private static $instance;
	
	private function __construct() {
		$this->db = new ThreadDatabase("mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
		$this->permissions = new ForumPermissions();
		
		$this->threadCache = array();
		$this->hookCache = array();
		$this->postCache = array();
	}
	
	public static function getInstance() {
		return $this->instance;
	}
	
	public function getPost($id) {
		try {
			return $this->_getFromCache($this->postCache, $id);
		}
		catch( CacheException $e ) {
			$data = $this->db->getThread($id);
			$post = new Post($data);
			$this->_addToCache( $this->postCache, $post->getId(), $post );
			return $post;
		}
	}
	
	public function getThread($id) {
		try {
			return $this->_getFromCache($this->threadCache, $id);
		}
		catch( CacheException $e ) {
			$data = $this->db->getThread($id);
			$thread = new Thread($data);
			$this->_addToCache( $this->threadCache, $thread->getId(), $thread );
			return $thread;
		}
	}
	
	public function getThreads($hookId, $limit, $offset) {
		return $this->_objectify($this->db->getThreads($hookId, $limit, $offset));
	}
	
	public function getStickies($hookId, $limit, $offset) {
		return $this->_objectify($this->db->getStickies($hookId, $limit, $offset));
	}
	
	public function getAnnouncement($hookId, $limit, $offset) {
		return $this->_objectify($this->db->getAnnouncements($hookId, $limit, $offset));
	}
	
	private function _objectify( $datas ) {
		$threads = array();
		foreach( $datas as $data ) {
			$thread = new Thread($data);
			$this->_addToCache( $this->threadCache, $thread->getId(), $thread );
			$threads[] = $thread;
		}
		return $threads;
	}
	
	public function getPosts($threadId, $limit, $offset) {
		$datas = $this->db->getPosts($threadId, $limit, $offset);
		$posts = array();
		foreach( $datas as $data ) {
			$post = new Post($data);
			$this->_addToCache( $this->threadCache, $post->getId(), $post );
			$posts[] = $post;
		}
		return $posts;
	}
	
	protected function _addToCache( &$cache, $id, $item )  {
		$cache[$id] = $item;
	}
	
	protected function _getFromCache( &$cache, $id ) { 
		if(isset($cache[$id])) {
			return $cache[$id];
		}
		throw new CacheException();
	}
}