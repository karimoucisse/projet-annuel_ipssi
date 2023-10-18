import Axios from "./caller.service";

let login = (credentials) => {
    return Axios.post('/auth/login', credentials);
}

let signup = (userInfo) => {
    return Axios.post('/auth/signup', userInfo);
}

let payment = (data) => {
    return Axios.post('/stripe/create-checkout-session', data);
}

let addStorage = (data) => {
    return Axios.post('/auth/storage', data);
}

let getStorage = () => {
    return Axios.get('/auth/storage');
}

let updateUser = (userInfo) => {
    return Axios.patch('/auth/updateUser', userInfo);
}


let deleteUserId = () => {
    localStorage.removeItem('userId');
}

let saveUserId = (userId) => {
    localStorage.setItem('userId', userId);
}

let getUserId = () => {
    return localStorage.getItem('userId');
}

let isUserId = () => {
    let userId = localStorage.getItem('userId');
    return !!userId;
}

let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

let getToken = () => {
    return localStorage.getItem('token');
}

let getBasket = (userId) => {
    return Axios.get('/basket/' + userId);
}

export const accountService = {
    login,
    saveToken,
    logout,
    isLogged,
    getToken,
    signup,
    payment,
    saveUserId,
    getUserId,
    getBasket,
    deleteUserId,
    isUserId,
    addStorage,
    getStorage,
    updateUser,
}
