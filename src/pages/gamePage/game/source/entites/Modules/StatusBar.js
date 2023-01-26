export default class StatusBar {
    constructor(infographics) {
        this.infographics = infographics;
        let borderLineWidth = 3;
        let valueLineWidth = 1;
        this.startAngle = 95;
        this.endAngle = -135;
        this.border = this._createArc(borderLineWidth, this.startAngle - 1, this.endAngle + 1);
        this.border.strokeColor = 0x101010;
        this.maxValue = this._createArc(valueLineWidth,this.startAngle,this.endAngle);
        this.maxValue.depth = 0.1;
        this.currentValue = this._createArc(valueLineWidth, this.startAngle, this.endAngle);
        this.currentValue.depth = 0.2;
        this.addX = 0;
        this.addY = 0;
        this.value = 1;
    }

    _createArc(lineWidth,startAngle, endAngle) {
        let arc = this.infographics.owner.scene.add.arc(0, 0, 0, startAngle, endAngle);
        arc.isStroked = true;
        arc.strokeColor = 0;
        arc.lineWidth = lineWidth;
        arc.setVisible(false);
        arc.scaleX = 1.5;
        arc.setClosePath(false);
        return arc;
    }

    setSide(side){
        this.type = side;
        this.startAngle = (this.type === 'left') ? -45 : 95;
        this.endAngle = (this.type === 'left') ? 85 : -135;
        this.updateValue(this.value)
    }

    setXY(x, y) {
        this.border.x = x + this.addX;
        this.border.y = y + this.addY;
        this.currentValue.x = x + this.addX;
        this.currentValue.y = y + this.addY;
        this.maxValue.x = x + this.addX;
        this.maxValue.y = y + this.addY;
    }

    setAddXY(dx, dy) {
        this.addX = dx;
        this.addY = dy;
    }

    setSize(radius){
        this.border.setRadius(radius);
        this.currentValue.setRadius(radius);
        this.maxValue.setRadius(radius);
    }

    setType(type){
        switch(type){
            case 's':{
                this.border.lineWidth = 4;
                this.currentValue.lineWidth = 2;
                this.maxValue.lineWidth = 2;
                break;
            }
            case 'm':{
                this.border.lineWidth = 7;
                this.currentValue.lineWidth = 5;
                this.maxValue.lineWidth = 5;
                break;
            }
            case 'l':{
                this.border.lineWidth = 10;
                this.currentValue.lineWidth = 8;
                this.maxValue.lineWidth = 8;
                break;
            }

        }
    }

    setColor(color1, color2) {
        this.currentValue.strokeColor = color1;
        this.maxValue.strokeColor = color2;
    }

    setVisible(visible) {
        this.border.setVisible(visible);
        this.currentValue.setVisible(visible);
        this.maxValue.setVisible(visible);
    }

    updateValue(procent) {
        let base = 130;
        this.value = procent;
        if (this.type === 'left') {
            //return this.currentValue.setStartAngle(this.endAngle - base*procent)
        }
        return this.currentValue.setEndAngle(this.startAngle + base*procent)
    }

    destroy() {
        if (this.border) this.border.destroy();
        if (this.currentValue) this.currentValue.destroy();
        if (this.maxValue) this.maxValue.destroy();
    }
}