package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.ComplexExp;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Time;

public class BinaryComplexOp implements ComplexExp {
	
	public final Expression l,r;
	public final BinaryComplexOperator op;
	
	public BinaryComplexOp( Expression l, BinaryComplexOperator op, Expression r ) {
		this.l = l;
		this.r = r;
		this.op = op;
	}
	
	public static enum BinaryComplexOperator {
		TIMES, DIVIDE, PLUS, MINUS;
		
		public static BinaryComplexOperator fromSign( int codePoint ) throws IllegalArgumentException {
			switch(codePoint) {
			case '+': return PLUS;
			case '-': return MINUS;
			case '*': return TIMES;
			case '/': return DIVIDE;
			default: throw new IllegalArgumentException("Unable to get operator for: " + new StringBuffer().appendCodePoint(codePoint).toString());
			}
		}
		
		@Override
		public String toString() {
			switch(this) {
			case PLUS: return "+";
			case MINUS: return "-";
			case TIMES: return "*";
			case DIVIDE: return "/";
			default: throw new RuntimeException("Unhandled operator!");
			}
		}
	}
	
	@Override
	public Expression evaluate(Environment e) {
		Expression el = l.evaluate(e), er = r.evaluate(e);
		if( el instanceof Decimal && er instanceof Decimal ) {
			Decimal dl = (Decimal) el, dr = (Decimal) er;
			double val;
			
			switch(op) {
			case PLUS: val = dl.val + dr.val; break;
			case MINUS: val = dl.val - dr.val; break; 
			case TIMES: val = dl.val * dr.val; break;
			case DIVIDE: val = dl.val / dr.val; break;
			default: throw new RuntimeException("Unhandled operator: " + op);
			}
			
			if( el instanceof Time || er instanceof Time ) {
				return new Time(val);
			}
			else {
				return new Decimal(val);
			}
		}
		else {
			return new BinaryComplexOp(el, op, er);
		}
	}
	
	@Override
	public String toString() {
		return "(" + l + op + r + ")" ;
	}
}
