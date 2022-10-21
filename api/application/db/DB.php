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

    public function getUser($login){
        $query = 'SELECT * FROM users WHERE login="' . $login . '"';
        return $this->db->query($query)->fetchObject();
    }

    public function getUserByToken($token){
        $query = 'SELECT * FROM users WHERE token="' . $token . '"';
        return $this->db->query($query)->fetchObject();
    }

    public function addUser($name, $login, $password) {
        $query = 'INSERT INTO users (name, login, password) VALUES(
            "' . $name . '",
            "' . $login . '",
            "' . $password . '"
        )';
        $this->db->query($query);
        return true;
    }

    public function updateToken($id, $token){
        $query = 'UPDATE users SET token="' . $token . '" WHERE id=' . $id;
        $this->db->query($query);
        return true;
    }

    private function getArray($query){
        $stmt = $this->db->query($query);
        $result = array();
        while($row = $stmt->fetch(PDO::FETCH_OBJ)){
            $result[] = $row;
        }
        return $result;
    }
}
