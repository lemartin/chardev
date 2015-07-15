package org.chardev.cjt.entity;

public class SpellTargetRestrictions {
	protected final int targetCount;
	protected final int targetLevel;
	
	public SpellTargetRestrictions(int targetCount, int targetLevel) {
		this.targetCount = targetCount;
		this.targetLevel = targetLevel;
	}
	
	public int getTargetCount() {
		return targetCount;
	}

	public int getTargetLevel() {
		return targetLevel;
	}
}
