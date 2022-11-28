import Phaser from "phaser";

export default class Castle extends Phaser.GameObjects.Image {
    constructor(scene, castleData) {
        super(scene);
        this.x = Math.round(castleData.posX * 64);
        this.y = Math.round(castleData.posY * 64);;
        this.depth = this.y;
        this.id = castleData.id;
        this.scene.castlesGroup.add(this);
        this.setTexture('castleFirstLevel');
        this.rewriteData(castleData);
        this.addedToScene();
        this.addToDisplayList();
        this.setInteractive();
        this.selected = false;
        this.type = 'entites';
        this.scene.physics.add.existing(this, true);
        this.body.isCircle = true;
        this.units = this.scene.add.group();
        this.pointer = {x: this.x+300, y: this.y+300}
    }

    select() {
            this.setTint(4234);
            this.selected = true;
            this.scene.selectedObject = this;
            this.updateUI();
            (this.id === this.scene.player) 
            ? this.scene.store.loadToStore('castle', 'ui') 
            : this.scene.store.loadToStore('enemyCastle', 'ui');
    }

    unSelect() {
        this.setTint();
        this.selected = false;
        this.scene.selectedObject = null;
        this.scene.store.loadToStore('hide', 'ui');
    }

    rewriteData(castleData) {
        this.level = castleData.level;
    }

    updateUI(){
            const array = this.units.getChildren().map((el)=>{
                return {
                    type: el.unitType,
                    status: 'inCastle',
                    hp: el.hp
                }
            });
            this.scene.store.loadToStore({units: array}, 'gamer');
            console.log(array)
        }
}