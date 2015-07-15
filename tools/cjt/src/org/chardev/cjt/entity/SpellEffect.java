package org.chardev.cjt.entity;

import org.chardev.cjt.entity.factory.LazyField;
import org.chardev.cjt.entity.factory.SpellFactory;

public class SpellEffect {
	protected SpellFactory factory;
	
	protected final int id;
	protected final double procValue;
	protected final int period;
	protected final int value;
	protected final double coefficient;
	protected final double f8;
	protected final int targets;
	protected final int secondaryEffect;
	protected final double procChance;
	protected final int index;
	
	protected LazyField<SpellEffectScaling> scaling;
	
	public SpellEffect( SpellFactory factory, int id, double procValue, int period, int value,
			double coefficient, double f8, int targets, int secondaryEffect,
			double procChance, int index) {
		this.factory = factory;
		
		this.id = id;
		this.procValue = procValue;
		this.period = period;
		this.value = value;
		this.coefficient = coefficient;
		this.f8 = f8;
		this.targets = targets;
		this.secondaryEffect = secondaryEffect;
		this.procChance = procChance;
		this.index = index;
	}

	public int getId() {
		return id;
	}

	public double getProcValue() {
		return procValue;
	}

	public double getPeriod() {
		return period;
	}

	public double getValue() {
		return value;
	}

	public double getCoefficient() {
		return coefficient;
	}

	public double getF8() {
		return f8;
	}

	public int getTargets() {
		return targets;
	}

	public int getSecondaryEffect() {
		return secondaryEffect;
	}

	public double getProcChance() {
		return procChance;
	}

	public int getIndex() {
		return index;
	}
	
	public SpellEffectScaling getScaling() {
		if( null == this.scaling ) {
			this.scaling = new LazyField<SpellEffectScaling>(this.factory.createSpellEffectScaling(this.id));
		}
		
		return this.scaling.value;
	}
}
