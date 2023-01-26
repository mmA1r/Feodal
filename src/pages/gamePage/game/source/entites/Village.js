import DestroyVillage from "../destroyVillage/DestroyVillage";
import Entity from "./Entity";

export default class Village extends Entity {
    constructor(scene, data) {
        super(scene, {
            type: 'village',
            activeRadius: 130,
        });
        this.isNeutral = true;

        this.id = data.id - 0;
        this.level = data.level - 0;
        this.name = data.name;
        const selectMarker = this.infographics.getModule('selectMarker');
        selectMarker.setColor(0x0000ff);
        this.infographics.addModule('name', 'name', false);
        const name = this.infographics.getModule('name');
        name.setAddXY(60, 70);
        name.setName(this.name);
        this.infographics.addModule('statusBar', 'resistLevel');
        const resistLevel = this.infographics.getModule('resistLevel');
        //resistLevel.setAddXY(0, 0);
        resistLevel.setSize(this.activeRadius * 0.8 + 12);
        resistLevel.setType('m');
        resistLevel.setColor(0xff0000);
        this.infographics.addModule('area', 'area', false);
        const area = this.infographics.getModule('area');
        area.stepCallback = this.attack.bind(this);
        area.setSize(300);
        area.setColor(0xffba00);
        this.setXY(Math.round(data.posX * 64), Math.round(data.posY * 64));
        area.switchOn();
        this.scene.villagesGroup.add(this);
        this.damageTexture = 0;
        this.canBeRobbed = this.canBeRobbed.bind(this);
        this.attacked = this.attacked.bind(this);
        switch (this.level) {
            case 1:
                this.setTexture('villageFirstLevel');
                this.damageTexture = 1;
                break;
            case 2:
                this.anims.create({
                    key: "mill",
                    frames: [{
                        key: 'villageSecondLevel',
                        frame: 0,
                        duration: 80
                    },
                    {
                        key: 'villageSecondLevel',
                        frame: 1,
                        duration: 80
                    },
                    {
                        key: 'villageSecondLevel',
                        frame: 2,
                        duration: 80
                    },
                    {
                        key: 'villageSecondLevel',
                        frame: 3,
                        duration: 80
                    }],
                    duration: 320,
                    repeat: -1
                });
                this.anims.create({
                    key: "damaged",
                    frames: [{
                        key: 'villageSecondLevel',
                        frame: 4,
                        duration: 80
                    },
                    {
                        key: 'villageSecondLevel',
                        frame: 5,
                        duration: 80
                    },
                    {
                        key: 'villageSecondLevel',
                        frame: 6,
                        duration: 80
                    },
                    {
                        key: 'villageSecondLevel',
                        frame: 7,
                        duration: 80
                    }],
                    duration: 320,
                    repeat: -1
                });
                this.anims.play("mill", true)
                break;
        }

        this.rewriteData(data);
        this.damaged = false;
        this.create(true);
    }

    openUI() {
        this.scene.store.loadToStore('village', 'ui');
        this.callbackUI();
    }

    peaceInVillage() {
        const area = this.infographics.getModule('area');
        area.stepOff();
        this.damaged = false;
        area.setVisible(false);
        this.isNeutral = true;
        this.infographics.getModule('selectMarker').setColor(0x0000ff);
    }

    rewriteData(serverData) {
        if (!this.damaged) this.currentHp = 50;
        this.level = serverData.level - 0;
        this.population = serverData.population - 0;
        this.updateResistLevel();
        this.isUpdated = true;
    }

    updateResistLevel() {
        const resistLevel = this.scene.player.might / this.population;
        const bar = this.infographics.getModule('resistLevel');
        if (resistLevel >= 1) {
            if (!this.damaged) this.peaceInVillage();
            bar.updateValue(1-1/resistLevel);
            bar.setColor(0x0000ff);
        }
        else {
            if (!this.damaged) this.attacked();
            bar.setColor(0xff0000);
            bar.updateValue(1 - resistLevel);
        }
    }

    killed() {
        this.scene.villagesGroup.remove(this);
        super.killed();
        this.destroy();
    }

    damage(dmg) {
        if (this.population > 0) {
            this.currentHp -= dmg;
            if (this.currentHp <= 0) {
                this.currentHp = 50;
                this.dmg++;
                this.scene.updateVillagesGroup.add(this);
            }
            if (!this.damaged) {
                this.infographics.getModule('area').stepOn();
                this.infographics.getModule('area').setVisible(true);
                this.damaged = true;
            }
            if (this.selected) this.callbackUI();
        }

        /*this.status = "attack";
        if (this.damaged === false) {
            this.damaged = true;
            if (this.level === 2) {
                this.anims.pause();
                this.setFrame(this.anims.currentFrame.index + 4);
            }
            else {
                this.setFrame(1);
            }
            setTimeout(() => {
                if (this.level === 2) {
                    this.anims.resume();
                }
                else {
                    this.setFrame(0);
                }

                this.damaged = false;
            }, 40);
        }*/

        if (this.population <= 0) {
            DestroyVillage(this);
        }
    }

    canBeRobbed(){
        let i = this.infographics.getModule('area').targetsInArea(this.scene.player.units);
        return (i > 0 ) ? true : false;
    }

    attacked(){
        this.isNeutral = false;
        this.updateUI();
        this.infographics.getModule('selectMarker').setColor(0xff0000);
    }

    postUpdater() {
            this.scene.updateVillagesGroup.remove(this);
            this.dmg = 0;
    }

    updateUI() {
        if (this.selected){
            let village = {
                currentHp: this.currentHp,
                fullHp: 50,
                population: this.population,
                villageLevel: this.level,
                id: this.id,
                canBeRobbed: this.canBeRobbed,
                attacked: this.attacked
            }
            this.scene.store.loadToStore(village, 'village');
            return 'village';
        }
    }

    attack() {
        const area = this.infographics.getModule('area');
        const i = area.targetsInArea(this.scene.unitsGroup);
        (i > 0) ? area.AoE(this.scene.unitsGroup,'damage',Math.round(this.population*this.level/i)) : this.peaceInVillage();
    }
}