package org.chardev.cjt.entity;

public class SpellScaling {
	protected final int castTimeStart;
	protected final int castTimeEnd;
	protected final int intervals;
	protected final int distribution;
	
	public SpellScaling( int castTimeStart, int castTimeEnd, int intervals, int distribution ) {
		this.intervals = intervals;
		this.castTimeEnd = castTimeEnd;
		this.castTimeStart = castTimeStart;
		this.distribution = distribution;
	}

	public int getCastTimeStart() {
		return castTimeStart;
	}

	public int getCastTimeEnd() {
		return castTimeEnd;
	}

	public int getIntervals() {
		return intervals;
	}

	public int getDistribution() {
		return distribution;
	}
}
