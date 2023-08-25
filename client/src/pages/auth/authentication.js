import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../styles/css/auth/auth.css';
import { accountService } from '../../_services/account.service';

const Authentication = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(credentials);
        accountService.login(credentials)
            .then(res => {
                console.log(res);
                if(res.data.isActive){
                    accountService.saveToken(res.data.token);
                    accountService.saveUserId(res.data.userId);
                } if(!res.data.isActive){
                    accountService.saveUserId(res.data.userId);
                    navigate('/auth/signup');
                } else {
                    navigate('/');
                }
                
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={credentials.email} onChange={onChange} />
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="text" name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <div className="group">
                <button>Connexion</button>    
            </div>
        </form>
    );
};

export default Authentication;