import Phaser from "phaser";

export default class UnitPointer extends Phaser.GameObjects.Arc {
    constructor(unit) {
        super(unit.scene, unit.x, unit.y, 10, 0, 360, false, 2132, 0.5);
        this.setVisible(false);
        this.id = unit.id;
        this.unit = unit;
        this.addedToScene();
        this.addToDisplayList();
        this.isFilled = false;
        this.isStroked = true;
        this.lineWidth = 2;
    }

    _getAngle(){
        return Phaser.Math.Angle.Between(this.unit.x,this.unit.y, this.x, this.y);
    }

    _relocate() {
        let i = 0;
        while (this.scene.unitsGroup.getChildren().find(el => (this.id != el.pointer.id) && (this.x === el.pointer.x) && (this.y === el.pointer.y))) {
            if (i < 5) {
                this.x += 60;
                i += 1;
            } else {
                this.x -= 300
                this.y += 60;
                i = 0;
            }
        }
    }

    _distance(obj) {
        let dx = obj.x - this.x;
        let dy = obj.y - this.y;
        return dx * dx + dy * dy;
    }

    target(obj){
        console.log(obj);
    }

    moveTo(x, y) {
        if (this.unit.selected){
            this.setVisible(true)
        }
        this.x = x;
        this.y = y;
        /*if (this._distance(this.scene.myCastle) < 15000) {
            this.setVisible(false);
        }
        else {*/
            this._relocate();
        //}
        this.unit.move(this._getAngle());
    }

update() {
    if (this.unit.status === 'move') {
        let dist = this._distance(this.unit);
        if (dist < 10) this.unit.stopped();
        if (this.lastDist < dist) this.unit.move(this._getAngle());
        this.lastDist = dist;
    }
}
}