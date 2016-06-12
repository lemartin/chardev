#!/usr/bin/env bash

cd database && ./compile-sql.sh

docker-compose build