import Axios from "./caller.service";

let login = (credentials) => {
    return Axios.post('/auth/login', credentials);
}

let signup = (userInfo) => {
    return Axios.post('/stripe/create-checkout-session', userInfo);
}

let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let logout = () => {
    localStorage.removeItem('token');
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

let getToken = () => {
    return localStorage.getItem('token');
}

export const accountService = {
    login, saveToken, logout, isLogged, getToken, signup
}