import React, { useEffect, useState } from 'react'
import { IPrivateChat } from '../IDashboard'

interface IProps {
    chatSelect: any
    setChatSelect: any
    addnewChat: string
}

const PrivateChats = ({ chatSelect, setChatSelect, addnewChat }: IProps): JSX.Element => {

    const [idSelect, setIdSelect] = useState<string>(chatSelect ? chatSelect.id : '')

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

    const getNameUser = (members: string[]): string => {
        let idUser: string = ''
        const user = JSON.parse(sessionStorage.getItem("user")!)
        members.map((member: string) => {
            if (member !== user.id) {
                idUser = member
            }
            return null
        })

        const userList = JSON.parse(localStorage.getItem("userList")!)

        let newName: string = ''
        userList.map((user: any) => {
            if (user.id === idUser) {
                newName = user.name
            }
            return null
        })

        return newName
    }

    useEffect(() => {

        let unmounted = false

        if (!unmounted) {
            getprivateChats()
        }

        window.addEventListener('storage', () => {
            getprivateChats()
        })

        return function () {
            unmounted = true;
        }

    }, [addnewChat])


    return (
        <div className='bodyChat'>
            {
                privateChatList.map((privateChat: IPrivateChat, key: number) =>
                    <div className={`chatItem ${privateChat.id === idSelect ? 'active' : ''}`} key={key} onClick={() => { setChatSelect(privateChat); setIdSelect(privateChat.id) }}>
                        <i className="far fa-user-circle" />
                        <p>{getNameUser(privateChat.members)}</p>
                    </div>
                )
            }
        </div>
    )
}

export default PrivateChats
