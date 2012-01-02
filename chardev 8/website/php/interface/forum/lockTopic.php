<?php
	include('./../../db.php');
	
	$topicId = 0;
	$sessionId = $_GET['session_id'];
	
	session_start($sessionId);
	if(!isset($_SESSION['user_id']) || !isset($_SESSION['password']))
		die;
	
	if(isset($_GET['topic']) && is_numeric($_GET['topic']) && mysql_fetch_assoc(mysql_query("select * from forum_topic where topicID=".mysql_real_escape_string($_GET['topic']))))
		$topicId = $_GET['topic'];
	else die;

	if($_SESSION['role']!=10)
		die;
	
	mysql_query('update forum_topic set locked=(!locked) where topicID='.mysql_real_escape_string($topicId));
?>