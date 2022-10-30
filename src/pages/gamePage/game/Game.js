import React from "react";
import Phaser from "phaser";

import store from "../../../store/store";
import tileMapSheet from '../../../assets/sprite.png';
import tileMap from "./tileMap/tileMap";

import WorldScene from "./scenes/WorldScene";

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
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: [
                WorldScene,
            ]
        };

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

