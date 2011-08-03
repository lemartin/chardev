package org.chardev.cjt.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class Database {

	public static final String CHARDEV_CATACLYSM = "jdbc:mysql://localhost:3306/chardev_cataclysm?";
	public static final String CHARDEV_CATACLYSM_FR = "jdbc:mysql://localhost:3306/chardev_cataclysm_fr?";
	public static final String CHARDEV_CATACLYSM_DE = "jdbc:mysql://localhost:3306/chardev_cataclysm_de?";
	public static final String CHARDEV_CATACLYSM_ES = "jdbc:mysql://localhost:3306/chardev_cataclysm_es?";
	public static final String CHARDEV_CATACLYSM_RU = "jdbc:mysql://localhost:3306/chardev_cataclysm_ru?";
	public static final String CHARDEV_CATACLYSM_STATIC = "jdbc:mysql://localhost:3306/chardev_cataclysm_static?";

	public static Connection connectToDatabase(String url) {
		try {
			String driverClass = "com.mysql.jdbc.Driver";
			Class.forName(driverClass).newInstance();
			return DriverManager.getConnection(url, "root", "");
		} catch (SQLException sqle) {
			sqle.printStackTrace();
		} catch (InstantiationException ie) {
			System.out.println(ie);
		} catch (IllegalAccessException iae) {
			System.out.println(iae);
		} catch (ClassNotFoundException cnfe) {
			cnfe.printStackTrace();
		}
		throw new RuntimeException("Unable to connect to database: " + url);
	}
}
