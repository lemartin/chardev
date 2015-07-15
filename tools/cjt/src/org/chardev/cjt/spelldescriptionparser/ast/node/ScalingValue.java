package org.chardev.cjt.spelldescriptionparser.ast.node;

import java.text.DecimalFormat;

import org.chardev.cjt.entity.SpellEffectScaling;
import org.chardev.cjt.entity.SpellScaling;
import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.Scalable;

public class ScalingValue implements Scalable {
	public final SpellScaling spellScaling;
	public final SpellEffectScaling effectScaling;
	public final String name;

	public ScalingValue( String name, SpellScaling spellScaling, SpellEffectScaling effectScaling) {
		this.spellScaling = spellScaling;
		this.effectScaling = effectScaling;
		this.name = name;
	}

	@Override
	public Expression evaluate(Environment e) {
		return this;
	}
	
	@Override
	public String toString() {
		return "$scalingValue{" +  
			this.spellScaling.getCastTimeStart() + "," + 
			this.spellScaling.getCastTimeEnd() + "," + 
			this.spellScaling.getIntervals() + "," + 
			this.spellScaling.getDistribution() + "," + 
			new DecimalFormat("#.####").format(effectScaling.coefficient) + ","+
			new DecimalFormat("#.####").format(effectScaling.dice) + ","+
			name + 
			"}"; 
	}
}
