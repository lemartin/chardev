package org.chardev.wowdb;

import java.nio.ByteBuffer;

public class RecordParser {

    public Field[][] parse(DataFile dataFile, Definition definition) {

        final DataFile.Header header = dataFile.getHeader();

        final int fieldCount = dataFile.getHeader().getFieldCount();

        if (definition.getFieldCount() != fieldCount) {
            throw new RuntimeException("Configuration file contains " + definition.getFieldCount()
                    + " field configuration but data file has " + fieldCount + " fields.");
        }

        Field[][] parsedRecords = new Field[header.getRecordCount()][];
        for (DataFile.Record record : dataFile.getRecords()) {
            final Field[] parsedRecord = new Field[header.getFieldCount()];
            final ByteBuffer buffer = record.getByteBuffer();

            for(int i = 0; i < fieldCount; i++ ) {
                final Definition.FieldDefinition fieldDefinition = definition.getField(i);

                switch (fieldDefinition.getType()) {
                    case "short":
                        parsedRecord[i] = new Field<>(buffer.getShort(), fieldDefinition.getName());
                        break;
                    case "integer":
                        parsedRecord[i] = new Field<>(buffer.getInt(), fieldDefinition.getName());
                        break;
                    case "float":
                        parsedRecord[i] = new Field<>(buffer.getFloat(), fieldDefinition.getName());
                        break;
                    case "string":
                        parsedRecord[i] = new Field<>(dataFile.getString(buffer.getInt()), fieldDefinition.getName());
                        break;
                    default:
                        throw new RuntimeException("Invalid type " + fieldDefinition.getType());
                }
            }

            parsedRecords[record.getIndex()] = parsedRecord;
        }

        return parsedRecords;
    }

    class Field<T> {
        private T value;
        private String name;

        public Field(T value, String name) {
            this.value = value;
            this.name = name;
        }

        public T getValue() {
            return value;
        }

        public String getName() {
            return name;
        }

        @Override
        public String toString() {
            return name + "=" + value;
        }
    }
}
