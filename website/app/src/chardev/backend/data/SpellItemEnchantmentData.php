<?php
namespace chardev\backend\data;

use chardev\Language;

use chardev\backend\DoesNotExistException;
use chardev\backend\Database;
use chardev\backend\DatabaseHelper;

class SpellItemEnchantmentData extends Data
{
	protected static $instance = null;
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new SpellItemEnchantmentData();
		}
		return self::$instance;
	}
	
	protected function __construct() {
		//
	}
	
	protected function getData( $id ) {
		$db = Database::getConnection();
		$enchant = null;

		$record = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellitemenchantment` WHERE `ID` = ?", array($id)); 
		if( ! $record ) {
			throw new DoesNotExistException("Spell item enchantment $id");
		}
		$enchant[0] = (int)$record['ID'];
			
		$enchant[1] = array();
		$enchant[2] = array();
		$enchant[3] = array();
		$enchant[4] = array();
		for( $i = 0, $j = 1; $i < 3; $i++, $j++ ) {
			$enchant[1][$i] = (int)$record['Type'.$j];
			$enchant[2][$i] = (int)$record['Value'.$j];
			$enchant[3][$i] = (int)$record['SpellID'.$j];
			if((int)$record['SpellID'.$j] > 0 && ( $record['Type'.$j] == 3 || $record['Type'.$j] == 7 || $record['Type'.$j] == 1 )) {
				$enchant[4][$i] =  SpellData::getInstance()->fromId((int)$record['SpellID'.$j]);
			}
			else {
				$enchant[4][$i] = null;
			}
		}
		$enchant[5] = $record['Description'];
		//
		//	Spell item enchantment condition
		//
		$condition = null;
		if( $record['SpellItemEnchantmentConditionID'] > 0 ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellitemenchantmentcondition` WHERE `ID` = ?", array($record['SpellItemEnchantmentConditionID']));
			
			if($joinRecord) {
				$condition = array();
				$condition[0] = (int)$joinRecord['ID'];
				$condition[1] = array();
				$condition[2] = array();
				$condition[3] = array();
				$condition[4] = array();
				for( $i = 0; $i < 5; $i++ ) {
					$condition[1][$i] = (int)$joinRecord['Color'.($i+1)];
					$condition[2][$i] = (int)$joinRecord['Comparator'.($i+1)];
					$condition[3][$i] = (int)$joinRecord['CompareColor'.($i+1)];
					$condition[4][$i] = (int)$joinRecord['Value'.($i+1)];
				}
			}
		}
		$enchant[6] = $condition; 
		//
		//	Skill line
		//
		$skillLine = null;
		if( $record['RequiredSkillLineID'] > 0 ) {
			$skillLine = SkillLineData::getInstance()->fromId($record['RequiredSkillLineID']);
		}
		$enchant[7] = $skillLine;
		//
		//	Requirements
		//
		$enchant[8] = (int)$record['RequiredSkillLineLevel'];
		$enchant[9] = (int)$record['RequiredCharacterLevel'];
		$enchant[10] = (int)$record['EnchantSlot'];
		//
        //  Parsed description
        //
        $descRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM chardev_mop_static.`chardev_spellitemenchantmentinfo` WHERE `SpellItemEnchantmentID` = ? ", array($id));
        $json = $descRecord['Description'.Language::getInstance()->toColumnSuffix()];
		$obj = null;
		if( $json ) {
			$obj = json_decode($json);
		}
        $enchant[11] = $obj;
		return $enchant;
	}
}

?>