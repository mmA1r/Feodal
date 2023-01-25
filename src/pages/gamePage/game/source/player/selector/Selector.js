import Phaser from "phaser";

export default class Selector extends Phaser.GameObjects.Rectangle {
    constructor(scene) {
        super(scene, 100, 100, 0, 0, 232323, 0.5);
        this.active = true;
        this.isMine = false;
        this.endX = 0;
        this.type = 'army';
        this.endY = 0;
        this.targets = this.scene.add.group();
        this.depth = 99999999999;
        this.addToDisplayList();
        this.active = false;
        this.pointer = {
            x: 0,
            y: 0,
            type: 'pointer',
            visible: false
        }
        this.selector = this.scene.player;
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
        let enemyUnit = this.targets.getChildren().find(el => el.isMine == false);
        while (enemyUnit) {
            this.targets.remove(enemyUnit);
            enemyUnit = this.targets.getChildren().find(el => el.isMine == false);
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
            if (this.isMine) this.onlyMyUnit();
            if (this.targets.getLength() == 1) {
                this.scene.player.select(this.targets.getChildren()[0]);
                this.targets.clear();
            } 
            else {
                this.scene.player.select(this);
            };
            setTimeout(this.removedFromScene(), 100);
        }
    }

    removeSelect(obj){
        console.log(this.selector)
        this.targets.remove(obj);
        this.select(this.selector);
        this.selector.removeSelect(obj);
    }

    unselect() {
        let unit = this.targets.getChildren()[0];
        while (unit) {
            this.targets.remove(unit);
            unit.unselect();
            unit = this.targets.getChildren()[0];
        }
        this.selector.removeSelect(this);
    }

    select(selector){
        this.selector = selector;
        this.targets.getChildren().forEach(unit => unit.select(this));
    }

    moveTo(obj) {
        console.log();
        if (obj.type === 'pointer') {
            let x = obj.x;
            let y = obj.y;
            let dx = 0;
            let dy = 0;
            let maxX = x;
            let maxY = y;
            let minX = x;
            let minY = y;
            const length = this.targets.getLength();
            let n = 0;
            if (length>1 && length<5) n = 1;
            if (length>4 && length<10) n = 2;
            if (length>9 && length<17) n = 3;
            if (length>16 && length<26) n = 4;
                x -= 30*n;
                y -= 30*n;
                minX = x;
                minY = y;
                dx = 60;
                dy = 60;
                maxX += 30*n;
                maxY += 30*n;
            this.targets.getChildren().forEach(unit => {
                unit.moveTo({
                    x: x,
                    y: y,
                    type: 'pointer'
                })
                if (x != maxX) {x += dx} else {
                    x=minX;
                    if (y != maxY) {y += dy} else {
                        y=minY;
                        minY += dy;
                    }
                }
            }
            )
        }
        else {
            this.targets.getChildren().forEach( (unit) => {
                unit.moveTo(obj);
            })
        }
    }

    updateUI() {
        const soldiers = {
            fullHp: 0,
            currentHp: 0,
            num: 0
        };
        const assassins = {
            fullHp: 0,
            currentHp: 0,
            num: 0
        };
        let target = soldiers;
        this.targets.getChildren().forEach( unit => {
            switch (unit.unitType) {
                case 1: {
                    target = soldiers;
                    break;
                }
                case 2: {
                    target = assassins;
                    break;
                }
            }
            target.currentHp += unit.hp;
            target.fullHp += unit.hp;
            target.num++;
        })

        this.scene.store.loadToStore({ soldiers: soldiers,
                                        assassins: assassins }, 'currentArmy')
        return (this.isMine) ? 'army' : 'enemyArmy';
    }
}