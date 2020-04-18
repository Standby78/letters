import React from 'react'
import GameContext from '../../context/game.context';
import './Layout.css'

const Layout = ({timer, children}) => {
    return (
        <GameContext.Consumer>
            {({score}) => (
                <div>
                    <div className="header">
                        <div className="title">
                            Header Score: {score} 
                        </div>
                        <div className="timer">
                            {timer}
                        </div>
                    </div>
                    {children}
                </div>
            )} 
        </GameContext.Consumer>
    )
}

export default Layout;