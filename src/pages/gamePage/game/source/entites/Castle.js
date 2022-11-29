import Phaser from "phaser";
import UnitPointer from "./UnitPointer";

export default class Castle extends Phaser.GameObjects.Image {
    constructor(scene, castleData) {
        super(scene);
        this.x = Math.round(castleData.posX * 64);
        this.y = Math.round(castleData.posY * 64);;
        this.depth = this.y;
        this.activeRadius = 40000;
        this.id = castleData.id;
        this.scene.castlesGroup.add(this);
        this.setTexture('castleFirstLevel');
        this.rewriteData(castleData);
        this.addedToScene();
        this.addToDisplayList();
        this.setInteractive();
        this.selected = false;
        this.type = (this.id === this.scene.player) ? 'myCastle' : "castle";
        this.scene.physics.add.existing(this, true);
        this.body.isCircle = true;
        this.units = this.scene.add.group();
        this.pointer = new UnitPointer(this);
        this.pointer.x = this.x-150;
        this.pointer.y = this.y-150;
        const name = this.scene.add.text(this.x, this.y+130,castleData.ownerName, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        name.depth = 10000000;
        name.style.setFontSize(30);
        name.style.setAlign('center')
        name.scrollFactorX = 1;
        name.scrollFactorY = 1;
    }

    select() {
        this.setTint(4234);
        this.selected = true;
        this.scene.selectedObject = this;
        this.updateUI();
        (this.id === this.scene.player)
            ? this.scene.store.loadToStore('castle', 'ui')
            : this.scene.store.loadToStore('enemyCastle', 'ui');
        this.pointer.setVisible(true);
    }

    unSelect() {
        this.setTint();
        this.selected = false;
        this.scene.selectedObject = null;
        this.scene.store.loadToStore('hide', 'ui');
        this.pointer.setVisible(false);
    }

    rewriteData(castleData) {
        this.level = castleData.level;
    }

    updateUI() {
        if (this.selected) {
            const array = this.units.getChildren().map((el) => {
                return {
                    type: el.unitType,
                    status: 'inCastle',
                    hp: el.hp
                }
            });
            this.scene.store.loadToStore({ units: array }, 'gamer');
        }
    }
}