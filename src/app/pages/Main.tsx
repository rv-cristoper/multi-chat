import React from 'react'
import { useNavigate } from 'react-router-dom';
import './scss/main.scss'

import { IGrupalChat } from '../components/dashboard/IDashboard'

export const Main = (): JSX.Element => {

    let navigate = useNavigate();

    const chatStorageExist = () => {
        const chatGroupInitial: IGrupalChat[] = [
            {
                id: 'kshtckuy',
                name: 'Gastronomía',
                type: 'group',
                messages: []
            },
            {
                id: 'spi2suta',
                name: 'Deportes',
                type: 'group',
                messages: []
            }
        ]

        const chatGroups = JSON.parse(localStorage.getItem("chatGroups")!)
        const chatGeneral = JSON.parse(localStorage.getItem("chatGeneral")!)

        if (!chatGroups) {
            localStorage.setItem("chatGroups", JSON.stringify(chatGroupInitial));
        }
        if (!chatGeneral) {
            localStorage.setItem("chatGeneral", JSON.stringify([]));
        }
    }

    const next = () => {
        chatStorageExist()
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            name: "anónimo",
            status: true
        }
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate('/dashboard');
    }

    return (
        <div className='main'>
            <div className='contentInfo'>
                <h1>MultiChat App</h1>
                <p>Chatea localmente de una manera rápida y divertida.</p>
                <button onClick={next}>Comenzar</button>
            </div>
        </div>
    )
}
