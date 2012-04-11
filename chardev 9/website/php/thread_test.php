<link href="forum.css" rel="stylesheet" />

<?php

	require_once 'thread_database.php';
	require_once 'user_data.php';
	require_once 'forum_permissions.php';
	require_once 'forum.php';

	$db = new ThreadDatabase( "mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
	$forum = new Forum($db, new ForumPermissions(isset($_SESSION['user_id']) ? new user_data((int)$_SESSION['user_id']) : null));
	
	
	$page = isset($_GET['page']) ? max((int) $_GET['page'], 1) : 1;
	
	if( isset($_GET['thread'])) {
		if( isset($_GET['reply'])) {
			$g_content = $forum->reply( (int)$_GET['thread'] );
		}
		else {
			$g_content = $forum->getPosts( (int)$_GET['thread'], $page, isset($_GET['edit']) ? (int)$_GET['edit'] : 0 );
		}
	}
	else if( isset($_GET['forum']) && is_numeric($_GET['forum'])) {
		if( isset($_GET['newTopic'])) {
			$g_content = $forum->newThread( (int)$_GET['forum'] );
		}
		else {
			$g_content = $forum->getThreads( (int)$_GET['forum'], $page);
		}
	}
	else {
		$g_content = $forum->getForums();
	}
	
?>
<script type="text/javascript">
	var g_forum_posts = null;
</script>

<script type="text/javascript">
	function g_onLoad() {
		if( g_forum_posts ) {
			new Forum(g_forum_posts);
		}
	}
</script> 