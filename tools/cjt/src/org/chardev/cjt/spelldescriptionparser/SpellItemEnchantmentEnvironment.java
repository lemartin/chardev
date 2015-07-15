package org.chardev.cjt.spelldescriptionparser;

import org.chardev.cjt.entity.SpellItemEnchantment;
import org.chardev.cjt.entity.factory.SpellFactory;
import org.chardev.cjt.spelldescriptionparser.SpellEnvironment.NotSetException;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;
import org.chardev.cjt.spelldescriptionparser.ast.node.SpellVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.TextRef;

public class SpellItemEnchantmentEnvironment extends AbstractEnvironment {

	final protected SpellItemEnchantment context;
	
	public SpellItemEnchantmentEnvironment( SpellFactory factory, SpellItemEnchantment context ) {
		super(factory);
		this.context = context;
	}
	
	@Override
	public Expression evaluateReference(TextRef ref) {
		throw new RuntimeException("Not yet implemented");
	}

	@Override
	public Expression evaluateVariable(SpellVar variable) {
		
		final int index;
		if( null == variable.index) {
			index = 1;
		}
		else {
			index = variable.index;
		}
		
		switch( variable.abbr.codePointAt(0)) {
		case 'k': 
			switch( index ) {
			case 2:
				return new Decimal(this.context.getValue(2));
			case 3:
				return new Decimal(this.context.getValue(3));
			default:
				return new Decimal(this.context.getValue(1));
			}
		case 'i': 
			switch( index ) {
			case 2:
				return new Decimal(this.context.getValue(2));
			case 3:
				return new Decimal(this.context.getValue(3));
			default:
				return new Decimal(this.context.getValue(1));
			}
		case 's':
			try {
				return this.getSpellValue( variable );
			}
			catch( NotSetException e ) {
				System.err.println("Exception: " + e.getMessage());
				e.printStackTrace(System.err);
				
				return variable;
			}
		default:
			System.out.println(this.context.getDescription());
			throw new RuntimeException("Not yet implemented: abbreviate was '"+ variable.abbr +"'");
		}
	}

	@Override
	public String lookup(String var) {
		return null;
	}

}
