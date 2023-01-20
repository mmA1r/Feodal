import Phaser from "phaser";
import Entity from "./Entity";
import UnitPointer from "./UnitPointer";

export default class Unit extends Entity {
    constructor(scene, unitData) {
        super(scene, {
            type: 'unit',
            activeRadius: 40
        });
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
        this.setXY(unitData.posX * 64,unitData.posY * 64)
        this.infographics.getModule('selectMarker').setColor(0x14b914);
        this.isMine = (this.ownerId === this.scene.player.id) ? true : false;
        this.speed = 5;
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
        this.atk = 10 - 0;
        this.canAttack = true;
        /*this.statusBar.setColor(0x14b914);
        this.statusBar.setSize(12);
        this.statusBar.setXY(this.x, this.y);*/
         /*this.selector = this.scene.add.ellipse(this.x, this.y + 22, 35, 25);
        this.selector.isStroked = true;
        this.selector.strokeColor = (this.isMine) ? 0x00FF00 : 0xFF0000;
        this.selector.lineWidth = 2;
        this.selector.setVisible(false);*/
        if (this.type === "myUnit") {
            this.scene.player.units.add(this);
            this.scene.player.updateMight();
        }
        this.isUpdated = true;
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
                    (this.target.isMine) ? this.moveTo(this.target) : this.attack();
                    break;
                };
                case "castle": {
                    (this.target.isMine) ? this.enterCastle() : this.attack();
                    break;
                };
                case "village":
                    this.target.openUI();
                    break;
                case "enemyVillage":
                    this.attack();
                    break;
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
            if (this.isMine) {
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
        if (this.selected) {
            this.data.set('dirty', true);
            this._updateUI();
        }
        if (this.type === "unit") this.scene.updateOtherUnitsGroup.add(this);
        if (this.type === "myUnit") this.scene.updateMyUnitsGroup.add(this);
    }

    updateUI() {
            //this.statusBar.updateHPBar(this.hp/120);
            this.scene.store.loadToStore({
                hp: this.hp - 0,
                type: this.unitType
            }, 'currentUnit')
            return (this.isMine) ? 'unit' : 'enemyUnit';

        /*if (this.scene.selectedUnits.getLength() > 1) {
            let soldiers = {
                fullHp: this.scene.selectedUnits.getLength() * 120,
                currentHp: this.scene.selectedUnits.getChildren().reduce((sumHp, unit) => sumHp + unit.hp, 0),
                num: this.scene.selectedUnits.getLength()
            }
            const assassin = {

            }
            this.scene.store.loadToStore({ soldiers: soldiers }, 'currentArmy')
        }*/
    }

    select() {
        super.select();
        if (this.isMine) this.pointer.setVisible(true);
    }

    unselect() {
        super.unselect();
        if (this.isMine) this.pointer.setVisible(false);
    }

    moveTo(obj) {
        if (this.status !== "inCastle") {
            this.target = obj;
            this._getDirection();
            if (obj.type != "pointer") {
                this.pointer.setVisible(false);
            } else {
                this.pointer.moveTo(obj.x, obj.y);
                this.target = this.pointer;
            }
            this._setUnitStatus("move");
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
        //HP
        const hp = unitData.hp - 0;
        const dmg = this.hp - hp;
        (dmg > 0) ? this.damage(dmg) : this.hp = hp;
        //Status
        if (!this.isMine) {
            this._setUnitStatus(unitData.status);
            //this._getDirection(unitData.direction);
            //Coords
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
        this.isUpdated = true;
    }

    killed() {
        this.pointer.destroy();
        this.scene.unitsGroup.remove(this);
        this.unselect();
        if (this.isMine) {
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
        this.timeNextUpdate = new Date() - 0;
        this.scene.updates.add(this);
    }

    enterCastle() {
        this.unselect();
        this._setUnitStatus("inCastle");
    }

    outCastle() {
        this._setUnitStatus('stand');
    }

    update() {
        if (this.status === 'move' || this.status === 'attack') 
        {
            this._move();
            this.timeNextUpdate += 33;
            this.scene.updates.add(this);
        } 
        else {
            this.scene.updates.remove(this);
        }
    }

    subscribe(subscriber){
        this.subscriber = subscriber;
    }
}