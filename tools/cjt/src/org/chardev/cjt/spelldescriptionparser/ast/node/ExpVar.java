package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.DescriptionParser;
import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ParserStream.ParserException;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.Variable;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Plain;

public class ExpVar implements Variable {
	
	public final String var;
	
	public ExpVar(String var) {
		this.var = var;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		try {
			String def = e.lookup(var); 
			if( def != null ) {
				return new DescriptionParser(def).parse().evaluate(e);
			}
			else {
				return new Plain("<" + var + ">");
			}
		} catch (ParserException ex) {
			throw new RuntimeException(ex);
		}
	}
}
