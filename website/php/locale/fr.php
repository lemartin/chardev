<?php
/*
	$locale['a_quality'] = array('Mauvais','Commun','Inhabituel','Rare','Épique','légendaire','artefact','héritage');
	$locale['a_weapon'] = array('Haches','pugilat','Masses','d\'hast','Bâton','Epées','dagues');
	$locale['a_armor'] = array('Divers','Tissu','Cuir','Mailles','Plaques');
	$locale['a_slot'] = array('','Tête','Cou','Épaules','Chemise','Torse','Taille','Jambes','Pieds','Poignets','Mains','Doigt','Bijou','À une main','Bouclier','À distance','Dos','Deux mains','Sac','Tabard','Robe','Main droite','Main gauche','Tenu(e) en main gauche','Ammo','Armes de jet','À distance','','Relique','','','Doigt #2','Bijou #2');
	$locale['baseStats'] = array('','Vie','Mana','Agilité','Force','Intelligence','Esprit','Endurance');
	$locale['imprStats'] = array(	'le score de défense de $',
							   	'de $ le score d\'esquive',
								'de $ le score de parade',
								'la valeur de blocage de votre bouclier de $',
								'de $ le score de toucher de mêlée',
								'de $ le score de toucher de distance',
								'de $ le score de toucher des sorts',
								'de $ le score de coup critique de mêlée',
								'de $ le score de coup critique de distance',
								'de $ le score de coup critique des sorts',
								'Melee Hit Avoidance Rating',
								'Ranged Hit Avoidance Rating',
								'Spell Hit Avoidance Rating',
								'Melee Critical Avoidance Rating',
								'Ranged Critical Avoidance Rating',
								'Spell Critical Avoidance Rating',
								'de $ le score de hâte de mêlée',
								'de $ le score de hâte de distance',
								'de $ le score de hâte des sorts',
								'de $ le score de loucher',
								'de $ le score coup critique',
								'Hit Avoidance Rating',
								'Critical Avoidance Rating',
								'de $ le score de résilience',
								'de $ le score de hâte',
								'votre score d\'expertise de $',
								'de $ la puissance d\'attaque',
								'',
								'',
								'',
								'',
								'Rend $ points de mana toutes les 5 sec.',
								'de $ votre score de pénétration d\'armure',
								'de $ la puissance des sorts',
								'Rend $ points de vie toutes les 5 sec.',
								'la pénétration des sorts',
								'la valeur de blocage de votre bouclier');

	$locale['a_rating'] = array('defense','dodge','parry','block','melee hit','ranged hit','spell hit','melee crit','ranged crit','spell crit','','','','','','','melee haste','ranged haste','spell Haste','hit','critical strike','','','resilience','haste','expertise rating');
	$locale['a_socketColor']= array('','Méta','Rouge','Jaune','bleue');
	$locale['a_socket']=array('Méta-châsse','Châsse rouge','Châsse jaune','Châsse bleue');
	$locale['a_gem'] = array('rouge','bleue','jaune','purple','green','orange','méta','prismatic');
	$locale['a_stat']=array(6);
	$locale['a_stat'][0] = array('Force','Agilité','Endurance','Intelligence','Esprit','Armure');
	$locale['a_stat'][1] = array('Dégâts','Vitesse','Puissance','Critiques','Sc. toucher','Expertise');
	$locale['a_stat'][2] = array('Dégâts','Critiques','Sc. toucher','Puissance','Vitesse');
	$locale['a_stat'][3] = array('Dégâts','Critiques','Sc. toucher','Pénétration','Sc. hâte','Bon. soins');
	$locale['a_stat'][4] = array('Defense','Dodge','Parry','Block','Resilience');
	$locale['a_stat'][5] = array('Régén. Mana','Régé. Vie','Armure réd.','Armure péné.');
	$locale['a_statTitle'] = array('Caractéristiques','En mêlée','À distance','Sortilèges','Défenses','Divers');
	$locale['a_class'] = array('Guerrier','Paladin','Chasseur','Voleur','Prêtre','Chevalier de la mort','Chaman','Mage','Démoniste','','Druid');
	$locale['energy'] = array('Rage','Mana','Mana','Énergie','Mana','','Mana','Mana','Mana','',array('Mana','Rage','Énergie','Mana'));
	$locale['blacksmithingsocket'] = 'châsse de Forge';
	$locale['Gun'] = 'Fusils';
	$locale['Crossbow'] = 'Arbalètes';
	$locale['by'] = 'de';
	$locale['equip'] ='Équipé';
	$locale['use'] ='Utiliser';
	$locale['hit'] ='Chances quand vous touchez';
	$locale['bop']='Lié quand ramassé';
	$locale['boe']='Lié quand équipé';
	$locale['dura']='Durabilité';
	$locale['reqLevel']='Niveau $ requis';
	$locale['increases'] = 'Augmente ';
	$locale['armor']='Armure : $';
	$locale['block']='Bloquer : $';
	$locale['dps']='$ dégâts par seconde';
	$locale['dps2']='dps';
	$locale['damage']='Dégâts';
	$locale['Speed']='Vitesse';
	$locale['socketBonus']='Bonus de sertissage';
	$locale['set']='Ensemble';
	$locale['quality']='qualité';
	$locale['created']='created';//#####################################
	$locale['createOpts']=array('by other users','by myself');
	$locale['armortype']='armor type';//#####################################
	$locale['weapontype']='weapon type';//#####################################
	$locale['hand']='main';
	$locale['name']='nom';
	$locale['gems']='gemmes';
	
	$locale['ydRange']		= 'portée de $m';
	$locale['instantCast'] 	= 'Incantation immédiate';
	$locale['cooldown']	 	= 'de recharge';
	$locale['s']			= 'sec';
	$locale['m']			= 'min';
	$locale['h']			= 'houre';
	$locale['Rank']			= 'Rang';
	$locale['Nextrank']		= 'Prochain rang';
	$locale['Unique']		= 'Unique';
	$locale['Classes']		= 'Classes';
	$locale['History']		= 'Histoire';
	$locale['shieldBlock']	= 'Maîtrise de blocage';
	$locale['holyShield']	= 'Bouclier sacré';
	
	$locale['UniqueEquipped'] = 'Unique-Equipé';
	//
	//	new !
	//
	$locale['req']	 		= 'Requiert';
	$locale['pointsIn'] 	= 'points en';
	$locale['improve']='Augmente ';
	$locale['Durability']='Durabilité';
	$locale['Set']='Ensemble';
	$locale['Adds'] = 'Ajoute $ dégâts par seconde';
	//Resistance!
	$locale['a_resistance'] = array('à la résistance Sacré','à la résistance Feu','à la résistance Nature','à la résistance Givre','à la résistance Ombre','à la résistance Arcanes');
	$locale['a_damage'] = array('Holy Damage','Fire Damage','Nature Damage','Frost Damage','Shadow Damage','Arcane Damage');
	$locale['Resistance'] = 'Résistance';
	$locale['Cooldown']	 	= 'de recharge';
	$locale['BlockValue']='Valeur de blocage';
	$locale['Name']='Nom';
	$locale['Description']='Description';
	$locale['Server']='Royaume';
	$locale['Region']='Région';
	$locale['Send']='Envoyer';
	$locale['bySlot']='bySlot';
	$locale['item']='Objet';
	$locale['items']='Objetes';
	$locale['gem']='Gemme';
	$locale['enchant']='Enchantement';
	$locale['enchants']='Enchantement';
	$locale['next']='suivant';
	$locale['previous']='précédent';
	$locale['createdBy']='created by';
	$locale['enchantCreatedBy']='Enchantement created by';
	$locale['ObtainedByQuest']='Obtained by quest';
	$locale['show'] = 'montrer';
	$locale['hide'] = 'cacher';
	$locale['TalentPlanner'] = 'talent planner';//#####################################
	$locale['CharacterPlanner'] = 'character planner';//#####################################
	$locale['Database'] = 'Database';//#####################################
	$locale['About'] = 'about';//#####################################
	$locale['Donate'] = 'donate';
	$locale['CacheUpload'] = 'cache upload';//#####################################
	$locale['BaseStats'] = 'base stats';//#####################################
	$locale['reset'] = 'effacer';
	$locale['race'] = 'race';
	$locale['class'] = 'classe';
	$locale['of'] = 'of';//#####################################??????????????????????
	$locale['source'] = 'source';
	$locale['characterSheet']='character sheet';//#####################################
	$locale['talents']='talents';//#####################################
	$locale['armory']='armory';//#####################################
	$locale['save']='save';//#####################################
	$locale['browseProfiles']='browse profiles';//#####################################
	$locale['loading']='loading';//#####################################
	$locale['previewNote']='Left click to swap with equipped item, right click to remove preview';
	$locale['ofBaseMana'] = 'du mana de base';
	$locale['pointIn'] = 'point en';
	$locale['FeralAp'] = 'Augmente la puissance d\'attaque de $ seulement en forme de félin, ours, ours redoutable ou sélénien.';
	$locale['US']='US';
	$locale['Oceanic']='Océanie';
	$locale['Europe']='Europe';
	$locale['Korea']='Corée';
	$locale['Taiwan']='Taiwan';
	$locale['China']='Chine';
	$locale['level']='Niveau';
	$locale['RandomEnchantment'] = 'Enchantement aléatoire';
	$locale['Search'] = 'Search';//#####################################
	$locale['Login'] = 'login';//#####################################
	$locale['Logout'] = 'log out';
	
	$locale['db_Items'] = 'Items';
	$locale['db_Weapons'] = 'Weapons';
	$locale['db_Armor'] = 'Armor';
	$locale['db_Gems'] = 'Gems';
	$locale['One-Handed'] = 'À une main';
	$locale['Two-Handed'] = 'Deux mains';
	$locale['1H'] = '1h';
	$locale['2H'] = '2h';
	
	$locale['glyphs'] = 'Glyphes';
	$locale['a_reputation'] = array('Hated','Hostile','Unfriendly','Neutral','Friendly','Honored','Revered','Exalted');
	//
	//
	//
	$locale['itemlist_name'] = 'name';
	$locale['itemlist_dps'] = 'dps';
	$locale['itemlist_spd'] = 'spd';
	$locale['itemlist_level'] = 'level';
	$locale['itemlist_req'] = 'req';
	$locale['itemlist_type'] = 'type';
	$locale['itemlist_src'] = 'source';
	
	$locale['enchantlist_desc'] = 'description';
	$locale['enchantlist_source'] = 'source';
	$locale['enchantlist_character_level'] = 'req';
	$locale['enchantlist_item_level'] = 'ilvl';
	$locale['enchantlist_name'] = 'name';
	
	$locale['setlist_name'] = 'name';
	$locale['setlist_level'] = 'level';
	$locale['setlist_type'] = 'type';
	
	
	$locale['bufflist_name'] = 'name';
	$locale['bufflist_description'] = 'description';
	
	$locale['stat_tooltip_main_hand'] = "Main doite";
	$locale['stat_tooltip_off_hand'] = "Main gauche";
	$locale['stat_tooltip_damage_per_second'] = "Dégâts par seconde";
	$locale['stat_tooltip_haste'] = "hâte";
	$locale['stat_tooltip_haste_rating'] = "Score de hâte";
	
	$locale['buffs_type'] = "type";
	$locale['buffs_guardian_elixirs'] = "guardian elixirs";
	$locale['buffs_battle_elixirs'] = "battle elixirs";
	$locale['buffs_flasks'] = "flasks";
	$locale['buffs_blessings'] = "blessings";
	$locale['buffs_aspects'] = "aspects";
	$locale['buffs_food'] = "food";
	$locale['buffs_spells'] = "spells";

	$locale['select_a_class_first'] = 'Select a class first!';
	$locale['expertise_rating'] = 'Score d\'expertise'; 
	$locale['cast'] = '$ sec. d\'incantation';
	$locale['requires_point_in'] = 'Requiert 1 point in $.';
	$locale['requires_points_in'] = 'Requiert $ points en $.';
	$locale['requires_points_in_tree'] = 'Requiert $ points dans la branche $.';
	
	$locale['energy2'] = array('Mana','Rage','Focalisation','Énergie','?','??','Puissance runique');
	$locale['Blood'] = 'Sang';
	$locale['Unholy'] = 'Impie';
	$locale['Frost'] = 'Givre';
	$locale['Talents']='Talents';
	
	$locale['Attack_Power']='Puissance d\'attaque';
	$locale['Major_Glyph'] = 'Major Glyph';
	$locale['Minor_Glyph'] = 'Minor Glyph';
	$locale['Remaining_Points'] = 'Remaining Points: $';
	$locale['Required_Level'] = 'Required Level: $';
	$locale['select_compare_characters'] = 'Select the characters you wish to compare: ';
	$locale['save_active_character'] = 'Save the active character';
	$locale['import_character_from_armory'] = 'Import a character from the armory';
	$locale['Name'] = 'Name';
	$locale['Password'] = 'Password';
	$locale['New_Password']= 'New Password';
	$locale['Import'] = 'Import';
	$locale['User_name'] = 'User name';
	$locale['Items'] = 'Items';
	$locale['Sets'] = 'Sets';
	$locale['Enchants'] = 'Enchants';
	$locale['Gems'] = 'Gems';
	$locale['Material'] = 'Material';
	$locale['Overview'] = 'Overview';
	
	$locale['Edit'] = 'Edit';
	$locale['Browse'] = 'Browse';
	$locale['Compare'] = 'Compare';
	$locale['Save'] = 'Save';
	$locale['browse_chardev_characters'] = 'Browse chardev characters';
	$locale['click_on_slot_itemlist'] = 'Click on an inventory slot to search for items!';
	$locale['click_on_slot_enchantlist'] = 'Click on an equipped item to search for enchants!';
	$locale['click_on_slot_glyphlist'] = 'Click on one of the above glyph slots to search for glpyhs, be sure to have selected a class!';
	$locale['click_on_slot_gemtab'] = 'Click on an equipped item with sockets!';
	$locale['click_on_slot_gemlist'] = 'Click on one of the above sockets to search for fitting gems!';
	$locale['click_refresh'] = "Click refresh to start the search!";
	$locale['Nothing_found'] = 'Nothing found!';
	$locale['Equipped_gems'] = 'Equipped Gems: ';
	$locale['class_level_glyphtab'] = 'You have to select a class to add glyphs, remember glyph slots are not available until level 15!';
	$locale['select_a_random_enchant'] = 'Select a random enchant: ';
	$locale['Forum_Long'] = 'Help improving chardev by posting bugs, suggestions or impressions';
	$locale['Cache_Long'] = 'Upload your cache files to extend chardevs database';
	$locale['Home_Long'] = 'Announcements and News';
	$locale['import_profile'] = '[import]';
	$locale['delete_profile'] = '[delete]';
	$locale['Recover_Password'] = 'Recover your password';
	$locale['Repeat'] = 'Repeat';
	$locale['Password_and_repeat_differ'] = 'You have to enter the same password into the password and the repeat field!';
	$locale['Password_to_short'] = 'The password you\'ve entered is to short, it has to be at least 5 characters long!';
	$locale['Username_to_short'] = 'The user name you\'ve entered is to short, it has to be at least 4 characters long!';
	$locale['Invalid_email'] = 'The E-Mail address you\'ve entered is invalid';
	$locale['Username_invalid_characters'] = 'The user name you\'ve entered contains invalid characters!';
	$locale['Registration'] = 'Registration';
	$locale['Login'] = 'login';
	$locale['Logout'] = 'logout';
	$locale['sure_delete_profile'] = 'Do you really want to delete this profile?';
	$locale['All_Profiles'] = "All Profiles";
	$locale['My_Profiles'] = "My Profiles";
	$locale['save_as_new'] = "Save as new Profile";
	$locale['update_profile'] = "Update Profile";
	//
	//	account management
	//
	$locale["Account_Management"] = "Account Management";
	$locale['Forum_avatar'] = "Avatar";
	$locale['Language'] = "Language";
	$locale['a_lang'] = array("English","","French","German","","","Spanish","","Russian");
	$locale['Professions'] = "Professions";
	$locale['This_Item_Begins_a_Quest'] = "Cet objet permet de lancer une quête";
	//
	$locale['Heroic'] = "Héroïque";
	//
	$locale['About_Long'] = "about chardev";
	$locale['Donate_Long'] = "donate and support chardev";
	//
	$locale['Equipped_Items'] = "Equipped Items";
	$locale['Nothing_Equipped_Notice'] = "You have no items equipped!";
	$locale['Home'] = "home";
	$locale['Forum'] = "forum";
*/
?>