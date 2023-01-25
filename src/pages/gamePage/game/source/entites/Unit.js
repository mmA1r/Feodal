import Phaser from "phaser";
import Entity from "./Entity";
import UnitPointer from "./UnitPointer";

export default class Unit extends Entity {
    constructor(scene, player, data) {
        super(scene, {
            type: 'unit',
            activeRadius: 15
        });

        this.id = data.id - 0;
        this.unitType = data.type - 0;
        this.ownerId = data.ownerId - 0;

        this.isMine = (this.ownerId === player.id) ? true : false;

        const color = (this.isMine) ? 0x14b914 : 0xff0000;

        this.infographics.addModule('statusBar', 'hpBar');
        this.hpBar = this.infographics.getModule('hpBar');
        this.hpBar.setAddXY(0, 22);
        this.hpBar.setSize(this.activeRadius * 0.8 + 6);
        this.hpBar.setType('m');
        this.hpBar.setColor(color);

        const selectMarker = this.infographics.getModule('selectMarker');
        selectMarker.setAddXY(0, 22);
        selectMarker.setColor(color);

        this.setXY(data.posX * 64, data.posY * 64);

        this.speed = this.scene.dataUnitsTypes[this.unitType].speed - 0;
        this.might = this.scene.dataUnitsTypes[this.unitType].might - 0;
        this.atk = this.scene.dataUnitsTypes[this.unitType].damage - 0;
        this.castle = this.scene.castlesGroup.getChildren().find(el => el.id === this.ownerId);

        this.direction = {
            angle: 0,
            sin: 1,
            cos: 0
        };

        if (this.isMine) {
            this.pointer = new UnitPointer(this);
            player.addUnit(this);
        }

        this.scene.unitsGroup.add(this);
        this.canAttack = true;
        this.isUpdated = true;
    }

    create(data) {
        this.setTexture(this.mainTexture);
        super.create(false);
        this.rewriteData(data);
        this._setUnitStatus(data.status);
    }

    _addScene() {
        this.setVisible(true);
        this.body.enable = true;
        this.addedToScene();
        this.setInteractive();
    }

    _removeScene() {
        console.log(123);
        this.setVisible(false);
        this.body.enable = false;
        this.removedFromScene();
        this.removeInteractive()
    }

    _getDirection() {
        if (this.target) {
            this.direction.distance = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y);
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            this.direction.sin = dy / this.direction.distance;
            this.direction.cos = dx / this.direction.distance;
            this.direction.speedX = this.direction.cos * this.speed;
            this.direction.speedY = this.direction.sin * this.speed;
            (this.direction.cos >= 0) ? this.flipX = false : this.flipX = true;
        }
    }

    _move() {
        if (this.direction.distance <= this.target.activeRadius * 1.1) {
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
                    (this.target.isNeutral) ? this.target.openUI() : this.attack();
                    break;
                case "pointer": {
                    this.stopped();
                    break;
                }
            }
        }
        else {
            this.nextX = this.x + this.direction.speedX;
            this.nextY = this.y + this.direction.speedY;
            this.direction.distance -= this.speed;
            this.setXY(this.nextX, this.nextY);
            if (this.x != this.nextX || this.y != this.nextY) this._getDirection();
            this.pointer.update();
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
    if (!this.target) this.scene.updater.remove(this.moveUpdater);
    this._setUnitStatus('attack');
}

_takeDamage() {
    this.damaged = true;
    if (this.selected) this.updateUI();
    this.hpBar.updateValue(this.hp / this.scene.dataUnitsTypes[this.unitType].hp);
}

damage(dmg) {
    /*if (!this.damaged) {
        if (this.status === "inCastle") {
            this.castle.setTint(0xFF5545);
            this.castle.damaged = true;
            setTimeout(() => {
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
    }*/
    if (this.isMine) {
        this.hp -= dmg;
    }
    else {
        this.sumDmg += dmg;
    }
    if (this.hp < 0) this.hp = 0;
    this._takeDamage();
    if (!this.isMine) this.scene.updateOtherUnitsGroup.add(this);
    if (this.isMine) this.scene.updateMyUnitsGroup.add(this);
}

updateUI() {
    this.hpBar.updateValue(this.hp / this.scene.dataUnitsTypes[this.unitType].hp);
    this.scene.store.loadToStore({
        hp: this.hp - 0,
        type: this.unitType
    }, 'currentUnit')
    return (this.isMine) ? 'unit' : 'enemyUnit';
}

select(selector) {
    super.select();
    if (this.isMine) this.pointer.setVisible(true);
    this.selector = selector;
}

unselect() {
    if (this.isMine) this.pointer.setVisible(false);
    super.unselect();
}

moveTo(obj) {
    if (obj && this.status !== "inCastle") {
        this.target = obj;
        this._getDirection();
        if (this.isMine)
            (obj.type != "pointer")
                ? this.pointer.setVisible(false)
                : this.pointer.moveTo(obj.x, obj.y);
        this._setUnitStatus("move");
        this.scene.updater.remove(this.moveUpdater);
        this.moveUpdater = this.scene.updater.add(this, new Date() - 0, 'update', false);
    }
}

stopped() {
    if (this.status != "inCastle") {
        this._setUnitStatus('stand');
    }
    if (this.isMine) this.pointer.setVisible(false);
    this.scene.updater.remove(this.moveUpdater);
}

postUpdater() {
    if (this.isMine) {
        this.scene.updateMyUnitsGroup.remove(this);
    }
    else {
        this.scene.updateOtherUnitsGroup.remove(this);
        this.sumDmg = 0;
    }
}

rewriteData(unitData) {
    //HP
    const hp = unitData.hp - 0;
    const dmg = this.hp - hp;
    if (dmg > 0) this._takeDamage();
    this.hp = hp;
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
    if (this.scene.player.selectedObject) this.scene.player.selectedObject.updateUI();
    this.pointer.destroy();
    this.scene.unitsGroup.remove(this);
    if (this.isMine) {
        this.scene.player.units.remove(this);
        this.scene.player.updateMight();
    }this.destroy();
    super.destroy();
}

_intoCastle() {
    if (this.selected) this.unselect()
    this.castle.units.add(this);
    this.castle.updateUI();
    if (this.scene.player.selectedObject) this.scene.player.selectedObject.updateUI();
    this._removeScene();
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
            this.anims.stop();
        }
        else {
            if (status === "stand") {
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
        if (this.isMine) this.scene.updateMyUnitsGroup.add(this);
    }
}

enterCastle() {
    this.unselect();
    this._setUnitStatus("inCastle");
}

outCastle() {
    this._setUnitStatus('stand');
}

update() {
    if (this.target) {
        this._move();
    }
    else {
        this.scene.updater.remove(this.moveUpdater);
    }
}

}