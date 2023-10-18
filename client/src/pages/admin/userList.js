import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../_services/user.service';
import { adminService } from '../../_services/admin.service';

const UserList = () => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if(flag.current === false){
            userService.getAllUsers()
                .then(res => {
                    console.log(res.data);
                    setUsers(res.data);
                })
                .catch(err => console.log(err));
            adminService.getSubscriptions()
                .then(res => {
                    console.log(res.data);
                    setSubscriptions(res.data);
                })
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);

    const displayDetail = (userId) => {
        navigate('/admin/details/'+userId);
    }
    // TODO: FAIRE TOGGLE BUTTON POUR ACTIVE, RENDRE POSSIBLE A L'ADMIN DE RENDRE ACTIF L'UTILISATEUR
    // TODO: FAIRE SOMME DES POIDS DES FICHIERS ET LES AFFICHER
    return (
        <div className='User'>
            User List
            <table>
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Created</th>
                        <th>Active</th>
                        <th>Stockage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstname}</td>
                                <td onClick={() => displayDetail(user._id) }>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.phone}</td>
                                <td>{user.createdAt}</td>
                                <td>{(user.active) ? "True" : "False"}</td>
                                <td>{(subscriptions[user._id] != undefined) ? subscriptions[user._id].storage * 20 + 'go' : ''}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;