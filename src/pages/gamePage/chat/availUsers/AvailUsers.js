import React from "react";

import './availUsers.scss';

export default function AvailUsers(props) {
    const { users, placeUser } = props;

    return(
        <ul className="avail-users-box">
            {users?.map(user => {
                return (
                    <li 
                        onClick={() => placeUser(user.name, user.id)}
                        className="user-name"
                        key={user.id}
                    >{`${user.name}#${user.id}`}</li>
                );
            })}
        </ul>
    );
}