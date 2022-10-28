<?php 

class Chat {
    function __construct($db) {
        $this->db = $db;
    }

    function getLoggedUsers() {
        return $this->db->getLoggedUsers();
    }

    function sendMessageAll($userId, $name, $message) {
        $this->db->sendMessageAll($userId, $name, $message);
        $hash = md5(rand());
        $this->db->setChatHash($hash);
        return array('hash' => $hash);
    }

    function sendMessageTo($userId, $name, $message, $messageTo) {
        $this->db->sendMessageTo($userId, $name, $message, $messageTo);
        $hash = md5(rand());
        $this->db->setChatHash($hash);
        return array('hash' => $hash);
    }

    function getMessages($hash, $userId = null) {
        $dbHash = $this->db->getChatHash();
        if ($hash != $dbHash) {
            return array(
                'messages' => $this->db->getMessages($userId),
                'hash' => $dbHash
            );
        }
    }
}