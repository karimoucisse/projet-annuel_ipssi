import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import AdminService from '../../_services/admin.service';

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