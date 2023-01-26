import Unit from "./Unit"

export default class Assassin extends Unit {
    constructor(scene, data) {
        super(scene, data)
        this.mainTexture = 'assassin';
        this.anims.create({
            key: "move",
            frames: [{
                key: 'assassin',
                frame: 'assassinMove4',
                duration: 80
            },
            {
                key: 'assassin',
                frame: 'assassinMove3',
                duration: 80
            },
            {
                key: 'assassin',
                frame: 'assassinMove2',
                duration: 80
            },
            {
                key: 'assassin',
                frame: 'assassinMove1',
                duration: 80
            }],
            duration: 320,
            repeat: -1
        });
        this.create(data);
        this.setDisplaySize(50, 50);
    }

    /*damageFrameOn() {
        if (this && this.status === "move") {
            this.anims.pause();
            this.setFrame(
                (this.anims.currentFrame.index === 0) ? 'soldierMove2Damaged' :
                    (this.anims.currentFrame.index === 1) ? 'soldierMove3Damaged' :
                        'soldierMove1Damaged'
            )
        }
        if (this && this.status !== "move") {
            this.setFrame("soldierStandDamaged");
        }
    }

    damageFrameOff() {
        if (this && this.status === "move") {
            this.anims.resume();
        }
        if (this && this.status !== "move") {
            this.setFrame("soldierStand");
        }
    }*/

    killed() {
        super.killed();
    }
}