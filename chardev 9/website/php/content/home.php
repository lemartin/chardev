
<link href="forum.css" rel="stylesheet" />

<?php
	require_once 'php/thread_database.php';
	require_once 'php/user_data.php';
	require_once 'php/forum_permissions.php';
	require_once 'php/forum.php';

	$db = new ThreadDatabase( "mysql:dbname=chardev_user;host=127.0.0.1", "root", "");
	$forum = new Forum($db, new ForumPermissions(isset($_SESSION['user_id']) ? new user_data((int)$_SESSION['user_id']) : null));
	
	$threads = $db->getThreads(4, 5, 0, ThreadDatabase::ORDER_CREATED );
	
	$g_content = "
		<table cellpadding=\"0\" cellspacing=\"0\" class=\"ne_table\">
			<colgroup>
				<col width=\"536px\" />
				<col width=\"404px\" />
			</colgroup>
			<tr>
				<td valign=\"top\"><div class=\"ne_p\">";
	$n = 0;
	
	foreach( $threads as $thread ) {
		
		$cssSuffix = $n!=0 ? '_old' : '';
		$date = Forum::timestampToString($thread['Created']);
		$author = new user_data($thread['AuthorID']);
		$roleCss = Forum::roleToCssClass($author);
		$post = $db->getPost($thread['InitialPostID']);
		$content = ($n==0?Forum::replaceCode($post["Content"]):shorten($post["Content"],100)."&nbsp<a class=\"ne_read_more\" href=\"?thread=".(int)$thread["ID"]."\">read more</a>");
		
		$g_content .= 
			"<div class=\"ne_title{$cssSuffix}\">{$thread['Title']}</div>
			<div class=\"ne_header\">
					By <span class=\"{$roleCss}\">{$author->get_name()}</span> posted {$date}
			</div>
			<div class=\"ne_content".($n!=0 ? " ne_content_old" : "" )."\">
				{$content}
			</div>
			<div class=\"ne_cl".($n!=0 ? " ne_cl_old" : "" )."\">
				<a class=\"fo_comment_link\" href=\"?thread=".(int)$thread["ID"]."\">".(($thread["PostCount"])<2?"No Comments":($thread["PostCount"]-1)." Comments")."</a>
			</div>"; 
		
		$n++;
	} 
	
	
	$g_content .= "
				</td>
				<td valign=\"top\">
					<div class=\"fo_recent_p\">
						<div class=\"fo_recent_title\">Recent forum posts</div>";
	
	$recentPosts = $db->getRecentsPosts(20);
	$n = 0;
	foreach( $recentPosts as $post ) {
		$date = Forum::timestampToString($post['Created']);
		$author = new user_data($post['AuthorID']);
		$roleCss = Forum::roleToCssClass($author);
		$thread = $db->getThread($post['ThreadID']);
		$hook = $db->getHook($thread['ThreadHookID']);
		
		$forumName = "<a class=\"fo_header_subforum_link\" href=\"?forum={$hook['ID']}\">".shorten($hook['Name'], 20)."</a>";
		$link = Forum::threadLink($thread,60,true);
		$g_content .= "
						<div class=\"fo_recent" . ( $n == (count($recentPosts)-1) ? '_last' : '' ) . ( $n % 2 == 0 ? " fo_cell_bg1" : " fo_cell_bg2" ) . "\"\>
							<div class=\"forum_time\"><span class=\"{$roleCss}\">
								{$author->get_name()}
								</span> {$date} in 
								{$forumName}
							</div>
							<div>{$link}</div>
						</div>";
		
		$n++;
	} 
	
	$g_content .= "
					</div>
				</td>
			</tr>
		</table>";
	
/*	
	$g_content = '
		<table cellpadding="0" cellspacing="0" class="ne_table">
			<colgroup>
				<col width="536px" />
				<col width="404px" />
			</colgroup>
			<tr>
				<td valign="top"><div class="ne_p">';
	$news = forum_get_topics(NEWS_FORUM,1);
	for( $i = 0 ; $i < min(count($news),5) ; $i++ )
	{
		$g_content .=
			'
			<div class="ne_title'. ($i!=0 ? '_old' : '' ) .'">'.$news[$i]['title'].'</div>
			<div class="ne_header">
					By <span class="'
						.$user_role_to_css_class[$news[$i]['creatorRole']].'">'.$news[$i]['creator'].
					'</span> posted '.
					date("M jS Y \a\\t  g:i A",(int)$news[$i]['created'])
				.'
			</div>
			
			<div class="ne_content'. ($i!=0 ? ' ne_content_old' : '' ) .'">
			'.($i==0?$news[$i]['content']:shorten($news[$i]['content_plain'],100).'&nbsp<a class="ne_read_more" href="?topic='.(int)$news[$i]['topicId'].'">read more</a>').'
			</div>
			<div class="ne_cl'.($i!=0 ? ' ne_cl_old' : '' ).'">
				<a class="fo_comment_link" href="?topic='.(int)$news[$i]['topicId'].'">'.(($news[$i]['posts']-1)<=0?'No Comments':($news[$i]['posts']-1).' Comments').'</a>
			</div>';
	}
	if( 0 == count($news) )
	{
		$g_content .= '<h6>No news found!</h6>';
	}
	$g_content .= '
				</div></td>
				<td valign="top">
					<div class="fo_recent_p">
				
				
					<div class="fo_recent_title">Recent forum posts</div>';

	$new = forum_get_new_posts( 10, array(4) );
	
	for( $i = 0 ; $i < count($new) ; $i++ )
	{
		$g_content .= '
					<div class="fo_recent' . ( $i == (count($new)-1) ? '_last' : '' ) . ( $i % 2 == 0 ? " fo_cell_bg1" : " fo_cell_bg2" ) . '">
						<div class="forum_time"><span class="'.$user_role_to_css_class[$new[$i]['role']].'">'.
								$new[$i]['name'].
							'</span> '.
							date("M jS Y g:i A",(int)$new[$i]['created']).
							' in <a class="fo_header_subforum_link" href="?forum=' . $new[$i]['forumId'] . '">'.
							shorten($new[$i]['forum'], 20).
							'<a>'.
							'</div>
						<div>'.forum_topic_link( $new[$i]['flag'], $new[$i]['locked'], $new[$i]['topicId'], $new[$i]['title'], $new[$i]['posts'], $new[$i]['page'], 60 ).'</div>
					</div>';
	}
	$g_content .= '
					</div>
				</td>
			</tr>
		</table>';
?>
*/
								
							