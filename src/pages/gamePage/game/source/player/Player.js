import getCastle from '../getCastle/getCastle'
import MouseController from '../methods/MouseController';

export default class Player {
    constructor(scene) {
        this.scene = scene;
        this.getCastle = {};

        this.pointer = this.scene.add.sprite(this.x, this.y, 'pointer');
        this.pointer.depth = 0.4;
        this.pointer.anims.create({
            key: "stand",
            frames: [{
                key: 'flag',
                frame: 1,
                duration: 80
            },
            {
                key: 'flag',
                frame: 2,
                duration: 80
            },
            {
                key: 'flag',
                frame: 3,
                duration: 80
            },
            {
                key: 'flag',
                frame: 4,
                duration: 80
            }],
            duration: 320,
            repeat: -1
        });
        this.pointer.anims.play("stand", true);
        this.pointer.depth = 100000000;

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

    addUnit(unit) {
        this.units.add(unit);
        this.updateMight();
    }

    gameOver() {
        this.isAlive = false;
        this.scene.updater.remove(this.getCastle);
        this.scene.store.loadToStore(true, 'gameOver');
    }

    updateMight() {
        this.might = this.units.getChildren().reduce((sumM, unit) => sumM += unit.might, 0);
        this.scene.store.loadToStore({ might: this.might }, 'gamer');
        this.scene.villagesGroup.getChildren().forEach((v) => v.updateResistLevel());
    }

    removeSelect(obj){
        this.unselect()
        obj.selector = undefined;
        this.updateUI();
    }

    select(obj){
        this.unselect();
        this.selectedObject = obj;
        obj.select(this);
        if (obj.isMine) this.movePointer(obj.pointer);
    }

    unselect(){
        if (this.selectedObject) {
            let obj = this.selectedObject;
            this.selectedObject = undefined;
            obj.unselect();
            this.pointer.setVisible(false);
        }
    }

    movePointer(obj){
        if (obj.visible) {
            this.pointer.setVisible(true);
            this.pointer.x = obj.x + 23;
            this.pointer.y = obj.y - 107;
            setTimeout(()=> {
                this.pointer.y +=20;
            },50)
            setTimeout(()=> {
                this.pointer.y +=20;
            },100)
            setTimeout(()=> {
                this.pointer.y +=20;
            },150)
            setTimeout(()=> {
                this.pointer.y +=20;
            },200)
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
                    this.movePointer(obj);
                    break;
                }
                case 'unit':{
                        this.selectedObject.moveTo(obj);
                        this.movePointer(obj);
                        break;
                }
                case 'army':{
                        this.selectedObject.moveTo(obj);
                        if (obj.type === 'pointer')this.movePointer(obj);
                        break;
                }
            }
        }
    }

    rent() {
        if (this.isAlive) getCastle(this);
    }
}