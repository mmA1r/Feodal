import Phaser from "phaser";

export default class UnitPointer extends Phaser.GameObjects.Arc {
    constructor(unit) {
        super(unit.scene,unit.x,unit.y,20,0,360,false,2132,0.5);
        this.setVisible(false);
        this.id = unit.id;
        this.unit = unit;
        this.addedToScene();
        this.addToDisplayList();
        this.scene.unitsPointersGroup.add(this);
    }

    _distance(obj) {
        let dx = obj.x - this.x;
        let dy = obj.y - this.y;
        return dx*dx+dy*dy;
    }

    move(x,y){
        this.setVisible(true);
        this.x=x;
        this.y=y;
        let i = 0;
        if (this._distance(this.scene.myCastle)<15000) {
            this.unit.returnToCastle();
            this.setVisible(false);
        } 
        else{
            while (this.scene.unitsPointersGroup.getChildren().find(el => (this.id != el.id) && (this.x === el.x) && (this.y === el.y))) {
                if(i<5){
                    this.x +=60;
                    i += 1;
                } else
                {
                    this.x -=300
                    this.y += 60;
                    i = 0;
                }
            }
            
        }
        this.unit.move();
    }

    update() {
        if (this.unit.status==='move') {
            let dx = this.unit.x - this.x;
            let dy = this.unit.y - this.y;
            let dist = dx*dx+dy*dy;
            if (dist<100) {
                this.unit.stop();
                this.setVisible(false);
            }
            if(this.lastDist<dist){
                this.unit.move();
            }
            this.lastDist = dist;
        }
    }
}