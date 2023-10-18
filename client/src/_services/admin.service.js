import Axios from "./caller.service";

let getUserFiles = (userId) => {
    return Axios.get('/admin/user/' + userId);
}

let getSubscriptions = () => {
    return Axios.get('/subscription');
}

export const adminService = {
    getUserFiles,
    getSubscriptions
}