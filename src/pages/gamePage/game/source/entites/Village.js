import Phaser from "phaser";
import DestroyVillage from "../destroyVillage/DestroyVillage";

export default class Village extends Phaser.GameObjects.Image {
    constructor(scene, serverData) {
        super(scene);
        this.x = Math.round(serverData.posX * 64);
        this.y = Math.round(serverData.posY * 64);
        this.depth = 1;
        this.activeRadius = 40000;
        this.id = serverData.id;
        this.scene.villagesGroup.add(this);
        this.setTexture('village');
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
        this.selector = this.scene.add.ellipse(this.x - 10, this.y + 45, 250, 170);
        this.selector.isStroked = true;
        this.selector.strokeColor = 0x0000FF;
        this.selector.lineWidth = 2;
        this.selector.setVisible(false);
        this.attackArea = this.scene.add.ellipse(this.x -10, this.y + 45, 500, 500,0x0000ff,0.1);
        this.scene.physics.add.existing(this.attackArea, true);
        this.attackArea.body.onCollide = true;
        this.attackArea.isStroked = true;
        this.attackArea.strokeColor = 0x0000FF;
        this.attackArea.lineWidth = 2;
        this.attackArea.setVisible(false);
        this.canAttack = true;
        this.status = "wait"
    }

    select() {
        this.selector.setVisible(true);
        this.selected = true;
        this.scene.selectedObject = this;
        this.scene.store.loadToStore('village', 'ui');
        this._updateUI();
    }

    unSelect() {
        this.selected = false;
        this.selector.setVisible(false);
        this.scene.selectedObject = null;
        this.scene.store.loadToStore('hide', 'ui');
    }

    rewriteData(serverData) {
        if (!this.damaged) this.currentHp = 100;
        this.level = serverData.level-0;
        this.population = serverData.population-0;
    }

    killed() {
        this.selector.destroy();
        this.attackArea.destroy();
        this.name.destroy();
        this.unSelect();
        this.scene.villagesGroup.remove(this);
        this.destroy();
    }

    damage(dmg) {
        if (this.population>0) {
            this.currentHp -= dmg;
            console.log(this.currentHp, this.population)
            if (this.currentHp<=0) {
                this.currentHp = 100;
                this.population--;
                this.scene.updateVillagesGroup.add(this);
            }
            if (this.selected) this._updateUI();
        }
        this.status = "attack";
        this.attackArea.setVisible(true);
        this.setTint(0xFF5545);
        this.damaged = true;
        setTimeout(() => {
            this.setTint();
            this.damaged = false;
        }, 300);
        
        if (this.population<=0) {
            DestroyVillage(this);
        }
    }

    _updateUI() {
        //if (this.selected) {
            /*const array = this.units.getChildren().map((el) => {
                return {
                    type: el.unitType,
                    status: 'inCastle',
                    hp: el.hp
                }
            });
            this.scene.store.loadToStore({ units: array }, 'gamer');*/
        //}
    }

    attack() {
        if (this.canAttack) {
            setTimeout(() => { this.canAttack = true }, 4000);
            setTimeout(() => { 
                this.attackArea.fillColor = 0xffff00;
                this.attackArea.strokeColor = 0xffff00;
             }, 2100);
            setTimeout(() => { 
                this.attackArea.fillColor = 0xff0000;
                this.attackArea.strokeColor = 0xff0000;
             }, 3700);
            setTimeout(() => {
                this.attackArea.fillColor = 0x0000ff;
                this.attackArea.strokeColor = 0x0000ff;
             }, 4300);
             let i = 0;
            this.scene.physics.collide(this.attackArea,this.scene.unitsGroup, (area, unit) =>{
                i ++;
            })
            this.scene.physics.collide(this.attackArea,this.scene.unitsGroup, (area, unit) =>{
                unit.damage(Math.round(this.population/i));
            })
            if (i === 0) {
                this.status="wait"
                this.attackArea.setVisible(false);
            };
            this.canAttack = false;
        }
    }

    update(){
        if (this.status === "attack") {
            this.attack();
        }
    }
}