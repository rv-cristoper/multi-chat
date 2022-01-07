import React, { useEffect, useState } from 'react'
import { IPrivateChat } from '../IDashboard'

interface IProps {
    setChatSelect: any
}

const PrivateChats = ({ setChatSelect }: IProps): JSX.Element => {



    const [privateChatList, setPrivateChatList] = useState<IPrivateChat[]>([])

    const getprivateChats = () => {

        const user = JSON.parse(sessionStorage.getItem("user")!)

        let myChats: IPrivateChat[] = []

        const privateChats = JSON.parse(localStorage.getItem("chatGeneral")!)

        privateChats.map((chat: IPrivateChat) => {
            if (chat.members.toString().includes(user.id)) {
                myChats.push(chat)
            }
            return null
        })

        setPrivateChatList(myChats)

    }

    useEffect(() => {

        getprivateChats()
        window.addEventListener('storage', () => {
            getprivateChats()
        })

    }, [])


    return (
        <div className='bodyChat'>
            {
                privateChatList.map((privateChat: IPrivateChat, key: number) =>
                    <div className='chatItem active' key={key} onClick={() => setChatSelect(privateChat)}>
                        <i className="far fa-user-circle" />
                        <p>{privateChat.id}</p>
                    </div>
                )
            }
        </div>
    )
}

export default PrivateChats
