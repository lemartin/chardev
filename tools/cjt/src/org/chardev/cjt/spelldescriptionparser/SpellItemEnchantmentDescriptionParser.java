package org.chardev.cjt.spelldescriptionparser;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Locale;

import org.chardev.cjt.entity.SpellItemEnchantment;
import org.chardev.cjt.entity.factory.SpellFactory;
import org.chardev.cjt.spelldescriptionparser.ParserStream.ParserException;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.util.ConnectionFactory;

public class SpellItemEnchantmentDescriptionParser {
	
	protected Connection connection;
	protected SpellFactory factory;
	protected PreparedStatement stmt;
	
	public SpellItemEnchantmentDescriptionParser( Connection connection ) {
		Locale.setDefault(Locale.ENGLISH);
		this.connection = connection;
		this.factory = new SpellFactory(connection);
		
		try {
			this.stmt = connection.prepareStatement("REPLACE INTO chardev_mop_static.`chardev_spellitemenchantmentinfo` ( SpellItemEnchantmentID, DescriptionEN ) VALUES (?,?) ");
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public void parse( SpellItemEnchantment enchant ) throws SQLException, ParserException {
		try {
			
			String descStr = enchant.getDescription();
			String bustedDesc = "";
			
			if( descStr != null ) {
				Expression desc = new DescriptionParser(descStr).parse().evaluate(new SpellItemEnchantmentEnvironment(this.factory, enchant));
				
				bustedDesc = new JsonPrinter().print(desc);
			}
			
			stmt.setInt(1, enchant.getId());
			stmt.setString(2, bustedDesc );
			stmt.execute();
		}
		catch (Exception e) {
			System.out.println(">> " + enchant.getId() + ":" + e);
			e.printStackTrace();
		}	
	}
	
	public void parseDatabase() throws Throwable {
		
		ResultSet result = connection.createStatement().executeQuery("SELECT `ID`, `Description`, `Value1`, `Value2`, `Value3`, `SpellID1`, `SpellID2`, `SpellID3` FROM `spellitemenchantment` LIMIT 0,1000000");
		
		while( result.next()) {
			this.parse(new SpellItemEnchantment(
					result.getInt("ID"), 
					result.getString("Description"), 
					result.getDouble("Value1"), 
					result.getDouble("Value2"), 
					result.getDouble("Value3"), 
					result.getInt("SpellID1"), 
					result.getInt("SpellID2"), 
					result.getInt("SpellID3")
			));
		}
	}
	
	public static void main(String[] args) throws Throwable {
		new SpellItemEnchantmentDescriptionParser(ConnectionFactory.getLocale()).parseDatabase();
	}
}
