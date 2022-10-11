<?php

class User {
    function __construct($db) {
        $this->db = $db;
    }

    function login($login, $password) {
        if($login === 'maks' && $password === '123') {
            $token = md5(rand());
            return array(
                'name' => 'maks',
                'token' => $token
            );
        }
    }

    function logout($token) {
    }

    function getUser($token) {
        return !!$token;
    }
}