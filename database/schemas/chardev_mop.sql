-- MySQL dump 10.13  Distrib 5.1.41, for Win32 (ia32)
--
-- Host: localhost    Database: chardev_mop
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
  `f15` int(11) DEFAULT NULL COMMENT 'MoP',
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
  `f25` int(11) DEFAULT NULL COMMENT 'MoP',
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
-- Table structure for table `gemproperties`
--

DROP TABLE IF EXISTS `gemproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gemproperties` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `SpellItemEnchantmentID` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `MinItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `glyphproperties`
--

DROP TABLE IF EXISTS `glyphproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `glyphproperties` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `SpellID` int(11) DEFAULT '0',
  `Type` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `SpellID` (`SpellID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtchancetomeleecrit`
--

DROP TABLE IF EXISTS `gtchancetomeleecrit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtchancetomeleecrit` (
  `ID` int(11) NOT NULL,
  `Chance` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtchancetomeleecritbase`
--

DROP TABLE IF EXISTS `gtchancetomeleecritbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtchancetomeleecritbase` (
  `ID` int(11) NOT NULL,
  `Chance` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtchancetospellcrit`
--

DROP TABLE IF EXISTS `gtchancetospellcrit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtchancetospellcrit` (
  `ID` int(11) NOT NULL,
  `Chance` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtchancetospellcritbase`
--

DROP TABLE IF EXISTS `gtchancetospellcritbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtchancetospellcritbase` (
  `ID` int(11) NOT NULL,
  `Chance` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtcombatratings`
--

DROP TABLE IF EXISTS `gtcombatratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtcombatratings` (
  `ID` int(11) NOT NULL,
  `Value` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtoctregenhp`
--

DROP TABLE IF EXISTS `gtoctregenhp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtoctregenhp` (
  `ID` int(11) NOT NULL,
  `Value` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtoctregenmp`
--

DROP TABLE IF EXISTS `gtoctregenmp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtoctregenmp` (
  `ID` int(11) NOT NULL,
  `Value` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtregenhpperspt`
--

DROP TABLE IF EXISTS `gtregenhpperspt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtregenhpperspt` (
  `ID` int(11) NOT NULL,
  `Value` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtregenmpperspt`
--

DROP TABLE IF EXISTS `gtregenmpperspt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtregenmpperspt` (
  `ID` int(11) NOT NULL,
  `Value` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gtspellscaling`
--

DROP TABLE IF EXISTS `gtspellscaling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gtspellscaling` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Value` float DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemClass` int(11) DEFAULT '0',
  `ItemSubClass` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `ItemDisplayInfoID` int(11) DEFAULT '0',
  `InventorySlot` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_sparse`
--

DROP TABLE IF EXISTS `item_sparse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_sparse` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Quality` int(11) DEFAULT '0',
  `TypeMask` int(11) DEFAULT '0',
  `TypeMask2` int(11) DEFAULT '0',
  `TypeMask3` int(11) DEFAULT '0' COMMENT 'Added 4.3',
  `TypeMask4` int(11) DEFAULT '0' COMMENT 'Added 4.3',
  `TypeMask5` int(11) DEFAULT NULL,
  `BuyPrice` int(11) DEFAULT '0',
  `SellPrice` int(11) DEFAULT '0',
  `InventorySlot` int(11) DEFAULT '0',
  `ChrClassMask` int(11) DEFAULT '0',
  `ChrRaceMask` int(11) DEFAULT '0',
  `Level` int(11) DEFAULT '0',
  `RequiredCharacterLevel` int(11) DEFAULT '0',
  `RequiredSkillLineID` int(11) DEFAULT '0',
  `RequiredSkillLineLevel` int(11) DEFAULT '0',
  `f14` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `f16` int(11) DEFAULT '0',
  `RequiredFactionID` int(11) DEFAULT '0',
  `RequiredFactionReputation` int(11) DEFAULT '0',
  `Unique` int(11) DEFAULT '0',
  `MaximumStackSize` int(11) DEFAULT '0',
  `f21` int(11) DEFAULT '0',
  `Stat1` int(11) DEFAULT '0',
  `Stat2` int(11) DEFAULT '0',
  `Stat3` int(11) DEFAULT '0',
  `Stat4` int(11) DEFAULT '0',
  `Stat5` int(11) DEFAULT '0',
  `Stat6` int(11) DEFAULT '0',
  `Stat7` int(11) DEFAULT '0',
  `Stat8` int(11) DEFAULT '0',
  `Stat9` int(11) DEFAULT '0',
  `Stat10` int(11) DEFAULT '0',
  `StatValue1` int(11) DEFAULT '0',
  `StatValue2` int(11) DEFAULT '0',
  `StatValue3` int(11) DEFAULT '0',
  `StatValue4` int(11) DEFAULT '0',
  `StatValue5` int(11) DEFAULT '0',
  `StatValue6` int(11) DEFAULT '0',
  `StatValue7` int(11) DEFAULT '0',
  `StatValue8` int(11) DEFAULT '0',
  `StatValue9` int(11) DEFAULT '0',
  `StatValue10` int(11) DEFAULT '0',
  `f42` int(11) DEFAULT '0',
  `f43` int(11) DEFAULT '0',
  `f44` int(11) DEFAULT '0',
  `f45` int(11) DEFAULT '0',
  `f46` int(11) DEFAULT '0',
  `f47` int(11) DEFAULT '0',
  `f48` int(11) DEFAULT '0',
  `f49` int(11) DEFAULT '0',
  `f50` int(11) DEFAULT '0',
  `f51` int(11) DEFAULT '0',
  `f52` int(11) DEFAULT '0',
  `f53` int(11) DEFAULT '0',
  `f54` int(11) DEFAULT '0',
  `f55` int(11) DEFAULT '0',
  `f56` int(11) DEFAULT '0',
  `f57` int(11) DEFAULT '0',
  `f58` int(11) DEFAULT '0',
  `f59` int(11) DEFAULT '0',
  `f60` int(11) DEFAULT '0',
  `f61` int(11) DEFAULT '0',
  `ScalingStatDistributionID` int(11) DEFAULT '0',
  `f63` int(11) DEFAULT '0',
  `Delay` int(11) DEFAULT '0',
  `f65` float DEFAULT '0',
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `SpellID4` int(11) DEFAULT '0',
  `SpellID5` int(11) DEFAULT '0',
  `SpellTrigger1` int(11) DEFAULT '0',
  `SpellTrigger2` int(11) DEFAULT '0',
  `SpellTrigger3` int(11) DEFAULT '0',
  `SpellTrigger4` int(11) DEFAULT '0',
  `SpellTrigger5` int(11) DEFAULT '0',
  `SpellCharges1` int(11) DEFAULT '0',
  `SpellCharges2` int(11) DEFAULT '0',
  `SpellCharges3` int(11) DEFAULT '0',
  `SpellCharges4` int(11) DEFAULT '0',
  `SpellCharges5` int(11) DEFAULT '0',
  `SpellCooldown1` int(11) DEFAULT '0',
  `SpellCooldown2` int(11) DEFAULT '0',
  `SpellCooldown3` int(11) DEFAULT '0',
  `SpellCooldown4` int(11) DEFAULT '0',
  `SpellCooldown5` int(11) DEFAULT '0',
  `SpellCategoryID1` int(11) DEFAULT '0',
  `SpellCategoryID2` int(11) DEFAULT '0',
  `SpellCategoryID3` int(11) DEFAULT '0',
  `SpellCategoryID4` int(11) DEFAULT '0',
  `SpellCategoryID5` int(11) DEFAULT '0',
  `SpellCategoryCooldown1` int(11) DEFAULT '0',
  `SpellCategoryCooldown2` int(11) DEFAULT '0',
  `SpellCategoryCooldown3` int(11) DEFAULT '0',
  `SpellCategoryCooldown4` int(11) DEFAULT '0',
  `SpellCategoryCooldown5` int(11) DEFAULT '0',
  `Binds` int(11) DEFAULT '0',
  `Name` text,
  `f98` int(11) DEFAULT '0',
  `f99` int(11) DEFAULT '0',
  `f100` int(11) DEFAULT '0',
  `Description` text,
  `QuestID` int(11) DEFAULT '0',
  `f103` int(11) DEFAULT '0',
  `f104` int(11) DEFAULT '0',
  `f105` int(11) DEFAULT '0',
  `f106` int(11) DEFAULT '0',
  `f107` int(11) DEFAULT '0',
  `f108` int(11) DEFAULT '0',
  `RandomPropertiesID` int(11) DEFAULT '0',
  `RandomSuffixID` int(11) DEFAULT '0',
  `ItemSetID` int(11) DEFAULT '0',
  `f113` int(11) DEFAULT '0',
  `f114` int(11) DEFAULT '0',
  `f115` int(11) DEFAULT '0',
  `f116` int(11) DEFAULT '0',
  `SocketColor1` int(11) DEFAULT '0',
  `SocketColor2` int(11) DEFAULT '0',
  `SocketColor3` int(11) DEFAULT '0',
  `f120` int(11) DEFAULT '0',
  `f121` int(11) DEFAULT '0',
  `f122` int(11) DEFAULT '0',
  `SocketBonusID` int(11) NOT NULL DEFAULT '0',
  `GemPropertiesID` int(11) DEFAULT '0',
  `f125` float DEFAULT '0',
  `f126` int(11) DEFAULT '0',
  `LimitCategory` int(11) DEFAULT '0',
  `f128` int(11) DEFAULT '0',
  `DamageRange` float DEFAULT '0',
  `LimitCategoryMultiple` int(11) DEFAULT '0',
  `f131` int(11) DEFAULT '0',
  `f132` int(11) DEFAULT NULL COMMENT 'MoP',
  `Version` int(11) NOT NULL,
  `Locale` varchar(2) NOT NULL,
  PRIMARY KEY (`ID`,`Version`,`Locale`),
  KEY `GemPropertiesID` (`GemPropertiesID`),
  KEY `ItemLevel` (`Level`),
  KEY `Quality` (`Quality`),
  KEY `RequiredLevel` (`RequiredCharacterLevel`),
  KEY `InventorySlot` (`InventorySlot`),
  KEY `IDVersion` (`ID`,`Version`),
  KEY `SpellID1` (`SpellID1`),
  KEY `SpellID2` (`SpellID2`),
  KEY `SpellID3` (`SpellID3`),
  KEY `SpellID4` (`SpellID4`),
  KEY `SpellID5` (`SpellID5`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemarmorquality`
--

DROP TABLE IF EXISTS `itemarmorquality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemarmorquality` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemarmorshield`
--

DROP TABLE IF EXISTS `itemarmorshield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemarmorshield` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemarmortotal`
--

DROP TABLE IF EXISTS `itemarmortotal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemarmortotal` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  `1` float DEFAULT '0' COMMENT 'Cloth',
  `2` float DEFAULT '0' COMMENT 'Leather',
  `3` float DEFAULT '0' COMMENT 'Mail',
  `4` float DEFAULT '0' COMMENT 'Plate',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `f4` float DEFAULT NULL COMMENT 'Added 4.3',
  `Name` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemcurrencycost`
--

DROP TABLE IF EXISTS `itemcurrencycost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemcurrencycost` (
  `ItemID` int(11) NOT NULL,
  `CurrencyID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamageonehand`
--

DROP TABLE IF EXISTS `itemdamageonehand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamageonehand` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamageonehandcaster`
--

DROP TABLE IF EXISTS `itemdamageonehandcaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamageonehandcaster` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamageranged`
--

DROP TABLE IF EXISTS `itemdamageranged`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamageranged` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamagethrown`
--

DROP TABLE IF EXISTS `itemdamagethrown`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamagethrown` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamagetwohand`
--

DROP TABLE IF EXISTS `itemdamagetwohand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamagetwohand` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamagetwohandcaster`
--

DROP TABLE IF EXISTS `itemdamagetwohandcaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamagetwohandcaster` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdamagewand`
--

DROP TABLE IF EXISTS `itemdamagewand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdamagewand` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `0` float DEFAULT '0',
  `1` float DEFAULT '0',
  `2` float DEFAULT '0',
  `3` float DEFAULT '0',
  `4` float DEFAULT '0',
  `5` float DEFAULT '0',
  `6` float DEFAULT '0',
  `ItemLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itemdisplayinfo`
--

DROP TABLE IF EXISTS `itemdisplayinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemdisplayinfo` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `Icon` text,
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
  `f20` int(11) DEFAULT '0',
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  `f25` int(11) DEFAULT '0' COMMENT 'MoP',
  `f26` int(11) DEFAULT '0' COMMENT 'MoP',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `itemreforge`
--

DROP TABLE IF EXISTS `itemreforge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemreforge` (
  `ID` int(11) NOT NULL,
  `f2` int(11) DEFAULT NULL,
  `f3` float DEFAULT NULL,
  `f4` int(11) DEFAULT NULL,
  `f5` float DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `randproppoints`
--

DROP TABLE IF EXISTS `randproppoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `randproppoints` (
  `ID` int(11) NOT NULL,
  `PointsQuality4Group0` int(11) DEFAULT NULL,
  `PointsQuality4Group1` int(11) DEFAULT NULL,
  `PointsQuality4Group2` int(11) DEFAULT NULL,
  `PointsQuality4Group3` int(11) DEFAULT NULL,
  `PointsQuality4Group4` int(11) DEFAULT NULL,
  `PointsQuality3Group0` int(11) DEFAULT NULL,
  `PointsQuality3Group1` int(11) DEFAULT NULL,
  `PointsQuality3Group2` int(11) DEFAULT NULL,
  `PointsQuality3Group3` int(11) DEFAULT NULL,
  `PointsQuality3Group4` int(11) DEFAULT NULL,
  `PointsQuality2Group0` int(11) DEFAULT NULL,
  `PointsQuality2Group1` int(11) DEFAULT NULL,
  `PointsQuality2Group2` int(11) DEFAULT NULL,
  `PointsQuality2Group3` int(11) DEFAULT NULL,
  `PointsQuality2Group4` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `researchproject`
--

DROP TABLE IF EXISTS `researchproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `researchproject` (
  `ID` int(11) NOT NULL,
  `Name` text,
  `Description` text,
  `IsRare` int(11) DEFAULT NULL,
  `ResearchBranchID` int(11) DEFAULT NULL,
  `SpellID` int(11) DEFAULT NULL,
  `Sockets` int(11) DEFAULT NULL,
  `f8` int(11) DEFAULT NULL,
  `Fragments` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scalingstatdistribution`
--

DROP TABLE IF EXISTS `scalingstatdistribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scalingstatdistribution` (
  `id` int(11) NOT NULL DEFAULT '0',
  `Stat1` int(11) DEFAULT '0',
  `Stat2` int(11) DEFAULT '0',
  `Stat3` int(11) DEFAULT '0',
  `Stat4` int(11) DEFAULT '0',
  `Stat5` int(11) DEFAULT '0',
  `Stat6` int(11) DEFAULT '0',
  `Stat7` int(11) DEFAULT '0',
  `Stat8` int(11) DEFAULT '0',
  `Stat9` int(11) DEFAULT '0',
  `Stat10` int(11) DEFAULT '0',
  `Coefficient1` int(11) DEFAULT '0',
  `Coefficient2` int(11) DEFAULT '0',
  `Coefficient3` int(11) DEFAULT '0',
  `Coefficient4` int(11) DEFAULT '0',
  `Coefficient5` int(11) DEFAULT '0',
  `Coefficient6` int(11) DEFAULT '0',
  `Coefficient7` int(11) DEFAULT '0',
  `Coefficient8` int(11) DEFAULT '0',
  `Coefficient9` int(11) DEFAULT '0',
  `Coefficient10` int(11) DEFAULT '0',
  `MinLevel` int(11) DEFAULT '0',
  `MaxLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scalingstatvalues`
--

DROP TABLE IF EXISTS `scalingstatvalues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scalingstatvalues` (
  `id` int(11) NOT NULL DEFAULT '0',
  `level` int(11) DEFAULT '0',
  `dist0` int(11) DEFAULT '0',
  `dist1` int(11) DEFAULT '0',
  `dist2` int(11) DEFAULT '0',
  `dist3` int(11) DEFAULT '0',
  `dist4` int(11) DEFAULT '0',
  `dist5` int(11) DEFAULT '0',
  `dist6` int(11) DEFAULT '0',
  `dist7` int(11) DEFAULT '0',
  `dist8` int(11) DEFAULT '0',
  `dist9` int(11) DEFAULT '0',
  `dist10` int(11) DEFAULT '0',
  `dist11` int(11) DEFAULT '0',
  `dist12` int(11) DEFAULT '0',
  `dist13` int(11) DEFAULT '0',
  `dist14` int(11) DEFAULT '0',
  `dist15` int(11) DEFAULT '0',
  `dist16` int(11) DEFAULT '0',
  `dist17` int(11) DEFAULT '0' COMMENT 'Added 10192',
  `dist18` int(11) DEFAULT '0' COMMENT 'Added 10192',
  `dist19` int(11) DEFAULT '0' COMMENT 'Added 10192',
  `dist20` int(11) DEFAULT '0' COMMENT 'Added 10192',
  `dist21` int(11) DEFAULT '0' COMMENT 'Added 10192',
  `dist22` int(11) NOT NULL,
  `dist23` int(11) NOT NULL,
  `dist24` int(11) NOT NULL,
  `dist25` int(11) NOT NULL,
  `dist26` int(11) NOT NULL,
  `dist27` int(11) NOT NULL,
  `dist28` int(11) NOT NULL,
  `dist29` int(11) NOT NULL,
  `dist30` int(11) NOT NULL,
  `dist31` int(11) NOT NULL,
  `dist32` int(11) NOT NULL,
  `dist33` int(11) NOT NULL,
  `dist34` int(11) NOT NULL,
  `dist35` int(11) NOT NULL,
  `dist36` int(11) NOT NULL,
  `dist37` int(11) NOT NULL,
  `dist38` int(11) NOT NULL,
  `dist39` int(11) NOT NULL,
  `dist40` int(11) NOT NULL,
  `dist41` int(11) NOT NULL,
  `dist42` int(11) NOT NULL,
  `dist43` int(11) NOT NULL,
  `dist44` int(11) NOT NULL,
  `dist45` int(11) NOT NULL COMMENT 'MoP',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `f9` int(11) DEFAULT '0' COMMENT 'MoP',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skilllineability`
--

DROP TABLE IF EXISTS `skilllineability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skilllineability` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `SkillLineID` int(11) DEFAULT '0',
  `SpellID` int(11) DEFAULT '0',
  `RaceMask` int(11) DEFAULT '0',
  `ClassMask` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `RequiredSkill` int(11) DEFAULT '0',
  `ReplaceSpellID` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `Grey` int(11) DEFAULT '0',
  `Yellow` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skillraceclassinfo`
--

DROP TABLE IF EXISTS `skillraceclassinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skillraceclassinfo` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spell`
--

DROP TABLE IF EXISTS `spell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spell` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Name` text,
  `Rank` text,
  `Description` text,
  `BuffDescription` text,
  `SpellRuneCostID` int(11) DEFAULT '0',
  `SpellMissileID` int(11) DEFAULT '0',
  `SpellDescriptionVariablesID` int(11) DEFAULT '0',
  `f9` float DEFAULT '0',
  `SpellScalingID` int(11) DEFAULT '0',
  `SpellAuraOptionsID` int(11) DEFAULT '0',
  `SpellAuraRestrictionsID` int(11) DEFAULT '0',
  `SpellCastingRequirementsID` int(11) DEFAULT '0',
  `SpellCategoriesID` int(11) DEFAULT '0',
  `SpellClassOptionsID` int(11) DEFAULT '0',
  `SpellCooldownsID` int(11) DEFAULT '0',
  `SpellEquippedItemsID` int(11) DEFAULT '0',
  `SpellInterruptsID` int(11) DEFAULT '0',
  `SpellLevelsID` int(11) DEFAULT '0',
  `SpellReagentsID` int(11) DEFAULT '0',
  `SpellShapeshiftID` int(11) DEFAULT '0',
  `SpellTargetRestrictionsID` int(11) DEFAULT '0',
  `ResearchProjectID` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  `SpellMiscID` int(11) DEFAULT '0' COMMENT 'Archeology related',
  PRIMARY KEY (`ID`),
  KEY `SpellScaling` (`SpellScalingID`),
  FULLTEXT KEY `Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellauraoptions`
--

DROP TABLE IF EXISTS `spellauraoptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellauraoptions` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT NULL COMMENT 'MoP',
  `f3` int(11) DEFAULT NULL COMMENT 'MoP',
  `Stacks` int(11) DEFAULT '0',
  `ProcRate` int(11) DEFAULT '0',
  `ProcCharges` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellaurarestrictions`
--

DROP TABLE IF EXISTS `spellaurarestrictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellaurarestrictions` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0' COMMENT 'MoP',
  `f3` int(11) DEFAULT '0' COMMENT 'MoP',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT NULL,
  `f11` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellcastingrequirements`
--

DROP TABLE IF EXISTS `spellcastingrequirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellcastingrequirements` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellcasttimes`
--

DROP TABLE IF EXISTS `spellcasttimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellcasttimes` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Time` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellcategories`
--

DROP TABLE IF EXISTS `spellcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellcategories` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0' COMMENT 'MoP\n',
  `f3` int(11) DEFAULT '0' COMMENT 'MoP',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0' COMMENT 'MoP\n',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellcategory`
--

DROP TABLE IF EXISTS `spellcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellcategory` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  `f3` int(11) DEFAULT NULL,
  `f4` int(11) DEFAULT NULL,
  `f5` int(11) DEFAULT NULL COMMENT 'MoP',
  `f6` int(11) DEFAULT NULL COMMENT 'MoP\n',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellclassoptions`
--

DROP TABLE IF EXISTS `spellclassoptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellclassoptions` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT NULL COMMENT 'MoP',
  `SpellClassID` int(11) DEFAULT '0',
  `f8` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellcooldowns`
--

DROP TABLE IF EXISTS `spellcooldowns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellcooldowns` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT NULL COMMENT 'MoP\n',
  `f3` int(11) DEFAULT NULL COMMENT 'MoP\n',
  `Spell` int(11) DEFAULT '0',
  `Category` int(11) DEFAULT '0',
  `Global` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `spelldifficulty`
--

DROP TABLE IF EXISTS `spelldifficulty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelldifficulty` (
  `f1` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  PRIMARY KEY (`f1`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellduration`
--

DROP TABLE IF EXISTS `spellduration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellduration` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Duration` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spelleffect`
--

DROP TABLE IF EXISTS `spelleffect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelleffect` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT NULL COMMENT 'MoP',
  `Aura` int(11) DEFAULT '0',
  `ProcValue` float DEFAULT '0',
  `Effect` int(11) DEFAULT '0',
  `Period` int(11) DEFAULT '0',
  `Value` int(11) DEFAULT '0',
  `Coefficient` float DEFAULT '0',
  `f8` float DEFAULT '0',
  `Targets` int(11) DEFAULT '0',
  `Dice` int(11) DEFAULT '0',
  `ItemID` int(11) DEFAULT '0' COMMENT 'ItemID if \naura = 53 AND usedStat = 14\nOR\naura = 24',
  `f12` int(11) DEFAULT '0',
  `SecondaryEffect` int(11) DEFAULT '0',
  `UsedStat` int(11) DEFAULT '0',
  `ProcChance` float DEFAULT '0',
  `SpellRadiusID` int(11) DEFAULT '0',
  `f17` int(11) DEFAULT '0',
  `LevelModifier` float DEFAULT '0',
  `f19` int(11) DEFAULT '0',
  `f20` int(11) DEFAULT '0',
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  `f25` int(11) DEFAULT NULL COMMENT 'MoP',
  `f26` int(11) DEFAULT NULL COMMENT 'MoP',
  `SpellID` int(11) DEFAULT '0',
  `Index` int(11) DEFAULT '0',
  `f29` int(11) DEFAULT '0' COMMENT '4.2\n',
  PRIMARY KEY (`ID`),
  KEY `Spell` (`SpellID`),
  KEY `Aura` (`Aura`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellequippeditems`
--

DROP TABLE IF EXISTS `spellequippeditems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellequippeditems` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT NULL COMMENT 'MoP\n',
  `f3` int(11) DEFAULT NULL COMMENT 'MoP\n',
  `ItemClassID` int(11) DEFAULT '0',
  `InventorySlotMask` int(11) DEFAULT '0',
  `ItemSubClassMask` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellflyout`
--

DROP TABLE IF EXISTS `spellflyout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellflyout` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellflyoutitem`
--

DROP TABLE IF EXISTS `spellflyoutitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellflyoutitem` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellfocusobject`
--

DROP TABLE IF EXISTS `spellfocusobject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellfocusobject` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellicon`
--

DROP TABLE IF EXISTS `spellicon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellicon` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Icon` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellinterrupts`
--

DROP TABLE IF EXISTS `spellinterrupts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellinterrupts` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0' COMMENT 'MoP',
  `f3` int(11) DEFAULT '0' COMMENT 'MoP',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `SpellID1` int(11) DEFAULT '0',
  `SpellID2` int(11) DEFAULT '0',
  `SpellID3` int(11) DEFAULT '0',
  `Description` text,
  `f13` int(11) DEFAULT '0',
  `EnchantSlot` int(11) DEFAULT '0',
  `f15` int(11) DEFAULT '0',
  `SpellItemEnchantmentConditionID` int(11) DEFAULT '0',
  `RequiredSkillLineID` int(11) DEFAULT '0',
  `RequiredSkillLineLevel` int(11) DEFAULT '0',
  `RequiredCharacterLevel` int(11) DEFAULT '0',
  `f20` int(11) DEFAULT '0' COMMENT 'MoP',
  `f21` int(11) DEFAULT NULL COMMENT 'MoP\n',
  `f22` int(11) DEFAULT NULL COMMENT 'MoP',
  `f23` int(11) DEFAULT NULL COMMENT 'MoP',
  `f24` int(11) DEFAULT NULL COMMENT 'Mop',
  `f25` int(11) DEFAULT NULL COMMENT 'MoP',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellitemenchantmentcondition`
--

DROP TABLE IF EXISTS `spellitemenchantmentcondition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellitemenchantmentcondition` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Color1` tinyint(4) NOT NULL DEFAULT '0',
  `Color2` tinyint(4) NOT NULL DEFAULT '0',
  `Color3` tinyint(4) NOT NULL DEFAULT '0',
  `Color4` tinyint(4) NOT NULL DEFAULT '0',
  `Color5` tinyint(4) NOT NULL DEFAULT '0',
  `f7` int(11) NOT NULL DEFAULT '0',
  `f8` int(11) NOT NULL DEFAULT '0',
  `f9` int(11) NOT NULL DEFAULT '0',
  `f10` int(11) NOT NULL DEFAULT '0',
  `f11` int(11) NOT NULL DEFAULT '0',
  `f12_1` tinyint(4) NOT NULL DEFAULT '0',
  `f12_2` tinyint(4) NOT NULL DEFAULT '0',
  `f12_3` tinyint(4) NOT NULL DEFAULT '0',
  `Comparator1` tinyint(4) NOT NULL DEFAULT '0',
  `Comparator2` tinyint(4) NOT NULL DEFAULT '0',
  `Comparator3` tinyint(4) NOT NULL DEFAULT '0',
  `Comparator4` tinyint(4) NOT NULL DEFAULT '0',
  `Comparator5` tinyint(4) NOT NULL DEFAULT '0',
  `CompareColor1` tinyint(4) NOT NULL DEFAULT '0',
  `CompareColor2` tinyint(4) NOT NULL DEFAULT '0',
  `CompareColor3` tinyint(4) NOT NULL DEFAULT '0',
  `CompareColor4` tinyint(4) NOT NULL DEFAULT '0',
  `CompareColor5` tinyint(4) NOT NULL DEFAULT '0',
  `f13_1` tinyint(4) NOT NULL DEFAULT '0',
  `f13_2` tinyint(4) NOT NULL DEFAULT '0',
  `Value1` int(11) NOT NULL DEFAULT '0',
  `Value2` int(11) NOT NULL DEFAULT '0',
  `Value3` int(11) NOT NULL DEFAULT '0',
  `Value4` int(11) NOT NULL DEFAULT '0',
  `Value5` int(11) NOT NULL DEFAULT '0',
  `f27` tinyint(4) NOT NULL DEFAULT '0',
  `f28` tinyint(4) NOT NULL DEFAULT '0',
  `f29` tinyint(4) NOT NULL DEFAULT '0',
  `f30` tinyint(4) NOT NULL DEFAULT '0',
  `f31` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spelllevels`
--

DROP TABLE IF EXISTS `spelllevels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelllevels` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT NULL COMMENT 'MoP',
  `f3` int(11) DEFAULT NULL COMMENT 'MoP',
  `BaseLevel` int(11) DEFAULT '0',
  `MaximumLevel` int(11) DEFAULT '0',
  `SpellLevel` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellmechanic`
--

DROP TABLE IF EXISTS `spellmechanic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellmechanic` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellmisc`
--

DROP TABLE IF EXISTS `spellmisc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellmisc` (
  `ID` int(11) NOT NULL,
  `f2` int(11) DEFAULT NULL,
  `f3` int(11) DEFAULT NULL,
  `Type0` int(11) DEFAULT NULL,
  `Type1` int(11) DEFAULT NULL,
  `Type2` int(11) DEFAULT NULL,
  `Type3` int(11) DEFAULT NULL,
  `Type4` int(11) DEFAULT NULL,
  `Type5` int(11) DEFAULT NULL,
  `Type6` int(11) DEFAULT NULL,
  `Type7` int(11) DEFAULT NULL,
  `Type8` int(11) DEFAULT NULL,
  `Type9` int(11) DEFAULT NULL,
  `Type10` int(11) DEFAULT NULL,
  `SpellCastTimesID` int(11) DEFAULT NULL,
  `SpellDurationID` int(11) DEFAULT NULL,
  `SpellRangeID` int(11) DEFAULT NULL,
  `f18` float DEFAULT NULL,
  `SpellVisualID` int(11) DEFAULT NULL,
  `f20` int(11) DEFAULT NULL,
  `SpellIconID` int(11) DEFAULT NULL,
  `f22` int(11) DEFAULT NULL,
  `SchoolMask` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellmissile`
--

DROP TABLE IF EXISTS `spellmissile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellmissile` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` float DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` int(11) DEFAULT '0',
  `f11` int(11) DEFAULT '0',
  `f12` float DEFAULT '0',
  `f13` float DEFAULT '0',
  `f14` float DEFAULT '0',
  `f15` float DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellmissilemotion`
--

DROP TABLE IF EXISTS `spellmissilemotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellmissilemotion` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` text,
  `f3` text,
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellpower`
--

DROP TABLE IF EXISTS `spellpower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellpower` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT NULL,
  `f3` int(11) DEFAULT NULL,
  `Absolute` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `Percent` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  `f9` int(11) DEFAULT '0',
  `f10` float DEFAULT '0' COMMENT 'Added 4.3',
  `f11` float DEFAULT NULL,
  `f12` int(11) DEFAULT NULL,
  `f13` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellradius`
--

DROP TABLE IF EXISTS `spellradius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellradius` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Radius` float DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT NULL COMMENT 'MoP\n',
  `f5` float DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `spellreagents`
--

DROP TABLE IF EXISTS `spellreagents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellreagents` (
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
  `f18` int(11) DEFAULT NULL,
  `f19` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellrunecost`
--

DROP TABLE IF EXISTS `spellrunecost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellrunecost` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0' COMMENT 'MoP',
  `f3` int(11) DEFAULT '0',
  `f4` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellscaling`
--

DROP TABLE IF EXISTS `spellscaling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellscaling` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `CastTimeStart` int(11) DEFAULT '0',
  `CastTimeEnd` int(11) DEFAULT '0',
  `Intervals` int(11) DEFAULT '0',
  `Distribution` int(11) DEFAULT '0',
  `Coefficient` float DEFAULT '0',
  `f7` int(11) DEFAULT '0' COMMENT 'Mainly 0, 80 for Deadly, Instant and Wound Poison',
  `f8` int(11) DEFAULT '0' COMMENT 'MoP',
  `f9` int(11) DEFAULT '0' COMMENT 'MoP',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellshapeshift`
--

DROP TABLE IF EXISTS `spellshapeshift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellshapeshift` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` int(11) DEFAULT '0',
  `SpellShapeshiftFormID` int(11) DEFAULT '0',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellshapeshiftform`
--

DROP TABLE IF EXISTS `spellshapeshiftform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellshapeshiftform` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `f2` int(11) DEFAULT '0',
  `f3` text,
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
  `f20` int(11) DEFAULT NULL,
  `f21` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spelltargetrestrictions`
--

DROP TABLE IF EXISTS `spelltargetrestrictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spelltargetrestrictions` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `Targets` float DEFAULT '0',
  `f2` int(11) DEFAULT '0' COMMENT 'MoP\n',
  `f3` int(11) DEFAULT '0' COMMENT 'MoP\n',
  `f4` int(11) DEFAULT '0' COMMENT 'MoP\n',
  `f5` int(11) DEFAULT '0',
  `f6` int(11) DEFAULT '0',
  `f7` int(11) DEFAULT '0',
  `f8` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spellvisual`
--

DROP TABLE IF EXISTS `spellvisual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spellvisual` (
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
  `f20` int(11) DEFAULT '0',
  `f21` int(11) DEFAULT '0',
  `f22` int(11) DEFAULT '0',
  `f23` int(11) DEFAULT '0',
  `f24` int(11) DEFAULT '0',
  `f25` int(11) DEFAULT '0',
  `f26` int(11) DEFAULT '0',
  `f27` float DEFAULT '0',
  `f28` int(11) DEFAULT '0',
  `f29` float DEFAULT '0',
  `f30` float DEFAULT '0',
  `f31` float DEFAULT '0',
  `f32` float DEFAULT '0',
  `f33` int(11) DEFAULT '0' COMMENT '4.10',
  `f34` int(11) DEFAULT '0',
  `f35` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `talent`
--

DROP TABLE IF EXISTS `talent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `talent` (
  `ID` int(11) NOT NULL DEFAULT '0',
  `PetID` int(11) DEFAULT NULL,
  `Row` int(11) DEFAULT NULL,
  `Column` int(11) DEFAULT NULL,
  `SpellID` int(11) DEFAULT NULL,
  `f6` int(11) DEFAULT NULL COMMENT 'Pet related',
  `PetMask1` int(11) DEFAULT NULL COMMENT 'Pet related',
  `PetMask2` int(11) DEFAULT NULL COMMENT 'Pet related',
  `CharacterClassID` int(11) DEFAULT NULL,
  `f10` int(11) DEFAULT NULL COMMENT 'Unknown',
  `f11` int(11) DEFAULT NULL COMMENT 'Never Set in 15589',
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

-- Dump completed on 2012-04-16 23:26:56
