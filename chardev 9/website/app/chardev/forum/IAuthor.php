<?php
namespace Chardev\Forum;

interface IAuthor {
	public function getId();
	public function getName();
	public function getSignature();
	public function getJoinDate();
	public function getPostCount();
	
	
}

?>