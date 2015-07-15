package org.chardev.cjt.spelldescriptionparser.ast.node;

import org.chardev.cjt.spelldescriptionparser.Environment;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;

public class TextRef implements Expression {
	
	public final String refName;
	public final int refId;
	
	public TextRef( String refName, int refId ) {
		this.refName = refName;
		this.refId = refId;
	}
	
	@Override
	public Expression evaluate(Environment e) {
		return e.evaluateReference(this);
	}
}
