import React, { useEffect, useState } from 'react'
import { IGrupalChat } from '../IDashboard'

interface IProps {
    setChatSelect: any
}

const GrupalChats = ({ setChatSelect }: IProps): JSX.Element => {

    const [grupalChatList, setGrupalChatList] = useState<IGrupalChat[]>([])

    const getGrupalChats = () => {

        const grupalChats = JSON.parse(localStorage.getItem("chatGroups")!)
        setGrupalChatList(grupalChats)

    }

    const addGrupalChat = () => {
        const grupalChats = JSON.parse(localStorage.getItem("chatGroups")!)
        const newGroup: IGrupalChat = {
            id: '3s7clut',
            name: 'Arte',
            type: 'group',
            messages: []
        }
        grupalChats.push(newGroup)
        localStorage.setItem("chatGroups", JSON.stringify(grupalChats));
        setGrupalChatList(grupalChats)
    }

    useEffect(() => {

        getGrupalChats()
        window.addEventListener('storage', () => {
            setGrupalChatList(JSON.parse(localStorage.getItem("chatGroups")!) || [])
        })

    }, [])

    return (
        <div className='bodyChat'>
            <button onClick={addGrupalChat}>Agregar</button>
            {
                grupalChatList.map((grupalChat: IGrupalChat, key: number) =>
                    <div className='chatItem active' key={key} onClick={() => setChatSelect(grupalChat)}>
                        <i className="far fa-user-circle" />
                        <p>{grupalChat.name}</p>
                    </div>
                )
            }
        </div>
    )
}

export default GrupalChats
