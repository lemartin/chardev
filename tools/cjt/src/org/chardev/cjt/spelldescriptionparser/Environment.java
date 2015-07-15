package org.chardev.cjt.spelldescriptionparser;

import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.node.SpellVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.TextRef;

public interface Environment {

	public Expression evaluateReference(TextRef ref);

	public Expression evaluateVariable(SpellVar variable);

	public String lookup( String var );
}