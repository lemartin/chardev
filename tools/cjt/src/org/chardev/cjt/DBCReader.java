package org.chardev.cjt;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

public class DBCReader {
	protected static int integerBytes = 4;
	protected static int floatBytes = 4;
	protected static int typeBytes = 4;
	public static final int TYPE_UNKNOWN = -1;
	public static final int TYPE_WDBC = 0;
	public static final int TYPE_WCH2 = 1;
	public static final int TYPE_WDB2 = 2;
	
	public float readFloat(BufferedInputStream bis) throws IOException {
		byte buffer[] = new byte[floatBytes];
		bis.read(buffer);
		return toFloat(buffer);
	}
	
	public int readInteger(BufferedInputStream bis) throws IOException {
		byte buffer[] = new byte[integerBytes];
		bis.read(buffer);
		return toInt(buffer);
	}
	
	public byte readByte(BufferedInputStream bis) throws IOException {
		return (byte)bis.read();
	}
	
	public int readType(BufferedInputStream bis) throws IOException {
		byte buffer[] = new byte[4];
		bis.read(buffer);
		String type = new String(buffer);
		
		if( type.equals("WCH2") ) {
			return TYPE_WCH2;
		}
		else if( type.equals("WDBC") ) {
			return TYPE_WDBC;
		}
		else if( type.equals("WDB2") ) {
			return TYPE_WDB2;
		}
		else {
			return TYPE_UNKNOWN;
		}
	}
	
	public int[] getTypes( Connection dbConnection, String targetTable ) {
		try {
			Statement stmt = dbConnection.createStatement();
			ResultSet result = stmt.executeQuery("select * from " + targetTable + " limit 1");
			int columnCount = result.getMetaData().getColumnCount();
			int[] types = new int[columnCount];
			
			for( int i = 0 ; i < columnCount ; i++ ) {
				types[i] = result.getMetaData().getColumnType( i + 1 );
			}
			
			stmt.close();
			return types;
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public PreparedStatement prepareRecordStatement( 
			Connection dbConnection, 
			String targetTable, 
			int columnCount, 
			int version, 
			String locale 
	) throws SQLException {
		
		StringBuffer query = new StringBuffer("REPLACE INTO " + targetTable + " VALUES(");
		
		for(int i=0; i<columnCount; i++){
			query.append("?");
			if (i != (columnCount - 1)) {
				query.append(",");
			} else {
				if( version > 0 ) {
					query.append(",'");
					query.append(version);
					query.append("'");
				}
				if( locale != "" ) {
					query.append(",'");
					query.append(locale);
					query.append("'");
				}
				query.append(");");
			}
		}
		//System.out.println(query);
		return dbConnection.prepareStatement(query.toString());
	}
	
	public void populateQuery( PreparedStatement statement, BufferedInputStream bis, int[] types, byte[] stringBlock ) throws SQLException {
		for ( int i = 0; i < types.length; i++) {
			try {
				switch (types[i]) {
				case Types.TINYINT:
					statement.setByte(i+1, readByte(bis));
					break;
				case Types.INTEGER:
					statement.setInt(i+1, readInteger(bis) );
					break;
				case Types.REAL:
				case Types.FLOAT:
					statement.setFloat(i+1, readFloat(bis));
					break;
				case Types.LONGVARCHAR:
				case Types.LONGNVARCHAR:
				case Types.NVARCHAR:
				case Types.VARCHAR:
					int offset = readInteger(bis);
					String string = "";
					if( offset < 0 ) {
						statement.setNull(i+1, Types.NVARCHAR);
					}
					else if( offset < stringBlock.length ) {
						int n = offset;
						while (stringBlock[n] != 0 && n < stringBlock.length) {
							n++;
						}
						if( n > offset ) {
							string = new String( stringBlock, offset, n - offset, "UTF-8");
						}
					}
					if (string.equals("")){
						statement.setNull(i+1, Types.NVARCHAR);
					}
					else{
						statement.setString(i+1, string);
					}
					break;
				default:
					System.out.println("No java data type is associated with the mysql type (" + types[i] + ")");
					break;
				}
			} catch (IOException ioe) {
				System.out.println(ioe);
				throw new RuntimeException();
			}
		}
	}

	protected float toFloat(byte buffer[]) {
		ByteBuffer bb = ByteBuffer.wrap(buffer);
		bb.order(ByteOrder.LITTLE_ENDIAN);
		return bb.getFloat(0);
	}

	protected int toInt(byte[] buffer) {
		ByteBuffer bb = ByteBuffer.wrap(buffer);
		bb.order(ByteOrder.LITTLE_ENDIAN);
		return bb.getInt(0);
	}
}
