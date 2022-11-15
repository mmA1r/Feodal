<?php
    class Gamer {
        function __construct($db) {
            $this->db = $db;
        }

        private function getCastleLevelCost($level) {
            return 300*$level + $level*$level*200;
        }

        public function getCastle($gamer) {
            return array(
                'castle'=>array (
                    'id'=>$gamer->id,
                    'level'=>$gamer->castleLevel,
                    'posX'=>$gamer->castleX,
                    'posY'=>$gamer->castleY,
                    'money'=>$gamer->money
                )
            );
        }

        public function addCastle($user) {
            $castleX = rand(0,160000) / 1000;
            $castleY = rand(0,160000) / 1000;
            $this->db->addCastle($user, $castleX, $castleY);
            $hash = md5(rand());
            $this->db->setMapHash($hash);
            return true;
        }

        public function upgradeCastle($gamer) {
            $castle = $this->db->getCastle($gamer);
            if ($castle->Level<5) {
                $cost = $this->getCastleLevelCost($castle->castleLevel);
                if ($this->db->getMoney($gamer)>=$cost) {
                    $this->db->castleLevelUp($castle->id);
                    $this->db->updateMoney($gamer, -$cost);
                    $hash = md5(rand());
                    $this->db->setMapHash($hash);
                    return array (
                        'money'=>$this->db->getMoney($gamer)
                    );
                }
            }
        }

        public function buyUnit($gamer, $unitType) {
            $unitTypeData = $this->db->getUnitTypeData($unitType);
            if ($gamer->money>=$unitTypeData->cost) {
                $this->db->addUnit($gamer->id, $unitType, $unitTypeData->hp, $gamer->castleX, $gamer->castleY);
                $this->db->updateMoney($gamer->id, -$unitTypeData->cost);
                $hash = md5(rand());
                $this->db->setUnitsHash($hash);
                return array (
                    'money'=>$this->db->getMoney($gamer->id)
                );
            }
        }

        public function robVillage($gamer, $village) {
            $lootedMoney = (int)($village->money / 10);
            if (!$lootedMoney) {
                return $this->destroyVillage($gamer, $village);
            }
            $this->db->robVillage($village->id, $lootedMoney);
            $this->db->updateMoney($gamer, $lootedMoney);
            $hash = md5(rand());
            $this->db->setMapHash($hash);
            return array (
                'money'=>$this->db->getMoney($gamer)
            );
        }

        public function destroyVillage($gamer,$village) {
            $this->db->destroyVillage($village->id);
            $this->db->updateMoney($gamer, $village->money);
            return array (
                'money'=>$this->db->getMoney($gamer)
            );
        }

        public function getGamer($user) {
            return $this->db->getGamer($user);
        }

        public function updateUnits($gamerId, $unitsStr) {
            // $this->db->updateUnits($gamerId, $unitsStr);
            $this->db->setUnitsHash(md5(rand()));
            $statuses = $this->db->getStatuses();
            $time = microtime();
            if ($time - $statuses->mapTimeStamp >= 300) {
                $this->db->setMapTimeStamp($time);
                return $time;
            }
        }
    }