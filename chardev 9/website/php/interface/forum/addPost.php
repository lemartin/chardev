<?php
	include('./../../db.php');
	
	$code = 0;
	$msg = "";
	
	$content;
	$sessionId;
	$forumId;
	$topicId;
	
	if(isset($_GET['content']) && is_string($_GET['content']) && strlen($_GET['content'])>1){
		$content = $_GET['content'];
		$content = htmlspecialchars($content,ENT_QUOTES);
	}
	else{
		$code = 1;
		$msg = 'The lenght of the content is to short!';
	}
	
	if(isset($_GET['session_id']) && $_GET['session_id']!=""){
		$sessionId = $_GET['session_id'];
		session_start($sessionId);
		if(!isset($_SESSION['user_id']) || !isset($_SESSION['password'])){
			$code = 4;
			$msg = 'You have to be logged in, to create a new topic!';
		}
	}
	else{
		$code = 3;
		$msg = 'You have to be logged in, to create a new topic!';
	}
	if(isset($_GET['topic']) && is_numeric($_GET['topic']) && mysql_fetch_assoc(mysql_query("select * from forum_topic where topicID=".mysql_real_escape_string($_GET['topic']))))
		$topicId = $_GET['topic'];
	else{
		$code = 5;
		$msg = 'The specified Topic doesn\'t exist!';
	}
	if($code==0){
		$q = "insert into forum_post values (null,".$topicId.",".$_SESSION['user_id'].",'Re:','".mysql_real_escape_string($content)."',".time().",0,0)";
		mysql_query($q);
		$r = mysql_fetch_assoc(mysql_query("select count(*) as c from forum_post where topicID=".$topicId));
		$msg = $r['c'];
	}
	echo '{0:'.$code.',1:"'.$msg.'"}';
?>