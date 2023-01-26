export default class Name {
    constructor(infographics) {
        this.infographics = infographics;
        this.name = this._createText(40);
        this.addX = 0;
        this.addY = 0;
    }

    _createText(fontSize) {
        const text = this.infographics.owner.scene.add.text(this.infographics.owner.x, this.infographics.owner.y, '', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        text.depth = 10000000;
        text.style.setFontSize(fontSize);
        text.style.setAlign('center')
        text.scrollFactorX = 1;
        text.scrollFactorY = 1;
        return text;
    }

    setXY(x, y) {
        this.name.x = x + this.addX;
        this.name.y = y + this.addY;
    }

    setName(name) {
        this.name.setText(name);
    }

    setAddXY(dx, dy) {
        this.addX = dx;
        this.addY = dy;
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
        if (this.name) this.name.destroy();
    }
}