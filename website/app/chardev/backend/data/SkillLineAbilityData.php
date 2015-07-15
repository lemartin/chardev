<?php
namespace chardev\backend\data;

use chardev\backend\Constants;
use chardev\backend\Database;
use chardev\backend\DatabaseHelper;
use chardev\backend\DoesNotExistException;

class SkillLineAbilityData
{
	protected static $instance = null;
	/**
	 *	@return SkillLineAbility
	 */
	public static function getInstance() 
	{
		if( self::$instance == null ) {
			self::$instance = new SkillLineAbilityData( /*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct( /*args*/) {}
	
	protected function fromRecord( $record ) {
		return array(
			(int)$record['ID'],
			SpellData::getInstance()->fromId($record['SpellID']),
			(int)$record['RaceMask'],
			(int)$record['ClassMask'],
			(int)$record['RequiredSkill'],
			(int)$record['ReplaceSpellID']
		);
	}
	
	public function fromSkillLineId( $id ) {
		$stmt = Database::getConnection()->prepare("SELECT * FROM `skilllineability` WHERE `SkillLineID` = ?");
		$stmt->execute(array($id));
		DatabaseHelper::testStatement($stmt);
		
		$skills = array();
		while( false !==( $record = $stmt->fetch())) {
			$skills[] = $this->fromRecord($record);
		}
		return $skills;
	} 
	
}

?>