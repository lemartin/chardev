<?php
	include('./../../db.php');
	
	$code = 0;
	$msg = "";
	
	$content;
	$sessionId;
	$forumId;
	$postId;
	
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
	$post = mysql_fetch_assoc(mysql_query("select * from forum_post where postID=".mysql_real_escape_string($_GET['post'])));
	if(isset($_GET['post']) && is_numeric($_GET['post']) && $post)
		$postId = $_GET['post'];
	else{
		$code = 5;
		$msg = 'The specified Post doesn\'t exist!';
	}
	
	if($code==0){
		if($post['userID']!=$_SESSION['user_id'] && $_SESSION['role']!=10){
			$code = 7;
			$msg = "You are not allowed to edit this post!";
		}
		else{
			if($_SESSION['role']!=10 && mysql_fetch_assoc(mysql_query('select * from forum_post where userID = '.mysql_real_escape_string($_SESSION['user_id']).' and created+30>'.time()))){
				$code = 6;
				$msg = "You can only post once every 30seconds!";
			}
			else{
				mysql_query("update forum_post set content='".mysql_real_escape_string($content)."', modified_counter = modified_counter + 1, modified =".time()." where postID=".$postId);
			}
		}
	}
	echo '{0:'.$code.',1:"'.$msg.'"}';
?>