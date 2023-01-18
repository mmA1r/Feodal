export default class StatusBar {
    constructor(entity) {
        this.owner = entity;
        this.arcs = [];
        this._selectedArc();
        switch(this.owner.type){
            case 'unit': {
                this._unitHPBar();
                break;
            }
            case 'castle': {
                this._castleHPBar();
                break;
            }
        }
        this.addX = 0;
        this.addY = 0;
    }

    _selectedArc() {
        this._createArc(2);
    }

    _castleHPBar() {
        this.currentHP = this._createArc(5);
        this.currentHP.setClosePath(false);
        this.currentHP.setStartAngle(75);
        this.currentHP.setEndAngle(-130);
        this.currentHP.depth = 0.2;
        this.barHP = this._createArc(8);
        this.barHP.setClosePath(false);
        this.barHP.setStartAngle(74);
        this.barHP.setEndAngle(-129);
        this.barHP.strokeColor = 0x101010;
        this.barHP.depth = 0.1;
        this.dr = 10;
    }

    _unitHPBar() {
        this.currentHP = this._createArc(2);
        this.currentHP.setClosePath(false);
        this.currentHP.anticlockwise = true;
        this.currentHP.setStartAngle(100);
        this.currentHP.setEndAngle(-45);
        this.currentHP.depth = 0.2;
        this.barHP = this._createArc(4);
        this.barHP.setClosePath(false);
        this.barHP.setStartAngle(-47);
        this.barHP.setEndAngle(102);
        this.barHP.strokeColor = 0x101010;
        this.barHP.depth = 0.1;
        this.dr = 5;
    }

    _createArc(lineWidth) {
        let arc = this.owner.scene.add.arc(0, 0, 0, 0);
        arc.isStroked = true;
        arc.strokeColor = 0;
        arc.lineWidth = lineWidth;
        arc.setVisible(false);
        arc.scaleX = 1.5;
        this.arcs.push(arc);
        return arc;
    }

    setXY(x, y) {
        this.arcs.forEach((arc)=>{
            arc.x = x + this.addX;
            arc.y = y + this.addY
        })
    }

    setAddXY(dx, dy) {
        this.addX = dx;
        this.addY = dy;
    }

    setSize(radius){
        this.arcs.forEach((arc, index)=>{
            let r = (index == 0) ? radius : radius + this.dr; 
            arc.setRadius(r);
        })
    }

    setColor(color) {
        this.arcs[0].strokeColor = color;
        if (this.arcs[1]) this.arcs[1].strokeColor = color;
    }

    setVisible(visible) {
        this.arcs.forEach((arc)=>{
            arc.setVisible(visible);
        })
    }

    updateHPBar(procent) {
        let base = (this.owner.type === "unit") ? -155 : 155
        this.arcs[1].setEndAngle(this.arcs[1].startAngle + base*procent)
    }

    destroy() {
        this.arcs.forEach((arc)=> {
            arc.destroy();
        })
    }
}