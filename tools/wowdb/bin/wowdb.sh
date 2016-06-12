#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.."
JAR=$DIR/build/libs/wowdb.jar

if [ ! -f $JAR ]; then
    cd $DIR && ./gradlew jar
fi

java -jar $DIR/build/libs/wowdb.jar $@
