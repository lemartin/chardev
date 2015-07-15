package org.chardev.cjt.spelldescriptionparser.ast.leaf;

import org.chardev.cjt.spelldescriptionparser.ast.Condition;

public class CondRef implements Condition {
	public final String refName;
	public final int refId;
	
	public CondRef(String refName, int refId) {
		this.refName = refName;
		this.refId = refId;
	}
}
