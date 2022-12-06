<?php
    class Game {
        function __construct($db,$map, $config) {
            $this->db = $db;
            $this->map = $map;
            $this->config=$config;
        }

        private function addVillage(){
            //$posX = rand(10000,80000) / 1000;
            //$posY = rand(10000,80000) / 1000;
            $coor = $this->map->generationPos();
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
            $this->db->createVillage($subname.' '.$name, $coor->posX, $coor->posY);
        }

        public function getVillage($villageId) {
            return $this->db->getVillage($villageId);
        }

        public function robVillage($gamer, $village) {
            $lootedMoney = (int)($village->money / 10);
            if (!$lootedMoney) {
                return $this->destroyVillage($gamer, $village);
            }
            $this->db->robVillage($village->id, $lootedMoney);
            $this->db->updateMoney($gamer->id, $lootedMoney);
            $this->db->setMapHash(md5(rand()));
            return array (
                'money'=>$this->db->getMoney($gamer->id)
            );
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
            /*$castleX = rand(10000,80000) / 1000;
            $castleY = rand(10000,80000) / 1000;*/
            $coor = $this->map->generationPos();
            $nextRentTime = microtime(true) + 7200000;

            $castleColor = '#' . substr(md5(mt_rand()), 0, 6);

            $this->db->addCastle($userId, $castleColor, $coor->posX, $coor->posY, $nextRentTime);

            $gamer = $this->db->getGamer($userId);
            $unitTypeData = $this->db->getUnitTypeData(1);
            $this->db->addUnit($gamer->id, 1, $unitTypeData->hp, $gamer->posX, $gamer->posY, microtime(true));

            $hash = md5(rand());
            $this->db->setMapHash($hash);
            $this->db->setUnitsHash($hash);
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
            // обновить все деревни
            $isUpdated = false;
            $villages = $this->db->getVillages();
            foreach ($villages as $village) {
                if ((float)$time>=(float)$village->nextUpdateTime) {
                    $id= $village->id;
                    // посчитать новую популяцию
                    $population = $village->population + rand(1, 1+round($village->population/10,0,PHP_ROUND_HALF_EVEN));
                    // посчитать новые деньги
                    $money = $village->money + rand(1,$village->level*(1+round($village->population/10,0,PHP_ROUND_HALF_EVEN)));
                    // увеличить уровень если чо
                    $cost = 300*$village->level + $village->level*$village->level*200;
                    if ($village->money >= $cost && $village->level <5 ){
                        $level =$village->level +1;
                        $money = $village->money - $cost;
                    } else{$level= $village->level;};
            // записать в БД
                $this->db->updateVillage($id,$money,$level,$population,$time+rand(300,350));//60*$this->config->intervalUpdateVillage,60*$this->config->intervalUpdateVillage+100-10*$village->level));
                $isUpdate = true;
                }
            }
            if (!$villages || count($villages)<11) {
                $this->addVillage();
            }
            // обновить все замки
            //...
            /*$castles = $this->db->getCastles();
            foreach ($castles as $castle){
                if((float)$castle->nextRentTime<=(float)$time){
                    $rent= $this->db->getUnitsTypes()->rent * $this->db->countUnitsGamer($castle->id);
                    $gamer= $castle->id;
                    $this->db->updateMoney($gamer,-$rent);
                    if($castle->money-$rent<=0) {
                        $this->db->destroyCastle($gamer);
                    }
                    //обновить время следующей ренты
                    $isUpdate = true;
                }
            }*/
            if ($isUpdate) {
                $this->db->setMapHash(md5(rand()));
            }
        }
    }