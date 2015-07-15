package org.chardev.cjt.spelldescriptionparser;

import org.chardev.cjt.entity.Spell;
import org.chardev.cjt.entity.SpellEffect;
import org.chardev.cjt.entity.SpellEffectScaling;
import org.chardev.cjt.entity.SpellScaling;
import org.chardev.cjt.entity.factory.SpellFactory;
import org.chardev.cjt.spelldescriptionparser.SpellEnvironment.NotSetException;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;
import org.chardev.cjt.spelldescriptionparser.ast.node.ScalingValue;
import org.chardev.cjt.spelldescriptionparser.ast.node.SpellVar;

public abstract class AbstractEnvironment implements Environment {
	
	private SpellFactory factory;
	
	public AbstractEnvironment( SpellFactory factory ) {
		this.factory = factory;
	}

	protected Spell getSpell(final int spellId) throws NotSetException {
				
		final Spell spell = this.factory.createSpell(spellId);
		
		if( null == spell ) {
			throw new NotSetException("Spell (ID: "+spellId+") not found!");
		}		
		
		return spell;
	}
	
	public Expression getSpellValue( SpellVar var )  throws NotSetException {
		final int zeroBasedIndex = var.index - 1;
		
		final Spell s = this.getSpell(var.spellId);
		
		final SpellScaling sc = s.getScaling(); 
		
		final SpellEffect e = s.getEffect(zeroBasedIndex);
		
		if( null == e ) {
			throw new NotSetException("Effect (Index: "+zeroBasedIndex+") of spell (ID: "+var.spellId+") not found!");
		}
		
		if( sc != null ) {
			
			final SpellEffectScaling sec = e.getScaling();
			
			if( sec != null && sec.coefficient > 0 ) {
				return new ScalingValue(var.abbr, sc, sec ); 
			}
		}
		
		return new Decimal( e.getValue());
	}
}
