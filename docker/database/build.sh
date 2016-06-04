#!/usr/bin/env bash

touch import.sql


for f in ../../database/schema/*.sql
do
    cat "$f" >> import.sql
done

for f in ../../database/data/*.sql
do
    cat "$f" >> import.sql
done

docker build --tag=chardev/database:10.0 .