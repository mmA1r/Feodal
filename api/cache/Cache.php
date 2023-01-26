<?php
class Cache {
    function __construct($config) {
        $this->apcuAvailabe = function_exists('apcu_enabled') && apcu_enabled();
    }

    public function addDB($db){
        $this->db = $db;
    }

    public function get($key, $func) {
        if ($this->apcuAvailabe) {
            $result = apcu_fetch($key);
            if ($result) {
                return $result;
            };
        };
        $result = $this->db->{$func}();
        $this->set($key,$result);
        return $result;
    }

    public function set($key, $value) {
        if ($this->apcuAvailabe) {
            return apcu_add($key, $value);
        }
        return $apcuAvailabe;
    }

    public function delete($key) {
        if ($this->apcuAvailabe) {
        return apcu_delete($key);
        }
    }

    public function clear() {
    }

    public function has() {
    }

}