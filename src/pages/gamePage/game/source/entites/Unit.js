import Phaser from "phaser";
import UnitPointer from "./UnitPointer";

export default class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, unitData) {
        super(scene);
        this.ownerId = unitData.ownerId;
        this.id = unitData.id;
        this.castle = this.scene.castlesGroup.getChildren().find(el => el.id === this.ownerId);
        this.selected = false;
        this.unitType = unitData.type - 0;
        this.type = 'entites';
        scene.unitsGroup.add(this);
        this.scene.physics.add.existing(this, false);
        this.speed = 3;
        this.direction = {
            angle: 0,
            sin: 1,
            cos: 0
        };
        this.body.isCircle = true;
        this.pointer = new UnitPointer(this);
        this.selectArc = Phaser.Geom.Circle(this.x, this.y, 10,);
        this.setTexture('soldier');
        this.rewriteData(unitData);
        this.addedToScene();
        this.addToDisplayList();
        this.setInteractive()
        this.tintTopLeft = 12312;
    }

    _setDirection(angle) {
        if (angle != this.direction.angle) {
            this.direction.angle = angle;
            const normAngle = Phaser.Math.Angle.Normalize(angle);
            this.direction.sin = Math.sin(normAngle);
            this.direction.cos = Math.cos(normAngle);
            (this.direction.cos >= 0) ? this.flipX = false : this.flipX = true;
        }
    }

    select() {
        this.setTint(4234);
        this.selected = true;
        this.scene.selectedUnits.add(this);
        this.pointer.setVisible(true);
        /* if (this.id = this.scene.player && this.scene.unitsGroup.getLength()===1) {
             this.scene.store.loadToStore('unit', 'ui');
         } else {
             this.scene.store.loadToStore('enemyUnit', 'ui');
         }*/
    }

    unSelect() {
        if (!this.scene.selectedObject) {
            this.setTint();
            this.selected = false;
            this.scene.selectedUnits.remove(this);
            this.pointer.setVisible(false);
        }
    }

    move(angle) {
        if (this.status != "inCastle") {
            this._setDirection(angle);
            this._setUnitStatus("move");
        }
    }

    _moved() {
        this.x += this.direction.cos * this.speed;
        this.y += this.direction.sin * this.speed;
        this.depth = this.y;
        if (this.ownerId = this.scene.player) {
            this.pointer.update();
            this.scene.updateMyUnitsGroup.add(this);
        }
    }

    stopped() {
        if (this.status != "inCastle") {
            this._setUnitStatus('stand');
        }
        this.pointer.setVisible(false);
    }

    rewriteData(unitData) {
        this.hp = unitData.hp - 0;
        this._setUnitStatus(unitData.status);
        this._setDirection(unitData.direction);
        if (this.status !== "move") {
            this.x = unitData.posX * 64;
            this.y = unitData.posY * 64;
        }
        this.depth = this.y;
    }

    _intoCastle() {
        this.setVisible(false);
        this.body.enable = false;
        this.removedFromScene();
        this.castle.units.add(this);
        this.castle.updateUI();
    }

    _outCastle() {
        this.setVisible(true);
        this.body.enable = true;
        this.addedToScene();
        this.castle.units.remove(this);
        this.castle.updateUI();
    }

    _setUnitStatus(status) {
        if (status !== this.status) {
            if (status === "inCastle") {
                this._intoCastle();
            }
            else {
                if (this.status === "inCastle") {
                    this._outCastle();
                    this.x = this.castle.pointer.x;
                    this.y = this.castle.pointer.y;
                }
                if (status === "stand") {
                    this.pointer.moveTo(this.x, this.y)
                }
            };
            this.status = status;
            this.scene.updateMyUnitsGroup.add(this);
        }
    }

    enterCastle() {
        this._setUnitStatus("inCastle");
    }

    outCastle() {
        this._setUnitStatus('stand');
    }

    update() {
        if (this.status === 'move') this._moved();
    }
}