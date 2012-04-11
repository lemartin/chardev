<?php
	session_start();

	require_once '../comments.php';
	require_once '../thread_database.php';
	require_once '../ajax_response.php';
	
	$comments = new Comments(
		"mysql:dbname=chardev_user;host=127.0.0.1", 
		"root", 
		"", 
		new ThreadDatabase("mysql:dbname=chardev_user;host=127.0.0.1", "root", "")
	);
	
	if( isset($_GET['character']) && is_numeric($_GET['character']) ) {
		$page = max( 1, (int)$_GET['page']);
		
		$arr = array(
			"comments" => $comments->getCommentsForCharacter((int)$_GET['character'], $page),
			"page" => $page,
			"page_count" => $comments->getPageCount((int)$_GET['character'])
		);
		
		echo json_encode($arr);
	}
	else if( isset($_POST['character']) && is_numeric($_POST['character']) && isset($_POST['content']) ) {
		try {
			if( ! isset($_SESSION['user_id']) ) {
				ajax_response::die_on_error("You are not logged in!");
			}
			$user_data = new user_data($_SESSION['user_id']);
			
			$comments->addCommentToCharacter( (int)$_POST['character'], $user_data->get_id(), $_POST['content'] );
		}
		catch( Exception $e) {
			ajax_response::die_on_exception($e);
		}
	}
?>