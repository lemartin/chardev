package org.chardev.cjt.util;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Java port of php/tools/update_items.php
 * 
 * Updates <code>chardev_cataclysm.item_sparse</code> with the currently
 * available and up to date items and sets additional cached item data in
 * <code>chardev_cataclysm_static.chardev_item_stats</code>
 * 
 * @author LeMartin
 * 
 */
public class UpdateCachedItemSetTables {

	public static void main(String[] args) {
		new UpdateCachedItemSetTables(
				ConnectionFactory.getStatic(), 
				ConnectionFactory.getLocale());
	}

	protected final Connection connectionStaticDB, connectionLocaleDB;

	/**
	 * Updates <code>chardev_cataclysm.item_sparse</code> with the currently
	 * available and up to date items.
	 * 
	 * @param connectionStaticDB
	 * @param connectionLocaleDB
	 */
	public UpdateCachedItemSetTables(Connection connectionStaticDB,
			Connection connectionLocaleDB) {
		//
		this.connectionStaticDB = connectionStaticDB;
		this.connectionLocaleDB = connectionLocaleDB;
		//
		try {
			//
			Statement stmt = connectionLocaleDB.createStatement();
			ResultSet result = stmt.executeQuery("SELECT * FROM `itemset`");
			//
			
			while (result.next()) {
				int minItemLevel = Integer.MAX_VALUE;
				int maxItemLevel = 0; 
				int minReqLevel = 90; 
				int maxReqLevel = 0; 
				int items = 0; 
				int minQuality = Integer.MAX_VALUE;
				int maxQuality = 0;
				int chrClassMask = -1;
				
				System.out.println(result.getString("Name"));
				for( int i=1; i<= 10; i++  ) {
					if( result.getInt("ItemID"+i) <= 0 ) {
						continue;
					}
					Statement itemStmt = connectionLocaleDB.createStatement();
					ResultSet itemResult = itemStmt.executeQuery("SELECT * FROM `item_sparse` WHERE `ID`="+result.getInt("ItemID"+i));
					
					if (itemResult.next()) {
						System.out.println("\t"+itemResult.getString("Name"));
						
						int ilvl = itemResult.getInt("Level");
						int clvl = itemResult.getInt("RequiredCharacterLevel");
						int qua = itemResult.getInt("Quality");
						int cla = itemResult.getInt("ChrClassMask");
						
						if( cla != 0 ) {
							chrClassMask &= cla;
						}
						
						if( ilvl < minItemLevel ) {
							minItemLevel = ilvl;
						}
						if( ilvl > maxItemLevel ) {
							maxItemLevel = ilvl;
						}
						if( clvl < minReqLevel ) {
							minReqLevel = clvl;
						}
						if( clvl > maxReqLevel ) {
							maxReqLevel = clvl;
						}
						if( qua < minQuality ) {
							minQuality = qua;
						}
						if( qua > maxQuality ) {
							maxQuality = qua;
						}
						items ++;
					}
					itemStmt.close();
				}
				
				if( items > 0 ) {
					Statement insert = connectionStaticDB.createStatement();
					insert.execute("REPLACE INTO `chardev_itemset_stats` values ( "+
							result.getInt("ID")+
							", "+minItemLevel+
							", "+maxItemLevel+
							", "+minReqLevel+
							", "+maxReqLevel+
							", "+minQuality+
							", "+maxQuality+
							", "+chrClassMask+
							")"
					);
					insert.close();
				}
			}
			stmt.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new RuntimeException();
		}
	}
}