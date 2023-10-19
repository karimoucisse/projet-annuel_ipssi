import Axios from "./caller.service";

let getUserFiles = (userId) => {
    return Axios.get('/admin/user/' + userId);
}

let getSubscriptions = () => {
    return Axios.get('/subscription');
}

let getUserFilesSizes = () => {
    return Axios.get('/subscription/current_size');
}

export const adminService = {
    getUserFiles,
    getSubscriptions,
    getUserFilesSizes
}