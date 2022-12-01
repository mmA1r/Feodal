import tileMap from "../../tileMap/tileMap";
import tileMapSheet from '../../../../../assets/gameSprites/spriteMap.png';
import castleSprite from '../../../../../assets/gameSprites/castle.png';
import villageSprite from '../../../../../assets/gameSprites/village.png';
import soldierSprite from '../../../../../assets/gameSprites/soldier.png';
import soldierTintSprite from '../../../../../assets/gameSprites/soldierTint.png';
import treeSprite1 from '../../../../../assets/gameSprites/tree1.png';
import treeSprite2 from '../../../../../assets/gameSprites/tree2.png';
import treeSprite3 from '../../../../../assets/gameSprites/tree3.webp';
import treeSprite4 from '../../../../../assets/gameSprites/tree4.png';
import treeSprite5 from '../../../../../assets/gameSprites/tree5.png';


export default function uploadSourses(scene) {
    const Scene = scene;
    try {
        Scene.load.image('spriteMap', tileMapSheet);
        Scene.load.image('castleFirstLevel', castleSprite);
        Scene.load.image('village', villageSprite);
        Scene.load.image('soldier', soldierSprite);
        Scene.load.image('soldierTint', soldierTintSprite);
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