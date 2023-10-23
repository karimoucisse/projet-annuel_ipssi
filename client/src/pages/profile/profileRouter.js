import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoMatch from '../../router/NoMatch';
import Profile from './profile';
import ListInvoices from './listInvoices';

const ProfileRouter = () => {
    return (
        <Routes>
            <Route index element={<Profile />} />
            <Route path="invoices" element={<ListInvoices />} />
            <Route path="*" element={<NoMatch />}/>
        </Routes>
    );
};

export default ProfileRouter;