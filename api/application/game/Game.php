<?php

class Game {
    function __construct($db) {
        $this->db = $db;
    }

    function getMap() {
        return array('map' => $this->db->getMap());
    }
}