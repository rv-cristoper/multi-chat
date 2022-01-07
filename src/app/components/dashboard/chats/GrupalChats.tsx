import React, { ChangeEvent, useEffect, useState } from 'react'
import { IGrupalChat } from '../IDashboard'

interface IProps {
    chatSelect: any
    setChatSelect: any
}

const GrupalChats = ({ setChatSelect, chatSelect }: IProps): JSX.Element => {

    const [grupalChatList, setGrupalChatList] = useState<IGrupalChat[]>([])
    const [nameNewGroup, setNameNewGroup] = useState<string>('')

    const [idSelect, setIdSelect] = useState<string>(chatSelect ? chatSelect.id : '')

    // Función para obtener los chats grupales
    const getGrupalChats = () => {

        const grupalChats = JSON.parse(localStorage.getItem("chatGroups")!)
        setGrupalChatList(grupalChats)

    }

    //Función para añadir un nuevo chat al grupo
    const addGrupalChat = () => {
        const grupalChats = JSON.parse(localStorage.getItem("chatGroups")!)
        if (nameNewGroup) {
            const newGroup: IGrupalChat = {
                id: Math.random().toString(36).substr(2, 9),
                name: nameNewGroup,
                type: 'group',
                messages: []
            }
            grupalChats.push(newGroup)
            localStorage.setItem("chatGroups", JSON.stringify(grupalChats));
            setGrupalChatList(grupalChats)
            setNameNewGroup('')
        }

    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            addGrupalChat()
        }
    }

    useEffect(() => {

        getGrupalChats()
        window.addEventListener('storage', () => {
            setGrupalChatList(JSON.parse(localStorage.getItem("chatGroups")!) || [])
        })

    }, [])

    return (
        <div className='bodyChatGroup'>
            <div className='contentCreate'>
                <input type="text" value={nameNewGroup} placeholder='Ingrese nombre de grupo a crear' onKeyDown={handleKeyDown} onChange={(e: ChangeEvent<HTMLInputElement>) => setNameNewGroup(e.target.value)} />
                <button onClick={addGrupalChat}>Agregar</button>
            </div>
            <div className='bodyChat'>

                {
                    grupalChatList.map((grupalChat: IGrupalChat, key: number) =>
                        <div className={`chatItem ${grupalChat.id === idSelect ? 'active' : ''}`} key={key} onClick={() => { setChatSelect(grupalChat); setIdSelect(grupalChat.id) }}>
                            <i className="far fa-user-circle" />
                            <p>{grupalChat.name}</p>
                        </div>
                    )
                }
            </div>
        </div >

    )
}

export default GrupalChats
