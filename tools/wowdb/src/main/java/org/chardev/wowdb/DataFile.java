package org.chardev.wowdb;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.file.Files;
import java.nio.file.Path;

public class DataFile {

    private final String name;
    private final byte[] bytes;
    private final Header header;
    private final Record[] records;

    public DataFile(String name, byte[] bytes) {

        this.name = name;
        this.bytes = bytes;

        final Format format = Format.fromString(new String(bytes, 0, 4));
        final ByteBuffer buffer = ByteBuffer.wrap(bytes, 4, 16).order(ByteOrder.LITTLE_ENDIAN);
        final int recordCount = buffer.getInt();
        final int fieldCount = buffer.getInt();
        final int recordSize = buffer.getInt();
        final int stringBlockSize = buffer.getInt();

        this.header = new Header(format, recordCount, fieldCount, recordSize, stringBlockSize);

        final int payloadOffset = bytes.length - header.getStringBlockSize() - recordCount * recordSize;
        this.records = new Record[recordCount];
        for (int i = 0; i < recordCount; i++) {
            this.records[i] = new Record(i, payloadOffset + i * recordSize);
        }
    }

    public String getName() {
        return name;
    }

    public Header getHeader() {
        return header;
    }

    public Record[] getRecords() {
        return records;
    }

    public String getString(int offset) {
        final int stringBlockOffset = bytes.length - header.getStringBlockSize();
        int i = 0;
        for(i=stringBlockOffset + offset; i<bytes.length && bytes[i] != 0; i++);

        try {
            return new String(bytes, stringBlockOffset + offset, i - stringBlockOffset - offset, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public static DataFile open(Path path) throws IOException {
        final byte[] bytes = Files.readAllBytes(path);

        return new DataFile(path.getFileName().toString(), bytes);
    }

    enum Format {
        WDBC, WDB2, WHC2;

        public static Format fromString(final String format) {
            switch (format) {
                case "WDB2":
                    return WDB2;
                case "WDBC":
                    return WDBC;
                case "WCH2":
                    return WHC2;
                default:
                    throw new RuntimeException("Unknown file format: " + format);
            }
        }
    }

    static class Header {

        private final Format format;
        private final int records;
        private final int fields;
        private final int recordSize;
        private final int stringBlockSize;

        Header(Format format, int records, int fields, int recordSize, int stringBlockSize) {
            this.format = format;
            this.records = records;
            this.fields = fields;
            this.recordSize = recordSize;
            this.stringBlockSize = stringBlockSize;
        }

        public Format getFormat() {
            return format;
        }

        public int getRecordCount() {
            return records;
        }

        public int getFieldCount() {
            return fields;
        }

        public int getRecordSize() {
            return recordSize;
        }

        public int getStringBlockSize() {
            return stringBlockSize;
        }

        @Override
        public String toString() {
            return format.toString() + ", " + records + " records (" + recordSize + " bytes, " + fields + " fields), " + stringBlockSize + " byte(s) string block";
        }
    }

    class Record {
        private final int index;
        private final int offset;

        Record(int index, int offset) {
            this.index = index;
            this.offset = offset;
        }

        public ByteBuffer getByteBuffer() {
            return ByteBuffer.wrap(bytes, offset, header.getRecordSize()).order(ByteOrder.LITTLE_ENDIAN);
        }

        public int getIndex() {
            return index;
        }
    }
}
