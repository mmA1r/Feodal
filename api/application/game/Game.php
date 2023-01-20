<?php
    class Game {
        function __construct($db,$map,$config,$cache) {
            $this->db = $db;
            $this->map = $map;
            $this->config = $config;
            $this->cache = $cache;
        }

        private function addVillage(){
            $coor = $this->map->generationPos();
            switch (rand(1,7)) {
                case 1: $subname="Верхние"; break;
                case 2: $subname="Нижние"; break;
                case 3: $subname="Болотистые"; break;
                case 4: $subname="Далёкие"; break;
                case 5: $subname="Старые"; break;
                case 6: $subname="Средние"; break;
                case 7: $subname="Новые"; break;
            }
            switch (rand(1,6)) {
                case 1: $name="Потёмки"; break;
                case 2: $name="Свистульки"; break;
                case 3: $name="Разгромки"; break;
                case 4: $name="Удалёнки"; break;
                case 5: $name="Полёнки"; break;
                case 6: $name="Бубрёнки"; break;
            }
            $this->db->createVillage($subname.' '.$name, $coor->posX, $coor->posY);
        }

        public function getVillage($villageId) {
            return $this->db->getVillage($villageId);
        }

        public function robVillage($gamer, $village) {
            $lootedMoney = $village->money - 50*$village->population;
            if ($lootedMoney > 0) {
                $this->db->robVillage($village->id, $lootedMoney);
                $this->db->updateMoney($gamer->id, $lootedMoney);
                $this->db->setMapHash(md5(rand()));
                return array (
                    'money'=>$this->db->getMoney($gamer->id)
                );
            }
        }

        public function destroyVillage($gamer, $village) {
            $this->db->destroyVillage($village->id);
            $this->db->updateMoney($gamer->id, $village->money);
            $this->db->setMapHash(md5(rand()));
            return array (
                'money'=>$this->db->getMoney($gamer->id)
            );
        }

        public function addCastle($userId) {
            $coor = $this->map->generationPos();
            $nextRentTime = microtime(true) + $this->config["intervalFirstRentMinutes"]*60;

            $this->db->addCastle($userId, $coor->posX, $coor->posY, $nextRentTime);

            $gamer = $this->db->getGamer($userId);
            $unitTypeData = $this->db->getUnitTypeData(1);
            $this->db->addUnit($gamer->id, 1, $unitTypeData->hp, $gamer->posX, $gamer->posY, microtime(true));

            $this->db->setMapHash(md5(rand()));
            $this->db->setUnitsHash(md5(rand()));
            return true;
        }

        public function getCastle($castleId) {
            if ($castleId) {
                return $this->db->getCastle($castleId);
            }
        }

        public function destroyCastle($killer, $victimId) {
            if ($killer->id != $victimId) {
                $victim = $this->getCastle($victimId);
                $unitsInCastle = $this->getUnitsinCastle($victim->id);
                if ($victim && !$unitsInCastle) {
                    $this->db->destroyCastle($victim->id);
                    $this->db->updateMoney($killer->id, $victim->money);
                    $this->db->setMapHash(md5(rand()));
                    return array(
                        'money'=>$this->db->getMoney($killer->id)
                    );
                }
            }
        }

        public function getScene($unitsHash, $mapHash) {
            $statuses = $this->db->getStatuses();
            $time = microtime(true);
            if ($statuses->mapTimeStamp <= $time) {
                //$this->db->deadUnits();
                $this->db->setMapTimeStamp($time + 0.15);
                $this->updateMap($time);
            }
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
                $result['units'] = $this->cache->get('units', 'getUnits');
            } else {
                $result['units'] = null;
            }
            if ($mapHash !== $statuses->mapHash) { 
                $result['castles'] = $this->cache->get('castles', 'getCastles');
                $result['villages'] = $this->cache->get('villages', 'getVillages');                  
            } else {
                $result['villages'] = null;
                $result['castles'] = null;
            }
            return $result;
        }

        public function getUnitsTypes() {
            return $this->db->getUnitsTypes();
        }

        public function getUnitsInCastle($gamerId) {
            if ($gamerId) {
                return $this->db->getUnitsInCastle($gamerId);
            }
        }

        public function getMap() {
            $map = $this->db->getMap(1);
            return array(
                'map'=>array(
                    'ground'=>json_decode($map->ground),
                    'plants'=>json_decode($map->plants),
                    'trees'=>json_decode($map->trees)
                ));
        }
        
        public function updateMap($time) {
            $time = (float)$time;
            // обновить все деревни
            $isUpdated = false;
            $villages = $this->db->getVillages();
            foreach ($villages as $village) {
                if ((float)$time>=(float)$village->nextUpdateTime) {
                    $id= $village->id;
                    // посчитать новую популяцию
                    $population = $village->population;
                    if ($village->money - 50*$village->population >= 50) {
                        $population += 1;
                    }
                    // посчитать новые деньги
                    $money = $village->money + rand(1*$village->population,2*$village->level*$village->population);
                    // увеличить уровень если чо
                    $cost = 500*$village->level + $village->level*$village->level*400;
                    if ($village->money >= $cost && $village->level < 5 ){
                        $level = $village->level + 1;
                        $money = $village->money - $cost;
                    } else{$level= $village->level;};
            // записать в БД
                $this->db->updateVillage($id,$money,$level,$population,$time+rand(300,350));//60*$this->config->intervalUpdateVillage,60*$this->config->intervalUpdateVillage+100-10*$village->level));
                $isUpdate = true;
                }
            }
            if (!$villages || count($villages)<26) {
                $this->addVillage();
            }
            // обновить все замки
            $castles = $this->db->getCastlesRents();
            $unitsTypes = $this->db->getUnitsTypes();
            foreach ($castles as $castle){
                $timeUpdate = (float)$castle->nextRentTime;
                if($time>=$timeUpdate){
                    $gamerId= $castle->id;
                    $gamerUnits = $this->db->getGamerUnits($gamerId);
                    if ($gamerUnits){
                    $rent = 0;
                        foreach($gamerUnits as $unit) {
                            $rent +=$unitsTypes[$unit->type - 1]->cost * 0.05;
                        }
                        if ($castle->money < $rent) {
                            $this->db->destroyCastle($gamerId);
                            $isUpdate = true;
                        }
                        else {
                            $this->db->updateMoney($gamerId,-$rent);
                            $this->db->updateNextRentTime($gamerId,$timeUpdate + $this->config["intervalRentMinutes"]*60);
                        }
                    }        
                }
            }
            if ($isUpdate) {
                $this->db->setMapHash(md5(rand()));
            }
        }
    }