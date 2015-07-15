package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.Variable;

public class StatVar implements Variable {
	public final String statName;

	public StatVar(String statName) {
		this.statName = statName;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		return this;
	}
}
