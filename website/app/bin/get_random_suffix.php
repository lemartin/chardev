<?php

require __DIR__ . '/../bootstrap.php';

mysql_connect("localhost", "root", "");
mysql_select_db("chardev_mop_static");

$g_slot_to_rnd_pts_grp = array(
    1 => 0,
    5 => 0,
    20 => 0,
    7 => 0,
    17 => 0,
    3 => 1,
    6 => 1,
    8 => 1,
    10 => 1,
    2 => 2,
    9 => 2,
    11 => 2,
    14 => 2,
    16 => 2,
    23 => 2,
    13 => 3,
    21 => 3,
    22 => 3,
    15 => 4,
    25 => 4,
    26 => 4
);

$db = \chardev\backend\Database::getConnection();

\chardev\backend\DatabaseHelper::execute( $db, "TRUNCATE TABLE chardev_mop_static.`chardev_random_suffix`");

mysql_query("truncate table chardev_mop_static.chardev_random_suffix");
$result = mysql_query("

	");

$stmt = \chardev\backend\DatabaseHelper::query( $db, "SELECT * FROM chardev_mop.item_sparse i".
			"INNER JOIN chardev_mop_static.chardev_item_stats cis ON i.id = cis.itemid" .
			"WHERE donotshow = 0 AND RandomSuffixID ORDER BY id ASC LIMIT 0,10000000000");

$r = new \chardev\util\DataRetriever();

while (true) {
    $record = $stmt->fetch();
    if( ! $record ) {
        break;
    }

    $xml_plain = $r->retrieveItemHtml($record['ID'], "randomProperties");


    try {
        $old = error_reporting(1);
        $xml = simplexml_load_string($xml_plain);
        error_reporting($old);
        if (!$xml) {
            echo "invalid xml\n";
            mysql_query(
                "delete from chardev_mop_static.chardev_data_bnet_item where ItemID =" . $record['ID']
            );
            echo mysql_error();
            continue;
        }
        //print_r($xml);
        $property_parent = $xml->xpath('//*[@id="related-randomProperties"]');
        $property_parent = $property_parent[0];
        //print_r($property_parent); die;
        $trs = $property_parent->div[2]->table->tbody->tr;
        echo "Item: (" . $record['ID'] . ") " . $record['Name'] . "\n";
        for ($h = 0; $h < count($trs); $h++) {

            if ($trs[$h]["class"] == "no-results") {
                continue;
            }

            mb_regex_encoding('UTF-8');
            $name = mb_ereg_replace('…', '', preg_replace('/\.\.\./', '', $trs[$h]->td[0]->strong[0]));
            $desc = preg_replace('/\n|\t/', '', $trs[$h]->td[1]);

            //echo $h.":\n";
            //echo "Name: ".$name."(".$trs[$h]->td[0].")\n";
            //echo "Description: ".$desc."\n";


            $points = mysql_fetch_assoc(mysql_query(
                "SELECT PointsQuality" . $record['Quality'] . "Group" . $GLOBALS['g_slot_to_rnd_pts_grp'][(int)$record['InventorySlot']] . " as Points FROM chardev_mop.randproppoints WHERE ID = " . (int)$record['Level']
            ));
            echo mysql_error();

            preg_match_all("/\D(\d+)\D/", $desc, $matches);

            if (0 == count($matches[1])) {
                echo "Found no vals for " . $name . " on " . $record['Name'] . "(" . $record['ID'] . ")\n";
                continue;
            }

            $suffix_result = mysql_query(
                "select * from chardev_mop.itemrandomsuffix where Name like '" . $name . "'"
            );
            echo mysql_error();

            $av_suffixes = array();

            //echo $name."\n";

            while ($random_suffix = mysql_fetch_assoc($suffix_result)) {
                $av_suffixes[] = $random_suffix;
            }

            if (count($av_suffixes) == 0) {
                echo "Unable to match random suffix " . $name . " with " . $desc . "\n";
                continue;
            } else if (count($av_suffixes) == 1) {

                //echo $random_suffix['ID']."\n";

                mysql_query(
                    "REPLACE INTO chardev_random_suffix VALUES (" . $record['RandomSuffixID'] . "," . $av_suffixes[0]['ID'] . ")"
                );
                echo mysql_error();
            } else {
                $perfect_match = 0;
                $best_match = 0;
                $best_matches = 0;

                for ($i = 0; $i < count($av_suffixes); $i++) {
                    $vals = array();
                    for ($j = 0; $j < 5; $j++) {
                        if ($av_suffixes[$i]['Coefficient' . ($j + 1)] && $av_suffixes[$i]['SpellItemEnchantmentID' . ($j + 1)]) {
                            $vals[] = floor((int)$points['Points'] * (int)$av_suffixes[$i]['Coefficient' . ($j + 1)] / 10000);
                        }
                    }

                    if (count($vals) < count($matches[1])) {
                        echo "Found more vals than in db\n";
                        continue;
                    }

                    //echo $av_suffixes[$i]['ID']."\n";

                    $used_val = array();
                    $matched_val = array();
                    $val_matches = 0;
                    for ($j = 0; $j < count($vals); $j++) {
                        if (isset($used_val[$j])) {
                            continue;
                        }
                        for ($k = 0; $k < count($vals); $k++) {
                            if ($k >= count($matches[1]) || isset($matched_val[$k])) {
                                continue;
                            }
                            if ($vals[$j] == (int)$matches[1][$k]) {
                                //echo "$j $k : ".$vals[$j]." == ".(int)$matches[1][$k]."\n";
                                $val_matches++;
                                $used_val[$j] = true;
                                $matched_val[$k] = true;
                                break;
                            }
                        }
                    }
                    //echo "matches: $val_matches/".count($vals)."\n";

                    if (count($vals) > count($matches[1])) {
                        if ($val_matches == count($matches[1])) {
                            $best_match = (int)$av_suffixes[$i]['ID'];
                        }
                    } else if (count($vals) == count($matches[1]) && $val_matches == count($vals)) {
                        $perfect_match = (int)$av_suffixes[$i]['ID'];
                    }
                }

                if (!$perfect_match && !$best_match) {
                    echo "Unable to match random suffix " . $name . " with " . $desc . " " . $record['ID'] . "\n";
                } else {
                    if (!$perfect_match) {
                        $perfect_match = $best_match;
                    }
                    //echo $perfect_match."\n";
                    mysql_query(

                        "REPLACE INTO chardev_random_suffix VALUES (" . $record['RandomSuffixID'] . "," . $perfect_match . ")"
                    );
                    echo mysql_error();
                }


            }
        }
    } catch (Exception $e) {
        echo $e->getTraceAsString() . "\n";
        continue;
    }
}