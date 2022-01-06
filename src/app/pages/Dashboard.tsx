import React from 'react'
import Header from '../components/dashboard/header/Header'
import UserList from '../components/dashboard/users/UserList'
import './scss/dashboard.scss'

const Dashboard = (): JSX.Element => {
    return (
        <div className='dashboard'>
            <Header />
            <div className='containerElements'>
                <div>chats</div>
                <div>mensajes</div>
                <UserList />
            </div>
        </div>
    )
}

export default Dashboard
