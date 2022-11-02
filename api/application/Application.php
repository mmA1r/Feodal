<?php

require("user/User.php");
require("db/DB.php");
require("chat/Chat.php");
require("game/Game.php");

class Application {
    function __construct(){
        $config = json_decode(file_get_contents('./config/config.json'),true);
        $db = new DB($config["DataBase"]);
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->game = new Game($db);
    }

    //функция проверки полученных значений в запросе
    function validQuery($value,$type) {
    }


    ////////////////////////////////////////
    //////////////forUser///////////////////
    ////////////////////////////////////////

    public function login($params) {
        if ($params['login'] && $params['password']) {
        return $this->user->login($params['login'],$params['password']);
        }
    }

    public function registration($params) {
        [
        'login' => $login,
        'password' => $password,
        'name' => $name
        ] = $params;
        if ($login && $password && $name) {
            return $this->user->registration($login,$password,$name);
        }
    }

    public function logout($params) {
            $user=$this->user->getUser($params['token']);
            if ($user){
                return $this->user->logout($user);
            }
    }


    ////////////////////////////////////////
    //////////////forChat///////////////////
    ////////////////////////////////////////
    
    public function sendMessage($params) {
        ['token'=>$token,
        'message'=>$message,
        'messageTo'=>$messageTo
        ] = $params;
        $user = $this->user->getUser($token);
        if ($user && $message) {
            return $this->chat->sendMessage($user, $message, $messageTo);
        }
    }
    
    public function getMessages($params) {
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->chat->getMessages($params['hash'], $user);
        }
    }

    public function getLoggedUsers($params) {
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->chat->getLoggedUsers();
        }
    }

    ////////////////////////////////////////
    //////////////forGame///////////////////
    ////////////////////////////////////////


    public function getMap($params) {
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->game->getMap();
        }
    }

    public function getCastle($params) {
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->game->getCastle($user);
        }
    }

    public function createCastle($params) {
        $user = $this->user->getUser($params['token']);
        if ($user && $params['posX'] && $params['posY']) {
            return $this->game->createCastle($user, $params['posX'],$params['posY']);
        }
    }

    public function upgradeCastle($params) {
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->game->upgradeCastle($user);
        }
    }

    public function getScene($params) {
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->game->getScene($params['unitsHash'], $params['castlesHash']);
        }
    }

    public function buyUnit($params) {
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->game->buyUnit($user, $params['unitType']);
        } 
    }

}