<?php

namespace chardev\backend\data;

use chardev\backend\Constants;
use chardev\backend\Database;
use chardev\backend\DatabaseHelper;
use chardev\backend\DoesNotExistException;
use chardev\Language;

use chardev\backend\entities\Item;

/**
 * This class is used to retrieve ITEM data from database or cache. The data is
 * contained in an array and meant to be used by the javascript logic. It is
 * however possible to wrap the data in an instance of {@link Item} to access
 * properties more conveniently.
 * 
 * @author Martin Waßmann
 */
class ItemData extends Data
{
	
	/**
	 *
	 * @var ItemData
	 */
	protected static $instance = null;
	
	/**
	 * Returns an instance of {@link ItemData}
	 * 
	 * @return ItemData
	 */
	public static function getInstance()
	{
		if (self::$instance == null)
		{
			self::$instance = new ItemData ();
		}
		return self::$instance;
	}
	
	protected function __construct()
	{
	}
	
	/**
	 * (non-PHPdoc)
	 * 
	 * @see chardev\backend\data.Data::getData()
	 */
	protected function getData($id)
	{
		$item = null;
		$db = Database::getConnection ();
		$record = DatabaseHelper::fetchOne ( $db, 
			"SELECT * FROM `item_sparse` s INNER JOIN `item` i ON i.`ID` = s.`ID` LEFT JOIN chardev_mop_static.`chardev_item_stats` cis ON cis.`ItemID` = i.`ID` WHERE s.`ID` = ?", array ($id ) );
		
		if (! $record)
		{
			throw new DoesNotExistException ( "Item $id" );
		}
		
		$langColumnSuffix = Language::getInstance ()->toColumnSuffix ();
		$item = array ();
		$item [0] = ( int ) $record ['ID'];
		$item [1] = ( int ) $record ['Quality'];
		$item [2] = ( int ) $record ['ItemClass'];
		$item [3] = ( int ) $record ['ItemSubClass'];
		$item [4] = ( int ) $record ['InventorySlot'];
		$item [5] = ( int ) $record ['ChrClassMask'];
		$item [6] = ( int ) $record ['Level'];
		$item [7] = ( int ) $record ['RequiredCharacterLevel'];
		$item [8] = ( int ) $record ['RequiredSkillLineID'];
		$item [9] = ( int ) $record ['RequiredSkillLineLevel'];
		$item [10] = ( int ) $record ['RequiredFactionID'];
		$item [11] = ( int ) $record ['RequiredFactionReputation'];
		$item [12] = ( int ) $record ['MaximumStackSize'];
		//
		// Stats
		//
		$item [13] = array ();
		
		for($i = 1; $i <= 10; $i ++)
		{
			if ($record ['Stat' . $i] > 0)
			{
				$item [13] [$i - 1] = array (( int ) $record ['Stat' . $i], ( int ) $record ['StatValue' . $i] );
			} else
			{
				$item [13] [] = null;
			}
		}
		
		$item [14] = ( int ) $record ['Delay'];
		//
		// Spells
		//
		$item [15] = array ();
		
		for($i = 1; $i <= 5; $i ++)
		{
			$item [15] [] = SpellData::getInstance ()->fromId( $record ['SpellID' . $i] );
		}
		
		$item [16] = 0; // (int)$record['Cooldown'];
		$item [17] = ( int ) $record ['Binds'];
		
		if ($record ['Name' . $langColumnSuffix])
		{
			$item [18] = $record ['Name' . $langColumnSuffix];
		} else
		{
			$item [18] = $record ['Name'];
		}
		
		$item [19] = ItemSetData::getInstance ()->fromId( ( int ) $record ['ItemSetID'] );
		//
		// TODO: Fix durability calculation 
		$item [20] = 0; // (int)$record['Durability'];
		$item [21] = array (( int ) $record ['SocketColor1'], ( int ) $record ['SocketColor2'], ( int ) $record ['SocketColor3'] );
		$item [22] = ( int ) $record ['SocketBonusID'] > 0 ? SpellItemEnchantmentData::getInstance ()->fromId( ( int ) $record ['SocketBonusID'] ) : null;
		$item [23] = $this->getIcon ( $record ['ItemDisplayInfoID'] );
		$item [24] = $this->getSubClassName ( ( int ) $record ['ItemClass'], ( int ) $record ['ItemSubClass'] );
		$item [25] = ( int ) $record ['TypeMask'];
		$item [26] = ( int ) $record ['BuyPrice'];
		$item [27] = ( int ) $record ['SellPrice'];
		$item [28] = ( int ) $record ['Armor'];
		$item [29] = ( bool ) ( int ) $record ['Unique'];
		$faction = null;
		
		if ($record ['RequiredFactionID'])
		{
			$faction = FactionData::getInstance ()->fromId( $record ['RequiredFactionID'] );
		}
		
		$item [30] = $faction;
		$item [31] = array ();
		$item [32] = array ();
		$item [33] = array ();
		$item [34] = array ();
		$item [35] = array ();
		
		for($i = 1; $i <= 5; $i ++)
		{
			$item [31] [] = ( int ) $record ['SpellTrigger' . $i];
			$item [32] [] = ( int ) $record ['SpellCharges' . $i];
			$item [33] [] = ( int ) $record ['SpellCooldown' . $i];
			$item [34] [] = ( int ) $record ['SpellCategoryID' . $i];
			$item [35] [] = ( int ) $record ['SpellCategoryCooldown' . $i];
		}
		
		$item [36] = ( int ) $record ['GemPropertiesID'] > 0 ? GemPropertyData::getInstance ()->fromId( $record ['GemPropertiesID'] ) : null;
		$item [37] = $record ['Description' . $langColumnSuffix] ? $record ['Description' . $langColumnSuffix] : $record ['Description'];
		$item [38] = ( float ) $record ['DPS'];
		$item [39] = ( float ) $record ['MinDamage'];
		$item [40] = ( float ) $record ['MaxDamage'];
		$item [41] = null;
		
		if (( int ) $record ['RandomPropertiesID'] > 0)
		{
			$item [41] = array ();
			$stmt = DatabaseHelper::query ( $db, 
				"SELECT * FROM `itemrandomproperties` irp " . "INNER JOIN chardev_mop_static.`chardev_random_properties` crp ON irp.`ID` = crp.`ItemRandomPropertiesID` " . "WHERE crp.`ID`= ?", 
				array ($record ['RandomPropertiesID'] ) );
			while ( false !== ($rpRecord = $stmt->fetch ()) )
			{
				$item [41] [] = array (( int ) $rpRecord ['ItemRandomPropertiesID'], ( string ) $rpRecord ['Name'], 
					SpellItemEnchantmentData::getInstance ()->fromId( $rpRecord ['SpellItemEnchantmentID1'] ), 
					SpellItemEnchantmentData::getInstance ()->fromId( $rpRecord ['SpellItemEnchantmentID2'] ), 
					SpellItemEnchantmentData::getInstance ()->fromId( $rpRecord ['SpellItemEnchantmentID3'] ), 
					SpellItemEnchantmentData::getInstance ()->fromId( $rpRecord ['SpellItemEnchantmentID4'] ), 
					SpellItemEnchantmentData::getInstance ()->fromId( $rpRecord ['SpellItemEnchantmentID5'] )
				);
			}
			$stmt->closeCursor ();
		}
		//
		// Random suffixes
		$item [42] = null;
		if ($record ['RandomSuffixID'] > 0)
		{
			$item [42] = array ();
			//
			// Get available suffixes, as mined from battle.net
			$stmt = DatabaseHelper::query ( $db, "SELECT * FROM chardev_mop_static.`chardev_random_suffix` WHERE `ID` = ?", array ($record ['RandomSuffixID'] ) );
			//
			// Loop through them and retrieve the actual suffix and points from
			// database
			while ( false !== ($csfRecord = $stmt->fetch ()) )
			{
				//
				// Suffix
				$suffixRecord = DatabaseHelper::fetchOne ( $db, "SELECT * FROM chardev_mop.`itemrandomsuffix` WHERE ID = ?", array ($csfRecord ['ItemRandomSuffixID'] ) );
				//
				// Points
				$ptsRecord = DatabaseHelper::fetchOne ( $db, 
					"SELECT PointsQuality{$record['Quality']}Group" . Constants::$slotToRandomPointsGroup [( int ) $record ['InventorySlot']] . " as Points FROM randproppoints WHERE ID = ?", 
					array ($record ['Level'] ) );
				//
				// Write to array [id,name,[points, enchant]...]
				$arr = array ($csfRecord ['ItemRandomSuffixID'], $suffixRecord ['Name'] );
				for($i = 1; $i <= 5; $i ++)
				{
					$data = null;
					if ($suffixRecord ['SpellItemEnchantmentID' . $i] > 0 && null != ($data = SpellItemEnchantmentData::getInstance ()->fromId( ( int ) $suffixRecord ['SpellItemEnchantmentID' . $i])))
					{
						$arr [$i + 1] = array (floor ( ( int ) $ptsRecord ['Points'] * ( int ) $suffixRecord ['Coefficient' . $i] / 10000 ), $data);
					} else
					{
						$arr [$i + 1] = null;
					}
				}
				$item [42] [] = $arr;
			}
			$stmt->closeCursor ();
		}
		
		$item [43] = null;
		if (( int ) $record ['ScalingStatDistributionID'] > 0)
		{
			$scalingRecord = DatabaseHelper::fetchOne ( $db, "SELECT * FROM `scalingstatdistribution` WHERE `ID` = ?", array ($record ['ScalingStatDistributionID'] ) );
			$item [43] = array ();
			for($i = 1; $i <= 10; $i ++)
			{
				$item [43] [$i - 1] = $scalingRecord ['Stat' . $i];
				$item [43] [$i + 9] = $scalingRecord ['Coefficient' . $i];
			}
			$item [43] [20] = $scalingRecord ['MinLevel'];
			$item [43] [21] = $scalingRecord ['MaxLevel'];
		}
		
		$item [44] = ( int ) $record ['TypeMask2'];
		$item [45] = ( float ) $record ['DamageRange'];
		$item [46] = ( float ) $record ['QuestID'];
		$item [47] = ( float ) $record ['LimitCategory'];
		$item [48] = ( float ) $record ['LimitCategoryMultiple'];
		$item [49] = ( float ) $record ['ChrRaceMask'];
        $item [50] = array();

        $ruleSetRecord = DatabaseHelper::fetchOne( $db, "SELECT `ItemUpgradeID` FROM `rulesetitemupgrade` WHERE `ItemID` = ?", array($id));

        if( $ruleSetRecord ) {
            $upgradeRecords = DatabaseHelper::fetchMany( $db,
                "SELECT u1.* FROM `itemupgrade` u1 INNER JOIN `itemupgrade` u2 USING (`GroupID`) WHERE u2.ID = ? AND u1.ItemLevelIncrease > 0 ORDER BY u1.ItemLevelIncrease",
                array($ruleSetRecord["ItemUpgradeID"]));

            foreach( $upgradeRecords as $upgradeRecord ) {
                $item[50][] = (int)$upgradeRecord["ItemLevelIncrease"];
            }
        }

        $item[51] = null;
        $itemNameDescriptionRecord = DatabaseHelper::fetchOne( $db, "SELECT `Description`, `Color` FROM `itemnamedescription` WHERE `ItemID` = ?", array($id));
        if( $itemNameDescriptionRecord ) {
            $color = dechex($itemNameDescriptionRecord["Color"]);
            if( strlen($color) < 6 ) {
                $color = str_pad($color, 6, "0", STR_PAD_LEFT);
            }
            else {
                $color = substr($color,-6);
            }
            $item[51] = array((string)$itemNameDescriptionRecord["Description"], $color);
        }

        $itemSrc = null;
        $itemSrcRecord = DatabaseHelper::fetchOne( $db, "SELECT * FROM chardev_mop_static.`chardev_item_source` WHERE `ItemID` = ?", array($id));
        if( $itemSrcRecord ) {
            $itemSrc = array();
            $itemSrc[0] = (int) $itemSrcRecord["Type"];

            switch( $itemSrcRecord["Type"] ) {
                case 3:
                    $questRecord = DatabaseHelper::fetchOne( $db, "SELECT * FROM chardev_mop_static.`chardev_quest` WHERE `ID` = ?", array($itemSrcRecord["SourceID"]));
                    $itemSrc[1] = array(
                        (int)$questRecord["ID"],
                        $questRecord["Title"],
                        (int)$questRecord["RequiredLevel"],
                        (int)$questRecord["Level"],
                        $questRecord["Category"],
                        (int)$questRecord["SuggestedPartyMembers"],
                    );
                    break;
            }
        }
        $item[52] = $itemSrc;

		return $item;
	}
	
	/**
	 * Returns the icon from ITEMDISPLAYINFO identified by given item display
	 * info ID.
	 * 
	 * @param int $id Item display info ID
	 * @return string|null Path of the icon or null if not found
	 */
	public function getIcon($id)
	{
		$record = DatabaseHelper::fetchOne ( Database::getConnection (), "SELECT * FROM `itemdisplayinfo` WHERE `ID` = ?", array ($id ) );
		
		if ($record)
		{
			return strtolower ( str_replace ( ' ', '', $record ['Icon'] ) );
		}
		
		return null;
	}
	/**
	 * Returns the name of the ITEMSUBCLASS identified by class and sub-class
	 * ID.
	 * 
	 * @param int $classId Item class ID
	 * @param int $subClassId Item sub-class ID
	 * @return string|null Name of the sub-class or null if not found
	 */
	public function getSubClassName($classId, $subClassId)
	{
		$record = DatabaseHelper::fetchOne ( Database::getConnection (), "SELECT * FROM `itemsubclass` WHERE `ItemClass` = ? AND `ItemSubClass` = ?", array ($classId, $subClassId ) );
		
		if ($record)
		{
			return array ($record ['Name'], $record ['NameLong'] );
		}
		return null;
	}
}
?>