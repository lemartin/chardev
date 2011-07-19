package org.chardev;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.chardev.cjt.DBCParser;

public class UpdateChardevDB {
	
	private static final int ITEM_SPARSE_SKIP = 0x698E8 - 32;
	
	private static final String dbs[] = new String[]{
		"jdbc:mysql://localhost:3306/chardev_cataclysm?",
		"jdbc:mysql://localhost:3306/chardev_cataclysm_fr?",
		"jdbc:mysql://localhost:3306/chardev_cataclysm_de?",
		"jdbc:mysql://localhost:3306/chardev_cataclysm_es?",
		"jdbc:mysql://localhost:3306/chardev_cataclysm_ru?"
	};
	private static final String basePaths[] = new String[]{
		"Y:/chardev/cataclysm/DBFilesClient/",
		"Y:/chardev/cataclysm/fr/DBFilesClient/",
		"Y:/chardev/cataclysm/de/DBFilesClient/",
		"Y:/chardev/cataclysm/es/DBFilesClient/",
		"Y:/chardev/cataclysm/ru/DBFilesClient/"
	};
	private static final String locales[] = new String[]{
		"EN",
		"FR",
		"DE",
		"ES",
		"RU"
	};
	
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
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		connectToDatabase("jdbc:mysql://localhost:3306/chardev_cataclysm?");
		
		DBCParser siecParser = new DBCParser(
				databaseConnection, 
				"Y:/chardev/cataclysm/DBFilesClient/spellitemenchantmentcondition.dbc", 
				"spellitemenchantmentcondition"
		);
		siecParser.truncateTargetTable();
		siecParser.setIgnoreFields(true);
		siecParser.parse();
	
		boolean skipLocale = false;
		
		connectToDatabase(dbs[0]);
		cacheUpdate();

		connectToDatabase(dbs[2]);
		localeUpdate(basePaths[2],locales[2]);
		
		connectToDatabase(dbs[0]);
		staticUpdate(basePaths[0]);
		
		for( int i=0; i< dbs.length; i++ ) {
			connectToDatabase(dbs[i]);
			localeUpdate(basePaths[i],locales[i]);
			if( skipLocale ) {
				break;
			}
		}

		/*
		DBCParser p;
		DBCParser fr = new DBCParser(
				databaseConnection, 
				"Y:/chardev/cataclysm/DBFilesClient/", 
				"randproppoints"
		);
		fr.truncateTargetTable();
		fr.parse();
		if( true ) return;
		
		
		p = new DBCParser(
				databaseConnection, 
				"Y:/chardev/cataclysm/DBFilesClient/ScalingStatValues.dbc", 
				"scalingstatvalues"
		);
		p.truncateTargetTable();
		p.parse();
		if( true ) return;
		System.out.println("Processing: Item.db2");
		DBCParser ip = new DBCParser(
				databaseConnection, 
				"Y:/chardev/cataclysm/DBFilesClient/Item.db2", 
				"item"
		);
		ip.additionalSkip = 0x10;
		ip.truncateTargetTable();
		ip.parse();
		
		System.out.println("Processing: Item-Sparse.db2");
		ip = new DBCParser(
				databaseConnection, 
				"Y:/chardev/cataclysm/DBFilesClient/Item-Sparse.db2", 
				"item_sparse"
		);
		ip.additionalSkip = ITEM_SPARSE_SKIP;
		ip.parse();
*/	
		//
		//	CACHE
		//
		
	}
	
	private static void cacheUpdate() {
		DBCParser p;
		String itemSparse[] = new String[]{
			"Y:/chardev/cataclysm/adb/Item-sparse.adb",
			"Y:/chardev/cataclysm/adb/Item-sparse (2).adb",
			"Y:/chardev/cataclysm/adb/Item-sparse (3).adb",
			"Y:/chardev/cataclysm/adb/Item-sparse (5).adb",
			"Y:/chardev/cataclysm/adb/Item-sparse (4).adb"
		};
		
		String item[] = new String[]{
			"Y:/chardev/cataclysm/adb/Item.adb",
			"Y:/chardev/cataclysm/adb/Item (2).adb",
			"Y:/chardev/cataclysm/adb/Item (3).adb",
			"Y:/chardev/cataclysm/adb/Item (4).adb",
			"Y:/chardev/cataclysm/adb/Item (5).adb"
		};
		
		connectToDatabase("jdbc:mysql://localhost:3306/chardev_cataclysm_static?");
		for( String fileName : itemSparse ) {
			System.out.println("Processing: "+fileName);
			p = new DBCParser(
					databaseConnection, 
					fileName, 
					"item_working"
			);
			p.setLocale("EN");
			p.addVersion();
			p.parse();
		}

		connectToDatabase("jdbc:mysql://localhost:3306/chardev_cataclysm?");
		for( String fileName : item ) {
			System.out.println("Processing: "+fileName);
			p = new DBCParser(
				databaseConnection, 
				fileName, 
				"item"
			);
			p.parse();	
		}
	}
	

	private static void staticUpdate( String basePath ) {
		String[] files = new String[]{
			"gtchancetomeleecrit",
			"gtchancetomeleecritbase",
			"gtchancetospellcrit",
			"gtchancetospellcritbase",
			"gtOCTRegenMP",
			"gtOCTRegenHP",
			"gtRegenMPPerSpt",
			"gtRegenHPPerSpt",
			"gtCombatRatings",
			"gtspellscaling",
			"itemarmorquality",
			"itemarmorshield",
			"itemarmortotal",
			"itemdamageonehand",
			"itemdamageonehandcaster",
			"itemdamagetwohand",
			"itemdamagetwohandcaster",
			"itemdamageranged",
			"itemdamagewand",
			"itemdamagethrown",
			"itemdisplayinfo",
			"gemproperties",
			"glyphproperties",
			"itemreforge",
			"randproppoints",
			"scalingstatdistribution",
			"scalingstatvalues",
			"skilllineability",
			"skillraceclassinfo",
			"spellauraoptions",
			"spellaurarestrictions",
			"spellcastingrequirements",
			"spellcasttimes",
			"spellcategories",
			"spellcategory",
			"spellclassoptions",
			"spellcooldowns",
			"spelldifficulty",
			"spellduration",
			"spelleffect",
			"spellequippeditems",
			"spellflyout",
			"spellflyoutitem",
			"spellfocusobject",
			"spellicon",
			"spellinterrupts",
			"spelllevels",
			"spellmechanic",
			"spellmissile",
			"spellmissilemotion",
			"spellpower",
			"spellradius",
			"spellreagents",
			"spellrunecost",
			"spellscaling",
			"spellshapeshift",
			"spellshapeshiftform",
			"spelltargetrestrictions",
			"spellvisual",
			"talent",
			"talenttreeprimaryspells"
		};
		//
		//	DBC FILES
		//
		for( int i=0; i<files.length; i++ ) {
			updateTable(files[i], basePath);
		}
		//
		//	SPELL ITEM ENCHANTMENT CONDITION
		//
		DBCParser siecParser = new DBCParser(
				databaseConnection, 
				basePath+"spellitemenchantmentcondition.dbc", 
				"spellitemenchantmentcondition"
		);
		siecParser.truncateTargetTable();
		siecParser.setIgnoreFields(true);
		siecParser.parse();
		//
		//	DB2 FILES
		//
		System.out.println("Processing: Item.db2");
		DBCParser ip = new DBCParser(
				databaseConnection, 
				basePath+"Item.db2", 
				"item"
		);
		ip.additionalSkip = 0x10;
		ip.truncateTargetTable();
		ip.parse();
	}
	
	private static void localeUpdate( String basePath, String locale ) {
		
		String[] files = new String[]{
			"chrclasses",
			"chrraces",
			"faction",
			"itemsubclass",
			"itemclass",
			"itemset",
			"itemrandomsuffix",
			"itemrandomproperties",
			"skillline",
			"spell",
			"spelldescriptionvariables",
			"spellitemenchantment",
			"spellrange",
			"talentTab"
		};
		//
		//	DBC FILES
		//	
		for( int i=0; i<files.length; i++ ) {
			updateTable(files[i], basePath);
		}
		//
		//	ITEM SPARSE
		//
		System.out.println("Processing: Item-Sparse.db2");
		connectToDatabase("jdbc:mysql://localhost:3306/chardev_cataclysm_static?");
		DBCParser p = new DBCParser(
				databaseConnection, 
				basePath+"Item-Sparse.db2", 
				"item_working"
		);
		p.additionalSkip = ITEM_SPARSE_SKIP;
		p.setLocale(locale);
		p.addVersion();
		p.parse();	
	}
	
	private static void updateTable( String name, String basePath ) {
		System.out.println("Processing: "+name);
		DBCParser p = new DBCParser(
				databaseConnection, 
				basePath+name+".dbc", 
				name
		);
		p.truncateTargetTable();
		p.parse();
	}
}
