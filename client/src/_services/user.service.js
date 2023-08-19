import Axios from './caller.service';

let getAllUsers = () => {
    return Axios.get('/auth/users');
}

let getUser = (userId) => {
    return Axios.get('/auth/users/'+userId);
}

let getUserInfoById = (userId) => {
    return Axios.get('/auth/userinfo/'+userId);
}

export const userService = {
    getAllUsers, getUser, getUserInfoById
}