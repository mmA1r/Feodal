<?php
    class DB {
        function __construct($config) {
            $host = $config["host"];
            $port = $config["port"];
            $name = $config["name"];
            $user = $config["user"];
            $password = $config["password"];

            try {
                $this->db = new PDO(
                    'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $name,
                    $user,
                    $password
                );
            }

            catch(Exception $e) {
                print_r($e->getMessage());
                die;
            }
        }

        function __destruct() {
            $this->db = null;
        }

        private function getArray($query) {
            $stmt = $this->db->query($query);
            if ($stmt) {
                $result = array();
                while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
                    $result[] = $row;
                }
                return $result;
            }
        }

        ////////////////////////////////////////
        //////////////forUser///////////////////
        ////////////////////////////////////////

        public function getUser($login) {
            $query = 'SELECT * FROM users WHERE login="' . $login . '"';
            return $this->db->query($query)->fetchObject();
        }

        public function getUserByToken($token) {
            $query = 'SELECT id FROM users WHERE token="' . $token . '"';
            return $this->db->query($query)->fetchObject()->id;
        }

        public function getLoggedUsers() {
            $query = 'SELECT id,name FROM users WHERE token IS NOT NULL  AND token<>""';
            return $this->getArray($query);
        }

        public function addUser($login, $password, $name) {
            $query = 'INSERT INTO users (login, password, name) VALUES ("' . $login . '","' . $password . '","' .  $name . '")';
            $this->db->query($query);
        }

        public function updateToken($id, $token){
            $query = 'UPDATE users SET token="' . $token . '" WHERE id=' . $id;
            $this->db->query($query);
            return true;
        }

        ////////////////////////////////////////
        //////////////forMessages///////////////
        ////////////////////////////////////////

        public function addMessage($user, $message, $messageTo){
            $query = 'INSERT INTO messages (userId, message, messageTo) VALUES (' . $user . ',"' . $message . '", ' .  $messageTo . ')';
            $this->db->query($query);
            return true;
        }

        public function getMessages($user) {
            $query = 'SELECT u.name as name, m.message as message, m.messageTo, m.id FROM messages as m JOIN users AS u ON u.id=m.userId WHERE (userId=' . $user . ' or messageTo is NULL or messageTo=' . $user . ') ORDER BY m.id';
            return $this->getArray($query);
        }

        public function getChatHash() {
            $query = 'SELECT chatHash FROM statuses';
            return $this->db->query($query)->fetchObject()->chatHash;
        }

        public function setChatHash($hash){
            $query = 'UPDATE statuses SET chatHash="' . $hash . '"';
            $this->db->query($query);
        }

        ////////////////////////////////////////
        //////////////forMap////////////////////
        ////////////////////////////////////////
        public function getMap($id) {
            $query = 'SELECT map FROM Maps WHERE id=' . $id;
            return $this->db->query($query)->fetchObject()->map;
        }

        public function getUnitsTypes() {
            $query = 'SELECT * FROM unitsTypes';
            return $this->getArray($query);
        }

        public function getCastlesLevels() {
            $query = 'SELECT * FROM castlesLevels';
            return $this->getArray($query);
        }

        ////////////////////////////////////////
        //////////////forCastles////////////////
        ////////////////////////////////////////

        public function addCastle($user, $posX, $posY) {
            $query = 'INSERT INTO castles (ownerId, hp, posX, posY) VALUES (' . $user . ', (SELECT MaxHp FROM castlesLevels WHERE id=1), ' . $posX. ', ' . $posY. ')';
            $this->db->query($query);
            return true;
        }

        public function getCastle($user) {
            $query = 'SELECT id, gold, lvl, hp, posX, posY  FROM castles WHERE ownerId=' . $user;
            return $this->db->query($query)->fetchObject();
        }

        public function getCastles() {
            $query = 'SELECT id, ownerId, lvl, hp, posX, posY FROM castles';
            return $this->getArray($query);
        }

        public function castleLevelUp($id){
            $query = 'UPDATE castles SET lvl= lvl + 1  WHERE id=' . $id ;
            $this->db->query($query);
            return true;
        }

        public function getUpgradeCastleCost($lvl){
            $query = 'SELECT cost FROM castlesLevels WHERE Id=' . $lvl;
            return $this->db->query($query)->fetchObject()->cost;
        }

        public function getGold($user){
            $query = 'SELECT gold FROM castles WHERE ownerId=' . $user;
            return $this->db->query($query)->fetchObject()->gold;
        }

        public function updateGold($user, $gold){
            $query = 'UPDATE castles SET gold=gold+'. $gold . ' WHERE ownerId=' . $user ;
            $this->db->query($query);
            return true;
        }

        public function getCastlesHash() {
            $query = 'SELECT castlesHash FROM statuses';
            return $this->db->query($query)->fetchObject()->castlesHash;
        }

        public function setCastlesHash($hash){
            $query = 'UPDATE statuses SET castlesHash="' . $hash . '"';
            $this->db->query($query);
        }

        ////////////////////////////////////////
        //////////////forUnits//////////////////
        ////////////////////////////////////////

        public function addUnit($user, $unit) {
            $query = 'INSERT INTO units (ownerId, typeId, hp) VALUES (' . $user . ',' . $unit . ', (SELECT maxHp FROM unitsTypes WHERE id='. $unit .'))';
            $this->db->query($query);
            return true;
        }

        public function getUnitCost($unitType) {
            $query = 'SELECT cost FROM unitsType WHERE id=' . $unitType;
            return $this->db->query($query)->fetchObject()->cost;
        }

        public function getUnits() {
            $query = 'SELECT * FROM units';
            return $this->getArray($query);
        }

        public function getUserUnits($user) {
            $query = 'SELECT * FROM units WHERE ownerId=' . $user;
            return $this->getArray($query);
        }

        public function getUnitsHash() {
            $query = 'SELECT unitsHash FROM statuses';
            return $this->db->query($query)->fetchObject()->unitsHash;
        }

        public function setUnitsHash($hash) {
            $query = 'UPDATE statuses SET unitsHash="' . $hash . '"';
            $this->db->query($query);
        }
    }