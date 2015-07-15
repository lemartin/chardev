package org.chardev.cjt.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Java port of php/tools/update_items.php
 * 
 * Updates <code>chardev_mop.item_sparse</code> with the currently
 * available and up to date items and sets additional cached item data in
 * <code>chardev_mop_static.chardev_item_stats</code>
 * 
 * @author LeMartin
 * 
 */
public class UpdateCachedItemTables {

	public static void main(String[] args) {
		new UpdateCachedItemTables(
				ConnectionFactory.getStatic(), 
				ConnectionFactory.getLocale());
	}

	protected final Connection connectionStaticDB, connectionLocaleDB;

	/**
	 * Updates <code>chardev_mop.item_sparse</code> with the currently
	 * available and up to date items.
	 * 
	 * @param connectionStaticDB
	 * @param connectionLocaleDB
	 */
	public UpdateCachedItemTables(Connection connectionStaticDB,
			Connection connectionLocaleDB) {
		String[] indexToSuffix = new String[] { "EN", "FR", "DE", "ES", "RU" };
		//
		this.connectionStaticDB = connectionStaticDB;
		this.connectionLocaleDB = connectionLocaleDB;
		//
		// cache the current version of each item
		this.setItemCurrent();
		//
		//
		try {
			int n = 0;
			
			Statement tstmt = connectionLocaleDB.createStatement();
			tstmt.execute("TRUNCATE TABLE chardev_mop.`item_sparse`"); 
			//
			// Prepare some statements for reuse
			PreparedStatement gemPropertiesStatement = connectionLocaleDB
					.prepareStatement("SELECT * FROM `gemproperties` WHERE `ID`=?");
			PreparedStatement nameStatement = connectionStaticDB
					.prepareStatement("SELECT Name,Description FROM item_working WHERE `Locale`=? AND `ID`=? ORDER BY `Version` DESC");
			PreparedStatement copyStatement = connectionLocaleDB
					.prepareStatement("REPLACE INTO chardev_mop.`item_sparse` SELECT * FROM chardev_mop_static.`item_working` WHERE `Locale`=? AND `Version`=? AND `ID`=?");

			PreparedStatement insertStatement = connectionStaticDB
					.prepareStatement("REPLACE INTO `chardev_item_stats` values (?,0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0)");
			//
			// Queries the most up to date items from the db
			Statement stmt = connectionStaticDB.createStatement();
			ResultSet result = stmt
					.executeQuery("SELECT * "
							+ "FROM chardev_mop_static.`item_working` s "
							+ "INNER JOIN chardev_mop.`item` i ON i.`ID` = s.`ID` "
							+ "INNER JOIN chardev_mop_static.`item_current` c ON c.`ID`=s.`ID` AND c.`Version` = s.`Version` "
							+ "WHERE `Locale`='EN' ORDER BY i.`ID` ASC");
			//
			// Iterate over the result
			while (result.next()) {
				//
				// cache required fields
				final int id = result.getInt("ID");
				final int itemClass = result.getInt("ItemClass");
				final int itemSubClass = result.getInt("ItemSubClass");
				final int itemSlot = result.getInt("InventorySlot");
				final int itemLevel = result.getInt("Level");
				final int itemQuality = result.getInt("Quality");
				final int typeMask2 = result.getInt("TypeMask2");
				final int level = result.getInt("Level");
				final int quality = result.getInt("Quality");
				final int version = result.getInt("Version");
				final String locale = result.getString("Locale");
				final int armor = Items.getArmor(connectionLocaleDB, itemClass,
						itemSubClass, itemSlot, itemLevel, itemQuality);
				final int itemSubClassMask = 1 << itemSubClass;
				//
				//
				int[] itemStats = new int[58];
				double dps = 0, minDmg = 0, maxDmg = 0;
				//
				// update item sparse
				copyStatement.setString(1, locale);
				copyStatement.setInt(2, version);
				copyStatement.setInt(3, id);
				copyStatement.execute();
				//
				// process item stats
				for (int i = 1; i <= 10; i++) {
					final int stat = result.getInt("Stat" + i);
					final int value = result.getInt("StatValue" + i);
					if (stat > 0) {
						itemStats[stat] += value;
					}
				}
				//
				// is gem ?
				final int gemPropertiesID = result.getInt("GemPropertiesID");
				if (gemPropertiesID != 0) {
					gemPropertiesStatement.setInt(1, gemPropertiesID);
					ResultSet gemPropertiesResult = gemPropertiesStatement
							.executeQuery();

					if (gemPropertiesResult.next()) {
						this.getSpellItemEnchantmentStats(itemStats,
								gemPropertiesResult
										.getInt("SpellItemEnchantmentID"));
					}
					gemPropertiesResult.close();
				}
				//
				// Armor and damage
				if (quality <= 6) {
					String targetTable;

					if (itemClass == 2) {
						// thrown 16
						if ((itemSubClassMask & 1 << 16) != 0) {
							targetTable = "itemdamagethrown";
						}
						// wand 19
						else if ((itemSubClassMask & 1 << 19) != 0) {
							targetTable = "itemdamagewand";
						}
						// ranged 2 3 18
						else if ((itemSubClassMask & (1 << 2 | 1 << 3 | 1 << 18)) != 0) {
							targetTable = "itemdamageranged";
						}
						// one-hand / caster 0 4 7 11 13 15 and Miscellenous
						else if ((itemSubClassMask & (1 << 0 | 1 << 4 | 1 << 7
								| 1 << 11 | 1 << 13 | 1 << 14 | 1 << 15)) != 0) {
							targetTable = "itemdamageonehand";
							if (0 != (typeMask2 & 512)) {
								targetTable += "caster";
							}
						}
						// two-hand / caster 1 5 6 8 10 12 17 20
						else if ((itemSubClassMask & (1 << 1 | 1 << 5 | 1 << 6
								| 1 << 8 | 1 << 10 | 1 << 12 | 1 << 17 | 1 << 20)) != 0) {
							targetTable = "itemdamagetwohand";
							if (0 != (typeMask2 & 512)) {
								targetTable += "caster";
							}
						} else {
							throw new RuntimeException(
									"Unhandled ItemSubClassID: " + itemSubClass);
						}
						Statement dpsStatement = connectionLocaleDB
								.createStatement();
						ResultSet dpsResult = dpsStatement
								.executeQuery("SELECT * FROM `" + targetTable
										+ "` WHERE `ItemLevel`=" + level);

						if (dpsResult.next()) {
							final int delay = result.getInt("Delay");
							final float dmgRange = result
									.getFloat("DamageRange");
							dps = dpsResult.getFloat( new Integer(quality).toString());
							minDmg = dps * delay / 1000 * (1 - dmgRange / 2);
							maxDmg = dps * delay / 1000 * (1 + dmgRange / 2);
						}
						dpsResult.close();
						dpsStatement.close();
					}
				}
				//
				// Names
				String[] name = new String[5];
				String[] desc = new String[5];
				for (int i = 0; i < 5; i++) {
					nameStatement.setString(1, indexToSuffix[i]);
					nameStatement.setInt(2, id);
					ResultSet nameResult = nameStatement.executeQuery();

					if (nameResult.next()) {
						name[i] = nameResult.getString("Name");
						desc[i] = nameResult.getString("Description");
					}
					nameResult.close();
				}
				//
				// Write to db
				insertStatement.setInt(1, id);
				insertStatement.setInt(2, itemStats[4]);
				insertStatement.setInt(3, itemStats[3]);
				insertStatement.setInt(4, itemStats[7]);
				insertStatement.setInt(5, itemStats[5]);
				insertStatement.setInt(6, itemStats[6]);
				insertStatement.setDouble(7, dps);
				insertStatement.setDouble(8, minDmg);
				insertStatement.setDouble(9, maxDmg);
				insertStatement.setInt(10, armor);
				insertStatement.setInt(11, itemStats[13]);
				insertStatement.setInt(12, itemStats[14]);
				insertStatement.setInt(13, itemStats[15]);
				insertStatement.setInt(14, itemStats[32]);
				insertStatement.setInt(15, itemStats[31]);
				insertStatement.setInt(16, itemStats[35]);
				insertStatement.setInt(17, itemStats[36]);
				insertStatement.setInt(18, itemStats[37]);
				insertStatement.setInt(19, itemStats[38]);
				insertStatement.setInt(20, itemStats[43]);
				insertStatement.setInt(21, itemStats[45]);
				insertStatement.setInt(22, itemStats[47]);
				insertStatement.setInt(23, itemStats[49]);
				insertStatement.setInt(24, itemStats[50]);
				insertStatement.setInt(25, itemStats[51]);
				insertStatement.setInt(26, itemStats[55]);
				insertStatement.setInt(27, itemStats[52]);
				insertStatement.setInt(28, itemStats[54]);
				insertStatement.setInt(29, itemStats[56]);
				//
				// set locale names
				for (int i = 0; i < 5; i++) {
					insertStatement.setString(30 + i, name[i]);
				}
				//
				// and descriptions
				for (int i = 0; i < 5; i++) {
					insertStatement.setString(35 + i, desc[i]);
				}
				insertStatement.execute();
				if( n++ % 1000 == 0 ) System.out.println(id);
			}
			//
			// some clean up			stmt.close();
			gemPropertiesStatement.close();
			//
			// Filter junk items
			Statement filterStatement = connectionLocaleDB.createStatement();
			filterStatement
					.execute("UPDATE chardev_mop_static.chardev_item_stats SET DoNotShow=1 "
							+ "WHERE ItemID IN ("
							+ "SELECT ID FROM chardev_mop.item_sparse s "
							+ "WHERE Name like 'QA %' "
							+ "OR Name like 'Obsolete%' "
							+ "OR Name like 'Deprecated %' "
							+ "OR Name like '%(test)' "
							+ "OR Name like '[%' "
							+ "OR Name like 'Fast Test %' "
							+ "OR Name like 'Art Template%' "
							+ "OR Name like '%_PVP%' "
							+ "OR Name like '%_PVE%' "
							+ "OR Name like '%Cataclysm C01%' "
							+ "OR TypeMask & 16 " 
							+ "OR ( Level > 404 && ItemID < 70000) " + ")");
			filterStatement.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Caches the newest version available for each item in
	 * <code>item_current</code>.
	 */
	protected final void setItemCurrent() {
		try {
			Statement stmt = connectionStaticDB.createStatement();
			stmt.execute("REPLACE INTO item_current "
					+ "SELECT `ID`, MAX(`Version`) "
					+ "FROM chardev_mop_static.item_working "
					+ "GROUP BY `ID`");
			stmt.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Gathers the stats added by given SpellItemEnchantment into an array.
	 * 
	 * @param itemStats
	 * @param spellItemEnchantmentID
	 */
	protected final void getSpellItemEnchantmentStats(int itemStats[],
			int spellItemEnchantmentID) {
		try {
			Statement stmt = connectionLocaleDB.createStatement();
			ResultSet result = stmt
					.executeQuery("SELECT * FROM `spellitemenchantment` WHERE `ID`="
							+ spellItemEnchantmentID);

			while (result.next()) {

				for (int j = 1; j <= 3; j++) {

					int type = result.getInt("Type" + j);
					int value = result.getInt("Value" + j);
					int spellID = result.getInt("SpellID" + j);

					switch (type) {
					//
					// plain stat
					//
					case 5:
						switch (spellID) {
						// Mana
						case 0:
							itemStats[2] += value;
							break;
						default:
							itemStats[spellID] += value;
							break;
						}
						break;
					case 4:
						switch (spellID) {
						case 0:
							itemStats[50] += value;
							break;
						case 1:
							itemStats[53] += value;
							break;
						case 2:
							itemStats[51] += value;
							break;
						case 3:
							itemStats[55] += value;
							break;
						case 4:
							itemStats[52] += value;
							break;
						case 5:
							itemStats[54] += value;
							break;
						case 6:
							itemStats[56] += value;
							break;
						}
						break;
					case 3:
						// TODO: Where did the spellduration go?
						// this.getSpellStats(itemStats, spellID);
						break;
					}
				}
			}

			stmt.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new RuntimeException();
		}
	}

	/**
	 * Gathers the stats added by given Spell into an array.
	 * 
	 * @param itemStats
	 * @param spellID
	 */
	protected final void getSpellStats(int itemStats[], int spellID) {
		try {
			Statement stmt = connectionLocaleDB.createStatement();
			ResultSet result = stmt
					.executeQuery("SELECT * FROM `Spell` s "
							+ " INNER JOIN `SpellDuration` sd ON s.`SpellDurationID` = sd.`ID`"
							+ " WHERE s.`ID`=" + spellID);

			while (result.next()) {

				int duration = result.getInt("Duration");
				int type0 = result.getInt("Type0");

				if (duration <= 0 && (type0 & 64) != 0) {
					getSpellEffectStats(itemStats, spellID);
				}
			}

			stmt.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new RuntimeException();
		}
	}

	/**
	 * Gathers the stats added by given SpellEffect into an array.
	 * 
	 * @param itemStats
	 * @param spellEffectID
	 */
	protected void getSpellEffectStats(int[] itemStats, int spellEffectID) {
		try {
			Statement stmt = connectionLocaleDB.createStatement();
			ResultSet result = stmt
					.executeQuery("SELECT * FROM `SpellEffect` WHERE `SpellID`="
							+ spellEffectID);

			while (result.next()) {

				int effect = result.getInt("Effect");
				int value = result.getInt("Value");
				int secondaryValue = result.getInt("SecondaryEffect");

				switch (effect) {
				case 22:
					for (int i = 0; i < 7; i++) {
						if ((secondaryValue & (1 << i)) != 0) {
							switch (i) {
							case 0:
								itemStats[50] += value;
								break;
							case 1:
								itemStats[53] += value;
								break;
							case 2:
								itemStats[51] += value;
								break;
							case 3:
								itemStats[55] += value;
								break;
							case 4:
								itemStats[52] += value;
								break;
							case 5:
								itemStats[54] += value;
								break;
							case 6:
								itemStats[56] += value;
								break;
							}
						}
					}
					break;
				//
				// Stats
				//
				case 29:
					switch (secondaryValue) {
					case 0:
						itemStats[4] += value;
						break;
					case 1:
						itemStats[3] += value;
						break;
					case 2:
						itemStats[7] += value;
						break;
					case 3:
						itemStats[5] += value;
						break;
					case 4:
						itemStats[6] += value;
						break;
					case -1:
						for (int i = 3; i <= 7; i++) {
							itemStats[i] += value;
						}
						break;
					}
					break;
				// Health
				case 34:
					itemStats[1] += value;
					break;
				// Energy - Mana
				case 35:
					if (secondaryValue == 0) {
						itemStats[2] += value;
					}
					break;
				// Mana per 5 seconds
				case 85:
					itemStats[43] += value;
					break;
				// Attack Power
				case 99:
					itemStats[38] += value;
					break;
				// Ranged Attack Power
				case 124:
					itemStats[39] += value;
					break;
				//
				// Ratings
				//
				case 189:
					for (int i = 0; i < 32; i++) {
						if ((secondaryValue & (1 << i)) != 0) {
							if (i <= 19) {
								itemStats[i + 11] += value;
							}
							// expertise rating
							else if (i == 23) {
								itemStats[37] += value;
							}
							// mastery rating
							else if (i == 25) {
								itemStats[49] += value;
							}
						}
					}

				default:
					break;
				}
			}
			stmt.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new RuntimeException();
		}
	}
}