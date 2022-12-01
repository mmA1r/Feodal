<?php
/*header("Access-Control-Allow-Methods: ");
header("Access-Control-Allow-Headers: *");*/
//header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
//header('Access-Control-Max-Age: 1728000');
header("Access-Control-Allow-Headers: X-PINGOTHER, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
require("application/Application.php");


function router($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'check' : return true;
            //////////
            // USER //
            //////////
            case 'login': return $app->login($params);
            case 'logout': return $app->logout($params);
            case 'registration': return $app->registration($params);
            //////////
            // CHAT //
            //////////
            case 'getLoggedUsers': return $app->getLoggedUsers($params);
            case 'sendMessageAll': return $app->sendMessage($params, "all");
            case 'sendMessageTo': return $app->sendMessage($params, "private");
            case 'getMessages': return $app->getMessages($params);
            ///////////
            // GAMER //
            ///////////
            case 'getCastle': return $app->getCastle($params);
            case 'upgradeCastle': return $app->upgradeCastle($params);
            case 'buyUnit': return $app->buyUnit($params);
            case 'robVillage': return $app->robVillage($params);
            case 'destroyVillage': return $app->destroyVillage($params);
            case 'destroyCastle': return $app->destroyCastle($params);
            ///////////
            // GAME //
            //////////
            case 'getMap': return $app->getMap($params);
            case 'getScene': return $app->getScene($params);
            case 'getUnitsTypes': return $app->getUnitsTypes($params);
            case 'updateUnits': return $app->updateUnits($params);
        }
    }
    return false;
}

function answer($data) {
    if ($data) {
        return array(
            'result' => 'ok',
            'data' => $data
        );
    }
    return array(
        'result' => 'error'
    );
}

echo(json_encode(answer(router($_GET))));