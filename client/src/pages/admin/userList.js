import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../_services/user.service';

const UserList = () => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if(flag.current === false){
            userService.getAllUsers()
                .then(res => {
                    console.log(res.data);
                    setUsers(res.data);
                })
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);

    return (
        <div className='User'>
            User List
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.createdAt}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;