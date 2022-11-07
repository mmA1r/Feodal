import React from "react";
import Phaser from "phaser";

import store from "../../../store/store";

import WorldScene from "./scenes/WorldScene";

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
            fps: {
                target: 60,
                forceSetTimeOut: true
            },
            pixelArt: true,
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
        const game = new Phaser.Game(config);
    }


    render() {
        return(
            <div id="game"/>
        );
    }
}



