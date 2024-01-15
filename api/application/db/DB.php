<?php
class DB {
    function __construct($config,$cache) {
        $host = $config["host"];
        $port = $config["port"];
        $name = $config["name"];
        $user = $config["user"];
        $password = $config["password"];
        $this->cache = $cache;

        try {
            $this->db = new PDO(
                'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $name,
                $user,
                $password
            );
        } catch (Exception $e) {
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
//////////////private///////////////////
////////////////////////////////////////

    // only for string
    private function simpleUpdate($table, $field, $value) {
        $query = 'UPDATE '.$table.' SET '.$field.'=?';
        $sth = $this->db->prepare($query);
        $sth->execute([$value]);
        return true;
    }

    private function simpleUpdateById($table,$field,$value,$id) {
        $query = 'UPDATE '.$table.' SET '.$field.'=? WHERE id=?';
        $sth = $this->db->prepare($query);
        $sth->execute([$value, $id]);
        return true;
    }

    private function delete($table, $condition, $value){
        $query = 'DELETE FROM '.$table.' WHERE '.$condition.'=?';
        $sth = $this->db->prepare($query);
        $sth->execute([$value]);
        return true;
    }

    private function protectQuery($query, $arr){
        $sth = $this->db->prepare($query);
        $sth->execute($arr);
        return $sth;
    }

    private function selectWithCondition($table, $fields, $condition ,$value) {
        $query = 'SELECT ' . $fields .' FROM ' . $table . ' WHERE ' . $condition . '=?';
        $sth = $this->db->prepare($query);
        $this->db->quote($value);
        $sth->execute([$value]);
        return $sth;
    }

////////////////////////////////////////
//////////////forUser///////////////////
////////////////////////////////////////

    public function getUser($login) {
        $query = 'SELECT * FROM users WHERE login=?';
        return $this->protectQuery($query,[$login])->fetchObject();
    }

    public function getUserByToken($token) {
        $query = 'SELECT id FROM users WHERE token=?';
        return $this->protectQuery($query,[$token])->fetchObject();
    }

    public function getLoggedUsers() {
        $query = '
            SELECT id,name 
            FROM users 
            WHERE token IS NOT NULL  AND token<>""';
        return $this->getArray($query);
    }

    public function addUser($login, $password, $name) {
        $query = 'INSERT INTO users (login, password, name) VALUES (?,?,?)';
        return $this->protectQuery($query,[$login, $password, $name])->fetchObject();
    }

    public function updateToken($id, $token) {
        return $this->simpleUpdateById('users', 'token', $token, $id);
    }

////////////////////////////////////////
//////////////forMessages///////////////
////////////////////////////////////////

    public function addMessage($userId, $message, $messageTo) {
        $query = 'INSERT INTO messages (userId, message, messageTo) VALUES (? ,?, ?)';
        $this->protectQuery($query,[$userId, $message, $messageTo]);
        return true;
    }

    public function getMessages($user) {
        $query = '
                    SELECT m.id, u.name as name, m.message as message, m.messageTo
                    FROM messages as m JOIN users AS u ON u.id=m.userId 
                    WHERE (userId=' . $user . ' or messageTo is NULL or messageTo=' . $user . ') ORDER BY m.id
                ';
        return $this->getArray($query);
    }

////////////////////////////////////////
//////////////forMap////////////////////
////////////////////////////////////////

    public function getMap($id) {
        $query = 'SELECT ground,plants,trees FROM Maps WHERE id=?';
        return $this->protectQuery($query,[$id])->fetchObject();
    }

    public function getUnitsTypes() {
        $query = 'SELECT * FROM unitstypes';
        return $this->getArray($query);
    }

////////////////////////////////////////
//////////////forCastles////////////////
////////////////////////////////////////

    public function addCastle($userId, $castleX, $castleY, $nextRentTime) {
        $query = 'INSERT INTO gamers (userId, castleX, castleY, nextRentTime) VALUES (?,?,?,?)';
        $this->protectQuery($query, [$userId, $castleX, $castleY, $nextRentTime]);
        return true;
    }

    public function getCastle($id) {
        $query = 'SELECT id, castleX as posX, castleY as posY, money, nextRentTime FROM gamers WHERE id='.$id;
        return $this->db->query($query)->fetchObject();
    }

    public function getCastles() {
        $query = '
                SELECT g.id as id, u.name as ownerName, g.castleLevel as Level, g.castleX as posX, g.castleY as posY
                FROM gamers as g 
                JOIN users as u ON g.userId=u.id
            ';
        return $this->getArray($query);
    }

    public function getCastlesRents() {
        $query = 'SELECT id, money, nextRentTime 
                  FROM gamers';
        return $this->getArray($query);
    }

    public function castleLevelUp($gamerId) {
        $query = 'UPDATE gamers 
                  SET castleLevel=castleLevel + 1 
                  WHERE id=?';
        $this->protectQuery($query,[$gamerId]);
        return true;
    }

    public function getMoney($gamerId) {
            $query = 'SELECT money 
                      FROM gamers 
                      WHERE id=?';
            return $this->protectQuery($query,[$gamerId])->fetchObject()->money;
        }

    public function updateMoney($gamerId, $money) {
        return $this->simpleUpdateById('gamers','money',$money,$gamerId);
    }

    public function destroyCastle($id) {
        return $this->delete('gamers','id',$id);
    }

    public function updateNextRentTime($gamerId, $time) {
        return $this->simpleUpdateById('gamers','nextRentTime',$time,$gamerId);
    }
    
    ////////////////////////////////////////
    //////////////forVillages///////////////
    ////////////////////////////////////////
    public function createVillage($name, $posX, $posY, $time) {
        $query = 'INSERT INTO villages (name, posX, posY, nextUpdateTime) 
                  VALUES ("' . $name . '", ' . $posX . ',' . $posY . ', ' . $time . ')';
        $this->db->query($query);
        return true;
    }

    public function getVillage($id) {
        $query = 'SELECT id, money, population FROM villages WHERE id=?';
        return $this->protectQuery($query,[$id])->fetchObject();
    }

    public function getVillages() {
        $query = 'SELECT * FROM villages';
        return $this->getArray($query);
    }

    public function updateVillage($id, $money, $level, $population, $time){
        $query = 'UPDATE villages 
                  SET money = ?, level = ?, population = ?, nextUpdateTime = ? 
                  WHERE id = ?';
        $this->protectQuery($query,[$money, $level, $population, $time,$id]);
        return true;
    }

    public function robVillage($id, $money) {
        return $this->simpleUpdateById('villages', 'money', $money, $id);
    }

    public function updateVillagePopulations($villageId,$population) {
        return $this->simpleUpdateById('villages', 'population', $population, $villageId);
    }

    public function destroyVillage($id) {
        return $this->delete('villages','id',$id);
    }
    ////////////////////////////////////////
    //////////////forUnits//////////////////
    ////////////////////////////////////////

    public function addUnit($gamerId, $unit, $hp, $posX, $posY) {
        $query = 'INSERT INTO units (gamerId, type, hp, posX, posY) 
                  VALUES (?,?,?,?,?)';
        $this->protectQuery($query,[$gamerId, $unit, $hp, $posX, $posY]);
        return true;
    }

    public function getUnitTypeData($unitType) {
        $query = 'SELECT cost, hp 
                  FROM unitstypes  
                  WHERE id=?';
        return $this->protectQuery($query,[$unitType])->fetchObject();
    }

    public function getUnitsInCastle($castleId){
        $query = '
        SELECT id, type, hp, posX, posY, status, direction 
        FROM units
        WHERE status="inCastle" and gamerId='.$castleId;
    return $this->getArray($query);
    }

    public function getUnits() {
        $query = '
            SELECT id, gamerId as ownerId, type, hp, posX, posY, status, direction 
            FROM units
            ORDER BY gamerId';
        return $this->getArray($query);
    }

    public function getUnit($unitId) {
        $query = 'SELECT hp
                  FROM units 
                  WHERE id=?';
    return $this->protectQuery($query,[$unitId])->fetchObject();
    }

    public function getGamerUnits($gamerId) {
        $query = 'SELECT id, type, status
                  FROM units 
                  WHERE gamerId=' . $gamerId;
    return $this->getArray($query);
    }

    // По id отдельного юнита меняет у него 
    // hp, posX, posY, status, direction в БД
    public function updateUnit($gamerId, $unitId,$hp, $posX, $posY, $status, $direction){
        $query = 'UPDATE units 
                  SET hp=?,posX=?,posY=?,status=?,direction=? 
                  WHERE id=? AND gamerId=?';
        return $this->protectQuery($query,[$hp, $posX, $posY, $status, $direction, $unitId, $gamerId]);
    }
    public function updateUnitHP($unitId,$hp){
        return $this->simpleUpdateById('units','hp',$hp,$unitId);
    }

    public function deadUnits (){
        $query = 'DELETE FROM units WHERE hp <='. 0;
        $this->db->query($query);
        return true;
    }

    ////////////////////////////////////////
    //////////////forGamers/////////////////
    ////////////////////////////////////////
    public function getGamer($userId) {
        $query = 'SELECT id, castleLevel as level, castleX as posX, castleY as posY, money, nextRentTime  
                  FROM gamers 
                  WHERE userId=?';
        return $this->protectQuery($query,[$userId])->fetchObject();
    }

    /* About statuses */
    public function getStatuses() {
        $query = 'SELECT * FROM statuses';
        return $this->db->query($query)->fetchObject();
    }

    public function setChatHash($hash) {
        return $this->simpleUpdate('statuses', 'chatHash', $hash);
    }

    public function setMapTimeStamp($time) {
        return $this->simpleUpdate('statuses', 'mapTimeStamp', $time);
    }

    public function setMapHash($hash) {
        $this->cache->delete('castles');
        $this->cache->delete('villages');
        return $this->simpleUpdate('statuses', 'mapHash', $hash);
    }

    public function setUnitsHash($hash) {
        $this->cache->delete('units');
        return $this->simpleUpdate('statuses', 'unitsHash', $hash);
    }
}
