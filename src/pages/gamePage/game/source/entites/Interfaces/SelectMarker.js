export default class SelectMarker {
    constructor(entity) {
        this.owner = entity;
        this.marker = this._createArc(2);
        this.marker.depth = 0.1;
        this.borderMarker = this._createArc(4);
        this.borderMarker.strokeColor = 0x101010;
        this.addX = 0;
        this.addY = 0;
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
        this.marker.x = x + this.addX;
        this.marker.y = y + this.addY;
        this.borderMarker.x = x + this.addX;
        this.borderMarker.y = y + this.addY;
    }

    setAddXY(dx, dy) {
        this.addX = dx;
        this.addY = dy;
    }

    setSize(radius){
        this.marker.setRadius(radius);
        this.borderMarker.setRadius(radius);
    }

    setColor(color) {
        this.marker.strokeColor = color;
    }

    setVisible(visible) {
        this.marker.setVisible(visible);
        this.borderMarker.setVisible(visible);
    }

    destroy() {
        this.marker.destroy();
        this.borderMarker.destroy();
    }
}