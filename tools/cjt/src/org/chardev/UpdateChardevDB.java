package org.chardev;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.chardev.cjt.DBCParser;
import org.chardev.cjt.util.ConnectionFactory;

public class UpdateChardevDB {
	
	private static final int ITEM_SPARSE_SKIP = 0x8E788 - 32;
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {	
//		boolean skipLocale = true;
		
		final String path = "i:/Projekte/chardev/mop/DBFilesClient/";
		
//		staticUpdate(path);
		
//		localeUpdate(path,"EN");
		
//		for( int i=0; i< dbs.length; i++ ) {
//			connectToDatabase(dbs[i]);
//			localeUpdate(basePaths[i],locales[i]);
//			if( skipLocale ) {
//				break;
//			}
//		}
		
		cacheUpdate();
	}
	
	private static void cacheUpdate() {
		DBCParser p;
		String itemSparse[] = new String[]{
//			"I:/Projekte/chardev/mop/cache/Item-sparse.adb",
//			"I:/Projekte/chardev/mop/cache/Item-sparse (2).adb",
//			"I:/Projekte/chardev/mop/cache/Item-sparse (3).adb",
//			"I:/Projekte/chardev/mop/cache/Item-sparse (4).adb"
//			"I:/Projekte/chardev/mop/cache/Item-sparse (5).adb"
			"I:/Projekte/chardev/mop/cache/Item-sparse (6).adb"
		};
		
		String item[] = new String[]{
//			"I:/Projekte/chardev/mop/cache/Item.adb",
//			"I:/Projekte/chardev/mop/cache/Item (2).adb",
//			"I:/Projekte/chardev/mop/cache/Item (3).adb",
//			"I:/Projekte/chardev/mop/cache/Item (4).adb"
//			"I:/Projekte/chardev/mop/cache/Item (5).adb"
			"I:/Projekte/chardev/mop/cache/Item (6).adb"
		};
		
		for( String fileName : itemSparse ) {
			System.out.println("Processing: "+fileName);
			p = new DBCParser(
					ConnectionFactory.getStatic(), 
					fileName, 
					"item_working"
			);
			p.setLocale("EN");
			p.addVersion();
			p.parse();
		}

		for( String fileName : item ) {
			System.out.println("Processing: "+fileName);
			p = new DBCParser(
					ConnectionFactory.getLocale(), 
					fileName, 
					"item"
			);
			p.parse();	
		}
	}

	private static void staticUpdate( String basePath ) {
		String[] files = new String[]{
			"gemproperties",
			"glyphproperties",
			"gtchancetomeleecrit",
			"gtchancetomeleecritbase",
			"gtchancetospellcrit",
			"gtchancetospellcritbase",
			//"gtOCTRegenMP",
			//"gtOCTRegenHP",
			//"gtRegenMPPerSpt",
			//"gtRegenHPPerSpt",
			"gtCombatRatings",
			"gtresiliencedr",
			"gtspellscaling",
			"gtOCTBaseHPByClass",
			"gtOCTBaseMPByClass",
			"gtOCTClassCombatRatingScalar",
			"itemarmorquality",
			"itemarmorshield",
			"itemarmortotal",
			"itemcurrencycost",
			"itemdamageonehand",
			"itemdamageonehandcaster",
			"itemdamagethrown",
			"itemdamagetwohand",
			"itemdamagetwohandcaster",
			"itemdamageranged",
			"itemdamagewand",
			"itemdisplayinfo",
			"itempricebase",
			"itemreforge",
			"itemspec",
			"itemspecoverride",
			"itemupgrade",
			"modifiertree",
			"randproppoints",
			"rulesetitemupgrade",
			"scalingstatdistribution",
			"scalingstatvalues",
			"skilllineability",
			"skillraceclassinfo",
			"specializationspells",
			"spellauraoptions",
			"spellaurarestrictions",
			"spellcastingrequirements",
			"spellcasttimes",
			"spellcategories",
			"spellcategory",
			"spellclassoptions",
			"spellcooldowns",
			//"spelldifficulty",
			"spellduration",
			"spelleffect",
			"spelleffectscaling",
			"spellequippeditems",
			"spellflyout",
			"spellflyoutitem",
			"spellfocusobject",
			"spellicon",
			"spellinterrupts",
			"spelllevels",
			"spellmechanic",
			"spellmisc",
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
			//"talenttreeprimaryspells"
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
				ConnectionFactory.getLocale(), 
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
				ConnectionFactory.getLocale(), 
				basePath+"Item.db2", 
				"item"
		);
		ip.additionalSkip = 0x10;
		ip.truncateTargetTable();
		ip.parse();
		System.out.println("Processing: SpellReagents.db2");
		DBCParser srp = new DBCParser(
				ConnectionFactory.getLocale(), 
				basePath+"SpellReagents.db2", 
				"spellreagents"
		);
		srp.additionalSkip = 0x10;
		srp.truncateTargetTable();
		srp.parse();
	}
	
	private static void localeUpdate( String basePath, String locale ) {
		
		String[] files = new String[]{
			"chrclasses",
			"chrraces",
			"chrspecialization",
			"currencycategory",
			"currencytypes",
			"faction",
			"itemclass",
			"itemnamedescription",
			"itemrandomsuffix",
			"itemrandomproperties",
			"itemset",
			"itemsubclass",
			"skillline",
			"spell",
			"spelldescriptionvariables",
			"spellitemenchantment",
			"spellrange",
			//"talentTab"
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
		DBCParser p = new DBCParser(
				ConnectionFactory.getStatic(), 
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
		
		String path = basePath+name;
		int skip = 0;
		File f = new File(path + ".db2");
		if( ! f.exists()) {
			f = new File(path + ".dbc");
			if( ! f.exists() ) {
				throw new RuntimeException("File " + path + " does not exists!" );
			}
			else {
				path += ".dbc";
			}
		}
		else {
			path += ".db2";
			skip = 0x10;
		}
		
		DBCParser p = new DBCParser(
				ConnectionFactory.getLocale(), 
				path, 
				name
		);
		p.truncateTargetTable();
		if( skip > 0 ) {
			p.additionalSkip = skip;
		}
		p.parse();
	}
}
