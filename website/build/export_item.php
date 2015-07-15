<?php

$build = (int)file_get_contents(  __DIR__ . "/.build" );

$sql = __DIR__ . "/chardev_item_b{$build}.sql";

file_put_contents( $sql, "\n\nUSE chardev_mop;\n\n");
`mysqldump -uroot chardev_mop item_sparse item >> $sql`;
file_put_contents( $sql, "\n\nUSE chardev_mop_static;\n\n" , FILE_APPEND);
`mysqldump -uroot chardev_mop_static chardev_item_stats chardev_itemset_stats >> $sql`;
`gzip $sql`;