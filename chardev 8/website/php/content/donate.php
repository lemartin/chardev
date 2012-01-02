<?php

$donations = mysql_fetch_assoc(mysql_db_query(
	$GLOBALS['g_user_db'],
	"SELECT sum(`amount`) as `Total` FROM `donations`",
	$GLOBALS['g_db_con']
));

$g_content = '
<div class="ne_bg">
<div class="ne_bg_old_t">
<div class="ne_bg_b">
			<div class="ne_title">Donate</div>
			<div class="ne_content">
				Chardev is a Web Application extensively using SQL and AJAX.
				Every item you view or enchant you apply triggers a series of AJAX requests which are 
				processed by the chardev server and translated into database requests.<br />
				Therefor the server needs to provide the necessary performance to process these requests and respond within seconds even at peak times.
				If you want to support chardev, keep it alive and response times low please donate.  
				<br />
				<br />
				Thank you,<br>
				Martin Wa&szlig;mann
				<div class="dn_button">
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post" >
							<input type="hidden" name="cmd" value="_s-xclick" />
							<input type="hidden" name="hosted_button_id" value="4708302" />
							<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!" style="border:0px" />
							<img alt="" src="https://www.paypal.com/de_DE/i/scr/pixel.gif" width="1" height="1" />
						
					</form>
				</div>
				<div class="dn_notice">
					As a small bonus, after donating chardev will be free of any advertisements. 
					Be sure to supply your chardev user name, either directly via paypal or afterwards via E-Mail.
				</div>
				<div class="dn_total">Total amount of donations: '.$donations['Total'].'&euro;</div>
			</div>
</div>
</div>
</div>';
?>