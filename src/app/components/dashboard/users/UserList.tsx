import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import UserItem from './UserItem'

import './scss/userList.scss'

interface IUser {
    id: string
    name: string
    status: boolean
}

interface IProps {
    setaddNewChat: React.Dispatch<React.SetStateAction<string>>
}

const UserList = ({ setaddNewChat }: IProps): JSX.Element => {

    const [search, setSearch] = useState<string>('');

    const [memberList, setMemberList] = useState<IUser[]>([])

    const users = useMemo(() => {
        const getUser = JSON.parse(sessionStorage.getItem("user")!)
        if (!search) return memberList.filter((user: any) => {
            return user.id !== getUser.id;
        })
        return memberList.filter((user: any) => {
            return user.name.toLowerCase().includes(search.toLowerCase()) && user.id !== getUser.id;
        });
    }, [search, memberList])

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
            <div className='spaceToSearch'>
                <input type="text" value={search} placeholder='Buscar usuario...' onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
            </div>
            <div className='containerUsers'>
                {/* {
                    users.map((user: IUser, key: number) =>
                        <UserItem id={user.id} name={user.name} status={user.status} key={key} setaddNewChat={setaddNewChat} />
                    )
                } */}
                {
                    (!users.length && !search) ? <div>Ningún usuario conectado.</div>
                        : (!users.length && search) ? <div>Sin resultados para su búsqueda.</div>
                            :
                            users.map((user: IUser, key: number) =>
                                <UserItem id={user.id} name={user.name} status={user.status} key={key} setaddNewChat={setaddNewChat} />
                            )
                }
            </div>
        </div >
    )
}

export default UserList
