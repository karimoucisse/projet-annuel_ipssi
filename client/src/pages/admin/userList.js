import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../_services/user.service';

const UserList = () => {
    let navigate = useNavigate();

    useEffect(() => {
        userService.getAllUsers()
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }, []);
}