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

    function logout() {
        
    }

    function registration() {
        
    }

    function sendMessageAll() {
        
    }

    function sendMessageTo() {
        
    }

    function getMessage() {
        
    }

    function getScene() {
        
    }

    function getCastle() {
        
    }

    function command() {

    }
}