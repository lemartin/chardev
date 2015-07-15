<?php
namespace chardev\backend\data;

use chardev\Language;
use chardev\backend\Constants;
use chardev\backend\Database;
use chardev\backend\DatabaseHelper;

class ItemListData extends ListData
{
	private static $stat_to_column_name = array( 
		4=>"Strength", 3=>"Agility", 7=>"Stamina", 5=>"Intellect", 6=>"Spirit",
		13=>"DodgeRating", 14=>"ParryRating", 15=>"BlockRating", 31=>"HitRating",
		32=>"CritRating", 35=>"ResilienceRating", 36=>"HasteRating",
		37=>"ExpertiseRating", 38=>"AttackPower", 45=>"SpellPower", 
		49=>"MasteryRating"
	);
	
	protected static $instance = null;
	/**
	 *	@return ItemListData
	 */
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new ItemListData();
		}
		return self::$instance;
	}
    
    protected function __construct() {
        //
    }


    public function getItems( $arguments, $flags, $order, $page = 1, $weights = null ) {
		
		$page = $page < 1 ? 1 : $page;
		$where = " cis.`DoNotShow` != 1 ";
		$orderClause = "";
		$items = array();
		$values = array();
		$join_gem_properties = false;
        $join_quest = false;
		
		$suffix = Language::getInstance()->toSuffixString();
		$langColumnSuffix = $suffix ? strtoupper($suffix) : 'EN';
	
		$weightedScore = "(0";
		if( $weights ) {
			foreach( $weights as $k => $v ) {
				if( isset(self::$stat_to_column_name[$k]) ) {
					$weightedScore .= "+(cis.`".self::$stat_to_column_name[$k]."`*".((float)$v).")";
				}
			}
		}
		$weightedScore .= ")";
	
		// arguments
		$matches = null;
		$this->parseArguments( $arguments, $matches );
		foreach($matches as $match) {
			$operator = constant($match[2]);
			switch( $match[1] ) {
				case "str":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`Strength`");
					break;
				case "agi":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`Agility`");
					break;
				case "sta":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`Stamina`");
					break;
				case "int":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`Intellect`");
					break;
				case "spi":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`Spirit`");
					break;
				case "dod":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`DodgeRating`");
					break;
				case "par":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`ParryRating`");
					break;
				case "blo":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`BlockRating`");
					break;
				case "hit":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`HitRating`");
					break;
				case "crit":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`CritRating`");
					break;
				case "res":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`ResilienceRating`");
					break;
				case "haste":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`HasteRating`");
					break;
				case "ap":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`AttackPower`");
					break;
				case "sp":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`SpellPower`");
					break;
				case "mast":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`MasteryRating`");
					break;
				case "name":
					$this->parseStringArgument($where,$values,$operator,$match[3],"cis.`Name$langColumnSuffix`");
					break;
				case "desc":
					$this->parseStringArgument($where,$values,$operator,$match[3],"cis.`Description$langColumnSuffix`");
					break;
				case "subclass":
					if($operator == BA && (int)$match[3] == 0) {
						//ignore filter
					}
					else {
						$this->parseNumericArgument($where,$values,$operator,$match[3],"i.`ItemSubClass`");
					}
					break;
				case "class":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"i.`ItemClass`");
					break;
				case "usablebyclass":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					else if( (int)$match[3] == 0 ) {
						$cl_c = 's.`ChrClassMask`';
						$where .= ( $where ? " AND " : "" ) . "(" . $cl_c . " = 0 OR (" . $cl_c . " & 2047) = 2047 )";
					}
					else if( ((int)$match[3] & 2047) == 0 ) {
						throw new \Exception("Value ".$match[3]." is not a valid character class mask");
					}
					else {
						$cl_id = (int)$match[3];
						$cl_c = 's.`ChrClassMask`';
                        $q = "";
						//TODO add a more substantial item filtering per class, see old php/js interface
						//
						// Weapons
						switch($cl_id) {
                            case 1:
                            case 8:
                            case 64:
                            case 1024:
                                $q .= " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (19) )";
                                break;
							case 2:
								$q .= " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (10,13,15,19) )";
								break;
							case 4:
								$q .= " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (4,5,19))";
								break;
							case 32:
								$q .= " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (10,13,15,19) )";
								break;
							case 16:
								break;
							case 128:
								$q .= " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` NOT IN (0,1,4,5,6,8,13))";
								break;
							case 512: 
								$q .= " AND ( i.`ItemClass`!=2 OR i.`ItemSubClass` IN (0,4,6,7,10,13))";
								break;
							default:
								$q .= "";
                                break;
						}
						//
						// Armor
						switch($cl_id) {
							case 4:
							case 64:
								$q .= " AND ( i.`ItemClass`!=4 OR i.`ItemSubClass` NOT IN (4))";
								break;
							case 8:
							case 512:
							case 1024:
								$q .= " AND ( i.`ItemClass`!=4 OR i.`ItemSubClass` NOT IN (3,4))";
								break;
							case 16:
							case 128:
							case 256:
								$q .= " AND ( i.`ItemClass`!=4 OR i.`ItemSubClass` NOT IN (2,3,4))";
								break;
						}
						$where .= ( $where ? " AND " : "" ) . "((" . $cl_c ."&". (int)$match[3].")!=0 OR ". $cl_c . "='0' )".$q;
					}
					break;
				case "issocketablegem":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					else {
						$where .= ( $where ? " AND " : "" ) . ( (int)$match[3] == 0 ? " NOT " : "" ) .  "( s.`GemPropertiesID` != 0 )";
					}
					break;
				case "slot":
					if( (1<<5&(int)$match[3]) != 0 ) {
						$match[3]|=1<<20;
					}
					if( (1<<15&(int)$match[3]) != 0 ) {
						$match[3]|=1<<25|1<<26;
					}
	
					$this->parseNumericArgument($where,$values,$operator,$match[3],"s.`InventorySlot`");
					break;
				case "gemcolor":
					break;
				case "level":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"s.`Level`");
					break;
				case "reqlvl":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"s.`RequiredCharacterLevel`");
					break;
				case "gemreqitemlvl":
					$join_gem_properties = true;
					$this->parseNumericArgument($where,$values,$operator,$match[3],"gp.`MinItemLevel`");
					break;
				case "canbeusedwithlvl":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					else {
						$where .= ( $where ? " AND " : "" ) . "( s.`RequiredCharacterLevel` <= ".(int)$match[3]." )";
//                        $where .= ( $where ? " AND " : "" ) . "( s.`Binds` != 1 OR q.`ID` IS NULL OR q.`RequiredLevel` <= ".(int)$match[3]." )";
//                        $join_quest = true;
					}
					break;
				case "reqrepu":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					else {
						$where .= ( $where ? " AND " : "" ) . ( (int)$match[3] == 0 ? " NOT " : "" ) .  "( s.`RequiredFactionID` != 0 )";
					}
					break;
				case "quality":
					if($operator == BA && (int)$match[3] == 0) {
						//ignore filter
					}
					else {
						$this->parseNumericArgument($where,$values,$operator,$match[3],"s.`Quality`");
					}
					break;
				case "dps":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`DPS`");
					break;
				case "delay":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"s.`Delay`/1000");
					break;
				default:
					echo "unknown argument: ".$match[1];
					break;
			}
		}
		// order
	
		$orderClause .= $this->parseOrder (
				$order,
				array(
					"level" => "s.`Level`",
					"name" => "s.`Name`",
					"subclass" => "i.`ItemSubClass`",
					"dps" => "cis.`DPS`",
					"delay" => "s.`Delay`",
					"slot" => "s.`InventorySlot`",
					"weightedscore" => "WeightedScore",
				)
		);
	
		$query = "SELECT s.`ID`, ".$weightedScore." as WeightedScore ".
				"FROM `item_sparse` s ".
				"INNER JOIN `item` i on i.`ID` = s.`ID` ".
				"LEFT JOIN chardev_mop_static.`chardev_item_stats` cis ON cis.`ItemID`=i.`ID` ".
				( $join_gem_properties ? "LEFT JOIN `gemproperties` gp ON s.`GemPropertiesID` = gp.`ID` " : "" ) .
                ( $join_quest ?
                    "LEFT JOIN chardev_mop_static.`chardev_item_source` src ON src.`ItemID`=i.`ID` and src.`Type`=3 " .
                    "LEFT JOIN chardev_mop_static.`chardev_quest` q ON q.`ID` IS NOT NULL AND q.`ID` = src.`SourceID`" : "" ) .
				" WHERE ".$where.
				($orderClause ? " ORDER BY ".$orderClause : "").
				" LIMIT ".Constants::ITEMS_PER_PAGE *($page-1).",".(Constants::ITEMS_PER_PAGE + 1);

		$records = DatabaseHelper::fetchMany(Database::getConnection(),$query,$values);

		$items[0] = array( count($records), Constants::ITEMS_PER_PAGE);
		$n = min(count($records),Constants::ITEMS_PER_PAGE);
		$ids = array();
		for( $i=0; $i<$n; $i++ ) {
			$ids[$i] = $records[$i]['ID'];
		}
		$datas = ItemData::getInstance()->fromIds($ids);
		for( $i=0; $i<$n; $i++ ) {
			$items[$i+1] = array($datas[$i],$records[$i]['WeightedScore']);
		}
		
		return $items;
	}
}

?>