<?php
namespace chardev\backend\data;

use chardev\backend\DatabaseHelper;

use chardev\backend\Database;

use chardev\backend\DoubleCache;

use chardev\backend\Identifiable;

use chardev\backend\JSONSerializable;

class TalentsData extends Data
{
	protected static $instance = null;
	
	/**
	 * @return TalentsData		
	 */
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new TalentsData( /*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct( /*args*/) {}
	
	protected function getData($id) {
		$db = Database::getConnection();
		$stmt = DatabaseHelper::query( $db, "SELECT * FROM `talenttab` WHERE `ClassMask`=? ORDER BY `Index` asc", array(1 << ((int)$id - 1)));
		
		$talents = array();
		$treeIndex = 1;
		while( false !== ( $record = $stmt->fetch())) {
			$talents[0] = $id;
			$talents[$treeIndex] = array();
			$talents[$treeIndex][0] = $record['Name'];
			$talents[$treeIndex][1] = $record['Description'];
			$talents[$treeIndex][2] = SpellData::getInstance()->getIcon($record['SpellIconID']);
			$talents[$treeIndex][3] = array();
				
			$talentIndex = 0;
			$done = array();
			
			$talentStmt = DatabaseHelper::query( $db, "SELECT * FROM `talent` WHERE `TalentTabID` = ? ORDER BY `Row` asc, `Col` asc, `ID` desc",  array($record['ID']));
				
			while( false !== ( $talentRecord = $talentStmt->fetch())) {
				//
				// eliminate obsolete but still existing talents
				// they could overwrite the correct talent elsewise
				// and cause quite some problems due to non existant
				// spells
				$row = (int)$talentRecord['Row'];
				$col = (int)$talentRecord['Col'];
				if( isset($done[$row]) ) {
					if( isset($done[$row][$col]) ) {
						continue;
					}
					else {
						$done[$row][$col] = true;
					}
				}
				else {
					$done[$row] = array();
					$done[$row][$col] = true;
				}
					
				$talents[$treeIndex][3][$talentIndex] = array(
					(int)$talentRecord['ID'],
					$row,
					$col,
					array(
						SpellData::getInstance()->fromId($talentRecord['SpellID1']),
						SpellData::getInstance()->fromId($talentRecord['SpellID2']),
						SpellData::getInstance()->fromId($talentRecord['SpellID3']),
						SpellData::getInstance()->fromId($talentRecord['SpellID4']),
						SpellData::getInstance()->fromId($talentRecord['SpellID5'])
					),
					array (
						(int)$talentRecord['RequiredTalentID1'],
						(int)$talentRecord['RequiredTalentID2'],
						(int)$talentRecord['RequiredTalentID3']
					),
					array(
						(int)$talentRecord['PetMask0'],
						(int)$talentRecord['PetMask1']
					)
				);
				$talentIndex++;
			}
			$talents[$treeIndex][4] = array(
				SpellData::getInstance()->fromId($record['MasterySpellID1']),
				SpellData::getInstance()->fromId($record['MasterySpellID2'])
			);
			
			$spellsStmt = DatabaseHelper::query($db,"SELECT `SpellID` FROM `talenttreeprimaryspells` tps WHERE `TalentTabID` = ?",array($record['ID']));
			
			$talents[$treeIndex][5] = array();
			while( false !== ($spellRecord = $spellsStmt->fetch())) {
				$talents[$treeIndex][5][] = SpellData::getInstance()->fromId($spellRecord['SpellID']);
			}
				
			$treeIndex++;
		}
		
		return $talents;
	}
}

?>