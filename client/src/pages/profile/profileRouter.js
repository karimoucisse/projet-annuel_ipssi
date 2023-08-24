import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoMatch from '../../router/NoMatch';
import Profile from './profile';

const ProfileRouter = () => {
    return (
        <Routes>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />}/>
            <Route path="*" element={<NoMatch />}/>
        </Routes>
    );
};

export default ProfileRouter;