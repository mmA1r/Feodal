<?php

class DB {
    function __construct() {
        $host = 'localhost';
        $port = '3306';
        $name = 'feodal';
        $user = 'root';
        $password = '';
        try {
            $this->db = new PDO(
                'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $name, 
                $user, 
                $password
            );
        } catch(Exception $e) {
            print_r($e->getMessage());
		    die;
        }
    }

    function __destruct(){
        $this->db = null;
    }

    private function getArray($query){
        $stmt = $this->db->query($query);
        $result = array();
        while($row = $stmt->fetch(PDO::FETCH_OBJ)){
            $result[] = $row;
        }
        return $result;
    }

    /***************/
    /* about users */
    /***************/
    public function getUser($login){
        $query = 'SELECT * FROM users WHERE login="'.$login.'"';
        return $this->db->query($query)->fetchObject();
    }

    public function getLoggedUsers() {
        $query = 'SELECT * FROM users WHERE token!="" AND token IS NOT NULL';
        return $this->getArray($query);
    }

    public function getUserByToken($token){
        $query = 'SELECT * FROM users WHERE token="'.$token.'"';
        return $this->db->query($query)->fetchObject();
    }

    public function addUser($name, $login, $password) {
        $query = 'INSERT INTO users (name, login, password) VALUES(
            "'.$name.'",
            "'.$login.'",
            "'.$password.'"
        )';
        $this->db->query($query);
        return true;
    }

    public function updateToken($id, $token){
        $query = 'UPDATE users SET token="'.$token.'" WHERE id='.$id;
        $this->db->query($query);
        return true;
    }

    /***************/
    /* about chat */
    /***************/
    public function getMessages($userId) {
        if($userId) {
            $query = 'SELECT * FROM messages WHERE message!="" AND message IS NOT NULL AND messageTo="" OR  userId='.$userId.' OR messageTo='.$userId; 
        } else {
            $query = 'SELECT * FROM messages WHERE message!="" AND message IS NOT NULL AND messageTo="" AND userId='.$userId;
        }
        return $this->getArray($query);
    }

    public function sendMessageAll($userId, $name, $message) {
        $query = 'INSERT INTO messages (userId, name, message, messageTo) VALUES (
            "'.$userId.'", 
            "'.$name.'", 
            "'.$message.'",
            ""
            )';
        $this->db->query($query);
        return true;
    }

    public function sendMessageTo($userId, $name, $message, $messageTo) {
        print_r($messageTo);
        $query = 'INSERT INTO messages (userId, name, message, messageTo) VALUES (
            '.$userId.', 
            "'.$name.'",
            "'.$message.'", 
            "'.$messageTo.'"
        )';
        $this->db->query($query);
        return true;
    }

    public function getChatHash() {
        $query = 'SELECT * FROM statuses';
        return $this->db->query($query)->fetchObject()->chatHash;
    }

    public function setChatHash($hash) {
        $query = 'UPDATE statuses SET chatHash="'.$hash.'"';
        $this->db->query($query);
        return true;
    }  
    
    /***************/
    /* about game */
    /***************/
    public function getMap() {
        $query = 'SELECT * FROM map';
        return $this->getArray($query);
    }

    public function getCastle($user) {
        $query = 'SELECT * FROM castles WHERE idOwner=' . $user;
        return $this->db->query($query)->fetchObject();
    }

    public function castleLevelUp($id){

        $query = 'UPDATE castles SET level= level + 1  WHERE id=' . $id ;
        $this->db->query($query);
        return true;
    }

    public function getGold($user){
        $query = 'SELECT gold FROM castles WHERE idOwner=' . $user;
        return $this->db->query($query)->fetchObject();
    }

    public function updateGold($id,$gold){
        $query = 'UPDATE castles SET gold=gold +'. $gold . '   WHERE id=' . $id ;
        $this->db->query($query);
        return true;

    }
}
