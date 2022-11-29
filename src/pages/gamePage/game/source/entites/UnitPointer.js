import Phaser from "phaser";

export default class UnitPointer extends Phaser.GameObjects.Arc {
    constructor(unit) {
        super(unit.scene, unit.x, unit.y, 10, 0, 360, false, 2132, 0.5);
        this.setVisible(false);
        this.id = unit.id;
        this.unit = unit;
        this.type = "pointer";
        this.activeRadius = 100;
        this.addedToScene();
        this.addToDisplayList();
        this.isFilled = false;
        this.isStroked = true;
        this.lineWidth = 2;
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

    moveTo(x, y) {
        if (this.unit.selected){
            this.setVisible(true)
        }
        this.x = x;
        this.y = y;
        this._relocate();
    }
}