import Phaser from "phaser";

export default class Selector extends Phaser.GameObjects.Rectangle {
    constructor(scene) {
        super(scene, 100, 100, 0, 0, 232323, 0.5);
        this.active = true;
        this.isMine = false;
        this.endX = 0;
        this.endY = 0;
        this.targets = this.scene.add.group();
        this.depth = 99999999999;
        this.addToDisplayList();
        this.active = false;
        this.type = 'army';
    }

    setEndPos(x, y) {
        this.endX = x;
        this.endY = y;
    }

    beginPath(x, y) {
        this.addedToScene();
        this.x = x;
        this.y = y;
        this.setEndPos(x, y);
        this.isMine = false;
        this.typeUI = 'hide';
        this.active = true;
    }

    resizeTo(x, y) {
        this.width += x - this.endX;
        this.height += y - this.endY;
        this.setEndPos(x, y);
    }

    onlyMyUnit() {
        let enemyUnit = this.targets.getChildren().find(el => el.isMine === false);
        while (enemyUnit) {
            this.targets.remove(enemyUnit);
            enemyUnit = this.target.getChildren().find(el => el.isMine === false);
        }
    }

    selectUnits() {
        if (this.width != 0 && this.height != 0) {
            this.scene.unitsGroup.getChildren().forEach((unit) => {
                let left = (this.x <= this.endX) ? this.x : this.endX;
                let right = (this.x >= this.endX) ? this.x : this.endX;
                let top = (this.y <= this.endY) ? this.y : this.endY;
                let bottom = (this.y >= this.endY) ? this.y : this.endY;
                if (unit.x > left &&
                    unit.x < right &&
                    unit.y < bottom &&
                    unit.y > top &&
                    unit.status !== "inCastle") {
                    if (unit.isMine) {
                        this.isMine = true;
                    }
                    this.targets.add(unit);
                }
            })
            this.height = 0;
            this.width = 0;
            this.active = false;
            if (this.targets.getLength() == 1) {
                this.scene.player.select(this.targets.getChildren()[0]);
            } 
            else {
                this.scene.player.select(this)
            };
            setTimeout(this.removedFromScene(), 100);
        }
    }

    unselect() {
        let unit = this.targets.getChildren()[0];
        while (unit) {
            unit.unselect();
            this.targets.remove(unit);
            unit = this.targets.getChildren()[0];
        }
    }

    select(){
        this.targets.getChildren().forEach(unit => unit.select());
    }

    /*selectTarget(obj) {
        this.unselectAllTargets();
        this.select(obj);
        switch (obj.type) {
            case 'castle': 
                this.typeUI = (obj.isMine) ? 'castle' : 'enemyCastle';
                break;
            case 'unit': 
                this.typeUI = (obj.isMine) ? 'unit' : 'enemyUnit';
                break;
            case 'village': 
                this.typeUI = 'village';
                break;
        }
        this.updateUI();
    }*/

    moveTo(obj) {
        this.targets.getChildren().forEach( (unit) => {
            unit.moveTo(obj);
        })
    }


    updateUI() {
        
    }
}