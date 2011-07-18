package org.chardev.cjt;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class DBCReader {
	protected static int integerBytes = 4;
	protected static int floatBytes = 4;
	protected static int typeBytes = 4;
	public static final int TYPE_UNKNOWN = -1;
	public static final int TYPE_WDBC = 0;
	public static final int TYPE_WCH2 = 1;
	public static final int TYPE_WDB2 = 2;
	
	public float readFloat(BufferedInputStream bis) throws IOException {
		byte buffer[] = new byte[floatBytes];
		bis.read(buffer);
		return toFloat(buffer);
	}
	
	public int readInteger(BufferedInputStream bis) throws IOException {
		byte buffer[] = new byte[integerBytes];
		bis.read(buffer);
		return toInt(buffer);
	}
	
	public byte readByte(BufferedInputStream bis) throws IOException {
		return (byte)bis.read();
	}
	
	public int readType(BufferedInputStream bis) throws IOException {
		byte buffer[] = new byte[4];
		bis.read(buffer);
		String type = new String(buffer);
		
		if( type.equals("WCH2") ) {
			return TYPE_WCH2;
		}
		else if( type.equals("WDBC") ) {
			return TYPE_WDBC;
		}
		else if( type.equals("WDB2") ) {
			return TYPE_WDB2;
		}
		else {
			return TYPE_UNKNOWN;
		}
	}

	protected float toFloat(byte buffer[]) {
		ByteBuffer bb = ByteBuffer.wrap(buffer);
		bb.order(ByteOrder.LITTLE_ENDIAN);
		return bb.getFloat(0);
	}

	protected int toInt(byte[] buffer) {
		ByteBuffer bb = ByteBuffer.wrap(buffer);
		bb.order(ByteOrder.LITTLE_ENDIAN);
		return bb.getInt(0);
	}
}
