import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Main = (): JSX.Element => {

    let navigate = useNavigate();

    const next = () => {
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            name: "anónimo",
            status: true
        }
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate('/dashboard');
    }

    return (
        <div>
            <button onClick={next}>Comenzar</button>
        </div>
    )
}
