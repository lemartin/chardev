
<?php
	ini_set('memory_limit', '512M');

	include('../db.php');
	include('../common.php');
	include('../locale/en.php');

	$l_to_lang = array(0,2,3,6,8);
	
	for( $l = 0; $l < 5; $l ++ )
	{
		switch_game_data_base($l_to_lang[$l]);
		mysql_select_db($GLOBALS['g_game_db']);
		
		set_time_limit(0);
		$to = array("de"=>"bis",""=>"to","fr"=>"à","es"=>"a","ru"=>"-");
		$arrLang = array("","fr","de","es","ru");
		
		
		$lang = $arrLang[0];
		$to_str = $to[$lang];
		$g_scalable = false;
		$debug = false;
		
		$stmt = mysql_query('select * from spell where 1');
		while($result = mysql_fetch_assoc($stmt))
		{
			$g_scalable = false;
			//echo htmlspecialchars($result['ID']).":".$result['Description']."\n";
			$GLOBALS['current_spell'] = $result;
			/*
			for($i=0;$i<5;$i++){
				$lang = $arrLang[$i];
				$GLOBALS['to_str'] = $to[$lang];
				$bd = descReplace($result['desc'.$lang]);
				$btd = descReplace($result['tooldesc'.$lang]);
				$q = "update spell set `bustedDesc".$lang."`='".mysql_real_escape_string($bd=='null'?'':$bd)."' , `bustedTooldesc".$lang."`='".mysql_real_escape_string($btd=='null'?'':$btd)."' where spellID=".$result['spellId'];
				mysql_query($q);
				//echo $q;
			}
			*/;
			//echo $result['Description']."\n";
			$bd = descReplace($result['Description']);
			//echo $bd."\n";
			$btd = descReplace($result['BuffDescription']);
			
			if( $l_to_lang[$l] == 0 ) {
				$elixirMask = 0;
				
				if( preg_match('/Counts as both a Battle and Guardian elixir/i',$result['Description']) ) {
					$elixirMask = 3;
				}
				else if( preg_match('/Guardian Elixir/i',$result['Description']) ) {
					$elixirMask = 2;
				}
				else if( preg_match('/Battle Elixir/i',$result['Description']) ) {
					$elixirMask = 1;
				}
			}
			
			if( $l_to_lang[$l] == 0 ) {
				mysql_query(
					"replace into chardev_cataclysm_static.chardev_spellinfo ( SpellID, DescriptionEN, Scalable, ElixirMask ) values ( ".
					$result['ID'].", '".
					mysql_real_escape_string( $bd == 'null' ? '' : $bd )."', ".
					($g_scalable ? 1 : 0).", ".
					$elixirMask." )");
			}
			else {
				mysql_query(
					"update chardev_cataclysm_static.chardev_spellinfo set Description".
					$GLOBALS['g_table_suffix']."='".
					mysql_real_escape_string( $bd == 'null' ? '' : $bd ).
					"' where spellid=".$result['ID']);
			}
			echo mysql_error();
		}
		mysql_free_result($stmt);
	}
	/*
	echo sizeof($GLOBALS['varsqew']);
	foreach($GLOBALS['varsqew'] as $key=>$value)
		echo htmlspecialchars($key)."<br/>";
	*/
	
	function descReplace($desc)
	{
		if( $GLOBALS['debug'] ) echo ">".$desc."\n";
		$desc = preg_replace('/\$g([^\:]*)\:([^;]*);/i','\1/\2',$desc);
		
		$desc = replace_inline_condition($desc);
		
		$desc = preg_replace_callback('/\$(lte|lt|le|gt|ge|eq)\(([^\,]+)\,([^\,]+)\)/','replace_condition_comparision',$desc);
		
		/*
		$cond_count = 0;
		do {
			$desc = preg_replace_callback('/\$(\?.+)$/','condition_replace2',$desc,-1,$cond_count);
		}
		while ( $cond_count > 0 );
		*/
		
		$desc = preg_replace_callback('/\$(?:(?:(\/)|(\*))([1-9]+[0-9]*);)*(\d*)([a-zA-Z]+)(\d*)(([^\$]*)\$l([^\:]*)\:([^;]*);)*/','variable_replace',$desc);
		
		$desc=str_replace("\x0D\x0A","|",$desc);
		$desc=str_replace("\r\n","|",$desc);
		$desc=str_replace("\n\r","|",$desc);
		$desc=str_replace("\x0D","|",$desc);
		$desc=str_replace("\x0A","|",$desc);
		$desc=str_replace("\r","|",$desc);
		$desc=str_replace("\n","|",$desc);
		$desc=str_replace("--","+",$desc);
		$desc=str_replace("++","+",$desc);
		$desc=str_replace("\t","\u00A0\u00A0\u00A0\u00A0",$desc);
		$desc=str_replace("\x0B","|\u00A0\u00A0\u00A0\u00A0",$desc);
		
		if( $GLOBALS['debug'] ) echo "<".$desc."\n";
		return $desc;
	}
	function find_equation($str)
	{
		//echo htmlspecialchars($str)."\n";
		preg_match_all('/(\$\{[^\}]*\})|(\$(?:(?:(?:\/)|(?:\*))(?:[1-9]+[0-9]*);)*(?:\d*)(?:[a-zA-Z]+)(?:\d*)(?:\:[a-zA-Z]+;)*)/',$str,$match);
		for($i=0;$i<sizeof($match[0]);$i++)
			echo htmlspecialchars(($match[1][$i]?"equ: ":"val: ").$match[0][$i])."\n";
	}
	
	function condition_parse( $str ) {
		$on_true = "";
		$on_false = "";
		
		preg_match( '/^\?(a|s)(\d+)(.+)?$/', $str, $match );
		
		if( !$match ) {
			return array("",$str);
		}
		$ret = condition_get_kontinuation( $match[3] );
		$on_true = $ret[0];
		
		$ret = condition_get_kontinuation( $ret[1] );
		$on_false = $ret[0];
		
		return array( ($match[1] == "s" ? '$spell_cond' : '$aura_cond').'('.(int)$match[2].",".$on_true.",".$on_false.")", $ret[1] );
	}
	
	function condition_get_kontinuation ( $str ) {
		preg_match('/^(?:(\[([^\]]*)\])|(\?))(.*)$/',$str,$match_k);
		if( isset($match_k[1]) ) {
			return array("'".mysql_real_escape_string($match_k[2])."'",$match_k[4]);
		}
		else {
			return condition_parse( $str );
		}
	}
	
	function condition_replace2($match) {
		$ret = condition_parse($match[1]);
		return $ret[0].$ret[1];
	}
	//#########################################################################
	//
	//	INLINE CONDITION
	//
	//#########################################################################
	//
	function replace_inline_condition( $text ) {
		$pos = mb_strpos($text,'$cond(');
		if( $pos === false ) {
			return $text;
		}
		$start_pos = $pos + 6;
		$end_pos = find_closing(mb_substr($text,$start_pos),"(",")",$start_pos);
		
		$cond_str = mb_substr($text,$start_pos,$end_pos);
		$s1 = find_comma($cond_str);
		$c = mb_substr($cond_str,0,$s1);
		
		$cond_str = mb_substr($cond_str,$s1+1);
		$s1 = find_comma($cond_str);
		$t = replace_inline_condition(mb_substr($cond_str,0,$s1));
		
		$cond_str = mb_substr($cond_str,$s1+1);
		$f = replace_inline_condition(mb_substr($cond_str,0));
		return mb_substr($text,0,$pos)."($c?$t:$f)".mb_substr($text,$start_pos+$end_pos+1);
	}
	//
	//	
	//
	function replace_condition_comparision($matches) {
		$op = "";
		switch( $matches[1] ) {
			case 'eq': $op = '=='; break;
			case 'lt': $op = '<'; break;
			case 'gt': $op = '>'; break;
			case 'lte': 
			case 'le': $op = '<='; break;
			case 'ge': $op = '>='; break;
			default: throw new Exception("Unknown comparator: "+$matches[1]);
		}
		return "(".$matches[2].")".$op."(".$matches[3].")";
	}
	//
	//
	//	
	function find_comma($text) {
		$n = 0;
		$l = mb_strlen($text);
		for($i=0;$i<=$l;$i++) {
			$c = mb_substr($text,0,1); $text= mb_substr($text,1);
			switch($c) {
				case "(": $n++;break;
				case ")": $n--;break;
				case ",": if($n==0){return $i;};break;
			}
		}
		if($n>0) {
			throw new Exception("No comma found");
		}
	}
	//
	//
	//
	function find_closing($text,$open,$closed) {
		$n = 1;
		$l = mb_strlen($text);
		for($i=0;$i<=$l;$i++) {
			$c = mb_substr($text,0,1); $text= mb_substr($text,1);
			switch($c) {
				case $open: $n++;break;
				case $closed: $n--;break;
			}
			if($n==0) {
				return $i;
			}
		}
		if($n>0) {
			throw new Exception("Unmatched ".$open." in: ".$text);
		}
	}
	//
	//#########################################################################
	//
	function variable_replace($match){
		$spell_id = $match[4];
		$effect = $match[5];
		$effect_nr = $match[6] ? (int) $match[6] : 1;
		$scaling = false;
		$spell_result = null;
		$mod = 1;
		if($match[1])		$mod=1/(int)$match[3];
		else if($match[2])	$mod=(int)$match[3];
		
		if($spell_id){
			$spell_result = mysql_query("SELECT * FROM spell WHERE ID=".$spell_id);
			if(! ($spell = mysql_fetch_assoc( $spell_result) )) { 
				return $match[0];
			}
		}
		else $spell = $GLOBALS['current_spell'];
		
		if( $spell && $spell['SpellScalingID'] > 0 ) {
			$scaling = true;
		}	
		
		switch($effect){
			case "a":
				$record2 = mysql_query("SELECT r.Radius FROM spellradius r, spelleffect e WHERE e.spellid=".$spell['ID']." and r.ID = e.SpellRadiusID and e.Index =".($effect_nr-1));
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["Radius"]);
				mysql_free_result($record2);
				break;
			case "b":
				$record2 = mysql_query("SELECT `ProcChance` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1));
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["ProcChance"]);
				mysql_free_result($record2);
				break;
			case "D":
			case "d":
				$val= '$time('.getEffect($spell,$effect_nr,'$d',$mod).')';
				break;
			case "e":
				$record2 = mysql_query("SELECT `ProcValue` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1));
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["ProcValue"]);
				mysql_free_result($record2);
				break;
			case "F":
				// FIXME
				$val = 5;
				break;
			case "f":
				//TODO
				//$val=$mod*abs($spell["dmgMultiplier".$effect_nr]);
				break;
			case "H":
			case "h":
				$record2 = mysql_query("SELECT `ProcRate` FROM `spellauraoptions` WHERE `ID` = ".$spell['SpellAuraOptionsID']);
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["ProcRate"]);
				mysql_free_result($record2);
				break;
			case "i":
				$record2 = mysql_query("SELECT `Targets` FROM `spelltargetrestrictions` WHERE `ID` = ".$spell['SpellTargetRestrictionsID']);
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["Targets"]);
				mysql_free_result($record2);
				break;
			// TODO
			case "n":
				$record2 = mysql_query("SELECT `ProcCharges` FROM `spellauraoptions` WHERE `ID` = ".$spell['SpellAuraOptionsID']);
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["ProcCharges"]);
				mysql_free_result($record2);
				break;
			case "m":
				$val= getEffect($spell,$effect_nr,'$m',$mod);
				break;
			case "M":
				$val= getEffect($spell,$effect_nr,'$M',$mod);
				break;
			
			case "o":
				$record2 = mysql_query("SELECT `Duration` FROM spellduration WHERE `ID`=".$spell['SpellDurationID']);
				$result2 = mysql_fetch_assoc($record2);
				$record3 = mysql_query("SELECT `Period`,`Value` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1));
				$result3 = mysql_fetch_assoc($record3);
				
				if( !isset($result3['Value']) ) {
					echo "No SpellEffect with index $effect_nr found!\n";
					
					if( $effect_nr != 1 ) {
						echo "Trying SpellEffect 0\n";
						mysql_free_result($record3);
						$record3 = mysql_query("SELECT `Period`,`Value` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = '0'");
						$result3 = mysql_fetch_assoc($record3);
					}
				
					if( !isset($result3['Value']) ) {
						echo "Unable to parse description (".$GLOBALS['current_spell']['ID'].")";
					}
				}
				
				if($result3['Period'] == 0) {
					
					echo $spell['ID'].": Period is 0 assuming 3000ms\n";
					$result3['Period'] = 3000;
				}
				
				$val = $mod * abs( (int)$result3['Value'] * (int)$result2['Duration'] / (int)$result3['Period'] );
				mysql_free_result($record2);
				mysql_free_result($record3);
				break;
			case "q":
				//echo "__SELECT `SecondaryEffect` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1)."\n";
				$record2 = mysql_query("SELECT `SecondaryEffect` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1));
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["SecondaryEffect"]);
				mysql_free_result($record2);
				break;
			case "R":
			case "r":
				$record2 = mysql_query("SELECT `MinimumHostile` FROM `spellrange` WHERE `ID`=".$spell['SpellRangeID']);
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["MinimumHostile"]);
				mysql_free_result($record2);
				break;
			// TODO
			
			case "S":
			case "s":
				$val=getEffect($spell,$effect_nr,'$s',$mod);
				break;
			case "t":
				$record2 = mysql_query("SELECT `Period` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1));
				$result2 = mysql_fetch_assoc($record2);
				$val= $mod*$result2["Period"]/1000;
				mysql_free_result($record2);
				break;
			case "u":
				$record2 = mysql_query("SELECT `Stacks` FROM `spellauraoptions` WHERE `ID` = ".$spell['SpellAuraOptionsID']);
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["Stacks"]);
				mysql_free_result($record2);
				break;
			case "v":
				//removed with cata?
				break;
			case "x":
				$record2 = mysql_query("SELECT `Targets` FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1));
				$result2 = mysql_fetch_assoc($record2);
				$val=$mod*abs($result2["Targets"]);
				mysql_free_result($record2);
				break;
			default:
				$GLOBALS['varsqew'][$effect]=1;
				$val=($match[1]?('1/'.$match[3].'*'):($match[2]?($match[3].'*'):"")).'$'.$match[4].$match[5].$match[6];
				break;
		}
		if( $spell_result ) {
			mysql_free_result($spell_result);
		}
		return $val.( isset($match[8]) ? $match[8].( $val>1 ? $match[10] : $match[9] ) : '' );
	}
	function timeToString( $timeInSeconds ) {
		$timeInSeconds = round($timeInSeconds,1);
		if (($timeInSeconds % 3600) == 0) 
		{
			return $timeInSeconds / 3600 . " " . $GLOBALS['locale']['h'];
		}
		else if (($timeInSeconds % 60) == 0) 
		{
			return $timeInSeconds / 60 . " " . $GLOBALS['locale']['m'];
		}
		else 
		{
			return $timeInSeconds . " " . $GLOBALS['locale']['s'];
		}
	}
	
	function getEffect( $spell, $effect_nr, $prefix, $mod ) {
		$effectResult = mysql_query("SELECT * FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = ".($effect_nr - 1));
		$effectRecord = mysql_fetch_assoc($effectResult);
		if( ! $effectRecord ) {
			echo "Failed to read spell effect ".($effect_nr - 1).", fallen back to 0.\n";
			$effectResult = mysql_query("SELECT * FROM `spelleffect` WHERE `SpellID` = ".$spell['ID']." AND `Index` = 0");
			$effectRecord = mysql_fetch_assoc($effectResult);		
		}
		$return_value = "";
		$value = abs($effectRecord['Value']);
		$dice = abs($effectRecord['Dice']);
		if( $GLOBALS['debug'] ) echo $spell['ID'].' '.$effect_nr.' '.(int)$spell['SpellScalingID'] .' '. (float)$effectRecord['Coefficient']."\n";
		if( (int)$spell['SpellScalingID'] != 0  ) {
			$scalingResult = mysql_query("SELECT * FROM `spellscaling` WHERE `ID` = ".$spell['SpellScalingID']);
			$scalingRecord = mysql_fetch_assoc($scalingResult);
			if( ( $prefix == '$s' || $prefix == '$m' || $prefix == '$M' ) && (float)$scalingRecord['Coefficient'.$effect_nr] != 0 ) {
				$GLOBALS['g_scalable'] = true;
				switch( $prefix ) {
					case '$s':
						$value = '$s('.
							$scalingRecord['CastTimeStart'].','.
							$scalingRecord['CastTimeEnd'].','.
							$scalingRecord['Intervals'].','.
							$scalingRecord['Distribution'].','.
							$scalingRecord['Coefficient'.$effect_nr].','.
							'0'.','.$mod.')';
							
						if($effectRecord['Coefficient'] != 0 ) {
							$value = '${'.$effectRecord['Coefficient'].'*$sp+'.$value.'}';
						}
						break;
					case '$M':
						$value = 
							'$M('.
							$scalingRecord['CastTimeStart'].','.
							$scalingRecord['CastTimeEnd'].','.
							$scalingRecord['Intervals'].','.
							$scalingRecord['Distribution'].','.
							$scalingRecord['Coefficient'.$effect_nr].','.
							$scalingRecord['Dice'.$effect_nr].','.$mod.')';
						break;
					case '$m':
						$value = 
							'$m('.
							$scalingRecord['CastTimeStart'].','.
							$scalingRecord['CastTimeEnd'].','.
							$scalingRecord['Intervals'].','.
							$scalingRecord['Distribution'].','.
							$scalingRecord['Coefficient'.$effect_nr].','.
							$scalingRecord['Dice'.$effect_nr].','.$mod.')';
						break;
					default:
						die('Unknown prefix'.$prefix);
				}
				$return_value = $value;
			}
			else if( $prefix == '$d' && $scalingRecord['CastTimeStart'] != $scalingRecord['CastTimeEnd'] && $scalingRecord['Intervals'] > 0 ) {
				$GLOBALS['g_scalable'] = true;
				$value = 
					'$d('.
					$scalingRecord['CastTimeStart'].','.
					$scalingRecord['CastTimeEnd'].','.
					$scalingRecord['Intervals'].','.$mod.')';
				$return_value = $value;
			}
			mysql_free_result($scalingResult);
		}
		
		if( !$return_value ) {		
			switch( $prefix ){
				case '$s':
					$return_value = 
						( $dice ?	
							add_level_effect($value*$mod,(float)$effectRecord['LevelModifier']).
							' '.$GLOBALS['to_str'].' '
						  : '' ) . 
						add_level_effect(($value+$dice)*$mod,(float)$effectRecord['LevelModifier']);
					break;
				case '$m':
					$return_value = add_level_effect($value*$mod,(float)$effectRecord['LevelModifier']);
					break;
				case '$M':
					$return_value = add_level_effect(($value+$dice)*$mod,(float)$effectRecord['LevelModifier']);
					break;
				case '$d':
					$record2 = mysql_query("SELECT Duration FROM spellduration WHERE ID=".$spell['SpellDurationID']);
					$result2 = mysql_fetch_assoc($record2);
					$return_value = $mod*$result2["Duration"]/1000;
					mysql_free_result($record2);
					break;
				default:
					die('Unknown prefix'.$prefix);
			}
		}
		mysql_free_result($effectResult);
		return $return_value;
	}
	
	function add_level_effect( $base ,$level_mod ) {
		if( $level_mod > 0 ) {
				return '${($pl-1)*'.$level_mod.'+'.$base.'}';
		}
		return $base;
	}
?>