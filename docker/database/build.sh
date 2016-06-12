#!/usr/bin/env bash

./compile-sql.sh

docker build --tag=chardev/database:10.0 .
