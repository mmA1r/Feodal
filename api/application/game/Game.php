<?php
    class Game {
        function __construct($db) {
            $this->db = $db;
        }

        public function buyUnit($user, $unitType) {
            $castle = $this->db->getCastle($user);
            if ($castle) {
                $gold = $this->db->getGold($user);
                $cost = $this->db->getUnitCost($unitType);
                if ($gold>=$cost) {
                    $this->db->addUnit($user, $unitType);
                    $this->db->updateGold($user, -$cost);
                    $hash = md5(rand());
                    $this->db->setUnitsHash($hash);
                    return array ('gold'=>$this->db->getGold($user));
                }
            }
        }

        public function getMap() {
            return array (
                'map' => $this->db->getMap(1),
                'unitsType' => $this->db->getUnitsTypes(),
                'castlesLevel' => $this->db->getCastlesLevels()
            );
        }

        public function getScene($unitsHash, $castlesHash) {
            $unitsHashDB = $this->db->getUnitsHash();
            if ($unitsHash != $unitsHashDB) {
                $units = $this->db->getUnits();
            }
            $castlesHashDB = $this->db->getCastlesHash();
            if ($unitsHash != $unitsHashDB) {
                $castles = $this->db->getCastles();
            }
            return array (
                'unitsHash' => $unitsHashDB,
                'castlesHash' => $castlesHashDB,
                'castles' => $castles,
                'unit' => $units
            );
        }

        public function getCastle($user) {
            return $this->db->getCastle($user);
        }

        public function createCastle($user, $posX, $posY) {
            $castle = $this->db->getCastle($user);
            if (!$castle) {
                $this->db->addCastle($user, $posX, $posY);
                $hash = md5(rand());
                $this->db->setCastlesHash($hash);
            }
            return $this->db->getCastle($user);
        }

        public function upgradeCastle($user) {
            $castle = $this->db->getCastle($user);
            if ($castle && $castle->lvl<5) {
                $gold = $this->db->getGold($user);
                $cost = $this->db->getUpgradeCastleCost($castle->lvl+1);
                if ($gold>=$cost) {
                    $this->db->castleLevelUp($castle->id);
                    $this->db->updateGold($user, -$cost);
                    $hash = md5(rand());
                    $this->db->setCastlesHash($hash);
                    return array ('gold'=>$this->db->getGold($user));
                }
            }
        }

    }