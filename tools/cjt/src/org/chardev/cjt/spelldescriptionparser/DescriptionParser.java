package org.chardev.cjt.spelldescriptionparser;

import java.util.LinkedList;
import java.util.List;

import org.chardev.cjt.spelldescriptionparser.ast.Condition;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.SimpleExp;
import org.chardev.cjt.spelldescriptionparser.ast.SimpleOp;
import org.chardev.cjt.spelldescriptionparser.ast.Variable;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.CondRef;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Plain;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Precision;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.SimpleCond;
import org.chardev.cjt.spelldescriptionparser.ast.node.BinaryComplexOp;
import org.chardev.cjt.spelldescriptionparser.ast.node.BinaryComplexOp.BinaryComplexOperator;
import org.chardev.cjt.spelldescriptionparser.ast.node.BinaryCondOp;
import org.chardev.cjt.spelldescriptionparser.ast.node.BinaryCondOp.BinaryCondOperator;
import org.chardev.cjt.spelldescriptionparser.ast.node.ComplexCond;
import org.chardev.cjt.spelldescriptionparser.ast.node.ComplexCond.Comparator;
import org.chardev.cjt.spelldescriptionparser.ast.node.Desc;
import org.chardev.cjt.spelldescriptionparser.ast.node.ExpVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.FunVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.IfThenElse;
import org.chardev.cjt.spelldescriptionparser.ast.node.SpellVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.StatVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.TextRef;
import org.chardev.cjt.spelldescriptionparser.ast.node.UnaryCondOp;
import org.chardev.cjt.spelldescriptionparser.ast.node.UnaryCondOp.UnaryCondOperator;

public class DescriptionParser extends ParserStream {
	
	public DescriptionParser( String desc ) {
		super(desc);
	}

	public Expression parse() throws ParserException {
		try {
			LinkedList<Expression> exps = new LinkedList<Expression>();
			StringBuffer stripped = new StringBuffer();
			
			do {
				//
				// goto $ or eof
				while( ! eof()) {
					if(compare('$')) {
						stripped.append('$');
						break;
					}
					else {
						stripped.appendCodePoint(get());
					}
				}
				if(eof()) {
					break;
				}
				//
				// skip $
				inc();
				//
				// peek at next
				switch(peek()) {
				case '?': exps.add(parseIfThenElseCond()); break;
				case '@': exps.add(parseTextRef()); break;
				case '{':
					Expression e;
					take('{'); 
					e = parseComplexExp(0);
					// skip closing parenthesis
					while(compare(')')) {
						inc();
					}
					take('}');
					if(!eof()&&!eof(1)&&compare('.')&&isDigit(1)) {
						take('.');
						e = new Precision(e,parseInteger());
					}
					exps.add(e);
					break;
				default:
					if(compare('1')&&(peek(1)=='%'||peek(1)==' ')) {
						take('1');
						get();
						exps.add(new Plain("$1%"));
					}
					else {
						exps.add(parseSimpleExp());
					}
				break;
				}
			}
			while( !eof());
			
			if( exps.size() == 1 && stripped.length() == 1) {
				return exps.getFirst();
			}
			else {
				return new Desc(stripped.toString(), exps);
			}
		}
		catch(Exception e) {
			throw new ParserException(e);
		}
	}

	//TODO Impl ComplexExp
	protected Expression parseComplexExp( int depth ) throws ParserException {
		Expression l,r;
		l = parseComplexOperand(depth);
		
		while(!eof()) {
			do {
				if(compare('*')||compare('/')) {
					int sign = get();
					l = new BinaryComplexOp(l,BinaryComplexOperator.fromSign(sign),parseComplexOperand(depth));
				}
				else if(compare('+')||compare('-')) {
						
						int lpSign = get();
						r = parseComplexOperand(depth);
						
						while(!eof()&&(compare('*')||compare('/'))) {
							int hpSign = get();
							r = new BinaryComplexOp(r,BinaryComplexOperator.fromSign(hpSign),parseComplexOperand(depth));
						}
						
						l = new BinaryComplexOp(l,BinaryComplexOperator.fromSign(lpSign),r);
				}
				else if(compare(')')) {
					return l;
				}
				else {
					if(depth==0) {
						return l;
					}
					else {
						throw new ParserException("Unexpected end of complex expression");
					}
				}
			}
			while(!eof());
		}
		
		return l;
	}
	
	protected Expression parseComplexOperand( int depth ) throws ParserException {
		if(compare('-')) {
			take('-');
			return new BinaryComplexOp(new Decimal(-1), BinaryComplexOperator.TIMES, parseComplexOperand(depth));
		}
		switch(peek()) {
		case '$':
			Integer id = null;
			take('$');
			if(isDigit()) {
				id = parseInteger();
			}
			return parseVariable(id);
		case '(':
			Expression o;
			take('(');
			o = parseComplexExp(depth + 1);
			take(')');
			return o;
		default: 
			if(compare('.')||isDigit()||compare('-')&&isDigit(1)) {
				return new Decimal(parseDecimal());
			}
			else {
				throw new ParserException("Unexpected token: " + str());
			}
		}
	}
	
	protected Condition parseCond( int depth ) throws ParserException {
		Condition l, r;
		
		l = parseCondRef(depth);
		
		do {
			if(isWhitespace()) {
				get();
				continue;
			}
			if( compare('&') ) {
				take('&');
				l = new BinaryCondOp(l, BinaryCondOperator.AND, parseCondRef(depth));
			}
			else if(compare('|')) {
				take('|');
				r = parseCondRef(depth);
				
				while(!eof()&&compare('&')) {
					take('&');
					r = new BinaryCondOp(r, BinaryCondOperator.AND, parseCondRef(depth));
				};
				
				l = new BinaryCondOp(l, BinaryCondOperator.OR, r);
			}
			else if(compare(')')) {
				if( depth > 0 ) {
					return l;
				}
				else {
					throw new ParserException("Unexpected closing parenthesis!");
				}
			}
			else if(compare('?')||compare('[')) {
				if( depth == 0 ) {
					return l;
				}
				else {
					throw new ParserException("Unexpected end of logic expression!");
				}
			}
			else {
				throw new ParserException("Unexpected symbol: "+str());
			}
		} while(true);
	}
	
	protected Condition parseCondition() throws ParserException {
		return parseCond(0);
	}
	
	protected Condition parseCondRef( int depth) throws ParserException {
		if(compare('(')) {
			Condition cond;
			take('(');
			cond = parseCond(depth+1);
			take(')');
			return cond;
		}
		else {
			if(compare('!')) {
				take('!');
				return new UnaryCondOp(UnaryCondOperator.NOT, parseCondRef(depth));
			}
			else if(compare('$')) {
				take('$');
				
				Variable v = parseVariable(null);
				Comparator c = parseComparator();
				Decimal d = new Decimal(parseDecimal());
				
				return new ComplexCond(v,c,d);
			}
			else if(isLetter()){
				String refName;
				Integer refId;
				
				refName = getStr();
				
				expectDigit();
				refId = parseInteger();
				
				return new CondRef(refName, refId);
			}
			else {
				Expression l = parseComplexExp(depth);
				Comparator c = parseComparator();
				Expression r = parseComplexExp(depth);
				
				return new ComplexCond(l, c, r);
			}
		}
	}
	
	protected Comparator parseComparator() throws ParserException {
		switch(peek()) {
		case '!':
			take('!');
			take('=');
			return Comparator.NE;
		case '>':
			take('>');
			if(peek(1) == '=') {
				take('=');
				return Comparator.GE;
			}
			else {
				return Comparator.GT;
			}
		case '<':
			take('<');
			if(peek(1) == '=') {
				take('=');
				return Comparator.LE;
			}
			else {
				return Comparator.LT;
			}
		case '=':
			take('=');
			return Comparator.EQ;
		default:
			throw new ParserException("Unexpected token: " + str());
		}
	}
	
	protected Double parseDecimal() throws ParserException {
		Integer d = 0;
		boolean neg = false;
		if(compare('-')) {
			take('-');
			neg = true;
		}
		if(isDigit()) {
			d = parseInteger();
		}
		if(peek()=='.') {
			get();
			return Double.valueOf( (neg?"-":"") + d + "." + parseInteger());
		}
		return d.doubleValue();
	}
	
	protected Integer parseInteger() {
		StringBuffer s = new StringBuffer();
		while(!eof()&&Character.isDigit(peek())) {
			s.appendCodePoint(get());
		}
		return Integer.valueOf(s.toString());
	}
	
	protected String parseParenthesed() throws ParserException {
		int closing;
		int opening = get();
		switch(opening) {
		case '[': closing = ']'; break;
		case '{': closing = '}'; break;
		case '<': closing = '>'; break;
		case '(': closing = ')'; break;
		default: throw new ParserException("Unable to determine closing parenthesis, opening was: " + str());
		}
		int n = 1;
		StringBuffer s = new StringBuffer();
		while(true) {
			if(eof()) {
				throw new ParserException("Reached eof before closing parenthesis, opening was: " + str());
			}
			if(compare(closing)) {
				n --;
				if( n == 0 ) {
					break;
				}
			}
			else if(compare(opening)) {
				n ++;
			}
			s.appendCodePoint(get());
		}
		return s.toString();
	}
	
	protected SimpleExp parseSimpleExp() throws ParserException {
		Double factor = null;
		switch(peek()) {
		case '/':
			take('/');
			factor = 1.0d / parseDecimal(); 
			take(';');
			break;
		case '*':
			take('*');
			factor = parseDecimal();
			take(';');
			break;
		}

		Integer spellId = null;
		if(isDigit()) {
			spellId = parseInteger();
		}
		
		if(compare('l')||compare('L')||compare('g')||compare('G')) {
			String var = getStr();
			int start = cursor;
			
			skipTo(':');
			String onTrue = base.substring(start, cursor);
			take(':');
			
			start = cursor;
			skipTo(';');
			String onFalse = base.substring(start, cursor);
			take(';');
			
			return new SimpleCond( var, onTrue, onFalse, spellId);
		}
		else {
			if( null == factor ) {
				return parseVariable(spellId);
			}
			else {
				return new SimpleOp( factor, parseVariable(spellId));
			}
		}
	}
	
	//TODO Impl TextCond
	protected IfThenElse parseIfThenElseCond() throws ParserException {
		Condition cond;
		Expression onTrue, onFalse;
		take('?');
		cond = parseCondition();
		
		if(compare('[')) {
			onTrue = new DescriptionParser(parseParenthesed()).parse();
			take(']');
		}
		else if(compare('?')) {
			onTrue = parseIfThenElseCond();
		}
		else {
			throw new ParserException("Unexpected token: "+str());
		}
		
		while(isWhitespace()) get();
		while(compare('$')) get();
		
		if(compare('[')) {
			onFalse = new DescriptionParser(parseParenthesed()).parse();
			take(']');
		}
		else if(compare('?')) {
			onFalse = parseIfThenElseCond();
		}
		else {
			throw new ParserException("Unexpected token: "+str());
		}
		
		return new IfThenElse(cond,onTrue,onFalse);
	}
	
	protected Expression parseTextRef() throws ParserException {
		take('@');
		String refName = parseWord();
		if( eof() || !isDigit()) {
			System.err.println("Found text ref without an id, ignoring it");
			return new Plain("@"+refName);
		}
		else {
			Integer refId = parseInteger();
			return new TextRef( refName, refId);
		}
	}
	/**
	 * Parses and returns Variables (ExpVar, SpellVar, FunVar and StatVar)
	 *
	 * 	<pre>
	 *  ExpVar:
	 *  	OpeningTag ExpVarRef ClosingTag
	 *  
	 *  ExpVarName: \w(\d|\w)*
	 *  OpeningTag: '<'
	 *  ClosingTag: '>'
	 *  
	 * 	SpellVar: 
	 * 		[SpellId] ValueRef [Index]
	 * 
	 *	SpellId	: \d+
	 *	ValueRef: \w
	 *	Index	: \d
	 *  </pre>
	 *	
	 * 
	 * @param parsedSpellId
	 * @return Parsed variable
	 * @throws ParserException
	 */
	protected Variable parseVariable( Integer parsedSpellId) throws ParserException {
		if( !eof() && compare('<')) {
			ExpVar v = new ExpVar(parseParenthesed());
			take('>');
			return v;
		}
		else {
			String var = null;
			expectLetter();
			var = getStr();
			
			if(! eof() && isLetter()) {
				if( parsedSpellId != null ) {
					throw new ParserException("Found stat var with spell id");
				}
				var += parseWord();
				if(isDigit()) {
					var += parseInteger();
				}
				//
				//TODO: implement funvars
				if(compare('(')) {
					List<Expression> args = new LinkedList<Expression>();
					
					take('(');
					while(!eof()) {
						args.add(parseComplexExp(0));
						if(compare(')')) {
							break;
						}
						else if(compare(',')) {
							take(',');
						}
					}
					take(')');
					return new FunVar(var, args);
				}
				else {
					return new StatVar(var);
				}
			}
			else {
				Integer index = null;
				if(!eof() && isDigit()) {
					 index= parseInteger();
				}
				return new SpellVar(parsedSpellId, var, index);
			}
		}
	}
	
	protected String parseWord() {
		StringBuffer s = new StringBuffer();
		while(!eof()&&Character.isLetter(peek())) {
			s.appendCodePoint(get());
		}
		return s.toString();
	}
}
