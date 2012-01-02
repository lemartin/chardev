<?php
	require_once 'thread_database.php';

	class Thread {
		
		const FLAG_NONE = 0;
		const FLAG_DELETED = 1;
		const FLAG_LOCKED = 2;
		const FLAG_STICKY = 1024;
		const FLAG_ANNOUNCEMENT = 2048;
		
		private $id;
		private $title;
		private $authorId;
		private $flag;
		private $posts;
		
		public function __construct( ThreadDatabase $db, $threadId ) {
		
			$record = $db->getThread($threadId);
			
			if( ! $record ) {
				throw new InvalidThreadException($threadId);
			}
			
			$this->id = (int)$record['ID'];
			$this->flag = (int)$record['Flag'];
		}
		
		public function getPosts( ThreadDatabase $db, $page ) {
			
		}
	}
	
	class InvalidThreadException extends Exception {
		private $id;
		public function __construct($threadId) {
			parent::__construct();
			$this->id = $threadId;
		}
		
		public function __toString() {
			return "Unable to create thread for id: " . $this->id;
		}
	}
	
	class Post {
		const FLAG_DELETED = 1;
		const FLAG_LOCKED = 2;
		const FLAG_ADMIN_EDIT = 1024;
		
		private $history;
		
		public function __construct( ThreadDatabase $db, $postId ) {
			
		}
	}
?>