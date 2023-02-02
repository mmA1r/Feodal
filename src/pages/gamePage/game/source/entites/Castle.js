import UnitPointer from "./UnitPointer";
import DestroyCastle from "../destroyCastle/DestroyCastle";
import Entity from "./Entity";
import { unit } from "../../../../../store/features/currentUnit/currentUnit";
import NavigateLine from "./Modules/NavigateLine";

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
        this.hpBar.setSize(this.activeRadius * 0.8 + 10);
        this.hpBar.setType('l');

        const selectMarker = this.infographics.getModule('selectMarker');
        selectMarker.setAddXY(0, 60);
        this.infographics.addModule('area', 'area', false);
        const area = this.infographics.getModule('area');
        area.stepCallback = this.attack.bind(this);
        area.speed = 5;
        area.setSize(450);
        area.setAddXY(0, 100)
        area.setColor(0xff0000);
        this.setXY(data.posX * 64, data.posY * 64)
        area.switchOn();
        this.pointer = new UnitPointer(this);
        this.canAttack = true;

        this.id = data.id - 0;
        this.isMine = (this.id === this.scene.player.id) ? true : false;
        if (this.isMine) this.scene.player.addCastle(this);
        const color = (this.isMine) ? 0x14b914 : 0xff0000
        selectMarker.setColor(color);
        this.hpBar.setColor(color);

        this.rewriteData(data);
        this.setTexture('castle2Level');
        this.open = true;
        this.ownerName = data.ownerName;
        name.setName(this.ownerName);

        this.scene.castlesGroup.add(this);
        if (this.isMine) {
            new NavigateLine(this);
        }
        this.pointer.x = this.x - 400;
        this.pointer.y = this.y + 300;
        this.fullHP = 0;
        this.currentHP = 0;
        this.create(true);
        this.body.setOffset(0, 0);
        this.updateHP();
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
        (this.level == 1) ? this.setTexture('castle1Level') : this.setTexture('castle2Level');
    }

    openDoor(){
        this.open = true;
    }

    enterInside(unit){
        this.open = false;
        this.units.add(unit)
        this.updateHP();
        if (this.selected) this.callbackUI();
        this.scene.updater.add(this,new Date()- 0 +500,'openDoor');
    }

    damage(dmg) {
        if (this.units.getChildren()[0]) {
            let total = dmg - this.level*2;
            if (total<0) total = 0;
            this.units.getChildren()[0].damage(total);
            if (this.selected) this.callbackUI();
            if (!this.damaged) {
                this.infographics.getModule('area').stepOn();
                this.infographics.getModule('area').setVisible(true);
                this.damaged = true;
                this.status = "attack";
            }
        }
        else {
            DestroyCastle(this);
        }
    }

    updateHP() {
        if (!this.damaged) this.fullHP = 0;
        this.currentHP = 0;
        this.units.getChildren().forEach((unit) => {
            if (!this.damaged) this.fullHP += this.scene.dataUnitsTypes[unit.unitType].hp - 0;
            this.currentHP += unit.hp;
        });
        this.hpBar.updateValue(this.currentHP / this.fullHP);
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
        const area = this.infographics.getModule('area');
        const atk = this.units.getChildren().reduce((s, unit) => s + unit.atk, 0);
        const i = area.targetsInArea(this.scene.unitsGroup);
        (i > 0) ? area.AoE(this.scene.unitsGroup,'damage',Math.round(atk/i)) : this.peaceInVillage();
    }

    update() {
        if (this.status === "attack") {
            this.attack();
        }
    }
}