import Phaser from "phaser";

export default class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, unitData) {
        super(scene);
        this.x = Math.round(unitData.posX * 64);
        this.y = Math.round(unitData.posY * 64);
        this.depth = this.y;
        this.id = unitData.id;
        this.selected = false;
        this.type = 'entites';
        scene.unitsGroup.add(this);
        this.scene.physics.add.existing(this, false);
        this.speed = 3;
        this.direction = {
            value: unitData.direction,
            sin: 0,
            cos: 0
        };
        this.body.isCircle = true;
        this.setTexture('soldier');
        this.rewriteData(unitData);
        this.setInteractive();
        this.setActive();
        this.addedToScene();
        this.addToDisplayList();
        this._state = "";
    }

    select () {
        this.setTint(4234);
        this.selected = true;
        this.scene.selectedUnits.add(this);
        if (this.id = this.scene.player && this.scene.unitsGroup.getLength()===1) {
            this.scene.store.loadToStore('unit', 'ui');
        } else {
            this.scene.store.loadToStore('enemyUnit', 'ui');
        }
    }

    unSelect () {
        if (!this.scene.selectedObject) {
            this.setTint();
            this.selected = false;
            this.scene.selectedUnits.remove(this);
        }
    }

    returnToCastle(){
        this.moveTo(this.scene.myCastle.x,this.scene.myCastle.y);
        this._state = "goToCastle";
    }

    moveTo(x,y){
        if (this.status != "inCastle"){
            this._setUnitStatus("move");
            this.goX=x;
            this.goY=y;
            const angle = Phaser.Math.Angle.Between(this.x,this.y,x,y);
            const normAngle = Phaser.Math.Angle.Normalize(Phaser.Math.Angle.Between(this.x,this.y,x,y));
            this.direction.sin = Math.sin(normAngle);
            this.direction.cos = Math.cos(normAngle);
            this.direction.angle = angle;
            if (angle>1.57 || angle <-1.57) {
                this.flipX = true;
            } else
            { 
                this.flipX = false
            }
        }
    }

    rewriteData(unitData){
        this.moveTo(Math.round(unitData.posX * 64),Math.round(unitData.posY * 64));
        this.hp = unitData.hp;
        //this._setUnitStatus(unitData.status);
    }

    _setUnitStatus(status) {
        this.status = status;
        if (this.status === "inCastle") {
            this.setVisible(false);
            this.body.enable = false;
            this.removedFromScene();
        }
        else {
            this.setVisible(true);
            this.body.enable = true;
            this.addedToScene();
        };
    }

    move() {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.goX, this.goY)>this.speed) {
            this.x += this.direction.cos*this.speed;
            this.y += this.direction.sin*this.speed;
        } 
        else {
            this._setUnitStatus('stay');
            this.x = this.goX;
            this.y = this.goY;
        }
        this.depth = this.y;
    }

    enterCastle(){
        this._setUnitStatus("inCastle");
    }

    update() {
        if (this.status='move') {
            this.move();
            if (this._state==='goToCastle' && Phaser.Math.Distance.Between(this.x,this.y,this.scene.myCastle.x,this.scene.myCastle.y)<200) {
                this.enterCastle();
                
            }
            
        }
    }
}