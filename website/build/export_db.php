<?php

$build = (int)file_get_contents(  __DIR__ . "/.build" );

$staticTables = implode(" ", array(
    "chardev_item_stats",
    "chardev_itemset_stats",
    "chardev_spellinfo",
    "chardev_base_stats_class_level",
    "chardev_random_suffix",
    "chardev_random_properties",
    "chardev_item_source",
    "chardev_quest"
));

$sql = __DIR__ . "/chardev_b{$build}.sql";
if(file_exists("$sql.gz")) {
    unlink("$sql.gz");
}
file_put_contents( $sql, "\n\nUSE chardev_mop;\n\n");
exec("mysqldump -uroot chardev_mop >> $sql");
file_put_contents( $sql, "\n\nUSE chardev_mop_static;\n\n" , FILE_APPEND);
exec("mysqldump -uroot chardev_mop_static $staticTables >> $sql");
`gzip $sql`;