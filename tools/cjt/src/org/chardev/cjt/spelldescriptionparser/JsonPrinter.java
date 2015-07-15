package org.chardev.cjt.spelldescriptionparser;

import java.text.DecimalFormat;
import java.util.ListIterator;

import org.chardev.cjt.spelldescriptionparser.ast.Condition;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.CondRef;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Plain;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Precision;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.SimpleCond;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Time;
import org.chardev.cjt.spelldescriptionparser.ast.node.BinaryComplexOp;
import org.chardev.cjt.spelldescriptionparser.ast.node.BinaryCondOp;
import org.chardev.cjt.spelldescriptionparser.ast.node.ComplexCond;
import org.chardev.cjt.spelldescriptionparser.ast.node.Desc;
import org.chardev.cjt.spelldescriptionparser.ast.node.FunVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.IfThenElse;
import org.chardev.cjt.spelldescriptionparser.ast.node.ScalingTime;
import org.chardev.cjt.spelldescriptionparser.ast.node.ScalingValue;
import org.chardev.cjt.spelldescriptionparser.ast.node.SpellVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.StatVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.UnaryCondOp;

public class JsonPrinter {
	
	private DecimalFormat decFormat = new DecimalFormat("#.####");
	
	public JsonPrinter() {
		
	}
	
	public String print( Expression exp ) {
		StringBuffer buf = new StringBuffer();
		print(exp, buf);
		return buf.toString();
	}
	
	protected void print( Expression exp, StringBuffer buf ) {
		if( exp instanceof Time) {
			buf.append("{\"type\": \"time\", \"value\":").append(decFormat.format(((Time)exp).val)).append("}");
		}
		else if( exp instanceof Decimal) {
			buf.append("{\"type\": \"dec\", \"value\":").append(decFormat.format(((Decimal)exp).val)).append("}");
		}
		else if( exp instanceof StatVar) {
			buf.append("{\"type\": \"stat\", \"name\":\"").append(((StatVar)exp).statName).append("\"}");
		}
		else if( exp instanceof Plain) {
			buf.append("{\"type\": \"plain\", \"text\":\"").append(escape(((Plain)exp).text)).append("\"}");
		}
		else if( exp instanceof Precision) {
			Precision p = (Precision) exp;
			
			buf.append("{\"type\": \"precision\", \"exp\":");
			
			print(p.exp, buf);
			
			buf.append(", \"precision\":").append(p.precision).append("}");
		}
		else if( exp instanceof SpellVar ) {
			SpellVar s = (SpellVar) exp;
			buf.append("{\"type\": \"var\", \"text\":\"")
					.append(s.spellId == null ? "" : s.spellId )
					.append(s.abbr)
					.append(s.index == null ? "" : s.index )
					.append("\"}");
		}
		else if( exp instanceof SimpleCond ) {
			SimpleCond c = (SimpleCond) exp;
			buf.append("{\"type\": \"simplecond\", \"variable\":\"").append(c.var)
				.append("\", \"ontrue\":\"").append(escape(c.firstAlternative))
				.append("\", \"onfalse\":\"").append(escape(c.secondAlternative))
				.append("\"}");
		}
		else if( exp instanceof IfThenElse ) {
			IfThenElse ite = (IfThenElse) exp;
			
			buf.append("{\"type\": \"ifthenelse\", \"cond\":");
	
			print(ite.cond, buf);
			
			buf.append(", \"ontrue\":");
			
			print(ite.onTrue, buf);
			
			buf.append(", \"onfalse\":");
			
			print(ite.onFalse, buf);
			
			buf.append("}");
		}
		else if( exp instanceof BinaryComplexOp) {
			BinaryComplexOp binOp = (BinaryComplexOp) exp;
			
			buf.append("{\"type\": \"binop\", \"left\":");
			
			print(binOp.l, buf);
			
			buf.append(", \"op\":\"").append(binOp.op.toString()).append("\", \"right\":");
			
			print(binOp.r, buf);
			
			buf.append("}");
		}
		else if( exp instanceof Desc ) {
			Desc d = (Desc) exp;
			
			buf.append("{\"type\": \"desc\", \"text\":\"").append(escape(d.strippedDesc)).append("\", \"exps\":[");
			
			ListIterator<Expression> it = d.exps.listIterator();
			while( it.hasNext() ) {
				if( it.nextIndex() > 0 ) {
					buf.append(",");
				}
				print( it.next(), buf);
			}
			
			buf.append("]}");
		}
		else if( exp instanceof ScalingValue ) { 
			ScalingValue v = (ScalingValue) exp;
			buf.append("{\"type\": \"scalingvalue\", \"variable\": \"").append(v.name)
					.append("\", \"start\": ").append(v.spellScaling.getCastTimeStart())
					.append(", \"end\": ").append(v.spellScaling.getCastTimeEnd())
					.append(", \"intervals\": ").append(v.spellScaling.getIntervals())
					.append(", \"distribution\": ").append(v.spellScaling.getDistribution())
					.append(", \"coefficient\": ").append(decFormat.format(v.effectScaling.coefficient))
					.append(", \"dice\": ").append(decFormat.format(v.effectScaling.dice))
					.append("}");
		}
		else if( exp instanceof ScalingTime ) { 
			ScalingTime t = (ScalingTime) exp;
			buf.append("{\"type\": \"scalingvalue\", \"start\": ").append(t.spellScaling.getCastTimeStart())
					.append(", \"end\": ").append(t.spellScaling.getCastTimeEnd())
					.append(", \"intervals\": ").append(t.spellScaling.getIntervals())
					.append("}");
		}
		else if( exp instanceof FunVar ) {
			FunVar f = (FunVar) exp;
			
			buf.append("{\"type\": \"fun\", \"variable\":\"").append(escape(f.var)).append("\", \"args\":[");
			
			ListIterator<Expression> it = f.args.listIterator();
			while( it.hasNext() ) {
				if( it.nextIndex() > 0 ) {
					buf.append(",");
				}
				print( it.next(), buf);
			}
			
			buf.append("]}");
		}
		else {
			System.err.println("Unsupported \"type\": " + exp.getClass().getCanonicalName());
		}
	}
	
	private void print(Condition cond, StringBuffer buf) {
		if( cond instanceof CondRef ) {
			CondRef ref = (CondRef) cond;
			buf.append("{\"type\": \"condref\", \"ref\":\"").append(ref.refName).append(ref.refId).append("\"}");
		}
		else if( cond instanceof ComplexCond ) {
			ComplexCond stat = (ComplexCond) cond;
			
			buf.append("{\"type\": \"complexcond\", \"left\":");
			
			print(stat.l,buf);
			
			buf.append(", \"comparator\": \"").append(stat.comparator).append("\", \"right\": ");
			
			print(stat.r, buf);

			buf.append("}");
		}
		else if( cond instanceof BinaryCondOp ) {
			BinaryCondOp binOp = (BinaryCondOp) cond;
			
			buf.append("{\"type\": \"bincondop\", \"left\":");
			
			print(binOp.l, buf);
			
			buf.append(", \"op\":\"").append(binOp.op.toString()).append("\", \"right\":");
			
			print(binOp.r, buf);
			
			buf.append("}");
		}
		else if( cond instanceof UnaryCondOp ) {
			UnaryCondOp unOp = (UnaryCondOp) cond;
			
			buf.append("{\"type\": \"uncondop\", \"cond\":");
			
			print(unOp.cond, buf);
			
			buf.append(", \"op\":\"").append(unOp.op.toString()).append("\"}");
		}
		else {
			System.err.println("Unsupported \"type\": " + cond.getClass().getCanonicalName() );
		}
	}

	private String escape( String s ) {
		return s.replaceAll("\"", "\\\\\"").replaceAll("\\r\\n", "\\\\r\\\\n");
	}
}
