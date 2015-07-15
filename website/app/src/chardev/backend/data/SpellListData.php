<?php
namespace chardev\backend\data;

use chardev\Language;

use chardev\backend\Database;
use chardev\backend\Constants;

use chardev\backend\DatabaseHelper;

class SpellListData extends ListData {
	
	protected static $instance = null;
	/**
	 *	@return SpellListData
	 */
	public static function getInstance()
	{
		if( self::$instance == null ) {
			self::$instance = new SpellListData();
		}
		return self::$instance;
	}
	
	protected function __construct( ) {
        //
    }
	
	public function getSpells( $arguments, $flags, $order, $page ) {
		$page = $page < 1 ? 1 : $page;
		$joinSpellRange = false;
		$joinEquippedItems = false;
		$is_enchant = false;
		$where = "";
		$spells = array();
		$orderClause = "";
		$values = array();
		// arguments
		$this->parseArguments( $arguments, $matches );
		foreach($matches as $match) {
			$operator = constant($match[2]);
			switch( $match[1] ) {
				case "maxrange":
					$joinSpellRange = true;
					$this->parseNumericArgument($where,$values,$operator,$match[3],"sr.MaximumHostile");
					break;
				case "name":
					$this->parseStringArgument($where,$values,$operator,$match[3],"s.Name");
					break;
				case "description":
					$this->parseStringArgument($where,$values,$operator,$match[3],"s.Description");
					break;
				case "slot":
					$joinEquippedItems = true;
					$this->parseBinaryArgument($where,$values,$operator,$match[3],"sei.`InventorySlotMask`",true);
					break;
				case "itemclass":
					$joinEquippedItems = true;
					$this->parseNumericArgument($where,$values,$operator,$match[3],"sei.`ItemClassID`",true);
					break;
				case "itemsubclass":
					$joinEquippedItems = true;
					$this->parseBinaryArgument($where,$values,$operator,$match[3],"sei.`ItemSubClassMask`",true);
					break;
				case "itemclasssubclasscombined":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
		
					$joinEquippedItems = true;
					$arr = explode( ".", $match[3] );
		
					if( count($arr) != 2 ) {
						throw new \Exception("Value ".$match[3]." is invalid");
					}
		
					$where .= ( $where?" AND ":"" ) ."((sei.`ItemSubClassMask`&" .(1<<(int)$arr[1]). ") != 0 OR sei.`ItemSubClassMask`=0) AND sei.`ItemClassID`=".(int)$arr[0];
		
					break;
				case "isenchant":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					else {
						if((int)$match[3] == 1) {
							$is_enchant = true;
						}
					}
					break;
				case "enchantchrlevel":
					$is_enchant = true;
					$this->parseNumericArgument($where,$values,$operator,$match[3],"sie.`RequiredCharacterLevel`",true);
					break;
				default:
					//echo "unknown argument: ".$match[1];
					break;
			}
		}
		// order
		$orderClause = $this->parseOrder( $order, array( "id" => "s.`ID` ", "name" => "s.`Name` ", "enchantchrlevel" => "sie.`RequiredCharacterLevel` " ));
		
		if( $is_enchant ) {
			$orderClause .= ($orderClause?",":"") . "s.`ID` DESC";
		}
		
		$query = "SELECT s.`ID` as ID FROM ".
				"`spell` s".
				($joinSpellRange?					" INNER JOIN `spellrange` 				sr 		ON sr.`ID` = s.`SpellRangeID`":"").
				($joinEquippedItems?				" INNER JOIN `spellequippeditems` 		sei 	ON sei.`ID` = s.`SpellEquippedItemsID`":"").
				($is_enchant?						" INNER JOIN chardev_mop_static.`chardev_enchant_spell` 	ces 	ON s.`ID` = ces.`SpellID`".
						" INNER JOIN `spelleffect` 				se 		ON se.`SpellID` = s.`ID`".
						" INNER JOIN `spellitemenchantment` 	sie 	ON sie.`ID` = se.`SecondaryEffect`":"").
						($where?" WHERE ".$where:"").
						( $orderClause ? " ORDER BY ".$orderClause : "" ).
						" LIMIT ".Constants::SPELLS_PER_PAGE *($page-1).",".(Constants::SPELLS_PER_PAGE+1);
		
		$records = DatabaseHelper::fetchMany(Database::getConnection(), $query, $values); 
		
		$spells[0] = array( count($records), Constants::SPELLS_PER_PAGE);
		
		$sp = SpellData::getInstance();
		
		$n = min(count($records),Constants::SPELLS_PER_PAGE);
		for( $i=0; $i<$n; $i++ ) {
			$spells[$i+1] = $sp->fromId($records[$i]['ID']);
		}
		
		return $spells;
	}
}