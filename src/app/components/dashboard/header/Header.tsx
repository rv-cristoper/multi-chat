import React, { ChangeEvent, FormEvent, useState } from 'react'

import { IUser } from '../IDashboard'

import './scss/header.scss'

const Header = (): JSX.Element => {

    const user = JSON.parse(sessionStorage.getItem("user")!)

    const [name, setName] = useState<string>(user.name)
    const [edit, setEdit] = useState<boolean>(false)

    // Función para cambiar el nombre tanto en el sessionStorage y la lista de usuarios del localStorage
    const changeName = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name) {
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
                        <input type="text" value={name} placeholder='Ingrese su nombre' onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                        <button type='submit'><i className="fas fa-save save" /></button>
                    </form>
                    :
                    <div className='infUser' >
                        <span>{name}</span>
                        <i className="fas fa-user-edit edit" onClick={() => setEdit(true)} />
                    </div>
            }
        </header>
    )
}

export default Header
