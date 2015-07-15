package org.chardev.cjt.entity;

public class SpellItemEnchantment {

	protected final int id;
	protected final String description;
	protected final double value1;
	protected final double value2;
	protected final double value3;
	protected final int spellId1;
	protected final int spellId2;
	protected final int spellId3;

	public SpellItemEnchantment(
			int id, String description, double value1, double value2, 
			double value3, int spellId1, int spellId2, int spellId3
	) {
		this.id = id;
		this.description = description;
		this.value1 = value1;
		this.value2 = value2;
		this.value3 = value3;
		this.spellId1 = spellId1;
		this.spellId2 = spellId2;
		this.spellId3 = spellId3;
	}

	public int getId() {
		return id;
	}

	public String getDescription() {
		return description;
	}

	public double getValue(int index) {
		switch(index) {
		case 1: return this.value1;
		case 2: return this.value2;
		case 3: return this.value3;
		default:
			throw new IllegalArgumentException("Value index '"+index+"' is invalid!");
		}
	}	

	public double getSpellId(int index) {
		switch(index) {
		case 1: return this.spellId1;
		case 2: return this.spellId2;
		case 3: return this.spellId3;
		default:
			throw new IllegalArgumentException("Value index '"+index+"' is invalid!");
		}
	}	
}
