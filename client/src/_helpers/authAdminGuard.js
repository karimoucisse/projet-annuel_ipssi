import { Navigate } from "react-router-dom";
import AdminService from "../_services/admin.service";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const AuthAdminGuard = ({ children }) => {
    const flag = useRef(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        await AdminService.getAuthorization()
            .then(res => {
                console.log(res);
                if(!res.data.res){
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            });
    }
    useEffect(() => {
        if (flag.current === false) {
            fetchData();
        }
        
        return () => flag.current = true;
    }, []);

    return children;
}



export default AuthAdminGuard;