-- MySQL dump 10.13  Distrib 5.1.41, for Win32 (ia32)
--
-- Host: localhost    Database: chardev_user
-- ------------------------------------------------------
-- Server version	5.1.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `chardev_user`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chardev_user` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chardev_user`;

--
-- Table structure for table `battlenetprofile`
--

DROP TABLE IF EXISTS `battlenetprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `battlenetprofile` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  `Realm` varchar(128) NOT NULL,
  `Region` varchar(2) NOT NULL,
  `CharacterRaceID` int(11) NOT NULL,
  `CharacterClassID` int(11) NOT NULL,
  `Level` int(11) NOT NULL,
  `Serialized` mediumblob NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UniqueConstraint` (`Name`,`Realm`,`Region`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `character_comments`
--

DROP TABLE IF EXISTS `character_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `character_comments` (
  `CharacterID` int(11) NOT NULL,
  `ThreadID` int(11) NOT NULL,
  PRIMARY KEY (`CharacterID`,`ThreadID`),
  KEY `ThreadID_FK` (`ThreadID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_characters`
--

DROP TABLE IF EXISTS `chardev_characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_characters` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `UserID` int(11) NOT NULL,
  `Name` varchar(1024) DEFAULT NULL,
  `Description` varchar(16536) DEFAULT NULL,
  `ChrRaceID` int(11) NOT NULL,
  `ChrClassID` int(11) NOT NULL,
  `Level` int(11) NOT NULL,
  `Timestamp` int(11) NOT NULL,
  `Serialized` mediumblob NOT NULL,
  `Deleted` tinyint(4) NOT NULL DEFAULT '0',
  `History` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`,`History`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `icons`
--

DROP TABLE IF EXISTS `icons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `icons` (
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `ID` int(11) NOT NULL,
  `ThreadID` int(11) NOT NULL,
  `AuthorID` int(11) NOT NULL,
  `Flag` int(11) DEFAULT '0',
  `ModCount` int(11) DEFAULT '0',
  `Position` int(11) NOT NULL COMMENT 'Used for hierarchical thread display',
  `Created` int(11) NOT NULL,
  `ResponseToPostID` int(11) DEFAULT NULL,
  `LatestPostBodyID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ThreadID_FK` (`ThreadID`),
  KEY `ResponseToPostID_FK` (`ResponseToPostID`),
  KEY `AuthorID_Index` (`AuthorID`),
  KEY `LatestPostBodyID_FK` (`LatestPostBodyID`),
  CONSTRAINT `LatestPostBodyID_FK` FOREIGN KEY (`LatestPostBodyID`) REFERENCES `post_body` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `ResponseToPostID_FK` FOREIGN KEY (`ResponseToPostID`) REFERENCES `post` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `ThreadID_FK` FOREIGN KEY (`ThreadID`) REFERENCES `thread` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_body`
--

DROP TABLE IF EXISTS `post_body`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_body` (
  `ID` int(11) NOT NULL,
  `Title` varchar(128) NOT NULL,
  `Content` varchar(16384) NOT NULL,
  `Created` int(11) NOT NULL,
  `PostID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `PostID_FK` (`PostID`),
  CONSTRAINT `PostID_FK` FOREIGN KEY (`PostID`) REFERENCES `post` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `realm`
--

DROP TABLE IF EXISTS `realm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `realm` (
  `Name` varchar(128) NOT NULL DEFAULT '',
  `Region` varchar(2) NOT NULL,
  `TypeMask` int(11) NOT NULL COMMENT '0 pve\n1 pvp\n2 rp',
  `Slug` varchar(128) NOT NULL,
  PRIMARY KEY (`Region`,`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `Region` varchar(2) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `CachedRealmList` mediumblob,
  PRIMARY KEY (`Region`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stat_weights`
--

DROP TABLE IF EXISTS `stat_weights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stat_weights` (
  `UserID` int(11) NOT NULL DEFAULT '0',
  `Name` varchar(32) NOT NULL DEFAULT '',
  `Description` varchar(128) DEFAULT NULL,
  `Serialized` text,
  `ChrClass` int(11) DEFAULT NULL,
  `Public` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`Name`,`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thread` (
  `ID` int(11) NOT NULL,
  `ThreadHookID` int(11) NOT NULL,
  `Flag` int(11) DEFAULT '0',
  `Title` varchar(128) NOT NULL,
  `AuthorID` int(11) NOT NULL,
  `Created` int(11) NOT NULL,
  `PostCount` int(11) NOT NULL DEFAULT '0',
  `InitialPostID` int(11) DEFAULT NULL,
  `LatestPostID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ThreadHookID_FK` (`ThreadHookID`),
  KEY `LatestPostID_FK` (`LatestPostID`),
  KEY `InitialPostID_FK` (`InitialPostID`),
  CONSTRAINT `InitialPostID_FK` FOREIGN KEY (`InitialPostID`) REFERENCES `post` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `LatestPostID_FK` FOREIGN KEY (`LatestPostID`) REFERENCES `post` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `ThreadHookID_FK` FOREIGN KEY (`ThreadHookID`) REFERENCES `thread_hook` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `thread_hook`
--

DROP TABLE IF EXISTS `thread_hook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thread_hook` (
  `ID` int(11) NOT NULL,
  `Name` varchar(128) DEFAULT NULL,
  `ThreadCount` int(11) DEFAULT '0',
  `PostCount` int(11) DEFAULT '0',
  `LatestThreadID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `LatestThreadID_FK` (`LatestThreadID`),
  CONSTRAINT `LatestThreadID_FK` FOREIGN KEY (`LatestThreadID`) REFERENCES `thread` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_data` (
  `UserID` int(11) NOT NULL,
  `ForumSignature` varchar(256) DEFAULT NULL,
  `Website` varchar(256) DEFAULT NULL,
  `Region` varchar(2) DEFAULT NULL,
  `Language` tinyint(4) DEFAULT '0',
  `Avatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userbattlenetprofilerelation`
--

DROP TABLE IF EXISTS `userbattlenetprofilerelation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userbattlenetprofilerelation` (
  `UserID` int(11) DEFAULT NULL,
  `BattleNetProfileID` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wowreforge_storage`
--

DROP TABLE IF EXISTS `wowreforge_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wowreforge_storage` (
  `ID` varchar(32) NOT NULL,
  `Serialised` mediumblob,
  `Time` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-12-30 17:22:14
