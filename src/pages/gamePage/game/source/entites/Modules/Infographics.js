import SelectMarker from "./SelectMarker";
import Name from "./Name";
import StatusBar from "./StatusBar";


export default class Infographics {
    constructor(entity) {
        this.owner = entity;
        this.modules = [];
    }

    addModule(type, name, hidden){
        const newModule = 
        (type === 'name') ? new Name(this) :
        (type === 'selectMarker') ? new SelectMarker(this) :
        (type === 'statusBar') ? new StatusBar(this) : false;
        if (newModule) {
            this.modules.push({
                name: name,
                module: newModule,
                hidden: hidden
            })
        }
    }

    getModule(name) {
        return this.modules.find(el => el.name === name).module
    }

    setXY(x, y) {
        this.modules.forEach(el => el.module.setXY(x,y));
    }

    setVisible(visible, forAll) {
        if (forAll) {
            this.modules.forEach(el => el.module.setVisible(visible));
        }
        else {
            this.modules.map(el => {
                if (el.hidden) return el;
            }).forEach(el => el.module.setVisible(visible))
        }
    }

    destroy() {
        this.modules.forEach(el => el.module.destroy());
    }
}