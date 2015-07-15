<?php
/*
	$locale['a_quality'] = array('poor','common','uncommon','rare','epic','legendary','artefact','heirloom');
	$locale['a_weapon'] = array('Топор','Кистевое','Дробящее','Древковое','Посох','Меч','Кинжал');
	$locale['a_armor'] = array('Разное','Ткань','Кожа','Кольчуга','Латы');
	$locale['a_slot'] = array('','Голова','Шея','Плечи','Рубашка','Грудь','Пояс','Ноги','Ступни','Запястья','Кисть руки','Палец','Аксессуар','Одноручный','Левая рука','Для дальнего боя','Спина','Двуручный','Bag','Гербовая накидка','Грудь','Правая рука','Левая рука','Держится в левой руке','Снаряд','Метательное оружие','Для дальнего боя','','Реликвия','','','Палец #2','Аксессуар #2');
	$locale['baseStats'] = array('','Здоровье','Мана','Ловкость','Сила','Интеллект','Дух','Выносливость');
	$locale['imprStats'] = array(	'повышает уровень защиты на $',
									'повышает уровень уворачивания на $',
									'повышает уровень парирования ударов на $',
									'повышает уровень отражения ударов на $',
									'Melee Hit Rating',
									'Ranged Hit Rating',
									'Spell Hit Rating',
									'Melee Critical Strike Rating',
									'Ranged Critical Strike Rating',
									'Spell Critical Strike Rating',
									'Melee Hit Avoidance Rating',
									'Ranged Hit Avoidance Rating',
									'Spell Hit Avoidance Rating',
									'Melee Critical Avoidance Rating',
									'Ranged Critical Avoidance Rating',
									'Spell Critical Avoidance Rating',
									'Melee Haste Rating',
									'Ranged Haste Rating',
									'Spell Haste Rating',
									'повышает уровень меткости на $',
									'повышает уровень вероятности критического удара на $',
									'Hit Avoidance Rating',
									'Critical Avoidance Rating',
									'повышает уровень стойкости на $',
									'повышает частоту ударов на $',
									'your expertise rating',
									'Увеличивает силу атаки на $.',
									'',
									'',
									'',
									'',
									'Восполнение $ ед. маны раз в 5 секунд.',
									'Увеличивает рейтинг пробивания брони на $.',
									'Увеличивает силу заклинаний на $.',
									'Восполнение $ ед. здоровья за 5 секунд.',
									'увеличивает проникающую способность заклинаний на $',
									'увеличивает показатель блокирования щита на $.');
	$locale['a_rating'] = array('defense','dodge','parry','block','melee hit','ranged hit','spell hit','melee crit','ranged crit','spell crit','','','','','','','melee haste','ranged haste','spell Haste','hit','critical strike','','','resilience','haste','expertise rating');
	$locale['a_socketColor']= array('','Мета','Красная','Желтая','Синяя');
	$locale['a_socket']=array('Мета-оправа','Красная оправа','Желтая оправа','Синяя оправа');
	$locale['a_gem'] = array('Красная','Синяя','Желтая','Фиолетовые','Зеленые','Оранжевые','Мета','Радужные');
	$locale['a_stat']=array(6);
	$locale['a_stat'][0] = array('Сила','Ловкость','Выносливость','Интеллект','Дух','Броня');
	$locale['a_stat'][1] = array('Урон','Скорость','Сила атаки','Критический','меткости','Мастерство');
	$locale['a_stat'][2] = array('Урон','Критический','меткости','Сила атаки','Скорость');
	$locale['a_stat'][3] = array('Урон','Критический','меткости','Проникающая','скорости боя','лечение');
	$locale['a_stat'][4] = array('Защита','Уклонение','Парирование','Блок','Устойчивость');
	$locale['a_stat'][5] = array('Восп. маны','восп. здоровья','Armor reduce','пробивания');
	$locale['a_statTitle'] = array('Баз. характеристики','Ближний бой','Дальний бой','Заклинания','Защита','различное');
	$locale['a_class'] = array('Воин','Паладин','Охотник','Разбойник','Жрец','Рыцарь смерти','Шаман','Маг','Чернокнижник','','Друид');
	$locale['energy'] 		= array('Rage','Мана','Мана','Energy','Мана','','Мана','Мана','Мана','',array('Мана','Rage','Energy','Мана'));
	$locale['blacksmithingsocket'] = 'Blacksmithing Socket';
	$locale['Gun'] = 'Gun';
	$locale['Crossbow'] = 'Crossbow';
	$locale['by'] = 'by';
	$locale['equip'] ='При надевании';
	$locale['use'] ='Использовать';
	$locale['hit'] ='Вероятность попадания при ударе';
	$locale['bop']='Становится персональным при получении';
	$locale['boe']='Bind on equip';
	$locale['reqLevel']='Требуемый уровень: $';
	$locale['increases'] = 'Increases ';
	$locale['armor']='$ Броня';
	$locale['block']='$ Способность отражать удары';
	$locale['dps']='$ Единиц урона в секунду';
	$locale['dps2']='dps';
	$locale['damage']='Урон';
	$locale['Speed']='Скорость';
	$locale['socketBonus']='Socket Bonus';
	$locale['quality']='quality';
	$locale['created']='created';
	$locale['createOpts']=array('by other users','by myself');
	$locale['armortype']='Тип';
	$locale['weapontype']='Тип';
	$locale['hand']='hand';
	$locale['name']='name';
	$locale['gems']='gems';
	$locale['ydRange']		= 'Радиус действия - $ м';
	$locale['instantCast'] 	= 'Мгновенное применение';
	$locale['cooldown']	 	= 'Время восстановления';
	$locale['s']			= 'сек.';
	$locale['m']			= 'мин.';
	$locale['h']			= 'час';
	$locale['Rank']			= 'Уровень';
	$locale['Nextrank']		= 'следующий Уровень';
	$locale['Unique']		= 'Уникальный';
	$locale['Classes']		= 'Классы';
	$locale['History']		= 'History';
	$locale['shieldBlock']	= 'shield block';
	$locale['holyShield']	= 'holy shield';
	$locale['UniqueEquipped'] = 'Становится персональным при получении';
	//
	//	new !
	//
	$locale['req']	= 'Требуется';
	$locale['pointsIn'] = 'очк. в';
	$locale['improve']='Improves';
	$locale['Durability']='Прочность';
	$locale['Set']='Комплект';
	$locale['Adds'] = 'Увеличивает $ урон в секунду';
	$locale['a_resistance'] = array('Holy Resistance','Сопротивляемость магии огня','Сопротивляемость природной магии','Сопротивляемость магии льда','Сопротивляемость темной магии','Сопротивляемость тайной магии');
	$locale['a_damage'] = array('Holy Damage','Fire Damage','Nature Damage','Frost Damage','Shadow Damage','Arcane Damage');
	$locale['Resistance'] = 'Сопротивляемость';
	$locale['Cooldown']='Время восстановления';
	$locale['BlockValue']='Block Value';
	$locale['Name']='Name';
	$locale['Description']='Description';
	$locale['Server']='Server';
	$locale['Region']='Region';
	$locale['Send']='Send';
	$locale['bySlot']='bySlot';
	$locale['item']='item';
	$locale['items']='items';
	$locale['gem']='gem';
	$locale['enchant']='enchant';
	$locale['enchants']='enchants';
	$locale['next']='next';
	$locale['previous']='previous';
	$locale['createdBy']='created by';
	$locale['enchantCreatedBy']='enchant created by';
	$locale['ObtainedByQuest']='Obtained by quest';
	$locale['show'] = 'show';
	$locale['hide'] = 'hide';
	$locale['TalentPlanner'] = 'talent planner';
	$locale['CharacterPlanner'] = 'character planner';
	$locale['Database'] = 'Database';
	$locale['About'] = 'about';
	$locale['Donate'] = 'donate';
	$locale['CacheUpload'] = 'cache upload';
	$locale['BaseStats'] = 'base stats';
	$locale['reset'] = 'reset';
	$locale['race'] = 'race';
	$locale['class'] = 'class';
	$locale['of'] = 'of';
	$locale['source'] = 'source';
	$locale['characterSheet']='character sheet';
	$locale['talents']='talents';
	$locale['armory']='armory';
	$locale['save']='save';
	$locale['browseProfiles']='browse profiles';
	$locale['loading']='loading';
	$locale['previewNote']='Left click to swap with equipped item, right click to remove preview';
	$locale['ofBaseMana'] = 'от базового запаса маны';
	$locale['pointIn'] = 'очк. в';
	$locale['FeralAp']=  'Увеличивает силу атаки на $ ед. в облике кошки, медведя, лютого медведя или лунного совуха.';
	$locale['US']='US';
	$locale['Oceanic']='Oceanic';
	$locale['Europe']='Europe';
	$locale['Korea']='Korea';
	$locale['Taiwan']='Taiwan';
	$locale['China']='China';
	$locale['level']='level';
	$locale['RandomEnchantment'] = 'Случайное заклинание';
	$locale['Search'] = 'Search';
	$locale['Login'] = 'login';
	$locale['Logout'] = 'log out';
	
	$locale['db_Items'] = 'Items';
	$locale['db_Weapons'] = 'Weapons';
	$locale['db_Armor'] = 'Armor';
	$locale['db_Gems'] = 'Gems';
	$locale['One-Handed'] = 'Одноручное';
	$locale['Two-Handed'] = 'Двуручное';
	$locale['1H'] = '1h';
	$locale['2H'] = '2h';
	
	$locale['glyphs'] = 'символы';
	$locale['a_reputation'] = array('Hated','Hostile','Unfriendly','Neutral','Friendly','Honored','Revered','Exalted');
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
	$locale['stat_tooltip_damage_per_second'] = "Damage per Second";
	$locale['stat_tooltip_haste'] = "Haste";
	$locale['stat_tooltip_haste_rating'] = "Haste Rating";
	
	$locale['buffs_type'] = "type";
	$locale['buffs_guardian_elixirs'] = "guardian elixirs";
	$locale['buffs_battle_elixirs'] = "battle elixirs";
	$locale['buffs_flasks'] = "flasks";
	$locale['buffs_blessings'] = "blessings";
	$locale['buffs_aspects'] = "aspects";
	$locale['buffs_food'] = "food";
	$locale['buffs_spells'] = "spells";

	$locale['select_a_class_first'] = 'Select a class first!';
	$locale['expertise_rating'] = 'Expertise Rating'; 
	$locale['cast'] = 'Применение: $  сек';
	$locale['requires_point_in'] = 'Требуется 1 очко, вложенное в $.';
	$locale['requires_points_in'] = 'Требуется $ очк., вложенных $.';
	$locale['requires_points_in_tree'] = 'Требуется $ очк., вложенных в $.';
	
	$locale['energy2'] = array('маны','rage','focus','energy','?','??','Сила рун');
	$locale['Blood'] = 'Кровь';
	$locale['Unholy'] = 'Нечестивость';
	$locale['Frost'] = 'Лед';
	$locale['Talents']='Таланты';
	
	$locale['Attack_Power']='силу атаки';
	$locale['Major_Glyph'] = 'Большой символ';
	$locale['Minor_Glyph'] = 'Малый символ';
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
	$locale['Professions'] = "профессии";
	$locale['This_Item_Begins_a_Quest'] = "Позволяет получить новое задание";
	//
	$locale['Heroic'] = "Героический";
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