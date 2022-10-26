<?php

require('user/User.php');
require('db/DB.php');
require('chat/Chat.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
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

    function getLoggedUsers($params) {
        if($params['token']) {
            $users = $this->chat->getLoggedUsers();
            if($users) {
                return $users;
            }
        }
    }

    function sendMessageAll($params) {
        if($params['token'] && $params['message']) {
            $user = $this->user->getUser($params['token']);
            if($user) {
                return $this->chat->sendMessageAll($user->id, $user->name, $params['message']);
            }
        }
    }

    function sendMessageTo($params) {
        if($params['token'] && $params['message']) {
            $user = $this->user->getUser($params['token']);
            if($user) {
                return $this->chat->sendMessageTo($user->id, $user->name, $params['message'], $params['messageTo']);
            }
        }
    }

    function getMessage($params) {
        if($params['token']) {
            $user = $this->user->getUser($params['token']);
            $message = $this->chat->getMessage($user->name);
            if($message) {
                return $message;
            }
        }
    }

    function getScene($params) {
        
    }

    function getCastle($params) {
        
    }

    function command($params) {

    }
}