#!/usr/bin/env bash

cp ./../../database/schemas/chardev_mop.sql chardev.sql
cp ./../../database/schemas/chardev_mop_static.sql chardev_static.sql

docker build --tag=chardev/database:10.0 .