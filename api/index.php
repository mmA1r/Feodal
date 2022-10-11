<?php
//--!!!--
header("Access-Control-Allow-Origin: *");
//--!!!--
error_reporting(-1);

require('application/Application.php');

function router($params) {
    $method = $params['method'];
        if($method) {
        $app = new Application();
        switch($method) {
            case 'login' : return $app->login($params);
            case 'logout' : return $app->logout();
            case 'registration' : return $app->registration();
            case 'sendMessageAll' : return $app->sendMessageAll();
            case 'sendMessageTo' : return $app->sendMessageTo();
            case 'getMessage' : return $app->getMessage();
            case 'getScene' : return $app->getScene();
            case 'getCastle' : return $app->getCastle();
            case 'command' : return $app->command();
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