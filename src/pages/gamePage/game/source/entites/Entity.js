import Phaser from "phaser";
import Infographics from "./Modules/Infographics";

export default class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, props) {
        super(scene);
        //  Присваиваем тип
        this.type = props.type;
        //  Определяем размеры хитбоксов
        this.activeRadius = props.activeRadius;
        //  Выбран/не выбран
        this.selected = false;
        // Функция для обновления UI
        this.callbackUI = this.scene.player.updateUI;
        //  "Глаза" объекта
        //this.viewRadius = new ViewZone(this);
        //  Графическая отметка о выборе объекта
        //this.selectMarker = new SelectMarker(this);
        //  Интерфейсы
        //  Для выбранного
        this.interfacesForSelected = [];
        // Все
        this.infographics = new Infographics(this);
        this.infographics.addModule('selectMarker', 'selectMarker', true);
        this.isUpdated = true;
        this.shadow = {is: this.shadow.bind(this)};
    }

    shadow(key){
        return (typeof this[key] === 'function') ? this[key].bind(this) : this[key];
    }

    //вывод на карту
    create(isStatic) {
        this.addedToScene();
        this.addToDisplayList();
        this.setInteractive();
        this.scene.physics.add.existing(this, isStatic);
        this.body.isCircle = true;
        this.body.setCircle(this.activeRadius);
        this.body.onCollide = true;
        this.infographics.getModule('selectMarker').setSize(this.activeRadius*0.8);
    }

    //  Выбор объекта
    select(selector) {
        this.selected = true;
        this.inFocus();
        this.selector = selector;
        this.callbackUI();
    }

    //  Снятие выбора
    unselect() {
        this.selected = false;
        this.outFocus();
        this.callbackUI();
        if (this.selector) this.selector.removeSelect(this);
    }

    inFocus(){
        this.infographics.setVisible(true);
    }

    outFocus(){
        this.infographics.setVisible(false);
    }

    //  Смена координат объекта вместе с интерфейсом
    setXY(x,y){
        this.x = x;
        this.y = y;
        this.depth = y;
        this.infographics.setXY(x,y);
    }

    //  Уничтожение объекта вместе с интерфейсом
    killed(){
        if (this.infographics) this.infographics.destroy();
        this.destroy();
    }
}