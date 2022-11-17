<?php
    class Gamer {
        function __construct($db,$map) {
            $this->db = $db;
            $this->map=$map;
        }

        private function getCastleLevelCost($level) {
            return 300*$level + $level*$level*200;
        }

        public function addCastle($userId) {
            $castleX = rand(0,160000) / 1000;
            $castleY = rand(0,160000) / 1000;
            $this->db->addCastle($userId, $castleX, $castleY);

            $gamer = $this->db->getGamer($userId);
            $unitTypeData = $this->db->getUnitTypeData(1);
            $this->db->addUnit($gamer->id, 1, $unitTypeData->hp, $gamer->posX, $gamer->posY);

            $hash = md5(rand());
            $this->db->setMapHash($hash);
            $this->db->setUnitsHash($hash);
            return true;
        }

        public function upgradeCastle($gamer) {
            if ($gamer->level < 5) {
                $cost = $this->getCastleLevelCost($gamer->level);
                if ($gamer->money >= $cost) {
                    $this->db->castleLevelUp($gamer->id);
                    $this->db->updateMoney($gamer->id, -$cost);
                    $hash = md5(rand());
                    $this->db->setMapHash($hash);
                    return array (
                        'money'=>$this->db->getMoney($gamer->id)
                    );
                }
            }
        }

        public function buyUnit($gamer, $unitType) {
            $unitTypeData = $this->db->getUnitTypeData($unitType);
            if ($gamer->money >= $unitTypeData->cost) {
                $this->db->addUnit($gamer->id, $unitType, $unitTypeData->hp, $gamer->posX, $gamer->posY);
                $this->db->updateMoney($gamer->id, -$unitTypeData->cost);
                $hash = md5(rand());
                $this->db->setUnitsHash($hash);
                return array (
                    'money'=>$this->db->getMoney($gamer->id)
                );
            }
        }

        public function getUnitsInCastle($gamerId) {
            if ($gamerId) {
                return $this->db->getUnitsInCastle($gamerId);
            }
        }

        public function robVillage($gamer, $village) {
            $lootedMoney = (int)($village->money / 10);
            if (!$lootedMoney) {
                return $this->destroyVillage($gamer, $village);
            }
            $this->db->robVillage($village->id, $lootedMoney);
            $this->db->updateMoney($gamer->id, $lootedMoney);
            $hash = md5(rand());
            $this->db->setMapHash($hash);
            return array (
                'money'=>$this->db->getMoney($gamer->id)
            );
        }

        public function destroyVillage($gamer,$village) {
            $this->db->destroyVillage($village->id);
            $this->db->updateMoney($gamer->id, $village->money);
            return array (
                'money'=>$this->db->getMoney($gamer->id)
            );
        }

        public function destroyCastle($gamer,$castle) {
            if ($gamer->id != $castle->id) {
                $this->db->destroyCastle($castle->id);
                $this->db->updateMoney($gamer->id, $castle->money);
                return array(
                    'money'=>$this->db->getMoney($gamer->id),
                );
            }
        }

        public function getGamer($userId) {
            return $this->db->getGamer($userId);
        }

        public function updateUnits($gamer,$unitsStr) {
            // foreach unit
            // $this->db->updateUnit($unitId, $hp, $posX, $posY, $status, $direction);
            // }
            $this->db->setUnitsHash(md5(rand()));
            $statuses = $this->db->getStatuses();
            $time = microtime(true);
            if ($time - $statuses->mapTimeStamp >= 0.3) {
                $this->db->setMapTimeStamp($time);
                return $time;
            }
        }
    }