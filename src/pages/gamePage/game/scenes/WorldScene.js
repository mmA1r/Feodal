import Phaser from "phaser";

import store from '../../../../store/store';
import { money } from '../../../../store/features/user/userMoney';
import { level } from '../../../../store/features/user/userLevel';
import { units } from '../../../../store/features/user/userUnits';
import { hp } from '../../../../store/features/user/userHp';
import soldier from "../../../../store/features/units/soldier";

import EventsOn from '../source/methods/EventsOn'
import uploadSources from '../source/methods/uploadSource'
import Camera from '../source/camera/Camera'
import getScene from '../source/getScene/getScene'
import getCastle from '../source/getCastle/getCastle'

import { defaultEqualityCheck } from "reselect";
import { upload } from "@testing-library/user-event/dist/upload";
import AutoUpdater from "../source/autoUpdater/autoUpdater";
import Physics from "../source/phisics/Physics";
import Trees from "../source/trees/Trees";
import SelectorUnits from "../source/selectorUnits/SelectorUnits";


export default class WorldScene extends Phaser.Scene {
    constructor(name) {
        super(name);
    }

    preload() {
        uploadSources(this);
        getCastle(this);
        this.unitsGroup = this.add.group();
        this.castlesGroup = this.add.group();
        this.villagesGroup = this.add.group();
        this.selectedUnits = this.add.group();
        this.treesGroup = this.add.group();
        this.selectorUnits = {};
    }

    async create() {
        this.map = this.make.tilemap({ key: 'tilemap' });
        const map = this.map;
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');
        const grass = map.createLayer('grass', tiles, 0, 0);
        const bushes = map.createLayer('bushes', tiles, 0, 0);
        const trees = map.createLayer('trees', tiles, 0, 0);
        SelectorUnits(this);
        EventsOn(this);
        Camera(this);
        Trees(this);
        Physics(this);
        getScene(this);
        AutoUpdater(this);
    }


    async update() {
        this.unitsGroup.getChildren().forEach((el) => el.update());
        if (this.cameras.main.isMoved) {
            this.cameras.main.move();
        }
        console.log(this.player)
    }
}