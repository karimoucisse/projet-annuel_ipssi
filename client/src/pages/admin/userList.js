import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../_services/user.service';
import AdminService from '../../_services/admin.service';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

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

    const columns = [
        { id: 'Firstname', label: 'Firstname', minWidth: 100 },
        { id: 'Lastname', label: 'Lastname', minWidth: 100 },
        { id: 'Email', label: 'Email', minWidth: 100 },
        { id: 'Role', label: 'Role', minWidth: 100 },
        { id: 'Phone', label: 'Phone', minWidth: 100 },
        { id: 'Created', label: 'Created', minWidth: 100 },
        { id: 'Active', label: 'Active', minWidth: 100 },
        { id: 'Stockage', label: 'Stockage', minWidth: 100, align: 'right'},
        { id: 'Disponible', label: 'Disponible', minWidth: 100, align: 'right'}
      ];
    return (
        <div className='User'>
            <Paper sx={{ width: '100%'}}>
                <TableContainer>
                    <Table stickyHeader ario-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((user) => {
                                    return (
                                        <TableRow hover key={user._id} onClick={() => displayDetail(user._id) }>
                                            <TableCell>
                                                {user.firstname}
                                            </TableCell>
                                            <TableCell>
                                                {user.lastname}
                                            </TableCell>
                                            <TableCell>
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                {user.role}
                                            </TableCell>
                                            <TableCell>
                                                {user.phone}
                                            </TableCell>
                                            <TableCell>
                                                {user.createdAt}
                                            </TableCell>
                                            <TableCell>
                                                {(user.active) ? "True" : "False"}
                                            </TableCell>
                                            <TableCell>
                                                {displaySize(user._id)}
                                            </TableCell>
                                            <TableCell>
                                                {displayFreeStorage(user._id)}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>



        </div>
    );
}

export default UserList;