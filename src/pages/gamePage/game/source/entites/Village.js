import Phaser from "phaser";
import DestroyVillage from "../destroyVillage/DestroyVillage";

export default class Village extends Phaser.GameObjects.Sprite {
    constructor(scene, serverData) {
        super(scene);
        this.x = Math.round(serverData.posX * 64);
        this.y = Math.round(serverData.posY * 64);
        this.depth = 1;
        this.activeRadius = 40000;
        this.id = serverData.id;
        this.level = serverData.level - 0;
        this.scene.villagesGroup.add(this);
        this.damageTexture = 0;
        this.canBeRobbed = false;
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
        this.resistBar = this.scene.add.rectangle(this.x, this.y - 120, 200, 20, 0xff0000);
        this.resistBar.depth = 99999991;
        this.acceptBar = this.scene.add.rectangle(this.x, this.y - 120, 200, 20, 0x00ff00);
        this.acceptBar.depth = 99999992;

        this.selector = this.scene.add.ellipse(this.x - 10, this.y + 45, 250, 170);
        this.selector.isStroked = true;
        this.selector.strokeColor = 0x00FF00;
        this.selector.lineWidth = 2;
        this.selector.setVisible(false);

        this.rewriteData(serverData);
        this.addedToScene();
        this.addToDisplayList();
        this.setInteractive();
        this.selected = false;
        this.type = 'village';
        this.scene.physics.add.existing(this, true);
        this.body.isCircle = true;
        this.name = this.scene.add.text(this.x, this.y + 130, serverData.name, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
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
        this.attackArea.setVisible(false);
        this.canAttack = true;
        this.status = "wait"
        this.damaged = false;
    }

    select() {
        this.selector.setVisible(true);
        this.selected = true;
        this.scene.selectedObject = this;
        this.scene.store.loadToStore('village', 'ui');
        this._updateUI();
    }

    openUI() {
        this.scene.store.loadToStore('village', 'ui');
        this._updateUI();
    }

    attackOnVillage() {
        this.type = "enemyVillage";
        this.selector.strokeColor = 0xFF0000;
    }

    peaceInVillage() {
        if (this.status === "wait") {
            this.type = "village";
            this.selector.strokeColor = 0x00FF00;
        }
    }



    unSelect() {
        this.selected = false;
        this.selector.setVisible(false);
        this.scene.selectedObject = null;
        this.scene.store.loadToStore('hide', 'ui');
    }

    rewriteData(serverData) {
        if (!this.damaged) this.currentHp = 50;
        this.level = serverData.level - 0;
        this.population = serverData.population - 0;
        this.updateResistLevel();
    }

    updateResistLevel() {
        const resistLevel = this.scene.player.might / this.population;
        if (resistLevel >= 1) {
            this.acceptBar.setVisible(false);
            this.resistBar.setVisible(false);
            this.peaceInVillage();
        }
        else {
            this.attackOnVillage();
            this.acceptBar.setVisible(true);
            this.resistBar.setVisible(true);
            this.acceptBar.width = (200 * resistLevel);
        }
    }

    killed() {
        this.resistBar.destroy();
        this.acceptBar.destroy();
        this.selector.destroy();
        this.attackArea.destroy();
        this.name.destroy();
        this.unSelect();
        this.scene.villagesGroup.remove(this);
        this.destroy();
    }

    damage(dmg) {
        if (this.population > 0) {
            this.currentHp -= dmg;
            if (this.currentHp <= 0) {
                this.currentHp = 50;
                this.population--;
                this.scene.updateVillagesGroup.add(this);
            }
            if (this.selected) this._updateUI();
        }
        this.status = "attack";
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
        }

        if (this.population <= 0) {
            DestroyVillage(this);
        }
    }

    _updateUI() {
        if (this.selected) {
            let village = {
                currentHp: this.currentHp,
                fullHp: 50,
                population: this.population,
                villageLevel: this.level,
                id: this.id,
                canBeRobbed: this.canBeRobbed
            }
            this.scene.store.loadToStore(village, 'village');
        }
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
                unit.damage(Math.round(this.population / i));
            })
            if (i === 0) {
                this.status = "wait";
                setTimeout(this.peaceInVillage,400);
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