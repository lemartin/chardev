#!/usr/bin/env bash

mysqldump -h127.0.0.1 -uroot --no-data --databases chardev_mop_static > schema/chardev_mop_static.sql
mysqldump -h127.0.0.1 -uroot --no-data --databases chardev_mop > schema/chardev_mop.sql
mysqldump -h127.0.0.1 -uroot --no-data --databases chardev_user > schema/chardev_user.sql

mysqldump -h127.0.0.1 -uroot --no-create-info --databases chardev_mop > data/chardev_data.sql
mysqldump -h127.0.0.1 -uroot --no-create-info --databases chardev_mop_static > data/chardev_static_data.sql
