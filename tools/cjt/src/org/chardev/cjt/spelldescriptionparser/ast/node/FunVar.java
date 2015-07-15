package org.chardev.cjt.spelldescriptionparser.ast.node;

import java.util.LinkedList;
import java.util.List;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.Variable;

public class FunVar implements Variable {
	public final String var;
	public final List<Expression> args;

	public FunVar(String var, List<Expression> args) {
		this.var = var;
		this.args = args;
	}

	@Override
	public Expression evaluate(Environment e) {
		List<Expression> eval = new LinkedList<Expression>();
		
		for (Expression exp : args) {
			eval.add(exp.evaluate(e));
		}

		return new FunVar(var, eval);
	}
}
