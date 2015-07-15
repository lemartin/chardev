package org.chardev.cjt.spelldescriptionparser.ast.node;

import java.util.LinkedList;
import java.util.List;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.ComplexExp;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.Scalable;
import org.chardev.cjt.spelldescriptionparser.ast.SimpleExp;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Plain;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.SimpleCond;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Time;

public class Desc implements Expression {
	
	public final String strippedDesc;
	public final List<Expression> exps;
	
	public Desc( String strippedDesc, List<Expression> exps ) {
		this.strippedDesc = strippedDesc;
		this.exps = exps;
	}
	
	public List<Expression> getExps() {
		return exps;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		List<Expression> eval = new LinkedList<Expression>();
		Expression last = null;
		
		for( int i=0; i<exps.size(); i++ ) {
			Expression evalExp = exps.get(i).evaluate(e);
			
			SimpleCond simpleCond;
			if( evalExp instanceof SimpleCond && last != null && last instanceof Decimal ) {
				Decimal decLast = (Decimal) last;
				simpleCond = (SimpleCond) evalExp;
				if( simpleCond.var.compareToIgnoreCase("l") == 0 ) {
					if( decLast.val == 1 ) {
						evalExp = new Plain(simpleCond.firstAlternative);
					}
					else if( decLast.val >= 2 ) {
						evalExp = new Plain(simpleCond.secondAlternative);
					}
					else {
						System.err.println("Unexpected value for condition: " + decLast.val + " " + exps.get(i-1).getClass().getCanonicalName());
					}
				}
			}
			
			eval.add(evalExp);
			last = evalExp;
		}
		
		return new Desc(strippedDesc,eval);
	}
	
	@Override
	public String toString() {
		String[] parts = strippedDesc.split("\\$",-1);
		String desc = parts[0];
		
		Expression exp;
		for( int i=0; i<exps.size(); i++ ) {
			exp = exps.get(i);
			
			if( exp instanceof Scalable) {
				desc += exp;
			}
			else if(exp instanceof Plain) {
				Plain p = (Plain) exp;
				desc += p.text;
			}
			else if(exp instanceof Time) {
				desc += "$time{" + exp + "}";
			} 
			else if(exp instanceof Decimal) {
				desc += "$dec{" + exp + "}";
			}
			else if(exp instanceof IfThenElse) {
				desc += exp;
			}
			else if(exp instanceof ComplexExp) {
				desc += "$exp{" + exp + "}";
			}
			else if(exp instanceof Desc) {
				desc += exp;
			}
			else if(exp instanceof SimpleExp) {
				desc += exp;
			}
			else {
				throw new RuntimeException("Unhandled expression: "+exp);
			}
			
			if( i + 1 < parts.length ) {
				desc += parts[1+i];
			}
		}
		
		return desc;
	}
}
