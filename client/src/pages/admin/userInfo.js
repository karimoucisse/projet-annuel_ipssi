import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import AdminService from '../../_services/admin.service';
import { Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import formatDate from '../../_helpers/formatDate';

const UserInfo = () => {
    const { userId } = useParams();
    const flag = useRef(false);
    const [files, setFiles] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        await AdminService.getUserFiles(userId)
            .then(res => {
                console.log(res.data);
                setFiles(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if(flag.current === false){
            fetchData()
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);

    const inverse = (value) => {
        return -value;
    }

    const addParams = (param) => {
        AdminService.extension = '';
        if(AdminService.param !== param){
            AdminService.param = param;
            AdminService.direction = -1;
        }
        else {
            AdminService.direction = inverse(AdminService.direction);
        }
        AdminService.buildParams();
        fetchData();
    }

    const addFilter = (e) => {
        console.log(e.target.value);
        AdminService.param = '';
        AdminService.extension = e.target.value;
        AdminService.buildParams();
        fetchData();
    }

    const handleSearch = async (e) => {
        setSearchText(e.target.value);
        AdminService.text = e.target.value;
        AdminService.buildParams();
        await AdminService.searchFiles(userId)
            .then(res => {
                console.log(res.data);
                setFiles(res.data);
            })
            .catch(err => console.log(err));
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'Extension', label: 'Extension', minWidth: 100 },
        { id: 'fileSize', label: 'Size', minWidth: 100 },
        { id: 'createdAt', label: 'Created', minWidth: 100 },
        { id: 'updatedAt', label: 'Updated', minWidth: 100 }
    ];

    return (
        <div className='UserInfo'>
            UserFiles
            <input
                type="text"
                placeholder="Rechercher des fichiers"
                value={searchText}
                onChange={handleSearch}
            />
            <select onChange={addFilter}>
                <option value="">--Please choose an option--</option>
                <option value="image/png">Image png</option>
                <option value="image/jpg">Image jpg</option>
                <option value="cat">Video</option>
                <option value="hamster">PDF</option>
            </select>


            <Paper sx={{ width: '100%' }}>
                <TableContainer>
                    <Table stickyHeader ario-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        onClick={() => addParams(column.id)}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                files.map((file) => {
                                    return (
                                        <TableRow hover key={file._id}>
                                            <TableCell>
                                                {file.name}
                                            </TableCell>
                                            <TableCell>
                                                {file.fileExtension}
                                            </TableCell>
                                            <TableCell>
                                                {file.fileSize.$numberDecimal}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(file.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(file.updatedAt)}
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

export default UserInfo;