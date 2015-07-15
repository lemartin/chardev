-- MySQL dump 10.13  Distrib 5.1.41, for Win32 (ia32)
--
-- Host: localhost    Database: chardev_mop_static
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
-- Table structure for table `chardev_base_stats_class_level`
--

DROP TABLE IF EXISTS `chardev_base_stats_class_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_base_stats_class_level` (
  `class` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '0',
  `str` int(11) NOT NULL DEFAULT '0',
  `agi` int(11) NOT NULL DEFAULT '0',
  `sta` int(11) NOT NULL DEFAULT '0',
  `int` int(11) NOT NULL DEFAULT '0',
  `spi` int(11) NOT NULL DEFAULT '0',
  `hp` int(11) NOT NULL DEFAULT '0',
  `mp` int(11) NOT NULL DEFAULT '0',
  `melee_crit_per_agi` float NOT NULL DEFAULT '0',
  `spell_crit_per_int` float NOT NULL,
  `dodge_per_agi` float NOT NULL,
  `mana_regen` int(11) NOT NULL,
  PRIMARY KEY (`class`,`level`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_data_armory_profiles`
--

DROP TABLE IF EXISTS `chardev_data_armory_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_data_armory_profiles` (
  `name` varchar(120) NOT NULL,
  `realm` varchar(120) NOT NULL,
  `class` int(11) NOT NULL DEFAULT '0',
  `race` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '0',
  `xml` text,
  PRIMARY KEY (`name`,`realm`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_data_bnet_item`
--

DROP TABLE IF EXISTS `chardev_data_bnet_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_data_bnet_item` (
  `ItemID` int(11) NOT NULL,
  `XML` mediumtext,
  PRIMARY KEY (`ItemID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_data_bnet_profiles`
--

DROP TABLE IF EXISTS `chardev_data_bnet_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_data_bnet_profiles` (
  `name` varchar(120) NOT NULL,
  `url` varchar(256) NOT NULL,
  `class` int(11) NOT NULL DEFAULT '0',
  `race` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '0',
  `xml` longtext,
  PRIMARY KEY (`url`),
  KEY `class` (`class`),
  KEY `race` (`race`),
  KEY `level` (`level`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_data_character_names`
--

DROP TABLE IF EXISTS `chardev_data_character_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_data_character_names` (
  `name` varchar(120) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_data_dodge`
--

DROP TABLE IF EXISTS `chardev_data_dodge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_data_dodge` (
  `ChrRaceID` int(11) DEFAULT NULL,
  `ChrClassId` int(11) DEFAULT NULL,
  `Level` int(11) DEFAULT NULL,
  `DodgePerAgility` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_data_stats`
--

DROP TABLE IF EXISTS `chardev_data_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_data_stats` (
  `url` varchar(128) NOT NULL,
  `class` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `str` int(11) DEFAULT NULL,
  `agi` int(11) DEFAULT NULL,
  `sta` int(11) DEFAULT NULL,
  `int` int(11) DEFAULT NULL,
  `spi` int(11) DEFAULT NULL,
  `health` int(11) DEFAULT NULL,
  `manaRegen` int(11) DEFAULT NULL,
  `mana` int(11) DEFAULT NULL,
  `dodge` float DEFAULT NULL,
  `critPerAgi` float DEFAULT NULL,
  `spellCritPerInt` float DEFAULT NULL,
  `dodgeFromRating` float DEFAULT NULL,
  `totalAgility` int(11) DEFAULT NULL,
  `baseAgility` int(11) DEFAULT NULL,
  `additionalAgility` int(11) DEFAULT NULL,
  `dodgePerAgi` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_enchant_spell`
--

DROP TABLE IF EXISTS `chardev_enchant_spell`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_enchant_spell` (
  `SpellID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`SpellID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_item_stats`
--

DROP TABLE IF EXISTS `chardev_item_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_item_stats` (
  `ItemID` int(11) NOT NULL DEFAULT '0',
  `DoNotShow` tinyint(4) DEFAULT '0',
  `Strength` int(11) DEFAULT NULL,
  `Agility` int(11) DEFAULT NULL,
  `Stamina` int(11) DEFAULT NULL,
  `Intellect` int(11) DEFAULT NULL,
  `Spirit` int(11) DEFAULT NULL,
  `DPS` float DEFAULT NULL,
  `MinDamage` float DEFAULT NULL,
  `MaxDamage` float DEFAULT NULL,
  `Armor` int(11) DEFAULT NULL,
  `DodgeRating` int(11) DEFAULT NULL,
  `ParryRating` int(11) DEFAULT NULL,
  `BlockRating` int(11) DEFAULT NULL,
  `CritRating` int(11) DEFAULT NULL,
  `HitRating` int(11) DEFAULT NULL,
  `ResilienceRating` int(11) DEFAULT NULL,
  `HasteRating` int(11) DEFAULT NULL,
  `ExpertiseRating` int(11) DEFAULT NULL,
  `AttackPower` int(11) DEFAULT NULL,
  `ManaRegeneration` int(11) DEFAULT NULL,
  `SpellPower` int(11) DEFAULT NULL,
  `SpellPenetration` int(11) DEFAULT NULL,
  `MasteryRating` int(11) DEFAULT NULL,
  `PhysicalResistance` int(11) DEFAULT NULL,
  `FireResistance` int(11) DEFAULT NULL,
  `NatureResistance` int(11) DEFAULT NULL,
  `FrostResistance` int(11) DEFAULT NULL,
  `ShadowResistance` int(11) DEFAULT NULL,
  `ArcaneResistance` int(11) DEFAULT NULL,
  `NameEN` text,
  `NameFR` text,
  `NameDE` text,
  `NameES` text,
  `NameRU` text,
  `DescriptionEN` text,
  `DescriptionFR` text,
  `DescriptionDE` text,
  `DescriptionES` text,
  `DescriptionRU` text,
  `MinVersion` int(11) DEFAULT '0',
  `MaxVersion` int(11) DEFAULT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_itemrandomproperties`
--

DROP TABLE IF EXISTS `chardev_itemrandomproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_itemrandomproperties` (
  `ItemID` int(11) NOT NULL DEFAULT '0',
  `ItemRandomPropertiesID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ItemRandomPropertiesID`,`ItemID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_itemset_stats`
--

DROP TABLE IF EXISTS `chardev_itemset_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_itemset_stats` (
  `ItemSetID` int(11) NOT NULL,
  `MinItemLevel` int(11) DEFAULT NULL,
  `MaxItemLevel` int(11) DEFAULT NULL,
  `MinRequiredCharacterLevel` int(11) DEFAULT NULL,
  `MaxRequiredCharacterLevel` int(11) DEFAULT NULL,
  `MinQuality` int(11) DEFAULT NULL,
  `MaxQuality` int(11) DEFAULT NULL,
  `ChrClassMask` int(11) DEFAULT NULL,
  PRIMARY KEY (`ItemSetID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_random_properties`
--

DROP TABLE IF EXISTS `chardev_random_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_random_properties` (
  `ID` int(11) NOT NULL,
  `ItemRandomPropertiesID` int(11) NOT NULL,
  PRIMARY KEY (`ID`,`ItemRandomPropertiesID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_random_suffix`
--

DROP TABLE IF EXISTS `chardev_random_suffix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_random_suffix` (
  `ID` int(11) NOT NULL,
  `ItemRandomSuffixID` int(11) NOT NULL,
  PRIMARY KEY (`ID`,`ItemRandomSuffixID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chardev_spellinfo`
--

DROP TABLE IF EXISTS `chardev_spellinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chardev_spellinfo` (
  `SpellID` int(11) NOT NULL,
  `DescriptionEN` text,
  `DescriptionFR` text,
  `DescriptionDE` text,
  `DescriptionES` text,
  `DescriptionRU` text,
  `Scalable` tinyint(4) DEFAULT '0',
  `ElixirMask` int(11) DEFAULT '0',
  PRIMARY KEY (`SpellID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_current`
--

DROP TABLE IF EXISTS `item_current`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_current` (
  `ID` int(11) NOT NULL,
  `Version` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_working`
--

DROP TABLE IF EXISTS `item_working`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_working` (
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

-- Dump completed on 2012-04-16 23:27:08
