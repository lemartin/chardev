<?php
namespace chardev\backend\data;

use chardev\backend\DoesNotExistException;

use chardev\backend\Database;

use chardev\backend\DatabaseHelper;

class CharacterRaceData extends Data
{
	private static $raceToSkillMap = array(1 => 754, 2 => 125, 3 => 101, 4 => 126, 5 => 220, 6 => 124, 7 => 753, 8 => 733, 9 => 790, 10 => 756, 11 => 760, 22 => 789, 25 => 899, 26 => 899);
	protected static $instance = null;
	/**
	 *	@return CharacterRaceData
	 */
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new CharacterRaceData( /*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct( /*args*/) {}
	
	protected function getData($id) {
		
		$race = null;
		$record = DatabaseHelper::fetchOne(Database::getConnection(), "SELECT * FROM `chrraces` WHERE `ID`= ?", array($id));
		
		if( ! $record ) {
			throw new DoesNotExistException("Character race $id");
		}
		
		
		$race = array();
		$race[0] = (int)$record['ID'];
		$race[1] = $record['Name'];
		$race[2] = SkillLineAbilityData::getInstance()->fromSkillLineId(self::$raceToSkillMap[$id]);
		
		return $race;
	}
}

?>