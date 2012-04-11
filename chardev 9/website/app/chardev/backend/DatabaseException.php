<?php
namespace chardev\backend;

class DatabaseException extends \Exception
{
    function __construct( $message ) {
        parent::__construct($message);
    }
}

?>