<?php

class User {
    function __construct($db) {
        $this->db = $db;
    }

    function login($login, $password) {
        $user = $this->db->getUser($login);
        if($login && $password === $user->password) {
            $token = md5(rand());
            $this->db->updateToken($user->id, $token);
            return array(
                'name' => $user->name,
                'token' => $token
            );
        }
    }

    function logout($id) {
        return $this->db->updateToken($id, null);
    }

    function registration($name, $login, $password) {
        $user = $this->db->getUser($login);
        if(!$user) {
            return $this->db->addUser($name, $login, $password);
        }
    }

    function getUser($token) {
        return $this->db->getUserByToken($token);
    }
}