import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Main } from '../app/pages/Main';
import PrivateRouter from './PrivateRouter';

const PublicRouter = (): JSX.Element => {
    let navigate = useNavigate();

    useEffect(() => {
        const log: boolean = JSON.parse(sessionStorage.getItem("user")!)
        if (log) return navigate('/dashboard');
    }, [navigate])

    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path="/*" element={<PrivateRouter />} />
            <Route path='*' element={<Navigate to='' />} />
        </Routes>
    )
}

export default PublicRouter
