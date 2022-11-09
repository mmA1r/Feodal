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
    //////////////forUser///////////////////
    ////////////////////////////////////////

    public function getUser($login) {
        $query = '
            SELECT * 
            FROM users 
            WHERE login="' . $login . '"';
        return $this->db->query($query)->fetchObject();
    }

    public function getUserByToken($token) {
        $query = '
            SELECT id 
            FROM users 
            WHERE token="' . $token . '"';
        return $this->db->query($query)->fetchObject()->id;
    }

    public function getLoggedUsers() {
        $query = '
            SELECT id,name 
            FROM users 
            WHERE token IS NOT NULL  AND token<>""';
        return $this->getArray($query);
    }

    public function addUser($login, $password, $name) {
        $query = '
            INSERT INTO users (login, password, name) 
            VALUES ("' . $login . '","' . $password . '","' .  $name . '")';
        $this->db->query($query);
    }

    public function updateToken($id, $token) {
        $query = '
            UPDATE users 
            SET token="' . $token . '" 
            WHERE id=' . $id;
        $this->db->query($query);
        return true;
    }

    ////////////////////////////////////////
    //////////////forMessages///////////////
    ////////////////////////////////////////

    public function addMessage($user, $message, $messageTo) {
        $query = '
                INSERT INTO messages (userId, message, messageTo) 
                VALUES (' . $user . ',"' . $message . '", ' .  $messageTo . ')
            ';
        $this->db->query($query);
        return true;
    }

    public function getMessages($user) {
        $query = '
                    SELECT u.name as name, m.message as message, m.messageTo, m.id
                    FROM messages as m JOIN users AS u ON u.id=m.userId 
                    WHERE (userId=' . $user . ' or messageTo is NULL or messageTo=' . $user . ') ORDER BY m.id
                ';
        return $this->getArray($query);
    }

    public function getChatHash() {
        $query = '
                SELECT chatHash 
                FROM statuses
            ';
        return $this->db->query($query)->fetchObject()->chatHash;
    }

    public function setChatHash($hash) {
        $query = '
                UPDATE statuses 
                SET chatHash="' . $hash . '"
            ';
        $this->db->query($query);
    }

    ////////////////////////////////////////
    //////////////forMap////////////////////
    ////////////////////////////////////////
    public function getMap() {
        $query = '
                SELECT tiles
                FROM Maps
            ';
        return $this->getArray($query);
    }

    public function getUnitsTypes() {
        $query = '
                SELECT * 
                FROM unitsTypes
            ';
        return $this->getArray($query);
    }

    public function getMapTimeStamp() {
        $query = 'SELECT mapTimeStamp FROM statuses';
        return $this->db->query($query)->fetchObject()->mapTimeStamp;
    }

    public function setMapTimeStamp($time) {
        $query = 'UPDATE statuses SET mapTimeStamp="' . $time . '"';
        $this->db->query($query);
    }

    ////////////////////////////////////////
    //////////////forCastles////////////////
    ////////////////////////////////////////

    public function addCastle($user, $castleX, $castleY) {
        $query = '
                INSERT INTO gamers (userId, castleX, castleY) 
                VALUES (' . $user . ', ' . $castleX . ',' . $castleY . ')
            ';
        $this->db->query($query);
        return true;
    }

    public function getCastle($gamerId) {
        $query = '
                SELECT id, castleLevel, castleX, castleY, money
                FROM gamers
                WHERE id=' . $gamerId;
        return $this->db->query($query)->fetchObject();
    }

    public function getCastles() {
        $query = '
                SELECT id, userId, castleLevel, castleX as posX, castleY as posY 
                FROM gamers
            ';
        return $this->getArray($query);
    }

    public function castleLevelUp($gamerId) {
        $query = '
                UPDATE gamers SET 
                castleLevel=castleLevel + 1   
                WHERE id=' . $gamerId;
        $this->db->query($query);
        return true;
    }

    public function getMoney($gamerId) {
            $query = '
            SELECT money 
            FROM gamers 
            WHERE id=' . $gamerId;
            return $this->db->query($query)->fetchObject()->money;
        }

    public function updateMoney($gamer, $money) {
        $query = '
            UPDATE gamers 
            SET money=money+' . $money . ' 
            WHERE id=' . $gamer;
        $this->db->query($query);
        return true;
    }

    public function getMapHash() {
        $query = 'SELECT mapHash FROM statuses';
        return $this->db->query($query)->fetchObject()->mapHash;
    }

    public function setMapHash($hash) {
        $query = 'UPDATE statuses SET mapHash="' . $hash . '"';
        $this->db->query($query);
    }

    public function destroyCastle($id) {
        $query = 'DELETE FROM gamers
        WHERE id=' . $id;
        $this->db->query($query);
        return true;
    }

    ////////////////////////////////////////
    //////////////forVillages///////////////
    ////////////////////////////////////////
    public function createVillage($name, $posX, $posY) {
        $query = 'INSERT INTO villages (name, posX, posY) 
        VALUES ("' . $name . '", ' . $posX . ',' . $posY . ')';
        $this->db->query($query);
        return true;
    }

    public function getVillage($id) {
        $query = 'SELECT id, money, population FROM villages';
        return $this->db->query($query)->fetchObject();
    }

    public function getVillages() {
        $query = 'SELECT * FROM villages';
        return $this->getArray($query);
    }

    public function updateVillagesLevel() {
        $query = 'UPDATE villages 
                SET money = money - 300*level-level*level*200,
                level=level + 1
                WHERE (money>300*level+level*level*200) AND (level<11)';
        $this->db->query($query);
        return true;
    }

    public function updateVillagesMoney() {
        $query = 'UPDATE villages SET
            money= money + population * 2';
        $this->db->query($query);
        return true;
    }

    public function updateVillagePopulations() {
        $query = 'UPDATE villages SET
        population = population + 1';
    }

    public function robVillage($id, $money) {
        $query = 'UPDATE villages SET
            money=money - ' . $money . '
            WHERE id=' . $id;
        $this->db->query($query);
        return true;
    }

    public function destroyVillage($id) {
        $query = 'DELETE FROM villages
        WHERE id=' . $id;
        $this->db->query($query);
        return true;
    }
    ////////////////////////////////////////
    //////////////forUnits//////////////////
    ////////////////////////////////////////

    public function addUnit($gamer, $unit) {
        $query = '
            INSERT INTO units (gamerId, type, hp, posX, posY) 
            VALUES (' . $gamer . ',' . $unit . ', (SELECT hp FROM unitsTypes WHERE id=' . $unit . '),(SELECT castleX FROM gamers WHERE id=' . $gamer . '),(SELECT castleY FROM gamers WHERE id=' . $gamer . ') )';
        $this->db->query($query);
        return true;
    }

    public function getUnitCost($unitType) {
        $query = '
            SELECT cost 
            FROM unitsTypes 
            WHERE id=' . $unitType;
        return $this->db->query($query)->fetchObject()->cost;
    }

    public function getUnits() {
        $query = '
            SELECT u.id as id, g.userId as userId, u.type as type, u.hp as hp, u.posX as posX, u.posY as posY, u.status as status, u.direction as direction 
            FROM units as u JOIN gamers as g ON u.gamerId=g.id
            ORDER BY gamerId';
        return $this->getArray($query);
    }

    public function getUnitsHash() {
        $query = '
            SELECT unitsHash 
            FROM statuses';
        return $this->db->query($query)->fetchObject()->unitsHash;
    }

    public function setUnitsHash($hash) {
        $query = '
            UPDATE statuses 
            SET unitsHash="' . $hash . '"';
        $this->db->query($query);
    }

    ////////////////////////////////////////
    //////////////forGamers/////////////////
    ////////////////////////////////////////
    public function getGamer($user) {
        $query = '
            SELECT id 
            FROM gamers 
            WHERE userId=' . $user;
        return $this->db->query($query)->fetchObject()->id;
    }

    /*public function getGamerByToken($token) {
            $query = 'SELECT g.id AS id FROM gamers AS g JOIN users as u ON g.userId=u.id WHERE u.token=' . $token;
            return $this->db->query($query)->fetchObject()->id;
        }*/
}
