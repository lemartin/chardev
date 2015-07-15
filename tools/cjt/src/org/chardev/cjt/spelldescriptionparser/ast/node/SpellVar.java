package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.Variable;

public class SpellVar implements Variable {
	public final Integer spellId, index;
	public final String abbr;
	
	public SpellVar(Integer spellId, String abbr, Integer index) {
		this.spellId = spellId;
		this.index = index;
		this.abbr = abbr;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		return e.evaluateVariable( this );
	}
	
	@Override
	public String toString() {
		return spellId + abbr + ( index != null ? index : "") ;
	}
}

