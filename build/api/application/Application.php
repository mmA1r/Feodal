<?php

require("user/User.php");
require("db/DB.php");
require("chat/Chat.php");
require("game/Game.php");
require("gamer/Gamer.php");
require("map/Map.php");
require("./cache/Cache.php");

class Application {
    function __construct()
    {
        $config = json_decode(file_get_contents('./config/config.json'), true);
        $cache = new Cache($config["Cache"]);
        $db = new DB($config["DataBase"], $cache);
        $cache->addDB($db);
        $map = new Map($db, $cache);
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->game = new Game($db, $map, $config["Game"], $cache);
        $this->gamer = new Gamer($db, $map);
    }

    //функция проверки полученных значений в запросе
    private function checkParams($params){
        foreach($params as $param=>$value){
            if($param === 'token' && (!is_string($value) || strlen($value) != 32)){
                return false;
            }
            if($param === 'login' && (!is_string($value) || strlen($value) > 16 )){
                return false;
            }
            if($param === 'password' && (!is_string($value) && strlen($value) > 16)){
                return false;
            }
            if($param === 'name' && (!is_string($value) || strlen($value) > 16)){
                return false;
            }
            if($param === 'message' && (!is_string($value) || strlen($value) > 256)){
                return false;
            }
            if($param === 'messageTo' && !is_numeric($value)){
                return false;
            }
            if($param === 'hash' && (!is_string($value) || !strlen($value) == 32)){
                return false;
            }
            if($param === 'mapHash' && (!is_string($value) || !strlen($value) == 32) ){
                return false;
            }
            if($param === 'unitsHash' && (!is_string($value) || !strlen($value) == 32)){
                return false;
            }
            if($param === 'unitType' && !is_numeric($value)){
                return false;
            }
            if($param === 'village' && !is_numeric($value)){
                return false;
            }
            if($param === 'victimId' && !is_numeric($value)){
                return false;
            }
            if($param === 'killerId' && !is_numeric($value)){
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
            $messageTo = null;
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
        if ($this->checkParams($params)) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->game->getUnitsTypes();
            }
        }
    }

    public function getScene($params){
        if ($this->checkParams($params)) {
            if ($params['mapHash'] && $params['unitsHash']){
                $user = $this->user->getUser($params['token']);
                if ($user) {
                    return $this->game->getScene($params['unitsHash'], $params['mapHash']);
                }
            }
        }
    }

    ////////////////////////////////////////
    //////////////forGamer//////////////////
    ////////////////////////////////////////
    
    public function getCastle($params){
        if ($this->checkParams($params)) {
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
    }

    public function upgradeCastle($params){
        if ($this->checkParams($params)) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                $gamer = $this->gamer->getGamer($user);
                if ($gamer) {
                    return $this->gamer->upgradeCastle($gamer);
                }
            }
        }
    }

    public function buyUnit($params){
        if ($this->checkParams($params)) {
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
    }

    public function robVillage($params){
        if ($this->checkParams($params)) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                $gamer = $this->gamer->getGamer($user);
                $village = $this->game->getVillage($params['village']);
                if ($gamer && $village) {
                    return $this->game->robVillage($gamer, $village);
                }
            }
        }
    }

    public function destroyVillage($params){
        if ($this->checkParams($params)) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                $gamer = $this->gamer->getGamer($user);
                $village = $this->game->getVillage($params['village']);
                if ($gamer && $village) {
                    return $this->game->destroyVillage($gamer, $village);
                }
            }
        }
    }

    public function destroyCastle($params){
        if ($this->checkParams($params)) {
            $killerId = $this->user->getUser($params['token']);
            if ($killerId && $params['victimId']) {
                $killer = $this->gamer->getGamer($killerId);
                if ($killer) {
                    return $this->game->destroyCastle($killer, $params['victimId']);
                }
            }
        }
    }

    public function updateUnits($params) {
        $postBody = file_get_contents("php://input");
        try {
            $data = json_decode($postBody);
        } catch (Exception $e) {
            print_r($e->getMessage());
            die;
        }
        if ($data) {
            $userId = $this->user->getUser($data->token); 
            if  ($userId){
                $gamer = $this->gamer->getGamer($userId);
                if ($gamer) {
                    $this->gamer->updateUnits($gamer, $data->myUnits, $data->otherUnits, $data->villages);
                } 
        }
        }
    }
}
