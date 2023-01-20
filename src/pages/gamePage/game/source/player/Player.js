import getCastle from '../getCastle/getCastle'
import MouseController from '../methods/MouseController';

export default class Player {
    constructor(scene) {
        this.getCastle = {};
        this.scene = scene;
        this.id = 0;
        this.castle = {};
        this.might = 0;
        this.selectedObject = undefined;
        this.units = scene.add.group();
        this.nextUpdateTime = 0;
        getCastle(this);
        MouseController(this.scene);
        this.updateUI = this.updateUI.bind(this);
        this.isAlive = true;
    }

    addCastle(castle) {
        this.castle = castle;
        this.onCastle();
        this.isAlive = true;
    }

    onCastle(){
        this.scene.cameras.main.centerOn(this.castle.x, this.castle.y);
        this.scene.cameras.main.viewScreenUpdate();
    }

    gameOver() {
        console.log('GAME OVER!!!')
        this.isAlive = false;
        this.scene.updater.remove(this.getCastle);
        this.scene.store.loadToStore(true, 'gameOver');
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

    rent() {
        console.log('GET MY CASTLE')
        if (this.isAlive) getCastle(this);
    }
}