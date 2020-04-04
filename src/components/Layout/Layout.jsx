import React from 'react'
import './Layout.css'

const Layout = ({timer, children}) => {
    return (
        <div>
            <div className="header">
                <div className="title">
                    Header
                </div>
                <div className="timer">
                    {timer}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Layout;