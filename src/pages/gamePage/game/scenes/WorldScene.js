import Phaser from "phaser";

import tileMapSheet from '../../../../assets/spriteMap.png';
import tileMap from "../tileMap/tileMap";


export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    preload() {
        this.load.image('spriteMap', tileMapSheet);
        try {
            this.load.tilemapTiledJSON('tilemap', tileMap);
        } catch (e) {
            console.log('something wrong', e);
        }
    }

    create() {
        /***************/
        /***** Map *****/
        /***************/ 
        const map = this.make.tilemap({ key: 'tilemap' });
        const tiles = map.addTilesetImage('spriteTileSet', 'spriteMap');
        // eslint-disable-next-line
        const grass = map.createLayer('grass', tiles, 0, 0);
        // eslint-disable-next-line
        const bushes = map.createLayer('bushes', tiles, 0, 0);
        // eslint-disable-next-line
        const trees = map.createLayer('trees', tiles, 0, 0);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

        /******************/
        /***** Camera *****/
        /******************/ 
        const camera = this.cameras.main;

        camera.useBounds = true;
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setViewport(0, 0, window.innerWidth, window.innerHeight);
        camera.centerToBounds();

        /**** CameraMove  ****/
        const pageCenter = { 
            x: window.innerWidth/2, 
            y: window.innerHeight/2 
        }
        const cameraMovesTo = {
            x: camera.getBounds().centerX-window.innerWidth/2,
            y: camera.getBounds().centerY-window.innerHeight/2,
            move: false
        }
        const mouseVector = {
            x: 0,
            y: 0
        }

        const moveCamera = setInterval(() => {
            if(cameraMovesTo.move) {
                if(
                    (Math.ceil(camera.worldView.right) >= camera._bounds.right && mouseVector.x > 0) ||
                    (Math.ceil(camera.worldView.left) <= camera._bounds.left && mouseVector.x < 0)
                ) {
                    cameraMovesTo.x += 0;
                } else {
                    cameraMovesTo.x += mouseVector.x/300;
                }
                if(
                    (Math.ceil(camera.worldView.bottom) >= camera._bounds.bottom && mouseVector.y > 0) ||
                    (Math.ceil(camera.worldView.top) <= camera._bounds.top && mouseVector.y < 0)
                ) {
                    cameraMovesTo.y += 0;
                } else {
                    cameraMovesTo.y += mouseVector.y/150;
                }
                camera.setScroll(cameraMovesTo.x, cameraMovesTo.y);
            }
            if(!document.getElementById('game')) {
                cameraMovesTo.move = false;
                clearInterval(moveCamera);
                this.scene.remove('WorldScene');
            }
        });

        this.input.on('pointermove', (e) => {
            isMoveCamera(e);
        });

        function isMoveCamera(e) {
            if (
                e.event.clientX >= window.innerWidth - 150 || 
                e.event.clientX < 150 || 
                e.event.clientY >= window.innerHeight - 150 || 
                e.event.clientY < 150
            ) {
                cameraMovesTo.move = true;
            } else {
                cameraMovesTo.move = false;
            }
            mouseVector.x = e.event.clientX - pageCenter.x;
            mouseVector.y = e.event.clientY - pageCenter.y;
        }

        /**** CameraZoom  ****/
        this.input.on('wheel', (e) => {
            zoom(e.deltaY);
        });

        let zoomDelta = 1;

        function zoom(delta) {
            if(delta > 0) { //вверх
                if(zoomDelta > 0.5) {
                    zoomDelta -= delta/1500;
                    camera.zoomTo(zoomDelta, 200, 'Linear', true);
                }
            } else { //вниз
                if(zoomDelta < 2) {
                    zoomDelta -= delta/1500;
                    camera.zoomTo(zoomDelta, 200, 'Linear', true);
                }
            }
            console.log(zoomDelta)
        }
    }

    update() {
    }
}