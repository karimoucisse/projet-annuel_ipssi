import Axios from "./caller.service";

let login = (credentials) => {
    return Axios.post('/auth/login', credentials, {withCredentials: true});
}

let signup = (userInfo) => {
    return Axios.post('/auth/signup', userInfo, {withCredentials: true});
}

let payment = (data) => {
    return Axios.post('/stripe/create-checkout-session', data, {withCredentials: true});
}

let otherPayment = (data) => {
    return Axios.post('/stripe/create-payment-intent', data, {withCredentials: true});
}

let saveUserId = (userId) => {
    localStorage.setItem('userId', userId, {withCredentials: true});
}

let getUserId = () => {
    return localStorage.getItem('userId');
}

let saveToken = (token) => {
    localStorage.setItem('token', token, {withCredentials: true});
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
    login, saveToken, logout, isLogged, getToken, signup, payment, saveUserId, getUserId, otherPayment
}