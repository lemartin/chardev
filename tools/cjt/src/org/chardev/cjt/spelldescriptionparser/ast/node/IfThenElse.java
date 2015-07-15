package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.ComplexExp;
import org.chardev.cjt.spelldescriptionparser.ast.Condition;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;

public class IfThenElse implements ComplexExp {
	public final Condition cond;
	public final Expression onTrue, onFalse;
	
	public IfThenElse(Condition cond, Expression onTrue, Expression onFalse) {
		this.cond = cond;
		this.onTrue = onTrue;
		this.onFalse = onFalse;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		return new IfThenElse(cond, onTrue.evaluate(e), onFalse.evaluate(e));
	}
	
	@Override
	public String toString() {
		return "$if{" + cond+"["+onTrue+"]["+onFalse+"]}";
	}
}
