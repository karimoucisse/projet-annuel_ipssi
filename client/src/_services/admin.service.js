import Axios from "./caller.service";

class AdminService {
    static params = {};
    static param = '';
    static direction = -1;
    static extension = '';
    static text = '';

    static buildParams = () => { // TODO: OPTIMISER LES PARAMETRES
        this.params.params = {}
        this.params.params.param = this.param;
        this.params.params.direction = this.direction;
        this.params.params.extension = this.extension;
        this.params.params.text = this.text;
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

    static searchFiles = (userId) => {
        console.log(this.params);
        return Axios.get('/file/search/' + userId, this.params);
    }

    static getStatistics = () => {
        return Axios.get('/admin/statistics');
    }

}

export default AdminService;