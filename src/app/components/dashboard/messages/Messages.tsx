import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react'

import { IGrupalChat, IMessage, IPrivateChat } from '../IDashboard'

import './scss/messages.scss'

interface IProps {
    chatSelect: any
}

const Messages = ({ chatSelect }: IProps): JSX.Element => {

    const user = JSON.parse(sessionStorage.getItem("user")!)

    const [messageList, setMessageList] = useState<IMessage[]>(chatSelect?.messages || [])

    const [msg, setmsg] = useState<string>('')

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (msg) {

            const chatGroups = JSON.parse(localStorage.getItem("chatGroups")!)
            const chatPrivate = JSON.parse(localStorage.getItem("chatGeneral")!)

            let newMessageList: IMessage[] = []
            let newChatGroups: IGrupalChat[] = []
            let newChatPrivate: IPrivateChat[] = []



            if (chatSelect.type === 'group') {
                chatGroups.map((chatGroup: IGrupalChat) => {
                    if (chatGroup.id === chatSelect?.id) {
                        newMessageList = chatGroup.messages
                    }
                    return newMessageList
                })
            }

            if (chatSelect.type === 'private') {
                chatPrivate.map((chatPrivate: IPrivateChat) => {
                    if (chatPrivate.id === chatSelect?.id) {
                        newMessageList = chatPrivate.messages
                    }
                    return newMessageList
                })
            }

            newMessageList.push({
                id: Math.random().toString(36).substr(2, 9),
                user: user.name,
                idUser: user.id,
                message: msg,
                noVisible: []
            })

            if (chatSelect.type === 'group') {
                chatGroups.map((chatGroup: IGrupalChat) => {
                    if (chatGroup.id === chatSelect?.id) {
                        newChatGroups.push({
                            ...chatGroup,
                            messages: newMessageList
                        })
                    } else {
                        newChatGroups.push(chatGroup)
                    }
                    return null
                })
                localStorage.setItem("chatGroups", JSON.stringify(newChatGroups));
            }

            if (chatSelect.type === 'private') {
                chatPrivate.map((chatPrivate: IPrivateChat) => {
                    if (chatPrivate.id === chatSelect?.id) {
                        newChatPrivate.push({
                            ...chatPrivate,
                            messages: newMessageList
                        })
                    } else {
                        newChatPrivate.push(chatPrivate)
                    }
                    return null
                })
                localStorage.setItem("chatGeneral", JSON.stringify(newChatPrivate));
            }

            setMessageList(newMessageList)
            setmsg('')
        }
    }

    const getNameUser = (): string => {
        let idUser: string = ''
        chatSelect.members.map((member: string) => {
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

        const getMessagesGroup = () => {
            const chatGroups = JSON.parse(localStorage.getItem("chatGroups")!)
            chatGroups.map((chatGroup: IGrupalChat) => {
                if (chatGroup.id === chatSelect?.id) {
                    setMessageList(chatGroup.messages)
                }
                return null
            })
        }

        const getMessagesPrivate = () => {
            const chatPrivate = JSON.parse(localStorage.getItem("chatGeneral")!)
            chatPrivate.map((chatPrivate: IPrivateChat) => {
                if (chatPrivate.id === chatSelect?.id) {
                    setMessageList(chatPrivate.messages)
                }
                return null
            })
        }

        if (chatSelect) {
            if (chatSelect.type === 'group') {
                getMessagesGroup()
            }
            if (chatSelect?.type === 'private') {
                getMessagesPrivate()
            }
        }

        window.addEventListener('storage', () => {
            if (chatSelect?.type === 'group') {
                getMessagesGroup()
            }
            if (chatSelect?.type === 'private') {
                getMessagesPrivate()
            }
        })

    }, [chatSelect])

    return (
        <>
            {
                chatSelect === undefined ?
                    <div>Seleciona un chat</div>
                    :
                    <div className='messagesMain'>
                        <div className='headerMessage'>
                            {
                                chatSelect.type === 'group' ? chatSelect.name : getNameUser()
                            }
                        </div>
                        <div className='containerMessage'>
                            {
                                messageList.map((message: IMessage, key: number) =>
                                    <div className={`messageItem ${message.idUser !== user.id ? 'other' : ''}`} key={key}>
                                        {
                                            message.idUser !== user.id &&
                                            <span>{message.user}</span>
                                        }
                                        <p>{message.message}</p>
                                    </div>
                                )
                            }
                        </div>
                        <form className='sendMessage' onSubmit={sendMessage}>
                            <input type="text" value={msg} onChange={(e: ChangeEvent<HTMLInputElement>) => setmsg(e.target.value)} />
                            <button type='submit'>
                                <i className="fas fa-paper-plane" />
                            </button>
                        </form>
                    </div >
            }
        </>
    )
}

export default Messages
