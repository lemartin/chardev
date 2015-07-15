<?php
namespace chardev\backend\entities;

interface Entity
{
	public function getId();
	public function getName();
	public function getData();
}

?>