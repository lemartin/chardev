#!/usr/bin/env bash

mkdir -p sql.d
cp ./../../database/schemas/*.sql sql.d/

docker build --tag=chardev/database:10.0 .