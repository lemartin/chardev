<?php

require_once 'thread_database.php';
require_once 'user_data.php';
require_once 'forum.php';

class Comments {

	const COMMENTS_PER_PAGE = 10;
	const CHARACTER_COMMENTS_HOOK = 6;

	private $db;
	private $threadDB;

	public function __construct( $dsn, $user, $password, ThreadDatabase $threadDatabase ) {
	
		$this->db = new PDO($dsn, $user, $password);
		$this->threadDB = $threadDatabase;
	}

	public function getCommentsForCharacter( $characterId, $page ) {
		$page = max(1, $page);
		$comments = array();
		$posts = $this->threadDB->getPosts( 
			$this->getThreadId($characterId), 
			Comments::COMMENTS_PER_PAGE, Comments::COMMENTS_PER_PAGE * ($page-1),
			false
		);
		
		for( $i=0; $i<count($posts); $i++ ) {
			$user = new user_data($posts[$i]['AuthorID']);
			
			$comments[] = array(
				"Content" => Forum::replaceCode($posts[$i]['Plain']),
				"ID" => $posts[$i]['ID'],
				"Created" => date("M jS Y \a\\t  g:i A",(int)$posts[$i]['Created']),
				"UserName" => $user->get_name(),
				"UserRole" => $user->get_role()
			);
		}
		return $comments;
	}
	
	public function getPageCount( $characterId ) {
		$thread = $this->threadDB->getThread($this->getThreadId($characterId));
		
		return ceil($thread["PostCount"]/Comments::COMMENTS_PER_PAGE);
	}
	
	public function addCommentToCharacter( $characterId, $authorId, $content ) {
		$threadId = $this->getThreadId($characterId);
		
		$thread = $this->threadDB->getThread($threadId);
		
		$this->threadDB->replyTo( $thread['InitialPostID'], $authorId, 'RE: '.$thread['Title'], $content );
	}
	
	private function getThreadId( $characterId ) {
		
		$stmt = $this->db->prepare("SELECT * FROM `chardev_characters` WHERE `ID`=?");
		$stmt->execute(array((int) $characterId));
		$characterRecord = $stmt->fetch();
		if( !$characterRecord ) {
			throw new Exception("Character does not exist!");
		}
		
		$stmt = $this->db->prepare("SELECT * FROM `character_comments` WHERE `CharacterID`=?");
		$stmt->execute(array((int) $characterId));
		$commentsRecord = $stmt->fetch();
		$threadId = 0;
		if( !$commentsRecord ) {
			$threadId = $this->threadDB->createThread( 
				Comments::CHARACTER_COMMENTS_HOOK, 
				$characterRecord['UserID'], 
				"Discuss character profile #{$characterRecord['ID']}", "[URL=?profile={$characterRecord['ID']}]Character profile #{$characterRecord['ID']}[/URL]" 
			);
		
			$insertStmt = $this->db->prepare("INSERT INTO `character_comments` VALUES(?,?)");
			$insertStmt->execute(array((int) $characterId, (int)$threadId));
		}
		else {
			$threadId = $commentsRecord['ThreadID'];
		}
		return $threadId;
	}

}

?>