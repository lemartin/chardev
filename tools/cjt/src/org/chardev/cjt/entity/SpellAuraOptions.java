package org.chardev.cjt.entity;

public class SpellAuraOptions {
	protected final int stacks;
	protected final int procCharges;
	protected final int procRate;
	
	public SpellAuraOptions(int stacks, int procCharges, int procRate) {
		this.stacks = stacks;
		this.procCharges = procCharges;
		this.procRate = procRate;
	}
	
	public int getStacks() {
		return stacks;
	}
	
	public int getProcCharges() {
		return procCharges;
	}
	
	public int getProcRate() {
		return procRate;
	}
}
