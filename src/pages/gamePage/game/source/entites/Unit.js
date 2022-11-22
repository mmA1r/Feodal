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
        this.setTexture('soldier');
        this.rewriteData(unitData);
        this.setInteractive();
        this.setActive();
        this.addedToScene();
        this.addToDisplayList();
        this.direction = {}
        this.speed = 3;
        this.direction.value = 0;
        this.direction.sin = 1;
        this.direction.cos = 0;
        this.scene.physics.add.existing(this, false);
        this.body.isCircle = true;
        this.body.overlapR = 10;
    }

    select () {
        this.setTint(4234);
        this.selected = true;
        this.scene.selectedUnits.add(this);
    }

    unSelect () {
        this.setTint();
        this.selected = false;
        this.scene.selectedUnits.remove(this);
    }

    moveTo(x,y){
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

    rewriteData(unitData){
        this.goX = Math.round(unitData.posX * 64);
        this.goY = Math.round(unitData.posY * 64);
        this.hp = unitData.hp;
        this.setUnitStatus(unitData.status);
    }

    setUnitStatus(status) {
        this.status = status;
        if (this.status === "inCastle") {
            this.setVisible(true);
        }
        else {
            this.setVisible(true);
        };
    }

    move() {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.goX, this.goY)>this.speed) {
            this.x += this.direction.cos*this.speed;
            this.y += this.direction.sin*this.speed;
        } 
        else {
            this.x = this.goX;
            this.y = this.goY;
        }
        this.depth = this.y;
    }

    update() {
        if (this.goX != this.x || this.goY != this.y) {
            this.move();
        }
    }
}