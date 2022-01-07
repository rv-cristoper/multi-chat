import React, { useState } from 'react'
import Chats from '../components/dashboard/chats/Chats'
import Header from '../components/dashboard/header/Header'
import Messages from '../components/dashboard/messages/Messages'
import UserList from '../components/dashboard/users/UserList'

import './scss/dashboard.scss'

const Dashboard = (): JSX.Element => {

    const [optSelect, setOptSelect] = useState<string>('private-chat')
    const [chatSelect, setChatSelect] = useState<any>()

    const [addnewChat, setaddNewChat] = useState<string>('')

    const user = JSON.parse(sessionStorage.getItem("user")!)

    return (
        <>
            {
                user &&
                <div className='dashboard'>
                    <Header />
                    <div className='containerElements'>
                        <Chats optSelect={optSelect} setOptSelect={setOptSelect} chatSelect={chatSelect} setChatSelect={setChatSelect} addnewChat={addnewChat}/>
                        <Messages chatSelect={chatSelect} />
                        <UserList setaddNewChat={setaddNewChat} />
                    </div>
                </div>
            }
        </>

    )
}

export default Dashboard
