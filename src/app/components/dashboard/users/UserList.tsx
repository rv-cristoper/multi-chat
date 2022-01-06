import React, { useEffect, useState } from 'react'
import UserItem from './UserItem'

import './scss/userList.scss'

interface IUser {
    id: string
    name: string
    status: boolean
}

const UserList = (): JSX.Element => {

    const [memberList, setMemberList] = useState<IUser[]>([])

    const userExist = () => {

        const userList = JSON.parse(localStorage.getItem("userList")!)
        const user = JSON.parse(sessionStorage.getItem("user")!)

        if (userList) {
            let exists: boolean = false
            userList.map((member: IUser) => {
                if (member.id === user.id) {
                    exists = true
                }
                return exists
            })

            if (!exists) {
                userList.push(user)
            }
        }

        localStorage.setItem("userList", JSON.stringify(userList ? userList : [user]));
        setMemberList(userList ? userList : [user])
    }

    useEffect(() => {

        userExist()
        window.addEventListener('storage', () => {
            setMemberList(JSON.parse(localStorage.getItem("userList")!) || [])
        })

    }, [])

    return (
        <div className='userList'>
            <div className='titleList'>
                Usuarios
            </div>
            <div className='containerUsers'>
                {
                    memberList.map((user: IUser, key: number) =>
                        <UserItem id={user.id} name={user.name} status={user.status} key={key} />
                    )
                }
            </div>
        </div >
    )
}

export default UserList
