<code>
<?php
	include('../datacon/db.php');
	include('../datacon/functions.php');
    
	$stmt = mysql_query('select * from itemset');
	
	while($result = mysql_fetch_assoc($stmt))
	{
		$n = 1;
		echo $result['name']."<br/>";
		$stmt_item = mysql_query('select group_concat(name) as name from items where itemsetid ='.$result['id'].' and outdated = 0 group by inventoryslotid');
		while($result_item = mysql_fetch_assoc($stmt_item))
		{
			$arr = explode(',', $result_item['name']);
			if(count($arr)>1)
			{
				$name = "";
				
				$word = explode(' ', $arr[0]);
				for($j=0;$j<count($word);$j++)
				{
					$keep = true;
					
					for($i=1;$i<count($arr);$i++)
					{
						$cmp = explode(' ', $arr[$i]);
						$found = false;
						for($h=0;$h<count($cmp);$h++)
						{
							if( strcasecmp($cmp[$h], $word[$j]) === 0 )
							{
								$found = true;;
							}
						}
						if( $found )
						{
							$keep = true;
						}
						else
						{
							$keep = false;
							break;
						}
					}
					if($keep)
					{
						$name .= ($name?" ":"").$word[$j];
					}
				}
				
				if(!$name)
				{
					$name = $arr[0];
				}
			}
			else
			{
				$name = $arr[0];	
			}
			echo $n++." ".$result_item['itemId']." ".preg_replace('/^(.*)of$/i', '\1', $name)."<br/>"; 
		}
	}
?>
</code>