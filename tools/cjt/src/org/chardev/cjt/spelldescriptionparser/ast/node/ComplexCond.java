package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.ast.Condition;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;

public class ComplexCond implements Condition {
	public final Expression l;
	public final Comparator comparator;
	public final Expression r;
	
	public ComplexCond(Expression l, Comparator comparator, Expression r) {
		this.l = l;
		this.comparator = comparator;
		this.r = r;
	}

	public enum Comparator {
		GT, LT, GE, LE, EQ, NE;
		
		public String toString() {
			switch(this) {
			case GT: return ">";
			case GE: return ">=";
			case LT: return "<";
			case LE: return "<=";
			case EQ: return "==";
			case NE: return "!=";
			default: throw new RuntimeException("Unhandled comparator");
			}
		};
	}
}
