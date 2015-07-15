<?php
namespace chardev\backend\data;

use chardev\Language;

use chardev\backend\Database;

use chardev\backend\DatabaseHelper;

class ItemSetData extends Data
{

	protected static $instance = null;

	/**
	 *
	 * @return ItemSetData
	 */
	public static function getInstance ()
	{
		if (self::$instance == null) {
			self::$instance = new ItemSetData();
		}
		return self::$instance;
	}

	protected function __construct() {
		//
	}

	protected function getData ($id)
	{
		$record = DatabaseHelper::fetchOne(Database::getConnection(), 
				"SELECT * FROM `itemset` WHERE `ID` = ?", array($id));
		
		if (! $record) {
			return null;
		}
		
		$set = array();
		$count = 0;
		
		$set[0] = (int) $record['ID'];
		$set[1] = $record['Name'];
		for ($i = 0; $i < 10; $i ++) {
			$item_id = $record['ItemID' . ($i + 1)];
			$set[2][$i] = (int) $item_id;
			if ($item_id > 0) {
				$count ++;
			}
		}
		for ($i = 0, $j = 1; $i < 8; $i ++, $j ++) {
			if ($record['SpellID' . $j] > 0) {
				$set[3][$i] = SpellData::getInstance()->fromId(
						$record['SpellID' . $j]);
			} else {
				$set[3][$i] = null;
			}
			$set[4][$i] = (int) $record['required' . $j];
		}
		$set[5] = (int) $count;
		
		$itemStmt = DatabaseHelper::query(
				Database::getConnection(), 
				"SELECT GROUP_CONCAT(`Name" .
						 Language::getInstance()->toColumnSuffix() .
						 "`) as name, InventorySlot FROM `item_sparse` s LEFT JOIN " .
						 "chardev_mop_static.`chardev_item_stats` cis ON s.`ID`=cis.`ItemID` WHERE `ItemSetID` = ? GROUP BY `InventorySlot`", 
				array($id)
		);

		$set[6] = array();
		// Gladiator Set Name Fix
		while (false !== ($itemRecord = $itemStmt->fetch())) {
			$arr = explode(',', $itemRecord['name']);
			if (count($arr) > 1) {
				$name = "";
				
				$word = explode(' ', $arr[0]);
				for ($j = 0; $j < count($word); $j ++) {
					$keep = true;
					
					for ($i = 1; $i < count($arr); $i ++) {
						$cmp = explode(' ', $arr[$i]);
						$found = false;
						for ($h = 0; $h < count($cmp); $h ++) {
							if (strcasecmp($cmp[$h], $word[$j]) === 0) {
								$found = true;
								;
							}
						}
						if ($found) {
							$keep = true;
						} else {
							$keep = false;
							break;
						}
					}
					if ($keep) {
						$name .= ($name ? " " : "") . $word[$j];
					}
				}
				
				if (! $name) {
					$name = $arr[0];
				}
			} else {
				$name = $arr[0];
			}
			$set[6][] = array((int) $itemRecord['InventorySlot'], 
				preg_replace('/^(.*)of$/i', '\1', $name));
		}
		
		return $set;
	}
}

?>