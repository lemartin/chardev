<?php

namespace chardev\util;

use chardev\backend\Database;
use chardev\backend\DatabaseHelper;
use chardev\profiles\CommunityPlatformClient;

class DataRetriever
{
    /**
     * @var CommunityPlatformClient
     */
    protected $cpc;

    private static $race_name_to_id = array(
        "human" => 1,
        "orc" => 2,
        "dwarf" => 3,
        "night elf" => 4,
        "undead" => 5,
        "tauren" => 6,
        "gnome" => 7,
        "troll" => 8,
        "goblin" => 9,
        "blood elf" => 10,
        "draenei" => 11,
        "worgen" => 22,
        "pandaren" => array(25, 26)
    );

    private static $class_name_to_id = array(
        "warrior" => 1,
        "paladin" => 2,
        "hunter" => 3,
        "rogue" => 4,
        "priest" => 5,
        "death knight" => 6,
        "shaman" => 7,
        "mage" => 8,
        "warlock" => 9,
        "druid" => 11,
        "monk" => 10
    );

    public function setCpc( CommunityPlatformClient $cpc ) {
        $this->cpc = $cpc;
    }

    public function retrieveItems($min = 0, $max = PHP_INT_MAX)
    {
        //
        // get item ids
        $stmt = DatabaseHelper::query(Database::getConnection(),
            "SELECT ID FROM chardev_mop.item WHERE ID >= ? AND ID <= ? ORDER BY ID DESC",
            array($min, $max));

        $insertStmt = Database::getConnection()->prepare(
            "REPLACE INTO chardev_mop_static.wowapi_items VALUES (?,?,?)");

        while (true) {
            $record = $stmt->fetch(\PDO::FETCH_ASSOC);
            if ($record === false) {
                break;
            }

            $id = (int)$record["ID"];

            $retry = 0;
            do {
                $itm = $this->cpc->getItem($id);
            } while (!$itm && ++$retry < 3);
            $insertStmt->bindValue(1, $id);
            $insertStmt->bindValue(2, $itm);
            $insertStmt->bindValue(3, time());
            $insertStmt->execute();

            echo $id . "\n";
        }
    }

    public function retrieveProfiles(array $names)
    {
        $base = "http://eu.battle.net";

        foreach ($names as $name) {
            $page = 1;
            $next = false;

            echo "Search for: $name\n";
            do {
                echo "Page $page\n";
                $query = "{$base}/wow/en/search?q={$name}&f=wowcharacter&page={$page}";

                $contents = file_get_contents($query);

                if (preg_match("/data-pagenum=\"" . ($page + 1) . "\"/", $contents)) {
                    $next = true;
                } else {
                    $next = false;
                }

                preg_match_all('/<td[^>]*>\s*<a[^>]*href="(\/wow\/en\/character\/.*?)"[^>]*>(?:.|\s)*?<td[^>]*>\s*(\d+)\s*<\/td[^>]*>/', $contents, $matches);

                if (!$matches) {
                    break;
                }

                $chars = count($matches[1]);
                echo "Found $chars profiles\n";

                for ($i = 0; $i < $chars; $i++) {
                    if (((int)$matches[2][$i]) < 10) {
                        $next = false;
                        break;
                    }

                    $url = $base . $matches[1][$i];
                    echo "#$i: $url\n";
                    try {
                        $this->retrieveProfile($url, $name);
                    }
                    catch ( \Exception $e ) {
                        echo "Failed to retrieve profile $name from $url:\n";
                        echo $e->getTraceAsString() . "\n";
                    }
                }

                $page++;
            } while ($next);
        }
    }

    public function retrieveProfile($url, $name)
    {
        $old = error_reporting(1);
        $content = file_get_contents($url . 'simple');
        error_reporting($old);

        if (!$content) {
            echo "no content\n";
            return;
        }
        if (preg_match('/Character Not Available/', $content)) {
            echo "character not available\n";
            return;
        }

        $xml = simplexml_load_string($content);
        if (!$xml) {
            echo "invalid xml\n";
            return;
        }

        $race = $xml->xpath('//*[@class="race"]');
        $race = (string)$race[0];
        $race = self::$race_name_to_id[strtolower($race)];
        //
        // 2 races for pandaren
        if( is_array($race)) {
            if($xml->xpath('//*[@class="profile-wrapper profile-wrapper-horde"]')) {
                $race = $race[1];
            }
            else {
                $race = $race[0];
            }
        }
        //		class
        $class = $xml->xpath('//*[@class="class"]');
        $class = (string)$class[0];
        $class = self::$class_name_to_id[strtolower($class)];
        //		level
        $level = $xml->xpath('//*[@class="level"]');
        $level = $level[0]->strong;

        echo "Retrieved $name ({$race},{$class},{$level})\n";

        DatabaseHelper::execute(Database::getConnection(),
            "REPLACE INTO chardev_mop_static.chardev_data_bnet_profiles VALUES (?,?,?,?,?,?)",
            array($name, $url, $race, $class, $level, $content));
    }

    public function retrieveItemHtml( $id, $tab = null ){
        $contents = @file_get_contents("http://eu.battle.net/wow/en/item/" . $id . ( $tab ? "/$tab" : ""));

        if (!$contents) {
            return null;
        }

        $xml = simplexml_load_string($contents);
        if (!$xml) {
            return null;
        }

        return $xml;
    }

    public function retrieveItemRandomProperties() {

        $db = Database::getConnection();

        DatabaseHelper::execute( $db,
            "TRUNCATE TABLE chardev_mop_static.`chardev_random_properties`");

        $randomPropertiesStmt = DatabaseHelper::query( $db,
            "SELECT DISTINCT(RandomPropertiesID) FROM chardev_mop.`item_sparse` WHERE RandomPropertiesID > 0");

        while( false !== ($randomPropRecord = $randomPropertiesStmt->fetch())) {
            $itemStmt = DatabaseHelper::query( $db,
                "SELECT Name, ID FROM chardev_mop.`item_sparse` WHERE RandomPropertiesID = ?",
                array($randomPropRecord["RandomPropertiesID"]));

            while( false !== ($itemRecord = $itemStmt->fetch())) {
                $xml = $this->retrieveItemHtml($itemRecord["ID"], "randomProperties");

                if (!$xml) {
                    continue;
                }


                $trs = $xml->div[2]->table->tbody->tr;

                echo "Item: {$itemRecord["Name"]}\n";
                for ($h = 0; $h < count($trs); $h++) {
                    if( isset($trs[$h]->attributes()->class)
                        && (string)$trs[$h]->attributes()->class[0] === "no-results"
                    ) {
                        continue;
                    }

                    $name = trim( (string)$trs[$h]->td[0]->strong[0], ".");
                    $desc = preg_replace('/\n|\t/', '', $trs[$h]->td[1]);

//                    echo "$name - $desc\n";

                    $propStmt = DatabaseHelper::query($db,
                        "SELECT * FROM chardev_mop.ItemRandomProperties WHERE `Name` like ?", array($name));

                    $m = 0;
                    while ( false !== ( $propResult = $propStmt->fetch())) {
                        //echo $pos_props_record['ID']."\n";

                        $n = 0;
                        $es = array();

                        for (; $n < 5; $n++) {
                            if ($propResult['SpellItemEnchantmentID' . ($n + 1)]) {
                                $enchantRecord = DatabaseHelper::fetchOne($db,
                                    "SELECT * FROM chardev_mop.SpellItemEnchantment WHERE ID=? ORDER BY `ID` DESC",
                                    array($propResult['SpellItemEnchantmentID' . ($n + 1)]));

                                if ($enchantRecord) {
                                    $enchantDesc = $enchantRecord['Description'];
                                    $enchantDesc = preg_replace('/\$k1/', $enchantRecord["Value1"],$enchantDesc);
                                    $enchantDesc = preg_replace('/\$k2/', $enchantRecord["Value2"],$enchantDesc);
                                    $enchantDesc = preg_replace('/\$k3/', $enchantRecord["Value3"],$enchantDesc);
                                    $es[] = $enchantDesc;
                                }
                            }
                        }

                        $exp_desc = explode(', ', $desc);
                        $imp_desc = implode(', ', $es);

                        //echo $desc."\n";
                        //echo "->".$imp_desc."\n";

                        if (count($exp_desc) != count($es)) {
                            continue;
                        }

                        $matches = 0;

                        for ($i = 0; $i < count($exp_desc); $i++) {
                            for ($j = 0; $j < count($exp_desc); $j++) {
                                //echo $exp_desc[$i].",".$es[$j]."=".( strcmp($exp_desc[$i],$es[$j]) === 0 )."\n";
                                if (strcmp($exp_desc[$i], $es[$j]) === 0) {
                                    $matches++;
                                } else {
                                    $t = preg_replace('/Power/i', 'Damage', $exp_desc[$i]);
                                    //echo $t."\n";
                                    if (strcmp($t, $es[$j]) === 0) {
                                        $matches++;
                                        continue;
                                    }
                                    $t = preg_replace('/Mana Regeneration/', 'mana every 5 sec.', $exp_desc[$i]);
                                    //echo $t."\n";
                                    if (strcmp($t, $es[$j]) === 0) {
                                        $matches++;
                                        continue;
                                    }
                                    $t = preg_replace('/Health Regen/', 'health every 5 sec.', $exp_desc[$i]);
                                    //echo $t."\n";
                                    if (strcmp($t, $es[$j]) === 0) {
                                        $matches++;
                                        continue;
                                    }
                                }
                            }
                        }

                        if ($matches == count($exp_desc)) {

//                            echo "Found match for " . $desc . " -> " . $imp_desc . "\n";
                            DatabaseHelper::query($db,
                                "REPLACE INTO chardev_mop_static.`chardev_random_properties` VALUES (?,?)",
                                array( $randomPropRecord['RandomPropertiesID'], $propResult['ID'] ));
                            $m = 1;
                            break;
                        }
                    }
                    if (!$m) {
                        echo "###no match for (item {$itemRecord["ID"]}, prop {$randomPropRecord['RandomPropertiesID']}) " . $name . " " . $desc . "\n";
                    }

                    $propStmt->closeCursor();
                }
            }

            $itemStmt->closeCursor();
        }

        $randomPropertiesStmt->closeCursor();
    }

    public function retrieveQuests( $min = 0, $max = 32052 ) {
        for( $i=$min; $i<$max; $i++ ) {
            $this->retrieveQuest($i);
        }
    }

    public function retrieveQuest( $questId ) {
        $quest = $this->cpc->getQuest($questId);

        if( ! $quest ) {
            return;
        }

        echo $questId . "\n";

        DatabaseHelper::execute(
            Database::getConnection(),
            "REPLACE INTO chardev_mop_static.`wowapi_quests` VALUES (?,?)",
            array( $questId, $quest ));
    }
}