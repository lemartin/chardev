package org.chardev.cjt.entity.factory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.chardev.cjt.entity.Spell;
import org.chardev.cjt.entity.SpellAuraOptions;
import org.chardev.cjt.entity.SpellDuration;
import org.chardev.cjt.entity.SpellEffect;
import org.chardev.cjt.entity.SpellEffectScaling;
import org.chardev.cjt.entity.SpellRadius;
import org.chardev.cjt.entity.SpellRange;
import org.chardev.cjt.entity.SpellScaling;
import org.chardev.cjt.entity.SpellTargetRestrictions;

public class SpellFactory {

	protected Connection connection;
	
	private final String sqlGetSpellById = "SELECT *, s.`ID` FROM `Spell` s LEFT JOIN `SpellMisc` m ON s.`SpellMiscID` = m.`ID` WHERE s.`ID` = ?";
	private final String sqlGetSpellScalingById = "SELECT * FROM `SpellScaling` WHERE `ID` = ?";
	private final String sqlGetSpellEffectBySpellIdAndIndex = "SELECT * FROM `SpellEffect` WHERE `SpellID` = ? AND `Index` = ?"; 
	private final String sqlGetSpellEffectScalingBySpellEffectId = "SELECT * FROM `SpellEffectScaling` WHERE `SpellEffectID` = ?";
	private final String sqlGetSpellRangeBySpellId = "SELECT r.* FROM `spellrange` r INNER JOIN `spellmisc` m ON r.`ID` = m.`SpellRangeID` INNER JOIN `spell` s ON m.`ID` = s.`SpellMiscID` WHERE s.`ID`=?"; 
	private final String sqlGetSpellAuraOptionsBySpellId = "SELECT * FROM `spellauraoptions` o INNER JOIN `spell` s ON s.`SpellAuraOptionsID` = o.`ID` WHERE s.`ID`=?";
	private final String sqlGetSpellIconBySpellId = "SELECT i.* FROM `spellicon` i INNER JOIN `spellmisc` m ON i.`ID` = m.`SpellIconID` INNER JOIN `spell` s ON m.`ID` = s.`SpellMiscID` WHERE s.`ID`=?";
	private final String sqlGetSpellDurationBySpellId = "SELECT d.* FROM `spell` s INNER JOIN `spellmisc` m ON m.`ID` = s.`SpellMiscID` INNER JOIN `spellduration` d ON m.`SpellDurationID` = d.`ID` WHERE s.`ID`=?";
	private final String sqlGetSpellRadiusBySpellIdAndIndex = "SELECT r.* FROM spellradius r, spelleffect e WHERE e.spellid=? and r.ID = e.SpellRadiusID and e.Index = ?";
	private final String sqlGetEffectRadiusBySpellIdAndIndex = "SELECT r.* FROM spellradius r, spelleffect e WHERE e.spellid=? and r.ID = e.EffectSpellRadiusID and e.Index = ?";
	private final String sqlGetSpellTargetRestrictionsFromSpellId = "SELECT r.* FROM `spelltargetrestrictions` r INNER JOIN `spell` s ON s.`SpellTargetRestrictionsID` = r.`ID` WHERE s.`ID`=?";
	private final String sqlGetSpellDescriptionVariablesById = "SELECT * FROM `SpellDescriptionVariables` WHERE `ID`=?";
	
	private Map<String, PreparedStatement> preparedStatements = new HashMap<>();
	
	protected Map<Integer, Spell> spellCache = new HashMap<>();

	public SpellFactory(Connection connection) {
		this.connection = connection;
	}

	public PreparedStatement getStmt( final String sql ) {
		if( ! this.preparedStatements.containsValue(sql) ) {
			try {
				final PreparedStatement stmt = connection.prepareStatement(sql);
				this.preparedStatements.put(sql, stmt);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		}
		
		return this.preparedStatements.get(sql);
	}


	public Spell createSpell( final int id) {
		
		if( ! this.spellCache.containsKey(id) ) {
			try {
				PreparedStatement stmt = this.getStmt(sqlGetSpellById);
				stmt.setInt(1, id);
	
				ResultSet result = stmt.executeQuery();

				final Spell spell;
				
				if (!result.next()) {
					spell = null;
				} else {
					spell = new Spell(
							this,
							id,
							result.getInt("SpellDescriptionVariablesID"),
							result.getInt("SpellScalingID"),
							result.getString("Description"),
							result.getString("Name"),
							result.getString("BuffDescription"));
				}
				
				this.spellCache.put(id, spell);
	
				result.close();
	
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		}

		return this.spellCache.get(id);
	}

	public SpellScaling createSpellScaling(int id) {

		final SpellScaling scaling;

		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellScalingById);
			stmt.setInt(1, id);

			ResultSet result = stmt.executeQuery();

			if (!result.next()) {
				scaling = null;
			} else {
				scaling = new SpellScaling(result.getInt("CastTimeStart"),
						result.getInt("CastTimeEnd"),
						result.getInt("Intervals"),
						result.getInt("Distribution"));
			}

			result.close();

		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return scaling;
	}

	public SpellEffect createSpellEffect( final int spellId, final int index ) {

		final SpellEffect effect;
		
		if( index < 0 ) {
			throw new IllegalArgumentException("Effect index '"+index+"' out of bounds: index must be greater than or equal to zero!");
		}

		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellEffectBySpellIdAndIndex);
			stmt.setInt(1, spellId);
			stmt.setInt(2, index);

			ResultSet result = stmt.executeQuery();
			if ( ! result.next()) {
				effect = null;
			}
			else {
				
				final int id = result.getInt("ID");

				effect = new SpellEffect(
						this, 
						id, 
						result.getDouble("ProcValue"), 
						result.getInt("Period"), 
						result.getInt("Value"), 
						result.getDouble("Coefficient"), 
						result.getDouble("f8"), 
						result.getInt("Targets"), 
						result.getInt("SecondaryEffect"), 
						result.getDouble("ProcChance"), 
						result.getInt("Index"));
			}

			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return effect;
	}

	public SpellEffectScaling createSpellEffectScaling( final int spellEffectId) {
		final SpellEffectScaling scaling;
		
		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellEffectScalingBySpellEffectId);
			stmt.setInt(1, spellEffectId);
			
			ResultSet result = stmt.executeQuery();
			if ( ! result.next()) {
				scaling = null;
			}
			else {
				scaling = new SpellEffectScaling(
						result.getDouble("Coefficient"),
						result.getDouble("Dice"));
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return scaling;
	}
	
	public SpellRange createSpellRange( final int spellId ) {
		final SpellRange range;
		
		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellRangeBySpellId);
			stmt.setInt(1, spellId);
			
			ResultSet result = stmt.executeQuery();
			if ( ! result.next()) {
				range = null;
			}
			else {
				range = new SpellRange(
						result.getInt("MaximumHostile"), 
						result.getInt("MinimumHostile"));
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return range;
	}
	
	public SpellRadius createSpellRadius( final int spellId, final int index ) {
		return this.createSpellRadius(spellId, index, false);
	}
	
	public SpellRadius createSpellEffectRadius( final int spellId, final int index ) {
		return this.createSpellRadius(spellId, index, true);
	}
	
	protected SpellRadius createSpellRadius( final int spellId, final int index, boolean effect ) {
		final SpellRadius radius;
		
		if( index < 0 ) {
			throw new IllegalArgumentException("Effect index '"+index+"' out of bounds: index must be greater than or equal to zero!");
		}
		
		try {
			PreparedStatement stmt = this.getStmt( effect ? sqlGetEffectRadiusBySpellIdAndIndex : sqlGetSpellRadiusBySpellIdAndIndex);
			stmt.setInt(1, spellId);
			stmt.setInt(2, index);
			
			ResultSet result = stmt.executeQuery();
			if ( ! result.next()) {
				radius = null;
			}
			else {
				radius = new SpellRadius(
						result.getInt("MinRadius"), 
						result.getInt("Radius"));
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return radius;
	}
	
	public SpellTargetRestrictions createSpellTargetRestrictions( final int spellId ) {
		final SpellTargetRestrictions targetRestrictions;
		
		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellTargetRestrictionsFromSpellId);
			stmt.setInt(1, spellId);
			
			ResultSet result = stmt.executeQuery();
			if ( ! result.next()) {
				targetRestrictions = null;
			}
			else {
				targetRestrictions = new SpellTargetRestrictions(
						result.getInt("Targets"), 
						result.getInt("Level"));
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return targetRestrictions;
	}
	
	public String getSpellIcon( final int spellId ) {
		final String icon;
		
		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellIconBySpellId);
			stmt.setInt(1, spellId);

			ResultSet result = stmt.executeQuery();
			if( ! result.next() ) {
				icon = "Temp";
			}
			else {
				icon = result.getString("Icon").toLowerCase()
				.replaceAll("interface\\\\icons\\\\", "")
				.replaceAll("\\w", "");
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		
		return icon;
	}
	
	public String getSpellDescriptionVariables( final int spellId ) {
		final String definitions;
		
		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellDescriptionVariablesById);
			stmt.setInt(1, spellId);

			ResultSet result = stmt.executeQuery();
			if( ! result.next() ) {
				definitions = "";
			}
			else {
				definitions = result.getString("Definitions");;
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		
		return definitions;
	}
	
	public SpellAuraOptions createSpellAuraOptions( final int spellId ) {
		final SpellAuraOptions auraOptions;
		
		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellAuraOptionsBySpellId);
			stmt.setInt(1, spellId);
			
			ResultSet result = stmt.executeQuery();
			if ( ! result.next()) {
				auraOptions = null;
			}
			else {
				auraOptions = new SpellAuraOptions(result.getInt("Stacks"), result.getInt("ProcCharges"), result.getInt("ProcRate"));
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return auraOptions;
	}
	
	public SpellDuration createSpellDuration( final int spellId ) {
		final SpellDuration duration;
		
		try {
			PreparedStatement stmt = this.getStmt(sqlGetSpellDurationBySpellId);
			stmt.setInt(1, spellId);
			
			ResultSet result = stmt.executeQuery();
			if ( ! result.next()) {
				duration = null;
			}
			else {
				duration = new SpellDuration(result.getInt("Duration"));
			}
			
			result.close();
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}

		return duration;
	}
}
