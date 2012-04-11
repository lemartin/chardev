<?php
	class ForumPermissions {
		private $loggedInUser;
		public function __construct( $loggedInUser ) {	
			$this->loggedInUser = $loggedInUser;
		}
		public function mayEditPostsFrom( $authorId, $threadHook ) {
			if( $this->loggedInUser ) {
				switch( $threadHook ) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						return $this->loggedInUser->get_id() == $authorId || $this->loggedInUser->get_role() == 10;
					default: return false;
				}
			}
			return false;
			return $this->loggedInUser && $this->loggedInUser->get_role() == 10;
		}
		public function mayLockThreads() {
			return $this->loggedInUser && $this->loggedInUser->get_role() == 10;
		}
		public function mayDeleteThreads() {
			return $this->loggedInUser && $this->loggedInUser->get_role() == 10;
		}
		
		public function mayLockAnyThreads( $threadHook ) {
			if( $this->loggedInUser && $this->loggedInUser->get_role() == 10 ) {
				switch( $threadHook ) {
					case 1: return true;
					case 2: return true;
					case 3: return true;
					case 4: return true;
					case 5: return true;
					default: return false;
				}
			}
			return false;
		}
		
		public function mayDeleteAnyThreads( $threadHook ) {
			if( $this->loggedInUser && $this->loggedInUser->get_role() == 10 ) {
				switch( $threadHook ) {
					case 1: return true;
					case 2: return true;
					case 3: return true;
					case 4: return true;
					case 5: return true;
					default: return false;
				}
			}
			return false;
		}
		public function mayCreateThreads( $threadHook ) {
			if( ! $this->loggedInUser ) {
				return false;
			}
			if( $threadHook > 0 ) {
				switch( $threadHook ) {
					case 1: return true;
					case 2: return true;
					case 3: return true;
					case 4: return $this->loggedInUser->get_role() == 10;;
					case 5: return true;
					default: return false;
				}
			}
			return false;
		}
		public function mayCreateStickies( $threadHook ) {
			return $this->mayCreateThreads($threadHook) && $this->loggedInUser && $this->loggedInUser->get_role() == 10;
		}
		public function mayCreateAnnouncements( $threadHook ) {
			return $this->mayCreateThreads($threadHook) && $this->loggedInUser && $this->loggedInUser->get_role() == 10;
		}
		
		public function mayPost() {
			return $this->loggedInUser;
		}
	}
?>