import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'

const AppRouter = (): JSX.Element => {

    return (
        <Router>
            <Routes>
                <Route path="*" element={<PublicRouter />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
