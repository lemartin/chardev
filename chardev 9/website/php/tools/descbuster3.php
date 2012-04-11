<?php
	include('../db.php');
	
	set_time_limit(0);
	$addRange = 0;
	$addBase = 0;
	$to = array("de"=>"bis",""=>"to","fr"=>"�","es"=>"a");
	$arrLang = array("","fr","de","es");
	$arrColumn = array("desc","tooldesc");
	$arrTargetColumn = array("bustedDesc","bustedTooldesc");
	
	for($nLang = 0; $nLang<4; $nLang++){
		$lang = $arrLang[$nLang];
		//echo $lang."<br/>";
		for($nColumn = 0; $nColumn<2; $nColumn++){
			$targetColumn = $arrTargetColumn[$nColumn];
			$column = $arrColumn[$nColumn];
			//echo $targetColumn."<br/>";
			//echo $column."<br/>";
			$stmt=mysql_query("SELECT * FROM spell ORDER BY spellId ASC LIMIT 0,500000");
			while($result=mysql_fetch_assoc($stmt)){
				//echo $result['d'];
				$result[$column]=$result[$column.$lang];
				//echo $result[$column]."<br/>";
				if($result[$column]&&$result[$column]!="null"){
					
					$pos=-1;
					$endpos=0;
					$npos=0;
					$return_str="";
					$return_val="";
					$prev_val=0;
					$result[$column] = str_replace(" {"," \${",$result[$column]);
					while(($npos<strlen($result[$column]))&&(($pos=strpos($result[$column],'$',$npos))!==false)){
						if($return_val!="") $return_val.="|";
						
						$return_str.=str_replace("%","%%",substr($result[$column],$npos,$pos-$npos));
						$return_str.="\"+%s+\"";
						
						$desc=substr($result[$column],$pos);
						
						
						if(($desc[1]=="l")||($desc[1]=="g")){
							$a=substr($desc,2,strpos($desc,":")-2);
							$b=substr($desc,strpos($desc,":")+1,strpos($desc,";")-strpos($desc,":")-1);
							$end_pos=strpos($desc,";")+1;
							$npos=$pos+$end_pos;
							if($desc[1]=="l")
								if($prev_val&&($prev_val>1))
									$return_val.="\"".$b."\"";
								else $return_val.="\"".$a."\"";
							else $return_val.="\"".$b." or ".$a."\"";
							$prev_val="";
							continue;	
						}
						
						$new_end = 0;
						$end_pos = strlen($desc);
						$end_pos = ((($new_end=strpos($desc,"%"))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						$end_pos = ((($new_end=strpos($desc," "))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						$end_pos = ((($new_end=strpos($desc,","))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						$end_pos = ((($new_end=strpos($desc,"\n"))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						$end_pos = ((($new_end=strpos($desc,"\r"))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						$end_pos = ((($new_end=strpos($desc,"\0"))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						$end_pos = ((($new_end=strpos($desc,"\x0B"))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						$end_pos = ((($new_end=strpos($desc,"\t"))!==false) && ($new_end<$end_pos)) ? $new_end : $end_pos;
						
						
						$desc=substr($desc,0,$end_pos);
						if($desc[strlen($desc)-1]=="."){
							$end_pos-=1;
							$desc=substr($desc,0,$end_pos);
						}
						
						$npos=$pos+$end_pos;
						
						$i=-1;
						$number="";
						$operator="";
						while(($i+1)<strlen($desc)){
							$i++;
							//echo $i.": ".$number." ".$operator."<br/>";
							if(in_array(strtolower($desc[$i]),array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"))){
								$operator.=$desc[$i];
								continue;
							}
							else{
								if($operator){
									$n="";
									while(($i<strlen($desc))&&in_array($desc[$i],array("0","1","2","3","4","5","6","7","8","9"))){
										$n.=$desc[$i];
										$i++;
									}
									$return_val.=getValue($result,$operator,$n,$number);
									$operator="";
									$number="";
									if($i==strlen($desc)) break;
								}
							}
							if($desc[$i]=="$"){
								$return_val.=$number;
								$number="";
								if(in_array($desc[$i+1],array("*","/"))){
									if($desc[$i+1]=="/")	$return_val.="1";
									if($desc[$i+1]=="*")	$i++;
									$i++;
									while($desc[$i]!=";" && $i<sizeof($desc))
										$return_val.=$desc[$i++];
									$return_val.="*";
								}
								continue;
							}	
							if($desc[$i]=="{"){
								$return_val.=$number."(__f(";
								$number="";
								continue;
							}
							if($desc[$i]=="}"){
								$return_val.=$number.",2))";
								$number="";
								continue;
							}
							if(($number=="")&&($desc[$i]==".")){
								while(($i<strlen($desc))&&in_array($desc[$i],array("0","1","2","3","4","5","6","7","8","9",".")))
									$i++;
								continue;
							}
							if(in_array($desc[$i],array("0","1","2","3","4","5","6","7","8","9","."))){
								$number.=$desc[$i];
								continue;
							}
							if(in_array($desc[$i],array("+","-","*","/","(",")",","))){
								$return_val.=$number.$desc[$i];
								$number="";
								continue;
							}
						}
						if($operator)
							$return_val.=getValue($result,$operator,"",$number);
						else if($number)
							$return_val.=$number;
					}
					$return_str.=str_replace("%","%%",substr($result[$column],$npos));
					/*
					echo $return_str."<br/>";
					echo $return_val."<br/>";
					echo "<strong>".$result['name'];
					vsprintf($return_str,explode("|",$return_val)); echo "</strong><br/>";*/
					$arr = explode("|",$return_val);
					for($i=0;$i<sizeof($arr);$i++){
						if(strpos($arr[$i],"�")!==false){
							$arr[$i]=str_replace("�",$addBase,$arr[$i])."+\" ".$to[$lang]." \"+".str_replace("�",$addRange,$arr[$i]);
						}
					}
					$bustedDesc=vsprintf($return_str,$arr);
					$bustedDesc=str_replace("\x0D\x0A","|",$bustedDesc);
					$bustedDesc=str_replace("\r\n","|",$bustedDesc);
					$bustedDesc=str_replace("\n\r","|",$bustedDesc);
					$bustedDesc=str_replace("\x0D","|",$bustedDesc);
					$bustedDesc=str_replace("\x0A","|",$bustedDesc);
					$bustedDesc=str_replace("\r","|",$bustedDesc);
					$bustedDesc=str_replace("\n","|",$bustedDesc);
					$bustedDesc=str_replace("\t","\u00A0\u00A0\u00A0\u00A0",$bustedDesc);
					$bustedDesc=str_replace("\x0B","|\u00A0\u00A0\u00A0\u00A0",$bustedDesc);
					$queryString = "UPDATE spell SET ".$targetColumn.$lang."='\"".$bustedDesc."\"' WHERE spellId=".$result['spellId'];
					mysql_query($queryString);
					//echo $queryString."\n<br/>";
					
					//echo $result['spellId'].": ".str_replace("<","'",str_replace(">","\"",$result['name']))."<br/>";
					//echo str_replace("<","'",str_replace(">","\"",$result[$column]))."<br/>";
					//echo "\"".str_replace("<","'",str_replace(">","\"",vsprintf($return_str,explode("|",$return_val))))."\"<br/>";
				}
				echo "done";
			}
		}
	}
	
	function getValue($result,$id,$n,$spell){
		//echo "_".$id."_".$n."_".$spell."<br/>";
		if(!$n) $n=0;
		$mod=array("","","1","2");
		global $prev_val;
		global $addRange;
		global $addBase;
		if($spell)
			$result = mysql_fetch_assoc(mysql_query("SELECT * FROM spell WHERE spellId=".$spell));
		switch($id){
			case "a":
				$result2 = mysql_fetch_assoc(mysql_query("SELECT radius FROM spellradius WHERE id=".$result["radius".$mod[$n]]));
				$prev_val=abs($result2["radius"]);
				break;
			case "AP":
				$prev_val="ap";
				break;
			case "b":
				$prev_val=abs($result["procchance".$mod[$n]]);
				break;
			case "D":$id="d";	
			case "d":
				$result2 = mysql_fetch_assoc(mysql_query("SELECT duration FROM spellduration WHERE id=".$result['durationId']));
				$prev_val="\"";
				if($result2["duration"]<1000)
					$prev_val.=round($result2["duration"]/1000,1)." sec";
				else if(($result2["duration"]%60000)!=0) 
					$prev_val.=round($result2["duration"]/1000)." sec";
				else
					$prev_val.=round($result2["duration"]/60000)." min";
				$prev_val.="\"";	
				break;
			case "e":
				$n+=1;
				$prev_val=abs($result["procvalue".$mod[$n]]);
				break;
			case "F":$id="f";
			case "f":
				$n+=1;
				$prev_val=abs($result["dmgMultiplier".$mod[$n]]);
				break;
			case "h":
				$prev_val=abs($result["procRate"]);
				break;
			case "i":
				$prev_val=abs($result["targetcount"]);
				break;
			case "m":
				$prev_val="(".($result["effect".$mod[$n]]+1).")";
				break;
			case "M":
				$prev_val="(".($result["effect".$mod[$n]]+$result['range'.$mod[$n]]).")";
				break;
			case "max":
				$prev_val="Math.max";
				break;
			case "mw":
				$prev_val="mindmg";
				break;
			case "MW":
				$prev_val="maxdmg";
				break;
			case "MWB":
				$prev_val="maxdmg";
				break;
			case "mwb":
				$prev_val="mindmg";
				break;	
			case "MWS":
				$prev_val="delay/1000";
				break;
			case "n":
				$prev_val=abs($result["procCharges".$mod[$n]]);
				break;
			case "o":
				$result2 = mysql_fetch_assoc(mysql_query("SELECT duration FROM spellduration WHERE id=".$result['durationId']));
				if($result["period".$mod[$n]]<1) $result["period".$mod[$n]]=5000;
				$prev_val=abs($result["effect".$mod[$n]]+1)*$result2["duration"]/$result["period".$mod[$n]];
				break;
			case "PL":
				$prev_val="70";
				break;
			case "q":
				$prev_val=abs($result["spellitemId".$mod[$n]]);
				break;
			case "r":
				$prev_val=abs($result["spellrange"]);
				break;
			case "RAP":
				$prev_val="rap";
				break;
			case "rwb":
				$prev_val="rmindmg";
				break;
			case "RWB":
				$prev_val="rmaxdmg";
				break;
			case "S": $id="s";
			case "s":
				if($result['range'.$mod[$n]]>1){
					$addRange=abs($result["effect".$mod[$n]]+1+abs($result['range'.$mod[$n]]-1));
					$addBase =abs($result["effect".$mod[$n]]+1);
					$prev_val="�";
				}
				else $prev_val=abs($result["effect".$mod[$n]]+1);
				break;
			case "t":
				$prev_val="\"";
				if($result["period".$mod[$n]]<1000)
					$prev_val.=round($result["period".$mod[$n]]/1000,1)." sec";
				else if(($result["period".$mod[$n]]%60000)!=0) 
					$prev_val.=round($result["period".$mod[$n]]/1000)." sec";
				else
					$prev_val.=round($result["period".$mod[$n]]/60000)." min";
				$prev_val.="\"";	
				break;
			case "u":
				$prev_val=abs($result["stack".$mod[$n]]);
				break;
			case "v":
				$prev_val=abs($result["targetLevel"]);
				break;
			case "x":
				$prev_val=abs($result["chainTarget".$mod[$n]]);
				break;
			case "z":
				$prev_val="the Neverland";
				break;
			default:
				$prev_val="\"";
				$prev_val.=$spell.$id.$n;
				$prev_val.="\"";
				//echo "<strong>����".$prev_val."->".$result['spellId'].": ".$result[$column]."<br/>"."</strong>";
				break;
		}
		//echo $prev_val."<br/>";
		return $prev_val;
	}
?>