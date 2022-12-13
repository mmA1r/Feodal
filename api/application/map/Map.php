<?php

class Map{

    function __construct($db){
        $this->db = $db;
    }
    public function getMap($mapId) {
        $map = $this->db->getMap();
        $ground = array_chunk(json_decode($map->layer1),160); //превращаем строку в двумерный массив чисел
        $plants = array_chunk(json_decode($map->layer2),160);
        $trees = array_chunk(json_decode($map->layer3),160);
        return array(
            'map' => array(
                'ground' => $ground,
                'plants' => $plants,
                'trees' => $trees,
            ) 
        );
    }

    private function validPosObject($mapId, $posX, $posY, $type, $map, $castles, $villages){
        
        $isValid = true;
        
        foreach($castles as $castle){
            if (abs($castle->posX-$posX)+abs($castle->posY-$posY) <15) $isValid = false;
        }
        foreach($villages as $village){
            if (abs($village->posX-$posX)+abs($village->posY-$posY) <15) $isValid = false;
        }
        //проверка элементов массива от $map[$posX-r][$posY-r] до $map[$posX+r][$posY+r], где r зависит от $type
        return $isValid;
    }

    public function generationPos(){
        $map = $this->getMap($mapId);
        $castles = $this->db->getCastles();
        $villages = $this->db->getVillages();
        $posX = rand(10000,80000) / 1000;
        $posY = rand(10000,80000) / 1000;
        while(!$this->validPosObject(1,$posX,$posY,1, $map, $castles,$villages)){
            $posX = rand(10000,80000) / 1000;
            $posY = rand(10000,80000) / 1000;
        };
        $coor->posX = $posX;
        $coor->posY = $posY;
        return $coor;
    }

}
