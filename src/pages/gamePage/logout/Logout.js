import React from "react";

import ConfirmWindow from "./confirmWindow/ConfirmWindow";
import LogoutIcon from "./logoutIcon/LogoutIcon";

import './logout.scss'

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        const { navigate } = props;
        this.navigate = navigate;

        this.state = {
            confirmWindow: false
        }
    }

    //--------------Создает окошко подтверждения логаута
    openConfirmWindow(state) {
        this.setState({ confirmWindow: state });
    }

    render() {
        return(
            <div className="logout-box">
                <button 
                    className="logout-button"
                    onClick={()=>this.openConfirmWindow(true)}
                >
                    <LogoutIcon/>
                </button>
                { 
                    this.state.confirmWindow ? 
                        <ConfirmWindow 
                            navigate={ this.navigate } 
                            openConfirmWindow={()=>this.openConfirmWindow()}
                        ></ConfirmWindow> 
                    : '' 
                }
            </div>
        );
    }
}