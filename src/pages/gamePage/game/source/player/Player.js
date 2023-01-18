import { Data } from 'phaser';
import getCastle from '../getCastle/getCastle'
import MouseController from '../methods/MouseController';
import Selector from './selector/Selector';

export default class Player {
    constructor(scene) {
        this.scene = scene;
        this.id = 0;
        this.castle = {};
        this.might = 0;
        this.selectedObject = undefined;
        this.units = scene.add.group();
        getCastle(this);
        MouseController(this.scene);
        this.updateUI = this.updateUI.bind(this);
    }

    updateMight() {
        this.might = this.units.getChildren().reduce((sumM, unit) => sumM += unit.might, 0);
        this.scene.store.loadToStore({ might: this.might }, 'gamer');
        this.scene.villagesGroup.getChildren().forEach((v) => v.updateResistLevel());
    }

    select(obj){
        this.unselect();
        this.selectedObject = obj;
        obj.select();
    }

    unselect(){
        if (this.selectedObject) {
            let obj = this.selectedObject;
            this.selectedObject = undefined;
            obj.unselect();
        }
    }

    updateUI() {
        let typeUI = 'hide';
        if (this.selectedObject) typeUI = this.selectedObject.updateUI();
        this.scene.store.loadToStore(typeUI, 'ui');
        this.scene.StoreData.lastUI = typeUI;
    }

    command(obj) {
        if(this.selectedObject.isMine) {
            switch (this.selectedObject.type) {
                case 'castle': {
                    this.selectedObject.pointer.moveTo(obj.x, obj.y);
                    break;
                }
                case 'unit':{
                        this.selectedObject.moveTo(obj);
                        break;
                }
                case 'army':{
                        this.selectedObject.moveTo(obj);
                        break;
                }
            }
        }
    }
}