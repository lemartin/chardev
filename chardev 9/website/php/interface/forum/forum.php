<?php
	session_start();

	include('./../../db.php');
	
	require_once './../../thread_database.php';
	require_once './../../ajax_response.php';
	require_once './../../user_data.php';
	require_once './../../forum_permissions.php';
	require_once './../../forum.php';
	
	if( !isset($_POST['action']) ) {
		ajax_response::die_on_error("No action given!");
	}
	
	$user = isset($_SESSION['user_id']) ? new user_data((int)$_SESSION['user_id']) : null;
	
	if( ! $user ) {
		ajax_response::die_on_error("You are not logged in!");
	}
	
	try {
		$permissions = new ForumPermissions($user);
		$db = new ThreadDatabase( "mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
		
		switch($_POST['action']) {
			case 'edit':
				if( ! isset($_POST['content'])) {
					ajax_response::die_on_error("The content is empty!");
				}
				if( ! isset($_POST['post'])) {
					ajax_response::die_on_error("No post found!");
				}
				
				$postId = (int)$_POST['post'];
				$post = $db->getPost($postId);
			
				$db->editPost ( $postId, $post['Title'], $_POST['content'] );
				$postPos = $db->getPositionOfPost($postId);
				$page = floor(($postPos-1)/Forum::POSTS_PER_PAGE) + 1;
				
				ajax_response::auto_redirect( "?thread={$post['ThreadID']}&page={$page}#{$postPos}" );
			
				break;
			case 'reply':
				if( ! isset($_POST['content'])) {
					ajax_response::die_on_error("The content is empty!");
				}
				if( ! isset($_POST['thread'])) {
					ajax_response::die_on_error("No thread found!");
				}
				
				$threadId = (int)$_POST['thread'];
				$thread = $db->getThread($threadId);
			
				$postId = $db->replyTo( $thread['InitialPostID'], $user->get_id(), 'RE: '.$thread['Title'], $_POST['content'] );
				$postPos = $db->getPositionOfPost($postId);
				$page = floor(($postPos-1)/Forum::POSTS_PER_PAGE) + 1;
				
				ajax_response::auto_redirect( "?thread={$thread['ID']}&page={$page}#{$postPos}" );
				
				break;
			case 'new_thread':
				if( ! isset($_POST['content'])) {
					ajax_response::die_on_error("The content is empty!");
				}
				if( ! isset($_POST['title'])) {
					ajax_response::die_on_error("The title is empty!");
				}
				if( ! isset($_POST['hook'])) {
					ajax_response::die_on_error("No thread hook found!");
				}
				
				$hook = (int)$_POST['hook'];
				
				$threadId = 0;
				
				switch($_POST['type']) {
					case 'sticky': 
						if( ! $permissions->mayCreateStickies($hook)) {
							ajax_response::die_on_error("You are not allowed to create stickies!");
						}
						$threadId = $db->createSticky( $hook, $user->get_id(), $_POST['title'], $_POST['content'] );
						break;
					case 'announcement': 
						if( ! $permissions->mayCreateAnnouncements($hook)) {
							ajax_response::die_on_error("You are not allowed to create announcements!");
						}
						$threadId = $db->createAnnouncement( $hook, $user->get_id(), $_POST['title'], $_POST['content'] );
						break;
					case 'thread': 
						if( ! $permissions->mayCreateThreads($hook)) {
							ajax_response::die_on_error("You are not allowed to create new threads!");
						}
						$threadId = $db->createThread( $hook, $user->get_id(), $_POST['title'], $_POST['content'] );
						break;
					default: 
						throw new Exception("Invalid thread type: {$_POST['type']}!");
				}
				
				echo json_encode($threadId);
				
				break;
			case 'delete_thread':
				if( ! isset($_POST['thread'])) {
					ajax_response::die_on_error("No thread found!");
				}
				$threadId = (int)$_POST['thread'];
				$thread = $db->getThread($threadId);
				
				if( $permissions->mayDeleteAnyThreads($thread['ThreadHookID'])) {
					$db->deleteThread($threadId);
					echo json_encode($thread['ThreadHookID']);
				}
				else {
					ajax_response::die_on_error("You are not allowed to delete this thread!");
				}
				
				break;
			case 'lock_thread':
				if( ! isset($_POST['thread'])) {
					ajax_response::die_on_error("No thread found!");
				}
				$threadId = (int)$_POST['thread'];
				$thread = $db->getThread($threadId);
				
				if( $permissions->mayLockAnyThreads($thread['ThreadHookID'])) {
					$db->lockThread($threadId);
					echo json_encode($thread['ID']);
				}
				else {
					ajax_response::die_on_error("You are not allowed to lock this thread!");
				}
				
				break;
			case 'unlock_thread':
				if( ! isset($_POST['thread'])) {
					ajax_response::die_on_error("No thread found!");
				}
				$threadId = (int)$_POST['thread'];
				$thread = $db->getThread($threadId);
				
				if( $permissions->mayLockAnyThreads($thread['ThreadHookID'])) {
					$db->unlockThread($threadId);
					echo json_encode($thread['ID']);
				}
				else {
					ajax_response::die_on_error("You are not allowed to unlock this thread!");
				}
				
				break;
			default: ajax_response::die_on_error("No action given!");
		}
	}
	catch( Exception $e ) {
		ajax_response::die_on_exception($e);
	}
?>