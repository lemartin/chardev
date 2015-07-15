package org.chardev.cjt.entity;

public class SpellRadius {
	protected final int minRadius;
	protected final int maxRadius;
	
	public SpellRadius(int minRadius, int maxRadius) {
		this.minRadius = minRadius;
		this.maxRadius = maxRadius;
	}
	
	public int getMinRadius() {
		return minRadius;
	}
	
	public int getMaxRadius() {
		return maxRadius;
	}
}
