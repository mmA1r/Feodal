<?php

require('user/User.php');
require('db/DB.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
    }

    function login($params) {
        if($params['login'] && $params['password']) {
            return $this->user->login(
                $params['login'],
                $params['password']
            );
        }
    }

    function logout($params) {
        if($params['token']) {
            $user = $this->user->getUser($params['token']);
            if($user) {
                return $this->user->logout($user->id);
            }
        }
    }

    function registration($params) {
        [
            'name' => $name,
            'login' => $login,
            'password' => $password
        ] = $params;
        if($name && $login && $password) {
            return $this->user->registration($name, $login, $password);
        }
    }

    function sendMessageAll($params) {
        
    }

    function sendMessageTo($params) {
        
    }

    function getMessage($params) {
        
    }

    function getScene($params) {
        
    }

    function getCastle($params) {
        
    }

    function command($params) {

    }
}