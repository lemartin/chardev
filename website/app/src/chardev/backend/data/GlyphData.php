<?php

namespace chardev\backend\data;

use chardev\backend\DoesNotExistException;
use chardev\backend\Database;
use chardev\backend\DatabaseHelper;

class GlyphData extends Data {
	
	private static $instance = null;
	
	/**
	 *	@return GlyphData
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new GlyphData(/*args*/);
		}
		return self::$instance;
	}
	
	protected function __construct(/*args*/) {
		// TODO: Auto-generated stub
	}
	
	protected function getData( $id ) {
		$record = DatabaseHelper::fetchOne(Database::getConnection(),
				"SELECT
				gp.`ID`,
				gp.`Type`,
				gp.`SpellID`,
				i.`ID` as ItemID
				FROM `glyphproperties` gp
				LEFT JOIN `spelleffect` se ON gp.`ID` = se.`SecondaryEffect` AND se.`Aura` = '74'
				LEFT JOIN `item_sparse` i ON i.`SpellID2` = se.`SpellID`
				WHERE gp.`ID`=?",
				array((int)$id)
		);
		
		if( $record ) {
			return array(
					(int)$record['ID'],
					(int)$record['Type'],
					SpellData::getInstance()->fromId((int)$record['SpellID']),
					(int)$record['ItemID']
			);
		}
		else {
			throw new DoesNotExistException("Glyph {$id}");
		}
	}
}