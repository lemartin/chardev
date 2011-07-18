<?php
	include('php/func_forum.php');
?>


<link href="forum.css" rel="stylesheet" />

<?php

$topicId 	= 0;
$subforumId = 0;
$page 		= 1;
$reply		= false;

if(isset($_GET['page']) && is_numeric($_GET['page']) && $_GET['page']>0)
	$page = $_GET['page'];
	
if(isset($_GET['forum']) && is_numeric($_GET['forum']))
	$subforumId = $_GET['forum'];

if(isset($_GET['topic']) && is_numeric($_GET['topic']))
	$topicId = $_GET['topic'];

if( $topicId )
{
//
//	show posts
//
	$action = "";
	$topic = mysql_fetch_assoc(mysql_query("select t.subforumID as subforumID, t.flag as flag, t.locked as locked, t.title as topic_title, s.title as subforum_title from forum_topic t inner join forum_subforum s on t.subforumID = s.subforumID where topicID=".(int)$topicId));
	$post_count_record = mysql_fetch_assoc(mysql_query("select count(*) as count from forum_post where topicID=".(int)$topicId));
	$post_pages = (int)ceil((float)$post_count_record['count']/(float)$GLOBALS['posts_per_page']);
//	
	$fo_ll = "<a class='fo_link' href='?forum'>chardev forum</a>";
//	
	if( $topic )
	{
		$fo_ll .= ' &raquo; '
			.'<a class="fo_link" href="?forum='.$topic['subforumID'].'">'.$topic['subforum_title'].'</a>'
			.' &raquo; '
			.forum_topic_link( $topic['flag'], $topic['locked'], $topicId, $topic['topic_title'] );
	}
//	
	if( $loggedIn && $topic )
	{
		$action .= "<div class='fo_ll_active'><a class='fo_link' href='?topic=".$topicId."&amp;new_reply#bottom'>&gt; new reply &lt;</a></div>";
	}
//
	if( $topic && isset($_GET['new_reply']) )
	{
		$reply = true;
		$page = -1;
	}
//
	$posts = forum_get_posts( $topicId, $page);
	
	$g_content = "
<div class='fo_table_bg'>
<div class='fo_row_t'>
<div class='fo_row_f'>
<div class='fo_row_b'>
<div class='fo_ll'>
	<div class='fo_ll_left'>".$fo_ll."</div>
	<div class='fo_ll_right'>".$action."</div>
</div>
<table cellpadding='0' cellspacing='0' align='center'>
	<colgroup>
		<col width='150px' />
		<col width='650px' />
	</colgroup>";
	
	for($i = 0 ; $i < count($posts) ; $i++ )
	{
		$g_content .= "
	<tr class='fo_header'>
		<td class='fo_header_first'>
		".(!$reply?"<a class='forum_post_anchor' name='p".($i+1)."' href='?topic=".$topicId."&amp;page=".$page."#p".($i+1)."'>#".($i + 1 + ( $page - 1 ) * $GLOBALS['posts_per_page'])."</a>":"")."
		</td>
		<td>
			<div class='forum_post_time'>
				Posted ".date("M jS Y \a\\t  g:i A",(int)$posts[$i]['created'])."
				".(isset($_SESSION['user_id']) && $_SESSION['user_id']==$posts[$i]['userId'] || isset($_SESSION['role']) && $_SESSION['role']==10 ?"&nbsp;<a href='?topic=".$topicId."&amp;page=".$page."&amp;edit=".$posts[$i]['postId']."#p".($i+1)."'>&raquo; edit &laquo;</a>":"")."
			<div>
		</td>
	</tr>
	<tr>
		<td class='forum_user_info".($posts[$i]['role']==10?'_admin':'')."' valign='top'>
		<div class='".$user_role_to_css_class[$posts[$i]['role']]."'>".$posts[$i]['user']."</div>";
		if($posts[$i]['avatar'])
		{
			$g_content .= "<div><img class='forum_avatar' src='images/icons/large/".$posts[$i]['avatar'].".png' /></div>";
		}
		$g_content .= "
		joined ".date("M jS Y",(int)$posts[$i]['joined'])."<br>
		Posts: ".(int)$posts[$i]['posts']."<br>
		</td>
		<td valign='top' class='fo_content_p'><div class='forum_content".($posts[$i]['role']==10?'_admin':'')."'>
		";
		if(isset($_GET['edit']) && $_GET['edit'] == $posts[$i]['postId'] && ($_SESSION['user_id']==$posts[$i]['userId'] || $_SESSION['role']==10) )
		{
			$g_content .= "
			<form method='post' id='edit_form' onsubmit='g_checkEdit(".$posts[$i]['postId'].",".$topicId.",".$page.");return false;' action=''>
				<textarea id='edit_content' rows='10' cols='60'>".$posts[$i]['content_plain']."</textarea>
				<div class='text_align_right'>
					<input id='edit_submit' type='submit' value='submit'/>
				</div>
			</form>
			<div id='edit_status'></div>";
		}
		else
		{
			$g_content .= $posts[$i]['content'];
		}
		$g_content .= "
		</div></td>
	</tr>
		";
	}
	if($reply)
	{
		$g_content .= " 
	<tr>
		<td></td>
		<td>
			<div class='fo_re_p'>
				<a name='bottom' href='#'></a>
				<form method='post' id='reply_form' onsubmit='g_checkReply(".$topicId.",".$posts_per_page.");return false;' action=''>
					<div class='fo_re_t'>Reply:</div>
					<textarea class='fo_re' id='reply_content'></textarea>
					<div class='text_align_right'>
						<input id='reply_submit' type='submit' value='submit'/>
					</div>
				</form>
			</div>
		</td>
	</tr>
		";
	}
	else
	{
		$g_content .= "
	<tr>
		<td colspan='2' class='fo_page'>
			<table style='width: 100%'><colgroup><col width='50%'/><col width='0%'/><col width='50%'/></colgroup>
				<tr>
					<td>".($page>1?"<a class='forum_page_link' href='?topic=".$topicId."&amp;page=".($page-1)."'>&laquo;previous</a>":'')."</td>
					<td>".$page."&nbsp;of&nbsp;".$post_pages."</td>
					<td align='right'>".($post_pages>$page?"<a class='forum_page_link' href='?topic=".$topicId."&amp;page=".($page+1)."'>next&raquo;</a>":"")."</td>
				</tr>
			</table>
		</td>
	</tr>
		";
	}
	$g_content .= "
</table>
</div>
</div>
</div>
</div>";
}
else if( $subforumId )
{
//
//	topic list
//
	$new_topic = isset($_GET['new_topic']);
	$subforum = mysql_fetch_assoc(mysql_query("select * from forum_subforum where subforumID=".(int)$subforumId));
	$topic_count_record = mysql_fetch_assoc(mysql_query("select count(*) as count from forum_topic where flag >= 0 and subforumId=".(int)$subforumId));
	$topic_pages = (int)ceil((float)$topic_count_record['count']/(float)$GLOBALS['topics_per_page']);
	$action = "";
	
	$fo_ll = "<div class='fo_ll'><a class='fo_link' href='?forum'>chardev forum</a>";
	if( $subforum )
	{
		$fo_ll .= ' &raquo; <span class="fo_ll_active">'.$subforum['title'].'</span>';
	}
	$fo_ll .= "</div>";

	if( $loggedIn && $subforum && !$new_topic )
	{
		$action = "<a class='fo_link' href='?forum=".$subforumId."&amp;new_topic'>&gt; New Topic &lt;</a>";
	}
	
	$g_content .= "
<div class='fo_table_bg'>
<div class='fo_row_t'>
<div class='fo_row_f'>
<div class='fo_row_b'>
<div class='fo_ll'>
	<div class='fo_ll_left'>".$fo_ll."</div>
	<div class='fo_ll_right'>".$action."</div>
</div>";
	
	if( $subforum && $new_topic)
	{
		if(isset($_GET['topic_title']) && isset($_GET['content'])){
			$title = $_GET['topic_title'];
			$content = $_GET['content'];
		}
		$g_content .= "
			<div class='fo_header'></div>
			<div class='fo_nt_p'>
				<form id='topic_form' method='post' onsubmit='g_checkTopic(".$subforumId.");return false;' action=''>
					<div>
						<div class='fo_nt_title_left'>Title:</div>
						<div class='fo_nt_title_right'><input class='fo_nt_title' id='topic_title'/></div>
					</div>
					<div class='clear_both'></div>
					<div class='fo_nt_content_t'>Content:</div>
					<textarea class='fo_nt_content' id='topic_content'></textarea>
					<div class='text_align_right'><input id='topic_submit' type='submit' value='submit' /></div>
				</form>
			</div>
			<div id='topic_status'></div>";
	}
	else
	{
		$g_content .="
<div class='clear_both'></div>
<table cellpadding='0' cellspacing='0' align='center'>
	<colgroup>
		<col width='500px' />
		<col width='50px' />
		<col width='250px' />
	</colgroup>
	<tr class='fo_header'>
		<td class='fo_header_first'>Topic</td>
		<td>Posts</td>
		<td>Latest Post</td>
	</tr>";
	
	
		if( $subforum )
		{
			$topics = forum_get_topics($subforumId,$page);
			for( $i = 0 ; $i < count($topics); $i++ )
			{
				if( $i > 0 && $topics[$i-1]['flag'] > 0 && $topics[$i]['flag'] == 0 )
				{
					$g_content .= "<tr><td colspan='3'><div class='fo_border'></div></td></tr>";
				}
				$g_content .='
	<tr class="fo_row">
		<td class="fo_cell_l">
			<div class="fo_topic">
				<div class="forum_additional_info"><span class="'.$user_role_to_css_class[$topics[$i]['creatorRole']].'">'.$topics[$i]['creator'].'</span>, '.date("M jS Y g:i A",(int)$topics[$i]['created']).'</div>
				<h3>'.forum_topic_link( $topics[$i]['flag'], $topics[$i]['locked'], $topics[$i]['topicId'], $topics[$i]['title'] ).'</h3>
			</div>
		</td>
		<td class="fo_cell_m">'.$topics[$i]['posts'].'</td>
		<td class="fo_cell_r">
			<div class="forum_last_post">
				<span class="forum_time">Posted '.date("M jS Y \a\\t  g:i A",(int)$topics[$i]['lastPostCreated']).'
				<br />by </span><span class="'.$user_role_to_css_class[$topics[$i]['lastPosterRole']].'">'.$topics[$i]['lastPoster'].'</span>
				<a class="forum_goto_link" href="?topic='.$topics[$i]['topicId'].'&amp;page='.$topics[$i]['pages'].'#p'.$topics[$i]['posts'].'">&raquo;</a>
			</div>	
		</td>
	</tr>
				';
			}
		}
		else
		{
				$g_content .='
	<tr class="forum_entry">
		<td colspan="3"><div class="forum_entry_right"><div class="forum_entry_left"><div class="forum_entry_container"><h6>This Forum doesn\'t exist!</h6></div></div></div></td>
	</tr>';
		}
		$g_content .= "
	<tr>
		<td colspan='3' class='fo_page'>
			<table style='width: 100%'><colgroup><col width='50%'/><col width='0%'/><col width='50%'/></colgroup>
				<tr>
					<td>".($page>1?"<a class='forum_page_link' href='?forum=".$subforumId."&amp;page=".($page-1)."'>&laquo;previous</a>":'')."</td>
					<td>".$page."&nbsp;of&nbsp;".$topic_pages."</td>
					<td align='right'>".($topic_pages>$page?"<a class='forum_page_link' href='?forum=".$subforumId."&amp;page=".($page+1)."'>next&raquo;</a>":"")."</td>
				</tr>
			</table>
		</td>
	</tr>
</table>";
	}
	$g_content .= "
</div>
</div>
</div>
</div>";
}
else
{
//
//	forum list
//
	$subforum_count_record = mysql_fetch_assoc(mysql_query("select count(*) as count from forum_subforum"));
	$subforum_pages = (int)ceil((float)$subforum_count_record['count']/(float)$GLOBALS['forums_per_page']);
	$g_content .= "
<div class='fo_table_bg'>
<div class='fo_row_t'>
<div class='fo_row_f'>
<div class='fo_row_b'>
<div class='fo_ll'>
	<span class='fo_ll_active'>chardev forum</span>
</div>
<table cellpadding='0' cellspacing='0' align='center' class='fo_table'>
	<colgroup>
		<col width='450px' />
		<col width='50px' />
		<col width='50px' />
		<col width='250px' />
	<colgroup>
	<tr class='fo_header'>
		<td class='fo_header_first'>Forum</td>
		<td>Topics</td>
		<td>Posts</td>
		<td>Latest Post</td>
	</tr>";
	$subforums = forum_get_subforums($page);
	for( $i = 0 ; $i < count($subforums); $i++ )
	{
		$new = forum_get_new_posts( 1, array($subforums[$i]['subforumId']), true );
		
		$tt = "";
		if( $subforums[$i]['description'] ) {
			$tt = 'onmouseover="Tooltip.showHTML(\''.htmlspecialchars($subforums[$i]['description'],ENT_QUOTES).'\')" onmousemove="Tooltip.move()" onmouseout="Tooltip.hide()"';
		}
		$g_content .='
	<tr class="fo_row">
		<td class="fo_cell_l'.($i == count($subforums)-1 ? 'b' : '' ).'">
			<div class="fo_subforum">
				<a '.$tt.' class="fo_link" href="?forum='.$subforums[$i]['subforumId'].'">'.$subforums[$i]['title'].'</a>
			</div>
		</td>
		<td class="fo_cell_m'.($i == count($subforums)-1 ? 'b' : '' ).'">'.$subforums[$i]['topics'].'</td>
		<td class="fo_cell_m'.($i == count($subforums)-1 ? 'b' : '' ).'">'.$subforums[$i]['posts'].'</td>
		<td class="fo_cell_r'.($i == count($subforums)-1 ? 'b' : '' ).'">
			<div class="forum_last_post">';
		if( count($new) )
		{
			$g_content .='
				<span class="forum_time">Posted '.date("M jS Y g:i A",(int)$new[0]['created']).'
				by <span class="'.$user_role_to_css_class[$new[0]['role']].'">'.$new[0]['name'].'</span></span>
				<h3>'.forum_topic_link( $new[0]['flag'], $new[0]['locked'], $new[0]['topicId'], $new[0]['title'], $new[0]['posts'], $new[0]['page'], 20 ).'</h3>
			';
		}
		$g_content .='
			</div>
		</td>
	</tr>
			';
		}
$g_content .="
</table>
</div>
</div>
</div>
</div>";
}
?>