import Phaser from "phaser";
import EventsOn from '../source/methods/EventsOn'
import uploadSources from '../source/methods/uploadSource'
import Camera from '../source/camera/Camera'
import getScene from '../source/getScene/getScene'
import Physics from "../source/physics/Physics";
import Trees from "../source/trees/Trees";
import StoreLoader from "../../../../store/StoreLoader";
import StoreData from "../source/storeData/StoreData";
import Player from "../source/player/Player";
import updateUnits from "../source/updateUnits/updateUnits";
import Updater from "../source/updater/Updater";
import store from '../../../../store/store';


export default class WorldScene extends Phaser.Scene {
    constructor(name) {
        super(name);
    }

    preload() {
        uploadSources(this);
        this.store = new StoreLoader;
        this.unitsGroup = this.add.group();
        this.castlesGroup = this.add.group();
        this.villagesGroup = this.add.group();
        this.selectedUnits = this.add.group();
        this.treesGroup = this.add.group();
        this.updates = this.add.group();
        this.dataUnitsTypes = [];
    }

    async create() {
        this.map = this.make.tilemap({ key: 'tilemap' });
        const map = this.map;
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');
        this.grass = map.createLayer('grass', tiles, 0, 0);
        this.grass.forEachTile((tile)=>{
            tile.setVisible(false);
        });
        this.bushes = map.createLayer('bushes', tiles, 0, 0);
        this.bushes.forEachTile((tile)=>{
            tile.setVisible(false);
        });
        this.trees = map.createLayer('trees', tiles, 0, 0);
        this.trees.forEachTile((tile)=>{
            tile.setVisible(false);
        });
        Trees(this);
        EventsOn(this);
        Physics(this);
        Camera(this);
        this.updater = new Updater();
        this.player = new Player(this);
        this.updateUnits = updateUnits(this);
        this.StoreData = new StoreData(this);
        this.server = store.getState().server.value;
        this.StoreData.loadDataUnitsTypes();
        setTimeout(()=> {
            this.getScene = getScene(this);
        }, 500);
    }


    update() {
        this.updater.update();
    }
}