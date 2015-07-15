package org.chardev.cjt.entity;

public class SpellRange {
	protected final int maximumHostile;
	protected final int minimumHostile;
	
	public SpellRange(int maximumHostile, int minimumHostile) {
		this.maximumHostile = maximumHostile;
		this.minimumHostile = minimumHostile;
	}
	
	public int getMaximumHostile() {
		return maximumHostile;
	}
	
	public int getMinimumHostile() {
		return minimumHostile;
	}
	
}
