<?php

namespace chardev\backend\entities;

use chardev\backend\UserDatabase;
use chardev\backend\DoesNotExistException;

class User {

	private $id;
	private $data;
	private $donation;

	public function __construct( $userId ) {
		$data = UserDatabase::getInstance()->getUserData($userId);
		
		if( ! $data ) {
			throw new DoesNotExistException("User {$userId}");
		}
	
		$this->data = $data;
		if( ! $this->data['name'] ) {
			$this->data['name'] = 'DELETED';
		}
	}
	
	public function getId () {
		return $this->data['userID'];
	}
	
	public function getJoined() {
		return $this->data['timestamp'];
	}
	
	public function getName () {
		return $this->data['name'];
	}

	public function getRegion () {
		return $this->data['Region'];
	}

	public function getEmail () {
		return $this->data['email'];
	}

	public function getAvatar () {
		return strtolower($this->data['Avatar']);
	}

	public function getLanguage () {
		return $this->data['Language'];
	}
	
	public function getForumSignature() {
		return $this->data['ForumSignature'];
	}
	
	public function getRole() {
		return $this->data['role'];
	}
	
	public function isAdmin() {
		return $this->data['role'] == 10;
	}
	
	public function hasDonated() {
		return $this->data['AmountDonated'] > 0;
	}
	
	public function getBattleNetProfiles () {
		return UserDatabase::getInstance()->getBattleNetProfiles($this->getId());
	}

	public function addBattleNetProfile( $name, $realm, $region ) {
		UserDatabase::getInstance()->addBattleNetProfile( $this->getId(), $name, $realm, $region );
	}
	
	public function removeBattleNetProfile( $name, $realm, $region ) {
		UserDatabase::getInstance()->removeBattleNetProfile( $this->getId(), $name, $realm, $region );
	}
	
	public function setLanguage( $language ) {
		switch( $language ) {
			case 0: case 2: case 3: case 6: case 8: break;
			default: throw new \InvalidArgumentException("$language is an invalid language key!");
		}
		return $this->_setUserData( "Language", $language );
	}
	
	public function setForumSignature( $signature ) {
		return $this->_setUserData( "ForumSignature", $signature );
	}
	
	public function setRegion( $region ) {
		return $this->_setUserData( "Region", $region );
	}
	
	public function setAvatar( $avatar ) {
		return $this->_setUserData( "Avatar", $avatar );
	}
	
	private function _setUserData( $key, $value ) {
		$this->data[$key] = UserDatabase::getInstance()->setUserData( $this->data['userID'], $key, $value);
		return $this->data[$key]; 
	}
	
	public function getToken( $msg ) {
		return md5( $this->data['userID'] . $this->data['pw'] . $msg); 
	}
	
	public function validateToken( $token, $msg ) {
		return $this->getToken($msg) == $token;
	}
	
	public function getJsUserData() {
		return array(
			$this->getId(),
			$this->getName(),
			$this->getRegion(),
			$this->getBattleNetProfiles()
		);
	}
} 
?>