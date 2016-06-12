package org.chardev.wowdb;

import com.typesafe.config.Config;

import java.nio.ByteBuffer;
import java.util.List;

public class Definition {

    private FieldDefinition[] fields;

    public Definition(FieldDefinition[] fields) {
        this.fields = fields;
    }

    public FieldDefinition getField(int index) {
        return fields[index];
    }

    public int getFieldCount() {
        return fields.length;
    }

    static class FieldDefinition {
        private String type;
        private String name;

        public FieldDefinition(String type, String name) {
            this.type = type;
            this.name = name;
        }

        public String getType() {
            return type;
        }

        public String getName() {
            return name;
        }
    }

    public static Definition fromConfig(Config config) {

        final List<? extends Config> fieldConfigs = config.getConfigList("fields");

        final int fieldCount = fieldConfigs.size();
        final FieldDefinition[] fields = new FieldDefinition[fieldCount];
        for (int i = 0; i < fieldCount; i++) {
            final Config fieldConfig = fieldConfigs.get(i);
            final String type = fieldConfig.hasPath("type") ? fieldConfig.getString("type") : "integer";
            final String name = fieldConfig.hasPath("name") ? fieldConfig.getString("name") : "f" + i;
            fields[i] = new FieldDefinition(type, name);
        }

        return new Definition(fields);
    }
}
