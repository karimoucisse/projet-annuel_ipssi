import Axios from './caller.service';

let getAllUsers = () => {
    return Axios.get('/auth/users');
}

let getUser = (userId) => {
    return Axios.get('/auth/users/' + userId);
}

let getUserInfoById = (userId) => {
    return Axios.get('/auth/userinfo/' + userId);
}

let deleteUser = () => {
    return Axios.delete('/auth/');
}

let updateUser = (userInfo) => {
    return Axios.patch('/auth/updateUser', userInfo);
}

export const userService = {
    getAllUsers, getUser, getUserInfoById, deleteUser, updateUser
}