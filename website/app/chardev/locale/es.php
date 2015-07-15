<?php
/*
	$locale['a_quality'] = array('pobré','común','poco común','raro','épico','legendario','artefacto','reliquia');
	$locale['a_armor'] = array('Otro','Tela','Cuero','Malla','Placas');
	$locale['a_weapon'] = array('axe','fist','mace','polearm','staff','sword','dagger');
	$locale['a_slot'] = array('None','Cabeza','Cuello','Hombro','Camisa','Pecho','Cintura','Piernas','Pies','Muñeca','Manos','Dedo','Único','Una Mano','Escudo','A Distancia','Espalda','Dos Manos','Bolsa','Tabardo','Pecho','Mano derecha','Mano izquierdo','Held','Munnición','Thrown','A Distancia','A Distancia','Relic');
	$locale['baseStats'] = array('','Salud','Maná','Agilidad','Fortaleza','Intelecto','Espíritu','Aguante');
	$locale['imprStats'] = array('tu índice de defensa','tu índice de equivar','tu índice de parada','tu índice de bloqueo con escudo','índice de golpe cuerpo a cuerpo','tu índice de golpe a distancia','tu índice de golpe con hechizo','tu índice de golpe crítico cuerpo a cuerpo','tu índice de golpe crítico a distancia','tu índice de golpe crítico con hechizos','Melee Hit Avoidance Rating','Ranged Hit Avoidance Rating','Spell Hit Avoidance Rating','Melee Critical Avoidance Rating','Ranged Critical Avoidance Rating','Spell Critical Avoidance Rating','tu índice de celeridad cuerpo a cuerpo','tu índice de celeridad a distancia','tu índice de celeridad de hechizos','tu índice de golpe','tu índice de golpe crítico con hechizp','Hit Avoidance Rating','Critical Avoidance Rating','tu índice de temple','tu índice de celeridad','tu índice de pericia','el poder de ataque','','','','','Restaura $ p. de maná cada 5s.','tu índice de penetración de armadura','el poder con hechizos','Restaura $ p. de salud cada 5s.','tu penetración con hechizos','el valor de bloqueo de tu escudo');
	$locale['a_socketColor']= array('','meta','roja','amarilla','azul');
	$locale['a_socket']=array('Ranura meta','Ranura roja','Ranura amarilla','Ranura azul');
	$locale['a_gem'] = array('roja','azul','amarilla','morado','verde','naranja','meta','centelleante');
	$locale['a_rating'] = array('defense','dodge','parry','block','melee hit','ranged hit','spell hit','melee crit','ranged crit','spell crit','','','','','','','melee haste','ranged haste','spell Haste','hit','critical strike','','','resilience','haste','expertise rating');
	$locale['a_stat']=array(6);
	$locale['a_stat'][0] = array('Fuerza','Agilidad','Aguante','Intelecto','Espíritu','Armadura');
	$locale['a_stat'][1] = array('Daño','Veloc.','Poder ataque','Crítico','Golpe','Pericia');
	$locale['a_stat'][2] = array('Daño','Crítico','Golpe','Poder ataque','Veloc.');
	$locale['a_stat'][3] = array('Daño','Crítico','Golpe','Penetratión','Veloc.','Sanac.');
	$locale['a_stat'][4] = array('Defensa','Esquivar','Parar','Bloquear','Temple');
	$locale['a_stat'][5] = array('Reg. maná','Reg. salud','Armor reduce','Armor Penetr.');
	$locale['a_statTitle'] = array('Estadísticas básicas','Cuerpo a Cuerpo','A distancia','Hechizo','Defensa','Misceláneo');
	$locale['a_class'] = array('Guerrero','Paladín','Cazador','Pícaro','Sacerdote','Deathknight','Chamán','Mago','Brujo','','Druida');
	$locale['energy'] = array('de Ira','Maná','Maná','Energía','Maná','','Maná','Maná','Maná','',array('Maná','de Ira','Energía','Maná'));
	$locale['Gun'] = 'Gun';
	$locale['Crossbow'] = 'Crossbow';
	$locale['by'] = 'en';
	$locale['equip'] ='Equipar';
	$locale['use'] ='Uso';
	$locale['hit'] ='Probabilidad al golpear: ';
	$locale['bop']='Se liga al recogerlo';
	$locale['boe']='Se liga al equiparlo';
	$locale['reqLevel']='Necesitas ser de nivel $';
	$locale['increases']='Aumenta';
	$locale['armor']='$ Armadura';
	$locale['block']='$ bloqueo';
	$locale['dps']='$ daño por segundo';
	$locale['dps2']='dps';
	$locale['damage']='Daño';
	$locale['Speed']='Velocidad';
	$locale['socketBonus']='Bonus ranura';
	$locale['quality']='Calidad';
	$locale['created']='created';
	$locale['createOpts']=array('de otros','de mi');
	$locale['armortype']='categoría de armadura';
	$locale['weapontype']='categoría de arma';
	$locale['hand']='mano';
	$locale['name']='nombre';
	$locale['gems']='gemas';
	
	$locale['ydRange']	= '$m radio de alcance';
	$locale['blacksmithingsocket'] = 'Ranura de Herrería';
	$locale['instantCast'] 	= 'Hechizo Instantáneo';
	$locale['cooldown']	 	= 'regeneración';
	$locale['s']				= 's';
	$locale['m']				= 'min';
	$locale['h']				= 'hour';
	$locale['Rank']			= 'Rango';
	$locale['Nextrank']		= 'Siguiente rango';
	$locale['Unique']			= 'Único';
	$locale['Classes']		= 'Clases';
	$locale['History']		= 'History';
	$locale['shieldBlock']	= 'Bloqueo con escudo';
	$locale['holyShield']		= 'escudo sagrado';
	
	$locale['UniqueEquipped'] = 'Único-Equipado';
	$locale['FeralAp']		= 'Aumenta el poder de ataque $ p. solo con las formas de gato, oso, oso temible y lechúcico lunar.';
	//
	//	new !
	//
	$locale['req']	 = 'Requiere';
	$locale['pointsIn'] = ' puentos en';
	$locale['improve']='Aumenta';
	$locale['Durability']='Durabilidad';
	$locale['set']='Conjunto';
	$locale['Adds'] = 'Añade $ daño por segundo';
	$locale['a_resistance'] = array('resistencia a Sagrada','resistencia a Fuego','resistencia a Naturaleza','resistencia a Escarcha','resistencia a Sombras','resistencia a Arcano');
	$locale['a_damage'] = array('Holy Damage','Fire Damage','Nature Damage','Frost Damage','Shadow Damage','Arcane Damage');
	$locale['Resistance'] = 'resistencia';
	$locale['Cooldown']='tiempo de reutilizatión';
	$locale['BlockValue']='Valor de bloqueo';
	$locale['Name']='Nombre';
	$locale['Description']='Descripción';
	$locale['Server']='Reino';
	$locale['Region']='Región';
	$locale['Send']='Enviar';
	$locale['bySlot']='bySlot';
	$locale['item']='Objeto';
	$locale['items']='Objectos';
	$locale['gem']='Gema';
	$locale['enchant']='encantar';
	$locale['enchants']='encantar';
	$locale['next']='siguiente';
	$locale['previous']='anterior';
	$locale['createdBy']='created by';
	$locale['enchantCreatedBy']='encantar created by';
	$locale['ObtainedByQuest']='Obtained by quest';
	$locale['show'] = 'monstrar';
	$locale['hide'] = 'esconder';
	$locale['TalentPlanner'] = 'talent planner';
	$locale['CharacterPlanner'] = 'character planner';
	$locale['Database'] = 'Database';
	$locale['About'] = 'about';
	$locale['Donate'] = 'donate';
	$locale['CacheUpload'] = 'cache upload';
	$locale['BaseStats'] = 'base stats';
	$locale['reset'] = 'reinicinar';
	$locale['race'] = 'raza';
	$locale['class'] = 'clase';
	$locale['of'] = 'de';
	$locale['source'] = 'fuente';
	$locale['characterSheet']='character sheet';
	$locale['talents']='talents';
	$locale['armory']='armory';
	$locale['save']='save';
	$locale['browseProfiles']='browse profiles';
	$locale['loading']='loading';
	$locale['previewNote']='Left click to swap with equipped item, right click to remove preview';
	$locale['energy2'] = array('Maná','Ira','Enfoque','Energía','?','??','??');
	$locale['ofBaseMana'] = 'of base mana';
	$locale['pointIn'] = 'puento en';
	$locale['FeralAp']=  'Aumente el poder de ataque $ p. solo con las formas de gato, oso, oso temible y lechúcico lunar.';
	$locale['US']='EE.UU.';
	$locale['Oceanic']='Oceanía';
	$locale['Europe']='Europa';
	$locale['Korea']='Corea';
	$locale['Taiwan']='Taiwan';
	$locale['China']='China';
	$locale['level']='nive';
	$locale['RandomEnchantment'] = 'Encantamiento aleatorio';
	$locale['Search'] = 'Search';
	$locale['Login'] = 'login';
	$locale['Logout'] = 'log out';
	//	this\.([a-zA-Z1-9_]*)
	//	$locale['$1']
	
	$locale['db_Items'] = 'Items';
	$locale['db_Weapons'] = 'Weapons';
	$locale['db_Armor'] = 'Armor';
	$locale['db_Gems'] = 'Gems';
	$locale['One-Handed'] = 'One-Handed';
	$locale['Two-Handed'] = 'Two-Handed';
	$locale['1H'] = '1h';
	$locale['2H'] = '2h';
	
	$locale['glyphs'] = 'Glifos';
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
	
	$locale['stat_tooltip_main_hand'] = "Main Hand";
	$locale['stat_tooltip_off_hand'] = "Off Hand";
	$locale['stat_tooltip_damage_per_second'] = "Daño por segundo";
	$locale['stat_tooltip_haste'] = "Celeridad";
	$locale['stat_tooltip_haste_rating'] = "Índice de celeridad";
	
	$locale['buffs_type'] = "type";
	$locale['buffs_guardian_elixirs'] = "guardian elixirs";
	$locale['buffs_battle_elixirs'] = "battle elixirs";
	$locale['buffs_flasks'] = "flasks";
	$locale['buffs_blessings'] = "blessings";
	$locale['buffs_aspects'] = "aspects";
	$locale['buffs_food'] = "food";
	$locale['buffs_spells'] = "spells";

	$locale['select_a_class_first'] = 'Select a class first!';
	$locale['expertise_rating'] = 'Índice de pericia'; 
	$locale['cast'] = 'Lanzamiento de $ seg.';
	$locale['requires_point_in'] = 'Requiere 1 Punto en $.';
	$locale['requires_points_in'] = 'Requiere $ Puntos en $.';
	$locale['requires_points_in_tree'] = 'Requiere $ Puntos en talentos de $.';
	
	$locale['energy2'] = array('Maná','Ira','Enfoque','Energía','?','??','Poder rúnico');
	$locale['Blood'] = 'Sangre';
	$locale['Unholy'] = 'Profano';
	$locale['Frost'] = 'Escarcha';
	$locale['Talents']='Talentos';
	
	$locale['Attack_Power']='poder de ataque';
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
	$locale['This_Item_Begins_a_Quest'] = "Este objeto inicia una misión.";
	//
	$locale['Heroic'] = "Heroico";
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