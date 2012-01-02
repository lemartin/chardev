<?php
	include('./../../func_forum.php');
	include('./../../db.php');
	
	echo json_encode(
			forum_new_topic(
				$_GET['content'],
				$_GET['title'],
				$_GET['session_id'],
				$_GET['forum']
			)
	);
?>