package org.chardev;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.chardev.cjt.DBCParser;

public class DevelChardevDB {
	private static Connection databaseConnection;
	private static boolean connectToDatabase( String url ) {
		try {
			String driverClass = "org.gjt.mm.mysql.Driver";
			Class.forName(driverClass).newInstance();
			databaseConnection = DriverManager.getConnection(url, "root", "");
			return true;
		} catch (SQLException sqle) {
			System.out.println(sqle);
		} catch (InstantiationException ie) {
			System.out.println(ie);
		} catch (IllegalAccessException iae) {
			System.out.println(iae);
		} catch (ClassNotFoundException cnfe) {
			System.out.println(cnfe);
		}
		return false;
	}
	private static final String dbs[] = new String[]{
		"jdbc:mysql://localhost:3306/chardev_mop?",
		"jdbc:mysql://localhost:3306/chardev_mop_fr?",
		"jdbc:mysql://localhost:3306/chardev_mop_de?",
		"jdbc:mysql://localhost:3306/chardev_mop_es?",
		"jdbc:mysql://localhost:3306/chardev_mop_ru?"
	};

	public static void main(String[] args) {
		connectToDatabase(dbs[0]);	
		DBCParser p;
		// gtOCTClassCombatRatingScalar DBC
		// itemupgrade DB2
		// RulesetItemUpgrade DB2
		// gtresiliencedr
		// itemspec
		// itemspecoverride, modifiertree, questpoipoint, questv2
		p = new DBCParser(databaseConnection, "i:\\Projekte\\chardev\\mop\\dbfilesclient\\spellmisc.dbc", "spellmisc");	
		p.truncateTargetTable();
//		p.additionalSkip = 0x10;
		p.parse();
//		DBCParser srp = new DBCParser(
//				databaseConnection, 
//				"i:\\Projekte\\chardev\\mop\\dbfilesclient\\itemupgrade.db2", "itemupgrade"
//		);
//		srp.additionalSkip = 0x10;
//		srp.truncateTargetTable();
//		srp.parse();
	}
}
