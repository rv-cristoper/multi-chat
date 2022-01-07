import React, { ChangeEvent, FormEvent, useState } from 'react'

import { IUser } from '../IDashboard'

import './scss/header.scss'

const Header = (): JSX.Element => {

    const user = JSON.parse(sessionStorage.getItem("user")!)

    const [name, setName] = useState<string>(user.name)
    const [edit, setEdit] = useState<boolean>(false)

    const changeName = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sessionStorage.setItem("user", JSON.stringify({
            ...user,
            name
        }));

        const userList = JSON.parse(localStorage.getItem("userList")!)
        let newUserList: IUser[] = []

        userList.map((userL: IUser) => {
            if (userL.id === user.id) {
                newUserList.push({
                    ...userL,
                    name
                })
            }
            else {
                newUserList.push(userL)
            }
            return null
        })

        localStorage.setItem("userList", JSON.stringify(newUserList));
        setEdit(false)
    }

    return (
        <header className='header'>
            <div className='titMessage'>
                <i className="fas fa-comment-dots" />
                <p>Mensajería</p>
            </div>
            {
                edit ?
                    <form className='infUser' onSubmit={changeName}>
                        <input type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                        <button type='submit'><i className="fas fa-save" /></button>
                    </form>
                    :
                    <div className='infUser' >
                        <span>{name}</span>
                        <i className="fas fa-user-edit" onClick={() => setEdit(true)} />
                    </div>
            }
        </header>
    )
}

export default Header
