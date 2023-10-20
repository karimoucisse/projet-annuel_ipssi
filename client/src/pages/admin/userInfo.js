import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import AdminService from '../../_services/admin.service';

const UserInfo = () => {
    const { userId } = useParams();
    const flag = useRef(false);
    const [files, setFiles] = useState([]);

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
        if(AdminService.param !== param){
            console.log('fus');
            AdminService.param = param;
            AdminService.direction = -1;
        }
        else {
            console.log('roh');
            AdminService.direction = inverse(AdminService.direction);
        }
        AdminService.buildParams();
        fetchData();
    }

    return (
        <div className='UserInfo'>
            UserFiles
            <table>
                <thead>
                    <tr>
                        <th onClick={() => addParams('name')}>Name</th>
                        <th>Extension</th>
                        <th onClick={() => addParams('fileSize')}>Size</th>
                        <th onClick={() => addParams('createdAt')}>Created</th>
                        <th onClick={() => addParams('updatedAt')}>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        files.map(file => (
                            <tr key={file._id}>
                                <td>{file.name}</td>
                                <td>{file.fileExtension}</td>
                                <td>{file.fileSize.$numberDecimal}</td>
                                <td>{file.createdAt}</td>
                                <td>{file.updatedAt}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserInfo;