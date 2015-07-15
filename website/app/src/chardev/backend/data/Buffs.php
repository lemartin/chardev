<?php
namespace chardev\backend\data;

use chardev\Language;

use chardev\backend\cache\Cache;

use chardev\backend\Constants;

class Buffs
{
	private static $instance = null;
	
	/**
	 *	@return Buffs
	 */
	public static function getInstance() {
		if( self::$instance == null ) {
			self::$instance = new Buffs();
		}
		return self::$instance;
	}
	
	protected function __construct() {
		//
	}
	
	public function get() {
		
		$key = get_class($this) . Language::getInstance()->toColumnSuffix();
		if( Constants::USE_CACHE && false !== ( $buffs = Cache::getInstance()->get( $key )  )) {
			return $buffs;
		}
		
		$sd = SpellData::getInstance();
		$id = ItemData::getInstance();
		
		$buffs = array();
		// Warrior
		$buffs["Warrior"] = array(
			$sd->fromId(29801),		// Rampage
			$sd->fromId(6673)		// Battle Shout
		);
		// Paladin
		$buffs["Paladin"] = array(
			$sd->fromId(465),		// Devotion Aura
			$sd->fromId(19891),	// Resistance Aura
			$sd->fromId(79062),	// Blessing of Kings
			$sd->fromId(79101),	// Blessing of Might
			$sd->fromId(84963), 	// Inquisition
			$sd->fromId(66011),	// Avenging Wrath
			$sd->fromId(86700),	// Ancient Power
			$sd->fromId(31801)	// Seal of Truth
		);
		// Hunter
		$buffs["Hunter"] = array(
			$sd->fromId(93435),	// Roar of Courage
			$sd->fromId(19506), 	// Trueshot Aura
			$sd->fromId(53290),	// Hunting Party
			$sd->fromId(13165)	// Aspect of the Hawk
		);
		// Rogue
		$buffs["Rogue"] = array(
			$sd->fromId(51701)	// Honor Among Thieves
		);
		// Priest
		$buffs["Priest"] = array(
			$sd->fromId(49868),	// Mind Quickening
			$sd->fromId(79104), 	// Power Word: Fortitude
			$sd->fromId(588),		// Inner Fire
			$sd->fromId(73413)	// Inner Will
		);
		// Death knight
		$buffs["DeathKnight"] = array(
			$sd->fromId(57330),	// Horn of Winter
			$sd->fromId(55610),	// Improved Icy Talons
			$sd->fromId(53138),	// Abomination's Might
			$sd->fromId(49016)	// Unholy Frenzy
		);
		// Shaman
		$buffs["Shaman"] = array(
			$sd->fromId(8076),	// Strength of Earth Totem
			$sd->fromId(51470),	// Elemental Oath
			$sd->fromId(8515),	// Windfury Totem
			$sd->fromId(2895), 	// Wrath of Air Totem
			$sd->fromId(52109),	// Flametongue Totem
			$sd->fromId(32182),	// Heroism
			$sd->fromId(30808),	// Unleashed Rages
			$sd->fromId(77747),	// Totemic Wrath
			$sd->fromId(52127)	// Water Shield
		);
		// Mage
		$buffs["Mage"] = array(
			$sd->fromId(80353), 	// Time warp
			$sd->fromId(79057),	// Arcane Brilliance
			$sd->fromId(30482)	// Molten Armor
		);
		// Warlock
		$buffs["Warlock"] = array(
			$sd->fromId(54424),	// Fel Intelligence
			$sd->fromId(6307), 	// Blood Pact
			$sd->fromId(53646),	// Demonic Pact
			$sd->fromId(28176),	// Fel Armor
			$sd->fromId(85767)	// Dark Intent
		);
		// Druid
		$buffs["Druid"] = array(
			$sd->fromId(79060), 	// Mark of the Wild
			$sd->fromId(24932),	// Leader of the Pack
			$sd->fromId(24907)	// Moonkin Aura
		);
	
		$buffs["Elixirs"] = array(
			$sd->fromId(6512),     // DETECT_LESSER_INVISIBILITY(0)
			$sd->fromId(7178),     // WATER_BREATHING(0)
			$sd->fromId(16589),     // NOGGENFOGGER_ELIXIR(0)
			$sd->fromId(11389),     // DETECT_UNDEAD(0)
			$sd->fromId(11403),     // DREAM_VISION(0)
			$sd->fromId(11407),     // DETECT_DEMON(0)
			$sd->fromId(22807),     // GREATER_WATER_BREATHING(0)
			$sd->fromId(28489),     // CAMOUFLAGE(0)
			$sd->fromId(28496),     // GREATER_STEALTH_DETECTION(0)
			$sd->fromId(7178),     // WATER_BREATHING(0)
			$sd->fromId(22807),     // GREATER_WATER_BREATHING(0)
			$sd->fromId(44467),     // RECOVERY_DIVERS_POTION(0)
			$sd->fromId(48719),     // WATER_BREATHING(0)
			$sd->fromId(65253),     // MIXTURE_OF_THE_FROST_WYRM(0)
			$sd->fromId(65255),     // MIXTURE_OF_STONEBLOOD(0)
			$sd->fromId(65252),     // MIXTURE_OF_ENDLESS_RAGE(0)
			$sd->fromId(65254),     // MIXTURE_OF_PURE_MOJO(0)
			$sd->fromId(59640),     // UNDERBELLY_ELIXIR(0)
			$sd->fromId(91722),     // PUFFER_BREATH(0)
			$sd->fromId(92679)     // FLASK_OF_BATTLE(0)
		);
		$buffs["BattleElixirs"] = array(
			$sd->fromId(2367),     // LESSER_STRENGTH(1)
			$sd->fromId(2374),     // LESSER_AGILITY(1)
			$sd->fromId(3160),     // AGILITY(1)
			$sd->fromId(3164),     // STRENGTH(1)
			$sd->fromId(7844),     // FIRE_POWER(1)
			$sd->fromId(8212),     // ENLARGE(1)
			$sd->fromId(11328),     // AGILITY(1)
			$sd->fromId(11390),     // ARCANE_ELIXIR(1)
			$sd->fromId(11334),     // GREATER_AGILITY(1)
			$sd->fromId(11405),     // ELIXIR_OF_THE_GIANTS(1)
			$sd->fromId(11406),     // ELIXIR_OF_DEMONSLAYING(1)
			$sd->fromId(11474),     // SHADOW_POWER(1)
			$sd->fromId(17038),     // WINTERFALL_FIREWATER(1)
			$sd->fromId(17535),     // ELIXIR_OF_THE_SAGES(1)
			$sd->fromId(17538),     // ELIXIR_OF_THE_MONGOOSE(1)
			$sd->fromId(17537),     // ELIXIR_OF_BRUTE_FORCE(1)
			$sd->fromId(17539),     // GREATER_ARCANE_ELIXIR(1)
			$sd->fromId(21920),     // FROST_POWER(1)
			$sd->fromId(24363),     // MAGEBLOOD_ELIXIR(1)
			$sd->fromId(26276),     // GREATER_FIREPOWER(1)
			$sd->fromId(28490),     // MAJOR_STRENGTH(1)
			$sd->fromId(28491),     // HEALING_POWER(1)
			$sd->fromId(28493),     // MAJOR_FROST_POWER(1)
			$sd->fromId(54494),     // MAJOR_AGILITY(1)
			$sd->fromId(28501),     // MAJOR_FIREPOWER(1)
			$sd->fromId(28503),     // MAJOR_SHADOW_POWER(1)
			$sd->fromId(28509),     // GREATER_MANA_REGENERATION(1)
			$sd->fromId(33720),     // ONSLAUGHT_ELIXIR(1)
			$sd->fromId(54452),     // ADEPTS_ELIXIR(1)
			$sd->fromId(33726),     // ELIXIR_OF_MASTERY(1)
			$sd->fromId(38954),     // FEL_STRENGTH_ELIXIR(1)
			$sd->fromId(39627),     // ELIXIR_OF_DRAENIC_WISDOM(1)
			$sd->fromId(45373),     // BLOODBERRY(1)
			$sd->fromId(28497),     // MIGHTY_AGILITY(1)
			$sd->fromId(53746),     // WRATH_ELIXIR(1)
			$sd->fromId(33721),     // SPELLPOWER_ELIXIR(1)
			$sd->fromId(53747),     // ELIXIR_OF_SPIRIT(1)
			$sd->fromId(53748),     // MIGHTY_STRENGTH(1)
			$sd->fromId(53749),     // GURUS_ELIXIR(1)
			$sd->fromId(53764),     // MIGHTY_MANA_REGENERATION(1)
			$sd->fromId(60340),     // ACCURACY(1)
			$sd->fromId(60341),     // DEADLY_STRIKES(1)
			$sd->fromId(60344),     // EXPERTISE(1)
			$sd->fromId(80532),     // ARMOR_PIERCING(1)
			$sd->fromId(60346),     // LIGHTNING_SPEED(1)
			$sd->fromId(63729),     // ELIXIR_OF_MINOR_ACCURACY(1)
			$sd->fromId(79468),     // GHOST_ELIXIR(1)
			$sd->fromId(79474),     // ELIXIR_OF_THE_NAGA(1)
			$sd->fromId(79477),     // ELIXIR_OF_THE_COBRA(1)
			$sd->fromId(79481),     // IMPOSSIBLE_ACCURACY(1)
			$sd->fromId(79632),     // MIGHTY_SPEED(1)
			$sd->fromId(79635)     // ELIXIR_OF_THE_MASTER(1)
		);
		$buffs["GuardianElixirs"] = array(
			$sd->fromId(2378),     // HEALTH(2)
			$sd->fromId(3219),     // WEAK_TROLLS_BLOOD_ELIXIR(2)
			$sd->fromId(3166),     // LESSER_INTELLECT(2)
			$sd->fromId(3222),     // STRONG_TROLLS_BLOOD_ELIXIR(2)
			$sd->fromId(3220),     // ARMOR(2)
			$sd->fromId(3593),     // ELIXIR_OF_FORTITUDE(2)
			$sd->fromId(3223),     // MAJOR_TROLLS_BLOOD_ELIXIR(2)
			$sd->fromId(673),     // LESSER_ARMOR(2)
			$sd->fromId(11319),     // WATER_WALKING(2)
			$sd->fromId(11349),     // ARMOR(2)
			$sd->fromId(11371),     // GIFT_OF_ARTHAS(2)
			$sd->fromId(11396),     // GREATER_INTELLECT(2)
			$sd->fromId(12608),     // STEALTH_DETECTION(2)
			$sd->fromId(11348),     // GREATER_ARMOR(2)
			$sd->fromId(24361),     // MIGHTY_TROLLS_BLOOD_ELIXIR(2)
			$sd->fromId(28502),     // MAJOR_ARMOR(2)
			$sd->fromId(28514),     // EMPOWERMENT(2)
			$sd->fromId(29348),     // GOLDENMIST_SPECIAL_BREW(2)
			$sd->fromId(39625),     // ELIXIR_OF_MAJOR_FORTITUDE(2)
			$sd->fromId(39626),     // EARTHEN_ELIXIR(2)
			$sd->fromId(39628),     // ELIXIR_OF_IRONSKIN(2)
			$sd->fromId(53751),     // ELIXIR_OF_MIGHTY_FORTITUDE(2)
			$sd->fromId(53763),     // PROTECTION(2)
			$sd->fromId(60343),     // MIGHTY_DEFENSE(2)
			$sd->fromId(60347),     // MIGHTY_THOUGHTS(2)
			$sd->fromId(79480),     // ELIXIR_OF_DEEP_EARTH(2)
			$sd->fromId(79631)     // PRISMATIC_ELIXIR(2)
		);
		$buffs["Flasks"] = array(
			$sd->fromId(17626),     // FLASK_OF_THE_TITANS(3)
			$sd->fromId(17627),     // DISTILLED_WISDOM(3)
			$sd->fromId(17628),     // SUPREME_POWER(3)
			$sd->fromId(17629),     // CHROMATIC_RESISTANCE(3)
			$sd->fromId(28518),     // FLASK_OF_FORTIFICATION(3)
			$sd->fromId(28519),     // FLASK_OF_MIGHTY_RESTORATION(3)
			$sd->fromId(28520),     // FLASK_OF_RELENTLESS_ASSAULT(3)
			$sd->fromId(28521),     // FLASK_OF_BLINDING_LIGHT(3)
			$sd->fromId(28540),     // FLASK_OF_PURE_DEATH(3)
			$sd->fromId(40568),     // UNSTABLE_FLASK_OF_THE_ELDER(3)
			$sd->fromId(40575),     // UNSTABLE_FLASK_OF_THE_SOLDIER(3)
			$sd->fromId(40572),     // UNSTABLE_FLASK_OF_THE_BEAST(3)
			$sd->fromId(40567),     // UNSTABLE_FLASK_OF_THE_BANDIT(3)
			$sd->fromId(40573),     // UNSTABLE_FLASK_OF_THE_PHYSICIAN(3)
			$sd->fromId(40576),     // UNSTABLE_FLASK_OF_THE_SORCERER(3)
			$sd->fromId(28518),     // FLASK_OF_FORTIFICATION(3)
			$sd->fromId(28520),     // FLASK_OF_RELENTLESS_ASSAULT(3)
			$sd->fromId(28519),     // FLASK_OF_MIGHTY_RESTORATION(3)
			$sd->fromId(17628),     // SUPREME_POWER(3)
			$sd->fromId(41609),     // FORTIFICATION_OF_SHATTRATH(3)
			$sd->fromId(41610),     // MIGHTY_RESTORATION_OF_SHATTRATH(3)
			$sd->fromId(41611),     // SUPREME_POWER_OF_SHATTRATH(3)
			$sd->fromId(41608),     // RELENTLESS_ASSAULT_OF_SHATTRATH(3)
			$sd->fromId(42735),     // CHROMATIC_WONDER(3)
			$sd->fromId(46837),     // PURE_DEATH_OF_SHATTRATH(3)
			$sd->fromId(46839),     // BLINDING_LIGHT_OF_SHATTRATH(3)
			$sd->fromId(53752),     // LESSER_FLASK_OF_TOUGHNESS(3)
			$sd->fromId(62380),     // LESSER_FLASK_OF_RESISTANCE(3)
			$sd->fromId(53760),     // FLASK_OF_ENDLESS_RAGE(3)
			$sd->fromId(54212),     // FLASK_OF_PURE_MOJO(3)
			$sd->fromId(53758),     // FLASK_OF_STONEBLOOD(3)
			$sd->fromId(53755),     // FLASK_OF_THE_FROST_WYRM(3)
			$sd->fromId(53755),     // FLASK_OF_THE_FROST_WYRM(3)
			$sd->fromId(53760),     // FLASK_OF_ENDLESS_RAGE(3)
			$sd->fromId(54212),     // FLASK_OF_PURE_MOJO(3)
			$sd->fromId(53758),     // FLASK_OF_STONEBLOOD(3)
			$sd->fromId(67019),     // FLASK_OF_THE_NORTH(3)
			$sd->fromId(79469),     // FLASK_OF_STEELSKIN(3)
			$sd->fromId(79470),     // FLASK_OF_THE_DRACONIC_MIND(3)
			$sd->fromId(79471),     // FLASK_OF_THE_WINDS(3)
			$sd->fromId(79472),     // FLASK_OF_TITANIC_STRENGTH(3)
			$sd->fromId(79637),     // FLASK_OF_ENHANCEMENT(3)
			$sd->fromId(94160),     // FLASK_OF_FLOWING_WATER(3)
		);
	
		$buffs["Food"] = array(
			$id->fromId(64641),    //"Delicious" Worm Steak
			$id->fromId(62671),    //Severed Sagefish Head
			$id->fromId(62670),    //Beer-Basted Crocolisk
			$id->fromId(62669),    //Skewered Eel
			$id->fromId(62668),    //Blackbelly Sushi
			$id->fromId(62667),    //Mushroom Sauce Mudfish
			$id->fromId(62666),    //Delicious Sagefish Tail
			$id->fromId(62665),    //Basilisk Liverdog
			$id->fromId(62664),    //Crocolisk Au Gratin
			$id->fromId(62663),    //Lavascale Minestrone
			$id->fromId(62662),    //Grilled Dragon
			$id->fromId(62661),    //Baked Rockfish
			$id->fromId(62660),    //Pickled Guppy
			$id->fromId(62659),    //Hearty Seafood Soup
			$id->fromId(62658),    //Tender Baked Turtle
			$id->fromId(62657),    //Lurker Lunch
			$id->fromId(62656),    //Whitecrest Gumbo
			$id->fromId(62655),    //Broiled Mountain Trout
			$id->fromId(62654),    //Lavascale Fillet
			$id->fromId(62653),    //Salted Eye
			$id->fromId(62652),    //Seasoned Crab
			$id->fromId(62651),    //Lightly Fried Lurker
			$id->fromId(62649),    //Fortune Cookie
			$id->fromId(62290),    //Seafood Magnifique Feast
			$id->fromId(62289),    //Broiled Dragon Feast
			$id->fromId(60858),    //Goblin Barbecue
			$id->fromId(57519),    //Cookie's Special Ramlette
			$id->fromId(46887),    //Bountiful Feast
			$id->fromId(46691),    //Bread of the Dead
			$id->fromId(46403),    //Chuganpug's Delight
			$id->fromId(46402),    //Promise of the Pandaren
			$id->fromId(46401),    //Crimson Stripe
			$id->fromId(46400),    //Barleybrew Gold
			$id->fromId(46399),    //Thunder's Plunder
			$id->fromId(46392),    //Venison Steak
			$id->fromId(45279),    //Jillian's Gourmet Fish Feast
			$id->fromId(44953),    //Worg Tartare
			$id->fromId(44840),    //Cranberry Chutney
			$id->fromId(44839),    //Candied Sweet Potato
			$id->fromId(44838),    //Slow-Roasted Turkey
			$id->fromId(44837),    //Spice Bread Stuffing
			$id->fromId(44836),    //Pumpkin Pie
			$id->fromId(44791),    //Noblegarden Chocolate
			$id->fromId(43652),    //Slippery Eel
			$id->fromId(43268),    //Dalaran Clam Chowder
			$id->fromId(43015),    //Fish Feast
			$id->fromId(43001),    //Tracker Snacks
			$id->fromId(43000),    //Dragonfin Filet
			$id->fromId(42999),    //Blackened Dragonfin
			$id->fromId(42998),    //Cuttlesteak
			$id->fromId(42997),    //Blackened Worg Steak
			$id->fromId(42996),    //Snapper Extreme
			$id->fromId(42995),    //Hearty Rhino
			$id->fromId(42994),    //Rhinolicious Wormsteak
			$id->fromId(42993),    //Spicy Fried Herring
			$id->fromId(42942),    //Baked Manta Ray
			$id->fromId(42779),    //Steaming Chicken Soup
			$id->fromId(39691),    //Succulent Orca Stew
			$id->fromId(35563),    //Charred Bear Kabobs
			$id->fromId(34769),    //Imperial Manta Steak
			$id->fromId(34768),    //Spicy Blue Nettlefish
			$id->fromId(34767),    //Firecracker Salmon
			$id->fromId(34766),    //Poached Northern Sculpin
			$id->fromId(34765),    //Pickled Fangtooth
			$id->fromId(34764),    //Poached Nettlefish
			$id->fromId(34763),    //Smoked Salmon
			$id->fromId(34762),    //Grilled Sculpin
			$id->fromId(34758),    //Mighty Rhino Dogs
			$id->fromId(34757),    //Very Burnt Worg
			$id->fromId(34756),    //Spiced Worm Burger
			$id->fromId(34755),    //Tender Shoveltusk Steak
			$id->fromId(34754),    //Mega Mammoth Meal
			$id->fromId(34753),    //Great Feast
			$id->fromId(34752),    //Rhino Dogs
			$id->fromId(34751),    //Roasted Worg
			$id->fromId(34750),    //Worm Delight
			$id->fromId(34749),    //Shoveltusk Steak
			$id->fromId(34748),    //Mammoth Meal
			$id->fromId(34412),    //Sparkling Apple Cider
			$id->fromId(34411),    //Hot Apple Cider
			$id->fromId(34410),    //Honeyed Holiday Ham
			$id->fromId(34125),    //Shoveltusk Soup
			$id->fromId(34065),    //Spiced Onion Cheese
			$id->fromId(34064),    //Succulent Sausage
			$id->fromId(34063),    //Dried Sausage
			$id->fromId(34022),    //Stout Shrunken Head
			$id->fromId(34021),    //Brewdoo Magic
			$id->fromId(34020),    //Jungle River Water
			$id->fromId(34019),    //Path of Brew
			$id->fromId(34018),    //Long Stride Brew
			$id->fromId(34017),    //Small Step Brew
			$id->fromId(33872),    //Spicy Hot Talbuk
			$id->fromId(33867),    //Broiled Bloodfin
			$id->fromId(33052),    //Fisherman's Feast
			$id->fromId(33043),    //The Essential Brewfest Pretzel
			$id->fromId(33036),    //Mudder's Milk
			$id->fromId(33035),    //Ogre Mead
			$id->fromId(33034),    //Gordok Grog
			$id->fromId(33033),    //Thunderbrew Stout
			$id->fromId(33032),    //Thunderbrew Ale
			$id->fromId(33031),    //Thunder 45
			$id->fromId(33030),    //Barleybrew Clear
			$id->fromId(33029),    //Barleybrew Dark
			$id->fromId(33028),    //Barleybrew Light
			$id->fromId(33026),    //The Golden Link
			$id->fromId(33025),    //Spicy Smoked Sausage
			$id->fromId(33024),    //Pickled Sausage
			$id->fromId(33023),    //Savory Sausage
			$id->fromId(33004),    //Clamlette Magnifique
			$id->fromId(32721),    //Skyguard Rations
			$id->fromId(31673),    //Crunchy Serpent
			$id->fromId(31672),    //Mok'Nathal Shortribs
			$id->fromId(30361),    //Oronok's Tuber of Spell Power
			$id->fromId(30359),    //Oronok's Tuber of Strength
			$id->fromId(30358),    //Oronok's Tuber of Agility
			$id->fromId(30357),    //Oronok's Tuber of Healing
			$id->fromId(30155),    //Clam Bar
			$id->fromId(29292),    //Helboar Bacon
			$id->fromId(27667),    //Spicy Crawdad
			$id->fromId(27666),    //Golden Fish Sticks
			$id->fromId(27665),    //Poached Bluefish
			$id->fromId(27664),    //Grilled Mudfish
			$id->fromId(27663),    //Blackened Sporefish
			$id->fromId(27662),    //Feltail Delight
			$id->fromId(27660),    //Talbuk Steak
			$id->fromId(27659),    //Warp Burger
			$id->fromId(27658),    //Roasted Clefthoof
			$id->fromId(27657),    //Blackened Basilisk
			$id->fromId(27655),    //Ravager Dog
			$id->fromId(27651),    //Buzzard Bites
			$id->fromId(27636),    //Bat Bites
			$id->fromId(27635),    //Lynx Steak
			$id->fromId(24540),    //Edible Fern
			$id->fromId(24539),    //Marsh Lichen
			$id->fromId(24105),    //Roasted Moongraze Tenderloin
			$id->fromId(23756),    //Cookie's Jumbo Gumbo
			$id->fromId(22645),    //Crunchy Spider Surprise
			$id->fromId(22239),    //Sweet Surprise
			$id->fromId(22238),    //Very Berry Cream
			$id->fromId(22237),    //Dark Desire
			$id->fromId(22236),    //Buttermilk Delight
			$id->fromId(21254),    //Winter Veil Cookie
			$id->fromId(21217),    //Sagefish Delight
			$id->fromId(21072),    //Smoked Sagefish
			$id->fromId(21023),    //Dirge's Kickin' Chimaerok Chops
			$id->fromId(20516),    //Bobbing Apple
			$id->fromId(20452),    //Smoked Desert Dumplings
			$id->fromId(20074),    //Heavy Crocolisk Stew
			$id->fromId(18045),    //Tender Wolf Steak
			$id->fromId(17222),    //Spider Sausage
			$id->fromId(17198),    //Egg Nog
			$id->fromId(17197),    //Gingerbread Cookie
			$id->fromId(16971),    //Clamlette Surprise
			$id->fromId(13851),    //Hot Wolf Ribs
			$id->fromId(12224),    //Crispy Bat Wing
			$id->fromId(12218),    //Monster Omelet
			$id->fromId(12216),    //Spiced Chili Crab
			$id->fromId(12215),    //Heavy Kodo Stew
			$id->fromId(12214),    //Mystery Stew
			$id->fromId(12213),    //Carrion Surprise
			$id->fromId(12212),    //Jungle Stew
			$id->fromId(12210),    //Roast Raptor
			$id->fromId(12209),    //Lean Wolf Steak
			$id->fromId(11584),    //Cactus Apple Surprise
			$id->fromId(7808),    //Chocolate Square
			$id->fromId(7807),    //Candy Bar
			$id->fromId(7806),    //Lollipop
			$id->fromId(6888),    //Herb Baked Egg
			$id->fromId(6038),    //Giant Clam Scorcho
			$id->fromId(5527),    //Goblin Deviled Clams
			$id->fromId(5525),    //Boiled Clams
			$id->fromId(5480),    //Lean Venison
			$id->fromId(5479),    //Crispy Lizard Tail
			$id->fromId(5477),    //Strider Stew
			$id->fromId(5476),    //Fillet of Frenzy
			$id->fromId(5474),    //Roasted Kodo Meat
			$id->fromId(5472),    //Kaldorei Spider Kabob
			$id->fromId(4457),    //Barbecued Buzzard Wing
			$id->fromId(3729),    //Soothing Turtle Bisque
			$id->fromId(3728),    //Tasty Lion Steak
			$id->fromId(3727),    //Hot Lion Chops
			$id->fromId(3726),    //Big Bear Steak
			$id->fromId(3666),    //Gooey Spider Cake
			$id->fromId(3665),    //Curiously Tasty Omelet
			$id->fromId(3664),    //Crocolisk Gumbo
			$id->fromId(3663),    //Murloc Fin Soup
			$id->fromId(3662),    //Crocolisk Steak
			$id->fromId(3220),    //Blood Sausage
			$id->fromId(2888),    //Beer Basted Boar Ribs
			$id->fromId(2687),    //Dry Pork Ribs
			$id->fromId(2684),    //Coyote Steak
			$id->fromId(2683),    //Crab Cake
			$id->fromId(2680),    //Spiced Wolf Meat
			$id->fromId(1082),    //Redridge Goulash
			$id->fromId(1017),    //Seasoned Wolf Kabob
			$id->fromId(724)    //Goretusk Liver Pie
		);
		
		if( Constants::USE_CACHE ) {
			Cache::getInstance()->set($key, $buffs);
		}
	
		return $buffs;
	}
}

?>