package org.chardev.cjt.spelldescriptionparser.ast.leaf;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.ComplexExp;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.SimpleExp;

public class Decimal implements ComplexExp, SimpleExp {
	public final double val;

	public Decimal(double val) {
		this.val = val;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		return this;
	}
}
