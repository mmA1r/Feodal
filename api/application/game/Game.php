<?php
    class Game {
        function __construct($db) {
            $this->db = $db;
        }

        public function updateMap() {
            $timeDB = $this->db->getMapTimeStamp();
            $time = time();
            if ($time>=$timeDB) {
                $this->db->setMapTimeStamp($time+300);
                $this->db->updateVillagePopulations();
                $this->db->updateVillagesMoney();
                if (count($this->db->getVillages())<10){
                    $this->addVillage();
                }
                $this->db->updateVillagesLevel();
                $hash = md5(rand());
                $this->db->setMapHash($hash);
            }
        }

        public function addVillage(){
            $posX = rand(0,160000) / 1000;
            $posY = rand(0,160000) / 1000;
            switch (rand(1,4)) {
                case 1: $subname="Верхние ";
                break;
                case 2: $subname="Нижние ";
                break;
                case 3: $subname="Болотистые ";
                break;
                case 4: $subname="Далёкие ";
                break;
            }
            switch (rand(1,4)) {
                case 1: $name="Потёмки";
                break;
                case 2: $name="Свистульки";
                break;
                case 3: $name="Разгромки";
                break;
                case 4: $name="Удалёнки";
                break;
            }
            $this->db->createVillage($subname . $name, $posX, $posY);
        }

        public function getMap() {
            return array (
                'map' => $this->db->getMap()
            );
        }

        public function getUnitsTypes() {
            return $this->db->getUnitsTypes();
        }

        public function getScene($updates, $unitsHash, $mapHash) {
            $unitsHashDB = $this->db->getUnitsHash();
            if ($unitsHash != $unitsHashDB) {
                $units = $this->db->getUnits();
            }
            $mapHashDB = $this->db->getMapHash();
            if ($mapHash != $mapHashDB) { 
                $castles = $this->db->getCastles();
                $villages = $this->db->getVillages();                   
            }
            return array (
                'unitsHash' => $unitsHashDB,
                'mapHash' => $mapHashDB,
                'castles' => $castles, 
                'villages' => $villages,
                'unit' => $units
            );
        }

        public function getVillage($villageId) {
            return $this->db->getVillage($villageId);
        }
    }