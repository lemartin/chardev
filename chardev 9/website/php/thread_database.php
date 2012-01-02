<?php


class ThreadDatabase {
	const FLAG_NONE = 0;
	const FLAG_DELETED = 1;
	const FLAG_LOCKED = 2;
	const FLAG_THREAD_STICKY = 1024;
	const FLAG_THREAD_ANNOUNCEMENT = 2048;
		
	private $threadStmt;
	private $postStmt;
	private $hookStmt;
	private $createThreadStmt;
	private $db;
	private $createThreadCooldown = 120;
	private $createPostCooldown = 60;
	private $createThreadCooldownStmt;
	private $latestPostStmt;

	public function __construct( $dsn, $user, $password ) {
	
		$this->db = new PDO($dsn, $user, $password);
	
		// prepare some statements
		$this->threadStmt = $this->db->prepare(
			"SELECT * FROM `thread` WHERE `ID`=?"
		);
		$this->postStmt = $this->db->prepare(
			"SELECT * FROM `post` p LEFT JOIN `post_body` b ON p.`LatestPostBodyID` = b.`ID` WHERE p.`ID`=?"
		);
		$this->hookStmt = $this->db->prepare(
			"SELECT * FROM `thread_hook` WHERE `ID`=?"
		);
		
		$this->createThreadStmt = $this->db->prepare(
			"INSERT INTO `thread` VALUES (?,?,?,?,?,?,0,NULL,NULL)"
		);
		$this->createThreadCooldownStmt = $this->db->prepare(
			"SELECT `ID` FROM `thread` WHERE `AuthorID` = ? AND `Created` > ?"
		);
		$this->createPostCooldownStmt = $this->db->prepare(
			"SELECT p.`ID` FROM `post` p INNER JOIN `thread` t ON p.`ThreadID` = t.`ID` WHERE p.`AuthorID` = ? AND p.`Created` > ? AND t.`ID`=?"
		);
		$this->increasePostVersion = $this->db->prepare(
			"UPDATE `post` SET `Version`=`Version`+1 WHERE `ID`=?"
		);
		
		$this->latestPostStmt = $this->db->prepare(
			"SELECT max(`LatestPostID`) as LatestPostID FROM `thread` WHERE `ThreadHookID`=?"
		);
	}
	
	public function getThread( $threadId ) {
		$this->threadStmt->execute(array((int)$threadId));
		$record = $this->threadStmt->fetch();
		if( ! $record ) {
			throw new ThreadDoesNotExistException($threadId);
		}
		return $record;
	}
	
	public function deleteThread( $threadId ) {
		$thread = $this->getThread($threadId);
	
		$this->db->beginTransaction();
		$stmt = $this->db->prepare("UPDATE `thread` SET `flag`=`flag`|? WHERE `ID`=?");
		$stmt->execute(array( ThreadDatabase::FLAG_DELETED, $threadId));
		$this->checkExecutedStatement($stmt);
		$this->db->commit();
	}
	
	public function lockThread( $threadId ) {
		$thread = $this->getThread($threadId);
	
		$this->db->beginTransaction();
		$stmt = $this->db->prepare("UPDATE `thread` SET `flag`=`flag`|? WHERE `ID`=?");
		$stmt->execute(array( ThreadDatabase::FLAG_LOCKED, $threadId));
		$this->checkExecutedStatement($stmt);
		$this->db->commit();
	}
	
	public function unlockThread( $threadId ) {
		$thread = $this->getThread($threadId);
		$this->db->beginTransaction();
		$stmt = $this->db->prepare("UPDATE `thread` SET `flag`=`flag`&? WHERE `ID`=?");
		echo (-1&~ThreadDatabase::FLAG_LOCKED);
		$stmt->execute(array( (-1&~ThreadDatabase::FLAG_LOCKED), $threadId));
		$this->checkExecutedStatement($stmt);
		$this->db->commit();
	}
	
	public function getPost( $postId ) {
		$this->postStmt->execute(array((int)$postId));
		$this->checkExecutedStatement($this->postStmt);
		$record = $this->postStmt->fetch();
		if( ! $record ) {
			throw new PostDoesNotExistException($postId);
		}
		return $record;
	}
	
	public function getLatestPost( $hookId ) {
		$this->latestPostStmt->execute(array((int)$hookId));
		$record = $this->latestPostStmt->fetch();
		$this->checkExecutedStatement($this->latestPostStmt);
		if( $record && $record["LatestPostID"] ) {
			return $this->getPost($record["LatestPostID"]);
		} 
		return null;
	}
	
	public function getHookForPost( $postId ) {
		$stmt = $this->db->prepare("SELECT `ThreadHookID` FROM `thread` t INNER JOIN `post` p ON t.`ID` = p.`ThreadID` WHERE p.`ID`=".(int)$postId);
		$this->checkExecutedStatement($stmt);
		$record = $stmt->fetch();
		return $this->getHook($record['ThreadHookID']);
	}
	
	public function getHook( $hookId ) {
		$this->hookStmt->execute(array((int)$hookId));
		$record = $this->hookStmt->fetch();
		if( ! $record ) {
			throw new HookDoesNotExistException($hookId);
		}
		return $record;
	}
	
	public function getPostCountFor( $authorId ) {
		$stmt = $this->db->prepare("SELECT count(*) as PostCount FROM `post` WHERE `AuthorID`=?");
		$stmt->execute( array((int)$authorId) );
		$this->checkExecutedStatement($stmt);
		$countResult = $stmt->fetch();
		return $countResult['PostCount'];
	}
	
	public function getPosts( $threadId, $limit, $offset, $asc = true ) {
		$stmt = $this->db->prepare(
			"SELECT 
				p.`ID` as ID,
				p.`ThreadID` as ThreadID,
				p.`AuthorID` as AuthorID,
				p.`Flag` as Flag,
				p.`ModCount` as ModCount,
				p.`Position` as Position,
				b.`Title` as Title,
				b.`Content` as Plain,
				p.`Created` as Created,
				b.`Created` as LastCreated
			FROM `post` p 
				INNER JOIN `post_body` b on b.`ID` = p.`LatestPostBodyID` 
			WHERE 
				p.`ThreadID` = ?
			ORDER BY p.`ID` ".(  $asc ? 'ASC' : 'DESC' )."
			LIMIT ".((int)$offset).",".((int)$limit)
		);
		$stmt->execute( array((int)$threadId) );
		$this->checkExecutedStatement($stmt);
		return $stmt->fetchAll();
	}
	
	public function getAnnouncements( $hookId, $limit, $offset ) {
		return $this->_getThreads( $hookId, $limit, $offset, ThreadDatabase::FLAG_DELETED, ThreadDatabase::FLAG_THREAD_ANNOUNCEMENT );
	}
	
	public function getStickies( $hookId, $limit, $offset ) {
		return $this->_getThreads( $hookId, $limit, $offset, ThreadDatabase::FLAG_DELETED, ThreadDatabase::FLAG_THREAD_STICKY );
	}
	
	public function getThreads( $hookId, $limit, $offset ) {
		return $this->_getThreads( $hookId, $limit, $offset, ThreadDatabase::FLAG_DELETED | ThreadDatabase::FLAG_THREAD_STICKY | ThreadDatabase::FLAG_THREAD_ANNOUNCEMENT, 0);
	}
	
	private function _getThreads( $hookId, $limit, $offset, $excludeFlags, $requireFlags ) {
		$excludeFlags = (int)$excludeFlags;
		$requireFlags = (int)$requireFlags;
		$excl = $excludeFlags ? "( t.`FLAG` & {$excludeFlags} ) = 0" : "TRUE";
		$requ = $requireFlags ? "( t.`FLAG` & {$requireFlags} ) != 0" : "TRUE";
		$stmt = $this->db->prepare(
			"SELECT 
				t.`ID` as ID,
				t.`Flag` as Flag,
				t.`Title` as Title,
				t.`AuthorID` as AuthorID,
				t.`Created` as Created,
				t.`PostCount` as PostCount,
				t.`InitialPostID` as InitialPostID,
				p.`AuthorID` as PostAuthorID,
				b.`Created` as PostCreated
			FROM 
				`thread` t 
				LEFT JOIN `post` p ON p.`ID` = t.`LatestPostID`
				LEFT JOIN `post_body` b ON b.`ID` = p.`LatestPostBodyID`
			WHERE 
				t.`ThreadHookID`=? AND
				{$excl} AND {$requ}
			ORDER BY p.`ID` desc 
			LIMIT ".((int)$offset).",".((int)$limit)
		);
		$stmt->execute( array((int)$hookId ) );
		$this->checkExecutedStatement($stmt);
		return $stmt->fetchAll();
	}
	
	public function createThread( $hookId, $authorId, $title, $content ) {
		return $this->_createThread( $hookId, $authorId, $title, $content, ThreadDatabase::FLAG_NONE );
	}
	
	public function createSticky( $hookId, $authorId, $title, $content ) {
		return $this->_createThread( $hookId, $authorId, $title, $content, ThreadDatabase::FLAG_THREAD_STICKY );
	}
	
	public function createAnnouncement( $hookId, $authorId, $title, $content ) {
		return $this->_createThread( $hookId, $authorId, $title, $content, ThreadDatabase::FLAG_THREAD_ANNOUNCEMENT );
	}
	
	private function _createThread( $hookId, $authorId, $title, $content, $flag ) {
		$this->db->beginTransaction();
		try {
			$stmt = $this->db->query("SELECT MAX(`ID`) as LastID FROM `thread`");
			$id = $this->getNextId('thread');
			
			$hook = $this->getHook( $hookId );
			
			$this->checkThreadCooldown( $authorId );
			
			$content = htmlspecialchars($content,ENT_QUOTES);
			$title = htmlspecialchars($title,ENT_QUOTES);
			
			$this->createThreadStmt->execute(array($id, $hookId, $flag, $title, $authorId, time()));
			
			$postId = $this->createPost( $id, $authorId, /*responseToId*/ null, $title, $content );
			//
			// update the inital post column
			$stmt = $this->db->prepare("UPDATE `thread` SET `InitialPostID`=? WHERE `ID`=?");
			$stmt->execute(array( $postId, $id ));
			$this->checkExecutedStatement($stmt);
			//
			// update thread count
			$stmt = $this->db->prepare("UPDATE `thread_hook` SET `ThreadCount`=`ThreadCount`+1 WHERE `ID`=?");
			$stmt->execute(array( $hookId));
			$this->checkExecutedStatement($stmt);
			
			$this->db->commit();
			
			return $id;
		}
		catch( Exception $e ) {
			$this->db->rollback();
			throw new UnableToCreateThreadException($e);
		}
	}
	
	private function checkThreadCooldown( $authorId ) {
		if( $this->createThreadCooldown > 0 ) {
			$this->createThreadCooldownStmt->execute(array($authorId, time() - $this->createThreadCooldown));
			$this->checkExecutedStatement( $this->createThreadCooldownStmt);
			if( $this->createThreadCooldownStmt->fetch()) {
				throw new ThreadCreationCooldownException($this->createThreadCooldown);
			}
		}
	}
	
	private function checkPostCooldown( $authorId, $threadId ) {
		if( $this->createPostCooldown > 0 ) {
			$this->createPostCooldownStmt->execute(array($authorId, time() - $this->createPostCooldown, $threadId));
			$this->checkExecutedStatement( $this->createPostCooldownStmt);
			if( $this->createPostCooldownStmt->fetch()) {
				throw new PostCreationCooldownException($this->createPostCooldown);
			}
		}
	}
	
	public function getPositionOfPost( $postId ) {
		$post = $this->getPost($postId);
		$stmt = $this->db->prepare("SELECT count(*) AS Count FROM `post` WHERE `ThreadID`=? AND `ID`<=?");
		$stmt->execute(array( $post['ThreadID'], $postId ));
		$this->checkExecutedStatement($stmt);
		$r = $stmt->fetch();
		return $r['Count'];
	}
	
	public function replyTo( $postId, $authorId, $title, $content ) {
		try {
			$this->db->beginTransaction();
			
			$post = $this->getPost($postId);
		
			$content = htmlspecialchars($content,ENT_QUOTES);
			$title = htmlspecialchars($title,ENT_QUOTES);
			
			$stmt = $this->db->prepare("UPDATE `post` SET `Position`=`Position`+1 WHERE `ThreadID`=? AND `Position`>=?");
			$this->checkExecutedStatement($stmt);
		
			$replyId = $this->createPost( $post['ThreadID'], $authorId, $postId, $title, $content );
		
			$this->db->commit();
			
			return $replyId;
		}
		catch( Exception $e ) {
			$this->db->rollback();
			throw new UnableToAddPostException($e);
		}
	}
	
	public function editPost ( $postId, $title, $content ) {
		try {
			$this->db->beginTransaction();
			$this->checkPostInputs( $title, $content );
			
			$post = $this->getPost($postId);

			$this->increasePostVersion->execute(array($postId));
			
			$this->createPostBody( $title, $content, $postId );
			//
			// update mod count
			$stmt = $this->db->prepare("UPDATE `post` SET `ModCount`=`ModCount`+1 WHERE `ID`=?");
			$stmt->execute(array( $postId));
			$this->checkExecutedStatement($stmt);
			
			$this->db->commit();
		}
		catch( Exception $e) {
			$this->db->rollback();
			throw new UnableToEditPostException( $postId, $e );
		}
	}
	
	private function checkExecutedStatement( $stmt) {
		if( $stmt->errorCode() != 0 ) {
			$info = $stmt->errorInfo();
			throw new DatabaseException($info[2]);
		}
	}
	
	private function checkPostInputs( $title, $content ) {	
		if ( ! $title || strlen((string)$title) < 3 ) {
			throw new TitleMissingOrTooShortException($title);
		}
		else if ( ! $content || strlen((string)$content) < 3 ) {
			throw new ContentMissingOrTooShortException($content);
		}
	}
	
	private function createPost( $threadId, $authorId, $responseToPostId, $title, $content ) {			
		$thread = $this->getThread( $threadId );
		
		$this->checkPostCooldown( $authorId, $threadId );
		
		$flag = (int)$thread['Flag'];
		if( $flag & ThreadDatabase::FLAG_DELETED ) {
			throw new UnableToAddPostException(new ThreadIsDeletedException($threadId));
		}
		else if( $flag & ThreadDatabase::FLAG_LOCKED ) {
			throw new UnableToAddPostException(new ThreadIsLockedException($threadId));
		}
	
		if( $responseToPostId != null ) {		
			//
			// check if the post replying to exists
			$post = $this->getPost($responseToPostId);
			//
			// check it's in the right thread
			if( $post['ThreadID'] != $threadId ) {
				throw new Exception("ThreadID and post.ThreadID don't match!");
			}
			//
			// get the position for hierarchical view
			// as the max position of the last post replying to the same post
			$stmt = $this->db->prepare("SELECT `Position` FROM `post` WHERE `ThreadID`=? AND `ResponseToPostID`=? ORDER BY `POSITION` desc");
			$stmt->execute(array($threadId, $responseToPostId));
			$this->checkExecutedStatement($stmt);
			//
			// if there is such a post
			// set position with its position + 1
			if( $max = $stmt->fetch() ) {
				$position = (int)$max['Position'] + 1;
			}
			//
			// else assume there are no post replying to the same post
			// set position right after the post replying to
			else {
				$position = (int)$post['Position'] + 1;
			}
		}
		else {
			//
			// if not replying, check if it's
			// the first post in the thread
			$stmt = $this->db->prepare("SELECT * FROM `post` WHERE `ThreadID`=?");
			$stmt->execute(array($threadId));
			$this->checkExecutedStatement($stmt);
			if( $stmt->fetch() ){
				throw new Exception("Creating a post not replying to another post is not allowed, unless it's the threads first post!");
			}
			//
			// and set the position accordingly
			$position = 0;
		}
		//
		// update position of all posts that will be
		// after the newly added post in hierarchical view
		$stmt = $this->db->prepare("UPDATE `post` SET `Position`=`Position`+1 WHERE `ThreadID`=? AND `Position`>=?");
		$stmt->execute(array($threadId, $position));
		$this->checkExecutedStatement($stmt);
		//
		// add the new post
		$postId =  $this->getNextId('post');
		$stmt = $this->db->prepare("INSERT INTO `post` VALUES( ?,?,?,?,?,?,?,?, NULL )");
		$stmt->execute(array( $postId, $threadId, $authorId, /*flag*/ 0, /*modCount*/ 0, $position, time(), $responseToPostId ));
		$this->checkExecutedStatement($stmt);
		//
		// and create the posts body, also set the `LatestPostBodyID` field
		$postBodyId = $this->createPostBody( $title, $content, $postId );
		//
		// update the latest post column
		$stmt = $this->db->prepare("UPDATE `thread` SET `LatestPostID`=? WHERE `ID`=?");
		$stmt->execute(array( $postId, $threadId ));
		$this->checkExecutedStatement($stmt);
		//
		// update the latest thread column
		$stmt = $this->db->prepare("UPDATE `thread_hook` SET `LatestThreadID`=? WHERE `ID`=?");
		$stmt->execute(array( $threadId, $thread['ThreadHookID'] ));
		$this->checkExecutedStatement($stmt);
		//
		// update post count for hook
		$stmt = $this->db->prepare("UPDATE `thread_hook` SET `PostCount`=`PostCount`+1 WHERE `ID`=?");
		$stmt->execute(array( $thread['ThreadHookID']));
		$this->checkExecutedStatement($stmt);
		//
		// update post count for thread		
		$stmt = $this->db->prepare("UPDATE `thread` SET `PostCount`=`PostCount`+1 WHERE `ID`=?");
		$stmt->execute(array( $threadId));
		$this->checkExecutedStatement($stmt);
		
		return $postId;
	}
	
	private function createPostBody( $title, $content, $postId ) {
		$this->checkPostInputs( $title, $content );
		
		$postBodyId =  $this->getNextId('post_body');
		$stmt = $this->db->prepare("INSERT INTO `post_body` VALUES( ?,?,?,?,? )");
		$stmt->execute(array( $postBodyId, $title, $content, time(), $postId));
		$this->checkExecutedStatement($stmt);
		//
		// update the latest post body column
		$stmt = $this->db->prepare("UPDATE `post` SET `LatestPostBodyID`=? WHERE `ID`=?");
		$stmt->execute(array( $postBodyId, $postId));
		$this->checkExecutedStatement($stmt);
	}
	
	private function getNextId( $table ) {
		$stmt = $this->db->query("SELECT MAX(`ID`) as LastID FROM `".$table."`");
		$id = 1;
		if( $record = $stmt->fetch() ) {
			$id = (int)$record['LastID'] + 1;
		}
		return $id;
	}
	
	public function getRecentsPosts( $count ) {
		$stmt = $this->db->prepare(
			"SELECT p.`Created` as Created, p.`AuthorID` as AuthorID, p.`ThreadID` as ThreadID FROM 
				`post` p INNER JOIN `thread` t ON p.`ID` = t.`LatestPostID` 
			WHERE 0 = ( t.`flag` & ?) AND t.`ThreadHookID` IN (0,1,2,3)
			GROUP BY t.`ID` ORDER BY p.`ID` DESC LIMIT 0,{$count}"
		);
		$stmt->execute(array(ThreadDatabase::FLAG_DELETED));
		$this->checkExecutedStatement($stmt);
		return $stmt->fetchAll();
	}
}

class HookDoesNotExistException extends Exception {
	public function __construct( $hookId ) {
		parent::__construct( "The thread hook with id {$hookId} does not exist!");
	}
}

class ThreadCreationCooldownException extends Exception {
	public function __construct( $cooldown ) {
		parent::__construct("You have to wait at least {$cooldown}s after creating a thread before you may create another one.");
	}
}

class PostCreationCooldownException extends Exception {
	public function __construct( $cooldown ) {
		parent::__construct("You have to wait at least {$cooldown}s after posting before you may post again.");
	}
}

class UnableToCreateThreadException extends Exception {
	public function __construct( $cause ) {
		parent::__construct( "Unable to create thread!", 0, $cause);
	}
}

class ThreadDoesNotExistException extends Exception {
	public function __construct( $threadId ) {
		parent::__construct( "The thread with id {$threadId} does not exist!");
	}
}

class ThreadIsDeletedException extends Exception {
	public function __construct( $threadId ) {
		parent::__construct( "The thread with id {$threadId} was deleted!");
	}
}

class ThreadIsLockedException extends Exception {
	public function __construct( $threadId ) {
		parent::__construct( "The thread with id {$threadId} is locked!");
	}
}

class UnableToAddPostException extends Exception {
	public function __construct( $cause ) {
		parent::__construct( "Unable to add post!", 0, $cause);
	}
}

class UnableToEditPostException extends Exception {
	public function __construct( $postId, $cause ) {
		parent::__construct( "Unable to edit post with id {$postId}!", 0, $cause);
	}
}

class PostDoesNotExistException extends Exception {
	public function __construct( $postId ) {
		parent::__construct( "The post with id '{$postId}' does not exist!");
	}
}

class PostIsDeletedException extends Exception {
	public function __construct( $postId ) {
		parent::__construct( "The post with id {$postId} was deleted!");
	}
}

class PostIsLockedException extends Exception {
	public function __construct( $postId ) {
		parent::__construct( "The post with id {$postId} is locked!");
	}
}

class TitleMissingOrTooShortException extends Exception {
	public function __construct($title) {
		parent::__construct( "The title of the post is empty or too short!\n Title was:\n".$title);
	}
}

class ContentMissingOrTooShortException extends Exception {
	public function __construct($content) {
		parent::__construct( "The content of the post is empty or too short!\n Content was:\n".$content);
	}
}

class DatabaseException extends Exception {
	public function __construct( $msg ) {
		parent::__construct( "Database error: ".$msg);
	}
}

?>