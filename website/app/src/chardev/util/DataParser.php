<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Martin Waßmann
 * Date: 17.02.13
 * Time: 13:09
 * To change this template use File | Settings | File Templates.
 */

namespace chardev\util;


use chardev\backend\Database;
use chardev\backend\DatabaseHelper;

class DataParser
{

    private static $base_regen = array(0.020979, 0.020515, 0.020079, 0.019516, 0.018997, 0.018646, 0.018314, 0.017997, 0.017584, 0.017197, 0.016551, 0.015729, 0.015229, 0.01458, 0.014008, 0.01365, 0.013175, 0.012832, 0.012475, 0.012073, 0.01184, 0.011494, 0.011292, 0.01099, 0.010761, 0.010546, 0.010321, 0.010151, 0.009949, 0.00974, 0.009597, 0.009425, 0.009278, 0.009123, 0.008974, 0.008847, 0.008698, 0.008581, 0.008457, 0.008338, 0.008235, 0.008113, 0.008018, 0.007906, 0.007798, 0.007713, 0.007612, 0.007524, 0.00743, 0.00734, 0.007268, 0.007184, 0.007116, 0.007029, 0.006945, 0.006884, 0.006805, 0.006747, 0.006667, 0.0066, 0.006421, 0.006314, 0.006175, 0.006072, 0.005981, 0.005885, 0.005791, 0.005732, 0.005668, 0.005596, 0.005316, 0.005049, 0.004796, 0.004555, 0.004327, 0.00411, 0.003903, 0.003708, 0.003522, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345, 0.003345);

    private static $RACE_ATTRIBUTES = [
    0 => [0, 0, 0, 0, 0],
    1 => [20, 20, 20, 20, 20],
    2 => [23, 17, 21, 17, 22],
    3 => [25, 16, 21, 19, 19],
    4 => [16, 24, 20, 20, 20],
    5 => [19, 18, 20, 18, 25],
    6 => [25, 16, 21, 16, 22],
    7 => [15, 22, 20, 23, 20],
    8 => [21, 22, 21, 16, 21],
    9 => [17, 22, 20, 23, 18],
    10 => [17, 22, 20, 23, 18], //10 =>[17,22,20,23,18],
    11 => [21, 17, 20, 20, 22],
    22 => [23, 22, 20, 16, 19],
    25 => [20, 18, 21, 19, 22],
    26 => [20, 18, 21, 19, 22]
    ];

    private static $BASE_DODGE = [0, 3.0022, 3.0025, 3.4546, 8.95459, 3.0018,3.0083, 3.06907, 3.0019, 3.0019, 3.11565, 3.09567];

    //        /** @const */ var MP5_PER_SPIRIT = [0, 0.225754, 0, 0, 0.225754, 0, 0.225754, 0.0564384, 0, 0.225754, 0.225754];

    private static $DIMINISHING_K = [0,0.9560, 0.9560, 0.9880, 0.9880, 0.9530, 0.9560, 0.9880, 0.9530, 0.9530, 0.885, 0.9720];
    private static $DIMINISHING_CP = [0,65.631440, 65.631440, 145.560408, 145.560408, 0, 65.631440, 145.560408, 0, 0, 235.5, 0];
    private static $DIMINISHING_CD = [0,65.631440, 65.631440, 145.560408, 145.560408, 150.375940, 65.631440, 145.560408, 150.375940, 150.375940, 65.631440, 116.890707];

    public function parseProfiles()
    {

        DatabaseHelper::execute(Database::getConnection(), "TRUNCATE TABLE chardev_mop_static.chardev_data_stats");

        $chunkSize = 100;
        $chunk = 0;
        do {
            $n = 0;
            $stmt = DatabaseHelper::query(Database::getConnection(), "SELECT * FROM chardev_mop_static.chardev_data_bnet_profiles LIMIT " . ($chunk * $chunkSize) . ", $chunkSize");

            while (true) {
                $record = $stmt->fetch(\PDO::FETCH_ASSOC);
                if ($record === false) {
                    break;
                }
                $n++;

                $this->parseProfile( $record['url'], $record["race"], $record["class"], $record["level"], $record["xml"] );
            }

            if( $n == 0 ) {
                break;
            }

            $chunk ++;

            $stmt->closeCursor();

        } while (true);
    }

    public function parseProfile( $uri, $race, $class, $level, $xmlStr ) {

        preg_match('/Last updated on (\d\d)\/(\d\d)\/(\d\d\d\d)/', $xmlStr, $match);
        if ($match) {
            $time = strtotime($match[2] . "/" . $match[1] . "/" . $match[3]);
            if ($time < time() - 180 * 86400 ) {
                    DatabaseHelper::execute(Database::getConnection(),
                        "DELETE FROM chardev_mop_static.chardev_data_bnet_profiles WHERE url LIKE ?",
                        array($uri));
                echo "Profile is outdated (" . date(DATE_ISO8601, $time) . "): deleting\n";
                return;
            }

            if ($time < time() - 60 * 86400 ) {
                echo "Profile is outdated (" . date(DATE_ISO8601, $time) . "): skipping\n";
                return;
            }
        }

        preg_match('/new Summary\.Stats\(\{([^\}]*?)\}/m', $xmlStr, $match);

        $arr = json_decode("{{$match[1]}}");

        if( $arr === null ) {
            $arr = json_decode("{".str_replace("\\'","'", $match[1])."}");
        }

        if( $arr === null ) {
            echo "Unable to parse json: skipping\n";
            return;
        }

        echo $uri . "\n";

        $baseStr = $arr->strBase;
        $totalStr = $arr->strTotal;
        $baseAgi = $arr->agiBase;
        $totalAgi = $arr->agiTotal;
        $baseSta = $arr->staBase;
        $totalSta = $arr->staTotal;
        $baseInt = $arr->intBase;
        $totalInt = $arr->intTotal;
        $baseSpr = $arr->sprBase;
        $totalSpr = $arr->sprTotal;

        //    [manaRegenPerFive] => 66
        //    [manaRegenCombat] => 8

        $str = $baseStr - self::$RACE_ATTRIBUTES[$race][0];
        $agi = $baseAgi - self::$RACE_ATTRIBUTES[$race][1];
        $sta = $baseSta - self::$RACE_ATTRIBUTES[$race][2];
        $int = $baseInt - self::$RACE_ATTRIBUTES[$race][3];
        $spr = $baseSpr - self::$RACE_ATTRIBUTES[$race][4];

//        $hp = $arr->health - ( $level < 80 ? 10 : 10 + ($level - 80) * 0.8 )  * max( 0, $totalSta - 20 ) + ( $totalSta >= 20 ? 20 : $totalSta );
        $hp = $arr->health - $arr->sta_hp;


        if ($race == 6) {
            $hp = ceil($hp / 1.05);
        }

        //	echo "$str $agi $sta $int $spr \n";
        //
        //	echo $baseStr." ".$totalStr."\n";
        //	echo $baseAgi." ".$totalAgi."\n";
        //	echo $baseSta." ".$totalSta."\n";
        //	echo $baseInt." ".$totalInt."\n";
        //	echo $baseSpr." ".$totalSpr."\n";

        $dodge = $arr->dodge;
        $dodgeFromRating = $arr->dodgeRatingPercent;

        $baseHp = $hp;

        $agiw = $baseAgi;
        $agig = $totalAgi - $baseAgi;
        $addDodge = $dodge - self::$BASE_DODGE[$class];
        $k = self::$DIMINISHING_K[$class];
        $c = self::$DIMINISHING_CD[$class];

        //echo "$agiw $agig $addDodge $k $c \n";

        if ($agig > 0) {
            $dodgePerAgi = (1 / (2 * $agig * $agiw)) * ($addDodge * $agig - $agig * $c - $agiw *
                $dodgeFromRating - $agiw * $c * $k + sqrt(4 * $agig * $agiw * (-$c *
                $dodgeFromRating + $addDodge * ($dodgeFromRating + $c * $k)) +
                pow(-$addDodge * $agig + $agig * $c + $agiw * ($dodgeFromRating + $c * $k), 2)));
        } else {
            //echo "($addDodge - ($c * $dodgeFromRating)/($dodgeFromRating + $c * $k))/$agiw;\n";

            $dodgePerAgi = ($addDodge - ($c * $dodgeFromRating) / ($dodgeFromRating + $c * $k)) / $agiw;
        }

        //echo $dodgePerAgi."\n";

        $baseMp = 0;
        $baseSp5 = 0;
        if ($arr->powerTypeId == 0) {

            $sp5 = $arr->manaRegenPerFive;
            $baseMp = $arr->power;
            $baseSp5 = $sp5 - floor(5 * (0.001 + sqrt($totalInt) * ($totalSpr) * self::$base_regen[$level - 1]));
        }

        DatabaseHelper::execute(
            Database::getConnection(),
            "INSERT INTO chardev_mop_static.chardev_data_stats VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            array(
                $uri,
                $class,
                $level,
                $str,
                $agi,
                $sta,
                $int,
                $spr,
                $baseHp,
                $baseSp5,
                $baseMp,
                $dodge,
                0,
                0,
                $dodgeFromRating,
                $totalAgi,
                $baseAgi,
                ($totalAgi - $baseAgi),
                $dodgePerAgi
            )
        );
    }

    public function parseItemSource() {
        $db = Database::getConnection();
        $stmt = DatabaseHelper::query($db, "SELECT * FROM chardev_mop_static.`wowapi_items`");


        while( false !== ($record = $stmt->fetch())) {
            $item = json_decode($record["Json"]);

            if( isset($item->itemSource)) {
                $type = 0;
                switch( $item->itemSource->sourceType ) {
                    case "CREATURE_DROP": $type = 1; break;
                    case "PROVIDED_FOR_QUEST": $type = 2; break;
                    case "REWARD_FOR_QUEST": $type = 3; break;
                    case "GAME_OBJECT_DROP": $type = 4; break;
                    case "ACHIEVEMENT_REWARD": $type = 5; break;
                    case "CREATED_BY_SPELL": $type = 6; break;
                    case "VENDOR": $type = 7; break;
                    case "WORLD_DROP": $type = 8; break;
                    case "FACTION_REWARD": $type = 9; break;
                    case "PROMOTION": $type = 10; break;
                    case "EVENT": $type = 11; break;
                    case "PROFESSION": $type = 12; break;
                    case "CONTAINED_IN_ITEM": $type = 13; break;
                    case "NONE": break;
                    default:
                        throw new \Exception("Unhandled item source {$item->itemSource->sourceType}");
                }

                if( $type ) {
                    DatabaseHelper::execute($db,
                        "REPLACE INTO chardev_mop_static.`chardev_item_source` VALUES (?,?,?)",
                        array( $item->id, $type, isset($item->itemSource->sourceId) ? $item->itemSource->sourceId : 0 ));
                }
            }
        }
    }

    public function parseQuests() {
        $db = Database::getConnection();
        $stmt = DatabaseHelper::query($db, "SELECT * FROM chardev_mop_static.`wowapi_quests`");

        while( false !== ($record = $stmt->fetch())) {
            $quest = json_decode($record["Json"]);

            if( ! isset($quest->category)) {
                $quest->category = "";
            }

            DatabaseHelper::execute($db,
                "REPLACE INTO chardev_mop_static.`chardev_quest` VALUES (?,?,?,?,?,?)",
                array( $quest->id, $quest->title, $quest->reqLevel, $quest->level, $quest->category, $quest->suggestedPartyMembers));
        }
    }
}