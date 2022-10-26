<?php 

class Chat {
    function __construct($db) {
        $this->db = $db;
    }

    function getLoggedUsers() {
        return $this->db->getLoggedUsers();
    }

    function sendMessageAll($userID, $name, $message) {
        return $this->db->sendMessage($userID, $name, $message);
    }

    function sendMessageTo($userID, $name, $message, $messageTo) {
        return $this->db->sendMessage($userID, $name, $message, $messageTo);
    }

    function getMessage($name) {
        return $this->db->getMessage($name);
    }
}