#!/usr/bin/env bash

docker run \
--interactive \
--tty \
--rm=true \
--name=chardev-database \
--env=MYSQL_ALLOW_EMPTY_PASSWORD=1 \
chardev/database:10.0