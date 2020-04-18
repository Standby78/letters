import React from 'react';

const game = {
    score: 0,
    setScore: () => {},
    bonus: 1,
    setBonus: () => {},
}
const GameContext = React.createContext(game);

export default GameContext;
