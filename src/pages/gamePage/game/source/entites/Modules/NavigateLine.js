import Phaser from "phaser";

export default class NavigateLine extends Phaser.GameObjects.Line{
constructor(owner){
    super(owner.scene, 0, 0, 0, 0);
    this.target = owner;
    this.isStroked = true;
    this.strokeColor = 0x101010;
    this.scene.navigatorLines.add(this);
    this.type = 'navigate';
    this.width = 4;
    this.addToDisplayList();
}

    toTarget(){
        const camera = this.scene.cameras.main;
        camera.centerOn(this.target.x, this.target.y);
        camera.viewScreenUpdate();
    }
}