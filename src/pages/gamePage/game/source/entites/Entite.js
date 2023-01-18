import Phaser from "phaser";
import StatusBar from "./StatusBar";

export default class Entite extends Phaser.GameObjects.Sprite{
    constructor(scene, props) {
        super(scene);
        this.selected = false;
        this.type = props.type;
        this.callbackUI = this.scene.player.updateUI; //props.callbackUI;
        this.activeRadius = props.activeRadius;
        this.viewRadius = this.scene.add.arc;
        this.selectArc = new StatusBar(this);
    }

    _updateDataCallbackUI(){
        if (this.selected) this.callbackUI();
    }

    updateData(param, value){
        if (this[param]) {
            this[param] = value;
            this._updateDataCallbackUI();
        }
    }

    select() {
        this.selected = true;
        this.selectArc.setVisible(true);
    }

    unselect() {
        this.selected = false;
        this.selectArc.setVisible(false);
    }
}