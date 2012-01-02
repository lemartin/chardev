-- MySQL dump 10.13  Distrib 5.1.41, for Win32 (ia32)
--
-- Host: localhost    Database: chardev_cataclysm_de
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
-- Current Database: `chardev_cataclysm_de`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chardev_cataclysm_de` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chardev_cataclysm_de`;

--
-- Table structure for table `chardev_chrclass_cache`
--

DROP TABLE IF EXISTS `chardev_chrclass_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_chrclass_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_item_cache`
--

DROP TABLE IF EXISTS `chardev_item_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_item_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spell_cache`
--

DROP TABLE IF EXISTS `chardev_spell_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spell_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spellitemenchantment_cache`
--

DROP TABLE IF EXISTS `chardev_spellitemenchantment_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spellitemenchantment_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_talents_cache`
--

DROP TABLE IF EXISTS `chardev_talents_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_talents_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrclasses`
--

DROP TABLE IF EXISTS `chrclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrclasses` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` text,
  `Name` text,
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrraces`
--

DROP TABLE IF EXISTS `chrraces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrraces` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `Abbreviation` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `NameInternal` text,
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `Name` text,
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` text,
  `f19` text,
  `f20` text,
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faction`
--

DROP TABLE IF EXISTS `faction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faction` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `f20` float DEFAULT '0',
  `f21` float DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f26` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `gemproperties`
--

DROP TABLE IF EXISTS `gemproperties`;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gemproperties` (
  `ID` int(11),
  `SpellItemEnchantmentID` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `MinItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `glyphproperties`
--

DROP TABLE IF EXISTS `glyphproperties`;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `glyphproperties` (
  `ID` int(11),
  `SpellID` int(11),
  `Type` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecrit`
--

DROP TABLE IF EXISTS `gtchancetomeleecrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecritbase`
--

DROP TABLE IF EXISTS `gtchancetomeleecritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcrit`
--

DROP TABLE IF EXISTS `gtchancetospellcrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcritbase`
--

DROP TABLE IF EXISTS `gtchancetospellcritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtcombatratings`
--

DROP TABLE IF EXISTS `gtcombatratings`;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtcombatratings` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenhp`
--

DROP TABLE IF EXISTS `gtoctregenhp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenhp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenmp`
--

DROP TABLE IF EXISTS `gtoctregenmp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenmp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenhpperspt`
--

DROP TABLE IF EXISTS `gtregenhpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenhpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenmpperspt`
--

DROP TABLE IF EXISTS `gtregenmpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenmpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtspellscaling`
--

DROP TABLE IF EXISTS `gtspellscaling`;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtspellscaling` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item`
--

DROP TABLE IF EXISTS `item`;
/*!50001 DROP VIEW IF EXISTS `item`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item` (
  `ID` int(11),
  `ItemClass` int(11),
  `ItemSubClass` int(11),
  `f4` int(11),
  `f5` int(11),
  `ItemDisplayInfoID` int(11),
  `InventorySlot` int(11),
  `f8` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item_sparse`
--

DROP TABLE IF EXISTS `item_sparse`;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item_sparse` (
  `ID` int(11),
  `Quality` int(11),
  `TypeMask` int(11),
  `TypeMask2` int(11),
  `TypeMask3` int(11),
  `TypeMask4` int(11),
  `TypeMask5` int(11),
  `BuyPrice` int(11),
  `SellPrice` int(11),
  `InventorySlot` int(11),
  `ChrClassMask` int(11),
  `ChrRaceMask` int(11),
  `Level` int(11),
  `RequiredCharacterLevel` int(11),
  `RequiredSkillLineID` int(11),
  `RequiredSkillLineLevel` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `RequiredFactionID` int(11),
  `RequiredFactionReputation` int(11),
  `Unique` int(11),
  `MaximumStackSize` int(11),
  `f21` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `StatValue1` int(11),
  `StatValue2` int(11),
  `StatValue3` int(11),
  `StatValue4` int(11),
  `StatValue5` int(11),
  `StatValue6` int(11),
  `StatValue7` int(11),
  `StatValue8` int(11),
  `StatValue9` int(11),
  `StatValue10` int(11),
  `f42` int(11),
  `f43` int(11),
  `f44` int(11),
  `f45` int(11),
  `f46` int(11),
  `f47` int(11),
  `f48` int(11),
  `f49` int(11),
  `f50` int(11),
  `f51` int(11),
  `f52` int(11),
  `f53` int(11),
  `f54` int(11),
  `f55` int(11),
  `f56` int(11),
  `f57` int(11),
  `f58` int(11),
  `f59` int(11),
  `f60` int(11),
  `f61` int(11),
  `ScalingStatDistributionID` int(11),
  `f63` int(11),
  `Delay` int(11),
  `f65` float,
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `SpellTrigger1` int(11),
  `SpellTrigger2` int(11),
  `SpellTrigger3` int(11),
  `SpellTrigger4` int(11),
  `SpellTrigger5` int(11),
  `SpellCharges1` int(11),
  `SpellCharges2` int(11),
  `SpellCharges3` int(11),
  `SpellCharges4` int(11),
  `SpellCharges5` int(11),
  `SpellCooldown1` int(11),
  `SpellCooldown2` int(11),
  `SpellCooldown3` int(11),
  `SpellCooldown4` int(11),
  `SpellCooldown5` int(11),
  `SpellCategoryID1` int(11),
  `SpellCategoryID2` int(11),
  `SpellCategoryID3` int(11),
  `SpellCategoryID4` int(11),
  `SpellCategoryID5` int(11),
  `SpellCategoryCooldown1` int(11),
  `SpellCategoryCooldown2` int(11),
  `SpellCategoryCooldown3` int(11),
  `SpellCategoryCooldown4` int(11),
  `SpellCategoryCooldown5` int(11),
  `Binds` int(11),
  `Name` text,
  `f98` int(11),
  `f99` int(11),
  `f100` int(11),
  `Description` text,
  `QuestID` int(11),
  `f103` int(11),
  `f104` int(11),
  `f105` int(11),
  `f106` int(11),
  `f107` int(11),
  `f108` int(11),
  `RandomPropertiesID` int(11),
  `RandomSuffixID` int(11),
  `ItemSetID` int(11),
  `f113` int(11),
  `f114` int(11),
  `f115` int(11),
  `f116` int(11),
  `SocketColor1` int(11),
  `SocketColor2` int(11),
  `SocketColor3` int(11),
  `f120` int(11),
  `f121` int(11),
  `f122` int(11),
  `SocketBonusID` int(11),
  `GemPropertiesID` int(11),
  `f125` float,
  `f126` int(11),
  `LimitCategory` int(11),
  `f128` int(11),
  `DamageRange` float,
  `LimitCategoryMultiple` int(11),
  `f131` int(11),
  `Version` int(11),
  `Locale` varchar(2)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorquality`
--

DROP TABLE IF EXISTS `itemarmorquality`;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorquality` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorshield`
--

DROP TABLE IF EXISTS `itemarmorshield`;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorshield` (
  `ID` int(11),
  `ItemLevel` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmortotal`
--

DROP TABLE IF EXISTS `itemarmortotal`;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmortotal` (
  `ID` int(11),
  `ItemLevel` int(11),
  `1` float,
  `2` float,
  `3` float,
  `4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemclass`
--

DROP TABLE IF EXISTS `itemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` float DEFAULT NULL COMMENT 'Added 4.3',
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemcurrencycost`
--

DROP TABLE IF EXISTS `itemcurrencycost`;
/*!50001 DROP VIEW IF EXISTS `itemcurrencycost`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemcurrencycost` (
  `ItemID` int(11),
  `CurrencyID` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageonehand`
--

DROP TABLE IF EXISTS `itemdamageonehand`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageonehandcaster`
--

DROP TABLE IF EXISTS `itemdamageonehandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageranged`
--

DROP TABLE IF EXISTS `itemdamageranged`;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageranged` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagethrown`
--

DROP TABLE IF EXISTS `itemdamagethrown`;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagethrown` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohand`
--

DROP TABLE IF EXISTS `itemdamagetwohand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohandcaster`
--

DROP TABLE IF EXISTS `itemdamagetwohandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagewand`
--

DROP TABLE IF EXISTS `itemdamagewand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagewand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdisplayinfo`
--

DROP TABLE IF EXISTS `itemdisplayinfo`;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdisplayinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `Icon` text,
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemrandomproperties`
--

DROP TABLE IF EXISTS `itemrandomproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomproperties` (
  `ID` int(11) NOT NULL,
  `InternalName` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemrandomsuffix`
--

DROP TABLE IF EXISTS `itemrandomsuffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomsuffix` (
  `ID` int(11) NOT NULL,
  `Name` text,
  `InternalDescription` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Coefficient1` int(11) DEFAULT NULL,
  `Coefficient2` int(11) DEFAULT NULL,
  `Coefficient3` int(11) DEFAULT NULL,
  `Coefficient4` int(11) DEFAULT NULL,
  `Coefficient5` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemreforge`
--

DROP TABLE IF EXISTS `itemreforge`;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemreforge` (
  `ID` int(11),
  `f2` int(11),
  `f3` float,
  `f4` int(11),
  `f5` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemset`
--

DROP TABLE IF EXISTS `itemset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemset` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `ItemID1` int(11) DEFAULT '0',
  `ItemID2` int(11) DEFAULT '0',
  `ItemID3` int(11) DEFAULT '0',
  `ItemID4` int(11) DEFAULT '0',
  `ItemID5` int(11) DEFAULT '0',
  `ItemID6` int(11) DEFAULT '0',
  `ItemID7` int(11) DEFAULT '0',
  `ItemID8` int(11) DEFAULT '0',
  `ItemID9` int(11) DEFAULT '0',
  `ItemID10` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `SpellID4` int(11) DEFAULT '0',
  `SpellID5` int(11) DEFAULT '0',
  `SpellID6` int(11) DEFAULT '0',
  `SpellID7` int(11) DEFAULT '0',
  `SpellID8` int(11) DEFAULT '0',
  `required1` int(11) DEFAULT '0',
  `required2` int(11) DEFAULT '0',
  `required3` int(11) DEFAULT '0',
  `required4` int(11) DEFAULT '0',
  `required5` int(11) DEFAULT '0',
  `required6` int(11) DEFAULT '0',
  `required7` int(11) DEFAULT '0',
  `required8` int(11) DEFAULT '0',
  `f36` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemsubclass`
--

DROP TABLE IF EXISTS `itemsubclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemsubclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemClass` int(11) DEFAULT '0',
  `ItemSubClass` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `Name` text,
  `NameLong` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `randproppoints`
--

DROP TABLE IF EXISTS `randproppoints`;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `randproppoints` (
  `ID` int(11),
  `PointsQuality4Group0` int(11),
  `PointsQuality4Group1` int(11),
  `PointsQuality4Group2` int(11),
  `PointsQuality4Group3` int(11),
  `PointsQuality4Group4` int(11),
  `PointsQuality3Group0` int(11),
  `PointsQuality3Group1` int(11),
  `PointsQuality3Group2` int(11),
  `PointsQuality3Group3` int(11),
  `PointsQuality3Group4` int(11),
  `PointsQuality2Group0` int(11),
  `PointsQuality2Group1` int(11),
  `PointsQuality2Group2` int(11),
  `PointsQuality2Group3` int(11),
  `PointsQuality2Group4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `researchproject`
--

DROP TABLE IF EXISTS `researchproject`;
/*!50001 DROP VIEW IF EXISTS `researchproject`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `researchproject` (
  `ID` int(11),
  `Name` text,
  `Description` text,
  `IsRare` int(11),
  `ResearchBranchID` int(11),
  `SpellID` int(11),
  `Sockets` int(11),
  `f8` int(11),
  `Fragments` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatdistribution`
--

DROP TABLE IF EXISTS `scalingstatdistribution`;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatdistribution` (
  `id` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `Coefficient1` int(11),
  `Coefficient2` int(11),
  `Coefficient3` int(11),
  `Coefficient4` int(11),
  `Coefficient5` int(11),
  `Coefficient6` int(11),
  `Coefficient7` int(11),
  `Coefficient8` int(11),
  `Coefficient9` int(11),
  `Coefficient10` int(11),
  `MinLevel` int(11),
  `MaxLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatvalues`
--

DROP TABLE IF EXISTS `scalingstatvalues`;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatvalues` (
  `id` int(11),
  `level` int(11),
  `dist0` int(11),
  `dist1` int(11),
  `dist2` int(11),
  `dist3` int(11),
  `dist4` int(11),
  `dist5` int(11),
  `dist6` int(11),
  `dist7` int(11),
  `dist8` int(11),
  `dist9` int(11),
  `dist10` int(11),
  `dist11` int(11),
  `dist12` int(11),
  `dist13` int(11),
  `dist14` int(11),
  `dist15` int(11),
  `dist16` int(11),
  `dist17` int(11),
  `dist18` int(11),
  `dist19` int(11),
  `dist20` int(11),
  `dist21` int(11),
  `dist22` int(11),
  `dist23` int(11),
  `dist24` int(11),
  `dist25` int(11),
  `dist26` int(11),
  `dist27` int(11),
  `dist28` int(11),
  `dist29` int(11),
  `dist30` int(11),
  `dist31` int(11),
  `dist32` int(11),
  `dist33` int(11),
  `dist34` int(11),
  `dist35` int(11),
  `dist36` int(11),
  `dist37` int(11),
  `dist38` int(11),
  `dist39` int(11),
  `dist40` int(11),
  `dist41` int(11),
  `dist42` int(11),
  `dist43` int(11),
  `dist44` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `skillline`
--

DROP TABLE IF EXISTS `skillline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skillline` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Category` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `skilllineability`
--

DROP TABLE IF EXISTS `skilllineability`;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skilllineability` (
  `ID` int(11),
  `SkillLineID` int(11),
  `SpellID` int(11),
  `RaceMask` int(11),
  `ClassMask` int(11),
  `f6` int(11),
  `f7` int(11),
  `RequiredSkill` int(11),
  `ReplaceSpellID` int(11),
  `f10` int(11),
  `Grey` int(11),
  `Yellow` int(11),
  `f13` int(11),
  `f14` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `skillraceclassinfo`
--

DROP TABLE IF EXISTS `skillraceclassinfo`;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skillraceclassinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spell`
--

DROP TABLE IF EXISTS `spell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spell` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Type0` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Type4` int(11) DEFAULT '0',
  `Type5` int(11) DEFAULT '0',
  `Type6` int(11) DEFAULT '0',
  `Type7` int(11) DEFAULT '0',
  `Type8` int(11) DEFAULT '0',
  `Type9` int(11) DEFAULT '0',
  `Type10` int(11) DEFAULT '0' COMMENT '4.2',
  `SpellCastTimesID` int(11) DEFAULT '0',
  `SpellDurationID` int(11) DEFAULT '0',
  `EnergyType` int(11) DEFAULT '0',
  `SpellRangeID` int(11) DEFAULT '0',
  `f15` float DEFAULT '0',
  `SpellVisualId` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0' COMMENT 'possibly SpellVisualKitID',
  `SpellIconID` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `Name` text,
  `Rank` text,
  `Description` text,
  `BuffDescription` text,
  `SchoolMask` int(11) DEFAULT '0',
  `SpellRuneCostID` int(11) DEFAULT '0',
  `SpellMissileID` int(11) DEFAULT '0',
  `SpellDescriptionVariablesID` int(11) DEFAULT '0',
  `SpellDifficultyID` int(11) DEFAULT '0',
  `f29` float DEFAULT '0',
  `SpellScalingID` int(11) DEFAULT '0',
  `SpellAuraOptionsID` int(11) DEFAULT '0',
  `SpellAuraRestrictionsID` int(11) DEFAULT '0',
  `SpellCastingRequirementsID` int(11) DEFAULT '0',
  `SpellCategoriesID` int(11) DEFAULT '0',
  `SpellClassOptionsID` int(11) DEFAULT '0',
  `SpellCooldownsID` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  `SpellEquippedItemsID` int(11) DEFAULT '0',
  `SpellInterruptsID` int(11) DEFAULT '0',
  `SpellLevelsID` int(11) DEFAULT '0',
  `SpellPowerID` int(11) DEFAULT '0',
  `SpellReagentsID` int(11) DEFAULT '0',
  `SpellShapeshiftID` int(11) DEFAULT '0',
  `SpellTargetRestrictionsID` int(11) DEFAULT '0',
  `f45` int(11) DEFAULT '0',
  `ResearchProjectID` int(11) DEFAULT '0' COMMENT 'Archeology related',
  PRIMARY KEY (`ID`),
  KEY `SpellScaling` (`SpellScalingID`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellauraoptions`
--

DROP TABLE IF EXISTS `spellauraoptions`;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellauraoptions` (
  `ID` int(11),
  `Stacks` int(11),
  `ProcRate` int(11),
  `ProcCharges` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellaurarestrictions`
--

DROP TABLE IF EXISTS `spellaurarestrictions`;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellaurarestrictions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcastingrequirements`
--

DROP TABLE IF EXISTS `spellcastingrequirements`;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcastingrequirements` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcasttimes`
--

DROP TABLE IF EXISTS `spellcasttimes`;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcasttimes` (
  `ID` int(11),
  `Time` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategories`
--

DROP TABLE IF EXISTS `spellcategories`;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategories` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategory`
--

DROP TABLE IF EXISTS `spellcategory`;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategory` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellclassoptions`
--

DROP TABLE IF EXISTS `spellclassoptions`;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellclassoptions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `SpellClassID` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcooldowns`
--

DROP TABLE IF EXISTS `spellcooldowns`;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcooldowns` (
  `ID` int(11),
  `Spell` int(11),
  `Category` int(11),
  `Global` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spelldescriptionvariables`
--

DROP TABLE IF EXISTS `spelldescriptionvariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelldescriptionvariables` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spelldifficulty`
--

DROP TABLE IF EXISTS `spelldifficulty`;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelldifficulty` (
  `f1` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellduration`
--

DROP TABLE IF EXISTS `spellduration`;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellduration` (
  `ID` int(11),
  `Duration` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelleffect`
--

DROP TABLE IF EXISTS `spelleffect`;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelleffect` (
  `ID` int(11),
  `Aura` int(11),
  `ProcValue` float,
  `Effect` int(11),
  `Period` int(11),
  `Value` int(11),
  `Coefficient` float,
  `f8` float,
  `Targets` int(11),
  `Dice` int(11),
  `ItemID` int(11),
  `f12` int(11),
  `SecondaryEffect` int(11),
  `UsedStat` int(11),
  `ProcChance` float,
  `SpellRadiusID` int(11),
  `f17` int(11),
  `LevelModifier` float,
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `SpellID` int(11),
  `Index` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellequippeditems`
--

DROP TABLE IF EXISTS `spellequippeditems`;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellequippeditems` (
  `ID` int(11),
  `ItemClassID` int(11),
  `InventorySlotMask` int(11),
  `ItemSubClassMask` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyout`
--

DROP TABLE IF EXISTS `spellflyout`;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyout` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyoutitem`
--

DROP TABLE IF EXISTS `spellflyoutitem`;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyoutitem` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellfocusobject`
--

DROP TABLE IF EXISTS `spellfocusobject`;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellfocusobject` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellicon`
--

DROP TABLE IF EXISTS `spellicon`;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellicon` (
  `ID` int(11),
  `Icon` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellinterrupts`
--

DROP TABLE IF EXISTS `spellinterrupts`;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellinterrupts` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellitemenchantment`
--

DROP TABLE IF EXISTS `spellitemenchantment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellitemenchantment` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Value1` int(11) DEFAULT '0',
  `Value2` int(11) DEFAULT '0',
  `Value3` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `Description` text,
  `f16` int(11) DEFAULT '0',
  `EnchantSlot` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `SpellItemEnchantmentConditionID` int(11) DEFAULT '0',
  `RequiredSkillLineID` int(11) DEFAULT '0',
  `RequiredSkillLineLevel` int(11) DEFAULT '0',
  `RequiredCharacterLevel` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellitemenchantmentcondition`
--

DROP TABLE IF EXISTS `spellitemenchantmentcondition`;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellitemenchantmentcondition` (
  `ID` int(11),
  `Color1` tinyint(4),
  `Color2` tinyint(4),
  `Color3` tinyint(4),
  `Color4` tinyint(4),
  `Color5` tinyint(4),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12_1` tinyint(4),
  `f12_2` tinyint(4),
  `f12_3` tinyint(4),
  `Comparator1` tinyint(4),
  `Comparator2` tinyint(4),
  `Comparator3` tinyint(4),
  `Comparator4` tinyint(4),
  `Comparator5` tinyint(4),
  `CompareColor1` tinyint(4),
  `CompareColor2` tinyint(4),
  `CompareColor3` tinyint(4),
  `CompareColor4` tinyint(4),
  `CompareColor5` tinyint(4),
  `f13_1` tinyint(4),
  `f13_2` tinyint(4),
  `Value1` int(11),
  `Value2` int(11),
  `Value3` int(11),
  `Value4` int(11),
  `Value5` int(11),
  `f27` tinyint(4),
  `f28` tinyint(4),
  `f29` tinyint(4),
  `f30` tinyint(4),
  `f31` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelllevels`
--

DROP TABLE IF EXISTS `spelllevels`;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelllevels` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmechanic`
--

DROP TABLE IF EXISTS `spellmechanic`;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmechanic` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissile`
--

DROP TABLE IF EXISTS `spellmissile`;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissile` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` float,
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` float,
  `f13` float,
  `f14` float,
  `f15` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissilemotion`
--

DROP TABLE IF EXISTS `spellmissilemotion`;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissilemotion` (
  `ID` int(11),
  `f2` text,
  `f3` text,
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellpower`
--

DROP TABLE IF EXISTS `spellpower`;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellpower` (
  `ID` int(11),
  `Absolute` int(11),
  `f3` int(11),
  `Percent` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellradius`
--

DROP TABLE IF EXISTS `spellradius`;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellradius` (
  `ID` int(11),
  `Radius` float,
  `f3` int(11),
  `f4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellrange`
--

DROP TABLE IF EXISTS `spellrange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellrange` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `MinimumHostile` float DEFAULT '0',
  `MinimumFriendly` float DEFAULT '0',
  `MaximumHostile` float DEFAULT '0',
  `MaximumFriendly` float DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `InternalName` text,
  `InternalDescription` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellreagents`
--

DROP TABLE IF EXISTS `spellreagents`;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellreagents` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellrunecost`
--

DROP TABLE IF EXISTS `spellrunecost`;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellrunecost` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellscaling`
--

DROP TABLE IF EXISTS `spellscaling`;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellscaling` (
  `ID` int(11),
  `CastTimeStart` int(11),
  `CastTimeEnd` int(11),
  `Intervals` int(11),
  `Distribution` int(11),
  `Coefficient1` float,
  `Coefficient2` float,
  `Coefficient3` float,
  `Dice1` float,
  `Dice2` float,
  `Dice3` float,
  `f12` float,
  `f13` int(11),
  `f14` int(11),
  `f15` float,
  `f16` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshift`
--

DROP TABLE IF EXISTS `spellshapeshift`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshift` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `SpellShapeshiftFormID` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshiftform`
--

DROP TABLE IF EXISTS `spellshapeshiftform`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshiftform` (
  `ID` int(11),
  `f2` int(11),
  `f3` text,
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelltargetrestrictions`
--

DROP TABLE IF EXISTS `spelltargetrestrictions`;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelltargetrestrictions` (
  `ID` int(11),
  `Targets` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellvisual`
--

DROP TABLE IF EXISTS `spellvisual`;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellvisual` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11),
  `f26` int(11),
  `f27` float,
  `f28` int(11),
  `f29` float,
  `f30` float,
  `f31` float,
  `f32` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `talent`
--

DROP TABLE IF EXISTS `talent`;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talent` (
  `ID` int(11),
  `TalentTabID` int(11),
  `Row` int(11),
  `Col` int(11),
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `RequiredTalentID1` int(11),
  `RequiredTalentID2` int(11),
  `RequiredTalentID3` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `PetMask0` int(11),
  `PetMask1` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `talenttab`
--

DROP TABLE IF EXISTS `talenttab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talenttab` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `SpellIconID` int(11) DEFAULT '0',
  `ClassMask` int(11) DEFAULT '0',
  `PetMask` int(11) DEFAULT '0',
  `Index` int(11) DEFAULT '0',
  `InternalName` text,
  `Description` text,
  `TypeMask` int(11) DEFAULT '0' COMMENT '0 none\n1 n.a.\n2 Protection\n4 Healing\n8 Damage',
  `MasterySpellID1` int(11) DEFAULT NULL,
  `MasterySpellID2` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Class` (`ClassMask`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `talenttreeprimaryspells`
--

DROP TABLE IF EXISTS `talenttreeprimaryspells`;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talenttreeprimaryspells` (
  `ID` int(11),
  `TalentTabID` int(11),
  `SpellID` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `chardev_cataclysm_fr`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chardev_cataclysm_fr` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chardev_cataclysm_fr`;

--
-- Table structure for table `chardev_chrclass_cache`
--

DROP TABLE IF EXISTS `chardev_chrclass_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_chrclass_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_item_cache`
--

DROP TABLE IF EXISTS `chardev_item_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_item_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spell_cache`
--

DROP TABLE IF EXISTS `chardev_spell_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spell_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spellitemenchantment_cache`
--

DROP TABLE IF EXISTS `chardev_spellitemenchantment_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spellitemenchantment_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_talents_cache`
--

DROP TABLE IF EXISTS `chardev_talents_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_talents_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrclasses`
--

DROP TABLE IF EXISTS `chrclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrclasses` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` text,
  `Name` text,
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrraces`
--

DROP TABLE IF EXISTS `chrraces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrraces` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `Abbreviation` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `NameInternal` text,
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `Name` text,
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` text,
  `f19` text,
  `f20` text,
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faction`
--

DROP TABLE IF EXISTS `faction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faction` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `f20` float DEFAULT '0',
  `f21` float DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f26` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `gemproperties`
--

DROP TABLE IF EXISTS `gemproperties`;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gemproperties` (
  `ID` int(11),
  `SpellItemEnchantmentID` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `MinItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `glyphproperties`
--

DROP TABLE IF EXISTS `glyphproperties`;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `glyphproperties` (
  `ID` int(11),
  `SpellID` int(11),
  `Type` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecrit`
--

DROP TABLE IF EXISTS `gtchancetomeleecrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecritbase`
--

DROP TABLE IF EXISTS `gtchancetomeleecritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcrit`
--

DROP TABLE IF EXISTS `gtchancetospellcrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcritbase`
--

DROP TABLE IF EXISTS `gtchancetospellcritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtcombatratings`
--

DROP TABLE IF EXISTS `gtcombatratings`;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtcombatratings` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenhp`
--

DROP TABLE IF EXISTS `gtoctregenhp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenhp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenmp`
--

DROP TABLE IF EXISTS `gtoctregenmp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenmp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenhpperspt`
--

DROP TABLE IF EXISTS `gtregenhpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenhpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenmpperspt`
--

DROP TABLE IF EXISTS `gtregenmpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenmpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtspellscaling`
--

DROP TABLE IF EXISTS `gtspellscaling`;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtspellscaling` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item`
--

DROP TABLE IF EXISTS `item`;
/*!50001 DROP VIEW IF EXISTS `item`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item` (
  `ID` int(11),
  `ItemClass` int(11),
  `ItemSubClass` int(11),
  `f4` int(11),
  `f5` int(11),
  `ItemDisplayInfoID` int(11),
  `InventorySlot` int(11),
  `f8` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item_sparse`
--

DROP TABLE IF EXISTS `item_sparse`;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item_sparse` (
  `ID` int(11),
  `Quality` int(11),
  `TypeMask` int(11),
  `TypeMask2` int(11),
  `TypeMask3` int(11),
  `TypeMask4` int(11),
  `TypeMask5` int(11),
  `BuyPrice` int(11),
  `SellPrice` int(11),
  `InventorySlot` int(11),
  `ChrClassMask` int(11),
  `ChrRaceMask` int(11),
  `Level` int(11),
  `RequiredCharacterLevel` int(11),
  `RequiredSkillLineID` int(11),
  `RequiredSkillLineLevel` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `RequiredFactionID` int(11),
  `RequiredFactionReputation` int(11),
  `Unique` int(11),
  `MaximumStackSize` int(11),
  `f21` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `StatValue1` int(11),
  `StatValue2` int(11),
  `StatValue3` int(11),
  `StatValue4` int(11),
  `StatValue5` int(11),
  `StatValue6` int(11),
  `StatValue7` int(11),
  `StatValue8` int(11),
  `StatValue9` int(11),
  `StatValue10` int(11),
  `f42` int(11),
  `f43` int(11),
  `f44` int(11),
  `f45` int(11),
  `f46` int(11),
  `f47` int(11),
  `f48` int(11),
  `f49` int(11),
  `f50` int(11),
  `f51` int(11),
  `f52` int(11),
  `f53` int(11),
  `f54` int(11),
  `f55` int(11),
  `f56` int(11),
  `f57` int(11),
  `f58` int(11),
  `f59` int(11),
  `f60` int(11),
  `f61` int(11),
  `ScalingStatDistributionID` int(11),
  `f63` int(11),
  `Delay` int(11),
  `f65` float,
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `SpellTrigger1` int(11),
  `SpellTrigger2` int(11),
  `SpellTrigger3` int(11),
  `SpellTrigger4` int(11),
  `SpellTrigger5` int(11),
  `SpellCharges1` int(11),
  `SpellCharges2` int(11),
  `SpellCharges3` int(11),
  `SpellCharges4` int(11),
  `SpellCharges5` int(11),
  `SpellCooldown1` int(11),
  `SpellCooldown2` int(11),
  `SpellCooldown3` int(11),
  `SpellCooldown4` int(11),
  `SpellCooldown5` int(11),
  `SpellCategoryID1` int(11),
  `SpellCategoryID2` int(11),
  `SpellCategoryID3` int(11),
  `SpellCategoryID4` int(11),
  `SpellCategoryID5` int(11),
  `SpellCategoryCooldown1` int(11),
  `SpellCategoryCooldown2` int(11),
  `SpellCategoryCooldown3` int(11),
  `SpellCategoryCooldown4` int(11),
  `SpellCategoryCooldown5` int(11),
  `Binds` int(11),
  `Name` text,
  `f98` int(11),
  `f99` int(11),
  `f100` int(11),
  `Description` text,
  `QuestID` int(11),
  `f103` int(11),
  `f104` int(11),
  `f105` int(11),
  `f106` int(11),
  `f107` int(11),
  `f108` int(11),
  `RandomPropertiesID` int(11),
  `RandomSuffixID` int(11),
  `ItemSetID` int(11),
  `f113` int(11),
  `f114` int(11),
  `f115` int(11),
  `f116` int(11),
  `SocketColor1` int(11),
  `SocketColor2` int(11),
  `SocketColor3` int(11),
  `f120` int(11),
  `f121` int(11),
  `f122` int(11),
  `SocketBonusID` int(11),
  `GemPropertiesID` int(11),
  `f125` float,
  `f126` int(11),
  `LimitCategory` int(11),
  `f128` int(11),
  `DamageRange` float,
  `LimitCategoryMultiple` int(11),
  `f131` int(11),
  `Version` int(11),
  `Locale` varchar(2)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorquality`
--

DROP TABLE IF EXISTS `itemarmorquality`;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorquality` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorshield`
--

DROP TABLE IF EXISTS `itemarmorshield`;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorshield` (
  `ID` int(11),
  `ItemLevel` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmortotal`
--

DROP TABLE IF EXISTS `itemarmortotal`;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmortotal` (
  `ID` int(11),
  `ItemLevel` int(11),
  `1` float,
  `2` float,
  `3` float,
  `4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemclass`
--

DROP TABLE IF EXISTS `itemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` float DEFAULT NULL COMMENT 'Added 4.3',
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamageammo`
--

DROP TABLE IF EXISTS `itemdamageammo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamageammo` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` float DEFAULT '0',
  `f4` float DEFAULT '0',
  `f5` float DEFAULT '0',
  `f6` float DEFAULT '0',
  `f7` float DEFAULT '0',
  `f8` float DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemdamageonehand`
--

DROP TABLE IF EXISTS `itemdamageonehand`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageonehandcaster`
--

DROP TABLE IF EXISTS `itemdamageonehandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageranged`
--

DROP TABLE IF EXISTS `itemdamageranged`;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageranged` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagethrown`
--

DROP TABLE IF EXISTS `itemdamagethrown`;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagethrown` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohand`
--

DROP TABLE IF EXISTS `itemdamagetwohand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohandcaster`
--

DROP TABLE IF EXISTS `itemdamagetwohandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagewand`
--

DROP TABLE IF EXISTS `itemdamagewand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagewand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdisplayinfo`
--

DROP TABLE IF EXISTS `itemdisplayinfo`;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdisplayinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `Icon` text,
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemrandomproperties`
--

DROP TABLE IF EXISTS `itemrandomproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomproperties` (
  `ID` int(11) NOT NULL,
  `InternalName` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemrandomsuffix`
--

DROP TABLE IF EXISTS `itemrandomsuffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomsuffix` (
  `ID` int(11) NOT NULL,
  `Name` text,
  `InternalDescription` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Coefficient1` int(11) DEFAULT NULL,
  `Coefficient2` int(11) DEFAULT NULL,
  `Coefficient3` int(11) DEFAULT NULL,
  `Coefficient4` int(11) DEFAULT NULL,
  `Coefficient5` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemreforge`
--

DROP TABLE IF EXISTS `itemreforge`;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemreforge` (
  `ID` int(11),
  `f2` int(11),
  `f3` float,
  `f4` int(11),
  `f5` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemset`
--

DROP TABLE IF EXISTS `itemset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemset` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `ItemID1` int(11) DEFAULT '0',
  `ItemID2` int(11) DEFAULT '0',
  `ItemID3` int(11) DEFAULT '0',
  `ItemID4` int(11) DEFAULT '0',
  `ItemID5` int(11) DEFAULT '0',
  `ItemID6` int(11) DEFAULT '0',
  `ItemID7` int(11) DEFAULT '0',
  `ItemID8` int(11) DEFAULT '0',
  `ItemID9` int(11) DEFAULT '0',
  `ItemID10` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `SpellID4` int(11) DEFAULT '0',
  `SpellID5` int(11) DEFAULT '0',
  `SpellID6` int(11) DEFAULT '0',
  `SpellID7` int(11) DEFAULT '0',
  `SpellID8` int(11) DEFAULT '0',
  `required1` int(11) DEFAULT '0',
  `required2` int(11) DEFAULT '0',
  `required3` int(11) DEFAULT '0',
  `required4` int(11) DEFAULT '0',
  `required5` int(11) DEFAULT '0',
  `required6` int(11) DEFAULT '0',
  `required7` int(11) DEFAULT '0',
  `required8` int(11) DEFAULT '0',
  `f36` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemsubclass`
--

DROP TABLE IF EXISTS `itemsubclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemsubclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemClass` int(11) DEFAULT '0',
  `ItemSubClass` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `Name` text,
  `NameLong` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `randproppoints`
--

DROP TABLE IF EXISTS `randproppoints`;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `randproppoints` (
  `ID` int(11),
  `PointsQuality4Group0` int(11),
  `PointsQuality4Group1` int(11),
  `PointsQuality4Group2` int(11),
  `PointsQuality4Group3` int(11),
  `PointsQuality4Group4` int(11),
  `PointsQuality3Group0` int(11),
  `PointsQuality3Group1` int(11),
  `PointsQuality3Group2` int(11),
  `PointsQuality3Group3` int(11),
  `PointsQuality3Group4` int(11),
  `PointsQuality2Group0` int(11),
  `PointsQuality2Group1` int(11),
  `PointsQuality2Group2` int(11),
  `PointsQuality2Group3` int(11),
  `PointsQuality2Group4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatdistribution`
--

DROP TABLE IF EXISTS `scalingstatdistribution`;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatdistribution` (
  `id` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `Coefficient1` int(11),
  `Coefficient2` int(11),
  `Coefficient3` int(11),
  `Coefficient4` int(11),
  `Coefficient5` int(11),
  `Coefficient6` int(11),
  `Coefficient7` int(11),
  `Coefficient8` int(11),
  `Coefficient9` int(11),
  `Coefficient10` int(11),
  `MinLevel` int(11),
  `MaxLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatvalues`
--

DROP TABLE IF EXISTS `scalingstatvalues`;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatvalues` (
  `id` int(11),
  `level` int(11),
  `dist0` int(11),
  `dist1` int(11),
  `dist2` int(11),
  `dist3` int(11),
  `dist4` int(11),
  `dist5` int(11),
  `dist6` int(11),
  `dist7` int(11),
  `dist8` int(11),
  `dist9` int(11),
  `dist10` int(11),
  `dist11` int(11),
  `dist12` int(11),
  `dist13` int(11),
  `dist14` int(11),
  `dist15` int(11),
  `dist16` int(11),
  `dist17` int(11),
  `dist18` int(11),
  `dist19` int(11),
  `dist20` int(11),
  `dist21` int(11),
  `dist22` int(11),
  `dist23` int(11),
  `dist24` int(11),
  `dist25` int(11),
  `dist26` int(11),
  `dist27` int(11),
  `dist28` int(11),
  `dist29` int(11),
  `dist30` int(11),
  `dist31` int(11),
  `dist32` int(11),
  `dist33` int(11),
  `dist34` int(11),
  `dist35` int(11),
  `dist36` int(11),
  `dist37` int(11),
  `dist38` int(11),
  `dist39` int(11),
  `dist40` int(11),
  `dist41` int(11),
  `dist42` int(11),
  `dist43` int(11),
  `dist44` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `skillline`
--

DROP TABLE IF EXISTS `skillline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skillline` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Category` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `skilllineability`
--

DROP TABLE IF EXISTS `skilllineability`;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skilllineability` (
  `ID` int(11),
  `SkillLineID` int(11),
  `SpellID` int(11),
  `RaceMask` int(11),
  `ClassMask` int(11),
  `f6` int(11),
  `f7` int(11),
  `RequiredSkill` int(11),
  `ReplaceSpellID` int(11),
  `f10` int(11),
  `Grey` int(11),
  `Yellow` int(11),
  `f13` int(11),
  `f14` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `skillraceclassinfo`
--

DROP TABLE IF EXISTS `skillraceclassinfo`;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skillraceclassinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spell`
--

DROP TABLE IF EXISTS `spell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spell` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Type0` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Type4` int(11) DEFAULT '0',
  `Type5` int(11) DEFAULT '0',
  `Type6` int(11) DEFAULT '0',
  `Type7` int(11) DEFAULT '0',
  `Type8` int(11) DEFAULT '0',
  `Type9` int(11) DEFAULT '0',
  `Type10` int(11) DEFAULT '0' COMMENT '4.2',
  `SpellCastTimesID` int(11) DEFAULT '0',
  `SpellDurationID` int(11) DEFAULT '0',
  `EnergyType` int(11) DEFAULT '0',
  `SpellRangeID` int(11) DEFAULT '0',
  `f15` float DEFAULT '0',
  `SpellVisualId` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0' COMMENT 'possibly SpellVisualKitID',
  `SpellIconID` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `Name` text,
  `Rank` text,
  `Description` text,
  `BuffDescription` text,
  `SchoolMask` int(11) DEFAULT '0',
  `SpellRuneCostID` int(11) DEFAULT '0',
  `SpellMissileID` int(11) DEFAULT '0',
  `SpellDescriptionVariablesID` int(11) DEFAULT '0',
  `SpellDifficultyID` int(11) DEFAULT '0',
  `f29` float DEFAULT '0',
  `SpellScalingID` int(11) DEFAULT '0',
  `SpellAuraOptionsID` int(11) DEFAULT '0',
  `SpellAuraRestrictionsID` int(11) DEFAULT '0',
  `SpellCastingRequirementsID` int(11) DEFAULT '0',
  `SpellCategoriesID` int(11) DEFAULT '0',
  `SpellClassOptionsID` int(11) DEFAULT '0',
  `SpellCooldownsID` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  `SpellEquippedItemsID` int(11) DEFAULT '0',
  `SpellInterruptsID` int(11) DEFAULT '0',
  `SpellLevelsID` int(11) DEFAULT '0',
  `SpellPowerID` int(11) DEFAULT '0',
  `SpellReagentsID` int(11) DEFAULT '0',
  `SpellShapeshiftID` int(11) DEFAULT '0',
  `SpellTargetRestrictionsID` int(11) DEFAULT '0',
  `f45` int(11) DEFAULT '0',
  `ResearchProjectID` int(11) DEFAULT '0' COMMENT 'Archeology related',
  PRIMARY KEY (`ID`),
  KEY `SpellScaling` (`SpellScalingID`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellauraoptions`
--

DROP TABLE IF EXISTS `spellauraoptions`;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellauraoptions` (
  `ID` int(11),
  `Stacks` int(11),
  `ProcRate` int(11),
  `ProcCharges` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellaurarestrictions`
--

DROP TABLE IF EXISTS `spellaurarestrictions`;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellaurarestrictions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcastingrequirements`
--

DROP TABLE IF EXISTS `spellcastingrequirements`;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcastingrequirements` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcasttimes`
--

DROP TABLE IF EXISTS `spellcasttimes`;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcasttimes` (
  `ID` int(11),
  `Time` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategories`
--

DROP TABLE IF EXISTS `spellcategories`;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategories` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategory`
--

DROP TABLE IF EXISTS `spellcategory`;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategory` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellclassoptions`
--

DROP TABLE IF EXISTS `spellclassoptions`;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellclassoptions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `SpellClassID` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcooldowns`
--

DROP TABLE IF EXISTS `spellcooldowns`;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcooldowns` (
  `ID` int(11),
  `Spell` int(11),
  `Category` int(11),
  `Global` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spelldescriptionvariables`
--

DROP TABLE IF EXISTS `spelldescriptionvariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelldescriptionvariables` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spelldifficulty`
--

DROP TABLE IF EXISTS `spelldifficulty`;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelldifficulty` (
  `f1` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellduration`
--

DROP TABLE IF EXISTS `spellduration`;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellduration` (
  `ID` int(11),
  `Duration` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelleffect`
--

DROP TABLE IF EXISTS `spelleffect`;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelleffect` (
  `ID` int(11),
  `Aura` int(11),
  `ProcValue` float,
  `Effect` int(11),
  `Period` int(11),
  `Value` int(11),
  `Coefficient` float,
  `f8` float,
  `Targets` int(11),
  `Dice` int(11),
  `ItemID` int(11),
  `f12` int(11),
  `SecondaryEffect` int(11),
  `UsedStat` int(11),
  `ProcChance` float,
  `SpellRadiusID` int(11),
  `f17` int(11),
  `LevelModifier` float,
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `SpellID` int(11),
  `Index` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellequippeditems`
--

DROP TABLE IF EXISTS `spellequippeditems`;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellequippeditems` (
  `ID` int(11),
  `ItemClassID` int(11),
  `InventorySlotMask` int(11),
  `ItemSubClassMask` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyout`
--

DROP TABLE IF EXISTS `spellflyout`;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyout` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyoutitem`
--

DROP TABLE IF EXISTS `spellflyoutitem`;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyoutitem` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellfocusobject`
--

DROP TABLE IF EXISTS `spellfocusobject`;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellfocusobject` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellicon`
--

DROP TABLE IF EXISTS `spellicon`;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellicon` (
  `ID` int(11),
  `Icon` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellinterrupts`
--

DROP TABLE IF EXISTS `spellinterrupts`;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellinterrupts` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellitemenchantment`
--

DROP TABLE IF EXISTS `spellitemenchantment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellitemenchantment` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Value1` int(11) DEFAULT '0',
  `Value2` int(11) DEFAULT '0',
  `Value3` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `Description` text,
  `f16` int(11) DEFAULT '0',
  `EnchantSlot` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `SpellItemEnchantmentConditionID` int(11) DEFAULT '0',
  `RequiredSkillLineID` int(11) DEFAULT '0',
  `RequiredSkillLineLevel` int(11) DEFAULT '0',
  `RequiredCharacterLevel` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellitemenchantmentcondition`
--

DROP TABLE IF EXISTS `spellitemenchantmentcondition`;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellitemenchantmentcondition` (
  `ID` int(11),
  `Color1` tinyint(4),
  `Color2` tinyint(4),
  `Color3` tinyint(4),
  `Color4` tinyint(4),
  `Color5` tinyint(4),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12_1` tinyint(4),
  `f12_2` tinyint(4),
  `f12_3` tinyint(4),
  `Comparator1` tinyint(4),
  `Comparator2` tinyint(4),
  `Comparator3` tinyint(4),
  `Comparator4` tinyint(4),
  `Comparator5` tinyint(4),
  `CompareColor1` tinyint(4),
  `CompareColor2` tinyint(4),
  `CompareColor3` tinyint(4),
  `CompareColor4` tinyint(4),
  `CompareColor5` tinyint(4),
  `f13_1` tinyint(4),
  `f13_2` tinyint(4),
  `Value1` int(11),
  `Value2` int(11),
  `Value3` int(11),
  `Value4` int(11),
  `Value5` int(11),
  `f27` tinyint(4),
  `f28` tinyint(4),
  `f29` tinyint(4),
  `f30` tinyint(4),
  `f31` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelllevels`
--

DROP TABLE IF EXISTS `spelllevels`;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelllevels` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmechanic`
--

DROP TABLE IF EXISTS `spellmechanic`;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmechanic` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissile`
--

DROP TABLE IF EXISTS `spellmissile`;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissile` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` float,
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` float,
  `f13` float,
  `f14` float,
  `f15` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissilemotion`
--

DROP TABLE IF EXISTS `spellmissilemotion`;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissilemotion` (
  `ID` int(11),
  `f2` text,
  `f3` text,
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellpower`
--

DROP TABLE IF EXISTS `spellpower`;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellpower` (
  `ID` int(11),
  `Absolute` int(11),
  `f3` int(11),
  `Percent` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellradius`
--

DROP TABLE IF EXISTS `spellradius`;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellradius` (
  `ID` int(11),
  `Radius` float,
  `f3` int(11),
  `f4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellrange`
--

DROP TABLE IF EXISTS `spellrange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellrange` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `MinimumHostile` float DEFAULT '0',
  `MinimumFriendly` float DEFAULT '0',
  `MaximumHostile` float DEFAULT '0',
  `MaximumFriendly` float DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `InternalName` text,
  `InternalDescription` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellreagents`
--

DROP TABLE IF EXISTS `spellreagents`;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellreagents` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellrunecost`
--

DROP TABLE IF EXISTS `spellrunecost`;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellrunecost` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellscaling`
--

DROP TABLE IF EXISTS `spellscaling`;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellscaling` (
  `ID` int(11),
  `CastTimeStart` int(11),
  `CastTimeEnd` int(11),
  `Intervals` int(11),
  `Distribution` int(11),
  `Coefficient1` float,
  `Coefficient2` float,
  `Coefficient3` float,
  `Dice1` float,
  `Dice2` float,
  `Dice3` float,
  `f12` float,
  `f13` int(11),
  `f14` int(11),
  `f15` float,
  `f16` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshift`
--

DROP TABLE IF EXISTS `spellshapeshift`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshift` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `SpellShapeshiftFormID` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshiftform`
--

DROP TABLE IF EXISTS `spellshapeshiftform`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshiftform` (
  `ID` int(11),
  `f2` int(11),
  `f3` text,
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelltargetrestrictions`
--

DROP TABLE IF EXISTS `spelltargetrestrictions`;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelltargetrestrictions` (
  `ID` int(11),
  `Targets` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellvisual`
--

DROP TABLE IF EXISTS `spellvisual`;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellvisual` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11),
  `f26` int(11),
  `f27` float,
  `f28` int(11),
  `f29` float,
  `f30` float,
  `f31` float,
  `f32` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `talent`
--

DROP TABLE IF EXISTS `talent`;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talent` (
  `ID` int(11),
  `TalentTabID` int(11),
  `Row` int(11),
  `Col` int(11),
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `RequiredTalentID1` int(11),
  `RequiredTalentID2` int(11),
  `RequiredTalentID3` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `PetMask0` int(11),
  `PetMask1` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `talenttab`
--

DROP TABLE IF EXISTS `talenttab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talenttab` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `SpellIconID` int(11) DEFAULT '0',
  `ClassMask` int(11) DEFAULT '0',
  `PetMask` int(11) DEFAULT '0',
  `Index` int(11) DEFAULT '0',
  `InternalName` text,
  `Description` text,
  `TypeMask` int(11) DEFAULT '0' COMMENT '0 none\n1 n.a.\n2 Protection\n4 Healing\n8 Damage',
  `MasterySpellID1` int(11) DEFAULT NULL,
  `MasterySpellID2` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Class` (`ClassMask`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `talenttreeprimaryspells`
--

DROP TABLE IF EXISTS `talenttreeprimaryspells`;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talenttreeprimaryspells` (
  `ID` int(11),
  `TalentTabID` int(11),
  `SpellID` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `chardev_cataclysm_fr`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chardev_cataclysm_fr` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chardev_cataclysm_fr`;

--
-- Table structure for table `chardev_chrclass_cache`
--

DROP TABLE IF EXISTS `chardev_chrclass_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_chrclass_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_item_cache`
--

DROP TABLE IF EXISTS `chardev_item_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_item_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spell_cache`
--

DROP TABLE IF EXISTS `chardev_spell_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spell_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spellitemenchantment_cache`
--

DROP TABLE IF EXISTS `chardev_spellitemenchantment_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spellitemenchantment_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_talents_cache`
--

DROP TABLE IF EXISTS `chardev_talents_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_talents_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrclasses`
--

DROP TABLE IF EXISTS `chrclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrclasses` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` text,
  `Name` text,
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrraces`
--

DROP TABLE IF EXISTS `chrraces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrraces` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `Abbreviation` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `NameInternal` text,
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `Name` text,
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` text,
  `f19` text,
  `f20` text,
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faction`
--

DROP TABLE IF EXISTS `faction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faction` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `f20` float DEFAULT '0',
  `f21` float DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f26` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `gemproperties`
--

DROP TABLE IF EXISTS `gemproperties`;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gemproperties` (
  `ID` int(11),
  `SpellItemEnchantmentID` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `MinItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `glyphproperties`
--

DROP TABLE IF EXISTS `glyphproperties`;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `glyphproperties` (
  `ID` int(11),
  `SpellID` int(11),
  `Type` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecrit`
--

DROP TABLE IF EXISTS `gtchancetomeleecrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecritbase`
--

DROP TABLE IF EXISTS `gtchancetomeleecritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcrit`
--

DROP TABLE IF EXISTS `gtchancetospellcrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcritbase`
--

DROP TABLE IF EXISTS `gtchancetospellcritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtcombatratings`
--

DROP TABLE IF EXISTS `gtcombatratings`;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtcombatratings` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenhp`
--

DROP TABLE IF EXISTS `gtoctregenhp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenhp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenmp`
--

DROP TABLE IF EXISTS `gtoctregenmp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenmp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenhpperspt`
--

DROP TABLE IF EXISTS `gtregenhpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenhpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenmpperspt`
--

DROP TABLE IF EXISTS `gtregenmpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenmpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtspellscaling`
--

DROP TABLE IF EXISTS `gtspellscaling`;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtspellscaling` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item`
--

DROP TABLE IF EXISTS `item`;
/*!50001 DROP VIEW IF EXISTS `item`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item` (
  `ID` int(11),
  `ItemClass` int(11),
  `ItemSubClass` int(11),
  `f4` int(11),
  `f5` int(11),
  `ItemDisplayInfoID` int(11),
  `InventorySlot` int(11),
  `f8` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item_sparse`
--

DROP TABLE IF EXISTS `item_sparse`;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item_sparse` (
  `ID` int(11),
  `Quality` int(11),
  `TypeMask` int(11),
  `TypeMask2` int(11),
  `TypeMask3` int(11),
  `TypeMask4` int(11),
  `TypeMask5` int(11),
  `BuyPrice` int(11),
  `SellPrice` int(11),
  `InventorySlot` int(11),
  `ChrClassMask` int(11),
  `ChrRaceMask` int(11),
  `Level` int(11),
  `RequiredCharacterLevel` int(11),
  `RequiredSkillLineID` int(11),
  `RequiredSkillLineLevel` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `RequiredFactionID` int(11),
  `RequiredFactionReputation` int(11),
  `Unique` int(11),
  `MaximumStackSize` int(11),
  `f21` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `StatValue1` int(11),
  `StatValue2` int(11),
  `StatValue3` int(11),
  `StatValue4` int(11),
  `StatValue5` int(11),
  `StatValue6` int(11),
  `StatValue7` int(11),
  `StatValue8` int(11),
  `StatValue9` int(11),
  `StatValue10` int(11),
  `f42` int(11),
  `f43` int(11),
  `f44` int(11),
  `f45` int(11),
  `f46` int(11),
  `f47` int(11),
  `f48` int(11),
  `f49` int(11),
  `f50` int(11),
  `f51` int(11),
  `f52` int(11),
  `f53` int(11),
  `f54` int(11),
  `f55` int(11),
  `f56` int(11),
  `f57` int(11),
  `f58` int(11),
  `f59` int(11),
  `f60` int(11),
  `f61` int(11),
  `ScalingStatDistributionID` int(11),
  `f63` int(11),
  `Delay` int(11),
  `f65` float,
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `SpellTrigger1` int(11),
  `SpellTrigger2` int(11),
  `SpellTrigger3` int(11),
  `SpellTrigger4` int(11),
  `SpellTrigger5` int(11),
  `SpellCharges1` int(11),
  `SpellCharges2` int(11),
  `SpellCharges3` int(11),
  `SpellCharges4` int(11),
  `SpellCharges5` int(11),
  `SpellCooldown1` int(11),
  `SpellCooldown2` int(11),
  `SpellCooldown3` int(11),
  `SpellCooldown4` int(11),
  `SpellCooldown5` int(11),
  `SpellCategoryID1` int(11),
  `SpellCategoryID2` int(11),
  `SpellCategoryID3` int(11),
  `SpellCategoryID4` int(11),
  `SpellCategoryID5` int(11),
  `SpellCategoryCooldown1` int(11),
  `SpellCategoryCooldown2` int(11),
  `SpellCategoryCooldown3` int(11),
  `SpellCategoryCooldown4` int(11),
  `SpellCategoryCooldown5` int(11),
  `Binds` int(11),
  `Name` text,
  `f98` int(11),
  `f99` int(11),
  `f100` int(11),
  `Description` text,
  `QuestID` int(11),
  `f103` int(11),
  `f104` int(11),
  `f105` int(11),
  `f106` int(11),
  `f107` int(11),
  `f108` int(11),
  `RandomPropertiesID` int(11),
  `RandomSuffixID` int(11),
  `ItemSetID` int(11),
  `f113` int(11),
  `f114` int(11),
  `f115` int(11),
  `f116` int(11),
  `SocketColor1` int(11),
  `SocketColor2` int(11),
  `SocketColor3` int(11),
  `f120` int(11),
  `f121` int(11),
  `f122` int(11),
  `SocketBonusID` int(11),
  `GemPropertiesID` int(11),
  `f125` float,
  `f126` int(11),
  `LimitCategory` int(11),
  `f128` int(11),
  `DamageRange` float,
  `LimitCategoryMultiple` int(11),
  `f131` int(11),
  `Version` int(11),
  `Locale` varchar(2)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorquality`
--

DROP TABLE IF EXISTS `itemarmorquality`;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorquality` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorshield`
--

DROP TABLE IF EXISTS `itemarmorshield`;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorshield` (
  `ID` int(11),
  `ItemLevel` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmortotal`
--

DROP TABLE IF EXISTS `itemarmortotal`;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmortotal` (
  `ID` int(11),
  `ItemLevel` int(11),
  `1` float,
  `2` float,
  `3` float,
  `4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemclass`
--

DROP TABLE IF EXISTS `itemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` float DEFAULT NULL COMMENT 'Added 4.3',
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamageammo`
--

DROP TABLE IF EXISTS `itemdamageammo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamageammo` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` float DEFAULT '0',
  `f4` float DEFAULT '0',
  `f5` float DEFAULT '0',
  `f6` float DEFAULT '0',
  `f7` float DEFAULT '0',
  `f8` float DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemdamageonehand`
--

DROP TABLE IF EXISTS `itemdamageonehand`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageonehandcaster`
--

DROP TABLE IF EXISTS `itemdamageonehandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageranged`
--

DROP TABLE IF EXISTS `itemdamageranged`;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageranged` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagethrown`
--

DROP TABLE IF EXISTS `itemdamagethrown`;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagethrown` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohand`
--

DROP TABLE IF EXISTS `itemdamagetwohand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohandcaster`
--

DROP TABLE IF EXISTS `itemdamagetwohandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagewand`
--

DROP TABLE IF EXISTS `itemdamagewand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagewand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdisplayinfo`
--

DROP TABLE IF EXISTS `itemdisplayinfo`;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdisplayinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `Icon` text,
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemrandomproperties`
--

DROP TABLE IF EXISTS `itemrandomproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomproperties` (
  `ID` int(11) NOT NULL,
  `InternalName` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemrandomsuffix`
--

DROP TABLE IF EXISTS `itemrandomsuffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomsuffix` (
  `ID` int(11) NOT NULL,
  `Name` text,
  `InternalDescription` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Coefficient1` int(11) DEFAULT NULL,
  `Coefficient2` int(11) DEFAULT NULL,
  `Coefficient3` int(11) DEFAULT NULL,
  `Coefficient4` int(11) DEFAULT NULL,
  `Coefficient5` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemreforge`
--

DROP TABLE IF EXISTS `itemreforge`;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemreforge` (
  `ID` int(11),
  `f2` int(11),
  `f3` float,
  `f4` int(11),
  `f5` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemset`
--

DROP TABLE IF EXISTS `itemset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemset` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `ItemID1` int(11) DEFAULT '0',
  `ItemID2` int(11) DEFAULT '0',
  `ItemID3` int(11) DEFAULT '0',
  `ItemID4` int(11) DEFAULT '0',
  `ItemID5` int(11) DEFAULT '0',
  `ItemID6` int(11) DEFAULT '0',
  `ItemID7` int(11) DEFAULT '0',
  `ItemID8` int(11) DEFAULT '0',
  `ItemID9` int(11) DEFAULT '0',
  `ItemID10` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `SpellID4` int(11) DEFAULT '0',
  `SpellID5` int(11) DEFAULT '0',
  `SpellID6` int(11) DEFAULT '0',
  `SpellID7` int(11) DEFAULT '0',
  `SpellID8` int(11) DEFAULT '0',
  `required1` int(11) DEFAULT '0',
  `required2` int(11) DEFAULT '0',
  `required3` int(11) DEFAULT '0',
  `required4` int(11) DEFAULT '0',
  `required5` int(11) DEFAULT '0',
  `required6` int(11) DEFAULT '0',
  `required7` int(11) DEFAULT '0',
  `required8` int(11) DEFAULT '0',
  `f36` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemsubclass`
--

DROP TABLE IF EXISTS `itemsubclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemsubclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemClass` int(11) DEFAULT '0',
  `ItemSubClass` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `Name` text,
  `NameLong` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `randproppoints`
--

DROP TABLE IF EXISTS `randproppoints`;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `randproppoints` (
  `ID` int(11),
  `PointsQuality4Group0` int(11),
  `PointsQuality4Group1` int(11),
  `PointsQuality4Group2` int(11),
  `PointsQuality4Group3` int(11),
  `PointsQuality4Group4` int(11),
  `PointsQuality3Group0` int(11),
  `PointsQuality3Group1` int(11),
  `PointsQuality3Group2` int(11),
  `PointsQuality3Group3` int(11),
  `PointsQuality3Group4` int(11),
  `PointsQuality2Group0` int(11),
  `PointsQuality2Group1` int(11),
  `PointsQuality2Group2` int(11),
  `PointsQuality2Group3` int(11),
  `PointsQuality2Group4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatdistribution`
--

DROP TABLE IF EXISTS `scalingstatdistribution`;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatdistribution` (
  `id` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `Coefficient1` int(11),
  `Coefficient2` int(11),
  `Coefficient3` int(11),
  `Coefficient4` int(11),
  `Coefficient5` int(11),
  `Coefficient6` int(11),
  `Coefficient7` int(11),
  `Coefficient8` int(11),
  `Coefficient9` int(11),
  `Coefficient10` int(11),
  `MinLevel` int(11),
  `MaxLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatvalues`
--

DROP TABLE IF EXISTS `scalingstatvalues`;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatvalues` (
  `id` int(11),
  `level` int(11),
  `dist0` int(11),
  `dist1` int(11),
  `dist2` int(11),
  `dist3` int(11),
  `dist4` int(11),
  `dist5` int(11),
  `dist6` int(11),
  `dist7` int(11),
  `dist8` int(11),
  `dist9` int(11),
  `dist10` int(11),
  `dist11` int(11),
  `dist12` int(11),
  `dist13` int(11),
  `dist14` int(11),
  `dist15` int(11),
  `dist16` int(11),
  `dist17` int(11),
  `dist18` int(11),
  `dist19` int(11),
  `dist20` int(11),
  `dist21` int(11),
  `dist22` int(11),
  `dist23` int(11),
  `dist24` int(11),
  `dist25` int(11),
  `dist26` int(11),
  `dist27` int(11),
  `dist28` int(11),
  `dist29` int(11),
  `dist30` int(11),
  `dist31` int(11),
  `dist32` int(11),
  `dist33` int(11),
  `dist34` int(11),
  `dist35` int(11),
  `dist36` int(11),
  `dist37` int(11),
  `dist38` int(11),
  `dist39` int(11),
  `dist40` int(11),
  `dist41` int(11),
  `dist42` int(11),
  `dist43` int(11),
  `dist44` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `skillline`
--

DROP TABLE IF EXISTS `skillline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skillline` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Category` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `skilllineability`
--

DROP TABLE IF EXISTS `skilllineability`;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skilllineability` (
  `ID` int(11),
  `SkillLineID` int(11),
  `SpellID` int(11),
  `RaceMask` int(11),
  `ClassMask` int(11),
  `f6` int(11),
  `f7` int(11),
  `RequiredSkill` int(11),
  `ReplaceSpellID` int(11),
  `f10` int(11),
  `Grey` int(11),
  `Yellow` int(11),
  `f13` int(11),
  `f14` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `skillraceclassinfo`
--

DROP TABLE IF EXISTS `skillraceclassinfo`;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skillraceclassinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spell`
--

DROP TABLE IF EXISTS `spell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spell` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Type0` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Type4` int(11) DEFAULT '0',
  `Type5` int(11) DEFAULT '0',
  `Type6` int(11) DEFAULT '0',
  `Type7` int(11) DEFAULT '0',
  `Type8` int(11) DEFAULT '0',
  `Type9` int(11) DEFAULT '0',
  `Type10` int(11) DEFAULT '0' COMMENT '4.2',
  `SpellCastTimesID` int(11) DEFAULT '0',
  `SpellDurationID` int(11) DEFAULT '0',
  `EnergyType` int(11) DEFAULT '0',
  `SpellRangeID` int(11) DEFAULT '0',
  `f15` float DEFAULT '0',
  `SpellVisualId` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0' COMMENT 'possibly SpellVisualKitID',
  `SpellIconID` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `Name` text,
  `Rank` text,
  `Description` text,
  `BuffDescription` text,
  `SchoolMask` int(11) DEFAULT '0',
  `SpellRuneCostID` int(11) DEFAULT '0',
  `SpellMissileID` int(11) DEFAULT '0',
  `SpellDescriptionVariablesID` int(11) DEFAULT '0',
  `SpellDifficultyID` int(11) DEFAULT '0',
  `f29` float DEFAULT '0',
  `SpellScalingID` int(11) DEFAULT '0',
  `SpellAuraOptionsID` int(11) DEFAULT '0',
  `SpellAuraRestrictionsID` int(11) DEFAULT '0',
  `SpellCastingRequirementsID` int(11) DEFAULT '0',
  `SpellCategoriesID` int(11) DEFAULT '0',
  `SpellClassOptionsID` int(11) DEFAULT '0',
  `SpellCooldownsID` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  `SpellEquippedItemsID` int(11) DEFAULT '0',
  `SpellInterruptsID` int(11) DEFAULT '0',
  `SpellLevelsID` int(11) DEFAULT '0',
  `SpellPowerID` int(11) DEFAULT '0',
  `SpellReagentsID` int(11) DEFAULT '0',
  `SpellShapeshiftID` int(11) DEFAULT '0',
  `SpellTargetRestrictionsID` int(11) DEFAULT '0',
  `f45` int(11) DEFAULT '0',
  `ResearchProjectID` int(11) DEFAULT '0' COMMENT 'Archeology related',
  PRIMARY KEY (`ID`),
  KEY `SpellScaling` (`SpellScalingID`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellauraoptions`
--

DROP TABLE IF EXISTS `spellauraoptions`;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellauraoptions` (
  `ID` int(11),
  `Stacks` int(11),
  `ProcRate` int(11),
  `ProcCharges` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellaurarestrictions`
--

DROP TABLE IF EXISTS `spellaurarestrictions`;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellaurarestrictions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcastingrequirements`
--

DROP TABLE IF EXISTS `spellcastingrequirements`;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcastingrequirements` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcasttimes`
--

DROP TABLE IF EXISTS `spellcasttimes`;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcasttimes` (
  `ID` int(11),
  `Time` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategories`
--

DROP TABLE IF EXISTS `spellcategories`;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategories` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategory`
--

DROP TABLE IF EXISTS `spellcategory`;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategory` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellclassoptions`
--

DROP TABLE IF EXISTS `spellclassoptions`;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellclassoptions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `SpellClassID` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcooldowns`
--

DROP TABLE IF EXISTS `spellcooldowns`;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcooldowns` (
  `ID` int(11),
  `Spell` int(11),
  `Category` int(11),
  `Global` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spelldescriptionvariables`
--

DROP TABLE IF EXISTS `spelldescriptionvariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelldescriptionvariables` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spelldifficulty`
--

DROP TABLE IF EXISTS `spelldifficulty`;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelldifficulty` (
  `f1` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellduration`
--

DROP TABLE IF EXISTS `spellduration`;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellduration` (
  `ID` int(11),
  `Duration` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelleffect`
--

DROP TABLE IF EXISTS `spelleffect`;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelleffect` (
  `ID` int(11),
  `Aura` int(11),
  `ProcValue` float,
  `Effect` int(11),
  `Period` int(11),
  `Value` int(11),
  `Coefficient` float,
  `f8` float,
  `Targets` int(11),
  `Dice` int(11),
  `ItemID` int(11),
  `f12` int(11),
  `SecondaryEffect` int(11),
  `UsedStat` int(11),
  `ProcChance` float,
  `SpellRadiusID` int(11),
  `f17` int(11),
  `LevelModifier` float,
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `SpellID` int(11),
  `Index` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellequippeditems`
--

DROP TABLE IF EXISTS `spellequippeditems`;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellequippeditems` (
  `ID` int(11),
  `ItemClassID` int(11),
  `InventorySlotMask` int(11),
  `ItemSubClassMask` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyout`
--

DROP TABLE IF EXISTS `spellflyout`;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyout` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyoutitem`
--

DROP TABLE IF EXISTS `spellflyoutitem`;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyoutitem` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellfocusobject`
--

DROP TABLE IF EXISTS `spellfocusobject`;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellfocusobject` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellicon`
--

DROP TABLE IF EXISTS `spellicon`;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellicon` (
  `ID` int(11),
  `Icon` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellinterrupts`
--

DROP TABLE IF EXISTS `spellinterrupts`;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellinterrupts` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellitemenchantment`
--

DROP TABLE IF EXISTS `spellitemenchantment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellitemenchantment` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Value1` int(11) DEFAULT '0',
  `Value2` int(11) DEFAULT '0',
  `Value3` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `Description` text,
  `f16` int(11) DEFAULT '0',
  `EnchantSlot` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `SpellItemEnchantmentConditionID` int(11) DEFAULT '0',
  `RequiredSkillLineID` int(11) DEFAULT '0',
  `RequiredSkillLineLevel` int(11) DEFAULT '0',
  `RequiredCharacterLevel` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellitemenchantmentcondition`
--

DROP TABLE IF EXISTS `spellitemenchantmentcondition`;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellitemenchantmentcondition` (
  `ID` int(11),
  `Color1` tinyint(4),
  `Color2` tinyint(4),
  `Color3` tinyint(4),
  `Color4` tinyint(4),
  `Color5` tinyint(4),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12_1` tinyint(4),
  `f12_2` tinyint(4),
  `f12_3` tinyint(4),
  `Comparator1` tinyint(4),
  `Comparator2` tinyint(4),
  `Comparator3` tinyint(4),
  `Comparator4` tinyint(4),
  `Comparator5` tinyint(4),
  `CompareColor1` tinyint(4),
  `CompareColor2` tinyint(4),
  `CompareColor3` tinyint(4),
  `CompareColor4` tinyint(4),
  `CompareColor5` tinyint(4),
  `f13_1` tinyint(4),
  `f13_2` tinyint(4),
  `Value1` int(11),
  `Value2` int(11),
  `Value3` int(11),
  `Value4` int(11),
  `Value5` int(11),
  `f27` tinyint(4),
  `f28` tinyint(4),
  `f29` tinyint(4),
  `f30` tinyint(4),
  `f31` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelllevels`
--

DROP TABLE IF EXISTS `spelllevels`;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelllevels` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmechanic`
--

DROP TABLE IF EXISTS `spellmechanic`;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmechanic` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissile`
--

DROP TABLE IF EXISTS `spellmissile`;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissile` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` float,
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` float,
  `f13` float,
  `f14` float,
  `f15` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissilemotion`
--

DROP TABLE IF EXISTS `spellmissilemotion`;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissilemotion` (
  `ID` int(11),
  `f2` text,
  `f3` text,
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellpower`
--

DROP TABLE IF EXISTS `spellpower`;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellpower` (
  `ID` int(11),
  `Absolute` int(11),
  `f3` int(11),
  `Percent` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellradius`
--

DROP TABLE IF EXISTS `spellradius`;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellradius` (
  `ID` int(11),
  `Radius` float,
  `f3` int(11),
  `f4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellrange`
--

DROP TABLE IF EXISTS `spellrange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellrange` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `MinimumHostile` float DEFAULT '0',
  `MinimumFriendly` float DEFAULT '0',
  `MaximumHostile` float DEFAULT '0',
  `MaximumFriendly` float DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `InternalName` text,
  `InternalDescription` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellreagents`
--

DROP TABLE IF EXISTS `spellreagents`;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellreagents` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellrunecost`
--

DROP TABLE IF EXISTS `spellrunecost`;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellrunecost` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellscaling`
--

DROP TABLE IF EXISTS `spellscaling`;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellscaling` (
  `ID` int(11),
  `CastTimeStart` int(11),
  `CastTimeEnd` int(11),
  `Intervals` int(11),
  `Distribution` int(11),
  `Coefficient1` float,
  `Coefficient2` float,
  `Coefficient3` float,
  `Dice1` float,
  `Dice2` float,
  `Dice3` float,
  `f12` float,
  `f13` int(11),
  `f14` int(11),
  `f15` float,
  `f16` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshift`
--

DROP TABLE IF EXISTS `spellshapeshift`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshift` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `SpellShapeshiftFormID` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshiftform`
--

DROP TABLE IF EXISTS `spellshapeshiftform`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshiftform` (
  `ID` int(11),
  `f2` int(11),
  `f3` text,
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelltargetrestrictions`
--

DROP TABLE IF EXISTS `spelltargetrestrictions`;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelltargetrestrictions` (
  `ID` int(11),
  `Targets` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellvisual`
--

DROP TABLE IF EXISTS `spellvisual`;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellvisual` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11),
  `f26` int(11),
  `f27` float,
  `f28` int(11),
  `f29` float,
  `f30` float,
  `f31` float,
  `f32` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `talent`
--

DROP TABLE IF EXISTS `talent`;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talent` (
  `ID` int(11),
  `TalentTabID` int(11),
  `Row` int(11),
  `Col` int(11),
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `RequiredTalentID1` int(11),
  `RequiredTalentID2` int(11),
  `RequiredTalentID3` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `PetMask0` int(11),
  `PetMask1` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `talenttab`
--

DROP TABLE IF EXISTS `talenttab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talenttab` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `SpellIconID` int(11) DEFAULT '0',
  `ClassMask` int(11) DEFAULT '0',
  `PetMask` int(11) DEFAULT '0',
  `Index` int(11) DEFAULT '0',
  `InternalName` text,
  `Description` text,
  `TypeMask` int(11) DEFAULT '0' COMMENT '0 none\n1 n.a.\n2 Protection\n4 Healing\n8 Damage',
  `MasterySpellID1` int(11) DEFAULT NULL,
  `MasterySpellID2` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Class` (`ClassMask`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `talenttreeprimaryspells`
--

DROP TABLE IF EXISTS `talenttreeprimaryspells`;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talenttreeprimaryspells` (
  `ID` int(11),
  `TalentTabID` int(11),
  `SpellID` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `chardev_cataclysm_es`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chardev_cataclysm_es` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chardev_cataclysm_es`;

--
-- Table structure for table `chardev_chrclass_cache`
--

DROP TABLE IF EXISTS `chardev_chrclass_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_chrclass_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_item_cache`
--

DROP TABLE IF EXISTS `chardev_item_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_item_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spell_cache`
--

DROP TABLE IF EXISTS `chardev_spell_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spell_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spellitemenchantment_cache`
--

DROP TABLE IF EXISTS `chardev_spellitemenchantment_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spellitemenchantment_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_talents_cache`
--

DROP TABLE IF EXISTS `chardev_talents_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_talents_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrclasses`
--

DROP TABLE IF EXISTS `chrclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrclasses` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` text,
  `Name` text,
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrraces`
--

DROP TABLE IF EXISTS `chrraces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrraces` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `Abbreviation` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `NameInternal` text,
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `Name` text,
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` text,
  `f19` text,
  `f20` text,
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faction`
--

DROP TABLE IF EXISTS `faction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faction` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `f20` float DEFAULT '0',
  `f21` float DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f26` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `gemproperties`
--

DROP TABLE IF EXISTS `gemproperties`;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gemproperties` (
  `ID` int(11),
  `SpellItemEnchantmentID` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `MinItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `glyphproperties`
--

DROP TABLE IF EXISTS `glyphproperties`;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `glyphproperties` (
  `ID` int(11),
  `SpellID` int(11),
  `Type` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecrit`
--

DROP TABLE IF EXISTS `gtchancetomeleecrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecritbase`
--

DROP TABLE IF EXISTS `gtchancetomeleecritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcrit`
--

DROP TABLE IF EXISTS `gtchancetospellcrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcritbase`
--

DROP TABLE IF EXISTS `gtchancetospellcritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtcombatratings`
--

DROP TABLE IF EXISTS `gtcombatratings`;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtcombatratings` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenhp`
--

DROP TABLE IF EXISTS `gtoctregenhp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenhp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenmp`
--

DROP TABLE IF EXISTS `gtoctregenmp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenmp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenhpperspt`
--

DROP TABLE IF EXISTS `gtregenhpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenhpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenmpperspt`
--

DROP TABLE IF EXISTS `gtregenmpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenmpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtspellscaling`
--

DROP TABLE IF EXISTS `gtspellscaling`;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtspellscaling` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item`
--

DROP TABLE IF EXISTS `item`;
/*!50001 DROP VIEW IF EXISTS `item`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item` (
  `ID` int(11),
  `ItemClass` int(11),
  `ItemSubClass` int(11),
  `f4` int(11),
  `f5` int(11),
  `ItemDisplayInfoID` int(11),
  `InventorySlot` int(11),
  `f8` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item_sparse`
--

DROP TABLE IF EXISTS `item_sparse`;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item_sparse` (
  `ID` int(11),
  `Quality` int(11),
  `TypeMask` int(11),
  `TypeMask2` int(11),
  `TypeMask3` int(11),
  `TypeMask4` int(11),
  `TypeMask5` int(11),
  `BuyPrice` int(11),
  `SellPrice` int(11),
  `InventorySlot` int(11),
  `ChrClassMask` int(11),
  `ChrRaceMask` int(11),
  `Level` int(11),
  `RequiredCharacterLevel` int(11),
  `RequiredSkillLineID` int(11),
  `RequiredSkillLineLevel` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `RequiredFactionID` int(11),
  `RequiredFactionReputation` int(11),
  `Unique` int(11),
  `MaximumStackSize` int(11),
  `f21` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `StatValue1` int(11),
  `StatValue2` int(11),
  `StatValue3` int(11),
  `StatValue4` int(11),
  `StatValue5` int(11),
  `StatValue6` int(11),
  `StatValue7` int(11),
  `StatValue8` int(11),
  `StatValue9` int(11),
  `StatValue10` int(11),
  `f42` int(11),
  `f43` int(11),
  `f44` int(11),
  `f45` int(11),
  `f46` int(11),
  `f47` int(11),
  `f48` int(11),
  `f49` int(11),
  `f50` int(11),
  `f51` int(11),
  `f52` int(11),
  `f53` int(11),
  `f54` int(11),
  `f55` int(11),
  `f56` int(11),
  `f57` int(11),
  `f58` int(11),
  `f59` int(11),
  `f60` int(11),
  `f61` int(11),
  `ScalingStatDistributionID` int(11),
  `f63` int(11),
  `Delay` int(11),
  `f65` float,
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `SpellTrigger1` int(11),
  `SpellTrigger2` int(11),
  `SpellTrigger3` int(11),
  `SpellTrigger4` int(11),
  `SpellTrigger5` int(11),
  `SpellCharges1` int(11),
  `SpellCharges2` int(11),
  `SpellCharges3` int(11),
  `SpellCharges4` int(11),
  `SpellCharges5` int(11),
  `SpellCooldown1` int(11),
  `SpellCooldown2` int(11),
  `SpellCooldown3` int(11),
  `SpellCooldown4` int(11),
  `SpellCooldown5` int(11),
  `SpellCategoryID1` int(11),
  `SpellCategoryID2` int(11),
  `SpellCategoryID3` int(11),
  `SpellCategoryID4` int(11),
  `SpellCategoryID5` int(11),
  `SpellCategoryCooldown1` int(11),
  `SpellCategoryCooldown2` int(11),
  `SpellCategoryCooldown3` int(11),
  `SpellCategoryCooldown4` int(11),
  `SpellCategoryCooldown5` int(11),
  `Binds` int(11),
  `Name` text,
  `f98` int(11),
  `f99` int(11),
  `f100` int(11),
  `Description` text,
  `QuestID` int(11),
  `f103` int(11),
  `f104` int(11),
  `f105` int(11),
  `f106` int(11),
  `f107` int(11),
  `f108` int(11),
  `RandomPropertiesID` int(11),
  `RandomSuffixID` int(11),
  `ItemSetID` int(11),
  `f113` int(11),
  `f114` int(11),
  `f115` int(11),
  `f116` int(11),
  `SocketColor1` int(11),
  `SocketColor2` int(11),
  `SocketColor3` int(11),
  `f120` int(11),
  `f121` int(11),
  `f122` int(11),
  `SocketBonusID` int(11),
  `GemPropertiesID` int(11),
  `f125` float,
  `f126` int(11),
  `LimitCategory` int(11),
  `f128` int(11),
  `DamageRange` float,
  `LimitCategoryMultiple` int(11),
  `f131` int(11),
  `Version` int(11),
  `Locale` varchar(2)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorquality`
--

DROP TABLE IF EXISTS `itemarmorquality`;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorquality` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorshield`
--

DROP TABLE IF EXISTS `itemarmorshield`;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorshield` (
  `ID` int(11),
  `ItemLevel` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmortotal`
--

DROP TABLE IF EXISTS `itemarmortotal`;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmortotal` (
  `ID` int(11),
  `ItemLevel` int(11),
  `1` float,
  `2` float,
  `3` float,
  `4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemclass`
--

DROP TABLE IF EXISTS `itemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` float DEFAULT NULL COMMENT 'Added 4.3',
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamageammo`
--

DROP TABLE IF EXISTS `itemdamageammo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamageammo` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` float DEFAULT '0',
  `f4` float DEFAULT '0',
  `f5` float DEFAULT '0',
  `f6` float DEFAULT '0',
  `f7` float DEFAULT '0',
  `f8` float DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemdamageonehand`
--

DROP TABLE IF EXISTS `itemdamageonehand`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageonehandcaster`
--

DROP TABLE IF EXISTS `itemdamageonehandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageranged`
--

DROP TABLE IF EXISTS `itemdamageranged`;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageranged` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagethrown`
--

DROP TABLE IF EXISTS `itemdamagethrown`;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagethrown` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohand`
--

DROP TABLE IF EXISTS `itemdamagetwohand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohandcaster`
--

DROP TABLE IF EXISTS `itemdamagetwohandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagewand`
--

DROP TABLE IF EXISTS `itemdamagewand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagewand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdisplayinfo`
--

DROP TABLE IF EXISTS `itemdisplayinfo`;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdisplayinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `Icon` text,
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemrandomproperties`
--

DROP TABLE IF EXISTS `itemrandomproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomproperties` (
  `ID` int(11) NOT NULL,
  `InternalName` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemrandomsuffix`
--

DROP TABLE IF EXISTS `itemrandomsuffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomsuffix` (
  `ID` int(11) NOT NULL,
  `Name` text,
  `InternalDescription` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Coefficient1` int(11) DEFAULT NULL,
  `Coefficient2` int(11) DEFAULT NULL,
  `Coefficient3` int(11) DEFAULT NULL,
  `Coefficient4` int(11) DEFAULT NULL,
  `Coefficient5` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemreforge`
--

DROP TABLE IF EXISTS `itemreforge`;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemreforge` (
  `ID` int(11),
  `f2` int(11),
  `f3` float,
  `f4` int(11),
  `f5` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemset`
--

DROP TABLE IF EXISTS `itemset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemset` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `ItemID1` int(11) DEFAULT '0',
  `ItemID2` int(11) DEFAULT '0',
  `ItemID3` int(11) DEFAULT '0',
  `ItemID4` int(11) DEFAULT '0',
  `ItemID5` int(11) DEFAULT '0',
  `ItemID6` int(11) DEFAULT '0',
  `ItemID7` int(11) DEFAULT '0',
  `ItemID8` int(11) DEFAULT '0',
  `ItemID9` int(11) DEFAULT '0',
  `ItemID10` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `SpellID4` int(11) DEFAULT '0',
  `SpellID5` int(11) DEFAULT '0',
  `SpellID6` int(11) DEFAULT '0',
  `SpellID7` int(11) DEFAULT '0',
  `SpellID8` int(11) DEFAULT '0',
  `required1` int(11) DEFAULT '0',
  `required2` int(11) DEFAULT '0',
  `required3` int(11) DEFAULT '0',
  `required4` int(11) DEFAULT '0',
  `required5` int(11) DEFAULT '0',
  `required6` int(11) DEFAULT '0',
  `required7` int(11) DEFAULT '0',
  `required8` int(11) DEFAULT '0',
  `f36` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemsubclass`
--

DROP TABLE IF EXISTS `itemsubclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemsubclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemClass` int(11) DEFAULT '0',
  `ItemSubClass` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `Name` text,
  `NameLong` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `randproppoints`
--

DROP TABLE IF EXISTS `randproppoints`;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `randproppoints` (
  `ID` int(11),
  `PointsQuality4Group0` int(11),
  `PointsQuality4Group1` int(11),
  `PointsQuality4Group2` int(11),
  `PointsQuality4Group3` int(11),
  `PointsQuality4Group4` int(11),
  `PointsQuality3Group0` int(11),
  `PointsQuality3Group1` int(11),
  `PointsQuality3Group2` int(11),
  `PointsQuality3Group3` int(11),
  `PointsQuality3Group4` int(11),
  `PointsQuality2Group0` int(11),
  `PointsQuality2Group1` int(11),
  `PointsQuality2Group2` int(11),
  `PointsQuality2Group3` int(11),
  `PointsQuality2Group4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatdistribution`
--

DROP TABLE IF EXISTS `scalingstatdistribution`;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatdistribution` (
  `id` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `Coefficient1` int(11),
  `Coefficient2` int(11),
  `Coefficient3` int(11),
  `Coefficient4` int(11),
  `Coefficient5` int(11),
  `Coefficient6` int(11),
  `Coefficient7` int(11),
  `Coefficient8` int(11),
  `Coefficient9` int(11),
  `Coefficient10` int(11),
  `MinLevel` int(11),
  `MaxLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatvalues`
--

DROP TABLE IF EXISTS `scalingstatvalues`;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatvalues` (
  `id` int(11),
  `level` int(11),
  `dist0` int(11),
  `dist1` int(11),
  `dist2` int(11),
  `dist3` int(11),
  `dist4` int(11),
  `dist5` int(11),
  `dist6` int(11),
  `dist7` int(11),
  `dist8` int(11),
  `dist9` int(11),
  `dist10` int(11),
  `dist11` int(11),
  `dist12` int(11),
  `dist13` int(11),
  `dist14` int(11),
  `dist15` int(11),
  `dist16` int(11),
  `dist17` int(11),
  `dist18` int(11),
  `dist19` int(11),
  `dist20` int(11),
  `dist21` int(11),
  `dist22` int(11),
  `dist23` int(11),
  `dist24` int(11),
  `dist25` int(11),
  `dist26` int(11),
  `dist27` int(11),
  `dist28` int(11),
  `dist29` int(11),
  `dist30` int(11),
  `dist31` int(11),
  `dist32` int(11),
  `dist33` int(11),
  `dist34` int(11),
  `dist35` int(11),
  `dist36` int(11),
  `dist37` int(11),
  `dist38` int(11),
  `dist39` int(11),
  `dist40` int(11),
  `dist41` int(11),
  `dist42` int(11),
  `dist43` int(11),
  `dist44` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `skillline`
--

DROP TABLE IF EXISTS `skillline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skillline` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Category` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `skilllineability`
--

DROP TABLE IF EXISTS `skilllineability`;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skilllineability` (
  `ID` int(11),
  `SkillLineID` int(11),
  `SpellID` int(11),
  `RaceMask` int(11),
  `ClassMask` int(11),
  `f6` int(11),
  `f7` int(11),
  `RequiredSkill` int(11),
  `ReplaceSpellID` int(11),
  `f10` int(11),
  `Grey` int(11),
  `Yellow` int(11),
  `f13` int(11),
  `f14` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `skillraceclassinfo`
--

DROP TABLE IF EXISTS `skillraceclassinfo`;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skillraceclassinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spell`
--

DROP TABLE IF EXISTS `spell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spell` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Type0` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Type4` int(11) DEFAULT '0',
  `Type5` int(11) DEFAULT '0',
  `Type6` int(11) DEFAULT '0',
  `Type7` int(11) DEFAULT '0',
  `Type8` int(11) DEFAULT '0',
  `Type9` int(11) DEFAULT '0',
  `Type10` int(11) DEFAULT '0' COMMENT '4.2',
  `SpellCastTimesID` int(11) DEFAULT '0',
  `SpellDurationID` int(11) DEFAULT '0',
  `EnergyType` int(11) DEFAULT '0',
  `SpellRangeID` int(11) DEFAULT '0',
  `f15` float DEFAULT '0',
  `SpellVisualId` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0' COMMENT 'possibly SpellVisualKitID',
  `SpellIconID` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `Name` text,
  `Rank` text,
  `Description` text,
  `BuffDescription` text,
  `SchoolMask` int(11) DEFAULT '0',
  `SpellRuneCostID` int(11) DEFAULT '0',
  `SpellMissileID` int(11) DEFAULT '0',
  `SpellDescriptionVariablesID` int(11) DEFAULT '0',
  `SpellDifficultyID` int(11) DEFAULT '0',
  `f29` float DEFAULT '0',
  `SpellScalingID` int(11) DEFAULT '0',
  `SpellAuraOptionsID` int(11) DEFAULT '0',
  `SpellAuraRestrictionsID` int(11) DEFAULT '0',
  `SpellCastingRequirementsID` int(11) DEFAULT '0',
  `SpellCategoriesID` int(11) DEFAULT '0',
  `SpellClassOptionsID` int(11) DEFAULT '0',
  `SpellCooldownsID` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  `SpellEquippedItemsID` int(11) DEFAULT '0',
  `SpellInterruptsID` int(11) DEFAULT '0',
  `SpellLevelsID` int(11) DEFAULT '0',
  `SpellPowerID` int(11) DEFAULT '0',
  `SpellReagentsID` int(11) DEFAULT '0',
  `SpellShapeshiftID` int(11) DEFAULT '0',
  `SpellTargetRestrictionsID` int(11) DEFAULT '0',
  `f45` int(11) DEFAULT '0',
  `ResearchProjectID` int(11) DEFAULT '0' COMMENT 'Archeology related',
  PRIMARY KEY (`ID`),
  KEY `SpellScaling` (`SpellScalingID`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellauraoptions`
--

DROP TABLE IF EXISTS `spellauraoptions`;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellauraoptions` (
  `ID` int(11),
  `Stacks` int(11),
  `ProcRate` int(11),
  `ProcCharges` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellaurarestrictions`
--

DROP TABLE IF EXISTS `spellaurarestrictions`;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellaurarestrictions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcastingrequirements`
--

DROP TABLE IF EXISTS `spellcastingrequirements`;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcastingrequirements` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcasttimes`
--

DROP TABLE IF EXISTS `spellcasttimes`;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcasttimes` (
  `ID` int(11),
  `Time` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategories`
--

DROP TABLE IF EXISTS `spellcategories`;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategories` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategory`
--

DROP TABLE IF EXISTS `spellcategory`;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategory` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellclassoptions`
--

DROP TABLE IF EXISTS `spellclassoptions`;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellclassoptions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `SpellClassID` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcooldowns`
--

DROP TABLE IF EXISTS `spellcooldowns`;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcooldowns` (
  `ID` int(11),
  `Spell` int(11),
  `Category` int(11),
  `Global` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spelldescriptionvariables`
--

DROP TABLE IF EXISTS `spelldescriptionvariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelldescriptionvariables` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spelldifficulty`
--

DROP TABLE IF EXISTS `spelldifficulty`;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelldifficulty` (
  `f1` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellduration`
--

DROP TABLE IF EXISTS `spellduration`;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellduration` (
  `ID` int(11),
  `Duration` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelleffect`
--

DROP TABLE IF EXISTS `spelleffect`;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelleffect` (
  `ID` int(11),
  `Aura` int(11),
  `ProcValue` float,
  `Effect` int(11),
  `Period` int(11),
  `Value` int(11),
  `Coefficient` float,
  `f8` float,
  `Targets` int(11),
  `Dice` int(11),
  `ItemID` int(11),
  `f12` int(11),
  `SecondaryEffect` int(11),
  `UsedStat` int(11),
  `ProcChance` float,
  `SpellRadiusID` int(11),
  `f17` int(11),
  `LevelModifier` float,
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `SpellID` int(11),
  `Index` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellequippeditems`
--

DROP TABLE IF EXISTS `spellequippeditems`;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellequippeditems` (
  `ID` int(11),
  `ItemClassID` int(11),
  `InventorySlotMask` int(11),
  `ItemSubClassMask` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyout`
--

DROP TABLE IF EXISTS `spellflyout`;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyout` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyoutitem`
--

DROP TABLE IF EXISTS `spellflyoutitem`;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyoutitem` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellfocusobject`
--

DROP TABLE IF EXISTS `spellfocusobject`;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellfocusobject` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellicon`
--

DROP TABLE IF EXISTS `spellicon`;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellicon` (
  `ID` int(11),
  `Icon` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellinterrupts`
--

DROP TABLE IF EXISTS `spellinterrupts`;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellinterrupts` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellitemenchantment`
--

DROP TABLE IF EXISTS `spellitemenchantment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellitemenchantment` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Value1` int(11) DEFAULT '0',
  `Value2` int(11) DEFAULT '0',
  `Value3` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `Description` text,
  `f16` int(11) DEFAULT '0',
  `EnchantSlot` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `SpellItemEnchantmentConditionID` int(11) DEFAULT '0',
  `RequiredSkillLineID` int(11) DEFAULT '0',
  `RequiredSkillLineLevel` int(11) DEFAULT '0',
  `RequiredCharacterLevel` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellitemenchantmentcondition`
--

DROP TABLE IF EXISTS `spellitemenchantmentcondition`;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellitemenchantmentcondition` (
  `ID` int(11),
  `Color1` tinyint(4),
  `Color2` tinyint(4),
  `Color3` tinyint(4),
  `Color4` tinyint(4),
  `Color5` tinyint(4),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12_1` tinyint(4),
  `f12_2` tinyint(4),
  `f12_3` tinyint(4),
  `Comparator1` tinyint(4),
  `Comparator2` tinyint(4),
  `Comparator3` tinyint(4),
  `Comparator4` tinyint(4),
  `Comparator5` tinyint(4),
  `CompareColor1` tinyint(4),
  `CompareColor2` tinyint(4),
  `CompareColor3` tinyint(4),
  `CompareColor4` tinyint(4),
  `CompareColor5` tinyint(4),
  `f13_1` tinyint(4),
  `f13_2` tinyint(4),
  `Value1` int(11),
  `Value2` int(11),
  `Value3` int(11),
  `Value4` int(11),
  `Value5` int(11),
  `f27` tinyint(4),
  `f28` tinyint(4),
  `f29` tinyint(4),
  `f30` tinyint(4),
  `f31` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelllevels`
--

DROP TABLE IF EXISTS `spelllevels`;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelllevels` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmechanic`
--

DROP TABLE IF EXISTS `spellmechanic`;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmechanic` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissile`
--

DROP TABLE IF EXISTS `spellmissile`;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissile` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` float,
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` float,
  `f13` float,
  `f14` float,
  `f15` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissilemotion`
--

DROP TABLE IF EXISTS `spellmissilemotion`;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissilemotion` (
  `ID` int(11),
  `f2` text,
  `f3` text,
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellpower`
--

DROP TABLE IF EXISTS `spellpower`;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellpower` (
  `ID` int(11),
  `Absolute` int(11),
  `f3` int(11),
  `Percent` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellradius`
--

DROP TABLE IF EXISTS `spellradius`;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellradius` (
  `ID` int(11),
  `Radius` float,
  `f3` int(11),
  `f4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellrange`
--

DROP TABLE IF EXISTS `spellrange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellrange` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `MinimumHostile` float DEFAULT '0',
  `MinimumFriendly` float DEFAULT '0',
  `MaximumHostile` float DEFAULT '0',
  `MaximumFriendly` float DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `InternalName` text,
  `InternalDescription` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellreagents`
--

DROP TABLE IF EXISTS `spellreagents`;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellreagents` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellrunecost`
--

DROP TABLE IF EXISTS `spellrunecost`;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellrunecost` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellscaling`
--

DROP TABLE IF EXISTS `spellscaling`;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellscaling` (
  `ID` int(11),
  `CastTimeStart` int(11),
  `CastTimeEnd` int(11),
  `Intervals` int(11),
  `Distribution` int(11),
  `Coefficient1` float,
  `Coefficient2` float,
  `Coefficient3` float,
  `Dice1` float,
  `Dice2` float,
  `Dice3` float,
  `f12` float,
  `f13` int(11),
  `f14` int(11),
  `f15` float,
  `f16` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshift`
--

DROP TABLE IF EXISTS `spellshapeshift`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshift` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `SpellShapeshiftFormID` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshiftform`
--

DROP TABLE IF EXISTS `spellshapeshiftform`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshiftform` (
  `ID` int(11),
  `f2` int(11),
  `f3` text,
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelltargetrestrictions`
--

DROP TABLE IF EXISTS `spelltargetrestrictions`;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelltargetrestrictions` (
  `ID` int(11),
  `Targets` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellvisual`
--

DROP TABLE IF EXISTS `spellvisual`;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellvisual` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11),
  `f26` int(11),
  `f27` float,
  `f28` int(11),
  `f29` float,
  `f30` float,
  `f31` float,
  `f32` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `talent`
--

DROP TABLE IF EXISTS `talent`;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talent` (
  `ID` int(11),
  `TalentTabID` int(11),
  `Row` int(11),
  `Col` int(11),
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `RequiredTalentID1` int(11),
  `RequiredTalentID2` int(11),
  `RequiredTalentID3` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `PetMask0` int(11),
  `PetMask1` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `talenttab`
--

DROP TABLE IF EXISTS `talenttab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talenttab` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `SpellIconID` int(11) DEFAULT '0',
  `ClassMask` int(11) DEFAULT '0',
  `PetMask` int(11) DEFAULT '0',
  `Index` int(11) DEFAULT '0',
  `InternalName` text,
  `Description` text,
  `TypeMask` int(11) DEFAULT '0' COMMENT '0 none\n1 n.a.\n2 Protection\n4 Healing\n8 Damage',
  `MasterySpellID1` int(11) DEFAULT NULL,
  `MasterySpellID2` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Class` (`ClassMask`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `talenttreeprimaryspells`
--

DROP TABLE IF EXISTS `talenttreeprimaryspells`;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talenttreeprimaryspells` (
  `ID` int(11),
  `TalentTabID` int(11),
  `SpellID` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `chardev_cataclysm_ru`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chardev_cataclysm_ru` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chardev_cataclysm_ru`;

--
-- Table structure for table `chardev_chrclass_cache`
--

DROP TABLE IF EXISTS `chardev_chrclass_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_chrclass_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_item_cache`
--

DROP TABLE IF EXISTS `chardev_item_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_item_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spell_cache`
--

DROP TABLE IF EXISTS `chardev_spell_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spell_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spellitemenchantment_cache`
--

DROP TABLE IF EXISTS `chardev_spellitemenchantment_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spellitemenchantment_cache` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_talents_cache`
--

DROP TABLE IF EXISTS `chardev_talents_cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_talents_cache` (
  `ID` int(11) NOT NULL,
  `Serialized` mediumblob,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrclasses`
--

DROP TABLE IF EXISTS `chrclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrclasses` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` text,
  `Name` text,
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chrraces`
--

DROP TABLE IF EXISTS `chrraces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chrraces` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `Abbreviation` text,
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `NameInternal` text,
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `Name` text,
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` text,
  `f19` text,
  `f20` text,
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `faction`
--

DROP TABLE IF EXISTS `faction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faction` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `f20` float DEFAULT '0',
  `f21` float DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f26` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `gemproperties`
--

DROP TABLE IF EXISTS `gemproperties`;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gemproperties` (
  `ID` int(11),
  `SpellItemEnchantmentID` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `MinItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `glyphproperties`
--

DROP TABLE IF EXISTS `glyphproperties`;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `glyphproperties` (
  `ID` int(11),
  `SpellID` int(11),
  `Type` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecrit`
--

DROP TABLE IF EXISTS `gtchancetomeleecrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetomeleecritbase`
--

DROP TABLE IF EXISTS `gtchancetomeleecritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetomeleecritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcrit`
--

DROP TABLE IF EXISTS `gtchancetospellcrit`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcrit` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtchancetospellcritbase`
--

DROP TABLE IF EXISTS `gtchancetospellcritbase`;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtchancetospellcritbase` (
  `ID` int(11),
  `Chance` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtcombatratings`
--

DROP TABLE IF EXISTS `gtcombatratings`;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtcombatratings` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenhp`
--

DROP TABLE IF EXISTS `gtoctregenhp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenhp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtoctregenmp`
--

DROP TABLE IF EXISTS `gtoctregenmp`;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtoctregenmp` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenhpperspt`
--

DROP TABLE IF EXISTS `gtregenhpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenhpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtregenmpperspt`
--

DROP TABLE IF EXISTS `gtregenmpperspt`;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtregenmpperspt` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `gtspellscaling`
--

DROP TABLE IF EXISTS `gtspellscaling`;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `gtspellscaling` (
  `ID` int(11),
  `Value` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item`
--

DROP TABLE IF EXISTS `item`;
/*!50001 DROP VIEW IF EXISTS `item`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item` (
  `ID` int(11),
  `ItemClass` int(11),
  `ItemSubClass` int(11),
  `f4` int(11),
  `f5` int(11),
  `ItemDisplayInfoID` int(11),
  `InventorySlot` int(11),
  `f8` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `item_sparse`
--

DROP TABLE IF EXISTS `item_sparse`;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `item_sparse` (
  `ID` int(11),
  `Quality` int(11),
  `TypeMask` int(11),
  `TypeMask2` int(11),
  `TypeMask3` int(11),
  `TypeMask4` int(11),
  `TypeMask5` int(11),
  `BuyPrice` int(11),
  `SellPrice` int(11),
  `InventorySlot` int(11),
  `ChrClassMask` int(11),
  `ChrRaceMask` int(11),
  `Level` int(11),
  `RequiredCharacterLevel` int(11),
  `RequiredSkillLineID` int(11),
  `RequiredSkillLineLevel` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `RequiredFactionID` int(11),
  `RequiredFactionReputation` int(11),
  `Unique` int(11),
  `MaximumStackSize` int(11),
  `f21` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `StatValue1` int(11),
  `StatValue2` int(11),
  `StatValue3` int(11),
  `StatValue4` int(11),
  `StatValue5` int(11),
  `StatValue6` int(11),
  `StatValue7` int(11),
  `StatValue8` int(11),
  `StatValue9` int(11),
  `StatValue10` int(11),
  `f42` int(11),
  `f43` int(11),
  `f44` int(11),
  `f45` int(11),
  `f46` int(11),
  `f47` int(11),
  `f48` int(11),
  `f49` int(11),
  `f50` int(11),
  `f51` int(11),
  `f52` int(11),
  `f53` int(11),
  `f54` int(11),
  `f55` int(11),
  `f56` int(11),
  `f57` int(11),
  `f58` int(11),
  `f59` int(11),
  `f60` int(11),
  `f61` int(11),
  `ScalingStatDistributionID` int(11),
  `f63` int(11),
  `Delay` int(11),
  `f65` float,
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `SpellTrigger1` int(11),
  `SpellTrigger2` int(11),
  `SpellTrigger3` int(11),
  `SpellTrigger4` int(11),
  `SpellTrigger5` int(11),
  `SpellCharges1` int(11),
  `SpellCharges2` int(11),
  `SpellCharges3` int(11),
  `SpellCharges4` int(11),
  `SpellCharges5` int(11),
  `SpellCooldown1` int(11),
  `SpellCooldown2` int(11),
  `SpellCooldown3` int(11),
  `SpellCooldown4` int(11),
  `SpellCooldown5` int(11),
  `SpellCategoryID1` int(11),
  `SpellCategoryID2` int(11),
  `SpellCategoryID3` int(11),
  `SpellCategoryID4` int(11),
  `SpellCategoryID5` int(11),
  `SpellCategoryCooldown1` int(11),
  `SpellCategoryCooldown2` int(11),
  `SpellCategoryCooldown3` int(11),
  `SpellCategoryCooldown4` int(11),
  `SpellCategoryCooldown5` int(11),
  `Binds` int(11),
  `Name` text,
  `f98` int(11),
  `f99` int(11),
  `f100` int(11),
  `Description` text,
  `QuestID` int(11),
  `f103` int(11),
  `f104` int(11),
  `f105` int(11),
  `f106` int(11),
  `f107` int(11),
  `f108` int(11),
  `RandomPropertiesID` int(11),
  `RandomSuffixID` int(11),
  `ItemSetID` int(11),
  `f113` int(11),
  `f114` int(11),
  `f115` int(11),
  `f116` int(11),
  `SocketColor1` int(11),
  `SocketColor2` int(11),
  `SocketColor3` int(11),
  `f120` int(11),
  `f121` int(11),
  `f122` int(11),
  `SocketBonusID` int(11),
  `GemPropertiesID` int(11),
  `f125` float,
  `f126` int(11),
  `LimitCategory` int(11),
  `f128` int(11),
  `DamageRange` float,
  `LimitCategoryMultiple` int(11),
  `f131` int(11),
  `Version` int(11),
  `Locale` varchar(2)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorquality`
--

DROP TABLE IF EXISTS `itemarmorquality`;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorquality` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmorshield`
--

DROP TABLE IF EXISTS `itemarmorshield`;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmorshield` (
  `ID` int(11),
  `ItemLevel` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemarmortotal`
--

DROP TABLE IF EXISTS `itemarmortotal`;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemarmortotal` (
  `ID` int(11),
  `ItemLevel` int(11),
  `1` float,
  `2` float,
  `3` float,
  `4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemclass`
--

DROP TABLE IF EXISTS `itemclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` float DEFAULT NULL COMMENT 'Added 4.3',
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamageammo`
--

DROP TABLE IF EXISTS `itemdamageammo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamageammo` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` float DEFAULT '0',
  `f4` float DEFAULT '0',
  `f5` float DEFAULT '0',
  `f6` float DEFAULT '0',
  `f7` float DEFAULT '0',
  `f8` float DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemdamageonehand`
--

DROP TABLE IF EXISTS `itemdamageonehand`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageonehandcaster`
--

DROP TABLE IF EXISTS `itemdamageonehandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageonehandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamageranged`
--

DROP TABLE IF EXISTS `itemdamageranged`;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamageranged` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagethrown`
--

DROP TABLE IF EXISTS `itemdamagethrown`;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagethrown` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohand`
--

DROP TABLE IF EXISTS `itemdamagetwohand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagetwohandcaster`
--

DROP TABLE IF EXISTS `itemdamagetwohandcaster`;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagetwohandcaster` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdamagewand`
--

DROP TABLE IF EXISTS `itemdamagewand`;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdamagewand` (
  `ID` int(11),
  `0` float,
  `1` float,
  `2` float,
  `3` float,
  `4` float,
  `5` float,
  `6` float,
  `ItemLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `itemdisplayinfo`
--

DROP TABLE IF EXISTS `itemdisplayinfo`;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemdisplayinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `Icon` text,
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemrandomproperties`
--

DROP TABLE IF EXISTS `itemrandomproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomproperties` (
  `ID` int(11) NOT NULL,
  `InternalName` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemrandomsuffix`
--

DROP TABLE IF EXISTS `itemrandomsuffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemrandomsuffix` (
  `ID` int(11) NOT NULL,
  `Name` text,
  `InternalDescription` text,
  `SpellItemEnchantmentID1` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID2` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID3` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID4` int(11) DEFAULT NULL,
  `SpellItemEnchantmentID5` int(11) DEFAULT NULL,
  `Coefficient1` int(11) DEFAULT NULL,
  `Coefficient2` int(11) DEFAULT NULL,
  `Coefficient3` int(11) DEFAULT NULL,
  `Coefficient4` int(11) DEFAULT NULL,
  `Coefficient5` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `itemreforge`
--

DROP TABLE IF EXISTS `itemreforge`;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `itemreforge` (
  `ID` int(11),
  `f2` int(11),
  `f3` float,
  `f4` int(11),
  `f5` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itemset`
--

DROP TABLE IF EXISTS `itemset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemset` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `ItemID1` int(11) DEFAULT '0',
  `ItemID2` int(11) DEFAULT '0',
  `ItemID3` int(11) DEFAULT '0',
  `ItemID4` int(11) DEFAULT '0',
  `ItemID5` int(11) DEFAULT '0',
  `ItemID6` int(11) DEFAULT '0',
  `ItemID7` int(11) DEFAULT '0',
  `ItemID8` int(11) DEFAULT '0',
  `ItemID9` int(11) DEFAULT '0',
  `ItemID10` int(11) DEFAULT '0',
  `f13` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `SpellID4` int(11) DEFAULT '0',
  `SpellID5` int(11) DEFAULT '0',
  `SpellID6` int(11) DEFAULT '0',
  `SpellID7` int(11) DEFAULT '0',
  `SpellID8` int(11) DEFAULT '0',
  `required1` int(11) DEFAULT '0',
  `required2` int(11) DEFAULT '0',
  `required3` int(11) DEFAULT '0',
  `required4` int(11) DEFAULT '0',
  `required5` int(11) DEFAULT '0',
  `required6` int(11) DEFAULT '0',
  `required7` int(11) DEFAULT '0',
  `required8` int(11) DEFAULT '0',
  `f36` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemsubclass`
--

DROP TABLE IF EXISTS `itemsubclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemsubclass` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemClass` int(11) DEFAULT '0',
  `ItemSubClass` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `Name` text,
  `NameLong` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `randproppoints`
--

DROP TABLE IF EXISTS `randproppoints`;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `randproppoints` (
  `ID` int(11),
  `PointsQuality4Group0` int(11),
  `PointsQuality4Group1` int(11),
  `PointsQuality4Group2` int(11),
  `PointsQuality4Group3` int(11),
  `PointsQuality4Group4` int(11),
  `PointsQuality3Group0` int(11),
  `PointsQuality3Group1` int(11),
  `PointsQuality3Group2` int(11),
  `PointsQuality3Group3` int(11),
  `PointsQuality3Group4` int(11),
  `PointsQuality2Group0` int(11),
  `PointsQuality2Group1` int(11),
  `PointsQuality2Group2` int(11),
  `PointsQuality2Group3` int(11),
  `PointsQuality2Group4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatdistribution`
--

DROP TABLE IF EXISTS `scalingstatdistribution`;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatdistribution` (
  `id` int(11),
  `Stat1` int(11),
  `Stat2` int(11),
  `Stat3` int(11),
  `Stat4` int(11),
  `Stat5` int(11),
  `Stat6` int(11),
  `Stat7` int(11),
  `Stat8` int(11),
  `Stat9` int(11),
  `Stat10` int(11),
  `Coefficient1` int(11),
  `Coefficient2` int(11),
  `Coefficient3` int(11),
  `Coefficient4` int(11),
  `Coefficient5` int(11),
  `Coefficient6` int(11),
  `Coefficient7` int(11),
  `Coefficient8` int(11),
  `Coefficient9` int(11),
  `Coefficient10` int(11),
  `MinLevel` int(11),
  `MaxLevel` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `scalingstatvalues`
--

DROP TABLE IF EXISTS `scalingstatvalues`;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `scalingstatvalues` (
  `id` int(11),
  `level` int(11),
  `dist0` int(11),
  `dist1` int(11),
  `dist2` int(11),
  `dist3` int(11),
  `dist4` int(11),
  `dist5` int(11),
  `dist6` int(11),
  `dist7` int(11),
  `dist8` int(11),
  `dist9` int(11),
  `dist10` int(11),
  `dist11` int(11),
  `dist12` int(11),
  `dist13` int(11),
  `dist14` int(11),
  `dist15` int(11),
  `dist16` int(11),
  `dist17` int(11),
  `dist18` int(11),
  `dist19` int(11),
  `dist20` int(11),
  `dist21` int(11),
  `dist22` int(11),
  `dist23` int(11),
  `dist24` int(11),
  `dist25` int(11),
  `dist26` int(11),
  `dist27` int(11),
  `dist28` int(11),
  `dist29` int(11),
  `dist30` int(11),
  `dist31` int(11),
  `dist32` int(11),
  `dist33` int(11),
  `dist34` int(11),
  `dist35` int(11),
  `dist36` int(11),
  `dist37` int(11),
  `dist38` int(11),
  `dist39` int(11),
  `dist40` int(11),
  `dist41` int(11),
  `dist42` int(11),
  `dist43` int(11),
  `dist44` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `skillline`
--

DROP TABLE IF EXISTS `skillline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skillline` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Category` int(11) DEFAULT '0',
  `Name` text,
  `Description` text,
  `f6` int(11) DEFAULT '0',
  `f7` text,
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `skilllineability`
--

DROP TABLE IF EXISTS `skilllineability`;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skilllineability` (
  `ID` int(11),
  `SkillLineID` int(11),
  `SpellID` int(11),
  `RaceMask` int(11),
  `ClassMask` int(11),
  `f6` int(11),
  `f7` int(11),
  `RequiredSkill` int(11),
  `ReplaceSpellID` int(11),
  `f10` int(11),
  `Grey` int(11),
  `Yellow` int(11),
  `f13` int(11),
  `f14` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `skillraceclassinfo`
--

DROP TABLE IF EXISTS `skillraceclassinfo`;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `skillraceclassinfo` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spell`
--

DROP TABLE IF EXISTS `spell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spell` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Type0` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Type4` int(11) DEFAULT '0',
  `Type5` int(11) DEFAULT '0',
  `Type6` int(11) DEFAULT '0',
  `Type7` int(11) DEFAULT '0',
  `Type8` int(11) DEFAULT '0',
  `Type9` int(11) DEFAULT '0',
  `Type10` int(11) DEFAULT '0' COMMENT '4.2',
  `SpellCastTimesID` int(11) DEFAULT '0',
  `SpellDurationID` int(11) DEFAULT '0',
  `EnergyType` int(11) DEFAULT '0',
  `SpellRangeID` int(11) DEFAULT '0',
  `f15` float DEFAULT '0',
  `SpellVisualId` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0' COMMENT 'possibly SpellVisualKitID',
  `SpellIconID` int(11) DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `Name` text,
  `Rank` text,
  `Description` text,
  `BuffDescription` text,
  `SchoolMask` int(11) DEFAULT '0',
  `SpellRuneCostID` int(11) DEFAULT '0',
  `SpellMissileID` int(11) DEFAULT '0',
  `SpellDescriptionVariablesID` int(11) DEFAULT '0',
  `SpellDifficultyID` int(11) DEFAULT '0',
  `f29` float DEFAULT '0',
  `SpellScalingID` int(11) DEFAULT '0',
  `SpellAuraOptionsID` int(11) DEFAULT '0',
  `SpellAuraRestrictionsID` int(11) DEFAULT '0',
  `SpellCastingRequirementsID` int(11) DEFAULT '0',
  `SpellCategoriesID` int(11) DEFAULT '0',
  `SpellClassOptionsID` int(11) DEFAULT '0',
  `SpellCooldownsID` int(11) DEFAULT '0',
  `f37` int(11) DEFAULT '0',
  `SpellEquippedItemsID` int(11) DEFAULT '0',
  `SpellInterruptsID` int(11) DEFAULT '0',
  `SpellLevelsID` int(11) DEFAULT '0',
  `SpellPowerID` int(11) DEFAULT '0',
  `SpellReagentsID` int(11) DEFAULT '0',
  `SpellShapeshiftID` int(11) DEFAULT '0',
  `SpellTargetRestrictionsID` int(11) DEFAULT '0',
  `f45` int(11) DEFAULT '0',
  `ResearchProjectID` int(11) DEFAULT '0' COMMENT 'Archeology related',
  PRIMARY KEY (`ID`),
  KEY `SpellScaling` (`SpellScalingID`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellauraoptions`
--

DROP TABLE IF EXISTS `spellauraoptions`;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellauraoptions` (
  `ID` int(11),
  `Stacks` int(11),
  `ProcRate` int(11),
  `ProcCharges` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellaurarestrictions`
--

DROP TABLE IF EXISTS `spellaurarestrictions`;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellaurarestrictions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcastingrequirements`
--

DROP TABLE IF EXISTS `spellcastingrequirements`;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcastingrequirements` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcasttimes`
--

DROP TABLE IF EXISTS `spellcasttimes`;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcasttimes` (
  `ID` int(11),
  `Time` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategories`
--

DROP TABLE IF EXISTS `spellcategories`;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategories` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcategory`
--

DROP TABLE IF EXISTS `spellcategory`;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcategory` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellclassoptions`
--

DROP TABLE IF EXISTS `spellclassoptions`;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellclassoptions` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `SpellClassID` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellcooldowns`
--

DROP TABLE IF EXISTS `spellcooldowns`;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellcooldowns` (
  `ID` int(11),
  `Spell` int(11),
  `Category` int(11),
  `Global` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spelldescriptionvariables`
--

DROP TABLE IF EXISTS `spelldescriptionvariables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelldescriptionvariables` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spelldifficulty`
--

DROP TABLE IF EXISTS `spelldifficulty`;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelldifficulty` (
  `f1` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellduration`
--

DROP TABLE IF EXISTS `spellduration`;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellduration` (
  `ID` int(11),
  `Duration` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelleffect`
--

DROP TABLE IF EXISTS `spelleffect`;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelleffect` (
  `ID` int(11),
  `Aura` int(11),
  `ProcValue` float,
  `Effect` int(11),
  `Period` int(11),
  `Value` int(11),
  `Coefficient` float,
  `f8` float,
  `Targets` int(11),
  `Dice` int(11),
  `ItemID` int(11),
  `f12` int(11),
  `SecondaryEffect` int(11),
  `UsedStat` int(11),
  `ProcChance` float,
  `SpellRadiusID` int(11),
  `f17` int(11),
  `LevelModifier` float,
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `SpellID` int(11),
  `Index` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellequippeditems`
--

DROP TABLE IF EXISTS `spellequippeditems`;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellequippeditems` (
  `ID` int(11),
  `ItemClassID` int(11),
  `InventorySlotMask` int(11),
  `ItemSubClassMask` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyout`
--

DROP TABLE IF EXISTS `spellflyout`;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyout` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellflyoutitem`
--

DROP TABLE IF EXISTS `spellflyoutitem`;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellflyoutitem` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellfocusobject`
--

DROP TABLE IF EXISTS `spellfocusobject`;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellfocusobject` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellicon`
--

DROP TABLE IF EXISTS `spellicon`;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellicon` (
  `ID` int(11),
  `Icon` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellinterrupts`
--

DROP TABLE IF EXISTS `spellinterrupts`;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellinterrupts` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellitemenchantment`
--

DROP TABLE IF EXISTS `spellitemenchantment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellitemenchantment` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `Type1` int(11) DEFAULT '0',
  `Type2` int(11) DEFAULT '0',
  `Type3` int(11) DEFAULT '0',
  `Value1` int(11) DEFAULT '0',
  `Value2` int(11) DEFAULT '0',
  `Value3` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `Description` text,
  `f16` int(11) DEFAULT '0',
  `EnchantSlot` int(11) DEFAULT '0',
  `f18` int(11) DEFAULT '0',
  `SpellItemEnchantmentConditionID` int(11) DEFAULT '0',
  `RequiredSkillLineID` int(11) DEFAULT '0',
  `RequiredSkillLineLevel` int(11) DEFAULT '0',
  `RequiredCharacterLevel` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellitemenchantmentcondition`
--

DROP TABLE IF EXISTS `spellitemenchantmentcondition`;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellitemenchantmentcondition` (
  `ID` int(11),
  `Color1` tinyint(4),
  `Color2` tinyint(4),
  `Color3` tinyint(4),
  `Color4` tinyint(4),
  `Color5` tinyint(4),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12_1` tinyint(4),
  `f12_2` tinyint(4),
  `f12_3` tinyint(4),
  `Comparator1` tinyint(4),
  `Comparator2` tinyint(4),
  `Comparator3` tinyint(4),
  `Comparator4` tinyint(4),
  `Comparator5` tinyint(4),
  `CompareColor1` tinyint(4),
  `CompareColor2` tinyint(4),
  `CompareColor3` tinyint(4),
  `CompareColor4` tinyint(4),
  `CompareColor5` tinyint(4),
  `f13_1` tinyint(4),
  `f13_2` tinyint(4),
  `Value1` int(11),
  `Value2` int(11),
  `Value3` int(11),
  `Value4` int(11),
  `Value5` int(11),
  `f27` tinyint(4),
  `f28` tinyint(4),
  `f29` tinyint(4),
  `f30` tinyint(4),
  `f31` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelllevels`
--

DROP TABLE IF EXISTS `spelllevels`;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelllevels` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmechanic`
--

DROP TABLE IF EXISTS `spellmechanic`;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmechanic` (
  `ID` int(11),
  `f2` text
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissile`
--

DROP TABLE IF EXISTS `spellmissile`;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissile` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` float,
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` float,
  `f13` float,
  `f14` float,
  `f15` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellmissilemotion`
--

DROP TABLE IF EXISTS `spellmissilemotion`;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellmissilemotion` (
  `ID` int(11),
  `f2` text,
  `f3` text,
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellpower`
--

DROP TABLE IF EXISTS `spellpower`;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellpower` (
  `ID` int(11),
  `Absolute` int(11),
  `f3` int(11),
  `Percent` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellradius`
--

DROP TABLE IF EXISTS `spellradius`;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellradius` (
  `ID` int(11),
  `Radius` float,
  `f3` int(11),
  `f4` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `spellrange`
--

DROP TABLE IF EXISTS `spellrange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellrange` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `MinimumHostile` float DEFAULT '0',
  `MinimumFriendly` float DEFAULT '0',
  `MaximumHostile` float DEFAULT '0',
  `MaximumFriendly` float DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `InternalName` text,
  `InternalDescription` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `spellreagents`
--

DROP TABLE IF EXISTS `spellreagents`;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellreagents` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellrunecost`
--

DROP TABLE IF EXISTS `spellrunecost`;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellrunecost` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellscaling`
--

DROP TABLE IF EXISTS `spellscaling`;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellscaling` (
  `ID` int(11),
  `CastTimeStart` int(11),
  `CastTimeEnd` int(11),
  `Intervals` int(11),
  `Distribution` int(11),
  `Coefficient1` float,
  `Coefficient2` float,
  `Coefficient3` float,
  `Dice1` float,
  `Dice2` float,
  `Dice3` float,
  `f12` float,
  `f13` int(11),
  `f14` int(11),
  `f15` float,
  `f16` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshift`
--

DROP TABLE IF EXISTS `spellshapeshift`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshift` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `SpellShapeshiftFormID` int(11),
  `f5` int(11),
  `f6` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellshapeshiftform`
--

DROP TABLE IF EXISTS `spellshapeshiftform`;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellshapeshiftform` (
  `ID` int(11),
  `f2` int(11),
  `f3` text,
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spelltargetrestrictions`
--

DROP TABLE IF EXISTS `spelltargetrestrictions`;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spelltargetrestrictions` (
  `ID` int(11),
  `Targets` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `spellvisual`
--

DROP TABLE IF EXISTS `spellvisual`;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `spellvisual` (
  `ID` int(11),
  `f2` int(11),
  `f3` int(11),
  `f4` int(11),
  `f5` int(11),
  `f6` int(11),
  `f7` int(11),
  `f8` int(11),
  `f9` int(11),
  `f10` int(11),
  `f11` int(11),
  `f12` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `f18` int(11),
  `f19` int(11),
  `f20` int(11),
  `f21` int(11),
  `f22` int(11),
  `f23` int(11),
  `f24` int(11),
  `f25` int(11),
  `f26` int(11),
  `f27` float,
  `f28` int(11),
  `f29` float,
  `f30` float,
  `f31` float,
  `f32` float
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `talent`
--

DROP TABLE IF EXISTS `talent`;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talent` (
  `ID` int(11),
  `TalentTabID` int(11),
  `Row` int(11),
  `Col` int(11),
  `SpellID1` int(11),
  `SpellID2` int(11),
  `SpellID3` int(11),
  `SpellID4` int(11),
  `SpellID5` int(11),
  `RequiredTalentID1` int(11),
  `RequiredTalentID2` int(11),
  `RequiredTalentID3` int(11),
  `f13` int(11),
  `f14` int(11),
  `f15` int(11),
  `f16` int(11),
  `f17` int(11),
  `PetMask0` int(11),
  `PetMask1` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `talenttab`
--

DROP TABLE IF EXISTS `talenttab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talenttab` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `SpellIconID` int(11) DEFAULT '0',
  `ClassMask` int(11) DEFAULT '0',
  `PetMask` int(11) DEFAULT '0',
  `Index` int(11) DEFAULT '0',
  `InternalName` text,
  `Description` text,
  `TypeMask` int(11) DEFAULT '0' COMMENT '0 none\n1 n.a.\n2 Protection\n4 Healing\n8 Damage',
  `MasterySpellID1` int(11) DEFAULT NULL,
  `MasterySpellID2` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Class` (`ClassMask`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `talenttreeprimaryspells`
--

DROP TABLE IF EXISTS `talenttreeprimaryspells`;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `talenttreeprimaryspells` (
  `ID` int(11),
  `TalentTabID` int(11),
  `SpellID` int(11),
  `f4` int(11)
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `chardev_cataclysm_de`
--

USE `chardev_cataclysm_de`;

--
-- Final view structure for view `gemproperties`
--

/*!50001 DROP TABLE IF EXISTS `gemproperties`*/;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gemproperties` AS select `chardev_cataclysm`.`gemproperties`.`ID` AS `ID`,`chardev_cataclysm`.`gemproperties`.`SpellItemEnchantmentID` AS `SpellItemEnchantmentID`,`chardev_cataclysm`.`gemproperties`.`f3` AS `f3`,`chardev_cataclysm`.`gemproperties`.`f4` AS `f4`,`chardev_cataclysm`.`gemproperties`.`f5` AS `f5`,`chardev_cataclysm`.`gemproperties`.`MinItemLevel` AS `MinItemLevel` from `chardev_cataclysm`.`gemproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `glyphproperties`
--

/*!50001 DROP TABLE IF EXISTS `glyphproperties`*/;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `glyphproperties` AS select `chardev_cataclysm`.`glyphproperties`.`ID` AS `ID`,`chardev_cataclysm`.`glyphproperties`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`glyphproperties`.`Type` AS `Type`,`chardev_cataclysm`.`glyphproperties`.`f4` AS `f4` from `chardev_cataclysm`.`glyphproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecrit` AS select `chardev_cataclysm`.`gtchancetomeleecrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecritbase` AS select `chardev_cataclysm`.`gtchancetomeleecritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcrit` AS select `chardev_cataclysm`.`gtchancetospellcrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcritbase` AS select `chardev_cataclysm`.`gtchancetospellcritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtcombatratings`
--

/*!50001 DROP TABLE IF EXISTS `gtcombatratings`*/;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtcombatratings` AS select `chardev_cataclysm`.`gtcombatratings`.`ID` AS `ID`,`chardev_cataclysm`.`gtcombatratings`.`Value` AS `Value` from `chardev_cataclysm`.`gtcombatratings` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenhp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenhp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenhp` AS select `chardev_cataclysm`.`gtoctregenhp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenhp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenhp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenmp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenmp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenmp` AS select `chardev_cataclysm`.`gtoctregenmp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenmp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenmp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenhpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenhpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenhpperspt` AS select `chardev_cataclysm`.`gtregenhpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenhpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenhpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenmpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenmpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenmpperspt` AS select `chardev_cataclysm`.`gtregenmpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenmpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenmpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtspellscaling`
--

/*!50001 DROP TABLE IF EXISTS `gtspellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtspellscaling` AS select `chardev_cataclysm`.`gtspellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`gtspellscaling`.`Value` AS `Value` from `chardev_cataclysm`.`gtspellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item`
--

/*!50001 DROP TABLE IF EXISTS `item`*/;
/*!50001 DROP VIEW IF EXISTS `item`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item` AS select `chardev_cataclysm`.`item`.`ID` AS `ID`,`chardev_cataclysm`.`item`.`ItemClass` AS `ItemClass`,`chardev_cataclysm`.`item`.`ItemSubClass` AS `ItemSubClass`,`chardev_cataclysm`.`item`.`f4` AS `f4`,`chardev_cataclysm`.`item`.`f5` AS `f5`,`chardev_cataclysm`.`item`.`ItemDisplayInfoID` AS `ItemDisplayInfoID`,`chardev_cataclysm`.`item`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item`.`f8` AS `f8` from `chardev_cataclysm`.`item` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item_sparse`
--

/*!50001 DROP TABLE IF EXISTS `item_sparse`*/;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item_sparse` AS select `chardev_cataclysm`.`item_sparse`.`ID` AS `ID`,`chardev_cataclysm`.`item_sparse`.`Quality` AS `Quality`,`chardev_cataclysm`.`item_sparse`.`TypeMask` AS `TypeMask`,`chardev_cataclysm`.`item_sparse`.`TypeMask2` AS `TypeMask2`,`chardev_cataclysm`.`item_sparse`.`TypeMask3` AS `TypeMask3`,`chardev_cataclysm`.`item_sparse`.`TypeMask4` AS `TypeMask4`,`chardev_cataclysm`.`item_sparse`.`TypeMask5` AS `TypeMask5`,`chardev_cataclysm`.`item_sparse`.`BuyPrice` AS `BuyPrice`,`chardev_cataclysm`.`item_sparse`.`SellPrice` AS `SellPrice`,`chardev_cataclysm`.`item_sparse`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item_sparse`.`ChrClassMask` AS `ChrClassMask`,`chardev_cataclysm`.`item_sparse`.`ChrRaceMask` AS `ChrRaceMask`,`chardev_cataclysm`.`item_sparse`.`Level` AS `Level`,`chardev_cataclysm`.`item_sparse`.`RequiredCharacterLevel` AS `RequiredCharacterLevel`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineID` AS `RequiredSkillLineID`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineLevel` AS `RequiredSkillLineLevel`,`chardev_cataclysm`.`item_sparse`.`f14` AS `f14`,`chardev_cataclysm`.`item_sparse`.`f15` AS `f15`,`chardev_cataclysm`.`item_sparse`.`f16` AS `f16`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionID` AS `RequiredFactionID`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionReputation` AS `RequiredFactionReputation`,`chardev_cataclysm`.`item_sparse`.`Unique` AS `Unique`,`chardev_cataclysm`.`item_sparse`.`MaximumStackSize` AS `MaximumStackSize`,`chardev_cataclysm`.`item_sparse`.`f21` AS `f21`,`chardev_cataclysm`.`item_sparse`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`item_sparse`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`item_sparse`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`item_sparse`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`item_sparse`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`item_sparse`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`item_sparse`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`item_sparse`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`item_sparse`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`item_sparse`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`item_sparse`.`StatValue1` AS `StatValue1`,`chardev_cataclysm`.`item_sparse`.`StatValue2` AS `StatValue2`,`chardev_cataclysm`.`item_sparse`.`StatValue3` AS `StatValue3`,`chardev_cataclysm`.`item_sparse`.`StatValue4` AS `StatValue4`,`chardev_cataclysm`.`item_sparse`.`StatValue5` AS `StatValue5`,`chardev_cataclysm`.`item_sparse`.`StatValue6` AS `StatValue6`,`chardev_cataclysm`.`item_sparse`.`StatValue7` AS `StatValue7`,`chardev_cataclysm`.`item_sparse`.`StatValue8` AS `StatValue8`,`chardev_cataclysm`.`item_sparse`.`StatValue9` AS `StatValue9`,`chardev_cataclysm`.`item_sparse`.`StatValue10` AS `StatValue10`,`chardev_cataclysm`.`item_sparse`.`f42` AS `f42`,`chardev_cataclysm`.`item_sparse`.`f43` AS `f43`,`chardev_cataclysm`.`item_sparse`.`f44` AS `f44`,`chardev_cataclysm`.`item_sparse`.`f45` AS `f45`,`chardev_cataclysm`.`item_sparse`.`f46` AS `f46`,`chardev_cataclysm`.`item_sparse`.`f47` AS `f47`,`chardev_cataclysm`.`item_sparse`.`f48` AS `f48`,`chardev_cataclysm`.`item_sparse`.`f49` AS `f49`,`chardev_cataclysm`.`item_sparse`.`f50` AS `f50`,`chardev_cataclysm`.`item_sparse`.`f51` AS `f51`,`chardev_cataclysm`.`item_sparse`.`f52` AS `f52`,`chardev_cataclysm`.`item_sparse`.`f53` AS `f53`,`chardev_cataclysm`.`item_sparse`.`f54` AS `f54`,`chardev_cataclysm`.`item_sparse`.`f55` AS `f55`,`chardev_cataclysm`.`item_sparse`.`f56` AS `f56`,`chardev_cataclysm`.`item_sparse`.`f57` AS `f57`,`chardev_cataclysm`.`item_sparse`.`f58` AS `f58`,`chardev_cataclysm`.`item_sparse`.`f59` AS `f59`,`chardev_cataclysm`.`item_sparse`.`f60` AS `f60`,`chardev_cataclysm`.`item_sparse`.`f61` AS `f61`,`chardev_cataclysm`.`item_sparse`.`ScalingStatDistributionID` AS `ScalingStatDistributionID`,`chardev_cataclysm`.`item_sparse`.`f63` AS `f63`,`chardev_cataclysm`.`item_sparse`.`Delay` AS `Delay`,`chardev_cataclysm`.`item_sparse`.`f65` AS `f65`,`chardev_cataclysm`.`item_sparse`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`item_sparse`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`item_sparse`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`item_sparse`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`item_sparse`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger1` AS `SpellTrigger1`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger2` AS `SpellTrigger2`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger3` AS `SpellTrigger3`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger4` AS `SpellTrigger4`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger5` AS `SpellTrigger5`,`chardev_cataclysm`.`item_sparse`.`SpellCharges1` AS `SpellCharges1`,`chardev_cataclysm`.`item_sparse`.`SpellCharges2` AS `SpellCharges2`,`chardev_cataclysm`.`item_sparse`.`SpellCharges3` AS `SpellCharges3`,`chardev_cataclysm`.`item_sparse`.`SpellCharges4` AS `SpellCharges4`,`chardev_cataclysm`.`item_sparse`.`SpellCharges5` AS `SpellCharges5`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown1` AS `SpellCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown2` AS `SpellCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown3` AS `SpellCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown4` AS `SpellCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown5` AS `SpellCooldown5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID1` AS `SpellCategoryID1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID2` AS `SpellCategoryID2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID3` AS `SpellCategoryID3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID4` AS `SpellCategoryID4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID5` AS `SpellCategoryID5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown1` AS `SpellCategoryCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown2` AS `SpellCategoryCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown3` AS `SpellCategoryCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown4` AS `SpellCategoryCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown5` AS `SpellCategoryCooldown5`,`chardev_cataclysm`.`item_sparse`.`Binds` AS `Binds`,`chardev_cataclysm`.`item_sparse`.`Name` AS `Name`,`chardev_cataclysm`.`item_sparse`.`f98` AS `f98`,`chardev_cataclysm`.`item_sparse`.`f99` AS `f99`,`chardev_cataclysm`.`item_sparse`.`f100` AS `f100`,`chardev_cataclysm`.`item_sparse`.`Description` AS `Description`,`chardev_cataclysm`.`item_sparse`.`QuestID` AS `QuestID`,`chardev_cataclysm`.`item_sparse`.`f103` AS `f103`,`chardev_cataclysm`.`item_sparse`.`f104` AS `f104`,`chardev_cataclysm`.`item_sparse`.`f105` AS `f105`,`chardev_cataclysm`.`item_sparse`.`f106` AS `f106`,`chardev_cataclysm`.`item_sparse`.`f107` AS `f107`,`chardev_cataclysm`.`item_sparse`.`f108` AS `f108`,`chardev_cataclysm`.`item_sparse`.`RandomPropertiesID` AS `RandomPropertiesID`,`chardev_cataclysm`.`item_sparse`.`RandomSuffixID` AS `RandomSuffixID`,`chardev_cataclysm`.`item_sparse`.`ItemSetID` AS `ItemSetID`,`chardev_cataclysm`.`item_sparse`.`f113` AS `f113`,`chardev_cataclysm`.`item_sparse`.`f114` AS `f114`,`chardev_cataclysm`.`item_sparse`.`f115` AS `f115`,`chardev_cataclysm`.`item_sparse`.`f116` AS `f116`,`chardev_cataclysm`.`item_sparse`.`SocketColor1` AS `SocketColor1`,`chardev_cataclysm`.`item_sparse`.`SocketColor2` AS `SocketColor2`,`chardev_cataclysm`.`item_sparse`.`SocketColor3` AS `SocketColor3`,`chardev_cataclysm`.`item_sparse`.`f120` AS `f120`,`chardev_cataclysm`.`item_sparse`.`f121` AS `f121`,`chardev_cataclysm`.`item_sparse`.`f122` AS `f122`,`chardev_cataclysm`.`item_sparse`.`SocketBonusID` AS `SocketBonusID`,`chardev_cataclysm`.`item_sparse`.`GemPropertiesID` AS `GemPropertiesID`,`chardev_cataclysm`.`item_sparse`.`f125` AS `f125`,`chardev_cataclysm`.`item_sparse`.`f126` AS `f126`,`chardev_cataclysm`.`item_sparse`.`LimitCategory` AS `LimitCategory`,`chardev_cataclysm`.`item_sparse`.`f128` AS `f128`,`chardev_cataclysm`.`item_sparse`.`DamageRange` AS `DamageRange`,`chardev_cataclysm`.`item_sparse`.`LimitCategoryMultiple` AS `LimitCategoryMultiple`,`chardev_cataclysm`.`item_sparse`.`f131` AS `f131`,`chardev_cataclysm`.`item_sparse`.`Version` AS `Version`,`chardev_cataclysm`.`item_sparse`.`Locale` AS `Locale` from `chardev_cataclysm`.`item_sparse` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorquality`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorquality`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorquality` AS select `chardev_cataclysm`.`itemarmorquality`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorquality`.`0` AS `0`,`chardev_cataclysm`.`itemarmorquality`.`1` AS `1`,`chardev_cataclysm`.`itemarmorquality`.`2` AS `2`,`chardev_cataclysm`.`itemarmorquality`.`3` AS `3`,`chardev_cataclysm`.`itemarmorquality`.`4` AS `4`,`chardev_cataclysm`.`itemarmorquality`.`5` AS `5`,`chardev_cataclysm`.`itemarmorquality`.`6` AS `6`,`chardev_cataclysm`.`itemarmorquality`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemarmorquality` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorshield`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorshield`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorshield` AS select `chardev_cataclysm`.`itemarmorshield`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorshield`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmorshield`.`0` AS `0`,`chardev_cataclysm`.`itemarmorshield`.`1` AS `1`,`chardev_cataclysm`.`itemarmorshield`.`2` AS `2`,`chardev_cataclysm`.`itemarmorshield`.`3` AS `3`,`chardev_cataclysm`.`itemarmorshield`.`4` AS `4`,`chardev_cataclysm`.`itemarmorshield`.`5` AS `5`,`chardev_cataclysm`.`itemarmorshield`.`6` AS `6` from `chardev_cataclysm`.`itemarmorshield` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmortotal`
--

/*!50001 DROP TABLE IF EXISTS `itemarmortotal`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmortotal` AS select `chardev_cataclysm`.`itemarmortotal`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmortotal`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmortotal`.`1` AS `1`,`chardev_cataclysm`.`itemarmortotal`.`2` AS `2`,`chardev_cataclysm`.`itemarmortotal`.`3` AS `3`,`chardev_cataclysm`.`itemarmortotal`.`4` AS `4` from `chardev_cataclysm`.`itemarmortotal` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemcurrencycost`
--

/*!50001 DROP TABLE IF EXISTS `itemcurrencycost`*/;
/*!50001 DROP VIEW IF EXISTS `itemcurrencycost`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemcurrencycost` AS select `chardev_cataclysm`.`itemcurrencycost`.`ItemID` AS `ItemID`,`chardev_cataclysm`.`itemcurrencycost`.`CurrencyID` AS `CurrencyID` from `chardev_cataclysm`.`itemcurrencycost` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehand` AS select `chardev_cataclysm`.`itemdamageonehand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehand`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehand`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehand`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehand`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehand`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehand`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehand`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehandcaster` AS select `chardev_cataclysm`.`itemdamageonehandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageranged`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageranged`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageranged` AS select `chardev_cataclysm`.`itemdamageranged`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageranged`.`0` AS `0`,`chardev_cataclysm`.`itemdamageranged`.`1` AS `1`,`chardev_cataclysm`.`itemdamageranged`.`2` AS `2`,`chardev_cataclysm`.`itemdamageranged`.`3` AS `3`,`chardev_cataclysm`.`itemdamageranged`.`4` AS `4`,`chardev_cataclysm`.`itemdamageranged`.`5` AS `5`,`chardev_cataclysm`.`itemdamageranged`.`6` AS `6`,`chardev_cataclysm`.`itemdamageranged`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageranged` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagethrown`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagethrown`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagethrown` AS select `chardev_cataclysm`.`itemdamagethrown`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagethrown`.`0` AS `0`,`chardev_cataclysm`.`itemdamagethrown`.`1` AS `1`,`chardev_cataclysm`.`itemdamagethrown`.`2` AS `2`,`chardev_cataclysm`.`itemdamagethrown`.`3` AS `3`,`chardev_cataclysm`.`itemdamagethrown`.`4` AS `4`,`chardev_cataclysm`.`itemdamagethrown`.`5` AS `5`,`chardev_cataclysm`.`itemdamagethrown`.`6` AS `6`,`chardev_cataclysm`.`itemdamagethrown`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagethrown` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohand` AS select `chardev_cataclysm`.`itemdamagetwohand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohandcaster` AS select `chardev_cataclysm`.`itemdamagetwohandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagewand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagewand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagewand` AS select `chardev_cataclysm`.`itemdamagewand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagewand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagewand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagewand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagewand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagewand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagewand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagewand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagewand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagewand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdisplayinfo`
--

/*!50001 DROP TABLE IF EXISTS `itemdisplayinfo`*/;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdisplayinfo` AS select `chardev_cataclysm`.`itemdisplayinfo`.`ID` AS `ID`,`chardev_cataclysm`.`itemdisplayinfo`.`f2` AS `f2`,`chardev_cataclysm`.`itemdisplayinfo`.`f3` AS `f3`,`chardev_cataclysm`.`itemdisplayinfo`.`f4` AS `f4`,`chardev_cataclysm`.`itemdisplayinfo`.`f5` AS `f5`,`chardev_cataclysm`.`itemdisplayinfo`.`Icon` AS `Icon`,`chardev_cataclysm`.`itemdisplayinfo`.`f7` AS `f7`,`chardev_cataclysm`.`itemdisplayinfo`.`f8` AS `f8`,`chardev_cataclysm`.`itemdisplayinfo`.`f9` AS `f9`,`chardev_cataclysm`.`itemdisplayinfo`.`f10` AS `f10`,`chardev_cataclysm`.`itemdisplayinfo`.`f11` AS `f11`,`chardev_cataclysm`.`itemdisplayinfo`.`f12` AS `f12`,`chardev_cataclysm`.`itemdisplayinfo`.`f13` AS `f13`,`chardev_cataclysm`.`itemdisplayinfo`.`f14` AS `f14`,`chardev_cataclysm`.`itemdisplayinfo`.`f15` AS `f15`,`chardev_cataclysm`.`itemdisplayinfo`.`f16` AS `f16`,`chardev_cataclysm`.`itemdisplayinfo`.`f17` AS `f17`,`chardev_cataclysm`.`itemdisplayinfo`.`f18` AS `f18`,`chardev_cataclysm`.`itemdisplayinfo`.`f19` AS `f19`,`chardev_cataclysm`.`itemdisplayinfo`.`f20` AS `f20`,`chardev_cataclysm`.`itemdisplayinfo`.`f21` AS `f21`,`chardev_cataclysm`.`itemdisplayinfo`.`f22` AS `f22`,`chardev_cataclysm`.`itemdisplayinfo`.`f23` AS `f23`,`chardev_cataclysm`.`itemdisplayinfo`.`f24` AS `f24`,`chardev_cataclysm`.`itemdisplayinfo`.`f25` AS `f25` from `chardev_cataclysm`.`itemdisplayinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemreforge`
--

/*!50001 DROP TABLE IF EXISTS `itemreforge`*/;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemreforge` AS select `chardev_cataclysm`.`itemreforge`.`ID` AS `ID`,`chardev_cataclysm`.`itemreforge`.`f2` AS `f2`,`chardev_cataclysm`.`itemreforge`.`f3` AS `f3`,`chardev_cataclysm`.`itemreforge`.`f4` AS `f4`,`chardev_cataclysm`.`itemreforge`.`f5` AS `f5` from `chardev_cataclysm`.`itemreforge` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `randproppoints`
--

/*!50001 DROP TABLE IF EXISTS `randproppoints`*/;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `randproppoints` AS select `chardev_cataclysm`.`randproppoints`.`ID` AS `ID`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group0` AS `PointsQuality4Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group1` AS `PointsQuality4Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group2` AS `PointsQuality4Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group3` AS `PointsQuality4Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group4` AS `PointsQuality4Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group0` AS `PointsQuality3Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group1` AS `PointsQuality3Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group2` AS `PointsQuality3Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group3` AS `PointsQuality3Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group4` AS `PointsQuality3Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group0` AS `PointsQuality2Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group1` AS `PointsQuality2Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group2` AS `PointsQuality2Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group3` AS `PointsQuality2Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group4` AS `PointsQuality2Group4` from `chardev_cataclysm`.`randproppoints` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `researchproject`
--

/*!50001 DROP TABLE IF EXISTS `researchproject`*/;
/*!50001 DROP VIEW IF EXISTS `researchproject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `researchproject` AS select `chardev_cataclysm`.`researchproject`.`ID` AS `ID`,`chardev_cataclysm`.`researchproject`.`Name` AS `Name`,`chardev_cataclysm`.`researchproject`.`Description` AS `Description`,`chardev_cataclysm`.`researchproject`.`IsRare` AS `IsRare`,`chardev_cataclysm`.`researchproject`.`ResearchBranchID` AS `ResearchBranchID`,`chardev_cataclysm`.`researchproject`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`researchproject`.`Sockets` AS `Sockets`,`chardev_cataclysm`.`researchproject`.`f8` AS `f8`,`chardev_cataclysm`.`researchproject`.`Fragments` AS `Fragments` from `chardev_cataclysm`.`researchproject` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatdistribution`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatdistribution`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatdistribution` AS select `chardev_cataclysm`.`scalingstatdistribution`.`id` AS `id`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient4` AS `Coefficient4`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient5` AS `Coefficient5`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient6` AS `Coefficient6`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient7` AS `Coefficient7`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient8` AS `Coefficient8`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient9` AS `Coefficient9`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient10` AS `Coefficient10`,`chardev_cataclysm`.`scalingstatdistribution`.`MinLevel` AS `MinLevel`,`chardev_cataclysm`.`scalingstatdistribution`.`MaxLevel` AS `MaxLevel` from `chardev_cataclysm`.`scalingstatdistribution` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatvalues`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatvalues`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatvalues` AS select `chardev_cataclysm`.`scalingstatvalues`.`id` AS `id`,`chardev_cataclysm`.`scalingstatvalues`.`level` AS `level`,`chardev_cataclysm`.`scalingstatvalues`.`dist0` AS `dist0`,`chardev_cataclysm`.`scalingstatvalues`.`dist1` AS `dist1`,`chardev_cataclysm`.`scalingstatvalues`.`dist2` AS `dist2`,`chardev_cataclysm`.`scalingstatvalues`.`dist3` AS `dist3`,`chardev_cataclysm`.`scalingstatvalues`.`dist4` AS `dist4`,`chardev_cataclysm`.`scalingstatvalues`.`dist5` AS `dist5`,`chardev_cataclysm`.`scalingstatvalues`.`dist6` AS `dist6`,`chardev_cataclysm`.`scalingstatvalues`.`dist7` AS `dist7`,`chardev_cataclysm`.`scalingstatvalues`.`dist8` AS `dist8`,`chardev_cataclysm`.`scalingstatvalues`.`dist9` AS `dist9`,`chardev_cataclysm`.`scalingstatvalues`.`dist10` AS `dist10`,`chardev_cataclysm`.`scalingstatvalues`.`dist11` AS `dist11`,`chardev_cataclysm`.`scalingstatvalues`.`dist12` AS `dist12`,`chardev_cataclysm`.`scalingstatvalues`.`dist13` AS `dist13`,`chardev_cataclysm`.`scalingstatvalues`.`dist14` AS `dist14`,`chardev_cataclysm`.`scalingstatvalues`.`dist15` AS `dist15`,`chardev_cataclysm`.`scalingstatvalues`.`dist16` AS `dist16`,`chardev_cataclysm`.`scalingstatvalues`.`dist17` AS `dist17`,`chardev_cataclysm`.`scalingstatvalues`.`dist18` AS `dist18`,`chardev_cataclysm`.`scalingstatvalues`.`dist19` AS `dist19`,`chardev_cataclysm`.`scalingstatvalues`.`dist20` AS `dist20`,`chardev_cataclysm`.`scalingstatvalues`.`dist21` AS `dist21`,`chardev_cataclysm`.`scalingstatvalues`.`dist22` AS `dist22`,`chardev_cataclysm`.`scalingstatvalues`.`dist23` AS `dist23`,`chardev_cataclysm`.`scalingstatvalues`.`dist24` AS `dist24`,`chardev_cataclysm`.`scalingstatvalues`.`dist25` AS `dist25`,`chardev_cataclysm`.`scalingstatvalues`.`dist26` AS `dist26`,`chardev_cataclysm`.`scalingstatvalues`.`dist27` AS `dist27`,`chardev_cataclysm`.`scalingstatvalues`.`dist28` AS `dist28`,`chardev_cataclysm`.`scalingstatvalues`.`dist29` AS `dist29`,`chardev_cataclysm`.`scalingstatvalues`.`dist30` AS `dist30`,`chardev_cataclysm`.`scalingstatvalues`.`dist31` AS `dist31`,`chardev_cataclysm`.`scalingstatvalues`.`dist32` AS `dist32`,`chardev_cataclysm`.`scalingstatvalues`.`dist33` AS `dist33`,`chardev_cataclysm`.`scalingstatvalues`.`dist34` AS `dist34`,`chardev_cataclysm`.`scalingstatvalues`.`dist35` AS `dist35`,`chardev_cataclysm`.`scalingstatvalues`.`dist36` AS `dist36`,`chardev_cataclysm`.`scalingstatvalues`.`dist37` AS `dist37`,`chardev_cataclysm`.`scalingstatvalues`.`dist38` AS `dist38`,`chardev_cataclysm`.`scalingstatvalues`.`dist39` AS `dist39`,`chardev_cataclysm`.`scalingstatvalues`.`dist40` AS `dist40`,`chardev_cataclysm`.`scalingstatvalues`.`dist41` AS `dist41`,`chardev_cataclysm`.`scalingstatvalues`.`dist42` AS `dist42`,`chardev_cataclysm`.`scalingstatvalues`.`dist43` AS `dist43`,`chardev_cataclysm`.`scalingstatvalues`.`dist44` AS `dist44` from `chardev_cataclysm`.`scalingstatvalues` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skilllineability`
--

/*!50001 DROP TABLE IF EXISTS `skilllineability`*/;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skilllineability` AS select `chardev_cataclysm`.`skilllineability`.`ID` AS `ID`,`chardev_cataclysm`.`skilllineability`.`SkillLineID` AS `SkillLineID`,`chardev_cataclysm`.`skilllineability`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`skilllineability`.`RaceMask` AS `RaceMask`,`chardev_cataclysm`.`skilllineability`.`ClassMask` AS `ClassMask`,`chardev_cataclysm`.`skilllineability`.`f6` AS `f6`,`chardev_cataclysm`.`skilllineability`.`f7` AS `f7`,`chardev_cataclysm`.`skilllineability`.`RequiredSkill` AS `RequiredSkill`,`chardev_cataclysm`.`skilllineability`.`ReplaceSpellID` AS `ReplaceSpellID`,`chardev_cataclysm`.`skilllineability`.`f10` AS `f10`,`chardev_cataclysm`.`skilllineability`.`Grey` AS `Grey`,`chardev_cataclysm`.`skilllineability`.`Yellow` AS `Yellow`,`chardev_cataclysm`.`skilllineability`.`f13` AS `f13`,`chardev_cataclysm`.`skilllineability`.`f14` AS `f14` from `chardev_cataclysm`.`skilllineability` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skillraceclassinfo`
--

/*!50001 DROP TABLE IF EXISTS `skillraceclassinfo`*/;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skillraceclassinfo` AS select `chardev_cataclysm`.`skillraceclassinfo`.`ID` AS `ID`,`chardev_cataclysm`.`skillraceclassinfo`.`f2` AS `f2`,`chardev_cataclysm`.`skillraceclassinfo`.`f3` AS `f3`,`chardev_cataclysm`.`skillraceclassinfo`.`f4` AS `f4`,`chardev_cataclysm`.`skillraceclassinfo`.`f5` AS `f5`,`chardev_cataclysm`.`skillraceclassinfo`.`f6` AS `f6`,`chardev_cataclysm`.`skillraceclassinfo`.`f7` AS `f7`,`chardev_cataclysm`.`skillraceclassinfo`.`f8` AS `f8`,`chardev_cataclysm`.`skillraceclassinfo`.`f9` AS `f9` from `chardev_cataclysm`.`skillraceclassinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellauraoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellauraoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellauraoptions` AS select `chardev_cataclysm`.`spellauraoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellauraoptions`.`Stacks` AS `Stacks`,`chardev_cataclysm`.`spellauraoptions`.`ProcRate` AS `ProcRate`,`chardev_cataclysm`.`spellauraoptions`.`ProcCharges` AS `ProcCharges`,`chardev_cataclysm`.`spellauraoptions`.`f5` AS `f5` from `chardev_cataclysm`.`spellauraoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellaurarestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spellaurarestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellaurarestrictions` AS select `chardev_cataclysm`.`spellaurarestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spellaurarestrictions`.`f2` AS `f2`,`chardev_cataclysm`.`spellaurarestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spellaurarestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spellaurarestrictions`.`f5` AS `f5`,`chardev_cataclysm`.`spellaurarestrictions`.`f6` AS `f6`,`chardev_cataclysm`.`spellaurarestrictions`.`f7` AS `f7`,`chardev_cataclysm`.`spellaurarestrictions`.`f8` AS `f8`,`chardev_cataclysm`.`spellaurarestrictions`.`f9` AS `f9` from `chardev_cataclysm`.`spellaurarestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcastingrequirements`
--

/*!50001 DROP TABLE IF EXISTS `spellcastingrequirements`*/;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcastingrequirements` AS select `chardev_cataclysm`.`spellcastingrequirements`.`ID` AS `ID`,`chardev_cataclysm`.`spellcastingrequirements`.`f2` AS `f2`,`chardev_cataclysm`.`spellcastingrequirements`.`f3` AS `f3`,`chardev_cataclysm`.`spellcastingrequirements`.`f4` AS `f4`,`chardev_cataclysm`.`spellcastingrequirements`.`f5` AS `f5`,`chardev_cataclysm`.`spellcastingrequirements`.`f6` AS `f6`,`chardev_cataclysm`.`spellcastingrequirements`.`f7` AS `f7` from `chardev_cataclysm`.`spellcastingrequirements` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcasttimes`
--

/*!50001 DROP TABLE IF EXISTS `spellcasttimes`*/;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcasttimes` AS select `chardev_cataclysm`.`spellcasttimes`.`ID` AS `ID`,`chardev_cataclysm`.`spellcasttimes`.`Time` AS `Time`,`chardev_cataclysm`.`spellcasttimes`.`f3` AS `f3`,`chardev_cataclysm`.`spellcasttimes`.`f4` AS `f4` from `chardev_cataclysm`.`spellcasttimes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategories`
--

/*!50001 DROP TABLE IF EXISTS `spellcategories`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategories` AS select `chardev_cataclysm`.`spellcategories`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategories`.`f2` AS `f2`,`chardev_cataclysm`.`spellcategories`.`f3` AS `f3`,`chardev_cataclysm`.`spellcategories`.`f4` AS `f4`,`chardev_cataclysm`.`spellcategories`.`f5` AS `f5`,`chardev_cataclysm`.`spellcategories`.`f6` AS `f6`,`chardev_cataclysm`.`spellcategories`.`f7` AS `f7` from `chardev_cataclysm`.`spellcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategory`
--

/*!50001 DROP TABLE IF EXISTS `spellcategory`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategory` AS select `chardev_cataclysm`.`spellcategory`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategory`.`f2` AS `f2` from `chardev_cataclysm`.`spellcategory` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellclassoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellclassoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellclassoptions` AS select `chardev_cataclysm`.`spellclassoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellclassoptions`.`f2` AS `f2`,`chardev_cataclysm`.`spellclassoptions`.`f3` AS `f3`,`chardev_cataclysm`.`spellclassoptions`.`f4` AS `f4`,`chardev_cataclysm`.`spellclassoptions`.`f5` AS `f5`,`chardev_cataclysm`.`spellclassoptions`.`SpellClassID` AS `SpellClassID`,`chardev_cataclysm`.`spellclassoptions`.`f7` AS `f7` from `chardev_cataclysm`.`spellclassoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcooldowns`
--

/*!50001 DROP TABLE IF EXISTS `spellcooldowns`*/;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcooldowns` AS select `chardev_cataclysm`.`spellcooldowns`.`ID` AS `ID`,`chardev_cataclysm`.`spellcooldowns`.`Spell` AS `Spell`,`chardev_cataclysm`.`spellcooldowns`.`Category` AS `Category`,`chardev_cataclysm`.`spellcooldowns`.`Global` AS `Global` from `chardev_cataclysm`.`spellcooldowns` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelldifficulty`
--

/*!50001 DROP TABLE IF EXISTS `spelldifficulty`*/;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelldifficulty` AS select `chardev_cataclysm`.`spelldifficulty`.`f1` AS `f1`,`chardev_cataclysm`.`spelldifficulty`.`f2` AS `f2`,`chardev_cataclysm`.`spelldifficulty`.`f3` AS `f3`,`chardev_cataclysm`.`spelldifficulty`.`f4` AS `f4`,`chardev_cataclysm`.`spelldifficulty`.`f5` AS `f5` from `chardev_cataclysm`.`spelldifficulty` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellduration`
--

/*!50001 DROP TABLE IF EXISTS `spellduration`*/;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellduration` AS select `chardev_cataclysm`.`spellduration`.`ID` AS `ID`,`chardev_cataclysm`.`spellduration`.`Duration` AS `Duration`,`chardev_cataclysm`.`spellduration`.`f3` AS `f3`,`chardev_cataclysm`.`spellduration`.`f4` AS `f4` from `chardev_cataclysm`.`spellduration` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelleffect`
--

/*!50001 DROP TABLE IF EXISTS `spelleffect`*/;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelleffect` AS select `chardev_cataclysm`.`spelleffect`.`ID` AS `ID`,`chardev_cataclysm`.`spelleffect`.`Aura` AS `Aura`,`chardev_cataclysm`.`spelleffect`.`ProcValue` AS `ProcValue`,`chardev_cataclysm`.`spelleffect`.`Effect` AS `Effect`,`chardev_cataclysm`.`spelleffect`.`Period` AS `Period`,`chardev_cataclysm`.`spelleffect`.`Value` AS `Value`,`chardev_cataclysm`.`spelleffect`.`Coefficient` AS `Coefficient`,`chardev_cataclysm`.`spelleffect`.`f8` AS `f8`,`chardev_cataclysm`.`spelleffect`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelleffect`.`Dice` AS `Dice`,`chardev_cataclysm`.`spelleffect`.`ItemID` AS `ItemID`,`chardev_cataclysm`.`spelleffect`.`f12` AS `f12`,`chardev_cataclysm`.`spelleffect`.`SecondaryEffect` AS `SecondaryEffect`,`chardev_cataclysm`.`spelleffect`.`UsedStat` AS `UsedStat`,`chardev_cataclysm`.`spelleffect`.`ProcChance` AS `ProcChance`,`chardev_cataclysm`.`spelleffect`.`SpellRadiusID` AS `SpellRadiusID`,`chardev_cataclysm`.`spelleffect`.`f17` AS `f17`,`chardev_cataclysm`.`spelleffect`.`LevelModifier` AS `LevelModifier`,`chardev_cataclysm`.`spelleffect`.`f19` AS `f19`,`chardev_cataclysm`.`spelleffect`.`f20` AS `f20`,`chardev_cataclysm`.`spelleffect`.`f21` AS `f21`,`chardev_cataclysm`.`spelleffect`.`f22` AS `f22`,`chardev_cataclysm`.`spelleffect`.`f23` AS `f23`,`chardev_cataclysm`.`spelleffect`.`f24` AS `f24`,`chardev_cataclysm`.`spelleffect`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`spelleffect`.`Index` AS `Index` from `chardev_cataclysm`.`spelleffect` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellequippeditems`
--

/*!50001 DROP TABLE IF EXISTS `spellequippeditems`*/;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellequippeditems` AS select `chardev_cataclysm`.`spellequippeditems`.`ID` AS `ID`,`chardev_cataclysm`.`spellequippeditems`.`ItemClassID` AS `ItemClassID`,`chardev_cataclysm`.`spellequippeditems`.`InventorySlotMask` AS `InventorySlotMask`,`chardev_cataclysm`.`spellequippeditems`.`ItemSubClassMask` AS `ItemSubClassMask` from `chardev_cataclysm`.`spellequippeditems` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyout`
--

/*!50001 DROP TABLE IF EXISTS `spellflyout`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyout` AS select `chardev_cataclysm`.`spellflyout`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyout`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyout`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyout`.`f4` AS `f4`,`chardev_cataclysm`.`spellflyout`.`f5` AS `f5`,`chardev_cataclysm`.`spellflyout`.`f6` AS `f6`,`chardev_cataclysm`.`spellflyout`.`f7` AS `f7` from `chardev_cataclysm`.`spellflyout` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyoutitem`
--

/*!50001 DROP TABLE IF EXISTS `spellflyoutitem`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyoutitem` AS select `chardev_cataclysm`.`spellflyoutitem`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyoutitem`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyoutitem`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyoutitem`.`f4` AS `f4` from `chardev_cataclysm`.`spellflyoutitem` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellfocusobject`
--

/*!50001 DROP TABLE IF EXISTS `spellfocusobject`*/;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellfocusobject` AS select `chardev_cataclysm`.`spellfocusobject`.`ID` AS `ID`,`chardev_cataclysm`.`spellfocusobject`.`f2` AS `f2` from `chardev_cataclysm`.`spellfocusobject` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellicon`
--

/*!50001 DROP TABLE IF EXISTS `spellicon`*/;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellicon` AS select `chardev_cataclysm`.`spellicon`.`ID` AS `ID`,`chardev_cataclysm`.`spellicon`.`Icon` AS `Icon` from `chardev_cataclysm`.`spellicon` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellinterrupts`
--

/*!50001 DROP TABLE IF EXISTS `spellinterrupts`*/;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellinterrupts` AS select `chardev_cataclysm`.`spellinterrupts`.`ID` AS `ID`,`chardev_cataclysm`.`spellinterrupts`.`f2` AS `f2`,`chardev_cataclysm`.`spellinterrupts`.`f3` AS `f3`,`chardev_cataclysm`.`spellinterrupts`.`f4` AS `f4`,`chardev_cataclysm`.`spellinterrupts`.`f5` AS `f5`,`chardev_cataclysm`.`spellinterrupts`.`f6` AS `f6` from `chardev_cataclysm`.`spellinterrupts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellitemenchantmentcondition`
--

/*!50001 DROP TABLE IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellitemenchantmentcondition` AS select `chardev_cataclysm`.`spellitemenchantmentcondition`.`ID` AS `ID`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color1` AS `Color1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color2` AS `Color2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color3` AS `Color3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color4` AS `Color4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color5` AS `Color5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f7` AS `f7`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f8` AS `f8`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f9` AS `f9`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f10` AS `f10`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f11` AS `f11`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_1` AS `f12_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_2` AS `f12_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_3` AS `f12_3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator1` AS `Comparator1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator2` AS `Comparator2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator3` AS `Comparator3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator4` AS `Comparator4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator5` AS `Comparator5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor1` AS `CompareColor1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor2` AS `CompareColor2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor3` AS `CompareColor3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor4` AS `CompareColor4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor5` AS `CompareColor5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_1` AS `f13_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_2` AS `f13_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value1` AS `Value1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value2` AS `Value2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value3` AS `Value3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value4` AS `Value4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value5` AS `Value5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f27` AS `f27`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f28` AS `f28`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f29` AS `f29`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f30` AS `f30`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f31` AS `f31` from `chardev_cataclysm`.`spellitemenchantmentcondition` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelllevels`
--

/*!50001 DROP TABLE IF EXISTS `spelllevels`*/;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelllevels` AS select `chardev_cataclysm`.`spelllevels`.`ID` AS `ID`,`chardev_cataclysm`.`spelllevels`.`f2` AS `f2`,`chardev_cataclysm`.`spelllevels`.`f3` AS `f3`,`chardev_cataclysm`.`spelllevels`.`f4` AS `f4` from `chardev_cataclysm`.`spelllevels` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmechanic`
--

/*!50001 DROP TABLE IF EXISTS `spellmechanic`*/;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmechanic` AS select `chardev_cataclysm`.`spellmechanic`.`ID` AS `ID`,`chardev_cataclysm`.`spellmechanic`.`f2` AS `f2` from `chardev_cataclysm`.`spellmechanic` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissile`
--

/*!50001 DROP TABLE IF EXISTS `spellmissile`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissile` AS select `chardev_cataclysm`.`spellmissile`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissile`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissile`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissile`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissile`.`f5` AS `f5`,`chardev_cataclysm`.`spellmissile`.`f6` AS `f6`,`chardev_cataclysm`.`spellmissile`.`f7` AS `f7`,`chardev_cataclysm`.`spellmissile`.`f8` AS `f8`,`chardev_cataclysm`.`spellmissile`.`f9` AS `f9`,`chardev_cataclysm`.`spellmissile`.`f10` AS `f10`,`chardev_cataclysm`.`spellmissile`.`f11` AS `f11`,`chardev_cataclysm`.`spellmissile`.`f12` AS `f12`,`chardev_cataclysm`.`spellmissile`.`f13` AS `f13`,`chardev_cataclysm`.`spellmissile`.`f14` AS `f14`,`chardev_cataclysm`.`spellmissile`.`f15` AS `f15` from `chardev_cataclysm`.`spellmissile` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissilemotion`
--

/*!50001 DROP TABLE IF EXISTS `spellmissilemotion`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissilemotion` AS select `chardev_cataclysm`.`spellmissilemotion`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissilemotion`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissilemotion`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissilemotion`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissilemotion`.`f5` AS `f5` from `chardev_cataclysm`.`spellmissilemotion` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellpower`
--

/*!50001 DROP TABLE IF EXISTS `spellpower`*/;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellpower` AS select `chardev_cataclysm`.`spellpower`.`ID` AS `ID`,`chardev_cataclysm`.`spellpower`.`Absolute` AS `Absolute`,`chardev_cataclysm`.`spellpower`.`f3` AS `f3`,`chardev_cataclysm`.`spellpower`.`Percent` AS `Percent`,`chardev_cataclysm`.`spellpower`.`f5` AS `f5`,`chardev_cataclysm`.`spellpower`.`f6` AS `f6`,`chardev_cataclysm`.`spellpower`.`f7` AS `f7` from `chardev_cataclysm`.`spellpower` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellradius`
--

/*!50001 DROP TABLE IF EXISTS `spellradius`*/;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellradius` AS select `chardev_cataclysm`.`spellradius`.`ID` AS `ID`,`chardev_cataclysm`.`spellradius`.`Radius` AS `Radius`,`chardev_cataclysm`.`spellradius`.`f3` AS `f3`,`chardev_cataclysm`.`spellradius`.`f4` AS `f4` from `chardev_cataclysm`.`spellradius` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellreagents`
--

/*!50001 DROP TABLE IF EXISTS `spellreagents`*/;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellreagents` AS select `chardev_cataclysm`.`spellreagents`.`ID` AS `ID`,`chardev_cataclysm`.`spellreagents`.`f2` AS `f2`,`chardev_cataclysm`.`spellreagents`.`f3` AS `f3`,`chardev_cataclysm`.`spellreagents`.`f4` AS `f4`,`chardev_cataclysm`.`spellreagents`.`f5` AS `f5`,`chardev_cataclysm`.`spellreagents`.`f6` AS `f6`,`chardev_cataclysm`.`spellreagents`.`f7` AS `f7`,`chardev_cataclysm`.`spellreagents`.`f8` AS `f8`,`chardev_cataclysm`.`spellreagents`.`f9` AS `f9`,`chardev_cataclysm`.`spellreagents`.`f10` AS `f10`,`chardev_cataclysm`.`spellreagents`.`f11` AS `f11`,`chardev_cataclysm`.`spellreagents`.`f12` AS `f12`,`chardev_cataclysm`.`spellreagents`.`f13` AS `f13`,`chardev_cataclysm`.`spellreagents`.`f14` AS `f14`,`chardev_cataclysm`.`spellreagents`.`f15` AS `f15`,`chardev_cataclysm`.`spellreagents`.`f16` AS `f16`,`chardev_cataclysm`.`spellreagents`.`f17` AS `f17` from `chardev_cataclysm`.`spellreagents` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellrunecost`
--

/*!50001 DROP TABLE IF EXISTS `spellrunecost`*/;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellrunecost` AS select `chardev_cataclysm`.`spellrunecost`.`ID` AS `ID`,`chardev_cataclysm`.`spellrunecost`.`f2` AS `f2`,`chardev_cataclysm`.`spellrunecost`.`f3` AS `f3`,`chardev_cataclysm`.`spellrunecost`.`f4` AS `f4`,`chardev_cataclysm`.`spellrunecost`.`f5` AS `f5` from `chardev_cataclysm`.`spellrunecost` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellscaling`
--

/*!50001 DROP TABLE IF EXISTS `spellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellscaling` AS select `chardev_cataclysm`.`spellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`spellscaling`.`CastTimeStart` AS `CastTimeStart`,`chardev_cataclysm`.`spellscaling`.`CastTimeEnd` AS `CastTimeEnd`,`chardev_cataclysm`.`spellscaling`.`Intervals` AS `Intervals`,`chardev_cataclysm`.`spellscaling`.`Distribution` AS `Distribution`,`chardev_cataclysm`.`spellscaling`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`spellscaling`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`spellscaling`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`spellscaling`.`Dice1` AS `Dice1`,`chardev_cataclysm`.`spellscaling`.`Dice2` AS `Dice2`,`chardev_cataclysm`.`spellscaling`.`Dice3` AS `Dice3`,`chardev_cataclysm`.`spellscaling`.`f12` AS `f12`,`chardev_cataclysm`.`spellscaling`.`f13` AS `f13`,`chardev_cataclysm`.`spellscaling`.`f14` AS `f14`,`chardev_cataclysm`.`spellscaling`.`f15` AS `f15`,`chardev_cataclysm`.`spellscaling`.`f16` AS `f16` from `chardev_cataclysm`.`spellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshift`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshift`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshift` AS select `chardev_cataclysm`.`spellshapeshift`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshift`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshift`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshift`.`SpellShapeshiftFormID` AS `SpellShapeshiftFormID`,`chardev_cataclysm`.`spellshapeshift`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshift`.`f6` AS `f6` from `chardev_cataclysm`.`spellshapeshift` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshiftform`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshiftform`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshiftform` AS select `chardev_cataclysm`.`spellshapeshiftform`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshiftform`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshiftform`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshiftform`.`f4` AS `f4`,`chardev_cataclysm`.`spellshapeshiftform`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshiftform`.`f6` AS `f6`,`chardev_cataclysm`.`spellshapeshiftform`.`f7` AS `f7`,`chardev_cataclysm`.`spellshapeshiftform`.`f8` AS `f8`,`chardev_cataclysm`.`spellshapeshiftform`.`f9` AS `f9`,`chardev_cataclysm`.`spellshapeshiftform`.`f10` AS `f10`,`chardev_cataclysm`.`spellshapeshiftform`.`f11` AS `f11`,`chardev_cataclysm`.`spellshapeshiftform`.`f12` AS `f12`,`chardev_cataclysm`.`spellshapeshiftform`.`f13` AS `f13`,`chardev_cataclysm`.`spellshapeshiftform`.`f14` AS `f14`,`chardev_cataclysm`.`spellshapeshiftform`.`f15` AS `f15`,`chardev_cataclysm`.`spellshapeshiftform`.`f16` AS `f16`,`chardev_cataclysm`.`spellshapeshiftform`.`f17` AS `f17`,`chardev_cataclysm`.`spellshapeshiftform`.`f18` AS `f18`,`chardev_cataclysm`.`spellshapeshiftform`.`f19` AS `f19`,`chardev_cataclysm`.`spellshapeshiftform`.`f20` AS `f20` from `chardev_cataclysm`.`spellshapeshiftform` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelltargetrestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spelltargetrestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelltargetrestrictions` AS select `chardev_cataclysm`.`spelltargetrestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spelltargetrestrictions`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelltargetrestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spelltargetrestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spelltargetrestrictions`.`f5` AS `f5` from `chardev_cataclysm`.`spelltargetrestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellvisual`
--

/*!50001 DROP TABLE IF EXISTS `spellvisual`*/;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellvisual` AS select `chardev_cataclysm`.`spellvisual`.`ID` AS `ID`,`chardev_cataclysm`.`spellvisual`.`f2` AS `f2`,`chardev_cataclysm`.`spellvisual`.`f3` AS `f3`,`chardev_cataclysm`.`spellvisual`.`f4` AS `f4`,`chardev_cataclysm`.`spellvisual`.`f5` AS `f5`,`chardev_cataclysm`.`spellvisual`.`f6` AS `f6`,`chardev_cataclysm`.`spellvisual`.`f7` AS `f7`,`chardev_cataclysm`.`spellvisual`.`f8` AS `f8`,`chardev_cataclysm`.`spellvisual`.`f9` AS `f9`,`chardev_cataclysm`.`spellvisual`.`f10` AS `f10`,`chardev_cataclysm`.`spellvisual`.`f11` AS `f11`,`chardev_cataclysm`.`spellvisual`.`f12` AS `f12`,`chardev_cataclysm`.`spellvisual`.`f13` AS `f13`,`chardev_cataclysm`.`spellvisual`.`f14` AS `f14`,`chardev_cataclysm`.`spellvisual`.`f15` AS `f15`,`chardev_cataclysm`.`spellvisual`.`f16` AS `f16`,`chardev_cataclysm`.`spellvisual`.`f17` AS `f17`,`chardev_cataclysm`.`spellvisual`.`f18` AS `f18`,`chardev_cataclysm`.`spellvisual`.`f19` AS `f19`,`chardev_cataclysm`.`spellvisual`.`f20` AS `f20`,`chardev_cataclysm`.`spellvisual`.`f21` AS `f21`,`chardev_cataclysm`.`spellvisual`.`f22` AS `f22`,`chardev_cataclysm`.`spellvisual`.`f23` AS `f23`,`chardev_cataclysm`.`spellvisual`.`f24` AS `f24`,`chardev_cataclysm`.`spellvisual`.`f25` AS `f25`,`chardev_cataclysm`.`spellvisual`.`f26` AS `f26`,`chardev_cataclysm`.`spellvisual`.`f27` AS `f27`,`chardev_cataclysm`.`spellvisual`.`f28` AS `f28`,`chardev_cataclysm`.`spellvisual`.`f29` AS `f29`,`chardev_cataclysm`.`spellvisual`.`f30` AS `f30`,`chardev_cataclysm`.`spellvisual`.`f31` AS `f31`,`chardev_cataclysm`.`spellvisual`.`f32` AS `f32` from `chardev_cataclysm`.`spellvisual` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talent`
--

/*!50001 DROP TABLE IF EXISTS `talent`*/;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talent` AS select `chardev_cataclysm`.`talent`.`ID` AS `ID`,`chardev_cataclysm`.`talent`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talent`.`Row` AS `Row`,`chardev_cataclysm`.`talent`.`Col` AS `Col`,`chardev_cataclysm`.`talent`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`talent`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`talent`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`talent`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`talent`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`talent`.`RequiredTalentID1` AS `RequiredTalentID1`,`chardev_cataclysm`.`talent`.`RequiredTalentID2` AS `RequiredTalentID2`,`chardev_cataclysm`.`talent`.`RequiredTalentID3` AS `RequiredTalentID3`,`chardev_cataclysm`.`talent`.`f13` AS `f13`,`chardev_cataclysm`.`talent`.`f14` AS `f14`,`chardev_cataclysm`.`talent`.`f15` AS `f15`,`chardev_cataclysm`.`talent`.`f16` AS `f16`,`chardev_cataclysm`.`talent`.`f17` AS `f17`,`chardev_cataclysm`.`talent`.`PetMask0` AS `PetMask0`,`chardev_cataclysm`.`talent`.`PetMask1` AS `PetMask1` from `chardev_cataclysm`.`talent` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talenttreeprimaryspells`
--

/*!50001 DROP TABLE IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talenttreeprimaryspells` AS select `chardev_cataclysm`.`talenttreeprimaryspells`.`ID` AS `ID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`f4` AS `f4` from `chardev_cataclysm`.`talenttreeprimaryspells` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Current Database: `chardev_cataclysm_fr`
--

USE `chardev_cataclysm_fr`;

--
-- Final view structure for view `gemproperties`
--

/*!50001 DROP TABLE IF EXISTS `gemproperties`*/;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gemproperties` AS select `chardev_cataclysm`.`gemproperties`.`ID` AS `ID`,`chardev_cataclysm`.`gemproperties`.`SpellItemEnchantmentID` AS `SpellItemEnchantmentID`,`chardev_cataclysm`.`gemproperties`.`f3` AS `f3`,`chardev_cataclysm`.`gemproperties`.`f4` AS `f4`,`chardev_cataclysm`.`gemproperties`.`f5` AS `f5`,`chardev_cataclysm`.`gemproperties`.`MinItemLevel` AS `MinItemLevel` from `chardev_cataclysm`.`gemproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `glyphproperties`
--

/*!50001 DROP TABLE IF EXISTS `glyphproperties`*/;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `glyphproperties` AS select `chardev_cataclysm`.`glyphproperties`.`ID` AS `ID`,`chardev_cataclysm`.`glyphproperties`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`glyphproperties`.`Type` AS `Type`,`chardev_cataclysm`.`glyphproperties`.`f4` AS `f4` from `chardev_cataclysm`.`glyphproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecrit` AS select `chardev_cataclysm`.`gtchancetomeleecrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecritbase` AS select `chardev_cataclysm`.`gtchancetomeleecritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcrit` AS select `chardev_cataclysm`.`gtchancetospellcrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcritbase` AS select `chardev_cataclysm`.`gtchancetospellcritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtcombatratings`
--

/*!50001 DROP TABLE IF EXISTS `gtcombatratings`*/;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtcombatratings` AS select `chardev_cataclysm`.`gtcombatratings`.`ID` AS `ID`,`chardev_cataclysm`.`gtcombatratings`.`Value` AS `Value` from `chardev_cataclysm`.`gtcombatratings` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenhp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenhp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenhp` AS select `chardev_cataclysm`.`gtoctregenhp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenhp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenhp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenmp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenmp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenmp` AS select `chardev_cataclysm`.`gtoctregenmp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenmp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenmp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenhpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenhpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenhpperspt` AS select `chardev_cataclysm`.`gtregenhpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenhpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenhpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenmpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenmpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenmpperspt` AS select `chardev_cataclysm`.`gtregenmpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenmpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenmpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtspellscaling`
--

/*!50001 DROP TABLE IF EXISTS `gtspellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtspellscaling` AS select `chardev_cataclysm`.`gtspellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`gtspellscaling`.`Value` AS `Value` from `chardev_cataclysm`.`gtspellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item`
--

/*!50001 DROP TABLE IF EXISTS `item`*/;
/*!50001 DROP VIEW IF EXISTS `item`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item` AS select `chardev_cataclysm`.`item`.`ID` AS `ID`,`chardev_cataclysm`.`item`.`ItemClass` AS `ItemClass`,`chardev_cataclysm`.`item`.`ItemSubClass` AS `ItemSubClass`,`chardev_cataclysm`.`item`.`f4` AS `f4`,`chardev_cataclysm`.`item`.`f5` AS `f5`,`chardev_cataclysm`.`item`.`ItemDisplayInfoID` AS `ItemDisplayInfoID`,`chardev_cataclysm`.`item`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item`.`f8` AS `f8` from `chardev_cataclysm`.`item` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item_sparse`
--

/*!50001 DROP TABLE IF EXISTS `item_sparse`*/;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item_sparse` AS select `chardev_cataclysm`.`item_sparse`.`ID` AS `ID`,`chardev_cataclysm`.`item_sparse`.`Quality` AS `Quality`,`chardev_cataclysm`.`item_sparse`.`TypeMask` AS `TypeMask`,`chardev_cataclysm`.`item_sparse`.`TypeMask2` AS `TypeMask2`,`chardev_cataclysm`.`item_sparse`.`TypeMask3` AS `TypeMask3`,`chardev_cataclysm`.`item_sparse`.`TypeMask4` AS `TypeMask4`,`chardev_cataclysm`.`item_sparse`.`TypeMask5` AS `TypeMask5`,`chardev_cataclysm`.`item_sparse`.`BuyPrice` AS `BuyPrice`,`chardev_cataclysm`.`item_sparse`.`SellPrice` AS `SellPrice`,`chardev_cataclysm`.`item_sparse`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item_sparse`.`ChrClassMask` AS `ChrClassMask`,`chardev_cataclysm`.`item_sparse`.`ChrRaceMask` AS `ChrRaceMask`,`chardev_cataclysm`.`item_sparse`.`Level` AS `Level`,`chardev_cataclysm`.`item_sparse`.`RequiredCharacterLevel` AS `RequiredCharacterLevel`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineID` AS `RequiredSkillLineID`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineLevel` AS `RequiredSkillLineLevel`,`chardev_cataclysm`.`item_sparse`.`f14` AS `f14`,`chardev_cataclysm`.`item_sparse`.`f15` AS `f15`,`chardev_cataclysm`.`item_sparse`.`f16` AS `f16`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionID` AS `RequiredFactionID`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionReputation` AS `RequiredFactionReputation`,`chardev_cataclysm`.`item_sparse`.`Unique` AS `Unique`,`chardev_cataclysm`.`item_sparse`.`MaximumStackSize` AS `MaximumStackSize`,`chardev_cataclysm`.`item_sparse`.`f21` AS `f21`,`chardev_cataclysm`.`item_sparse`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`item_sparse`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`item_sparse`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`item_sparse`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`item_sparse`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`item_sparse`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`item_sparse`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`item_sparse`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`item_sparse`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`item_sparse`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`item_sparse`.`StatValue1` AS `StatValue1`,`chardev_cataclysm`.`item_sparse`.`StatValue2` AS `StatValue2`,`chardev_cataclysm`.`item_sparse`.`StatValue3` AS `StatValue3`,`chardev_cataclysm`.`item_sparse`.`StatValue4` AS `StatValue4`,`chardev_cataclysm`.`item_sparse`.`StatValue5` AS `StatValue5`,`chardev_cataclysm`.`item_sparse`.`StatValue6` AS `StatValue6`,`chardev_cataclysm`.`item_sparse`.`StatValue7` AS `StatValue7`,`chardev_cataclysm`.`item_sparse`.`StatValue8` AS `StatValue8`,`chardev_cataclysm`.`item_sparse`.`StatValue9` AS `StatValue9`,`chardev_cataclysm`.`item_sparse`.`StatValue10` AS `StatValue10`,`chardev_cataclysm`.`item_sparse`.`f42` AS `f42`,`chardev_cataclysm`.`item_sparse`.`f43` AS `f43`,`chardev_cataclysm`.`item_sparse`.`f44` AS `f44`,`chardev_cataclysm`.`item_sparse`.`f45` AS `f45`,`chardev_cataclysm`.`item_sparse`.`f46` AS `f46`,`chardev_cataclysm`.`item_sparse`.`f47` AS `f47`,`chardev_cataclysm`.`item_sparse`.`f48` AS `f48`,`chardev_cataclysm`.`item_sparse`.`f49` AS `f49`,`chardev_cataclysm`.`item_sparse`.`f50` AS `f50`,`chardev_cataclysm`.`item_sparse`.`f51` AS `f51`,`chardev_cataclysm`.`item_sparse`.`f52` AS `f52`,`chardev_cataclysm`.`item_sparse`.`f53` AS `f53`,`chardev_cataclysm`.`item_sparse`.`f54` AS `f54`,`chardev_cataclysm`.`item_sparse`.`f55` AS `f55`,`chardev_cataclysm`.`item_sparse`.`f56` AS `f56`,`chardev_cataclysm`.`item_sparse`.`f57` AS `f57`,`chardev_cataclysm`.`item_sparse`.`f58` AS `f58`,`chardev_cataclysm`.`item_sparse`.`f59` AS `f59`,`chardev_cataclysm`.`item_sparse`.`f60` AS `f60`,`chardev_cataclysm`.`item_sparse`.`f61` AS `f61`,`chardev_cataclysm`.`item_sparse`.`ScalingStatDistributionID` AS `ScalingStatDistributionID`,`chardev_cataclysm`.`item_sparse`.`f63` AS `f63`,`chardev_cataclysm`.`item_sparse`.`Delay` AS `Delay`,`chardev_cataclysm`.`item_sparse`.`f65` AS `f65`,`chardev_cataclysm`.`item_sparse`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`item_sparse`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`item_sparse`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`item_sparse`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`item_sparse`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger1` AS `SpellTrigger1`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger2` AS `SpellTrigger2`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger3` AS `SpellTrigger3`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger4` AS `SpellTrigger4`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger5` AS `SpellTrigger5`,`chardev_cataclysm`.`item_sparse`.`SpellCharges1` AS `SpellCharges1`,`chardev_cataclysm`.`item_sparse`.`SpellCharges2` AS `SpellCharges2`,`chardev_cataclysm`.`item_sparse`.`SpellCharges3` AS `SpellCharges3`,`chardev_cataclysm`.`item_sparse`.`SpellCharges4` AS `SpellCharges4`,`chardev_cataclysm`.`item_sparse`.`SpellCharges5` AS `SpellCharges5`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown1` AS `SpellCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown2` AS `SpellCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown3` AS `SpellCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown4` AS `SpellCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown5` AS `SpellCooldown5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID1` AS `SpellCategoryID1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID2` AS `SpellCategoryID2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID3` AS `SpellCategoryID3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID4` AS `SpellCategoryID4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID5` AS `SpellCategoryID5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown1` AS `SpellCategoryCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown2` AS `SpellCategoryCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown3` AS `SpellCategoryCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown4` AS `SpellCategoryCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown5` AS `SpellCategoryCooldown5`,`chardev_cataclysm`.`item_sparse`.`Binds` AS `Binds`,`chardev_cataclysm`.`item_sparse`.`Name` AS `Name`,`chardev_cataclysm`.`item_sparse`.`f98` AS `f98`,`chardev_cataclysm`.`item_sparse`.`f99` AS `f99`,`chardev_cataclysm`.`item_sparse`.`f100` AS `f100`,`chardev_cataclysm`.`item_sparse`.`Description` AS `Description`,`chardev_cataclysm`.`item_sparse`.`QuestID` AS `QuestID`,`chardev_cataclysm`.`item_sparse`.`f103` AS `f103`,`chardev_cataclysm`.`item_sparse`.`f104` AS `f104`,`chardev_cataclysm`.`item_sparse`.`f105` AS `f105`,`chardev_cataclysm`.`item_sparse`.`f106` AS `f106`,`chardev_cataclysm`.`item_sparse`.`f107` AS `f107`,`chardev_cataclysm`.`item_sparse`.`f108` AS `f108`,`chardev_cataclysm`.`item_sparse`.`RandomPropertiesID` AS `RandomPropertiesID`,`chardev_cataclysm`.`item_sparse`.`RandomSuffixID` AS `RandomSuffixID`,`chardev_cataclysm`.`item_sparse`.`ItemSetID` AS `ItemSetID`,`chardev_cataclysm`.`item_sparse`.`f113` AS `f113`,`chardev_cataclysm`.`item_sparse`.`f114` AS `f114`,`chardev_cataclysm`.`item_sparse`.`f115` AS `f115`,`chardev_cataclysm`.`item_sparse`.`f116` AS `f116`,`chardev_cataclysm`.`item_sparse`.`SocketColor1` AS `SocketColor1`,`chardev_cataclysm`.`item_sparse`.`SocketColor2` AS `SocketColor2`,`chardev_cataclysm`.`item_sparse`.`SocketColor3` AS `SocketColor3`,`chardev_cataclysm`.`item_sparse`.`f120` AS `f120`,`chardev_cataclysm`.`item_sparse`.`f121` AS `f121`,`chardev_cataclysm`.`item_sparse`.`f122` AS `f122`,`chardev_cataclysm`.`item_sparse`.`SocketBonusID` AS `SocketBonusID`,`chardev_cataclysm`.`item_sparse`.`GemPropertiesID` AS `GemPropertiesID`,`chardev_cataclysm`.`item_sparse`.`f125` AS `f125`,`chardev_cataclysm`.`item_sparse`.`f126` AS `f126`,`chardev_cataclysm`.`item_sparse`.`LimitCategory` AS `LimitCategory`,`chardev_cataclysm`.`item_sparse`.`f128` AS `f128`,`chardev_cataclysm`.`item_sparse`.`DamageRange` AS `DamageRange`,`chardev_cataclysm`.`item_sparse`.`LimitCategoryMultiple` AS `LimitCategoryMultiple`,`chardev_cataclysm`.`item_sparse`.`f131` AS `f131`,`chardev_cataclysm`.`item_sparse`.`Version` AS `Version`,`chardev_cataclysm`.`item_sparse`.`Locale` AS `Locale` from `chardev_cataclysm`.`item_sparse` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorquality`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorquality`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorquality` AS select `chardev_cataclysm`.`itemarmorquality`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorquality`.`0` AS `0`,`chardev_cataclysm`.`itemarmorquality`.`1` AS `1`,`chardev_cataclysm`.`itemarmorquality`.`2` AS `2`,`chardev_cataclysm`.`itemarmorquality`.`3` AS `3`,`chardev_cataclysm`.`itemarmorquality`.`4` AS `4`,`chardev_cataclysm`.`itemarmorquality`.`5` AS `5`,`chardev_cataclysm`.`itemarmorquality`.`6` AS `6`,`chardev_cataclysm`.`itemarmorquality`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemarmorquality` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorshield`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorshield`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorshield` AS select `chardev_cataclysm`.`itemarmorshield`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorshield`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmorshield`.`0` AS `0`,`chardev_cataclysm`.`itemarmorshield`.`1` AS `1`,`chardev_cataclysm`.`itemarmorshield`.`2` AS `2`,`chardev_cataclysm`.`itemarmorshield`.`3` AS `3`,`chardev_cataclysm`.`itemarmorshield`.`4` AS `4`,`chardev_cataclysm`.`itemarmorshield`.`5` AS `5`,`chardev_cataclysm`.`itemarmorshield`.`6` AS `6` from `chardev_cataclysm`.`itemarmorshield` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmortotal`
--

/*!50001 DROP TABLE IF EXISTS `itemarmortotal`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmortotal` AS select `chardev_cataclysm`.`itemarmortotal`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmortotal`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmortotal`.`1` AS `1`,`chardev_cataclysm`.`itemarmortotal`.`2` AS `2`,`chardev_cataclysm`.`itemarmortotal`.`3` AS `3`,`chardev_cataclysm`.`itemarmortotal`.`4` AS `4` from `chardev_cataclysm`.`itemarmortotal` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehand` AS select `chardev_cataclysm`.`itemdamageonehand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehand`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehand`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehand`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehand`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehand`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehand`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehand`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehandcaster` AS select `chardev_cataclysm`.`itemdamageonehandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageranged`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageranged`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageranged` AS select `chardev_cataclysm`.`itemdamageranged`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageranged`.`0` AS `0`,`chardev_cataclysm`.`itemdamageranged`.`1` AS `1`,`chardev_cataclysm`.`itemdamageranged`.`2` AS `2`,`chardev_cataclysm`.`itemdamageranged`.`3` AS `3`,`chardev_cataclysm`.`itemdamageranged`.`4` AS `4`,`chardev_cataclysm`.`itemdamageranged`.`5` AS `5`,`chardev_cataclysm`.`itemdamageranged`.`6` AS `6`,`chardev_cataclysm`.`itemdamageranged`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageranged` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagethrown`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagethrown`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagethrown` AS select `chardev_cataclysm`.`itemdamagethrown`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagethrown`.`0` AS `0`,`chardev_cataclysm`.`itemdamagethrown`.`1` AS `1`,`chardev_cataclysm`.`itemdamagethrown`.`2` AS `2`,`chardev_cataclysm`.`itemdamagethrown`.`3` AS `3`,`chardev_cataclysm`.`itemdamagethrown`.`4` AS `4`,`chardev_cataclysm`.`itemdamagethrown`.`5` AS `5`,`chardev_cataclysm`.`itemdamagethrown`.`6` AS `6`,`chardev_cataclysm`.`itemdamagethrown`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagethrown` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohand` AS select `chardev_cataclysm`.`itemdamagetwohand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohandcaster` AS select `chardev_cataclysm`.`itemdamagetwohandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagewand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagewand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagewand` AS select `chardev_cataclysm`.`itemdamagewand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagewand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagewand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagewand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagewand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagewand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagewand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagewand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagewand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagewand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdisplayinfo`
--

/*!50001 DROP TABLE IF EXISTS `itemdisplayinfo`*/;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdisplayinfo` AS select `chardev_cataclysm`.`itemdisplayinfo`.`ID` AS `ID`,`chardev_cataclysm`.`itemdisplayinfo`.`f2` AS `f2`,`chardev_cataclysm`.`itemdisplayinfo`.`f3` AS `f3`,`chardev_cataclysm`.`itemdisplayinfo`.`f4` AS `f4`,`chardev_cataclysm`.`itemdisplayinfo`.`f5` AS `f5`,`chardev_cataclysm`.`itemdisplayinfo`.`Icon` AS `Icon`,`chardev_cataclysm`.`itemdisplayinfo`.`f7` AS `f7`,`chardev_cataclysm`.`itemdisplayinfo`.`f8` AS `f8`,`chardev_cataclysm`.`itemdisplayinfo`.`f9` AS `f9`,`chardev_cataclysm`.`itemdisplayinfo`.`f10` AS `f10`,`chardev_cataclysm`.`itemdisplayinfo`.`f11` AS `f11`,`chardev_cataclysm`.`itemdisplayinfo`.`f12` AS `f12`,`chardev_cataclysm`.`itemdisplayinfo`.`f13` AS `f13`,`chardev_cataclysm`.`itemdisplayinfo`.`f14` AS `f14`,`chardev_cataclysm`.`itemdisplayinfo`.`f15` AS `f15`,`chardev_cataclysm`.`itemdisplayinfo`.`f16` AS `f16`,`chardev_cataclysm`.`itemdisplayinfo`.`f17` AS `f17`,`chardev_cataclysm`.`itemdisplayinfo`.`f18` AS `f18`,`chardev_cataclysm`.`itemdisplayinfo`.`f19` AS `f19`,`chardev_cataclysm`.`itemdisplayinfo`.`f20` AS `f20`,`chardev_cataclysm`.`itemdisplayinfo`.`f21` AS `f21`,`chardev_cataclysm`.`itemdisplayinfo`.`f22` AS `f22`,`chardev_cataclysm`.`itemdisplayinfo`.`f23` AS `f23`,`chardev_cataclysm`.`itemdisplayinfo`.`f24` AS `f24`,`chardev_cataclysm`.`itemdisplayinfo`.`f25` AS `f25` from `chardev_cataclysm`.`itemdisplayinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemreforge`
--

/*!50001 DROP TABLE IF EXISTS `itemreforge`*/;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemreforge` AS select `chardev_cataclysm`.`itemreforge`.`ID` AS `ID`,`chardev_cataclysm`.`itemreforge`.`f2` AS `f2`,`chardev_cataclysm`.`itemreforge`.`f3` AS `f3`,`chardev_cataclysm`.`itemreforge`.`f4` AS `f4`,`chardev_cataclysm`.`itemreforge`.`f5` AS `f5` from `chardev_cataclysm`.`itemreforge` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `randproppoints`
--

/*!50001 DROP TABLE IF EXISTS `randproppoints`*/;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `randproppoints` AS select `chardev_cataclysm`.`randproppoints`.`ID` AS `ID`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group0` AS `PointsQuality4Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group1` AS `PointsQuality4Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group2` AS `PointsQuality4Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group3` AS `PointsQuality4Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group4` AS `PointsQuality4Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group0` AS `PointsQuality3Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group1` AS `PointsQuality3Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group2` AS `PointsQuality3Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group3` AS `PointsQuality3Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group4` AS `PointsQuality3Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group0` AS `PointsQuality2Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group1` AS `PointsQuality2Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group2` AS `PointsQuality2Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group3` AS `PointsQuality2Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group4` AS `PointsQuality2Group4` from `chardev_cataclysm`.`randproppoints` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatdistribution`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatdistribution`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatdistribution` AS select `chardev_cataclysm`.`scalingstatdistribution`.`id` AS `id`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient4` AS `Coefficient4`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient5` AS `Coefficient5`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient6` AS `Coefficient6`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient7` AS `Coefficient7`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient8` AS `Coefficient8`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient9` AS `Coefficient9`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient10` AS `Coefficient10`,`chardev_cataclysm`.`scalingstatdistribution`.`MinLevel` AS `MinLevel`,`chardev_cataclysm`.`scalingstatdistribution`.`MaxLevel` AS `MaxLevel` from `chardev_cataclysm`.`scalingstatdistribution` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatvalues`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatvalues`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatvalues` AS select `chardev_cataclysm`.`scalingstatvalues`.`id` AS `id`,`chardev_cataclysm`.`scalingstatvalues`.`level` AS `level`,`chardev_cataclysm`.`scalingstatvalues`.`dist0` AS `dist0`,`chardev_cataclysm`.`scalingstatvalues`.`dist1` AS `dist1`,`chardev_cataclysm`.`scalingstatvalues`.`dist2` AS `dist2`,`chardev_cataclysm`.`scalingstatvalues`.`dist3` AS `dist3`,`chardev_cataclysm`.`scalingstatvalues`.`dist4` AS `dist4`,`chardev_cataclysm`.`scalingstatvalues`.`dist5` AS `dist5`,`chardev_cataclysm`.`scalingstatvalues`.`dist6` AS `dist6`,`chardev_cataclysm`.`scalingstatvalues`.`dist7` AS `dist7`,`chardev_cataclysm`.`scalingstatvalues`.`dist8` AS `dist8`,`chardev_cataclysm`.`scalingstatvalues`.`dist9` AS `dist9`,`chardev_cataclysm`.`scalingstatvalues`.`dist10` AS `dist10`,`chardev_cataclysm`.`scalingstatvalues`.`dist11` AS `dist11`,`chardev_cataclysm`.`scalingstatvalues`.`dist12` AS `dist12`,`chardev_cataclysm`.`scalingstatvalues`.`dist13` AS `dist13`,`chardev_cataclysm`.`scalingstatvalues`.`dist14` AS `dist14`,`chardev_cataclysm`.`scalingstatvalues`.`dist15` AS `dist15`,`chardev_cataclysm`.`scalingstatvalues`.`dist16` AS `dist16`,`chardev_cataclysm`.`scalingstatvalues`.`dist17` AS `dist17`,`chardev_cataclysm`.`scalingstatvalues`.`dist18` AS `dist18`,`chardev_cataclysm`.`scalingstatvalues`.`dist19` AS `dist19`,`chardev_cataclysm`.`scalingstatvalues`.`dist20` AS `dist20`,`chardev_cataclysm`.`scalingstatvalues`.`dist21` AS `dist21`,`chardev_cataclysm`.`scalingstatvalues`.`dist22` AS `dist22`,`chardev_cataclysm`.`scalingstatvalues`.`dist23` AS `dist23`,`chardev_cataclysm`.`scalingstatvalues`.`dist24` AS `dist24`,`chardev_cataclysm`.`scalingstatvalues`.`dist25` AS `dist25`,`chardev_cataclysm`.`scalingstatvalues`.`dist26` AS `dist26`,`chardev_cataclysm`.`scalingstatvalues`.`dist27` AS `dist27`,`chardev_cataclysm`.`scalingstatvalues`.`dist28` AS `dist28`,`chardev_cataclysm`.`scalingstatvalues`.`dist29` AS `dist29`,`chardev_cataclysm`.`scalingstatvalues`.`dist30` AS `dist30`,`chardev_cataclysm`.`scalingstatvalues`.`dist31` AS `dist31`,`chardev_cataclysm`.`scalingstatvalues`.`dist32` AS `dist32`,`chardev_cataclysm`.`scalingstatvalues`.`dist33` AS `dist33`,`chardev_cataclysm`.`scalingstatvalues`.`dist34` AS `dist34`,`chardev_cataclysm`.`scalingstatvalues`.`dist35` AS `dist35`,`chardev_cataclysm`.`scalingstatvalues`.`dist36` AS `dist36`,`chardev_cataclysm`.`scalingstatvalues`.`dist37` AS `dist37`,`chardev_cataclysm`.`scalingstatvalues`.`dist38` AS `dist38`,`chardev_cataclysm`.`scalingstatvalues`.`dist39` AS `dist39`,`chardev_cataclysm`.`scalingstatvalues`.`dist40` AS `dist40`,`chardev_cataclysm`.`scalingstatvalues`.`dist41` AS `dist41`,`chardev_cataclysm`.`scalingstatvalues`.`dist42` AS `dist42`,`chardev_cataclysm`.`scalingstatvalues`.`dist43` AS `dist43`,`chardev_cataclysm`.`scalingstatvalues`.`dist44` AS `dist44` from `chardev_cataclysm`.`scalingstatvalues` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skilllineability`
--

/*!50001 DROP TABLE IF EXISTS `skilllineability`*/;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skilllineability` AS select `chardev_cataclysm`.`skilllineability`.`ID` AS `ID`,`chardev_cataclysm`.`skilllineability`.`SkillLineID` AS `SkillLineID`,`chardev_cataclysm`.`skilllineability`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`skilllineability`.`RaceMask` AS `RaceMask`,`chardev_cataclysm`.`skilllineability`.`ClassMask` AS `ClassMask`,`chardev_cataclysm`.`skilllineability`.`f6` AS `f6`,`chardev_cataclysm`.`skilllineability`.`f7` AS `f7`,`chardev_cataclysm`.`skilllineability`.`RequiredSkill` AS `RequiredSkill`,`chardev_cataclysm`.`skilllineability`.`ReplaceSpellID` AS `ReplaceSpellID`,`chardev_cataclysm`.`skilllineability`.`f10` AS `f10`,`chardev_cataclysm`.`skilllineability`.`Grey` AS `Grey`,`chardev_cataclysm`.`skilllineability`.`Yellow` AS `Yellow`,`chardev_cataclysm`.`skilllineability`.`f13` AS `f13`,`chardev_cataclysm`.`skilllineability`.`f14` AS `f14` from `chardev_cataclysm`.`skilllineability` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skillraceclassinfo`
--

/*!50001 DROP TABLE IF EXISTS `skillraceclassinfo`*/;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skillraceclassinfo` AS select `chardev_cataclysm`.`skillraceclassinfo`.`ID` AS `ID`,`chardev_cataclysm`.`skillraceclassinfo`.`f2` AS `f2`,`chardev_cataclysm`.`skillraceclassinfo`.`f3` AS `f3`,`chardev_cataclysm`.`skillraceclassinfo`.`f4` AS `f4`,`chardev_cataclysm`.`skillraceclassinfo`.`f5` AS `f5`,`chardev_cataclysm`.`skillraceclassinfo`.`f6` AS `f6`,`chardev_cataclysm`.`skillraceclassinfo`.`f7` AS `f7`,`chardev_cataclysm`.`skillraceclassinfo`.`f8` AS `f8`,`chardev_cataclysm`.`skillraceclassinfo`.`f9` AS `f9` from `chardev_cataclysm`.`skillraceclassinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellauraoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellauraoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellauraoptions` AS select `chardev_cataclysm`.`spellauraoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellauraoptions`.`Stacks` AS `Stacks`,`chardev_cataclysm`.`spellauraoptions`.`ProcRate` AS `ProcRate`,`chardev_cataclysm`.`spellauraoptions`.`ProcCharges` AS `ProcCharges`,`chardev_cataclysm`.`spellauraoptions`.`f5` AS `f5` from `chardev_cataclysm`.`spellauraoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellaurarestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spellaurarestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellaurarestrictions` AS select `chardev_cataclysm`.`spellaurarestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spellaurarestrictions`.`f2` AS `f2`,`chardev_cataclysm`.`spellaurarestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spellaurarestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spellaurarestrictions`.`f5` AS `f5`,`chardev_cataclysm`.`spellaurarestrictions`.`f6` AS `f6`,`chardev_cataclysm`.`spellaurarestrictions`.`f7` AS `f7`,`chardev_cataclysm`.`spellaurarestrictions`.`f8` AS `f8`,`chardev_cataclysm`.`spellaurarestrictions`.`f9` AS `f9` from `chardev_cataclysm`.`spellaurarestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcastingrequirements`
--

/*!50001 DROP TABLE IF EXISTS `spellcastingrequirements`*/;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcastingrequirements` AS select `chardev_cataclysm`.`spellcastingrequirements`.`ID` AS `ID`,`chardev_cataclysm`.`spellcastingrequirements`.`f2` AS `f2`,`chardev_cataclysm`.`spellcastingrequirements`.`f3` AS `f3`,`chardev_cataclysm`.`spellcastingrequirements`.`f4` AS `f4`,`chardev_cataclysm`.`spellcastingrequirements`.`f5` AS `f5`,`chardev_cataclysm`.`spellcastingrequirements`.`f6` AS `f6`,`chardev_cataclysm`.`spellcastingrequirements`.`f7` AS `f7` from `chardev_cataclysm`.`spellcastingrequirements` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcasttimes`
--

/*!50001 DROP TABLE IF EXISTS `spellcasttimes`*/;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcasttimes` AS select `chardev_cataclysm`.`spellcasttimes`.`ID` AS `ID`,`chardev_cataclysm`.`spellcasttimes`.`Time` AS `Time`,`chardev_cataclysm`.`spellcasttimes`.`f3` AS `f3`,`chardev_cataclysm`.`spellcasttimes`.`f4` AS `f4` from `chardev_cataclysm`.`spellcasttimes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategories`
--

/*!50001 DROP TABLE IF EXISTS `spellcategories`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategories` AS select `chardev_cataclysm`.`spellcategories`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategories`.`f2` AS `f2`,`chardev_cataclysm`.`spellcategories`.`f3` AS `f3`,`chardev_cataclysm`.`spellcategories`.`f4` AS `f4`,`chardev_cataclysm`.`spellcategories`.`f5` AS `f5`,`chardev_cataclysm`.`spellcategories`.`f6` AS `f6`,`chardev_cataclysm`.`spellcategories`.`f7` AS `f7` from `chardev_cataclysm`.`spellcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategory`
--

/*!50001 DROP TABLE IF EXISTS `spellcategory`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategory` AS select `chardev_cataclysm`.`spellcategory`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategory`.`f2` AS `f2` from `chardev_cataclysm`.`spellcategory` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellclassoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellclassoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellclassoptions` AS select `chardev_cataclysm`.`spellclassoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellclassoptions`.`f2` AS `f2`,`chardev_cataclysm`.`spellclassoptions`.`f3` AS `f3`,`chardev_cataclysm`.`spellclassoptions`.`f4` AS `f4`,`chardev_cataclysm`.`spellclassoptions`.`f5` AS `f5`,`chardev_cataclysm`.`spellclassoptions`.`SpellClassID` AS `SpellClassID`,`chardev_cataclysm`.`spellclassoptions`.`f7` AS `f7` from `chardev_cataclysm`.`spellclassoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcooldowns`
--

/*!50001 DROP TABLE IF EXISTS `spellcooldowns`*/;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcooldowns` AS select `chardev_cataclysm`.`spellcooldowns`.`ID` AS `ID`,`chardev_cataclysm`.`spellcooldowns`.`Spell` AS `Spell`,`chardev_cataclysm`.`spellcooldowns`.`Category` AS `Category`,`chardev_cataclysm`.`spellcooldowns`.`Global` AS `Global` from `chardev_cataclysm`.`spellcooldowns` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelldifficulty`
--

/*!50001 DROP TABLE IF EXISTS `spelldifficulty`*/;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelldifficulty` AS select `chardev_cataclysm`.`spelldifficulty`.`f1` AS `f1`,`chardev_cataclysm`.`spelldifficulty`.`f2` AS `f2`,`chardev_cataclysm`.`spelldifficulty`.`f3` AS `f3`,`chardev_cataclysm`.`spelldifficulty`.`f4` AS `f4`,`chardev_cataclysm`.`spelldifficulty`.`f5` AS `f5` from `chardev_cataclysm`.`spelldifficulty` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellduration`
--

/*!50001 DROP TABLE IF EXISTS `spellduration`*/;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellduration` AS select `chardev_cataclysm`.`spellduration`.`ID` AS `ID`,`chardev_cataclysm`.`spellduration`.`Duration` AS `Duration`,`chardev_cataclysm`.`spellduration`.`f3` AS `f3`,`chardev_cataclysm`.`spellduration`.`f4` AS `f4` from `chardev_cataclysm`.`spellduration` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelleffect`
--

/*!50001 DROP TABLE IF EXISTS `spelleffect`*/;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelleffect` AS select `chardev_cataclysm`.`spelleffect`.`ID` AS `ID`,`chardev_cataclysm`.`spelleffect`.`Aura` AS `Aura`,`chardev_cataclysm`.`spelleffect`.`ProcValue` AS `ProcValue`,`chardev_cataclysm`.`spelleffect`.`Effect` AS `Effect`,`chardev_cataclysm`.`spelleffect`.`Period` AS `Period`,`chardev_cataclysm`.`spelleffect`.`Value` AS `Value`,`chardev_cataclysm`.`spelleffect`.`Coefficient` AS `Coefficient`,`chardev_cataclysm`.`spelleffect`.`f8` AS `f8`,`chardev_cataclysm`.`spelleffect`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelleffect`.`Dice` AS `Dice`,`chardev_cataclysm`.`spelleffect`.`ItemID` AS `ItemID`,`chardev_cataclysm`.`spelleffect`.`f12` AS `f12`,`chardev_cataclysm`.`spelleffect`.`SecondaryEffect` AS `SecondaryEffect`,`chardev_cataclysm`.`spelleffect`.`UsedStat` AS `UsedStat`,`chardev_cataclysm`.`spelleffect`.`ProcChance` AS `ProcChance`,`chardev_cataclysm`.`spelleffect`.`SpellRadiusID` AS `SpellRadiusID`,`chardev_cataclysm`.`spelleffect`.`f17` AS `f17`,`chardev_cataclysm`.`spelleffect`.`LevelModifier` AS `LevelModifier`,`chardev_cataclysm`.`spelleffect`.`f19` AS `f19`,`chardev_cataclysm`.`spelleffect`.`f20` AS `f20`,`chardev_cataclysm`.`spelleffect`.`f21` AS `f21`,`chardev_cataclysm`.`spelleffect`.`f22` AS `f22`,`chardev_cataclysm`.`spelleffect`.`f23` AS `f23`,`chardev_cataclysm`.`spelleffect`.`f24` AS `f24`,`chardev_cataclysm`.`spelleffect`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`spelleffect`.`Index` AS `Index` from `chardev_cataclysm`.`spelleffect` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellequippeditems`
--

/*!50001 DROP TABLE IF EXISTS `spellequippeditems`*/;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellequippeditems` AS select `chardev_cataclysm`.`spellequippeditems`.`ID` AS `ID`,`chardev_cataclysm`.`spellequippeditems`.`ItemClassID` AS `ItemClassID`,`chardev_cataclysm`.`spellequippeditems`.`InventorySlotMask` AS `InventorySlotMask`,`chardev_cataclysm`.`spellequippeditems`.`ItemSubClassMask` AS `ItemSubClassMask` from `chardev_cataclysm`.`spellequippeditems` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyout`
--

/*!50001 DROP TABLE IF EXISTS `spellflyout`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyout` AS select `chardev_cataclysm`.`spellflyout`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyout`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyout`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyout`.`f4` AS `f4`,`chardev_cataclysm`.`spellflyout`.`f5` AS `f5`,`chardev_cataclysm`.`spellflyout`.`f6` AS `f6`,`chardev_cataclysm`.`spellflyout`.`f7` AS `f7` from `chardev_cataclysm`.`spellflyout` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyoutitem`
--

/*!50001 DROP TABLE IF EXISTS `spellflyoutitem`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyoutitem` AS select `chardev_cataclysm`.`spellflyoutitem`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyoutitem`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyoutitem`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyoutitem`.`f4` AS `f4` from `chardev_cataclysm`.`spellflyoutitem` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellfocusobject`
--

/*!50001 DROP TABLE IF EXISTS `spellfocusobject`*/;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellfocusobject` AS select `chardev_cataclysm`.`spellfocusobject`.`ID` AS `ID`,`chardev_cataclysm`.`spellfocusobject`.`f2` AS `f2` from `chardev_cataclysm`.`spellfocusobject` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellicon`
--

/*!50001 DROP TABLE IF EXISTS `spellicon`*/;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellicon` AS select `chardev_cataclysm`.`spellicon`.`ID` AS `ID`,`chardev_cataclysm`.`spellicon`.`Icon` AS `Icon` from `chardev_cataclysm`.`spellicon` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellinterrupts`
--

/*!50001 DROP TABLE IF EXISTS `spellinterrupts`*/;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellinterrupts` AS select `chardev_cataclysm`.`spellinterrupts`.`ID` AS `ID`,`chardev_cataclysm`.`spellinterrupts`.`f2` AS `f2`,`chardev_cataclysm`.`spellinterrupts`.`f3` AS `f3`,`chardev_cataclysm`.`spellinterrupts`.`f4` AS `f4`,`chardev_cataclysm`.`spellinterrupts`.`f5` AS `f5`,`chardev_cataclysm`.`spellinterrupts`.`f6` AS `f6` from `chardev_cataclysm`.`spellinterrupts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellitemenchantmentcondition`
--

/*!50001 DROP TABLE IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellitemenchantmentcondition` AS select `chardev_cataclysm`.`spellitemenchantmentcondition`.`ID` AS `ID`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color1` AS `Color1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color2` AS `Color2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color3` AS `Color3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color4` AS `Color4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color5` AS `Color5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f7` AS `f7`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f8` AS `f8`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f9` AS `f9`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f10` AS `f10`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f11` AS `f11`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_1` AS `f12_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_2` AS `f12_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_3` AS `f12_3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator1` AS `Comparator1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator2` AS `Comparator2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator3` AS `Comparator3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator4` AS `Comparator4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator5` AS `Comparator5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor1` AS `CompareColor1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor2` AS `CompareColor2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor3` AS `CompareColor3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor4` AS `CompareColor4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor5` AS `CompareColor5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_1` AS `f13_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_2` AS `f13_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value1` AS `Value1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value2` AS `Value2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value3` AS `Value3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value4` AS `Value4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value5` AS `Value5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f27` AS `f27`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f28` AS `f28`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f29` AS `f29`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f30` AS `f30`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f31` AS `f31` from `chardev_cataclysm`.`spellitemenchantmentcondition` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelllevels`
--

/*!50001 DROP TABLE IF EXISTS `spelllevels`*/;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelllevels` AS select `chardev_cataclysm`.`spelllevels`.`ID` AS `ID`,`chardev_cataclysm`.`spelllevels`.`f2` AS `f2`,`chardev_cataclysm`.`spelllevels`.`f3` AS `f3`,`chardev_cataclysm`.`spelllevels`.`f4` AS `f4` from `chardev_cataclysm`.`spelllevels` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmechanic`
--

/*!50001 DROP TABLE IF EXISTS `spellmechanic`*/;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmechanic` AS select `chardev_cataclysm`.`spellmechanic`.`ID` AS `ID`,`chardev_cataclysm`.`spellmechanic`.`f2` AS `f2` from `chardev_cataclysm`.`spellmechanic` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissile`
--

/*!50001 DROP TABLE IF EXISTS `spellmissile`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissile` AS select `chardev_cataclysm`.`spellmissile`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissile`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissile`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissile`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissile`.`f5` AS `f5`,`chardev_cataclysm`.`spellmissile`.`f6` AS `f6`,`chardev_cataclysm`.`spellmissile`.`f7` AS `f7`,`chardev_cataclysm`.`spellmissile`.`f8` AS `f8`,`chardev_cataclysm`.`spellmissile`.`f9` AS `f9`,`chardev_cataclysm`.`spellmissile`.`f10` AS `f10`,`chardev_cataclysm`.`spellmissile`.`f11` AS `f11`,`chardev_cataclysm`.`spellmissile`.`f12` AS `f12`,`chardev_cataclysm`.`spellmissile`.`f13` AS `f13`,`chardev_cataclysm`.`spellmissile`.`f14` AS `f14`,`chardev_cataclysm`.`spellmissile`.`f15` AS `f15` from `chardev_cataclysm`.`spellmissile` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissilemotion`
--

/*!50001 DROP TABLE IF EXISTS `spellmissilemotion`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissilemotion` AS select `chardev_cataclysm`.`spellmissilemotion`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissilemotion`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissilemotion`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissilemotion`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissilemotion`.`f5` AS `f5` from `chardev_cataclysm`.`spellmissilemotion` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellpower`
--

/*!50001 DROP TABLE IF EXISTS `spellpower`*/;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellpower` AS select `chardev_cataclysm`.`spellpower`.`ID` AS `ID`,`chardev_cataclysm`.`spellpower`.`Absolute` AS `Absolute`,`chardev_cataclysm`.`spellpower`.`f3` AS `f3`,`chardev_cataclysm`.`spellpower`.`Percent` AS `Percent`,`chardev_cataclysm`.`spellpower`.`f5` AS `f5`,`chardev_cataclysm`.`spellpower`.`f6` AS `f6`,`chardev_cataclysm`.`spellpower`.`f7` AS `f7` from `chardev_cataclysm`.`spellpower` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellradius`
--

/*!50001 DROP TABLE IF EXISTS `spellradius`*/;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellradius` AS select `chardev_cataclysm`.`spellradius`.`ID` AS `ID`,`chardev_cataclysm`.`spellradius`.`Radius` AS `Radius`,`chardev_cataclysm`.`spellradius`.`f3` AS `f3`,`chardev_cataclysm`.`spellradius`.`f4` AS `f4` from `chardev_cataclysm`.`spellradius` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellreagents`
--

/*!50001 DROP TABLE IF EXISTS `spellreagents`*/;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellreagents` AS select `chardev_cataclysm`.`spellreagents`.`ID` AS `ID`,`chardev_cataclysm`.`spellreagents`.`f2` AS `f2`,`chardev_cataclysm`.`spellreagents`.`f3` AS `f3`,`chardev_cataclysm`.`spellreagents`.`f4` AS `f4`,`chardev_cataclysm`.`spellreagents`.`f5` AS `f5`,`chardev_cataclysm`.`spellreagents`.`f6` AS `f6`,`chardev_cataclysm`.`spellreagents`.`f7` AS `f7`,`chardev_cataclysm`.`spellreagents`.`f8` AS `f8`,`chardev_cataclysm`.`spellreagents`.`f9` AS `f9`,`chardev_cataclysm`.`spellreagents`.`f10` AS `f10`,`chardev_cataclysm`.`spellreagents`.`f11` AS `f11`,`chardev_cataclysm`.`spellreagents`.`f12` AS `f12`,`chardev_cataclysm`.`spellreagents`.`f13` AS `f13`,`chardev_cataclysm`.`spellreagents`.`f14` AS `f14`,`chardev_cataclysm`.`spellreagents`.`f15` AS `f15`,`chardev_cataclysm`.`spellreagents`.`f16` AS `f16`,`chardev_cataclysm`.`spellreagents`.`f17` AS `f17` from `chardev_cataclysm`.`spellreagents` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellrunecost`
--

/*!50001 DROP TABLE IF EXISTS `spellrunecost`*/;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellrunecost` AS select `chardev_cataclysm`.`spellrunecost`.`ID` AS `ID`,`chardev_cataclysm`.`spellrunecost`.`f2` AS `f2`,`chardev_cataclysm`.`spellrunecost`.`f3` AS `f3`,`chardev_cataclysm`.`spellrunecost`.`f4` AS `f4`,`chardev_cataclysm`.`spellrunecost`.`f5` AS `f5` from `chardev_cataclysm`.`spellrunecost` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellscaling`
--

/*!50001 DROP TABLE IF EXISTS `spellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellscaling` AS select `chardev_cataclysm`.`spellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`spellscaling`.`CastTimeStart` AS `CastTimeStart`,`chardev_cataclysm`.`spellscaling`.`CastTimeEnd` AS `CastTimeEnd`,`chardev_cataclysm`.`spellscaling`.`Intervals` AS `Intervals`,`chardev_cataclysm`.`spellscaling`.`Distribution` AS `Distribution`,`chardev_cataclysm`.`spellscaling`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`spellscaling`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`spellscaling`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`spellscaling`.`Dice1` AS `Dice1`,`chardev_cataclysm`.`spellscaling`.`Dice2` AS `Dice2`,`chardev_cataclysm`.`spellscaling`.`Dice3` AS `Dice3`,`chardev_cataclysm`.`spellscaling`.`f12` AS `f12`,`chardev_cataclysm`.`spellscaling`.`f13` AS `f13`,`chardev_cataclysm`.`spellscaling`.`f14` AS `f14`,`chardev_cataclysm`.`spellscaling`.`f15` AS `f15`,`chardev_cataclysm`.`spellscaling`.`f16` AS `f16` from `chardev_cataclysm`.`spellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshift`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshift`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshift` AS select `chardev_cataclysm`.`spellshapeshift`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshift`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshift`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshift`.`SpellShapeshiftFormID` AS `SpellShapeshiftFormID`,`chardev_cataclysm`.`spellshapeshift`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshift`.`f6` AS `f6` from `chardev_cataclysm`.`spellshapeshift` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshiftform`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshiftform`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshiftform` AS select `chardev_cataclysm`.`spellshapeshiftform`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshiftform`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshiftform`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshiftform`.`f4` AS `f4`,`chardev_cataclysm`.`spellshapeshiftform`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshiftform`.`f6` AS `f6`,`chardev_cataclysm`.`spellshapeshiftform`.`f7` AS `f7`,`chardev_cataclysm`.`spellshapeshiftform`.`f8` AS `f8`,`chardev_cataclysm`.`spellshapeshiftform`.`f9` AS `f9`,`chardev_cataclysm`.`spellshapeshiftform`.`f10` AS `f10`,`chardev_cataclysm`.`spellshapeshiftform`.`f11` AS `f11`,`chardev_cataclysm`.`spellshapeshiftform`.`f12` AS `f12`,`chardev_cataclysm`.`spellshapeshiftform`.`f13` AS `f13`,`chardev_cataclysm`.`spellshapeshiftform`.`f14` AS `f14`,`chardev_cataclysm`.`spellshapeshiftform`.`f15` AS `f15`,`chardev_cataclysm`.`spellshapeshiftform`.`f16` AS `f16`,`chardev_cataclysm`.`spellshapeshiftform`.`f17` AS `f17`,`chardev_cataclysm`.`spellshapeshiftform`.`f18` AS `f18`,`chardev_cataclysm`.`spellshapeshiftform`.`f19` AS `f19`,`chardev_cataclysm`.`spellshapeshiftform`.`f20` AS `f20` from `chardev_cataclysm`.`spellshapeshiftform` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelltargetrestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spelltargetrestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelltargetrestrictions` AS select `chardev_cataclysm`.`spelltargetrestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spelltargetrestrictions`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelltargetrestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spelltargetrestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spelltargetrestrictions`.`f5` AS `f5` from `chardev_cataclysm`.`spelltargetrestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellvisual`
--

/*!50001 DROP TABLE IF EXISTS `spellvisual`*/;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellvisual` AS select `chardev_cataclysm`.`spellvisual`.`ID` AS `ID`,`chardev_cataclysm`.`spellvisual`.`f2` AS `f2`,`chardev_cataclysm`.`spellvisual`.`f3` AS `f3`,`chardev_cataclysm`.`spellvisual`.`f4` AS `f4`,`chardev_cataclysm`.`spellvisual`.`f5` AS `f5`,`chardev_cataclysm`.`spellvisual`.`f6` AS `f6`,`chardev_cataclysm`.`spellvisual`.`f7` AS `f7`,`chardev_cataclysm`.`spellvisual`.`f8` AS `f8`,`chardev_cataclysm`.`spellvisual`.`f9` AS `f9`,`chardev_cataclysm`.`spellvisual`.`f10` AS `f10`,`chardev_cataclysm`.`spellvisual`.`f11` AS `f11`,`chardev_cataclysm`.`spellvisual`.`f12` AS `f12`,`chardev_cataclysm`.`spellvisual`.`f13` AS `f13`,`chardev_cataclysm`.`spellvisual`.`f14` AS `f14`,`chardev_cataclysm`.`spellvisual`.`f15` AS `f15`,`chardev_cataclysm`.`spellvisual`.`f16` AS `f16`,`chardev_cataclysm`.`spellvisual`.`f17` AS `f17`,`chardev_cataclysm`.`spellvisual`.`f18` AS `f18`,`chardev_cataclysm`.`spellvisual`.`f19` AS `f19`,`chardev_cataclysm`.`spellvisual`.`f20` AS `f20`,`chardev_cataclysm`.`spellvisual`.`f21` AS `f21`,`chardev_cataclysm`.`spellvisual`.`f22` AS `f22`,`chardev_cataclysm`.`spellvisual`.`f23` AS `f23`,`chardev_cataclysm`.`spellvisual`.`f24` AS `f24`,`chardev_cataclysm`.`spellvisual`.`f25` AS `f25`,`chardev_cataclysm`.`spellvisual`.`f26` AS `f26`,`chardev_cataclysm`.`spellvisual`.`f27` AS `f27`,`chardev_cataclysm`.`spellvisual`.`f28` AS `f28`,`chardev_cataclysm`.`spellvisual`.`f29` AS `f29`,`chardev_cataclysm`.`spellvisual`.`f30` AS `f30`,`chardev_cataclysm`.`spellvisual`.`f31` AS `f31`,`chardev_cataclysm`.`spellvisual`.`f32` AS `f32` from `chardev_cataclysm`.`spellvisual` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talent`
--

/*!50001 DROP TABLE IF EXISTS `talent`*/;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talent` AS select `chardev_cataclysm`.`talent`.`ID` AS `ID`,`chardev_cataclysm`.`talent`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talent`.`Row` AS `Row`,`chardev_cataclysm`.`talent`.`Col` AS `Col`,`chardev_cataclysm`.`talent`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`talent`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`talent`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`talent`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`talent`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`talent`.`RequiredTalentID1` AS `RequiredTalentID1`,`chardev_cataclysm`.`talent`.`RequiredTalentID2` AS `RequiredTalentID2`,`chardev_cataclysm`.`talent`.`RequiredTalentID3` AS `RequiredTalentID3`,`chardev_cataclysm`.`talent`.`f13` AS `f13`,`chardev_cataclysm`.`talent`.`f14` AS `f14`,`chardev_cataclysm`.`talent`.`f15` AS `f15`,`chardev_cataclysm`.`talent`.`f16` AS `f16`,`chardev_cataclysm`.`talent`.`f17` AS `f17`,`chardev_cataclysm`.`talent`.`PetMask0` AS `PetMask0`,`chardev_cataclysm`.`talent`.`PetMask1` AS `PetMask1` from `chardev_cataclysm`.`talent` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talenttreeprimaryspells`
--

/*!50001 DROP TABLE IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talenttreeprimaryspells` AS select `chardev_cataclysm`.`talenttreeprimaryspells`.`ID` AS `ID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`f4` AS `f4` from `chardev_cataclysm`.`talenttreeprimaryspells` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Current Database: `chardev_cataclysm_fr`
--

USE `chardev_cataclysm_fr`;

--
-- Final view structure for view `gemproperties`
--

/*!50001 DROP TABLE IF EXISTS `gemproperties`*/;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gemproperties` AS select `chardev_cataclysm`.`gemproperties`.`ID` AS `ID`,`chardev_cataclysm`.`gemproperties`.`SpellItemEnchantmentID` AS `SpellItemEnchantmentID`,`chardev_cataclysm`.`gemproperties`.`f3` AS `f3`,`chardev_cataclysm`.`gemproperties`.`f4` AS `f4`,`chardev_cataclysm`.`gemproperties`.`f5` AS `f5`,`chardev_cataclysm`.`gemproperties`.`MinItemLevel` AS `MinItemLevel` from `chardev_cataclysm`.`gemproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `glyphproperties`
--

/*!50001 DROP TABLE IF EXISTS `glyphproperties`*/;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `glyphproperties` AS select `chardev_cataclysm`.`glyphproperties`.`ID` AS `ID`,`chardev_cataclysm`.`glyphproperties`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`glyphproperties`.`Type` AS `Type`,`chardev_cataclysm`.`glyphproperties`.`f4` AS `f4` from `chardev_cataclysm`.`glyphproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecrit` AS select `chardev_cataclysm`.`gtchancetomeleecrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecritbase` AS select `chardev_cataclysm`.`gtchancetomeleecritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcrit` AS select `chardev_cataclysm`.`gtchancetospellcrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcritbase` AS select `chardev_cataclysm`.`gtchancetospellcritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtcombatratings`
--

/*!50001 DROP TABLE IF EXISTS `gtcombatratings`*/;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtcombatratings` AS select `chardev_cataclysm`.`gtcombatratings`.`ID` AS `ID`,`chardev_cataclysm`.`gtcombatratings`.`Value` AS `Value` from `chardev_cataclysm`.`gtcombatratings` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenhp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenhp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenhp` AS select `chardev_cataclysm`.`gtoctregenhp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenhp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenhp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenmp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenmp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenmp` AS select `chardev_cataclysm`.`gtoctregenmp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenmp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenmp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenhpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenhpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenhpperspt` AS select `chardev_cataclysm`.`gtregenhpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenhpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenhpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenmpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenmpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenmpperspt` AS select `chardev_cataclysm`.`gtregenmpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenmpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenmpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtspellscaling`
--

/*!50001 DROP TABLE IF EXISTS `gtspellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtspellscaling` AS select `chardev_cataclysm`.`gtspellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`gtspellscaling`.`Value` AS `Value` from `chardev_cataclysm`.`gtspellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item`
--

/*!50001 DROP TABLE IF EXISTS `item`*/;
/*!50001 DROP VIEW IF EXISTS `item`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item` AS select `chardev_cataclysm`.`item`.`ID` AS `ID`,`chardev_cataclysm`.`item`.`ItemClass` AS `ItemClass`,`chardev_cataclysm`.`item`.`ItemSubClass` AS `ItemSubClass`,`chardev_cataclysm`.`item`.`f4` AS `f4`,`chardev_cataclysm`.`item`.`f5` AS `f5`,`chardev_cataclysm`.`item`.`ItemDisplayInfoID` AS `ItemDisplayInfoID`,`chardev_cataclysm`.`item`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item`.`f8` AS `f8` from `chardev_cataclysm`.`item` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item_sparse`
--

/*!50001 DROP TABLE IF EXISTS `item_sparse`*/;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item_sparse` AS select `chardev_cataclysm`.`item_sparse`.`ID` AS `ID`,`chardev_cataclysm`.`item_sparse`.`Quality` AS `Quality`,`chardev_cataclysm`.`item_sparse`.`TypeMask` AS `TypeMask`,`chardev_cataclysm`.`item_sparse`.`TypeMask2` AS `TypeMask2`,`chardev_cataclysm`.`item_sparse`.`TypeMask3` AS `TypeMask3`,`chardev_cataclysm`.`item_sparse`.`TypeMask4` AS `TypeMask4`,`chardev_cataclysm`.`item_sparse`.`TypeMask5` AS `TypeMask5`,`chardev_cataclysm`.`item_sparse`.`BuyPrice` AS `BuyPrice`,`chardev_cataclysm`.`item_sparse`.`SellPrice` AS `SellPrice`,`chardev_cataclysm`.`item_sparse`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item_sparse`.`ChrClassMask` AS `ChrClassMask`,`chardev_cataclysm`.`item_sparse`.`ChrRaceMask` AS `ChrRaceMask`,`chardev_cataclysm`.`item_sparse`.`Level` AS `Level`,`chardev_cataclysm`.`item_sparse`.`RequiredCharacterLevel` AS `RequiredCharacterLevel`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineID` AS `RequiredSkillLineID`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineLevel` AS `RequiredSkillLineLevel`,`chardev_cataclysm`.`item_sparse`.`f14` AS `f14`,`chardev_cataclysm`.`item_sparse`.`f15` AS `f15`,`chardev_cataclysm`.`item_sparse`.`f16` AS `f16`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionID` AS `RequiredFactionID`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionReputation` AS `RequiredFactionReputation`,`chardev_cataclysm`.`item_sparse`.`Unique` AS `Unique`,`chardev_cataclysm`.`item_sparse`.`MaximumStackSize` AS `MaximumStackSize`,`chardev_cataclysm`.`item_sparse`.`f21` AS `f21`,`chardev_cataclysm`.`item_sparse`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`item_sparse`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`item_sparse`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`item_sparse`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`item_sparse`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`item_sparse`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`item_sparse`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`item_sparse`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`item_sparse`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`item_sparse`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`item_sparse`.`StatValue1` AS `StatValue1`,`chardev_cataclysm`.`item_sparse`.`StatValue2` AS `StatValue2`,`chardev_cataclysm`.`item_sparse`.`StatValue3` AS `StatValue3`,`chardev_cataclysm`.`item_sparse`.`StatValue4` AS `StatValue4`,`chardev_cataclysm`.`item_sparse`.`StatValue5` AS `StatValue5`,`chardev_cataclysm`.`item_sparse`.`StatValue6` AS `StatValue6`,`chardev_cataclysm`.`item_sparse`.`StatValue7` AS `StatValue7`,`chardev_cataclysm`.`item_sparse`.`StatValue8` AS `StatValue8`,`chardev_cataclysm`.`item_sparse`.`StatValue9` AS `StatValue9`,`chardev_cataclysm`.`item_sparse`.`StatValue10` AS `StatValue10`,`chardev_cataclysm`.`item_sparse`.`f42` AS `f42`,`chardev_cataclysm`.`item_sparse`.`f43` AS `f43`,`chardev_cataclysm`.`item_sparse`.`f44` AS `f44`,`chardev_cataclysm`.`item_sparse`.`f45` AS `f45`,`chardev_cataclysm`.`item_sparse`.`f46` AS `f46`,`chardev_cataclysm`.`item_sparse`.`f47` AS `f47`,`chardev_cataclysm`.`item_sparse`.`f48` AS `f48`,`chardev_cataclysm`.`item_sparse`.`f49` AS `f49`,`chardev_cataclysm`.`item_sparse`.`f50` AS `f50`,`chardev_cataclysm`.`item_sparse`.`f51` AS `f51`,`chardev_cataclysm`.`item_sparse`.`f52` AS `f52`,`chardev_cataclysm`.`item_sparse`.`f53` AS `f53`,`chardev_cataclysm`.`item_sparse`.`f54` AS `f54`,`chardev_cataclysm`.`item_sparse`.`f55` AS `f55`,`chardev_cataclysm`.`item_sparse`.`f56` AS `f56`,`chardev_cataclysm`.`item_sparse`.`f57` AS `f57`,`chardev_cataclysm`.`item_sparse`.`f58` AS `f58`,`chardev_cataclysm`.`item_sparse`.`f59` AS `f59`,`chardev_cataclysm`.`item_sparse`.`f60` AS `f60`,`chardev_cataclysm`.`item_sparse`.`f61` AS `f61`,`chardev_cataclysm`.`item_sparse`.`ScalingStatDistributionID` AS `ScalingStatDistributionID`,`chardev_cataclysm`.`item_sparse`.`f63` AS `f63`,`chardev_cataclysm`.`item_sparse`.`Delay` AS `Delay`,`chardev_cataclysm`.`item_sparse`.`f65` AS `f65`,`chardev_cataclysm`.`item_sparse`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`item_sparse`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`item_sparse`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`item_sparse`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`item_sparse`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger1` AS `SpellTrigger1`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger2` AS `SpellTrigger2`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger3` AS `SpellTrigger3`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger4` AS `SpellTrigger4`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger5` AS `SpellTrigger5`,`chardev_cataclysm`.`item_sparse`.`SpellCharges1` AS `SpellCharges1`,`chardev_cataclysm`.`item_sparse`.`SpellCharges2` AS `SpellCharges2`,`chardev_cataclysm`.`item_sparse`.`SpellCharges3` AS `SpellCharges3`,`chardev_cataclysm`.`item_sparse`.`SpellCharges4` AS `SpellCharges4`,`chardev_cataclysm`.`item_sparse`.`SpellCharges5` AS `SpellCharges5`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown1` AS `SpellCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown2` AS `SpellCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown3` AS `SpellCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown4` AS `SpellCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown5` AS `SpellCooldown5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID1` AS `SpellCategoryID1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID2` AS `SpellCategoryID2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID3` AS `SpellCategoryID3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID4` AS `SpellCategoryID4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID5` AS `SpellCategoryID5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown1` AS `SpellCategoryCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown2` AS `SpellCategoryCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown3` AS `SpellCategoryCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown4` AS `SpellCategoryCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown5` AS `SpellCategoryCooldown5`,`chardev_cataclysm`.`item_sparse`.`Binds` AS `Binds`,`chardev_cataclysm`.`item_sparse`.`Name` AS `Name`,`chardev_cataclysm`.`item_sparse`.`f98` AS `f98`,`chardev_cataclysm`.`item_sparse`.`f99` AS `f99`,`chardev_cataclysm`.`item_sparse`.`f100` AS `f100`,`chardev_cataclysm`.`item_sparse`.`Description` AS `Description`,`chardev_cataclysm`.`item_sparse`.`QuestID` AS `QuestID`,`chardev_cataclysm`.`item_sparse`.`f103` AS `f103`,`chardev_cataclysm`.`item_sparse`.`f104` AS `f104`,`chardev_cataclysm`.`item_sparse`.`f105` AS `f105`,`chardev_cataclysm`.`item_sparse`.`f106` AS `f106`,`chardev_cataclysm`.`item_sparse`.`f107` AS `f107`,`chardev_cataclysm`.`item_sparse`.`f108` AS `f108`,`chardev_cataclysm`.`item_sparse`.`RandomPropertiesID` AS `RandomPropertiesID`,`chardev_cataclysm`.`item_sparse`.`RandomSuffixID` AS `RandomSuffixID`,`chardev_cataclysm`.`item_sparse`.`ItemSetID` AS `ItemSetID`,`chardev_cataclysm`.`item_sparse`.`f113` AS `f113`,`chardev_cataclysm`.`item_sparse`.`f114` AS `f114`,`chardev_cataclysm`.`item_sparse`.`f115` AS `f115`,`chardev_cataclysm`.`item_sparse`.`f116` AS `f116`,`chardev_cataclysm`.`item_sparse`.`SocketColor1` AS `SocketColor1`,`chardev_cataclysm`.`item_sparse`.`SocketColor2` AS `SocketColor2`,`chardev_cataclysm`.`item_sparse`.`SocketColor3` AS `SocketColor3`,`chardev_cataclysm`.`item_sparse`.`f120` AS `f120`,`chardev_cataclysm`.`item_sparse`.`f121` AS `f121`,`chardev_cataclysm`.`item_sparse`.`f122` AS `f122`,`chardev_cataclysm`.`item_sparse`.`SocketBonusID` AS `SocketBonusID`,`chardev_cataclysm`.`item_sparse`.`GemPropertiesID` AS `GemPropertiesID`,`chardev_cataclysm`.`item_sparse`.`f125` AS `f125`,`chardev_cataclysm`.`item_sparse`.`f126` AS `f126`,`chardev_cataclysm`.`item_sparse`.`LimitCategory` AS `LimitCategory`,`chardev_cataclysm`.`item_sparse`.`f128` AS `f128`,`chardev_cataclysm`.`item_sparse`.`DamageRange` AS `DamageRange`,`chardev_cataclysm`.`item_sparse`.`LimitCategoryMultiple` AS `LimitCategoryMultiple`,`chardev_cataclysm`.`item_sparse`.`f131` AS `f131`,`chardev_cataclysm`.`item_sparse`.`Version` AS `Version`,`chardev_cataclysm`.`item_sparse`.`Locale` AS `Locale` from `chardev_cataclysm`.`item_sparse` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorquality`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorquality`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorquality` AS select `chardev_cataclysm`.`itemarmorquality`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorquality`.`0` AS `0`,`chardev_cataclysm`.`itemarmorquality`.`1` AS `1`,`chardev_cataclysm`.`itemarmorquality`.`2` AS `2`,`chardev_cataclysm`.`itemarmorquality`.`3` AS `3`,`chardev_cataclysm`.`itemarmorquality`.`4` AS `4`,`chardev_cataclysm`.`itemarmorquality`.`5` AS `5`,`chardev_cataclysm`.`itemarmorquality`.`6` AS `6`,`chardev_cataclysm`.`itemarmorquality`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemarmorquality` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorshield`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorshield`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorshield` AS select `chardev_cataclysm`.`itemarmorshield`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorshield`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmorshield`.`0` AS `0`,`chardev_cataclysm`.`itemarmorshield`.`1` AS `1`,`chardev_cataclysm`.`itemarmorshield`.`2` AS `2`,`chardev_cataclysm`.`itemarmorshield`.`3` AS `3`,`chardev_cataclysm`.`itemarmorshield`.`4` AS `4`,`chardev_cataclysm`.`itemarmorshield`.`5` AS `5`,`chardev_cataclysm`.`itemarmorshield`.`6` AS `6` from `chardev_cataclysm`.`itemarmorshield` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmortotal`
--

/*!50001 DROP TABLE IF EXISTS `itemarmortotal`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmortotal` AS select `chardev_cataclysm`.`itemarmortotal`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmortotal`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmortotal`.`1` AS `1`,`chardev_cataclysm`.`itemarmortotal`.`2` AS `2`,`chardev_cataclysm`.`itemarmortotal`.`3` AS `3`,`chardev_cataclysm`.`itemarmortotal`.`4` AS `4` from `chardev_cataclysm`.`itemarmortotal` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehand` AS select `chardev_cataclysm`.`itemdamageonehand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehand`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehand`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehand`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehand`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehand`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehand`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehand`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehandcaster` AS select `chardev_cataclysm`.`itemdamageonehandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageranged`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageranged`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageranged` AS select `chardev_cataclysm`.`itemdamageranged`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageranged`.`0` AS `0`,`chardev_cataclysm`.`itemdamageranged`.`1` AS `1`,`chardev_cataclysm`.`itemdamageranged`.`2` AS `2`,`chardev_cataclysm`.`itemdamageranged`.`3` AS `3`,`chardev_cataclysm`.`itemdamageranged`.`4` AS `4`,`chardev_cataclysm`.`itemdamageranged`.`5` AS `5`,`chardev_cataclysm`.`itemdamageranged`.`6` AS `6`,`chardev_cataclysm`.`itemdamageranged`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageranged` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagethrown`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagethrown`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagethrown` AS select `chardev_cataclysm`.`itemdamagethrown`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagethrown`.`0` AS `0`,`chardev_cataclysm`.`itemdamagethrown`.`1` AS `1`,`chardev_cataclysm`.`itemdamagethrown`.`2` AS `2`,`chardev_cataclysm`.`itemdamagethrown`.`3` AS `3`,`chardev_cataclysm`.`itemdamagethrown`.`4` AS `4`,`chardev_cataclysm`.`itemdamagethrown`.`5` AS `5`,`chardev_cataclysm`.`itemdamagethrown`.`6` AS `6`,`chardev_cataclysm`.`itemdamagethrown`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagethrown` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohand` AS select `chardev_cataclysm`.`itemdamagetwohand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohandcaster` AS select `chardev_cataclysm`.`itemdamagetwohandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagewand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagewand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagewand` AS select `chardev_cataclysm`.`itemdamagewand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagewand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagewand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagewand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagewand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagewand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagewand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagewand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagewand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagewand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdisplayinfo`
--

/*!50001 DROP TABLE IF EXISTS `itemdisplayinfo`*/;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdisplayinfo` AS select `chardev_cataclysm`.`itemdisplayinfo`.`ID` AS `ID`,`chardev_cataclysm`.`itemdisplayinfo`.`f2` AS `f2`,`chardev_cataclysm`.`itemdisplayinfo`.`f3` AS `f3`,`chardev_cataclysm`.`itemdisplayinfo`.`f4` AS `f4`,`chardev_cataclysm`.`itemdisplayinfo`.`f5` AS `f5`,`chardev_cataclysm`.`itemdisplayinfo`.`Icon` AS `Icon`,`chardev_cataclysm`.`itemdisplayinfo`.`f7` AS `f7`,`chardev_cataclysm`.`itemdisplayinfo`.`f8` AS `f8`,`chardev_cataclysm`.`itemdisplayinfo`.`f9` AS `f9`,`chardev_cataclysm`.`itemdisplayinfo`.`f10` AS `f10`,`chardev_cataclysm`.`itemdisplayinfo`.`f11` AS `f11`,`chardev_cataclysm`.`itemdisplayinfo`.`f12` AS `f12`,`chardev_cataclysm`.`itemdisplayinfo`.`f13` AS `f13`,`chardev_cataclysm`.`itemdisplayinfo`.`f14` AS `f14`,`chardev_cataclysm`.`itemdisplayinfo`.`f15` AS `f15`,`chardev_cataclysm`.`itemdisplayinfo`.`f16` AS `f16`,`chardev_cataclysm`.`itemdisplayinfo`.`f17` AS `f17`,`chardev_cataclysm`.`itemdisplayinfo`.`f18` AS `f18`,`chardev_cataclysm`.`itemdisplayinfo`.`f19` AS `f19`,`chardev_cataclysm`.`itemdisplayinfo`.`f20` AS `f20`,`chardev_cataclysm`.`itemdisplayinfo`.`f21` AS `f21`,`chardev_cataclysm`.`itemdisplayinfo`.`f22` AS `f22`,`chardev_cataclysm`.`itemdisplayinfo`.`f23` AS `f23`,`chardev_cataclysm`.`itemdisplayinfo`.`f24` AS `f24`,`chardev_cataclysm`.`itemdisplayinfo`.`f25` AS `f25` from `chardev_cataclysm`.`itemdisplayinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemreforge`
--

/*!50001 DROP TABLE IF EXISTS `itemreforge`*/;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemreforge` AS select `chardev_cataclysm`.`itemreforge`.`ID` AS `ID`,`chardev_cataclysm`.`itemreforge`.`f2` AS `f2`,`chardev_cataclysm`.`itemreforge`.`f3` AS `f3`,`chardev_cataclysm`.`itemreforge`.`f4` AS `f4`,`chardev_cataclysm`.`itemreforge`.`f5` AS `f5` from `chardev_cataclysm`.`itemreforge` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `randproppoints`
--

/*!50001 DROP TABLE IF EXISTS `randproppoints`*/;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `randproppoints` AS select `chardev_cataclysm`.`randproppoints`.`ID` AS `ID`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group0` AS `PointsQuality4Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group1` AS `PointsQuality4Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group2` AS `PointsQuality4Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group3` AS `PointsQuality4Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group4` AS `PointsQuality4Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group0` AS `PointsQuality3Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group1` AS `PointsQuality3Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group2` AS `PointsQuality3Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group3` AS `PointsQuality3Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group4` AS `PointsQuality3Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group0` AS `PointsQuality2Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group1` AS `PointsQuality2Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group2` AS `PointsQuality2Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group3` AS `PointsQuality2Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group4` AS `PointsQuality2Group4` from `chardev_cataclysm`.`randproppoints` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatdistribution`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatdistribution`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatdistribution` AS select `chardev_cataclysm`.`scalingstatdistribution`.`id` AS `id`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient4` AS `Coefficient4`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient5` AS `Coefficient5`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient6` AS `Coefficient6`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient7` AS `Coefficient7`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient8` AS `Coefficient8`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient9` AS `Coefficient9`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient10` AS `Coefficient10`,`chardev_cataclysm`.`scalingstatdistribution`.`MinLevel` AS `MinLevel`,`chardev_cataclysm`.`scalingstatdistribution`.`MaxLevel` AS `MaxLevel` from `chardev_cataclysm`.`scalingstatdistribution` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatvalues`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatvalues`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatvalues` AS select `chardev_cataclysm`.`scalingstatvalues`.`id` AS `id`,`chardev_cataclysm`.`scalingstatvalues`.`level` AS `level`,`chardev_cataclysm`.`scalingstatvalues`.`dist0` AS `dist0`,`chardev_cataclysm`.`scalingstatvalues`.`dist1` AS `dist1`,`chardev_cataclysm`.`scalingstatvalues`.`dist2` AS `dist2`,`chardev_cataclysm`.`scalingstatvalues`.`dist3` AS `dist3`,`chardev_cataclysm`.`scalingstatvalues`.`dist4` AS `dist4`,`chardev_cataclysm`.`scalingstatvalues`.`dist5` AS `dist5`,`chardev_cataclysm`.`scalingstatvalues`.`dist6` AS `dist6`,`chardev_cataclysm`.`scalingstatvalues`.`dist7` AS `dist7`,`chardev_cataclysm`.`scalingstatvalues`.`dist8` AS `dist8`,`chardev_cataclysm`.`scalingstatvalues`.`dist9` AS `dist9`,`chardev_cataclysm`.`scalingstatvalues`.`dist10` AS `dist10`,`chardev_cataclysm`.`scalingstatvalues`.`dist11` AS `dist11`,`chardev_cataclysm`.`scalingstatvalues`.`dist12` AS `dist12`,`chardev_cataclysm`.`scalingstatvalues`.`dist13` AS `dist13`,`chardev_cataclysm`.`scalingstatvalues`.`dist14` AS `dist14`,`chardev_cataclysm`.`scalingstatvalues`.`dist15` AS `dist15`,`chardev_cataclysm`.`scalingstatvalues`.`dist16` AS `dist16`,`chardev_cataclysm`.`scalingstatvalues`.`dist17` AS `dist17`,`chardev_cataclysm`.`scalingstatvalues`.`dist18` AS `dist18`,`chardev_cataclysm`.`scalingstatvalues`.`dist19` AS `dist19`,`chardev_cataclysm`.`scalingstatvalues`.`dist20` AS `dist20`,`chardev_cataclysm`.`scalingstatvalues`.`dist21` AS `dist21`,`chardev_cataclysm`.`scalingstatvalues`.`dist22` AS `dist22`,`chardev_cataclysm`.`scalingstatvalues`.`dist23` AS `dist23`,`chardev_cataclysm`.`scalingstatvalues`.`dist24` AS `dist24`,`chardev_cataclysm`.`scalingstatvalues`.`dist25` AS `dist25`,`chardev_cataclysm`.`scalingstatvalues`.`dist26` AS `dist26`,`chardev_cataclysm`.`scalingstatvalues`.`dist27` AS `dist27`,`chardev_cataclysm`.`scalingstatvalues`.`dist28` AS `dist28`,`chardev_cataclysm`.`scalingstatvalues`.`dist29` AS `dist29`,`chardev_cataclysm`.`scalingstatvalues`.`dist30` AS `dist30`,`chardev_cataclysm`.`scalingstatvalues`.`dist31` AS `dist31`,`chardev_cataclysm`.`scalingstatvalues`.`dist32` AS `dist32`,`chardev_cataclysm`.`scalingstatvalues`.`dist33` AS `dist33`,`chardev_cataclysm`.`scalingstatvalues`.`dist34` AS `dist34`,`chardev_cataclysm`.`scalingstatvalues`.`dist35` AS `dist35`,`chardev_cataclysm`.`scalingstatvalues`.`dist36` AS `dist36`,`chardev_cataclysm`.`scalingstatvalues`.`dist37` AS `dist37`,`chardev_cataclysm`.`scalingstatvalues`.`dist38` AS `dist38`,`chardev_cataclysm`.`scalingstatvalues`.`dist39` AS `dist39`,`chardev_cataclysm`.`scalingstatvalues`.`dist40` AS `dist40`,`chardev_cataclysm`.`scalingstatvalues`.`dist41` AS `dist41`,`chardev_cataclysm`.`scalingstatvalues`.`dist42` AS `dist42`,`chardev_cataclysm`.`scalingstatvalues`.`dist43` AS `dist43`,`chardev_cataclysm`.`scalingstatvalues`.`dist44` AS `dist44` from `chardev_cataclysm`.`scalingstatvalues` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skilllineability`
--

/*!50001 DROP TABLE IF EXISTS `skilllineability`*/;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skilllineability` AS select `chardev_cataclysm`.`skilllineability`.`ID` AS `ID`,`chardev_cataclysm`.`skilllineability`.`SkillLineID` AS `SkillLineID`,`chardev_cataclysm`.`skilllineability`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`skilllineability`.`RaceMask` AS `RaceMask`,`chardev_cataclysm`.`skilllineability`.`ClassMask` AS `ClassMask`,`chardev_cataclysm`.`skilllineability`.`f6` AS `f6`,`chardev_cataclysm`.`skilllineability`.`f7` AS `f7`,`chardev_cataclysm`.`skilllineability`.`RequiredSkill` AS `RequiredSkill`,`chardev_cataclysm`.`skilllineability`.`ReplaceSpellID` AS `ReplaceSpellID`,`chardev_cataclysm`.`skilllineability`.`f10` AS `f10`,`chardev_cataclysm`.`skilllineability`.`Grey` AS `Grey`,`chardev_cataclysm`.`skilllineability`.`Yellow` AS `Yellow`,`chardev_cataclysm`.`skilllineability`.`f13` AS `f13`,`chardev_cataclysm`.`skilllineability`.`f14` AS `f14` from `chardev_cataclysm`.`skilllineability` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skillraceclassinfo`
--

/*!50001 DROP TABLE IF EXISTS `skillraceclassinfo`*/;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skillraceclassinfo` AS select `chardev_cataclysm`.`skillraceclassinfo`.`ID` AS `ID`,`chardev_cataclysm`.`skillraceclassinfo`.`f2` AS `f2`,`chardev_cataclysm`.`skillraceclassinfo`.`f3` AS `f3`,`chardev_cataclysm`.`skillraceclassinfo`.`f4` AS `f4`,`chardev_cataclysm`.`skillraceclassinfo`.`f5` AS `f5`,`chardev_cataclysm`.`skillraceclassinfo`.`f6` AS `f6`,`chardev_cataclysm`.`skillraceclassinfo`.`f7` AS `f7`,`chardev_cataclysm`.`skillraceclassinfo`.`f8` AS `f8`,`chardev_cataclysm`.`skillraceclassinfo`.`f9` AS `f9` from `chardev_cataclysm`.`skillraceclassinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellauraoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellauraoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellauraoptions` AS select `chardev_cataclysm`.`spellauraoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellauraoptions`.`Stacks` AS `Stacks`,`chardev_cataclysm`.`spellauraoptions`.`ProcRate` AS `ProcRate`,`chardev_cataclysm`.`spellauraoptions`.`ProcCharges` AS `ProcCharges`,`chardev_cataclysm`.`spellauraoptions`.`f5` AS `f5` from `chardev_cataclysm`.`spellauraoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellaurarestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spellaurarestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellaurarestrictions` AS select `chardev_cataclysm`.`spellaurarestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spellaurarestrictions`.`f2` AS `f2`,`chardev_cataclysm`.`spellaurarestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spellaurarestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spellaurarestrictions`.`f5` AS `f5`,`chardev_cataclysm`.`spellaurarestrictions`.`f6` AS `f6`,`chardev_cataclysm`.`spellaurarestrictions`.`f7` AS `f7`,`chardev_cataclysm`.`spellaurarestrictions`.`f8` AS `f8`,`chardev_cataclysm`.`spellaurarestrictions`.`f9` AS `f9` from `chardev_cataclysm`.`spellaurarestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcastingrequirements`
--

/*!50001 DROP TABLE IF EXISTS `spellcastingrequirements`*/;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcastingrequirements` AS select `chardev_cataclysm`.`spellcastingrequirements`.`ID` AS `ID`,`chardev_cataclysm`.`spellcastingrequirements`.`f2` AS `f2`,`chardev_cataclysm`.`spellcastingrequirements`.`f3` AS `f3`,`chardev_cataclysm`.`spellcastingrequirements`.`f4` AS `f4`,`chardev_cataclysm`.`spellcastingrequirements`.`f5` AS `f5`,`chardev_cataclysm`.`spellcastingrequirements`.`f6` AS `f6`,`chardev_cataclysm`.`spellcastingrequirements`.`f7` AS `f7` from `chardev_cataclysm`.`spellcastingrequirements` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcasttimes`
--

/*!50001 DROP TABLE IF EXISTS `spellcasttimes`*/;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcasttimes` AS select `chardev_cataclysm`.`spellcasttimes`.`ID` AS `ID`,`chardev_cataclysm`.`spellcasttimes`.`Time` AS `Time`,`chardev_cataclysm`.`spellcasttimes`.`f3` AS `f3`,`chardev_cataclysm`.`spellcasttimes`.`f4` AS `f4` from `chardev_cataclysm`.`spellcasttimes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategories`
--

/*!50001 DROP TABLE IF EXISTS `spellcategories`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategories` AS select `chardev_cataclysm`.`spellcategories`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategories`.`f2` AS `f2`,`chardev_cataclysm`.`spellcategories`.`f3` AS `f3`,`chardev_cataclysm`.`spellcategories`.`f4` AS `f4`,`chardev_cataclysm`.`spellcategories`.`f5` AS `f5`,`chardev_cataclysm`.`spellcategories`.`f6` AS `f6`,`chardev_cataclysm`.`spellcategories`.`f7` AS `f7` from `chardev_cataclysm`.`spellcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategory`
--

/*!50001 DROP TABLE IF EXISTS `spellcategory`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategory` AS select `chardev_cataclysm`.`spellcategory`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategory`.`f2` AS `f2` from `chardev_cataclysm`.`spellcategory` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellclassoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellclassoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellclassoptions` AS select `chardev_cataclysm`.`spellclassoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellclassoptions`.`f2` AS `f2`,`chardev_cataclysm`.`spellclassoptions`.`f3` AS `f3`,`chardev_cataclysm`.`spellclassoptions`.`f4` AS `f4`,`chardev_cataclysm`.`spellclassoptions`.`f5` AS `f5`,`chardev_cataclysm`.`spellclassoptions`.`SpellClassID` AS `SpellClassID`,`chardev_cataclysm`.`spellclassoptions`.`f7` AS `f7` from `chardev_cataclysm`.`spellclassoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcooldowns`
--

/*!50001 DROP TABLE IF EXISTS `spellcooldowns`*/;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcooldowns` AS select `chardev_cataclysm`.`spellcooldowns`.`ID` AS `ID`,`chardev_cataclysm`.`spellcooldowns`.`Spell` AS `Spell`,`chardev_cataclysm`.`spellcooldowns`.`Category` AS `Category`,`chardev_cataclysm`.`spellcooldowns`.`Global` AS `Global` from `chardev_cataclysm`.`spellcooldowns` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelldifficulty`
--

/*!50001 DROP TABLE IF EXISTS `spelldifficulty`*/;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelldifficulty` AS select `chardev_cataclysm`.`spelldifficulty`.`f1` AS `f1`,`chardev_cataclysm`.`spelldifficulty`.`f2` AS `f2`,`chardev_cataclysm`.`spelldifficulty`.`f3` AS `f3`,`chardev_cataclysm`.`spelldifficulty`.`f4` AS `f4`,`chardev_cataclysm`.`spelldifficulty`.`f5` AS `f5` from `chardev_cataclysm`.`spelldifficulty` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellduration`
--

/*!50001 DROP TABLE IF EXISTS `spellduration`*/;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellduration` AS select `chardev_cataclysm`.`spellduration`.`ID` AS `ID`,`chardev_cataclysm`.`spellduration`.`Duration` AS `Duration`,`chardev_cataclysm`.`spellduration`.`f3` AS `f3`,`chardev_cataclysm`.`spellduration`.`f4` AS `f4` from `chardev_cataclysm`.`spellduration` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelleffect`
--

/*!50001 DROP TABLE IF EXISTS `spelleffect`*/;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelleffect` AS select `chardev_cataclysm`.`spelleffect`.`ID` AS `ID`,`chardev_cataclysm`.`spelleffect`.`Aura` AS `Aura`,`chardev_cataclysm`.`spelleffect`.`ProcValue` AS `ProcValue`,`chardev_cataclysm`.`spelleffect`.`Effect` AS `Effect`,`chardev_cataclysm`.`spelleffect`.`Period` AS `Period`,`chardev_cataclysm`.`spelleffect`.`Value` AS `Value`,`chardev_cataclysm`.`spelleffect`.`Coefficient` AS `Coefficient`,`chardev_cataclysm`.`spelleffect`.`f8` AS `f8`,`chardev_cataclysm`.`spelleffect`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelleffect`.`Dice` AS `Dice`,`chardev_cataclysm`.`spelleffect`.`ItemID` AS `ItemID`,`chardev_cataclysm`.`spelleffect`.`f12` AS `f12`,`chardev_cataclysm`.`spelleffect`.`SecondaryEffect` AS `SecondaryEffect`,`chardev_cataclysm`.`spelleffect`.`UsedStat` AS `UsedStat`,`chardev_cataclysm`.`spelleffect`.`ProcChance` AS `ProcChance`,`chardev_cataclysm`.`spelleffect`.`SpellRadiusID` AS `SpellRadiusID`,`chardev_cataclysm`.`spelleffect`.`f17` AS `f17`,`chardev_cataclysm`.`spelleffect`.`LevelModifier` AS `LevelModifier`,`chardev_cataclysm`.`spelleffect`.`f19` AS `f19`,`chardev_cataclysm`.`spelleffect`.`f20` AS `f20`,`chardev_cataclysm`.`spelleffect`.`f21` AS `f21`,`chardev_cataclysm`.`spelleffect`.`f22` AS `f22`,`chardev_cataclysm`.`spelleffect`.`f23` AS `f23`,`chardev_cataclysm`.`spelleffect`.`f24` AS `f24`,`chardev_cataclysm`.`spelleffect`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`spelleffect`.`Index` AS `Index` from `chardev_cataclysm`.`spelleffect` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellequippeditems`
--

/*!50001 DROP TABLE IF EXISTS `spellequippeditems`*/;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellequippeditems` AS select `chardev_cataclysm`.`spellequippeditems`.`ID` AS `ID`,`chardev_cataclysm`.`spellequippeditems`.`ItemClassID` AS `ItemClassID`,`chardev_cataclysm`.`spellequippeditems`.`InventorySlotMask` AS `InventorySlotMask`,`chardev_cataclysm`.`spellequippeditems`.`ItemSubClassMask` AS `ItemSubClassMask` from `chardev_cataclysm`.`spellequippeditems` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyout`
--

/*!50001 DROP TABLE IF EXISTS `spellflyout`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyout` AS select `chardev_cataclysm`.`spellflyout`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyout`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyout`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyout`.`f4` AS `f4`,`chardev_cataclysm`.`spellflyout`.`f5` AS `f5`,`chardev_cataclysm`.`spellflyout`.`f6` AS `f6`,`chardev_cataclysm`.`spellflyout`.`f7` AS `f7` from `chardev_cataclysm`.`spellflyout` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyoutitem`
--

/*!50001 DROP TABLE IF EXISTS `spellflyoutitem`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyoutitem` AS select `chardev_cataclysm`.`spellflyoutitem`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyoutitem`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyoutitem`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyoutitem`.`f4` AS `f4` from `chardev_cataclysm`.`spellflyoutitem` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellfocusobject`
--

/*!50001 DROP TABLE IF EXISTS `spellfocusobject`*/;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellfocusobject` AS select `chardev_cataclysm`.`spellfocusobject`.`ID` AS `ID`,`chardev_cataclysm`.`spellfocusobject`.`f2` AS `f2` from `chardev_cataclysm`.`spellfocusobject` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellicon`
--

/*!50001 DROP TABLE IF EXISTS `spellicon`*/;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellicon` AS select `chardev_cataclysm`.`spellicon`.`ID` AS `ID`,`chardev_cataclysm`.`spellicon`.`Icon` AS `Icon` from `chardev_cataclysm`.`spellicon` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellinterrupts`
--

/*!50001 DROP TABLE IF EXISTS `spellinterrupts`*/;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellinterrupts` AS select `chardev_cataclysm`.`spellinterrupts`.`ID` AS `ID`,`chardev_cataclysm`.`spellinterrupts`.`f2` AS `f2`,`chardev_cataclysm`.`spellinterrupts`.`f3` AS `f3`,`chardev_cataclysm`.`spellinterrupts`.`f4` AS `f4`,`chardev_cataclysm`.`spellinterrupts`.`f5` AS `f5`,`chardev_cataclysm`.`spellinterrupts`.`f6` AS `f6` from `chardev_cataclysm`.`spellinterrupts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellitemenchantmentcondition`
--

/*!50001 DROP TABLE IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellitemenchantmentcondition` AS select `chardev_cataclysm`.`spellitemenchantmentcondition`.`ID` AS `ID`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color1` AS `Color1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color2` AS `Color2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color3` AS `Color3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color4` AS `Color4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color5` AS `Color5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f7` AS `f7`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f8` AS `f8`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f9` AS `f9`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f10` AS `f10`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f11` AS `f11`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_1` AS `f12_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_2` AS `f12_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_3` AS `f12_3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator1` AS `Comparator1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator2` AS `Comparator2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator3` AS `Comparator3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator4` AS `Comparator4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator5` AS `Comparator5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor1` AS `CompareColor1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor2` AS `CompareColor2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor3` AS `CompareColor3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor4` AS `CompareColor4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor5` AS `CompareColor5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_1` AS `f13_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_2` AS `f13_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value1` AS `Value1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value2` AS `Value2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value3` AS `Value3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value4` AS `Value4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value5` AS `Value5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f27` AS `f27`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f28` AS `f28`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f29` AS `f29`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f30` AS `f30`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f31` AS `f31` from `chardev_cataclysm`.`spellitemenchantmentcondition` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelllevels`
--

/*!50001 DROP TABLE IF EXISTS `spelllevels`*/;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelllevels` AS select `chardev_cataclysm`.`spelllevels`.`ID` AS `ID`,`chardev_cataclysm`.`spelllevels`.`f2` AS `f2`,`chardev_cataclysm`.`spelllevels`.`f3` AS `f3`,`chardev_cataclysm`.`spelllevels`.`f4` AS `f4` from `chardev_cataclysm`.`spelllevels` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmechanic`
--

/*!50001 DROP TABLE IF EXISTS `spellmechanic`*/;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmechanic` AS select `chardev_cataclysm`.`spellmechanic`.`ID` AS `ID`,`chardev_cataclysm`.`spellmechanic`.`f2` AS `f2` from `chardev_cataclysm`.`spellmechanic` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissile`
--

/*!50001 DROP TABLE IF EXISTS `spellmissile`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissile` AS select `chardev_cataclysm`.`spellmissile`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissile`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissile`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissile`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissile`.`f5` AS `f5`,`chardev_cataclysm`.`spellmissile`.`f6` AS `f6`,`chardev_cataclysm`.`spellmissile`.`f7` AS `f7`,`chardev_cataclysm`.`spellmissile`.`f8` AS `f8`,`chardev_cataclysm`.`spellmissile`.`f9` AS `f9`,`chardev_cataclysm`.`spellmissile`.`f10` AS `f10`,`chardev_cataclysm`.`spellmissile`.`f11` AS `f11`,`chardev_cataclysm`.`spellmissile`.`f12` AS `f12`,`chardev_cataclysm`.`spellmissile`.`f13` AS `f13`,`chardev_cataclysm`.`spellmissile`.`f14` AS `f14`,`chardev_cataclysm`.`spellmissile`.`f15` AS `f15` from `chardev_cataclysm`.`spellmissile` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissilemotion`
--

/*!50001 DROP TABLE IF EXISTS `spellmissilemotion`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissilemotion` AS select `chardev_cataclysm`.`spellmissilemotion`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissilemotion`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissilemotion`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissilemotion`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissilemotion`.`f5` AS `f5` from `chardev_cataclysm`.`spellmissilemotion` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellpower`
--

/*!50001 DROP TABLE IF EXISTS `spellpower`*/;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellpower` AS select `chardev_cataclysm`.`spellpower`.`ID` AS `ID`,`chardev_cataclysm`.`spellpower`.`Absolute` AS `Absolute`,`chardev_cataclysm`.`spellpower`.`f3` AS `f3`,`chardev_cataclysm`.`spellpower`.`Percent` AS `Percent`,`chardev_cataclysm`.`spellpower`.`f5` AS `f5`,`chardev_cataclysm`.`spellpower`.`f6` AS `f6`,`chardev_cataclysm`.`spellpower`.`f7` AS `f7` from `chardev_cataclysm`.`spellpower` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellradius`
--

/*!50001 DROP TABLE IF EXISTS `spellradius`*/;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellradius` AS select `chardev_cataclysm`.`spellradius`.`ID` AS `ID`,`chardev_cataclysm`.`spellradius`.`Radius` AS `Radius`,`chardev_cataclysm`.`spellradius`.`f3` AS `f3`,`chardev_cataclysm`.`spellradius`.`f4` AS `f4` from `chardev_cataclysm`.`spellradius` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellreagents`
--

/*!50001 DROP TABLE IF EXISTS `spellreagents`*/;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellreagents` AS select `chardev_cataclysm`.`spellreagents`.`ID` AS `ID`,`chardev_cataclysm`.`spellreagents`.`f2` AS `f2`,`chardev_cataclysm`.`spellreagents`.`f3` AS `f3`,`chardev_cataclysm`.`spellreagents`.`f4` AS `f4`,`chardev_cataclysm`.`spellreagents`.`f5` AS `f5`,`chardev_cataclysm`.`spellreagents`.`f6` AS `f6`,`chardev_cataclysm`.`spellreagents`.`f7` AS `f7`,`chardev_cataclysm`.`spellreagents`.`f8` AS `f8`,`chardev_cataclysm`.`spellreagents`.`f9` AS `f9`,`chardev_cataclysm`.`spellreagents`.`f10` AS `f10`,`chardev_cataclysm`.`spellreagents`.`f11` AS `f11`,`chardev_cataclysm`.`spellreagents`.`f12` AS `f12`,`chardev_cataclysm`.`spellreagents`.`f13` AS `f13`,`chardev_cataclysm`.`spellreagents`.`f14` AS `f14`,`chardev_cataclysm`.`spellreagents`.`f15` AS `f15`,`chardev_cataclysm`.`spellreagents`.`f16` AS `f16`,`chardev_cataclysm`.`spellreagents`.`f17` AS `f17` from `chardev_cataclysm`.`spellreagents` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellrunecost`
--

/*!50001 DROP TABLE IF EXISTS `spellrunecost`*/;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellrunecost` AS select `chardev_cataclysm`.`spellrunecost`.`ID` AS `ID`,`chardev_cataclysm`.`spellrunecost`.`f2` AS `f2`,`chardev_cataclysm`.`spellrunecost`.`f3` AS `f3`,`chardev_cataclysm`.`spellrunecost`.`f4` AS `f4`,`chardev_cataclysm`.`spellrunecost`.`f5` AS `f5` from `chardev_cataclysm`.`spellrunecost` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellscaling`
--

/*!50001 DROP TABLE IF EXISTS `spellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellscaling` AS select `chardev_cataclysm`.`spellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`spellscaling`.`CastTimeStart` AS `CastTimeStart`,`chardev_cataclysm`.`spellscaling`.`CastTimeEnd` AS `CastTimeEnd`,`chardev_cataclysm`.`spellscaling`.`Intervals` AS `Intervals`,`chardev_cataclysm`.`spellscaling`.`Distribution` AS `Distribution`,`chardev_cataclysm`.`spellscaling`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`spellscaling`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`spellscaling`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`spellscaling`.`Dice1` AS `Dice1`,`chardev_cataclysm`.`spellscaling`.`Dice2` AS `Dice2`,`chardev_cataclysm`.`spellscaling`.`Dice3` AS `Dice3`,`chardev_cataclysm`.`spellscaling`.`f12` AS `f12`,`chardev_cataclysm`.`spellscaling`.`f13` AS `f13`,`chardev_cataclysm`.`spellscaling`.`f14` AS `f14`,`chardev_cataclysm`.`spellscaling`.`f15` AS `f15`,`chardev_cataclysm`.`spellscaling`.`f16` AS `f16` from `chardev_cataclysm`.`spellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshift`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshift`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshift` AS select `chardev_cataclysm`.`spellshapeshift`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshift`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshift`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshift`.`SpellShapeshiftFormID` AS `SpellShapeshiftFormID`,`chardev_cataclysm`.`spellshapeshift`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshift`.`f6` AS `f6` from `chardev_cataclysm`.`spellshapeshift` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshiftform`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshiftform`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshiftform` AS select `chardev_cataclysm`.`spellshapeshiftform`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshiftform`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshiftform`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshiftform`.`f4` AS `f4`,`chardev_cataclysm`.`spellshapeshiftform`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshiftform`.`f6` AS `f6`,`chardev_cataclysm`.`spellshapeshiftform`.`f7` AS `f7`,`chardev_cataclysm`.`spellshapeshiftform`.`f8` AS `f8`,`chardev_cataclysm`.`spellshapeshiftform`.`f9` AS `f9`,`chardev_cataclysm`.`spellshapeshiftform`.`f10` AS `f10`,`chardev_cataclysm`.`spellshapeshiftform`.`f11` AS `f11`,`chardev_cataclysm`.`spellshapeshiftform`.`f12` AS `f12`,`chardev_cataclysm`.`spellshapeshiftform`.`f13` AS `f13`,`chardev_cataclysm`.`spellshapeshiftform`.`f14` AS `f14`,`chardev_cataclysm`.`spellshapeshiftform`.`f15` AS `f15`,`chardev_cataclysm`.`spellshapeshiftform`.`f16` AS `f16`,`chardev_cataclysm`.`spellshapeshiftform`.`f17` AS `f17`,`chardev_cataclysm`.`spellshapeshiftform`.`f18` AS `f18`,`chardev_cataclysm`.`spellshapeshiftform`.`f19` AS `f19`,`chardev_cataclysm`.`spellshapeshiftform`.`f20` AS `f20` from `chardev_cataclysm`.`spellshapeshiftform` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelltargetrestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spelltargetrestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelltargetrestrictions` AS select `chardev_cataclysm`.`spelltargetrestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spelltargetrestrictions`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelltargetrestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spelltargetrestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spelltargetrestrictions`.`f5` AS `f5` from `chardev_cataclysm`.`spelltargetrestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellvisual`
--

/*!50001 DROP TABLE IF EXISTS `spellvisual`*/;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellvisual` AS select `chardev_cataclysm`.`spellvisual`.`ID` AS `ID`,`chardev_cataclysm`.`spellvisual`.`f2` AS `f2`,`chardev_cataclysm`.`spellvisual`.`f3` AS `f3`,`chardev_cataclysm`.`spellvisual`.`f4` AS `f4`,`chardev_cataclysm`.`spellvisual`.`f5` AS `f5`,`chardev_cataclysm`.`spellvisual`.`f6` AS `f6`,`chardev_cataclysm`.`spellvisual`.`f7` AS `f7`,`chardev_cataclysm`.`spellvisual`.`f8` AS `f8`,`chardev_cataclysm`.`spellvisual`.`f9` AS `f9`,`chardev_cataclysm`.`spellvisual`.`f10` AS `f10`,`chardev_cataclysm`.`spellvisual`.`f11` AS `f11`,`chardev_cataclysm`.`spellvisual`.`f12` AS `f12`,`chardev_cataclysm`.`spellvisual`.`f13` AS `f13`,`chardev_cataclysm`.`spellvisual`.`f14` AS `f14`,`chardev_cataclysm`.`spellvisual`.`f15` AS `f15`,`chardev_cataclysm`.`spellvisual`.`f16` AS `f16`,`chardev_cataclysm`.`spellvisual`.`f17` AS `f17`,`chardev_cataclysm`.`spellvisual`.`f18` AS `f18`,`chardev_cataclysm`.`spellvisual`.`f19` AS `f19`,`chardev_cataclysm`.`spellvisual`.`f20` AS `f20`,`chardev_cataclysm`.`spellvisual`.`f21` AS `f21`,`chardev_cataclysm`.`spellvisual`.`f22` AS `f22`,`chardev_cataclysm`.`spellvisual`.`f23` AS `f23`,`chardev_cataclysm`.`spellvisual`.`f24` AS `f24`,`chardev_cataclysm`.`spellvisual`.`f25` AS `f25`,`chardev_cataclysm`.`spellvisual`.`f26` AS `f26`,`chardev_cataclysm`.`spellvisual`.`f27` AS `f27`,`chardev_cataclysm`.`spellvisual`.`f28` AS `f28`,`chardev_cataclysm`.`spellvisual`.`f29` AS `f29`,`chardev_cataclysm`.`spellvisual`.`f30` AS `f30`,`chardev_cataclysm`.`spellvisual`.`f31` AS `f31`,`chardev_cataclysm`.`spellvisual`.`f32` AS `f32` from `chardev_cataclysm`.`spellvisual` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talent`
--

/*!50001 DROP TABLE IF EXISTS `talent`*/;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talent` AS select `chardev_cataclysm`.`talent`.`ID` AS `ID`,`chardev_cataclysm`.`talent`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talent`.`Row` AS `Row`,`chardev_cataclysm`.`talent`.`Col` AS `Col`,`chardev_cataclysm`.`talent`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`talent`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`talent`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`talent`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`talent`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`talent`.`RequiredTalentID1` AS `RequiredTalentID1`,`chardev_cataclysm`.`talent`.`RequiredTalentID2` AS `RequiredTalentID2`,`chardev_cataclysm`.`talent`.`RequiredTalentID3` AS `RequiredTalentID3`,`chardev_cataclysm`.`talent`.`f13` AS `f13`,`chardev_cataclysm`.`talent`.`f14` AS `f14`,`chardev_cataclysm`.`talent`.`f15` AS `f15`,`chardev_cataclysm`.`talent`.`f16` AS `f16`,`chardev_cataclysm`.`talent`.`f17` AS `f17`,`chardev_cataclysm`.`talent`.`PetMask0` AS `PetMask0`,`chardev_cataclysm`.`talent`.`PetMask1` AS `PetMask1` from `chardev_cataclysm`.`talent` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talenttreeprimaryspells`
--

/*!50001 DROP TABLE IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talenttreeprimaryspells` AS select `chardev_cataclysm`.`talenttreeprimaryspells`.`ID` AS `ID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`f4` AS `f4` from `chardev_cataclysm`.`talenttreeprimaryspells` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Current Database: `chardev_cataclysm_es`
--

USE `chardev_cataclysm_es`;

--
-- Final view structure for view `gemproperties`
--

/*!50001 DROP TABLE IF EXISTS `gemproperties`*/;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gemproperties` AS select `chardev_cataclysm`.`gemproperties`.`ID` AS `ID`,`chardev_cataclysm`.`gemproperties`.`SpellItemEnchantmentID` AS `SpellItemEnchantmentID`,`chardev_cataclysm`.`gemproperties`.`f3` AS `f3`,`chardev_cataclysm`.`gemproperties`.`f4` AS `f4`,`chardev_cataclysm`.`gemproperties`.`f5` AS `f5`,`chardev_cataclysm`.`gemproperties`.`MinItemLevel` AS `MinItemLevel` from `chardev_cataclysm`.`gemproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `glyphproperties`
--

/*!50001 DROP TABLE IF EXISTS `glyphproperties`*/;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `glyphproperties` AS select `chardev_cataclysm`.`glyphproperties`.`ID` AS `ID`,`chardev_cataclysm`.`glyphproperties`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`glyphproperties`.`Type` AS `Type`,`chardev_cataclysm`.`glyphproperties`.`f4` AS `f4` from `chardev_cataclysm`.`glyphproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecrit` AS select `chardev_cataclysm`.`gtchancetomeleecrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecritbase` AS select `chardev_cataclysm`.`gtchancetomeleecritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcrit` AS select `chardev_cataclysm`.`gtchancetospellcrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcritbase` AS select `chardev_cataclysm`.`gtchancetospellcritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtcombatratings`
--

/*!50001 DROP TABLE IF EXISTS `gtcombatratings`*/;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtcombatratings` AS select `chardev_cataclysm`.`gtcombatratings`.`ID` AS `ID`,`chardev_cataclysm`.`gtcombatratings`.`Value` AS `Value` from `chardev_cataclysm`.`gtcombatratings` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenhp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenhp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenhp` AS select `chardev_cataclysm`.`gtoctregenhp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenhp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenhp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenmp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenmp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenmp` AS select `chardev_cataclysm`.`gtoctregenmp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenmp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenmp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenhpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenhpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenhpperspt` AS select `chardev_cataclysm`.`gtregenhpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenhpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenhpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenmpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenmpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenmpperspt` AS select `chardev_cataclysm`.`gtregenmpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenmpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenmpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtspellscaling`
--

/*!50001 DROP TABLE IF EXISTS `gtspellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtspellscaling` AS select `chardev_cataclysm`.`gtspellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`gtspellscaling`.`Value` AS `Value` from `chardev_cataclysm`.`gtspellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item`
--

/*!50001 DROP TABLE IF EXISTS `item`*/;
/*!50001 DROP VIEW IF EXISTS `item`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item` AS select `chardev_cataclysm`.`item`.`ID` AS `ID`,`chardev_cataclysm`.`item`.`ItemClass` AS `ItemClass`,`chardev_cataclysm`.`item`.`ItemSubClass` AS `ItemSubClass`,`chardev_cataclysm`.`item`.`f4` AS `f4`,`chardev_cataclysm`.`item`.`f5` AS `f5`,`chardev_cataclysm`.`item`.`ItemDisplayInfoID` AS `ItemDisplayInfoID`,`chardev_cataclysm`.`item`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item`.`f8` AS `f8` from `chardev_cataclysm`.`item` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item_sparse`
--

/*!50001 DROP TABLE IF EXISTS `item_sparse`*/;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item_sparse` AS select `chardev_cataclysm`.`item_sparse`.`ID` AS `ID`,`chardev_cataclysm`.`item_sparse`.`Quality` AS `Quality`,`chardev_cataclysm`.`item_sparse`.`TypeMask` AS `TypeMask`,`chardev_cataclysm`.`item_sparse`.`TypeMask2` AS `TypeMask2`,`chardev_cataclysm`.`item_sparse`.`TypeMask3` AS `TypeMask3`,`chardev_cataclysm`.`item_sparse`.`TypeMask4` AS `TypeMask4`,`chardev_cataclysm`.`item_sparse`.`TypeMask5` AS `TypeMask5`,`chardev_cataclysm`.`item_sparse`.`BuyPrice` AS `BuyPrice`,`chardev_cataclysm`.`item_sparse`.`SellPrice` AS `SellPrice`,`chardev_cataclysm`.`item_sparse`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item_sparse`.`ChrClassMask` AS `ChrClassMask`,`chardev_cataclysm`.`item_sparse`.`ChrRaceMask` AS `ChrRaceMask`,`chardev_cataclysm`.`item_sparse`.`Level` AS `Level`,`chardev_cataclysm`.`item_sparse`.`RequiredCharacterLevel` AS `RequiredCharacterLevel`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineID` AS `RequiredSkillLineID`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineLevel` AS `RequiredSkillLineLevel`,`chardev_cataclysm`.`item_sparse`.`f14` AS `f14`,`chardev_cataclysm`.`item_sparse`.`f15` AS `f15`,`chardev_cataclysm`.`item_sparse`.`f16` AS `f16`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionID` AS `RequiredFactionID`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionReputation` AS `RequiredFactionReputation`,`chardev_cataclysm`.`item_sparse`.`Unique` AS `Unique`,`chardev_cataclysm`.`item_sparse`.`MaximumStackSize` AS `MaximumStackSize`,`chardev_cataclysm`.`item_sparse`.`f21` AS `f21`,`chardev_cataclysm`.`item_sparse`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`item_sparse`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`item_sparse`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`item_sparse`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`item_sparse`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`item_sparse`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`item_sparse`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`item_sparse`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`item_sparse`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`item_sparse`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`item_sparse`.`StatValue1` AS `StatValue1`,`chardev_cataclysm`.`item_sparse`.`StatValue2` AS `StatValue2`,`chardev_cataclysm`.`item_sparse`.`StatValue3` AS `StatValue3`,`chardev_cataclysm`.`item_sparse`.`StatValue4` AS `StatValue4`,`chardev_cataclysm`.`item_sparse`.`StatValue5` AS `StatValue5`,`chardev_cataclysm`.`item_sparse`.`StatValue6` AS `StatValue6`,`chardev_cataclysm`.`item_sparse`.`StatValue7` AS `StatValue7`,`chardev_cataclysm`.`item_sparse`.`StatValue8` AS `StatValue8`,`chardev_cataclysm`.`item_sparse`.`StatValue9` AS `StatValue9`,`chardev_cataclysm`.`item_sparse`.`StatValue10` AS `StatValue10`,`chardev_cataclysm`.`item_sparse`.`f42` AS `f42`,`chardev_cataclysm`.`item_sparse`.`f43` AS `f43`,`chardev_cataclysm`.`item_sparse`.`f44` AS `f44`,`chardev_cataclysm`.`item_sparse`.`f45` AS `f45`,`chardev_cataclysm`.`item_sparse`.`f46` AS `f46`,`chardev_cataclysm`.`item_sparse`.`f47` AS `f47`,`chardev_cataclysm`.`item_sparse`.`f48` AS `f48`,`chardev_cataclysm`.`item_sparse`.`f49` AS `f49`,`chardev_cataclysm`.`item_sparse`.`f50` AS `f50`,`chardev_cataclysm`.`item_sparse`.`f51` AS `f51`,`chardev_cataclysm`.`item_sparse`.`f52` AS `f52`,`chardev_cataclysm`.`item_sparse`.`f53` AS `f53`,`chardev_cataclysm`.`item_sparse`.`f54` AS `f54`,`chardev_cataclysm`.`item_sparse`.`f55` AS `f55`,`chardev_cataclysm`.`item_sparse`.`f56` AS `f56`,`chardev_cataclysm`.`item_sparse`.`f57` AS `f57`,`chardev_cataclysm`.`item_sparse`.`f58` AS `f58`,`chardev_cataclysm`.`item_sparse`.`f59` AS `f59`,`chardev_cataclysm`.`item_sparse`.`f60` AS `f60`,`chardev_cataclysm`.`item_sparse`.`f61` AS `f61`,`chardev_cataclysm`.`item_sparse`.`ScalingStatDistributionID` AS `ScalingStatDistributionID`,`chardev_cataclysm`.`item_sparse`.`f63` AS `f63`,`chardev_cataclysm`.`item_sparse`.`Delay` AS `Delay`,`chardev_cataclysm`.`item_sparse`.`f65` AS `f65`,`chardev_cataclysm`.`item_sparse`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`item_sparse`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`item_sparse`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`item_sparse`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`item_sparse`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger1` AS `SpellTrigger1`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger2` AS `SpellTrigger2`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger3` AS `SpellTrigger3`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger4` AS `SpellTrigger4`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger5` AS `SpellTrigger5`,`chardev_cataclysm`.`item_sparse`.`SpellCharges1` AS `SpellCharges1`,`chardev_cataclysm`.`item_sparse`.`SpellCharges2` AS `SpellCharges2`,`chardev_cataclysm`.`item_sparse`.`SpellCharges3` AS `SpellCharges3`,`chardev_cataclysm`.`item_sparse`.`SpellCharges4` AS `SpellCharges4`,`chardev_cataclysm`.`item_sparse`.`SpellCharges5` AS `SpellCharges5`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown1` AS `SpellCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown2` AS `SpellCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown3` AS `SpellCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown4` AS `SpellCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown5` AS `SpellCooldown5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID1` AS `SpellCategoryID1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID2` AS `SpellCategoryID2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID3` AS `SpellCategoryID3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID4` AS `SpellCategoryID4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID5` AS `SpellCategoryID5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown1` AS `SpellCategoryCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown2` AS `SpellCategoryCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown3` AS `SpellCategoryCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown4` AS `SpellCategoryCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown5` AS `SpellCategoryCooldown5`,`chardev_cataclysm`.`item_sparse`.`Binds` AS `Binds`,`chardev_cataclysm`.`item_sparse`.`Name` AS `Name`,`chardev_cataclysm`.`item_sparse`.`f98` AS `f98`,`chardev_cataclysm`.`item_sparse`.`f99` AS `f99`,`chardev_cataclysm`.`item_sparse`.`f100` AS `f100`,`chardev_cataclysm`.`item_sparse`.`Description` AS `Description`,`chardev_cataclysm`.`item_sparse`.`QuestID` AS `QuestID`,`chardev_cataclysm`.`item_sparse`.`f103` AS `f103`,`chardev_cataclysm`.`item_sparse`.`f104` AS `f104`,`chardev_cataclysm`.`item_sparse`.`f105` AS `f105`,`chardev_cataclysm`.`item_sparse`.`f106` AS `f106`,`chardev_cataclysm`.`item_sparse`.`f107` AS `f107`,`chardev_cataclysm`.`item_sparse`.`f108` AS `f108`,`chardev_cataclysm`.`item_sparse`.`RandomPropertiesID` AS `RandomPropertiesID`,`chardev_cataclysm`.`item_sparse`.`RandomSuffixID` AS `RandomSuffixID`,`chardev_cataclysm`.`item_sparse`.`ItemSetID` AS `ItemSetID`,`chardev_cataclysm`.`item_sparse`.`f113` AS `f113`,`chardev_cataclysm`.`item_sparse`.`f114` AS `f114`,`chardev_cataclysm`.`item_sparse`.`f115` AS `f115`,`chardev_cataclysm`.`item_sparse`.`f116` AS `f116`,`chardev_cataclysm`.`item_sparse`.`SocketColor1` AS `SocketColor1`,`chardev_cataclysm`.`item_sparse`.`SocketColor2` AS `SocketColor2`,`chardev_cataclysm`.`item_sparse`.`SocketColor3` AS `SocketColor3`,`chardev_cataclysm`.`item_sparse`.`f120` AS `f120`,`chardev_cataclysm`.`item_sparse`.`f121` AS `f121`,`chardev_cataclysm`.`item_sparse`.`f122` AS `f122`,`chardev_cataclysm`.`item_sparse`.`SocketBonusID` AS `SocketBonusID`,`chardev_cataclysm`.`item_sparse`.`GemPropertiesID` AS `GemPropertiesID`,`chardev_cataclysm`.`item_sparse`.`f125` AS `f125`,`chardev_cataclysm`.`item_sparse`.`f126` AS `f126`,`chardev_cataclysm`.`item_sparse`.`LimitCategory` AS `LimitCategory`,`chardev_cataclysm`.`item_sparse`.`f128` AS `f128`,`chardev_cataclysm`.`item_sparse`.`DamageRange` AS `DamageRange`,`chardev_cataclysm`.`item_sparse`.`LimitCategoryMultiple` AS `LimitCategoryMultiple`,`chardev_cataclysm`.`item_sparse`.`f131` AS `f131`,`chardev_cataclysm`.`item_sparse`.`Version` AS `Version`,`chardev_cataclysm`.`item_sparse`.`Locale` AS `Locale` from `chardev_cataclysm`.`item_sparse` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorquality`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorquality`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorquality` AS select `chardev_cataclysm`.`itemarmorquality`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorquality`.`0` AS `0`,`chardev_cataclysm`.`itemarmorquality`.`1` AS `1`,`chardev_cataclysm`.`itemarmorquality`.`2` AS `2`,`chardev_cataclysm`.`itemarmorquality`.`3` AS `3`,`chardev_cataclysm`.`itemarmorquality`.`4` AS `4`,`chardev_cataclysm`.`itemarmorquality`.`5` AS `5`,`chardev_cataclysm`.`itemarmorquality`.`6` AS `6`,`chardev_cataclysm`.`itemarmorquality`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemarmorquality` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorshield`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorshield`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorshield` AS select `chardev_cataclysm`.`itemarmorshield`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorshield`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmorshield`.`0` AS `0`,`chardev_cataclysm`.`itemarmorshield`.`1` AS `1`,`chardev_cataclysm`.`itemarmorshield`.`2` AS `2`,`chardev_cataclysm`.`itemarmorshield`.`3` AS `3`,`chardev_cataclysm`.`itemarmorshield`.`4` AS `4`,`chardev_cataclysm`.`itemarmorshield`.`5` AS `5`,`chardev_cataclysm`.`itemarmorshield`.`6` AS `6` from `chardev_cataclysm`.`itemarmorshield` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmortotal`
--

/*!50001 DROP TABLE IF EXISTS `itemarmortotal`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmortotal` AS select `chardev_cataclysm`.`itemarmortotal`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmortotal`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmortotal`.`1` AS `1`,`chardev_cataclysm`.`itemarmortotal`.`2` AS `2`,`chardev_cataclysm`.`itemarmortotal`.`3` AS `3`,`chardev_cataclysm`.`itemarmortotal`.`4` AS `4` from `chardev_cataclysm`.`itemarmortotal` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehand` AS select `chardev_cataclysm`.`itemdamageonehand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehand`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehand`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehand`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehand`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehand`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehand`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehand`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehandcaster` AS select `chardev_cataclysm`.`itemdamageonehandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageranged`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageranged`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageranged` AS select `chardev_cataclysm`.`itemdamageranged`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageranged`.`0` AS `0`,`chardev_cataclysm`.`itemdamageranged`.`1` AS `1`,`chardev_cataclysm`.`itemdamageranged`.`2` AS `2`,`chardev_cataclysm`.`itemdamageranged`.`3` AS `3`,`chardev_cataclysm`.`itemdamageranged`.`4` AS `4`,`chardev_cataclysm`.`itemdamageranged`.`5` AS `5`,`chardev_cataclysm`.`itemdamageranged`.`6` AS `6`,`chardev_cataclysm`.`itemdamageranged`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageranged` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagethrown`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagethrown`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagethrown` AS select `chardev_cataclysm`.`itemdamagethrown`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagethrown`.`0` AS `0`,`chardev_cataclysm`.`itemdamagethrown`.`1` AS `1`,`chardev_cataclysm`.`itemdamagethrown`.`2` AS `2`,`chardev_cataclysm`.`itemdamagethrown`.`3` AS `3`,`chardev_cataclysm`.`itemdamagethrown`.`4` AS `4`,`chardev_cataclysm`.`itemdamagethrown`.`5` AS `5`,`chardev_cataclysm`.`itemdamagethrown`.`6` AS `6`,`chardev_cataclysm`.`itemdamagethrown`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagethrown` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohand` AS select `chardev_cataclysm`.`itemdamagetwohand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohandcaster` AS select `chardev_cataclysm`.`itemdamagetwohandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagewand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagewand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagewand` AS select `chardev_cataclysm`.`itemdamagewand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagewand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagewand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagewand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagewand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagewand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagewand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagewand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagewand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagewand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdisplayinfo`
--

/*!50001 DROP TABLE IF EXISTS `itemdisplayinfo`*/;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdisplayinfo` AS select `chardev_cataclysm`.`itemdisplayinfo`.`ID` AS `ID`,`chardev_cataclysm`.`itemdisplayinfo`.`f2` AS `f2`,`chardev_cataclysm`.`itemdisplayinfo`.`f3` AS `f3`,`chardev_cataclysm`.`itemdisplayinfo`.`f4` AS `f4`,`chardev_cataclysm`.`itemdisplayinfo`.`f5` AS `f5`,`chardev_cataclysm`.`itemdisplayinfo`.`Icon` AS `Icon`,`chardev_cataclysm`.`itemdisplayinfo`.`f7` AS `f7`,`chardev_cataclysm`.`itemdisplayinfo`.`f8` AS `f8`,`chardev_cataclysm`.`itemdisplayinfo`.`f9` AS `f9`,`chardev_cataclysm`.`itemdisplayinfo`.`f10` AS `f10`,`chardev_cataclysm`.`itemdisplayinfo`.`f11` AS `f11`,`chardev_cataclysm`.`itemdisplayinfo`.`f12` AS `f12`,`chardev_cataclysm`.`itemdisplayinfo`.`f13` AS `f13`,`chardev_cataclysm`.`itemdisplayinfo`.`f14` AS `f14`,`chardev_cataclysm`.`itemdisplayinfo`.`f15` AS `f15`,`chardev_cataclysm`.`itemdisplayinfo`.`f16` AS `f16`,`chardev_cataclysm`.`itemdisplayinfo`.`f17` AS `f17`,`chardev_cataclysm`.`itemdisplayinfo`.`f18` AS `f18`,`chardev_cataclysm`.`itemdisplayinfo`.`f19` AS `f19`,`chardev_cataclysm`.`itemdisplayinfo`.`f20` AS `f20`,`chardev_cataclysm`.`itemdisplayinfo`.`f21` AS `f21`,`chardev_cataclysm`.`itemdisplayinfo`.`f22` AS `f22`,`chardev_cataclysm`.`itemdisplayinfo`.`f23` AS `f23`,`chardev_cataclysm`.`itemdisplayinfo`.`f24` AS `f24`,`chardev_cataclysm`.`itemdisplayinfo`.`f25` AS `f25` from `chardev_cataclysm`.`itemdisplayinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemreforge`
--

/*!50001 DROP TABLE IF EXISTS `itemreforge`*/;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemreforge` AS select `chardev_cataclysm`.`itemreforge`.`ID` AS `ID`,`chardev_cataclysm`.`itemreforge`.`f2` AS `f2`,`chardev_cataclysm`.`itemreforge`.`f3` AS `f3`,`chardev_cataclysm`.`itemreforge`.`f4` AS `f4`,`chardev_cataclysm`.`itemreforge`.`f5` AS `f5` from `chardev_cataclysm`.`itemreforge` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `randproppoints`
--

/*!50001 DROP TABLE IF EXISTS `randproppoints`*/;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `randproppoints` AS select `chardev_cataclysm`.`randproppoints`.`ID` AS `ID`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group0` AS `PointsQuality4Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group1` AS `PointsQuality4Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group2` AS `PointsQuality4Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group3` AS `PointsQuality4Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group4` AS `PointsQuality4Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group0` AS `PointsQuality3Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group1` AS `PointsQuality3Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group2` AS `PointsQuality3Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group3` AS `PointsQuality3Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group4` AS `PointsQuality3Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group0` AS `PointsQuality2Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group1` AS `PointsQuality2Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group2` AS `PointsQuality2Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group3` AS `PointsQuality2Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group4` AS `PointsQuality2Group4` from `chardev_cataclysm`.`randproppoints` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatdistribution`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatdistribution`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatdistribution` AS select `chardev_cataclysm`.`scalingstatdistribution`.`id` AS `id`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient4` AS `Coefficient4`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient5` AS `Coefficient5`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient6` AS `Coefficient6`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient7` AS `Coefficient7`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient8` AS `Coefficient8`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient9` AS `Coefficient9`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient10` AS `Coefficient10`,`chardev_cataclysm`.`scalingstatdistribution`.`MinLevel` AS `MinLevel`,`chardev_cataclysm`.`scalingstatdistribution`.`MaxLevel` AS `MaxLevel` from `chardev_cataclysm`.`scalingstatdistribution` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatvalues`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatvalues`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatvalues` AS select `chardev_cataclysm`.`scalingstatvalues`.`id` AS `id`,`chardev_cataclysm`.`scalingstatvalues`.`level` AS `level`,`chardev_cataclysm`.`scalingstatvalues`.`dist0` AS `dist0`,`chardev_cataclysm`.`scalingstatvalues`.`dist1` AS `dist1`,`chardev_cataclysm`.`scalingstatvalues`.`dist2` AS `dist2`,`chardev_cataclysm`.`scalingstatvalues`.`dist3` AS `dist3`,`chardev_cataclysm`.`scalingstatvalues`.`dist4` AS `dist4`,`chardev_cataclysm`.`scalingstatvalues`.`dist5` AS `dist5`,`chardev_cataclysm`.`scalingstatvalues`.`dist6` AS `dist6`,`chardev_cataclysm`.`scalingstatvalues`.`dist7` AS `dist7`,`chardev_cataclysm`.`scalingstatvalues`.`dist8` AS `dist8`,`chardev_cataclysm`.`scalingstatvalues`.`dist9` AS `dist9`,`chardev_cataclysm`.`scalingstatvalues`.`dist10` AS `dist10`,`chardev_cataclysm`.`scalingstatvalues`.`dist11` AS `dist11`,`chardev_cataclysm`.`scalingstatvalues`.`dist12` AS `dist12`,`chardev_cataclysm`.`scalingstatvalues`.`dist13` AS `dist13`,`chardev_cataclysm`.`scalingstatvalues`.`dist14` AS `dist14`,`chardev_cataclysm`.`scalingstatvalues`.`dist15` AS `dist15`,`chardev_cataclysm`.`scalingstatvalues`.`dist16` AS `dist16`,`chardev_cataclysm`.`scalingstatvalues`.`dist17` AS `dist17`,`chardev_cataclysm`.`scalingstatvalues`.`dist18` AS `dist18`,`chardev_cataclysm`.`scalingstatvalues`.`dist19` AS `dist19`,`chardev_cataclysm`.`scalingstatvalues`.`dist20` AS `dist20`,`chardev_cataclysm`.`scalingstatvalues`.`dist21` AS `dist21`,`chardev_cataclysm`.`scalingstatvalues`.`dist22` AS `dist22`,`chardev_cataclysm`.`scalingstatvalues`.`dist23` AS `dist23`,`chardev_cataclysm`.`scalingstatvalues`.`dist24` AS `dist24`,`chardev_cataclysm`.`scalingstatvalues`.`dist25` AS `dist25`,`chardev_cataclysm`.`scalingstatvalues`.`dist26` AS `dist26`,`chardev_cataclysm`.`scalingstatvalues`.`dist27` AS `dist27`,`chardev_cataclysm`.`scalingstatvalues`.`dist28` AS `dist28`,`chardev_cataclysm`.`scalingstatvalues`.`dist29` AS `dist29`,`chardev_cataclysm`.`scalingstatvalues`.`dist30` AS `dist30`,`chardev_cataclysm`.`scalingstatvalues`.`dist31` AS `dist31`,`chardev_cataclysm`.`scalingstatvalues`.`dist32` AS `dist32`,`chardev_cataclysm`.`scalingstatvalues`.`dist33` AS `dist33`,`chardev_cataclysm`.`scalingstatvalues`.`dist34` AS `dist34`,`chardev_cataclysm`.`scalingstatvalues`.`dist35` AS `dist35`,`chardev_cataclysm`.`scalingstatvalues`.`dist36` AS `dist36`,`chardev_cataclysm`.`scalingstatvalues`.`dist37` AS `dist37`,`chardev_cataclysm`.`scalingstatvalues`.`dist38` AS `dist38`,`chardev_cataclysm`.`scalingstatvalues`.`dist39` AS `dist39`,`chardev_cataclysm`.`scalingstatvalues`.`dist40` AS `dist40`,`chardev_cataclysm`.`scalingstatvalues`.`dist41` AS `dist41`,`chardev_cataclysm`.`scalingstatvalues`.`dist42` AS `dist42`,`chardev_cataclysm`.`scalingstatvalues`.`dist43` AS `dist43`,`chardev_cataclysm`.`scalingstatvalues`.`dist44` AS `dist44` from `chardev_cataclysm`.`scalingstatvalues` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skilllineability`
--

/*!50001 DROP TABLE IF EXISTS `skilllineability`*/;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skilllineability` AS select `chardev_cataclysm`.`skilllineability`.`ID` AS `ID`,`chardev_cataclysm`.`skilllineability`.`SkillLineID` AS `SkillLineID`,`chardev_cataclysm`.`skilllineability`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`skilllineability`.`RaceMask` AS `RaceMask`,`chardev_cataclysm`.`skilllineability`.`ClassMask` AS `ClassMask`,`chardev_cataclysm`.`skilllineability`.`f6` AS `f6`,`chardev_cataclysm`.`skilllineability`.`f7` AS `f7`,`chardev_cataclysm`.`skilllineability`.`RequiredSkill` AS `RequiredSkill`,`chardev_cataclysm`.`skilllineability`.`ReplaceSpellID` AS `ReplaceSpellID`,`chardev_cataclysm`.`skilllineability`.`f10` AS `f10`,`chardev_cataclysm`.`skilllineability`.`Grey` AS `Grey`,`chardev_cataclysm`.`skilllineability`.`Yellow` AS `Yellow`,`chardev_cataclysm`.`skilllineability`.`f13` AS `f13`,`chardev_cataclysm`.`skilllineability`.`f14` AS `f14` from `chardev_cataclysm`.`skilllineability` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skillraceclassinfo`
--

/*!50001 DROP TABLE IF EXISTS `skillraceclassinfo`*/;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skillraceclassinfo` AS select `chardev_cataclysm`.`skillraceclassinfo`.`ID` AS `ID`,`chardev_cataclysm`.`skillraceclassinfo`.`f2` AS `f2`,`chardev_cataclysm`.`skillraceclassinfo`.`f3` AS `f3`,`chardev_cataclysm`.`skillraceclassinfo`.`f4` AS `f4`,`chardev_cataclysm`.`skillraceclassinfo`.`f5` AS `f5`,`chardev_cataclysm`.`skillraceclassinfo`.`f6` AS `f6`,`chardev_cataclysm`.`skillraceclassinfo`.`f7` AS `f7`,`chardev_cataclysm`.`skillraceclassinfo`.`f8` AS `f8`,`chardev_cataclysm`.`skillraceclassinfo`.`f9` AS `f9` from `chardev_cataclysm`.`skillraceclassinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellauraoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellauraoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellauraoptions` AS select `chardev_cataclysm`.`spellauraoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellauraoptions`.`Stacks` AS `Stacks`,`chardev_cataclysm`.`spellauraoptions`.`ProcRate` AS `ProcRate`,`chardev_cataclysm`.`spellauraoptions`.`ProcCharges` AS `ProcCharges`,`chardev_cataclysm`.`spellauraoptions`.`f5` AS `f5` from `chardev_cataclysm`.`spellauraoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellaurarestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spellaurarestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellaurarestrictions` AS select `chardev_cataclysm`.`spellaurarestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spellaurarestrictions`.`f2` AS `f2`,`chardev_cataclysm`.`spellaurarestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spellaurarestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spellaurarestrictions`.`f5` AS `f5`,`chardev_cataclysm`.`spellaurarestrictions`.`f6` AS `f6`,`chardev_cataclysm`.`spellaurarestrictions`.`f7` AS `f7`,`chardev_cataclysm`.`spellaurarestrictions`.`f8` AS `f8`,`chardev_cataclysm`.`spellaurarestrictions`.`f9` AS `f9` from `chardev_cataclysm`.`spellaurarestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcastingrequirements`
--

/*!50001 DROP TABLE IF EXISTS `spellcastingrequirements`*/;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcastingrequirements` AS select `chardev_cataclysm`.`spellcastingrequirements`.`ID` AS `ID`,`chardev_cataclysm`.`spellcastingrequirements`.`f2` AS `f2`,`chardev_cataclysm`.`spellcastingrequirements`.`f3` AS `f3`,`chardev_cataclysm`.`spellcastingrequirements`.`f4` AS `f4`,`chardev_cataclysm`.`spellcastingrequirements`.`f5` AS `f5`,`chardev_cataclysm`.`spellcastingrequirements`.`f6` AS `f6`,`chardev_cataclysm`.`spellcastingrequirements`.`f7` AS `f7` from `chardev_cataclysm`.`spellcastingrequirements` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcasttimes`
--

/*!50001 DROP TABLE IF EXISTS `spellcasttimes`*/;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcasttimes` AS select `chardev_cataclysm`.`spellcasttimes`.`ID` AS `ID`,`chardev_cataclysm`.`spellcasttimes`.`Time` AS `Time`,`chardev_cataclysm`.`spellcasttimes`.`f3` AS `f3`,`chardev_cataclysm`.`spellcasttimes`.`f4` AS `f4` from `chardev_cataclysm`.`spellcasttimes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategories`
--

/*!50001 DROP TABLE IF EXISTS `spellcategories`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategories` AS select `chardev_cataclysm`.`spellcategories`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategories`.`f2` AS `f2`,`chardev_cataclysm`.`spellcategories`.`f3` AS `f3`,`chardev_cataclysm`.`spellcategories`.`f4` AS `f4`,`chardev_cataclysm`.`spellcategories`.`f5` AS `f5`,`chardev_cataclysm`.`spellcategories`.`f6` AS `f6`,`chardev_cataclysm`.`spellcategories`.`f7` AS `f7` from `chardev_cataclysm`.`spellcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategory`
--

/*!50001 DROP TABLE IF EXISTS `spellcategory`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategory` AS select `chardev_cataclysm`.`spellcategory`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategory`.`f2` AS `f2` from `chardev_cataclysm`.`spellcategory` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellclassoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellclassoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellclassoptions` AS select `chardev_cataclysm`.`spellclassoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellclassoptions`.`f2` AS `f2`,`chardev_cataclysm`.`spellclassoptions`.`f3` AS `f3`,`chardev_cataclysm`.`spellclassoptions`.`f4` AS `f4`,`chardev_cataclysm`.`spellclassoptions`.`f5` AS `f5`,`chardev_cataclysm`.`spellclassoptions`.`SpellClassID` AS `SpellClassID`,`chardev_cataclysm`.`spellclassoptions`.`f7` AS `f7` from `chardev_cataclysm`.`spellclassoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcooldowns`
--

/*!50001 DROP TABLE IF EXISTS `spellcooldowns`*/;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcooldowns` AS select `chardev_cataclysm`.`spellcooldowns`.`ID` AS `ID`,`chardev_cataclysm`.`spellcooldowns`.`Spell` AS `Spell`,`chardev_cataclysm`.`spellcooldowns`.`Category` AS `Category`,`chardev_cataclysm`.`spellcooldowns`.`Global` AS `Global` from `chardev_cataclysm`.`spellcooldowns` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelldifficulty`
--

/*!50001 DROP TABLE IF EXISTS `spelldifficulty`*/;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelldifficulty` AS select `chardev_cataclysm`.`spelldifficulty`.`f1` AS `f1`,`chardev_cataclysm`.`spelldifficulty`.`f2` AS `f2`,`chardev_cataclysm`.`spelldifficulty`.`f3` AS `f3`,`chardev_cataclysm`.`spelldifficulty`.`f4` AS `f4`,`chardev_cataclysm`.`spelldifficulty`.`f5` AS `f5` from `chardev_cataclysm`.`spelldifficulty` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellduration`
--

/*!50001 DROP TABLE IF EXISTS `spellduration`*/;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellduration` AS select `chardev_cataclysm`.`spellduration`.`ID` AS `ID`,`chardev_cataclysm`.`spellduration`.`Duration` AS `Duration`,`chardev_cataclysm`.`spellduration`.`f3` AS `f3`,`chardev_cataclysm`.`spellduration`.`f4` AS `f4` from `chardev_cataclysm`.`spellduration` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelleffect`
--

/*!50001 DROP TABLE IF EXISTS `spelleffect`*/;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelleffect` AS select `chardev_cataclysm`.`spelleffect`.`ID` AS `ID`,`chardev_cataclysm`.`spelleffect`.`Aura` AS `Aura`,`chardev_cataclysm`.`spelleffect`.`ProcValue` AS `ProcValue`,`chardev_cataclysm`.`spelleffect`.`Effect` AS `Effect`,`chardev_cataclysm`.`spelleffect`.`Period` AS `Period`,`chardev_cataclysm`.`spelleffect`.`Value` AS `Value`,`chardev_cataclysm`.`spelleffect`.`Coefficient` AS `Coefficient`,`chardev_cataclysm`.`spelleffect`.`f8` AS `f8`,`chardev_cataclysm`.`spelleffect`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelleffect`.`Dice` AS `Dice`,`chardev_cataclysm`.`spelleffect`.`ItemID` AS `ItemID`,`chardev_cataclysm`.`spelleffect`.`f12` AS `f12`,`chardev_cataclysm`.`spelleffect`.`SecondaryEffect` AS `SecondaryEffect`,`chardev_cataclysm`.`spelleffect`.`UsedStat` AS `UsedStat`,`chardev_cataclysm`.`spelleffect`.`ProcChance` AS `ProcChance`,`chardev_cataclysm`.`spelleffect`.`SpellRadiusID` AS `SpellRadiusID`,`chardev_cataclysm`.`spelleffect`.`f17` AS `f17`,`chardev_cataclysm`.`spelleffect`.`LevelModifier` AS `LevelModifier`,`chardev_cataclysm`.`spelleffect`.`f19` AS `f19`,`chardev_cataclysm`.`spelleffect`.`f20` AS `f20`,`chardev_cataclysm`.`spelleffect`.`f21` AS `f21`,`chardev_cataclysm`.`spelleffect`.`f22` AS `f22`,`chardev_cataclysm`.`spelleffect`.`f23` AS `f23`,`chardev_cataclysm`.`spelleffect`.`f24` AS `f24`,`chardev_cataclysm`.`spelleffect`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`spelleffect`.`Index` AS `Index` from `chardev_cataclysm`.`spelleffect` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellequippeditems`
--

/*!50001 DROP TABLE IF EXISTS `spellequippeditems`*/;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellequippeditems` AS select `chardev_cataclysm`.`spellequippeditems`.`ID` AS `ID`,`chardev_cataclysm`.`spellequippeditems`.`ItemClassID` AS `ItemClassID`,`chardev_cataclysm`.`spellequippeditems`.`InventorySlotMask` AS `InventorySlotMask`,`chardev_cataclysm`.`spellequippeditems`.`ItemSubClassMask` AS `ItemSubClassMask` from `chardev_cataclysm`.`spellequippeditems` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyout`
--

/*!50001 DROP TABLE IF EXISTS `spellflyout`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyout` AS select `chardev_cataclysm`.`spellflyout`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyout`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyout`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyout`.`f4` AS `f4`,`chardev_cataclysm`.`spellflyout`.`f5` AS `f5`,`chardev_cataclysm`.`spellflyout`.`f6` AS `f6`,`chardev_cataclysm`.`spellflyout`.`f7` AS `f7` from `chardev_cataclysm`.`spellflyout` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyoutitem`
--

/*!50001 DROP TABLE IF EXISTS `spellflyoutitem`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyoutitem` AS select `chardev_cataclysm`.`spellflyoutitem`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyoutitem`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyoutitem`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyoutitem`.`f4` AS `f4` from `chardev_cataclysm`.`spellflyoutitem` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellfocusobject`
--

/*!50001 DROP TABLE IF EXISTS `spellfocusobject`*/;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellfocusobject` AS select `chardev_cataclysm`.`spellfocusobject`.`ID` AS `ID`,`chardev_cataclysm`.`spellfocusobject`.`f2` AS `f2` from `chardev_cataclysm`.`spellfocusobject` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellicon`
--

/*!50001 DROP TABLE IF EXISTS `spellicon`*/;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellicon` AS select `chardev_cataclysm`.`spellicon`.`ID` AS `ID`,`chardev_cataclysm`.`spellicon`.`Icon` AS `Icon` from `chardev_cataclysm`.`spellicon` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellinterrupts`
--

/*!50001 DROP TABLE IF EXISTS `spellinterrupts`*/;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellinterrupts` AS select `chardev_cataclysm`.`spellinterrupts`.`ID` AS `ID`,`chardev_cataclysm`.`spellinterrupts`.`f2` AS `f2`,`chardev_cataclysm`.`spellinterrupts`.`f3` AS `f3`,`chardev_cataclysm`.`spellinterrupts`.`f4` AS `f4`,`chardev_cataclysm`.`spellinterrupts`.`f5` AS `f5`,`chardev_cataclysm`.`spellinterrupts`.`f6` AS `f6` from `chardev_cataclysm`.`spellinterrupts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellitemenchantmentcondition`
--

/*!50001 DROP TABLE IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellitemenchantmentcondition` AS select `chardev_cataclysm`.`spellitemenchantmentcondition`.`ID` AS `ID`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color1` AS `Color1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color2` AS `Color2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color3` AS `Color3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color4` AS `Color4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color5` AS `Color5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f7` AS `f7`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f8` AS `f8`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f9` AS `f9`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f10` AS `f10`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f11` AS `f11`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_1` AS `f12_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_2` AS `f12_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_3` AS `f12_3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator1` AS `Comparator1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator2` AS `Comparator2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator3` AS `Comparator3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator4` AS `Comparator4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator5` AS `Comparator5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor1` AS `CompareColor1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor2` AS `CompareColor2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor3` AS `CompareColor3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor4` AS `CompareColor4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor5` AS `CompareColor5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_1` AS `f13_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_2` AS `f13_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value1` AS `Value1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value2` AS `Value2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value3` AS `Value3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value4` AS `Value4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value5` AS `Value5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f27` AS `f27`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f28` AS `f28`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f29` AS `f29`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f30` AS `f30`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f31` AS `f31` from `chardev_cataclysm`.`spellitemenchantmentcondition` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelllevels`
--

/*!50001 DROP TABLE IF EXISTS `spelllevels`*/;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelllevels` AS select `chardev_cataclysm`.`spelllevels`.`ID` AS `ID`,`chardev_cataclysm`.`spelllevels`.`f2` AS `f2`,`chardev_cataclysm`.`spelllevels`.`f3` AS `f3`,`chardev_cataclysm`.`spelllevels`.`f4` AS `f4` from `chardev_cataclysm`.`spelllevels` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmechanic`
--

/*!50001 DROP TABLE IF EXISTS `spellmechanic`*/;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmechanic` AS select `chardev_cataclysm`.`spellmechanic`.`ID` AS `ID`,`chardev_cataclysm`.`spellmechanic`.`f2` AS `f2` from `chardev_cataclysm`.`spellmechanic` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissile`
--

/*!50001 DROP TABLE IF EXISTS `spellmissile`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissile` AS select `chardev_cataclysm`.`spellmissile`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissile`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissile`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissile`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissile`.`f5` AS `f5`,`chardev_cataclysm`.`spellmissile`.`f6` AS `f6`,`chardev_cataclysm`.`spellmissile`.`f7` AS `f7`,`chardev_cataclysm`.`spellmissile`.`f8` AS `f8`,`chardev_cataclysm`.`spellmissile`.`f9` AS `f9`,`chardev_cataclysm`.`spellmissile`.`f10` AS `f10`,`chardev_cataclysm`.`spellmissile`.`f11` AS `f11`,`chardev_cataclysm`.`spellmissile`.`f12` AS `f12`,`chardev_cataclysm`.`spellmissile`.`f13` AS `f13`,`chardev_cataclysm`.`spellmissile`.`f14` AS `f14`,`chardev_cataclysm`.`spellmissile`.`f15` AS `f15` from `chardev_cataclysm`.`spellmissile` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissilemotion`
--

/*!50001 DROP TABLE IF EXISTS `spellmissilemotion`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissilemotion` AS select `chardev_cataclysm`.`spellmissilemotion`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissilemotion`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissilemotion`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissilemotion`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissilemotion`.`f5` AS `f5` from `chardev_cataclysm`.`spellmissilemotion` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellpower`
--

/*!50001 DROP TABLE IF EXISTS `spellpower`*/;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellpower` AS select `chardev_cataclysm`.`spellpower`.`ID` AS `ID`,`chardev_cataclysm`.`spellpower`.`Absolute` AS `Absolute`,`chardev_cataclysm`.`spellpower`.`f3` AS `f3`,`chardev_cataclysm`.`spellpower`.`Percent` AS `Percent`,`chardev_cataclysm`.`spellpower`.`f5` AS `f5`,`chardev_cataclysm`.`spellpower`.`f6` AS `f6`,`chardev_cataclysm`.`spellpower`.`f7` AS `f7` from `chardev_cataclysm`.`spellpower` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellradius`
--

/*!50001 DROP TABLE IF EXISTS `spellradius`*/;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellradius` AS select `chardev_cataclysm`.`spellradius`.`ID` AS `ID`,`chardev_cataclysm`.`spellradius`.`Radius` AS `Radius`,`chardev_cataclysm`.`spellradius`.`f3` AS `f3`,`chardev_cataclysm`.`spellradius`.`f4` AS `f4` from `chardev_cataclysm`.`spellradius` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellreagents`
--

/*!50001 DROP TABLE IF EXISTS `spellreagents`*/;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellreagents` AS select `chardev_cataclysm`.`spellreagents`.`ID` AS `ID`,`chardev_cataclysm`.`spellreagents`.`f2` AS `f2`,`chardev_cataclysm`.`spellreagents`.`f3` AS `f3`,`chardev_cataclysm`.`spellreagents`.`f4` AS `f4`,`chardev_cataclysm`.`spellreagents`.`f5` AS `f5`,`chardev_cataclysm`.`spellreagents`.`f6` AS `f6`,`chardev_cataclysm`.`spellreagents`.`f7` AS `f7`,`chardev_cataclysm`.`spellreagents`.`f8` AS `f8`,`chardev_cataclysm`.`spellreagents`.`f9` AS `f9`,`chardev_cataclysm`.`spellreagents`.`f10` AS `f10`,`chardev_cataclysm`.`spellreagents`.`f11` AS `f11`,`chardev_cataclysm`.`spellreagents`.`f12` AS `f12`,`chardev_cataclysm`.`spellreagents`.`f13` AS `f13`,`chardev_cataclysm`.`spellreagents`.`f14` AS `f14`,`chardev_cataclysm`.`spellreagents`.`f15` AS `f15`,`chardev_cataclysm`.`spellreagents`.`f16` AS `f16`,`chardev_cataclysm`.`spellreagents`.`f17` AS `f17` from `chardev_cataclysm`.`spellreagents` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellrunecost`
--

/*!50001 DROP TABLE IF EXISTS `spellrunecost`*/;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellrunecost` AS select `chardev_cataclysm`.`spellrunecost`.`ID` AS `ID`,`chardev_cataclysm`.`spellrunecost`.`f2` AS `f2`,`chardev_cataclysm`.`spellrunecost`.`f3` AS `f3`,`chardev_cataclysm`.`spellrunecost`.`f4` AS `f4`,`chardev_cataclysm`.`spellrunecost`.`f5` AS `f5` from `chardev_cataclysm`.`spellrunecost` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellscaling`
--

/*!50001 DROP TABLE IF EXISTS `spellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellscaling` AS select `chardev_cataclysm`.`spellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`spellscaling`.`CastTimeStart` AS `CastTimeStart`,`chardev_cataclysm`.`spellscaling`.`CastTimeEnd` AS `CastTimeEnd`,`chardev_cataclysm`.`spellscaling`.`Intervals` AS `Intervals`,`chardev_cataclysm`.`spellscaling`.`Distribution` AS `Distribution`,`chardev_cataclysm`.`spellscaling`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`spellscaling`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`spellscaling`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`spellscaling`.`Dice1` AS `Dice1`,`chardev_cataclysm`.`spellscaling`.`Dice2` AS `Dice2`,`chardev_cataclysm`.`spellscaling`.`Dice3` AS `Dice3`,`chardev_cataclysm`.`spellscaling`.`f12` AS `f12`,`chardev_cataclysm`.`spellscaling`.`f13` AS `f13`,`chardev_cataclysm`.`spellscaling`.`f14` AS `f14`,`chardev_cataclysm`.`spellscaling`.`f15` AS `f15`,`chardev_cataclysm`.`spellscaling`.`f16` AS `f16` from `chardev_cataclysm`.`spellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshift`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshift`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshift` AS select `chardev_cataclysm`.`spellshapeshift`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshift`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshift`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshift`.`SpellShapeshiftFormID` AS `SpellShapeshiftFormID`,`chardev_cataclysm`.`spellshapeshift`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshift`.`f6` AS `f6` from `chardev_cataclysm`.`spellshapeshift` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshiftform`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshiftform`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshiftform` AS select `chardev_cataclysm`.`spellshapeshiftform`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshiftform`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshiftform`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshiftform`.`f4` AS `f4`,`chardev_cataclysm`.`spellshapeshiftform`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshiftform`.`f6` AS `f6`,`chardev_cataclysm`.`spellshapeshiftform`.`f7` AS `f7`,`chardev_cataclysm`.`spellshapeshiftform`.`f8` AS `f8`,`chardev_cataclysm`.`spellshapeshiftform`.`f9` AS `f9`,`chardev_cataclysm`.`spellshapeshiftform`.`f10` AS `f10`,`chardev_cataclysm`.`spellshapeshiftform`.`f11` AS `f11`,`chardev_cataclysm`.`spellshapeshiftform`.`f12` AS `f12`,`chardev_cataclysm`.`spellshapeshiftform`.`f13` AS `f13`,`chardev_cataclysm`.`spellshapeshiftform`.`f14` AS `f14`,`chardev_cataclysm`.`spellshapeshiftform`.`f15` AS `f15`,`chardev_cataclysm`.`spellshapeshiftform`.`f16` AS `f16`,`chardev_cataclysm`.`spellshapeshiftform`.`f17` AS `f17`,`chardev_cataclysm`.`spellshapeshiftform`.`f18` AS `f18`,`chardev_cataclysm`.`spellshapeshiftform`.`f19` AS `f19`,`chardev_cataclysm`.`spellshapeshiftform`.`f20` AS `f20` from `chardev_cataclysm`.`spellshapeshiftform` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelltargetrestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spelltargetrestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelltargetrestrictions` AS select `chardev_cataclysm`.`spelltargetrestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spelltargetrestrictions`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelltargetrestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spelltargetrestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spelltargetrestrictions`.`f5` AS `f5` from `chardev_cataclysm`.`spelltargetrestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellvisual`
--

/*!50001 DROP TABLE IF EXISTS `spellvisual`*/;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellvisual` AS select `chardev_cataclysm`.`spellvisual`.`ID` AS `ID`,`chardev_cataclysm`.`spellvisual`.`f2` AS `f2`,`chardev_cataclysm`.`spellvisual`.`f3` AS `f3`,`chardev_cataclysm`.`spellvisual`.`f4` AS `f4`,`chardev_cataclysm`.`spellvisual`.`f5` AS `f5`,`chardev_cataclysm`.`spellvisual`.`f6` AS `f6`,`chardev_cataclysm`.`spellvisual`.`f7` AS `f7`,`chardev_cataclysm`.`spellvisual`.`f8` AS `f8`,`chardev_cataclysm`.`spellvisual`.`f9` AS `f9`,`chardev_cataclysm`.`spellvisual`.`f10` AS `f10`,`chardev_cataclysm`.`spellvisual`.`f11` AS `f11`,`chardev_cataclysm`.`spellvisual`.`f12` AS `f12`,`chardev_cataclysm`.`spellvisual`.`f13` AS `f13`,`chardev_cataclysm`.`spellvisual`.`f14` AS `f14`,`chardev_cataclysm`.`spellvisual`.`f15` AS `f15`,`chardev_cataclysm`.`spellvisual`.`f16` AS `f16`,`chardev_cataclysm`.`spellvisual`.`f17` AS `f17`,`chardev_cataclysm`.`spellvisual`.`f18` AS `f18`,`chardev_cataclysm`.`spellvisual`.`f19` AS `f19`,`chardev_cataclysm`.`spellvisual`.`f20` AS `f20`,`chardev_cataclysm`.`spellvisual`.`f21` AS `f21`,`chardev_cataclysm`.`spellvisual`.`f22` AS `f22`,`chardev_cataclysm`.`spellvisual`.`f23` AS `f23`,`chardev_cataclysm`.`spellvisual`.`f24` AS `f24`,`chardev_cataclysm`.`spellvisual`.`f25` AS `f25`,`chardev_cataclysm`.`spellvisual`.`f26` AS `f26`,`chardev_cataclysm`.`spellvisual`.`f27` AS `f27`,`chardev_cataclysm`.`spellvisual`.`f28` AS `f28`,`chardev_cataclysm`.`spellvisual`.`f29` AS `f29`,`chardev_cataclysm`.`spellvisual`.`f30` AS `f30`,`chardev_cataclysm`.`spellvisual`.`f31` AS `f31`,`chardev_cataclysm`.`spellvisual`.`f32` AS `f32` from `chardev_cataclysm`.`spellvisual` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talent`
--

/*!50001 DROP TABLE IF EXISTS `talent`*/;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talent` AS select `chardev_cataclysm`.`talent`.`ID` AS `ID`,`chardev_cataclysm`.`talent`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talent`.`Row` AS `Row`,`chardev_cataclysm`.`talent`.`Col` AS `Col`,`chardev_cataclysm`.`talent`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`talent`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`talent`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`talent`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`talent`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`talent`.`RequiredTalentID1` AS `RequiredTalentID1`,`chardev_cataclysm`.`talent`.`RequiredTalentID2` AS `RequiredTalentID2`,`chardev_cataclysm`.`talent`.`RequiredTalentID3` AS `RequiredTalentID3`,`chardev_cataclysm`.`talent`.`f13` AS `f13`,`chardev_cataclysm`.`talent`.`f14` AS `f14`,`chardev_cataclysm`.`talent`.`f15` AS `f15`,`chardev_cataclysm`.`talent`.`f16` AS `f16`,`chardev_cataclysm`.`talent`.`f17` AS `f17`,`chardev_cataclysm`.`talent`.`PetMask0` AS `PetMask0`,`chardev_cataclysm`.`talent`.`PetMask1` AS `PetMask1` from `chardev_cataclysm`.`talent` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talenttreeprimaryspells`
--

/*!50001 DROP TABLE IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talenttreeprimaryspells` AS select `chardev_cataclysm`.`talenttreeprimaryspells`.`ID` AS `ID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`f4` AS `f4` from `chardev_cataclysm`.`talenttreeprimaryspells` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Current Database: `chardev_cataclysm_ru`
--

USE `chardev_cataclysm_ru`;

--
-- Final view structure for view `gemproperties`
--

/*!50001 DROP TABLE IF EXISTS `gemproperties`*/;
/*!50001 DROP VIEW IF EXISTS `gemproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gemproperties` AS select `chardev_cataclysm`.`gemproperties`.`ID` AS `ID`,`chardev_cataclysm`.`gemproperties`.`SpellItemEnchantmentID` AS `SpellItemEnchantmentID`,`chardev_cataclysm`.`gemproperties`.`f3` AS `f3`,`chardev_cataclysm`.`gemproperties`.`f4` AS `f4`,`chardev_cataclysm`.`gemproperties`.`f5` AS `f5`,`chardev_cataclysm`.`gemproperties`.`MinItemLevel` AS `MinItemLevel` from `chardev_cataclysm`.`gemproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `glyphproperties`
--

/*!50001 DROP TABLE IF EXISTS `glyphproperties`*/;
/*!50001 DROP VIEW IF EXISTS `glyphproperties`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `glyphproperties` AS select `chardev_cataclysm`.`glyphproperties`.`ID` AS `ID`,`chardev_cataclysm`.`glyphproperties`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`glyphproperties`.`Type` AS `Type`,`chardev_cataclysm`.`glyphproperties`.`f4` AS `f4` from `chardev_cataclysm`.`glyphproperties` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecrit` AS select `chardev_cataclysm`.`gtchancetomeleecrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetomeleecritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetomeleecritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetomeleecritbase` AS select `chardev_cataclysm`.`gtchancetomeleecritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetomeleecritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetomeleecritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcrit`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcrit`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcrit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcrit` AS select `chardev_cataclysm`.`gtchancetospellcrit`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcrit`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcrit` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtchancetospellcritbase`
--

/*!50001 DROP TABLE IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 DROP VIEW IF EXISTS `gtchancetospellcritbase`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtchancetospellcritbase` AS select `chardev_cataclysm`.`gtchancetospellcritbase`.`ID` AS `ID`,`chardev_cataclysm`.`gtchancetospellcritbase`.`Chance` AS `Chance` from `chardev_cataclysm`.`gtchancetospellcritbase` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtcombatratings`
--

/*!50001 DROP TABLE IF EXISTS `gtcombatratings`*/;
/*!50001 DROP VIEW IF EXISTS `gtcombatratings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtcombatratings` AS select `chardev_cataclysm`.`gtcombatratings`.`ID` AS `ID`,`chardev_cataclysm`.`gtcombatratings`.`Value` AS `Value` from `chardev_cataclysm`.`gtcombatratings` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenhp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenhp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenhp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenhp` AS select `chardev_cataclysm`.`gtoctregenhp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenhp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenhp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtoctregenmp`
--

/*!50001 DROP TABLE IF EXISTS `gtoctregenmp`*/;
/*!50001 DROP VIEW IF EXISTS `gtoctregenmp`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtoctregenmp` AS select `chardev_cataclysm`.`gtoctregenmp`.`ID` AS `ID`,`chardev_cataclysm`.`gtoctregenmp`.`Value` AS `Value` from `chardev_cataclysm`.`gtoctregenmp` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenhpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenhpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenhpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenhpperspt` AS select `chardev_cataclysm`.`gtregenhpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenhpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenhpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtregenmpperspt`
--

/*!50001 DROP TABLE IF EXISTS `gtregenmpperspt`*/;
/*!50001 DROP VIEW IF EXISTS `gtregenmpperspt`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtregenmpperspt` AS select `chardev_cataclysm`.`gtregenmpperspt`.`ID` AS `ID`,`chardev_cataclysm`.`gtregenmpperspt`.`Value` AS `Value` from `chardev_cataclysm`.`gtregenmpperspt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `gtspellscaling`
--

/*!50001 DROP TABLE IF EXISTS `gtspellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `gtspellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gtspellscaling` AS select `chardev_cataclysm`.`gtspellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`gtspellscaling`.`Value` AS `Value` from `chardev_cataclysm`.`gtspellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item`
--

/*!50001 DROP TABLE IF EXISTS `item`*/;
/*!50001 DROP VIEW IF EXISTS `item`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=MERGE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item` AS select `chardev_cataclysm`.`item`.`ID` AS `ID`,`chardev_cataclysm`.`item`.`ItemClass` AS `ItemClass`,`chardev_cataclysm`.`item`.`ItemSubClass` AS `ItemSubClass`,`chardev_cataclysm`.`item`.`f4` AS `f4`,`chardev_cataclysm`.`item`.`f5` AS `f5`,`chardev_cataclysm`.`item`.`ItemDisplayInfoID` AS `ItemDisplayInfoID`,`chardev_cataclysm`.`item`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item`.`f8` AS `f8` from `chardev_cataclysm`.`item` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `item_sparse`
--

/*!50001 DROP TABLE IF EXISTS `item_sparse`*/;
/*!50001 DROP VIEW IF EXISTS `item_sparse`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `item_sparse` AS select `chardev_cataclysm`.`item_sparse`.`ID` AS `ID`,`chardev_cataclysm`.`item_sparse`.`Quality` AS `Quality`,`chardev_cataclysm`.`item_sparse`.`TypeMask` AS `TypeMask`,`chardev_cataclysm`.`item_sparse`.`TypeMask2` AS `TypeMask2`,`chardev_cataclysm`.`item_sparse`.`TypeMask3` AS `TypeMask3`,`chardev_cataclysm`.`item_sparse`.`TypeMask4` AS `TypeMask4`,`chardev_cataclysm`.`item_sparse`.`TypeMask5` AS `TypeMask5`,`chardev_cataclysm`.`item_sparse`.`BuyPrice` AS `BuyPrice`,`chardev_cataclysm`.`item_sparse`.`SellPrice` AS `SellPrice`,`chardev_cataclysm`.`item_sparse`.`InventorySlot` AS `InventorySlot`,`chardev_cataclysm`.`item_sparse`.`ChrClassMask` AS `ChrClassMask`,`chardev_cataclysm`.`item_sparse`.`ChrRaceMask` AS `ChrRaceMask`,`chardev_cataclysm`.`item_sparse`.`Level` AS `Level`,`chardev_cataclysm`.`item_sparse`.`RequiredCharacterLevel` AS `RequiredCharacterLevel`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineID` AS `RequiredSkillLineID`,`chardev_cataclysm`.`item_sparse`.`RequiredSkillLineLevel` AS `RequiredSkillLineLevel`,`chardev_cataclysm`.`item_sparse`.`f14` AS `f14`,`chardev_cataclysm`.`item_sparse`.`f15` AS `f15`,`chardev_cataclysm`.`item_sparse`.`f16` AS `f16`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionID` AS `RequiredFactionID`,`chardev_cataclysm`.`item_sparse`.`RequiredFactionReputation` AS `RequiredFactionReputation`,`chardev_cataclysm`.`item_sparse`.`Unique` AS `Unique`,`chardev_cataclysm`.`item_sparse`.`MaximumStackSize` AS `MaximumStackSize`,`chardev_cataclysm`.`item_sparse`.`f21` AS `f21`,`chardev_cataclysm`.`item_sparse`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`item_sparse`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`item_sparse`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`item_sparse`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`item_sparse`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`item_sparse`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`item_sparse`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`item_sparse`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`item_sparse`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`item_sparse`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`item_sparse`.`StatValue1` AS `StatValue1`,`chardev_cataclysm`.`item_sparse`.`StatValue2` AS `StatValue2`,`chardev_cataclysm`.`item_sparse`.`StatValue3` AS `StatValue3`,`chardev_cataclysm`.`item_sparse`.`StatValue4` AS `StatValue4`,`chardev_cataclysm`.`item_sparse`.`StatValue5` AS `StatValue5`,`chardev_cataclysm`.`item_sparse`.`StatValue6` AS `StatValue6`,`chardev_cataclysm`.`item_sparse`.`StatValue7` AS `StatValue7`,`chardev_cataclysm`.`item_sparse`.`StatValue8` AS `StatValue8`,`chardev_cataclysm`.`item_sparse`.`StatValue9` AS `StatValue9`,`chardev_cataclysm`.`item_sparse`.`StatValue10` AS `StatValue10`,`chardev_cataclysm`.`item_sparse`.`f42` AS `f42`,`chardev_cataclysm`.`item_sparse`.`f43` AS `f43`,`chardev_cataclysm`.`item_sparse`.`f44` AS `f44`,`chardev_cataclysm`.`item_sparse`.`f45` AS `f45`,`chardev_cataclysm`.`item_sparse`.`f46` AS `f46`,`chardev_cataclysm`.`item_sparse`.`f47` AS `f47`,`chardev_cataclysm`.`item_sparse`.`f48` AS `f48`,`chardev_cataclysm`.`item_sparse`.`f49` AS `f49`,`chardev_cataclysm`.`item_sparse`.`f50` AS `f50`,`chardev_cataclysm`.`item_sparse`.`f51` AS `f51`,`chardev_cataclysm`.`item_sparse`.`f52` AS `f52`,`chardev_cataclysm`.`item_sparse`.`f53` AS `f53`,`chardev_cataclysm`.`item_sparse`.`f54` AS `f54`,`chardev_cataclysm`.`item_sparse`.`f55` AS `f55`,`chardev_cataclysm`.`item_sparse`.`f56` AS `f56`,`chardev_cataclysm`.`item_sparse`.`f57` AS `f57`,`chardev_cataclysm`.`item_sparse`.`f58` AS `f58`,`chardev_cataclysm`.`item_sparse`.`f59` AS `f59`,`chardev_cataclysm`.`item_sparse`.`f60` AS `f60`,`chardev_cataclysm`.`item_sparse`.`f61` AS `f61`,`chardev_cataclysm`.`item_sparse`.`ScalingStatDistributionID` AS `ScalingStatDistributionID`,`chardev_cataclysm`.`item_sparse`.`f63` AS `f63`,`chardev_cataclysm`.`item_sparse`.`Delay` AS `Delay`,`chardev_cataclysm`.`item_sparse`.`f65` AS `f65`,`chardev_cataclysm`.`item_sparse`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`item_sparse`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`item_sparse`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`item_sparse`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`item_sparse`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger1` AS `SpellTrigger1`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger2` AS `SpellTrigger2`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger3` AS `SpellTrigger3`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger4` AS `SpellTrigger4`,`chardev_cataclysm`.`item_sparse`.`SpellTrigger5` AS `SpellTrigger5`,`chardev_cataclysm`.`item_sparse`.`SpellCharges1` AS `SpellCharges1`,`chardev_cataclysm`.`item_sparse`.`SpellCharges2` AS `SpellCharges2`,`chardev_cataclysm`.`item_sparse`.`SpellCharges3` AS `SpellCharges3`,`chardev_cataclysm`.`item_sparse`.`SpellCharges4` AS `SpellCharges4`,`chardev_cataclysm`.`item_sparse`.`SpellCharges5` AS `SpellCharges5`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown1` AS `SpellCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown2` AS `SpellCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown3` AS `SpellCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown4` AS `SpellCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCooldown5` AS `SpellCooldown5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID1` AS `SpellCategoryID1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID2` AS `SpellCategoryID2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID3` AS `SpellCategoryID3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID4` AS `SpellCategoryID4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryID5` AS `SpellCategoryID5`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown1` AS `SpellCategoryCooldown1`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown2` AS `SpellCategoryCooldown2`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown3` AS `SpellCategoryCooldown3`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown4` AS `SpellCategoryCooldown4`,`chardev_cataclysm`.`item_sparse`.`SpellCategoryCooldown5` AS `SpellCategoryCooldown5`,`chardev_cataclysm`.`item_sparse`.`Binds` AS `Binds`,`chardev_cataclysm`.`item_sparse`.`Name` AS `Name`,`chardev_cataclysm`.`item_sparse`.`f98` AS `f98`,`chardev_cataclysm`.`item_sparse`.`f99` AS `f99`,`chardev_cataclysm`.`item_sparse`.`f100` AS `f100`,`chardev_cataclysm`.`item_sparse`.`Description` AS `Description`,`chardev_cataclysm`.`item_sparse`.`QuestID` AS `QuestID`,`chardev_cataclysm`.`item_sparse`.`f103` AS `f103`,`chardev_cataclysm`.`item_sparse`.`f104` AS `f104`,`chardev_cataclysm`.`item_sparse`.`f105` AS `f105`,`chardev_cataclysm`.`item_sparse`.`f106` AS `f106`,`chardev_cataclysm`.`item_sparse`.`f107` AS `f107`,`chardev_cataclysm`.`item_sparse`.`f108` AS `f108`,`chardev_cataclysm`.`item_sparse`.`RandomPropertiesID` AS `RandomPropertiesID`,`chardev_cataclysm`.`item_sparse`.`RandomSuffixID` AS `RandomSuffixID`,`chardev_cataclysm`.`item_sparse`.`ItemSetID` AS `ItemSetID`,`chardev_cataclysm`.`item_sparse`.`f113` AS `f113`,`chardev_cataclysm`.`item_sparse`.`f114` AS `f114`,`chardev_cataclysm`.`item_sparse`.`f115` AS `f115`,`chardev_cataclysm`.`item_sparse`.`f116` AS `f116`,`chardev_cataclysm`.`item_sparse`.`SocketColor1` AS `SocketColor1`,`chardev_cataclysm`.`item_sparse`.`SocketColor2` AS `SocketColor2`,`chardev_cataclysm`.`item_sparse`.`SocketColor3` AS `SocketColor3`,`chardev_cataclysm`.`item_sparse`.`f120` AS `f120`,`chardev_cataclysm`.`item_sparse`.`f121` AS `f121`,`chardev_cataclysm`.`item_sparse`.`f122` AS `f122`,`chardev_cataclysm`.`item_sparse`.`SocketBonusID` AS `SocketBonusID`,`chardev_cataclysm`.`item_sparse`.`GemPropertiesID` AS `GemPropertiesID`,`chardev_cataclysm`.`item_sparse`.`f125` AS `f125`,`chardev_cataclysm`.`item_sparse`.`f126` AS `f126`,`chardev_cataclysm`.`item_sparse`.`LimitCategory` AS `LimitCategory`,`chardev_cataclysm`.`item_sparse`.`f128` AS `f128`,`chardev_cataclysm`.`item_sparse`.`DamageRange` AS `DamageRange`,`chardev_cataclysm`.`item_sparse`.`LimitCategoryMultiple` AS `LimitCategoryMultiple`,`chardev_cataclysm`.`item_sparse`.`f131` AS `f131`,`chardev_cataclysm`.`item_sparse`.`Version` AS `Version`,`chardev_cataclysm`.`item_sparse`.`Locale` AS `Locale` from `chardev_cataclysm`.`item_sparse` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorquality`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorquality`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorquality`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorquality` AS select `chardev_cataclysm`.`itemarmorquality`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorquality`.`0` AS `0`,`chardev_cataclysm`.`itemarmorquality`.`1` AS `1`,`chardev_cataclysm`.`itemarmorquality`.`2` AS `2`,`chardev_cataclysm`.`itemarmorquality`.`3` AS `3`,`chardev_cataclysm`.`itemarmorquality`.`4` AS `4`,`chardev_cataclysm`.`itemarmorquality`.`5` AS `5`,`chardev_cataclysm`.`itemarmorquality`.`6` AS `6`,`chardev_cataclysm`.`itemarmorquality`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemarmorquality` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmorshield`
--

/*!50001 DROP TABLE IF EXISTS `itemarmorshield`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmorshield`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmorshield` AS select `chardev_cataclysm`.`itemarmorshield`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmorshield`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmorshield`.`0` AS `0`,`chardev_cataclysm`.`itemarmorshield`.`1` AS `1`,`chardev_cataclysm`.`itemarmorshield`.`2` AS `2`,`chardev_cataclysm`.`itemarmorshield`.`3` AS `3`,`chardev_cataclysm`.`itemarmorshield`.`4` AS `4`,`chardev_cataclysm`.`itemarmorshield`.`5` AS `5`,`chardev_cataclysm`.`itemarmorshield`.`6` AS `6` from `chardev_cataclysm`.`itemarmorshield` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemarmortotal`
--

/*!50001 DROP TABLE IF EXISTS `itemarmortotal`*/;
/*!50001 DROP VIEW IF EXISTS `itemarmortotal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemarmortotal` AS select `chardev_cataclysm`.`itemarmortotal`.`ID` AS `ID`,`chardev_cataclysm`.`itemarmortotal`.`ItemLevel` AS `ItemLevel`,`chardev_cataclysm`.`itemarmortotal`.`1` AS `1`,`chardev_cataclysm`.`itemarmortotal`.`2` AS `2`,`chardev_cataclysm`.`itemarmortotal`.`3` AS `3`,`chardev_cataclysm`.`itemarmortotal`.`4` AS `4` from `chardev_cataclysm`.`itemarmortotal` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehand` AS select `chardev_cataclysm`.`itemdamageonehand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehand`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehand`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehand`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehand`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehand`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehand`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehand`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageonehandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageonehandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageonehandcaster` AS select `chardev_cataclysm`.`itemdamageonehandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageonehandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamageonehandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamageonehandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamageonehandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamageonehandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamageonehandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamageonehandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamageonehandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageonehandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamageranged`
--

/*!50001 DROP TABLE IF EXISTS `itemdamageranged`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamageranged`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamageranged` AS select `chardev_cataclysm`.`itemdamageranged`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamageranged`.`0` AS `0`,`chardev_cataclysm`.`itemdamageranged`.`1` AS `1`,`chardev_cataclysm`.`itemdamageranged`.`2` AS `2`,`chardev_cataclysm`.`itemdamageranged`.`3` AS `3`,`chardev_cataclysm`.`itemdamageranged`.`4` AS `4`,`chardev_cataclysm`.`itemdamageranged`.`5` AS `5`,`chardev_cataclysm`.`itemdamageranged`.`6` AS `6`,`chardev_cataclysm`.`itemdamageranged`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamageranged` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagethrown`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagethrown`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagethrown`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagethrown` AS select `chardev_cataclysm`.`itemdamagethrown`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagethrown`.`0` AS `0`,`chardev_cataclysm`.`itemdamagethrown`.`1` AS `1`,`chardev_cataclysm`.`itemdamagethrown`.`2` AS `2`,`chardev_cataclysm`.`itemdamagethrown`.`3` AS `3`,`chardev_cataclysm`.`itemdamagethrown`.`4` AS `4`,`chardev_cataclysm`.`itemdamagethrown`.`5` AS `5`,`chardev_cataclysm`.`itemdamagethrown`.`6` AS `6`,`chardev_cataclysm`.`itemdamagethrown`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagethrown` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohand` AS select `chardev_cataclysm`.`itemdamagetwohand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagetwohandcaster`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagetwohandcaster`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagetwohandcaster` AS select `chardev_cataclysm`.`itemdamagetwohandcaster`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`0` AS `0`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`1` AS `1`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`2` AS `2`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`3` AS `3`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`4` AS `4`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`5` AS `5`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`6` AS `6`,`chardev_cataclysm`.`itemdamagetwohandcaster`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagetwohandcaster` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdamagewand`
--

/*!50001 DROP TABLE IF EXISTS `itemdamagewand`*/;
/*!50001 DROP VIEW IF EXISTS `itemdamagewand`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdamagewand` AS select `chardev_cataclysm`.`itemdamagewand`.`ID` AS `ID`,`chardev_cataclysm`.`itemdamagewand`.`0` AS `0`,`chardev_cataclysm`.`itemdamagewand`.`1` AS `1`,`chardev_cataclysm`.`itemdamagewand`.`2` AS `2`,`chardev_cataclysm`.`itemdamagewand`.`3` AS `3`,`chardev_cataclysm`.`itemdamagewand`.`4` AS `4`,`chardev_cataclysm`.`itemdamagewand`.`5` AS `5`,`chardev_cataclysm`.`itemdamagewand`.`6` AS `6`,`chardev_cataclysm`.`itemdamagewand`.`ItemLevel` AS `ItemLevel` from `chardev_cataclysm`.`itemdamagewand` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemdisplayinfo`
--

/*!50001 DROP TABLE IF EXISTS `itemdisplayinfo`*/;
/*!50001 DROP VIEW IF EXISTS `itemdisplayinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemdisplayinfo` AS select `chardev_cataclysm`.`itemdisplayinfo`.`ID` AS `ID`,`chardev_cataclysm`.`itemdisplayinfo`.`f2` AS `f2`,`chardev_cataclysm`.`itemdisplayinfo`.`f3` AS `f3`,`chardev_cataclysm`.`itemdisplayinfo`.`f4` AS `f4`,`chardev_cataclysm`.`itemdisplayinfo`.`f5` AS `f5`,`chardev_cataclysm`.`itemdisplayinfo`.`Icon` AS `Icon`,`chardev_cataclysm`.`itemdisplayinfo`.`f7` AS `f7`,`chardev_cataclysm`.`itemdisplayinfo`.`f8` AS `f8`,`chardev_cataclysm`.`itemdisplayinfo`.`f9` AS `f9`,`chardev_cataclysm`.`itemdisplayinfo`.`f10` AS `f10`,`chardev_cataclysm`.`itemdisplayinfo`.`f11` AS `f11`,`chardev_cataclysm`.`itemdisplayinfo`.`f12` AS `f12`,`chardev_cataclysm`.`itemdisplayinfo`.`f13` AS `f13`,`chardev_cataclysm`.`itemdisplayinfo`.`f14` AS `f14`,`chardev_cataclysm`.`itemdisplayinfo`.`f15` AS `f15`,`chardev_cataclysm`.`itemdisplayinfo`.`f16` AS `f16`,`chardev_cataclysm`.`itemdisplayinfo`.`f17` AS `f17`,`chardev_cataclysm`.`itemdisplayinfo`.`f18` AS `f18`,`chardev_cataclysm`.`itemdisplayinfo`.`f19` AS `f19`,`chardev_cataclysm`.`itemdisplayinfo`.`f20` AS `f20`,`chardev_cataclysm`.`itemdisplayinfo`.`f21` AS `f21`,`chardev_cataclysm`.`itemdisplayinfo`.`f22` AS `f22`,`chardev_cataclysm`.`itemdisplayinfo`.`f23` AS `f23`,`chardev_cataclysm`.`itemdisplayinfo`.`f24` AS `f24`,`chardev_cataclysm`.`itemdisplayinfo`.`f25` AS `f25` from `chardev_cataclysm`.`itemdisplayinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itemreforge`
--

/*!50001 DROP TABLE IF EXISTS `itemreforge`*/;
/*!50001 DROP VIEW IF EXISTS `itemreforge`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itemreforge` AS select `chardev_cataclysm`.`itemreforge`.`ID` AS `ID`,`chardev_cataclysm`.`itemreforge`.`f2` AS `f2`,`chardev_cataclysm`.`itemreforge`.`f3` AS `f3`,`chardev_cataclysm`.`itemreforge`.`f4` AS `f4`,`chardev_cataclysm`.`itemreforge`.`f5` AS `f5` from `chardev_cataclysm`.`itemreforge` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `randproppoints`
--

/*!50001 DROP TABLE IF EXISTS `randproppoints`*/;
/*!50001 DROP VIEW IF EXISTS `randproppoints`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `randproppoints` AS select `chardev_cataclysm`.`randproppoints`.`ID` AS `ID`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group0` AS `PointsQuality4Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group1` AS `PointsQuality4Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group2` AS `PointsQuality4Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group3` AS `PointsQuality4Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality4Group4` AS `PointsQuality4Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group0` AS `PointsQuality3Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group1` AS `PointsQuality3Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group2` AS `PointsQuality3Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group3` AS `PointsQuality3Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality3Group4` AS `PointsQuality3Group4`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group0` AS `PointsQuality2Group0`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group1` AS `PointsQuality2Group1`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group2` AS `PointsQuality2Group2`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group3` AS `PointsQuality2Group3`,`chardev_cataclysm`.`randproppoints`.`PointsQuality2Group4` AS `PointsQuality2Group4` from `chardev_cataclysm`.`randproppoints` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatdistribution`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatdistribution`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatdistribution`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatdistribution` AS select `chardev_cataclysm`.`scalingstatdistribution`.`id` AS `id`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat1` AS `Stat1`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat2` AS `Stat2`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat3` AS `Stat3`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat4` AS `Stat4`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat5` AS `Stat5`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat6` AS `Stat6`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat7` AS `Stat7`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat8` AS `Stat8`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat9` AS `Stat9`,`chardev_cataclysm`.`scalingstatdistribution`.`Stat10` AS `Stat10`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient4` AS `Coefficient4`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient5` AS `Coefficient5`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient6` AS `Coefficient6`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient7` AS `Coefficient7`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient8` AS `Coefficient8`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient9` AS `Coefficient9`,`chardev_cataclysm`.`scalingstatdistribution`.`Coefficient10` AS `Coefficient10`,`chardev_cataclysm`.`scalingstatdistribution`.`MinLevel` AS `MinLevel`,`chardev_cataclysm`.`scalingstatdistribution`.`MaxLevel` AS `MaxLevel` from `chardev_cataclysm`.`scalingstatdistribution` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `scalingstatvalues`
--

/*!50001 DROP TABLE IF EXISTS `scalingstatvalues`*/;
/*!50001 DROP VIEW IF EXISTS `scalingstatvalues`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `scalingstatvalues` AS select `chardev_cataclysm`.`scalingstatvalues`.`id` AS `id`,`chardev_cataclysm`.`scalingstatvalues`.`level` AS `level`,`chardev_cataclysm`.`scalingstatvalues`.`dist0` AS `dist0`,`chardev_cataclysm`.`scalingstatvalues`.`dist1` AS `dist1`,`chardev_cataclysm`.`scalingstatvalues`.`dist2` AS `dist2`,`chardev_cataclysm`.`scalingstatvalues`.`dist3` AS `dist3`,`chardev_cataclysm`.`scalingstatvalues`.`dist4` AS `dist4`,`chardev_cataclysm`.`scalingstatvalues`.`dist5` AS `dist5`,`chardev_cataclysm`.`scalingstatvalues`.`dist6` AS `dist6`,`chardev_cataclysm`.`scalingstatvalues`.`dist7` AS `dist7`,`chardev_cataclysm`.`scalingstatvalues`.`dist8` AS `dist8`,`chardev_cataclysm`.`scalingstatvalues`.`dist9` AS `dist9`,`chardev_cataclysm`.`scalingstatvalues`.`dist10` AS `dist10`,`chardev_cataclysm`.`scalingstatvalues`.`dist11` AS `dist11`,`chardev_cataclysm`.`scalingstatvalues`.`dist12` AS `dist12`,`chardev_cataclysm`.`scalingstatvalues`.`dist13` AS `dist13`,`chardev_cataclysm`.`scalingstatvalues`.`dist14` AS `dist14`,`chardev_cataclysm`.`scalingstatvalues`.`dist15` AS `dist15`,`chardev_cataclysm`.`scalingstatvalues`.`dist16` AS `dist16`,`chardev_cataclysm`.`scalingstatvalues`.`dist17` AS `dist17`,`chardev_cataclysm`.`scalingstatvalues`.`dist18` AS `dist18`,`chardev_cataclysm`.`scalingstatvalues`.`dist19` AS `dist19`,`chardev_cataclysm`.`scalingstatvalues`.`dist20` AS `dist20`,`chardev_cataclysm`.`scalingstatvalues`.`dist21` AS `dist21`,`chardev_cataclysm`.`scalingstatvalues`.`dist22` AS `dist22`,`chardev_cataclysm`.`scalingstatvalues`.`dist23` AS `dist23`,`chardev_cataclysm`.`scalingstatvalues`.`dist24` AS `dist24`,`chardev_cataclysm`.`scalingstatvalues`.`dist25` AS `dist25`,`chardev_cataclysm`.`scalingstatvalues`.`dist26` AS `dist26`,`chardev_cataclysm`.`scalingstatvalues`.`dist27` AS `dist27`,`chardev_cataclysm`.`scalingstatvalues`.`dist28` AS `dist28`,`chardev_cataclysm`.`scalingstatvalues`.`dist29` AS `dist29`,`chardev_cataclysm`.`scalingstatvalues`.`dist30` AS `dist30`,`chardev_cataclysm`.`scalingstatvalues`.`dist31` AS `dist31`,`chardev_cataclysm`.`scalingstatvalues`.`dist32` AS `dist32`,`chardev_cataclysm`.`scalingstatvalues`.`dist33` AS `dist33`,`chardev_cataclysm`.`scalingstatvalues`.`dist34` AS `dist34`,`chardev_cataclysm`.`scalingstatvalues`.`dist35` AS `dist35`,`chardev_cataclysm`.`scalingstatvalues`.`dist36` AS `dist36`,`chardev_cataclysm`.`scalingstatvalues`.`dist37` AS `dist37`,`chardev_cataclysm`.`scalingstatvalues`.`dist38` AS `dist38`,`chardev_cataclysm`.`scalingstatvalues`.`dist39` AS `dist39`,`chardev_cataclysm`.`scalingstatvalues`.`dist40` AS `dist40`,`chardev_cataclysm`.`scalingstatvalues`.`dist41` AS `dist41`,`chardev_cataclysm`.`scalingstatvalues`.`dist42` AS `dist42`,`chardev_cataclysm`.`scalingstatvalues`.`dist43` AS `dist43`,`chardev_cataclysm`.`scalingstatvalues`.`dist44` AS `dist44` from `chardev_cataclysm`.`scalingstatvalues` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skilllineability`
--

/*!50001 DROP TABLE IF EXISTS `skilllineability`*/;
/*!50001 DROP VIEW IF EXISTS `skilllineability`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skilllineability` AS select `chardev_cataclysm`.`skilllineability`.`ID` AS `ID`,`chardev_cataclysm`.`skilllineability`.`SkillLineID` AS `SkillLineID`,`chardev_cataclysm`.`skilllineability`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`skilllineability`.`RaceMask` AS `RaceMask`,`chardev_cataclysm`.`skilllineability`.`ClassMask` AS `ClassMask`,`chardev_cataclysm`.`skilllineability`.`f6` AS `f6`,`chardev_cataclysm`.`skilllineability`.`f7` AS `f7`,`chardev_cataclysm`.`skilllineability`.`RequiredSkill` AS `RequiredSkill`,`chardev_cataclysm`.`skilllineability`.`ReplaceSpellID` AS `ReplaceSpellID`,`chardev_cataclysm`.`skilllineability`.`f10` AS `f10`,`chardev_cataclysm`.`skilllineability`.`Grey` AS `Grey`,`chardev_cataclysm`.`skilllineability`.`Yellow` AS `Yellow`,`chardev_cataclysm`.`skilllineability`.`f13` AS `f13`,`chardev_cataclysm`.`skilllineability`.`f14` AS `f14` from `chardev_cataclysm`.`skilllineability` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `skillraceclassinfo`
--

/*!50001 DROP TABLE IF EXISTS `skillraceclassinfo`*/;
/*!50001 DROP VIEW IF EXISTS `skillraceclassinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `skillraceclassinfo` AS select `chardev_cataclysm`.`skillraceclassinfo`.`ID` AS `ID`,`chardev_cataclysm`.`skillraceclassinfo`.`f2` AS `f2`,`chardev_cataclysm`.`skillraceclassinfo`.`f3` AS `f3`,`chardev_cataclysm`.`skillraceclassinfo`.`f4` AS `f4`,`chardev_cataclysm`.`skillraceclassinfo`.`f5` AS `f5`,`chardev_cataclysm`.`skillraceclassinfo`.`f6` AS `f6`,`chardev_cataclysm`.`skillraceclassinfo`.`f7` AS `f7`,`chardev_cataclysm`.`skillraceclassinfo`.`f8` AS `f8`,`chardev_cataclysm`.`skillraceclassinfo`.`f9` AS `f9` from `chardev_cataclysm`.`skillraceclassinfo` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellauraoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellauraoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellauraoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellauraoptions` AS select `chardev_cataclysm`.`spellauraoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellauraoptions`.`Stacks` AS `Stacks`,`chardev_cataclysm`.`spellauraoptions`.`ProcRate` AS `ProcRate`,`chardev_cataclysm`.`spellauraoptions`.`ProcCharges` AS `ProcCharges`,`chardev_cataclysm`.`spellauraoptions`.`f5` AS `f5` from `chardev_cataclysm`.`spellauraoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellaurarestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spellaurarestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spellaurarestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellaurarestrictions` AS select `chardev_cataclysm`.`spellaurarestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spellaurarestrictions`.`f2` AS `f2`,`chardev_cataclysm`.`spellaurarestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spellaurarestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spellaurarestrictions`.`f5` AS `f5`,`chardev_cataclysm`.`spellaurarestrictions`.`f6` AS `f6`,`chardev_cataclysm`.`spellaurarestrictions`.`f7` AS `f7`,`chardev_cataclysm`.`spellaurarestrictions`.`f8` AS `f8`,`chardev_cataclysm`.`spellaurarestrictions`.`f9` AS `f9` from `chardev_cataclysm`.`spellaurarestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcastingrequirements`
--

/*!50001 DROP TABLE IF EXISTS `spellcastingrequirements`*/;
/*!50001 DROP VIEW IF EXISTS `spellcastingrequirements`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcastingrequirements` AS select `chardev_cataclysm`.`spellcastingrequirements`.`ID` AS `ID`,`chardev_cataclysm`.`spellcastingrequirements`.`f2` AS `f2`,`chardev_cataclysm`.`spellcastingrequirements`.`f3` AS `f3`,`chardev_cataclysm`.`spellcastingrequirements`.`f4` AS `f4`,`chardev_cataclysm`.`spellcastingrequirements`.`f5` AS `f5`,`chardev_cataclysm`.`spellcastingrequirements`.`f6` AS `f6`,`chardev_cataclysm`.`spellcastingrequirements`.`f7` AS `f7` from `chardev_cataclysm`.`spellcastingrequirements` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcasttimes`
--

/*!50001 DROP TABLE IF EXISTS `spellcasttimes`*/;
/*!50001 DROP VIEW IF EXISTS `spellcasttimes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcasttimes` AS select `chardev_cataclysm`.`spellcasttimes`.`ID` AS `ID`,`chardev_cataclysm`.`spellcasttimes`.`Time` AS `Time`,`chardev_cataclysm`.`spellcasttimes`.`f3` AS `f3`,`chardev_cataclysm`.`spellcasttimes`.`f4` AS `f4` from `chardev_cataclysm`.`spellcasttimes` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategories`
--

/*!50001 DROP TABLE IF EXISTS `spellcategories`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategories`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategories` AS select `chardev_cataclysm`.`spellcategories`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategories`.`f2` AS `f2`,`chardev_cataclysm`.`spellcategories`.`f3` AS `f3`,`chardev_cataclysm`.`spellcategories`.`f4` AS `f4`,`chardev_cataclysm`.`spellcategories`.`f5` AS `f5`,`chardev_cataclysm`.`spellcategories`.`f6` AS `f6`,`chardev_cataclysm`.`spellcategories`.`f7` AS `f7` from `chardev_cataclysm`.`spellcategories` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcategory`
--

/*!50001 DROP TABLE IF EXISTS `spellcategory`*/;
/*!50001 DROP VIEW IF EXISTS `spellcategory`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcategory` AS select `chardev_cataclysm`.`spellcategory`.`ID` AS `ID`,`chardev_cataclysm`.`spellcategory`.`f2` AS `f2` from `chardev_cataclysm`.`spellcategory` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellclassoptions`
--

/*!50001 DROP TABLE IF EXISTS `spellclassoptions`*/;
/*!50001 DROP VIEW IF EXISTS `spellclassoptions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellclassoptions` AS select `chardev_cataclysm`.`spellclassoptions`.`ID` AS `ID`,`chardev_cataclysm`.`spellclassoptions`.`f2` AS `f2`,`chardev_cataclysm`.`spellclassoptions`.`f3` AS `f3`,`chardev_cataclysm`.`spellclassoptions`.`f4` AS `f4`,`chardev_cataclysm`.`spellclassoptions`.`f5` AS `f5`,`chardev_cataclysm`.`spellclassoptions`.`SpellClassID` AS `SpellClassID`,`chardev_cataclysm`.`spellclassoptions`.`f7` AS `f7` from `chardev_cataclysm`.`spellclassoptions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellcooldowns`
--

/*!50001 DROP TABLE IF EXISTS `spellcooldowns`*/;
/*!50001 DROP VIEW IF EXISTS `spellcooldowns`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellcooldowns` AS select `chardev_cataclysm`.`spellcooldowns`.`ID` AS `ID`,`chardev_cataclysm`.`spellcooldowns`.`Spell` AS `Spell`,`chardev_cataclysm`.`spellcooldowns`.`Category` AS `Category`,`chardev_cataclysm`.`spellcooldowns`.`Global` AS `Global` from `chardev_cataclysm`.`spellcooldowns` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelldifficulty`
--

/*!50001 DROP TABLE IF EXISTS `spelldifficulty`*/;
/*!50001 DROP VIEW IF EXISTS `spelldifficulty`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelldifficulty` AS select `chardev_cataclysm`.`spelldifficulty`.`f1` AS `f1`,`chardev_cataclysm`.`spelldifficulty`.`f2` AS `f2`,`chardev_cataclysm`.`spelldifficulty`.`f3` AS `f3`,`chardev_cataclysm`.`spelldifficulty`.`f4` AS `f4`,`chardev_cataclysm`.`spelldifficulty`.`f5` AS `f5` from `chardev_cataclysm`.`spelldifficulty` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellduration`
--

/*!50001 DROP TABLE IF EXISTS `spellduration`*/;
/*!50001 DROP VIEW IF EXISTS `spellduration`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellduration` AS select `chardev_cataclysm`.`spellduration`.`ID` AS `ID`,`chardev_cataclysm`.`spellduration`.`Duration` AS `Duration`,`chardev_cataclysm`.`spellduration`.`f3` AS `f3`,`chardev_cataclysm`.`spellduration`.`f4` AS `f4` from `chardev_cataclysm`.`spellduration` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelleffect`
--

/*!50001 DROP TABLE IF EXISTS `spelleffect`*/;
/*!50001 DROP VIEW IF EXISTS `spelleffect`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelleffect` AS select `chardev_cataclysm`.`spelleffect`.`ID` AS `ID`,`chardev_cataclysm`.`spelleffect`.`Aura` AS `Aura`,`chardev_cataclysm`.`spelleffect`.`ProcValue` AS `ProcValue`,`chardev_cataclysm`.`spelleffect`.`Effect` AS `Effect`,`chardev_cataclysm`.`spelleffect`.`Period` AS `Period`,`chardev_cataclysm`.`spelleffect`.`Value` AS `Value`,`chardev_cataclysm`.`spelleffect`.`Coefficient` AS `Coefficient`,`chardev_cataclysm`.`spelleffect`.`f8` AS `f8`,`chardev_cataclysm`.`spelleffect`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelleffect`.`Dice` AS `Dice`,`chardev_cataclysm`.`spelleffect`.`ItemID` AS `ItemID`,`chardev_cataclysm`.`spelleffect`.`f12` AS `f12`,`chardev_cataclysm`.`spelleffect`.`SecondaryEffect` AS `SecondaryEffect`,`chardev_cataclysm`.`spelleffect`.`UsedStat` AS `UsedStat`,`chardev_cataclysm`.`spelleffect`.`ProcChance` AS `ProcChance`,`chardev_cataclysm`.`spelleffect`.`SpellRadiusID` AS `SpellRadiusID`,`chardev_cataclysm`.`spelleffect`.`f17` AS `f17`,`chardev_cataclysm`.`spelleffect`.`LevelModifier` AS `LevelModifier`,`chardev_cataclysm`.`spelleffect`.`f19` AS `f19`,`chardev_cataclysm`.`spelleffect`.`f20` AS `f20`,`chardev_cataclysm`.`spelleffect`.`f21` AS `f21`,`chardev_cataclysm`.`spelleffect`.`f22` AS `f22`,`chardev_cataclysm`.`spelleffect`.`f23` AS `f23`,`chardev_cataclysm`.`spelleffect`.`f24` AS `f24`,`chardev_cataclysm`.`spelleffect`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`spelleffect`.`Index` AS `Index` from `chardev_cataclysm`.`spelleffect` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellequippeditems`
--

/*!50001 DROP TABLE IF EXISTS `spellequippeditems`*/;
/*!50001 DROP VIEW IF EXISTS `spellequippeditems`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellequippeditems` AS select `chardev_cataclysm`.`spellequippeditems`.`ID` AS `ID`,`chardev_cataclysm`.`spellequippeditems`.`ItemClassID` AS `ItemClassID`,`chardev_cataclysm`.`spellequippeditems`.`InventorySlotMask` AS `InventorySlotMask`,`chardev_cataclysm`.`spellequippeditems`.`ItemSubClassMask` AS `ItemSubClassMask` from `chardev_cataclysm`.`spellequippeditems` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyout`
--

/*!50001 DROP TABLE IF EXISTS `spellflyout`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyout`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyout` AS select `chardev_cataclysm`.`spellflyout`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyout`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyout`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyout`.`f4` AS `f4`,`chardev_cataclysm`.`spellflyout`.`f5` AS `f5`,`chardev_cataclysm`.`spellflyout`.`f6` AS `f6`,`chardev_cataclysm`.`spellflyout`.`f7` AS `f7` from `chardev_cataclysm`.`spellflyout` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellflyoutitem`
--

/*!50001 DROP TABLE IF EXISTS `spellflyoutitem`*/;
/*!50001 DROP VIEW IF EXISTS `spellflyoutitem`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellflyoutitem` AS select `chardev_cataclysm`.`spellflyoutitem`.`ID` AS `ID`,`chardev_cataclysm`.`spellflyoutitem`.`f2` AS `f2`,`chardev_cataclysm`.`spellflyoutitem`.`f3` AS `f3`,`chardev_cataclysm`.`spellflyoutitem`.`f4` AS `f4` from `chardev_cataclysm`.`spellflyoutitem` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellfocusobject`
--

/*!50001 DROP TABLE IF EXISTS `spellfocusobject`*/;
/*!50001 DROP VIEW IF EXISTS `spellfocusobject`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellfocusobject` AS select `chardev_cataclysm`.`spellfocusobject`.`ID` AS `ID`,`chardev_cataclysm`.`spellfocusobject`.`f2` AS `f2` from `chardev_cataclysm`.`spellfocusobject` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellicon`
--

/*!50001 DROP TABLE IF EXISTS `spellicon`*/;
/*!50001 DROP VIEW IF EXISTS `spellicon`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellicon` AS select `chardev_cataclysm`.`spellicon`.`ID` AS `ID`,`chardev_cataclysm`.`spellicon`.`Icon` AS `Icon` from `chardev_cataclysm`.`spellicon` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellinterrupts`
--

/*!50001 DROP TABLE IF EXISTS `spellinterrupts`*/;
/*!50001 DROP VIEW IF EXISTS `spellinterrupts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellinterrupts` AS select `chardev_cataclysm`.`spellinterrupts`.`ID` AS `ID`,`chardev_cataclysm`.`spellinterrupts`.`f2` AS `f2`,`chardev_cataclysm`.`spellinterrupts`.`f3` AS `f3`,`chardev_cataclysm`.`spellinterrupts`.`f4` AS `f4`,`chardev_cataclysm`.`spellinterrupts`.`f5` AS `f5`,`chardev_cataclysm`.`spellinterrupts`.`f6` AS `f6` from `chardev_cataclysm`.`spellinterrupts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellitemenchantmentcondition`
--

/*!50001 DROP TABLE IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 DROP VIEW IF EXISTS `spellitemenchantmentcondition`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellitemenchantmentcondition` AS select `chardev_cataclysm`.`spellitemenchantmentcondition`.`ID` AS `ID`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color1` AS `Color1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color2` AS `Color2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color3` AS `Color3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color4` AS `Color4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Color5` AS `Color5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f7` AS `f7`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f8` AS `f8`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f9` AS `f9`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f10` AS `f10`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f11` AS `f11`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_1` AS `f12_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_2` AS `f12_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f12_3` AS `f12_3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator1` AS `Comparator1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator2` AS `Comparator2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator3` AS `Comparator3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator4` AS `Comparator4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Comparator5` AS `Comparator5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor1` AS `CompareColor1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor2` AS `CompareColor2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor3` AS `CompareColor3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor4` AS `CompareColor4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`CompareColor5` AS `CompareColor5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_1` AS `f13_1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f13_2` AS `f13_2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value1` AS `Value1`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value2` AS `Value2`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value3` AS `Value3`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value4` AS `Value4`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`Value5` AS `Value5`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f27` AS `f27`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f28` AS `f28`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f29` AS `f29`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f30` AS `f30`,`chardev_cataclysm`.`spellitemenchantmentcondition`.`f31` AS `f31` from `chardev_cataclysm`.`spellitemenchantmentcondition` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelllevels`
--

/*!50001 DROP TABLE IF EXISTS `spelllevels`*/;
/*!50001 DROP VIEW IF EXISTS `spelllevels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelllevels` AS select `chardev_cataclysm`.`spelllevels`.`ID` AS `ID`,`chardev_cataclysm`.`spelllevels`.`f2` AS `f2`,`chardev_cataclysm`.`spelllevels`.`f3` AS `f3`,`chardev_cataclysm`.`spelllevels`.`f4` AS `f4` from `chardev_cataclysm`.`spelllevels` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmechanic`
--

/*!50001 DROP TABLE IF EXISTS `spellmechanic`*/;
/*!50001 DROP VIEW IF EXISTS `spellmechanic`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmechanic` AS select `chardev_cataclysm`.`spellmechanic`.`ID` AS `ID`,`chardev_cataclysm`.`spellmechanic`.`f2` AS `f2` from `chardev_cataclysm`.`spellmechanic` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissile`
--

/*!50001 DROP TABLE IF EXISTS `spellmissile`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissile`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissile` AS select `chardev_cataclysm`.`spellmissile`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissile`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissile`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissile`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissile`.`f5` AS `f5`,`chardev_cataclysm`.`spellmissile`.`f6` AS `f6`,`chardev_cataclysm`.`spellmissile`.`f7` AS `f7`,`chardev_cataclysm`.`spellmissile`.`f8` AS `f8`,`chardev_cataclysm`.`spellmissile`.`f9` AS `f9`,`chardev_cataclysm`.`spellmissile`.`f10` AS `f10`,`chardev_cataclysm`.`spellmissile`.`f11` AS `f11`,`chardev_cataclysm`.`spellmissile`.`f12` AS `f12`,`chardev_cataclysm`.`spellmissile`.`f13` AS `f13`,`chardev_cataclysm`.`spellmissile`.`f14` AS `f14`,`chardev_cataclysm`.`spellmissile`.`f15` AS `f15` from `chardev_cataclysm`.`spellmissile` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellmissilemotion`
--

/*!50001 DROP TABLE IF EXISTS `spellmissilemotion`*/;
/*!50001 DROP VIEW IF EXISTS `spellmissilemotion`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellmissilemotion` AS select `chardev_cataclysm`.`spellmissilemotion`.`ID` AS `ID`,`chardev_cataclysm`.`spellmissilemotion`.`f2` AS `f2`,`chardev_cataclysm`.`spellmissilemotion`.`f3` AS `f3`,`chardev_cataclysm`.`spellmissilemotion`.`f4` AS `f4`,`chardev_cataclysm`.`spellmissilemotion`.`f5` AS `f5` from `chardev_cataclysm`.`spellmissilemotion` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellpower`
--

/*!50001 DROP TABLE IF EXISTS `spellpower`*/;
/*!50001 DROP VIEW IF EXISTS `spellpower`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellpower` AS select `chardev_cataclysm`.`spellpower`.`ID` AS `ID`,`chardev_cataclysm`.`spellpower`.`Absolute` AS `Absolute`,`chardev_cataclysm`.`spellpower`.`f3` AS `f3`,`chardev_cataclysm`.`spellpower`.`Percent` AS `Percent`,`chardev_cataclysm`.`spellpower`.`f5` AS `f5`,`chardev_cataclysm`.`spellpower`.`f6` AS `f6`,`chardev_cataclysm`.`spellpower`.`f7` AS `f7` from `chardev_cataclysm`.`spellpower` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellradius`
--

/*!50001 DROP TABLE IF EXISTS `spellradius`*/;
/*!50001 DROP VIEW IF EXISTS `spellradius`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellradius` AS select `chardev_cataclysm`.`spellradius`.`ID` AS `ID`,`chardev_cataclysm`.`spellradius`.`Radius` AS `Radius`,`chardev_cataclysm`.`spellradius`.`f3` AS `f3`,`chardev_cataclysm`.`spellradius`.`f4` AS `f4` from `chardev_cataclysm`.`spellradius` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellreagents`
--

/*!50001 DROP TABLE IF EXISTS `spellreagents`*/;
/*!50001 DROP VIEW IF EXISTS `spellreagents`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellreagents` AS select `chardev_cataclysm`.`spellreagents`.`ID` AS `ID`,`chardev_cataclysm`.`spellreagents`.`f2` AS `f2`,`chardev_cataclysm`.`spellreagents`.`f3` AS `f3`,`chardev_cataclysm`.`spellreagents`.`f4` AS `f4`,`chardev_cataclysm`.`spellreagents`.`f5` AS `f5`,`chardev_cataclysm`.`spellreagents`.`f6` AS `f6`,`chardev_cataclysm`.`spellreagents`.`f7` AS `f7`,`chardev_cataclysm`.`spellreagents`.`f8` AS `f8`,`chardev_cataclysm`.`spellreagents`.`f9` AS `f9`,`chardev_cataclysm`.`spellreagents`.`f10` AS `f10`,`chardev_cataclysm`.`spellreagents`.`f11` AS `f11`,`chardev_cataclysm`.`spellreagents`.`f12` AS `f12`,`chardev_cataclysm`.`spellreagents`.`f13` AS `f13`,`chardev_cataclysm`.`spellreagents`.`f14` AS `f14`,`chardev_cataclysm`.`spellreagents`.`f15` AS `f15`,`chardev_cataclysm`.`spellreagents`.`f16` AS `f16`,`chardev_cataclysm`.`spellreagents`.`f17` AS `f17` from `chardev_cataclysm`.`spellreagents` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellrunecost`
--

/*!50001 DROP TABLE IF EXISTS `spellrunecost`*/;
/*!50001 DROP VIEW IF EXISTS `spellrunecost`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellrunecost` AS select `chardev_cataclysm`.`spellrunecost`.`ID` AS `ID`,`chardev_cataclysm`.`spellrunecost`.`f2` AS `f2`,`chardev_cataclysm`.`spellrunecost`.`f3` AS `f3`,`chardev_cataclysm`.`spellrunecost`.`f4` AS `f4`,`chardev_cataclysm`.`spellrunecost`.`f5` AS `f5` from `chardev_cataclysm`.`spellrunecost` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellscaling`
--

/*!50001 DROP TABLE IF EXISTS `spellscaling`*/;
/*!50001 DROP VIEW IF EXISTS `spellscaling`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellscaling` AS select `chardev_cataclysm`.`spellscaling`.`ID` AS `ID`,`chardev_cataclysm`.`spellscaling`.`CastTimeStart` AS `CastTimeStart`,`chardev_cataclysm`.`spellscaling`.`CastTimeEnd` AS `CastTimeEnd`,`chardev_cataclysm`.`spellscaling`.`Intervals` AS `Intervals`,`chardev_cataclysm`.`spellscaling`.`Distribution` AS `Distribution`,`chardev_cataclysm`.`spellscaling`.`Coefficient1` AS `Coefficient1`,`chardev_cataclysm`.`spellscaling`.`Coefficient2` AS `Coefficient2`,`chardev_cataclysm`.`spellscaling`.`Coefficient3` AS `Coefficient3`,`chardev_cataclysm`.`spellscaling`.`Dice1` AS `Dice1`,`chardev_cataclysm`.`spellscaling`.`Dice2` AS `Dice2`,`chardev_cataclysm`.`spellscaling`.`Dice3` AS `Dice3`,`chardev_cataclysm`.`spellscaling`.`f12` AS `f12`,`chardev_cataclysm`.`spellscaling`.`f13` AS `f13`,`chardev_cataclysm`.`spellscaling`.`f14` AS `f14`,`chardev_cataclysm`.`spellscaling`.`f15` AS `f15`,`chardev_cataclysm`.`spellscaling`.`f16` AS `f16` from `chardev_cataclysm`.`spellscaling` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshift`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshift`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshift`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshift` AS select `chardev_cataclysm`.`spellshapeshift`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshift`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshift`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshift`.`SpellShapeshiftFormID` AS `SpellShapeshiftFormID`,`chardev_cataclysm`.`spellshapeshift`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshift`.`f6` AS `f6` from `chardev_cataclysm`.`spellshapeshift` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellshapeshiftform`
--

/*!50001 DROP TABLE IF EXISTS `spellshapeshiftform`*/;
/*!50001 DROP VIEW IF EXISTS `spellshapeshiftform`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellshapeshiftform` AS select `chardev_cataclysm`.`spellshapeshiftform`.`ID` AS `ID`,`chardev_cataclysm`.`spellshapeshiftform`.`f2` AS `f2`,`chardev_cataclysm`.`spellshapeshiftform`.`f3` AS `f3`,`chardev_cataclysm`.`spellshapeshiftform`.`f4` AS `f4`,`chardev_cataclysm`.`spellshapeshiftform`.`f5` AS `f5`,`chardev_cataclysm`.`spellshapeshiftform`.`f6` AS `f6`,`chardev_cataclysm`.`spellshapeshiftform`.`f7` AS `f7`,`chardev_cataclysm`.`spellshapeshiftform`.`f8` AS `f8`,`chardev_cataclysm`.`spellshapeshiftform`.`f9` AS `f9`,`chardev_cataclysm`.`spellshapeshiftform`.`f10` AS `f10`,`chardev_cataclysm`.`spellshapeshiftform`.`f11` AS `f11`,`chardev_cataclysm`.`spellshapeshiftform`.`f12` AS `f12`,`chardev_cataclysm`.`spellshapeshiftform`.`f13` AS `f13`,`chardev_cataclysm`.`spellshapeshiftform`.`f14` AS `f14`,`chardev_cataclysm`.`spellshapeshiftform`.`f15` AS `f15`,`chardev_cataclysm`.`spellshapeshiftform`.`f16` AS `f16`,`chardev_cataclysm`.`spellshapeshiftform`.`f17` AS `f17`,`chardev_cataclysm`.`spellshapeshiftform`.`f18` AS `f18`,`chardev_cataclysm`.`spellshapeshiftform`.`f19` AS `f19`,`chardev_cataclysm`.`spellshapeshiftform`.`f20` AS `f20` from `chardev_cataclysm`.`spellshapeshiftform` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spelltargetrestrictions`
--

/*!50001 DROP TABLE IF EXISTS `spelltargetrestrictions`*/;
/*!50001 DROP VIEW IF EXISTS `spelltargetrestrictions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spelltargetrestrictions` AS select `chardev_cataclysm`.`spelltargetrestrictions`.`ID` AS `ID`,`chardev_cataclysm`.`spelltargetrestrictions`.`Targets` AS `Targets`,`chardev_cataclysm`.`spelltargetrestrictions`.`f3` AS `f3`,`chardev_cataclysm`.`spelltargetrestrictions`.`f4` AS `f4`,`chardev_cataclysm`.`spelltargetrestrictions`.`f5` AS `f5` from `chardev_cataclysm`.`spelltargetrestrictions` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `spellvisual`
--

/*!50001 DROP TABLE IF EXISTS `spellvisual`*/;
/*!50001 DROP VIEW IF EXISTS `spellvisual`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `spellvisual` AS select `chardev_cataclysm`.`spellvisual`.`ID` AS `ID`,`chardev_cataclysm`.`spellvisual`.`f2` AS `f2`,`chardev_cataclysm`.`spellvisual`.`f3` AS `f3`,`chardev_cataclysm`.`spellvisual`.`f4` AS `f4`,`chardev_cataclysm`.`spellvisual`.`f5` AS `f5`,`chardev_cataclysm`.`spellvisual`.`f6` AS `f6`,`chardev_cataclysm`.`spellvisual`.`f7` AS `f7`,`chardev_cataclysm`.`spellvisual`.`f8` AS `f8`,`chardev_cataclysm`.`spellvisual`.`f9` AS `f9`,`chardev_cataclysm`.`spellvisual`.`f10` AS `f10`,`chardev_cataclysm`.`spellvisual`.`f11` AS `f11`,`chardev_cataclysm`.`spellvisual`.`f12` AS `f12`,`chardev_cataclysm`.`spellvisual`.`f13` AS `f13`,`chardev_cataclysm`.`spellvisual`.`f14` AS `f14`,`chardev_cataclysm`.`spellvisual`.`f15` AS `f15`,`chardev_cataclysm`.`spellvisual`.`f16` AS `f16`,`chardev_cataclysm`.`spellvisual`.`f17` AS `f17`,`chardev_cataclysm`.`spellvisual`.`f18` AS `f18`,`chardev_cataclysm`.`spellvisual`.`f19` AS `f19`,`chardev_cataclysm`.`spellvisual`.`f20` AS `f20`,`chardev_cataclysm`.`spellvisual`.`f21` AS `f21`,`chardev_cataclysm`.`spellvisual`.`f22` AS `f22`,`chardev_cataclysm`.`spellvisual`.`f23` AS `f23`,`chardev_cataclysm`.`spellvisual`.`f24` AS `f24`,`chardev_cataclysm`.`spellvisual`.`f25` AS `f25`,`chardev_cataclysm`.`spellvisual`.`f26` AS `f26`,`chardev_cataclysm`.`spellvisual`.`f27` AS `f27`,`chardev_cataclysm`.`spellvisual`.`f28` AS `f28`,`chardev_cataclysm`.`spellvisual`.`f29` AS `f29`,`chardev_cataclysm`.`spellvisual`.`f30` AS `f30`,`chardev_cataclysm`.`spellvisual`.`f31` AS `f31`,`chardev_cataclysm`.`spellvisual`.`f32` AS `f32` from `chardev_cataclysm`.`spellvisual` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talent`
--

/*!50001 DROP TABLE IF EXISTS `talent`*/;
/*!50001 DROP VIEW IF EXISTS `talent`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talent` AS select `chardev_cataclysm`.`talent`.`ID` AS `ID`,`chardev_cataclysm`.`talent`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talent`.`Row` AS `Row`,`chardev_cataclysm`.`talent`.`Col` AS `Col`,`chardev_cataclysm`.`talent`.`SpellID1` AS `SpellID1`,`chardev_cataclysm`.`talent`.`SpellID2` AS `SpellID2`,`chardev_cataclysm`.`talent`.`SpellID3` AS `SpellID3`,`chardev_cataclysm`.`talent`.`SpellID4` AS `SpellID4`,`chardev_cataclysm`.`talent`.`SpellID5` AS `SpellID5`,`chardev_cataclysm`.`talent`.`RequiredTalentID1` AS `RequiredTalentID1`,`chardev_cataclysm`.`talent`.`RequiredTalentID2` AS `RequiredTalentID2`,`chardev_cataclysm`.`talent`.`RequiredTalentID3` AS `RequiredTalentID3`,`chardev_cataclysm`.`talent`.`f13` AS `f13`,`chardev_cataclysm`.`talent`.`f14` AS `f14`,`chardev_cataclysm`.`talent`.`f15` AS `f15`,`chardev_cataclysm`.`talent`.`f16` AS `f16`,`chardev_cataclysm`.`talent`.`f17` AS `f17`,`chardev_cataclysm`.`talent`.`PetMask0` AS `PetMask0`,`chardev_cataclysm`.`talent`.`PetMask1` AS `PetMask1` from `chardev_cataclysm`.`talent` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `talenttreeprimaryspells`
--

/*!50001 DROP TABLE IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 DROP VIEW IF EXISTS `talenttreeprimaryspells`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `talenttreeprimaryspells` AS select `chardev_cataclysm`.`talenttreeprimaryspells`.`ID` AS `ID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`TalentTabID` AS `TalentTabID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`SpellID` AS `SpellID`,`chardev_cataclysm`.`talenttreeprimaryspells`.`f4` AS `f4` from `chardev_cataclysm`.`talenttreeprimaryspells` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-12-30 17:20:45
