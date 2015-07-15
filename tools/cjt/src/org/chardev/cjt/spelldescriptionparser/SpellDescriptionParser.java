package org.chardev.cjt.spelldescriptionparser;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Locale;
import java.util.regex.Pattern;

import org.chardev.cjt.entity.Spell;
import org.chardev.cjt.entity.factory.SpellFactory;
import org.chardev.cjt.spelldescriptionparser.ParserStream.ParserException;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.util.ConnectionFactory;

public class SpellDescriptionParser {
	
	protected Connection connection;
	protected SpellFactory factory;
	protected PreparedStatement stmt;
	
	public SpellDescriptionParser( Connection connection ) {
		Locale.setDefault(Locale.ENGLISH);
		this.connection = connection;
		this.factory = new SpellFactory(connection);
		
		try {
			this.stmt = connection.prepareStatement("REPLACE INTO chardev_mop_static.`chardev_spellinfo` ( SpellID, DescriptionEN, Scalable, ElixirMask ) VALUES (?,?,?,?) ");
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	public void parseSpell( int spellId ) throws SQLException, ParserException {
		try {
			
			Spell s = this.factory.createSpell(spellId);
			String descStr = s.getDescription();
			String bustedDesc = "";
			boolean scalable = false;
			int elixirMask = 0;
			
			if( descStr != null ) {
				Expression desc = new DescriptionParser(s.getDescription()).parse().evaluate(new SpellEnvironment(this.factory,s));
				
				bustedDesc = new JsonPrinter().print(desc);
				
				if( Pattern.compile("Counts as both a Battle and Guardian elixir", Pattern.CASE_INSENSITIVE).matcher(descStr).find()) {
					elixirMask = 3;
				}
				else if( Pattern.compile("Guardian Elixir", Pattern.CASE_INSENSITIVE).matcher(descStr).find()) {
					elixirMask = 2;
				}
				else if( Pattern.compile("Battle Elixir", Pattern.CASE_INSENSITIVE).matcher(descStr).find()) {
					elixirMask = 1;
				}
			}

			stmt.setInt(1, spellId);
			stmt.setString(2, bustedDesc );
			stmt.setBoolean(3, scalable);
			stmt.setInt(4, elixirMask);
			stmt.execute();
		}
		catch (Exception e) {
			System.out.println(">> " + spellId + ":" + e);
			e.printStackTrace();
		}	
	}
	
	public void parseDatabase() throws Throwable {
		
		ResultSet result = connection.createStatement().executeQuery("SELECT `ID` FROM `spell` LIMIT 0,1000000");
		
		int n = 0;
		while( result.next()) {
			final int id =result.getInt(1);
			parseSpell(id);
			if(n++%1000==0) System.out.println(id);
		}
	}
	
	public static void main(String[] args) throws Throwable {
		new SpellDescriptionParser(ConnectionFactory.getLocale()).parseDatabase();
	}
}
