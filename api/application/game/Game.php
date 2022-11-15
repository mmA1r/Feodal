<?php
    class Game {
        function __construct($db) {
            $this->db = $db;
        }

        public function addVillage(){
            $posX = rand(0,160000) / 1000;
            $posY = rand(0,160000) / 1000;
            switch (rand(1,4)) {
                case 1: $subname="Верхние"; break;
                case 2: $subname="Нижние"; break;
                case 3: $subname="Болотистые"; break;
                case 4: $subname="Далёкие"; break;
            }
            switch (rand(1,4)) {
                case 1: $name="Потёмки"; break;
                case 2: $name="Свистульки"; break;
                case 3: $name="Разгромки"; break;
                case 4: $name="Удалёнки"; break;
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

        public function getVillage($villageId) {
            return $this->db->getVillage($villageId);
        }


        public function getScene($unitsHash, $mapHash) {
            $statuses = $this->db->getStatuses();
            if (
                $unitsHash === $statuses->unitsHash && 
                $mapHash === $statuses->mapHash
            ) {
                return false;
            }
            $result = array(
                'unitsHash' => $statuses->unitsHash,
                'mapHash' => $statuses->mapHash,
                'castles' => array(), 
                'villages' => array(),
                'units' => array()
            );
            if ($unitsHash !== $statuses->unitsHash) {
                $result['units'] = $this->db->getUnits();
            }
            if ($mapHash !== $statuses->mapHash) { 
                $result['castles'] = $this->db->getCastles();
                $result['villages'] = $this->db->getVillages();                   
            }
            return $result;
        }

        public function updateMap($time) {
            // обновить все деревни
            $villages = $this->db->getVillages();
            foreach ($villages as $village) {
                if ($time - $village->lastUpdate >= 1000 * 60 * 5) {
                    // посчитать новую популяцию
                    // посчитать новые деньги
                    // увеличить уровень если чо
                    // записать в БД
                    $this->db->setMapHash(md5(rand()));
                }
            }

            // обновить все замки
            //...

            /*$timeDB = $this->db->getMapTimeStamp();
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
            }*/
        }
    }