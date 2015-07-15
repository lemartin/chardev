<?php

spl_autoload_register(function ($className) {
        if(require __DIR__ . "/src/" . str_replace("\\", DIRECTORY_SEPARATOR, $className) . '.php') {
            return true;
        }
        return false;
    }
);