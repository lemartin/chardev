<?php
	$js_files = array(
		array( "js/", "Chardev.js"),
		array( "js/", "Engine.js"),
	
		array( "js/common/", "Ajax.js"),
		array( "js/common/", "Globals.js"),
		array( "js/common/", "Handler.js"),
		array( "js/common/", "Listener.js"),
		array( "js/common/", "TextIO.js"),
		array( "js/common/", "Tools.js"),
		array( "js/common/", "GameInfo.js"),
		array( "js/common/", "LinkedList.js"),
		array( "js/common/", "Compression.js"),
		array( "js/common/", "NotImplementedException.js"),
		array( "js/common/", "IllegalArgumentException.js"),
		
		array( "js/events/", "GenericEvent.js"),
		array( "js/events/", "GenericSubject.js"),
		array( "js/events/", "GenericObserver.js"),

		array( "js/engine/", "CharacterIO.js"),
		array( "js/engine/", "DatabaseIO.js"),
		
		array( "js/engine/entities/", "Buff.js"),
		array( "js/engine/entities/", "Glyph.js"),
		array( "js/engine/entities/", "Item.js"),
		array( "js/engine/entities/", "Profession.js"),
		array( "js/engine/entities/", "Shapeform.js"),
		array( "js/engine/entities/", "SkillLine.js"),
		array( "js/engine/entities/", "SkillLineAbility.js"),
		array( "js/engine/entities/", "Spell.js"),
		array( "js/engine/entities/", "SpellItemEnchantment.js"),
		array( "js/engine/entities/", "Talent.js"),
		
		array( "js/engine/entities/spell/", "SpellEffect.js"),
		array( "js/engine/entities/spell/", "SpellEquippedItems.js"),
		array( "js/engine/entities/spell/", "SpellScaling.js"),
		array( "js/engine/entities/spell/", "SpellShapeshift.js"),
		array( "js/engine/entities/spell/", "SpellAuraOptions.js"),
		array( "js/engine/entities/spell/", "SpellClassOptions.js"),
		
		array( "js/engine/entities/item/", "Exceptions.js"),
		array( "js/engine/entities/item/", "GemProperties.js"),
		array( "js/engine/entities/item/", "ItemRandomEnchantment.js"),
		array( "js/engine/entities/item/", "ItemRandomProperty.js"),
		array( "js/engine/entities/item/", "ItemRandomSuffix.js"),
		array( "js/engine/entities/item/", "ItemSet.js"),
		
		
		array( "js/engine/container/", "Auras.js"),
		array( "js/engine/container/", "Buffs.js"),
		array( "js/engine/container/", "Glyphs.js"),
		array( "js/engine/container/", "Inventory.js"),
		array( "js/engine/container/", "Talents.js"),
		array( "js/engine/container/", "CharacterManager.js"),
		
		array( "js/engine/character/", "Character.js"),
		array( "js/engine/character/", "CharacterRace.js"),
		array( "js/engine/character/", "CharacterClass.js"),
		array( "js/engine/character/", "Stats.js"),
		
		array( "js/engine/cache/", "ItemCache.js"),
		array( "js/engine/cache/", "SpellCache.js"),
		
		
		array( "js/gui/", "DOM.js"),
		array( "js/gui/", "Gui.js"),
		
		array( "js/gui/static/", "Forum.js"),
		array( "js/gui/static/", "UserInformation.js"),
		array( "js/gui/static/", "PostEditableObserver.js"),
		array( "js/gui/static/", "AvatarPicker.js"),
		
		array( "js/gui/tooltip/", "ItemTooltip.js"),
		array( "js/gui/tooltip/", "SpellTooltip.js"),
		array( "js/gui/tooltip/", "Tooltip.js"),
		array( "js/gui/tooltip/", "StatTooltip.js"),
		array( "js/gui/tooltip/", "TalentTooltip.js"),
		
		array( "js/gui/character_sheet/", "BuffBar.js"),
		array( "js/gui/character_sheet/", "CharacterSheet.js"),
		array( "js/gui/character_sheet/", "ItemSlot.js"),
		array( "js/gui/character_sheet/", "PresenceSelector.js"),
		array( "js/gui/character_sheet/", "RaceClassSelector.js"),
		array( "js/gui/character_sheet/", "ShapeSelector.js"),
		array( "js/gui/character_sheet/", "Stat.js"),
		
		array( "js/gui/widgets/", "SimpleUserControl.js"),
			array( "js/gui/widgets/", "Input.js"),
			array( "js/gui/widgets/", "SingleSelect.js"),
		
		array( "js/gui/widgets/", "MultiSelect.js"),
		array( "js/gui/widgets/", "StaticGrid.js"),
		array( "js/gui/widgets/", "Collapsable.js"),
		array( "js/gui/widgets/", "LayeredDiv.js"),
		array( "js/gui/widgets/", "TabFolder.js"),
		array( "js/gui/widgets/", "Menu.js"),
		array( "js/gui/widgets/", "StackedDiv.js"),
		array( "js/gui/widgets/", "FilterableCollection.js"),
		array( "js/gui/widgets/", "BatchOperations.js"),
		
		array( "js/gui/widgets/editable/", "Editable.js"),
			array( "js/gui/widgets/editable/", "InputEditable.js"),
			array( "js/gui/widgets/editable/", "SelectEditable.js"),
			array( "js/gui/widgets/editable/", "BattleNetProfileEditable.js"),
			array( "js/gui/widgets/editable/", "PostEditable.js"),
		
		array( "js/gui/components/", "SocketInterface.js"),
		array( "js/gui/components/", "ReforgeInterface.js"),
		array( "js/gui/components/", "ReforgeSummary.js"),
		array( "js/gui/components/", "GlyphInterface.js"),
		array( "js/gui/components/", "RandomPropertyInterface.js"),
		array( "js/gui/components/", "ImportInterface.js"),
		array( "js/gui/components/", "SaveInterface.js"),
		array( "js/gui/components/", "BuffInterface.js"),
		array( "js/gui/components/", "Overview.js"),
		
		
		array( "js/adapter/", "CharacterCharacterSheetAdapter.js"),
		array( "js/adapter/", "EngineGuiAdapter.js"),
		array( "js/adapter/", "TalentsAdapter.js"),
		array( "js/adapter/static/", "ProfilesAdapter.js"),
		array( "js/adapter/facades/", "EquippedItem.js"),
		array( "js/adapter/facades/", "SocketedGem.js"),
		array( "js/adapter/facades/", "AvailableItemRandomEnchantment.js"),
		array( "js/adapter/facades/", "TalentsFacade.js"),
		array( "js/adapter/facades/", "TalentTreeFacade.js"),
		array( "js/adapter/facades/", "TalentFacade.js"),
		array( "js/adapter/facades/", "SpellFacade.js"),
		array( "js/adapter/facades/", "GlyphFacade.js"),
		array( "js/adapter/facades/", "CharacterFacade.js"),
		array( "js/adapter/facades/", "AvailableBuff.js"),
		array( "js/adapter/facades/", "AvailableShapeform.js"),
		array( "js/adapter/facades/", "AvailablePresence.js"),
		array( "js/adapter/facades/", "ActiveBuff.js"),
		
		array( "js/gui/list/filter/", "AbstractFilter.js"),
		array( "js/gui/list/filter/", "FilterData.js"),
		array( "js/gui/list/filter/", "FilterManager.js"),
		array( "js/gui/list/filter/", "InputFilter.js"),
		array( "js/gui/list/filter/", "RangeInputFilter.js"),
		array( "js/gui/list/filter/", "SingleSelectFilter.js"),
		array( "js/gui/list/filter/", "MultiselectFilter.js"),
		
		array( "js/gui/list/", "List.js"),
		array( "js/gui/list/", "ListGui.js"),
		array( "js/gui/list/", "ListBackEndProxy.js"),
		
		array( "js/gui/list/item_list/", "ItemList.js"),
		array( "js/gui/list/item_list/", "ItemListGui.js"),
		array( "js/gui/list/spell_list/", "SpellList.js"),
		array( "js/gui/list/spell_list/", "SpellListGui.js"),
		array( "js/gui/list/profile_list/", "ProfileList.js"),
		array( "js/gui/list/profile_list/", "ProfileListGui.js"),
		
		
		array( "js/gui/talents/", "TalentsGui.js"),
		array( "js/gui/talents/", "TalentIcon.js"),
	);
	
	$js_extern_files  = array(
		array( "js/common/extern/", "json2.js"),
		array( "js/common/extern/", "md5.js")
	);
?>