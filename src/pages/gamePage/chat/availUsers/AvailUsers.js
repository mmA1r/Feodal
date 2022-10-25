import React from "react";

import './availUsers.scss';

export default class AvailUsers extends React.Component {
    constructor(props) {
        super(props);
        const { users, placeUser } = props;
        this.users = users;
        this.placeUser = placeUser;
    }

    render() {
        return(
            <ul className="avail-users-box">
                {this.users.map(user => {
                    return (
                        <li 
                            onClick={() => this.placeUser(user)}
                            className="user-name"
                            key={user}
                        >{`${user}`}</li>
                    );
                })}
            </ul>
        );
    }
}