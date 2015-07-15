package org.chardev.cjt.spelldescriptionparser;

public class ParserStream {
	protected int cursor, length;
	protected String base;
	
	public ParserStream( String base ) {
		this.cursor = 0;
		this.base = base;
		this.length = base.length();
	}
	
	public int inc() {
		return cursor ++;
	}
	
	public int getCursor() {
		return cursor;
	}
	
	public int get() {
		return base.codePointAt(cursor++);
	}
	
	public int peek() {
		return base.codePointAt(cursor);
	}
	
	public int peek(int offset) {
		return base.codePointAt(cursor + offset);
	}
	
	public boolean compare(int codePoint) {
		return peek() == codePoint;
	}
	
	public boolean eof() {
		return cursor >= length;
	}
	
	public boolean eof(int offset) {
		return cursor + offset >= length;
	}
	
	public boolean skipTo(int codePoint)  {
		while(!eof()) {
			if(peek() == codePoint) {
				return true;
			}
			inc();
		}
		return false;
	}
	
	public void expect(int codePoint) throws ParserException {
		if( peek() != codePoint ) {
			throw new ParserException("Expected " + codePointToString(codePoint) + ", found " + str());
		}
	}
	
	public void expectDigit() throws ParserException {
		if( ! Character.isDigit(peek())) {
			throw new ParserException("Expected Digit, found " + str());
		}
	}
	
	public void expectLetter() throws ParserException {
		if( ! Character.isLetter(peek())) {
			throw new ParserException("Expected Letter, found " + str());
		}
	}
	
	public boolean isDigit() {
		return Character.isDigit(peek());
	}
	
	public boolean isDigit(int offset) {
		return Character.isDigit(peek(offset));
	}
	
	public boolean isLetter() {
		return Character.isLetter(peek());
	}
	
	public boolean isLetter(int offset) {
		return Character.isLetter(peek(offset));
	}
	
	public boolean isWhitespace() {
		return Character.isWhitespace(peek());
	}
	
	public void take(int codePoint) throws ParserException {
		expect(codePoint);
		inc();
	}
	
	public String str() {
		return base.substring(cursor,cursor+1);
	}
	
	public String getStr(){
		final String s = str();
		inc();
		return s;
	}
	
	public static String codePointToString( int codePoint ) {
		return new StringBuffer().appendCodePoint(codePoint).toString();
	}
	
	public class ParserException extends Exception {
		private static final long serialVersionUID = 7716549274365868745L;

		public ParserException( String msg) {
			super(msg);
		}
		
		private String getPeek() {
			String peek = "";
			
			if (eof()) {
				return "";
			}
			
			for( int i=1; i<5 && cursor - i > 0; i++ ) {
				peek = codePointToString(base.codePointAt(cursor - i)) + peek;
			}
			
			peek += ">" + codePointToString(base.codePointAt(cursor)) + "<";
		
			for( int i=1; i<5 && cursor + i < length; i++ ) {
				peek += codePointToString(base.codePointAt(cursor + i));
			}
			
			return peek;
		}
		
		public ParserException( Exception e) {
			super("", e);
		}
		
		@Override
		public String getMessage() {
			return super.getMessage() + ", In: " + base + ", cursor: " + cursor + "( " + getPeek() + " )";
		}
	}
}
