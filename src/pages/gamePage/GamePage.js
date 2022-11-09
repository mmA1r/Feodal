import React from "react";

import Logout from './logout/Logout';
import Chat from "./chat/Chat";
import MiniMapFrame from "./miniMapFrame/MiniMapFrame";
import CastleButton from "./castleButton/CastleButton";
import CastleUI from "./castleUI/CastleUI";
import GamerMoney from "./gamerMoney/GamerMoney";

import Game from './game/Game';

import './gamePage.scss';

export default class GamePage extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = props;
        this.navigate = navigate;

        this.state = {
            castleInterface: false,
        }
    }

    componentDidMount() {
        this.setState({ castleInterface: true });
    }

    componentWillUnmount() {
    }

    render() {
        return(
            <div className="game">
                <div className="mini-map-window">
                    <button
                        className="castle-manage-button"
                        onClick={() => {this.setState({ castleInterface: !this.state.castleInterface })}} 
                    >
                        <CastleButton></CastleButton>
                    </button>
                    <MiniMapFrame></MiniMapFrame>
                </div>
                <div className={`castle-interface ${this.state.castleInterface ? 'show-castle-UI' : 'hide-castle-UI'}`}>
                    <CastleUI/>
                </div>
                <Logout navigate={this.navigate}></Logout>
                <GamerMoney/>
                <Chat/>
                <Game/>
            </div>
        );
    }
}