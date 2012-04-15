package org.chardev.cjt;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Arrays;

/**
 * Parses a WoW hex-represented item (*.whi) extracted from RAM
 * 
 * @author Martin Waﬂmann
 *
 */
public class WhiParser {
	private DBCReader dbcReader;
	private Connection dbConnection;
	
	public WhiParser( Connection dbConnection) {
		this.dbcReader = new DBCReader();
		this.dbConnection = dbConnection;
	}
	
	public void parse( String fileName ) {
		try {
			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(fileName));
			String targetTable = "chardev_cataclysm_static.`item_working`";
			
			byte[] whi = new byte[0x248];
			int read = 0;
			int total = 0;
			while( total < whi.length && -1 != (read = bis.read(whi,total,whi.length-total))) {
				total += read;
			}
			if( total < whi.length ) {
				throw new RuntimeException("Unable to read " + whi.length + "bytes!");
			}
			
			int[] dbTypes = dbcReader.getTypes(dbConnection, targetTable);
			int[] types = Arrays.copyOf(dbTypes, dbTypes.length - 2 ); // minus locale and version
			
			PreparedStatement statement = dbcReader.prepareRecordStatement(
					dbConnection, 
					targetTable, 
					types.length, 
					1 /*dummy*/, 
					"EN"
			);
			
			for( int i=0; i<types.length; i++ ) {
				if( types[i] == Types.NVARCHAR || types[i] == Types.VARCHAR || types[i] == Types.LONGVARCHAR || types[i] == Types.LONGNVARCHAR ) {
					whi[i*4] = 0; whi[i*4 + 1] = 0; whi[i*4 + 2] = 0; whi[i*4 + 3] = 0;
				}
			}
			
			byte[] stringBlock = new byte[0x34];
			for( int i=0x34; i>0; i-- ) {
				stringBlock[0x34 - i] = whi[whi.length-i]; 
			}
			
			dbcReader.populateQuery(
					statement, 
					new BufferedInputStream(new ByteArrayInputStream(whi)), 
					types, 
					stringBlock
			);
			
			statement.execute();
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
		catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public static void main(String[] args) throws Throwable {
		String driverClass = "org.gjt.mm.mysql.Driver";
		Class.forName(driverClass).newInstance();
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/chardev_cataclysm_static", "root", "");
		WhiParser whiParser = new WhiParser(con);
		whiParser.parse("y:/chardev/cataclysm/ram_extracts/0x0001307b.whi");
		whiParser.parse("y:/chardev/cataclysm/ram_extracts/0x0001307c.whi");
		whiParser.parse("y:/chardev/cataclysm/ram_extracts/0x0001307d.whi");
		whiParser.parse("y:/chardev/cataclysm/ram_extracts/0x0001307e.whi");
	}
}
