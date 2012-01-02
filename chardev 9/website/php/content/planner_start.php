<?php
	require_once 'php/func_forum.php';

	$news = forum_get_topics(NEWS_FORUM,1);
	$news_post = "";
	
	if( count($news) != null ) {
		$news_post .=
			'
			
			<div>
				<span>'.$news[0]['title'].'</span>
				<span> by '.$news[0]['creator'].' posted '.date("M jS Y \a\\t  g:i A",(int)$news[0]['created']).'</span>
			</div>
			
			<div>
			'.shorten($news[0]['content_plain'],100).'&nbsp<a href="?topic='.(int)$news[0]['topicId'].'">read more</a>
			</div>';
	}
	
	$g_content .= "
		<div>
			<div>Latest news post:</div>
			<div>".$news_post."</div>
		</div>
		<table width='100%' cellpadding='0' cellspacing='0'>
			<colgroup>
				<col width='50%' />
				<col width='50%' />
			</colgroup>
			<tr>
				<td valign='top'>
					<div>
						<div>Create a new Profile</div>
						<div>Start with a blank profile</div>
						<div>Import from Battle.net</div>
					</div>
				</td>
				
				<td valign='top'>
					<div>
						<div>Load a profile</div>
						<div>Your recent profiles:</div>
					</div>
				</td>
			</tr>
		</table>
	";
	/*
	<div class='im_sa_p'>
		<div class='im_sa_h'>Create a new profile</div> 
		<div class='im_sa_r'> 
			<div class='im_sa_left'>".$locale['User_name']."</div>
			<div class='im_sa_right'><input tabindex='10' class='input im_sa_in' id='user_name' /></div>
		</div>
		<div class='clear_both'></div>
		<div class='im_sa_r'> 
			<div class='im_sa_left'>".$locale['Password']."</div>
			<div class='im_sa_right'><input tabindex='11' class='input im_sa_in' id='password' type='password'/></div>
		</div>
		<div class='clear_both'></div>
		<div class='im_sa_r'> 
			<div class='im_sa_left'>".$locale['Repeat']."</div>
			<div class='im_sa_right'><input tabindex='12' class='input im_sa_in' id='password_repeat' type='password'/></div>
		</div>
		<div class='clear_both'></div>
		<div class='im_sa_r'> 
			<div class='im_sa_left'>E-Mail</div>
			<div class='im_sa_right'><input tabindex='13' class='input im_sa_in' id='email'></div>
		</div>
		<div class='clear_both'></div>
		<div class='im_sa_b'><input type='submit' tabindex='14' id='login' value='Register' /></div>
	</div>
	*/
?>