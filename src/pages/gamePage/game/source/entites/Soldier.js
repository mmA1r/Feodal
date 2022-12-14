import Unit from "./Unit"

export default class Soldier extends Unit {
    constructor(scene, unitData) {
        super(scene, unitData)
        this.anims.create({
            key: "move",
            frames: [{
                key: 'soldier',
                frame: 'soldierMove2',
                duration: 80
            },
            {
                key: 'soldier',
                frame: 'soldierMove3',
                duration: 80
            },
            {
                key: 'soldier',
                frame: 'soldierMove1',
                duration: 80
            }],
            duration: 240,
            repeat: -1
        });
    }

    damageFrameOn() {
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
    }
}