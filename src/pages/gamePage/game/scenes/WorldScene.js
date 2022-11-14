import Phaser from "phaser";

import store from '../../../../store/store';

import tileMapSheet from '../../../../assets/gameSprites/spriteMap.png';
import castleSprite from '../../../../assets/gameSprites/castle.png';
import villageSprite from '../../../../assets/gameSprites/village.png'
import tileMap from "../tileMap/tileMap";


export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    preload() {
        this.load.image('spriteMap', tileMapSheet);
        this.load.image('castleFirstLevel', castleSprite);
        this.load.image('village', villageSprite);
        try {
            this.load.tilemapTiledJSON('tilemap', tileMap);
        } catch (e) {
            console.log('something wrong', e);
        }
    }

    async create() {
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
        const physics = this.physics;
        physics.world.bounds.width = map.widthInPixels;
        physics.world.bounds.height = map.heightInPixels;

        const server = store.getState().server.value;
        const data = await server.getScene();
        const castles = data.castles;
        const villages = data.villages;
        const units = data.unit;

        const userData = await server.getCastle();
        const userCastle = userData.castle;

        /********************/
        /****** Castle ******/
        /********************/
        
        const castle = physics.add.image(userCastle.castleX-0, userCastle.castleY-0, 'castleFirstLevel');
        castle.setInteractive();
        const castleUntits = [];
        let castleHp = 0
        /* Fix bug 'units is null'.
            p.s Рома
        */
        // if(units){
            units.forEach(unit => {
                if(unit.userId === userCastle.id) {
                    castleHp += unit.hp
                    return castleUntits.push(unit);
                }
            });
        // }
        castle.setData({
            hp: castleHp,
            money: userCastle.money-0,
            level: userCastle.castleLevel-0,
            units: castleUntits,
        });
        
        castle.addListener('pointerover', () => {
            castle.setTint(185274);
        });
        castle.addListener('pointerout', () => {
            castle.setTint();
        });
        castle.addListener('pointerdown', () => {
            document.getElementsByClassName('castle-manage-button')[0].click();
        });

        /*********************/
        /****** Village ******/
        /*********************/

        villages.forEach(village => {
            village = physics.add.image(village.posX-0, village.posY-0, 'village');
            village.setInteractive();
            village.setData({
                level: village.level,
                money: village.money,
                population: village.population
            });
            village.addListener('pointerover', () => {
                village.setTint(185274);
            });
            village.addListener('pointerout', () => {
                village.setTint();
            });
        });


        /******************/
        /***** Camera *****/
        /******************/ 
        const camera = this.cameras.main;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        camera.useBounds = true;
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setViewport(0, 0, winWidth, winHeight);
        camera.centerOn(userCastle.castleX, userCastle.castleY);

        /**** CameraMove  ****/

        const pageCenter = { 
            x: winWidth/2, 
            y: winHeight/2 
        }
        const cameraMovesTo = {
            x: userCastle.castleX - winWidth/2,
            y: userCastle.castleY - winHeight/2,
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
                (
                    e.event.clientX >= winWidth - winWidth/5 || 
                    e.event.clientX < winWidth/5 || 
                    e.event.clientY >= winHeight - winHeight/5 || 
                    e.event.clientY < winHeight/5
                ) 
            ) {
                cameraMovesTo.move = true;
            } else {
                cameraMovesTo.move = false;
            }
            document.getElementsByTagName('canvas')[0].onmouseleave = () => {
                cameraMovesTo.move = false;
            };
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
        }
    }

    update() {
    }
}