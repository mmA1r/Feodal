import Phaser from "phaser";
import UnitPointer from "./UnitPointer";

export default class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, unitData) {
        super(scene);
        this.scene.physics.add.existing(this, false);
        this.body.isCircle = true;
        this.selected = false;
        this.id = unitData.id;
        this.ownerId = unitData.ownerId;
        this.x = unitData.posX * 64;
        this.y = unitData.posY * 64;
        this.unitType = unitData.type - 0;
        this.type = (this.ownerId === this.scene.player) ? 'myUnit' : "unit";
        this.speed = 5;//unitData.speed;
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
        this._setUnitStatus(unitData.status);
        this.lastDist = 0;
        this.activeRadius = 1600;
        this.atk = 10;
        this.canAttack = true;
        /*this.selectArc = new UnitPointer(this);
        this.selectArc.setVisible(true);
        this.selectArc.y +=45;
        this.selectArc.x -=5;
        this.selectArc.depth = 0;
        this.depth=500;
        this.selectArc.radius = 20;
        this.gamerTint = this.scene.add.image(this.x,this.y, 'soldierTint');
        this.gamerTint.depth=100000;
        this.gamerTint.tint = 0x008eab;
        this.selectArc.strokeColor = 0x00FF00;*/
        //this.selectArc.isFilled = false;
        //this.selectArc.isStroke = false;
        //console.log('Arcane', this.selectArc);
        //this.selectArc.addedToScene();
        //this.selectArc.addToDisplayList();
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
        if (this.lastDist < dist) {
            this._getDirection();
        }
        this.lastDist = dist;
        if (dist <= this.target.activeRadius) {
            switch (this.target.type) {
                case "unit": {
                    this.attack();
                    break;
                };
                //case "castle": true;
                //case "village": true;
                case "myCastle": {
                    this.enterCastle();
                    break;
                }
                case "pointer": {
                    this.stopped();
                    break;
                }
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

    attack() {
        if (this.canAttack) {
            setTimeout(() => { this.canAttack = true }, 2000);
            this.target.damage(this.atk);
            this.canAttack = false;
        }
        this._setUnitStatus('attack');
    }

    damage(dmg) {
        console.log(this.hp);
        this.hp -= dmg;
        this.damaged = true;
        this.scene.updateOtherUnitsGroup.add(this);    }

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
            if (obj.type != "pointer") {
                this.pointer.setVisible(false);
                this._setUnitStatus("move");
            }
            if (obj.type === "pointer") (this._distance() > 100) ? this._setUnitStatus("move") : this._setUnitStatus("stand");
        }
    }


    stopped() {
        if (this.status != "inCastle") {
            this._setUnitStatus('stand');
        }
        this.pointer.setVisible(false);
    }

    rewriteData(unitData) {
        if (!this.scene.updateOtherUnitsGroup.contains(this)) this.hp = unitData.hp - 0;
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
                    this.pointer.moveTo(this.castle.pointer.x, this.castle.pointer.y);
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
        if (this.status === 'attack') this._move();
    }
}