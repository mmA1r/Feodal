<?php

require("user/User.php");
require("db/DB.php");
require("chat/Chat.php");
require("game/Game.php");
require("gamer/Gamer.php");
require("map/Map.php");

class Application {
    function __construct()
    {
        $config = json_decode(file_get_contents('./config/config.json'), true);
        $db = new DB($config["DataBase"]);
        $map = new Map($db);
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->game = new Game($db, $map,$config["Game"]);
        $this->gamer = new Gamer($db, $map);
    }

    //функция проверки полученных значений в запросе
    private function checkParams($params){
        foreach($params as $param=>$value){
            if($param == 'token' && !is_string($value) && strlen($value) > 16){
                return false;
            }
            if($param == 'login' && !is_string($value) && strlen($value) > 16){
                return false;
            }
            if($param == 'password' && !is_string($value) && strlen($value) > 16){
                return false;
            }
            if($param == 'name' && !is_string($value) && strlen($value) > 16){
                return false;
            }
            if($param == 'message' && !is_string($value) && strlen($value) > 256 ){
                return false;
            }
            if($param == 'messageTo' && !is_numeric($value)){
                return false;
            }
            if($param == 'hash' && !is_string($value) && !(strlen($value) == 32) ){
                return false;
            }
            if($param == 'mapHash' && !is_string($value) && !(strlen($value) == 32) ){
                return false;
            }
            if($param == 'unitsHash' && !is_string($value) && !(strlen($value) == 32) ){
                return false;
            }
            if($param == 'unitType' && !is_numeric($value)){
                return false;
            }
        }
        return true;
    }

    ////////////////////////////////////////
    //////////////forUser///////////////////
    ////////////////////////////////////////

    public function login($params) {
        if ($this->checkParams($params)) {
            if ($params['login'] && $params['password']) {
                return $this->user->login($params['login'], $params['password']);
            }
        }
    }

    public function registration($params) {
        if ($this->checkParams($params)) {
            [
                'login' => $login,
                'password' => $password,
                'name' => $name
            ] = $params;
            if ($login && $password && $name) {
                return $this->user->registration($login, $password, $name);
            }
        }
    }

    public function logout($params) {
        if ($this->checkParams($params)) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->logout($user);
            }
        }
    }

    ////////////////////////////////////////
    //////////////forChat///////////////////
    ////////////////////////////////////////

    public function sendMessage($params, $type){
        [
            'token' => $token,
            'message' => $message,
            'messageTo' => $messageTo
        ] = $params;
        if ($type === "all") {
            $messageTo = "NULL";
        }
        $user = $this->user->getUser($token);
        if ($user && $message) {
            return $this->chat->sendMessage($user, $message, $messageTo);
        }
    }

    public function getMessages($params){
        if ($params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->getMessages($params['hash'], $user);
            }
        }
    }

    public function getLoggedUsers($params){
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->chat->getLoggedUsers();
        }
    }

    ////////////////////////////////////////
    //////////////forGame///////////////////
    ////////////////////////////////////////

    public function getMap($params){
        if ($this->checkParams($params)) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->game->getMap();
            }
        }
    }

    public function getUnitsTypes($params){
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->game->getUnitsTypes();
        }
    }

    public function getScene($params){
        $user = $this->user->getUser($params['token']);
        if ($user) {
            return $this->game->getScene($params['unitsHash'], $params['mapHash']);
        }
    }
    ////////////////////////////////////////
    //////////////forGamer//////////////////
    ////////////////////////////////////////
    public function getCastle($params){
        $user = $this->user->getUser($params['token']);
        if ($user) {
            $gamer = $this->gamer->getGamer($user);
            if (!$gamer) {
                $this->game->addCastle($user);
                $gamer = $this->gamer->getGamer($user);
            }
            $gamer->castleUpgradeCost = $this->gamer->getCastleLevelCost($gamer->level);
            return array(
                'castle' => $gamer
            );
        }
    }

    public function upgradeCastle($params){
        $user = $this->user->getUser($params['token']);
        if ($user) {
            $gamer = $this->gamer->getGamer($user);
            if ($gamer) {
                return $this->gamer->upgradeCastle($gamer);
            }
        }
    }

    public function buyUnit($params){
        if ($params['unitType']){
            $user = $this->user->getUser($params['token']);
            if ($user) {
                $gamer = $this->gamer->getGamer($user);
                if ($gamer) {
                    return $this->gamer->buyUnit($gamer, $params['unitType']);
                }
            }
        }
    }

    public function robVillage($params){
        $user = $this->user->getUser($params['token']);
        if ($user) {
            $gamer = $this->gamer->getGamer($user);
            $village = $this->game->getVillage($params['village']);
            if ($gamer && $village) {
                return $this->game->robVillage($gamer, $village);
            }
        }
    }

    public function destroyVillage($params){
        $user = $this->user->getUser($params['token']);
        if ($user) {
            $gamer = $this->gamer->getGamer($user);
            $village = $this->game->getVillage($params['village']);
            if ($gamer && $village) {
                return $this->game->destroyVillage($gamer, $village);
            }
        }
    }

    public function destroyCastle($params){
        $userId = $this->user->getUser($params['token']);
        if ($userId && $params['castle']) {
            $castle = $this->game->getCastle($params['castle']);
            $unitsInCastle = $this->game->getUnitsinCastle($params['castle']);
            $gamer = $this->gamer->getGamer($userId);
            if ($gamer && $castle && !$unitsInCastle) {
                return $this->game->destroyCastle($gamer, $castle);
            }
        }
    }

    public function updateUnits($params) {
        $postBody = file_get_contents("php://input");
        $data = json_decode($postBody);
            $userId = $this->user->getUser($data->token); 
            if  ($userId){
                $gamer = $this->gamer->getGamer($userId);
                if ($gamer) {
                    $time = $this->gamer->updateUnits($gamer, $data->myUnits, $data->otherUnits, $params['villages']);
                    if ($time) {
                        $this->game->updateMap($time);
                    }
                return true;
                } 
        }
    }
}
