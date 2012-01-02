<?php 

	echo date("M jS Y \a\\t g:i A",1314623685); die;

	include '../db.php';
	include '../thread_database.php';
	
	connect_to_db();

	$result = mysql_query("SELECT * FROM chardev.forum_topic");
	
	$db = new PDO( "mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
	
	$createThreadStmt = $db->prepare(
		"INSERT INTO `thread` VALUES (?,?,?,?,?,?,?,NULL,NULL)"
	);
	$createPostBodyStmt = $db->prepare(
		"INSERT INTO chardev_user.post_body VALUES (?,?,?,?,?)"
	);
	$createPostStmt = $db->prepare(
		"INSERT INTO chardev_user.post VALUES (?,?,?,0,0,?,?,?,?)"
	);
	
	$updateThreadStmt = $db->prepare(
		"UPDATE chardev_user.thread SET InitialPostID=?, LatestPostID=? WHERE ID=?"		
	);
	
	$updatePostStmt = $db->prepare(
		"UPDATE chardev_user.post SET LatestPostBodyID=? WHERE ID=?"
	);
	
	

	while( $record = mysql_fetch_assoc($result)) {
		
		$tID = $record['topicID'];
		$flag = flag( (int) $record['flag'], (int) $record['locked'] );
	
		$firstLastResult = mysql_query("SELECT max(postID) as maxid, min(postID) as minid, count(postID) as postcount FROM chardev.forum_post WHERE topicid=".$tID);
		echo mysql_error();
		
		if( $firstLastRecord = mysql_fetch_assoc($firstLastResult ) ) {
			
			if( ! $firstLastRecord['minid'] ) {
				continue;
			}
			
			$tAuthorRecord = mysql_fetch_assoc(mysql_query("SELECT * FROM forum_post WHERE postID=".$firstLastRecord['minid']));
			echo mysql_error();
				
			$db->beginTransaction();
			
			$createThreadStmt->execute(array(
				$tID,$record['subforumID'],$flag,
				$record["title"],
				$tAuthorRecord['userID'],
				max((int)$tAuthorRecord['created'],(int)$tAuthorRecord['modified']),
				$firstLastRecord['postcount']));
			checkExecutedStatement($createThreadStmt);
				
			$postResults = mysql_query("SELECT * FROM chardev.forum_post WHERE topicid=".$tID." order by postID ASC");
			
			$position = 0;
			
			while( $postRecord = mysql_fetch_array($postResults)) {
				
				
				$createPostStmt->execute(array(
					$postRecord['postID'],
					$tID,
					$postRecord['userID'],
					$position++,
					max((int)$postRecord['created'],(int)$postRecord['modified']),
					$firstLastRecord['minid'],
					null
				));
				checkExecutedStatement($createPostStmt);
				
				$createPostBodyStmt->execute(array(
					$postRecord['postID'],
					$postRecord['title'],
					$postRecord['content'],
					max((int)$postRecord['created'],(int)$postRecord['modified']),
					$postRecord['postID'],
				));
				checkExecutedStatement($createPostBodyStmt);
				
				echo mysql_error();
				
				$db->exec("UPDATE chardev_user.post SET LatestPostBodyID=".$postRecord['postID']." WHERE ID=".$postRecord['postID']);
				echo mysql_error();
			}
			
			$updatePostStmt->execute(array($postRecord['postID'],$postRecord['postID']));
			checkExecutedStatement($updatePostStmt);
			
			$updateThreadStmt->execute(array($firstLastRecord["minid"],$firstLastRecord["maxid"],$tID));
			checkExecutedStatement($updateThreadStmt);
			
			$db->commit();
		}
	}
	
	function flag( $flag, $locked ) {
		$r = 0;
		if( $flag < 0 ) {
			$r |= ThreadDatabase::FLAG_DELETED;
			
			$flag = 1 - $flag;
		}
		if( $locked == 1 ) {
			$r |= ThreadDatabase::FLAG_LOCKED;
		}
		if( $flag == 1 ) {
			$r |= ThreadDatabase::FLAG_THREAD_STICKY;
		}
		if( $flag == 2 ) {
			$r |= ThreadDatabase::FLAG_THREAD_ANNOUNCEMENT;
		}
		
		return $r;
	}
	
	function checkExecutedStatement( $stmt) {
		if( $stmt->errorCode() != 0 ) {
			$info = $stmt->errorInfo();
			echo $info[2]."\n";
		}
	}
?>