import React, {useEffect, useState } from 'react';
import Letters from './components/Letters/Letters';
import Layout from './components/Layout/Layout';
import Maps from './components/Maps/Maps';
import './App.css';

const game = [<Maps maps={true} capital={true} />, <Letters />, <Maps flag={true} />, <Maps maps={true} />, <Maps maps={true} mapsFlags={true} />];
const gameTimer = 30;
const App = () => {
    const [timer, setTimer] = useState(gameTimer);
    const [activeGame, setActiveGame] = useState(0);

    const play = true;

    useEffect(() => {
        let time = timer - 1;
        if (time === -1) {
            time = gameTimer;
            let active = activeGame + 1;
            (active === game.length) ? setActiveGame(0) : setActiveGame(active);
        }
        setTimeout(() => {
            setTimer(time)
        }, 1000);
    }, [timer]) // eslint-disable-line
    return (
        <div className="app">
            <Layout timer={timer}>
                {game[activeGame]}
            </Layout>
        </div>
    );
}

export default App;
