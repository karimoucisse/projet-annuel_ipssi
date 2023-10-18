import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { adminService } from '../../_services/admin.service';

const UserInfo = () => {
    const { userId } = useParams();
    const flag = useRef(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if(flag.current === false){
            adminService.getUserFiles(userId)
                .then(res => {
                    console.log(res.data);
                    setFiles(res.data);
                })
                .catch(err => console.log(err));
        }

        return () => flag.current = true;
    }, []);
    return (
        <div className='UserInfo'>
            UserFiles
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Extension</th>
                        <th>Size</th>
                        <th>Created</th>
                        <th>Updated</th>
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