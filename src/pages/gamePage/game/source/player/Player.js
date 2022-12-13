import Camera from '../camera/Camera';
import getCastle from '../getCastle/getCastle'

export default class Player {
    constructor(scene) {
        this.scene = scene;
        this.id = 0;
        console.log(this.id);
        this.units = scene.add.group();
        this.castle = {};
        this.selectedObj = [];
        this.might = 0;
        getCastle(this);
    }

    updateMight() {
        this.might = this.units.getChildren().reduce((sumM, unit) => sumM += unit.might, 0);
        this.scene.store.loadToStore({ might: this.might }, 'gamer');
        this.scene.villagesGroup.getChildren().forEach((v) => v.updateResistLevel());
    }

    select(selector) {
        this.unselect();
        selector.forEach(el => el.select);
    };

    unselect() {
        this.selectedObj.forEach(el => el.unselect);
        this.selectedObj = [];
    }
}