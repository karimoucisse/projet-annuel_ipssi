import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoMatch from '../../router/NoMatch';
import UserList from './userList';
import UserInfo from './userInfo';

const AdminRouter = () => {
    return (
        <Routes>
            <Route index element={<UserList />} />
            <Route path='details/:userId' element={<UserInfo />} />
            <Route path='*' element={<NoMatch />} />
        </Routes>
    );
};

export default AdminRouter;