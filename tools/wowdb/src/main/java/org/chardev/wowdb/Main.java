package org.chardev.wowdb;

import com.typesafe.config.ConfigFactory;

import java.io.File;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.logging.ConsoleHandler;
import java.util.logging.Logger;

public class Main {

    static {
        Logger.getAnonymousLogger().addHandler(new ConsoleHandler());
    }

    public static void main(String[] args) throws Throwable {

        if (args.length != 2) {
            System.out.println("Usage: [header|data|parse|insert] file");
            System.exit(1);
        }

        final String action = args[0];

        switch (action) {
            case "header": {
                System.out.println(DataFile.open(Paths.get(args[1])).getHeader());
                break;
            }
            case "data": {
                DataFile dataFile = DataFile.open(Paths.get(args[1]));
                DataFile.Header header = dataFile.getHeader();

                for (DataFile.Record record : dataFile.getRecords()) {
                    final ByteBuffer buffer = record.getByteBuffer();
                    for (int i = 0; i < header.getFieldCount(); i++) {
                        System.out.print((i > 0 ? ", " : "") + i + "=" + buffer.getInt());
                    }
                    System.out.println();
                }
                break;
            }
            case "insert": {
                final Connection connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1/chardev_data?user=root");
                final PreparedStatement preparedStatement = connection.prepareStatement(
                        "INSERT INTO `spellmisc` VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

                final Path path = Paths.get(args[1]);
                final DataFile dataFile = DataFile.open(path);
                final Definition definition = Definition.fromConfig(ConfigFactory.parseFile(new File(path.getFileName().toString().toLowerCase() + ".json")));

                final RecordParser parser = new RecordParser();
                for (RecordParser.Field[] fields : parser.parse(dataFile, definition)) {

                    for (int i = 0; i < fields.length; i++) {
                        preparedStatement.setObject(i + 1, fields[i].getValue());
                    }

                    preparedStatement.execute();
                }

                break;
            }
            case "parse": {
                final Path path = Paths.get(args[1]);
                final DataFile dataFile = DataFile.open(path);
                final Definition definition = Definition.fromConfig(ConfigFactory.parseFile(new File(path.getFileName().toString().toLowerCase() + ".json")));

                final RecordParser parser = new RecordParser();
                for (RecordParser.Field[] fields : parser.parse(dataFile, definition)) {
                    for (int i = 0; i < fields.length; i++) {
                        System.out.print((i > 0 ? ", " : "") + fields[i]);
                    }
                    System.out.println();
                }

                break;
            }
        }
    }
}
