<?php

namespace chardev\backend\data;

use chardev\backend\Database;

use chardev\backend\DatabaseHelper;
use chardev\backend\data\ListData;
use chardev\backend\Constants;

class ItemSetListData extends ListData {
	
	private static $instance = null;
	
	/**
	 *	@return ItemSetListData
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new ItemSetListData();
		}
		return self::$instance;
	}
	
	protected function __construct() {
		//
	}
	
	public function getSets( $arguments, $flags, $order, $page = 1 ) {
		
		$where = "";
		$values = array();
		
		$this->parseArguments($arguments, $matches);
		foreach($matches as $match) {
			$operator = constant($match[2]);
			switch( $match[1] ) {
				case "name":
					$this->parseStringArgument($where,$values,$operator,$match[3],"s.`Name`");
					break;
				case "level":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`MinItemLevel`");
					break;
				case "usablebyclass":
					if( $operator != EQ ) {
						throw new \Exception("Operator ".$match[2]." is not supported");
					}
					
					$cl_c = 'cis.`ChrClassMask`';
					if( (int)$match[3] == 0 ) {
						$where .= ( $where ? " AND " : "" ) . "(" . $cl_c . " = 0 OR (" . $cl_c . " & 2047) = 2047 )";
					}
					else {
						$where .= ( $where ? " AND " : "" ) . "((" . $cl_c ."&". (int)$match[3].")!=0 OR ". $cl_c . "<='0' )";
					}
					break;
				case "reqlvl":
					$this->parseNumericArgument($where,$values,$operator,$match[3],"cis.`MinRequiredCharacterLevel`");
					break;
			}
		}
		
		$orderClause = $this->parseOrder($order, array(
				"setid"=>"s.`ID`",
				"level"=>"cis.`MinItemLevel`",
				"name"=>"s.`Name`",
				"reqlvl"=>"cis.`MinRequiredCharacterLevel`",
		));
		
		$query = "SELECT `ID`, `Name`, cis.`MinItemLevel`, cis.`MaxItemLevel`, cis.`MinRequiredCharacterLevel`, cis.`MaxRequiredCharacterLevel`, cis.`MinQuality`, cis.`MaxQuality`, `ItemID1`, `ItemID2`, `ItemID3`, `ItemID4`, `ItemID5`, `ItemID6`, `ItemID7`, `ItemID8`, `ItemID9`, `ItemID10` ".
					"FROM `itemset` s INNER join chardev_mop_static.`chardev_itemset_stats` cis ON cis.`ItemSetID` = s.`ID` ".
					( $where ? " WHERE ". $where : '' ) . ($orderClause ? " ORDER BY ".$orderClause : ""). " LIMIT ".Constants::SETS_PER_PAGE *($page-1).",".(Constants::SETS_PER_PAGE+1);
		
		$records = DatabaseHelper::fetchMany(Database::getConnection(), $query, $values);
		
		$sets = array();
		
		$sets[0] = array( count($records), Constants::SETS_PER_PAGE);
		$n = min(count($records),Constants::SETS_PER_PAGE);
		
		$id = ItemData::getInstance();
		for( $i=0; $i<$n; $i++ ) {
			$record = $records[$i];
			$sets[$i+1] = array(
					(int)$record['ID'],
					$record['Name'],
					(int)$record['MinItemLevel'],
					(int)$record['MaxItemLevel'],
					(int)$record['MinRequiredCharacterLevel'],
					(int)$record['MaxRequiredCharacterLevel'],
					(int)$record['MinQuality'],
					(int)$record['MaxQuality'],
					array()
			);
			for( $j = 0; $j < 10; $j++ ) {
				$data = null;
				if( (int)$record['ID'] > 0 && null != ($data = $id->fromId($record['ItemID'.($j+1)]))) {
					$sets[$i+1][8][] = $data;
				}
			}
		}
		return $sets;
	}
}