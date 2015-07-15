package org.chardev.cjt.entity;

import java.util.HashMap;
import java.util.Map;

import org.chardev.cjt.entity.factory.LazyField;
import org.chardev.cjt.entity.factory.SpellFactory;


public class Spell {
	
	protected final String description, name, tooltip;
	protected final int id, descriptionVariablesId, scalingId;
	protected final Map<Integer,SpellEffect> effects;

	protected LazyField<SpellScaling> scaling;
	
	protected SpellFactory factory;
	
	public Spell(
			final SpellFactory factory,
			final int id,
			final int descriptionVariableId,
			final int scalingId,
			final String description,
			final String name,
			final String tooltip
	) {
		this.factory = factory;

		this.id = id;
		this.scalingId = scalingId;
		this.description = description;
		this.tooltip = tooltip;
		this.descriptionVariablesId = descriptionVariableId;
		this.name = name;
		
		this.effects = new HashMap<Integer, SpellEffect>();
	}
	
	public int getDescriptionVariablesId() {
		return this.descriptionVariablesId;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public int getId() {
		return this.id;
	}
	
	public String getName() {
		return name;
	}

	public SpellScaling getScaling() {
		if( this.scaling == null ) {
			this.scaling = new LazyField<SpellScaling>(this.factory.createSpellScaling(this.scalingId));
		}
		return this.scaling.value;
	}

	public int getScalingId() {
		return scalingId;
	}

	public SpellEffect getEffect( int index) {
		
		if( index < 0 ) {
			throw new IllegalArgumentException("Effect index '"+index+"' out of bounds: index must be greater than or equal to zero!");
		}
		
		if( ! this.effects.containsKey(index)) {
			this.effects.put(index, this.factory.createSpellEffect( this.id, index));
		}
		return effects.get(index);
	}

	public String getTooltip() {
		return this.tooltip;
	}
	
	@Override
	public int hashCode() {
		return this.id;
	}
}
