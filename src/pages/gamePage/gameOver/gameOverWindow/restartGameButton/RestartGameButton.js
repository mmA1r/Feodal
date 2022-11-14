import React from "react"


export default function LogoutButton(props){

    return(
        <div className='game-over-button'
             onClick={props.onClickHandler}
        >{props.title}</div>);
}