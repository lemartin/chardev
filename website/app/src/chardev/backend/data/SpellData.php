<?php
namespace chardev\backend\data;

use chardev\Language;
use chardev\backend\Database;
use chardev\backend\DatabaseHelper;
use chardev\backend\DoesNotExistException;

class SpellData extends Data
{
	private static $instance = null;
	
	/**
	 *	@return SpellData
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new SpellData();
		}
		return self::$instance;
	}
	
	protected function __construct() {
		//
	}
	
	protected function getData($id) {
		return $this->getSpell($id);
	}
	
	private function getSpell($id, &$spell_list = null ) {
		
		$spell = null;
		$db = Database::getConnection();
		$record = DatabaseHelper::fetchOne($db, "SELECT *, `spell`.`ID` AS `ID` FROM `spell` LEFT JOIN `spellmisc` ON `spell`.`SpellMiscID` = `spellmisc`.`ID` WHERE `spell`.`ID` = ? LIMIT 1", array($id));
		$resolve = $spell_list == null;
		
		if( ! $record ) {
			throw new DoesNotExistException("Spell $id");
		}
		
		$spell = array();
		$spell[0] = (int)$record['ID'];
		$spell[1] = $record['Name'];
		$spell[2] = $record['Description'];
		$spell[3] = self::getIcon($record['SpellIconID']);
		//
		// SpellDuration
		//
		$spellduration = 0;
		if( $record['SpellDurationID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellduration` WHERE `ID` = ?", array($record['SpellDurationID']));
			if( $joinRecord ) {
				$spellduration = (int)$joinRecord['Duration'];
			}
		}
		$spell[4] = $spellduration;
		//
		// SpellRange
		//
		$spellrange = null;
		if( $record['SpellRangeID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellrange` WHERE `ID` = ?", array($record['SpellRangeID']));
			if( $joinRecord ) {
				$spellrange = array(
					(float)$joinRecord['MinimumHostile'],
					(float)$joinRecord['MaximumHostile'],
					(float)$joinRecord['MinimumFriendly'],
					(float)$joinRecord['MaximumFriendly']
				);
			}
		}
		$spell[5] = $spellrange;
		//
		// SpellPower
		//
		$spellpower = null;
		$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellpower` WHERE `SpellID` = ?", array($record['ID']));
		if( $joinRecord ) {
			$spellpower = array(
				(float)$joinRecord['Type'],
				(float)$joinRecord['Absolute'],
				(float)$joinRecord['Relative'],
			);
		}
		$spell[6] = $spellpower;
		//
		// EnergyType
		//
		$spell[7] = -1;
		//
		// SpellCastTimes
		//
		$spellcasttime = 0;
		if( $record['SpellCastTimesID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellcasttimes` WHERE `ID` = ?", array($record['SpellCastTimesID']));
			if( $joinRecord ) {
				$spellcasttime = (int)$joinRecord['Time'];
			}
		}
		$spell[8] = $spellcasttime;
		//
		// SpellCooldowns
		//
		$spellcooldown = null;
		if( $record['SpellCooldownsID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellcooldowns` WHERE `ID` = ?", array($record['SpellCooldownsID']));
			if( $joinRecord ) {
				$spellcooldown = array(
					(int)$joinRecord['Spell'],
					(int)$joinRecord['Category'],
					(int)$joinRecord['Global']
				);
			}
		}
		$spell[9] = $spellcooldown;
		//
		// SpellEffect
		//
		$spelleffects = array();
		$joinRecords = DatabaseHelper::fetchMany($db, "SELECT * FROM `spelleffect` WHERE `SpellID` = ? ORDER BY `Index` ASC", array($record['ID']));
		for( $i=0; $i<count($joinRecords); $i++) {
			$joinRecord = $joinRecords[$i]; 
			$proc_spell = null;
	
			if( (int)$joinRecord['Effect'] == 42 || (int)$joinRecord['Effect'] == 23 ) {
				$load_proc_spell = true;
				$proc_spell_id = (int)$joinRecord['f22'];
	
				if( $spell_list == null ) {
					$spell_list = array();
				}
					
				$spell_list[(int)$record['ID']] = null;
					
				foreach( $spell_list as $id => $s ) {
					if( $id == $proc_spell_id ) {
						$load_proc_spell = false;
					}
				}
					
				if( $load_proc_spell ) {
					$spell_list[$proc_spell_id] = SpellData::getInstance()->fromId( $proc_spell_id, $spell_list );
				}
			}
			$spelleffects[(int)$joinRecord['Index']] = array(
				(int)$joinRecord['ProcValue'],
				(int)$joinRecord['Aura'],
				(int)$joinRecord['Effect'],
				(int)$joinRecord['Period'],
				(int)$joinRecord['Value'],
				(int)$joinRecord['Targets'],
				(float)$joinRecord['Coefficient'],
				(int)$joinRecord['Dice'],
				($joinRecord['Aura'] == 53 ? SpellItemEnchantmentData::getInstance()->fromId($joinRecord['SecondaryEffect']) : (int)$joinRecord['SecondaryEffect']),
				(int)$joinRecord['UsedStat'],
				(int)$joinRecord['ProcChance'],
				(int)$joinRecord['LevelModifier'],
				(int)$joinRecord['ProcSpellID'],
				(int)$joinRecord['ID'],
				(int)$joinRecord['SpellScalingCoefficient']
			);
			//TODO complete array, make sense of columns
		}
			
		$spell[10] = $spelleffects;
		// SpellScaling
		$spellscaling = null;
		if( $record['SpellScalingID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellscaling` WHERE `ID` = ?", array($record['SpellScalingID']));
			if( $joinRecord ) {
				$spellscaling = array(
					(int)$joinRecord['CastTimeStart'],
					(int)$joinRecord['CastTimeEnd'],
					(int)$joinRecord['Intervals'],
					(int)$joinRecord['Distribution']
				);
				// TODO complete array, make sense of columns
			}
		}
		$spell[11] = $spellscaling;
		//
		//	Parsed description
		//
		$chardev_spellinfo = DatabaseHelper::fetchOne($db, "SELECT * FROM chardev_mop_static.`chardev_spellinfo` WHERE `SpellID` = ?", array($record['ID']));
		
		$json = $chardev_spellinfo['Description'.Language::getInstance()->toColumnSuffix()];
		$obj = null;
		if( $json ) {
			$obj = json_decode($json);
		}
		
		$spell[12] = $obj;
		$spell[13] = (int)$chardev_spellinfo['Scalable'] ? true : false;
		//
		// SpellShapeShift
		//
		$spellshapeshift = null;
		if( $record['SpellShapeshiftID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellshapeshift` WHERE `ID` = ?", array($record['SpellShapeshiftID']));
			if( $joinRecord ) {
				$spellshapeshift = array(
					(int)$joinRecord['f2'],
					(int)$joinRecord['f3'],
					(int)$joinRecord['SpellShapeshiftFormID'],
					(int)$joinRecord['f5'],
					(int)$joinRecord['f6']
				);
			}
		}
		$spell[14] = $spellshapeshift;
		//spellequippeditems
		$spellequippeditems = null;
		if( $record['SpellEquippedItemsID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellequippeditems` WHERE `ID` = ?", array($record['SpellEquippedItemsID']));
			if( $joinRecord ) {
				$spellequippeditems = array(
					(int)$joinRecord['ItemClassID'],
					(int)$joinRecord['InventorySlotMask'],
					(int)$joinRecord['ItemSubClassMask'],
				);
			}
		}
		$spell[15] = $spellequippeditems;
		$spell[16] = array(
			(int)$record['Type0'],
			(int)$record['Type1'],
			(int)$record['Type2'],
			(int)$record['Type3'],
			(int)$record['Type4'],
			(int)$record['Type5'],
			(int)$record['Type6'],
			(int)$record['Type7'],
			(int)$record['Type8'],
			(int)$record['Type9'],
		);
			
		$spell[17] = null;
		if(  $spell_list && $resolve ) {
			$spell[17] = array();
			foreach( $spell_list as $id => $s ) {
				if( $s ) {
					$spell[17][] = $s;
				}
			}
		}
			
		$spellauraoptions = null;
		if( $record['SpellAuraOptionsID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellauraoptions` WHERE `ID` = ?", array($record['SpellAuraOptionsID']));
			if( $joinRecord ) {
				$spellauraoptions = array(
					(int)$joinRecord['Stacks'],
					(int)$joinRecord['ProcRate'],
					(int)$joinRecord['ProcCharges'],
				);
			}
		}
		$spell[18] = $spellauraoptions;
			
		$classoptions = null;
			
		if( $record['SpellClassOptionsID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spellclassoptions` WHERE `ID` = ?", array($record['SpellClassOptionsID']));
			if( $joinRecord ) {
				$classoptions = array(
					(int)$joinRecord['SpellClassID']
				);
			}
		}
		$spell[19] = $classoptions;
			
		$spell[20] = (int)$chardev_spellinfo['ElixirMask'];
			
		$spellLevels = null;
		if( $record['SpellLevelsID'] ) {
			$joinRecord = DatabaseHelper::fetchOne($db, "SELECT * FROM `spelllevels` WHERE `ID` = ?", array($record['SpellLevelsID']));
			if( $joinRecord ) {
				$spellLevels = array(
					(int)$joinRecord['BaseLevel'],
					(int)$joinRecord['MaximumLevel'],
					(int)$joinRecord['SpellLevel']
				);
			}
		}
        $spell[21] = $spellLevels;
        
		return $spell;
	} 
	
	public static function getIcon( $spellIconId ) {
		$spellIconId = (int) $spellIconId;
		if( $spellIconId < 1 ) {
			return null;
		}
		
		$record = DatabaseHelper::fetchOne(Database::getConnection(), "SELECT * FROM `spellicon` WHERE `ID` = ?", array($spellIconId));

		$icon = null;
		if( $record ) {
			$icon = strtolower(str_replace(' ','',str_ireplace('interface\\icons\\','',$record['Icon'])));
		}
		return $icon;
	}
}

?>