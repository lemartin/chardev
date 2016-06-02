# Docker container

The container are in a quite early stage and many things do not work. They are mainly intended for development, but may
be used in future to for decentralised hosting of Chardev.

## Database

To build and run the Chardev database container use following commands. Please be aware that the MySQL is configured
with an empty root password.

```
cd docker/database
./build.sh
./run.sh
```

The schema imported only contains the structure and no data. Test data will be added in future.

## Website

To build and run the Chardev website container use following commands. The website container uses a Docker link to
access the database, hence the database container should be startet first.

```
cd docker/website
./build.sh
./run.sh
```