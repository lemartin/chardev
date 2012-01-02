<?php 

$forums_per_page = 20;
$posts_per_page = 20;
$topics_per_page = 25;

$topic_flag_to_css_class = array('forum_topic_link','forum_topic_sticky_link','forum_topic_announcement_link');
$topic_flag_to_prefix = array('','sticky','announcement');
$user_role_to_css_class = array('forum_author','forum_author_donator','','','','','','','','','forum_author_admin');

define("NEWS_FORUM",4);

function forum_get_new_posts( $count, $exclude, $use_exclude_as_include = false )
{
	$n = 0;
	$ret = array();
	
	if( $exclude && is_array($exclude) && count($exclude) > 0 )
	{
		$exclude_str = '';
		for( $i = 0 ; $i < count($exclude); $i++ )
		{
			$exclude_str .= ($exclude_str?',':'') . (int)$exclude[$i] ;
		}
		$exclude_str = ' and t.subforumid ' . ( $use_exclude_as_include ? '' : 'not' ) . ' in (' . $exclude_str . ') ';
	}
	else
	{
		$exclude_str = '';
	}
	
	
	$result = mysql_db_query(
		$GLOBALS['g_forum_db'],
		"select max(postID) as id, count(*) as posts from forum_post p inner join forum_topic t on t.topicID = p.topicID where flag>=0 ".$exclude_str." group by t.topicID order by max(created) desc limit 0,".$count,
		$GLOBALS['g_db_con']
	);
	
	while( ($record = mysql_fetch_assoc($result)) )
	{
		$post =  mysql_fetch_assoc(mysql_query("select * from forum_post where postID = ".(int)$record['id']));
		$user =  mysql_fetch_assoc(mysql_query("select * from user where userID = ".(int)$post['userID']));
		$topic =  mysql_fetch_assoc(mysql_query("select * from forum_topic where topicID = ".(int)$post['topicID']));
		$forum = mysql_fetch_assoc(mysql_query("select * from forum_subforum where subforumID = ".(int)$topic['subforumID']));
		$ret[$n]['topicId'] = (int)$topic['topicID'];
		$ret[$n]['title'] = $topic['title'];
		$ret[$n]['flag'] = (int)$topic['flag'];
		$ret[$n]['role'] = (int)$user['role'];
		$ret[$n]['userId'] = (int)$user['userID'];
		$ret[$n]['postId'] = (int)$post['postID'];
		$ret[$n]['name'] = $user['name'];
		$ret[$n]['created'] = $post['created'];
		$ret[$n]['locked'] = (int)$topic['locked'];
		$ret[$n]['posts'] = (int)$record['posts'];
		$ret[$n]['forum'] = $forum['title'];
		$ret[$n]['forumId'] = $forum['subforumID'];
		$ret[$n]['page'] = ceil((float)$record['posts'] / (float)$GLOBALS['posts_per_page']);
		$n++;
	}
	return $ret;
}

function forum_get_subforums( $page )
{
	$subforums = array();
	$n = 0;
	//$limit = 'limit '.($page-1)*$GLOBALS['topics_per_page'].','.$GLOBALS['topics_per_page'];
	
	$result = mysql_db_query(
		$GLOBALS['g_forum_db'],
		"SELECT * FROM `forum_subforum`",
		$GLOBALS['g_db_con']
	);
	
	while($subforum = mysql_fetch_assoc($result))
	{
		$topics = mysql_fetch_assoc(mysql_query("select count(*) as count from forum_topic where flag >= 0 and subforumID=".$subforum['subforumID']));
		$posts = mysql_fetch_assoc(mysql_query("select count(*) as count from forum_post where topicID in (select topicID from forum_topic where flag >= 0 and subforumID=".$subforum['subforumID'].")"));
		$subforums[$n]['title'] = $subforum['title'];
		$subforums[$n]['subforumId'] = $subforum['subforumID'];
		$subforums[$n]['description'] = isset($subforum['description']) ? $subforum['description'] : "";
		$subforums[$n]['topics'] = $topics['count'];
		$subforums[$n]['posts'] = $posts['count'];
		$n++;
	}
	return $subforums;
}

/**
 * @param $topicId Topic Id
 * @param $page Page of the topic, if the supplied page is -1 the last $posts_per_page posts are shown
 * @return array 
 */
function forum_get_posts( $topicId, $page )
{
	$posts = array();
	$n = 0;
	
	if( $page == -1 )
	{
		$count_record = mysql_fetch_assoc(mysql_query("select count(*) as count from forum_post where topicID=".$topicId));
		$limit = ' order by postID asc limit '.max(0,$count_record['count']-$GLOBALS['posts_per_page']).','.$GLOBALS['posts_per_page'];
	}
	else
	{
		$limit = ' order by postID asc limit '.($page-1)*$GLOBALS['posts_per_page'].','.$GLOBALS['posts_per_page'];
	}
	$query = "Select * from forum_post where topicID = ".$topicId." ".$limit;
	
	$result = mysql_db_query(
		$GLOBALS['g_forum_db'],
		$query,
		$GLOBALS['g_db_con']
	);
	
	while( $post = mysql_fetch_assoc($result) )
	{
		
		$user = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_forum_db'],
			"select * from user u left join chardev_user.`user_data` ud on u.`userID` = ud.`UserID` where u.userID=".$post['userID'],
			$GLOBALS['g_db_con']
		));
		$user_posts = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_forum_db'],
			"select count(*) as count from forum_post where userID=".$post['userID'],
			$GLOBALS['g_db_con']
		));
		
		$posts[$n]['postId'] = $post['postID']; 
		$posts[$n]['content'] = nl2br(forum_code_replace($post['content']));
		$posts[$n]['content_plain'] = $post['content'];
		$posts[$n]['created'] = $post['created'];
		$posts[$n]['userId'] = $post['userID'];
		$posts[$n]['user'] = $user['name'];
		$posts[$n]['role'] = ($user['role']?$user['role']:0);
		$posts[$n]['posts'] = $user_posts['count'];
		$posts[$n]['avatar'] = $user['avatar'];
		$posts[$n]['joined'] = $user['timestamp'];
		$posts[$n]['signature'] = nl2br(forum_code_replace($user['ForumSignature']));
		
		$n++;
	}
	return $posts;
}

function forum_get_topics( $subforumId, $page )
{
	$topics = array();
	$n = 0;
	
	$limit = 'limit '.($page-1)*$GLOBALS['topics_per_page'].','.$GLOBALS['topics_per_page'];
	$query = "select * from forum_topic t inner join forum_post p on p.topicID = t.topicID where subforumID=".(int)$subforumId." and flag >= 0 group by t.topicID order by flag desc, max(created) desc ".$limit;
	
	$result = mysql_db_query(
		$GLOBALS['g_forum_db'],
		$query,
		$GLOBALS['g_db_con']
	);
	
	while($topic = mysql_fetch_assoc($result))
	{
		$post = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_forum_db'],
			"select userID, created, postID, userID from forum_post where topicID=".$topic['topicID']." order by created DESC limit 1",
			$GLOBALS['g_db_con']
		));
		
		$user = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_forum_db'],
			"select * from user where userID=".$post['userID'],
			$GLOBALS['g_db_con']
		));
		
		$first_post = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_forum_db'],
			"select * from forum_post where topicID=".$topic['topicID']." order by created ASC limit 1",
			$GLOBALS['g_db_con']
		));
		
		$creator = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_forum_db'],
			"select * from user where userID =".$first_post['userID'],
			$GLOBALS['g_db_con']
		));
		
		$posts = mysql_fetch_assoc(mysql_db_query(
			$GLOBALS['g_forum_db'],
			"select count(*) as count from forum_post where topicID=".$topic['topicID'],
			$GLOBALS['g_db_con']
		));
		
		$topics[$n]['creator'] = $creator['name'];
		$topics[$n]['creatorId'] = (int)$creator['userID'];
		$topics[$n]['creatorRole'] = (int)$creator['role'];
		//
		$topics[$n]['topicId'] = $topic['topicID'];
		$topics[$n]['title'] = $first_post['title'];
		$topics[$n]['flag'] = (int)$topic['flag'];
		$topics[$n]['locked'] = (int)$topic['locked'];
		$topics[$n]['created'] = (int)$first_post['created'];
		$topics[$n]['content'] = nl2br(forum_code_replace($first_post['content']));
		$topics[$n]['content_plain'] = $first_post['content'];
		//
		$topics[$n]['lastPoster'] = $user['name'];
		$topics[$n]['lastPosterRole'] = (int)$user['role'];
		$topics[$n]['lastPosterId'] = (int)$user['userID'];
		//
		$topics[$n]['pages'] = (int)ceil((float)$posts['count'] / (float)$GLOBALS['posts_per_page']);
		$topics[$n]['posts'] = (int)$posts['count'];
		$topics[$n]['lastPostCreated'] = $post['created'];
		$topics[$n]['lastPostId'] = (int)$post['postID'];
		$n++;
	}
	return $topics;
}

function forum_topic_link( $flag, $locked, $topicId, $title, $post_nr = 0,  $page = 0, $max_length = 50 )
{
	return 	"<a title='".$title."' class='".$GLOBALS['topic_flag_to_css_class'][$flag].($locked?"_locked":"")."' href='?topic=".$topicId.($post_nr&&$page?"&amp;page=".$page."#p".$post_nr:"")."'>"
			.(shorten(/*($locked?"[closed] ":"")($flag?"[".$GLOBALS['topic_flag_to_prefix'][$flag]."] ":"").*/htmlspecialchars_decode($title,ENT_QUOTES),$max_length))
			."</a>";
}

function forum_code_replace($str){
	$str = preg_replace("/\[url\](.*?)\[\/url\]/i","<a target='_blank' class='forum_content_link' href='$1'>$1</a>",$str);
	$str = preg_replace("/\[url\=(.*?)\](.*?)\[\/url\]/i","<a target='_blank' class='forum_content_link' href='$1'>$2</a>",$str);
	//	[img]
	$str = preg_replace("/\[img\](.*?)\[\/img\]/i","<img alt='$1' src='$1'>",$str);
	//	bold
	$str = preg_replace("/\[b\](.*?)\[\/b\]/i","<b>$1</b>",$str);
	//	italic
	$str = preg_replace("/\[i\](.*?)\[\/i\]/i","<i>$1</i>",$str);
	//	underline
	$str = preg_replace("/\[u\](.*?)\[\/u\]/i","<u>$1</u>",$str);
	//	quote
	$str = preg_replace("/\[quote\](.*?)\[\/quote\]/i","<i>&bdquo;$1&rdquo;</i>",$str);
	//	center
	$str = preg_replace("/\[center\](.*?)\[\/center\]/i","<center>$1</center>",$str);
	//	[item]
	$str = preg_replace_callback("/\[item\](\d+)\[\/item\]/i",'forum_item_link_replace_callback',$str);
	$str = preg_replace_callback("/http\:\/\/www\.wowhead\.com\/\?item\=([\d]+)/i",'forum_extern_item_link_replace_callback',$str);
	$str = preg_replace_callback("/http\:\/\/www\.wowhead\.com\/item\=([\d]+)/i",'forum_extern_item_link_replace_callback',$str);
	$str = preg_replace_callback("/http\:\/\/www\.wowarmory\.com\/item\-info\.xml\?i\=([\d]+)/i",'forum_extern_item_link_replace_callback',$str);
	return $str;
}

function forum_extern_item_link_replace_callback($match){
	return $match[0]." ".forum_item_link_replace_callback($match);
}

function forum_item_link_replace_callback($match){
	
	$ret = '';
	if($match[1]){
		$item_info = get_item_link($match[1]);
		if($item_info!=-1){
			$ret.="<a class='fo_item_link' href='?item=".$match[1]."' onmousemove='g_moveTooltip()' style='color:".$GLOBALS['g_color'][$item_info[1]]."' onmouseover='g_showItemTooltip(".$match[1].")' onmouseout = 'g_hideTooltip();'>".$item_info[0]."</a>";
		}
		else $ret.="<font class='grey'>item not found (id ".$match[1].")</font>";
	}
	return $ret;
}

function forum_new_topic( $content, $title, $sessionId, $forum)
{
	// check content length
	if(isset($content) && is_string($content) && strlen($content)>1){
		$content = htmlspecialchars($content,ENT_QUOTES);
	}
	else{
		return array(1,'The content is too short!');
	}
	// check title length
	if(isset($title) && is_string($title) && strlen($title)>1){
		$title = htmlspecialchars($title,ENT_QUOTES);
	}
	else{
		return array(2,'The title is too short!');
	}
	// check login
	if(isset($sessionId) && $sessionId!="")
	{
		session_start($sessionId);
		if(!isset($_SESSION['user_id']) || !isset($_SESSION['password']))
		{
			return array(4,'You have to be logged in, to create a new topic!');
		}
	}
	else
	{
		return array(3,'You have to be logged in, to create a new topic!');
	}
	// check forum
	if(isset($forum) && is_numeric($forum) && mysql_fetch_assoc(mysql_query("select * from forum_subforum where subforumID=".mysql_real_escape_string($forum))))
	{
		$forumId = $forum;
	}
	else{
		return array(5,'This forum does not exist!');
	}
	// check pause
	if($_SESSION['role']!=10 && mysql_fetch_assoc(mysql_query('select * from forum_post where userID = '.mysql_real_escape_string($_SESSION['user_id']).' and created+30>'.time())))
	{		
		return array(6,'Please wait 30sec before posting again!');
	}
	if($_SESSION['role']!=10 && NEWS_FORUM == $forumId )
	{		
		return array(7,'Admin rights are required to post in this forum!');
	}
	
	// insert post
	$q = "insert into forum_topic values(null,'".mysql_real_escape_string($forumId)."','".mysql_real_escape_string($title)."',0,0)";
	mysql_db_query(
		$GLOBALS['g_forum_db'],
		$q,
		$GLOBALS['g_db_con']
	);
	$id = mysql_insert_id($GLOBALS['g_db_con']);
	$q = "insert into forum_post values(null,".$id.",'".mysql_real_escape_string($_SESSION['user_id'])."','".mysql_real_escape_string($title)."','".mysql_real_escape_string($content)."',".time().",".time().",0)";
	mysql_db_query(
		$GLOBALS['g_forum_db'],
		$q,
		$GLOBALS['g_db_con']
	);
	$msg = $id;
	return array(0,$id);
}

?>