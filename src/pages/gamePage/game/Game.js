import React from "react";
import Phaser from "phaser";

import store from "../../../store/store";
import tileMap from '../../../assets/sprite_map/sprite_map.png'

import './game.scss';

export default class Game extends React.Component {

    constructor() {
        super();
        this.server = store.getState().server.value;
    }

    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            parent: 'game',
            physics: {
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        async function preload() {
            this.load.image('sprite_map', tileMap);

            const jsonForPhaser = {
                "compressionlevel": -1,
                "height": 120,
                "infinite": false,
                "layers": [
                    {
                        "data": null,
                        "height": 120,
                        "id": 1,
                        "name": "Tile Layer 1",
                        "opacity": 1,
                        "type": "tilelayer",
                        "visible": true,
                        "width": 120,
                        "x": 0,
                        "y": 0
                    }],
                "nextlayerid": 2,
                "nextobjectid": 1,
                "orientation": "orthogonal",
                "renderorder": "right-down",
                "tiledversion": "1.9.2",
                "tileheight": 32,
                "tilesets": [
                    {
                        "firstgid": 1,
                        "source": "sprite_map.tsx"
                    }],
                "tilewidth": 32,
                "type": "map",
                "version": "1.9",
                "width": 120
            };

            try {
                const server = store.getState().server.value;
                const data = JSON.parse(await server.getMap());
                jsonForPhaser.layers[0].data = data;
                this.load.tilemapTiledJSON('tilemap', jsonForPhaser);
            } catch (e) {
                console.log('Что-то сломалось', e);
            }
        }
        function create() {

            // const map = this.make.tilemap({ key: 'tilemap' });
            // const tiles = map.addTilesetImage('sprite_map', 'sprite_map', 32, 32);
            // const layer = map.createLayer(0, tiles, 0, 0);
        }
        function update() {
        }

        // eslint-disable-next-line
        const game = new Phaser.Game(config);

    }


    render() {
        return (
            <div
                onClick={() => document.querySelector('.message-input').blur()}
                id="game"
            ></div>
        );
    }
}

