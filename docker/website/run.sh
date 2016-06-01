#!/usr/bin/env bash

docker run \
--interactive \
--tty \
--rm=true \
--publish=8080:80 \
--volume=$(realpath ../../website/):/home/chardev/website \
--link=chardev-database:database \
chardev/website:10.0