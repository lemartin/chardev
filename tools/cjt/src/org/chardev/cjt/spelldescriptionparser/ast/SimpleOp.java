package org.chardev.cjt.spelldescriptionparser.ast;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;

public class SimpleOp implements SimpleExp {
	public final double factor;
	public final SimpleExp exp;

	public SimpleOp(double factor, SimpleExp exp) {
		this.factor = factor;
		this.exp = exp;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		Expression evalExp = exp.evaluate(e);
		if( evalExp instanceof Decimal ) {
			return new Decimal(this.factor * ((Decimal)evalExp).val);
		}
		else {
			return evalExp;
		}
	}
}
