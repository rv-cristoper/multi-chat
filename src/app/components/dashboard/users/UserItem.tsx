import React from 'react'

import './scss/userItem.scss'

import { IPrivateChat } from '../IDashboard'

interface IProps {
    id: string
    name: string
    status: boolean
    setaddNewChat: React.Dispatch<React.SetStateAction<string>>
}

const UserItem = ({ id, name, status, setaddNewChat }: IProps): JSX.Element => {

    const createNewChat = () => {

        const user = JSON.parse(sessionStorage.getItem("user")!)
        const privateChats = JSON.parse(localStorage.getItem("chatGeneral")!)

        let existChat: boolean = false
        privateChats.map((privateChat: IPrivateChat) => {
            if (privateChat.members.toString().includes(id) && privateChat.members.toString().includes(user.id)) {
                existChat = true
            }
            return null
        })

        if (!existChat) {
            const newID = Math.random().toString(36).substr(2, 9);
            const chat: IPrivateChat = {
                id: newID,
                type: 'private',
                messages: [],
                members: [id, user.id]
            }
            privateChats.push(chat)
            localStorage.setItem("chatGeneral", JSON.stringify(privateChats));
            setaddNewChat(newID)
        }
    }

    return (
        <div className='userItem'>
            <i className="fas fa-circle circle active" />
            <p>{name}</p>
            <div className='opnChat' onClick={createNewChat}>
                <i className="fas fa-comment-alt" />
            </div>
        </div>
    )
}

export default UserItem
