<?php

namespace chardev\forum;

class ForumPermissions {
	private $loggedInUser;
	public function __construct( \chardev\backend\entities\User $loggedInUser = null) {
		$this->loggedInUser = $loggedInUser;
	}
	public function mayEditPost( \chardev\forum\facades\PostFacade $post ) {
		if ($this->loggedInUser) {
			switch ( $post->getThread()->getHook()->getId()) {
				case 1 :
				case 2 :
				case 3 :
				case 4 :
				case 5 :
					return $this->loggedInUser->getId() == $post->getAuthor()->getId() || $this->loggedInUser->getRole() == 10;
				default :
					return false;
			}
		}
		return false;
		return $this->loggedInUser && $this->loggedInUser->getRole() == 10;
	}
	public function mayDeletePost( \chardev\forum\facades\PostFacade $post ) {
		return $this->loggedInUser && $this->loggedInUser->getRole() == 10;
	}
	public function mayLockThread( \chardev\forum\facades\ThreadFacade $thread) {
		return $this->loggedInUser && $this->loggedInUser->getRole() == 10 && $thread->getHook()->getId() < 5;
	}
	
	public function mayDeleteThread( \chardev\forum\facades\ThreadFacade $thread) {
		return $this->loggedInUser && $this->loggedInUser->getRole() == 10 && $thread->getHook()->getId() < 5;
	}
	
	public function mayCreateThreads($threadHookId) {
		if (! $this->loggedInUser) {
			return false;
		}
		if ($threadHookId > 0) {
			switch ($threadHookId) {
				case 1 :
					return true;
				case 2 :
					return true;
				case 3 :
					return true;
				case 4 :
					return $this->loggedInUser->getRole() == 10;
					;
				case 5 :
					return true;
				default :
					return false;
			}
		}
		return false;
	}
	
	public function mayCreateStickies($threadHookId) {
		return $this->mayCreateThreads ( $threadHookId ) && $this->loggedInUser && $this->loggedInUser->getRole() == 10;
	}
	
	public function mayCreateAnnouncements($threadHookId) {
		return $this->mayCreateThreads ( $threadHookId ) && $this->loggedInUser && $this->loggedInUser->getRole() == 10;
	}
	
	public function mayReplyTo( \chardev\forum\facades\ThreadFacade $thread ) {
		return $this->loggedInUser && ! $thread->isLocked();
	}
}
?>