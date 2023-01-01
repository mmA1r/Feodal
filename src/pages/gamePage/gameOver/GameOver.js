import { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StoreLoader from '../../../store/StoreLoader';

import './gameOver.scss';

export default function GameOver() {
    const [endOfPage, setEndOfPage] = useState(false);
    const store = useStore();
    const routes = store.getState().routes.value;
    const server = store.getState().server.value;
    const isGameOver = useSelector((state) => state.gameOver.gameIsOver);
    const storeLoader = new StoreLoader();
    const navigate = useNavigate();

    async function logoutUser() {
        return await server.logout();
    }
    
    function returnToMenu() {
        setEndOfPage(true);
        const timeout = setTimeout(() => {
            if(logoutUser()) {
                navigate(routes.Login.path);
            }
            return () => {
                setEndOfPage(false);
                clearTimeout(timeout);
            }
        }, 1500)
    }

    function returnToTheFight() {
        return
    }

    return(
        <div>
            <button onClick={() => storeLoader.loadToStore(!isGameOver, 'gameOver')}>agfkjapogjsapogksa[g[</button>
            <div className={`game-over-window ${isGameOver ? 'show-game-over' : 'hide-game-over'}`}>
                <div className={`game-over-box ${endOfPage ? 'box-disappear' : ''}`}>
                    <button 
                        className='return-to-the-fight'
                        onClick={() => returnToTheFight()}
                    >

                    </button>
                    <button 
                        className='return-to-menu' 
                        onClick={() => returnToMenu()}
                    >
                        menu
                    </button>
                </div>
            </div>
        </div>
    );
}