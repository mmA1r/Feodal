<?php
    class Chat {
        function __construct($db) {
            $this->db = $db;
        }

        public function sendMessage($user, $message, $messageTo) {
            $this->db->addMessage($user, $message, $messageTo);
            $hash = md5(rand());
            $this->db->setChatHash($hash);
            return array('hash' => $hash);
        }

        public function getMessages($hash, $user) {
            $dbHash = $this->db->getChatHash();
            if ($hash != $dbHash) {
                return array(
                    'messages' => $this->db->getMessages($user),
                    'hash' => $dbHash
                );
            }
        }

        public function getLoggedUsers() {
            return $this->db->getLoggedUsers();
        }
    }