package org.chardev.cjt.spelldescriptionparser.ast;

import org.chardev.cjt.spelldescriptionparser.Environment;

public interface Expression{
	Expression evaluate( Environment e );
};
