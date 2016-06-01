#!/usr/bin/env bash

docker exec chardev-database sh -c "mysql -uroot < /root/chardev.sql"
docker exec chardev-database sh -c "mysql -uroot < /root/chardev_static.sql"