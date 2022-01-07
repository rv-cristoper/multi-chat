import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react'

import { IGrupalChat, IMessage } from '../IDashboard'

import './scss/messages.scss'

interface IProps {
    chatSelect: IGrupalChat | undefined 
}

const Messages = ({ chatSelect }: IProps): JSX.Element => {

    const user = JSON.parse(sessionStorage.getItem("user")!)

    const [messageList, setMessageList] = useState<IMessage[]>(chatSelect?.messages || [])

    const [msg, setmsg] = useState<string>('')

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (msg) {

            const chatGroups = JSON.parse(localStorage.getItem("chatGroups")!)

            let newMessageList: IMessage[] = []
            let newChatGroups: IGrupalChat[] = []

            chatGroups.map((chatGroup: IGrupalChat) => {
                if (chatGroup.id === chatSelect?.id) {
                    newMessageList = chatGroup.messages
                }
                return newMessageList
            })

            newMessageList.push({
                id: Math.random().toString(36).substr(2, 9),
                user: user.name,
                idUser: user.id,
                message: msg,
                noVisible: []
            })

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

            setMessageList(newMessageList)
            setmsg('')
        }
    }


    useEffect(() => {

        const getMessages = () => {
            const chatGroups = JSON.parse(localStorage.getItem("chatGroups")!)
            chatGroups.map((chatGroup: IGrupalChat) => {
                if (chatGroup.id === chatSelect?.id) {
                    setMessageList(chatGroup.messages)
                }
                return null
            })
        }

        if (chatSelect) {
            getMessages()
        }

        window.addEventListener('storage', () => {
            getMessages()
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
                            {chatSelect.name}
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
