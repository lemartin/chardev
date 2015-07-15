<?php
namespace chardev\backend\data;

use chardev\backend\Constants;
use chardev\backend\DatabaseHelper;
use chardev\backend\Database;
use chardev\backend\data\SpellData;
use chardev\backend\data\SkillLineAbilityData;
use chardev\backend\DoesNotExistException;

class CharacterClassData extends Data
{
	private static $classIdToSkillLineId = array(1=>803, 2=>800, 3=>795, 4=>797, 5=>804, 6=>796, 7=>801, 8=>799, 9=>802, 10=>829, 11=>798); 
	protected static $instance = null;
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new CharacterClassData();
		}
		return self::$instance;
	}
	
	protected function __construct() {
        //
	}

    protected function getData($id)
    {		
		$record = DatabaseHelper::fetchOne(
		        Database::getConnection(), 
		        "SELECT * FROM `chrclasses` WHERE `ID`=?", 
		        array($id)
        );
		
		if( ! $record ) {
			throw new DoesNotExistException("Character class $id");
		}
		
		$db = Database::getConnection();
		$stmt = $db->prepare("SELECT * FROM chardev_mop_static.`chardev_base_stats_class_level` WHERE `class`=?");
		$stmt->execute(array($id));
		DatabaseHelper::testStatement($stmt);
		$baseStats = array();
		while( false !== ( $statRecord = $stmt->fetch())) {
			$baseStats[(int)$statRecord['level']] = array(
				(int)$statRecord['str'],
				(int)$statRecord['agi'],
				(int)$statRecord['sta'],
				(int)$statRecord['int'],
				(int)$statRecord['spi'],
                //
                // override dodgePerAgi all classes but hunter, rogue, shaman, monk and druids
				$id == 3 || $id == 4 || $id == 7 || $id == 10 || $id == 11 ? (float)$statRecord['dodgePerAgi'] : 0.0001,
                //
                // override parryPerStr for shamans, rogues
				$id == 4 || $id == 7 ? 0.0001 : (float)$statRecord['parryPerStr']
			);
		}		
		
		$glyphRecords = DatabaseHelper::fetchMany(
				$db, 
				"SELECT gp.`ID` as `ID` ".
					" FROM `glyphproperties` gp INNER JOIN `spell` s on gp.`SpellID` = s.`ID` INNER JOIN `spellclassoptions` sco ON sco.id = s.spellclassoptionsid".
					" WHERE sco.`SpellClassID`=? ORDER BY gp.`Type` DESC",
				array(Constants::$classIdToSpellClass[$id])
		);
		
		$glyphs = array(array(),array(),array());
		
		$gd = GlyphData::getInstance();
		for( $i=0; $i<count($glyphRecords); $i++ ) {
			$data = $gd->fromId($glyphRecords[$i]['ID']);
			if( ! $data ) {
				continue;
			}
			$glyphs[(int)$data[2]][] = $data;
		}

		$presences = null;
		$shapeforms = null;
		$conditionals = null;
		//	Shapeforms
		//	Id, Shapeform Buff, Passive Spells, Additional Buffs
		//	Self only buffs
		$sd = SpellData::getInstance();
		switch((int)$record['ID']) {
			case Constants::WARRIOR:
				$shapeforms = array(
					array(17,
						array($sd->fromId(2457)),
						array($sd->fromId(21156))),
					array(18,
						array($sd->fromId(71)),
						array($sd->fromId(7376))),
					array(19,
						array($sd->fromId(2458)),
						array($sd->fromId(7381)))
				);
				break;
			case Constants::PALADIN:
				$conditionals = array(
					array($sd->fromId(53655),53671),	// Judgement of the Pure, Rank 1
					array($sd->fromId(53656),53673),	// Judgement of the Pure, Rank 2
					array($sd->fromId(53657),54151),	// Judgement of the Pure, Rank 3
					array($sd->fromId(31842),31842)	// Divine Favor
				);
				break;
			case Constants::PRIEST:
				$shapeforms = array(
					array(28,
						array($sd->fromId(15473),$sd->fromId(49868)),
						array())
				);
				break;
			case Constants::DEATHKNIGHT:
				$presences = array(
					$sd->fromId(48263), 	// Blood Presence
					$sd->fromId(48266), 	// Frost Presence
					$sd->fromId(48265)	// Unholy Presence
				);
				$conditionals = array(
					array($sd->fromId(51271),51271)	// Pillar of Frost
				);
				break;
			case Constants::MAGE:
				$conditionals = array(
					array($sd->fromId(12472),12472) 	// Icy Veins
				);
				break;
			case Constants::DRUID:
				$shapeforms = array(
					array(1,
						array($sd->fromId(768)),
						array($sd->fromId(3025))),
					array(5,
						array($sd->fromId(5487)),
						array($sd->fromId(1178),$sd->fromId(21178))),
					array(31,
						array($sd->fromId(24858),$sd->fromId(24907)),
						array($sd->fromId(24905)))
				);
				$class[9] = array($sd->fromId(24932));
				break;
		}
		
		$classials = SkillLineAbilityData::getInstance()->fromSkillLineId(self::$classIdToSkillLineId[$id]);
		$talents = TalentsData::getInstance()->fromId($id);
		
		$specRecords = DatabaseHelper::fetchMany($db, "SELECT * FROM `chrspecialization` WHERE `ChrClassID` = ? ORDER BY `ID` ASC", array($id));
		$spec = array(null, null, null);
		
		foreach( $specRecords as $specRecord ) {
			$specSpellRecords = DatabaseHelper::fetchMany($db, "SELECT * FROM `specializationspells` WHERE `ChrSpecializationID` = ?", array((int)$specRecord['ID']));
			
			$specSpells = array();
			foreach( $specSpellRecords as $specSpellRecord ) {
				for( $i = 1; $i <= 3; $i++ ) {
					$spell = $sd->fromId($specSpellRecord["SpellID" . $i]);
					if( $spell ) {
						$specSpells[] = $spell;
					}
				}
			}
			
			$spec[(int)$specRecord['Position']] = array(
					(int)$specRecord['ID'],
					$specRecord['Icon'],
					SpellData::getInstance()->fromId((int)$specRecord['SpellID']),
					$specRecord['Name'],
					$specRecord['Description'],
					SpellData::getIcon($specRecord['SpellIconID']),
					$specSpells
			);
		}
		
		return array ( 
			(int)$record["ID"],
			$record["Name"],
			$talents,
			$baseStats,
			$classials,
			$glyphs,
			$shapeforms,
			$presences,
			$conditionals,
			$spec
		);
    }
}
?>