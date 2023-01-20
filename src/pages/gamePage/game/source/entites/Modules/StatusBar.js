export default class StatusBar {
    constructor(entity, type, size) {
        this.owner = entity;
        this.owner.interfacesForSelected.push(this);
        this.owner.interfacesAll.push(this);
        this.type = type;
        let borderLineWidth = 3;
        let valueLineWidth = 1;
        switch (size) {
            case 'small' : {
                borderLineWidth = 3;
                valueLineWidth = 1;
                break;
            }
            case 'middle' : {
                borderLineWidth = 4;
                valueLineWidth = 2;
                break;
            }
            case 'big' : {
                borderLineWidth = 8;
                valueLineWidth = 2;
                break;
            }
        }
        this.startAngle = (this.type === 'left') ? -45 : 95;
        this.endAngle = (this.type === 'left') ? 85 : -135;
        this.border = this._createArc(borderLineWidth);
        this.border.strokeColor = 0x101010;
        this.maxValue = this._createArc(valueLineWidth);
        this.maxValue.depth = 0.1;
        this.currentValue = this._createArc(valueLineWidth);
        this.currentValue.depth = 0.2;
    }

    _createArc(lineWidth) {
        let arc = this.owner.scene.add.arc(0, 0, 0);
        arc.isStroked = true;
        arc.strokeColor = 0;
        arc.lineWidth = lineWidth;
        arc.setVisible(false);
        arc.scaleX = 1.5;
        arc.setClosePath(false);
        return arc;
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
        if (this.type === 'left') {
            return this.currentValue.setStartAngle(this.endAngle - base*procent)
        }
        return this.currentValue.setEndAngle(this.startAngle + base*procent)
    }

    destroy() {
        this.border.destroy();
        this.currentValue.destroy();
        this.maxValue.destroy();
    }
}