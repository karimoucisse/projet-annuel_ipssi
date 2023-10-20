import Axios from "./caller.service";

class AdminService {
    static params = {};
    static param = '';
    static direction = -1;

    static buildParams = () => {
        this.params.params = {}
        this.params.params.param = this.param;
        this.params.params.direction = this.direction;
    }

    static getUserFiles = (userId) => {
        console.log(this.params);
        return Axios.get('/admin/user/' + userId, this.params);
    }

    static getSubscriptions = () => {
        return Axios.get('/subscription');
    }

    static getUserFilesSizes = () => {
        return Axios.get('/subscription/current_size');
    }

}

export default AdminService;