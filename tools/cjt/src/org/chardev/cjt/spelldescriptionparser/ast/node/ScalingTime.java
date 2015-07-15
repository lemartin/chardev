package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.entity.SpellScaling;
import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.Scalable;

public class ScalingTime implements Scalable {
	
	public final SpellScaling spellScaling;
	
	public ScalingTime( SpellScaling spellScaling ) {
		this.spellScaling = spellScaling;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		return this;
	}
	
	@Override
	public String toString() {
		return "$scalingTime{" +  this.spellScaling.getCastTimeStart() + "," + this.spellScaling.getCastTimeEnd() + "," + this.spellScaling.getIntervals() + "}"; 
	}
}
