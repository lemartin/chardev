<?php
	require_once 'comments.php';
	require_once 'thread_database.php';

	$comments = new Comments("mysql:dbname=chardev_user;host=127.0.0.1", "root", "", new ThreadDatabase("mysql:dbname=chardev_user;host=127.0.0.1", "root", ""));
	
	//$comments->addCommentToCharacter( 107, 1, 'Not perfect!', 'Blabla is much better than blubblub!');
	
	echo json_encode($comments->getCommentsForCharacter(107));
?>