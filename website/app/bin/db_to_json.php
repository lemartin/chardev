<?php
mysql_connect("localhost", "root", "");

$stmt = mysql_query(
    "SELECT * FROM chardev_mop.`gtCombatRatings`"
);
$arr = array();
while ($record = mysql_fetch_assoc($stmt)) {
    $i = (int)$record['ID'];
    $c = floor($i / 100);
    if ($i % 100 == $i / 100) {
        $arr[$c] = array();
    }
    $arr[$c][$i - $c * 100] = (float)$record['Value'];
}
echo "var COMBAT_RATINGS = " . json_encode($arr) . ";\n";
//
// BASE MP
//
$stmt = mysql_query("SELECT * FROM chardev_mop.`gtoctbasempbyclass`");
$arr = array();
while ($record = mysql_fetch_assoc($stmt)) {
    $i = (int)$record['ID'];
    $c = floor($i / 100);
    if ($i % 100 == $i / 100) {
        $arr[$c] = array();
    }
    $arr[$c][$i - $c * 100] = (float)$record['BaseMp'];
}
echo "var BASE_MP = " . json_encode($arr) . ";\n";
//
// BASE HP
//
$stmt = mysql_query("SELECT * FROM chardev_mop.`gtoctbasehpbyclass`");
$arr = array();
while ($record = mysql_fetch_assoc($stmt)) {
    $i = (int)$record['ID'];
    $c = floor($i / 100);
    if ($i % 100 == $i / 100) {
        $arr[$c] = array();
    }
    $arr[$c][$i - $c * 100] = (float)$record['BaseHp'];
}
echo "var BASE_HP = " . json_encode($arr) . ";\n";
//
// MELEE CRIT
//
$stmt = mysql_query("SELECT * FROM chardev_mop.`gtchancetomeleecrit`");
$arr = array();
while ($record = mysql_fetch_assoc($stmt)) {
    $i = (int)$record['ID'];
    $c = floor($i / 100);
    if ($i % 100 == $i / 100) {
        $arr[$c] = array();
    }
    $arr[$c][$i - $c * 100] = (float)$record['Chance'];
}
echo "var AGI_TO_MELEE_CRIT_CONVERSION = " . json_encode($arr) . ";\n";
//
// Spell CRIT
//
$stmt = mysql_query("SELECT * FROM chardev_mop.`gtchancetospellcrit`");
$arr = array();
while ($record = mysql_fetch_assoc($stmt)) {
    $i = (int)$record['ID'];
    $c = floor($i / 100);
    if ($i % 100 == $i / 100) {
        $arr[$c] = array();
    }
    $arr[$c][$i - $c * 100] = (float)$record['Chance'];
}
echo "var INT_TO_MELEE_CRIT_CONVERSION = " . json_encode($arr) . ";\n";
//
// Base Regeneration
//
$stmt = mysql_query(
    "SELECT * FROM chardev_mop.`gtregenmpperspt` WHERE `ID` >= 100 AND  `ID` < 200"
);
$arr = array();
while ($record = mysql_fetch_assoc($stmt)) {
    $i = (int)$record['ID'] - 100;
    $arr[$i] = (float)$record['Value'];
}
echo "var BASE_REGEN = " . json_encode($arr) . ";\n";
//
//
//
 	$stmt = mysql_query(
 		"SELECT * FROM chardev_mop.`scalingstatvalues`"
 	);

 	$arr = array();
 	while( $record = mysql_fetch_assoc($stmt)) {
 		$arr[(int)$record['level']] = array();
 		for($i=0;$i<45;$i++){
 			$arr[(int)$record['level']][] = (int)$record['dist'.$i];
 		}
 	}

 	echo "var SCALING_STAT_VALUE = ".json_encode($arr).";\n";
// 	echo "var SPELL_SCALING=".json_encode(get_gt_spell_scaling()).";\n";
// 	echo "var SERIALIZED_PROFESSIONS = ".json_encode(get_professions()).";<br />";


use chardev\backend\Database;
use chardev\backend\DatabaseHelper;
use chardev\backend\data\SkillLineAbilityData;
use chardev\backend\data\SkillLineData;

require __DIR__ . '/../bootstrap.php';

$records = DatabaseHelper::fetchMany(Database::getConnection(), "SELECT * FROM chardev_mop.`skillline` WHERE `Category` = '11'");

$spellIds = array(
    182 => array(81708, 55428, 55480, 55500, 55501, 55502, 55503, 74497, 121279), // Lifebloom
    186 => array(53120, 53121, 53122, 53123, 53124, 53040, 74496, 102163),
    393 => array(53125, 53662, 53663, 53664, 53665, 53666, 74495, 102219)
);

$professions = array();
foreach ($records as $record) {
    $r[0] = SkillLineData::getInstance()->fromId($record["ID"]);
    $r[1] = array();

    if (isset($spellIds[$record["ID"]])) {
        foreach ($spellIds[$record["ID"]] as $spellId) {
            $r[1][] = SkillLineAbilityData::getInstance()->fromSpellId($spellId);
        }
    }

    $professions[$record["ID"]] = $r;
}

echo "var SERIALIZED_PROFESSIONS=" . json_encode($professions) . ";\n";

$itemClassRecords = DatabaseHelper::fetchMany(Database::getConnection(), "SELECT isc.`ItemClass`, isc.`ItemSubClass`, ic.`Name` as ItemClassName, isc.`Name` as ItemSubClassName FROM chardev_mop.`itemsubclass` isc INNER JOIN chardev_mop.`itemclass` ic ON isc.`ItemClass` = ic.`ID` ORDER BY `ItemClass`, `ItemSubClass`");

$itemClassNames = array();
foreach( $itemClassRecords as $itemClassRecord ) {
    $itemClass = (int) $itemClassRecord["ItemClass"];
    $itemSubClass = (int) $itemClassRecord["ItemSubClass"];
    $itemClassName = $itemClassRecord["ItemClassName"];
    $itemSubClassName = $itemClassRecord["ItemSubClassName"];
    
    if( ! isset($itemClassNames[$itemClass]) ) {
        $itemClassNames[$itemClass] = array( $itemClassName, array());
    }
    $itemClassNames[$itemClass][1][$itemSubClass] = $itemSubClassName;
}
echo "var ITEM_CLASSES = ".json_encode($itemClassNames).";\n";
