package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.ast.Condition;

public class BinaryCondOp implements Condition {
	
	public final Condition l,r;
	public final BinaryCondOperator op;
	
	public BinaryCondOp( Condition l, BinaryCondOperator op, Condition r ) {
		this.l = l;
		this.r = r;
		this.op = op;
	}
	
	@Override
	public String toString() {
		return "("+l+op+r+")";
	}
	
	public static enum BinaryCondOperator {
		AND, OR;
		public String toString() {
			switch(this) {
			case AND: return "&";
			case OR: return "|";
			default: throw new RuntimeException("Unhandled operator");
			}
		};
	}
}
