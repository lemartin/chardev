package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.ast.Condition;

public class UnaryCondOp implements Condition {
	public final Condition cond;
	public final UnaryCondOperator op;
	
	public UnaryCondOp( UnaryCondOperator op, Condition cond) {
		this.cond = cond;
		this.op = op;
	}
	
	@Override
	public String toString() {
		return "(!" + op + ")";
	}
	
	public static enum UnaryCondOperator {
		NOT
	}
}
