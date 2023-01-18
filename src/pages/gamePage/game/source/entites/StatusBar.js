export default class StatusBar {
    constructor(entity) {
        this.owner = entity;
        this.selectedArc = this._createArc(2);
        switch(this.owner.type){
            case 'unit': {
                this._unitHPBar();
                break;
            }
            case 'castle': {
                break;
            }
        }
        this.addX = 0;
        this.addY = 0;
    }

    _unitHPBar() {
        this.currentHP = this._createArc(2);
        this.currentHP.setClosePath(false);
        this.currentHP.setStartAngle(-30);
        this.currentHP.setEndAngle(100);
        this.currentHP.depth = 0.2;
        this.barHP = this._createArc(4);
        this.barHP.setClosePath(false);
        this.barHP.setStartAngle(-47);
        this.barHP.setEndAngle(102);
        this.barHP.strokeColor = 0x101010;
        this.barHP.depth = 0.1;
    }

    _createArc(lineWidth) {
        let arc = this.owner.scene.add.arc(0, 0, 0, 0);
        arc.isStroked = true;
        arc.strokeColor = 0;
        arc.lineWidth = lineWidth;
        arc.setVisible(false);
        arc.scaleX = 1.5;
        return arc;
    }

    setXY(x, y) {
        this.selectedArc.x = x + this.addX;
        this.selectedArc.y = y + this.addY;
        this.currentHP.x = x + this.addX;
        this.currentHP.y = y + this.addY;
        this.barHP.x = x + this.addX;
        this.barHP.y = y + this.addY;
    }

    setAddXY(dx, dy) {
        this.addX = dx;
        this.addY = dy;
    }

    setSize(radius){
        this.selectedArc.setRadius(radius);
        this.currentHP.setRadius(radius+5);
        this.barHP.setRadius(radius+5);
        //this.selectedArc.setOrigin(1, 1)
        /*this.selectedArc.setSize(width+10, height+10);
        this.currentHP.setSize(width, height);*/
    }

    setColor(color) {
        this.selectedArc.strokeColor = color;
        this.currentHP.strokeColor = color;
    }

    setVisible(visible) {
        this.selectedArc.setVisible(visible);
        this.currentHP.setVisible(visible);
        this.barHP.setVisible(visible);
    }

    damage(damage) {
        this.currentHP = 130;
    }
}