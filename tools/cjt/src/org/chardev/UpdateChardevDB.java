package org.chardev;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.chardev.cjt.DBCParser;

public class UpdateChardevDB {
	
	private static final int ITEM_SPARSE_SKIP = 0x74d72 - 32;
	
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
		boolean skipLocale = false;
		
		connectToDatabase(dbs[0]);
		staticUpdate(basePaths[0]);
		
		for( int i=0; i< dbs.length; i++ ) {
			connectToDatabase(dbs[i]);
			localeUpdate(basePaths[i],locales[i]);
			if( skipLocale ) {
				break;
			}
		}
		//
		//	CACHE
		//
		cacheUpdate();
	}
	
	private static void cacheUpdate() {
		DBCParser p;
		String itemSparse[] = new String[]{
//			"Y:/chardev/cataclysm/adb/Item-sparse.adb"
		};
		
		String item[] = new String[]{
//			"Y:/chardev/cataclysm/adb/Item.adb"
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
