SET NAMES utf8;

CREATE DATABASE chardev_user;

USE chardev_user;

CREATE TABLE region (
  `Name` VARCHAR(32) PRIMARY KEY,
  `CachedRealmList` TEXT
);