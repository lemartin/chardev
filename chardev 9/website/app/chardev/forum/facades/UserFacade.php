<?php
namespace chardev\forum\facades;

use chardev\backend\entities\User;

class UserFacade {
	
	private $user;
	
	function __construct( User $user ) {
		$this->user = $user;
	}
	
	public function getUserRole() {
		return $this->user->getRole();
	}	
	
	public function getId() {
		return $this->user->getId();
	}
	
	public function hasDonated() {
		return $this->user->hasDonated();
	}
	
	public function isAdmin() {
		return $this->user->isAdmin();
	}
	
	public function getName() {
		return $this->user->getName();
	}
	
	public function getJoined() {
		return $this->user->getJoined();
	}
	
	public function getForumSignature() {
		return $this->user->getForumSignature();
	}
	
	public function getAvatar() {
		return $this->user->getAvatar();
	}
	
	public function isYou() {
		return $this->user->isYou();
	}
}