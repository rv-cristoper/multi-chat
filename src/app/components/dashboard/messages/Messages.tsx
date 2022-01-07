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
                    if (chatGroup.id === chatSelect?.id) { newMessageList = chatGroup.messages }
                    return newMessageList
                })
            }

            if (chatSelect.type === 'private') {
                chatPrivate.map((chatPrivate: IPrivateChat) => {
                    if (chatPrivate.id === chatSelect?.id) { newMessageList = chatPrivate.messages }
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
                        newChatGroups.push({ ...chatGroup, messages: newMessageList })
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
                        newChatPrivate.push({ ...chatPrivate, messages: newMessageList })
                    } else { newChatPrivate.push(chatPrivate) }
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

    const deleteMsg = (id: string) => {

        const chatGroups = JSON.parse(localStorage.getItem("chatGroups")!)
        const chatPrivate = JSON.parse(localStorage.getItem("chatGeneral")!)

        let newGrupalChat: IGrupalChat[] = []
        let newPrivateChat: IPrivateChat[] = []
        let newMessageList: IMessage[] = []

        if (chatSelect.type === 'group') {
            chatGroups.map((chatGroup: IGrupalChat) => {
                if (chatGroup.id === chatSelect.id) {
                    chatGroup.messages.map((message: IMessage) => {
                        if (message.id === id) {
                            let newNoVisible: string[] = message.noVisible
                            newNoVisible.push(user.id)
                            newMessageList.push({ ...message, noVisible: newNoVisible })
                        }
                        else { newMessageList.push(message) }
                        return newMessageList
                    })
                    newGrupalChat.push({ ...chatGroup, messages: newMessageList })
                }
                else { newGrupalChat.push(chatGroup) }
                return newGrupalChat
            })
            localStorage.setItem("chatGroups", JSON.stringify(newGrupalChat))
        }

        if (chatSelect.type === 'private') {
            chatPrivate.map((chatPrivate: IPrivateChat) => {
                if (chatPrivate.id === chatSelect.id) {
                    chatPrivate.messages.map((message: IMessage) => {
                        if (message.id === id) {
                            let newNoVisible: string[] = message.noVisible
                            newNoVisible.push(user.id)
                            newMessageList.push({ ...message, noVisible: newNoVisible })
                        }
                        else { newMessageList.push(message) }
                        return newMessageList
                    })
                    newPrivateChat.push({ ...chatPrivate, messages: newMessageList })
                }
                else { newPrivateChat.push(chatPrivate) }
                return newPrivateChat
            })
            localStorage.setItem("chatGeneral", JSON.stringify(newPrivateChat))
        }

        setMessageList(newMessageList)
    }

    useEffect(() => {

        const getMessagesGroup = () => {
            const chatGroups = JSON.parse(localStorage.getItem("chatGroups")!)
            chatGroups.map((chatGroup: IGrupalChat) => {
                if (chatGroup.id === chatSelect?.id) { setMessageList(chatGroup.messages) }
                return null
            })
        }

        const getMessagesPrivate = () => {
            const chatPrivate = JSON.parse(localStorage.getItem("chatGeneral")!)
            chatPrivate.map((chatPrivate: IPrivateChat) => {
                if (chatPrivate.id === chatSelect?.id) { setMessageList(chatPrivate.messages) }
                return null
            })
        }

        if (chatSelect) {
            if (chatSelect.type === 'group') { getMessagesGroup() }
            if (chatSelect?.type === 'private') { getMessagesPrivate() }
        }

        window.addEventListener('storage', () => {
            if (chatSelect?.type === 'group') { getMessagesGroup() }
            if (chatSelect?.type === 'private') { getMessagesPrivate() }
        })

    }, [chatSelect])

    return (
        <>
            {
                chatSelect === undefined ?
                    <div className='msgSelectChat'>Selecione un chat para poder iniciar una conversación.</div>
                    :
                    <div className='messagesMain'>
                        <div className='headerMessage'>
                            {chatSelect.type === 'group' ? chatSelect.name : getNameUser()}
                        </div>
                        <div className='containerMessage'>
                            {
                                messageList.map((message: IMessage, key: number) => {
                                    if (!message.noVisible.toString().includes(user.id)) {
                                        return <div className={`messageItem ${message.idUser !== user.id ? 'other' : ''}`} key={key}>
                                            {
                                                chatSelect.type === 'group' && message.idUser !== user.id &&
                                                <span>{message.user}</span>
                                            }
                                            <p>{message.message}</p>
                                            <i className="fas fa-trash-alt" onClick={() => deleteMsg(message.id)} />
                                        </div>
                                    }
                                    return null
                                })
                            }
                        </div>
                        <form className='sendMessage' onSubmit={sendMessage}>
                            <input type="text" value={msg} placeholder='Escribe un mensaje...' onChange={(e: ChangeEvent<HTMLInputElement>) => setmsg(e.target.value)} />
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
