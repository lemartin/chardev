package org.chardev.cjt.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

	private static final String CHARDEV_MOP 		= "jdbc:mysql://localhost:3306/chardev_mop?";
	private static final String CHARDEV_MOP_STATIC 	= "jdbc:mysql://localhost:3306/chardev_mop_static?";
	
	private static Connection localeConnection;
	private static Connection staticConnection;
	
	public static Connection getLocale() {
		if( null == ConnectionFactory.localeConnection ) {
			ConnectionFactory.localeConnection = ConnectionFactory.getConnection(CHARDEV_MOP);
		}
		return ConnectionFactory.localeConnection;
	}
	
	public static Connection getStatic() {
		if( null == ConnectionFactory.staticConnection ) {
			ConnectionFactory.staticConnection = ConnectionFactory.getConnection(CHARDEV_MOP_STATIC);
		}
		return ConnectionFactory.staticConnection;
	}
	
	private static Connection getConnection( String url ) {
		try {
			String driverClass = "com.mysql.jdbc.Driver";
			Class.forName(driverClass).newInstance();
			return DriverManager.getConnection(url, "root", "");
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} catch (InstantiationException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException(e);
		}
	}
}
