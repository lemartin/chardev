#!/usr/bin/env bash

docker run \
--interactive \
--tty \
--rm=true \
--publish=8080:80 \
--volume=$(realpath ../../website/):/opt/chardev/10.0/website \
--link=chardev-database:chardev-database \
--link=chardev-cache:chardev-cache \
--name=chardev-website \
chardev/website:10.0
