import Phaser from "phaser";
import UnitPointer from "./UnitPointer";

export default class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, unitData) {
        super(scene);
        this.scene.physics.add.existing(this, false);
        this.body.isCircle = true;
        this.selectArc = Phaser.Geom.Circle(this.x, this.y, 10,);
        this.selected = false;
        this.id = unitData.id;
        this.ownerId = unitData.ownerId;
        this.x = unitData.posX * 64;
        this.y = unitData.posY * 64;
        this.unitType = unitData.type - 0;
        this.type = (this.ownerId === this.scene.player) ? 'myUnit' : "unit";
        this.speed = 3;//unitData.speed;
        this.target = {
            x: unitData.posX * 64,
            y: unitData.posY * 64,
            activeRadius: 100,
            type: "pointer"
        }
        this.pointer = new UnitPointer(this);
        this.castle = this.scene.castlesGroup.getChildren().find(el => el.id === this.ownerId);
        scene.unitsGroup.add(this);

        this.direction = {
            angle: 0,
            sin: 1,
            cos: 0
        };
        this.setTexture('soldier');
        this.rewriteData(unitData);
        this._addScene();
        this.addToDisplayList();
        this.tintTopLeft = 12312;
        this._setUnitStatus(unitData.status);
    }

    _addScene() {
        this.setVisible(true);
        this.body.enable = true;
        this.addedToScene();
        this.setInteractive()
    }

    _removeScene() {
        this.setVisible(false);
        this.body.enable = false;
        this.removedFromScene();
        this.removeInteractive()
    }

    _getDirection() {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
        const normAngle = Phaser.Math.Angle.Normalize(angle);
        this.direction.angle = angle;
        this.direction.sin = Math.sin(normAngle);
        this.direction.cos = Math.cos(normAngle);
        (this.direction.cos >= 0) ? this.flipX = false : this.flipX = true;
    }

    _distance() {
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        return dx * dx + dy * dy;
    }

    _move() {
        let dist = this._distance();
        if (dist <= this.target.activeRadius) {
            switch (this.target.type) {
                //case "unit": true;
                //case "castle": true;
                //case "village": true;
                case "myCastle": this.enterCastle();
                case "pointer": this.stopped();
            }
        }
        else {
            this.x += this.direction.cos * this.speed;
            this.y += this.direction.sin * this.speed;
            this.depth = this.y;
            if (this.type === "myUnit") {
                this.scene.updateMyUnitsGroup.add(this);
            }
        }
    }

    isMine() {
        if (this.ownerId === this.scene.player) return true;
        return false;
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

    moveTo(obj) {
        if (this.status !== "inCastle") {
            this.target = obj;
            this._getDirection();
            if (obj.type != "pointer") this.pointer.setVisible(false);
            (this._distance()>100) ? this._setUnitStatus("move") : this._setUnitStatus("stand");
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
        if (this.type != "myUnit") {
            this._setUnitStatus(unitData.status);
            this._getDirection(unitData.direction);
            if (this.status === "move") this.moveTo({
                x: unitData.posX * 64,
                y: unitData.posY * 64,
                activeRadius: 100,
            })
            if (this.status === "stand") {
                this.x = unitData.posX * 64;
                this.y = unitData.posY * 64;
            }

        }
    }

    _intoCastle() {
        this.castle.units.add(this);
        this.castle.updateUI();
    }

    _outCastle() {
        this.addedToScene();
        this.castle.units.remove(this);
        this.castle.updateUI();
    }

    _setUnitStatus(status) {
        if (status !== this.status) {
            if (status === "inCastle") {
                this._intoCastle();
                this._removeScene();
            }
            else {
                if (this.status === "inCastle") {
                    this._outCastle();
                    this._addScene();
                    this.pointer.moveTo(this.castle.pointer.x,this.castle.pointer.y);
                    setTimeout(() => this.moveTo(this.pointer), 100);
                }
                if (status === "stand") {
                    //this.pointer.moveTo(this.x, this.y)
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
        if (this.status === 'move') this._move();
    }
}