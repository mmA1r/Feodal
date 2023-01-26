import tileMap from "../../tileMap/extra/spriteTileSet.json";
import tileMapSheet from '../../../../../assets/gameSprites/spriteMap.png';
import castleSprite from '../../../../../assets/gameSprites/castle.png';
import villageFirstLevelSprite from '../../../../../assets/gameSprites/villageFirstLevel.png';
import villageSecondLevelSprite from '../../../../../assets/gameSprites/villageSecondLevel.png';
import soldierSprite from '../../../../../assets/gameSprites/soldier.png';
import assassinSprite from '../../../../../assets/gameSprites/assassin.png';
import soldierAtlas from '../../../../../assets/gameSprites/soldier_atlas.json';
import assassinAtlas from '../../../../../assets/gameSprites/assassin_atlas.json';
import treeSprite1 from '../../../../../assets/gameSprites/tree1.png';
import treeSprite2 from '../../../../../assets/gameSprites/tree2.png';
import treeSprite3 from '../../../../../assets/gameSprites/tree3.webp';
import treeSprite4 from '../../../../../assets/gameSprites/tree4.png';
import treeSprite5 from '../../../../../assets/gameSprites/tree5.png';
import flagSprite from '../../../../../assets/gameSprites/flag.webp';
import tower from '../../../../../assets/gameSprites/Tower.png';


export default function uploadSourses(scene) {
    const Scene = scene;
    try {
        Scene.load.image('spriteMap', tileMapSheet);
        Scene.load.image('castleFirstLevel', castleSprite);
        Scene.load.spritesheet('villageFirstLevel',villageFirstLevelSprite,{frameWidth:320,frameHeight:320});
        Scene.load.spritesheet('villageSecondLevel',villageSecondLevelSprite,{frameWidth:320,frameHeight:320});
        //Scene.load.spritesheet('soldier', soldierSprite,{frameWidth:100,frameHeight:175,startFrame:0, endFrame: 0});
        Scene.load.atlas("soldier",soldierSprite,soldierAtlas);
        Scene.load.atlas("assassin",assassinSprite,assassinAtlas);
        Scene.load.spritesheet('flag', flagSprite, {frameWidth:64,frameHeight:64});
        Scene.load.image('tree1', treeSprite1);
        Scene.load.image('tree2', treeSprite2);
        Scene.load.image('tree3', treeSprite3);
        Scene.load.image('tree4', treeSprite4);
        Scene.load.image('tree5', treeSprite5);
        Scene.load.tilemapTiledJSON('tilemap', tileMap);
    } catch (e) {
        console.log('something wrong', e);
    }
}