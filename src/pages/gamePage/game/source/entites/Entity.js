import Phaser from "phaser";
import SelectMarker from "./SelectMarker";

export default class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, props) {
        super(scene);
        //  Присваиваем тип
        this.type = props.type;
        //  Определяем размеры хитбоксов
        this.activeRadius = props.activeRadius;
        this.scene.physics.add.existing(this, false);
        this.body.isCircle = true;
        this.body.setCirle(this.activeRadius);
        this.setInteractive(Phaser.Geom.Circle(this.x,this.y,this.activeRadius)); 
        //  Выбран/не выбран
        this.selected = false;
        // Функция для обновления UI
        this.callbackUI = this.scene.player.updateUI;
        //  "Глаза" объекта
        //this.viewRadius = new ViewZone(this);
        //  Графическая отметка о выборе объекта
        this.selectMarker = new SelectMarker(this);
        // Добавление объекта на сцену
        this.addedToScene();
        this.addToDisplayList();
    }

    //  Выбор объекта
    select() {
        this.selected = true;
        this.selectMarker.setVisible(true);
        this.callbackUI();
    }

    //  Снятие выбора
    unselect() {
        this.selected = false;
        this.selectMarker.setVisible(false);
        this.callbackUI();
    }

    //  Смена координат объекта вместе с интерфейсом
    setXY(x,y){
        this.setPosition(x,y);
        this.selectMarker.setXY(x,y);
    }

    //  Уничтожение объекта вместе с интерфейсом
    destroy(){
        this.statusBar.destroy();
        super.destroy();
    }
}