import Axios from './caller.service';

let getAllUsers = () => {
    return Axios.get('/auth/users');
}

let getUser = (userId) => {
    return Axios.get('/auth/users/'+userId);
}

export const userService = {
    getAllUsers, getUser
}