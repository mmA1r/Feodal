<?php
    class User {
        function __construct($db) {
            $this->db = $db;
        }

        public function login($login,$password) {
            $user = $this->db->getUser($login);
            if ($user && $password === $user->password) {
                $token = md5(rand());
                $this->db->updateToken($user->id,$token);
                return array(
                    'name' => $user->name,
                    'token' => $token
                );
            }
            }

        public function registration($login, $password, $name) {
            $user = $this->db->getUser($login);
            if (!$user) {
                $this->db->addUser($login, $password, $name);
                return true;
            }
        }

        public function logout($user) {
            $this->db->updateToken($user,'NULL');
            return true;
        }

        function getUser($token) {
            if ($token) {
                return $this->db->getUserByToken($token);
            }
        }
    }