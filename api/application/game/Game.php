<?php

class Game {
    function __construct($db) {
        $this->db = $db;
    }

    function getMap() {
        return array('map' => $this->db->getMap());
    }
    public function getCastle($user) {
        return $this->db->getCastle($user->id);
    }
    public function castleLevelUp($user){
        return $this->db->castleLevelUp($user->id);
    }
}