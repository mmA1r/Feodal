<?php
    class Gamer {
        function __construct($db,$map) {
            $this->db = $db;
            $this->map=$map;
        }

        public function getGamer($userId) {
            return $this->db->getGamer($userId);
        }
        
        public function getCastleLevelCost($level) {
            return 300*$level + $level*$level*200;
        }

        public function upgradeCastle($gamer) {
            if ($gamer->level < 5) {
                $money = $gamer->money - $this->getCastleLevelCost($gamer->level);
                if ($money >= 0) {
                    $this->db->castleLevelUp($gamer->id);
                    $this->db->updateMoney($gamer->id, $money);
                    $this->db->setMapHash(md5(rand()));
                    return array (
                        'money'=>$this->db->getMoney($gamer->id),
                        'castleUpgradeCost'=> $this->getCastleLevelCost($gamer->level+1)
                    );
                }
            }
        }

        public function buyUnit($gamer, $unitType) {
            $unitTypeData = $this->db->getUnitTypeData($unitType);
            $money = $gamer->money - $unitTypeData->cost;
            if ($money >= 0) {
                $this->db->addUnit($gamer->id, $unitType, $unitTypeData->hp, $gamer->posX, $gamer->posY);
                $this->db->updateMoney($gamer->id, $money);
                $this->db->setUnitsHash(md5(rand()));
                return array (
                    'money'=>$this->db->getMoney($gamer->id)
                );
            }
        }

        public function updateUnits($gamer,$myUnits,$otherUnits,$villages) {
            if ($myUnits) {
                $this->updateGamerUnits($gamer,$myUnits);
            }
            if ($otherUnits) {
                $this->updateOtherUnits($otherUnits);
            }
            if ($villages) {
                $this->damageVillages($villages);
            }
        }

        private function updateGamerUnits($gamer,$myUnits){
            $isUpdate = false;
            foreach($myUnits as $myUnit){
                $dbUnit = $this->db->getUnit($myUnit->id);
                if($dbUnit){
                    if($myUnit->hp>$dbUnit->hp)$myUnit->hp=$dbUnit->hp;      
                    $this->db->updateUnit($gamer->id,$myUnit->id,$myUnit->hp,$myUnit->posX,$myUnit->posY,$myUnit->status,$myUnit->direction);
                    $isUpdate = true;
                }
            }  
            if ($isUpdate) {
                $this->db->deadUnits();
                $this->db->setUnitsHash(md5(rand()));
            }
        }

        private function updateOtherUnits($otherUnits){
            $isUpdate = false;
            foreach ($otherUnits as $otherUnit){
                    $dbUnit = $this->db->getUnit($otherUnit->id);
                    if ($dbUnit && $otherUnit->dmg > 0){
                        $this->db->updateUnitHP($otherUnit->id ,$dbUnit->hp - $otherUnit->dmg);
                        $isUpdate = true;
                    }
            }
            if ($isUpdate) {
                $this->db->deadUnits();
                $this->db->setUnitsHash(md5(rand()));
            }
        }

        private function damageVillages($villages){
            $isUpdate = false;
            foreach($villages as $village){
                    $dbVillage=$this->db->getVillage($village->id);
                    if($dbVillage){
                        $this->db->updateVillagePopulations($village->id, $dbVillage->population - $village->dmg);
                        $isUpdate = true;
                    }
            }
            if ($isUpdate){
                $this->db->setMapHash(md5(rand()));
            }
        }
    }
