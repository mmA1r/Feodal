import Phaser from "phaser";

export default class Castle extends Phaser.GameObjects.Image {
    constructor(scene, castleData) {
        super(scene);
        this.x = Math.round(castleData.posX * 64);
        this.y = Math.round(castleData.posY * 64);;
        this.depth = this.y;
        this.id = castleData.id;
        this.scene.castlesGroup.add(this);
        this.rewriteData(castleData);
        this.setActive(true);
        this.addedToScene();
        this.addToDisplayList();
        this.selected = false;
        this.type = 'entites';
        this.setTexture('castleFirstLevel');
        this.setInteractive();
        this.scene.physics.add.existing(this, true);
        this.body.isCircle = true;
        
    }

    select () {
        if (!this.scene.selectedUnits.getChildren()[0]){
            this.setTint(4234);
            this.selected = true;
            this.scene.selectedObject = this;
            console.log(123);
        }
    }

    unSelect () {
        this.setTint();
        this.selected = false;
        this.scene.selectedObject = null;
    }

    rewriteData(castleData){
        this.level = castleData.level;
    }
}