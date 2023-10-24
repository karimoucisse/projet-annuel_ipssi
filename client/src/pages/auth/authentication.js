<<<<<<< HEAD
import React from 'react';
import './../../styles/css/auth/auth.css';
import Login from '../../components/auth/Login';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../../_services/account.service';
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179

const Authentication = () => {
    return (
        <Login />
    );
};

export default Authentication;