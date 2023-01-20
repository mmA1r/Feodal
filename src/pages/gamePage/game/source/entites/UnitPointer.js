import Phaser from "phaser";

export default class UnitPointer extends Phaser.GameObjects.Arc {
    constructor(unit) {
        super(unit.scene, unit.x, unit.y, 7);
        this.flag = this.scene.add.sprite(this.x, this.y, 'flag')
        this.isStroked = true;
        this.flag.depth = 0.4;
        this.strokeColor = 0x101010;
        this.lineWidth = 2;
        this.setVisible(false);
        this.scaleX = 1.5;
        this.flag.anims.create({
            key: "stand",
            frames: [{
                key: 'flag',
                frame: 1,
                duration: 80
            },
            {
                key: 'flag',
                frame: 2,
                duration: 80
            },
            {
                key: 'flag',
                frame: 3,
                duration: 80
            },
            {
                key: 'flag',
                frame: 4,
                duration: 80
            }],
            duration: 320,
            repeat: -1
        });
        this.flag.anims.play("stand", true);
        this.setVisible(false);
        this.id = unit.id;
        this.unit = unit;
        this.type = "pointer";
        this.activeRadius = 10;
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
        this.flag.setVisible(true);
        this.flag.x = x + 23;
        this.flag.y = y - 107;
        //this.setDisplaySize(128, 128);
        setTimeout(()=> {
            this.flag.y +=20;
            //this.setDisplaySize(112, 112);
        },50)
        setTimeout(()=> {
            this.flag.y +=20;
            //this.setDisplaySize(96, 96);
        },100)
        setTimeout(()=> {
            this.flag.y +=20;
            //this.setDisplaySize(80, 80);
        },150)
        setTimeout(()=> {
            this.flag.y +=20;
            //this.setDisplaySize(64, 64);
        },200)
        
        this._relocate();
    }
}