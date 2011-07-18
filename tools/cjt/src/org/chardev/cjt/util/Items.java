package org.chardev.cjt.util;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Items {

	public static final float getArmorCoefficient(int slot) {
		switch (slot) {
		case 1:
			return 0.13f;
		case 3:
			return 0.12f;
		case 5:
			return 0.16f;
		case 6:
			return 0.09f;
		case 7:
			return 0.14f;
		case 8:
			return 0.11f;
		case 9:
			return 0.07f;
		case 10:
			return 0.10f;
		case 16:
			return 0.08f;
		case 20:
			return 0.16f;
		}
		return 0.0f;
	}

	public static int getArmor(Connection con, int itemClass, int itemSubClass,
			int itemSlot, int itemLevel, int itemQuality) throws SQLException {
		int armor = 0;
		Statement statement = con.createStatement();
		if (itemClass == 4) {
			final double armorCoefficient = getArmorCoefficient(itemSlot);

			if (armorCoefficient > 0 && itemSubClass > 0 && itemSubClass <= 4) {
				ResultSet result = statement.executeQuery("SELECT t.`"
						+ itemSubClass + "` * q.`"
						+ (itemQuality >= 4 ? 4 : itemQuality) + "` AS base "
						+ "FROM `itemarmortotal` t, `itemarmorquality` q "
						+ "WHERE q.`ID` = t.`ID` AND q.`ID` = " + itemLevel);

				if (result.next()) {
					armor = Math.round(getArmorCoefficient(itemSlot)
							* result.getFloat("base"));
				}
			} else if (itemSubClass == 6) {
				ResultSet result = statement.executeQuery("SELECT `"
						+ itemQuality + "` AS armor "
						+ "FROM `itemarmorshield` s " + "WHERE s.`ID` = "
						+ itemLevel);

				if (result.next()) {
					armor = Math.round(result.getFloat("armor"));
				}
			}
		}
		statement.close();
		return armor;
	}
}
