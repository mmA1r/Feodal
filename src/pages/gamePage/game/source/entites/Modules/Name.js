export default class SelectMarker {
    constructor(entity,name) {
        this.owner = entity;
        this.name = this._createText(30,name);
        this.addX = 0;
        this.addY = 0;
    }

    _createText(fontSize, name) {
        let text = this.owner.scene.add.text(0, 0, name, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        text.depth = 10000000;
        text.style.setFontSize(fontSize);
        text.style.setAlign('center')
        text.scrollFactorX = 1;
        text.scrollFactorY = 1;
        console.log(name);
        //text.setStroke(0x101010, 1);
        return text;
    }

    setXY(x, y) {
        this.name.x = x + this.addX;
        this.name.y = y + this.addY;
        console.log(x,y)
    }

    setAddXY(dx, dy) {
        this.addX = dx;
        this.addY = dy;
        this.setXY(this.x, this.y);
    }

    setSize(fontSize){
        this.name.style.setFontSize(fontSize);
    }

    setColor(color) {
    }

    setVisible(visible) {
        this.name.setVisible(visible);
    }

    destroy() {
        //this.name.destroy();
    }
}