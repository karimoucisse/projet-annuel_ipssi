import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Authentication from './authentication';
import NoMatch from '../../router/NoMatch';

const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<Authentication />} />
            <Route path="login" element={<Authentication />}/>
            <Route path="*" element={<NoMatch />}/>
        </Routes>
    );
};

export default AuthRouter;