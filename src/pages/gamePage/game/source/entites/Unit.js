import Phaser from "phaser";
import UnitPointer from "./UnitPointer";

export default class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, unitData) {
        super(scene);
        this.x = Math.round(unitData.posX * 64);
        this.y = Math.round(unitData.posY * 64);
        this.depth = this.y;
        this.id = unitData.id;
        this.selected = false;
        this.unitType = unitData.type-0;
        if (unitData.id=44)this.status= 'inField';
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
        this.pointer = new UnitPointer(this);
        this.setTexture('soldier');
        this.rewriteData(unitData);
        this.setInteractive();
        this.setActive();
        this.addedToScene();
        this.addToDisplayList();

        this.setData('state', unitData.status);
    }

    select () {
        this.setTint(4234);
        this.selected = true;
        this.scene.selectedUnits.add(this);
       /* if (this.id = this.scene.player && this.scene.unitsGroup.getLength()===1) {
            this.scene.store.loadToStore('unit', 'ui');
        } else {
            this.scene.store.loadToStore('enemyUnit', 'ui');
        }*/
        this.pointer.setVisible(true);
    }

    unSelect () {
        if (!this.scene.selectedObject) {
            this.setTint();
            this.selected = false;
            this.scene.selectedUnits.remove(this);
            this.pointer.setVisible(false);
        }
    }

    returnToCastle(){
        this._state = "goToCastle";
    }

    move(){
        if (this.status != "inCastle"){
            const angle = Phaser.Math.Angle.Between(this.x,this.y,this.pointer.x,this.pointer.y);
            const normAngle = Phaser.Math.Angle.Normalize(angle);
            this.direction.sin = Math.sin(normAngle);
            this.direction.cos = Math.cos(normAngle);
            this.direction.angle = angle;
            if (angle>1.57 || angle <-1.57) {
                this.flipX = true;
            } else
            { 
                this.flipX = false
            }
            this._setUnitStatus("move");
        }
    }

    _moved() {
        this.x += this.direction.cos*this.speed;
        this.y += this.direction.sin*this.speed;
        this.depth = this.y;
    }

    stop() {
        if (this.status!="inCastle"){
            this._setUnitStatus('stand');
        }
    }

    rewriteData(unitData){
        this.hp = unitData.hp-0;
        this._setUnitStatus(unitData.status);
        this.pointer.move(Math.round(unitData.posX * 64),Math.round(unitData.posY * 64));
    }

    _setUnitStatus(status) {
        if (status === "inCastle") {
            this.setVisible(false);
            this.body.enable = false;
            this.removedFromScene();
            this.on('changedata-status', (parent, value)=> {
                this._setUnitStatus(parent.getData(value));
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            })
            this.scene.unitsInCastleGroup.add(this);
                if (this.status!=="inCastle"){
                    let array = this.scene.unitsInCastleGroup.getChildren().map((el)=>{
                        return {
                            type: el.unitType,
                            status: status,
                            hp: el.hp
                        }
                    })
                    // console.log(array);
                    this.scene.store.loadToStore({units: array}, 'gamer')
            }
        }
        else {
            if(this.status === "inCastle"){
                this.off('changedata-status');
                this.scene.unitsInCastleGroup.remove(this);
                this._state = 'stand';
                this.setVisible(true);
                this.body.enable = true;
                this.addedToScene();
                
                let array = this.scene.unitsInCastleGroup.getChildren().map((el)=>{
                    return {
                        type: el.unitType,
                        status: status,
                        hp: el.hp
                    }
                })
                console.log(array);
                this.scene.store.loadToStore({units: array}, 'gamer')
                this.x +=200;
                this.y +=200;
                this.pointer.move(this.x+300,this.y+300);
            }
        };
        this.status = status;
    }


    enterCastle(){
        this._setUnitStatus("inCastle");
        this._state='inCastle';
    }

    update() {
        if (this.status==='move') {
            this._moved();
            if (this._state==='goToCastle' && Phaser.Math.Distance.Between(this.x,this.y,this.scene.myCastle.x,this.scene.myCastle.y)<200) {
                this.enterCastle();
            }
            
        }
    }
}