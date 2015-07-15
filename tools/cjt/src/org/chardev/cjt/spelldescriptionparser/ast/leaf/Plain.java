package org.chardev.cjt.spelldescriptionparser.ast.leaf;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;

public class Plain implements Expression {
	
	public final String text;
	
	public Plain(String text) {
		this.text = text;
	}

	@Override
	public Expression evaluate(Environment e) {
		return this;
	}
}
