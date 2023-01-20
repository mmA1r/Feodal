import UnitPointer from "./UnitPointer";
import DestroyCastle from "../destroyCastle/DestroyCastle";
import Entity from "./Entity";

export default class Castle extends Entity {
    constructor(scene, data) {
        super(scene, {
            type: 'castle',
            activeRadius: 100,
            isStatic: true
        });
        this.isUpdated = true;
        this.units = this.scene.add.group();
        this.pointer = new UnitPointer(this);
        this.pointer.x = this.x - 150;
        this.pointer.y = this.y - 150;
        this.canAttack = true;

        this.id = data.id;
        this.level = data.level;
        this.setXY(data.posX * 64, data.posY * 64)
        this.isMine = (this.id === this.scene.player.id) ? true : false;
        if (this.isMine) {
            this.scene.player.addCastle(this);
        }
        this.ownerName = data.ownerName;
        this.infographics.getModule('selectMarker').setAddXY(0, 30);

        this.scene.castlesGroup.add(this);
        this.setTexture('castleFirstLevel');
        this.rewriteData(data);
        this.infographics.getModule('selectMarker').setColor(0x14b914);
    
        this.fullHP = 0;
        this.currentHP = 0;
        this.create(true);
        /*this.name = this.scene.add.text(this.x, this.y + 130, this.ownerName, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        this.name.depth = 10000000;
        this.name.style.setFontSize(30);
        this.name.style.setAlign('center')
        this.name.scrollFactorX = 1;
        this.name.scrollFactorY = 1;
        this.attackArea = this.scene.add.ellipse(this.x - 10, this.y + 45, 500, 500, 0xffff00, 0.1);
        this.scene.physics.add.existing(this.attackArea, true);
        this.attackArea.body.onCollide = true;
        this.attackArea.isStroked = true;
        this.attackArea.strokeColor = 0xffff00;
        this.attackArea.lineWidth = 2;
        this.attackArea.setVisible(false);*/
    }

    /*select() {
        super.select();
        if (this.isMine) this.pointer.setVisible(true);
    }

    unselect() {
        this.selected = false;
        this.selector.setVisible(false);
        this.pointer.setVisible(false);
    }*/

    killed() {
        console.log('KILL')
        if (this.isMine) this.scene.player.gameOver();
        //this.pointer.destroy();
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
            if (!this.damaged) this.fullHP += 120;
            this.currentHP += unit.hp;
        });
        //this.statusBar.updateHPBar(this.currentHP/this.fullHP);
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