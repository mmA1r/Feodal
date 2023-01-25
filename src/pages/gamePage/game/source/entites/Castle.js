import UnitPointer from "./UnitPointer";
import DestroyCastle from "../destroyCastle/DestroyCastle";
import Entity from "./Entity";

export default class Castle extends Entity {
    constructor(scene, data) {
        super(scene, {
            type: 'castle',
            activeRadius: 260,
        });
        this.infographics.addModule('name', 'name', false);
        this.infographics.addModule('statusBar', 'hpBar');
        const name = this.infographics.getModule('name');
        name.setAddXY(120, 130);

        this.units = this.scene.add.group();

        this.hpBar = this.infographics.getModule('hpBar');
        this.hpBar.setAddXY(0, 60);
        this.hpBar.setSize(this.activeRadius*0.8+10);
        this.hpBar.setType('l');

        const selectMarker = this.infographics.getModule('selectMarker');
        selectMarker.setAddXY(0, 60);
        this.setXY(data.posX * 64, data.posY * 64)
        this.pointer = new UnitPointer(this);
        this.canAttack = true;

        this.id = data.id - 0;
        this.isMine = (this.id === this.scene.player.id) ? true : false;
        if (this.isMine) this.scene.player.addCastle(this);
        const color = (this.isMine) ? 0x14b914 : 0xff0000
        selectMarker.setColor(color);
        this.hpBar.setColor(color);

        this.rewriteData(data);
        this.setTexture('castleFirstLevel');

        this.ownerName = data.ownerName;
        name.setName(this.ownerName);

        this.scene.castlesGroup.add(this);
        
        this.pointer.x = this.x - 400;
        this.pointer.y = this.y + 300;
        this.fullHP = 0;
        this.currentHP = 0;
        this.create(true);
        this.body.setOffset(0,0);
        /*this.attackArea = this.scene.add.ellipse(this.x - 10, this.y + 45, 500, 500, 0xffff00, 0.1);
        this.scene.physics.add.existing(this.attackArea, true);
        this.attackArea.body.onCollide = true;
        this.attackArea.isStroked = true;
        this.attackArea.strokeColor = 0xffff00;
        this.attackArea.lineWidth = 2;
        this.attackArea.setVisible(false);*/
    }

    select() {
        super.select();
        if (this.isMine) this.pointer.setVisible(true);
    }

    unselect() {
        super.unselect();
        if (this.isMine) this.pointer.setVisible(false);
    }

    killed() {
        if (this.isMine) this.scene.player.gameOver();
        this.pointer.destroy();
        this.scene.castlesGroup.remove(this);
        super.killed();
    }

    rewriteData(castleData) {
        this.level = castleData.Level - 0;
        this.isUpdated = true;
    }

    damage(dmg) {
        if (this.units.getChildren()[0]) {
            this.units.getChildren()[0].damage(dmg);
            if (this.selected) this.updateUI();
        }
        else {
            DestroyCastle(this);
        }
        this.damaged = true;
        this.status = "attack";
    }

    updateHP() {
        if (!this.damaged) this.fullHP = 0;
        this.currentHP = 0;
        this.units.getChildren().forEach((unit) => {
            if (!this.damaged) this.fullHP += this.scene.dataUnitsTypes[unit.unitType].hp-0;
            this.currentHP += unit.hp;
        });
        this.hpBar.updateValue(this.currentHP/this.fullHP);
    }

    updateUI() {
        this.updateHP();
        if (this.isMine) {
            const array = this.units.getChildren().map((el) => {
                return {
                    type: el.unitType,
                    status: 'inCastle',
                    hp: el.hp
                }
            });
            this.scene.store.loadToStore({ units: array }, 'gamer');
            return 'castle';
        }
        this.scene.store.loadToStore({
            fullHp: this.fullHP,
            currentHp: this.currentHP,
            armyLength: this.units.getLength(),
            castleLevel: this.level
        }, 'enemyCastle');
        return 'enemyCastle';
    }

    attack() {
        if (this.canAttack) {
            setTimeout(() => { this.canAttack = true }, 4000);
            setTimeout(() => {
                this.attackArea.setVisible(true);
            }, 2100);
            setTimeout(() => {
                this.attackArea.fillColor = 0xff0000;
                this.attackArea.strokeColor = 0xff0000;
            }, 3700);
            setTimeout(() => {
                this.attackArea.fillColor = 0xffff00;
                this.attackArea.strokeColor = 0xffff00;
                this.attackArea.setVisible(false);
            }, 4300);
            let i = 0;
            this.scene.physics.collide(this.attackArea, this.scene.unitsGroup, (area, unit) => {
                i++;
            })
            this.scene.physics.collide(this.attackArea, this.scene.unitsGroup, (area, unit) => {
                unit.damage(Math.round(this.units.getChildren().reduce((damage, unit) => damage += unit.atk, 0) / i));
            })
            if (i === 0) {
                this.status = "wait"
                this.attackArea.setVisible(false);
            };
            this.canAttack = false;
        }
    }

    update() {
        if (this.status === "attack") {
            this.attack();
        }
    }
}