package org.chardev.cjt.spelldescriptionparser.ast.leaf;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.SimpleExp;

public class SimpleCond implements SimpleExp {
	public final String var, firstAlternative, secondAlternative;
	public final Integer spellId;
	
	public SimpleCond( String var, String onTrue, String onFalse, Integer spellId) {
		this.var = var;
		this.firstAlternative = onTrue;
		this.secondAlternative = onFalse;
		this.spellId = spellId;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		return this;
	}
}
