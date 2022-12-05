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
        this.pointer.x = this.x - 150;
        this.pointer.y = this.y - 150;
        this.onServer = true;
        this.selector = this.scene.add.ellipse(this.x - 10, this.y + 45, 250, 170);
        this.selector.isStroked = true;
        this.selector.strokeColor = (this.type === "myCastle") ? 0x00FF00 : 0xFF0000;
        this.selector.lineWidth = 2;
        this.selector.setVisible(false);
        const name = this.scene.add.text(this.x, this.y + 130, castleData.ownerName, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        name.depth = 10000000;
        name.style.setFontSize(30);
        name.style.setAlign('center')
        name.scrollFactorX = 1;
        name.scrollFactorY = 1;
    }

    select() {
        let unit = this.scene.selectedUnits.getChildren()[0];
        while (unit) {
            unit.unSelect();
            unit = this.scene.selectedUnits.getChildren()[0];
        }
        this.selector.setVisible(true);
        this.selected = true;
        this.scene.selectedObject = this;
        this.updateUI();
        if (this.type === "myCastle") {
            this.scene.store.loadToStore('castle', 'ui');
            this.pointer.setVisible(true);
        }
        else {
            this.scene.store.loadToStore('enemyCastle', 'ui');
        }
    }

    unSelect() {
        this.setTint();
        this.selected = false;
        this.selector.setVisible(false);
        this.scene.selectedObject = null;
        this.scene.store.loadToStore('hide', 'ui');
        this.pointer.setVisible(false);
    }

    killed() {
        if (!this.onServer && this.hp <= 0) {
            this.selector.destroy();
            this.pointer.destroy();
            this.unSelect();
            this.scene.unitsGroup.remove(this);
            this.destroy();
        }
    }

    rewriteData(castleData) {
        this.onServer = true;
        this.level = castleData.level;
    }

    damage(dmg) {
        if (this.units.getChildren()[0]) {
            this.units.getChildren()[0].damage(dmg);
        }
        else {
            this.destroy();
        }
        this.damaged = true;
        if (this.selected) this._updateUI();
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