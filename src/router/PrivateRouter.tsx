import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../app/pages/Dashboard';

const PrivateRouter = (): JSX.Element => {

    let navigate = useNavigate();

    useEffect(() => {
        const log: boolean = JSON.parse(sessionStorage.getItem("user")!)
        if (!log) return navigate('/');
    }, [navigate])

    return (
        <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='*' element={<Navigate to="dashboard" />} />
        </Routes>
    )
}

export default PrivateRouter
