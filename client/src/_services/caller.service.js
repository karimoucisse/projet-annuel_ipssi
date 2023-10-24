// import axios from 'axios';
// import { accountService } from './account.service';

// const Axios = axios.create({
//   baseURL: 'http://localhost:5000',
// });

// /**
//  * Intercepteur pour le token
//  */
// Axios.interceptors.request.use((request) => {
//   if (accountService.isLogged()) {
//     request.headers.Authorization = 'Bearer ' + accountService.getToken();
//   }
//   return request;
// });

// export default Axios;

import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: { 'content-type': 'application/json' },
  responseType: 'json',
});

<<<<<<< HEAD
/*
 * Intercepteur pour le token
 */

Axios.interceptors.request.use(request => {
    if (accountService.isLogged()) {
        request.headers.Authorization = 'Bearer ' + accountService.getToken();
    }
    return request
})

export default Axios;
=======
export default Axios;
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179
