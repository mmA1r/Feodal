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
                'ground' => $ground,
                'plants' => $plants,
                'trees' => $trees
        );
    }

    private function validPosObject($map, $posX, $posY, $type, $map, $castles, $villages){
        $isValid = true;
        foreach($castles as $castle){
            if (abs($castle->posX-$posX)+abs($castle->posY-$posY) <10) $isValid = false;
        }
        foreach($villages as $village){
            if (abs($village->posX-$posX)+abs($village->posY-$posY) <10) $isValid = false;
        }
        /*$r = 7;
        if ($posX - $r > 0) $beginI = 0 else $beginI = $posX - $r;
        if ($posY - $r > 0) $beginJ = 0 else $beginJ = $posY - $r;
        if ($posX + $r > 160) $endI = 160 else $beginI = $posX + $r;
        if ($posY + $r > 160) $endJ = 160 else $beginJ = $posY + $r;
        for($i = $beginI; $i <= $endI; $i++){
            for($j = $beginJ; $j <= $endJ; $j++){
                if ($map->trees[j][i]!=0) $isValid = false;
            }
        }*/
        //проверка элементов массива от $map[$posX-r][$posY-r] до $map[$posX+r][$posY+r], где r зависит от $type
        return $isValid;
    }

    public function generationPos(){
        $coor = new StdClass;
        $map = $this->getMap(1);
        $castles = $this->db->getCastles();
        $villages = $this->db->getVillages();
        $posX = rand(10000,150000) / 1000;
        $posY = rand(10000,150000) / 1000;
        while(!$this->validPosObject($map,$posX,$posY,1, $map, $castles,$villages)){
            $posX = rand(10000,145000) / 1000;
            $posY = rand(10000,145000) / 1000;
        };
        $coor->posX = $posX;
        $coor->posY = $posY;
        return $coor;
    }

}
