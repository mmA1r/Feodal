<?php

class Map{

    function __construct($db){
        $this->db = $db;
    }
    public function getMap($mapId) {
        $map = $this->db->getMap(1);
        $ground = array_chunk(json_decode($map->ground),160); //превращаем строку в двумерный массив чисел
        $plants = array_chunk(json_decode($map->plants),160);
        $trees = array_chunk(json_decode($map->trees),160);
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
        $coor = new StdClass;
        $map = $this->getMap(1);
        $castles = $this->db->getCastles();
        $villages = $this->db->getVillages();
        $posX = rand(15000,150000) / 1000;
        $posY = rand(15000,150000) / 1000;
        while(!$this->validPosObject(1,$posX,$posY,1, $map, $castles,$villages)){
            $posX = rand(15000,145000) / 1000;
            $posY = rand(15000,145000) / 1000;
        };
        $coor->posX = $posX;
        $coor->posY = $posY;
        return $coor;
    }

}
