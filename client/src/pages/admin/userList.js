import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../_services/user.service';
import AdminService from '../../_services/admin.service';

const UserList = () => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [filesSizesByUser, setFilesSizesByUser] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if(flag.current === false){
            userService.getAllUsers()
                .then(res => {
                    console.log(res.data);
                    setUsers(res.data);
                })
                .catch(err => console.log(err));
            AdminService.getSubscriptions()
                .then(res => {
                    console.log(res.data);
                    setSubscriptions(res.data);
                })
                .catch(err => console.log(err));
            AdminService.getUserFilesSizes()
                .then(res => {
                    console.log(res.data);
                    setFilesSizesByUser(res.data);
                })
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);

    const displayDetail = (userId) => {
        navigate('/admin/details/'+userId);
    }

    const chooseSize = (userId) => {
        if(filesSizesByUser[userId].currentUsageInGB >= 1){
            return Math.round(filesSizesByUser[userId].currentUsageInGB * 100) / 100 + 'go';
        }
        if(filesSizesByUser[userId].currentUsageInMB >= 1){
            return Math.round(filesSizesByUser[userId].currentUsageInMB * 100) / 100 + 'mo';
        }
        if(filesSizesByUser[userId].currentUsageInKB >= 1){
            return Math.round(filesSizesByUser[userId].currentUsageInKB * 100) / 100 + 'ko';
        }
        else {
            return filesSizesByUser[userId].currentUsage + 'o';
        }
    }

    const displaySize = (userId) => {
        if(filesSizesByUser[userId] !== undefined && subscriptions[userId] !== undefined){
            return chooseSize(userId) + '/' + subscriptions[userId].storage * 20 + 'go';
        }
        else {
            if(filesSizesByUser[userId] !== undefined){
                return chooseSize(userId);
            }
            if(subscriptions[userId] !== undefined){
                return subscriptions[userId].storage * 20 + 'go';
            }
            else {
                return '';
            }
        }
    }

    const displayFreeStorage = (userId) => {
        if(subscriptions[userId] === undefined){
            return '';
        }
        if(subscriptions[userId] !== undefined && filesSizesByUser[userId] === undefined){
            return subscriptions[userId].storage * 20 + 'go';
        }
        else {
            let totalStorageInOctet = (1000000000 * 20 * subscriptions[userId].storage);
            let currentUsageInOctet = filesSizesByUser[userId].currentUsage;
            let result = totalStorageInOctet - currentUsageInOctet;
            console.log(result);
            return Math.round(result / 10000000) / 100 + 'go';
        }
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
                        <th>Disponible</th>
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
                                <td>{displaySize(user._id)}</td>
                                <td>{displayFreeStorage(user._id)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;