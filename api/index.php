<?php

header("Access-Control-Allow-Origin: *");

require('application/Application.php');

function router($params) {
    $method = $params['method'];
        if($method) {
        $app = new Application();
        switch($method) {
            //auth
            case 'login' : return $app->login($params);
            case 'logout' : return $app->logout($params);
            case 'registration' : return $app->registration($params);
            //chat
            case 'getLoggedUsers' : return $app->getLoggedUsers($params);
            case 'sendMessageAll' : return $app->sendMessageAll($params);
            case 'sendMessageTo' : return $app->sendMessageTo($params);
            case 'getMessage' : return $app->getMessage($params);
            //game
            case 'getScene' : return $app->getScene($params);
            case 'getCastle' : return $app->getCastle($params);
            case 'command' : return $app->command($params);
        }
    }
    return false;
}

function answer($data) {
    if($data) {
        return array(
            'result' => 'ok',
            'data' => $data
        );
    } else {
        return array('result' => 'error');
    }
}

echo json_encode(answer(router($_GET)));