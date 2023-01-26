export default class Area {
    constructor(infographics){
        this.infographics = infographics;
        this.area = this._createArc(2);
        this.area.setAlpha(0.1);
        this.area.isFilled = true;
        this.border = this._createArc(4);
        this.addX = 0;
        this.addY = 0;
        this.speed = 2;
        this.stepCallback = undefined;
    }

    _createArc(lineWidth) {
        let arc = this.infographics.owner.scene.add.arc(0, 0, 0, 0);
        arc.isStroked = true;
        arc.strokeColor = 0x101010;
        arc.lineWidth = lineWidth;
        arc.setVisible(false);
        arc.scaleX = 1.5;
        return arc;
    }

    setVisible(visible){
        this.area.setVisible(visible);
        this.border.setVisible(visible)
    }

    setXY(x,y){
        this.area.x = x + this.addX;
        this.area.y = y + this.addY;
        this.border.x = x + this.addX;
        this.border.y = y + this.addY;
    }

    setSize(radius) {
        this.area.setRadius(radius);
        this.border.setRadius(radius);
    }

    setColor(color) {
        this.area.fillColor = color;
        this.area.strokeColor = color;
        this.border.strokeColor = color;
    }

    switchOn(){
        this.infographics.owner.scene.physics.add.existing(this.area, true);
        this.area.body.onCollide = true;
    }

    targetsInArea(targets){
        let i = 0;
        this.infographics.owner.scene.physics.collide(this.area, targets, (area, target) => {
            i++;
        })
        return i;
    }

    AoE(targets,func,value){
        this.infographics.owner.scene.physics.collide(this.area, targets, (area, target) => {
            target[func](value);
        })
    }

    stepOn(){
        this.area.setRadius(0);
        this.infographics.owner.scene.updater.remove(this.stepper);
        this.stepper = this.infographics.owner.scene.updater.add(this, new Date() - 0, 'frame', false);
    }

    frame(){
        this.area.radius +=this.speed;
        if (this.area.radius > this.border.radius) {
            this.area.radius = 0;
            if (this.stepCallback) this.stepCallback();
        }
    }

    stepOff(){
        this.infographics.owner.scene.updater.remove(this.stepper);
    }

    destroy(){
        this.infographics.owner.scene.updater.remove(this.stepper);
        if (this.area) this.area.destroy();
        if (this.border) this.border.destroy();
    }

}