import Phaser from "phaser";
import UnitPointer from "./UnitPointer";

export default class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, unitData) {
        super(scene);
        this.scene.physics.add.existing(this, false);
        this.body.isCircle = true;
        this.selected = false;
        this.id = unitData.id;
        this.might = 5;
        this.unitType = unitData.type - 0;
        switch (this.unitType) {
            case 1: 
            this.mainTexture = 'soldier';
            this.setTexture(this.mainTexture);
            this.setDisplaySize(40, 70);
            break;
            case 2:
                this.mainTexture = 'assassin';
                this.setTexture(this.mainTexture);
                this.setDisplaySize(50, 50);
            break;
        }
        this.ownerId = unitData.ownerId;
        this.x = unitData.posX * 64;
        this.y = unitData.posY * 64;
        this.depth = this.y;
        this.type = (this.ownerId === this.scene.player.id) ? 'myUnit' : "unit";
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
        this.rewriteData(unitData);
        this.addToDisplayList();
        if (unitData.status !== "inCastle") this._addScene();
        this._setUnitStatus(unitData.status);
        this.lastDist = 0;
        this.activeRadius = 1600;
        this.atk = 10 - 0;
        this.canAttack = true;
        this.selector = this.scene.add.ellipse(this.x, this.y + 22, 35, 25);
        this.selector.isStroked = true;
        this.selector.strokeColor = (this.type === "myUnit") ? 0x00FF00 : 0xFF0000;
        this.selector.lineWidth = 2;
        this.selector.setVisible(false);
        if (this.type === "myUnit") {
            this.scene.player.units.add(this);
            this.scene.player.updateMight();
        }
    }

    _addScene() {
        this.setVisible(true);
        this.body.enable = true;
        this.addedToScene();
        this.setInteractive();

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
                case "castle": {
                    this.attack();
                    break;
                };
                case "village":
                    this.target.openUI();
                    break;
                case "enemyVillage":
                        this.attack();
                        break;
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
            this.selector.x = this.x;
            this.selector.y = this.y + 22;
            this.depth = this.y;
            if (this.type === "myUnit") {
                this.scene.updateMyUnitsGroup.add(this);
            }
        }
    }

    attack() {
        if (this.canAttack && this.target) {
            this.canAttack = false;
            setTimeout(() => { this.canAttack = true }, 2000);
            this.target.damage(this.atk);
        }
        this._setUnitStatus('attack');
    }

    damage(dmg) {
        if (!this.damaged) {
            if (this.status === "inCastle") {
                this.castle.setTint(0xFF5545);
                this.castle.damaged = true;
                setTimeout(() => {
                    this.castle.setTint();
                    this.castle.damaged = false;
                }, 300);
            }
            else {
                this.damageFrameOn();
                this.damaged = true;
                setTimeout(() => {
                    this.damageFrameOff()
                    this.damaged = false;
                }, 300);
            }
        }
        this.hp -= dmg;
        if (this.hp < 0) this.hp = 0;
        this.damaged = true;
        if (this.selected) this._updateUI();
        if (this.type === "unit") this.scene.updateOtherUnitsGroup.add(this);
        if (this.type === "myUnit") this.scene.updateMyUnitsGroup.add(this);
    }

    isMine() {
        if (this.ownerId === this.scene.player.id) return true;
        return false;
    }

    _updateUI() {
        if (this.scene.selectedUnits.getLength() === 1) {
            this.scene.store.loadToStore({
                hp: this.hp - 0,
                type: this.unitType
            }, 'currentUnit')
        }
        if (this.scene.selectedUnits.getLength() > 1) {
            let soldiers = {
                fullHp: this.scene.selectedUnits.getLength() * 120,
                currentHp: this.scene.selectedUnits.getChildren().reduce((sumHp, unit) => sumHp + unit.hp, 0),
                num: this.scene.selectedUnits.getLength()
            }
            this.scene.store.loadToStore({ soldiers: soldiers }, 'currentArmy')
        }
    }

    select() {
        this.selector.setVisible(true);
        this.selected = true;
        this.scene.selectedUnits.add(this);
        if (this.scene.selectedUnits.getLength() === 1) {
            (this.type === "myUnit") ? this.scene.store.loadToStore('unit', 'ui') : this.scene.store.loadToStore('enemyUnit', 'ui');
        } else {
            this.scene.store.loadToStore('hide', 'ui');
        }
        this._updateUI();
    }

    unSelect() {
        if (!this.scene.selectedObject && this.selected) {
            this.selector.setVisible(false);
            if (this.scene.selectedUnits.getLength() === 1) this.scene.store.loadToStore('hide', 'ui');
            this.scene.selectedUnits.remove(this);
            this._updateUI();
            this.pointer.setVisible(false);
            this.selected = false;
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
        this.depth = this.y;
    }

    rewriteData(unitData) {
        unitData.hp = unitData.hp - 0;
        this.hp = unitData.hp;
        const dmg = this.hp - unitData.hp;
        (dmg > 0) ? this.damage(dmg) : this.hp = unitData.hp;
        if (this.type !== "myUnit") {
            this._setUnitStatus(unitData.status);
            this._getDirection(unitData.direction);
            if (this.visible && this.status === "move") {
                this.moveTo({
                    x: unitData.posX * 64,
                    y: unitData.posY * 64,
                    activeRadius: 100,
                    type: "pointer"
                })
            } 
            else {
                this.x = unitData.posX * 64;
                this.y = unitData.posY * 64;
            }
        }
    }

    killed() {
        this.selector.destroy();
        this.pointer.destroy();
        this.scene.unitsGroup.remove(this);
        this.unSelect();
        if (this.type === "myUnit") {
            this.scene.player.units.remove(this);
            this.scene.player.updateMight();
        }
        this.destroy();
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
                this.status = status;
                this._intoCastle();
                this._removeScene();
                this.anims.stop();
            }
            else {
                if (status === "stand") {
                    this.pointer.moveTo(this.x, this.y);
                    this.anims.stop();
                    this.setTexture(this.mainTexture);
                }
                if (status === "move") {
                    if (this.anims.get("move")) this.anims.play("move", true);
                }
                if (status === "attack") {
                    this.anims.stop();
                    this.setTexture(this.mainTexture);
                }
                if (this.status === "inCastle") {
                    this._outCastle();
                    this._addScene();
                    this.pointer.moveTo(this.castle.pointer.x, this.castle.pointer.y);
                    setTimeout(() => this.moveTo(this.pointer), 100);
                }
            };
            this.status = status;
            if (this.type === "myUnit") this.scene.updateMyUnitsGroup.add(this);
        }
    }

    enterCastle() {
        this.unSelect();
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