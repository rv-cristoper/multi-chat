import React from 'react'

import './scss/header.scss'

const Header = () => {
    return (
        <header className='header'>
            <div className='titMessage'>
                <i className="fas fa-comment-dots" />
                <p>Mensajería</p>
            </div>
            <div className='infUser'>
                <i className="far fa-user-circle" />
                <span>Anónimo</span>
            </div>
        </header>
    )
}

export default Header
