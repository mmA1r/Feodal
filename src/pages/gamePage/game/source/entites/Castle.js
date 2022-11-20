import Phaser from "phaser";

export default class Castle extends Phaser.GameObjects.Image {
    constructor(scene, castleData) {
        super(scene);
        this.x = Math.round(castleData.posX * 64);
        this.y = Math.round(castleData.posY * 64);;
        this.id = castleData.id;
        //this.rewriteData(castleData);
        this.setActive(true);
        this.addedToScene();
        this.addToDisplayList();
    }

    rewriteData(castleData){
        
    }
}