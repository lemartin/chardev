package org.chardev.cjt;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

public class DBCParser extends DBCReader {
	protected static String SQLInsert = "REPLACE";
	protected Connection databaseConnection;
	protected String pathToFile;
	protected String targetTable;
	
	protected PreparedStatement recordStatement;
	protected BufferedInputStream bis;
	
	private int type;
	private int fields;
	private int types[];
	private int records;
	private int recordSize;
	private int blockSize;
	private int headerLength;
	private int version = 0;
	
	private int targetTableColumnCount = -1;
	
	private byte[] stringBlock;
	private boolean addVersion = false;

	private String locale = "";
	
	public int additionalSkip = 0;
	private boolean ingoreFields = false;
	
	public DBCParser( Connection databaseConnection, String pathToFile, String targetTable ) {
		this.databaseConnection = databaseConnection;
		this.pathToFile = pathToFile;
		this.targetTable = targetTable;
		this.targetTableColumnCount = getColumnCount();
	}
	
	public void parse() {
		try {
			// read header
 			bis = new BufferedInputStream(new FileInputStream(pathToFile));
			readHeader();
			bis.close();
			// read string block
			bis = new BufferedInputStream(new FileInputStream(pathToFile));
			System.out.println("skipped: " + bis.skip( headerLength + records * recordSize));
			bis.read(stringBlock);
			bis.close();
			
			// prepare record statement
			prepareRecordStatement();
			// get data types
			getTypes();
			
			// read records
			bis = new BufferedInputStream(new FileInputStream(pathToFile));
			bis.skip(headerLength);
			for( int i = 0 ; i < records ; i++ ) {
				readRecord();
			}
		} catch (SQLException sqle) {
			System.out.println(sqle);
			throw new RuntimeException();
		} catch (IOException ioe) {
			System.out.println(ioe);
			throw new RuntimeException();
		}
	}
	
	public void addVersion() {
		if( addVersion ) {
			return;
		}
		addVersion = true;
		targetTableColumnCount --;
	}
	
	public void setLocale(String locale) {
		targetTableColumnCount--;
		this.locale = locale;
	}
	
	public void truncateTargetTable() {
		try {
			Statement stmt = databaseConnection.createStatement();
			stmt.executeQuery("TRUNCATE TABLE `" + targetTable + "`");
			stmt.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new RuntimeException();
		}
	}
	
	private void prepareRecordStatement() throws SQLException {
		
		StringBuffer query = new StringBuffer(SQLInsert + " INTO " + targetTable + " VALUES(");
		
		if( addVersion && version == 0 ) {
			throw new RuntimeException("Unable to add version! Version is 0.");
		}
		
		for(int i=0; i<fields; i++){
			query.append("?");
			if (i != (fields - 1)) {
				query.append(",");
			} else {
				if( addVersion ) {
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
		recordStatement = databaseConnection.prepareStatement(query.toString());
	}

	private void readRecord() {
		try{
			for ( int i = 0; i < fields; i++) {
				try {
					switch (types[i]) {
					case Types.TINYINT:
						recordStatement.setByte(i+1, readByte(bis));
						break;
					case Types.INTEGER:
						recordStatement.setInt(i+1, readInteger(bis) );
						break;
					case Types.REAL:
					case Types.FLOAT:
						recordStatement.setFloat(i+1, readFloat(bis));
						break;
					case Types.LONGVARCHAR:
					case Types.LONGNVARCHAR:
					case Types.NVARCHAR:
					case Types.VARCHAR:
						int offset = readInteger(bis);
						String string = "";
						if( offset < 0 ) {
							recordStatement.setNull(i+1, Types.NVARCHAR);
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
							recordStatement.setNull(i+1, Types.NVARCHAR);
						}
						else{
							recordStatement.setString(i+1, string);
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
			//System.out.println(recordStatement.toString());
			recordStatement.execute();
		}
		catch (SQLException e) {
			System.out.println(recordStatement.toString());
			System.out.println(e);
			throw new RuntimeException();
		}
	}
	
	public void setIgnoreFields( boolean ignore) {
		this.ingoreFields = ignore;
	}
	
	private void readHeader() throws IOException {
		
		type = readType(bis);
		records = readInteger(bis);
		fields = readInteger(bis);
		recordSize = readInteger(bis);
		blockSize = readInteger(bis);
		
		stringBlock = new byte[blockSize];
		
		if( type == DBCReader.TYPE_WDBC ) {
			headerLength = 20;
			if( this.ingoreFields ) {
				System.out.println("Ignoring Fields");
				fields = targetTableColumnCount;
				types = new int[targetTableColumnCount];
			}
			else {
				types = new int[fields];
			}
		}
		else if( type == DBCReader.TYPE_WDB2 ) {
			readInteger(bis);
			version = readInteger(bis);
			
			headerLength = 20 + 12 + additionalSkip;
			bis.skip(4 + additionalSkip);
			
			if( this.ingoreFields ) {
				System.out.println("Ignoring Fields");
				fields = targetTableColumnCount;
				types = new int[targetTableColumnCount];
			}
			else {
				types = new int[fields];
			}
		}
		//TODO fix WCH2 field count
		else if ( type == DBCReader.TYPE_WCH2 ) {
			readInteger(bis);
			version = readInteger(bis);
			headerLength = 48;
			bis.skip(20);
			types = new int[targetTableColumnCount];
			fields = targetTableColumnCount;
		}
		else {
			throw new IOException("Unknown/Unsupported File Type");
		}
	}
	
	private int getColumnCount() {
		int cc = -1;
		try {
			Statement stmt = databaseConnection.createStatement();
			ResultSet result = stmt.executeQuery("select * from " + targetTable + " limit 1");
			cc = result.getMetaData().getColumnCount();
			stmt.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new RuntimeException();
		}
		return cc;
	}
	
	private void getTypes() {
		try {
			Statement stmt = databaseConnection.createStatement();
			ResultSet result = stmt.executeQuery("select * from " + targetTable + " limit 1");
			
			for( int i = 0 ; i < targetTableColumnCount ; i++ ) {
				types[i] = result.getMetaData().getColumnType( i + 1 );
			}
			
			stmt.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new RuntimeException();
		}
	}
}
