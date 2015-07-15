package org.chardev.cjt.spelldescriptionparser.ast.leaf;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;


public class Precision implements Expression {
	
	public final Expression exp;
	public final int precision;
	
	public Precision(Expression exp, int precision) {
		this.exp = exp;
		this.precision = precision;
	}

	@Override
	public Expression evaluate(Environment e) {
		return new Precision(exp.evaluate(e), precision);
	}
}
