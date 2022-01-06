import React from 'react'

import './scss/userItem.scss'

interface IProps {
    id: string
    name: string
    status: boolean
}

const UserItem = ({ id, name, status }: IProps): JSX.Element => {
    return (
        <div className='userItem'>
            <i className="fas fa-circle circle" />
            <p>{name}</p>
            <div className='opnChat'>
                <i className="fas fa-comment-alt" />
            </div>
        </div>
    )
}

export default UserItem
